// all_renderers_1.js - Renderers for lessons 1 to 16

export function getRendererPart1(type) {
  switch (type) {
    case 'pythagoras_rearrangement':
      return `
        function render(ctx, W, H, p, params) {
          const a = params.sideA || 60;
          const b = params.sideB || 80;
          const total = a + b;
          const scale = Math.min((W - 120) / (total * 2.3), (H - 120) / total);
          const sA = a * scale, sB = b * scale, sT = total * scale;
          const c = Math.sqrt(a*a + b*b);
          const t = easeInOutCubic(p);

          ctx.clearRect(0, 0, W, H);
          const cx1 = W * 0.28, cx2 = W * 0.72, cy = H * 0.5;

          drawSquare(ctx, cx1 - sT/2, cy - sT/2, sT, '#1e293b', '#475569');
          drawSquare(ctx, cx2 - sT/2, cy - sT/2, sT, '#1e293b', '#475569');

          drawText(ctx, 'Config A: a² + b²', cx1, cy - sT/2 - 20, '#38bdf8', '15px bold sans-serif');
          drawText(ctx, 'Config B: c²', cx2, cy - sT/2 - 20, '#fbbf24', '15px bold sans-serif');

          // Box 1
          drawTri(ctx, cx1 - sT/2, cy - sT/2, sA, sB, '#06b6d4');
          drawTri(ctx, cx1 - sT/2 + sA, cy - sT/2 + sB, sB, sA, '#0284c7');
          drawTri(ctx, cx1 - sT/2 + sA, cy - sT/2, sB, sA, '#0ea5e9');
          drawTri(ctx, cx1 - sT/2, cy - sT/2 + sA, sA, sB, '#38bdf8');

          ctx.fillStyle = 'rgba(244, 63, 94, 0.25)';
          ctx.strokeStyle = '#f43f5e';
          ctx.fillRect(cx1 - sT/2 + sB, cy - sT/2 + sB, sA, sA);
          ctx.strokeRect(cx1 - sT/2 + sB, cy - sT/2 + sB, sA, sA);
          drawText(ctx, 'a² = ' + Math.round(a*a), cx1 - sT/2 + sB + sA/2, cy - sT/2 + sB + sA/2, '#fda4af', '13px bold sans-serif');

          ctx.fillStyle = 'rgba(251, 191, 36, 0.25)';
          ctx.strokeStyle = '#fbbf24';
          ctx.fillRect(cx1 - sT/2, cy - sT/2, sB, sB);
          ctx.strokeRect(cx1 - sT/2, cy - sT/2, sB, sB);
          drawText(ctx, 'b² = ' + Math.round(b*b), cx1 - sT/2 + sB/2, cy - sT/2 + sB/2, '#fde68a', '13px bold sans-serif');

          // Box 2
          const corners = [
            { x: cx2 - sT/2, y: cy - sT/2, w: sA, h: sB, rot: 0, col: '#06b6d4' },
            { x: cx2 - sT/2 + sT, y: cy - sT/2, w: sB, h: sA, rot: Math.PI/2, col: '#0ea5e9' },
            { x: cx2 - sT/2 + sT, y: cy - sT/2 + sT, w: sA, h: sB, rot: Math.PI, col: '#0284c7' },
            { x: cx2 - sT/2, y: cy - sT/2 + sT, w: sB, h: sA, rot: 3*Math.PI/2, col: '#38bdf8' }
          ];
          corners.forEach(cr => {
            ctx.save();
            ctx.translate(cr.x, cr.y);
            ctx.rotate(cr.rot);
            drawTri(ctx, 0, 0, cr.w, cr.h, cr.col);
            ctx.restore();
          });

          ctx.beginPath();
          ctx.moveTo(cx2 - sT/2 + sA, cy - sT/2);
          ctx.lineTo(cx2 - sT/2 + sT, cy - sT/2 + sA);
          ctx.lineTo(cx2 - sT/2 + sB, cy - sT/2 + sT);
          ctx.lineTo(cx2 - sT/2, cy - sT/2 + sB);
          ctx.closePath();
          ctx.fillStyle = 'rgba(52, 211, 153, ' + (0.2 + 0.2*t) + ')';
          ctx.fill();
          ctx.strokeStyle = '#34d399';
          ctx.lineWidth = 2.5;
          ctx.stroke();
          drawText(ctx, 'c² = ' + Math.round(c*c), cx2, cy, '#6ee7b7', '15px bold sans-serif');

          drawText(ctx, 'a = ' + a + ',  b = ' + b + ',  c = ' + c.toFixed(1) + '  ⟹  a² + b² = ' + Math.round(a*a+b*b) + ' = c²', W/2, H - 24, '#f8fafc', '14px sans-serif');
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
          ctx.strokeStyle = '#fff';
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
          const t = easeInOutCubic(p);
          const cxCircle = W * 0.25, cy = H * 0.5;
          const startX = W * 0.45;
          const scale = 0.65;
          const baseLen = 2 * Math.PI * R * scale;

          drawText(ctx, 'Concentric Rings (Radius r = ' + R + ')', cxCircle, cy - R - 20, '#38bdf8', '15px bold sans-serif');
          drawText(ctx, 'Unrolled Right Triangle (Base = 2πr, Height = r)', startX + baseLen/2, cy - R*scale - 20, '#fbbf24', '15px bold sans-serif');

          ctx.strokeStyle = 'rgba(255,255,255,0.15)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(startX, cy + R*scale/2);
          ctx.lineTo(startX + baseLen + 20, cy + R*scale/2);
          ctx.moveTo(startX, cy + R*scale/2);
          ctx.lineTo(startX, cy - R*scale - 10);
          ctx.stroke();

          for (let i = 1; i <= N; i++) {
            const r_i = (i / N) * R;
            const circum_i = 2 * Math.PI * r_i * scale;
            const col = 'hsl(' + (180 + (i/N)*60) + ', 85%, 55%)';

            if (t < 0.99) {
              ctx.save();
              ctx.globalAlpha = 1 - t;
              ctx.beginPath();
              ctx.arc(cxCircle, cy, r_i, 0, 2 * Math.PI * (1 - t * 0.8));
              ctx.strokeStyle = col;
              ctx.lineWidth = Math.max(1.5, (R/N) * 0.8);
              ctx.stroke();
              ctx.restore();
            }

            const stripY = (cy + R*scale/2) - (r_i * scale);
            const currentLen = circum_i * Math.min(1, t * 1.2);
            ctx.save();
            ctx.strokeStyle = col;
            ctx.lineWidth = Math.max(2, (R/N) * scale * 0.85);
            ctx.beginPath();
            ctx.moveTo(startX, stripY);
            ctx.lineTo(startX + currentLen, stripY);
            ctx.stroke();
            ctx.restore();
          }

          if (t > 0.4) {
            ctx.save();
            ctx.globalAlpha = (t - 0.4) / 0.6;
            ctx.strokeStyle = '#f43f5e';
            ctx.lineWidth = 2.5;
            ctx.setLineDash([6, 4]);
            ctx.beginPath();
            ctx.moveTo(startX, cy + R*scale/2);
            ctx.lineTo(startX + baseLen, (cy + R*scale/2) - R*scale);
            ctx.stroke();
            ctx.restore();
          }

          if (t > 0.6) {
            drawText(ctx, 'Height = r (' + R + 'px)', startX - 12, cy - (R*scale)/4, '#38bdf8', '13px sans-serif');
            drawText(ctx, 'Base = 2πr ≈ ' + Math.round(2*Math.PI*R) + 'px', startX + baseLen/2, cy + R*scale/2 + 25, '#fbbf24', '13px sans-serif');
          }

          const areaCircle = Math.round(Math.PI * R * R);
          drawText(ctx, 'Area = ½ × Base × Height = ½ × (2πr) × r = πr² = ' + areaCircle + ' units²', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'circle_sectors_parallelogram':
      return `
        function render(ctx, W, H, p, params) {
          const R = params.radius || 85;
          const N = params.sectors || 16;
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const angleStep = (2 * Math.PI) / N;
          const cx = W * (0.25 * (1 - t) + 0.15 * t), cy = H * 0.48;
          const half = N / 2, startX = W * 0.42;
          const wedgeW = (Math.PI * R) / half * 0.85;

          drawText(ctx, 'Circle Sliced into ' + N + ' Sectors', W * 0.25, 40, '#38bdf8', '15px bold sans-serif');
          drawText(ctx, 'Interlocking Parallelogram (Base = πr, Height = r)', W * 0.7, 40, '#fbbf24', '15px bold sans-serif');

          for (let i = 0; i < N; i++) {
            const isTop = i < half;
            const startAngle = i * angleStep;
            const col = (i % 2 === 0) ? '#06b6d4' : '#f59e0b';
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
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
          }

          if (t > 0.7) {
            drawText(ctx, 'Base = πr', startX + (half*wedgeW)/2, cy + R*0.45 + 35, '#fbbf24', '14px bold sans-serif');
            drawText(ctx, 'Height ≈ r', startX - 25, cy, '#38bdf8', '14px bold sans-serif');
          }
          drawText(ctx, 'As sectors n → ∞: Shape becomes exact rectangle of area (πr) × r = πr²', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'triangle_angle_sum':
      return `
        function render(ctx, W, H, p, params) {
          const apexX = params.topX || 140, apexY = params.topY || 60;
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W / 2, baseW = 280;
          const bLeft = cx - baseW / 2, bRight = cx + baseW / 2, baseY = H * 0.65;
          const ax = bLeft + (apexX / 300) * baseW, ay = baseY - apexY * 1.8;

          drawText(ctx, 'Tear and Fold Three Angles onto a Straight Line', W/2, 40, '#38bdf8', '16px bold sans-serif');

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

          const targetY = baseY + 50;
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(cx - 160, targetY);
          ctx.lineTo(cx + 160, targetY);
          ctx.stroke();
          ctx.setLineDash([]);

          const angleA_pos = { x: bLeft * (1 - t) + (cx - 35) * t, y: baseY * (1 - t) + targetY * t };
          const angleB_pos = { x: bRight * (1 - t) + (cx + 35) * t, y: baseY * (1 - t) + targetY * t };
          const angleC_pos = { x: ax * (1 - t) + cx * t, y: ay * (1 - t) + targetY * t };

          drawArcSector(ctx, angleA_pos.x, angleA_pos.y, 40, 0, Math.PI * 0.35, '#06b6d4', 'α');
          drawArcSector(ctx, angleC_pos.x, angleC_pos.y, 40, Math.PI * 0.35, Math.PI * 0.65, '#f43f5e', 'γ');
          drawArcSector(ctx, angleB_pos.x, angleB_pos.y, 40, Math.PI * 0.65, Math.PI, '#f59e0b', 'β');

          if (t > 0.8) {
            drawText(ctx, 'Straight Angle = 180° = π radians', cx, targetY + 30, '#34d399', '15px bold sans-serif');
          }
          drawText(ctx, 'α + β + γ = 180° for every triangle on a flat plane', W/2, H - 24, '#f8fafc', '14px sans-serif');
        }
        function drawArcSector(ctx, x, y, r, a1, a2, col, label) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.arc(x, y, r, a1, a2);
          ctx.closePath();
          ctx.fillStyle = col;
          ctx.globalAlpha = 0.85;
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          const mid = (a1 + a2)/2;
          drawText(ctx, label, x + Math.cos(mid)*r*0.65, y + Math.sin(mid)*r*0.65, '#fff', '13px bold sans-serif');
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
          const t = easeInOutCubic(p);
          const cx = W / 2, cy = H * 0.52;

          drawText(ctx, 'Duplicate & Rotate 180° into Parallelogram', W/2, 40, '#38bdf8', '16px bold sans-serif');

          const x1 = cx - (a + b)/2;
          const yBot = cy + h/2, yTop = cy - h/2;

          // Trapezoid 1
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

          // Trapezoid 2
          const targetX = x1 + b + (b - a)/2 + a;
          const currentX = (x1 + b + 60) * (1 - t) + targetX * t;
          ctx.save();
          ctx.translate(currentX, cy);
          ctx.rotate(Math.PI * t);
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

          if (t > 0.6) {
            drawText(ctx, 'Combined Parallelogram: Base = (a + b), Height = h', cx, yBot + 32, '#fbbf24', '14px bold sans-serif');
          }
          const areaT = Math.round(0.5 * (a + b) * h / 2.25);
          drawText(ctx, 'Area = ½ · (a + b) · h = ' + areaT + ' units²', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'triangle_cavalieri_shear':
      return `
        function render(ctx, W, H, p, params) {
          const b = (params.base || params.baseB || 120);
          const h = (params.height || params.heightH || 80);
          const shear = (params.shear !== undefined ? params.shear : (params.shearAmount !== undefined ? params.shearAmount : 40));
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W / 2, cy = H * 0.62;
          const numSlices = 24;
          const sliceH = h / numSlices;
          const curShear = shear * t;

          drawText(ctx, "Cavalieri's Principle: Horizontal Shearing Preserves Area", W/2, 40, '#38bdf8', '16px bold sans-serif');

          // Draw horizontal slices
          for (let i = 0; i < numSlices; i++) {
            const y = cy - (i * sliceH);
            const frac = 1 - (i / numSlices);
            const curW = b * frac;
            const sliceShear = curShear * (i / numSlices);
            const x = cx - curW / 2 + sliceShear;

            ctx.fillStyle = (i % 2 === 0) ? '#06b6d4' : '#0284c7';
            ctx.fillRect(x, y - sliceH, curW, sliceH);
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.strokeRect(x, y - sliceH, curW, sliceH);
          }

          // Apex marker
          const apexX = cx + curShear;
          const apexY = cy - h;
          ctx.beginPath();
          ctx.arc(apexX, apexY, 5, 0, 2*Math.PI);
          ctx.fillStyle = '#f43f5e';
          ctx.fill();

          // Base line
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(cx - b/2, cy); ctx.lineTo(cx + b/2, cy);
          ctx.stroke();
          drawText(ctx, 'Base b = ' + Math.round(b), cx, cy + 20, '#fbbf24', '13px sans-serif');

          const area = Math.round(0.5 * b * h);
          drawText(ctx, 'Area = ½ · b · h = ' + area + ' units² (remains strictly constant during shear)', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'odd_numbers_gnomon':
      return `
        function render(ctx, W, H, p, params) {
          const maxN = params.nValue || params.nMax || 6;
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W / 2, cy = H * 0.52;
          const blockSize = Math.min(32, Math.floor((H * 0.6) / maxN));
          const totalN = Math.max(1, Math.min(maxN, Math.floor(t * maxN) + 1));

          drawText(ctx, 'Sum of First n Odd Numbers = n²', W/2, 40, '#38bdf8', '16px bold sans-serif');

          const startX = cx - (maxN * blockSize) / 2;
          const startY = cy - (maxN * blockSize) / 2;
          const colors = ['#06b6d4', '#f59e0b', '#f43f5e', '#10b981', '#8b5cf6', '#3b82f6', '#ec4899', '#14b8a6'];

          for (let k = 1; k <= totalN; k++) {
            const col = colors[(k - 1) % colors.length];
            const odd = 2 * k - 1;

            // Draw gnomon k
            for (let colIdx = 0; colIdx < k; colIdx++) {
              drawCell(ctx, startX + colIdx * blockSize, startY + (k - 1) * blockSize, blockSize, col);
            }
            for (let rowIdx = 0; rowIdx < k - 1; rowIdx++) {
              drawCell(ctx, startX + (k - 1) * blockSize, startY + rowIdx * blockSize, blockSize, col);
            }
          }

          function drawCell(ctx, x, y, s, col) {
            ctx.fillStyle = col;
            ctx.fillRect(x + 1, y + 1, s - 2, s - 2);
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 1, y + 1, s - 2, s - 2);
          }

          let sumOdd = 0;
          const terms = [];
          for (let i = 1; i <= totalN; i++) {
            const oddVal = 2 * i - 1;
            terms.push(oddVal);
            sumOdd += oddVal;
          }
          drawText(ctx, terms.join(' + ') + ' = ' + sumOdd + ' = ' + totalN + '²', W/2, H - 24, '#34d399', '16px bold sans-serif');
        }
      `;

    case 'triangular_numbers_staircase':
      return `
        function render(ctx, W, H, p, params) {
          const n = params.nStairs || 5;
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W / 2, cy = H * 0.5;
          const s = 34;

          drawText(ctx, 'Two Staircases Form an n × (n + 1) Rectangle', W/2, 40, '#38bdf8', '16px bold sans-serif');

          const startX1 = cx - (n + 1) * s * 0.55;
          const startY1 = cy + (n * s) * 0.45;

          // Staircase 1 (cyan)
          for (let row = 0; row < n; row++) {
            for (let col = 0; col <= row; col++) {
              const x = startX1 + col * s;
              const y = startY1 - row * s;
              ctx.fillStyle = '#06b6d4';
              ctx.fillRect(x+1, y-s+1, s-2, s-2);
              ctx.strokeStyle = '#fff';
              ctx.strokeRect(x+1, y-s+1, s-2, s-2);
            }
          }

          // Staircase 2 (amber) inverted and sliding into position
          const targetOffset = s;
          const slideX = startX1 + (n * s) * (1 - t) + targetOffset * t;
          ctx.save();
          for (let row = 0; row < n; row++) {
            for (let col = 0; col <= row; col++) {
              const tx = startX1 + (n - col) * s;
              const ty = startY1 - (n - 1 - row) * s;
              const curX = (tx + 120) * (1 - t) + tx * t;
              ctx.fillStyle = '#f59e0b';
              ctx.globalAlpha = 0.85;
              ctx.fillRect(curX+1, ty-s+1, s-2, s-2);
              ctx.strokeStyle = '#fff';
              ctx.strokeRect(curX+1, ty-s+1, s-2, s-2);
            }
          }
          ctx.restore();

          const totalSum = (n * (n + 1)) / 2;
          drawText(ctx, 'T_' + n + ' = 1 + 2 + ... + ' + n + ' = ½ × ' + n + ' × (' + (n + 1) + ') = ' + totalSum, W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'square_of_sum':
      return `
        function render(ctx, W, H, p, params) {
          const a = (params.paramA || params.valA || 90);
          const b = (params.paramB || params.valB || 50);
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W / 2, cy = H * 0.5;
          const gap = 20 * t;

          drawText(ctx, '(a + b)² = a² + 2ab + b²', W/2, 40, '#38bdf8', '16px bold sans-serif');

          const x0 = cx - (a + b + gap)/2;
          const y0 = cy - (a + b + gap)/2;

          // a² square (top-left)
          ctx.fillStyle = '#06b6d4';
          ctx.fillRect(x0, y0, a, a);
          ctx.strokeStyle = '#fff';
          ctx.strokeRect(x0, y0, a, a);
          drawText(ctx, 'a²', x0 + a/2, y0 + a/2, '#fff', '16px bold sans-serif');

          // ab rect (top-right)
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(x0 + a + gap, y0, b, a);
          ctx.strokeStyle = '#fff';
          ctx.strokeRect(x0 + a + gap, y0, b, a);
          drawText(ctx, 'ab', x0 + a + gap + b/2, y0 + a/2, '#fff', '15px bold sans-serif');

          // ab rect (bottom-left)
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(x0, y0 + a + gap, a, b);
          ctx.strokeStyle = '#fff';
          ctx.strokeRect(x0, y0 + a + gap, a, b);
          drawText(ctx, 'ab', x0 + a/2, y0 + a + gap + b/2, '#fff', '15px bold sans-serif');

          // b² square (bottom-right)
          ctx.fillStyle = '#f43f5e';
          ctx.fillRect(x0 + a + gap, y0 + a + gap, b, b);
          ctx.strokeStyle = '#fff';
          ctx.strokeRect(x0 + a + gap, y0 + a + gap, b, b);
          drawText(ctx, 'b²', x0 + a + gap + b/2, y0 + a + gap + b/2, '#fff', '15px bold sans-serif');

          const total = (a + b) * (a + b);
          drawText(ctx, 'Area = ' + Math.round(a*a) + ' + 2×' + Math.round(a*b) + ' + ' + Math.round(b*b) + ' = ' + Math.round(total) + ' = (' + Math.round(a) + ' + ' + Math.round(b) + ')²', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'difference_of_squares':
      return `
        function render(ctx, W, H, p, params) {
          const a = (params.sideA || params.a || 110);
          const b = (params.sideB || params.b || 45);
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W / 2, cy = H * 0.5;

          drawText(ctx, 'Difference of Squares: a² - b² = (a - b)(a + b)', W/2, 40, '#38bdf8', '16px bold sans-serif');

          const h = Math.max(15, a - b);
          // Left piece (a - b) x a
          const x1 = cx - a/2 - 20 * (1 - t);
          const y1 = cy - a/2;

          ctx.fillStyle = '#06b6d4';
          ctx.fillRect(x1, y1, a, h);
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(x1, y1, a, h);

          function drawFittedText(text, tx, ty, maxW, maxH) {
            if (maxW < 18 || maxH < 12) return;
            let sz = Math.min(13, Math.max(9, Math.floor(Math.min(maxW * 0.22, maxH * 0.45))));
            ctx.font = sz + 'px bold sans-serif';
            let str = text;
            if (ctx.measureText(str).width > maxW - 6) {
              str = str.replace('(a - b) × ', '').replace('(a-b)', '·h');
            }
            if (ctx.measureText(str).width > maxW - 4) {
              sz = Math.max(8, Math.floor(sz * (maxW - 4) / Math.max(1, ctx.measureText(str).width)));
            }
            drawText(ctx, str, tx, ty, '#fff', sz + 'px bold sans-serif');
          }

          const labelA = a > 80 ? '(a - b) × a' : (a > 45 ? 'a(a-b)' : 'a·h');
          drawFittedText(labelA, x1 + a/2, y1 + h/2, a, h);

          // Moving piece (a - b) x b
          // Starts below left piece, rotates 90 deg and joins right edge
          const startX = x1;
          const startY = y1 + h;
          const targetX = x1 + a;
          const targetY = y1;

          const curX = startX * (1 - t) + targetX * t;
          const curY = startY * (1 - t) + targetY * t;

          ctx.save();
          ctx.fillStyle = '#f59e0b';
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 1.5;
          if (t < 0.99) {
            ctx.fillRect(curX, curY, b, h);
            ctx.strokeRect(curX, curY, b, h);
          } else {
            ctx.fillRect(targetX, targetY, b, h);
            ctx.strokeRect(targetX, targetY, b, h);
          }
          const labelB = b > 75 ? '(a - b) × b' : (b > 45 ? 'b(a-b)' : (b > 25 ? 'b·h' : 'b'));
          drawFittedText(labelB, curX + b/2, curY + h/2, b, h);
          ctx.restore();

          if (t > 0.7) {
            drawText(ctx, 'Single Rectangle: Base = a + b (' + Math.round(a + b) + '), Height = a - b (' + Math.round(a - b) + ')', cx, Math.min(H - 45, y1 + h + 32), '#fbbf24', '13px bold sans-serif');
          }
          drawText(ctx, 'a² - b² = ' + Math.round(a*a - b*b) + ' = (' + Math.round(a) + ' - ' + Math.round(b) + ')(' + Math.round(a) + ' + ' + Math.round(b) + ')', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'geometric_series_square':
      return `
        function render(ctx, W, H, p, params) {
          const maxK = params.depth || params.maxTerms || 5;
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W / 2, cy = H * 0.52;
          const size = 220;
          const k = Math.max(1, Math.min(maxK, Math.floor(t * maxK) + 1));

          drawText(ctx, 'Geometric Series: ½ + ¼ + ⅛ + ... = 1', W/2, 40, '#38bdf8', '16px bold sans-serif');

          // Unit square outline
          const x0 = cx - size/2, y0 = cy - size/2;
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 2;
          ctx.strokeRect(x0, y0, size, size);

          let curX = x0, curY = y0, curW = size, curH = size;
          const cols = ['#06b6d4', '#f59e0b', '#f43f5e', '#10b981', '#8b5cf6', '#3b82f6', '#ec4899'];

          for (let i = 0; i < k; i++) {
            const col = cols[i % cols.length];
            if (i % 2 === 0) {
              // Vertical split
              const halfW = curW / 2;
              ctx.fillStyle = col;
              ctx.fillRect(curX, curY, halfW, curH);
              ctx.strokeStyle = '#fff';
              ctx.strokeRect(curX, curY, halfW, curH);
              drawText(ctx, '1/' + Math.pow(2, i+1), curX + halfW/2, curY + curH/2, '#fff', '13px bold sans-serif');
              curX += halfW;
              curW -= halfW;
            } else {
              // Horizontal split
              const halfH = curH / 2;
              ctx.fillStyle = col;
              ctx.fillRect(curX, curY, curW, halfH);
              ctx.strokeStyle = '#fff';
              ctx.strokeRect(curX, curY, curW, halfH);
              drawText(ctx, '1/' + Math.pow(2, i+1), curX + curW/2, curY + halfH/2, '#fff', '13px bold sans-serif');
              curY += halfH;
              curH -= halfH;
            }
          }

          const sumVal = 1 - Math.pow(0.5, k);
          drawText(ctx, 'Partial Sum S_' + k + ' = ' + sumVal.toFixed(4) + ' ⟹ Limit as n → ∞ is exactly 1', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'perigal_pythagoras':
      return `
        function render(ctx, W, H, p, params) {
          const a = params.sideA || 60;
          const b = params.sideB || 100;
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W / 2, cy = H * 0.5;

          drawText(ctx, "Perigal's 5-Piece Dissection of Pythagoras", W/2, 40, '#38bdf8', '16px bold sans-serif');

          // Child-friendly friendly puzzle guide
          drawText(ctx, '🧩 4 Puzzle Pieces of b² shift seamlessly around central a² to assemble c²', cx, cy - 110, '#f1f5f9', '13px bold sans-serif');

          // Morphing pieces from b² to c² with cheerful colors
          const cols = ['#06b6d4', '#f59e0b', '#10b981', '#8b5cf6'];
          const pieceNames = ['Piece 1', 'Piece 2', 'Piece 3', 'Piece 4'];
          for (let i = 0; i < 4; i++) {
            const ang = (i * Math.PI / 2);
            const dist = 85 * (1 - t) + 42 * t;
            const px = cx + Math.cos(ang + t * Math.PI/4) * dist;
            const py = cy + Math.sin(ang + t * Math.PI/4) * dist;

            ctx.save();
            ctx.translate(px, py);
            ctx.rotate(ang + t * 0.5);
            ctx.fillStyle = cols[i];
            ctx.beginPath();
            ctx.moveTo(-26, -26); ctx.lineTo(26, -20); ctx.lineTo(22, 26); ctx.lineTo(-20, 22);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
            // Friendly piece label
            drawText(ctx, '🧩 ' + (i+1), 0, 4, '#fff', '11px bold sans-serif');
            ctx.restore();
          }

          // Central small square a² (cheerful coral with star)
          const halfA = a * 0.28;
          ctx.fillStyle = '#f43f5e';
          ctx.fillRect(cx - halfA, cy - halfA, halfA * 2, halfA * 2);
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.strokeRect(cx - halfA, cy - halfA, halfA * 2, halfA * 2);
          drawText(ctx, '⭐ a²', cx, cy + 4, '#fff', '12px bold sans-serif');

          const cVal = Math.round(Math.sqrt(a*a + b*b));
          drawText(ctx, 'a² (' + Math.round(a*a) + ') + b² (' + Math.round(b*b) + ') = c² (' + (cVal*cVal) + ') | Perfectly Conserved Puzzle!', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'cube_three_pyramids':
      return `
        function render(ctx, W, H, p, params) {
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W / 2, cy = H * 0.52;
          const s = params.cubeSize || 100;
          const rot = (params.rotAngle || 0) * Math.PI / 180;

          drawText(ctx, 'Volume of Square Pyramid: V = ⅓ · Base · Height', W/2, 40, '#38bdf8', '16px bold sans-serif');

          // Isometric cube split into 3 pyramids
          const explode = (60 * (s / 100)) * t;
          const cols = ['#06b6d4', '#f59e0b', '#10b981'];

          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(rot);
          ctx.translate(-cx, -cy);

          // Pyramid 1 (X)
          drawIsoPyramid(ctx, cx - explode, cy + explode/2, s, cols[0], 0);
          // Pyramid 2 (Y)
          drawIsoPyramid(ctx, cx + explode, cy + explode/2, s, cols[1], 1);
          // Pyramid 3 (Z)
          drawIsoPyramid(ctx, cx, cy - explode, s, cols[2], 2);

          ctx.restore();

          drawText(ctx, '3 Congruent Pyramids compose 1 Full Cube of volume ' + Math.round(s*s*s) + ' ⟹ V = ⅓s³', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
        function drawIsoPyramid(ctx, x, y, s, col, type) {
          ctx.save();
          ctx.translate(x, y);
          ctx.fillStyle = col;
          ctx.globalAlpha = 0.85;
          ctx.beginPath();
          ctx.moveTo(0, -s/2);
          ctx.lineTo(s*0.7, 0);
          ctx.lineTo(0, s/2);
          ctx.lineTo(-s*0.7, 0);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }
      `;

    case 'sphere_surface_four_circles':
      return `
        function render(ctx, W, H, p, params) {
          const R = params.sphereR || params.radiusR || 70;
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W * 0.28, cy = H * 0.5;

          drawText(ctx, 'Surface Area of Sphere = 4πr²', W/2, 40, '#38bdf8', '16px bold sans-serif');

          // Sphere on left with 3D shading
          const grad = ctx.createRadialGradient(cx - R*0.3, cy - R*0.3, R*0.1, cx, cy, R);
          grad.addColorStop(0, '#38bdf8');
          grad.addColorStop(0.8, '#0284c7');
          grad.addColorStop(1, '#082f49');

          ctx.beginPath();
          ctx.arc(cx, cy, R, 0, 2*Math.PI);
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          ctx.stroke();
          drawText(ctx, 'Sphere Area = 4πr²', cx, cy + R + 25, '#38bdf8', '14px bold sans-serif');

          // 4 Circles on right
          const startX = W * 0.62;
          const rSmall = R * 0.55;
          const pos = [
            { x: startX, y: cy - rSmall - 10 },
            { x: startX + rSmall*2 + 15, y: cy - rSmall - 10 },
            { x: startX, y: cy + rSmall + 10 },
            { x: startX + rSmall*2 + 15, y: cy + rSmall + 10 }
          ];

          pos.forEach((c, i) => {
            const curAlpha = Math.min(1, Math.max(0, (t * 4) - i));
            ctx.save();
            ctx.globalAlpha = curAlpha * 0.85;
            ctx.beginPath();
            ctx.arc(c.x, c.y, rSmall, 0, 2*Math.PI);
            ctx.fillStyle = '#f59e0b';
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
            drawText(ctx, 'πr²', c.x, c.y, '#fff', '13px bold sans-serif');
            ctx.restore();
          });

          drawText(ctx, 'The area of a sphere equals exactly 4 great circles: A = 4 × (πr²)', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'sphere_archimedes_balance':
      return `
        function render(ctx, W, H, p, params) {
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W / 2, cy = H * 0.5;
          const R = params.radiusR || 80;

          drawText(ctx, "Archimedes' Tombstone: Cylinder = Sphere + Cone (3 : 2 : 1)", W/2, 40, '#38bdf8', '16px bold sans-serif');

          // Three cross-sections side by side
          const x1 = cx - 220, x2 = cx, x3 = cx + 220;

          // Scanning slice height z
          const z = (t * 2 - 1) * (R * 0.8);

          // 1. Cylinder (cross-section r²)
          ctx.strokeStyle = '#475569';
          ctx.strokeRect(x1 - R/2, cy - R, R, 2*R);
          ctx.fillStyle = '#06b6d4';
          ctx.fillRect(x1 - R/2, cy + z - 2, R, 4);
          drawText(ctx, 'Cylinder', x1, cy + R + 25, '#06b6d4', '14px bold sans-serif');

          // 2. Hemisphere
          ctx.beginPath();
          ctx.arc(x2, cy, R, Math.PI, 2*Math.PI);
          ctx.strokeStyle = '#475569';
          ctx.stroke();
          const rHemiSlice = Math.sqrt(Math.max(0, R*R - z*z));
          ctx.fillStyle = '#f43f5e';
          ctx.fillRect(x2 - rHemiSlice/2, cy + z - 2, rHemiSlice, 4);
          drawText(ctx, 'Hemisphere', x2, cy + R + 25, '#f43f5e', '14px bold sans-serif');

          // 3. Cone
          ctx.beginPath();
          ctx.moveTo(x3 - R/2, cy - R); ctx.lineTo(x3 + R/2, cy - R); ctx.lineTo(x3, cy);
          ctx.closePath();
          ctx.strokeStyle = '#475569';
          ctx.stroke();
          const rConeSlice = Math.abs(z);
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(x3 - rConeSlice/2, cy + z - 2, rConeSlice, 4);
          drawText(ctx, 'Cone', x3, cy + R + 25, '#f59e0b', '14px bold sans-serif');

          drawText(ctx, 'At every height z: Area(Hemisphere) + Area(Cone) = Area(Cylinder) ⟹ V_hemi + V_cone = V_cyl', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'unit_circle_sine_cosine':
      return `
        function render(ctx, W, H, p, params) {
          const angleDeg = params.angleTheta !== undefined ? params.angleTheta : (params.theta || 45);
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W * 0.30, cy = H * 0.52;
          const R = Math.min(100, H * 0.32);

          drawText(ctx, 'Unit Circle: sin²(θ) + cos²(θ) = 1 (Radius r = 1)', W/2, 38, '#38bdf8', '16px bold sans-serif');

          // Target angle in radians with continuous rotation option
          const baseRad = (angleDeg * Math.PI) / 180;
          const currentRad = baseRad + t * 2 * Math.PI;
          const cosVal = Math.cos(currentRad);
          const sinVal = Math.sin(currentRad);

          // Coordinate Axes for Unit Circle
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(cx - R - 25, cy); ctx.lineTo(cx + R + 25, cy);
          ctx.moveTo(cx, cy - R - 25); ctx.lineTo(cx, cy + R + 25);
          ctx.stroke();

          // Unit Circle
          ctx.beginPath();
          ctx.arc(cx, cy, R, 0, 2 * Math.PI);
          ctx.strokeStyle = '#64748b';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Point on Circle P(cos θ, sin θ)
          const px = cx + cosVal * R;
          const py = cy - sinVal * R;

          // 1. Cosine segment along X axis (Cyan)
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(cx, cy); ctx.lineTo(px, cy);
          ctx.stroke();

          // 2. Sine vertical segment (Coral)
          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(px, cy); ctx.lineTo(px, py);
          ctx.stroke();

          // 3. Hypotenuse Radius r = 1 (Amber)
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(cx, cy); ctx.lineTo(px, py);
          ctx.stroke();

          // Right angle indicator at (px, cy)
          const sz = 7;
          const dirX = cosVal >= 0 ? -1 : 1;
          const dirY = sinVal >= 0 ? -1 : 1;
          ctx.strokeStyle = 'rgba(255,255,255,0.7)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(px + dirX * sz, cy);
          ctx.lineTo(px + dirX * sz, cy + dirY * sz);
          ctx.lineTo(px, cy + dirY * sz);
          ctx.stroke();

          // Angle arc θ at origin
          ctx.beginPath();
          ctx.arc(cx, cy, 22, 0, -currentRad, currentRad > 0 ? true : false);
          ctx.strokeStyle = '#a855f7';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Point P dot
          ctx.beginPath();
          ctx.arc(px, py, 5, 0, 2 * Math.PI);
          ctx.fillStyle = '#fff';
          ctx.fill();
          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Labels placed safely with no overlap
          const normDeg = Math.round(((currentRad * 180 / Math.PI) % 360 + 360) % 360);
          drawText(ctx, 'θ = ' + normDeg + '°', cx + 32, cy - 14, '#c084fc', '12px bold sans-serif');
          drawText(ctx, 'r = 1', (cx + px)/2 - 10, (cy + py)/2 - 10, '#fbbf24', '11px bold sans-serif');
          drawText(ctx, 'cos = ' + cosVal.toFixed(2), (cx + px)/2, cy + 18, '#06b6d4', '12px bold sans-serif');
          drawText(ctx, 'sin = ' + sinVal.toFixed(2), px + (cosVal >= 0 ? 10 : -42), (cy + py)/2, '#f43f5e', '12px bold sans-serif');

          // Unrolling Wave Visualization on Right Side
          const waveStartX = W * 0.56;
          const waveW = W * 0.38;
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(waveStartX, cy); ctx.lineTo(waveStartX + waveW, cy);
          ctx.stroke();

          // Sine Wave projection line from circle to wave
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(px, py); ctx.lineTo(waveStartX, py);
          ctx.stroke();
          ctx.setLineDash([]);

          // Draw Sine Wave
          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          for (let wx = 0; wx <= waveW; wx += 2) {
            const phase = currentRad - (wx / waveW) * (2 * Math.PI);
            const wy = cy - Math.sin(phase) * R;
            if (wx === 0) ctx.moveTo(waveStartX + wx, wy);
            else ctx.lineTo(waveStartX + wx, wy);
          }
          ctx.stroke();

          // Legend cards
          drawText(ctx, 'Wave Projection: y = sin(θ)', waveStartX + waveW/2, cy - R - 12, '#f43f5e', '13px bold sans-serif');

          // Bottom Mathematical Invariant
          const cosSq = (cosVal * cosVal).toFixed(2);
          const sinSq = (sinVal * sinVal).toFixed(2);
          drawText(ctx, 'cos²(' + normDeg + '°) + sin²(' + normDeg + '°) = ' + cosSq + ' + ' + sinSq + ' = 1.00 (Pythagorean Identity)', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    default:
      return null;
  }
}
