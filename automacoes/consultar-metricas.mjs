import fs from 'fs';
import path from 'path';

// Carrega .env manualmente
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const idx = trimmed.indexOf('=');
  if (idx !== -1) {
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim();
    env[key] = val;
  }
}

const token = env.INSTAGRAM_ACCESS_TOKEN;
const instagramId = env.INSTAGRAM_BUSINESS_ID;
const apiVersion = env.META_API_VERSION || 'v25.0';
const base = `https://graph.facebook.com/${apiVersion}`;

async function get(url) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

async function main() {
  console.log('--- Consultando Perfil do Instagram ---');
  const perfil = await get(`${base}/${instagramId}?fields=name,username,followers_count,follows_count,media_count`);
  console.log('Perfil:', JSON.stringify(perfil, null, 2));

  // Lista dos posts publicados
  const postsFila = [
    { file: 'POST-2026-09-02-06H.json' },
    { file: 'POST-2026-09-02-17H.json' },
    { file: 'POST-2026-09-03-09H.json' },
    { file: 'POST-2026-09-03-17H.json' },
    { file: 'POST-2026-09-03-17H-EXTRA.json' }
  ];

  const resultados = [];

  for (const item of postsFila) {
    const p = path.resolve('runtime/fila', item.file);
    if (!fs.existsSync(p)) continue;
    const json = JSON.parse(fs.readFileSync(p, 'utf8'));
    const mediaId = json.resultado?.mediaId;
    const info = {
      id: json.id,
      titulo: json.publicacao.titulo,
      pilar: json.publicacao.pilar,
      formato: json.publicacao.formato,
      dataPublicado: json.atualizadoEm || json.criadoEm,
      permalink: json.resultado?.permalink,
      mediaId
    };

    if (mediaId) {
      console.log(`\nConsultando mídia ${mediaId} (${info.titulo})...`);
      // Campos diretos
      const dadosMidia = await get(`${base}/${mediaId}?fields=id,media_type,media_product_type,timestamp,permalink,like_count,comments_count`);
      info.dadosMidia = dadosMidia;

      // Insights possíveis na v22+ da Meta Graph API
      // Metrics suportadas para IMAGE e CAROUSEL_ALBUM: reach, saved, shares, total_interactions, views
      const candidateMetrics = ['views', 'reach', 'saved', 'shares', 'total_interactions'];
      info.insights = [];
      for (const m of candidateMetrics) {
        try {
          const res = await get(`${base}/${mediaId}/insights?metric=${m}`);
          if (res.data && res.data[0]) {
            info.insights.push(res.data[0]);
          } else if (res.error) {
            info.insights.push({ name: m, error: res.error.message });
          }
        } catch (e) {
          info.insights.push({ name: m, error: e.message });
        }
      }
    }

    resultados.push(info);
  }

  // Tenta também buscar últimas mídias direto da conta
  const feedRecente = await get(`${base}/${instagramId}/media?fields=id,caption,media_type,timestamp,permalink,like_count,comments_count&limit=10`);

  const dadosFinais = { perfil, feedRecente, resultados };
  console.log('\n--- RESULTADOS COMPLETOS ---');
  console.log(JSON.stringify(dadosFinais, null, 2));

  // Salvar em runtime/metricas-extraidas.json
  fs.writeFileSync('runtime/metricas-extraidas.json', JSON.stringify(dadosFinais, null, 2));
  console.log('\nSalvo em runtime/metricas-extraidas.json com sucesso!');
}

main().catch(err => {
  console.error('Erro na execução:', err);
  process.exit(1);
});
