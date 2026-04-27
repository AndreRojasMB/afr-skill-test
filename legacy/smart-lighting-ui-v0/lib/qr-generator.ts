export function generateQRCodeDataURL(text: string): string {
  const size = 200;
  const margin = 10;
  
  // Use QR code API from qrserver.com
  const encodedText = encodeURIComponent(text);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`;
}

export function generateQRCodeForLuminaire(luminaireId: string): string {
  const qrData = JSON.stringify({
    type: 'luminaire',
    id: luminaireId,
    timestamp: new Date().toISOString(),
  });
  return generateQRCodeDataURL(qrData);
}

export function downloadQRCode(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();
}
