// ─── Volume of a Pyramid — Unit Tests ─────────────────────────────────────────
import { computePyramidVolume } from './pyramid-volume-one-thirdMath';
import { initPyramidVolumeState, pyramidVolumeReducer } from './pyramid-volume-one-thirdReducer';
import { checkCompletion } from './pyramid-volume-one-thirdCompletion';

export function runPyramidVolumeOneThirdTests(): void {
  let pass = 0;
  let fail = 0;

  function assert(label: string, condition: boolean) {
    if (condition) pass++;
    else {
      fail++;
      console.error(`FAIL [Pyramid Volume]: ${label}`);
    }
  }

  const { Vprism, Vpyramid } = computePyramidVolume(24, 6);
  assert('Prism volume 24*6 = 144', Vprism === 144);
  assert('Pyramid volume 144/3 = 48', Vpyramid === 48);

  const state0 = initPyramidVolumeState();
  const state1 = pyramidVolumeReducer(state0, { type: 'DOCK_PYRAMID' });
  assert('After DOCK_PYRAMID, placed count increases', state1.placedPyramidsCount === 2);

  const comp0 = checkCompletion(state0);
  assert('Initial completion evaluated', typeof comp0.isComplete === 'boolean');

  console.log(`Volume of Pyramid Tests: ${pass} passed, ${fail} failed.`);
}
