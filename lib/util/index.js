/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
export function isObject(obj) {
  return obj === Object(obj);
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
export function looseEqual(a, b) {
  // eslint-disable-next-line eqeqeq
  return a == b || (
    isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false
  );
}

/**
 * Transform first letter to uppercase
 */
export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Check if objects keys length equal to zero,
 * then object is empty
 */
export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
