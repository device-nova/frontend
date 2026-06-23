import { useEffect, useRef } from 'react';

export default function TurnstileWidget({ onVerify, onError }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onVerifyRef = useRef(onVerify);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onVerifyRef.current = onVerify;
    onErrorRef.current = onError;
  });

  useEffect(() => {
    let script = document.querySelector(
      'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );

    function renderWidget() {
      if (!containerRef.current || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
        callback: (token) => onVerifyRef.current?.(token),
        'error-callback': (err) => onErrorRef.current?.(err),
        'expired-callback': () => onVerifyRef.current?.(null),
      });
    }

    if (window.turnstile) {
      renderWidget();
    } else if (!script) {
      script = document.createElement('script');
      script.src =
        'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=cfTurnstileOnLoad';
      script.async = true;
      script.defer = true;
      window.cfTurnstileOnLoad = renderWidget;
      document.head.appendChild(script);
    } else {
      script.addEventListener('load', renderWidget);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  return <div ref={containerRef} />;
}
