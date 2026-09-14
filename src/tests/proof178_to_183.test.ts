import { computeNaturalSum } from '../utils/naturalSumMath';
import { computeOddSum } from '../utils/oddSumMath';
import { computeAPSum } from '../utils/apSumMath';
import { computeGPScaling } from '../utils/gpScalingMath';
import { computeGPSum } from '../utils/gpSumMath';
import { computeSierpinski } from '../utils/sierpinskiMath';

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(`Assertion failed: ${msg}`);
}

console.log('--- Running Tests for Proofs 178 to 183 ---');

// --- PROOF 178: Sum of First n Natural Numbers ---
const n5 = computeNaturalSum(5);
assert(n5.n === 5, 'n should be 5');
assert(n5.triangleSum === 15, 'Sum of 1..5 is 15');
assert(n5.rectangleTotalDots === 30, 'Rectangle total dots is 5 * 6 = 30');
assert(n5.originalDots.length === 15, 'Copy 1 dots count is 15');
assert(n5.duplicateDots.length === 15, 'Copy 2 dots count is 15');
assert(n5.originalDots.length + n5.duplicateDots.length === n5.rectangleTotalDots, 'Twin copies combine to exact rectangle');

const n10 = computeNaturalSum(10);
assert(n10.triangleSum === 55, 'Sum of 1..10 is 55');
assert(n10.rectangleTotalDots === 110, 'Rectangle dots is 10 * 11 = 110');
console.log('✓ Proof 178 (Sum of First n Natural Numbers) tests passed!');

// --- PROOF 179: Sum of First n Odd Numbers ---
const odd4 = computeOddSum(4);
assert(odd4.n === 4, 'n should be 4');
assert(odd4.totalSum === 16, 'Sum of 1+3+5+7 is 16');
assert(odd4.layers.length === 4, 'There are 4 gnomon layers');
assert(odd4.layers[0].oddValue === 1, 'Layer 1 odd value is 1');
assert(odd4.layers[1].oddValue === 3, 'Layer 2 odd value is 3');
assert(odd4.layers[2].oddValue === 5, 'Layer 3 odd value is 5');
assert(odd4.layers[3].oddValue === 7, 'Layer 4 odd value is 7');

const odd8 = computeOddSum(8);
assert(odd8.totalSum === 64, 'Sum of first 8 odds is 64');
assert(odd8.blocks.length === 64, '64 individual grid blocks created');
console.log('✓ Proof 179 (Sum of First n Odd Numbers) tests passed!');

// --- PROOF 180: Sum of Arithmetic Progression ---
// a = 3, d = 4, n = 5 -> terms: 3, 7, 11, 15, 19
const ap5 = computeAPSum(3, 4, 5);
assert(ap5.columns.length === 5, '5 terms in AP');
assert(ap5.lastTermL === 19, 'Last term l = 3 + 4*4 = 19');
assert(ap5.pairSumConst === 22, 'Constant sum pair a + l = 3 + 19 = 22');
assert(ap5.totalSumSn === 55, 'Sum of 3+7+11+15+19 = 55');
assert(ap5.rectangleArea === 110, 'Twin stack sum = 55 * 2 = 110');
assert(ap5.columns.every(p => p.pairSum === 22), 'All stacked twin pairs form a flat ceiling at 22');
console.log('✓ Proof 180 (Sum of Arithmetic Progression) tests passed!');

// --- PROOF 181: Geometric Progression as Repeated Scaling ---
// a = 2, r = 3, n = 4 -> terms: 2, 6, 18, 54
const gpScale = computeGPScaling(2, 3, 4);
assert(gpScale.terms.length === 4, '4 terms generated');
assert(gpScale.terms[0].value === 2, 'Term 1 is 2');
assert(gpScale.terms[1].value === 6, 'Term 2 is 6');
assert(gpScale.terms[2].value === 18, 'Term 3 is 18');
assert(gpScale.terms[3].value === 54, 'Term 4 is 54');
assert(gpScale.maxVal === 54, 'maxVal is 54');

// r = 0.5 (decay)
const gpDecay = computeGPScaling(16, 0.5, 4);
assert(gpDecay.terms[3].value === 2, '16 * 0.5³ = 2');
console.log('✓ Proof 181 (GP Repeated Scaling) tests passed!');

// --- PROOF 182: Sum of Finite Geometric Series ---
// a = 1, r = 2, n = 4 -> 1 + 2 + 4 + 8 = 15
const gpSum2 = computeGPSum(1, 2, 4);
assert(gpSum2.sumSn === 15, 'Sum of 1+2+4+8 is 15');
assert(gpSum2.headTermVal === 1, 'Head retained is 1');
assert(gpSum2.tailTermVal === 16, 'Tail retained is 16');
assert(gpSum2.differenceVal === -15, 'S - rS = 15 - 30 = -15');
const canceledCount = gpSum2.terms.filter(t => t.isCanceled).length;
assert(canceledCount === 3, 'Middle 3 terms cancel out');

// r = 0.5, a = 1, n = 3 -> 1 + 0.5 + 0.25 = 1.75
const gpSumFrac = computeGPSum(1, 0.5, 3);
assert(Math.abs(gpSumFrac.sumSn - 1.75) < 1e-9, 'Sum of 1 + 0.5 + 0.25 is 1.75');
console.log('✓ Proof 182 (Sum of Finite Geometric Series) tests passed!');

// --- PROOF 183: Sierpinski Carpet Retained Area ---
const s0 = computeSierpinski(0);
assert(s0.retainedSquareCount === 1, 'Level 0 has 1 square');
assert(s0.retainedAreaFraction === 1.0, 'Level 0 area is 1.0');
assert(s0.holes.length === 0, 'Level 0 has 0 holes');

const s1 = computeSierpinski(1);
assert(s1.retainedSquareCount === 8, 'Level 1 has 8 squares');
assert(Math.abs(s1.retainedAreaFraction - 8/9) < 1e-9, 'Level 1 retained area is 8/9');
assert(s1.holes.length === 1, 'Level 1 has 1 center hole');

const s2 = computeSierpinski(2);
assert(s2.retainedSquareCount === 64, 'Level 2 has 64 squares');
assert(Math.abs(s2.retainedAreaFraction - 64/81) < 1e-9, 'Level 2 retained area is 64/81');
assert(s2.holes.length === 1 + 8, 'Level 2 has 1 + 8 = 9 holes');

const s3 = computeSierpinski(3);
assert(s3.retainedSquareCount === 512, 'Level 3 has 512 squares');
assert(Math.abs(s3.retainedAreaFraction - Math.pow(8/9, 3)) < 1e-9, 'Level 3 area is (8/9)³');
assert(s3.holes.length === 1 + 8 + 64, 'Level 3 has 1 + 8 + 64 = 73 holes');

console.log('✓ Proof 183 (Sierpinski Carpet Retained Area) tests passed!');
console.log('=== All Tests for Proofs 178 to 183 PASSED! ===');