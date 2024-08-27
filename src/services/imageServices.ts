import fs from 'fs';
import sharp from 'sharp';

export async function getBase64Image(imagePath: string): Promise<string> {
  const imageBuffer = await sharp(imagePath)
    .resize({ width: 1000 }) // Redimensiona a imagem para no máximo 1000 pixels de largura
    .toBuffer();
  return imageBuffer.toString('base64');
}

export async function cropImage(imagePath: string, x: number, y: number, width: number, height: number): Promise<Buffer> {
  const croppedImage = await sharp(imagePath)
    .extract({ left: x, top: y, width, height })
    .toBuffer();
  return croppedImage;
}

export async function addFilter(imagePath: string, filter: sharp.Filter): Promise<Buffer> {
  const filteredImage = await sharp(imagePath)
    .blur(5) // Aplica um filtro de blur como exemplo
    .toBuffer();
  return filteredImage;
}