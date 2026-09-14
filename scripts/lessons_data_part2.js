// lessons_data_part2.js - Lessons 11 to 20

export const LESSONS_PART2 = [
  {
    id: 'lesson-11',
    num: '11',
    title: 'Infinite Geometric Series: Square Tiling',
    subtitle: 'Visualizing ½ + ¼ + ⅛ + ... = 1 and ¼ + 1/16 + ... = ⅓',
    category: 'Calculus & Limits',
    formula: '\\sum_{k=1}^\\infty (½)^k = 1,  \\sum_{k=1}^\\infty (¼)^k = ⅓',
    mission: 'Prove that an infinite sum of shrinking fractions converges to an exact finite value by partitioning a unit square into recursively halved or quartered geometric regions.',
    steps: [
      {
        title: 'The Unit Square Canvas',
        desc: 'Start with a 1 × 1 square of total area 1. We will color fractional portions sequentially.',
        formula: 'Total Area = 1'
      },
      {
        title: 'First Half (k = 1)',
        desc: 'Divide the square vertically and color the left half (area ½). Remaining uncolored area is ½.',
        formula: 'Area = ½'
      },
      {
        title: 'Recursive Subdivision (k = 2, 3, 4)',
        desc: 'Divide the remaining uncolored region in half horizontally (area ¼), then vertically (⅛), then horizontally (1/16).',
        formula: 'Sum = ½ + ¼ + ⅛ + 1/16 + ...'
      },
      {
        title: 'Convergence to the Whole',
        desc: 'As iterations k → ∞, the remaining uncolored sliver shrinks toward zero. The infinite sum fills the entire unit square with zero gap.',
        formula: 'Limit = 1'
      }
    ],
    derivation: [
      { text: 'First term a = ½, common ratio r = ½:', math: 'S = ½ + ¼ + ⅛ + ...' },
      { text: 'Multiply entire series by 2:', math: '2S = 1 + ½ + ¼ + ⅛ + ... = 1 + S' },
      { text: 'Subtract S from both sides:', math: '2S - S = 1 \\implies S = 1' },
      { text: 'For the quarter series ¼ + 1/16 + 1/64 + ...:', math: 'Each step colors 1 of 3 identical symmetric regions' },
      { text: 'Therefore the sum of quarter pieces:', math: '\\sum_{k=1}^\\infty (¼)^k = \\frac{1}{3}  ■' }
    ],
    intuition: 'Zeno’s paradox of Achilles and the tortoise argued that motion is impossible because one must traverse infinite intervals. Geometry disproves this: infinite parts sum to a finite whole.',
    quiz: {
      question: 'What is the sum of the infinite series 1/3 + 1/9 + 1/27 + 1/81 + ...?',
      options: ['1/4', '1/3', '1/2', '1'],
      correct: 2,
      explanation: 'Correct! Using S = a/(1 - r) with a = 1/3 and r = 1/3: S = (1/3) / (1 - 1/3) = (1/3) / (2/3) = 1/2.'
    },
    sliders: [
      { id: 'depth', label: 'Recursion Depth', min: 1, max: 8, val: 5, step: 1 }
    ],
    renderType: 'geometric_series_square'
  },
  {
    id: 'lesson-12',
    num: '12',
    title: 'Pythagorean Theorem: Perigal’s Dissection',
    subtitle: 'Henry Perigal’s puzzle: 5 pieces that tile from b² and a² into c²',
    category: 'Geometry',
    formula: 'a² + b² = c²',
    mission: 'Witness Henry Perigal’s 1873 visual dissection: cutting the square on leg b through its center into 4 congruent quadrilaterals that surround square a² to tile square c² perfectly.',
    steps: [
      {
        title: 'Squares on the Legs (a² and b²)',
        desc: 'Construct a right triangle with square a² on leg a and square b² on leg b.',
        formula: 'Initial Areas: a² and b²'
      },
      {
        title: 'Perigal’s Centroid Cross Cut',
        desc: 'Through the center of square b², draw two orthogonal cuts: one parallel to hypotenuse c and one perpendicular to c. This dissects b² into 4 identical pieces.',
        formula: '4 congruent quadrilaterals'
      },
      {
        title: 'Translational Migration',
        desc: 'Glide the 4 dissected quadrilaterals across the canvas to the hypotenuse square c². They form a border with a square hole of side a in the middle!',
        formula: 'Border formed by 4 pieces'
      },
      {
        title: 'The Keystones Placed',
        desc: 'The un-cut square a² slides directly into the central square hole with zero gap, completing the hypotenuse square c².',
        formula: 'c² = b² + a²'
      }
    ],
    derivation: [
      { text: 'Legs of right triangle:', math: 'a, b' },
      { text: 'The square b² is dissected into 4 congruent pieces:', math: '4 × \\text{Area}_{quad} = b²' },
      { text: 'The pieces leave a square cavity of side length:', math: 'b - 2(b - a)/2 = a' },
      { text: 'The cavity is filled by square a²:', math: 'a²' },
      { text: 'Total tiled square on hypotenuse:', math: 'c² = 4 × \\text{Area}_{quad} + a² = b² + a²  ■' }
    ],
    intuition: 'Henry Perigal was so proud of this elegant dissection proof that he had the diagram engraved onto his gravestone in London upon his death in 1898.',
    quiz: {
      question: 'Why are the cuts through square b² made parallel and perpendicular to the hypotenuse?',
      options: [
        'So the outer edges of the pieces align flush with the edges of the square on the hypotenuse',
        'Because all lines in right triangles are perpendicular',
        'To make the pieces have curved corners',
        'To minimize friction during movement'
      ],
      correct: 0,
      explanation: 'Correct! Aligning the dissection cuts with the hypotenuse ensures the resulting quadrilaterals have edges matching the orientation of the hypotenuse square.'
    },
    sliders: [
      { id: 'sideA', label: 'Leg a', min: 40, max: 80, val: 50, step: 1 },
      { id: 'sideB', label: 'Leg b', min: 60, max: 110, val: 80, step: 1 }
    ],
    renderType: 'perigal_pythagoras'
  },
  {
    id: 'lesson-13',
    num: '13',
    title: 'Volume of a Pyramid: Cube into 3 Pyramids',
    subtitle: 'Decomposing a cube of base B and height h into 3 identical pyramids',
    category: 'Geometry',
    formula: 'V_{pyramid} = ⅓ · Base · Height = ⅓ · B · h',
    mission: 'Prove that the volume of any pyramid is exactly one-third of the enclosing prism by showing that an ordinary cube can be cleaved into 3 congruent square pyramids meeting at a common apex.',
    steps: [
      {
        title: 'The Enclosing Cube',
        desc: 'Consider a solid cube with side length s, base area B = s², and height h = s. Its total volume is s³.',
        formula: 'Volume_{cube} = s³'
      },
      {
        title: 'Choose a Corner Apex',
        desc: 'Select one corner vertex of the cube as the apex. Draw diagonals connecting this apex to the opposite vertices of the cube faces.',
        formula: 'Apex connects to face corners'
      },
      {
        title: 'Cleave into 3 Pyramids',
        desc: 'The cube naturally partitions into 3 congruent pyramids. Each pyramid has one square face of the cube as its base and height equal to s.',
        formula: '3 Pyramids: Base = s², Height = s'
      },
      {
        title: 'Volumetric Equivalence',
        desc: 'Since all 3 pyramids are congruent and together make up the cube: 3 × V_{pyramid} = s³ = B · h, so V_{pyramid} = ⅓ B h.',
        formula: 'V = ⅓ · B · h'
      }
    ],
    derivation: [
      { text: 'Volume of cube:', math: 'V_{cube} = s · s · s = s³' },
      { text: 'Base area of each pyramid:', math: 'B = s²' },
      { text: 'Height of each pyramid:', math: 'h = s' },
      { text: 'Sum of 3 congruent pyramids:', math: '3 · V_{pyramid} = V_{cube} = B · h' },
      { text: 'Dividing by 3:', math: 'V_{pyramid} = ⅓ · B · h  ■' }
    ],
    intuition: 'This is the 3D analog of a diagonal dividing a square into 2 triangles (Area = ½ B h). In d dimensions, a simplex takes 1/d! of the hypercube.',
    quiz: {
      question: 'A square pyramid has base 6 cm × 6 cm and height 10 cm. What is its volume?',
      options: ['60 cm³', '120 cm³', '180 cm³', '360 cm³'],
      correct: 1,
      explanation: 'Correct! V = ⅓ × Base × Height = ⅓ × (6 × 6) × 10 = ⅓ × 36 × 10 = 120 cm³.'
    },
    sliders: [
      { id: 'cubeSize', label: 'Cube Edge (s)', min: 60, max: 120, val: 90, step: 2 },
      { id: 'rotAngle', label: '3D Rotation', min: 0, max: 360, val: 45, step: 5 }
    ],
    renderType: 'cube_three_pyramids'
  },
  {
    id: 'lesson-14',
    num: '14',
    title: 'Surface Area of a Sphere: 4 Great Circles',
    subtitle: 'Archimedes’ cylindrical projection and the 4πr² theorem',
    category: 'Geometry',
    formula: 'Area_{sphere} = 4πr² = 4 × (\\text{Great Circle Area})',
    mission: 'Unravel Archimedes’ most cherished discovery: the surface area of a sphere of radius r equals the lateral area of its circumscribing cylinder (2πr × 2r = 4πr²), exactly 4 great circles.',
    steps: [
      {
        title: 'Sphere & Circumscribing Cylinder',
        desc: 'Enclose a sphere of radius r inside a cylinder of radius r and height 2r.',
        formula: 'Cylinder Height = 2r, Radius = r'
      },
      {
        title: 'Horizontal Lambert Projection',
        desc: 'Project every point on the sphere horizontally outward onto the cylinder wall. Although the sphere slants away, the foreshortening exactly cancels the stretch!',
        formula: 'dA_{sphere} = dA_{cylinder}'
      },
      {
        title: 'Unwrap the Cylinder Wall',
        desc: 'Cut the cylinder wall vertically and unroll it into a flat rectangle of width 2πr and height 2r.',
        formula: 'Area = width × height = 2πr × 2r = 4πr²'
      },
      {
        title: '4 Great Circle Disks',
        desc: 'A great circle has area πr². The unrolled rectangular area 4πr² can be exactly divided into 4 flat circular disks of radius r.',
        formula: 'Surface Area = 4 × πr²'
      }
    ],
    derivation: [
      { text: 'Circumference of cylinder:', math: 'C = 2πr' },
      { text: 'Height of cylinder containing sphere:', math: 'H = 2r' },
      { text: 'Lateral surface area of cylinder:', math: 'A_{cyl} = C × H = 2πr × 2r = 4πr²' },
      { text: 'By Archimedes projection equivalence:', math: 'A_{sphere} = A_{cyl}' },
      { text: 'Expressed in terms of great circle area πr²:', math: 'A_{sphere} = 4πr²  ■' }
    ],
    intuition: 'Archimedes requested that a sphere inscribed inside a cylinder be carved onto his tombstone. This exact equal-area projection is the basis for the Lambert cylindrical cartographic map.',
    quiz: {
      question: 'How many flat circular disks of radius r have total area equal to the surface area of a sphere of radius r?',
      options: ['2', '3', '4', '8'],
      correct: 2,
      explanation: 'Correct! The sphere surface area is 4πr², which equals exactly 4 times the area of one great circle (πr²).'
    },
    sliders: [
      { id: 'sphereR', label: 'Radius r', min: 50, max: 100, val: 75, step: 1 }
    ],
    renderType: 'sphere_surface_four_circles'
  },
  {
    id: 'lesson-15',
    num: '15',
    title: 'Volume of a Sphere: Archimedes’ Balance',
    subtitle: 'Cross-section equivalence: Hemisphere + Cone = Cylinder at every height z',
    category: 'Geometry',
    formula: 'V_{sphere} = \\frac{4}{3}πr³',
    mission: 'Reproduce Archimedes’ mechanical method: by slicing a hemisphere, an inverted cone, and a cylinder at any height z, prove the slice areas balance: A_{hemi} + A_{cone} = A_{cyl}.',
    steps: [
      {
        title: 'The Three Solids',
        desc: 'Place side-by-side: a cylinder (radius r, height r), a hemisphere (radius r), and an inverted cone (radius r, height r).',
        formula: 'All have radius r and height r'
      },
      {
        title: 'Horizontal Slice at Height z',
        desc: 'Pass a horizontal cutting plane at height z above the base (0 ≤ z ≤ r).',
        formula: '0 ≤ z ≤ r'
      },
      {
        title: 'Compare Slice Cross-Sections',
        desc: 'Cylinder slice has area πr². Hemisphere slice has radius √(r² - z²), area π(r² - z²). Cone slice has radius z, area πz².',
        formula: 'π(r² - z²) + πz² = πr²'
      },
      {
        title: 'Integrating to Volumes',
        desc: 'Since A_{hemi} + A_{cone} = A_{cyl} at every height, V_{hemi} + V_{cone} = V_{cyl}. Thus V_{hemi} = πr³ - ⅓πr³ = ⅔πr³. Full sphere = 4/3 πr³.',
        formula: 'V_{sphere} = \\frac{4}{3}πr³'
      }
    ],
    derivation: [
      { text: 'Volume of cylinder (height r, radius r):', math: 'V_{cyl} = πr² · r = πr³' },
      { text: 'Volume of cone (height r, base radius r):', math: 'V_{cone} = ⅓ πr² · r = ⅓ πr³' },
      { text: 'Sum of slice areas at height z:', math: 'A_{hemi}(z) + A_{cone}(z) = π(r² - z²) + πz² = πr² = A_{cyl}(z)' },
      { text: 'By Cavalieri’s principle:', math: 'V_{hemi} = V_{cyl} - V_{cone} = πr³ - ⅓ πr³ = ⅔ πr³' },
      { text: 'Full sphere (two hemispheres):', math: 'V_{sphere} = 2 × ⅔ πr³ = \\frac{4}{3}πr³  ■' }
    ],
    intuition: 'Archimedes used a physical balance scale of imaginary levers to discover this formula before proving it geometrically with exhaustion.',
    quiz: {
      question: 'What is the ratio of the volume of a sphere to the volume of its circumscribing cylinder (height 2r)?',
      options: ['1/2', '2/3', '3/4', '4/5'],
      correct: 1,
      explanation: 'Correct! V_{sphere} = 4/3 πr³ and V_{cyl} = πr²(2r) = 2πr³. The ratio is (4/3) / 2 = 2/3.'
    },
    sliders: [
      { id: 'heightZ', label: 'Slice Height z', min: 0, max: 80, val: 35, step: 1 },
      { id: 'radiusR', label: 'Radius r', min: 50, max: 90, val: 75, step: 1 }
    ],
    renderType: 'sphere_archimedes_balance'
  },
  {
    id: 'lesson-16',
    num: '16',
    title: 'Unit Circle: Tracing Sine & Cosine Waves',
    subtitle: 'From circular rotation to sinusoidal wave propagation in real time',
    category: 'Trigonometry',
    formula: '\\sin²(θ) + \\cos²(θ) = 1',
    mission: 'Connect the geometric coordinates of a point rotating on a unit circle (cos θ, sin θ) with the continuous wave graphs of sine and cosine as angle θ sweeps from 0 to 2π.',
    steps: [
      {
        title: 'The Unit Circle (Radius = 1)',
        desc: 'Draw a circle centered at the origin with radius 1. A vector rotates counter-clockwise by angle θ.',
        formula: '(x, y) = (\\cos θ, \\sin θ)'
      },
      {
        title: 'Vertical Projection: Sine Wave',
        desc: 'Project the y-coordinate horizontally onto an adjacent scrolling axis. As θ sweeps from 0 to 2π, it traces a smooth sine wave.',
        formula: 'y(θ) = \\sin θ'
      },
      {
        title: 'Horizontal Projection: Cosine Wave',
        desc: 'Project the x-coordinate onto a perpendicular axis. The horizontal projection traces the cosine wave, shifted by π/2.',
        formula: 'x(θ) = \\cos θ'
      },
      {
        title: 'Pythagorean Trigonometric Identity',
        desc: 'The triangle inside the circle has legs cos θ and sin θ with hypotenuse 1. By Pythagoras, cos²θ + sin²θ = 1 for every angle.',
        formula: '\\cos²θ + \\sin²θ = 1'
      }
    ],
    derivation: [
      { text: 'Point on circle at angle θ:', math: 'P = (\\cos θ, \\sin θ)' },
      { text: 'Horizontal leg of right triangle:', math: 'x = \\cos θ' },
      { text: 'Vertical leg of right triangle:', math: 'y = \\sin θ' },
      { text: 'Hypotenuse is the unit circle radius:', math: 'r = 1' },
      { text: 'Apply Pythagorean theorem to triangle:', math: 'x² + y² = r² \\implies \\cos²θ + \\sin²θ = 1  ■' }
    ],
    intuition: 'Trigonometry is not just about static triangles—it is the mathematics of periodic motion, rotation, vibrations, and waves that govern audio, light, and quantum mechanics.',
    quiz: {
      question: 'When angle θ = 90° (π/2 radians), what are the values of sin(θ) and cos(θ)?',
      options: [
        'sin = 0, cos = 1',
        'sin = 1, cos = 0',
        'sin = 0.5, cos = 0.5',
        'sin = -1, cos = 0'
      ],
      correct: 1,
      explanation: 'Correct! At the top vertex of the unit circle, the coordinates are (0, 1), so cos(90°) = 0 and sin(90°) = 1.'
    },
    sliders: [
      { id: 'angleTheta', label: 'Angle θ (deg)', min: 0, max: 360, val: 45, step: 1 }
    ],
    renderType: 'unit_circle_sine_cosine'
  },
  {
    id: 'lesson-17',
    num: '17',
    title: 'Derivative of sin(x) is cos(x)',
    subtitle: 'Geometric vector proof via the differential right triangle on the unit circle',
    category: 'Calculus & Limits',
    formula: '\\frac{d}{dx}[\\sin x] = \\cos x',
    mission: 'Visually prove why the derivative of sin(x) is cos(x) by zooming into an infinitesimal arc length dx along the unit circle and analyzing the similar differential right triangle.',
    steps: [
      {
        title: 'Arc Increment dx',
        desc: 'Consider angle x on the unit circle. Increase the angle by an infinitesimal increment dx. The arc length traversed is r · dx = 1 · dx = dx.',
        formula: 'Arc length = dx'
      },
      {
        title: 'The Differential Right Triangle',
        desc: 'Zoom into the arc dx. It acts as the hypotenuse of an infinitesimal right triangle with vertical side d(sin x) and horizontal side d(cos x).',
        formula: 'Hypotenuse = dx, Vertical = d(\\sin x)'
      },
      {
        title: 'Angle Similarity by 90° Rotation',
        desc: 'The tangent to the circle is perpendicular to the radial arm. Rotating by 90° reveals that the upper angle in the differential triangle is equal to x!',
        formula: 'Angle in triangle = x'
      },
      {
        title: 'Ratio Evaluation',
        desc: 'In this microscopic right triangle, cos x = Adjacent / Hypotenuse = d(sin x) / dx. Thus d(sin x) / dx = cos x.',
        formula: '\\frac{d(\\sin x)}{dx} = \\cos x'
      }
    ],
    derivation: [
      { text: 'Arc length on unit circle for angle increment Δx:', math: 'Δs = 1 · Δx = Δx' },
      { text: 'Vertical displacement of point:', math: 'Δy = \\sin(x + Δx) - \\sin x = d(\\sin x)' },
      { text: 'The tangent vector is rotated 90° from radius vector:', math: '\\vec{T} \\perp \\vec{R}' },
      { text: 'By angle preservation in right triangle:', math: '\\cos x = \\frac{\\text{adjacent}}{\\text{hypotenuse}} = \\frac{d(\\sin x)}{dx}' },
      { text: 'Therefore:', math: '\\frac{d}{dx}\\sin x = \\cos x  ■' }
    ],
    intuition: 'Velocity is always perpendicular to position in uniform circular motion. The rate of vertical rise is maximized when moving horizontally (x = 0, cos 0 = 1).',
    quiz: {
      question: 'At x = 0 radians, what is the slope (derivative) of the graph y = sin(x)?',
      options: ['0', '0.5', '1', 'Undefined'],
      correct: 2,
      explanation: 'Correct! The derivative of sin(x) is cos(x). At x = 0, cos(0) = 1, so the slope of sin(x) at the origin is exactly 1.'
    },
    sliders: [
      { id: 'angleX', label: 'Base Angle x', min: 10, max: 80, val: 35, step: 1 },
      { id: 'deltaZoom', label: 'Magnification', min: 1, max: 4, val: 2, step: 0.5 }
    ],
    renderType: 'derivative_sin_cos'
  },
  {
    id: 'lesson-18',
    num: '18',
    title: 'Inscribed Angle Theorem',
    subtitle: 'The angle subtended at the center is twice the angle subtended at the circumference',
    category: 'Geometry',
    formula: '∠AOB = 2 · ∠APB',
    mission: 'Prove that an angle subtended by an arc at the center of a circle is twice the angle subtended by the same arc at any point on the circumference: θ_{center} = 2 · θ_{inscribed}.',
    steps: [
      {
        title: 'Arc AB and Subtended Angles',
        desc: 'Draw a circle with center O and an arc AB. Connect A and B to center O (forming central angle ∠AOB), and to any point P on the circumference (forming inscribed angle ∠APB).',
        formula: 'Angles ∠AOB and ∠APB'
      },
      {
        title: 'Draw the Diameter through P',
        desc: 'Draw a line segment from P through center O to form a diameter. This splits the triangle APB into two smaller triangles: APO and BPO.',
        formula: 'Splits ∠APB into α and β'
      },
      {
        title: 'Isosceles Triangles & Exterior Angles',
        desc: 'OA = OP = OB = radius r, so ΔAPO and ΔBPO are isosceles! Base angles are equal (α and β). The exterior angles at O are 2α and 2β.',
        formula: 'Exterior angle = sum of interior opposite'
      },
      {
        title: 'Doubling Relationship',
        desc: 'Central angle ∠AOB = 2α + 2β = 2(α + β) = 2 · ∠APB. As P moves anywhere along the circumference, ∠APB remains strictly constant!',
        formula: '∠AOB = 2 · ∠APB'
      }
    ],
    derivation: [
      { text: 'In ΔAPO, OA = OP = r (isosceles):', math: '∠OAP = ∠OPA = α' },
      { text: 'Exterior angle of ΔAPO at O:', math: 'θ_1 = α + α = 2α' },
      { text: 'In ΔBPO, OB = OP = r (isosceles):', math: '∠OBP = ∠OPB = β' },
      { text: 'Exterior angle of ΔBPO at O:', math: 'θ_2 = β + β = 2β' },
      { text: 'Total central angle ∠AOB:', math: 'θ_{center} = θ_1 + θ_2 = 2α + 2β = 2(α + β) = 2 · ∠APB  ■' }
    ],
    intuition: 'This theorem explains why you can slide your seat anywhere along the back row of a circular stadium and your viewing angle of the stage remains completely unchanged!',
    quiz: {
      question: 'If the central angle subtended by arc AB is 110°, what is the inscribed angle ∠APB on the circumference?',
      options: ['55°', '110°', '220°', '70°'],
      correct: 0,
      explanation: 'Correct! By the inscribed angle theorem, the inscribed angle is exactly half the central angle: 110° / 2 = 55°.'
    },
    sliders: [
      { id: 'ptP', label: 'Position of P (deg)', min: 40, max: 140, val: 90, step: 1 },
      { id: 'arcSpread', label: 'Arc Spread (deg)', min: 60, max: 160, val: 100, step: 2 }
    ],
    renderType: 'inscribed_angle_theorem'
  },
  {
    id: 'lesson-19',
    num: '19',
    title: 'Thales’ Theorem: Angle in a Semicircle',
    subtitle: 'Why any triangle inscribed in a semicircle with diameter hypotenuse is a right triangle',
    category: 'Geometry',
    formula: '∠ACB = 90°',
    mission: 'Prove Thales of Miletus’ fundamental theorem (c. 600 BCE): if points A, B, C lie on a circle where AB is a diameter, angle ∠ACB is always precisely 90°.',
    steps: [
      {
        title: 'Semicircle with Diameter AB',
        desc: 'Draw a circle with diameter AB passing through center O. Place any point C along the curved circumference.',
        formula: 'AB is diameter, O is midpoint'
      },
      {
        title: 'Connect Center to Point C',
        desc: 'Draw line segment OC. Notice that OA = OB = OC = radius r. This divides ΔABC into two isosceles triangles: ΔAOC and ΔBOC.',
        formula: 'OA = OB = OC = r'
      },
      {
        title: 'Equal Base Angles',
        desc: 'In ΔAOC, angles at A and C are equal (α). In ΔBOC, angles at B and C are equal (β). Thus, the angle at C is α + β.',
        formula: '∠ACB = α + β'
      },
      {
        title: 'Angle Sum in ΔABC',
        desc: 'The sum of all angles in ΔABC is α + (α + β) + β = 2α + 2β = 180°. Dividing by 2 gives α + β = 90°!',
        formula: '2(α + β) = 180° \\implies ∠ACB = 90°'
      }
    ],
    derivation: [
      { text: 'Radii from center to all three vertices:', math: 'OA = OB = OC = r' },
      { text: 'ΔAOC is isosceles with base angles:', math: '∠OAC = ∠OCA = α' },
      { text: 'ΔBOC is isosceles with base angles:', math: '∠OBC = ∠OCB = β' },
      { text: 'Total interior angles of ΔABC:', math: 'α + (α + β) + β = 180°' },
      { text: 'Factor and simplify:', math: '2(α + β) = 180° \\implies α + β = ∠ACB = 90°  ■' }
    ],
    intuition: 'Thales was reportedly so ecstatic upon discovering this proof that he sacrificed an ox in celebration. Carpenters still use this property to check if a corner is truly square.',
    quiz: {
      question: 'If AB is a diameter of 10 cm and AC = 6 cm, what is the length of side BC?',
      options: ['6 cm', '7 cm', '8 cm', '9 cm'],
      correct: 2,
      explanation: 'Correct! By Thales’ theorem, ΔABC is a right triangle with hypotenuse 10. By Pythagoras, BC = √(10² - 6²) = √(100 - 36) = √64 = 8 cm.'
    },
    sliders: [
      { id: 'ptC', label: 'Angle of C on Arc', min: 20, max: 160, val: 65, step: 1 }
    ],
    renderType: 'thales_semicircle'
  },
  {
    id: 'lesson-20',
    num: '20',
    title: 'Golden Ratio & Fibonacci Spiral',
    subtitle: 'From nested Fibonacci squares (1, 1, 2, 3, 5, 8, 13...) to the logarithmic spiral',
    category: 'Number Theory',
    formula: 'φ = \\frac{1 + \\sqrt{5}}{2} \\approx 1.6180339887...',
    mission: 'Witness the emergence of the golden ratio φ by assembling squares whose side lengths follow the Fibonacci sequence and sweeping quarter-circle arcs to generate the golden logarithmic spiral.',
    steps: [
      {
        title: 'Twin Unit Squares (1 and 1)',
        desc: 'Place two 1×1 squares side-by-side to form a 2×1 rectangle.',
        formula: 'F₁ = 1, F₂ = 1'
      },
      {
        title: 'Attach Fibonacci Squares (2, 3, 5, 8...)',
        desc: 'Sequentially attach squares of sides 2, 3, 5, 8, and 13 along the long side of the growing rectangle in counter-clockwise succession.',
        formula: 'F_{n+1} = F_n + F_{n-1}'
      },
      {
        title: 'Draw the Golden Quarter-Arcs',
        desc: 'Inside each square, draw a circular quarter-arc connecting diagonally opposite corners. Each arc flows seamlessly into the next with tangent continuity.',
        formula: 'Continuous smooth spiral'
      },
      {
        title: 'Convergence to φ = 1.618...',
        desc: 'The ratio of consecutive Fibonacci numbers F_{n+1}/F_n rapidly converges to the golden ratio φ = (1 + √5)/2 ≈ 1.618034.',
        formula: '\\lim_{n \\to \\infty} \\frac{F_{n+1}}{F_n} = φ'
      }
    ],
    derivation: [
      { text: 'Recursive Fibonacci definition:', math: 'F_{n} = F_{n-1} + F_{n-2}' },
      { text: 'Divide both sides by F_{n-1}:', math: '\\frac{F_n}{F_{n-1}} = 1 + \\frac{F_{n-2}}{F_{n-1}} = 1 + \\frac{1}{F_{n-1}/F_{n-2}}' },
      { text: 'Let limiting ratio be φ:', math: 'φ = 1 + \\frac{1}{φ}' },
      { text: 'Multiply by φ to form quadratic equation:', math: 'φ² - φ - 1 = 0' },
      { text: 'Positive root via quadratic formula:', math: 'φ = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618034...  ■' }
    ],
    intuition: 'The golden spiral appears throughout nature in nautilus shells, pinecone bracts, sunflower seed heads, and hurricane clouds because it allows optimal non-overlapping dense packing.',
    quiz: {
      question: 'What is the ratio 13 / 8 as a decimal approximation to the golden ratio?',
      options: ['1.5', '1.6', '1.625', '1.667'],
      correct: 2,
      explanation: 'Correct! 13 / 8 = 1.625, which is within 0.4% of the true value of φ ≈ 1.618034.'
    },
    sliders: [
      { id: 'fibSteps', label: 'Fibonacci Squares', min: 3, max: 8, val: 6, step: 1 }
    ],
    renderType: 'fibonacci_golden_spiral'
  }
];
