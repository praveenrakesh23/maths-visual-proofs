// ─── Zero Exponent Rule — Unit Tests ──────────────────────────────────────────
import { computeZeroExponent } from './zero-exponent-ruleMath';
import { initZeroExponentState, zeroExponentReducer } from './zero-exponent-ruleReducer';
import { checkCompletion } from './zero-exponent-ruleCompletion';

export function runZeroExponentRuleTests(): void {
  let pass = 0;
  let fail = 0;

  function assert(label: string, condition: boolean) {
    if (condition) pass++;
    else {
      fail++;
      console.error(`FAIL [Zero Exponent]: ${label}`);
    }
  }

  const calc = computeZeroExponent(2.5, 3);
  assert('2.5^0 is 1', calc.result === 1);
  assert('Base 2.5 is non-zero', calc.isBaseNonZero);

  const state0 = initZeroExponentState();
  assert('Initial isCancelled is false', !state0.isCancelled);

  const state1 = zeroExponentReducer(state0, { type: 'CANCEL_ALL' });
  assert('After CANCEL_ALL, isCancelled is true', state1.isCancelled);

  const comp0 = checkCompletion(state0);
  assert('Initial completion is false', !comp0.isComplete);

  console.log(`Zero Exponent Rule Tests: ${pass} passed, ${fail} failed.`);
}
