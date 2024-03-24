export function float() {
  try {
    const values = crypto.getRandomValues(new Int32Array(1));
    const buffer = values.buffer;
    return new DataView(buffer).getUint32(0);
  } catch(e) {
    return Math.random();
  }
}

export function number(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(float() * (max - min)) + min;
}

export function uuid() {
  try {
    return crypto.randomUUID();
  } catch(e) {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = float() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
