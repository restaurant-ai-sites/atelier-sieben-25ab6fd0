const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SECRET_KEY;
export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;

export async function sb(path, init = {}) {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function uploadToStorage(bucket, path, file) {
  const arrayBuffer = await file.arrayBuffer();
  const res = await fetch(`${SB_URL}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SB_KEY}`,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "true",
    },
    body: arrayBuffer,
  });
  if (!res.ok) throw new Error(`Storage ${res.status}: ${await res.text()}`);
  return `${SB_URL}/storage/v1/object/public/${bucket}/${path}`;
}
