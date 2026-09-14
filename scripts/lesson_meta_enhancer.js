// lesson_meta_enhancer.js
// Provides lesson-specific stats, prediction questions, formula cards, one-line proof tokens, and challenges

export const LESSON_ENHANCEMENTS = {
  'lesson-01': {
    difficulty: 'BEGINNER',
    time: '8 minutes',
    missionTitle: 'Rearrange the four triangles.',
    missionInstruction: 'Glide and rotate four congruent right triangles inside the (a+b)² frame to uncover a² + b² and c².',
    stats: [
      { label: 'Triangles', val: '4 / 4' },
      { label: 'Frame Area', val: '(a+b)²' },
      { label: 'Uncovered', val: 'a² + b² = c²' }
    ],
    tools: ['Drag ✋', 'Rotate ↻', 'Duplicate ⧉', 'Snap ♧'],
    prediction: {
      question: 'What happens to the uncovered area when triangles are rearranged?',
      options: [
        'It changes because triangles change position',
        'It remains strictly identical because both frame and triangles are conserved',
        'It shrinks due to the rotation angle'
      ],
      correct: 1,
      explanation: 'Since the outer frame and the 4 triangles have fixed areas, subtracting them always leaves equal uncovered space!'
    },
    formulaLines: [
      'Config A Uncovered = a² + b²',
      'Config B Uncovered = c²',
      '∴ a² + b² = c²'
    ],
    formulaSuccess: '✓ Conserved area in both configurations.',
    oneLineProof: ['a²', '+', 'b²', '=', '(a+b)²', '−', '2ab', '=', 'c²'],
    challenge: {
      desc: 'Set Leg a = 50 and Leg b = 50 (isosceles right triangle) and verify that c² = 2a².',
      preset: { sideA: 50, sideB: 50 }
    }
  },

  'lesson-02': {
    difficulty: 'BEGINNER',
    time: '8 minutes',
    missionTitle: 'Unroll the circle.',
    missionInstruction: 'Peel the concentric rings of the disk from outer to inner and lay them horizontally to form a right triangle.',
    stats: [
      { label: 'Pieces', val: '18 / 18' },
      { label: 'Area', val: 'πr²' },
      { label: 'Snaps', val: '18 / 18' }
    ],
    tools: ['Drag ✋', 'Unroll ↻', 'Duplicate ⧉', 'Snap ♧'],
    prediction: {
      question: 'What will happen to the area when the rings are unrolled flat?',
      options: [
        'It decreases because curved rings are flattened',
        'It stays strictly invariant (conserved area)',
        'It doubles because of the 2π multiplier'
      ],
      correct: 1,
      explanation: 'Each concentric ring retains its exact length and thickness, so total area is perfectly preserved!'
    },
    formulaLines: [
      'Area = ½ × Base × Height',
      '     = ½ × (2πr) × r',
      '     = πr²'
    ],
    formulaSuccess: '✓ Equal area to the circle.',
    oneLineProof: ['Triangle Area', '=', '½', '×', 'Base (2πr)', '×', 'Height (r)', '=', 'πr²'],
    challenge: {
      desc: 'Increase the ring count to 32 to see the hypotenuse become an ultra-smooth straight line.',
      preset: { rings: 32, radius: 90 }
    }
  },

  'lesson-03': {
    difficulty: 'BEGINNER',
    time: '8 minutes',
    missionTitle: 'Interlock circular sectors.',
    missionInstruction: 'Divide the disk into alternating sectors and interleave them head-to-tail into an alternating parallelogram.',
    stats: [
      { label: 'Sectors', val: '16 / 16' },
      { label: 'Base', val: 'πr' },
      { label: 'Height', val: 'r' }
    ],
    tools: ['Drag ✋', 'Rotate ↻', 'Interlock ⧉', 'Snap ♧'],
    prediction: {
      question: 'As the number of sectors n approaches infinity, what geometric shape does the figure become?',
      options: [
        'An exact rectangle of dimensions πr × r',
        'A triangle with base 2πr',
        'A trapezoid with curved sides'
      ],
      correct: 0,
      explanation: 'As n → ∞, the sector arcs flatten into straight segments perpendicular to the radial height r, forming an exact rectangle!'
    },
    formulaLines: [
      'Area = Base × Height',
      '     = (πr) × r',
      '     = πr²'
    ],
    formulaSuccess: '✓ Equal area to the circular disk.',
    oneLineProof: ['Parallelogram', '=', 'Base (πr)', '×', 'Height (r)', '=', 'πr²'],
    challenge: {
      desc: 'Set sectors to 32 to watch the side scalloping almost completely vanish.',
      preset: { sectors: 32, radius: 90 }
    }
  },

  'lesson-04': {
    difficulty: 'BEGINNER',
    time: '6 minutes',
    missionTitle: 'Tear and fold the three angles.',
    missionInstruction: 'Fold or tear the three corner angles α, β, and γ of any triangle and place them along a straight line.',
    stats: [
      { label: 'Angles', val: '3 / 3' },
      { label: 'Sum', val: '180°' },
      { label: 'Radians', val: 'π rad' }
    ],
    tools: ['Drag ✋', 'Rotate ↻', 'Fold ✂', 'Snap ♧'],
    prediction: {
      question: 'Will the three angles always form a straight line regardless of the triangle shape?',
      options: [
        'Yes, for every flat Euclidean triangle',
        'Only for acute triangles',
        'Only when two sides are equal'
      ],
      correct: 0,
      explanation: 'By Euclid’s parallel postulate, alternate interior angles between parallel lines guarantee α + β + γ = 180° unconditionally.'
    },
    formulaLines: [
      'Angle A + Angle B + Angle C = 180°',
      'Straight Line = π radians',
      '∴ α + β + γ = 180°'
    ],
    formulaSuccess: '✓ Exactly forms a 180° straight angle.',
    oneLineProof: ['α', '+', 'β', '+', 'γ', '=', 'Straight Angle', '=', '180°'],
    challenge: {
      desc: 'Drag the apex vertex far to the right to create an extreme obtuse triangle and verify the sum remains 180°.',
      preset: { topX: 260, topY: 40 }
    }
  },

  'lesson-05': {
    difficulty: 'BEGINNER',
    time: '6 minutes',
    missionTitle: 'Duplicate and rotate the trapezoid.',
    missionInstruction: 'Create an exact duplicate of the trapezoid, rotate it 180°, and join the slanted sides into a parallelogram.',
    stats: [
      { label: 'Copies', val: '2 / 2' },
      { label: 'Base', val: 'a + b' },
      { label: 'Area', val: '½(a+b)h' }
    ],
    tools: ['Duplicate ⧉', 'Rotate ↻', 'Snap ♧', 'Measure 📏'],
    prediction: {
      question: 'What is the base length of the combined double-trapezoid parallelogram?',
      options: [
        'Top base a plus bottom base b (a + b)',
        'The average of the bases (a + b)/2',
        'The height h squared'
      ],
      correct: 0,
      explanation: 'Rotating the second trapezoid flips base a adjacent to base b, yielding a total continuous base of a + b.'
    },
    formulaLines: [
      'Double Area = (Base a + Base b) × Height',
      'Trapezoid Area = ½ × Double Area',
      '= ½(a + b)h'
    ],
    formulaSuccess: '✓ Exactly half the enclosing parallelogram.',
    oneLineProof: ['Trapezoid Area', '=', '½', '×', '(Base₁ + Base₂)', '×', 'Height'],
    challenge: {
      desc: 'Set Top Base = 40 and Bottom Base = 120 with Height = 70 to test a wide trapezoid.',
      preset: { topBase: 40, botBase: 120, height: 70 }
    }
  },

  'lesson-06': {
    difficulty: 'INTERMEDIATE',
    time: '8 minutes',
    missionTitle: 'Shear the triangle horizontally.',
    missionInstruction: 'Slide the apex horizontally along a line parallel to the base and observe the cross-sectional slice invariance.',
    stats: [
      { label: 'Base', val: 'Constant' },
      { label: 'Height', val: 'Constant' },
      { label: 'Area', val: '½ · b · h' }
    ],
    tools: ['Shear ◇', 'Drag ✋', 'Slice ✂', 'Snap ♧'],
    prediction: {
      question: 'Does shearing the top vertex change the enclosed triangle area?',
      options: [
        'No, area is strictly invariant because base and height remain unchanged',
        'Yes, it increases as the hypotenuse gets longer',
        'Yes, it decreases due to the skew tilt'
      ],
      correct: 0,
      explanation: 'By Cavalieri’s principle, every horizontal slice maintains the exact same width, so total area is identical!'
    },
    formulaLines: [
      'Base b = constant',
      'Perpendicular Height h = constant',
      'Area = ½ · b · h (Invariant)'
    ],
    formulaSuccess: '✓ Area is strictly conserved during all shearing.',
    oneLineProof: ['Area', '=', '½', '×', 'Base', '×', 'Height', '=', 'Invariant'],
    challenge: {
      desc: 'Slide the shear slider to the maximum value of 140 and verify area stays constant.',
      preset: { shear: 140, base: 120, height: 80 }
    }
  },

  'lesson-07': {
    difficulty: 'BEGINNER',
    time: '7 minutes',
    missionTitle: 'Assemble L-shaped gnomons.',
    missionInstruction: 'Nest successive odd numbers of unit tiles (1, 3, 5, 7, ...) as L-shaped borders to build an n × n square.',
    stats: [
      { label: 'Gnomons', val: 'n / n' },
      { label: 'Terms', val: '1 + 3 + ...' },
      { label: 'Total Area', val: 'n²' }
    ],
    tools: ['Snap ♧', 'Group □', 'Count 🔢', 'Drag ✋'],
    prediction: {
      question: 'What is the sum of the first n odd positive integers?',
      options: [
        'n²',
        'n(n + 1)/2',
        '2n - 1'
      ],
      correct: 0,
      explanation: 'Adding the k-th odd number (2k - 1) wraps around a (k-1)² square to complete a k² square. Hence the sum is always n².'
    },
    formulaLines: [
      '1 + 3 + 5 + ... + (2n - 1)',
      '= \\sum_{k=1}^n (2k - 1)',
      '= n²'
    ],
    formulaSuccess: '✓ Perfectly tiles an n × n square.',
    oneLineProof: ['1 + 3 + 5 + ... + (2n − 1)', '=', 'n²'],
    challenge: {
      desc: 'Set n = 8 to visually confirm that 1 + 3 + 5 + 7 + 9 + 11 + 13 + 15 = 64 = 8².',
      preset: { nValue: 8 }
    }
  },

  'lesson-08': {
    difficulty: 'BEGINNER',
    time: '7 minutes',
    missionTitle: 'Stack triangular stairs.',
    missionInstruction: 'Pair two identical staircases of 1 + 2 + ... + n blocks to form an n × (n + 1) rectangle.',
    stats: [
      { label: 'Staircases', val: '2 / 2' },
      { label: 'Grid', val: 'n × (n+1)' },
      { label: 'Formula', val: 'n(n+1)/2' }
    ],
    tools: ['Duplicate ⧉', 'Rotate ↻', 'Snap ♧', 'Fit ⧉'],
    prediction: {
      question: 'What are the dimensions of the rectangle formed by interlocking two identical staircases?',
      options: [
        'n × (n + 1)',
        'n × n',
        '(n + 1) × (n + 1)'
      ],
      correct: 0,
      explanation: 'One staircase has steps 1 to n; rotating and interleaving the other creates rows that each sum to n + 1.'
    },
    formulaLines: [
      'Double Sum = n × (n + 1)',
      '1 + 2 + ... + n = ½ × (Double Sum)',
      '= \\frac{n(n + 1)}{2}'
    ],
    formulaSuccess: '✓ Exactly half of the n × (n+1) rectangle.',
    oneLineProof: ['1 + 2 + 3 + ... + n', '=', '½', '×', 'n', '×', '(n + 1)'],
    challenge: {
      desc: 'Set n = 10 to see that the double rectangle has 10 × 11 = 110 blocks, meaning the sum is 55.',
      preset: { nStairs: 10 }
    }
  },

  'lesson-09': {
    difficulty: 'BEGINNER',
    time: '6 minutes',
    missionTitle: 'Partition the binomial square.',
    missionInstruction: 'Divide a square of side (a + b) into four sub-regions: a², b², and two ab rectangles.',
    stats: [
      { label: 'Sub-regions', val: '4 / 4' },
      { label: 'Total Side', val: 'a + b' },
      { label: 'Identity', val: 'a² + 2ab + b²' }
    ],
    tools: ['Slice ✂', 'Color 🎨', 'Measure 📏', 'Snap ♧'],
    prediction: {
      question: 'Why does (a + b)² have the middle term 2ab instead of just a² + b²?',
      options: [
        'Because the square partitions into two squares (a², b²) and two identical rectangles (ab)',
        'Because multiplication always doubles the terms',
        'It is an algebraic coincidence with no geometric meaning'
      ],
      correct: 0,
      explanation: 'Dividing the horizontal and vertical sides of length a+b into segments a and b creates two ab corner rectangles!'
    },
    formulaLines: [
      '(a + b)² = Area(Square a) + Area(Square b) + 2·Area(Rect)',
      '= a² + ab + ab + b²',
      '= a² + 2ab + b²'
    ],
    formulaSuccess: '✓ All four quadrants sum to (a+b)²',
    oneLineProof: ['(a + b)²', '=', 'a²', '+', '2ab', '+', 'b²'],
    challenge: {
      desc: 'Set a = 70 and b = 30 to visually evaluate 100² = 70² + 2(70)(30) + 30² = 10,000.',
      preset: { paramA: 70, paramB: 30 }
    }
  },

  'lesson-10': {
    difficulty: 'BEGINNER',
    time: '6 minutes',
    missionTitle: 'Slice and glide the difference of squares.',
    missionInstruction: 'Cut out a small square b² from large square a², slice the remaining L-shape, and glide the piece into an (a-b)×(a+b) rectangle.',
    stats: [
      { label: 'Cutout', val: 'b²' },
      { label: 'New Width', val: 'a + b' },
      { label: 'New Height', val: 'a - b' }
    ],
    tools: ['Cut ✂', 'Glide ✋', 'Rotate ↻', 'Snap ♧'],
    prediction: {
      question: 'What are the dimensions of the rectangle created by rearranging the L-shape of a² - b²?',
      options: [
        '(a + b) by (a - b)',
        'a by (a - 2b)',
        '(a + b) by b'
      ],
      correct: 0,
      explanation: 'The sliced rectangular strip has height (a - b) and base b, which attaches to the main (a - b) × a rectangle to make base a + b.'
    },
    formulaLines: [
      'Remaining Area = a² - b²',
      'Reassembled Base = a + b,  Height = a - b',
      '∴ a² - b² = (a + b)(a - b)'
    ],
    formulaSuccess: '✓ Equal area between L-shape and rectangle.',
    oneLineProof: ['a² − b²', '=', '(a + b)', '×', '(a − b)'],
    challenge: {
      desc: 'Set a = 90 and b = 35 to test a large difference of squares.',
      preset: { sideA: 90, sideB: 35 }
    }
  },

  'lesson-11': {
    difficulty: 'INTERMEDIATE',
    time: '9 minutes',
    missionTitle: 'Subdivide the unit square.',
    missionInstruction: 'Recursively partition remaining uncolored fractions of a unit square: ½, ¼, ⅛, 1/16...',
    stats: [
      { label: 'Depth', val: '5 / 8' },
      { label: 'Sum', val: '→ 1.00' },
      { label: 'Gap', val: '→ 0' }
    ],
    tools: ['Subdivide ✂', 'Zoom 🔍', 'Color 🎨', 'Snap ♧'],
    prediction: {
      question: 'Does the infinite series ½ + ¼ + ⅛ + 1/16 + ... ever exceed 1?',
      options: [
        'No, it approaches 1 from below and converges to exactly 1 in the limit',
        'Yes, after infinite steps it exceeds 1',
        'It oscillates without converging'
      ],
      correct: 0,
      explanation: 'Every step consumes half of whatever empty space remains, filling the 1 × 1 square with zero leftover space.'
    },
    formulaLines: [
      'S = ½ + ¼ + ⅛ + 1/16 + ...',
      '2S = 1 + ½ + ¼ + ⅛ + ... = 1 + S',
      '∴ S = 1'
    ],
    formulaSuccess: '✓ Fills the unit square with zero residual gap.',
    oneLineProof: ['½', '+', '¼', '+', '⅛', '+', '...', '=', '1'],
    challenge: {
      desc: 'Increase the recursion depth slider to 8 to see the microscopic 1/256 corner sliver.',
      preset: { depth: 8 }
    }
  },

  'lesson-12': {
    difficulty: 'INTERMEDIATE',
    time: '9 minutes',
    missionTitle: 'Dissect Henry Perigal’s five tiles.',
    missionInstruction: 'Cut square b² through its center into 4 congruent quadrilaterals that surround square a² to tile square c².',
    stats: [
      { label: 'Pieces', val: '5 / 5' },
      { label: 'Legs', val: 'a, b' },
      { label: 'Hypotenuse', val: 'c²' }
    ],
    tools: ['Dissect ✂', 'Rotate ↻', 'Drag ✋', 'Snap ♧'],
    prediction: {
      question: 'How many total pieces are used in Perigal’s symmetric dissection?',
      options: [
        '5 pieces (4 congruent quadrilaterals + 1 central square)',
        '4 triangles',
        '7 polygons'
      ],
      correct: 0,
      explanation: 'Perigal cut the larger leg square into 4 identical quadrilaterals by lines parallel and perpendicular to the hypotenuse.'
    },
    formulaLines: [
      'Square b² = 4 congruent quadrilaterals',
      'Combined with Square a² at center',
      '= Square on Hypotenuse c²'
    ],
    formulaSuccess: '✓ Perfect 5-piece tiling of square c².',
    oneLineProof: ['Square(b²)', 'dissected into 4', '+', 'Square(a²)', '=', 'Square(c²)'],
    challenge: {
      desc: 'Set Leg a = 50 and Leg b = 75 to verify Perigal’s dissection works for non-equal legs.',
      preset: { sideA: 50, sideB: 75 }
    }
  },

  'lesson-13': {
    difficulty: 'INTERMEDIATE',
    time: '9 minutes',
    missionTitle: 'Decompose a cube into 3 pyramids.',
    missionInstruction: 'Decompose a cube of side s into 3 congruent oblique square pyramids of height s and base s².',
    stats: [
      { label: 'Pyramids', val: '3 / 3' },
      { label: 'Cube Volume', val: 's³' },
      { label: 'Pyramid Vol', val: '⅓ s³' }
    ],
    tools: ['Explode ⧉', 'Rotate ↻', 'Highlight 🎨', 'Snap ♧'],
    prediction: {
      question: 'Why is the volume of any pyramid equal to ⅓ × Base × Height?',
      options: [
        'Because exactly 3 congruent pyramids assemble to form a solid cube',
        'Because 3 is the dimension of space',
        'It is an empirical approximation'
      ],
      correct: 0,
      explanation: 'Three identical oblique pyramids sharing the main space diagonal of the cube partition its volume s³ completely.'
    },
    formulaLines: [
      'Volume(Cube) = s × s × s = s³',
      '3 × Volume(Pyramid) = Volume(Cube)',
      '∴ Volume(Pyramid) = ⅓ × Base × Height'
    ],
    formulaSuccess: '✓ 3 congruent pyramids equal 1 cube volume.',
    oneLineProof: ['Volume(Pyramid)', '=', '⅓', '×', 'Base Area', '×', 'Height'],
    challenge: {
      desc: 'Rotate the 3D isometric view angle to 60° to inspect the shared inner diagonal seam.',
      preset: { rotAngle: 60, cubeSize: 90 }
    }
  },

  'lesson-14': {
    difficulty: 'INTERMEDIATE',
    time: '8 minutes',
    missionTitle: 'Peel the sphere into 4 great circles.',
    missionInstruction: 'Project the surface area of a sphere of radius r onto a cylinder of equal height and unroll into 4 great circles.',
    stats: [
      { label: 'Great Circles', val: '4' },
      { label: 'One Circle Area', val: 'πr²' },
      { label: 'Sphere Area', val: '4πr²' }
    ],
    tools: ['Project ⧉', 'Unroll ↻', 'Slice ✂', 'Snap ♧'],
    prediction: {
      question: 'How many flat great-circle disks of radius r have the same combined area as the sphere surface?',
      options: [
        'Exactly 4 disks (Area = 4πr²)',
        '3 disks',
        '2π disks'
      ],
      correct: 0,
      explanation: 'Archimedes discovered that the cylinder circumscribed around the sphere has lateral area 2πr · 2r = 4πr², identical to the sphere!'
    },
    formulaLines: [
      'Enclosing Cylinder Lateral Area = 2πr × 2r = 4πr²',
      'Sphere Area = Cylinder Lateral Area',
      '= 4 × (πr²) = 4πr²'
    ],
    formulaSuccess: '✓ Exactly equals four great circles.',
    oneLineProof: ['Sphere Surface Area', '=', '4', '×', 'πr²'],
    challenge: {
      desc: 'Set radius to 95 to verify the 4 great circles expand in proportion to r².',
      preset: { sphereR: 95 }
    }
  },

  'lesson-15': {
    difficulty: 'ADVANCED',
    time: '10 minutes',
    missionTitle: 'Balance the sphere, cone, and cylinder.',
    missionInstruction: 'Use Archimedes’ mechanical lever principle: cross-sections of sphere + cone balance cross-sections of a cylinder.',
    stats: [
      { label: 'Shapes', val: '3' },
      { label: 'Lever Arm', val: 'Balanced' },
      { label: 'Volume', val: '4/3 πr³' }
    ],
    tools: ['Slice ✂', 'Weigh ⚖', 'Align 📏', 'Snap ♧'],
    prediction: {
      question: 'At every horizontal slice at height z, what balances the cylinder cross-section?',
      options: [
        'The sum of the sphere slice area and the cone slice area',
        'The sphere slice area alone',
        'Two cone slices'
      ],
      correct: 0,
      explanation: 'By Pythagoras: r² = (r² - z²) + z², so Area(Cylinder slice) = Area(Sphere slice) + Area(Cone slice) everywhere!'
    },
    formulaLines: [
      'Slice Invariant: πr² = π(r² - z²) + πz²',
      'Vol(Sphere) + Vol(Cone) = Vol(Cylinder)',
      'Vol(Sphere) = 2πr³ - ⅔πr³ = \\frac{4}{3}πr³'
    ],
    formulaSuccess: '✓ Perfect hydrostatic equilibrium.',
    oneLineProof: ['Volume(Sphere)', '=', 'Volume(Cylinder)', '−', 'Volume(Cone)', '=', '\\frac{4}{3}πr³'],
    challenge: {
      desc: 'Move the height slice slider z to 40 to see cross-section balance verified at that plane.',
      preset: { heightZ: 40, radiusR: 85 }
    }
  },

  'lesson-16': {
    difficulty: 'BEGINNER',
    time: '8 minutes',
    missionTitle: 'Trace sine and cosine on the unit circle.',
    missionInstruction: 'Rotate a vector of length 1 around the origin and project its vertical leg into sin(θ) and horizontal leg into cos(θ).',
    stats: [
      { label: 'Radius', val: '1.00' },
      { label: 'cos θ', val: 'Horizontal' },
      { label: 'sin θ', val: 'Vertical' }
    ],
    tools: ['Rotate ↻', 'Project 📏', 'Trace 🎨', 'Snap ♧'],
    prediction: {
      question: 'What is always the sum of squares of the vertical and horizontal projections: sin²(θ) + cos²(θ)?',
      options: [
        'Always exactly 1',
        'Depends on the angle θ',
        'Between 0 and 2'
      ],
      correct: 0,
      explanation: 'Because the vector forms a right triangle with legs cos(θ) and sin(θ) and hypotenuse 1, Pythagoras gives cos²θ + sin²θ = 1.'
    },
    formulaLines: [
      'x-coordinate = cos(θ)',
      'y-coordinate = sin(θ)',
      'cos²(θ) + sin²(θ) = 1'
    ],
    formulaSuccess: '✓ Traces continuous trigonometric waves.',
    oneLineProof: ['sin²(θ)', '+', 'cos²(θ)', '=', 'Hypotenuse²', '=', '1'],
    challenge: {
      desc: 'Set angle to 90° and observe sin(90°) = 1 while cos(90°) = 0.',
      preset: { angleTheta: 90 }
    }
  },

  'lesson-17': {
    difficulty: 'ADVANCED',
    time: '10 minutes',
    missionTitle: 'Zoom in on secant to tangent slope.',
    missionInstruction: 'Examine the differential triangle of a unit circle arc: as Δθ → 0, hypotenuse Δθ and vertical change Δ(sin θ) form cos θ.',
    stats: [
      { label: 'd(sin θ)', val: 'cos θ dθ' },
      { label: 'Ratio', val: 'cos θ' },
      { label: 'Limit Δθ', val: '→ 0' }
    ],
    tools: ['Zoom 🔍', 'Tangent 📏', 'Slice ✂', 'Snap ♧'],
    prediction: {
      question: 'Why is the derivative of sin(θ) equal to cos(θ)?',
      options: [
        'Because the infinitesimal arc triangle is similar to the coordinate triangle, rotated 90°',
        'Because differentiation swaps functions randomly',
        'Because sine and cosine have the same period'
      ],
      correct: 0,
      explanation: 'The tangent to the unit circle is perpendicular to the radius; rotating the triangle by 90° swaps horizontal and vertical components.'
    },
    formulaLines: [
      'Δy / Δθ ≈ cos(θ)',
      '\\lim_{Δθ \\to 0} \\frac{\\sin(θ + Δθ) - \\sin θ}{Δθ}',
      '= \\cos(θ)'
    ],
    formulaSuccess: '✓ Instantaneous rate of change equals cos(θ).',
    oneLineProof: ['\\frac{d}{dθ}', '[\\sin(θ)]', '=', '\\cos(θ)'],
    challenge: {
      desc: 'Set zoom to maximum (5x) to observe the microscopic secant chord align with the cosine projection.',
      preset: { deltaZoom: 5, angleX: 45 }
    }
  },

  'lesson-18': {
    difficulty: 'INTERMEDIATE',
    time: '8 minutes',
    missionTitle: 'Rotate the inscribed angle chord.',
    missionInstruction: 'Move point P around the circle circumference to prove inscribed angle θ is always half central angle 2θ subtending the same arc.',
    stats: [
      { label: 'Central Angle', val: '2θ' },
      { label: 'Inscribed Angle', val: 'θ' },
      { label: 'Ratio', val: '1 : 2' }
    ],
    tools: ['Drag Point ✋', 'Measure 📏', 'Rotate ↻', 'Snap ♧'],
    prediction: {
      question: 'Does the inscribed angle θ change when vertex P moves along the major arc without crossing the endpoints?',
      options: [
        'No, it remains strictly constant at exactly half the central angle',
        'Yes, it changes as P moves closer to one endpoint',
        'It doubles when P reaches the top'
      ],
      correct: 0,
      explanation: 'Two isosceles triangles inside the circle with radial legs ensure exterior angles sum to 2θ regardless of P’s location.'
    },
    formulaLines: [
      'Central Angle = 2θ',
      'Inscribed Angle = ½ × (Central Angle)',
      '= θ (Constant)'
    ],
    formulaSuccess: '✓ Angle is invariant everywhere on the arc.',
    oneLineProof: ['Inscribed Angle', '=', '½', '×', 'Central Angle (2θ)', '=', 'θ'],
    challenge: {
      desc: 'Drag point P to position 180° directly opposite the arc to verify the invariant holding.',
      preset: { ptP: 180, arcSpread: 80 }
    }
  },

  'lesson-19': {
    difficulty: 'BEGINNER',
    time: '7 minutes',
    missionTitle: 'Span an inscribed angle across a diameter.',
    missionInstruction: 'Subtend an angle from any point C on the circumference across diameter AB and prove ∠ACB is always a 90° right angle.',
    stats: [
      { label: 'Diameter', val: 'AB' },
      { label: 'Angle C', val: '90°' },
      { label: 'Central', val: '180°' }
    ],
    tools: ['Drag Point ✋', 'Measure 📏', 'Fold ✂', 'Snap ♧'],
    prediction: {
      question: 'What is always the angle subtended by a circle diameter onto any point on the circumference?',
      options: [
        'Always exactly 90° (a right angle)',
        '45°',
        'Varies between 60° and 120°'
      ],
      correct: 0,
      explanation: 'The central angle subtended by a straight diameter is 180°. By the inscribed angle theorem, the angle at the circumference is ½ × 180° = 90°.'
    },
    formulaLines: [
      'Central Angle = 180° (Straight line diameter)',
      'Inscribed Angle = ½ × 180°',
      '= 90° (Right angle)'
    ],
    formulaSuccess: '✓ Inscribed triangle is always right-angled.',
    oneLineProof: ['∠ACB', '=', '½', '×', '180°', '=', '90°'],
    challenge: {
      desc: 'Drag vertex C close to endpoint B to verify that even when legs are extremely skewed, the angle stays 90°.',
      preset: { ptC: 25 }
    }
  },

  'lesson-20': {
    difficulty: 'INTERMEDIATE',
    time: '9 minutes',
    missionTitle: 'Spiral through the golden rectangles.',
    missionInstruction: 'Tile squares with sides matching Fibonacci numbers (1, 1, 2, 3, 5, 8, 13, 21) and connect circular quarter-arcs into a spiral.',
    stats: [
      { label: 'Ratio', val: 'φ ≈ 1.618' },
      { label: 'Squares', val: '8 / 8' },
      { label: 'Growth', val: 'Logarithmic' }
    ],
    tools: ['Tile □', 'Draw Arc ↻', 'Zoom 🔍', 'Snap ♧'],
    prediction: {
      question: 'What value does the ratio of consecutive Fibonacci numbers F_{n+1} / F_n approach?',
      options: [
        'The Golden Ratio φ = (1 + √5)/2 ≈ 1.6180339887...',
        'Euler’s number e ≈ 2.718',
        'Pi π ≈ 3.14159'
      ],
      correct: 0,
      explanation: 'The quadratic equation φ² = φ + 1 dictates that the growth factor converges rapidly to the golden ratio φ.'
    },
    formulaLines: [
      'F_{n+1} = F_n + F_{n-1}',
      '\\lim_{n \\to \\infty} \\frac{F_{n+1}}{F_n} = φ',
      'φ = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618'
    ],
    formulaSuccess: '✓ Golden spiral expands smoothly by factor φ per turn.',
    oneLineProof: ['F_{n+1} / F_n', '→', 'φ', '=', '\\frac{1 + \\sqrt{5}}{2}', '≈', '1.618'],
    challenge: {
      desc: 'Increase Fibonacci steps to 8 to view the large outer rectangle of side 34.',
      preset: { fibSteps: 8 }
    }
  },

  'lesson-21': {
    difficulty: 'INTERMEDIATE',
    time: '9 minutes',
    missionTitle: 'Collapse the polyhedron to a spanning tree.',
    missionInstruction: 'Remove cycle edges and vertices of a flattened polyhedron graph to prove V - E + F = 2 invariant.',
    stats: [
      { label: 'Vertices (V)', val: '8' },
      { label: 'Edges (E)', val: '12' },
      { label: 'Faces (F)', val: '6' }
    ],
    tools: ['Delete Edge ✂', 'Collapse ✋', 'Highlight 🎨', 'Snap ♧'],
    prediction: {
      question: 'What is the value of V - E + F for every simple convex polyhedron without holes?',
      options: [
        'Always exactly 2 (the Euler characteristic of a sphere)',
        'Depends on the number of vertices',
        '0'
      ],
      correct: 0,
      explanation: 'Removing an edge bounding two faces reduces both E and F by 1, preserving V - E + F until reaching a single vertex with 1 face: 1 - 0 + 1 = 2.'
    },
    formulaLines: [
      'For Cube: V = 8,  E = 12,  F = 6',
      'V - E + F = 8 - 12 + 6',
      '= 2'
    ],
    formulaSuccess: '✓ Topological Euler invariant holds universally.',
    oneLineProof: ['Vertices (V)', '−', 'Edges (E)', '+', 'Faces (F)', '=', '2'],
    challenge: {
      desc: 'Switch to the Octahedron (V=6, E=12, F=8) and verify 6 - 12 + 8 = 2.',
      preset: { polyType: 3 }
    }
  },

  'lesson-22': {
    difficulty: 'BEGINNER',
    time: '7 minutes',
    missionTitle: 'Triangulate the n-gon from a vertex.',
    missionInstruction: 'Draw non-intersecting diagonals from one vertex of an n-sided polygon to split it into (n - 2) triangles.',
    stats: [
      { label: 'Sides (n)', val: '6' },
      { label: 'Triangles', val: 'n - 2 = 4' },
      { label: 'Total Sum', val: '720°' }
    ],
    tools: ['Draw Diagonal 📏', 'Color 🎨', 'Count 🔢', 'Snap ♧'],
    prediction: {
      question: 'Into how many non-overlapping triangles does diagonals from one vertex split an n-sided polygon?',
      options: [
        'Exactly (n - 2) triangles',
        'n triangles',
        '(n - 1) triangles'
      ],
      correct: 0,
      explanation: 'The chosen vertex connects to all other vertices except itself and its two immediate neighbors, forming (n - 2) triangles.'
    },
    formulaLines: [
      'Number of Triangles = n - 2',
      'Sum per Triangle = 180°',
      'Interior Angle Sum = (n - 2) × 180°'
    ],
    formulaSuccess: '✓ Exactly sums to (n - 2) × 180°.',
    oneLineProof: ['Interior Sum', '=', '(n − 2)', '×', '180°'],
    challenge: {
      desc: 'Set n = 8 (octagon) and verify that the interior angle sum equals (8 - 2) × 180° = 1080°.',
      preset: { sidesN: 8 }
    }
  },

  'lesson-23': {
    difficulty: 'BEGINNER',
    time: '7 minutes',
    missionTitle: 'Drive a car around the polygon perimeter.',
    missionInstruction: 'Trace exterior turns around the perimeter of any polygon: completing one full loop always turns exactly 360°.',
    stats: [
      { label: 'Total Turn', val: '360°' },
      { label: 'Loops', val: '1 full rotation' },
      { label: 'Radians', val: '2π rad' }
    ],
    tools: ['Drive 🚗', 'Rotate ↻', 'Shrink 🔍', 'Snap ♧'],
    prediction: {
      question: 'What is the sum of the exterior angles of any convex polygon, regardless of how many sides it has?',
      options: [
        'Always exactly 360° (one full turn)',
        '(n - 2) × 180°',
        'Increases as n gets larger'
      ],
      correct: 0,
      explanation: 'Traveling around any closed loop returns to the starting direction, which is a net rotation of 360°.'
    },
    formulaLines: [
      'Each Exterior Angle = 180° - Interior Angle',
      'Sum of All Turns = 1 full revolution',
      '= 360° = 2π radians'
    ],
    formulaSuccess: '✓ One complete 360° angular rotation.',
    oneLineProof: ['\\sum \\theta_{ext}', '=', '1 Full Turn', '=', '360°'],
    challenge: {
      desc: 'Increase sides to 7 (heptagon) to observe that smaller individual turns still sum to 360°.',
      preset: { polySides: 7 }
    }
  },

  'lesson-24': {
    difficulty: 'INTERMEDIATE',
    time: '8 minutes',
    missionTitle: 'Stretch the unit circle into an ellipse.',
    missionInstruction: 'Apply affine scaling along the x and y axes to transform a circle of radius 1 into an ellipse with semi-axes a and b.',
    stats: [
      { label: 'Semi-major a', val: '80' },
      { label: 'Semi-minor b', val: '50' },
      { label: 'Area', val: 'πab' }
    ],
    tools: ['Stretch ◇', 'Scale 📏', 'Grid 📐', 'Snap ♧'],
    prediction: {
      question: 'What is the area of an ellipse with semi-major axis a and semi-minor axis b?',
      options: [
        'πab',
        'π(a + b)',
        '½ π (a² + b²)'
      ],
      correct: 0,
      explanation: 'Uniform horizontal scaling by factor a and vertical scaling by factor b multiplies the unit circle area π(1)² by ab to give πab.'
    },
    formulaLines: [
      'Unit Circle Area = π(1)² = π',
      'Affine Area Scaling Factor = a × b',
      'Ellipse Area = π × a × b = πab'
    ],
    formulaSuccess: '✓ Area scales linearly with axis stretch.',
    oneLineProof: ['Area(Ellipse)', '=', 'π', '×', 'a', '×', 'b', '=', 'πab'],
    challenge: {
      desc: 'Set a = 60 and b = 60 (circle) and check that the formula simplifies to πr².',
      preset: { semiA: 60, semiB: 60 }
    }
  },

  'lesson-25': {
    difficulty: 'INTERMEDIATE',
    time: '8 minutes',
    missionTitle: 'Slide secant line Δx toward zero.',
    missionInstruction: 'Pick two points on a curve and slide secant step Δx → 0 to watch the secant line smoothly converge into the tangent line.',
    stats: [
      { label: 'Secant Slope', val: 'Δy / Δx' },
      { label: 'Step Δx', val: '→ 0' },
      { label: 'Tangent', val: "f'(x)" }
    ],
    tools: ['Slide Point ✋', 'Zoom 🔍', 'Tangent 📏', 'Snap ♧'],
    prediction: {
      question: 'What geometric line does the secant line become in the limit as Δx approaches 0?',
      options: [
        'The exact tangent line touching the curve at that single point',
        'A horizontal line',
        'An asymptotic line'
      ],
      correct: 0,
      explanation: 'The slope of the secant line (f(x+Δx)-f(x))/Δx approaches the instantaneous derivative f’(x), which defines the tangent line.'
    },
    formulaLines: [
      'Secant Slope = \\frac{f(x + Δx) - f(x)}{Δx}',
      'Tangent Slope = \\lim_{Δx \\to 0} \\frac{f(x + Δx) - f(x)}{Δx}',
      "= f'(x)"
    ],
    formulaSuccess: '✓ Secant line smoothly morphs into tangent.',
    oneLineProof: ["f'(x)", '=', '\\lim_{\\Delta x \\to 0}', '\\frac{\\Delta y}{\\Delta x}'],
    challenge: {
      desc: 'Move Δx to the minimum value of 2 to observe the near-perfect alignment with the tangent.',
      preset: { deltaX: 2, posX: 50 }
    }
  },

  'lesson-26': {
    difficulty: 'ADVANCED',
    time: '10 minutes',
    missionTitle: 'Accumulate rectangle slivers into area.',
    missionInstruction: 'Stack Riemann rectangles under a curve to prove the rate of area accumulation strictly equals the function curve height.',
    stats: [
      { label: 'Area A(x)', val: '∫ f(t) dt' },
      { label: 'Rate dA/dx', val: 'f(x)' },
      { label: 'Slivers', val: 'dx → 0' }
    ],
    tools: ['Accumulate 🎨', 'Slice ✂', 'Zoom 🔍', 'Snap ♧'],
    prediction: {
      question: 'Why is the derivative of the accumulation function A(x) = ∫₀ˣ f(t)dt equal to f(x)?',
      options: [
        'Because adding a sliver of width dx adds area dA ≈ f(x)·dx, so dA/dx = f(x)',
        'Because integration and differentiation cancel by definition',
        'It only holds for straight lines'
      ],
      correct: 0,
      explanation: 'When x increases by dx, the added strip has width dx and height f(x). Dividing the added area by dx leaves exactly f(x).'
    },
    formulaLines: [
      'A(x + dx) - A(x) \\approx f(x) · dx',
      '\\frac{dA}{dx} = \\lim_{dx \\to 0} \\frac{A(x + dx) - A(x)}{dx}',
      '= f(x)'
    ],
    formulaSuccess: '✓ Differentiation reverses integration.',
    oneLineProof: ['\\frac{d}{dx}', '\\int_0^x f(t) dt', '=', 'f(x)'],
    challenge: {
      desc: 'Slide the boundary X to 80 to observe the accumulated Riemann sum under the parabolic curve.',
      preset: { boundX: 80, sliverDx: 4 }
    }
  },

  'lesson-27': {
    difficulty: 'INTERMEDIATE',
    time: '8 minutes',
    missionTitle: 'Shear 2D and 3D cross-section stacks.',
    missionInstruction: 'Stack horizontal card slices into straight and twisted shapes to demonstrate Bonaventura Cavalieri’s 1635 volume invariance.',
    stats: [
      { label: 'Slices', val: '24' },
      { label: 'Cross-section', val: 'Equal' },
      { label: 'Volume', val: 'Conserved' }
    ],
    tools: ['Shear ◇', 'Slice ✂', 'Stack □', 'Snap ♧'],
    prediction: {
      question: 'If two solid objects have identical cross-sectional areas at every height level, do they have equal volumes?',
      options: [
        'Yes, their total volumes are strictly identical',
        'Only if they have the same shape',
        'No, shearing changes volume'
      ],
      correct: 0,
      explanation: 'Like a deck of playing cards pushed into a slanted or curved pile, sliding horizontal layers does not alter total material volume.'
    },
    formulaLines: [
      'A₁(z) = A₂(z) for all z \\in [0, h]',
      'V = \\int_0^h A(z) dz',
      '∴ V₁ = V₂'
    ],
    formulaSuccess: '✓ Volume is invariant under arbitrary shear.',
    oneLineProof: ['Volume', '=', '\\int_0^h A(z) dz', '=', 'Invariant under shear'],
    challenge: {
      desc: 'Set shear amount to 90 to see an extreme S-curve stack maintaining exact volume.',
      preset: { shearAmount: 90, sliceCount: 24 }
    }
  },

  'lesson-28': {
    difficulty: 'INTERMEDIATE',
    time: '8 minutes',
    missionTitle: 'Explode the binomial cube into 8 sub-blocks.',
    missionInstruction: 'Dissect a cube of side (a + b) into 8 constituent 3D blocks: a³, 3a²b, 3ab², and b³.',
    stats: [
      { label: 'Blocks', val: '8 / 8' },
      { label: 'Cube Side', val: 'a + b' },
      { label: 'Total Volume', val: '(a+b)³' }
    ],
    tools: ['Explode ⧉', 'Rotate ↻', 'Highlight 🎨', 'Snap ♧'],
    prediction: {
      question: 'How many distinct volumetric blocks constitute the expanded cube (a + b)³?',
      options: [
        '8 blocks (1 a³, 3 a²b, 3 ab², 1 b³)',
        '6 blocks',
        '4 blocks'
      ],
      correct: 0,
      explanation: 'Cutting all three dimensions into lengths a and b creates 2 × 2 × 2 = 8 volumetric rectangular prisms.'
    },
    formulaLines: [
      '(a + b)³ = a³ + 3a²b + 3ab² + b³',
      '1 cube a³ + 3 rectangular prisms a²b',
      '+ 3 rectangular prisms ab² + 1 cube b³'
    ],
    formulaSuccess: '✓ 8 sub-blocks assemble into (a+b)³.',
    oneLineProof: ['(a + b)³', '=', 'a³', '+', '3a²b', '+', '3ab²', '+', 'b³'],
    challenge: {
      desc: 'Increase explode distance slider to 60 to visually separate all 8 blocks in 3D isometric view.',
      preset: { explodeDist: 60, edgeA: 60, edgeB: 35 }
    }
  },

  'lesson-29': {
    difficulty: 'INTERMEDIATE',
    time: '8 minutes',
    missionTitle: 'Construct the semicircle arithmetic-geometric mean.',
    missionInstruction: 'Draw a semicircle over diameter a + b: the perpendicular altitude is √(ab) while the radius is (a+b)/2.',
    stats: [
      { label: 'Arithmetic', val: '(a+b)/2' },
      { label: 'Geometric', val: '√(ab)' },
      { label: 'Inequality', val: 'AM ≥ GM' }
    ],
    tools: ['Drag Split ✋', 'Measure 📏', 'Rotate ↻', 'Snap ♧'],
    prediction: {
      question: 'Under what condition does the geometric mean √(ab) equal the arithmetic mean (a + b)/2?',
      options: [
        'Only when a = b (the altitude reaches the maximum apex radius)',
        'When a = 0',
        'Never'
      ],
      correct: 0,
      explanation: 'The perpendicular altitude can never exceed the semicircle radius; it equals the radius only when the altitude is at the center (a = b).'
    },
    formulaLines: [
      'Radius (Arithmetic Mean) = \\frac{a + b}{2}',
      'Altitude (Geometric Mean) = \\sqrt{ab}',
      'Altitude \\le Radius \\implies \\frac{a + b}{2} \\ge \\sqrt{ab}'
    ],
    formulaSuccess: '✓ Geometric altitude is always bounded by the radius.',
    oneLineProof: ['\\frac{a + b}{2}', '≥', '\\sqrt{ab}', '(Equality iff a = b)'],
    challenge: {
      desc: 'Set a = 60 and b = 60 to see the altitude merge directly with the radius vector.',
      preset: { valA: 60, valB: 60 }
    }
  },

  'lesson-30': {
    difficulty: 'ADVANCED',
    time: '9 minutes',
    missionTitle: 'Drop an altitude to prove the Law of Cosines.',
    missionInstruction: 'Drop an altitude h from vertex A perpendicular to base a, partitioning the triangle into two right triangles.',
    stats: [
      { label: 'Side c²', val: 'a² + b² - 2ab cos C' },
      { label: 'Altitude h', val: 'b sin C' },
      { label: 'Base split', val: 'b cos C' }
    ],
    tools: ['Drop Altitude 📏', 'Pythagoras 📐', 'Measure 📏', 'Snap ♧'],
    prediction: {
      question: 'What does the Law of Cosines simplify to when angle C is 90°?',
      options: [
        'The Pythagorean theorem c² = a² + b²',
        'c² = a² - b²',
        'c = a + b'
      ],
      correct: 0,
      explanation: 'Because cos(90°) = 0, the term -2ab cos(90°) vanishes completely, leaving Pythagoras: c² = a² + b².'
    },
    formulaLines: [
      'Altitude h = b · \\sin C,  Base segment = b · \\cos C',
      'c² = h² + (a - b \\cos C)²',
      '= a² + b² - 2ab \\cos C'
    ],
    formulaSuccess: '✓ Generalizes Pythagorean theorem to all triangles.',
    oneLineProof: ['c²', '=', 'a²', '+', 'b²', '−', '2ab \\cos C'],
    challenge: {
      desc: 'Set angle C to 90° and verify that c² = a² + b².',
      preset: { angleC: 90, sideA: 70, sideB: 60 }
    }
  },

  'lesson-31': {
    difficulty: 'INTERMEDIATE',
    time: '8 minutes',
    missionTitle: 'Reflect incoming rays onto the parabola focus.',
    missionInstruction: 'Shoot parallel vertical light rays into a parabolic mirror: every reflected ray converges precisely at the focal point (0, f).',
    stats: [
      { label: 'Focal Length', val: 'f = 50' },
      { label: 'Rays', val: 'All Converge' },
      { label: 'Angles', val: 'θ_{in} = θ_{out}' }
    ],
    tools: ['Shoot Rays ⚡', 'Move Focus ✋', 'Tangent 📏', 'Snap ♧'],
    prediction: {
      question: 'Why do all vertical parallel rays reflect to the single focus point in a parabolic mirror?',
      options: [
        'The tangent line bisects the angle between the vertical ray and the focal vector',
        'Because light slows down inside the parabola',
        'It is an optical illusion'
      ],
      correct: 0,
      explanation: 'By the geometric definition of a parabola (points equidistant from focus and directrix), the tangent bisects the incident angle perfectly.'
    },
    formulaLines: [
      'Parabola Equation: y = \\frac{x²}{4f}',
      'Tangent Slope: y\' = \\frac{x}{2f}',
      'Incident Angle = Reflected Angle \\implies Convergence at (0, f)'
    ],
    formulaSuccess: '✓ All parallel rays focus at a single point.',
    oneLineProof: ['Parallel Rays', '→', 'Parabolic Reflection', '→', 'Focal Point (0, f)'],
    challenge: {
      desc: 'Change focal length to 70 and observe all reflections track the elevated focus.',
      preset: { focalF: 70, rayDensity: 12 }
    }
  },

  'lesson-32': {
    difficulty: 'ADVANCED',
    time: '10 minutes',
    missionTitle: 'Tesselate inverse squares to reach π²/6.',
    missionInstruction: 'Follow Euler’s 1734 discovery: summing 1/1² + 1/2² + 1/3² + 1/4² + ... converges to exactly π²/6.',
    stats: [
      { label: 'Sum', val: '≈ 1.64493' },
      { label: 'Exact Limit', val: 'π² / 6' },
      { label: 'Terms', val: '16' }
    ],
    tools: ['Tesselate □', 'Scale 📏', 'Accumulate 🎨', 'Snap ♧'],
    prediction: {
      question: 'To what exact value did Leonhard Euler prove the series 1/1² + 1/2² + 1/3² + ... converges?',
      options: [
        'π² / 6 ≈ 1.6449340668...',
        'π / 2',
        '2'
      ],
      correct: 0,
      explanation: 'Euler factored sin(x)/x into an infinite product of roots (1 - x²/n²π²); comparing the x² coefficient yielded ∑ 1/n² = π²/6.'
    },
    formulaLines: [
      'S = \\sum_{n=1}^\\infty \\frac{1}{n²} = 1 + \\frac{1}{4} + \\frac{1}{9} + ...',
      '\\frac{\\sin x}{x} = \\prod_{n=1}^\\infty \\left(1 - \\frac{x²}{n²π²}\\right)',
      '= \\frac{π²}{6} \\approx 1.64493'
    ],
    formulaSuccess: '✓ Sum converges to Euler’s exact constant π²/6.',
    oneLineProof: ['\\sum_{n=1}^\\infty \\frac{1}{n²}', '=', '1 + ¼ + ⅑ + ...', '=', '\\frac{π²}{6}'],
    challenge: {
      desc: 'Increase term count slider to 24 to see the partial sum reach 1.604 (closer to 1.6449).',
      preset: { termCount: 24 }
    }
  }
};
