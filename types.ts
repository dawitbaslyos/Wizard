
export interface Command {
  type: 'invoke' | 'enchant' | 'conjure' | 'manifest' | 'cast' | 'scribble' | 'transmute' | 'spin' | 'unknown';
  args: any[];
}

export interface RenderState {
  background: string;
  opacity: number;
  commands: Command[];
  errors: string[];
  activeBook: 'picture' | 'ether' | 'none';
}

export interface LibraryItem {
  book: string;
  spell: string;
  description: string;
  example: string;
}

export type Theme = 'dark' | 'light';
