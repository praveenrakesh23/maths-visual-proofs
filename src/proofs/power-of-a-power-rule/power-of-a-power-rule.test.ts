// ─── Power of a Power Rule — Unit Tests ───────────────────────────────────────
import { computePowerOfPower } from './power-of-a-power-ruleMath';
import { initPowerOfPowerState, powerOfPowerReducer } from './power-of-a-power-ruleReducer';
import { checkCompletion } from './power-of-a-power-ruleCompletion';

export function runPowerOfPowerRuleTests(): void {
  let pass = 0;
  let fail = 0;

  function assert(label: string, condition: boolean) {
    if (condition) pass++;
    else {
      fail++;
      console.error(`FAIL [Power of a Power]: ${label}`);
    }
  }

  const calc = computePowerOfPower(2, 3, 4);
  assert('(2^3)^4 total exponent is 12', calc.totalExponent === 12);
  assert('2^12 is 4096', calc.result === 4096);

  const state0 = initPowerOfPowerState();
  assert('Initial isFlattened is false', !state0.isFlattened);

  const state1 = powerOfPowerReducer(state0, { type: 'FLATTEN' });
  assert('After FLATTEN, isFlattened is true', state1.isFlattened);

  const comp0 = checkCompletion(state0);
  assert('Initial completion is false', !comp0.isComplete);

  console.log(`Power of a Power Rule Tests: ${pass} passed, ${fail} failed.`);
}
