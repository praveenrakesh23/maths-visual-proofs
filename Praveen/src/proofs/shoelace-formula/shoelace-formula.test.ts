// ─── Shoelace Formula — Unit Tests ────────────────────────────────────────────
import { computeShoelace } from './shoelace-formulaMath';
import { initShoelaceState, shoelaceReducer } from './shoelace-formulaReducer';
import { checkCompletion } from './shoelace-formulaCompletion';

export function runShoelaceFormulaTests(): void {
  let pass = 0;
  let fail = 0;

  function assert(label: string, condition: boolean) {
    if (condition) pass++;
    else {
      fail++;
      console.error(`FAIL [Shoelace Formula]: ${label}`);
    }
  }

  const state0 = initShoelaceState();
  const res = computeShoelace(state0.points);
  assert('Calculated absolute area > 0', res.absoluteArea > 0);
  assert('Signed difference = downRightSum - upRightSum', res.signedDiff === res.downRightSum - res.upRightSum);

  const state1 = shoelaceReducer(state0, { type: 'TOGGLE_SNAP' });
  assert('Toggle snap updates snapGrid', !state1.snapGrid === state0.snapGrid);

  const comp0 = checkCompletion(state0);
  assert('Initial completion state evaluated', typeof comp0.isComplete === 'boolean');

  console.log(`Shoelace Formula Tests: ${pass} passed, ${fail} failed.`);
}
