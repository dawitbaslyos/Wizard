
import { RenderState } from '../types';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

const project = (p: Point3D, angle: number, centerX: number, centerY: number) => {
  // Simple rotation around Y and X axis
  const rad = angle;
  let { x, y, z } = p;

  // Center to origin for rotation
  x -= centerX;
  y -= centerY;

  // Rotate Y
  const x1 = x * Math.cos(rad) - z * Math.sin(rad);
  const z1 = x * Math.sin(rad) + z * Math.cos(rad);

  // Rotate X
  const y2 = y * Math.cos(rad * 0.5) - z1 * Math.sin(rad * 0.5);
  const z2 = y * Math.sin(rad * 0.5) + z1 * Math.cos(rad * 0.5);

  // Simple Perspective
  const fov = 400;
  const factor = fov / (fov + z2);
  
  return {
    x: x1 * factor + centerX,
    y: y2 * factor + centerY,
    scale: factor
  };
};

export const renderToCanvas = (ctx: CanvasRenderingContext2D, state: RenderState, width: number, height: number, time: number = 0) => {
  ctx.clearRect(0, 0, width, height);
  const scaleCanvas = width / 400;
  ctx.save();
  ctx.scale(scaleCanvas, scaleCanvas);

  ctx.fillStyle = state.background;
  ctx.fillRect(0, 0, 400, 400);

  let globalRotation = 0;
  const spinCmd = state.commands.find(c => c.type === 'spin');
  if (spinCmd) {
    globalRotation = time * spinCmd.args[0];
  }

  state.commands.forEach(cmd => {
    ctx.beginPath();
    ctx.globalAlpha = 1.0;

    switch (cmd.type) {
      case 'conjure': {
        if (state.activeBook === 'ether') {
          const [x, y, z, r, color, opacity] = cmd.args;
          const p = project({ x, y, z }, globalRotation, 200, 200);
          ctx.globalAlpha = opacity;
          ctx.fillStyle = color;
          ctx.arc(p.x, p.y, r * p.scale, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const [x, y, r, color, opacity] = cmd.args;
          ctx.globalAlpha = opacity;
          ctx.fillStyle = color;
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }
      case 'manifest': {
        if (state.activeBook === 'ether') {
          const [x, y, z, s, color, opacity] = cmd.args;
          const half = s / 2;
          const points: Point3D[] = [
            {x: x-half, y: y-half, z: z-half}, {x: x+half, y: y-half, z: z-half},
            {x: x+half, y: y+half, z: z-half}, {x: x-half, y: y+half, z: z-half},
            {x: x-half, y: y-half, z: z+half}, {x: x+half, y: y-half, z: z+half},
            {x: x+half, y: y+half, z: z+half}, {x: x-half, y: y+half, z: z+half}
          ];
          const projected = points.map(p => project(p, globalRotation, 200, 200));
          
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;

          const drawEdge = (i: number, j: number) => {
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          };

          [0,1,2,3].forEach(i => drawEdge(i, (i+1)%4));
          [4,5,6,7].forEach(i => drawEdge(i, 4 + (i+1)%4));
          [0,1,2,3].forEach(i => drawEdge(i, i+4));
        } else {
          const [x, y, s, color, opacity] = cmd.args;
          ctx.globalAlpha = opacity;
          ctx.fillStyle = color;
          ctx.fillRect(x, y, s, s);
        }
        break;
      }
      case 'cast': {
        const [x1, y1, x2, y2, color, widthLine, opacity] = cmd.args;
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = color;
        ctx.lineWidth = widthLine;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        break;
      }
      case 'scribble': {
        const [text, x, y, color, opacity] = cmd.args;
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.font = '12px MedievalSharp, serif';
        ctx.fillText(text, x, y);
        break;
      }
    }
  });
  
  ctx.restore();
  ctx.globalAlpha = 1.0;
};
