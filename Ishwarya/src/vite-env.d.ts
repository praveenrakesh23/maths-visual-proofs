/// <reference types="vite/client" />

declare module 'react-katex' {
  import * as React from 'react';
  export interface MathProps {
    math?: string;
    children?: string;
    errorColor?: string;
    renderError?: (error: Error | TypeError) => React.ReactNode;
    settings?: Record<string, unknown>;
  }
  export const InlineMath: React.FC<MathProps>;
  export const BlockMath: React.FC<MathProps>;
}

