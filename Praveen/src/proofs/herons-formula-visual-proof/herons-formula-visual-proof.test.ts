// ─── Heron's Formula — Unit Tests ─────────────────────────────────────────────
import { computeHeron } from './herons-formula-visual-proofMath';
import { initHeronsState, heronsReducer } from './herons-formula-visual-proofReducer';
import { checkCompletion } from './herons-formula-visual-proofCompletion';

export function runHeronsFormulaTests(): void {
  let pass = 0;
  let fail = 0;

  function assert(label: string, condition: boolean) {
    if (condition) pass++;
    else {
      fail++;
      console.error(`FAIL [Heron's Formula]: ${label}`);
    }
  }

  const res = computeHeron({ x: 270, y: 110 }, { x: 120, y: 310 }, { x: 420, y: 310 });
  assert('Calculated area > 0', res.area > 0);
  assert('Semiperimeter s > a', res.s > res.a);

  const state0 = initHeronsState();
  const state1 = heronsReducer(state0, { type: 'REVEAL_PREDICT' });
  assert('After REVEAL_PREDICT, predictRevealed is true', state1.predictRevealed);

  const comp0 = checkCompletion(state0);
  assert('Initial completion evaluated', typeof comp0.isComplete === 'boolean');

  console.log(`Heron's Formula Tests: ${pass} passed, ${fail} failed.`);
}
