import { digitsToNumber, calculateAlternatingSums, generateDragTargets } from './divisibility-by-11Math';
import { divisibilityBy11Reducer, initDiv11State } from './divisibility-by-11Reducer';
import { checkCompletion } from './divisibility-by-11Completion';

export function runDivisibilityBy11Tests() {
  const errors: string[] = [];

  const assert = (condition: boolean, msg: string) => {
    if (!condition) {
      errors.push(`Assertion failed: ${msg}`);
    }
  };

  console.log('Starting tests for divisibility-by-11...');

  // 1. Math Tests
  try {
    const num = digitsToNumber([7, 3, 8, 6, 2, 4, 1]);
    assert(num === 7386241, 'digitsToNumber should convert array to correct integer');

    const sums = calculateAlternatingSums([7, 3, 8, 6, 2, 4, 1]);
    assert(sums.sumA === 18, 'sumA should be 18 (1 + 2 + 8 + 7)');
    assert(sums.sumB === 13, 'sumB should be 13 (4 + 6 + 3)');
    assert(sums.diff === 5, 'alternating diff should be 5');
    assert(sums.remainderNum === 5, '7386241 % 11 should be 5');
    assert(sums.isDivisible === false, '7386241 is not divisible by 11');
  } catch (err: any) {
    errors.push(`Math test error: ${err.message}`);
  }

  // 2. Reducer Tests
  try {
    let state = initDiv11State();
    assert(state.digits.length === 7, 'Initial digit count is 7');

    // Drag counter
    state = divisibilityBy11Reducer(state, { type: 'DRAG_COUNTER', payload: { id: 0, x: 100, y: 120 } });
    assert(state.counters[0].x === 100 && state.counters[0].y === 120, 'Counter 0 coordinates updated on drag');

    // Change A example number
    state = divisibilityBy11Reducer(state, { type: 'SET_DIGITS', payload: [1, 2, 1] });
    assert(state.digits.join('') === '121', 'Digits updated to [1, 2, 1]');
    assert(state.counters.length === 3, 'Counters list length matches new digits array');
  } catch (err: any) {
    errors.push(`Reducer test error: ${err.message}`);
  }

  // 3. Completion Tests
  try {
    let state = initDiv11State();
    let status = checkCompletion(state);
    assert(status.isComplete === false, 'Initial state is incomplete');

    // Set prediction check
    state = divisibilityBy11Reducer(state, { type: 'SET_PREDICTION', payload: 'no' });
    state = divisibilityBy11Reducer(state, { type: 'CHECK_PREDICTION' });

    // Set misconception check
    state = divisibilityBy11Reducer(state, { type: 'SET_MISCONCEPTION', payload: 'correct' });
    state = divisibilityBy11Reducer(state, { type: 'CHECK_MISCONCEPTION' });

    // Set state flow visits
    state = divisibilityBy11Reducer(state, { type: 'SET_STATE', payload: 'conclude' });
    state = divisibilityBy11Reducer(state, { type: 'SET_STATE', payload: 'transfer' });

    // Mock perfect sorting of all counters
    const targets = generateDragTargets(state.digits);
    state.counters.forEach((c) => {
      const expectedType = c.power % 2 === 0 ? 'groupA' : 'groupB';
      const availableTargets = targets.filter(t => t.type === expectedType);
      const pos = availableTargets[c.id % availableTargets.length];
      state = divisibilityBy11Reducer(state, {
        type: 'DOCK_COUNTER',
        payload: {
          id: c.id,
          dockState: expectedType,
          x: pos.x,
          y: pos.y,
        }
      });
    });

    status = checkCompletion(state);
    assert(status.isComplete === true, 'Proof completion status is met after satisfying all checklist criteria');
  } catch (err: any) {
    errors.push(`Completion test error: ${err.message}`);
  }

  if (errors.length === 0) {
    console.log('All tests passed successfully for divisibility-by-11!');
  } else {
    console.error('Test failures in divisibility-by-11:');
    errors.forEach(err => console.error(`- ${err}`));
  }

  return errors;
}
