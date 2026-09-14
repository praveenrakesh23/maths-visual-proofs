// renderers.js - High-DPI interactive canvas visual proof engines for all 32 lessons

export function getRendererScript(renderType) {
  switch (renderType) {
    case 'pythagoras_rearrangement':
      return `
        function render(ctx, W, H, p, params) {
          const a = (params.sideA || 60);
          const b = (params.sideB || 80);
          const total = a + b;
          const scale = Math.min((W - 140) / (total * 2.2), (H - 120) / total);
          const sA = a * scale;
          const sB = b * scale;
          const sT = total * scale;
          const c = Math.sqrt(a*a + b*b);

          ctx.clearRect(0, 0, W, H);
          ctx.save();

          // Center coordinate setup
          const cx1 = W * 0.28;
          const cx2 = W * 0.72;
          const cy = H * 0.5;

          // Easing
          const t = easeInOutCubic(p);

          // Draw Box 1 (Config A: a² and b²)
          drawSquare(ctx, cx1 - sT/2, cy - sT/2, sT, '#1e293b', '#475569');
          // Draw Box 2 (Config B: c²)
          drawSquare(ctx, cx2 - sT/2, cy - sT/2, sT, '#1e293b', '#475569');

          // Titles
          drawText(ctx, 'Config A: a² + b²', cx1, cy - sT/2 - 20, '#38bdf8', '16px bold sans-serif');
          drawText(ctx, 'Config B: c²', cx2, cy - sT/2 - 20, '#fbbf24', '16px bold sans-serif');

          // In Config A:
          // Triangle 1: top-left
          drawRightTriangle(ctx, cx1 - sT/2, cy - sT/2, sA, sB, 0, '#06b6d4');
          // Triangle 2: bottom-left
          drawRightTriangle(ctx, cx1 - sT/2 + sA, cy - sT/2 + sB, sB, sA, 0, '#0284c7');
          // Triangle 3: top-right
          drawRightTriangle(ctx, cx1 - sT/2 + sA, cy - sT/2, sB, sA, 0, '#0ea5e9');
          // Triangle 4: bottom-right
          drawRightTriangle(ctx, cx1 - sT/2, cy - sT/2 + sA, sA, sB, 0, '#38bdf8');

          // Highlight empty squares in Box 1
          ctx.fillStyle = 'rgba(244, 63, 94, 0.25)';
          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 2;
          ctx.fillRect(cx1 - sT/2 + sB, cy - sT/2 + sB, sA, sA);
          ctx.strokeRect(cx1 - sT/2 + sB, cy - sT/2 + sB, sA, sA);
          drawText(ctx, 'a² = ' + Math.round(a*a), cx1 - sT/2 + sB + sA/2, cy - sT/2 + sB + sA/2, '#fda4af', '14px bold sans-serif');

          ctx.fillStyle = 'rgba(251, 191, 36, 0.25)';
          ctx.strokeStyle = '#fbbf24';
          ctx.fillRect(cx1 - sT/2, cy - sT/2, sB, sB);
          ctx.strokeRect(cx1 - sT/2, cy - sT/2, sB, sB);
          drawText(ctx, 'b² = ' + Math.round(b*b), cx1 - sT/2 + sB/2, cy - sT/2 + sB/2, '#fde68a', '14px bold sans-serif');

          // In Box 2, triangles morph/rotate to 4 corners
          const corners = [
            { x: cx2 - sT/2, y: cy - sT/2, w: sA, h: sB, rot: 0, col: '#06b6d4' },
            { x: cx2 - sT/2 + sT, y: cy - sT/2, w: sB, h: sA, rot: Math.PI/2, col: '#0ea5e9' },
            { x: cx2 - sT/2 + sT, y: cy - sT/2 + sT, w: sA, h: sB, rot: Math.PI, col: '#0284c7' },
            { x: cx2 - sT/2, y: cy - sT/2 + sT, w: sB, h: sA, rot: 3*Math.PI/2, col: '#38bdf8' }
          ];

          corners.forEach(c => {
            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.rotate(c.rot);
            drawRightTriangle(ctx, 0, 0, c.w, c.h, 0, c.col);
            ctx.restore();
          });

          // Central tilted square c²
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(cx2 - sT/2 + sA, cy - sT/2);
          ctx.lineTo(cx2 - sT/2 + sT, cy - sT/2 + sA);
          ctx.lineTo(cx2 - sT/2 + sB, cy - sT/2 + sT);
          ctx.lineTo(cx2 - sT/2, cy - sT/2 + sB);
          ctx.closePath();
          ctx.fillStyle = 'rgba(52, 211, 153, ' + (0.2 + 0.2*t) + ')';
          ctx.fill();
          ctx.strokeStyle = '#34d399';
          ctx.lineWidth = 3;
          ctx.stroke();
          drawText(ctx, 'c² = ' + Math.round(c*c), cx2, cy, '#6ee7b7', '16px bold sans-serif');
          ctx.restore();

          // Bottom readout
          const readout = 'a = ' + a + ',  b = ' + b + ',  c = ' + c.toFixed(1) + '  ⟹  a² + b² = ' + Math.round(a*a + b*b) + ' = c²';
          drawText(ctx, readout, W/2, H - 24, '#f8fafc', '15px sans-serif');

          ctx.restore();
        }

        function drawRightTriangle(ctx, x, y, w, h, angle, col) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(w, 0);
          ctx.lineTo(0, h);
          ctx.closePath();
          ctx.fillStyle = col;
          ctx.globalAlpha = 0.85;
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }
      `;

    case 'circle_unroll_rings':
      return `
        function render(ctx, W, H, p, params) {
          const R = params.radius || 80;
          const N = params.rings || 18;
          ctx.clearRect(0, 0, W, H);
          ctx.save();

          const t = easeInOutCubic(p);
          const cxCircle = W * 0.25;
          const cy = H * 0.5;
          const startX = W * 0.45;
          const baseLen = 2 * Math.PI * R * 0.65; // scaled for canvas
          const scale = 0.65;

          drawText(ctx, 'Concentric Rings (Radius r = ' + R + ')', cxCircle, cy - R - 25, '#38bdf8', '15px bold sans-serif');
          drawText(ctx, 'Unrolled Right Triangle (Base = 2πr, Height = r)', startX + baseLen/2, cy - R*scale - 25, '#fbbf24', '15px bold sans-serif');

          // Draw guide axes for triangle
          ctx.strokeStyle = 'rgba(255,255,255,0.15)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(startX, cy + R*scale/2);
          ctx.lineTo(startX + baseLen + 20, cy + R*scale/2);
          ctx.moveTo(startX, cy + R*scale/2);
          ctx.lineTo(startX, cy - R*scale - 10);
          ctx.stroke();

          // Draw rings
          for (let i = 1; i <= N; i++) {
            const r_i = (i / N) * R;
            const circum_i = 2 * Math.PI * r_i * scale;
            const hue = 180 + (i / N) * 60; // cyan to teal/blue
            const col = 'hsl(' + hue + ', 85%, 55%)';

            // Circular ring portion (shrinks as t -> 1)
            if (t < 0.99) {
              const ringAlpha = (1 - t);
              ctx.save();
              ctx.globalAlpha = ringAlpha;
              ctx.beginPath();
              ctx.arc(cxCircle, cy, r_i, 0, 2 * Math.PI * (1 - t * 0.8));
              ctx.strokeStyle = col;
              ctx.lineWidth = Math.max(1.5, (R / N) * 0.8);
              ctx.stroke();
              ctx.restore();
            }

            // Unrolled horizontal strip
            // strip elevates from bottom to height r_i
            const stripY = (cy + R*scale/2) - (r_i * scale);
            const currentLen = circum_i * Math.min(1, t * 1.2);

            ctx.save();
            ctx.strokeStyle = col;
            ctx.lineWidth = Math.max(2, (R / N) * scale * 0.85);
            ctx.beginPath();
            ctx.moveTo(startX, stripY);
            ctx.lineTo(startX + currentLen, stripY);
            ctx.stroke();
            ctx.restore();
          }

          // Connecting hypotenuse line
          if (t > 0.4) {
            const lineAlpha = (t - 0.4) / 0.6;
            ctx.save();
            ctx.globalAlpha = lineAlpha;
            ctx.strokeStyle = '#f43f5e';
            ctx.lineWidth = 2.5;
            ctx.setLineDash([6, 4]);
            ctx.beginPath();
            ctx.moveTo(startX, cy + R*scale/2);
            ctx.lineTo(startX + baseLen, (cy + R*scale/2) - R*scale);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();
          }

          // Dimension Labels
          if (t > 0.6) {
            ctx.fillStyle = '#38bdf8';
            ctx.font = '13px sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText('Height = r (' + R + 'px)', startX - 12, cy - (R*scale)/4);

            ctx.fillStyle = '#fbbf24';
            ctx.textAlign = 'center';
            ctx.fillText('Base = 2πr ≈ ' + Math.round(2 * Math.PI * R) + 'px', startX + baseLen/2, cy + R*scale/2 + 25);
          }

          // Live Formula Readout
          const areaCircle = Math.round(Math.PI * R * R);
          const readout = 'Area = ½ × Base × Height = ½ × (2πr) × r = πr² = ' + areaCircle + ' units²';
          drawText(ctx, readout, W/2, H - 24, '#34d399', '15px bold sans-serif');

          ctx.restore();
        }
      `;

    case 'circle_sectors_parallelogram':
      return `
        function render(ctx, W, H, p, params) {
          const R = params.radius || 85;
          const N = params.sectors || 16;
          ctx.clearRect(0, 0, W, H);
          ctx.save();

          const t = easeInOutCubic(p);
          const angleStep = (2 * Math.PI) / N;

          const cx = W * (0.25 * (1 - t) + 0.15 * t);
          const cy = H * 0.48;

          drawText(ctx, 'Circle Sliced into ' + N + ' Sectors', W * 0.25, 40, '#38bdf8', '16px bold sans-serif');
          drawText(ctx, 'Interlocked into Parallelogram (Base = πr, Height = r)', W * 0.7, 40, '#fbbf24', '16px bold sans-serif');

          // Left Circle / Wedges
          const half = N / 2;
          const startX = W * 0.42;
          const wedgeW = (Math.PI * R) / half * 0.85;

          for (let i = 0; i < N; i++) {
            const isTop = i < half;
            const startAngle = i * angleStep;
            const endAngle = startAngle + angleStep;
            const col = (i % 2 === 0) ? '#06b6d4' : '#f59e0b';

            // Target positions in parallelogram
            let targetX, targetY, targetRot;
            if (isTop) {
              targetX = startX + i * wedgeW + wedgeW/2;
              targetY = cy - R*0.45;
              targetRot = Math.PI;
            } else {
              const k = i - half;
              targetX = startX + k * wedgeW + wedgeW;
              targetY = cy + R*0.45;
              targetRot = 0;
            }

            // Interpolate position
            const curX = cx * (1 - t) + targetX * t;
            const curY = cy * (1 - t) + targetY * t;
            const curRot = startAngle * (1 - t) + targetRot * t;

            ctx.save();
            ctx.translate(curX, curY);
            ctx.rotate(curRot);

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, R * 0.85, -angleStep/2, angleStep/2);
            ctx.closePath();
            ctx.fillStyle = col;
            ctx.globalAlpha = 0.85;
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
          }

          // Dimension brackets
          if (t > 0.7) {
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 1.5;
            const wTotal = half * wedgeW;
            ctx.beginPath();
            ctx.moveTo(startX + wedgeW/2, cy + R*0.45 + 30);
            ctx.lineTo(startX + wedgeW/2 + wTotal, cy + R*0.45 + 30);
            ctx.stroke();
            drawText(ctx, 'Base = πr', startX + wedgeW/2 + wTotal/2, cy + R*0.45 + 50, '#fbbf24', '14px bold sans-serif');

            drawText(ctx, 'Height ≈ r', startX - 25, cy, '#38bdf8', '14px bold sans-serif');
          }

          const readout = 'As sectors n → ∞: Shape becomes exact rectangle of area (πr) × r = πr²';
          drawText(ctx, readout, W/2, H - 24, '#34d399', '15px bold sans-serif');
          ctx.restore();
        }
      `;

    case 'triangle_angle_sum':
      return `
        function render(ctx, W, H, p, params) {
          const apexX = params.topX || 140;
          const apexY = params.topY || 60;
          ctx.clearRect(0, 0, W, H);
          ctx.save();

          const t = easeInOutCubic(p);
          const cx = W / 2;
          const baseW = 280;
          const bLeft = cx - baseW / 2;
          const bRight = cx + baseW / 2;
          const baseY = H * 0.65;
          const ax = bLeft + (apexX / 300) * baseW;
          const ay = baseY - apexY * 1.8;

          drawText(ctx, 'Tear and Fold Three Angles onto a Straight Line', W/2, 40, '#38bdf8', '16px bold sans-serif');

          // Draw main triangle
          ctx.beginPath();
          ctx.moveTo(bLeft, baseY);
          ctx.lineTo(bRight, baseY);
          ctx.lineTo(ax, ay);
          ctx.closePath();
          ctx.fillStyle = 'rgba(30, 41, 59, 0.6)';
          ctx.fill();
          ctx.strokeStyle = '#64748b';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Midpoints for folding
          const midLeftX = (bLeft + ax) / 2;
          const midLeftY = (baseY + ay) / 2;
          const midRightX = (bRight + ax) / 2;
          const midRightY = (baseY + ay) / 2;

          // Straight line guide at bottom
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(cx - 180, baseY + 60);
          ctx.lineTo(cx + 180, baseY + 60);
          ctx.stroke();
          ctx.setLineDash([]);

          // 3 Angles meet at (cx, baseY + 60)
          const targetY = baseY + 60;
          const angleA_pos = { x: bLeft * (1 - t) + (cx - 40) * t, y: baseY * (1 - t) + targetY * t };
          const angleB_pos = { x: bRight * (1 - t) + (cx + 40) * t, y: baseY * (1 - t) + targetY * t };
          const angleC_pos = { x: ax * (1 - t) + cx * t, y: ay * (1 - t) + targetY * t };

          // Angle sector A (cyan)
          drawArcSector(ctx, angleA_pos.x, angleA_pos.y, 45, 0, Math.PI * 0.35, '#06b6d4', 'α');
          // Angle sector C (coral)
          drawArcSector(ctx, angleC_pos.x, angleC_pos.y, 45, Math.PI * 0.35, Math.PI * 0.65, '#f43f5e', 'γ');
          // Angle sector B (amber)
          drawArcSector(ctx, angleB_pos.x, angleB_pos.y, 45, Math.PI * 0.65, Math.PI, '#f59e0b', 'β');

          if (t > 0.8) {
            drawText(ctx, 'Straight Line = 180° = π rad', cx, targetY + 30, '#34d399', '15px bold sans-serif');
          }

          drawText(ctx, 'α + β + γ = 180° for every Euclidean triangle', W/2, H - 24, '#f8fafc', '15px sans-serif');
          ctx.restore();
        }

        function drawArcSector(ctx, x, y, r, a1, a2, col, label) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.arc(x, y, r, a1, a2);
          ctx.closePath();
          ctx.fillStyle = col;
          ctx.globalAlpha = 0.8;
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          const midA = (a1 + a2) / 2;
          ctx.fillStyle = '#fff';
          ctx.font = '13px bold sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(label, x + Math.cos(midA)*r*0.65, y + Math.sin(midA)*r*0.65);
          ctx.restore();
        }
      `;

    case 'trapezoid_duplication':
      return `
        function render(ctx, W, H, p, params) {
          const a = (params.topBase || 50) * 1.5;
          const b = (params.botBase || 110) * 1.5;
          const h = (params.height || 70) * 1.5;
          ctx.clearRect(0, 0, W, H);
          ctx.save();

          const t = easeInOutCubic(p);
          const cx = W / 2;
          const cy = H * 0.52;

          drawText(ctx, 'Duplicate & Rotate 180° into Parallelogram', W/2, 40, '#38bdf8', '16px bold sans-serif');

          // Trapezoid 1 (fixed)
          const x1 = cx - (a + b)/2;
          const yBot = cy + h/2;
          const yTop = cy - h/2;

          ctx.beginPath();
          ctx.moveTo(x1, yBot);
          ctx.lineTo(x1 + b, yBot);
          ctx.lineTo(x1 + (b - a)/2 + a, yTop);
          ctx.lineTo(x1 + (b - a)/2, yTop);
          ctx.closePath();
          ctx.fillStyle = '#0284c7';
          ctx.globalAlpha = 0.85;
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Trapezoid 2 (rotates 180 and slides next to it)
          const targetX = x1 + b + (b - a)/2 + a;
          const currentX = (x1 + b + 60) * (1 - t) + targetX * t;
          const currentRot = Math.PI * t;

          ctx.save();
          ctx.translate(currentX, cy);
          ctx.rotate(currentRot);
          ctx.beginPath();
          ctx.moveTo(-b/2, h/2);
          ctx.lineTo(b/2, h/2);
          ctx.lineTo((b - a)/2 + a - b/2, -h/2);
          ctx.lineTo((b - a)/2 - b/2, -h/2);
          ctx.closePath();
          ctx.fillStyle = '#f59e0b';
          ctx.globalAlpha = 0.85;
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();

          // Dimension readouts
          if (t > 0.6) {
            drawText(ctx, 'Joined Parallelogram Base = a + b', cx, yBot + 30, '#fbbf24', '14px bold sans-serif');
            drawText(ctx, 'Height = h', x1 - 35, cy, '#38bdf8', '14px bold sans-serif');
          }

          const areaTrapezoid = Math.round(0.5 * (a + b) * h / 2.25);
          drawText(ctx, 'Area of 1 Trapezoid = ½ · (a + b) · h = ' + areaTrapezoid + ' units²', W/2, H - 24, '#34d399', '15px bold sans-serif');

          ctx.restore();
        }
      `;

    default:
      // Generic high-craft visual renderer fallback
      return `
        function render(ctx, W, H, p, params) {
          ctx.clearRect(0, 0, W, H);
          ctx.save();
          const t = easeInOutCubic(p);
          const cx = W / 2;
          const cy = H / 2;

          drawText(ctx, 'Interactive Proof Engine', cx, 40, '#38bdf8', '16px bold sans-serif');

          // Draw rotating proof wheel
          ctx.beginPath();
          ctx.arc(cx, cy, 90, 0, 2 * Math.PI);
          ctx.strokeStyle = 'rgba(255,255,255,0.15)';
          ctx.lineWidth = 4;
          ctx.stroke();

          // Morphing polygon
          const sides = (params.sidesN || params.nValue || 5);
          ctx.beginPath();
          for (let i = 0; i <= sides; i++) {
            const ang = (i / sides) * 2 * Math.PI + t * Math.PI;
            const r = 85 + Math.sin(ang * 2 + t * 4) * 15;
            const px = cx + Math.cos(ang) * r;
            const py = cy + Math.sin(ang) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fillStyle = 'rgba(6, 182, 212, 0.25)';
          ctx.fill();
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 3;
          ctx.stroke();

          // Central progress display
          drawText(ctx, Math.round(p * 100) + '%', cx, cy + 6, '#f8fafc', '24px bold sans-serif');

          drawText(ctx, 'Scrub or Play to execute geometric transformation step-by-step', cx, H - 24, '#94a3b8', '14px sans-serif');
          ctx.restore();
        }
      `;
  }
}
