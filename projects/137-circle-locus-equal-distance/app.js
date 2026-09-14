/* =========================================================
   MATHS UNIVERSE — CIRCLE GEOMETRY SANDBOX ENGINE
   ========================================================= */

(function () {
    'use strict';

    // ---------------------------------------------------------
    // 1. MATHEMATICAL STATE
    // ---------------------------------------------------------
    const state = {
        center: { h: 1, k: -1 },
        radius: 4.12,
        point: { x: 4.2, y: 2.6 },
        mode: "test", // "test" | "locus"
        showGrid: true,
        showDistances: true,
        showEquation: true,
        showInequality: false,
        showDirectrix: false,
        directrixA: -5,
        
        // Canvas View transform (Pan & Scale)
        view: {
            scale: 35, // pixels per coordinate unit
            zoomLevel: 1.0,
            originX: 0, // viewport center relative offset
            originY: 0
        },

        // Challenge generator state
        challenge: {
            type: "ON", // "ON" | "INSIDE" | "OUTSIDE"
            center: { h: 2, k: -3 },
            radius: 5.0,
            solved: false
        }
    };

    // Initialize point mathematically if required
    function initDefaultPoint() {
        // Angle 45 deg for clean initial placement if needed, or default values
        state.point.x = parseFloat((state.center.h + state.radius * Math.cos(Math.PI / 4)).toFixed(2));
        state.point.y = parseFloat((state.center.k + state.radius * Math.sin(Math.PI / 4)).toFixed(2));
    }

    // ---------------------------------------------------------
    // 2. DOM ELEMENT REFERENCES
    // ---------------------------------------------------------
    const dom = {
        // Inputs
        inputH: document.getElementById('inputH'),
        inputK: document.getElementById('inputK'),
        inputR: document.getElementById('inputR'),
        sliderR: document.getElementById('sliderR'),
        inputPX: document.getElementById('inputPX'),
        inputPY: document.getElementById('inputPY'),
        inputDirectrixA: document.getElementById('inputDirectrixA'),

        // Mode buttons
        modeTestBtn: document.getElementById('modeTestBtn'),
        modeLocusBtn: document.getElementById('modeLocusBtn'),

        // Action Buttons
        btnSnapP: document.getElementById('btnSnapP'),
        btnRandomP: document.getElementById('btnRandomP'),
        btnPlotCircle: document.getElementById('btnPlotCircle'),
        btnRandomCircle: document.getElementById('btnRandomCircle'),
        btnResetView: document.getElementById('btnResetView'),
        btnNewProof: document.getElementById('btnNewProof'),

        // View Toggles
        chkShowDirectrix: document.getElementById('chkShowDirectrix'),
        directrixInputRow: document.getElementById('directrixInputRow'),
        chkDistances: document.getElementById('chkDistances'),
        chkEquation: document.getElementById('chkEquation'),
        chkGrid: document.getElementById('chkGrid'),
        chkInequalityRegions: document.getElementById('chkInequalityRegions'),

        // Canvas & Overlays
        canvasWrapper: document.getElementById('canvasWrapper'),
        geoCanvas: document.getElementById('geoCanvas'),
        graphEquationBadge: document.getElementById('graphEquationBadge'),
        graphNumericEq: document.getElementById('graphNumericEq'),
        badgeCP: document.getElementById('badgeCP'),
        badgeCPValue: document.getElementById('badgeCPValue'),
        badgeDirectrix: document.getElementById('badgeDirectrix'),
        badgeDirectrixValue: document.getElementById('badgeDirectrixValue'),
        classBanner: document.getElementById('classBanner'),
        classIcon: document.getElementById('classIcon'),
        classMessage: document.getElementById('classMessage'),

        // Canvas Controls
        btnPanReset: document.getElementById('btnPanReset'),
        btnZoomOut: document.getElementById('btnZoomOut'),
        zoomLevelText: document.getElementById('zoomLevelText'),
        btnZoomIn: document.getElementById('btnZoomIn'),
        btnFitCircle: document.getElementById('btnFitCircle'),

        // Predict & Check
        predictX: document.getElementById('predictX'),
        predictY: document.getElementById('predictY'),
        predictLeftVal: document.getElementById('predictLeftVal'),
        predictRightVal: document.getElementById('predictRightVal'),
        predictResultBadge: document.getElementById('predictResultBadge'),
        predictResultText: document.getElementById('predictResultText'),
        predictIcon: document.getElementById('predictIcon'),

        // Challenge Generator
        challengePrompt: document.getElementById('challengePrompt'),
        challengeX: document.getElementById('challengeX'),
        challengeY: document.getElementById('challengeY'),
        btnCheckChallenge: document.getElementById('btnCheckChallenge'),
        btnNewChallenge: document.getElementById('btnNewChallenge'),
        challengeFeedback: document.getElementById('challengeFeedback'),

        // Proof section
        proofMathDistance: document.getElementById('proofMathDistance'),
        proofMathCompare: document.getElementById('proofMathCompare'),
        proofMathEquation: document.getElementById('proofMathEquation'),
        proofStatusBadge: document.getElementById('proofStatusBadge')
    };

    // Dragging state variables
    let isDraggingP = false;
    let isDraggingC = false;
    let isPanning = false;
    let panStart = { x: 0, y: 0 };

    // ---------------------------------------------------------
    // 3. UTILITY MATH FUNCTIONS
    // ---------------------------------------------------------

    // Format squared terms cleanly: (x - 3)^2 or (x + 2)^2 or x^2
    function formatSquaredTerm(varName, val) {
        if (Math.abs(val) < 0.001) return `${varName}²`;
        if (val > 0) return `(${varName} - ${val.toFixed(val % 1 === 0 ? 0 : 2)})²`;
        return `(${varName} + ${Math.abs(val).toFixed(val % 1 === 0 ? 0 : 2)})²`;
    }

    // Calculate distance between two points
    function getDistance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Classify point P relative to circle
    function classifyPoint(h, k, r, x, y) {
        const dist = getDistance(x, y, h, k);
        const distSq = (x - h) * (x - h) + (y - k) * (y - k);
        const rSq = r * r;
        // Use a small distance tolerance rather than a percentage of r².
        // The previous 10% squared-distance test could classify visibly
        // non-circle points as "ON".
        const tol = Math.max(0.05, 0.005 * Math.max(1, r));

        if (Math.abs(dist - r) <= tol) {
            return { code: "ON", text: "ON the circle", class: "banner-on", color: "var(--green)" };
        } else if (dist < r) {
            return { code: "INSIDE", text: "INSIDE the circle", class: "banner-inside", color: "var(--orange)" };
        } else {
            return { code: "OUTSIDE", text: "OUTSIDE the circle", class: "banner-outside", color: "var(--red)" };
        }
    }

    // Coordinate conversions (World math units <-> SVG Canvas Pixels)
    function mathToSvg(x, y) {
        const rect = dom.geoCanvas.getBoundingClientRect();
        const cx = rect.width / 2 + state.view.originX;
        const cy = rect.height / 2 + state.view.originY;
        const scale = state.view.scale * state.view.zoomLevel;

        return {
            x: cx + x * scale,
            y: cy - y * scale // SVG y goes downwards
        };
    }

    function svgToMath(svgX, svgY) {
        const rect = dom.geoCanvas.getBoundingClientRect();
        const cx = rect.width / 2 + state.view.originX;
        const cy = rect.height / 2 + state.view.originY;
        const scale = state.view.scale * state.view.zoomLevel;

        return {
            x: (svgX - cx) / scale,
            y: (cy - svgY) / scale
        };
    }

    // ---------------------------------------------------------
    // 4. MAIN RENDER ENGINE
    // ---------------------------------------------------------

    function render() {
        updateFormInputs();
        renderSVGCanvas();
        updateClassification();
        updatePredictAndCheck();
        updateProof();
    }

    // Update Form Input UI Controls to match state
    function updateFormInputs() {
        dom.inputH.value = state.center.h;
        dom.inputK.value = state.center.k;
        dom.inputR.value = state.radius;
        dom.sliderR.value = state.radius;
        dom.inputPX.value = state.point.x;
        dom.inputPY.value = state.point.y;
        dom.predictX.value = state.point.x;
        dom.predictY.value = state.point.y;
        dom.inputDirectrixA.value = state.directrixA;
        dom.zoomLevelText.textContent = `${Math.round(state.view.zoomLevel * 100)}%`;

        // View options
        dom.chkShowDirectrix.checked = state.showDirectrix;
        dom.directrixInputRow.style.display = state.showDirectrix ? 'flex' : 'none';
        dom.chkDistances.checked = state.showDistances;
        dom.chkEquation.checked = state.showEquation;
        dom.chkGrid.checked = state.showGrid;
        dom.chkInequalityRegions.checked = state.showInequality;

        // Mode button styles
        dom.modeTestBtn.classList.toggle('active', state.mode === 'test');
        dom.modeLocusBtn.classList.toggle('active', state.mode === 'locus');

        // Graph overlay visibilities
        dom.graphEquationBadge.style.display = state.showEquation ? 'block' : 'none';
        dom.badgeCP.style.display = state.showDistances ? 'flex' : 'none';
        dom.badgeDirectrix.style.display = (state.showDirectrix && state.showDistances) ? 'flex' : 'none';

        // Legend directrix item
        document.querySelector('.legend-directrix-item').style.display = state.showDirectrix ? 'flex' : 'none';

        // Update Equation Badge Text
        const eqStr = `${formatSquaredTerm('x', state.center.h)} + ${formatSquaredTerm('y', state.center.k)} = ${(state.radius * state.radius).toFixed(2)}`;
        dom.graphNumericEq.textContent = eqStr;
    }

    // Render interactive SVG Canvas
    function renderSVGCanvas() {
        const svg = dom.geoCanvas;
        svg.innerHTML = ''; // Clear canvas

        const rect = svg.getBoundingClientRect();
        const width = rect.width || 600;
        const height = rect.height || 500;

        const scale = state.view.scale * state.view.zoomLevel;
        const centerSvg = mathToSvg(0, 0);

        // 1. Draw Grid Lines & Axes
        if (state.showGrid) {
            const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            gridGroup.setAttribute('class', 'grid-lines');

            // Compute math coordinate bounds visible on screen
            const minMath = svgToMath(0, height);
            const maxMath = svgToMath(width, 0);

            const startX = Math.floor(minMath.x) - 1;
            const endX = Math.ceil(maxMath.x) + 1;
            const startY = Math.floor(minMath.y) - 1;
            const endY = Math.ceil(maxMath.y) + 1;

            // Step size adapts based on zoom
            let step = 1;
            if (scale < 20) step = 2;
            if (scale < 10) step = 5;

            // Vertical Grid Lines & X-axis tick labels
            for (let x = Math.floor(startX / step) * step; x <= endX; x += step) {
                const pt = mathToSvg(x, 0);
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', pt.x);
                line.setAttribute('y1', 0);
                line.setAttribute('x2', pt.x);
                line.setAttribute('y2', height);
                line.setAttribute('stroke', x === 0 ? '#94a3b8' : '#e2e8f0');
                line.setAttribute('stroke-width', x === 0 ? '2' : '1');
                gridGroup.appendChild(line);

                if (x !== 0 && pt.x > 10 && pt.x < width - 10) {
                    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    text.setAttribute('x', pt.x);
                    text.setAttribute('y', Math.min(Math.max(centerSvg.y + 15, 15), height - 5));
                    text.setAttribute('font-size', '11');
                    text.setAttribute('fill', '#64748b');
                    text.setAttribute('text-anchor', 'middle');
                    text.textContent = x;
                    gridGroup.appendChild(text);
                }
            }

            // Horizontal Grid Lines & Y-axis tick labels
            for (let y = Math.floor(startY / step) * step; y <= endY; y += step) {
                const pt = mathToSvg(0, y);
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', 0);
                line.setAttribute('y1', pt.y);
                line.setAttribute('x2', width);
                line.setAttribute('y2', pt.y);
                line.setAttribute('stroke', y === 0 ? '#94a3b8' : '#e2e8f0');
                line.setAttribute('stroke-width', y === 0 ? '2' : '1');
                gridGroup.appendChild(line);

                if (y !== 0 && pt.y > 10 && pt.y < height - 10) {
                    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    text.setAttribute('x', Math.min(Math.max(centerSvg.x - 12, 15), width - 15));
                    text.setAttribute('y', pt.y + 4);
                    text.setAttribute('font-size', '11');
                    text.setAttribute('fill', '#64748b');
                    text.setAttribute('text-anchor', 'end');
                    text.textContent = y;
                    gridGroup.appendChild(text);
                }
            }

            // Origin Label '0'
            const text0 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text0.setAttribute('x', centerSvg.x - 8);
            text0.setAttribute('y', centerSvg.y + 14);
            text0.setAttribute('font-size', '11');
            text0.setAttribute('font-weight', 'bold');
            text0.setAttribute('fill', '#64748b');
            text0.textContent = '0';
            gridGroup.appendChild(text0);

            // Axis Arrows / Labels
            const xAxisLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            xAxisLabel.setAttribute('x', width - 15);
            xAxisLabel.setAttribute('y', Math.min(Math.max(centerSvg.y - 8, 15), height - 15));
            xAxisLabel.setAttribute('font-size', '12');
            xAxisLabel.setAttribute('font-weight', 'bold');
            xAxisLabel.setAttribute('fill', '#334155');
            xAxisLabel.textContent = 'x';
            gridGroup.appendChild(xAxisLabel);

            const yAxisLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            yAxisLabel.setAttribute('x', Math.min(Math.max(centerSvg.x + 8, 15), width - 15));
            yAxisLabel.setAttribute('y', 15);
            yAxisLabel.setAttribute('font-size', '12');
            yAxisLabel.setAttribute('font-weight', 'bold');
            yAxisLabel.setAttribute('fill', '#334155');
            yAxisLabel.textContent = 'y';
            gridGroup.appendChild(yAxisLabel);

            svg.appendChild(gridGroup);
        }

        // 2. Inequality Regions (Optional Shade)
        if (state.showInequality) {
            const centerPt = mathToSvg(state.center.h, state.center.k);
            const radiusPx = state.radius * scale;

            const circleShade = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circleShade.setAttribute('cx', centerPt.x);
            circleShade.setAttribute('cy', centerPt.y);
            circleShade.setAttribute('r', radiusPx);
            circleShade.setAttribute('fill', 'rgba(79, 70, 229, 0.06)');
            svg.appendChild(circleShade);
        }

        // 3. Optional Directrix Line
        if (state.showDirectrix) {
            const dirPt = mathToSvg(state.directrixA, 0);
            const dirLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            dirLine.setAttribute('x1', dirPt.x);
            dirLine.setAttribute('y1', 0);
            dirLine.setAttribute('x2', dirPt.x);
            dirLine.setAttribute('y2', height);
            dirLine.setAttribute('stroke', '#ec4899');
            dirLine.setAttribute('stroke-width', '2');
            dirLine.setAttribute('stroke-dasharray', '6,4');
            svg.appendChild(dirLine);

            // Directrix Label Badge on Graph
            const dirLabelBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            dirLabelBg.setAttribute('x', dirPt.x - 45);
            dirLabelBg.setAttribute('y', 40);
            dirLabelBg.setAttribute('width', '90');
            dirLabelBg.setAttribute('height', '24');
            dirLabelBg.setAttribute('rx', '4');
            dirLabelBg.setAttribute('fill', '#fce7f3');
            dirLabelBg.setAttribute('stroke', '#f472b6');
            svg.appendChild(dirLabelBg);

            const dirText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            dirText.setAttribute('x', dirPt.x);
            dirText.setAttribute('y', 56);
            dirText.setAttribute('font-size', '11');
            dirText.setAttribute('font-weight', 'bold');
            dirText.setAttribute('fill', '#be185d');
            dirText.setAttribute('text-anchor', 'middle');
            dirText.textContent = `Directrix x = ${state.directrixA}`;
            svg.appendChild(dirText);
        }

        // 4. Circle Locus
        const centerPt = mathToSvg(state.center.h, state.center.k);
        const radiusPx = state.radius * scale;

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', centerPt.x);
        circle.setAttribute('cy', centerPt.y);
        circle.setAttribute('r', radiusPx);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', '#4f46e5');
        circle.setAttribute('stroke-width', '2.5');
        circle.setAttribute('stroke-dasharray', state.mode === 'locus' ? 'none' : '6,4');
        svg.appendChild(circle);

        // 5. Radius Segment Line (from C to circle edge horizontally or angled)
        const radPt = mathToSvg(state.center.h + state.radius, state.center.k);
        const radiusLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        radiusLine.setAttribute('x1', centerPt.x);
        radiusLine.setAttribute('y1', centerPt.y);
        radiusLine.setAttribute('x2', radPt.x);
        radiusLine.setAttribute('y2', radPt.y);
        radiusLine.setAttribute('stroke', '#10b981');
        radiusLine.setAttribute('stroke-width', '2');
        radiusLine.setAttribute('stroke-dasharray', '4,3');
        svg.appendChild(radiusLine);

        // Radius Label
        const radLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        radLabel.setAttribute('x', (centerPt.x + radPt.x) / 2);
        radLabel.setAttribute('y', centerPt.y - 6);
        radLabel.setAttribute('font-size', '11');
        radLabel.setAttribute('font-weight', 'bold');
        radLabel.setAttribute('fill', '#059669');
        radLabel.setAttribute('text-anchor', 'middle');
        radLabel.textContent = `r = ${state.radius}`;
        svg.appendChild(radLabel);

        // 6. Test Point P & Distance Segment CP
        const ptSvg = mathToSvg(state.point.x, state.point.y);
        const classification = classifyPoint(state.center.h, state.center.k, state.radius, state.point.x, state.point.y);

        if (state.showDistances) {
            // Line C -> P
            const cpLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            cpLine.setAttribute('x1', centerPt.x);
            cpLine.setAttribute('y1', centerPt.y);
            cpLine.setAttribute('x2', ptSvg.x);
            cpLine.setAttribute('y2', ptSvg.y);
            cpLine.setAttribute('stroke', classification.color);
            cpLine.setAttribute('stroke-width', '2.5');
            cpLine.setAttribute('stroke-dasharray', '5,3');
            svg.appendChild(cpLine);

            // CP Distance Tag on Line
            const midX = (centerPt.x + ptSvg.x) / 2;
            const midY = (centerPt.y + ptSvg.y) / 2;
            const distVal = getDistance(state.point.x, state.point.y, state.center.h, state.center.k).toFixed(2);

            const cpTagBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            cpTagBg.setAttribute('x', midX - 35);
            cpTagBg.setAttribute('y', midY - 14);
            cpTagBg.setAttribute('width', '70');
            cpTagBg.setAttribute('height', '20');
            cpTagBg.setAttribute('rx', '4');
            cpTagBg.setAttribute('fill', '#ffffff');
            cpTagBg.setAttribute('stroke', classification.color);
            cpTagBg.setAttribute('stroke-width', '1');
            svg.appendChild(cpTagBg);

            const cpTagText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            cpTagText.setAttribute('x', midX);
            cpTagText.setAttribute('y', midY);
            cpTagText.setAttribute('font-size', '11');
            cpTagText.setAttribute('font-weight', 'bold');
            cpTagText.setAttribute('fill', classification.color);
            cpTagText.setAttribute('text-anchor', 'middle');
            cpTagText.textContent = `CP = ${distVal}`;
            svg.appendChild(cpTagText);

            // Distance to directrix line (if enabled)
            if (state.showDirectrix) {
                const dirPtX = mathToSvg(state.directrixA, 0).x;
                const dirDistLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                dirDistLine.setAttribute('x1', ptSvg.x);
                dirDistLine.setAttribute('y1', ptSvg.y);
                dirDistLine.setAttribute('x2', dirPtX);
                dirDistLine.setAttribute('y2', ptSvg.y);
                dirDistLine.setAttribute('stroke', '#3b82f6');
                dirDistLine.setAttribute('stroke-width', '2');
                dirDistLine.setAttribute('stroke-dasharray', '4,3');
                svg.appendChild(dirDistLine);
            }
        }

        // 7. Center Point C Marker
        const centerGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        centerGroup.setAttribute('cursor', 'pointer');

        const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        centerCircle.setAttribute('cx', centerPt.x);
        centerCircle.setAttribute('cy', centerPt.y);
        centerCircle.setAttribute('r', '7');
        centerCircle.setAttribute('fill', '#8b5cf6');
        centerCircle.setAttribute('stroke', '#ffffff');
        centerCircle.setAttribute('stroke-width', '2');
        centerGroup.appendChild(centerCircle);

        const centerLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        centerLabel.setAttribute('x', centerPt.x - 12);
        centerLabel.setAttribute('y', centerPt.y + 20);
        centerLabel.setAttribute('font-size', '12');
        centerLabel.setAttribute('font-weight', 'bold');
        centerLabel.setAttribute('fill', '#7c3aed');
        centerLabel.textContent = `C (${state.center.h}, ${state.center.k})`;
        centerGroup.appendChild(centerLabel);

        svg.appendChild(centerGroup);

        // 8. Test Point P Marker (Draggable)
        const pGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        pGroup.setAttribute('class', 'draggable-p');
        pGroup.setAttribute('cursor', 'grab');

        const pOuterGlow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        pOuterGlow.setAttribute('cx', ptSvg.x);
        pOuterGlow.setAttribute('cy', ptSvg.y);
        pOuterGlow.setAttribute('r', '14');
        pOuterGlow.setAttribute('fill', classification.color);
        pOuterGlow.setAttribute('fill-opacity', '0.2');
        pGroup.appendChild(pOuterGlow);

        const pCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        pCircle.setAttribute('cx', ptSvg.x);
        pCircle.setAttribute('cy', ptSvg.y);
        pCircle.setAttribute('r', '8');
        pCircle.setAttribute('fill', classification.color);
        pCircle.setAttribute('stroke', '#ffffff');
        pCircle.setAttribute('stroke-width', '2.5');
        pGroup.appendChild(pCircle);

        // Cursor Drag Hand Icon
        const pLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        pLabel.setAttribute('x', ptSvg.x + 14);
        pLabel.setAttribute('y', ptSvg.y + 4);
        pLabel.setAttribute('font-size', '13');
        pLabel.setAttribute('font-weight', 'bold');
        pLabel.setAttribute('fill', '#1e293b');
        pLabel.textContent = `P (${state.point.x}, ${state.point.y})`;
        pGroup.appendChild(pLabel);

        svg.appendChild(pGroup);
    }

    // ---------------------------------------------------------
    // 5. CLASSIFICATION & DISTANCE UPDATER
    // ---------------------------------------------------------

    function updateClassification() {
        const h = state.center.h;
        const k = state.center.k;
        const r = state.radius;
        const x = state.point.x;
        const y = state.point.y;

        const cp = getDistance(x, y, h, k);
        const classification = classifyPoint(h, k, r, x, y);

        // Update Banner
        dom.classBanner.className = `classification-banner ${classification.class}`;
        
        if (classification.code === "ON") {
            dom.classIcon.className = "fa-solid fa-circle-check";
            dom.classMessage.innerHTML = `P is ON the circle &mdash; CP = r (${cp.toFixed(2)} = ${r.toFixed(2)})`;
        } else if (classification.code === "INSIDE") {
            dom.classIcon.className = "fa-solid fa-circle-arrow-down";
            dom.classMessage.innerHTML = `P is INSIDE the circle &mdash; CP &lt; r (${cp.toFixed(2)} &lt; ${r.toFixed(2)})`;
        } else {
            dom.classIcon.className = "fa-solid fa-circle-arrow-up";
            dom.classMessage.innerHTML = `P is OUTSIDE the circle &mdash; CP &gt; r (${cp.toFixed(2)} &gt; ${r.toFixed(2)})`;
        }

        // Update Distance Badges
        dom.badgeCPValue.textContent = `CP = ${cp.toFixed(2)}`;
        const directrixDist = Math.abs(x - state.directrixA);
        dom.badgeDirectrixValue.textContent = `|x - a| = ${directrixDist.toFixed(2)}`;
    }

    // ---------------------------------------------------------
    // 6. PREDICT & CHECK MODULE
    // ---------------------------------------------------------

    function updatePredictAndCheck() {
        const h = state.center.h;
        const k = state.center.k;
        const r = state.radius;
        const x = state.point.x;
        const y = state.point.y;

        const leftVal = (x - h) * (x - h) + (y - k) * (y - k);
        const rightVal = r * r;

        dom.predictLeftVal.textContent = leftVal.toFixed(2);
        dom.predictRightVal.textContent = rightVal.toFixed(2);

        const distanceDiff = Math.abs(Math.sqrt(leftVal) - r);
        const onTolerance = Math.max(0.05, 0.005 * Math.max(1, r));
        const badge = dom.predictResultBadge;

        if (distanceDiff <= onTolerance) {
            badge.style.backgroundColor = 'var(--green-light)';
            badge.style.color = '#065f46';
            dom.predictIcon.className = 'fa-solid fa-check';
            dom.predictResultText.textContent = 'Equal! Point is on the circle.';
        } else if (leftVal < rightVal) {
            badge.style.backgroundColor = 'var(--orange-light)';
            badge.style.color = '#92400e';
            dom.predictIcon.className = 'fa-solid fa-less-than';
            dom.predictResultText.textContent = 'Left < Right. Point is inside the circle.';
        } else {
            badge.style.backgroundColor = 'var(--red-light)';
            badge.style.color = '#991b1b';
            dom.predictIcon.className = 'fa-solid fa-greater-than';
            dom.predictResultText.textContent = 'Left > Right. Point is outside the circle.';
        }
    }

    // ---------------------------------------------------------
    // 7. LIVE PROOF GENERATOR
    // ---------------------------------------------------------

    function updateProof() {
        const h = state.center.h;
        const k = state.center.k;
        const r = state.radius;
        const x = state.point.x;
        const y = state.point.y;

        const dx = x - h;
        const dy = y - k;
        const cp = Math.sqrt(dx * dx + dy * dy);
        const cpSq = cp * cp;

        const hStr = h < 0 ? ` - (${h})` : ` - ${h}`;
        const kStr = k < 0 ? ` - (${k})` : ` - ${k}`;

        dom.proofMathDistance.innerHTML = `CP = &radic;((${x}${hStr})&sup2; + (${y}${kStr})&sup2;) = &radic;(${dx.toFixed(2)}&sup2; + ${dy.toFixed(2)}&sup2;) = <strong>${cp.toFixed(2)}</strong>`;

        const onTolerance = Math.max(0.05, 0.005 * Math.max(1, r));
        const relSymbol = Math.abs(cp - r) <= onTolerance ? '=' : (cp < r ? '&lt;' : '&gt;');
        dom.proofMathCompare.innerHTML = `CP = ${cp.toFixed(2)} &nbsp; vs &nbsp; r = ${r.toFixed(2)} &rArr; <strong>CP ${relSymbol} r</strong>`;

        const eqFormatted = `${formatSquaredTerm('x', h)} + ${formatSquaredTerm('y', k)} = ${(r * r).toFixed(2)}`;
        dom.proofMathEquation.innerHTML = `${eqFormatted} &nbsp; (left side = ${cpSq.toFixed(2)})`;

        if (Math.abs(cp - r) <= onTolerance) {
            dom.proofStatusBadge.style.backgroundColor = 'var(--green)';
            dom.proofStatusBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Point on locus';
        } else if (cp < r) {
            dom.proofStatusBadge.style.backgroundColor = 'var(--orange)';
            dom.proofStatusBadge.innerHTML = '<i class="fa-solid fa-circle-arrow-down"></i> Point inside circle';
        } else {
            dom.proofStatusBadge.style.backgroundColor = 'var(--red)';
            dom.proofStatusBadge.innerHTML = '<i class="fa-solid fa-circle-arrow-up"></i> Point outside circle';
        }
    }

    // ---------------------------------------------------------
    // 8. CHALLENGE GENERATOR MODULE
    // ---------------------------------------------------------

    function generateNewChallenge() {
        const types = ["ON", "INSIDE", "OUTSIDE"];
        const type = types[Math.floor(Math.random() * types.length)];
        const h = Math.floor(Math.random() * 10) - 5;
        const k = Math.floor(Math.random() * 10) - 5;
        const r = Math.floor(Math.random() * 5) + 2;

        state.challenge = {
            type: type,
            center: { h: h, k: k },
            radius: r,
            solved: false
        };

        let typeText = "ON";
        if (type === "INSIDE") typeText = "INSIDE";
        if (type === "OUTSIDE") typeText = "OUTSIDE";

        dom.challengePrompt.innerHTML = `Place or enter a point P that lies <strong>${typeText}</strong> the circle with center C(${h}, ${k}) and radius r = ${r}.`;
        dom.challengeX.value = '';
        dom.challengeY.value = '';
        dom.challengeFeedback.style.display = 'none';
    }

    function checkChallenge() {
        const x = parseFloat(dom.challengeX.value);
        const y = parseFloat(dom.challengeY.value);

        if (isNaN(x) || isNaN(y)) {
            dom.challengeFeedback.style.display = 'block';
            dom.challengeFeedback.style.backgroundColor = 'var(--red-light)';
            dom.challengeFeedback.style.color = '#991b1b';
            dom.challengeFeedback.textContent = 'Please enter valid numerical x and y coordinates.';
            return;
        }

        const ch = state.challenge;
        const dist = getDistance(x, y, ch.center.h, ch.center.k);
        const r = ch.radius;
        const tol = 0.05 * r;

        let userClass = "OUTSIDE";
        if (Math.abs(dist - r) < tol) userClass = "ON";
        else if (dist < r) userClass = "INSIDE";

        const feedback = dom.challengeFeedback;
        feedback.style.display = 'block';

        if (userClass === ch.type) {
            feedback.style.backgroundColor = 'var(--green-light)';
            feedback.style.color = '#065f46';
            feedback.innerHTML = `<i class="fa-solid fa-check-circle"></i> Correct! Distance CP = ${dist.toFixed(2)} (r = ${r}).`;
            // Also update sandbox center and point to show this solution on graph!
            state.center.h = ch.center.h;
            state.center.k = ch.center.k;
            state.radius = ch.radius;
            state.point.x = x;
            state.point.y = y;
            render();
        } else {
            feedback.style.backgroundColor = 'var(--red-light)';
            feedback.style.color = '#991b1b';
            feedback.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Not quite. Distance CP = ${dist.toFixed(2)} while radius r = ${r}. That point is ${userClass.toLowerCase()} the circle.`;
        }
    }

    // ---------------------------------------------------------
    // 9. EVENT HANDLERS & BINDINGS
    // ---------------------------------------------------------

    function setupEventListeners() {
        // Sidebar tabs
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const target = button.dataset.tab;
                tabButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
                tabContents.forEach((panel) => {
                    panel.hidden = panel.id !== `tab-${target}`;
                });
            });
        });

        // Inputs change listeners
        dom.inputH.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) { state.center.h = val; render(); }
        });
        dom.inputK.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) { state.center.k = val; render(); }
        });

        // Radius Input & Slider sync
        const updateR = (val) => {
            if (!isNaN(val) && val > 0) {
                state.radius = val;
                if (state.mode === 'locus') snapPToCircle();
                render();
            }
        };

        dom.inputR.addEventListener('input', (e) => updateR(parseFloat(e.target.value)));
        dom.sliderR.addEventListener('input', (e) => updateR(parseFloat(e.target.value)));

        // Test Point inputs
        dom.inputPX.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) { state.point.x = val; render(); }
        });
        dom.inputPY.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) { state.point.y = val; render(); }
        });

        // Predict Inputs
        dom.predictX.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) { state.point.x = val; render(); }
        });
        dom.predictY.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) { state.point.y = val; render(); }
        });

        // Directrix input
        dom.inputDirectrixA.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) { state.directrixA = val; render(); }
        });

        // Mode switch buttons
        dom.modeTestBtn.addEventListener('click', () => {
            state.mode = 'test';
            render();
        });
        dom.modeLocusBtn.addEventListener('click', () => {
            state.mode = 'locus';
            snapPToCircle();
            render();
        });

        // Action Buttons
        function snapPToCircle() {
            const angle = Math.atan2(state.point.y - state.center.k, state.point.x - state.center.h);
            state.point.x = parseFloat((state.center.h + state.radius * Math.cos(angle)).toFixed(2));
            state.point.y = parseFloat((state.center.k + state.radius * Math.sin(angle)).toFixed(2));
        }

        dom.btnSnapP.addEventListener('click', () => {
            snapPToCircle();
            render();
        });

        dom.btnRandomP.addEventListener('click', () => {
            // Random point near circle (range radius +- 2)
            const angle = Math.random() * Math.PI * 2;
            const factor = 0.5 + Math.random() * 1.2;
            state.point.x = parseFloat((state.center.h + state.radius * factor * Math.cos(angle)).toFixed(2));
            state.point.y = parseFloat((state.center.k + state.radius * factor * Math.sin(angle)).toFixed(2));
            render();
        });

        dom.btnPlotCircle.addEventListener('click', () => {
            render();
        });

        dom.btnRandomCircle.addEventListener('click', () => {
            state.center.h = Math.floor(Math.random() * 11) - 5;
            state.center.k = Math.floor(Math.random() * 11) - 5;
            state.radius = parseFloat((1 + Math.random() * 5).toFixed(2));
            if (state.mode === 'locus') snapPToCircle();
            render();
        });

        dom.btnResetView.addEventListener('click', () => {
            state.center = { h: 1, k: -1 };
            state.radius = 4.12;
            initDefaultPoint();
            state.view.zoomLevel = 1.0;
            state.view.originX = 0;
            state.view.originY = 0;
            render();
        });

        dom.btnNewProof.addEventListener('click', () => {
            state.center = { h: 1, k: -1 };
            state.radius = 4.12;
            state.mode = 'test';
            state.showGrid = true;
            state.showDistances = true;
            state.showEquation = true;
            state.showInequality = false;
            state.showDirectrix = false;
            state.directrixA = -5;
            state.view.scale = 35;
            state.view.zoomLevel = 1.0;
            state.view.originX = 0;
            state.view.originY = 0;
            initDefaultPoint();
            render();
        });

        // View Toggles
        dom.chkShowDirectrix.addEventListener('change', (e) => {
            state.showDirectrix = e.target.checked;
            render();
        });
        dom.chkDistances.addEventListener('change', (e) => {
            state.showDistances = e.target.checked;
            render();
        });
        dom.chkEquation.addEventListener('change', (e) => {
            state.showEquation = e.target.checked;
            render();
        });
        dom.chkGrid.addEventListener('change', (e) => {
            state.showGrid = e.target.checked;
            render();
        });
        dom.chkInequalityRegions.addEventListener('change', (e) => {
            state.showInequality = e.target.checked;
            render();
        });

        // Canvas Navigation
        dom.btnPanReset.addEventListener('click', () => {
            state.view.originX = 0;
            state.view.originY = 0;
            state.view.zoomLevel = 1.0;
            render();
        });
        dom.btnZoomIn.addEventListener('click', () => {
            state.view.zoomLevel = Math.min(state.view.zoomLevel * 1.25, 3.0);
            dom.zoomLevelText.textContent = `${Math.round(state.view.zoomLevel * 100)}%`;
            render();
        });
        dom.btnZoomOut.addEventListener('click', () => {
            state.view.zoomLevel = Math.max(state.view.zoomLevel / 1.25, 0.4);
            dom.zoomLevelText.textContent = `${Math.round(state.view.zoomLevel * 100)}%`;
            render();
        });
        dom.btnFitCircle.addEventListener('click', () => {
            // Fit view scale to circle size
            const wrapperRect = dom.canvasWrapper.getBoundingClientRect();
            const minDim = Math.min(wrapperRect.width, wrapperRect.height);
            const targetScale = (minDim * 0.35) / state.radius;
            state.view.scale = targetScale;
            state.view.zoomLevel = 1.0;
            state.view.originX = -state.center.h * targetScale;
            state.view.originY = state.center.k * targetScale;
            dom.zoomLevelText.textContent = `100%`;
            render();
        });

        // Challenge Listeners
        dom.btnNewChallenge.addEventListener('click', generateNewChallenge);
        dom.btnCheckChallenge.addEventListener('click', checkChallenge);

        // ---------------------------------------------------------
        // 10. INTERACTIVE SVG POINTER DRAG / PAN HANDLERS
        // ---------------------------------------------------------
        const canvas = dom.geoCanvas;

        function getClientPoint(e) {
            return { x: e.clientX, y: e.clientY };
        }

        function handlePointerDown(e) {
            if (e.pointerType === 'mouse' && e.button !== 0) return;

            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const { x: clientX, y: clientY } = getClientPoint(e);
            const mouseSvg = { x: clientX - rect.left, y: clientY - rect.top };
            const mouseMath = svgToMath(mouseSvg.x, mouseSvg.y);

            const distToP = getDistance(mouseMath.x, mouseMath.y, state.point.x, state.point.y);
            const distToC = getDistance(mouseMath.x, mouseMath.y, state.center.h, state.center.k);
            const threshold = 20 / (state.view.scale * state.view.zoomLevel);

            isDraggingP = false;
            isDraggingC = false;
            isPanning = false;

            if (distToP < threshold) {
                isDraggingP = true;
            } else if (distToC < threshold) {
                isDraggingC = true;
            } else {
                isPanning = true;
                panStart = { x: clientX, y: clientY };
            }

            canvas.setPointerCapture?.(e.pointerId);
        }

        function handlePointerMove(e) {
            if (!isDraggingP && !isDraggingC && !isPanning) return;

            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const { x: clientX, y: clientY } = getClientPoint(e);
            const mouseSvg = { x: clientX - rect.left, y: clientY - rect.top };
            const mouseMath = svgToMath(mouseSvg.x, mouseSvg.y);

            if (isDraggingP) {
                if (state.mode === 'locus') {
                    const angle = Math.atan2(
                        mouseMath.y - state.center.k,
                        mouseMath.x - state.center.h
                    );
                    state.point.x = parseFloat(
                        (state.center.h + state.radius * Math.cos(angle)).toFixed(2)
                    );
                    state.point.y = parseFloat(
                        (state.center.k + state.radius * Math.sin(angle)).toFixed(2)
                    );
                } else {
                    state.point.x = parseFloat(mouseMath.x.toFixed(2));
                    state.point.y = parseFloat(mouseMath.y.toFixed(2));
                }
                render();
            } else if (isDraggingC) {
                state.center.h = parseFloat(mouseMath.x.toFixed(2));
                state.center.k = parseFloat(mouseMath.y.toFixed(2));
                if (state.mode === 'locus') snapPToCircle();
                render();
            } else if (isPanning) {
                const dx = clientX - panStart.x;
                const dy = clientY - panStart.y;
                state.view.originX += dx;
                state.view.originY += dy;
                panStart = { x: clientX, y: clientY };
                render();
            }
        }

        function handlePointerUp(e) {
            isDraggingP = false;
            isDraggingC = false;
            isPanning = false;
            if (e?.pointerId != null) {
                try { canvas.releasePointerCapture?.(e.pointerId); } catch (_) {}
            }
        }

        canvas.addEventListener('pointerdown', handlePointerDown);
        canvas.addEventListener('pointermove', handlePointerMove);
        canvas.addEventListener('pointerup', handlePointerUp);
        canvas.addEventListener('pointercancel', handlePointerUp);
    }

    // ---------------------------------------------------------
    // 11. INITIALIZATION
    // ---------------------------------------------------------
    function init() {
        initDefaultPoint();
        setupEventListeners();
        generateNewChallenge();
        render();

        // Responsive window resize
        window.addEventListener('resize', () => {
            render();
        });
    }

    // Launch on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
