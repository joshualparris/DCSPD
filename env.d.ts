declare global {
  var process: {
    env: Record<string, string | undefined>;
    cwd: () => string;
    nextTick: (callback: () => void) => void;
    exit: (code?: number) => never;
    argv: string[];
    version: string;
    versions: Record<string, string>;
  };
}

declare module 'fs/promises' {
  export function mkdir(path: string, options?: { recursive?: boolean }): Promise<void>;
  export function readFile(path: string, encoding: string): Promise<string>;
  export function writeFile(path: string, data: string, encoding: string): Promise<void>;
}

declare module 'node:fs/promises' {
  export * from 'fs/promises';
}

declare module 'path' {
  export function dirname(p: string): string;
  export function join(...paths: string[]): string;
}

declare module 'node:path' {
  export * from 'path';
}
