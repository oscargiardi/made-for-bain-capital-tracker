export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function lines(text) {
  return String(text || '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

export function cur(n) {
  return '$' + Number(n || 0).toLocaleString('en-AU', { minimumFractionDigits: 0 });
}

export const DOC_SECS = [
  { key: 'strategy', label: 'STRATEGY', icon: '📋', color: '#3F65D6' },
  { key: 'concept', label: 'CONCEPT DESIGN', icon: '✏️', color: '#A490DB' },
  { key: 'dd', label: 'DESIGN DEVELOPMENT', icon: '📐', color: '#A490DB' },
  { key: 'documentation', label: 'DOCUMENTATION', icon: '📁', color: '#A3ACA5' },
];
