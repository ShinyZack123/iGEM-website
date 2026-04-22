export function webglSupported(): boolean {
    if (typeof window === 'undefined') return false; // SSR safety
    try {
      const c = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (c.getContext('webgl') || c.getContext('experimental-webgl'))
      );
    } catch {
      return false;
    }
  }
  
  