import { createRoot } from 'react-dom/client';
import { Menu } from 'lucide-react';
import './style.css';
import { DerivativeOfSineProofPage } from './proofs/derivative-of-sine/DerivativeOfSineProofPage';
import { runTests } from './proofs/derivative-of-sine/derivative-of-sine.test';
import { DivisibilityEqualGroupingProofPage } from './proofs/divisibility-equal-grouping/DivisibilityEqualGroupingProofPage';
import { runDivisibilityTests } from './proofs/divisibility-equal-grouping/divisibility-equal-grouping.test';
import { DivisibilityByElevenProofPage } from './proofs/divisibility-by-11/DivisibilityByElevenProofPage';
import { runDivisibilityBy11Tests } from './proofs/divisibility-by-11/divisibility-by-11.test';
import { DivisibilityBy3ProofPage } from './proofs/divisibility-by-3/DivisibilityBy3ProofPage';
import { runDivisibilityBy3Tests } from './proofs/divisibility-by-3/divisibility-by-3.test';
import { DivisibilityBy9ProofPage } from './proofs/divisibility-by-9/DivisibilityBy9ProofPage';
import { runDivisibilityBy9Tests } from './proofs/divisibility-by-9/divisibility-by-9.test';
import { EvenNumberSumProofPage } from './proofs/even-number-sum/EvenNumberSumProofPage';
import { runEvenNumberSumTests } from './proofs/even-number-sum/even-number-sum.test';
import { ExponentProductRuleProofPage } from './proofs/exponent-product-rule/ExponentProductRuleProofPage';
import { runExponentProductRuleTests } from './proofs/exponent-product-rule/exponent-product-rule.test';
import { ExponentQuotientRuleProofPage } from './proofs/exponent-quotient-rule/ExponentQuotientRuleProofPage';
import { runExponentQuotientRuleTests } from './proofs/exponent-quotient-rule/exponent-quotient-rule.test';
import { PowerOfAPowerRuleProofPage } from './proofs/power-of-a-power-rule/PowerOfAPowerRuleProofPage';
import { runPowerOfPowerRuleTests } from './proofs/power-of-a-power-rule/power-of-a-power-rule.test';
import { ZeroExponentRuleProofPage } from './proofs/zero-exponent-rule/ZeroExponentRuleProofPage';
import { runZeroExponentRuleTests } from './proofs/zero-exponent-rule/zero-exponent-rule.test';
import { NegativeExponentRuleProofPage } from './proofs/negative-exponent-rule/NegativeExponentRuleProofPage';
import { runNegativeExponentRuleTests } from './proofs/negative-exponent-rule/negative-exponent-rule.test';
import { ExteriorAngleSumPolygonProofPage } from './proofs/exterior-angle-sum-polygon/ExteriorAngleSumPolygonProofPage';
import { runExteriorAngleSumPolygonTests } from './proofs/exterior-angle-sum-polygon/exterior-angle-sum-polygon.test';
import { HeronsFormulaVisualProofPage } from './proofs/herons-formula-visual-proof/HeronsFormulaVisualProofPage';
import { runHeronsFormulaTests } from './proofs/herons-formula-visual-proof/herons-formula-visual-proof.test';
import { PyramidVolumeOneThirdProofPage } from './proofs/pyramid-volume-one-third/PyramidVolumeOneThirdProofPage';
import { runPyramidVolumeOneThirdTests } from './proofs/pyramid-volume-one-third/pyramid-volume-one-third.test';
import { ShoelaceFormulaProofPage } from './proofs/shoelace-formula/ShoelaceFormulaProofPage';
import { runShoelaceFormulaTests } from './proofs/shoelace-formula/shoelace-formula.test';

runTests();
runDivisibilityTests();
runDivisibilityBy11Tests();
runDivisibilityBy3Tests();
runDivisibilityBy9Tests();
runEvenNumberSumTests();
runExponentProductRuleTests();
runExponentQuotientRuleTests();
runPowerOfPowerRuleTests();
runZeroExponentRuleTests();
runNegativeExponentRuleTests();
runExteriorAngleSumPolygonTests();
runHeronsFormulaTests();
runPyramidVolumeOneThirdTests();
runShoelaceFormulaTests();

function MissingPage({ n }: { n: number }) {
  return (
    <main className="missing">
      <Menu />
      <h1>Visual Proof Page {n}</h1>
      <p>This visual proof page is not configured. Choose from the available proofs below:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
        <a href="/visual-proofs/1">Page 1: Derivative of sin x</a>
        <a href="/visual-proofs/2">Page 2: Divisibility as Equal Grouping</a>
        <a href="/visual-proofs/3">Page 3: Divisibility by 11</a>
        <a href="/visual-proofs/4">Page 4: Divisibility by 3</a>
        <a href="/visual-proofs/5">Page 5: Divisibility by 9</a>
        <a href="/visual-proofs/6">Page 6: Sum of First n Even Numbers</a>
      </div>
    </main>
  );
}

function App() {
  const path = location.pathname;

  // Named routes
  if (path === '/visual-proofs/calculus/derivative-of-sine') {
    return <DerivativeOfSineProofPage />;
  }
  if (path === '/visual-proofs/number-theory/divisibility-equal-grouping') {
    return <DivisibilityEqualGroupingProofPage />;
  }
  if (path === '/visual-proofs/number-theory/divisibility-by-11') {
    return <DivisibilityByElevenProofPage />;
  }
  if (path === '/visual-proofs/number-theory/divisibility-by-3') {
    return <DivisibilityBy3ProofPage />;
  }
  if (path === '/visual-proofs/number-theory/divisibility-by-9') {
    return <DivisibilityBy9ProofPage />;
  }
  if (path === '/visual-proofs/sequences-and-series/sum-first-n-even-numbers') {
    return <EvenNumberSumProofPage />;
  }
  if (path === '/visual-proofs/logarithms-exponents/exponent-product-rule') {
    return <ExponentProductRuleProofPage />;
  }
  if (path === '/visual-proofs/logarithms-exponents/power-of-a-power-rule') {
    return <PowerOfAPowerRuleProofPage />;
  }
  if (path === '/visual-proofs/logarithms-exponents/zero-exponent-rule') {
    return <ZeroExponentRuleProofPage />;
  }
  if (path === '/visual-proofs/logarithms-exponents/negative-exponent-rule') {
    return <NegativeExponentRuleProofPage />;
  }
  if (path === '/visual-proofs/geometry/exterior-angle-sum-polygon') {
    return <ExteriorAngleSumPolygonProofPage />;
  }
  if (path === '/visual-proofs/geometry/herons-formula-visual-proof') {
    return <HeronsFormulaVisualProofPage />;
  }
  if (path === '/visual-proofs/mensuration/pyramid-volume-one-third') {
    return <PyramidVolumeOneThirdProofPage />;
  }
  if (path === '/visual-proofs/coordinate-geometry/shoelace-formula') {
    return <ShoelaceFormulaProofPage />;
  }

  // Numeric routes
  const match = path.match(/visual-proofs\/(\d+)/);
  const page = match ? Number(match[1]) : 1;
  if (page === 1) return <DerivativeOfSineProofPage />;
  if (page === 2) return <DivisibilityEqualGroupingProofPage />;
  if (page === 3 || page === 195) return <DivisibilityByElevenProofPage />;
  if (page === 4 || page === 196) return <DivisibilityBy3ProofPage />;
  if (page === 5 || page === 197) return <DivisibilityBy9ProofPage />;
  if (page === 6 || page === 198) return <EvenNumberSumProofPage />;
  if (page === 7 || page === 200) return <ExponentProductRuleProofPage />;
  if (page === 8 || page === 201) return <ExponentQuotientRuleProofPage />;
  if (page === 9 || page === 202) return <PowerOfAPowerRuleProofPage />;
  if (page === 10 || page === 203) return <ZeroExponentRuleProofPage />;
  if (page === 11 || page === 204) return <NegativeExponentRuleProofPage />;
  if (page === 12 || page === 206) return <ExteriorAngleSumPolygonProofPage />;
  if (page === 13 || page === 207) return <HeronsFormulaVisualProofPage />;
  if (page === 14 || page === 208) return <PyramidVolumeOneThirdProofPage />;
  if (page === 15 || page === 209) return <ShoelaceFormulaProofPage />;

  return <MissingPage n={page} />;
}

createRoot(document.getElementById('app')!).render(<App />);
