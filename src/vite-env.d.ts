/// <reference types="vite/client" />

interface Window {
  botpressWebChat?: {
    sendEvent: (event: { type: string }) => void;
  };
}