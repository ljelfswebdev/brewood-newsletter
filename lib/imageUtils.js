/**
 * Ensure a given image value is a data URL.
 * - If already a data URL, return as-is.
 * - If blob: URL, resolve it to base64.
 * - If http(s): URL, fetch + convert to base64.
 */
export async function ensureImageDataUrl(src) {
    if (!src) return null;
    if (src.startsWith('data:')) return src;
  
    if (src.startsWith('blob:')) {
      const res = await fetch(src);
      const blob = await res.blob();
      return await blobToDataURL(blob);
    }
  
    if (src.startsWith('http')) {
      try {
        const res = await fetch(src, { mode: 'cors' });
        const blob = await res.blob();
        return await blobToDataURL(blob);
      } catch (err) {
        console.warn('Failed to fetch image for PDF:', src, err);
        return src; // fall back
      }
    }
  
    return src;
  }
  
  function blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }