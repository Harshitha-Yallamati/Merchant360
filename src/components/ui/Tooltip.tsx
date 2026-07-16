import { useEffect, useState } from 'react';

export function Tooltip({ content, children }: { content: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [delayed, setDelayed] = useState(false);
  useEffect(() => {
    if (show) {
      const t = setTimeout(() => setDelayed(true), 300);
      return () => clearTimeout(t);
    }
    setDelayed(false);
  }, [show]);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      {show && delayed && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white shadow-lg dark:bg-gray-700"
        >
          {content}
        </span>
      )}
    </span>
  );
}
