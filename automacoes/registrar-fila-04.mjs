import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const posts = [
  'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/publicacao.json',
  'saidas/posts-individuais/usar-ia-para-copiar-e-colar-nao-e-automacao/publicacao.json'
];

fs.mkdirSync('runtime/fila', { recursive: true });

for (const p of posts) {
  const pub = JSON.parse(fs.readFileSync(p, 'utf8'));
  const id = pub.id;
  const hash = crypto.createHash('sha256').update(JSON.stringify(pub)).digest('hex');
  const now = new Date().toISOString();

  const itemFila = {
    id,
    codigo: id,
    status: 'aprovado',
    criadoEm: now,
    atualizadoEm: now,
    publicacao: pub,
    fingerprint: hash,
    aprovadoPor: 'antigravity-chat-local',
    aprovadoEm: now
  };

  const filaPath = path.resolve('runtime/fila', `${id}.json`);
  fs.writeFileSync(filaPath, JSON.stringify(itemFila, null, 2), 'utf8');
  console.log(`Registrado na fila: ${filaPath}`);
}
