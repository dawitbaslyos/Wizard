
import { LibraryItem, ManifestedWork } from './types';

export const WIZARD_LIBRARIES: LibraryItem[] = [
  {
    book: 'Book of Picture',
    spell: 'invoke book of picture',
    description: 'Initializes the 2D canvas for creation.',
    example: 'invoke book of picture'
  },
  {
    book: 'Book of Picture',
    spell: 'enchant background [color]',
    description: 'Sets the void color.',
    example: 'enchant background "black"'
  },
  {
    book: 'Book of Picture',
    spell: 'conjure circle at [x] [y] size [r] color [c]',
    description: 'Creates a circular form.',
    example: 'conjure circle at 200 200 size 50 color "white"'
  },
  {
    book: 'Book of Ether',
    spell: 'invoke book of ether',
    description: 'Grants access to the 3rd dimension and time-based magic.',
    example: 'invoke book of ether'
  },
  {
    book: 'Book of Ether',
    spell: 'manifest cube at [x] [y] [z] size [s] color [c]',
    description: 'Solidifies a cubic form in 3D space.',
    example: 'manifest cube at 200 200 0 size 100 color "white"'
  },
  {
    book: 'Book of Ether',
    spell: 'conjure sphere at [x] [y] [z] size [r] color [c]',
    description: 'Creates a spherical essence in 3D space.',
    example: 'conjure sphere at 200 200 0 size 50 color "blue"'
  },
  {
    book: 'Book of Ether',
    spell: 'transmute spin [speed]',
    description: 'Enchants the world to rotate continuously. Enables .mp4 export.',
    example: 'transmute spin 0.02'
  },
  {
    book: 'General Alchemy',
    spell: 'transmute opacity [0-1]',
    description: 'Changes the transparency of future conjurations.',
    example: 'transmute opacity 0.5'
  }
];

export const INITIAL_CODE = `invoke book of ether

enchant background "black"

// The Spinning Pulsar
transmute spin 0.01

transmute opacity 0.1
manifest cube at 200 200 0 size 180 color "#4f46e5"
manifest cube at 200 200 0 size 140 color "#818cf8"
manifest cube at 200 200 0 size 100 color "#c7d2fe"

transmute opacity 0.4
conjure sphere at 200 200 80 size 15 color "white"
conjure sphere at 200 200 -80 size 15 color "white"
conjure sphere at 280 200 0 size 15 color "white"
conjure sphere at 120 200 0 size 15 color "white"

transmute opacity 0.03
conjure sphere at 200 200 0 size 220 color "white"

transmute opacity 0.8
scribble text "ETHER CORE ACTIVATED" at 120 380 color "#818cf8"
`;

export const MOCK_LIBRARY_WORKS: ManifestedWork[] = [
  {
    id: '1',
    title: 'Void Singularity',
    author: 'Archmage Zephyr',
    timestamp: '3 days ago',
    code: `invoke book of ether\nenchant background "black"\ntransmute spin 0.05\nconjure sphere at 200 200 0 size 100 color "white"`
  },
  {
    id: '2',
    title: 'Neon Glyphs',
    author: 'Mystic Luna',
    timestamp: '1 week ago',
    code: `invoke book of picture\nenchant background "#050505"\nconjure circle at 200 200 size 150 color "#00ffcc"`
  }
];

export const MOCK_MY_WORKS: ManifestedWork[] = [
  {
    id: '3',
    title: 'My First Ritual',
    author: 'Self',
    timestamp: 'Today',
    code: INITIAL_CODE
  }
];
