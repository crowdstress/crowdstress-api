// export const {
//   APP_PORT,
//   SESSIONS_SECRET,
// } = process.env;
export const APP_PORT = 8000;
export const SESSIONS_SECRET = 'lol';
export const SALT_ROUNDS = 10;

export const BUCKET_NAME = 'thumbnails';
export const BUCKET_REGION = 'eu-central-1';

export const DEFAULT_GRID_SIZE = 21 * 4;
export const GRID_COLOR = '#f6f6f6';
export const GRID_LINE_WIDTH = 4;
export const OBJECT_COLOR = '#000000';
export const OBJECT_LINE_WIDTH = 6;
export const HUMAN_SIZE = 10;
export const HUMAN_PANIC_HSL = {
  H: 120,
  L: '45%',
  S: '100%',
};

export const THUMBNAIL_SCALING_FACTOR = .33;
