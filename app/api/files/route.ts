import { readdir } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const publicDir = join(process.cwd(), 'public');
    
    try {
      const files = await readdir(publicDir);
      // Filter out any hidden files or directories
      const validFiles = files.filter(file => !file.startsWith('.'));
      return NextResponse.json(validFiles);
    } catch (error) {
      // If directory doesn't exist or is empty, return empty array
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error('Error in files API route:', error);
    return NextResponse.json([], { status: 200 }); // Always return an array
  }
}