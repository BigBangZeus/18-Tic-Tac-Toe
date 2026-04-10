// This file contains type declarations for modules that don't have their own type definitions

// If @types/webfontloader doesn't fully cover the module
declare module 'webfontloader' {
  interface WebFontConfig {
    google?: {
      families: string[];
    };
    // Add other configuration options as needed
  }

  function load(config: WebFontConfig): void;
}

// If @types/howler doesn't fully cover the module
declare module 'howler' {
  export class Howl {
    constructor(options: {
      src: string[];
      volume?: number;
      loop?: boolean;
      autoplay?: boolean;
      onloaderror?: (id: number, error: unknown) => void;
      onplayerror?: (id: number, error: unknown) => void;
      // Add other options as needed
    });
    
    play(): number;
    pause(id?: number): this;
    stop(id?: number): this;
    // Add other methods as needed
  }
}
