// all_renderers_2.js - Renderers for lessons 17 to 32

export function getRendererPart2(type) {
  switch (type) {
    case 'derivative_sin_cos':
      return `
        function render(ctx, W, H, p, params) {
          const thetaDeg = params.angleX !== undefined ? params.angleX : 45;
          const theta = thetaDeg * Math.PI / 180;
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W * 0.30, cy = H * 0.54, R = Math.min(100, H * 0.32);

          drawText(ctx, 'Geometric Proof: d(sin x)/dx = cos x', W/2, 38, '#38bdf8', '16px bold sans-serif');

          // Arc on circle
          ctx.beginPath();
          ctx.arc(cx, cy, R, 0, 2*Math.PI);
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Coordinate axes
          ctx.strokeStyle = '#1e293b';
          ctx.beginPath();
          ctx.moveTo(cx - R - 15, cy); ctx.lineTo(cx + R + 15, cy);
          ctx.moveTo(cx, cy - R - 15); ctx.lineTo(cx, cy + R + 15);
          ctx.stroke();

          // Points on arc
          const dx = (0.28 * (1 - t * 0.85)); // shrinks as t increases
          const x1 = cx + Math.cos(theta) * R;
          const y1 = cy - Math.sin(theta) * R;
          const x2 = cx + Math.cos(theta + dx) * R;
          const y2 = cy - Math.sin(theta + dx) * R;

          // Arc segment dx
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.arc(cx, cy, R, -(theta + dx), -theta);
          ctx.stroke();

          // Angle arc
          ctx.beginPath();
          ctx.arc(cx, cy, 20, -theta, 0);
          ctx.strokeStyle = '#a855f7';
          ctx.lineWidth = 2;
          ctx.stroke();
          drawText(ctx, 'x = ' + thetaDeg + '°', cx + 32, cy - 10, '#c084fc', '11px bold sans-serif');

          // Magnified differential triangle on right
          const magX = W * 0.70, magY = H * 0.52, magSize = 160;
          ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
          ctx.fillRect(magX - magSize/2, magY - magSize/2, magSize, magSize);
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(magX - magSize/2, magY - magSize/2, magSize, magSize);
          drawText(ctx, 'Magnified Differential Triangle (Zoom)', magX, magY - magSize/2 - 10, '#fbbf24', '12px bold sans-serif');

          // Connecting projection beams from arc to zoom box
          ctx.strokeStyle = 'rgba(251, 191, 36, 0.25)';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(x1, y1); ctx.lineTo(magX - magSize/2, magY);
          ctx.stroke();
          ctx.setLineDash([]);

          // Triangle in magnification
          const legW = 90;
          const legH = legW * Math.tan(theta);
          const clampedH = Math.min(60, Math.max(25, legH));

          ctx.beginPath();
          ctx.moveTo(magX - 45, magY + clampedH/2);
          ctx.lineTo(magX + 45, magY + clampedH/2);
          ctx.lineTo(magX + 45, magY - clampedH/2);
          ctx.closePath();
          ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
          ctx.fill();
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Labels inside zoom
          drawText(ctx, 'dx (arc)', magX - 8, magY - clampedH/2 - 8, '#fbbf24', '11px bold sans-serif');
          drawText(ctx, 'd(sin x)', magX + 45, magY + 4, '#f43f5e', '11px bold sans-serif');
          drawText(ctx, 'd(cos x)', magX, magY + clampedH/2 + 14, '#06b6d4', '11px sans-serif');

          const cosVal = Math.cos(theta).toFixed(3);
          drawText(ctx, 'As dx → 0: Arc dx straightens into hypotenuse ⟹ d(sin x)/dx = cos(' + thetaDeg + '°) = ' + cosVal, W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'inscribed_angle_theorem':
      return `
        function render(ctx, W, H, p, params) {
          const posP = (params.ptP !== undefined ? params.ptP : (params.pointP || 50)) / 100;
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W / 2, cy = H * 0.52, R = Math.min(105, H * 0.32);

          drawText(ctx, 'Inscribed Angle Theorem: Central Angle = 2 × Inscribed Angle', W/2, 38, '#38bdf8', '16px bold sans-serif');

          // Main circle
          ctx.beginPath();
          ctx.arc(cx, cy, R, 0, 2*Math.PI);
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Fixed base points A and B
          const angA = Math.PI * 0.75;
          const angB = Math.PI * 0.25;
          const ax = cx + Math.cos(angA) * R, ay = cy + Math.sin(angA) * R;
          const bx = cx + Math.cos(angB) * R, by = cy + Math.sin(angB) * R;

          // Inscribed point P moving on top arc
          const currentP = posP * (1 - t) + (0.15 + t * 0.7) * t;
          const angP = -Math.PI * 0.15 - currentP * Math.PI * 0.7;
          const px = cx + Math.cos(angP) * R, py = cy + Math.sin(angP) * R;

          // Draw central angle lines (A -> O -> B)
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(ax, ay); ctx.lineTo(cx, cy); ctx.lineTo(bx, by);
          ctx.stroke();

          // Draw inscribed angle lines (A -> P -> B)
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(ax, ay); ctx.lineTo(px, py); ctx.lineTo(bx, by);
          ctx.stroke();

          // Points with outward labels to prevent overlap
          drawCirclePoint(ctx, ax, ay, '#fff', 'A', -12, 14);
          drawCirclePoint(ctx, bx, by, '#fff', 'B', 12, 14);
          drawCirclePoint(ctx, cx, cy, '#fbbf24', 'O (Center)', 0, 18);
          drawCirclePoint(ctx, px, py, '#06b6d4', 'P (Inscribed)', 0, -14);

          // Floating Info Cards
          drawText(ctx, 'Central ∠AOB = 90°', cx, cy - 20, '#fbbf24', '13px bold sans-serif');
          drawText(ctx, 'Inscribed ∠APB = 45°', px + (px > cx ? -50 : 50), py - 6, '#06b6d4', '12px bold sans-serif');

          drawText(ctx, '∠AOB = 2 × ∠APB = 90° — Inscribed angle is strictly invariant to P on the arc!', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
        function drawCirclePoint(ctx, x, y, col, label, ox, oy) {
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2*Math.PI);
          ctx.fillStyle = col;
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          drawText(ctx, label, x + ox, y + oy, col, '12px bold sans-serif');
        }
      `;

    case 'thales_semicircle':
      return `
        function render(ctx, W, H, p, params) {
          const angleDeg = params.ptC !== undefined ? params.ptC : (params.anglePoint || 60);
          const paramAngle = angleDeg * Math.PI / 180;
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W / 2, cy = H * 0.62, R = Math.min(125, H * 0.36);

          drawText(ctx, "Thales' Theorem: Angle Inscribed in Semicircle is Always 90°", W/2, 38, '#38bdf8', '16px bold sans-serif');

          // Semicircle (arcs upward)
          ctx.beginPath();
          ctx.arc(cx, cy, R, Math.PI, 2*Math.PI);
          ctx.strokeStyle = '#64748b';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Diameter AB
          const ax = cx - R, ay = cy;
          const bx = cx + R, by = cy;
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
          ctx.stroke();

          // Point C on semicircle: sweeps across top
          const curAngle = Math.PI + paramAngle * (1 - t * 0.3);
          const px = cx + Math.cos(curAngle) * R;
          const py = cy + Math.sin(curAngle) * R;

          // Triangle AOC (cyan tint)
          ctx.beginPath();
          ctx.moveTo(ax, ay); ctx.lineTo(px, py); ctx.lineTo(cx, cy);
          ctx.closePath();
          ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
          ctx.fill();

          // Triangle BOC (amber tint)
          ctx.beginPath();
          ctx.moveTo(bx, by); ctx.lineTo(px, py); ctx.lineTo(cx, cy);
          ctx.closePath();
          ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
          ctx.fill();

          // Legs AC and BC
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(ax, ay); ctx.lineTo(px, py); ctx.lineTo(bx, by);
          ctx.stroke();

          // Radius OC dividing into 2 isosceles triangles
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(cx, cy); ctx.lineTo(px, py);
          ctx.stroke();
          ctx.setLineDash([]);

          // Right angle square at C
          const leg1vx = ax - px, leg1vy = ay - py;
          const len1 = Math.hypot(leg1vx, leg1vy);
          const u1x = leg1vx / len1, u1y = leg1vy / len1;
          const leg2vx = bx - px, leg2vy = by - py;
          const len2 = Math.hypot(leg2vx, leg2vy);
          const u2x = leg2vx / len2, u2y = leg2vy / len2;
          const sqSize = 14;

          ctx.strokeStyle = '#34d399';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(px + u1x * sqSize, py + u1y * sqSize);
          ctx.lineTo(px + (u1x + u2x) * sqSize, py + (u1y + u2y) * sqSize);
          ctx.lineTo(px + u2x * sqSize, py + u2y * sqSize);
          ctx.stroke();

          // Points
          drawCirclePoint(ctx, ax, ay, '#fff', 'A', -10, 16);
          drawCirclePoint(ctx, bx, by, '#fff', 'B', 10, 16);
          drawCirclePoint(ctx, cx, cy, '#fbbf24', 'O', 0, 18);
          drawCirclePoint(ctx, px, py, '#34d399', 'C (90°)', 0, -16);

          drawText(ctx, 'Two Isosceles ΔAOC and ΔBOC: 2α + 2β = 180° ⟹ α + β = ∠ACB = 90°', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'fibonacci_golden_spiral':
      return `
        function render(ctx, W, H, p, params) {
          const maxN = params.fibSteps || params.spiralSteps || 7;
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W / 2, cy = H * 0.52;

          drawText(ctx, 'Fibonacci Sequence & The Golden Spiral', W/2, 38, '#38bdf8', '16px bold sans-serif');

          const fib = [1, 1, 2, 3, 5, 8, 13, 21];
          const steps = Math.min(fib.length, Math.max(2, Math.floor(t * maxN) + 2));

          // Compute dynamic scale and offset to ensure square never hides outside box
          const maxDim = fib[Math.min(steps - 1, fib.length - 1)];
          const scale = Math.min(14, Math.max(7, Math.floor(H * 0.28 / (maxDim * 0.65))));

          const cols = ['#06b6d4', '#f59e0b', '#f43f5e', '#10b981', '#8b5cf6', '#3b82f6', '#ec4899', '#14b8a6'];

          ctx.save();
          ctx.translate(cx - 20, cy + 20);

          for (let i = 0; i < steps; i++) {
            const s = fib[i] * scale;
            const col = cols[i % cols.length];

            ctx.fillStyle = col;
            ctx.globalAlpha = 0.25;
            ctx.fillRect(0, 0, s, s);
            ctx.strokeStyle = col;
            ctx.globalAlpha = 1.0;
            ctx.lineWidth = 1.5;
            ctx.strokeRect(0, 0, s, s);

            if (s > 14) {
              drawText(ctx, fib[i], s/2, s/2 + 4, '#fff', Math.min(13, Math.max(9, Math.floor(s*0.28))) + 'px bold sans-serif');
            }

            // Golden spiral arc
            ctx.beginPath();
            ctx.arc(s, 0, s, Math.PI/2, Math.PI);
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 2.5;
            ctx.stroke();

            ctx.translate(s, 0);
            ctx.rotate(Math.PI/2);
          }
          ctx.restore();

          const ratio = (fib[steps-1] / fib[steps-2]).toFixed(4);
          drawText(ctx, 'F_' + steps + ' / F_' + (steps-1) + ' = ' + ratio + ' ⟶ Golden Ratio φ ≈ 1.618033...', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'eulers_formula':
      return `
        function render(ctx, W, H, p, params) {
          const polyType = params.polyType || 2;
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W / 2, cy = H * 0.50;

          drawText(ctx, "Euler's Polyhedral Formula: V - E + F = 2", W/2, 38, '#38bdf8', '16px bold sans-serif');

          let curV = 8, curE = 12, curF = 6, polyName = 'Cube';
          const R = Math.min(100, H * 0.30);
          const vertices = [];
          const edges = [];

          if (polyType == 1) {
            // Tetrahedron: V = 4, E = 6, F = 4
            polyName = 'Tetrahedron';
            curV = 4; curE = 6; curF = 4;
            vertices.push({ x: cx, y: cy - R, name: 'V1' });
            vertices.push({ x: cx + R * 0.9, y: cy + R * 0.6, name: 'V2' });
            vertices.push({ x: cx - R * 0.9, y: cy + R * 0.6, name: 'V3' });
            vertices.push({ x: cx, y: cy + R * 0.1, name: 'V4' });
            edges.push([0, 1], [1, 2], [2, 0], [0, 3], [1, 3], [2, 3]);
          } else if (polyType == 3) {
            // Octahedron: V = 6, E = 12, F = 8
            polyName = 'Octahedron';
            curV = 6; curE = 12; curF = 8;
            vertices.push({ x: cx, y: cy - R, name: 'V1' });
            vertices.push({ x: cx + R, y: cy, name: 'V2' });
            vertices.push({ x: cx, y: cy + R, name: 'V3' });
            vertices.push({ x: cx - R, y: cy, name: 'V4' });
            vertices.push({ x: cx - R*0.35, y: cy - R*0.25, name: 'V5' });
            vertices.push({ x: cx + R*0.35, y: cy + R*0.25, name: 'V6' });
            edges.push([0, 1], [1, 2], [2, 3], [3, 0], [4, 0], [4, 2], [4, 3], [4, 1], [5, 0], [5, 1], [5, 2], [5, 3]);
          } else {
            // Cube: V = 8, E = 12, F = 6
            polyName = 'Cube';
            curV = 8; curE = 12; curF = 6;
            const rOut = R, rIn = R * 0.5;
            for (let i = 0; i < 4; i++) {
              const ang = (i * Math.PI / 2) - Math.PI / 4;
              vertices.push({ x: cx + Math.cos(ang) * rOut, y: cy + Math.sin(ang) * rOut, name: 'V' + (i+1) });
              vertices.push({ x: cx + Math.cos(ang) * rIn, y: cy + Math.sin(ang) * rIn, name: 'V' + (i+5) });
            }
            edges.push([0, 2], [2, 4], [4, 6], [6, 0]); // outer
            edges.push([1, 3], [3, 5], [5, 7], [7, 1]); // inner
            edges.push([0, 1], [2, 3], [4, 5], [6, 7]); // struts
          }

          // Draw Edges
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          edges.forEach(([i, j]) => {
            if (vertices[i] && vertices[j]) {
              ctx.moveTo(vertices[i].x, vertices[i].y);
              ctx.lineTo(vertices[j].x, vertices[j].y);
            }
          });
          ctx.stroke();

          // Draw Vertices
          vertices.forEach((v, idx) => {
            ctx.beginPath();
            ctx.arc(v.x, v.y, 6, 0, 2*Math.PI);
            ctx.fillStyle = '#f43f5e';
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          });

          // Invariant readout
          const eulerVal = curV - curE + curF;
          drawText(ctx, polyName + ' Graph: V = ' + curV + ',  E = ' + curE + ',  F = ' + curF, W/2, cy + R + 26, '#fbbf24', '14px bold sans-serif');
          drawText(ctx, 'V - E + F = ' + curV + ' - ' + curE + ' + ' + curF + ' = ' + eulerVal + ' (Strict Topological Invariant)', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'polygon_interior_angles':
      return `
        function render(ctx, W, H, p, params) {
          const N = params.sidesN || 6;
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W / 2, cy = H * 0.5, R = 115;

          drawText(ctx, 'Interior Angles of an n-gon: (n - 2) × 180°', W/2, 40, '#38bdf8', '16px bold sans-serif');

          const verts = [];
          for (let i = 0; i < N; i++) {
            const ang = (i / N) * 2 * Math.PI - Math.PI / 2;
            verts.push({ x: cx + Math.cos(ang) * R, y: cy + Math.sin(ang) * R });
          }

          // Draw triangulation diagonals from vertex 0
          const trianglesCount = N - 2;
          const activeTriangles = Math.max(1, Math.min(trianglesCount, Math.floor(t * trianglesCount) + 1));
          const cols = ['#06b6d4', '#f59e0b', '#f43f5e', '#10b981', '#8b5cf6', '#3b82f6', '#ec4899'];

          for (let i = 0; i < activeTriangles; i++) {
            ctx.beginPath();
            ctx.moveTo(verts[0].x, verts[0].y);
            ctx.lineTo(verts[i+1].x, verts[i+1].y);
            ctx.lineTo(verts[i+2].x, verts[i+2].y);
            ctx.closePath();
            ctx.fillStyle = cols[i % cols.length];
            ctx.globalAlpha = 0.35;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Label 180 in each triangle
            const mx = (verts[0].x + verts[i+1].x + verts[i+2].x) / 3;
            const my = (verts[0].y + verts[i+1].y + verts[i+2].y) / 3;
            drawText(ctx, '180°', mx, my, '#fff', '13px bold sans-serif');
          }

          // Outer polygon outline
          ctx.beginPath();
          for (let i = 0; i < N; i++) {
            if (i === 0) ctx.moveTo(verts[i].x, verts[i].y);
            else ctx.lineTo(verts[i].x, verts[i].y);
          }
          ctx.closePath();
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 3;
          ctx.stroke();

          const totalDeg = (N - 2) * 180;
          drawText(ctx, 'Triangles = ' + (N - 2) + ' ⟹ Sum of Angles = (' + N + ' - 2) × 180° = ' + totalDeg + '°', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'polygon_exterior_angles':
      return `
        function render(ctx, W, H, p, params) {
          const N = params.polySides || params.sidesN || 5;
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W / 2, cy = H * 0.50;

          drawText(ctx, 'Exterior Angles of ANY Convex Polygon Sum to 360°', W/2, 38, '#38bdf8', '16px bold sans-serif');

          // Polygon edges shrink as t -> 1 safely within canvas bounds
          const R = Math.min(85, H * 0.28) * (1 - t * 0.90);
          const angleWedge = (2 * Math.PI) / N;
          const cols = ['#06b6d4', '#f59e0b', '#f43f5e', '#10b981', '#8b5cf6', '#3b82f6', '#ec4899'];

          // Draw polygon body if not fully contracted
          if (R > 5) {
            ctx.beginPath();
            for (let i = 0; i < N; i++) {
              const ang = (i / N) * 2 * Math.PI;
              const px = cx + Math.cos(ang) * R;
              const py = cy + Math.sin(ang) * R;
              if (i === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fillStyle = 'rgba(30, 41, 59, 0.5)';
            ctx.fill();
            ctx.strokeStyle = '#475569';
            ctx.lineWidth = 2;
            ctx.stroke();
          }

          // Exterior angle fans
          const wedgeR = 36;
          for (let i = 0; i < N; i++) {
            const ang = (i / N) * 2 * Math.PI;
            const px = cx + Math.cos(ang) * R;
            const py = cy + Math.sin(ang) * R;

            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.arc(px, py, wedgeR, ang, ang + angleWedge);
            ctx.closePath();
            ctx.fillStyle = cols[i % cols.length];
            ctx.globalAlpha = 0.85;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }

          const angleEach = Math.round(360 / N);
          if (t > 0.7) {
            drawText(ctx, 'All ' + N + ' Exterior Angles Converge at Center into a Full 360° Circle!', cx, cy + 65, '#fbbf24', '13px bold sans-serif');
          }
          drawText(ctx, N + ' × (' + angleEach + '°) = 360° — Shrinking vertices demonstrates exterior angle sum invariance!', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'ellipse_affine_stretch':
      return `
        function render(ctx, W, H, p, params) {
          const a = (params.semiA || params.axisA || 130);
          const b = (params.semiB || params.axisB || 75);
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W / 2, cy = H * 0.5;

          drawText(ctx, 'Area of Ellipse via Affine Scaling: Area = πab', W/2, 40, '#38bdf8', '16px bold sans-serif');

          // Transform from unit circle to ellipse (a, b)
          const curA = 70 * (1 - t) + a * t;
          const curB = 70 * (1 - t) + b * t;

          // Ellipse
          ctx.beginPath();
          ctx.ellipse(cx, cy, curA, curB, 0, 0, 2*Math.PI);
          ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
          ctx.fill();
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 3;
          ctx.stroke();

          // Semi-major and semi-minor axis lines
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(cx, cy); ctx.lineTo(cx + curA, cy);
          ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - curB);
          ctx.stroke();

          drawText(ctx, 'a = ' + Math.round(curA), cx + curA/2, cy + 18, '#fbbf24', '13px bold sans-serif');
          drawText(ctx, 'b = ' + Math.round(curB), cx - 28, cy - curB/2, '#f43f5e', '13px bold sans-serif');

          const area = Math.round(Math.PI * curA * curB);
          drawText(ctx, 'Circle Area πr² scaled by (a/r)(b/r) ⟹ Area = πab = ' + area + ' units²', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'derivative_secant_zoom':
      return `
        function render(ctx, W, H, p, params) {
          const x0 = params.posX !== undefined ? params.posX : (params.pointX !== undefined ? params.pointX : 1.2);
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W * 0.30, cy = H * 0.68;
          const scale = Math.min(55, H * 0.16);

          drawText(ctx, 'Derivative as the Tangent Limit of Secant Slopes', W/2, 38, '#38bdf8', '16px bold sans-serif');

          // Axes
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(cx - 110, cy); ctx.lineTo(cx + 150, cy);
          ctx.moveTo(cx, cy + 30); ctx.lineTo(cx, cy - 180);
          ctx.stroke();

          // Parabola y = 0.5 * x^2
          ctx.beginPath();
          for (let px = -110; px <= 140; px++) {
            const x = px / scale;
            const y = 0.5 * x * x;
            const scrX = cx + px;
            const scrY = cy - y * scale;
            if (px === -110) ctx.moveTo(scrX, scrY);
            else ctx.lineTo(scrX, scrY);
          }
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Secant delta x (shrinks as t -> 1)
          const dx = (1.8 * (1 - t * 0.96)) + 0.04;
          const p1x = x0, p1y = 0.5 * p1x * p1x;
          const p2x = x0 + dx, p2y = 0.5 * p2x * p2x;

          // Secant line
          const slope = (p2y - p1y) / dx;
          const scr1x = cx + p1x * scale, scr1y = cy - p1y * scale;
          const scr2x = cx + p2x * scale, scr2y = cy - p2y * scale;

          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(scr1x - 60, scr1y + 60 * slope);
          ctx.lineTo(scr2x + 60, scr2y - 60 * slope);
          ctx.stroke();

          // Secant points
          ctx.fillStyle = '#06b6d4';
          ctx.beginPath(); ctx.arc(scr1x, scr1y, 5, 0, 2*Math.PI); ctx.fill();
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath(); ctx.arc(scr2x, scr2y, 5, 0, 2*Math.PI); ctx.fill();

          // Inset zoom lens
          const zoomX = W * 0.73, zoomY = H * 0.52, zoomR = Math.min(80, H * 0.25);
          drawText(ctx, 'Local Linearity (Zoom Lens)', zoomX, zoomY - zoomR - 12, '#f43f5e', '13px bold sans-serif');

          ctx.save();
          ctx.beginPath();
          ctx.arc(zoomX, zoomY, zoomR, 0, 2*Math.PI);
          ctx.fillStyle = '#0f172a';
          ctx.fill();
          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.clip();

          // Grid inside lens
          ctx.strokeStyle = 'rgba(255,255,255,0.08)';
          ctx.lineWidth = 1;
          for (let g = -zoomR; g <= zoomR; g += 20) {
            ctx.beginPath(); ctx.moveTo(zoomX + g, zoomY - zoomR); ctx.lineTo(zoomX + g, zoomY + zoomR); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(zoomX - zoomR, zoomY + g); ctx.lineTo(zoomX + zoomR, zoomY + g); ctx.stroke();
          }

          // Tangent & Secant inside lens
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(zoomX - zoomR, zoomY + zoomR * slope * 0.7);
          ctx.lineTo(zoomX + zoomR, zoomY - zoomR * slope * 0.7);
          ctx.stroke();

          ctx.fillStyle = '#fff';
          ctx.beginPath(); ctx.arc(zoomX, zoomY, 4, 0, 2*Math.PI); ctx.fill();
          ctx.restore();

          drawText(ctx, 'Δx = ' + dx.toFixed(2), zoomX, zoomY + zoomR + 18, '#fbbf24', '12px bold sans-serif');
          drawText(ctx, 'Secant Slope Δy/Δx = ' + slope.toFixed(3) + ' ⟶ Exact Tangent Slope f’(' + x0.toFixed(2) + ') = ' + x0.toFixed(2), W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'fundamental_theorem_calc':
      return `
        function render(ctx, W, H, p, params) {
          const xMax = (params.upperX || 4);
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W * 0.2, cy = H * 0.7, scaleX = 70, scaleY = 40;

          drawText(ctx, 'Fundamental Theorem of Calculus: d/dx ∫ f(t) dt = f(x)', W/2, 40, '#38bdf8', '16px bold sans-serif');

          // Curve f(t) = 0.3 * t^2 + 1
          const curX = 1 + (xMax - 1) * t;

          // Shaded area under curve up to curX
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          for (let step = 0; step <= curX * scaleX; step++) {
            const tVal = step / scaleX;
            const yVal = 0.3 * tVal * tVal + 1;
            ctx.lineTo(cx + step, cy - yVal * scaleY);
          }
          ctx.lineTo(cx + curX * scaleX, cy);
          ctx.closePath();
          ctx.fillStyle = 'rgba(6, 182, 212, 0.25)';
          ctx.fill();

          // Sliver dx
          const sliverW = 6;
          const curY = 0.3 * curX * curX + 1;
          ctx.fillStyle = '#f43f5e';
          ctx.fillRect(cx + curX * scaleX, cy - curY * scaleY, sliverW, curY * scaleY);

          drawText(ctx, 'Sliver dA = f(x) · dx', cx + curX * scaleX + 80, cy - curY * scaleY/2, '#f43f5e', '13px bold sans-serif');

          drawText(ctx, 'Accumulated Area A(x) = ∫₀ˣ f(t)dt ⟹ The rate of change dA/dx is the curve height f(x)', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'cavalieri_principle':
      return `
        function render(ctx, W, H, p, params) {
          const numSlices = params.sliceCount || params.slicesCount || 20;
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cy = H * 0.65;
          const totalH = Math.min(160, H * 0.45);
          const sliceH = Math.max(3, totalH / numSlices);
          const w = Math.min(110, W * 0.22);

          drawText(ctx, "Cavalieri's Principle: Equal Cross-Sections Implies Equal Volume", W/2, 38, '#38bdf8', '16px bold sans-serif');

          // Stack 1 (Straight)
          const x1 = W * 0.32;
          for (let i = 0; i < numSlices; i++) {
            const y = cy - i * sliceH;
            ctx.fillStyle = '#06b6d4';
            ctx.fillRect(x1 - w/2, y, w, Math.max(1, sliceH - 1));
          }
          drawText(ctx, 'Straight Stack', x1, cy + 24, '#06b6d4', '14px bold sans-serif');

          // Stack 2 (Sheared)
          const x2 = W * 0.68;
          for (let i = 0; i < numSlices; i++) {
            const y = cy - i * sliceH;
            const shear = Math.sin((i / numSlices) * Math.PI) * 45 * t;
            ctx.fillStyle = '#f59e0b';
            ctx.fillRect(x2 - w/2 + shear, y, w, Math.max(1, sliceH - 1));
          }
          drawText(ctx, 'Sheared Stack (' + numSlices + ' Slices)', x2, cy + 24, '#f59e0b', '14px bold sans-serif');

          // Laser scan line
          const scanY = cy - (t * numSlices * sliceH);
          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 2;
          ctx.setLineDash([6, 4]);
          ctx.beginPath();
          ctx.moveTo(W * 0.1, scanY); ctx.lineTo(W * 0.9, scanY);
          ctx.stroke();
          ctx.setLineDash([]);
          drawText(ctx, 'Scan: Identical slice area at height h', W/2, scanY - 12, '#f43f5e', '12px bold sans-serif');

          drawText(ctx, 'Every horizontal cross-section has identical area A(z) ⟹ Total volume is identical', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'binomial_cube':
      return `
        function render(ctx, W, H, p, params) {
          const a = params.edgeA || params.valA || 50;
          const b = params.edgeB || params.valB || 30;
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W / 2, cy = H * 0.52;

          drawText(ctx, 'Binomial Cube: (a + b)³ = a³ + 3a²b + 3ab² + b³', W/2, 38, '#38bdf8', '16px bold sans-serif');

          const explode = 42 * t;
          const scaleA = Math.min(48, a * 0.85);
          const scaleB = Math.min(32, b * 0.85);

          // 8 blocks isometric rendering
          drawIsoBox(ctx, cx - explode - scaleA/2, cy - explode - scaleA/2, scaleA, scaleA, '#06b6d4', 'a³');
          drawIsoBox(ctx, cx + explode + scaleB/2, cy - explode - scaleA/2, scaleB, scaleA, '#f59e0b', 'a²b');
          drawIsoBox(ctx, cx - explode - scaleA/2, cy + explode + scaleB/2, scaleA, scaleB, '#3b82f6', 'ab²');
          drawIsoBox(ctx, cx + explode + scaleB/2, cy + explode + scaleB/2, scaleB, scaleB, '#f43f5e', 'b³');

          drawText(ctx, 'a = ' + a + ',  b = ' + b + '  ⟹  (a + b)³ = ' + Math.round(Math.pow(a+b, 3)), W/2, cy + scaleA + 38, '#fbbf24', '13px bold sans-serif');
          drawText(ctx, '8 3D geometric sub-blocks assemble into one unified cube (a + b)³', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
        function drawIsoBox(ctx, x, y, w, h, col, label) {
          ctx.save();
          ctx.translate(x, y);
          ctx.fillStyle = col;
          ctx.globalAlpha = 0.85;
          ctx.fillRect(-w/2, -h/2, w, h);
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 1.0;
          ctx.strokeRect(-w/2, -h/2, w, h);
          drawText(ctx, label, 0, 4, '#fff', '12px bold sans-serif');
          ctx.restore();
        }
      `;

    case 'am_gm_inequality':
      return `
        function render(ctx, W, H, p, params) {
          const a = params.valA !== undefined ? params.valA : 110;
          const b = params.valB !== undefined ? params.valB : 60;
          ctx.clearRect(0, 0, W, H);
          const cx = W / 2, cy = H * 0.65;
          const R = (a + b) / 2;

          drawText(ctx, 'AM-GM Inequality: ½(a + b) ≥ √(ab)', W/2, 38, '#38bdf8', '16px bold sans-serif');

          // Step 1: Base segments a and b (visible from step 1)
          const p1 = Math.min(1, p * 4);
          const ax = cx - R, bx = ax + a, cxEnd = bx + b;

          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(ax, cy); ctx.lineTo(ax + a * p1, cy);
          ctx.stroke();

          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(bx, cy); ctx.lineTo(bx + b * p1, cy);
          ctx.stroke();

          drawText(ctx, 'a = ' + a, ax + a/2, cy + 22, '#06b6d4', '13px bold sans-serif');
          drawText(ctx, 'b = ' + b, bx + b/2, cy + 22, '#f59e0b', '13px bold sans-serif');

          // Step 2: Semicircle with diameter (a + b)
          if (p > 0.25) {
            const p2 = Math.min(1, (p - 0.25) * 4);
            ctx.beginPath();
            ctx.arc(cx, cy, R, Math.PI, Math.PI + Math.PI * p2);
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 2.5;
            ctx.stroke();
          }

          // Step 3: Perpendicular altitude GM = sqrt(a * b)
          const gmHeight = Math.sqrt(a * b);
          if (p > 0.50) {
            const p3 = Math.min(1, (p - 0.50) * 4);
            ctx.strokeStyle = '#f43f5e';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(bx, cy);
            ctx.lineTo(bx, cy - gmHeight * p3);
            ctx.stroke();
            drawText(ctx, 'GM = √(ab) = ' + gmHeight.toFixed(1), bx - 45, cy - gmHeight/2, '#f43f5e', '13px bold sans-serif');
          }

          // Step 4: Radius AM = (a + b)/2
          if (p > 0.75) {
            const p4 = Math.min(1, (p - 0.75) * 4);
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx, cy - R * p4);
            ctx.stroke();
            drawText(ctx, 'AM = ½(a+b) = ' + R.toFixed(1), cx + 55, cy - R/2, '#38bdf8', '13px bold sans-serif');
          }

          const amVal = R.toFixed(1);
          const gmVal = gmHeight.toFixed(1);
          drawText(ctx, 'Radius AM (' + amVal + ') ≥ Altitude GM (' + gmVal + ') with strict equality when a = b', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'law_of_cosines':
      return `
        function render(ctx, W, H, p, params) {
          const a = params.sideA || 135;
          const b = params.sideB || 105;
          const angleCdeg = params.angleC !== undefined ? params.angleC : 60;
          const angleC = angleCdeg * Math.PI / 180;
          ctx.clearRect(0, 0, W, H);
          const cx = W / 2, cy = H * 0.62;

          drawText(ctx, 'Geometric Proof of Law of Cosines: c² = a² + b² - 2ab cos(C)', W/2, 38, '#38bdf8', '16px bold sans-serif');

          const cX = cx - a/2, cY = cy;
          const bX = cX + a, bY = cy;
          const aX = cX + b * Math.cos(angleC);
          const aY = cY - b * Math.sin(angleC);

          // Step 1: Draw base triangle ABC
          ctx.beginPath();
          ctx.moveTo(cX, cY); ctx.lineTo(bX, bY); ctx.lineTo(aX, aY);
          ctx.closePath();
          ctx.fillStyle = 'rgba(6, 182, 212, 0.12)';
          ctx.fill();
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          drawText(ctx, 'C (' + angleCdeg + '°)', cX - 18, cY + 16, '#06b6d4', '12px bold sans-serif');
          drawText(ctx, 'B', bX + 12, bY + 16, '#fff', '12px bold sans-serif');
          drawText(ctx, 'A', aX, aY - 14, '#fff', '12px bold sans-serif');

          // Step 2: Altitude dropped from A
          if (p > 0.25) {
            ctx.strokeStyle = '#f43f5e';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(aX, aY); ctx.lineTo(aX, cy);
            ctx.stroke();
            ctx.setLineDash([]);
            drawText(ctx, 'h = b sin(C)', aX - 42, (aY + cy)/2, '#f43f5e', '11px bold sans-serif');
          }

          // Step 3: Base segments: b cos C and (a - b cos C)
          if (p > 0.50) {
            drawText(ctx, 'b cos(C)', (cX + aX)/2, cy + 18, '#fbbf24', '11px bold sans-serif');
            drawText(ctx, 'a - b cos(C)', (aX + bX)/2, cy + 18, '#34d399', '11px bold sans-serif');
          }

          // Step 4: Pythagorean on right-angled sub-triangle
          const cVal = Math.sqrt(a*a + b*b - 2*a*b*Math.cos(angleC));
          if (p > 0.75) {
            ctx.strokeStyle = '#a855f7';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(aX, aY); ctx.lineTo(bX, bY);
            ctx.stroke();
          }

          drawText(ctx, 'c = ' + cVal.toFixed(1) + '  ⟹  c² = h² + (a - b cos C)² = a² + b² - 2ab cos(C)', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'parabola_reflection':
      return `
        function render(ctx, W, H, p, params) {
          const f = params.focalF || params.focusF || 50;
          ctx.clearRect(0, 0, W, H);
          const t = easeInOutCubic(p);
          const cx = W / 2, cy = H * 0.72;

          drawText(ctx, 'Parabolic Mirror Focus: Parallel Incoming Rays Converge at F', W/2, 38, '#38bdf8', '16px bold sans-serif');

          // Parabola y = x^2 / (4f)
          ctx.beginPath();
          for (let px = -150; px <= 150; px++) {
            const py = (px * px) / (4 * f);
            if (px === -150) ctx.moveTo(cx + px, cy - py);
            else ctx.lineTo(cx + px, cy - py);
          }
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 3;
          ctx.stroke();

          // Focus point F
          const focusY = cy - f;
          ctx.beginPath();
          ctx.arc(cx, focusY, 6, 0, 2*Math.PI);
          ctx.fillStyle = '#fbbf24';
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          drawText(ctx, 'Focus F(0, ' + f + ')', cx, focusY - 14, '#fbbf24', '13px bold sans-serif');

          // Incoming rays
          const rayXs = [-120, -80, -40, 40, 80, 120];
          rayXs.forEach(rx => {
            const hitY = cy - (rx * rx) / (4 * f);
            ctx.strokeStyle = '#f43f5e';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx + rx, 70);
            ctx.lineTo(cx + rx, hitY);
            if (t > 0.4) {
              const rayT = Math.min(1, (t - 0.4) * 1.6);
              ctx.lineTo(cx + rx * (1 - rayT), hitY + (focusY - hitY) * rayT);
            }
            ctx.stroke();
          });

          drawText(ctx, 'Equal angles of incidence & reflection guarantee all parallel rays meet at F', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    case 'basel_problem_series':
      return `
        function render(ctx, W, H, p, params) {
          const N = params.termCount || params.maxN || 10;
          ctx.clearRect(0, 0, W, H);
          const cx = W / 2, cy = H * 0.64;

          drawText(ctx, 'The Basel Problem: 1 + 1/4 + 1/9 + 1/16 + ... = π²/6', W/2, 38, '#38bdf8', '16px bold sans-serif');

          let partialSum = 0;
          const barW = Math.min(22, (W * 0.6) / N);
          const startX = cx - (N * barW) / 2;

          // Step 1: Draw inverse square bars up to N
          const animatedN = Math.max(1, Math.min(N, Math.floor(p * N * 1.5) + 1));
          for (let n = 1; n <= animatedN; n++) {
            const val = 1 / (n * n);
            partialSum += val;
            const barH = val * 120;
            ctx.fillStyle = 'hsl(' + (195 + n * 14) + ', 85%, 55%)';
            ctx.fillRect(startX + (n-1)*barW, cy - barH, barW - 2, barH);
            if (barW > 16 && n <= 5) {
              drawText(ctx, '1/' + (n*n), startX + (n-0.5)*barW, cy + 14, '#94a3b8', '10px sans-serif');
            }
          }

          // Step 2 & 4: Target line pi^2 / 6
          const target = Math.PI * Math.PI / 6;
          const targetY = cy - 120; // 1.0 = 120px, target 1.6449 = 197px
          const eulerTargetY = cy - target * (120 / 1.6449);

          ctx.strokeStyle = '#34d399';
          ctx.lineWidth = 2;
          ctx.setLineDash([6, 4]);
          ctx.beginPath();
          ctx.moveTo(startX - 20, eulerTargetY);
          ctx.lineTo(startX + N * barW + 20, eulerTargetY);
          ctx.stroke();
          ctx.setLineDash([]);

          drawText(ctx, 'Euler Target Limit π²/6 ≈ 1.64493...', cx, eulerTargetY - 12, '#34d399', '13px bold sans-serif');
          drawText(ctx, 'Partial Sum S_' + animatedN + ' = ' + partialSum.toFixed(5), cx, cy + 34, '#fbbf24', '14px bold sans-serif');

          drawText(ctx, 'Solved by Euler in 1734: Product expansion of sin(x)/x coefficients gives ∑ 1/n² = π²/6', W/2, H - 24, '#34d399', '15px bold sans-serif');
        }
      `;

    default:
      return null;
  }
}
