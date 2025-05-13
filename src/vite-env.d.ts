
/// <reference types="vite/client" />

// Add Spline Viewer type definitions
declare namespace JSX {
  interface IntrinsicElements {
    'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      url: string;
      'background-color'?: string;
      'loading-indicator-color'?: string;
    };
  }
}
