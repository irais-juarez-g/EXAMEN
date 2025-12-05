const BASE = 'https://rickandmortyapi.com/api';

export async function fetchCharacters(pageUrl?: string) {
  const url = pageUrl ?? `${BASE}/character`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error fetching characters');
  return res.json();
}

export async function fetchCharacterById(id: number) {
  const res = await fetch(`${BASE}/character/${id}`);
  if (!res.ok) throw new Error('Error fetching character');
  return res.json();
}

export async function fetchLocations(pageUrl?: string) {
  const url = pageUrl ?? `${BASE}/location`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error fetching locations');
  return res.json();
}

export default { fetchCharacters, fetchCharacterById, fetchLocations };
