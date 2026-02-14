import fs from 'fs';
import path from 'path';
import https from 'https';
import Papa from 'papaparse';
import sharp from 'sharp';
import { pipeline } from 'stream';

// Define types locally to avoid import issues with ts-node
interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  basePrice: number;
  weight?: string;
  available: boolean;
}

interface Branch {
  address: string;
  district: string;
  phone: string;
  schedule: string;
  link2gis: string;
  linkYandex: string;
}

interface Banner {
  id: string;
  image: string;
  link: string;
}

const PRODUCTS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSF-SrUyWUFNrlauDFOomL9FIO9xYN2NhYcdkBTcmz1GP3P-FYgCreNtqgox_v2yG4ku8Uu7dmDaCNI/pub?gid=0&single=true&output=csv';
const BRANCHES_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSF-SrUyWUFNrlauDFOomL9FIO9xYN2NhYcdkBTcmz1GP3P-FYgCreNtqgox_v2yG4ku8Uu7dmDaCNI/pub?gid=634697279&single=true&output=csv';
const BANNERS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSF-SrUyWUFNrlauDFOomL9FIO9xYN2NhYcdkBTcmz1GP3P-FYgCreNtqgox_v2yG4ku8Uu7dmDaCNI/pub?gid=141207951&single=true&output=csv';
const PRODUCTS_DATA_FILE = path.join(process.cwd(), 'lib/data.json');
const BRANCHES_DATA_FILE = path.join(process.cwd(), 'lib/branches.json');
const BANNERS_DATA_FILE = path.join(process.cwd(), 'lib/banners.json');
const PUBLIC_PRODUCTS_DIR = path.join(process.cwd(), 'public/products');
const PUBLIC_BANNERS_DIR = path.join(process.cwd(), 'public/banners');
const PRODUCT_IMAGE_WIDTH = 960;
const BANNER_IMAGE_WIDTH = 1440;
const BANNER_IMAGE_HEIGHT = 720;

async function fetchCSV(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const get = (currentUrl: string) => {
      https.get(currentUrl, (res) => {
        // Handle redirects
        if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303 || res.statusCode === 307) {
          if (res.headers.location) {
            console.log(`Redirecting to: ${res.headers.location}`);
            get(res.headers.location);
            return;
          }
        }

        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve(data);
          } else {
            reject(new Error(`Failed to fetch CSV: Status ${res.statusCode}`));
          }
        });
        res.on('error', (err) => reject(err));
      }).on('error', (err) => reject(err));
    };
    get(url);
  });
}

function getGoogleDriveFileId(url: string): string | null {
  if (!url) return null;

  const matchShare = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchShare?.[1]) {
    return matchShare[1];
  }

  try {
    const parsed = new URL(url);
    const id = parsed.searchParams.get('id');
    if (id) {
      return id;
    }
  } catch {
    return null;
  }

  return null;
}

function getGoogleDriveDirectLink(url: string): string | null {
  if (!url) return null;

  const fileId = getGoogleDriveFileId(url);
  if (fileId) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  if (url.includes('drive-viewer')) {
    console.warn(`[WARN] Found 'drive-viewer' link. This usually requires authentication and cannot be downloaded by script: ${url}`);
    return null;
  }

  return url;
}

function getGoogleDriveImagePreviewLink(url: string): string {
  const fileId = getGoogleDriveFileId(url);
  if (!fileId) {
    return url;
  }

  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
}

function sanitizeCell(value: unknown): string {
  return String(value ?? '').replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
}

function formatPhone(phoneRaw: string): string {
  const digitsOnly = phoneRaw.replace(/\D/g, '');
  if (digitsOnly.length === 11 && digitsOnly.startsWith('8')) {
    return `+7 (${digitsOnly.slice(1, 4)}) ${digitsOnly.slice(4, 7)}-${digitsOnly.slice(7, 9)}-${digitsOnly.slice(9, 11)}`;
  }

  if (digitsOnly.length === 11 && digitsOnly.startsWith('7')) {
    return `+7 (${digitsOnly.slice(1, 4)}) ${digitsOnly.slice(4, 7)}-${digitsOnly.slice(7, 9)}-${digitsOnly.slice(9, 11)}`;
  }

  return sanitizeCell(phoneRaw);
}

async function downloadImage(url: string, filepath: string): Promise<boolean> {
  const directUrl = getGoogleDriveDirectLink(url);
  if (!directUrl) {
    console.warn(`[SKIP] Could not determine direct URL for: ${url}`);
    return false;
  }

  return new Promise((resolve) => {
    https.get(directUrl, (response) => {
      if (response.statusCode !== 200) {
        console.error(`[ERROR] Failed to download image ${directUrl}: Status ${response.statusCode}`);
        // Consume response data to free up memory
        response.resume();
        resolve(false);
        return;
      }

      // Create Sharp transformer
      // Resize to width 800, maintain aspect ratio
      // Convert to WebP with 80% quality
      const transformer = sharp()
        .resize({ width: PRODUCT_IMAGE_WIDTH, withoutEnlargement: true, fit: 'inside' })
        .sharpen({ sigma: 0.6 })
        .webp({ quality: 86, effort: 6 });

      const fileStream = fs.createWriteStream(filepath);

      // Pipe the streams: response -> transformer -> file
      pipeline(response, transformer, fileStream, (err) => {
        if (err) {
          console.error(`[ERROR] Error processing/saving image ${filepath}:`, err);
          fs.unlink(filepath, () => {}); // Clean up partial file
          resolve(false);
        } else {
          resolve(true);
        }
      });

    }).on('error', (err) => {
      console.error(`[ERROR] Request failed for ${directUrl}:`, err.message);
      resolve(false);
    });
  });
}

async function downloadBannerImage(url: string, filepath: string): Promise<boolean> {
  const directUrl = getGoogleDriveDirectLink(url);
  if (!directUrl) {
    console.warn(`[SKIP] Could not determine direct URL for banner: ${url}`);
    return false;
  }

  return new Promise((resolve) => {
    https.get(directUrl, (response) => {
      if (response.statusCode !== 200) {
        console.error(`[ERROR] Failed to download banner image ${directUrl}: Status ${response.statusCode}`);
        response.resume();
        resolve(false);
        return;
      }

      const transformer = sharp()
        .resize({ width: BANNER_IMAGE_WIDTH, height: BANNER_IMAGE_HEIGHT, fit: 'cover', position: 'centre', withoutEnlargement: true })
        .sharpen({ sigma: 0.6 })
        .webp({ quality: 88, effort: 6 });

      const fileStream = fs.createWriteStream(filepath);

      pipeline(response, transformer, fileStream, (err) => {
        if (err) {
          console.error(`[ERROR] Error processing/saving banner image ${filepath}:`, err);
          fs.unlink(filepath, () => {});
          resolve(false);
        } else {
          resolve(true);
        }
      });

    }).on('error', (err) => {
      console.error(`[ERROR] Request failed for ${directUrl}:`, err.message);
      resolve(false);
    });
  });
}

async function syncProducts() {
  const csvData = await fetchCSV(PRODUCTS_CSV_URL);
  const parsed = Papa.parse(csvData, { header: true, skipEmptyLines: true });
  console.log('Products CSV Fields:', parsed.meta.fields);
  console.log('Products First Row:', parsed.data[0]);

  const products: Product[] = [];
  const rows = parsed.data as any[];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row['Название']) {
      console.warn('Skipping row without Name:', row);
      continue;
    }

    const category = row['Категория']?.trim() || 'Другое';

    const id = (i + 1).toString();
    const originalImage = row['Изображение'];
    let imagePath = originalImage; // Default to remote URL if download fails

    if (originalImage && originalImage.startsWith('http')) {
      // Force .webp extension
      const filename = `${id}.webp`;
      const localFilePath = path.join(PUBLIC_PRODUCTS_DIR, filename);
      const publicPath = `/products/${filename}`;

      console.log(`Downloading and optimizing image for product ${id}...`);
      const success = await downloadImage(originalImage, localFilePath);

      if (success) {
        imagePath = publicPath;
      } else {
        imagePath = getGoogleDriveImagePreviewLink(originalImage);
        console.warn(`[WARN] Using fallback URL for product ${id} due to download failure: ${imagePath}`);
      }
    }

    const product: Product = {
      id,
      name: row['Название'],
      description: row['Описание'],
      category: category,
      basePrice: parseInt(row['Цена'], 10) || 0,
      weight: row['Выход'] || undefined,
      image: imagePath,
      available: true // Default
    };

    products.push(product);
  }

  fs.writeFileSync(PRODUCTS_DATA_FILE, JSON.stringify(products, null, 2));
  console.log(`Successfully synced ${products.length} products to ${PRODUCTS_DATA_FILE}`);
}

async function syncBranches() {
  const csvData = await fetchCSV(BRANCHES_CSV_URL);
  const parsed = Papa.parse(csvData, { header: true, skipEmptyLines: true });
  console.log('Branches CSV Fields:', parsed.meta.fields);

  const rows = parsed.data as any[];
  const branches: Branch[] = rows
    .map((row) => {
      const address = sanitizeCell(row['Адрес']);
      if (!address) {
        return null;
      }

      return {
        address,
        district: sanitizeCell(row['Район']),
        phone: formatPhone(sanitizeCell(row['Телефон'])),
        schedule: sanitizeCell(row['Режим']),
        link2gis: sanitizeCell(row['Ссылка на 2gis']),
        linkYandex: sanitizeCell(row['Ссылка на Яндекс карты'])
      };
    })
    .filter((branch): branch is Branch => branch !== null);

  fs.writeFileSync(BRANCHES_DATA_FILE, JSON.stringify(branches, null, 2));
  console.log(`Successfully synced ${branches.length} branches to ${BRANCHES_DATA_FILE}`);
}

async function syncBanners() {
  const csvData = await fetchCSV(BANNERS_CSV_URL);
  const parsed = Papa.parse(csvData, { header: true, skipEmptyLines: true });
  console.log('Banners CSV Fields:', parsed.meta.fields);

  const rows = parsed.data as any[];
  const banners: Banner[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const imageUrl = sanitizeCell(row['Изображение']);
    if (!imageUrl) {
      continue;
    }

    const id = (i + 1).toString();
    const filename = `${id}.webp`;
    const localFilePath = path.join(PUBLIC_BANNERS_DIR, filename);
    const publicPath = `/banners/${filename}`;

    let image = imageUrl;
    const success = await downloadBannerImage(imageUrl, localFilePath);
    if (success) {
      image = publicPath;
    } else {
      image = getGoogleDriveImagePreviewLink(imageUrl);
      console.warn(`[WARN] Using fallback URL for banner ${id} due to download failure: ${image}`);
    }

    banners.push({
      id,
      image,
      link: sanitizeCell(row['Ссылка']) || '#',
    });
  }

  fs.writeFileSync(BANNERS_DATA_FILE, JSON.stringify(banners, null, 2));
  console.log(`Successfully synced ${banners.length} banners to ${BANNERS_DATA_FILE}`);
}

async function main() {
  console.log('Starting data sync...');

  // Create output directory
  if (!fs.existsSync(PUBLIC_PRODUCTS_DIR)) {
    fs.mkdirSync(PUBLIC_PRODUCTS_DIR, { recursive: true });
  }

  if (!fs.existsSync(PUBLIC_BANNERS_DIR)) {
    fs.mkdirSync(PUBLIC_BANNERS_DIR, { recursive: true });
  }

  try {
    await syncProducts();
    await syncBranches();
    await syncBanners();
  } catch (error) {
    console.error('Sync failed:', error);
    process.exit(1);
  }
}

main();
