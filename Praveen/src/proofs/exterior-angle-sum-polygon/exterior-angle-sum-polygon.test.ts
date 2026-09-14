// ─── Exterior Angle Sum of Polygon — Unit Tests ────────────────────────────────
import { computeExteriorSum } from './exterior-angle-sum-polygonMath';
import { initExteriorAngleSumState, exteriorAngleSumReducer } from './exterior-angle-sum-polygonReducer';
import { checkCompletion } from './exterior-angle-sum-polygonCompletion';

export function runExteriorAngleSumPolygonTests(): void {
  let pass = 0;
  let fail = 0;

  function assert(label: string, condition: boolean) {
    if (condition) pass++;
    else {
      fail++;
      console.error(`FAIL [Exterior Angle Sum]: ${label}`);
    }
  }

  const sum = computeExteriorSum([72, 96, 128, 64, 76, 104]);
  assert('Exterior angle sum is 360', sum === 360);

  const state0 = initExteriorAngleSumState();
  assert('Initial vertices count is 6', state0.vertices.length === 6);

  const state1 = exteriorAngleSumReducer(state0, { type: 'SET_TOOL', payload: 'detach' });
  assert('Active tool updated to detach', state1.activeTool === 'detach');

  const comp0 = checkCompletion(state0);
  assert('Initial completion state evaluated', typeof comp0.isComplete === 'boolean');

  console.log(`Exterior Angle Sum Polygon Tests: ${pass} passed, ${fail} failed.`);
}
