import { computeMatrixInverse, multiplyMatrices, IDENTITY_MATRIX, Matrix2x2 } from '../utils/matricesMath';

function runTests() {
  console.log('--- Testing Proof 168: Matrix Transformations & Inverse ---');
  
  // Test 1: Identity Matrix
  const invIdentity = computeMatrixInverse(IDENTITY_MATRIX);
  if (!invIdentity.isInvertible) throw new Error('Identity matrix should be invertible');
  if (invIdentity.det !== 1) throw new Error('Identity det should be 1');
  console.log('✔ Identity matrix test passed');

  // Test 2: Invertible 2x2 Matrix:
  // [ a c ] = [ 1 2 ]
  // [ b d ] = [ 3 4 ]
  // det = a*d - b*c = 1*4 - 3*2 = -2
  const m: Matrix2x2 = { a: 1, b: 3, c: 2, d: 4 };
  const res = computeMatrixInverse(m);
  if (!res.isInvertible) throw new Error('Matrix should be invertible');
  if (res.det !== -2) throw new Error('Expected det -2, got ' + res.det);
  if (!res.inverse) throw new Error('Inverse should exist');
  
  const prod = multiplyMatrices(m, res.inverse);
  if (Math.abs(prod.a - 1) > 1e-4 || Math.abs(prod.b) > 1e-4 || Math.abs(prod.c) > 1e-4 || Math.abs(prod.d - 1) > 1e-4) {
    throw new Error('M * M^-1 did not yield Identity: ' + JSON.stringify(prod));
  }
  console.log('✔ Invertible matrix and M * M^-1 = Identity test passed');

  // Test 3: Singular Matrix (det = 0)
  // [ 2 4 ]
  // [ 1 2 ] -> det = 2*2 - 1*4 = 0
  const singular: Matrix2x2 = { a: 2, b: 1, c: 4, d: 2 };
  const resSingular = computeMatrixInverse(singular);
  if (resSingular.isInvertible) throw new Error('Singular matrix should NOT be invertible');
  if (resSingular.det !== 0) throw new Error('Expected det 0, got ' + resSingular.det);
  if (!resSingular.reasonNonInvertible) throw new Error('Reason non invertible should be present');
  console.log('✔ Singular matrix (det = 0) test passed');
  
  console.log('========================================');
  console.log('ALL PROOF 168 MATRIX TESTS PASSED!');
  console.log('========================================');
}
runTests();
