export function exportToCSV(data: any[], filename: string) {
  if (!data || data.length === 0) return;

  const keys = Object.keys(data[0]);
  const csv = [
    keys.join(','),
    ...data.map(item =>
      keys.map(key => {
        const value = item[key];
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      }).join(',')
    ),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

export function exportToJSON(data: any[], filename: string) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

export function exportToXML(data: any[], filename: string, rootElement: string = 'data') {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootElement}>\n`;

  data.forEach(item => {
    xml += '  <item>\n';
    Object.entries(item).forEach(([key, value]) => {
      xml += `    <${key}>${escapeXml(String(value))}</${key}>\n`;
    });
    xml += '  </item>\n';
  });

  xml += `</${rootElement}>`;

  const blob = new Blob([xml], { type: 'application/xml' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
