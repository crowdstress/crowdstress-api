import { createCanvas } from 'canvas';
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import Jimp from 'jimp';

import {
  DEFAULT_GRID_SIZE,
  GRID_COLOR,
  GRID_LINE_WIDTH,
  HUMAN_PANIC_HSL,
  HUMAN_SIZE,
  OBJECT_COLOR,
  OBJECT_LINE_WIDTH,
  THUMBNAIL_SCALING_FACTOR
} from '@/config';
import { LayerSize } from '@/models/layer';
import { ProjectData } from '@/models/project';

const imageminPngquantPlugin = imageminPngquant({ quality: [.3, .5] });

const jimpToBuffer = (image: Jimp): Promise<Buffer> => {
  return new Promise(resolve => {
    image.getBuffer(Jimp.MIME_PNG, (err, value) => {
      resolve(value);
    });
  });
};

export const getProjectThumbnail = async (data: ProjectData, layerSize: LayerSize): Promise<Buffer> => {
  const {
    height,
    width,
  } = layerSize;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  /* Grid drawing */
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR;
  ctx.lineWidth = GRID_LINE_WIDTH;

  for (let i = 0; i < width; i += DEFAULT_GRID_SIZE) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height);
  }

  for (let i = 0; i < height; i += DEFAULT_GRID_SIZE) {
    ctx.moveTo(0, i);
    ctx.lineTo(width, i);
  }

  ctx.stroke();
  ctx.closePath();
  /* End of grid drawing */

  /* Objects drawing */
  ctx.strokeStyle = OBJECT_COLOR;
  ctx.lineWidth = OBJECT_LINE_WIDTH;

  const {
    humans,
    objects,
  } = data;

  objects.forEach(object => {
    ctx.beginPath();

    const {
      type,
      points,
    } = object;

    if (type === 'line') {
      const [point1, point2] = points;
      const {
        x: x1,
        y: y1,
      } = point1;
      const {
        x: x2,
        y: y2,
      } = point2;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    if (type === 'rect') {
      const [point1, point2] = points;
      const {
        x: x1,
        y: y1,
      } = point1;
      const {
        x: x2,
        y: y2,
      } = point2;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const x = dx > 0 ? x1 : x2;
      const y = dy > 0 ? y1 : y2;
      const width = Math.abs(dx);
      const height = Math.abs(dy);
      ctx.strokeRect(x, y, width, height);
    }

    ctx.closePath();
  });
  /* End of objects drawing */

  /* Humans drawing */
  humans.forEach(human => {
    const {
      coords,
      panic,
    } = human;
    const {
      x,
      y,
    } = coords;
    const {
      H,
      S,
      L,
    } = HUMAN_PANIC_HSL;

    ctx.beginPath();
    ctx.fillStyle = `hsl(${H - 100 / H * panic}, ${S}, ${L})`;
    ctx.ellipse(x, y, HUMAN_SIZE, HUMAN_SIZE, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  });
  /* End of humans drawing */

  const buffer = canvas.toBuffer();
  const image = await Jimp.read(buffer);
  image.resize(image.getWidth() * THUMBNAIL_SCALING_FACTOR, image.getHeight() * THUMBNAIL_SCALING_FACTOR);

  const result = await jimpToBuffer(image);
  return await imagemin.buffer(result, { plugins: [ imageminPngquantPlugin ] });
};
