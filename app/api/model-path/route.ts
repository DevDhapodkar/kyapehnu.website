import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dir = path.join(process.cwd(), 'public', 'models');
    const files = await fs.readdir(dir);
    const glb = files.find((f) => f.endsWith('.glb') || f.endsWith('.gltf'));
    return NextResponse.json({ path: glb ? `/models/${glb}` : null });
  } catch {
    return NextResponse.json({ path: null });
  }
}
