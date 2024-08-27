import { sendImageToVisionAPI } from './services/visionApi';
import { getBase64Image } from './services/imageServices';

export async function analyzeImage(imagePath: string) {
  const base64Image = await getBase64Image(imagePath);
  const response = await sendImageToVisionAPI(base64Image);
  return response;
}