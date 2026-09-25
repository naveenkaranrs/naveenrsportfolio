/**
 * Helper to download Naveen Karan's Resume in PDF format.
 * Uses a Blob fetch to guarantee immediate direct file download to disk,
 * preventing browser internal PDF preview or modal display.
 */
export async function downloadResumePDF() {
  const fileName = 'CVNAVEENKARANRS.pdf';
  const fileUrl = '/CVNAVEENKARANRS.pdf';

  try {
    const res = await fetch(fileUrl);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 200);
  } catch (err) {
    console.warn('Direct blob download failed, falling back to direct anchor download:', err);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.setAttribute('download', fileName);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 200);
  }
}
