// ─── Exponent Product Rule — Unit Tests ───────────────────────────────────────
import { computeProduct } from './exponent-product-ruleMath';
import { initExponentProductState, exponentProductReducer } from './exponent-product-ruleReducer';
import { checkCompletion } from './exponent-product-ruleCompletion';

export function runExponentProductRuleTests(): void {
  let pass = 0;
  let fail = 0;

  function assert(label: string, condition: boolean) {
    if (condition) {
      pass++;
    } else {
      fail++;
      console.error(`FAIL [Exponent Product Rule]: ${label}`);
    }
  }

  // 1. Math computation tests
  const res1 = computeProduct(2, 3, 2);
  assert('2^3 * 2^2 totalExp is 5', res1.totalExp === 5);
  assert('2^3 * 2^2 product is 32', res1.product === 32);
  assert('2^3 is 8', res1.am === 8);
  assert('2^2 is 4', res1.an === 4);

  // 2. Reducer initial state
  const state0 = initExponentProductState();
  assert('Initial isJoined is false', !state0.isJoined);
  assert('Initial base is 2', state0.base === 2);

  // 3. Action join chains
  const state1 = exponentProductReducer(state0, { type: 'JOIN_CHAINS' });
  assert('State after JOIN_CHAINS has isJoined true', state1.isJoined);
  assert('ProofState advances to connect', state1.proofState === 'connect');

  // 4. Completion predicate
  const comp0 = checkCompletion(state0);
  assert('Initial completion is false', !comp0.isComplete);

  const state2 = exponentProductReducer(state1, { type: 'SET_PREDICTION', payload: '7' });
  const state3 = exponentProductReducer(state2, { type: 'CHECK_PREDICTION' });
  const comp3 = checkCompletion(state3);
  assert('Completion after joining and correct prediction is true', comp3.isComplete);

  console.log(`Exponent Product Rule Tests: ${pass} passed, ${fail} failed.`);
}
