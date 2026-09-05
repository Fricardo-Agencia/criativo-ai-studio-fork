import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { calcularFingerprint } from './lib/fila.mjs';
import { validarPublicacao } from './publicar-instagram.mjs';

const raiz = process.cwd();

// Lista de imagens para redimensionar para 1080x1350
const carrosselImgs = [
  'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-01.jpg',
  'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-02.jpg',
  'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-03.jpg',
  'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-04.jpg',
  'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-05.jpg',
  'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-06.jpg',
  'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-07.jpg'
];

const postImg = 'saidas/posts-individuais/usar-ia-para-copiar-e-colar-nao-e-automacao/slide-01.jpg';

for (const img of [...carrosselImgs, postImg]) {
  const abs = path.resolve(img);
  const buf = await sharp(abs).resize(1080, 1350, { fit: 'cover' }).jpeg({ quality: 95 }).toBuffer();
  fs.writeFileSync(abs, buf);
  console.log(`Redimensionado para 1080x1350: ${img}`);
}

const posts = [
  'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/publicacao.json',
  'saidas/posts-individuais/usar-ia-para-copiar-e-colar-nao-e-automacao/publicacao.json'
];

for (const p of posts) {
  const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
  const d = await validarPublicacao(raw, raiz);
  const fp = await calcularFingerprint(d, raiz);
  const id = String(d.id).toUpperCase();
  const filaFile = path.resolve('runtime/fila', `${id}.json`);
  
  const job = {
    id,
    codigo: id,
    status: 'aprovado',
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString(),
    publicacao: raw,
    fingerprint: fp,
    aprovadoPor: 'antigravity-chat-local',
    aprovadoEm: new Date().toISOString()
  };

  fs.writeFileSync(filaFile, JSON.stringify(job, null, 2), 'utf8');
  console.log(`Job atualizado com 1080x1350 e fingerprint: ${id}`);
}
