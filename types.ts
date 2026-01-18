
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

export type View = 'editor' | 'library' | 'my-works';

export interface User {
  id: string;
  name: string;
  isLoggedIn: boolean;
}

export interface ManifestedWork {
  id: string;
  title: string;
  author: string;
  code: string;
  timestamp: string;
}
