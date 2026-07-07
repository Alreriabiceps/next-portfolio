import React, { useEffect, useRef, useState } from 'react';
import { fetchSitePreviewImageUrl, getSitePreviewImageUrl } from '../utils/sitePreview';

type SitePreviewImageProps = {
  siteUrl: string;
  alt: string;
  fallbackSrc: string;
  className?: string;
  imageRef?: React.Ref<HTMLImageElement>;
};

const SitePreviewImage: React.FC<SitePreviewImageProps> = ({
  siteUrl,
  alt,
  fallbackSrc,
  className,
  imageRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    const loadPreview = async () => {
      setStatus('loading');

      try {
        const previewUrl = await fetchSitePreviewImageUrl(siteUrl);
        if (cancelled) return;

        if (previewUrl) {
          setSrc(previewUrl);
          return;
        }

        setSrc(getSitePreviewImageUrl(siteUrl));
      } catch {
        if (!cancelled) {
          setSrc(getSitePreviewImageUrl(siteUrl));
        }
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        void loadPreview();
      },
      { rootMargin: '240px 0px' }
    );

    observer.observe(container);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [siteUrl]);

  const handleLoad = () => setStatus('ready');
  const handleError = () => {
    if (src !== fallbackSrc) {
      setSrc(fallbackSrc);
      setStatus('loading');
      return;
    }

    setStatus('error');
  };

  return (
    <div ref={containerRef} className="absolute inset-0">
      {status !== 'ready' && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
      )}
      {src && (
        <img
          ref={imageRef}
          data-design-image
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={className}
        />
      )}
    </div>
  );
};

export default SitePreviewImage;
