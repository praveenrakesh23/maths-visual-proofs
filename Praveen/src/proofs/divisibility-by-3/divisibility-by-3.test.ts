// ─── Divisibility by 3 — Tests ───────────────────────────────────────────────
import {
  digitSum, numberMod3, digitSumMod3, placeValueMod3,
  digitsToNumber, correctRemainderLane, isCompatible,
  generateSnapTargets,
} from './divisibility-by-3Math';
import { div3Reducer, initDiv3State } from './divisibility-by-3Reducer';
import { checkCompletion } from './divisibility-by-3Completion';

export function runDivisibilityBy3Tests(): void {
  const errors: string[] = [];
  const assert = (cond: boolean, msg: string) => { if (!cond) errors.push(msg); };

  // ── Math: Core invariant ────────────────────────────────────────────────────
  // 10^k ≡ 1 (mod 3) for all k ≥ 0
  for (let k = 0; k <= 7; k++) {
    assert(placeValueMod3(k) === 1, `placeValueMod3(${k}) must be 1`);
  }

  // ── Math: digit sum ────────────────────────────────────────────────────────
  assert(digitSum([1, 2, 3]) === 6, 'digitSum([1,2,3]) = 6');
  assert(digitSum([4, 7, 2, 1]) === 14, 'digitSum([4,7,2,1]) = 14');
  assert(digitSum([0]) === 0, 'digitSum([0]) = 0');

  // ── Math: number mod 3 === digit sum mod 3 (key theorem) ─────────────────
  const testCases: number[][] = [[1,2,3],[9,9],[7,2,1],[1,0,2],[4,7,2,1],[1,2],[9]];
  for (const digits of testCases) {
    const nm = numberMod3(digits);
    const dm = digitSumMod3(digits);
    assert(nm === dm, `numberMod3 === digitSumMod3 for ${digits.join('')}: ${nm} vs ${dm}`);
  }

  // ── Math: divisibility check ───────────────────────────────────────────────
  assert(numberMod3([1,2,3]) === 0, '123 divisible by 3');
  assert(numberMod3([7,2,1]) !== 0, '721 not divisible by 3');
  assert(numberMod3([9,9]) === 0, '99 divisible by 3');

  // ── Math: correctRemainderLane always rem1 ─────────────────────────────────
  for (let k = 0; k <= 6; k++) {
    assert(correctRemainderLane(k) === 'rem1', `correctRemainderLane(${k}) must be rem1`);
  }

  // ── Math: compatibility predicate ──────────────────────────────────────────
  assert(isCompatible('palette', 'thousands'), 'palette→thousands: compatible');
  assert(isCompatible('thousands', 'rem1'), 'thousands→rem1: compatible');
  assert(!isCompatible('thousands', 'rem0'), 'thousands→rem0: incompatible');
  assert(!isCompatible('thousands', 'rem2'), 'thousands→rem2: incompatible');
  assert(isCompatible('rem1', 'thousands'), 'rem1→thousands: compatible (undo)');

  // ── Math: snap targets have finite coordinates ────────────────────────────
  const targets = generateSnapTargets([4,7,2,1]);
  for (const t of targets) {
    assert(isFinite(t.x) && isFinite(t.y), `snap target ${t.id} has finite coords`);
    assert(t.x >= 0 && t.x <= 920, `snap target ${t.id} x in range`);
    assert(t.y >= 0 && t.y <= 420, `snap target ${t.id} y in range`);
  }

  // ── Reducer: initial state ─────────────────────────────────────────────────
  const s0 = initDiv3State();
  assert(s0.digits.join('') === '4721', 'initial digits = [4,7,2,1]');
  assert(s0.proofState === 'inspect', 'initial proofState = inspect');
  assert(s0.counters.length === 4, 'initial counters = 4 (one per digit)');
  assert(s0.counters.every(c => c.lane === 'palette'), 'all counters start in palette');
  assert(s0.history.length === 1, 'history starts with 1 entry');

  // ── Reducer: SET_DIGITS ────────────────────────────────────────────────────
  const s1 = div3Reducer(s0, { type: 'SET_DIGITS', payload: [1,2,3] });
  assert(s1.digits.join('') === '123', 'SET_DIGITS updates digits');
  assert(s1.counters.length === 3, 'SET_DIGITS resets counters count');
  assert(s1.counters.every(c => c.lane === 'palette'), 'SET_DIGITS resets to palette');

  // ── Reducer: DOCK_COUNTER into column ──────────────────────────────────────
  const c0 = s0.counters[0];
  const s2 = div3Reducer(s0, {
    type: 'DOCK_COUNTER',
    payload: { id: c0.id, lane: 'thousands', x: 300, y: 120 },
  });
  assert(s2.counters.find(c => c.id === c0.id)?.lane === 'thousands', 'DOCK into thousands');
  assert(s2.proofState === 'manipulate', 'docking advances to manipulate');

  // ── Reducer: DOCK_COUNTER into rem1 advances state ────────────────────────
  const s3 = div3Reducer(s2, {
    type: 'DOCK_COUNTER',
    payload: { id: c0.id, lane: 'rem1', x: 350, y: 310 },
  });
  assert(s3.counters.find(c => c.id === c0.id)?.lane === 'rem1', 'DOCK into rem1');
  assert(s3.proofState === 'connect', 'rem1 dock advances to connect');

  // ── Reducer: UNDO ─────────────────────────────────────────────────────────
  const s4 = div3Reducer(s3, { type: 'UNDO' });
  assert(s4.counters.find(c => c.id === c0.id)?.lane === 'thousands', 'UNDO restores column lane');

  // ── Reducer: REDO ─────────────────────────────────────────────────────────
  const s5 = div3Reducer(s4, { type: 'REDO' });
  assert(s5.counters.find(c => c.id === c0.id)?.lane === 'rem1', 'REDO re-applies dock');

  // ── Reducer: RESET ────────────────────────────────────────────────────────
  const s6 = div3Reducer(s5, { type: 'RESET' });
  assert(s6.counters.every(c => c.lane === 'palette'), 'RESET returns all counters to palette');
  assert(s6.proofState === 'inspect', 'RESET returns to inspect');
  assert(s6.predictionChecked === false, 'RESET clears prediction');

  // ── Reducer: SET_PREDICTION + CHECK_PREDICTION ─────────────────────────────
  const sp = div3Reducer(s0, { type: 'SET_PREDICTION', payload: 'yes' });
  assert(sp.predictionAnswer === 'yes', 'SET_PREDICTION stores answer');
  const sc = div3Reducer(sp, { type: 'CHECK_PREDICTION' });
  assert(sc.predictionChecked === true, 'CHECK_PREDICTION marks checked');
  assert(sc.proofState === 'conclude', 'CHECK_PREDICTION advances to conclude');

  // ── Reducer: SET_MISCONCEPTION + CHECK_MISCONCEPTION ──────────────────────
  const sm1 = div3Reducer(s0, { type: 'SET_MISCONCEPTION', payload: 'correct' });
  const sm2 = div3Reducer(sm1, { type: 'CHECK_MISCONCEPTION' });
  assert(sm2.misconceptionChecked, 'CHECK_MISCONCEPTION marks checked');
  assert(sm2.misconceptionFeedback !== null, 'CHECK_MISCONCEPTION sets feedback');
  assert(sm2.misconceptionSelected === 'correct', 'correct answer stored');

  // ── Completion: not complete initially ─────────────────────────────────────
  const comp0 = checkCompletion(s0);
  assert(!comp0.isComplete, 'initial state is not complete');
  assert(comp0.missingSteps.length > 0, 'initial state has missing steps');

  // ── AUTO_STEP moves counters progressively ─────────────────────────────────
  let sAuto = s0;
  let steps = 0;
  while (sAuto.counters.some(c => c.lane === 'palette') && steps < 20) {
    sAuto = div3Reducer(sAuto, { type: 'AUTO_STEP' });
    steps++;
  }
  assert(sAuto.counters.every(c => c.lane !== 'palette'), 'AUTO_STEP empties palette');

  // ── digitsToNumber ─────────────────────────────────────────────────────────
  assert(digitsToNumber([1,2,3]) === 123, 'digitsToNumber([1,2,3]) = 123');
  assert(digitsToNumber([4,7,2,1]) === 4721, 'digitsToNumber([4,7,2,1]) = 4721');

  // ── Report ────────────────────────────────────────────────────────────────
  if (errors.length === 0) {
    console.log('[divisibility-by-3] All tests passed ✔');
  } else {
    console.error('[divisibility-by-3] Test failures:');
    errors.forEach(e => console.error('  ✘', e));
  }
}
