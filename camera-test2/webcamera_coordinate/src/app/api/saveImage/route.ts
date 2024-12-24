import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const data = await request.json();
  const { imageData, fileName } = data;

  const base64Data = imageData.replace(/^data:image\/png;base64,/, "");
  const filePath = path.join(process.cwd(), 'public', 'photos', fileName + '.png');

  try {
    fs.writeFileSync(filePath, base64Data, 'base64');
    return NextResponse.json({ success: true, message: 'Image saved successfully' });
  } catch (error) {
    console.error('Error saving image:', error);
    return NextResponse.json({ success: false, message: 'Failed to save image' }, { status: 500 });
  }
}
