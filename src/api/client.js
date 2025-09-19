const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
async function http(path){ const res = await fetch(`${BASE_URL}${path}`); if(!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); }
export const api = { listGuests: () => http("/guests"), getGuest: (id) => http(`/guests/${id}`) };
