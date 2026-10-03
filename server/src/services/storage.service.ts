import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import { ENV } from '../config/environment.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '../../public');
const GENERATED_DIR = path.join(PUBLIC_DIR, 'generated');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');

// Configure Cloudinary if credentials provided
if (ENV.CLOUDINARY.IS_CONFIGURED) {
  cloudinary.config({
    cloud_name: ENV.CLOUDINARY.CLOUD_NAME,
    api_key: ENV.CLOUDINARY.API_KEY,
    api_secret: ENV.CLOUDINARY.API_SECRET,
  });
}

class StorageService {
  constructor() {
    this.ensureDirectories();
  }

  private ensureDirectories() {
    if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    if (!fs.existsSync(GENERATED_DIR)) fs.mkdirSync(GENERATED_DIR, { recursive: true });
    if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  /**
   * Safely deletes a file from disk
   */
  public async deleteFile(filePath: string): Promise<void> {
    try {
      if (filePath && fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
    } catch (err) {
      console.warn(`Could not delete temporary file ${filePath}:`, err);
    }
  }

  /**
   * Saves a generated image buffer either locally or uploads to Cloudinary
   */
  public async saveGeneratedImage(
    imageBuffer: Buffer,
    mimeType: string = 'image/png'
  ): Promise<string> {
    const ext = mimeType.includes('jpeg') || mimeType.includes('jpg') ? 'jpg' : 'png';
    const filename = `mischief_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${ext}`;

    // If Cloudinary is available, upload directly for high-performance CDN delivery
    if (ENV.CLOUDINARY.IS_CONFIGURED) {
      try {
        const uploadResult = await new Promise<string>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'senior_mischief_farewell',
              resource_type: 'image',
              format: ext
            },
            (error, result) => {
              if (error || !result) {
                reject(error || new Error('Cloudinary upload returned null'));
              } else {
                resolve(result.secure_url);
              }
            }
          );
          uploadStream.end(imageBuffer);
        });

        return uploadResult;
      } catch (cloudErr) {
        console.warn('Cloudinary upload failed, falling back to local file storage:', cloudErr);
      }
    }

    // Fallback: save to local public/generated directory
    this.ensureDirectories();
    const localFilePath = path.join(GENERATED_DIR, filename);
    await fs.promises.writeFile(localFilePath, imageBuffer);

    // Return URL path relative to static server
    return `/generated/${filename}`;
  }
}

export const storageService = new StorageService();
