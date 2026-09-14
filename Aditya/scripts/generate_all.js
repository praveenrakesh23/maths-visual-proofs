// generate_all.js - Master generator for Maths Universe
// Generates index.html and all 32 standalone interactive lesson HTML files.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Import lesson definitions
import { LESSONS } from './lessons_data.js';
import { LESSONS_PART2 } from './lessons_data_part2.js';
import { LESSONS_PART3 } from './lessons_data_part3.js';
import { getRendererPart1 } from './all_renderers_1.js';
import { getRendererPart2 } from './all_renderers_2.js';
import { LESSON_ENHANCEMENTS } from './lesson_meta_enhancer.js';
import { renderLessonHtml, renderIndexHtml } from './ui_template.js';

const ALL_LESSONS = [...LESSONS, ...LESSONS_PART2, ...LESSONS_PART3];

console.log(`Loaded ${ALL_LESSONS.length} lessons from metadata.`);

function getRendererCode(renderType) {
  const r1 = getRendererPart1(renderType);
  if (r1) return r1;
  const r2 = getRendererPart2(renderType);
  if (r2) return r2;

  // Fallback
  return `
    function render(ctx, W, H, p, params) {
      const cx = W / 2, cy = H / 2;
      const t = easeInOutCubic(p);

      drawText(ctx, 'Geometric Proof & Transformation Engine', cx, 40, '#0f172a', '16px bold sans-serif');

      ctx.beginPath();
      ctx.arc(cx, cy, 110, 0, 2 * Math.PI);
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.stroke();

      const sides = 6;
      ctx.beginPath();
      for (let i = 0; i <= sides; i++) {
        const ang = (i / sides) * 2 * Math.PI + t * Math.PI * 0.5;
        const r = 90 + Math.sin(ang * 3 + t * 4) * 12;
        const px = cx + Math.cos(ang) * r;
        const py = cy + Math.sin(ang) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(124, 58, 237, 0.15)';
      ctx.fill();
      ctx.strokeStyle = '#7c3aed';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      drawText(ctx, Math.round(p * 100) + '%', cx, cy - 8, '#7c3aed', '24px bold sans-serif');
      drawText(ctx, 'Transformation Progress', cx, cy + 18, '#64748b', '13px sans-serif');
      drawText(ctx, 'Use Play or Timeline Scrubber to step through mathematical transformation stages', cx, H - 24, '#047857', '13px font-semibold');
    }
  `;
}

// Generate all 32 lessons
ALL_LESSONS.forEach((lesson, index) => {
  const prevLesson = index > 0 ? ALL_LESSONS[index - 1] : ALL_LESSONS[ALL_LESSONS.length - 1];
  const nextLesson = index < ALL_LESSONS.length - 1 ? ALL_LESSONS[index + 1] : ALL_LESSONS[0];
  const enhancement = LESSON_ENHANCEMENTS[lesson.id];
  const rendererCode = getRendererCode(lesson.renderType);

  const html = renderLessonHtml(lesson, prevLesson, nextLesson, ALL_LESSONS, enhancement, rendererCode);
  const filePath = path.join(rootDir, `${lesson.id}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Generated: ${lesson.id}.html`);
});

// Generate index.html
const indexHtml = renderIndexHtml(ALL_LESSONS);
fs.writeFileSync(path.join(rootDir, 'index.html'), indexHtml, 'utf8');
console.log('Generated: index.html');

console.log('Build complete! All 32 lessons and index.html generated successfully.');
