import { computeSierpinskiRemoved } from '../utils/sierpinskiRemovedMath';
import { computeTriangular } from '../utils/triangularMath';
import { computeSquareOddLayers } from '../utils/squareOddLayersMath';
import { computeFibonacciTiling, FIB_NUMBERS } from '../utils/fibonacciTilingMath';
import { computeFibonacciSpiral } from '../utils/fibonacciSpiralMath';
import { GOLDEN_RATIO } from '../data/fibonacciSpiralData';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

console.log('--- Testing Proof 184: Sierpinski Removed Square Sum ---');
for (let n = 1; n <= 4; n++) {
  const res = computeSierpinskiRemoved(n);
  const expectedHoles = Math.round((Math.pow(8, n) - 1) / 7);
  assert(res.cumulativeHoles === expectedHoles, `Step ${n}: expected ${expectedHoles} cumulative holes, got ${res.cumulativeHoles}`);
  assert(res.holes.length === expectedHoles, `Step ${n}: expected ${expectedHoles} hole objects, got ${res.holes.length}`);
  assert(res.steps.length === n, `Step ${n}: expected ${n} step rows`);
}
console.log('? Proof 184 math passed!');

console.log('--- Testing Proof 186: Triangular Numbers ---');
for (let n = 1; n <= 8; n++) {
  const res = computeTriangular(n);
  const expectedTn = (n * (n + 1)) / 2;
  assert(res.tn === expectedTn, `n=${n}: expected Tn=${expectedTn}, got ${res.tn}`);
  assert(res.rectWidth === n + 1, `n=${n}: rectWidth should be ${n + 1}`);
  assert(res.rectHeight === n, `n=${n}: rectHeight should be ${n}`);
  assert(res.originalDots.length === expectedTn, `n=${n}: original dots count should be ${expectedTn}`);
  assert(res.duplicateDots.length === expectedTn, `n=${n}: duplicate dots count should be ${expectedTn}`);
  assert(res.rectDots === n * (n + 1), `n=${n}: rectDots should be ${n * (n + 1)}`);
}
console.log('? Proof 186 math passed!');

console.log('--- Testing Proof 187: Square Numbers from Odd Layers ---');
for (let n = 1; n <= 7; n++) {
  const res = computeSquareOddLayers(n);
  const expectedSquare = n * n;
  assert(res.totalArea === expectedSquare, `n=${n}: expected ${expectedSquare} total area, got ${res.totalArea}`);
  assert(res.tiles.length === expectedSquare, `n=${n}: expected ${expectedSquare} tiles, got ${res.tiles.length}`);
  const oddStep = 2 * n - 1;
  const currentLayer = res.layers[n - 1];
  assert(currentLayer.oddValue === oddStep, `Layer ${n}: expected oddValue ${oddStep}, got ${currentLayer.oddValue}`);
  assert(res.latestLayerTilesCount === oddStep, `Layer ${n}: expected latestLayerTilesCount ${oddStep}, got ${res.latestLayerTilesCount}`);
}
console.log('? Proof 187 math passed!');

console.log('--- Testing Proof 188: Fibonacci Sequence by Tiling ---');
for (let n = 1; n <= 7; n++) {
  const res = computeFibonacciTiling(n);
  const fn = FIB_NUMBERS[n - 1];
  const fnPlus1 = FIB_NUMBERS[n];
  const expectedArea = fn * fnPlus1;
  assert(res.totalRectArea === expectedArea, `n=${n}: expected outer area ${expectedArea}, got ${res.totalRectArea}`);
  assert(res.sumOfSquares === expectedArea, `n=${n}: sum of squares ${res.sumOfSquares} should equal rect area ${expectedArea}`);
  assert(res.squares.length === n, `n=${n}: expected ${n} squares`);
}
console.log('? Proof 188 math passed!');

console.log('--- Testing Proof 189: Fibonacci Spiral Approximation ---');
for (let n = 1; n <= 7; n++) {
  const res = computeFibonacciSpiral(n);
  assert(res.arcs.length === n, `n=${n}: expected ${n} arcs`);
  
  // Verify continuous tip-to-tail arc connectivity
  for (let i = 0; i < res.arcs.length - 1; i++) {
    const arcCurr = res.arcs[i];
    const arcNext = res.arcs[i + 1];
    assert(
      arcCurr.endX === arcNext.startX && arcCurr.endY === arcNext.startY,
      `Arc ${i + 1} end (${arcCurr.endX}, ${arcCurr.endY}) must match Arc ${i + 2} start (${arcNext.startX}, ${arcNext.startY})`
    );
  }
}
const spiral7 = computeFibonacciSpiral(7);
assert(spiral7.currentRatio === 1.6154, `Ratio at n=7 should be 1.6154`);
assert(spiral7.currentError < 0.003, `Error at n=7 should be < 0.003`);
console.log('? Proof 189 math passed!');

console.log('\n========================================');
console.log('ALL MATHEMATICAL PROOFS (184, 186-189) VERIFIED!');
console.log('========================================');
