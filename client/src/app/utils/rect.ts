export interface RectLayout {
  area: number;
  cols: number;
  rows: number;
  width: number;
  height: number;
};

export interface RectLayoutOptions {
  count: number;
  width: number;
  height: number;
  aspectRatio?: number;
};

/**
 * Finds the largest rectangle area when trying to place N rectangle into a containing
 * rectangle without rotation.
 *
 * @param count               How many rectangles must fit within.
 * @param width               The width of the container.
 * @param height              The height of the container.
 * @param aspectRatio         The aspect ratio of the rectangles to be placed.
 * @return                    The area and number of rows and columns that fit.
 */
export function getRectLayout(opts: RectLayoutOptions): RectLayout {
  const aspectRatio = opts.aspectRatio || 1;
  if (Number.isNaN(aspectRatio))
    throw new Error('Aspect ratio must be a number');
  if (opts.width < 0 || opts.height < 0)
    throw new Error('Container must have a non-negative area');
  if (opts.count < 1 || !Number.isInteger(opts.count))
    throw new Error('Number of shapes to place must be a positive integer');

  let best: RectLayout = {area: 0, cols: 0, rows: 0, width: 0, height: 0};
  const colsStart = opts.count; //Math.ceil(Math.sqrt(opts.count * (opts.width / opts.height) / aspectRatio));
  const colDelta = -1;
  
  for (let cols = colsStart; cols > 0; cols += colDelta) {
    const rows = Math.ceil(opts.count / cols);
    const scaleH = opts.width / (cols * aspectRatio);
    const scaleV = opts.height / rows;
    let width: number;
    let height: number;
    if (scaleH <= scaleV) {
      width = opts.width / cols;
      height = width / aspectRatio;
    } else {
      height = opts.height / rows;
      width = height * aspectRatio;
    }
    const area = width * height;
    if (area > best.area) {
      best = {area, width, height, rows, cols};
    }
  }

  return best;
}
