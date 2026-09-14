// ui_template.js - Pure, high-craft HTML/CSS/JS template for Maths Universe
// Follows the Reference Screenshot: light background, purple accent, exact component tree.

import fs from 'fs';
import path from 'path';
import { getLessonPedagogy } from './student_pedagogy.js';

const clientScriptPath = path.resolve(process.cwd(), 'scripts', 'multilingual_agent_client.js');
let multilingualClientCode = '';
try {
  multilingualClientCode = fs.readFileSync(clientScriptPath, 'utf8');
} catch (e) {
  console.warn('Could not read multilingual_agent_client.js:', e);
}

export function renderLessonHtml(l, prevL, nextL, allList, enhancement, rendererCode) {
  const pedagogy = getLessonPedagogy(l.id, l);
  const teacherCues = pedagogy.cues || [
    'Stage 1: Observe the initial geometric configuration.',
    'Stage 2: Begin the continuous transformation.',
    'Stage 3: Notice the structural conservation.',
    'Stage 4: Complete the proof identity.'
  ];

  const enh = enhancement || {
    difficulty: 'BEGINNER',
    time: '8 minutes',
    missionTitle: l.title,
    missionInstruction: l.mission,
    stats: [
      { label: 'Components', val: `${l.steps.length} / ${l.steps.length}` },
      { label: 'Target', val: l.formula },
      { label: 'Status', val: 'Active' }
    ],
    tools: ['Drag ✋', 'Rotate ↻', 'Duplicate ⧉', 'Cut ✂', 'Shear ◇', 'Snap ♧'],
    prediction: {
      question: 'What happens to the target invariant during this geometric transformation?',
      options: ['It changes unpredictably', 'It remains strictly invariant', 'It doubles in magnitude'],
      correct: 1,
      explanation: 'Continuous geometric rearrangement preserves foundational area and topological quantities.'
    },
    formulaLines: [l.formula, '= Invariant', '✓ Q.E.D.'],
    formulaSuccess: '✓ Mathematical identity holds.',
    oneLineProof: [l.formula, '=', 'Constant Invariant'],
    challenge: {
      desc: 'Adjust the primary parameter to double the base scale and verify the invariant.',
      preset: {}
    }
  };

  const allSliders = l.sliders && l.sliders.length > 0 ? l.sliders : [{ id: 'param1', label: 'Scale', min: 1, max: 100, val: 50, step: 1 }];
  const primarySlider = allSliders[0];
  const allSlidersHtml = allSliders.map(s => `
    <div class="slider-container" data-slider-id="${s.id}">
      <span class="slider-label-text">${s.label}:</span>
      <button class="slider-step-btn" data-action="dec" data-target="${s.id}" title="Decrease ${s.label}">−</button>
      <input type="range" class="param-range-slider" id="${s.id}" 
             min="${s.min}" max="${s.max}" 
             value="${s.val}" step="${s.step || 1}">
      <button class="slider-step-btn" data-action="inc" data-target="${s.id}" title="Increase ${s.label}">+</button>
      <span class="slider-val-badge" id="${s.id}Val">${s.val}</span>
    </div>
  `).join('');

  const optionsHtml = allList.map(item => `
    <option value="${item.id}.html" ${item.id === l.id ? 'selected' : ''}>
      Lesson ${item.num}: ${item.title}
    </option>
  `).join('');

  // Step Tabs
  const stepTabsHtml = l.steps.map((st, i) => {
    let stageLabel = 'STAGE ' + (i + 1);
    if (i === 0) stageLabel = 'STEP 1 [BEFORE]';
    else if (i === 1) stageLabel = 'STEP 2 [ACTION]';
    else if (i === 2) stageLabel = 'STEP 3 [TRANSFORM]';
    else if (i === 3) stageLabel = 'STEP 4 [RESULT]';
    return `<button class="step-tab-btn ${i === 0 ? 'active' : ''}" data-step="${i}" id="stepTabBtn${i}">
      ${stageLabel}
    </button>`;
  }).join('');

  // Why it works cards
  const whyCardsHtml = l.steps.map((st, i) => `
    <div class="why-card ${i === 0 ? 'active' : ''}" data-step="${i}" id="whyCard${i}">
      <div class="why-card-top">
        <span class="why-num">${i + 1}</span>
        <span class="why-card-title">${st.title}</span>
      </div>
      <p class="why-card-desc">${st.desc}</p>
      <div class="why-card-formula">${st.formula}</div>
    </div>
  `).join('');

  // Stat cards
  const statCardsHtml = enh.stats.map(st => `
    <div class="mission-stat-card">
      <div class="stat-label">${st.label}</div>
      <div class="stat-val">${st.val}</div>
    </div>
  `).join('');

  // Prediction options
  const predOptionsHtml = enh.prediction.options.map((opt, i) => `
    <button class="pred-option-btn" data-index="${i}" id="predOpt${i}">
      <span class="pred-opt-indicator"></span>
      <span class="pred-opt-text">${opt}</span>
    </button>
  `).join('');

  // Formula Breakdown
  const formulaLinesHtml = enh.formulaLines.map((line, i) => `
    <div class="formula-row ${i === enh.formulaLines.length - 1 ? 'formula-highlight' : ''}">${line}</div>
  `).join('');

  // One line proof tokens
  const proofTokensHtml = enh.oneLineProof.map((token, i) => `
    <span class="proof-token" data-idx="${i}">${token}</span>
  `).join('');

  // Toolbar buttons
  const defaultTools = ['Drag', 'Rotate', 'Duplicate', 'Cut', 'Shear', 'Snap'];
  const toolIcons = {
    'Drag': '✋',
    'Rotate': '↻',
    'Duplicate': '⧉',
    'Cut': '✂',
    'Shear': '◇',
    'Snap': '♧'
  };

  const toolbarHtml = defaultTools.map((t, i) => `
    <button class="tool-btn ${i === 0 ? 'active' : ''}" data-tool="${t.toLowerCase()}" id="toolBtn${t}">
      <span class="tool-icon">${toolIcons[t] || '✦'}</span>
      <span class="tool-name">${t}</span>
    </button>
  `).join('');

  // Difficulty badge colors
  let diffBg = '#dcfce7', diffCol = '#15803d';
  if (enh.difficulty === 'INTERMEDIATE') { diffBg = '#fef3c7'; diffCol = '#b45309'; }
  else if (enh.difficulty === 'ADVANCED') { diffBg = '#fee2e2'; diffCol = '#b91c1c'; }

  // Derivation steps for student deep-dive modal
  const derivationHtml = (l.derivation || []).map((d, i) => `
    <div class="derivation-step-card">
      <span class="step-badge-num">${i + 1}</span>
      <div class="step-deriv-body">
        <div class="step-deriv-text">${d.text}</div>
        <div class="step-deriv-formula">${d.math}</div>
      </div>
    </div>
  `).join('') || `
    <div class="derivation-step-card">
      <span class="step-badge-num">1</span>
      <div class="step-deriv-body">
        <div class="step-deriv-text">Fundamental geometric decomposition:</div>
        <div class="step-deriv-formula">${l.formula}</div>
      </div>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${l.title} — Maths Universe</title>
  <meta name="description" content="${l.mission}">
  <style>
    :root {
      --bg-canvas: #f8fafc;
      --surface: #ffffff;
      --border-subtle: #e2e8f0;
      --border-strong: #cbd5e1;
      --purple-primary: #7c3aed;
      --purple-dark: #6d28d9;
      --purple-light: #ede9fe;
      --purple-tint: #f5f3ff;
      --text-main: #0f172a;
      --text-body: #334155;
      --text-muted: #64748b;
      --emerald: #10b981;
      --emerald-bg: #dcfce7;
      --amber: #b45309;
      --amber-bg: #fef3c7;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02);
      --shadow-card: 0 4px 12px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --radius-pill: 9999px;
      --font-ui: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      --font-math: "Cambria Math", "Latin Modern Math", "Georgia", serif;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg-canvas);
      color: var(--text-main);
      font-family: var(--font-ui);
      display: flex;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* Left Sidebar */
    .app-sidebar {
      width: 230px;
      background: var(--surface);
      border-right: 1px solid var(--border-subtle);
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: sticky;
      top: 0;
      height: 100vh;
      padding: 24px 16px;
      z-index: 40;
    }
    .brand-box {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      padding: 0 8px 24px 8px;
      border-bottom: 1px solid var(--border-subtle);
    }
    .brand-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 19px;
      box-shadow: 0 4px 10px rgba(124, 58, 237, 0.25);
    }
    .brand-text {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
    }
    .brand-title {
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 1.5px;
      color: #1e1b4b;
    }
    .brand-sub {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2px;
      color: var(--purple-primary);
    }

    .nav-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 20px;
      list-style: none;
    }
    .nav-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-radius: var(--radius-md);
      color: var(--text-muted);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.15s ease;
    }
    .nav-link:hover {
      background: #f1f5f9;
      color: var(--text-main);
    }
    .nav-link.active {
      background: var(--purple-light);
      color: var(--purple-dark);
      font-weight: 600;
    }
    .nav-link-icon {
      font-size: 17px;
      width: 20px;
      text-align: center;
    }

    .sidebar-bottom {
      padding-top: 16px;
      border-top: 1px solid var(--border-subtle);
    }
    .settings-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-radius: var(--radius-md);
      color: var(--text-muted);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.15s;
    }
    .settings-btn:hover {
      background: #f1f5f9;
      color: var(--text-main);
    }

    /* Main Area Container */
    .app-main {
      flex: 1;
      min-width: 0;
      padding: 24px 32px 64px 32px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 1440px;
      margin: 0 auto;
    }

    /* Top Header Bar */
    .header-bar {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .header-meta {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .breadcrumb {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .lesson-title-row {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .lesson-title {
      font-size: 24px;
      font-weight: 800;
      color: var(--text-main);
      letter-spacing: -0.5px;
    }
    .badge-pill {
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: var(--radius-pill);
      letter-spacing: 0.5px;
    }
    .diff-badge {
      background: ${diffBg};
      color: ${diffCol};
    }
    .time-badge {
      background: #f1f5f9;
      color: var(--text-body);
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .btn-header {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 8px 14px;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-body);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s;
    }
    .btn-header:hover {
      background: #f8fafc;
      border-color: var(--border-strong);
      color: var(--text-main);
    }
    .lesson-selector {
      background: var(--surface);
      border: 1px solid var(--purple-primary);
      color: var(--purple-dark);
      font-size: 13px;
      font-weight: 600;
      padding: 8px 14px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      outline: none;
    }

    /* Mission Card */
    .mission-card {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 20px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      box-shadow: var(--shadow-card);
      flex-wrap: wrap;
    }
    .mission-left {
      display: flex;
      align-items: center;
      gap: 18px;
      max-width: 680px;
    }
    .mission-icon-box {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
      color: var(--purple-primary);
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(124, 58, 237, 0.12);
    }
    .mission-texts {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .mission-label {
      font-size: 11px;
      font-weight: 800;
      color: var(--purple-primary);
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .mission-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--text-main);
    }
    .mission-instruction {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.4;
    }

    .mission-stats-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .mission-stat-card {
      background: #f8fafc;
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      padding: 10px 16px;
      min-width: 100px;
      text-align: center;
    }
    .stat-label {
      font-size: 10px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .stat-val {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-main);
      font-family: var(--font-math);
      margin-top: 2px;
    }

    /* 2-Column Content Grid: Visualization + Why It Works */
    .content-grid {
      display: grid;
      grid-template-columns: 1fr 370px;
      gap: 20px;
      align-items: start;
    }

    /* Visualization Card */
    .viz-card {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-card);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* Stage Steps Bar */
    .stage-bar {
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--border-subtle);
      background: #fafbfc;
      overflow-x: auto;
    }
    .step-tab-btn {
      flex: 1;
      min-width: 130px;
      padding: 12px 16px;
      border: none;
      background: transparent;
      border-bottom: 2px solid transparent;
      font-size: 12px;
      font-weight: 700;
      color: var(--text-muted);
      cursor: pointer;
      text-align: center;
      transition: all 0.15s;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }
    .step-tab-btn:hover {
      background: #f1f5f9;
      color: var(--text-main);
    }
    .step-tab-btn.active {
      color: var(--purple-primary);
      border-bottom-color: var(--purple-primary);
      background: var(--surface);
    }

    /* Stage Canvas + Right Toolbar */
    .stage-canvas-row {
      display: flex;
      position: relative;
      background: #ffffff;
      min-height: 410px;
    }
    .canvas-wrap {
      flex: 1;
      position: relative;
      height: 410px;
      cursor: grab;
      user-select: none;
      overflow: hidden;
    }
    .canvas-wrap.tool-drag { cursor: grab; }
    .canvas-wrap.tool-drag.is-dragging { cursor: grabbing; }
    .canvas-wrap.tool-rotate { cursor: crosshair; }
    .canvas-wrap.tool-duplicate { cursor: copy; }
    .canvas-wrap.tool-cut { cursor: pointer; }
    .canvas-wrap.tool-shear { cursor: ew-resize; }
    .canvas-wrap.tool-snap { cursor: cell; }

    .canvas-tool-hud {
      position: absolute;
      top: 14px;
      right: 14px;
      background: rgba(15, 23, 42, 0.88);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      color: #ffffff;
      font-size: 12px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      display: flex;
      align-items: center;
      gap: 8px;
      pointer-events: none;
      opacity: 0;
      transform: translateY(-4px);
      transition: opacity 0.2s ease, transform 0.2s ease;
      z-index: 15;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .canvas-tool-hud.visible {
      opacity: 1;
      transform: translateY(0);
    }
    #proofCanvas {
      width: 100%;
      height: 100%;
      display: block;
    }
    .canvas-teacher-cue {
      position: absolute;
      top: 14px;
      left: 14px;
      right: 14px;
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(196, 181, 253, 0.65);
      border-radius: 12px;
      padding: 10px 14px;
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
      display: flex;
      flex-direction: column;
      gap: 5px;
      pointer-events: auto;
      z-index: 10;
      transition: all 0.2s ease;
    }
    .cue-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .cue-pulse {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
      animation: cuePulseAnim 2s infinite;
    }
    @keyframes cuePulseAnim {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
      70% { transform: scale(1.15); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }
    .cue-badge {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1px;
      color: var(--purple-primary);
      text-transform: uppercase;
    }
    .cue-audio-btn {
      margin-left: auto;
      background: var(--purple-light);
      border: 1px solid #ddd6fe;
      color: var(--purple-dark);
      border-radius: 6px;
      padding: 3px 8px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s;
    }
    .cue-audio-btn:hover {
      background: #ddd6fe;
      color: #5b21b6;
    }
    .cue-text {
      font-size: 12.5px;
      color: var(--text-body);
      line-height: 1.45;
      font-weight: 500;
    }
    .canvas-drag-hint {
      position: absolute;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.85);
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      pointer-events: none;
      z-index: 12;
      letter-spacing: 0.5px;
    }

    /* Vertical Palette Toolbar */
    .vertical-toolbar {
      width: 60px;
      border-left: 1px solid var(--border-subtle);
      background: #fafbfc;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px 0;
      gap: 6px;
      flex-shrink: 0;
    }
    .tool-btn {
      width: 46px;
      height: 46px;
      border-radius: 10px;
      border: 1px solid transparent;
      background: transparent;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      cursor: pointer;
      color: var(--text-muted);
      transition: all 0.15s;
    }
    .tool-btn:hover {
      background: #f1f5f9;
      color: var(--text-main);
    }
    .tool-btn.active {
      background: var(--purple-light);
      border-color: #ddd6fe;
      color: var(--purple-dark);
      font-weight: 700;
    }
    .tool-icon {
      font-size: 16px;
      line-height: 1;
    }
    .tool-name {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.2px;
    }

    /* Bottom Visual Controls Strip */
    .viz-controls-strip {
      border-top: 1px solid var(--border-subtle);
      background: #fafbfc;
      padding: 14px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .controls-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .sliders-group {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .slider-container {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-body);
      background: #ffffff;
      border: 1px solid var(--border-subtle);
      padding: 4px 10px;
      border-radius: 8px;
      box-shadow: var(--shadow-sm);
    }
    .slider-label-text {
      white-space: nowrap;
    }
    .slider-step-btn {
      width: 22px;
      height: 22px;
      border-radius: 5px;
      border: 1px solid var(--border-strong);
      background: var(--surface);
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;
    }
    .slider-step-btn:hover {
      background: #f1f5f9;
    }
    .param-range-slider {
      width: 100px;
      accent-color: var(--purple-primary);
      cursor: pointer;
    }
    .slider-val-badge {
      font-family: var(--font-math);
      font-size: 12.5px;
      font-weight: 700;
      color: var(--purple-primary);
      min-width: 24px;
      text-align: right;
    }

    .toggles-group {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-body);
    }
    .check-label {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      user-select: none;
    }
    .check-label input {
      accent-color: var(--purple-primary);
    }
    .btn-reset {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: 6px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: all 0.15s;
    }
    .btn-reset:hover {
      background: #f1f5f9;
      color: var(--text-main);
    }

    /* Prevent text overflowing out of card boxes and formula badges */
    .mission-title, .mission-instruction, .analogy-text, .why-card-desc,
    .why-card-formula, .pred-question, .pred-opt-text, .pred-feedback,
    .formula-row, .study-card-text, .step-deriv-text, .step-deriv-formula,
    .sandbox-calc-line, .derivation-step-card, .formula-card {
      overflow-wrap: break-word;
      word-break: break-word;
      max-width: 100%;
    }

    /* Scrubber Deck */
    .scrubber-deck {
      display: flex;
      align-items: center;
      gap: 14px;
      padding-top: 8px;
      border-top: 1px dashed var(--border-subtle);
    }
    .btn-play-pause {
      background: var(--purple-primary);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 8px 14px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 2px 6px rgba(124, 58, 237, 0.3);
      transition: all 0.15s;
      flex-shrink: 0;
    }
    .btn-play-pause:hover {
      background: var(--purple-dark);
    }
    .scrubber-range-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .timeline-range {
      flex: 1;
      accent-color: var(--purple-primary);
      cursor: pointer;
      height: 6px;
    }
    .progress-percent {
      font-size: 12px;
      font-weight: 700;
      color: var(--text-muted);
      font-family: var(--font-math);
      min-width: 38px;
      text-align: right;
    }
    .speed-pills {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .speed-btn {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.15s;
    }
    .speed-btn.active {
      background: var(--purple-light);
      border-color: #ddd6fe;
      color: var(--purple-dark);
    }

    .btn-frame-step {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 11px;
      font-weight: 800;
      color: var(--text-body);
      cursor: pointer;
      transition: all 0.15s;
    }
    .btn-frame-step:hover {
      background: var(--purple-light);
      border-color: #ddd6fe;
      color: var(--purple-dark);
    }
    .btn-deck-toggle {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
    }
    .btn-deck-toggle:hover {
      background: #f8fafc;
      color: var(--text-main);
    }
    .btn-deck-toggle.active {
      background: var(--purple-light);
      border-color: #ddd6fe;
      color: var(--purple-dark);
    }
    .mastery-pill {
      font-size: 12px;
      font-weight: 800;
      padding: 6px 12px;
      border-radius: var(--radius-pill);
      background: #fef3c7;
      color: #b45309;
      border: 1px solid #fde68a;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .mastery-pill.mastered {
      background: #dcfce7;
      color: #15803d;
      border-color: #bbf7d0;
    }
    .mission-analogy-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
      background: #faf5ff;
      border: 1px solid #f3e8ff;
      padding: 6px 12px;
      border-radius: 8px;
    }
    .analogy-badge {
      font-size: 10px;
      font-weight: 800;
      color: var(--purple-primary);
      letter-spacing: 0.5px;
      white-space: nowrap;
    }
    .analogy-text {
      font-size: 12px;
      color: var(--purple-dark);
      line-height: 1.4;
      font-weight: 500;
    }

    /* Student Concept Notes Modal */
    .modal-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.45);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
      padding: 20px;
    }
    .modal-dialog {
      background: #ffffff;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-subtle);
      width: 100%;
      max-width: 680px;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 40px -8px rgba(15, 23, 42, 0.25);
      overflow: hidden;
      animation: modalFadeIn 0.2s ease-out;
    }
    @keyframes modalFadeIn {
      from { opacity: 0; transform: scale(0.97) translateY(8px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 24px;
      border-bottom: 1px solid var(--border-subtle);
      background: #fafbfc;
    }
    .modal-header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .modal-badge-icon {
      font-size: 22px;
    }
    .modal-kicker {
      font-size: 10px;
      font-weight: 800;
      color: var(--purple-primary);
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .modal-h3 {
      font-size: 17px;
      font-weight: 800;
      color: var(--text-main);
    }
    .modal-close {
      background: transparent;
      border: none;
      font-size: 18px;
      color: var(--text-muted);
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      line-height: 1;
    }
    .modal-close:hover {
      background: #f1f5f9;
      color: var(--text-main);
    }
    .modal-body-scroll {
      padding: 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .study-card {
      background: #fafbfc;
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .study-card-head {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .study-card-title {
      font-size: 13px;
      font-weight: 800;
      color: var(--text-main);
      letter-spacing: 0.2px;
    }
    .study-card-text {
      font-size: 13px;
      color: var(--text-body);
      line-height: 1.5;
    }
    .derivation-steps-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 4px;
    }
    .derivation-step-card {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      background: #ffffff;
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 10px 12px;
    }
    .step-badge-num {
      width: 20px;
      height: 20px;
      border-radius: 6px;
      background: var(--purple-light);
      color: var(--purple-dark);
      font-size: 11px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .step-deriv-body {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .step-deriv-text {
      font-size: 12px;
      color: var(--text-body);
      font-weight: 600;
    }
    .step-deriv-formula {
      font-size: 13px;
      font-family: var(--font-math);
      color: var(--purple-dark);
      font-weight: 700;
    }
    .sandbox-controls-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 12px;
    }
    .sandbox-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-body);
    }
    .sandbox-slider {
      accent-color: var(--purple-primary);
      cursor: pointer;
    }
    .sandbox-result-box {
      background: #f5f3ff;
      border: 1px solid #ddd6fe;
      border-radius: 8px;
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .sandbox-calc-line {
      font-family: var(--font-math);
      font-size: 14px;
      font-weight: 700;
      color: var(--purple-dark);
    }
    .sandbox-verdict {
      font-size: 11px;
      font-weight: 800;
      color: #047857;
      background: #dcfce7;
      padding: 4px 8px;
      border-radius: 4px;
    }
    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid var(--border-subtle);
      background: #fafbfc;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
    }
    .btn-mark-understood {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 2px 6px rgba(16, 185, 129, 0.25);
    }
    .btn-close-modal {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-body);
      cursor: pointer;
    }
    .btn-close-modal:hover {
      background: #f1f5f9;
      color: var(--text-main);
    }

    /* Accessible Keyboard Shortcuts & KBD Badges */
    .shortcuts-sections {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .shortcuts-group {
      background: #fafbfc;
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 14px 16px;
    }
    .shortcuts-group-title {
      font-size: 11px;
      font-weight: 800;
      color: var(--purple-primary);
      text-transform: uppercase;
      letter-spacing: 0.6px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .shortcuts-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 10px 18px;
    }
    .shortcut-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      font-size: 12.5px;
      color: var(--text-body);
    }
    .shortcut-desc {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .shortcut-keys {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }
    .kbd-key {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 22px;
      height: 22px;
      padding: 0 6px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace;
      font-size: 11px;
      font-weight: 700;
      line-height: 1;
      color: var(--text-main);
      background: #ffffff;
      border: 1px solid var(--border-strong);
      border-bottom: 2px solid #94a3b8;
      border-radius: 5px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
      white-space: nowrap;
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    /* Subtle, Non-Intrusive CSS-Only Success Burst Animation */
    .css-success-burst-container {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      pointer-events: none;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .css-burst-particle {
      position: absolute;
      pointer-events: none;
      opacity: 0;
      will-change: transform, opacity;
      animation: cssBurstParticle 1.8s cubic-bezier(0.12, 0.85, 0.32, 1) var(--delay, 0s) forwards;
    }
    .css-burst-particle.particle-circle {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--bg, #7c3aed);
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.08);
    }
    .css-burst-particle.particle-diamond {
      width: 8px;
      height: 8px;
      background: var(--bg, #10b981);
      transform: rotate(45deg);
      border-radius: 2px;
    }
    .css-burst-particle.particle-star {
      width: 10px;
      height: 10px;
      background: var(--bg, #f59e0b);
      clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    }
    .css-burst-particle.particle-pill {
      width: 12px;
      height: 5px;
      border-radius: 4px;
      background: var(--bg, #ec4899);
    }

    @keyframes cssBurstParticle {
      0% {
        transform: translate(0, 0) scale(0) rotate(0deg);
        opacity: 0;
      }
      12% {
        opacity: 1;
        transform: translate(calc(var(--tx) * 0.18), calc(var(--ty) * 0.18)) scale(1.15) rotate(calc(var(--rot) * 0.2));
      }
      65% {
        opacity: 0.9;
      }
      100% {
        transform: translate(var(--tx), var(--ty)) scale(calc(var(--scale, 1) * 0.55)) rotate(var(--rot));
        opacity: 0;
      }
    }

    .burst-badge {
      position: absolute;
      top: -24px;
      left: 50%;
      transform: translate(-50%, 0);
      background: rgba(255, 255, 255, 0.96);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(16, 185, 129, 0.4);
      box-shadow: 0 10px 25px -4px rgba(16, 185, 129, 0.2), 0 4px 8px rgba(0, 0, 0, 0.04);
      color: #065f46;
      font-size: 13px;
      font-weight: 800;
      padding: 8px 18px;
      border-radius: var(--radius-pill);
      display: inline-flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
      pointer-events: none;
      animation: cssBurstBadge 2.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes cssBurstBadge {
      0% {
        opacity: 0;
        transform: translate(-50%, 16px) scale(0.88);
      }
      16% {
        opacity: 1;
        transform: translate(-50%, 0) scale(1.04);
      }
      26% {
        transform: translate(-50%, 0) scale(1);
      }
      78% {
        opacity: 1;
        transform: translate(-50%, -6px) scale(1);
      }
      100% {
        opacity: 0;
        transform: translate(-50%, -26px) scale(0.94);
      }
    }

    .stage-bar.burst-glow {
      animation: cssStageGlow 1.8s ease-out;
    }
    @keyframes cssStageGlow {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.45); }
      40% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0.12); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }

    .mastery-pill.burst-pop {
      animation: cssPillPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes cssPillPop {
      0% { transform: scale(1); }
      50% { transform: scale(1.16); }
      100% { transform: scale(1); }
    }

    /* Right Panel — "✨ Why it works" */
    .why-panel {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 20px;
      box-shadow: var(--shadow-card);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .why-header {
      font-size: 16px;
      font-weight: 800;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .why-cards-stack {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .why-card {
      background: #fafbfc;
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      transition: all 0.2s;
      cursor: pointer;
    }
    .why-card:hover {
      border-color: #cbd5e1;
      background: #f8fafc;
    }
    .why-card.active {
      border-color: var(--purple-primary);
      background: var(--purple-tint);
    }
    .why-card-top {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .why-num {
      width: 22px;
      height: 22px;
      border-radius: 6px;
      background: #f1f5f9;
      color: var(--text-body);
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .why-card.active .why-num {
      background: var(--purple-primary);
      color: #ffffff;
    }
    .why-card-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--text-main);
    }
    .why-card-desc {
      font-size: 12px;
      color: var(--text-body);
      line-height: 1.4;
    }
    .why-card-formula {
      font-size: 12px;
      font-weight: 600;
      font-family: var(--font-math);
      color: var(--purple-dark);
      background: rgba(124, 58, 237, 0.05);
      padding: 4px 8px;
      border-radius: 4px;
      align-self: flex-start;
    }

    /* Prediction Box */
    .pred-box {
      background: #fafbfc;
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .pred-title {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--purple-primary);
    }
    .pred-question {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-main);
      line-height: 1.4;
    }
    .pred-options-stack {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .pred-option-btn {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 8px 10px;
      font-size: 12px;
      text-align: left;
      color: var(--text-body);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s;
    }
    .pred-option-btn:hover {
      border-color: var(--purple-primary);
      background: var(--purple-tint);
    }
    .pred-opt-indicator {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid #cbd5e1;
      flex-shrink: 0;
    }
    .pred-option-btn.correct {
      border-color: var(--emerald);
      background: var(--emerald-bg);
      color: #065f46;
      font-weight: 600;
    }
    .pred-option-btn.correct .pred-opt-indicator {
      border-color: var(--emerald);
      background: var(--emerald);
    }
    .pred-option-btn.wrong {
      border-color: #f87171;
      background: #fee2e2;
      color: #991b1b;
    }
    .pred-feedback {
      font-size: 12px;
      line-height: 1.4;
      padding: 8px;
      border-radius: 6px;
      display: none;
    }
    .pred-feedback.show {
      display: block;
    }

    /* Prominent Purple Reveal Proof Button */
    .btn-reveal-proof {
      background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
      color: #ffffff;
      border: none;
      border-radius: 12px;
      padding: 14px 20px;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.5px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 14px rgba(124, 58, 237, 0.35);
      transition: all 0.2s;
    }
    .btn-reveal-proof:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(124, 58, 237, 0.45);
    }
    .btn-reveal-proof:active {
      transform: translateY(0);
    }

    /* Formula Breakdown Card */
    .formula-card {
      background: #f8fafc;
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      text-align: center;
    }
    .formula-card-title {
      font-size: 11px;
      font-weight: 800;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .formula-stack {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-family: var(--font-math);
      font-size: 14px;
      color: var(--text-main);
      font-weight: 600;
    }
    .formula-row.formula-highlight {
      font-size: 16px;
      color: var(--purple-primary);
      font-weight: 800;
      padding-top: 4px;
      border-top: 1px dashed var(--border-subtle);
    }
    .formula-success-indicator {
      font-size: 12px;
      font-weight: 700;
      color: #047857;
      background: #dcfce7;
      padding: 6px 10px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    /* Bottom Section (One-Line Proof + Challenge) */
    .bottom-cards-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 20px;
      align-items: stretch;
    }
    .bottom-card {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 20px 24px;
      box-shadow: var(--shadow-card);
      display: flex;
      flex-direction: column;
      gap: 14px;
      justify-content: space-between;
    }
    .bottom-card-title {
      font-size: 15px;
      font-weight: 800;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* One-Line Proof Assembly Tokens */
    .proof-tokens-wrap {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      padding: 12px;
      background: #fafbfc;
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
    }
    .proof-token {
      background: var(--surface);
      border: 1px solid var(--border-strong);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 600;
      font-family: var(--font-math);
      color: var(--text-main);
      box-shadow: var(--shadow-sm);
      user-select: none;
      cursor: pointer;
      transition: all 0.15s;
    }
    .proof-token:hover {
      border-color: var(--purple-primary);
      color: var(--purple-dark);
      transform: translateY(-1px);
    }
    .proof-action-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .btn-verify-proof {
      background: #f1f5f9;
      border: 1px solid var(--border-strong);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 700;
      color: var(--text-main);
      cursor: pointer;
      transition: all 0.15s;
    }
    .btn-verify-proof:hover {
      background: var(--purple-light);
      border-color: var(--purple-primary);
      color: var(--purple-dark);
    }
    .proof-feedback-pill {
      font-size: 12px;
      font-weight: 700;
      color: #047857;
      display: none;
    }

    /* Challenge Box */
    .challenge-desc {
      font-size: 13px;
      color: var(--text-body);
      line-height: 1.5;
    }
    .btn-load-challenge {
      background: var(--amber-bg);
      border: 1px solid #fde68a;
      color: var(--amber);
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s;
    }
    .btn-load-challenge:hover {
      background: #fef08a;
    }

    /* Bottom Lesson Navigation Bar */
    .bottom-nav-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-card);
    }
    .nav-arrow-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      color: var(--text-body);
      padding: 8px 16px;
      border-radius: 8px;
      background: #f8fafc;
      border: 1px solid var(--border-subtle);
      transition: all 0.15s;
    }
    .nav-arrow-btn:hover {
      background: var(--purple-light);
      border-color: #ddd6fe;
      color: var(--purple-dark);
    }
    .current-lesson-indicator {
      font-size: 13px;
      font-weight: 700;
      color: var(--text-muted);
    }

    /* Responsive */
    @media (max-width: 1100px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
      .bottom-cards-grid {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 768px) {
      body { flex-direction: column; }
      .app-sidebar {
        width: 100%;
        height: auto;
        position: static;
        flex-direction: row;
        align-items: center;
        padding: 12px 16px;
      }
      .nav-list, .sidebar-bottom { display: none; }
      .app-main { padding: 16px; }
      .mission-card { flex-direction: column; align-items: flex-start; }
    }
  </style>
</head>
<body>

  <!-- 1. Left Sidebar -->
  <aside class="app-sidebar">
    <div>
      <a href="index.html" class="brand-box">
        <div class="brand-icon">📐</div>
        <div class="brand-text">
          <span class="brand-title">MATHS</span>
          <span class="brand-sub">UNIVERSE</span>
        </div>
      </a>

      <ul class="nav-list">
        <li>
          <a href="index.html" class="nav-link">
            <span class="nav-link-icon">🧭</span>
            <span>Explore</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="nav-link active">
            <span class="nav-link-icon">✨</span>
            <span>Proofs</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="nav-link">
            <span class="nav-link-icon">📝</span>
            <span>Practice</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="nav-link">
            <span class="nav-link-icon">🏆</span>
            <span>Challenges</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="nav-link">
            <span class="nav-link-icon">🔖</span>
            <span>Saved</span>
          </a>
        </li>
      </ul>
    </div>

    <div class="sidebar-bottom">
      <a href="javascript:void(0)" class="settings-btn">
        <span class="nav-link-icon">⚙</span>
        <span>Settings</span>
      </a>
    </div>
  </aside>

  <!-- 2. Main Lesson Application -->
  <main class="app-main">

    <!-- Top Header -->
    <header class="header-bar">
      <div class="header-meta">
        <div class="breadcrumb">Visual Proofs / ${l.category}</div>
        <div class="lesson-title-row">
          <h1 class="lesson-title">${l.title}</h1>
          <span class="badge-pill diff-badge">${enh.difficulty}</span>
          <span class="badge-pill time-badge">⏱ ${enh.time}</span>
        </div>
      </div>

      <div class="header-actions">
        <div class="lang-selector-wrap">
          <label for="languageSelect" class="lang-select-label">🌐 LANGUAGE</label>
          <select id="languageSelect" class="language-select">
            <option value="auto">Auto Detect</option>
            <option value="en-IN">English</option>
            <option value="hi-IN">हिन्दी</option>
            <option value="ta-IN">தமிழ்</option>
            <option value="te-IN">తెలుగు</option>
            <option value="ml-IN">മലയാളം</option>
            <option value="kn-IN">ಕನ್ನಡ</option>
            <option value="bn-IN">বাংলা</option>
            <option value="mr-IN">मराठी</option>
            <option value="gu-IN">ગુજરાતી</option>
            <option value="pa-IN">ਪੰਜਾਬੀ</option>
            <option value="ur-IN">اردو</option>
            <option value="or-IN">ଓଡ଼ିଆ</option>
          </select>
        </div>
        <button class="btn-header btn-maths-guide" id="btnAskGuide">🎤 Ask Maths Guide</button>
        <button class="btn-header" id="btnOpenNotes">📖 Student Notes</button>
        <span class="mastery-pill" id="studentMasteryPill">⭐ 0/3 Mastered</span>
        <button class="btn-header" id="btnHelp" title="Keyboard Shortcuts & Accessibility Guide (?)">⌨ Shortcuts (?)</button>
        <select class="lesson-selector" id="lessonDropdown" onchange="window.location.href=this.value">
          ${optionsHtml}
        </select>
      </div>
    </header>

    <!-- Main Mission Card -->
    <section class="mission-card">
      <div class="mission-left">
        <div class="mission-icon-box">🎯</div>
        <div class="mission-texts">
          <span class="mission-label">MISSION</span>
          <h2 class="mission-title">${enh.missionTitle}</h2>
          <p class="mission-instruction">${enh.missionInstruction}</p>
          <div class="mission-analogy-row">
            <span class="analogy-badge">💡 ANALOGY:</span>
            <span class="analogy-text">${pedagogy.metaphor}</span>
          </div>
        </div>
      </div>

      <div class="mission-stats-group">
        ${statCardsHtml}
      </div>
    </section>

    <!-- Content Grid: Visualization + Why It Works -->
    <div class="content-grid">

      <!-- Left Column: Visualization Card -->
      <section class="viz-card">
        
        <!-- Stage Steps Bar -->
        <div class="stage-bar">
          ${stepTabsHtml}
        </div>

        <!-- Canvas + Vertical Toolbar -->
        <div class="stage-canvas-row">
          <div class="canvas-wrap tool-drag" id="canvasWrap">
            <canvas id="proofCanvas"></canvas>
            <div class="canvas-tool-hud" id="canvasToolHud">✋ Drag Tool Active</div>
            <div class="canvas-teacher-cue" id="canvasTeacherCue">
              <div class="cue-header">
                <span class="cue-pulse"></span>
                <span class="cue-badge">TEACHER VOICE</span>
                <button class="cue-audio-btn" id="cueSpeakBtn" title="Listen to Teacher Explanation">🔊 Listen</button>
              </div>
              <div class="cue-text" id="cueText">${teacherCues[0]}</div>
            </div>
            <div class="canvas-drag-hint" id="canvasDragHint" style="display:none;">↔ Drag to Scrub</div>
          </div>

          <!-- Vertical Palette Toolbar -->
          <div class="vertical-toolbar">
            ${toolbarHtml}
          </div>
        </div>

        <!-- Bottom Visual Controls Strip -->
        <div class="viz-controls-strip">
          <div class="controls-top-row">
            <!-- Parameter Sliders Group -->
            <div class="sliders-group">
              ${allSlidersHtml}
            </div>

            <!-- Checkbox toggles -->
            <div class="toggles-group">
              <label class="check-label" title="Show ghost outline of initial figure">
                <input type="checkbox" id="chkGhost" checked>
                <span>Ghost outlines</span>
              </label>
              <label class="check-label" title="Show coordinate axes and magnetic snap grid">
                <input type="checkbox" id="chkSnap" checked>
                <span>Snap guides</span>
              </label>
              <label class="check-label" title="Lock and display conserved invariant area">
                <input type="checkbox" id="chkAreaLock">
                <span>Equal-area lock</span>
              </label>
              <label class="check-label" title="Toggle live geometric measurements and x-ray inspector">
                <input type="checkbox" id="chkInspector" checked>
                <span>🔬 X-Ray</span>
              </label>
              <button class="btn-reset" id="btnReset" title="Reset all sliders, geometry, and tools to initial defaults">↺ Reset</button>
            </div>
          </div>

          <!-- Scrubber Timeline Deck -->
          <div class="scrubber-deck">
            <button class="btn-play-pause" id="btnPlayPause" title="Play/Pause continuous transformation">
              <span id="playIcon">▶</span>
              <span id="playLabel">Play</span>
            </button>
            
            <button class="btn-frame-step" id="btnStepBack" title="Step backward 5%">|◀</button>

            <div class="scrubber-range-wrap">
              <input type="range" class="timeline-range" id="timelineScrubber" min="0" max="100" value="0">
              <span class="progress-percent" id="progressPercent">0%</span>
            </div>

            <button class="btn-frame-step" id="btnStepFwd" title="Step forward 5%">▶|</button>

            <button class="btn-deck-toggle" id="btnLoop" title="Toggle continuous loop">🔁 Loop</button>
            <button class="btn-deck-toggle" id="btnVoiceToggle" title="Toggle audio spoken teacher cues">🗣️ Voice: OFF</button>

            <div class="speed-pills">
              <button class="speed-btn" data-speed="0.5">0.5×</button>
              <button class="speed-btn active" data-speed="1.0">1×</button>
              <button class="speed-btn" data-speed="2.0">2×</button>
            </div>
          </div>
        </div>

      </section>

      <!-- Right Column: "✨ Why it works" Panel -->
      <aside class="why-panel">
        <div class="why-header">✨ Why it works</div>

        <!-- Numbered Cards (synchronized with steps) -->
        <div class="why-cards-stack">
          ${whyCardsHtml}
        </div>

        <!-- Prediction Card -->
        <div class="pred-box">
          <div class="pred-title">Make a prediction</div>
          <div class="pred-question">${enh.prediction.question}</div>
          <div class="pred-options-stack">
            ${predOptionsHtml}
          </div>
          <div class="pred-feedback" id="predFeedback"></div>
        </div>

        <!-- Prominent Purple Reveal Proof Button -->
        <button class="btn-reveal-proof" id="btnRevealProof">
          <span>✨</span>
          <span>Reveal proof</span>
        </button>

        <!-- Formula Breakdown Card -->
        <div class="formula-card">
          <div class="formula-card-title">Mathematical Invariant</div>
          <div class="formula-stack">
            ${formulaLinesHtml}
          </div>
          <div class="formula-success-indicator">${enh.formulaSuccess}</div>
        </div>
      </aside>

    </div>

    <!-- Bottom Section: One-Line Proof + Challenge -->
    <div class="bottom-cards-grid">
      
      <!-- Build the one-line proof -->
      <div class="bottom-card">
        <div>
          <div class="bottom-card-title">
            <span>🧩</span>
            <span>Build the one-line proof</span>
          </div>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
            Assemble the fundamental algebraic invariants in sequence to complete the formal proof.
          </p>
        </div>

        <div class="proof-tokens-wrap" id="proofTokensContainer">
          ${proofTokensHtml}
        </div>

        <div class="proof-action-row">
          <button class="btn-verify-proof" id="btnVerifyProof">Verify Proof Identity</button>
          <span class="proof-feedback-pill" id="proofFeedbackPill">✓ Proof Verified — Conservation Identity Confirmed!</span>
        </div>
      </div>

      <!-- Challenge Card -->
      <div class="bottom-card">
        <div>
          <div class="bottom-card-title">
            <span>🏆</span>
            <span>Challenge</span>
          </div>
          <p class="challenge-desc" style="margin-top: 8px;">
            ${enh.challenge.desc}
          </p>
        </div>

        <button class="btn-load-challenge" id="btnLoadChallenge">
          <span>⚡</span>
          <span>Load Challenge Preset</span>
        </button>
      </div>

    </div>

    <!-- Bottom Lesson Navigation -->
    <nav class="bottom-nav-bar">
      <a href="${prevL.id}.html" class="nav-arrow-btn">
        <span>← Previous: Lesson ${prevL.num}</span>
      </a>
      <span class="current-lesson-indicator">Lesson ${l.num} of ${allList.length}</span>
      <a href="${nextL.id}.html" class="nav-arrow-btn">
        <span>Next: Lesson ${nextL.num} →</span>
      </a>
    </nav>

  </main>

  <!-- Student Concept Deep-Dive Modal -->
  <div class="modal-backdrop" id="notesModal" style="display:none;">
    <div class="modal-dialog">
      <div class="modal-header">
        <div class="modal-header-left">
          <span class="modal-badge-icon">📖</span>
          <div>
            <div class="modal-kicker">PEDAGOGICAL STUDY GUIDE</div>
            <h3 class="modal-h3">${l.title}</h3>
          </div>
        </div>
        <button class="modal-close" id="btnCloseNotes">✕</button>
      </div>

      <div class="modal-body-scroll">
        <!-- Metaphor Card -->
        <div class="study-card">
          <div class="study-card-head">
            <span>💡</span>
            <span class="study-card-title">Real-World Intuitive Metaphor</span>
          </div>
          <p class="study-card-text">${pedagogy.metaphor}</p>
        </div>

        <!-- Historical Context -->
        <div class="study-card">
          <div class="study-card-head">
            <span>🏛️</span>
            <span class="study-card-title">Historical Origin & Insight</span>
          </div>
          <p class="study-card-text">${pedagogy.history}</p>
        </div>

        <!-- Common Traps -->
        <div class="study-card">
          <div class="study-card-head">
            <span>⚠️</span>
            <span class="study-card-title">Common Traps & Misconceptions to Avoid</span>
          </div>
          <p class="study-card-text">${pedagogy.pitfall}</p>
        </div>

        <!-- Derivation -->
        <div class="study-card">
          <div class="study-card-head">
            <span>📐</span>
            <span class="study-card-title">Formal Proof Derivation</span>
          </div>
          <div class="derivation-steps-list">
            ${derivationHtml}
          </div>
        </div>

        <!-- Interactive Invariant Formula Sandbox -->
        <div class="study-card">
          <div class="study-card-head">
            <span>🔬</span>
            <span class="study-card-title">Live Invariant Calculator</span>
          </div>
          <p style="font-size:12px; color:var(--text-muted);">
            Test values dynamically to verify mathematical conservation across scales:
          </p>
          <div class="sandbox-controls-row">
            <div class="sandbox-field">
              <label>Parameter A: <strong id="valParamA">4</strong></label>
              <input type="range" id="inputParamA" min="1" max="20" value="4" class="sandbox-slider">
            </div>
            <div class="sandbox-field">
              <label>Parameter B: <strong id="valParamB">3</strong></label>
              <input type="range" id="inputParamB" min="1" max="20" value="3" class="sandbox-slider">
            </div>
          </div>
          <div class="sandbox-result-box">
            <div class="sandbox-calc-line" id="sandboxCalcLine">Evaluating identity...</div>
            <div class="sandbox-verdict">✓ Identity Conserved</div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-mark-understood" id="btnMarkUnderstood">
          <span>✓</span>
          <span>Mark as Understood</span>
        </button>
        <button class="btn-close-modal" id="btnCloseNotesFooter">Done</button>
      </div>
    </div>
  </div>

  <!-- Accessible Keyboard Shortcuts Guide Modal -->
  <div class="modal-backdrop" id="shortcutsModal" style="display:none;" role="dialog" aria-modal="true" aria-labelledby="shortcutsModalTitle">
    <div class="modal-dialog">
      <div class="modal-header">
        <div class="modal-header-left">
          <span class="modal-badge-icon">⌨️</span>
          <div>
            <div class="modal-kicker">ACCESSIBILITY & KEYBOARD SHORTCUTS</div>
            <h3 class="modal-h3" id="shortcutsModalTitle">Keyboard Controls & Navigation</h3>
          </div>
        </div>
        <button class="modal-close" id="btnCloseShortcuts" aria-label="Close shortcuts dialog">✕</button>
      </div>

      <div class="modal-body-scroll">
        <div class="shortcuts-sections">
          <!-- Playback & Progression -->
          <div class="shortcuts-group">
            <div class="shortcuts-group-title"><span>▶</span> Playback & Timeline</div>
            <div class="shortcuts-list">
              <div class="shortcut-row">
                <span class="shortcut-desc">Play / Pause animation</span>
                <div class="shortcut-keys"><kbd class="kbd-key">Space</kbd> <span style="font-size:11px; color:var(--text-muted);">or</span> <kbd class="kbd-key">K</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">Step backward 5%</span>
                <div class="shortcut-keys"><kbd class="kbd-key">←</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">Step forward 5%</span>
                <div class="shortcut-keys"><kbd class="kbd-key">→</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">Jump previous / next stage</span>
                <div class="shortcut-keys"><kbd class="kbd-key">Shift</kbd> + <kbd class="kbd-key">←</kbd> / <kbd class="kbd-key">→</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">Navigate step tabs</span>
                <div class="shortcut-keys"><kbd class="kbd-key">↑</kbd> / <kbd class="kbd-key">↓</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">Jump to start / finish</span>
                <div class="shortcut-keys"><kbd class="kbd-key">Home</kbd> / <kbd class="kbd-key">End</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">Previous / next lesson</span>
                <div class="shortcut-keys"><kbd class="kbd-key">[</kbd> / <kbd class="kbd-key">]</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">Toggle loop replay</span>
                <div class="shortcut-keys"><kbd class="kbd-key">L</kbd></div>
              </div>
            </div>
          </div>

          <!-- Reset & Transformations -->
          <div class="shortcuts-group">
            <div class="shortcuts-group-title"><span>↺</span> Reset & Geometric Tools</div>
            <div class="shortcuts-list">
              <div class="shortcut-row">
                <span class="shortcut-desc">Reset all parameters & geometry</span>
                <div class="shortcut-keys"><kbd class="kbd-key">Ctrl</kbd> + <kbd class="kbd-key">R</kbd> <span style="font-size:11px; color:var(--text-muted);">or</span> <kbd class="kbd-key">R</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">✋ Drag tool (scrub / scale)</span>
                <div class="shortcut-keys"><kbd class="kbd-key">1</kbd> <span style="font-size:11px; color:var(--text-muted);">or</span> <kbd class="kbd-key">D</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">↻ Rotate +45° around center</span>
                <div class="shortcut-keys"><kbd class="kbd-key">2</kbd> <span style="font-size:11px; color:var(--text-muted);">or</span> <kbd class="kbd-key">O</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">⧉ Duplicate congruent clone (2× area)</span>
                <div class="shortcut-keys"><kbd class="kbd-key">3</kbd> <span style="font-size:11px; color:var(--text-muted);">or</span> <kbd class="kbd-key">C</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">✂ Dissection crease cut axis</span>
                <div class="shortcut-keys"><kbd class="kbd-key">4</kbd> <span style="font-size:11px; color:var(--text-muted);">or</span> <kbd class="kbd-key">X</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">◇ Cavalieri lateral shear</span>
                <div class="shortcut-keys"><kbd class="kbd-key">5</kbd> <span style="font-size:11px; color:var(--text-muted);">or</span> <kbd class="kbd-key">S</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">🧲 Magnetic snap to key milestones</span>
                <div class="shortcut-keys"><kbd class="kbd-key">6</kbd> <span style="font-size:11px; color:var(--text-muted);">or</span> <kbd class="kbd-key">M</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">Reveal proof breakdown</span>
                <div class="shortcut-keys"><kbd class="kbd-key">Enter</kbd> <span style="font-size:11px; color:var(--text-muted);">or</span> <kbd class="kbd-key">P</kbd></div>
              </div>
            </div>
          </div>

          <!-- Overlays & Assistance -->
          <div class="shortcuts-group">
            <div class="shortcuts-group-title"><span>🔬</span> Overlays & Accessibility</div>
            <div class="shortcuts-list">
              <div class="shortcut-row">
                <span class="shortcut-desc">Toggle Ghost initial outline</span>
                <div class="shortcut-keys"><kbd class="kbd-key">G</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">Toggle Equal-area invariant lock</span>
                <div class="shortcut-keys"><kbd class="kbd-key">A</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">Toggle 🔬 X-Ray inspector</span>
                <div class="shortcut-keys"><kbd class="kbd-key">I</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">Toggle snap grid & axes</span>
                <div class="shortcut-keys"><kbd class="kbd-key">N</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">Toggle Teacher voice teleprompter</span>
                <div class="shortcut-keys"><kbd class="kbd-key">V</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">Toggle Study Notes modal</span>
                <div class="shortcut-keys"><kbd class="kbd-key">Shift</kbd> + <kbd class="kbd-key">N</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">Open this Shortcuts Guide</span>
                <div class="shortcut-keys"><kbd class="kbd-key">?</kbd> <span style="font-size:11px; color:var(--text-muted);">or</span> <kbd class="kbd-key">H</kbd></div>
              </div>
              <div class="shortcut-row">
                <span class="shortcut-desc">Close dialogs / dismiss overlays</span>
                <div class="shortcut-keys"><kbd class="kbd-key">Esc</kbd></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-close-modal" id="btnCloseShortcutsFooter">Got it (Esc)</button>
      </div>
    </div>
  </div>

  <div id="a11yAnnouncer" class="sr-only" aria-live="polite" aria-atomic="true"></div>

  <!-- Subtle CSS-Only Success Burst Animation -->
  <div class="css-success-burst-container" id="cssSuccessBurst" aria-hidden="true"></div>

  <!-- High-Precision Interactive Mathematics Client Engine -->
  <script>
    (function() {
      // Setup High-DPI Canvas
      const canvas = document.getElementById('proofCanvas');
      const wrap = document.getElementById('canvasWrap');
      const ctx = canvas.getContext('2d');
      let W = 0, H = 0;

      function resize() {
        const rect = wrap.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        W = rect.width;
        H = rect.height;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx.scale(dpr, dpr);
      }
      window.addEventListener('resize', resize);
      resize();

      // State
      let progress = 0.0;
      let isPlaying = false;
      let speed = 1.0;
      let lastTime = 0;
      let activeStep = 0;
      const totalSteps = ${l.steps.length};
      const initialSlidersData = ${JSON.stringify(allSliders)};
      const params = ${JSON.stringify(
        (l.sliders || []).reduce((acc, s) => { acc[s.id] = s.val; return acc; }, {})
      )};
      const challengePreset = ${JSON.stringify(enh.challenge.preset || {})};

      // Interactive Tools State
      const toolState = {
        activeTool: 'drag', // 'drag' | 'rotate' | 'duplicate' | 'cut' | 'shear' | 'snap'
        rotationAngle: 0,
        shearOffset: 0,
        duplicate: false,
        cut: false
      };
      const toolHud = document.getElementById('canvasToolHud');
      let hudTimer = null;
      function showToolHud(msg, duration = 2200) {
        if (!toolHud) return;
        toolHud.textContent = msg;
        toolHud.classList.add('visible');
        clearTimeout(hudTimer);
        hudTimer = setTimeout(() => {
          toolHud.classList.remove('visible');
        }, duration);
      }

      // Math & Easing Helpers
      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      // Canvas Rendering Wrappers for Clean Light High-Contrast Math
      function drawText(ctx, text, x, y, col, font) {
        ctx.save();
        ctx.font = font || '13px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        let c = col;
        if (!c || c === '#fff' || c === '#ffffff' || c === '#f8fafc' || c === '#f1f5f9') c = '#0f172a';
        else if (c === '#38bdf8' || c === '#67e8f9' || c === '#7dd3fc') c = '#0369a1';
        else if (c === '#fbbf24' || c === '#fde68a' || c === '#fef08a') c = '#92400e';
        else if (c === '#34d399' || c === '#6ee7b7' || c === '#a7f3d0') c = '#065f46';
        else if (c === '#fda4af' || c === '#fecdd3') c = '#9f1239';
        else if (c === '#94a3b8' || c === '#cbd5e1') c = '#475569';
        ctx.fillStyle = c;
        ctx.fillText(text, x, y);
        ctx.restore();
      }

      function drawSquare(ctx, x, y, size, fill, stroke) {
        ctx.save();
        ctx.fillStyle = (fill === '#1e293b' || fill === '#0f172a' || fill === '#111827') ? '#f8fafc' : fill;
        ctx.strokeStyle = (stroke === '#475569' || stroke === 'rgba(255,255,255,0.15)' || stroke === '#334155') ? '#cbd5e1' : stroke;
        ctx.lineWidth = 1.5;
        ctx.fillRect(x, y, size, size);
        ctx.strokeRect(x, y, size, size);
        ctx.restore();
      }

      function drawTri(ctx, x, y, w, h, col) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + w, y);
        ctx.lineTo(x, y + h);
        ctx.closePath();
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // Inject Mathematical Transformation Engine
      ${rendererCode}

      // UI Elements
      const timelineScrubber = document.getElementById('timelineScrubber');
      const progressPercent = document.getElementById('progressPercent');
      const btnPlayPause = document.getElementById('btnPlayPause');
      const playIcon = document.getElementById('playIcon');
      const playLabel = document.getElementById('playLabel');
      const stepTabBtns = document.querySelectorAll('.step-tab-btn');
      const whyCards = document.querySelectorAll('.why-card');
      const chkGhost = document.getElementById('chkGhost');
      const chkSnap = document.getElementById('chkSnap');
      const chkAreaLock = document.getElementById('chkAreaLock');

      const visitedStagesSet = new Set([0]);
      let stagesBurstTriggered = false;

      function updateStepUI(stepIndex) {
        activeStep = stepIndex;
        visitedStagesSet.add(stepIndex);
        stepTabBtns.forEach((btn, i) => {
          btn.classList.toggle('active', i === stepIndex);
        });
        whyCards.forEach((card, i) => {
          card.classList.toggle('active', i === stepIndex);
        });

        // Trigger CSS-only success animation when student completes all three stages
        if (!stagesBurstTriggered) {
          const reachedThirdStage = stepIndex >= 2;
          const visitedThree = visitedStagesSet.size >= 3 || (visitedStagesSet.has(0) && visitedStagesSet.has(1) && visitedStagesSet.has(2));
          if (reachedThirdStage && visitedThree) {
            stagesBurstTriggered = true;
            triggerCssSuccessBurst('All 3 Stages Completed! ✨');
          }
        }
      }

      function setProgress(p) {
        progress = Math.max(0, Math.min(1, p));
        timelineScrubber.value = Math.round(progress * 100);
        progressPercent.textContent = Math.round(progress * 100) + '%';
        
        // Sync active step
        const stepIdx = Math.min(totalSteps - 1, Math.floor(progress * totalSteps));
        if (stepIdx !== activeStep) {
          updateStepUI(stepIdx);
        }

        if (!stagesBurstTriggered && progress >= 0.95 && visitedStagesSet.size >= 2) {
          stagesBurstTriggered = true;
          triggerCssSuccessBurst('All 3 Stages Completed! ✨');
        }
      }

      // Step tab clicking
      stepTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const step = parseInt(btn.dataset.step, 10);
          setProgress((step + 0.1) / totalSteps);
          updateStepUI(step);
        });
      });

      // Why cards clicking
      whyCards.forEach(card => {
        card.addEventListener('click', () => {
          const step = parseInt(card.dataset.step, 10);
          setProgress((step + 0.1) / totalSteps);
          updateStepUI(step);
        });
      });

      // Scrubber input
      timelineScrubber.addEventListener('input', (e) => {
        setProgress(parseFloat(e.target.value) / 100);
      });

      // Master A11y Feedback Helper
      const a11yAnnouncer = document.getElementById('a11yAnnouncer');
      function announceA11y(msg) {
        if (!a11yAnnouncer) return;
        a11yAnnouncer.textContent = '';
        setTimeout(() => { a11yAnnouncer.textContent = msg; }, 40);
      }

      // Play / Pause Controller
      function togglePlayPause() {
        isPlaying = !isPlaying;
        playIcon.textContent = isPlaying ? '⏸' : '▶';
        playLabel.textContent = isPlaying ? 'Pause' : 'Play';
        if (isPlaying && progress >= 0.99) {
          setProgress(0);
        }
        showToolHud(isPlaying ? '▶ Playing Proof' : '⏸ Paused', 1100);
        announceA11y(isPlaying ? 'Playing proof animation' : 'Paused proof animation');
      }
      btnPlayPause.addEventListener('click', togglePlayPause);

      // Speed toggles
      document.querySelectorAll('.speed-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          speed = parseFloat(btn.dataset.speed);
        });
      });

      // Reset Controller: Restores initial geometric invariant state, sliders, and tools
      function resetAll() {
        isPlaying = false;
        playIcon.textContent = '▶';
        playLabel.textContent = 'Play';
        setProgress(0);
        updateStepUI(0);
        // Reset all tools
        toolState.activeTool = 'drag';
        toolState.rotationAngle = 0;
        toolState.shearOffset = 0;
        toolState.duplicate = false;
        toolState.cut = false;
        canvasWrap.className = 'canvas-wrap tool-drag';
        document.querySelectorAll('.tool-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.tool === 'drag');
        });
        // Reset all sliders to their initial default values
        initialSlidersData.forEach(s => {
          params[s.id] = s.val;
          const inputEl = document.getElementById(s.id);
          const valEl = document.getElementById(s.id + 'Val');
          if (inputEl) inputEl.value = s.val;
          if (valEl) valEl.textContent = s.val;
        });
        showToolHud('↺ Reset to Invariant Defaults', 1500);
        playChime('milestone');
        announceA11y('Reset all parameters and geometry to invariant defaults');
      }
      document.getElementById('btnReset').addEventListener('click', resetAll);

      // Reveal Proof Button
      document.getElementById('btnRevealProof').addEventListener('click', () => {
        isPlaying = false;
        playIcon.textContent = '▶';
        playLabel.textContent = 'Play';
        setProgress(1.0);
        updateStepUI(totalSteps - 1);
        const fb = document.getElementById('proofFeedbackPill');
        if (fb) fb.style.display = 'inline-block';
      });

      // Sliders binding for all sliders in lesson
      initialSlidersData.forEach(s => {
        const sliderEl = document.getElementById(s.id);
        const valEl = document.getElementById(s.id + 'Val');
        if (sliderEl) {
          sliderEl.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            params[s.id] = val;
            if (valEl) valEl.textContent = val;
          });
        }
      });

      // Step Buttons (+ / -) for all sliders
      document.querySelectorAll('.slider-step-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.dataset.target;
          const action = btn.dataset.action;
          const sliderEl = document.getElementById(targetId);
          if (!sliderEl) return;
          const step = parseFloat(sliderEl.step) || 1;
          const min = parseFloat(sliderEl.min);
          const max = parseFloat(sliderEl.max);
          let cur = parseFloat(sliderEl.value);
          if (action === 'dec') cur = Math.max(min, cur - step);
          else if (action === 'inc') cur = Math.min(max, cur + step);
          sliderEl.value = cur;
          sliderEl.dispatchEvent(new Event('input'));
        });
      });

      // Vertical Toolbar buttons with full geometric transformation functionality
      document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const tool = btn.dataset.tool;
          document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          toolState.activeTool = tool;
          canvasWrap.className = 'canvas-wrap tool-' + tool;

          if (tool === 'drag') {
            showToolHud('✋ Drag Tool: Drag horizontally to scrub, vertically to scale');
            playChime('milestone');
          } else if (tool === 'rotate') {
            toolState.rotationAngle = (toolState.rotationAngle + Math.PI / 4) % (Math.PI * 2);
            const deg = Math.round(((toolState.rotationAngle * 180 / Math.PI) % 360 + 360) % 360);
            showToolHud('↻ Rotated +45° (Total: ' + deg + '°)');
            playChime('rotate');
          } else if (tool === 'duplicate') {
            toolState.duplicate = !toolState.duplicate;
            showToolHud(toolState.duplicate ? '⧉ Duplicate Active: Congruent Clone Added (2× Area Invariant)' : '⧉ Duplicate Deactivated');
            playChime('duplicate');
          } else if (tool === 'cut') {
            toolState.cut = !toolState.cut;
            showToolHud(toolState.cut ? '✂ Dissection Cut: Dissection Crease Axis Active' : '✂ Dissection Cut Deactivated');
            playChime('cut');
          } else if (tool === 'shear') {
            toolState.shearOffset = (toolState.shearOffset + 25) % 125;
            showToolHud('◇ Cavalieri Shear: Δx = ' + Math.round(toolState.shearOffset) + 'px (Area Invariant)');
            playChime('shear');
          } else if (tool === 'snap') {
            const milestones = [0, 0.25, 0.333, 0.5, 0.666, 0.75, 1.0];
            let closest = milestones[0];
            let minDiff = Math.abs(progress - milestones[0]);
            for (const m of milestones) {
              const diff = Math.abs(progress - m);
              if (diff < minDiff) { minDiff = diff; closest = m; }
            }
            setProgress(closest);
            toolState.rotationAngle = Math.round(toolState.rotationAngle / (Math.PI / 2)) * (Math.PI / 2);
            toolState.shearOffset = 0;
            showToolHud('🧲 Snapped to Milestone: ' + Math.round(closest * 100) + '% & Orthogonal Axes');
            playChime('snap');
          }
        });
      });

      // Pedagogical Sound Synthesizer (Web Audio API)
      let audioCtx = null;
      function playChime(type) {
        try {
          if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          if (audioCtx.state === 'suspended') audioCtx.resume();
          const now = audioCtx.currentTime;
          if (type === 'milestone') {
            [523.25, 659.25, 783.99].forEach((freq, i) => { // C5, E5, G5
              const osc = audioCtx.createOscillator();
              const gain = audioCtx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(freq, now + i * 0.09);
              gain.gain.setValueAtTime(0.12, now + i * 0.09);
              gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.35);
              osc.connect(gain);
              gain.connect(audioCtx.destination);
              osc.start(now + i * 0.09);
              osc.stop(now + i * 0.09 + 0.35);
            });
          } else if (type === 'success') {
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => { // C5, E5, G5, C6
              const osc = audioCtx.createOscillator();
              const gain = audioCtx.createGain();
              osc.type = 'triangle';
              osc.frequency.setValueAtTime(freq, now + i * 0.11);
              gain.gain.setValueAtTime(0.18, now + i * 0.11);
              gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.11 + 0.5);
              osc.connect(gain);
              gain.connect(audioCtx.destination);
              osc.start(now + i * 0.11);
              osc.stop(now + i * 0.11 + 0.5);
            });
          } else if (type === 'rotate') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.14);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.16);
          } else if (type === 'duplicate') {
            [440, 554.37, 659.25].forEach((freq, i) => {
              const osc = audioCtx.createOscillator();
              const gain = audioCtx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(freq, now + i * 0.05);
              gain.gain.setValueAtTime(0.1, now + i * 0.05);
              gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.22);
              osc.connect(gain);
              gain.connect(audioCtx.destination);
              osc.start(now + i * 0.05);
              osc.stop(now + i * 0.05 + 0.22);
            });
          } else if (type === 'cut') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.exponentialRampToValueAtTime(220, now + 0.09);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.09);
          } else if (type === 'shear') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(330, now);
            osc.frequency.linearRampToValueAtTime(495, now + 0.15);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.18);
          } else if (type === 'snap') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1046.50, now); // C6
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.12);
          }
        } catch(e) { /* ignore audio permission errors */ }
      }

      // High-Craft Canvas Confetti Engine
      const confettiParticles = [];
      function triggerConfetti() {
        playChime('success');
        const colors = ['#7c3aed', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
        for (let i = 0; i < 70; i++) {
          confettiParticles.push({
            x: W / 2 + (Math.random() - 0.5) * 80,
            y: H / 3 + (Math.random() - 0.5) * 40,
            vx: (Math.random() - 0.5) * 12,
            vy: -Math.random() * 8 - 4,
            size: Math.random() * 6 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rot: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.3,
            alpha: 1.0
          });
        }
      }

      // Teacher Voice & Teleprompter
      const teacherCuesList = ${JSON.stringify(teacherCues)};
      const cueTextEl = document.getElementById('cueText');
      let voiceEnabled = false;
      let lastSpokenCueIdx = -1;

      function speakTeacherCue(text) {
        if (!('speechSynthesis' in window)) return;
        try {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(text);
          utter.rate = 1.05;
          utter.pitch = 1.0;
          window.speechSynthesis.speak(utter);
        } catch(e) {}
      }

      document.getElementById('cueSpeakBtn').addEventListener('click', () => {
        if (cueTextEl) speakTeacherCue(cueTextEl.textContent);
      });

      const btnVoiceToggle = document.getElementById('btnVoiceToggle');
      if (btnVoiceToggle) {
        btnVoiceToggle.addEventListener('click', () => {
          voiceEnabled = !voiceEnabled;
          btnVoiceToggle.classList.toggle('active', voiceEnabled);
          btnVoiceToggle.textContent = voiceEnabled ? '🗣️ Voice: ON' : '🗣️ Voice: OFF';
          if (voiceEnabled && cueTextEl) speakTeacherCue(cueTextEl.textContent);
        });
      }

      // Student Mastery State Management (Local Persistence)
      const lessonKey = 'mu_lesson_' + ${JSON.stringify(l.id)};
      let masteryState = { timeline: false, prediction: false, proof: false };
      try {
        const saved = localStorage.getItem(lessonKey);
        if (saved) masteryState = Object.assign(masteryState, JSON.parse(saved));
      } catch(e) {}

      // Subtle, Non-Intrusive CSS-Only Success Animation Engine
      let cssBurstTriggered = false;
      function triggerCssSuccessBurst(message) {
        const msg = message || 'All 3 Stages Completed! ✨';
        playChime('success');
        const container = document.getElementById('cssSuccessBurst');
        if (!container) return;

        container.innerHTML = '';

        // Non-intrusive floating celebratory badge
        const badge = document.createElement('div');
        badge.className = 'burst-badge';
        badge.innerHTML = '<span>🎉</span><span>' + msg + '</span>';
        container.appendChild(badge);

        // Elegant palette of colored particles (geometric math aesthetic)
        const colors = [
          '#7c3aed', '#10b981', '#f59e0b', '#ec4899', '#3b82f6',
          '#8b5cf6', '#06b6d4', '#14b8a6', '#f43f5e', '#6366f1'
        ];
        const shapes = ['particle-circle', 'particle-diamond', 'particle-star', 'particle-pill'];

        // Generate 32 CSS-animated particle elements
        const particleCount = 32;
        for (let i = 0; i < particleCount; i++) {
          const p = document.createElement('span');
          const shape = shapes[i % shapes.length];
          p.className = 'css-burst-particle ' + shape;

          const angle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
          const dist = 75 + Math.random() * 115;
          const tx = Math.round(Math.cos(angle) * dist);
          const ty = Math.round(Math.sin(angle) * dist) - 18;
          const rot = Math.round((Math.random() - 0.5) * 540);
          const scale = (0.65 + Math.random() * 0.6).toFixed(2);
          const delay = (Math.random() * 0.14).toFixed(2);
          const color = colors[i % colors.length];

          p.style.setProperty('--tx', tx + 'px');
          p.style.setProperty('--ty', ty + 'px');
          p.style.setProperty('--rot', rot + 'deg');
          p.style.setProperty('--scale', scale);
          p.style.setProperty('--delay', delay + 's');
          p.style.setProperty('--bg', color);

          container.appendChild(p);
        }

        // Trigger subtle stage bar glow & mastery pill pop
        const stageBar = document.querySelector('.stage-bar');
        if (stageBar) {
          stageBar.classList.remove('burst-glow');
          void stageBar.offsetWidth;
          stageBar.classList.add('burst-glow');
        }
        if (masteryPill) {
          masteryPill.classList.remove('burst-pop');
          void masteryPill.offsetWidth;
          masteryPill.classList.add('burst-pop');
        }

        // Clean up elements after CSS animation completes
        setTimeout(() => {
          container.innerHTML = '';
        }, 2500);
      }

      const masteryPill = document.getElementById('studentMasteryPill');
      function updateMasteryBadge() {
        const count = (masteryState.timeline ? 1 : 0) + (masteryState.prediction ? 1 : 0) + (masteryState.proof ? 1 : 0);
        if (!masteryPill) return;
        if (count === 3) {
          masteryPill.textContent = '★ Mastered! 🎉';
          masteryPill.classList.add('mastered');
        } else {
          masteryPill.textContent = '⭐ ' + count + '/3 Mastered';
          masteryPill.classList.remove('mastered');
        }
        try {
          localStorage.setItem(lessonKey, JSON.stringify(masteryState));
        } catch(e) {}
      }
      updateMasteryBadge();

      if (masteryPill) {
        masteryPill.addEventListener('click', () => {
          const count = (masteryState.timeline ? 1 : 0) + (masteryState.prediction ? 1 : 0) + (masteryState.proof ? 1 : 0);
          if (count === 3) {
            triggerCssSuccessBurst('All 3 Stages Mastered! 🎉');
          }
        });
      }

      function markMilestone(key) {
        if (!masteryState[key]) {
          masteryState[key] = true;
          const total = (masteryState.timeline ? 1 : 0) + (masteryState.prediction ? 1 : 0) + (masteryState.proof ? 1 : 0);
          updateMasteryBadge();
          if (total === 3) {
            triggerConfetti();
            triggerCssSuccessBurst('All 3 Stages Mastered! ⭐⭐⭐');
          } else {
            playChime('milestone');
          }
        }
      }

      // Canvas Multi-Tool Interactive Gesture Controller
      const canvasWrap = document.getElementById('canvasWrap');
      const dragHint = document.getElementById('canvasDragHint');
      let isDraggingCanvas = false;
      let dragStartX = 0, dragStartY = 0;
      let startRotationAngle = 0;
      let startShearOffset = 0;

      function getCanvasProgress(clientX) {
        const rect = canvasWrap.getBoundingClientRect();
        return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      }

      canvasWrap.addEventListener('pointerdown', (e) => {
        if (e.target.closest('#canvasTeacherCue') || e.target.closest('#canvasToolHud')) return;
        isDraggingCanvas = true;
        canvasWrap.setPointerCapture(e.pointerId);
        canvasWrap.classList.add('is-dragging');
        isPlaying = false;
        playIcon.textContent = '▶';
        playLabel.textContent = 'Play';

        dragStartX = e.clientX;
        dragStartY = e.clientY;
        startRotationAngle = toolState.rotationAngle;
        startShearOffset = toolState.shearOffset;

        if (toolState.activeTool === 'drag') {
          if (dragHint) dragHint.style.display = 'block';
          setProgress(getCanvasProgress(e.clientX));
        } else if (toolState.activeTool === 'rotate') {
          const rect = canvasWrap.getBoundingClientRect();
          const startAngle = Math.atan2(e.clientY - rect.top - H / 2, e.clientX - rect.left - W / 2);
          canvasWrap._startAngle = startAngle;
        }
      });

      canvasWrap.addEventListener('pointermove', (e) => {
        if (!isDraggingCanvas) return;

        if (toolState.activeTool === 'drag') {
          setProgress(getCanvasProgress(e.clientX));
          // Fine parameter adjustment via vertical dragging
          const dy = dragStartY - e.clientY;
          if (primarySlider && Math.abs(dy) > 15) {
            const span = (primarySlider.max - primarySlider.min);
            const change = (dy / 250) * span;
            const targetVal = Math.max(primarySlider.min, Math.min(primarySlider.max, Math.round((primarySlider.val + change) * 10) / 10));
            const inputEl = document.getElementById(primarySlider.id);
            if (inputEl && parseFloat(inputEl.value) !== targetVal) {
              inputEl.value = targetVal;
              inputEl.dispatchEvent(new Event('input'));
            }
          }
        } else if (toolState.activeTool === 'rotate') {
          const rect = canvasWrap.getBoundingClientRect();
          const curAngle = Math.atan2(e.clientY - rect.top - H / 2, e.clientX - rect.left - W / 2);
          toolState.rotationAngle = startRotationAngle + (curAngle - (canvasWrap._startAngle || 0));
          const deg = Math.round(((toolState.rotationAngle * 180 / Math.PI) % 360 + 360) % 360);
          showToolHud('↻ Orbit Angle: ' + deg + '°', 1200);
        } else if (toolState.activeTool === 'shear') {
          const dx = e.clientX - dragStartX;
          toolState.shearOffset = startShearOffset + dx;
          showToolHud('◇ Shear: Δx = ' + Math.round(toolState.shearOffset) + 'px', 1200);
        }
      });

      function stopCanvasDrag() {
        if (isDraggingCanvas) {
          isDraggingCanvas = false;
          canvasWrap.classList.remove('is-dragging');
          if (dragHint) dragHint.style.display = 'none';
          if (toolState.activeTool === 'rotate' && chkSnap && chkSnap.checked) {
            const step = Math.PI / 12; // 15 degrees snap
            toolState.rotationAngle = Math.round(toolState.rotationAngle / step) * step;
          }
        }
      }
      canvasWrap.addEventListener('pointerup', stopCanvasDrag);
      canvasWrap.addEventListener('pointercancel', stopCanvasDrag);

      // Frame Step Buttons
      const btnStepBack = document.getElementById('btnStepBack');
      const btnStepFwd = document.getElementById('btnStepFwd');
      if (btnStepBack) {
        btnStepBack.addEventListener('click', () => {
          isPlaying = false;
          playIcon.textContent = '▶';
          playLabel.textContent = 'Play';
          setProgress(Math.max(0, progress - 0.05));
        });
      }
      if (btnStepFwd) {
        btnStepFwd.addEventListener('click', () => {
          isPlaying = false;
          playIcon.textContent = '▶';
          playLabel.textContent = 'Play';
          setProgress(Math.min(1, progress + 0.05));
        });
      }

      // Loop Mode Toggle
      let isLooping = false;
      const btnLoop = document.getElementById('btnLoop');
      if (btnLoop) {
        btnLoop.addEventListener('click', () => {
          isLooping = !isLooping;
          btnLoop.classList.toggle('active', isLooping);
        });
      }

      // Prediction options
      const correctIdx = ${enh.prediction.correct};
      const predFeedback = document.getElementById('predFeedback');
      document.querySelectorAll('.pred-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.index, 10);
          document.querySelectorAll('.pred-option-btn').forEach(b => {
            b.classList.remove('correct', 'wrong');
          });
          predFeedback.classList.add('show');
          if (idx === correctIdx) {
            btn.classList.add('correct');
            predFeedback.style.background = '#dcfce7';
            predFeedback.style.color = '#065f46';
            predFeedback.textContent = '✓ Correct! ' + ${JSON.stringify(enh.prediction.explanation)};
            markMilestone('prediction');
          } else {
            btn.classList.add('wrong');
            predFeedback.style.background = '#fee2e2';
            predFeedback.style.color = '#991b1b';
            predFeedback.textContent = 'Not quite. ' + ${JSON.stringify(enh.prediction.explanation)};
          }
        });
      });

      // One-Line Proof Verification
      const btnVerifyProof = document.getElementById('btnVerifyProof');
      const proofFeedbackPill = document.getElementById('proofFeedbackPill');
      btnVerifyProof.addEventListener('click', () => {
        proofFeedbackPill.style.display = 'inline-block';
        btnVerifyProof.style.background = '#dcfce7';
        btnVerifyProof.style.borderColor = '#10b981';
        btnVerifyProof.style.color = '#065f46';
        markMilestone('proof');
      });

      // Load Challenge Preset
      const btnLoadChallenge = document.getElementById('btnLoadChallenge');
      btnLoadChallenge.addEventListener('click', () => {
        Object.assign(params, challengePreset);
        if (primarySliderEl && challengePreset['${primarySlider.id}'] !== undefined) {
          primarySliderEl.value = challengePreset['${primarySlider.id}'];
          if (primaryValEl) primaryValEl.textContent = challengePreset['${primarySlider.id}'];
        }
        btnLoadChallenge.textContent = '✓ Challenge Active!';
        btnLoadChallenge.style.background = '#dcfce7';
        btnLoadChallenge.style.color = '#065f46';
        setProgress(0.5);
      });

      // Student Notes Modal Controls
      const notesModal = document.getElementById('notesModal');
      const btnOpenNotes = document.getElementById('btnOpenNotes');
      const btnCloseNotes = document.getElementById('btnCloseNotes');
      const btnCloseNotesFooter = document.getElementById('btnCloseNotesFooter');
      const btnMarkUnderstood = document.getElementById('btnMarkUnderstood');

      function openModal() {
        if (notesModal) {
          notesModal.style.display = 'flex';
          announceA11y('Opened Pedagogical Study Notes');
        }
      }
      function closeModal() {
        if (notesModal) {
          notesModal.style.display = 'none';
          announceA11y('Closed Pedagogical Study Notes');
        }
      }

      if (btnOpenNotes) btnOpenNotes.addEventListener('click', openModal);
      if (btnCloseNotes) btnCloseNotes.addEventListener('click', closeModal);
      if (btnCloseNotesFooter) btnCloseNotesFooter.addEventListener('click', closeModal);
      if (btnMarkUnderstood) {
        btnMarkUnderstood.addEventListener('click', () => {
          markMilestone('timeline');
          markMilestone('proof');
          btnMarkUnderstood.textContent = '✓ Understood & Saved!';
          setTimeout(closeModal, 600);
        });
      }
      if (notesModal) {
        notesModal.addEventListener('click', (e) => {
          if (e.target === notesModal) closeModal();
        });
      }

      // Keyboard Shortcuts Modal Controls
      const shortcutsModal = document.getElementById('shortcutsModal');
      const btnHelp = document.getElementById('btnHelp');
      const btnCloseShortcuts = document.getElementById('btnCloseShortcuts');
      const btnCloseShortcutsFooter = document.getElementById('btnCloseShortcutsFooter');

      function openShortcutsModal() {
        if (shortcutsModal) {
          shortcutsModal.style.display = 'flex';
          announceA11y('Opened Keyboard Shortcuts and Accessibility Guide');
        }
      }
      function closeShortcutsModal() {
        if (shortcutsModal) {
          shortcutsModal.style.display = 'none';
          announceA11y('Closed Keyboard Shortcuts Guide');
        }
      }
      function toggleShortcutsModal() {
        if (!shortcutsModal) return;
        if (shortcutsModal.style.display === 'none' || !shortcutsModal.style.display) {
          openShortcutsModal();
        } else {
          closeShortcutsModal();
        }
      }

      if (btnHelp) btnHelp.addEventListener('click', toggleShortcutsModal);
      if (btnCloseShortcuts) btnCloseShortcuts.addEventListener('click', closeShortcutsModal);
      if (btnCloseShortcutsFooter) btnCloseShortcutsFooter.addEventListener('click', closeShortcutsModal);
      if (shortcutsModal) {
        shortcutsModal.addEventListener('click', (e) => {
          if (e.target === shortcutsModal) closeShortcutsModal();
        });
      }

      // Global Accessible Keyboard Shortcut Manager
      const prevLessonUrl = ${JSON.stringify(prevL.id + '.html')};
      const nextLessonUrl = ${JSON.stringify(nextL.id + '.html')};

      function handleGlobalKeydown(e) {
        const isEditingText = ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName);

        // Escape: Close any open modal dialog
        if (e.key === 'Escape') {
          if (shortcutsModal && shortcutsModal.style.display === 'flex') {
            closeShortcutsModal();
            e.preventDefault();
            return;
          }
          if (notesModal && notesModal.style.display === 'flex') {
            closeModal();
            e.preventDefault();
            return;
          }
        }

        // Ctrl+R / Meta+R: Intercept page reload and reset lesson to invariant defaults
        if ((e.ctrlKey || e.metaKey) && (e.key === 'r' || e.key === 'R')) {
          e.preventDefault();
          resetAll();
          return;
        }

        // Ignore single-character action shortcuts if the user is typing in a form field
        if (isEditingText) return;

        // Reset via 'r' or 'R'
        if (e.key === 'r' || e.key === 'R') {
          e.preventDefault();
          resetAll();
          return;
        }

        // Space or 'k': Play / Pause
        if (e.key === ' ' || e.code === 'Space' || e.key === 'k' || e.key === 'K') {
          e.preventDefault();
          togglePlayPause();
          return;
        }

        // ArrowLeft: Step backward
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          isPlaying = false;
          playIcon.textContent = '▶';
          playLabel.textContent = 'Play';
          if (e.shiftKey) {
            // Jump to previous milestone/stage
            const prevMilestone = Math.max(0, (Math.ceil(progress * totalSteps - 0.05) - 1) / totalSteps);
            setProgress(prevMilestone);
            showToolHud('⏮ Stage: ' + Math.round(progress * 100) + '%', 1100);
            announceA11y('Jumped to ' + Math.round(progress * 100) + ' percent');
          } else {
            // Nudge -5%
            setProgress(Math.max(0, progress - 0.05));
            showToolHud('⏪ Step -5% (' + Math.round(progress * 100) + '%)', 1000);
            announceA11y('Stepped back to ' + Math.round(progress * 100) + ' percent');
          }
          return;
        }

        // ArrowRight: Step forward
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          isPlaying = false;
          playIcon.textContent = '▶';
          playLabel.textContent = 'Play';
          if (e.shiftKey) {
            // Jump to next milestone/stage
            const nextMilestone = Math.min(1, (Math.floor(progress * totalSteps + 0.05) + 1) / totalSteps);
            setProgress(nextMilestone);
            showToolHud('⏭ Stage: ' + Math.round(progress * 100) + '%', 1100);
            announceA11y('Jumped to ' + Math.round(progress * 100) + ' percent');
          } else {
            // Nudge +5%
            setProgress(Math.min(1, progress + 0.05));
            showToolHud('⏩ Step +5% (' + Math.round(progress * 100) + '%)', 1000);
            announceA11y('Stepped forward to ' + Math.round(progress * 100) + ' percent');
          }
          return;
        }

        // ArrowUp: Previous Step Tab
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          const targetStep = Math.max(0, activeStep - 1);
          setProgress((targetStep + 0.1) / totalSteps);
          updateStepUI(targetStep);
          showToolHud('Step ' + (targetStep + 1) + ' of ' + totalSteps, 1100);
          announceA11y('Stage ' + (targetStep + 1) + ' of ' + totalSteps);
          return;
        }

        // ArrowDown: Next Step Tab
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const targetStep = Math.min(totalSteps - 1, activeStep + 1);
          setProgress((targetStep + 0.1) / totalSteps);
          updateStepUI(targetStep);
          showToolHud('Step ' + (targetStep + 1) + ' of ' + totalSteps, 1100);
          announceA11y('Stage ' + (targetStep + 1) + ' of ' + totalSteps);
          return;
        }

        // Home: Jump to 0%
        if (e.key === 'Home') {
          e.preventDefault();
          isPlaying = false;
          playIcon.textContent = '▶';
          playLabel.textContent = 'Play';
          setProgress(0);
          showToolHud('⏮ Start of Proof (0%)', 1100);
          announceA11y('Jumped to start of proof');
          return;
        }

        // End: Jump to 100%
        if (e.key === 'End') {
          e.preventDefault();
          isPlaying = false;
          playIcon.textContent = '▶';
          playLabel.textContent = 'Play';
          setProgress(1);
          showToolHud('⏭ Proof Completed (100%)', 1100);
          announceA11y('Jumped to proof completion');
          return;
        }

        // '[': Navigate to previous lesson
        if (e.key === '[') {
          e.preventDefault();
          showToolHud('Navigating to previous lesson...', 1000);
          window.location.href = prevLessonUrl;
          return;
        }

        // ']': Navigate to next lesson
        if (e.key === ']') {
          e.preventDefault();
          showToolHud('Navigating to next lesson...', 1000);
          window.location.href = nextLessonUrl;
          return;
        }

        // '1' or 'd': Drag Tool
        if (e.key === '1' || e.key === 'd' || e.key === 'D') {
          const btn = document.querySelector('.tool-btn[data-tool="drag"]');
          if (btn) { e.preventDefault(); btn.click(); announceA11y('Drag tool activated'); }
          return;
        }

        // '2' or 'o': Rotate Tool
        if (e.key === '2' || e.key === 'o' || e.key === 'O') {
          const btn = document.querySelector('.tool-btn[data-tool="rotate"]');
          if (btn) { e.preventDefault(); btn.click(); announceA11y('Rotate tool triggered'); }
          return;
        }

        // '3' or 'c': Duplicate Tool
        if (e.key === '3' || e.key === 'c' || e.key === 'C') {
          const btn = document.querySelector('.tool-btn[data-tool="duplicate"]');
          if (btn) { e.preventDefault(); btn.click(); announceA11y('Congruent duplicate tool toggled'); }
          return;
        }

        // '4' or 'x': Cut Tool
        if (e.key === '4' || e.key === 'x' || e.key === 'X') {
          const btn = document.querySelector('.tool-btn[data-tool="cut"]');
          if (btn) { e.preventDefault(); btn.click(); announceA11y('Dissection cut tool toggled'); }
          return;
        }

        // '5' or 's': Shear Tool
        if (e.key === '5' || e.key === 's' || e.key === 'S') {
          const btn = document.querySelector('.tool-btn[data-tool="shear"]');
          if (btn) { e.preventDefault(); btn.click(); announceA11y('Cavalieri lateral shear triggered'); }
          return;
        }

        // '6' or 'm': Snap Tool
        if (e.key === '6' || e.key === 'm' || e.key === 'M') {
          const btn = document.querySelector('.tool-btn[data-tool="snap"]');
          if (btn) { e.preventDefault(); btn.click(); announceA11y('Magnetic snap triggered'); }
          return;
        }

        // 'g' or 'G': Toggle Ghost Outlines
        if (e.key === 'g' || e.key === 'G') {
          if (chkGhost) {
            chkGhost.checked = !chkGhost.checked;
            chkGhost.dispatchEvent(new Event('change'));
            showToolHud(chkGhost.checked ? '👻 Ghost Outlines: ON' : '👻 Ghost Outlines: OFF', 1200);
            announceA11y(chkGhost.checked ? 'Ghost outlines enabled' : 'Ghost outlines disabled');
          }
          return;
        }

        // 'a' or 'A': Toggle Equal-Area Lock
        if (e.key === 'a' || e.key === 'A') {
          if (chkAreaLock) {
            chkAreaLock.checked = !chkAreaLock.checked;
            chkAreaLock.dispatchEvent(new Event('change'));
            showToolHud(chkAreaLock.checked ? '⚖ Equal-Area Lock: ON' : '⚖ Equal-Area Lock: OFF', 1200);
            announceA11y(chkAreaLock.checked ? 'Equal-area lock enabled' : 'Equal-area lock disabled');
          }
          return;
        }

        // 'i' or 'I': Toggle X-Ray Inspector
        if (e.key === 'i' || e.key === 'I') {
          const chkInspector = document.getElementById('chkInspector');
          if (chkInspector) {
            chkInspector.checked = !chkInspector.checked;
            chkInspector.dispatchEvent(new Event('change'));
            showToolHud(chkInspector.checked ? '🔬 X-Ray Inspector: ON' : '🔬 X-Ray Inspector: OFF', 1200);
            announceA11y(chkInspector.checked ? 'X-Ray inspector enabled' : 'X-Ray inspector disabled');
          }
          return;
        }

        // 'n' or 'N': Toggle Snap Grid (or Study Notes if Shift+N)
        if (e.key === 'n' || e.key === 'N') {
          if (e.shiftKey) {
            if (notesModal) {
              if (notesModal.style.display === 'flex') closeModal();
              else openModal();
            }
          } else if (chkSnap) {
            chkSnap.checked = !chkSnap.checked;
            chkSnap.dispatchEvent(new Event('change'));
            showToolHud(chkSnap.checked ? '📐 Snap Grid: ON' : '📐 Snap Grid: OFF', 1200);
            announceA11y(chkSnap.checked ? 'Snap grid enabled' : 'Snap grid disabled');
          }
          return;
        }

        // 'l' or 'L': Toggle Loop Replay
        if (e.key === 'l' || e.key === 'L') {
          const btnLoop = document.getElementById('btnLoop');
          if (btnLoop) {
            btnLoop.click();
            showToolHud(btnLoop.classList.contains('active') ? '🔁 Loop Mode: ON' : '🔁 Loop Mode: OFF', 1200);
            announceA11y(btnLoop.classList.contains('active') ? 'Loop mode enabled' : 'Loop mode disabled');
          }
          return;
        }

        // 'v' or 'V': Toggle Teacher Voice Narration
        if (e.key === 'v' || e.key === 'V') {
          const btnVoice = document.getElementById('btnVoiceToggle');
          if (btnVoice) {
            btnVoice.click();
            showToolHud(voiceEnabled ? '🗣️ Teacher Voice: ON' : '🗣️ Teacher Voice: OFF', 1200);
            announceA11y(voiceEnabled ? 'Teacher voice narration enabled' : 'Teacher voice narration disabled');
          }
          return;
        }

        // Enter or 'p': Reveal Proof
        if (e.key === 'Enter' || e.key === 'p' || e.key === 'P') {
          const btnRev = document.getElementById('btnRevealProof');
          if (btnRev && btnRev.style.display !== 'none') {
            btnRev.click();
            showToolHud('✨ Proof Revealed!', 1200);
            announceA11y('Proof breakdown revealed');
          }
          return;
        }

        // '?' or 'h' or '/': Open Keyboard Shortcuts Guide Modal
        if (e.key === '?' || e.key === 'h' || e.key === 'H' || e.key === '/') {
          e.preventDefault();
          toggleShortcutsModal();
          return;
        }
      }

      window.addEventListener('keydown', handleGlobalKeydown);

      // Live Formula Sandbox Calculation
      const inputParamA = document.getElementById('inputParamA');
      const inputParamB = document.getElementById('inputParamB');
      const valParamA = document.getElementById('valParamA');
      const valParamB = document.getElementById('valParamB');
      const sandboxCalcLine = document.getElementById('sandboxCalcLine');

      function updateSandbox() {
        if (!inputParamA || !inputParamB || !sandboxCalcLine) return;
        const a = parseFloat(inputParamA.value);
        const b = parseFloat(inputParamB.value);
        if (valParamA) valParamA.textContent = a;
        if (valParamB) valParamB.textContent = b;

        // Custom live formulas based on lesson formula
        const formulaStr = ${JSON.stringify(l.formula)};
        if (formulaStr.includes('a² + b² = c²') || formulaStr.includes('c²')) {
          const c = Math.sqrt(a * a + b * b).toFixed(2);
          sandboxCalcLine.textContent = a + '² + ' + b + '² = ' + (a*a) + ' + ' + (b*b) + ' = ' + (a*a + b*b) + '  ⇒ c = ' + c;
        } else if (formulaStr.includes('π') || formulaStr.includes('r²')) {
          const area = (Math.PI * a * a).toFixed(2);
          sandboxCalcLine.textContent = 'Radius r = ' + a + '  ⇒ Area = π · ' + a + '² ≈ ' + area;
        } else if (formulaStr.includes('(a + b)²')) {
          const res = (a + b) * (a + b);
          sandboxCalcLine.textContent = '(' + a + ' + ' + b + ')² = ' + (a*a) + ' + ' + (2*a*b) + ' + ' + (b*b) + ' = ' + res;
        } else if (formulaStr.includes('n(n + 1)/2') || formulaStr.includes('n²')) {
          const sum = (a * (a + 1)) / 2;
          sandboxCalcLine.textContent = 'n = ' + a + '  ⇒ Sum = ' + a + ' · (' + (a + 1) + ') / 2 = ' + sum;
        } else {
          const prod = (a * b).toFixed(1);
          sandboxCalcLine.textContent = 'Base = ' + a + ', Height = ' + b + '  ⇒ Conservation Product = ' + prod;
        }
      }
      if (inputParamA) inputParamA.addEventListener('input', updateSandbox);
      if (inputParamB) inputParamB.addEventListener('input', updateSandbox);
      updateSandbox();

      // Master Animation Loop
      function animate(time) {
        if (!lastTime) lastTime = time;
        const dt = (time - lastTime) / 1000;
        lastTime = time;

        if (isPlaying) {
          let nextP = progress + (dt * 0.15 * speed);
          if (nextP >= 1.0) {
            if (isLooping) {
              nextP = 0.0;
            } else {
              nextP = 1.0;
              isPlaying = false;
              playIcon.textContent = '▶';
              playLabel.textContent = 'Play';
            }
          }
          setProgress(nextP);
        }

        // Timeline completion milestone
        if (progress >= 0.98) {
          markMilestone('timeline');
        }

        // Sync Teacher Cue to current stage
        const currentStageIdx = Math.min(teacherCuesList.length - 1, Math.floor(progress * teacherCuesList.length));
        if (cueTextEl && teacherCuesList[currentStageIdx] && cueTextEl.textContent !== teacherCuesList[currentStageIdx]) {
          cueTextEl.textContent = teacherCuesList[currentStageIdx];
          if (voiceEnabled && currentStageIdx !== lastSpokenCueIdx) {
            lastSpokenCueIdx = currentStageIdx;
            speakTeacherCue(teacherCuesList[currentStageIdx]);
          }
        }

        // Draw Canvas Frame
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        // Snap Guides Grid & Orthogonal Axes
        const chkSnap = document.getElementById('chkSnap');
        if (chkSnap && chkSnap.checked) {
          ctx.save();
          ctx.strokeStyle = '#f1f5f9';
          ctx.lineWidth = 1;
          const gridSize = 25;
          for (let x = 0; x <= W; x += gridSize) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
          }
          for (let y = 0; y <= H; y += gridSize) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
          }
          // Major Center Axes
          ctx.strokeStyle = '#cbd5e1';
          ctx.setLineDash([4, 4]);
          ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
          ctx.restore();
        }

        // Ghost Outlines: semi-transparent ghost outline of initial figure (at progress = 0)
        const chkGhost = document.getElementById('chkGhost');
        if (chkGhost && chkGhost.checked && progress > 0.06) {
          ctx.save();
          ctx.globalAlpha = 0.22;
          ctx.setLineDash([4, 4]);
          try {
            render(ctx, W, H, 0, params);
          } catch(e) {}
          ctx.restore();
        }

        // Equal Area Lock Badge
        const chkAreaLock = document.getElementById('chkAreaLock');
        if (chkAreaLock && chkAreaLock.checked) {
          ctx.save();
          ctx.fillStyle = '#f5f3ff';
          ctx.strokeStyle = '#7c3aed';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(16, 16, 175, 26, 6);
          ctx.fill();
          ctx.stroke();
          drawText(ctx, '⚖ Area Invariant: Locked', 103, 29, '#6d28d9', '11px bold sans-serif');
          ctx.restore();
        }

        // X-Ray Inspector Overlay
        const chkInspector = document.getElementById('chkInspector');
        if (chkInspector && chkInspector.checked) {
          ctx.save();
          ctx.strokeStyle = 'rgba(124, 58, 237, 0.22)';
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(16, 16, W - 32, H - 32);

          // Center coordinate crosshair
          ctx.strokeStyle = 'rgba(124, 58, 237, 0.5)';
          ctx.beginPath();
          ctx.arc(W / 2, H / 2, 8, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(W / 2, H / 2, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#7c3aed';
          ctx.fill();

          // Bottom-left invariant readout badge
          ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
          ctx.beginPath();
          ctx.roundRect(16, H - 36, 195, 24, 6);
          ctx.fill();
          drawText(ctx, '🔬 Invariant: ' + ${JSON.stringify(l.formula)}, 113, H - 24, '#ffffff', '11px sans-serif');
          ctx.restore();
        }

        // Apply Transform Matrix for Rotation & Shear Tools
        ctx.save();
        const cx = W / 2, cy = H * 0.5;

        if (toolState.shearOffset !== 0) {
          const sFactor = toolState.shearOffset / Math.max(100, H * 0.5);
          ctx.transform(1, 0, sFactor, 1, -sFactor * cy, 0);
        }

        if (toolState.rotationAngle !== 0) {
          ctx.translate(cx, cy);
          ctx.rotate(toolState.rotationAngle);
          ctx.translate(-cx, -cy);
        }

        // 1. Primary Mathematical Renderer
        render(ctx, W, H, progress, params);

        // 2. Congruent Duplicate Clone Tool
        if (toolState.duplicate) {
          ctx.save();
          ctx.globalAlpha = 0.52;
          ctx.translate(32, -26);
          ctx.setLineDash([4, 4]);
          try {
            render(ctx, W, H, progress, params);
          } catch(e) {}
          ctx.restore();
          drawText(ctx, '⧉ Congruent Duplicate (2× Total Area Invariant)', cx + 32, cy - 80, '#b45309', '11px bold sans-serif');
        }

        // 3. Dissection Cut Tool
        if (toolState.cut) {
          ctx.save();
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2;
          ctx.setLineDash([6, 4]);
          ctx.beginPath();
          ctx.moveTo(cx - 130, cy);
          ctx.lineTo(cx + 130, cy);
          ctx.stroke();
          drawText(ctx, '✂ Dissection Crease Axis', cx, cy - 14, '#ef4444', '11px bold sans-serif');
          ctx.restore();
        }

        ctx.restore(); // Restore transform matrix

        // Render Confetti Particles
        if (confettiParticles.length > 0) {
          ctx.save();
          for (let i = confettiParticles.length - 1; i >= 0; i--) {
            const p = confettiParticles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.25; // gravity
            p.rot += p.vRot;
            p.alpha -= 0.012;
            if (p.alpha <= 0 || p.y > H + 20) {
              confettiParticles.splice(i, 1);
              continue;
            }
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
            ctx.restore();
          }
          ctx.restore();
        }

        ctx.restore();
        requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    })();
  </script>

  <!-- Universal Multilingual Voice Agent & Mathematical Intent Engine -->
  <script>
    window.__LESSON_METADATA__ = {
      id: ${JSON.stringify(l.id)},
      title: ${JSON.stringify(l.title)},
      category: ${JSON.stringify(l.category)},
      formula: ${JSON.stringify(l.formula)},
      cues: ${JSON.stringify(teacherCues)},
      missionTitle: ${JSON.stringify(enh.missionTitle)},
      missionInstruction: ${JSON.stringify(enh.missionInstruction)},
      analogy: ${JSON.stringify(pedagogy.analogy || '')},
      prediction: ${JSON.stringify(enh.prediction || {})},
      challenge: ${JSON.stringify(enh.challenge || {})}
    };
  </script>
  <script>
    ${multilingualClientCode}
  </script>
</body>
</html>`;
}

export function renderIndexHtml(allList) {
  const cardsHtml = allList.map((l, index) => {
    let diff = 'BEGINNER';
    let diffBg = '#dcfce7', diffCol = '#15803d';
    if (['13', '15', '17', '21', '25', '26', '28', '30', '32'].includes(l.num)) {
      diff = 'ADVANCED';
      diffBg = '#fee2e2';
      diffCol = '#b91c1c';
    } else if (['06', '11', '12', '14', '18', '20', '24', '27', '29', '31'].includes(l.num)) {
      diff = 'INTERMEDIATE';
      diffBg = '#fef3c7';
      diffCol = '#b45309';
    }

    return `
    <article class="lesson-card" data-category="${l.category.toLowerCase()}" data-title="${l.title.toLowerCase()}" data-lesson-id="${l.id}">
      <div class="card-top">
        <span class="card-num">${l.num}</span>
        <div class="card-badges">
          <span class="cat-pill">${l.category}</span>
          <span class="diff-pill" style="background:${diffBg}; color:${diffCol};">${diff}</span>
          <span class="student-status-badge" data-badge-id="${l.id}">✦ New</span>
        </div>
      </div>

      <h3 class="card-title">${l.title}</h3>
      <p class="card-sub">${l.subtitle}</p>

      <div class="card-formula-pill">
        <span>Formula:</span>
        <strong>${l.formula}</strong>
      </div>

      <p class="card-mission">${l.mission}</p>

      <div class="card-bottom">
        <span class="card-time">⏱ 8 minutes</span>
        <a href="${l.id}.html" class="btn-open-lesson">
          <span>OPEN LESSON</span>
          <span>→</span>
        </a>
      </div>
    </article>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Maths Universe — Interactive Visual Proofs</title>
  <meta name="description" content="32 interactive visual mathematical proofs and animated geometry lessons with step-by-step explorations.">
  <meta property="og:title" content="Maths Universe — Interactive Visual Proofs">
  <meta property="og:description" content="32 interactive visual mathematical proofs and animated geometry lessons with step-by-step explorations.">
  <style>
    :root {
      --bg-canvas: #f8fafc;
      --surface: #ffffff;
      --border-subtle: #e2e8f0;
      --border-strong: #cbd5e1;
      --purple-primary: #7c3aed;
      --purple-dark: #6d28d9;
      --purple-light: #ede9fe;
      --text-main: #0f172a;
      --text-body: #334155;
      --text-muted: #64748b;
      --font-ui: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-math: "Cambria Math", serif;
      --shadow-card: 0 2px 8px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg-canvas);
      color: var(--text-main);
      font-family: var(--font-ui);
      display: flex;
      min-height: 100vh;
    }

    /* Left Sidebar */
    .app-sidebar {
      width: 230px;
      background: var(--surface);
      border-right: 1px solid var(--border-subtle);
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: sticky;
      top: 0;
      height: 100vh;
      padding: 24px 16px;
      z-index: 40;
    }
    .brand-box {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      padding: 0 8px 24px 8px;
      border-bottom: 1px solid var(--border-subtle);
    }
    .brand-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 19px;
      box-shadow: 0 4px 10px rgba(124, 58, 237, 0.25);
    }
    .brand-text {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
    }
    .brand-title {
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 1.5px;
      color: #1e1b4b;
    }
    .brand-sub {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2px;
      color: var(--purple-primary);
    }

    .nav-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 20px;
      list-style: none;
    }
    .nav-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-radius: 12px;
      color: var(--text-muted);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.15s;
    }
    .nav-link:hover {
      background: #f1f5f9;
      color: var(--text-main);
    }
    .nav-link.active {
      background: var(--purple-light);
      color: var(--purple-dark);
      font-weight: 600;
    }

    /* Main Area */
    .app-main {
      flex: 1;
      min-width: 0;
      padding: 32px 40px 64px 40px;
      display: flex;
      flex-direction: column;
      gap: 28px;
      max-width: 1440px;
      margin: 0 auto;
    }

    .library-header {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .breadcrumb {
      font-size: 12px;
      font-weight: 700;
      color: var(--purple-primary);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .library-title {
      font-size: 32px;
      font-weight: 800;
      color: var(--text-main);
      letter-spacing: -0.5px;
    }
    .library-desc {
      font-size: 15px;
      color: var(--text-muted);
      max-width: 760px;
      line-height: 1.5;
    }

    /* Filters Bar */
    .filters-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: 14px;
      padding: 12px 18px;
      box-shadow: var(--shadow-card);
    }
    .category-pills {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .cat-btn {
      background: #f8fafc;
      border: 1px solid var(--border-subtle);
      border-radius: 9999px;
      padding: 6px 14px;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-body);
      cursor: pointer;
      transition: all 0.15s;
    }
    .cat-btn:hover {
      background: #f1f5f9;
    }
    .cat-btn.active {
      background: var(--purple-primary);
      border-color: var(--purple-primary);
      color: #ffffff;
    }

    .search-input {
      background: #f8fafc;
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 8px 14px;
      font-size: 13px;
      color: var(--text-main);
      width: 240px;
      outline: none;
      transition: all 0.15s;
    }
    .search-input:focus {
      background: var(--surface);
      border-color: var(--purple-primary);
      box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
    }

    /* Cards Grid */
    .lessons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 20px;
    }
    .lesson-card {
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: 16px;
      padding: 20px;
      box-shadow: var(--shadow-card);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 12px;
      transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
      will-change: transform, box-shadow;
    }
    .lesson-card:hover {
      border-color: #c4b5fd;
      transform: scale(1.02);
      box-shadow: 0 14px 28px -4px rgba(15, 23, 42, 0.08), 0 6px 12px -2px rgba(124, 58, 237, 0.05);
    }
    .lesson-card:active {
      transform: scale(1.0);
      transition-duration: 0.1s;
    }
    .card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .card-num {
      font-size: 12px;
      font-weight: 800;
      color: var(--purple-primary);
      background: var(--purple-light);
      padding: 4px 8px;
      border-radius: 6px;
    }
    .card-badges {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .cat-pill {
      font-size: 11px;
      font-weight: 600;
      color: var(--purple-dark);
      background: #f5f3ff;
      padding: 3px 8px;
      border-radius: 9999px;
    }
    .diff-pill {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 9999px;
    }
    .student-status-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 9999px;
      background: #f1f5f9;
      color: var(--text-muted);
      transition: all 0.2s;
    }
    .student-status-badge.inprogress {
      background: #fef3c7;
      color: #b45309;
    }
    .student-status-badge.mastered {
      background: #dcfce7;
      color: #15803d;
    }

    /* Student Learning Dashboard */
    .mastery-dashboard-card {
      background: linear-gradient(135deg, #ffffff 0%, #faf5ff 100%);
      border: 1px solid #e9d5ff;
      border-radius: 16px;
      padding: 18px 24px;
      box-shadow: 0 4px 14px rgba(124, 58, 237, 0.06);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      flex-wrap: wrap;
    }
    .mastery-dash-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .mastery-trophy {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: #f5f3ff;
      border: 1px solid #ddd6fe;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    .mastery-dash-title {
      font-size: 15px;
      font-weight: 800;
      color: #1e1b4b;
    }
    .mastery-dash-sub {
      font-size: 13px;
      color: var(--text-muted);
      margin-top: 2px;
    }
    .mastery-progress-bar-wrap {
      flex: 1;
      max-width: 320px;
      height: 10px;
      background: #e2e8f0;
      border-radius: 9999px;
      overflow: hidden;
      min-width: 140px;
    }
    .mastery-progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #7c3aed 0%, #10b981 100%);
      border-radius: 9999px;
      transition: width 0.4s ease;
    }

    .card-title {
      font-size: 17px;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1.3;
    }
    .card-sub {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.4;
    }
    .card-formula-pill {
      background: #fafbfc;
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 12px;
      color: var(--text-body);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .card-formula-pill strong {
      font-family: var(--font-math);
      color: var(--purple-dark);
    }
    .card-mission {
      font-size: 12px;
      color: var(--text-muted);
      line-height: 1.5;
    }
    .card-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 12px;
      border-top: 1px solid var(--border-subtle);
    }
    .card-time {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
    }
    .btn-open-lesson {
      background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
      color: #ffffff;
      text-decoration: none;
      font-size: 12px;
      font-weight: 800;
      padding: 8px 14px;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      letter-spacing: 0.5px;
      transition: all 0.15s;
    }
    .btn-open-lesson:hover {
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.35);
    }

    @media (max-width: 768px) {
      body { flex-direction: column; }
      .app-sidebar { width: 100%; height: auto; position: static; }
      .nav-list { display: none; }
      .app-main { padding: 20px; }
      .lessons-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  <aside class="app-sidebar">
    <div>
      <a href="index.html" class="brand-box">
        <div class="brand-icon">📐</div>
        <div class="brand-text">
          <span class="brand-title">MATHS</span>
          <span class="brand-sub">UNIVERSE</span>
        </div>
      </a>

      <ul class="nav-list">
        <li>
          <a href="index.html" class="nav-link active">
            <span class="nav-link-icon">🧭</span>
            <span>Explore</span>
          </a>
        </li>
        <li>
          <a href="lesson-01.html" class="nav-link">
            <span class="nav-link-icon">✨</span>
            <span>Proofs</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="nav-link">
            <span class="nav-link-icon">📝</span>
            <span>Practice</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="nav-link">
            <span class="nav-link-icon">🏆</span>
            <span>Challenges</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="nav-link">
            <span class="nav-link-icon">🔖</span>
            <span>Saved</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>

  <main class="app-main">
    <div class="index-top-bar" style="display: flex; justify-content: flex-end; align-items: center; gap: 12px; margin-bottom: 20px;">
      <div class="lang-selector-wrap">
        <label for="languageSelect" class="lang-select-label">🌐 LANGUAGE</label>
        <select id="languageSelect" class="language-select">
          <option value="auto">Auto Detect</option>
          <option value="en-IN">English</option>
          <option value="hi-IN">हिन्दी</option>
          <option value="ta-IN">தமிழ்</option>
          <option value="te-IN">తెలుగు</option>
          <option value="ml-IN">മലയാളം</option>
          <option value="kn-IN">ಕನ್ನಡ</option>
          <option value="bn-IN">বাংলা</option>
          <option value="mr-IN">मराठी</option>
          <option value="gu-IN">ગુજરાતી</option>
          <option value="pa-IN">ਪੰਜਾਬੀ</option>
          <option value="ur-IN">اردو</option>
          <option value="or-IN">ଓଡ଼ିଆ</option>
        </select>
      </div>
      <button class="btn-header btn-maths-guide" id="btnAskGuide" style="padding: 7px 16px; font-weight: 700; border-radius: 10px; cursor: pointer;">🎤 Ask Maths Guide</button>
    </div>

    <div class="library-header">
      <div class="breadcrumb">Maths Universe / Interactive Library</div>
      <h1 class="library-title">32 Interactive Visual Proofs</h1>
      <p class="library-desc">
        Touch, scrub, and discover why mathematics works through geometric and algebraic transformations.
        Each lesson is a self-contained interactive proof environment built with rigorous mathematical visual models.
      </p>
    </div>

    <!-- Student Learning Dashboard -->
    <div class="mastery-dashboard-card">
      <div class="mastery-dash-left">
        <div class="mastery-trophy">🎓</div>
        <div>
          <div class="mastery-dash-title">Student Learning Journey</div>
          <div class="mastery-dash-sub">
            <span id="statMasteredCount">0</span> of 32 Visual Proofs Mastered · <span id="statMasteredPercent">0%</span> Complete
          </div>
        </div>
      </div>
      <div class="mastery-progress-bar-wrap">
        <div class="mastery-progress-bar-fill" id="masteryProgressFill" style="width: 0%;"></div>
      </div>
    </div>

    <div class="filters-bar">
      <div class="category-pills">
        <button class="cat-btn active" data-filter="all">All (32)</button>
        <button class="cat-btn" data-filter="mastered">⭐ Mastered (<span id="masteredFilterCount">0</span>)</button>
        <button class="cat-btn" data-filter="inprogress">⏳ In Progress (<span id="inProgressFilterCount">0</span>)</button>
        <button class="cat-btn" data-filter="geometry">Geometry (16)</button>
        <button class="cat-btn" data-filter="algebra">Algebra (5)</button>
        <button class="cat-btn" data-filter="calculus & limits">Calculus & Limits (6)</button>
        <button class="cat-btn" data-filter="trigonometry">Trigonometry (2)</button>
        <button class="cat-btn" data-filter="number theory">Number Theory (3)</button>
      </div>

      <input type="text" class="search-input" id="searchInput" placeholder="Search proofs or formulas...">
    </div>

    <div class="lessons-grid" id="lessonsGrid">
      ${cardsHtml}
    </div>
  </main>

  <script>
    (function() {
      const searchInput = document.getElementById('searchInput');
      const cards = document.querySelectorAll('.lesson-card');
      const catBtns = document.querySelectorAll('.cat-btn');
      let currentFilter = 'all';

      // Read local mastery state and annotate cards
      let masteredCount = 0;
      let inProgressCount = 0;

      cards.forEach(card => {
        const lessonId = card.dataset.lessonId;
        const badge = card.querySelector('.student-status-badge');
        let state = { timeline: false, prediction: false, proof: false };
        try {
          const saved = localStorage.getItem('mu_lesson_' + lessonId);
          if (saved) state = Object.assign(state, JSON.parse(saved));
        } catch(e) {}

        const score = (state.timeline ? 1 : 0) + (state.prediction ? 1 : 0) + (state.proof ? 1 : 0);
        if (score === 3) {
          card.dataset.status = 'mastered';
          if (badge) {
            badge.textContent = '★ Mastered';
            badge.className = 'student-status-badge mastered';
          }
          masteredCount++;
        } else if (score > 0) {
          card.dataset.status = 'inprogress';
          if (badge) {
            badge.textContent = '⏳ ' + score + '/3 In Progress';
            badge.className = 'student-status-badge inprogress';
          }
          inProgressCount++;
        } else {
          card.dataset.status = 'new';
        }
      });

      // Update Dashboard Stats
      const statMasteredCount = document.getElementById('statMasteredCount');
      const statMasteredPercent = document.getElementById('statMasteredPercent');
      const masteryProgressFill = document.getElementById('masteryProgressFill');
      const masteredFilterCount = document.getElementById('masteredFilterCount');
      const inProgressFilterCount = document.getElementById('inProgressFilterCount');

      if (statMasteredCount) statMasteredCount.textContent = masteredCount;
      const pct = Math.round((masteredCount / cards.length) * 100);
      if (statMasteredPercent) statMasteredPercent.textContent = pct + '%';
      if (masteryProgressFill) masteryProgressFill.style.width = pct + '%';
      if (masteredFilterCount) masteredFilterCount.textContent = masteredCount;
      if (inProgressFilterCount) inProgressFilterCount.textContent = inProgressCount;

      function filterCards() {
        const query = (searchInput.value || '').toLowerCase().trim();
        cards.forEach(card => {
          const cat = card.dataset.category || '';
          const title = card.dataset.title || '';
          const status = card.dataset.status || 'new';

          let matchCat = false;
          if (currentFilter === 'all') matchCat = true;
          else if (currentFilter === 'mastered') matchCat = (status === 'mastered');
          else if (currentFilter === 'inprogress') matchCat = (status === 'inprogress');
          else matchCat = (cat === currentFilter);

          const matchQuery = !query || title.includes(query) || cat.includes(query);
          card.style.display = (matchCat && matchQuery) ? 'flex' : 'none';
        });
      }

      catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          catBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentFilter = btn.dataset.filter;
          filterCards();
        });
      });

      searchInput.addEventListener('input', filterCards);

      // Keyboard navigation for catalog
      window.addEventListener('keydown', (e) => {
        const isEditingText = ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName);
        if (e.key === '/' && !isEditingText) {
          e.preventDefault();
          searchInput.focus();
          searchInput.select();
          return;
        }
        if (e.key === 'Escape') {
          if (searchInput === document.activeElement) {
            searchInput.blur();
          } else if (searchInput.value) {
            searchInput.value = '';
            filterCards();
          }
          return;
        }
        // Switch categories 1-8 if not in search input
        if (!isEditingText && e.key >= '1' && e.key <= '8') {
          const idx = parseInt(e.key, 10) - 1;
          if (catBtns[idx]) {
            e.preventDefault();
            catBtns[idx].click();
          }
        }
      });
    })();
  </script>

  <!-- Universal Multilingual Voice Agent & Mathematical Intent Engine -->
  <script>
    ${multilingualClientCode}
  </script>
</body>
</html>`;
}
