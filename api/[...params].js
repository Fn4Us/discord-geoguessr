import * as topojson from 'topojson-client';

const TOKEN = process.env.MAPILLARY_TOKEN;

const STATE_BOUNDS = {
  alabama:       { minLat: 30.14, maxLat: 35.01, minLng: -88.47, maxLng: -84.89 },
  alaska:        { minLat: 54.56, maxLat: 71.54, minLng: -179.9, maxLng: -129.9 },
  arizona:       { minLat: 31.33, maxLat: 37.00, minLng: -114.8, maxLng: -109.0 },
  arkansas:      { minLat: 33.00, maxLat: 36.50, minLng: -94.62, maxLng: -89.64 },
  california:    { minLat: 32.53, maxLat: 42.01, minLng: -124.4, maxLng: -114.1 },
  colorado:      { minLat: 36.99, maxLat: 41.00, minLng: -109.1, maxLng: -102.0 },
  connecticut:   { minLat: 40.95, maxLat: 42.05, minLng: -73.73, maxLng: -71.79 },
  delaware:      { minLat: 38.45, maxLat: 39.84, minLng: -75.79, maxLng: -75.05 },
  florida:       { minLat: 24.54, maxLat: 31.00, minLng: -87.63, maxLng: -80.03 },
  georgia:       { minLat: 30.36, maxLat: 35.00, minLng: -85.61, maxLng: -80.84 },
  hawaii:        { minLat: 18.91, maxLat: 22.24, minLng: -160.2, maxLng: -154.8 },
  idaho:         { minLat: 41.99, maxLat: 49.00, minLng: -117.2, maxLng: -111.0 },
  illinois:      { minLat: 36.97, maxLat: 42.51, minLng: -91.51, maxLng: -87.02 },
  indiana:       { minLat: 37.77, maxLat: 41.76, minLng: -88.10, maxLng: -84.78 },
  iowa:          { minLat: 40.38, maxLat: 43.50, minLng: -96.64, maxLng: -90.14 },
  kansas:        { minLat: 36.99, maxLat: 40.00, minLng: -102.1, maxLng: -94.59 },
  kentucky:      { minLat: 36.50, maxLat: 39.15, minLng: -89.57, maxLng: -81.96 },
  louisiana:     { minLat: 28.93, maxLat: 33.02, minLng: -94.04, maxLng: -88.82 },
  maine:         { minLat: 43.06, maxLat: 47.46, minLng: -71.08, maxLng: -66.95 },
  maryland:      { minLat: 37.91, maxLat: 39.72, minLng: -79.49, maxLng: -75.05 },
  massachusetts: { minLat: 41.24, maxLat: 42.89, minLng: -73.51, maxLng: -69.93 },
  michigan:      { minLat: 41.70, maxLat: 48.19, minLng: -90.42, maxLng: -82.41 },
  minnesota:     { minLat: 43.50, maxLat: 49.38, minLng: -97.24, maxLng: -89.49 },
  mississippi:   { minLat: 30.17, maxLat: 35.00, minLng: -91.66, maxLng: -88.10 },
  missouri:      { minLat: 35.99, maxLat: 40.61, minLng: -95.77, maxLng: -89.10 },
  montana:       { minLat: 44.36, maxLat: 49.00, minLng: -116.0, maxLng: -104.0 },
  nebraska:      { minLat: 39.99, maxLat: 43.00, minLng: -104.1, maxLng: -95.31 },
  nevada:        { minLat: 35.00, maxLat: 42.00, minLng: -120.0, maxLng: -114.0 },
  newhampshire:  { minLat: 42.70, maxLat: 45.31, minLng: -72.56, maxLng: -70.61 },
  newjersey:     { minLat: 38.93, maxLat: 41.36, minLng: -75.56, maxLng: -73.89 },
  newmexico:     { minLat: 31.33, maxLat: 37.00, minLng: -109.1, maxLng: -103.0 },
  newyork:       { minLat: 40.50, maxLat: 45.02, minLng: -79.76, maxLng: -71.86 },
  northcarolina: { minLat: 33.84, maxLat: 36.59, minLng: -84.32, maxLng: -75.46 },
  northdakota:   { minLat: 45.94, maxLat: 49.00, minLng: -104.1, maxLng: -96.56 },
  ohio:          { minLat: 38.40, maxLat: 42.33, minLng: -84.82, maxLng: -80.52 },
  oklahoma:      { minLat: 33.62, maxLat: 37.00, minLng: -103.0, maxLng: -94.43 },
  oregon:        { minLat: 41.99, maxLat: 46.24, minLng: -124.6, maxLng: -116.5 },
  pennsylvania:  { minLat: 39.72, maxLat: 42.27, minLng: -80.52, maxLng: -74.69 },
  rhodeisland:   { minLat: 41.15, maxLat: 42.02, minLng: -71.91, maxLng: -71.12 },
  southcarolina: { minLat: 32.05, maxLat: 35.22, minLng: -83.35, maxLng: -78.55 },
  southdakota:   { minLat: 42.48, maxLat: 45.94, minLng: -104.1, maxLng: -96.44 },
  tennessee:     { minLat: 34.98, maxLat: 36.68, minLng: -90.31, maxLng: -81.65 },
  texas:         { minLat: 25.84, maxLat: 36.50, minLng: -106.6, maxLng: -93.51 },
  utah:          { minLat: 36.99, maxLat: 42.00, minLng: -114.1, maxLng: -109.0 },
  vermont:       { minLat: 42.73, maxLat: 45.02, minLng: -73.44, maxLng: -71.46 },
  virginia:      { minLat: 36.54, maxLat: 39.47, minLng: -83.68, maxLng: -75.24 },
  washington:    { minLat: 45.54, maxLat: 49.00, minLng: -124.8, maxLng: -116.9 },
  westvirginia:  { minLat: 37.20, maxLat: 40.64, minLng: -82.64, maxLng: -77.72 },
  wisconsin:     { minLat: 42.49, maxLat: 47.08, minLng: -92.89, maxLng: -86.25 },
  wyoming:       { minLat: 40.99, maxLat: 45.01, minLng: -111.1, maxLng: -104.1 },
};


const STATE_FIPS = {
  alabama: '01', alaska: '02', arizona: '04', arkansas: '05',
  california: '06', colorado: '08', connecticut: '09', delaware: '10',
  florida: '12', georgia: '13', hawaii: '15', idaho: '16',
  illinois: '17', indiana: '18', iowa: '19', kansas: '20',
  kentucky: '21', louisiana: '22', maine: '23', maryland: '24',
  massachusetts: '25', michigan: '26', minnesota: '27', mississippi: '28',
  missouri: '29', montana: '30', nebraska: '31', nevada: '32',
  newhampshire: '33', newjersey: '34', newmexico: '35', newyork: '36',
  northcarolina: '37', northdakota: '38', ohio: '39', oklahoma: '40',
  oregon: '41', pennsylvania: '42', rhodeisland: '44', southcarolina: '45',
  southdakota: '46', tennessee: '47', texas: '48', utah: '49',
  vermont: '50', virginia: '51', washington: '53', westvirginia: '54',
  wisconsin: '55', wyoming: '56',
};


let _statePolygons = null;

async function loadStatePolygons() {
  if (_statePolygons) return _statePolygons;
  const res = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json');
  const topology = await res.json();
  const geojson = topojson.feature(topology, topology.objects.states);
  _statePolygons = geojson.features;
  return _statePolygons;
}


function pointInPolygon(lat, lng, feature) {
  const pt = [lng, lat];
  const polys =
    feature.geometry.type === 'Polygon'
      ? [feature.geometry.coordinates]
      : feature.geometry.coordinates; // MultiPolygon

  for (const poly of polys) {
    const ring = poly[0]; // outer ring only (ignore holes for speed)
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];
      if (
        yi > pt[1] !== yj > pt[1] &&
        pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi
      ) {
        inside = !inside;
      }
    }
    if (inside) return true;
  }
  return false;
}


function makeRng(seed) {
  let s = 0;
  for (let i = 0; i < seed.length; i++) {
    s = (Math.imul(s, 31) + seed.charCodeAt(i)) >>> 0;
  }
  // Ensure non-zero state
  if (s === 0) s = 1;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}


async function findNearestImage(lat, lng) {
  const url = new URL('https://graph.mapillary.com/images');
  url.searchParams.set('fields', 'id,sequence_id');
  url.searchParams.set('closeto', `${lng},${lat}`); // GeoJSON order: lng first
  url.searchParams.set('radius', '500');
  url.searchParams.set('limit', '1');
  url.searchParams.set('access_token', TOKEN);

  const res = await fetch(url.toString());
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.data?.length) return null;
  return {
    imageId: data.data[0].id,
    sequenceId: data.data[0].sequence_id,
  };
}

// Get all image IDs in a sequence, in capture order
async function getSequenceImages(sequenceId) {
  const url = new URL('https://graph.mapillary.com/image_ids');
  url.searchParams.set('sequence_id', sequenceId);
  url.searchParams.set('access_token', TOKEN);

  const res = await fetch(url.toString());
  if (!res.ok) return [];
  const data = await res.json();
  return data.data?.map((d) => d.id) ?? [];
}

// Get the 2048-px thumbnail URL for an image ID
async function getImageUrl(imageId) {
  const url = new URL(`https://graph.mapillary.com/${imageId}`);
  url.searchParams.set('fields', 'thumb_2048_url');
  url.searchParams.set('access_token', TOKEN);

  const res = await fetch(url.toString());
  if (!res.ok) return null;
  const data = await res.json();
  return data.thumb_2048_url ?? null;
}


export default async function handler(req, res) {
  // Parse /:state/:seed/:steps from the URL
  const parts = req.url.split('?')[0].split('/').filter(Boolean);

  if (parts.length < 3) {
    res.status(400).send('Usage: /[state]/[seed]/[steps]  e.g. /texas/abc123/5');
    return;
  }

  const state = parts[0].toLowerCase().replace(/-/g, ''); // allow "new-york" too
  const seed  = parts[1];
  const steps = Math.max(-50, Math.min(50, parseInt(parts[2]) || 0)); // clamp ±50

  // Validate state
  const bounds = STATE_BOUNDS[state];
  const fips   = STATE_FIPS[state];
  if (!bounds || !fips) {
    res.status(404).send(
      `Unknown state "${parts[0]}". Use lowercase with no spaces, e.g. "newyork", "northcarolina".`
    );
    return;
  }

  if (!TOKEN) {
    res.status(500).send('Server misconfiguration: MAPILLARY_TOKEN env var is missing.');
    return;
  }

  // Load state polygon (cached after first request)
  const polygons    = await loadStatePolygons();
  const stateFeature = polygons.find((f) => f.id === fips);
  if (!stateFeature) {
    res.status(500).send('Could not load state polygon data.');
    return;
  }

  // Deterministic RNG seeded by the seed param
  const rng = makeRng(seed);

  // Generate a deterministic point inside the state polygon
  let candidateLat, candidateLng;
  for (let attempt = 0; attempt < 50; attempt++) {
    const lat = bounds.minLat + rng() * (bounds.maxLat - bounds.minLat);
    const lng = bounds.minLng + rng() * (bounds.maxLng - bounds.minLng);
    if (!pointInPolygon(lat, lng, stateFeature)) continue;
    candidateLat = lat;
    candidateLng = lng;
    break;
  }

  if (candidateLat == null) {
    res.status(500).send('Could not generate a valid point inside state polygon.');
    return;
  }

  // Search for nearest Mapillary image, expanding radius until we find one
  let nearest = null;
  const radii = [500, 1000, 2000, 5000, 10000, 20000, 50000];
  for (const radius of radii) {
    const url = new URL('https://graph.mapillary.com/images');
    url.searchParams.set('fields', 'id,sequence_id');
    url.searchParams.set('closeto', `${candidateLng},${candidateLat}`);
    url.searchParams.set('radius', String(radius));
    url.searchParams.set('limit', '1');
    url.searchParams.set('access_token', TOKEN);

    const res2 = await fetch(url.toString());
    if (!res2.ok) continue;
    const data = await res2.json();
    if (data.data?.length) {
      nearest = { imageId: data.data[0].id, sequenceId: data.data[0].sequence_id };
      break;
    }
  }

  if (!nearest) {
    res.status(404).send('No Mapillary coverage found anywhere in this state.');
    return;
  }

  // Walk the sequence by N steps (forward = positive, backward = negative)
  let finalImageId = nearest.imageId;

  if (steps !== 0) {
    const sequence    = await getSequenceImages(nearest.sequenceId);
    const currentIdx  = sequence.indexOf(nearest.imageId);

    if (currentIdx !== -1) {
      const targetIdx  = Math.max(0, Math.min(sequence.length - 1, currentIdx + steps));
      finalImageId     = sequence[targetIdx];
    }
    // If image wasn't found in sequence list, fall back to the original image
  }

  // Resolve the actual image URL
  const imageUrl = await getImageUrl(finalImageId);
  if (!imageUrl) {
    res.status(500).send('Could not retrieve image URL from Mapillary.');
    return;
  }

  // Proxy the image back as PNG
  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) {
    res.status(502).send('Failed to fetch image from Mapillary CDN.');
    return;
  }

  const buffer = await imgRes.arrayBuffer();

  res.setHeader('Content-Type', 'image/jpeg'); // Mapillary thumbs are JPEG
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.send(Buffer.from(buffer));
}
