import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { calcularFingerprint } from './lib/fila.mjs';
import { validarPublicacao } from './publicar-instagram.mjs';

const caminhoImg = 'saidas/posts-individuais/usar-ia-para-copiar-e-colar-nao-e-automacao/slide-01.jpg';
const caminhoPub = 'saidas/posts-individuais/usar-ia-para-copiar-e-colar-nao-e-automacao/publicacao.json';
const caminhoJob = 'runtime/fila/POST-2026-09-04-17H.json';

async function main() {
  console.log('Redimensionando imagem para 1080x1350...');
  const inputBuffer = await readFile(caminhoImg);
  const buf = await sharp(inputBuffer).resize(1080, 1350, { fit: 'cover' }).jpeg({ quality: 95 }).toBuffer();
  await writeFile(caminhoImg, buf);
  console.log('Imagem ajustada com sucesso.');

  const pubRaw = JSON.parse(await readFile(caminhoPub, 'utf8'));
  const pubValidada = await validarPublicacao(pubRaw);
  const fingerprint = await calcularFingerprint(pubValidada);

  const job = JSON.parse(await readFile(caminhoJob, 'utf8'));
  job.fingerprint = fingerprint;
  job.atualizadoEm = new Date().toISOString();
  await writeFile(caminhoJob, JSON.stringify(job, null, 2), 'utf8');
  console.log('Fingerprint do job atualizada:', fingerprint);
}

main().catch(console.error);
