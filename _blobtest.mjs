import { list, head } from '@vercel/blob';

const token = process.env.BLOB_READ_WRITE_TOKEN;
const { blobs } = await list({ token });

console.log('blobs no store:', blobs.length);
for (const b of blobs) {
  console.log('\n--- pathname:', b.pathname, '(', b.size, 'bytes )');
  console.log('url        :', b.url);
  console.log('downloadUrl:', b.downloadUrl);
  try {
    const r1 = await fetch(b.url);
    console.log('fetch(url)         ->', r1.status);
  } catch (e) { console.log('fetch(url) erro:', e.message); }
  try {
    const r2 = await fetch(b.downloadUrl);
    console.log('fetch(downloadUrl) ->', r2.status);
  } catch (e) { console.log('fetch(downloadUrl) erro:', e.message); }
  try {
    const h = await head(b.url, { token });
    const r3 = await fetch(h.downloadUrl);
    console.log('head().downloadUrl ->', r3.status);
  } catch (e) { console.log('head() erro:', e.message); }
}
