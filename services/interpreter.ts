
import { Command, RenderState } from '../types';

export const parseWizardCode = (code: string): RenderState => {
  const lines = code.split('\n');
  const commands: Command[] = [];
  const errors: string[] = [];
  let background = '#000000';
  let currentOpacity = 1.0;
  let activeBook: 'picture' | 'ether' | 'none' = 'none';

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//')) return;

    const tokens = trimmed.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    if (tokens.length === 0) return;

    const action = tokens[0].toLowerCase();

    try {
      if (action === 'invoke') {
        if (trimmed.includes('book of picture')) {
          activeBook = 'picture';
          commands.push({ type: 'invoke', args: ['picture'] });
        } else if (trimmed.includes('book of ether')) {
          activeBook = 'ether';
          commands.push({ type: 'invoke', args: ['ether'] });
        } else {
          errors.push(`Line ${index + 1}: Unknown book.`);
        }
      } else if (activeBook === 'none') {
        errors.push(`Line ${index + 1}: You must invoke a book first.`);
      } else if (action === 'enchant') {
        if (tokens[1]?.toLowerCase() === 'background') {
          background = tokens[2].replace(/"/g, '');
        }
      } else if (action === 'transmute') {
        if (tokens[1]?.toLowerCase() === 'opacity') {
          currentOpacity = parseFloat(tokens[2]);
        } else if (tokens[1]?.toLowerCase() === 'spin') {
          commands.push({ type: 'spin', args: [parseFloat(tokens[2])] });
        }
      } else if (action === 'conjure') {
        if (tokens[1]?.toLowerCase() === 'circle' && activeBook === 'picture') {
          const x = parseFloat(tokens[3]);
          const y = parseFloat(tokens[4]);
          const r = parseFloat(tokens[6]);
          const color = tokens[8]?.replace(/"/g, '') || 'white';
          commands.push({ type: 'conjure', args: [x, y, r, color, currentOpacity] });
        } else if (tokens[1]?.toLowerCase() === 'sphere' && activeBook === 'ether') {
          const x = parseFloat(tokens[3]);
          const y = parseFloat(tokens[4]);
          const z = parseFloat(tokens[5]);
          const r = parseFloat(tokens[7]);
          const color = tokens[9]?.replace(/"/g, '') || 'white';
          commands.push({ type: 'conjure', args: [x, y, z, r, color, currentOpacity] });
        }
      } else if (action === 'manifest') {
        if (tokens[1]?.toLowerCase() === 'square' && activeBook === 'picture') {
          const x = parseFloat(tokens[3]);
          const y = parseFloat(tokens[4]);
          const s = parseFloat(tokens[6]);
          const color = tokens[8]?.replace(/"/g, '') || 'white';
          commands.push({ type: 'manifest', args: [x, y, s, color, currentOpacity] });
        } else if (tokens[1]?.toLowerCase() === 'cube' && activeBook === 'ether') {
          const x = parseFloat(tokens[3]);
          const y = parseFloat(tokens[4]);
          const z = parseFloat(tokens[5]);
          const s = parseFloat(tokens[7]);
          const color = tokens[9]?.replace(/"/g, '') || 'white';
          commands.push({ type: 'manifest', args: [x, y, z, s, color, currentOpacity] });
        }
      } else if (action === 'cast') {
        const x1 = parseFloat(tokens[3]);
        const y1 = parseFloat(tokens[4]);
        const x2 = parseFloat(tokens[6]);
        const y2 = parseFloat(tokens[7]);
        const color = tokens[9]?.replace(/"/g, '') || 'white';
        const width = parseFloat(tokens[11]) || 1;
        commands.push({ type: 'cast', args: [x1, y1, x2, y2, color, width, currentOpacity] });
      } else if (action === 'scribble') {
        const text = tokens[2].replace(/"/g, '');
        const x = parseFloat(tokens[4]);
        const y = parseFloat(tokens[5]);
        const color = tokens[7]?.replace(/"/g, '') || 'white';
        commands.push({ type: 'scribble', args: [text, x, y, color, currentOpacity] });
      }
    } catch (e) {
      errors.push(`Line ${index + 1}: Syntax ritual failed.`);
    }
  });

  return { background, opacity: 1.0, commands, errors, activeBook };
};
