// ─── Sum of First n Even Numbers — Tests ─────────────────────────────────────
import {
  evenSum, rectangleArea, triangular, evenTerm, invariantHolds, clampN,
  getRowLayouts, getSnapTargets, isCompatibleRow, assertDomain, countDotsInRows,
} from './even-number-sumMath';
import { checkCompletion, getRejectionMessage } from './even-number-sumCompletion';
import { ensReducer, initEnsState } from './even-number-sumReducer';

export function runEvenNumberSumTests(): void {
  let pass = 0;
  let fail = 0;
  function assert(label: string, condition: boolean) {
    if (condition) pass++;
    else {
      fail++;
      console.error(`FAIL: ${label}`);
    }
  }

  for (let n = 1; n <= 10; n++) {
    assert(`evenSum(${n}) = n(n+1)`, evenSum(n) === rectangleArea(n));
    assert(`evenSum(${n}) = 2 T_n`, evenSum(n) === 2 * triangular(n));
    assert(`invariant(${n})`, invariantHolds(n));
    let acc = 0;
    for (let i = 1; i <= n; i++) acc += evenTerm(i);
    assert(`loop sum ${n}`, acc === n * (n + 1));
  }

  assert('clamp 0 → 1', clampN(0) === 1);
  assert('clamp 99 → 10', clampN(99) === 10);
  assert('domain n=1 ok', assertDomain(1) === 1);

  const layouts = getRowLayouts(5);
  assert('5 rows laid out', layouts.length === 5);
  assert('row 1 has 2 home dots', layouts[0].homeDots.length === 2);
  assert('row 5 has 10 home dots', layouts[4].homeDots.length === 10);
  assert('row 3 splits 3+3', layouts[2].groupA.length === 3 && layouts[2].groupB.length === 3);
  const totalCells = layouts.reduce((s, r) => s + r.groupA.length + r.groupB.length, 0);
  assert('all rectangle cells assigned once', totalCells === countDotsInRows(5));

  const occupied = new Set<string>();
  let unique = true;
  for (const r of layouts) {
    for (const p of [...r.groupA, ...r.groupB]) {
      const key = `${p.x.toFixed(3)},${p.y.toFixed(3)}`;
      if (occupied.has(key)) unique = false;
      occupied.add(key);
    }
  }
  assert('no overlapping dock cells', unique);

  assert('compatible only same i', isCompatibleRow(2, 2) && !isCompatibleRow(2, 3));
  const snaps = getSnapTargets(4);
  assert('snap targets = n', snaps.length === 4);
  assert('finite snap coords', snaps.every((s) => Number.isFinite(s.x) && Number.isFinite(s.y)));

  const init = initEnsState();
  assert('starts inspect', init.proofState === 'inspect');
  assert('default n=5', init.n === 5);
  assert('completion false at start', !checkCompletion(init).isComplete);

  const dragged = ensReducer(init, { type: 'START_DRAG', payload: { i: 1, x: 100, y: 100 } });
  assert('drag undocks / selects', dragged.draggingId === 1 && dragged.rows[0].selected);
  const moved = ensReducer(dragged, { type: 'DRAG_ROW', payload: { x: 110, y: 120 } });
  assert('no-jump follows payload', moved.rows[0].x === 110 && moved.rows[0].y === 120);

  const docked = ensReducer(moved, { type: 'DOCK_ROW', payload: { i: 1, x: 0, y: 0 } });
  assert('dock row 1', docked.rows[0].docked);
  assert('history grew', docked.historyIndex > init.historyIndex);
  const undone = ensReducer(docked, { type: 'UNDO' });
  assert('undo restores undocked', !undone.rows[0].docked);
  const redone = ensReducer(undone, { type: 'REDO' });
  assert('redo re-docks', redone.rows[0].docked);

  let stepped = init;
  for (let k = 0; k < 5; k++) stepped = ensReducer(stepped, { type: 'AUTO_STEP' });
  assert('animation docks all', stepped.rows.every((r) => r.docked));
  assert('auto-step is not completion', !checkCompletion(stepped).isComplete);

  const rejected = ensReducer(init, { type: 'REJECT_ROW', payload: { i: 1 } });
  assert('reject returns home', !rejected.rows[0].docked);

  const msg = getRejectionMessage(1, 3, 5);
  assert('rejection names mismatch', msg.includes('Row 1') && msg.includes('slot 3'));

  let done = stepped;
  done = ensReducer(done, { type: 'SET_MISCONCEPTION', payload: 'correct' });
  done = ensReducer(done, { type: 'CHECK_MISCONCEPTION' });
  done = ensReducer(done, { type: 'SET_CHALLENGE_N', payload: '6' });
  done = ensReducer(done, { type: 'SET_CHALLENGE_HEIGHT', payload: '6' });
  done = ensReducer(done, { type: 'SET_CHALLENGE_WIDTH', payload: '7' });
  done = ensReducer(done, { type: 'CHECK_CHALLENGE' });
  const comp = checkCompletion(done);
  assert('complete only with dock + general + transfer', comp.isComplete);

  let wrongMc = stepped;
  wrongMc = ensReducer(wrongMc, { type: 'SET_MISCONCEPTION', payload: 'square' });
  wrongMc = ensReducer(wrongMc, { type: 'CHECK_MISCONCEPTION' });
  assert('wrong misconception does not complete', !checkCompletion(wrongMc).isComplete);

  const nChanged = ensReducer(init, { type: 'SET_N', payload: 1 });
  assert('n=1 one row', nChanged.rows.length === 1 && evenSum(1) === 2);

  console.log(`Even-number-sum tests: ${pass} passed, ${fail} failed.`);
}
