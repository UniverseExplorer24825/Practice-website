export const lerp = (start, end, factor) => {
  return start + (end - start) * factor;
};

export const clamp = (val, min, max) => {
  return Math.max(min, Math.min(max, val));
};

export const mapRange = (value, inMin, inMax, outMin, outMax) => {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
};

