import sharp from 'sharp';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = 'saidas/carrosseis/a-arte-do-carrossel-viral';

async function main() {
  const files = await readdir(dir);
  const slides = files
    .filter((f) => /^slide\s*\d+\.(jpeg|jpg)$/i.test(f))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)[0], 10);
      const numB = parseInt(b.match(/\d+/)[0], 10);
      return numA - numB;
    });

  console.log(`Encontrados ${slides.length} slides para processamento.`);

  for (const file of slides) {
    const num = String(file.match(/\d+/)[0]).padStart(2, '0');
    const inputPath = join(dir, file);
    const outputPath = join(dir, `slide-${num}.jpg`);

    const inputBuf = await readFile(inputPath);
    const meta = await sharp(inputBuf).metadata();
    console.log(`Slide ${num} original: ${meta.width}x${meta.height} (${meta.format})`);

    // Redimensiona garantindo 1080x1350 exato e qualidade 95
    const outBuf = await sharp(inputBuf)
      .resize(1080, 1350, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 95 })
      .toBuffer();

    await writeFile(outputPath, outBuf);
    console.log(`-> Salvo padronizado: ${outputPath} (1080x1350 JPEG)`);
  }

  console.log('Todos os 10 slides foram processados e padronizados com sucesso!');
}

main().catch(console.error);
