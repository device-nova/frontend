import { useEffect, useRef, useCallback } from 'react';

const CHATWOOT_URL = 'https://app.chatwoot.com';
const WEBSITE_TOKEN = 'ayoJ2zDpFFsGvWjEZrac7tYR';

const CHATWOOT_CSS = `
  .woot-widget-wrap {
    --woot--widget-bg: #060a10;
    --woot--widget-border: rgba(255,255,255,0.08);
    --woot--brand-color: #00d9ff;
    --woot--brand-dark: #0099cc;
    --woot--text-primary: #f2f6fa;
    --woot--text-secondary: #7e8ca0;
    --woot--surface: #0d131c;
    --woot--surface-raised: #131b26;
  }
  .woot-widget-wrap iframe {
    border-radius: 16px !important;
    box-shadow: 0 0 40px -8px rgba(0,217,255,0.15), 0 8px 32px -4px rgba(0,0,0,0.5) !important;
    border: 1px solid rgba(0,217,255,0.15) !important;
    overflow: hidden !important;
  }
  .woot-widget-holder {
    border-radius: 16px !important;
    bottom: 100px !important;
    right: 24px !important;
  }
`;

let sdkLoaded = false;

export function useChatwoot() {
  const isOpen = useRef(false);

  useEffect(() => {
    if (sdkLoaded) return;

    if (!document.getElementById('chatwoot-page-styles')) {
      const style = document.createElement('style');
      style.id = 'chatwoot-page-styles';
      style.textContent = `.woot--bubble-holder { display: none !important; }`;
      document.head.appendChild(style);
    }

    window.chatwootSettings = {
      position: 'right',
      type: 'standard',
      launcherTitle: '',
      css: CHATWOOT_CSS,
    };

    const existing = document.querySelector('script[src*="chatwoot.com/packs/js/sdk.js"]');
    if (existing) {
      sdkLoaded = true;
      return;
    }

    const script = document.createElement('script');
    script.src = `${CHATWOOT_URL}/packs/js/sdk.js`;
    script.async = true;
    script.onload = () => {
      if (window.chatwootSDK) {
        window.chatwootSDK.run({
          websiteToken: WEBSITE_TOKEN,
          baseUrl: CHATWOOT_URL,
        });
        sdkLoaded = true;
      }
    };
    script.onerror = () => {
      console.warn('Chatwoot SDK failed to load');
    };
    document.head.appendChild(script);

    return () => {
      sdkLoaded = false;
    };
  }, []);

  const toggle = useCallback(() => {
    if (window.$chatwoot) {
      window.$chatwoot.toggle();
      isOpen.current = !isOpen.current;
    }
  }, []);

  const open = useCallback(() => {
    if (window.$chatwoot && !window.$chatwoot.isOpen) {
      window.$chatwoot.toggle();
      isOpen.current = true;
    }
  }, []);

  const close = useCallback(() => {
    if (window.$chatwoot && window.$chatwoot.isOpen) {
      window.$chatwoot.toggle();
      isOpen.current = false;
    }
  }, []);

  return { toggle, open, close, isOpen };
}
