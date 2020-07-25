export function getBit(number: number, bitPosition: number) {
  return (number & (1 << bitPosition)) === 0 ? 0 : 1;
}
export function setBit(number: number, bitPosition: number) {
  return number | (1 << bitPosition);
}
function clearBit(number: number, bitPosition: number) {
  const mask = ~(1 << bitPosition);
  return number & mask;
}
export function updateBit(number: number, bitPosition: number, bitValue: 0 | 1) {
  const bitValueNormalized = bitValue ? 1 : 0;
  const clearMask = ~(1 << bitPosition);
  return (number & clearMask) | (bitValueNormalized << bitPosition);
}