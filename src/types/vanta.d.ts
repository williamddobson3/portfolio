declare global {
  interface Window {
    THREE: any;
    VANTA: {
      CLOUDS: (options: any) => any;
    };
  }
}

export {};
