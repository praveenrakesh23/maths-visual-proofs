// ─── Negative Exponent Rule — Unit Tests ──────────────────────────────────────
import { computeNegativeExponent } from './negative-exponent-ruleMath';
import { initNegativeExponentState, negativeExponentReducer } from './negative-exponent-ruleReducer';
import { checkCompletion } from './negative-exponent-ruleCompletion';

export function runNegativeExponentRuleTests(): void {
  let pass = 0;
  let fail = 0;

  function assert(label: string, condition: boolean) {
    if (condition) pass++;
    else {
      fail++;
      console.error(`FAIL [Negative Exponent]: ${label}`);
    }
  }

  const calc = computeNegativeExponent(3, -2);
  assert('3^-2 denominatorVal is 9', calc.denominatorVal === 9);
  assert('3^-2 value is 1/9', Math.abs(calc.value - 1 / 9) < 1e-6);

  const state0 = initNegativeExponentState();
  assert('Initial exp is -2', state0.exp === -2);

  const state1 = negativeExponentReducer(state0, { type: 'STEP_LEFT' });
  assert('After STEP_LEFT, exp is -3', state1.exp === -3);

  const comp0 = checkCompletion(state0);
  assert('Completion state initialized', typeof comp0.isComplete === 'boolean');

  console.log(`Negative Exponent Rule Tests: ${pass} passed, ${fail} failed.`);
}
