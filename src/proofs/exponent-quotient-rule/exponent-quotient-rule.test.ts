// ─── Exponent Quotient Rule — Unit Tests ──────────────────────────────────────
import { computeQuotient } from './exponent-quotient-ruleMath';
import { initExponentQuotientState, exponentQuotientReducer } from './exponent-quotient-ruleReducer';
import { checkCompletion } from './exponent-quotient-ruleCompletion';

export function runExponentQuotientRuleTests(): void {
  let pass = 0;
  let fail = 0;

  function assert(label: string, condition: boolean) {
    if (condition) {
      pass++;
    } else {
      fail++;
      console.error(`FAIL [Exponent Quotient Rule]: ${label}`);
    }
  }

  // 1. Math computation tests
  const res1 = computeQuotient(3, 5, 2);
  assert('3^5 / 3^2 remainingExp is 3', res1.remainingExp === 3);
  assert('3^5 / 3^2 quotient is 27', res1.quotient === 27);
  assert('Base 3 is valid (not 0)', res1.isBaseValid);

  // 2. Reducer initial state
  const state0 = initExponentQuotientState();
  assert('Initial cancelledCount is 0', state0.cancelledCount === 0);
  assert('Initial base is 3', state0.base === 3);

  // 3. Action cancel next pair
  const state1 = exponentQuotientReducer(state0, { type: 'CANCEL_NEXT_PAIR' });
  assert('Cancelled count is 1 after CANCEL_NEXT_PAIR', state1.cancelledCount === 1);

  const state2 = exponentQuotientReducer(state1, { type: 'CANCEL_ALL' });
  assert('Cancelled count is 2 (min of 5 and 2) after CANCEL_ALL', state2.cancelledCount === 2);

  // 4. Completion predicate
  const comp0 = checkCompletion(state0);
  assert('Initial completion is false', !comp0.isComplete);

  const state3 = exponentQuotientReducer(state2, { type: 'SELECT_PREDICTION', payload: 'B' });
  const state4 = exponentQuotientReducer(state3, { type: 'CHECK_PREDICTION' });
  const comp4 = checkCompletion(state4);
  assert('Completion after cancelling and prediction is true', comp4.isComplete);

  console.log(`Exponent Quotient Rule Tests: ${pass} passed, ${fail} failed.`);
}
