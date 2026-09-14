// ─── Divisibility by 9 — Tests ────────────────────────────────────────────────
import { digitSum, digitsToNumber, numberMod9, digitSumMod9 } from './divisibility-by-9Math';
import { checkCompletion } from './divisibility-by-9Completion';
import { initDiv9State, div9Reducer } from './divisibility-by-9Reducer';

export function runDivisibilityBy9Tests(): void {
  let pass = 0;
  let fail = 0;

  function assert(label: string, condition: boolean) {
    if (condition) {
      pass++;
    } else {
      fail++;
      console.error(`FAIL: ${label}`);
    }
  }

  // ── Core math tests ────────────────────────────────────────────────────────
  const testCases: [number[], number, number][] = [
    [[2,2,5,3,7,4], 225374, 23],   // 225374 digit sum = 23
    [[9,8,7,6,5,4], 987654, 39],   // 987654 digit sum = 39
    [[1,0,8], 108, 9],             // 108 digit sum = 9, divisible by 9
    [[1,0,0], 100, 1],             // 100 digit sum = 1
    [[0], 0, 0],                    // edge: zero
  ];

  for (const [digits, expectedNum, expectedSum] of testCases) {
    assert(`digitsToNumber(${digits}) = ${expectedNum}`, digitsToNumber(digits) === expectedNum);
    assert(`digitSum(${digits}) = ${expectedSum}`,       digitSum(digits)       === expectedSum);
    assert(`N mod 9 = digit sum mod 9 for ${digits}`,    numberMod9(digits)     === digitSumMod9(digits));
  }

  // ── The key invariant: 10^k ≡ 1 (mod 9) ────────────────────────────────────
  assert('10^0 mod 9 = 1', 1 % 9 === 1);
  assert('10^1 mod 9 = 1', 10 % 9 === 1);
  assert('10^2 mod 9 = 1', 100 % 9 === 1);
  assert('10^3 mod 9 = 1', 1000 % 9 === 1);
  assert('10^4 mod 9 = 1', 10000 % 9 === 1);
  assert('10^5 mod 9 = 1', 100000 % 9 === 1);

  // ── Reducer / completion tests ──────────────────────────────────────────────
  const initial = initDiv9State();
  assert('initial state: no counters in tray', initial.trayCounterIds.length === 0);
  assert('initial proofState = inspect', initial.proofState === 'inspect');

  // Check completion: should be false initially
  const comp0 = checkCompletion(initial);
  assert('completion initially false', !comp0.isComplete);

  // After SET_DIGITS action
  const state2 = div9Reducer(initial, { type: 'SET_DIGITS', payload: [1, 0, 8] });
  assert('SET_DIGITS changes digits', state2.digits.length === 3);
  assert('digit sum of 108 = 9',      digitSum(state2.digits) === 9);
  assert('108 mod 9 = 0',             digitsToNumber(state2.digits) % 9 === 0);
  assert('digit sum mod 9 = 0',       digitSum(state2.digits) % 9 === 0);

  // Undo/redo
  const stateAfterSet = div9Reducer(initial, { type: 'SET_DIGITS', payload: [1, 2, 6] });
  const undone = div9Reducer(stateAfterSet, { type: 'UNDO' });
  assert('undo works (reverts to initial digits length)', undone.digits.length === initial.digits.length);

  console.log(`Divisibility-by-9 tests: ${pass} passed, ${fail} failed.`);
}
