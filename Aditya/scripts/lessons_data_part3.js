// lessons_data_part3.js - Lessons 21 to 32

export const LESSONS_PART3 = [
  {
    id: 'lesson-21',
    num: '21',
    title: 'Euler’s Polyhedral Formula: V - E + F = 2',
    subtitle: 'Planar graph network reduction and the invariant Euler characteristic',
    category: 'Geometry',
    formula: 'V - E + F = 2',
    mission: 'Prove Leonhard Euler’s 1752 topological invariant for any convex polyhedron: the number of Vertices minus Edges plus Faces strictly equals 2.',
    steps: [
      {
        title: 'Select a Polyhedron (Cube)',
        desc: 'Consider a convex polyhedron such as a cube with V = 8 vertices, E = 12 edges, and F = 6 faces.',
        formula: '8 - 12 + 6 = 2'
      },
      {
        title: 'Project into a 2D Planar Graph',
        desc: 'Remove one face (the top) and flatten the remaining faces onto a 2D plane. The outer boundless region counts as the removed face.',
        formula: 'Planar network retains V, E, F'
      },
      {
        title: 'Remove Cycle Edges',
        desc: 'Remove an edge that bounds two adjacent faces. Both E and F decrease by 1, leaving the quantity V - E + F unchanged!',
        formula: 'Δ(V - E + F) = 0 - (-1) + (-1) = 0'
      },
      {
        title: 'Collapse to a Single Vertex',
        desc: 'Repeat until no cycles remain (a spanning tree). Then remove leaf edges and vertices one by one. Eventually 1 vertex and 1 outer face remain: 1 - 0 + 1 = 2!',
        formula: 'V - E + F = 1 - 0 + 1 = 2'
      }
    ],
    derivation: [
      { text: 'Start with planar connected graph of polyhedron:', math: 'V, E, F' },
      { text: 'Remove edge separating two distinct faces:', math: 'E \\to E - 1, \\; F \\to F - 1' },
      { text: 'Euler sum after cycle removal:', math: 'V - (E - 1) + (F - 1) = V - E + F' },
      { text: 'When no cycles remain, graph is a tree with 1 outer face:', math: 'E = V - 1, \\; F = 1' },
      { text: 'Substitute tree properties:', math: 'V - (V - 1) + 1 = 1 + 1 = 2  ■' }
    ],
    intuition: 'Euler’s formula gave birth to the entire branch of modern algebraic topology. On a torus (donut), the characteristic is 0, on a double torus it is -2!',
    quiz: {
      question: 'A regular dodecahedron has 12 faces and 20 vertices. How many edges must it have?',
      options: ['28', '30', '32', '36'],
      correct: 1,
      explanation: 'Correct! V - E + F = 2 → 20 - E + 12 = 2 → 32 - E = 2 → E = 30 edges.'
    },
    sliders: [
      { id: 'polyType', label: 'Polyhedron', min: 1, max: 3, val: 2, step: 1 }
    ],
    renderType: 'eulers_formula'
  },
  {
    id: 'lesson-22',
    num: '22',
    title: 'Sum of Interior Angles of an n-gon',
    subtitle: 'Triangulation from a single vertex: (n - 2) × 180°',
    category: 'Geometry',
    formula: 'Sum = (n - 2) · 180°',
    mission: 'Prove that the interior angles of any simple n-sided polygon always sum to (n - 2) × 180° by drawing all non-intersecting diagonals radiating from a single vertex.',
    steps: [
      {
        title: 'Convex n-gon Setup',
        desc: 'Take an arbitrary n-sided convex polygon with vertices V₁, V₂, ..., Vₙ.',
        formula: 'n sides, n vertices'
      },
      {
        title: 'Choose Pivot Vertex V₁',
        desc: 'Select vertex V₁ as the hub. Draw straight diagonal chords from V₁ to all non-adjacent vertices (V₃, V₄, ..., Vₙ₋₁).',
        formula: 'Draws (n - 3) diagonals'
      },
      {
        title: 'Partition into (n - 2) Triangles',
        desc: 'These diagonals cleanly divide the polygon into exactly (n - 2) non-overlapping triangles with zero interior space left over.',
        formula: 'Count of triangles = n - 2'
      },
      {
        title: 'Summing All Angles',
        desc: 'Each triangle contributes 180° of interior angle sum. The sum of all angles across all (n - 2) triangles equals the polygon interior sum!',
        formula: 'Total Sum = (n - 2) × 180°'
      }
    ],
    derivation: [
      { text: 'A polygon with n sides has n vertices:', math: 'n' },
      { text: 'From one vertex, non-adjacent vertices to connect to:', math: 'n - 3' },
      { text: 'These (n - 3) diagonals carve the polygon into:', math: '(n - 3) + 1 = n - 2 \\text{ triangles}' },
      { text: 'Every triangle has interior angle sum:', math: '180°' },
      { text: 'Summing all triangles gives the total interior angle sum:', math: 'S_n = (n - 2) × 180°  ■' }
    ],
    intuition: 'Every time you add an extra side to a polygon, you glue on one more triangle, adding exactly 180° to the interior angle budget.',
    quiz: {
      question: 'What is the sum of the interior angles of a regular hexagon (n = 6)?',
      options: ['540°', '720°', '900°', '1080°'],
      correct: 1,
      explanation: 'Correct! Sum = (n - 2) × 180° = (6 - 2) × 180° = 4 × 180° = 720°.'
    },
    sliders: [
      { id: 'sidesN', label: 'Number of Sides (n)', min: 3, max: 10, val: 5, step: 1 }
    ],
    renderType: 'polygon_interior_angles'
  },
  {
    id: 'lesson-23',
    num: '23',
    title: 'Sum of Exterior Angles is Always 360°',
    subtitle: 'Shrinking polygon boundary to a point to form a full circle',
    category: 'Geometry',
    formula: '\\sum \\theta_{ext} = 360° = 2π \\text{ rad}',
    mission: 'Prove that no matter how many sides a convex polygon has, its exterior turn angles always sum to exactly 360° by contracting the polygon towards its center.',
    steps: [
      {
        title: 'Polygon with Extended Edges',
        desc: 'Consider any convex polygon. Extend each side in a consistent direction (counter-clockwise) to expose the exterior turn angle at each vertex.',
        formula: 'Exterior angle θ_i = 180° - interior_i'
      },
      {
        title: 'The Walking Ant Analogy',
        desc: 'Imagine walking along the perimeter. At each corner, you turn through the exterior angle. Returning to your starting point means you have made one full 360° rotation.',
        formula: 'Total rotation = 1 full turn'
      },
      {
        title: 'Contract the Polygon to a Point',
        desc: 'Scale the edges toward the center. The edges shrink to zero length, but their directions and turn angles remain identical.',
        formula: 'Vertices merge into center'
      },
      {
        title: 'Complete 360° Circle Formed',
        desc: 'At the singular point, all exterior angle sectors fit together seamlessly around the center with zero gap, proving the sum is always 360°.',
        formula: '\\sum_{i=1}^n \\theta_i = 360°'
      }
    ],
    derivation: [
      { text: 'At each vertex, interior + exterior angle form a straight line:', math: '\\theta_{int, i} + \\theta_{ext, i} = 180°' },
      { text: 'Summing over all n vertices:', math: '\\sum \\theta_{int} + \\sum \\theta_{ext} = n × 180°' },
      { text: 'Substitute interior sum (n - 2) × 180°:', math: '(n - 2) × 180° + \\sum \\theta_{ext} = n × 180°' },
      { text: 'Expand and cancel n × 180°:', math: 'n × 180° - 360° + \\sum \\theta_{ext} = n × 180°' },
      { text: 'Solving for exterior sum:', math: '\\sum \\theta_{ext} = 360°  ■' }
    ],
    intuition: 'This is Gauss-Bonnet theorem in discrete form: total boundary turning is the topological winding number around the enclosed surface.',
    quiz: {
      question: 'What is the measure of each exterior angle of a regular octagon (n = 8)?',
      options: ['36°', '45°', '60°', '135°'],
      correct: 1,
      explanation: 'Correct! For a regular octagon, all 8 exterior angles are equal, so each is 360° / 8 = 45°.'
    },
    sliders: [
      { id: 'polySides', label: 'Sides (n)', min: 3, max: 9, val: 5, step: 1 }
    ],
    renderType: 'polygon_exterior_angles'
  },
  {
    id: 'lesson-24',
    num: '24',
    title: 'Area of an Ellipse: Affine Stretching',
    subtitle: 'Scaling the unit circle of area π by semi-axes a and b to obtain πab',
    category: 'Geometry',
    formula: 'Area_{ellipse} = π · a · b',
    mission: 'Prove that the area of an ellipse with semi-major axis a and semi-minor axis b is πab by viewing the ellipse as an affine stretch of a unit circle.',
    steps: [
      {
        title: 'Unit Circle of Radius 1',
        desc: 'Start with a unit circle x² + y² ≤ 1 centered at the origin. Its radius is 1 and its area is π · 1² = π.',
        formula: 'Area_{circle} = π'
      },
      {
        title: 'Horizontal Stretch by Factor a',
        desc: 'Stretch the coordinate plane horizontally by scale factor a: x\' = a · x. Every vertical strip of width dx widens by factor a.',
        formula: 'Area becomes a · π'
      },
      {
        title: 'Vertical Stretch by Factor b',
        desc: 'Stretch the plane vertically by scale factor b: y\' = b · y. Every horizontal strip of height dy heightens by factor b.',
        formula: 'Total scale factor = a · b'
      },
      {
        title: 'Resulting Ellipse Area',
        desc: 'The circle transforms into an ellipse with semi-axes a and b. Total area scales directly by the product of the scaling factors: π × a × b.',
        formula: 'Area = π · a · b'
      }
    ],
    derivation: [
      { text: 'Equation of unit circle:', math: 'x² + y² = 1, \\quad \\text{Area} = π' },
      { text: 'Coordinate transformation to ellipse:', math: 'u = x/a, \\; v = y/b \\implies u² + v² = 1' },
      { text: 'Jacobian determinant of the transformation:', math: 'J = \\det \\begin{pmatrix} a & 0 \\\\ 0 & b \\end{pmatrix} = ab' },
      { text: 'Area integral change of variables:', math: 'A = \\iint_{\\text{ellipse}} dx dy = \\iint_{\\text{circle}} ab \\, du dv' },
      { text: 'Evaluating the circle integral:', math: 'A = ab \\iint du dv = ab × π = πab  ■' }
    ],
    intuition: 'Affine transformations preserve area ratios. Just as stretching a square into a rectangle scales its area from s² to a × b, stretching a circle scales its area from πr² to πab.',
    quiz: {
      question: 'An ellipse has semi-major axis a = 5 and semi-minor axis b = 4. What is its area?',
      options: ['9π', '20π ≈ 62.83', '40π', '100π'],
      correct: 1,
      explanation: 'Correct! Area = π × a × b = π × 5 × 4 = 20π ≈ 62.83.'
    },
    sliders: [
      { id: 'semiA', label: 'Semi-Major Axis (a)', min: 50, max: 120, val: 90, step: 1 },
      { id: 'semiB', label: 'Semi-Minor Axis (b)', min: 30, max: 90, val: 55, step: 1 }
    ],
    renderType: 'ellipse_affine_stretch'
  },
  {
    id: 'lesson-25',
    num: '25',
    title: 'Derivative as Tangent Secant Zoom',
    subtitle: 'Local linear approximation: zooming into a smooth curve reveals a straight line',
    category: 'Calculus & Limits',
    formula: 'f\'(x) = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x}',
    mission: 'Visualize the foundational definition of the derivative: as the secant interval Δx shrinks toward 0, the secant line pivots smoothly into the tangent line, and microscopic zoom reveals a straight line.',
    steps: [
      {
        title: 'The Curve and Fixed Point P',
        desc: 'Consider the smooth parabola f(x) = 0.5x². Fix a point P(x₀, y₀) on the curve.',
        formula: 'P = (x₀, f(x₀))'
      },
      {
        title: 'Secant Line to Second Point Q',
        desc: 'Choose a second point Q at distance Δx: Q(x₀ + Δx, f(x₀ + Δx)). Draw the secant line passing through P and Q.',
        formula: '\\text{Slope} = \\frac{\\Delta y}{\\Delta x}'
      },
      {
        title: 'Shrinking the Interval Δx → 0',
        desc: 'Slide point Q along the curve towards P as Δx shrinks. The secant line continuously rotates toward a limiting orientation.',
        formula: '\\Delta x \\to 0'
      },
      {
        title: 'The Tangent Line Limit',
        desc: 'When Δx reaches 0, the secant line becomes the tangent line. Under high magnification, the curve is indistinguishable from this tangent line!',
        formula: 'f\'(x₀) = \\lim_{\\Delta x \\to 0} \\frac{\\Delta y}{\\Delta x}'
      }
    ],
    derivation: [
      { text: 'Parabola function:', math: 'f(x) = x²' },
      { text: 'Difference quotient for secant slope:', math: '\\frac{f(x + \\Delta x) - f(x)}{\\Delta x} = \\frac{(x + \\Delta x)² - x²}{\\Delta x}' },
      { text: 'Expand the numerator:', math: '= \\frac{x² + 2x\\Delta x + (\\Delta x)² - x²}{\\Delta x} = \\frac{2x\\Delta x + (\\Delta x)²}{\\Delta x}' },
      { text: 'Divide through by \\Delta x (for \\Delta x \\neq 0):', math: '= 2x + \\Delta x' },
      { text: 'Take the limit as \\Delta x \\to 0:', math: 'f\'(x) = \\lim_{\\Delta x \\to 0} (2x + \\Delta x) = 2x  ■' }
    ],
    intuition: 'This property—differentiability—is precisely "local linearity": no matter how curved a function is, zoom in enough, and it looks like a straight ruler.',
    quiz: {
      question: 'For the function f(x) = x², what is the slope of the tangent line at x = 3?',
      options: ['3', '6', '9', '12'],
      correct: 1,
      explanation: 'Correct! The derivative of x² is 2x. At x = 3, the slope is 2(3) = 6.'
    },
    sliders: [
      { id: 'posX', label: 'Point x₀', min: -50, max: 50, val: 20, step: 2 },
      { id: 'deltaX', label: 'Secant Width Δx', min: 2, max: 60, val: 30, step: 1 }
    ],
    renderType: 'derivative_secant_zoom'
  },
  {
    id: 'lesson-26',
    num: '26',
    title: 'Fundamental Theorem of Calculus',
    subtitle: 'Connecting area accumulation A(x) with instantaneous rate of change A’(x) = f(x)',
    category: 'Calculus & Limits',
    formula: '\\frac{d}{dx} \\left[ \\int_a^x f(t) dt \\right] = f(x)',
    mission: 'Demystify calculus’ crown jewel: the rate at which accumulated area under a curve grows at x is exactly equal to the height of the curve f(x) at that point.',
    steps: [
      {
        title: 'The Accumulation Function A(x)',
        desc: 'Consider a positive continuous function f(t). Define A(x) as the area under f(t) from t = 0 to t = x.',
        formula: 'A(x) = \\int_0^x f(t) dt'
      },
      {
        title: 'Add a Thin Sliver of Width dx',
        desc: 'Nudge the upper boundary forward from x to x + dx. The accumulated area increases by a thin vertical sliver dA.',
        formula: 'dA = A(x + dx) - A(x)'
      },
      {
        title: 'Approximating the Sliver Rectangle',
        desc: 'The sliver is approximately a rectangle with width dx and height f(x). Its area is dA ≈ f(x) · dx.',
        formula: 'dA \\approx f(x) \\cdot dx'
      },
      {
        title: 'Dividing by dx Yields Height',
        desc: 'Divide both sides by dx: dA/dx ≈ f(x). In the limit as dx → 0, dA/dx becomes the exact derivative A\'(x) = f(x)!',
        formula: 'A\'(x) = f(x)'
      }
    ],
    derivation: [
      { text: 'Accumulated area function:', math: 'A(x) = \\int_a^x f(t) dt' },
      { text: 'Derivative definition applied to A(x):', math: 'A\'(x) = \\lim_{\\Delta x \\to 0} \\frac{A(x + \\Delta x) - A(x)}{\\Delta x}' },
      { text: 'Area of strip between x and x + \\Delta x:', math: 'A(x + \\Delta x) - A(x) = \\int_x^{x + \\Delta x} f(t) dt' },
      { text: 'By Mean Value Theorem for integrals:', math: '= f(c) \\cdot \\Delta x \\quad (x \\le c \\le x + \\Delta x)' },
      { text: 'Taking limit as \\Delta x \\to 0:', math: 'A\'(x) = \\lim_{\\Delta x \\to 0} f(c) = f(x)  ■' }
    ],
    intuition: 'Integration (finding areas) and differentiation (finding slopes) are exact mathematical inverses of one another, discovered independently by Newton and Leibniz.',
    quiz: {
      question: 'If A(x) is the area under f(t) = 3t² from 0 to x, what is A\'(x)?',
      options: ['x³', '3x²', '6x', 't³'],
      correct: 1,
      explanation: 'Correct! By the Fundamental Theorem of Calculus, the derivative of the area accumulation function is simply the integrand function evaluated at x: f(x) = 3x².'
    },
    sliders: [
      { id: 'boundX', label: 'Boundary x', min: 20, max: 140, val: 80, step: 2 },
      { id: 'sliverDx', label: 'Sliver Width dx', min: 3, max: 30, val: 14, step: 1 }
    ],
    renderType: 'fundamental_theorem_calc'
  },
  {
    id: 'lesson-27',
    num: '27',
    title: 'Cavalieri’s Principle: 2D & 3D Stacks',
    subtitle: 'Slicing coins and decks of cards: shear deformation preserves total volume',
    category: 'Geometry',
    formula: 'V_1 = V_2 \\iff A_1(z) = A_2(z) \\; \\forall z',
    mission: 'Experience Bonaventura Cavalieri’s 1635 principle: two solids of equal height have identical volume if every horizontal cross-section at height z has identical area.',
    steps: [
      {
        title: 'Two Identical Stacks of Slices',
        desc: 'Begin with two identical straight stacks of rectangular plates or circular coins of uniform thickness.',
        formula: 'Both stacks: height H, area A'
      },
      {
        title: 'Shear Deformation of Stack 2',
        desc: 'Nudge each layer of the second stack horizontally into a slanted or S-curved column.',
        formula: 'Stack 2 is sheared'
      },
      {
        title: 'Horizontal Cross-Section Invariance',
        desc: 'Pass a horizontal line across both stacks at any elevation z. The cross-sectional width/area of the sheared slice is strictly equal to the upright slice.',
        formula: 'A_{left}(z) = A_{right}(z)'
      },
      {
        title: 'Equal Total Volume',
        desc: 'Because every constituent slice has preserved volume, the total volume of both stacks remains exactly identical regardless of shape!',
        formula: 'Volume_{sheared} = Volume_{upright}'
      }
    ],
    derivation: [
      { text: 'Volume of solid 1 by slicing integral:', math: 'V_1 = \\int_0^H A_1(z) dz' },
      { text: 'Volume of solid 2 by slicing integral:', math: 'V_2 = \\int_0^H A_2(z) dz' },
      { text: 'Cavalieri condition at every height z:', math: 'A_1(z) = A_2(z) \\; \\forall z \\in [0, H]' },
      { text: 'Subtract integrals:', math: 'V_1 - V_2 = \\int_0^H [A_1(z) - A_2(z)] dz = \\int_0^H 0 dz = 0' },
      { text: 'Therefore:', math: 'V_1 = V_2  ■' }
    ],
    intuition: 'Take a fresh deck of 52 playing cards. Whether stacked straight or pushed into a slant, the amount of paper and volume of the deck remains identical.',
    quiz: {
      question: 'A right cylinder and an oblique (tilted) cylinder have the same base area and the same perpendicular height. What is the ratio of their volumes?',
      options: ['1 : 1 (equal)', '1 : cos(θ)', '1 : sin(θ)', '1 : 2'],
      correct: 0,
      explanation: 'Correct! By Cavalieri’s principle, because their cross-sections at every height have the exact same area, their volumes are equal.'
    },
    sliders: [
      { id: 'sliceCount', label: 'Number of Slices', min: 8, max: 30, val: 16, step: 1 },
      { id: 'shearAmount', label: 'Shear Distortion', min: 0, max: 100, val: 50, step: 2 }
    ],
    renderType: 'cavalieri_principle'
  },
  {
    id: 'lesson-28',
    num: '28',
    title: 'Binomial Cube: (a + b)³ Expansion',
    subtitle: 'Disassembling a 3D cube into 8 constituent prisms: a³ + 3a²b + 3ab² + b³',
    category: 'Algebra',
    formula: '(a + b)³ = a³ + 3a²b + 3ab² + b³',
    mission: 'Deconstruct a solid 3D cube of edge length (a + b) into its 8 constituent sub-blocks: 1 large cube (a³), 3 flat plates (a²b), 3 tall pillars (ab²), and 1 small cube (b³).',
    steps: [
      {
        title: 'Solid Cube of Edge (a + b)',
        desc: 'Consider a cube with edge length divided into segments a and b. Total volume is (a + b)³.',
        formula: 'Total Volume = (a + b)³'
      },
      {
        title: '3D Dissection Planes',
        desc: 'Pass three orthogonal cutting planes through the partition marks along the x, y, and z axes. This cuts the cube into 2 × 2 × 2 = 8 sub-blocks.',
        formula: '8 constituent blocks'
      },
      {
        title: 'Explode the 8 Pieces Outward',
        desc: 'Separate the blocks in 3D: one big cube a³ (cyan), three blocks a²b (amber), three blocks ab² (coral), and one corner cube b³ (violet).',
        formula: 'a³ + 3a²b + 3ab² + b³'
      },
      {
        title: 'Binomial Coefficient Combinatorics',
        desc: 'The coefficients 1, 3, 3, 1 match row 3 of Pascal’s Triangle, representing the number of ways to choose combinations of dimensions a and b.',
        formula: '(a + b)³ = a³ + 3a²b + 3ab² + b³'
      }
    ],
    derivation: [
      { text: 'Volume of outer cube:', math: 'V = (a + b)³' },
      { text: 'Multiply (a + b)(a + b)²:', math: '= (a + b)(a² + 2ab + b²)' },
      { text: 'Distribute a:', math: 'a(a² + 2ab + b²) = a³ + 2a²b + ab²' },
      { text: 'Distribute b:', math: 'b(a² + 2ab + b²) = a²b + 2ab² + b³' },
      { text: 'Combine like terms:', math: '(a + b)³ = a³ + 3a²b + 3ab² + b³  ■' }
    ],
    intuition: 'The Maria Montessori binomial cube puzzle teaches toddlers this exact 3D algebraic decomposition through tactile wooden blocks before they ever see an algebraic variable.',
    quiz: {
      question: 'How many distinct pieces make up the 3D dissection of (a + b)³?',
      options: ['4', '6', '8', '12'],
      correct: 2,
      explanation: 'Correct! There are 8 pieces in total: 1 piece of a³, 3 pieces of a²b, 3 pieces of ab², and 1 piece of b³ (1 + 3 + 3 + 1 = 8).'
    },
    sliders: [
      { id: 'edgeA', label: 'Segment a', min: 40, max: 80, val: 60, step: 2 },
      { id: 'edgeB', label: 'Segment b', min: 20, max: 50, val: 30, step: 2 },
      { id: 'explodeDist', label: 'Explosion', min: 0, max: 80, val: 35, step: 2 }
    ],
    renderType: 'binomial_cube'
  },
  {
    id: 'lesson-29',
    num: '29',
    title: 'AM-GM Inequality: Geometric Proof',
    subtitle: 'Arithmetic Mean ≥ Geometric Mean via right triangle altitude in a semicircle',
    category: 'Algebra',
    formula: '\\frac{a + b}{2} \\ge \\sqrt{ab}',
    mission: 'Visually prove that for any positive numbers a and b, their arithmetic mean (a+b)/2 is greater than or equal to their geometric mean √(ab), with equality only when a = b.',
    steps: [
      {
        title: 'Semicircle of Diameter (a + b)',
        desc: 'Draw a semicircle with diameter AB = a + b. The radius of this semicircle is the Arithmetic Mean: R = (a + b)/2.',
        formula: 'Radius = AM = \\frac{a + b}{2}'
      },
      {
        title: 'Erect Vertical Altitude at Split Point',
        desc: 'Divide the diameter into segment a and segment b. At this split point, erect a perpendicular line segment up to the semicircle arc.',
        formula: 'Split point at distance a from A'
      },
      {
        title: 'Altitude Length is Geometric Mean',
        desc: 'By similar right triangles inscribed in a semicircle, the altitude h satisfies h² = a · b, meaning h = √(ab) (the Geometric Mean)!',
        formula: 'h = GM = \\sqrt{ab}'
      },
      {
        title: 'Geometric Comparison: Radius vs Altitude',
        desc: 'A vertical segment inside a semicircle cannot exceed the radius: h ≤ R, meaning √(ab) ≤ (a+b)/2. They are equal only when the split point is at the center (a = b).',
        formula: '\\frac{a + b}{2} \\ge \\sqrt{ab}'
      }
    ],
    derivation: [
      { text: 'Diameter of semicircle:', math: 'D = a + b \\implies \\text{Radius } R = \\frac{a + b}{2}' },
      { text: 'Connect top of altitude to ends of diameter forming right triangle:', math: 'Δ is right-angled by Thales theorem' },
      { text: 'By geometric mean theorem on altitude:', math: '\\frac{h}{a} = \\frac{b}{h} \\implies h² = ab \\implies h = \\sqrt{ab}' },
      { text: 'Maximum height of any point in semicircle of radius R:', math: 'h \\le R' },
      { text: 'Therefore:', math: '\\sqrt{ab} \\le \\frac{a + b}{2}  ■' }
    ],
    intuition: 'The difference between AM and GM is (√a - √b)² / 2 ≥ 0, which is a square of a real number and therefore never negative!',
    quiz: {
      question: 'If a = 4 and b = 16, what are the arithmetic mean and geometric mean?',
      options: [
        'AM = 10, GM = 8',
        'AM = 8, GM = 10',
        'AM = 10, GM = 10',
        'AM = 12, GM = 8'
      ],
      correct: 0,
      explanation: 'Correct! AM = (4 + 16) / 2 = 10. GM = √(4 × 16) = √64 = 8. Notice 10 ≥ 8.'
    },
    sliders: [
      { id: 'valA', label: 'Segment a', min: 20, max: 100, val: 40, step: 2 },
      { id: 'valB', label: 'Segment b', min: 20, max: 100, val: 90, step: 2 }
    ],
    renderType: 'am_gm_inequality'
  },
  {
    id: 'lesson-30',
    num: '30',
    title: 'Law of Cosines: Altitude Dissection',
    subtitle: 'Generalizing Pythagoras to all triangles: c² = a² + b² - 2ab cos(C)',
    category: 'Trigonometry',
    formula: 'c² = a² + b² - 2ab\\cos(C)',
    mission: 'Derive the Law of Cosines for any oblique triangle by dropping a perpendicular altitude and applying the Pythagorean theorem to the two resulting right triangles.',
    steps: [
      {
        title: 'Arbitrary Triangle ABC',
        desc: 'Consider a triangle with sides a, b, c and interior angle C opposite to side c.',
        formula: 'Sides: a, b, c; Angle: C'
      },
      {
        title: 'Drop Altitude h from Vertex A',
        desc: 'Drop a perpendicular altitude from vertex A to base BC. The altitude has height h = b · sin(C).',
        formula: 'h = b \\sin(C)'
      },
      {
        title: 'Partition Base BC',
        desc: 'The altitude divides base a into two segments: adjacent segment d = b · cos(C), and remainder segment (a - b · cos(C)).',
        formula: 'Base split: b \\cos(C) \\text{ and } (a - b\\cos(C))'
      },
      {
        title: 'Apply Pythagoras to Left Triangle',
        desc: 'In the right triangle with hypotenuse c: c² = h² + (a - b cos C)². Expanding and applying sin²C + cos²C = 1 gives c² = a² + b² - 2ab cos(C).',
        formula: 'c² = a² + b² - 2ab\\cos(C)'
      }
    ],
    derivation: [
      { text: 'Height of altitude dropped from A:', math: 'h = b \\sin C' },
      { text: 'Horizontal projection of side b:', math: 'd = b \\cos C' },
      { text: 'Remaining base segment:', math: 'a - d = a - b \\cos C' },
      { text: 'Pythagorean theorem on right triangle containing c:', math: 'c² = h² + (a - b \\cos C)²' },
      { text: 'Substitute h = b \\sin C and expand:', math: 'c² = (b \\sin C)² + a² - 2ab \\cos C + b² \\cos² C' },
      { text: 'Group b²(sin²C + cos²C) = b²:', math: 'c² = a² + b² - 2ab \\cos C  ■' }
    ],
    intuition: 'When C = 90°, cos(90°) = 0, and the formula gracefully collapses into the Pythagorean theorem: c² = a² + b²!',
    quiz: {
      question: 'If triangle sides are a = 5, b = 7, and angle C = 60° (cos 60° = 0.5), what is c²?',
      options: ['25', '39', '74', '109'],
      correct: 1,
      explanation: 'Correct! c² = a² + b² - 2ab cos(C) = 5² + 7² - 2(5)(7)(0.5) = 25 + 49 - 35 = 39.'
    },
    sliders: [
      { id: 'sideA', label: 'Side a', min: 60, max: 130, val: 90, step: 2 },
      { id: 'sideB', label: 'Side b', min: 50, max: 120, val: 75, step: 2 },
      { id: 'angleC', label: 'Angle C (deg)', min: 30, max: 140, val: 65, step: 1 }
    ],
    renderType: 'law_of_cosines'
  },
  {
    id: 'lesson-31',
    num: '31',
    title: 'Parabola Focus & Directrix Reflection',
    subtitle: 'Why satellite dishes and solar concentrators focus parallel rays to a single point',
    category: 'Geometry',
    formula: 'd(P, F) = d(P, L), \\quad \\theta_{inc} = \\theta_{ref}',
    mission: 'Explore the geometric definition and optical reflection property of a parabola: incoming parallel rays parallel to the axis of symmetry reflect off the tangent line directly into focus F.',
    steps: [
      {
        title: 'Focus F and Directrix Line L',
        desc: 'A parabola is the locus of all points P equidistant from a fixed focal point F and a horizontal directrix line L: distance PF = distance PL.',
        formula: '|PF| = |PL|'
      },
      {
        title: 'Incoming Parallel Rays',
        desc: 'Shoot vertical light rays downward parallel to the axis of symmetry toward the parabolic curved mirror.',
        formula: 'Rays parallel to axis'
      },
      {
        title: 'Tangent Reflection Angle Law',
        desc: 'At the contact point P, construct the tangent line. The tangent angle bisects the angle between the vertical ray and segment PF!',
        formula: '\\theta_{incident} = \\theta_{reflected}'
      },
      {
        title: 'Unanimous Convergence at Focus F',
        desc: 'Every reflected ray bounces inward at the exact angle needed to converge at focal point F, regardless of where the ray strikes the mirror!',
        formula: 'All rays meet at focus F'
      }
    ],
    derivation: [
      { text: 'Equation of parabola with vertex at origin:', math: 'y = \\frac{x²}{4f}' },
      { text: 'Coordinates of focus:', math: 'F = (0, f), \\quad \\text{Directrix: } y = -f' },
      { text: 'Slope of tangent line at x:', math: 'm = \\frac{dy}{dx} = \\frac{2x}{4f} = \\frac{x}{2f}' },
      { text: 'Angle of incoming vertical ray with normal:', math: '\\theta_1' },
      { text: 'By angle-bisector theorem and parabola geometry:', math: '\\theta_{reflection} = \\theta_{incidence} \\implies \\text{Ray passes through } F(0, f)  ■' }
    ],
    intuition: 'This geometric property powers satellite communication antennas, car headlights, flashlight reflectors, radio telescopes, and solar furnaces.',
    quiz: {
      question: 'If a parabolic mirror has equation y = x² / 16, what is the distance from the vertex to the focus point F?',
      options: ['2', '4', '8', '16'],
      correct: 1,
      explanation: 'Correct! The standard form is y = x² / (4f). Here 4f = 16, so focal length f = 4.'
    },
    sliders: [
      { id: 'focalF', label: 'Focal Length f', min: 20, max: 70, val: 40, step: 2 },
      { id: 'rayDensity', label: 'Ray Count', min: 5, max: 21, val: 11, step: 2 }
    ],
    renderType: 'parabola_reflection'
  },
  {
    id: 'lesson-32',
    num: '32',
    title: 'Basel Problem: Inverse Square Series',
    subtitle: 'Euler’s 1734 breakthrough: 1 + 1/4 + 1/9 + 1/16 + ... = π² / 6',
    category: 'Number Theory',
    formula: '\\sum_{n=1}^\\infty \\frac{1}{n²} = \\frac{π²}{6} \\approx 1.644934...',
    mission: 'Explore Leonhard Euler’s solution to the century-old Basel Problem: summing the reciprocals of all squared positive integers yields the unexpected appearance of π: π² / 6.',
    steps: [
      {
        title: 'The Square Reciprocal Series',
        desc: 'Consider the infinite series 1/1² + 1/2² + 1/3² + 1/4² + ... = 1 + 0.25 + 0.111... + 0.0625 + ...',
        formula: 'S = \\sum_{n=1}^\\infty \\frac{1}{n²}'
      },
      {
        title: 'Visual Bar Stacks & Convergence',
        desc: 'Stack horizontal bars of height 1/n². The terms shrink quadratically, rapidly approaching a finite horizontal asymptote.',
        formula: 'Terms: 1, 1/4, 1/9, 1/16, 1/25...'
      },
      {
        title: 'The Circle Connection (Lighthouse Proof)',
        desc: '3Blue1Brown’s inverse square lighthouse proof: circles of light rays and inverse trigonometric expansions map circle arcs to inverse square distances.',
        formula: '\\frac{1}{\\sin²(x)} \\text{ poles on a circle}'
      },
      {
        title: 'Euler’s Factorization of sin(x) / x',
        desc: 'Euler factored sin(x)/x into infinite products over roots ±π, ±2π, ±3π... Matching coefficients of x² revealed the sum is precisely π² / 6!',
        formula: '\\sum_{n=1}^\\infty \\frac{1}{n²} = \\frac{π²}{6} \\approx 1.644934'
      }
    ],
    derivation: [
      { text: 'Taylor series expansion of sin(x):', math: '\\sin x = x - \\frac{x³}{3!} + \\frac{x⁵}{5!} - ...' },
      { text: 'Divide by x:', math: '\\frac{\\sin x}{x} = 1 - \\frac{x²}{6} + \\frac{x⁴}{120} - ...' },
      { text: 'Roots of sin(x)/x occur at x = ±π, ±2π, ±3π, ...:', math: '\\text{Roots: } x = \\pm nπ' },
      { text: 'Euler’s infinite product factorization:', math: '\\frac{\\sin x}{x} = \\prod_{n=1}^\\infty \\left(1 - \\frac{x²}{n²π²}\\right)' },
      { text: 'Compare coefficients of x² from both forms:', math: '-\\frac{1}{6} = -\\sum_{n=1}^\\infty \\frac{1}{n²π²} \\implies \\sum_{n=1}^\\infty \\frac{1}{n²} = \\frac{π²}{6}  ■' }
    ],
    intuition: 'Why does π (the ratio of a circle’s circumference to diameter) appear in a pure integer series 1 + 1/4 + 1/9 + ...? Because sine is a wave on a circle, and its roots are integer multiples of π!',
    quiz: {
      question: 'What is the numerical approximation of the sum of the series π² / 6 to two decimal places?',
      options: ['1.41', '1.50', '1.64', '3.14'],
      correct: 2,
      explanation: 'Correct! π² / 6 ≈ (3.14159)² / 6 ≈ 9.8696 / 6 ≈ 1.64493 ≈ 1.64.'
    },
    sliders: [
      { id: 'termCount', label: 'Terms Summed (N)', min: 1, max: 25, val: 10, step: 1 }
    ],
    renderType: 'basel_problem_series'
  }
];
