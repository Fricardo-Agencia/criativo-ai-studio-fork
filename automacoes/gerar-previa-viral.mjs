import { readFile, writeFile } from 'node:fs/promises';

async function main() {
  const template = await readFile('templates/preview-instagram.html', 'utf8');
  const pub = JSON.parse(await readFile('saidas/carrosseis/a-arte-do-carrossel-viral/publicacao.json', 'utf8'));

  const slidesRelativos = pub.imagens.map((img) => `../${img}`);

  let html = template
    .replaceAll('{{TITLE}}', pub.titulo)
    .replaceAll('{{USERNAME}}', 'escoladeferramentas')
    .replaceAll('{{CAPTION}}', pub.legenda.replace(/\n/g, '<br>'))
    .replaceAll('{{LIKES}}', '1.847 curtidas')
    .replaceAll('{{TIME_LABEL}}', 'HÁ 15 MINUTOS')
    .replaceAll('{{SLIDES_JSON}}', JSON.stringify(slidesRelativos));

  await writeFile('previas/a-arte-do-carrossel-viral.html', html, 'utf8');
  console.log('Prévia gerada com sucesso em previas/a-arte-do-carrossel-viral.html');
}

main().catch(console.error);
