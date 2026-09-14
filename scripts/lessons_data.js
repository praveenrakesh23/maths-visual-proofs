// lessons_data.js - Complete metadata and content for all 32 mathematics visual proof lessons

export const LESSONS = [
  {
    id: 'lesson-01',
    num: '01',
    title: 'Pythagorean Theorem: Area Rearrangement',
    subtitle: 'Geometric proof that a² + b² = c² through isometric triangle shuffling',
    category: 'Geometry',
    formula: 'a² + b² = c²',
    mission: 'Prove that the sum of the squares on the legs of any right triangle equals the square on the hypotenuse by rearranging four identical copies inside an (a+b)×(a+b) boundary.',
    steps: [
      {
        title: 'Construct the (a+b) Outer Square',
        desc: 'Place four congruent right triangles with legs a and b and hypotenuse c inside a large square of side (a+b).',
        formula: 'Total Area = (a + b)²'
      },
      {
        title: 'Configuration A: Uncover a² and b²',
        desc: 'Pair the four triangles into two rectangles of dimensions a × b placed in the corners. The remaining uncovered space forms two squares of areas a² and b².',
        formula: 'Uncovered Area = a² + b²'
      },
      {
        title: 'Configuration B: Uncover c²',
        desc: 'Glide and rotate the four triangles into the four corners of the outer square. The remaining central region is a square of side c tilted at angle θ.',
        formula: 'Uncovered Area = c²'
      },
      {
        title: 'The Invariant Proof Conclusion',
        desc: 'Since both configurations subtract the exact same four triangles from the identical outer square, the remaining uncovered areas must be strictly equal.',
        formula: '∴ a² + b² = c²'
      }
    ],
    derivation: [
      { text: 'Total area of outer square:', math: 'A_{total} = (a + b)² = a² + 2ab + b²' },
      { text: 'Combined area of the 4 right triangles:', math: '4 × (½ a · b) = 2ab' },
      { text: 'Config 1 remaining area (two separate squares):', math: 'A_{uncovered} = a² + b²' },
      { text: 'Config 2 remaining area (central tilted square):', math: 'A_{uncovered} = c²' },
      { text: 'By conservation of total area:', math: 'a² + b² = c²  ■' }
    ],
    intuition: 'This ancient proof, often attributed to Pythagoras and recorded in ancient Chinese texts (the Zhoubi Suanjing), relies on rigid isometric transformations. Nothing is stretched or distorted—only rearranged.',
    quiz: {
      question: 'If a right triangle has legs a = 6 and b = 8, what is the area of the central square c² in Configuration B?',
      options: ['14', '48', '100', '196'],
      correct: 2,
      explanation: 'Correct! By the Pythagorean theorem, c² = a² + b² = 6² + 8² = 36 + 64 = 100.'
    },
    sliders: [
      { id: 'sideA', label: 'Leg a', min: 40, max: 90, val: 60, step: 1 },
      { id: 'sideB', label: 'Leg b', min: 40, max: 90, val: 80, step: 1 }
    ],
    renderType: 'pythagoras_rearrangement'
  },
  {
    id: 'lesson-02',
    num: '02',
    title: 'Area of Circle by Unrolling Circumference',
    subtitle: 'Archimedes’ proof: unrolling concentric circular rings into a right triangle',
    category: 'Geometry',
    formula: 'Area = ½ · Base · Height = ½ · (2πr) · r = πr²',
    mission: 'Demonstrate Archimedes’ intuitive calculus: by slicing a disk of radius r into thin concentric rings and unrolling them flat, they assemble into a right triangle of base 2πr and height r.',
    steps: [
      {
        title: 'Concentric Ring Decomposition',
        desc: 'Decompose a solid circle of radius r into infinitely many concentric rings of thickness dr. Each ring at radius s has circumference 2πs.',
        formula: 'Circumference = 2πs (0 ≤ s ≤ r)'
      },
      {
        title: 'Radial Slice & Unpeeling',
        desc: 'Cut the circle along a single radius. Unpeel each circular strip outward from the outermost ring down to the center point.',
        formula: 'Strip length = 2πs'
      },
      {
        title: 'Horizontal Alignment',
        desc: 'Lay each unrolled strip flat horizontally, aligning their left edges along a vertical axis of height r. The strip lengths increase linearly with radius.',
        formula: 'Base = 2πr,  Height = r'
      },
      {
        title: 'Triangle Integration & Area',
        desc: 'The unrolled strips form a right-angled triangle with base equal to the circle circumference 2πr and height equal to the radius r.',
        formula: 'Area = ½ × Base × Height = ½ × (2πr) × r = πr²'
      }
    ],
    derivation: [
      { text: 'Circle radius:', math: 'r' },
      { text: 'Outer ring circumference (triangle base):', math: 'B = 2πr' },
      { text: 'Radius along unrolled stack (triangle height):', math: 'H = r' },
      { text: 'Area of the resulting right triangle:', math: 'A = ½ × B × H' },
      { text: 'Substitute base and height:', math: 'A = ½ × (2πr) × r = πr²  ■' }
    ],
    intuition: 'This visualization is the geometric predecessor to integral calculus. The area is the integral of circumferences from 0 to r: ∫₀ʳ 2πs ds = 2π [s²/2]₀ʳ = πr².',
    quiz: {
      question: 'Why does the unrolled profile form a straight triangular hypotenuse rather than a curved line?',
      options: [
        'Because circumference is strictly proportional to radius (C = 2πr is linear)',
        'Because circles always have 360 degrees',
        'Because π is an irrational constant',
        'Because the area of a circle is curved'
      ],
      correct: 0,
      explanation: 'Correct! The function C(s) = 2πs is a linear equation (y = mx), so the tips of the unrolled strips form a straight line with slope 2π.'
    },
    sliders: [
      { id: 'radius', label: 'Radius r', min: 50, max: 110, val: 80, step: 1 },
      { id: 'rings', label: 'Ring Count', min: 8, max: 32, val: 18, step: 1 }
    ],
    renderType: 'circle_unroll_rings'
  },
  {
    id: 'lesson-03',
    num: '03',
    title: 'Area of Circle by Sector Dissection',
    subtitle: 'Slicing a disk into interlocking wedges to construct an alternating parallelogram',
    category: 'Geometry',
    formula: 'Area = Base · Height = (πr) · r = πr²',
    mission: 'Divide a circle into n alternating sectors, hinge them open, and interlock them head-to-tail to form a shape whose limit is an exact rectangle of dimensions πr × r.',
    steps: [
      {
        title: 'Radial Sector Partitioning',
        desc: 'Partition a circle of radius r into n equal circular sectors, alternating their fill colors between cyan and amber.',
        formula: 'Angle per sector = 2π / n'
      },
      {
        title: 'Hinged Half-Circle Split',
        desc: 'Split the circle into upper and lower semicircles. Open the sectors like an accordion chain along the circular perimeter.',
        formula: 'Perimeter of each chain = πr'
      },
      {
        title: 'Interlocking Mesh',
        desc: 'Slide the top half and bottom half toward each other so the wedge points interleave snugly into an alternating tooth row.',
        formula: 'Wedges interlock into parallelogram'
      },
      {
        title: 'Rectangular Limit (n → ∞)',
        desc: 'As n increases, the scalloped edges flatten into straight lines. The base is half the circumference (πr) and the height is the radius (r).',
        formula: 'Area = Base × Height = πr × r = πr²'
      }
    ],
    derivation: [
      { text: 'Total circle circumference:', math: 'C = 2πr' },
      { text: 'Top and bottom edge lengths each take half:', math: 'Base = ½ C = πr' },
      { text: 'Side edge length is the sector radius:', math: 'Height = r' },
      { text: 'As n → ∞, sectors become perpendicular rectangles:', math: 'Area = Base × Height' },
      { text: 'Final formula:', math: 'Area = (πr) × r = πr²  ■' }
    ],
    intuition: 'This dissection method was documented by Leonardo da Vinci and Japanese Wasan mathematicians. It provides tangible physical proof that curved boundaries can be reformed into straight dimensions.',
    quiz: {
      question: 'If a circle has radius r = 10, what is the base length of the dissected parallelogram?',
      options: ['10', '20', '10π ≈ 31.42', '20π ≈ 62.83'],
      correct: 2,
      explanation: 'Correct! The base of the interlocking parallelogram is half of the total circumference: ½ × (2πr) = πr = 10π ≈ 31.42.'
    },
    sliders: [
      { id: 'radius', label: 'Radius r', min: 60, max: 110, val: 85, step: 1 },
      { id: 'sectors', label: 'Sectors (n)', min: 6, max: 48, val: 16, step: 2 }
    ],
    renderType: 'circle_sectors_parallelogram'
  },
  {
    id: 'lesson-04',
    num: '04',
    title: 'Triangle Angle Sum: 180° Proof',
    subtitle: 'Parallel line transversals and vertex folding onto a straight line',
    category: 'Geometry',
    formula: '∠A + ∠B + ∠C = 180°',
    mission: 'Demonstrate why the three interior angles of any triangle on a Euclidean plane always add up to 180° by folding them along midlines to meet at a single line point.',
    steps: [
      {
        title: 'Initial Arbitrary Triangle',
        desc: 'Start with any triangle with corner angles α (cyan), β (amber), and γ (coral).',
        formula: 'Angles: α, β, γ'
      },
      {
        title: 'Midsegment Folding Creases',
        desc: 'Draw the horizontal midsegment parallel to the base. Drop perpendicular creases from the midsegment to the base.',
        formula: 'Creates folding axes'
      },
      {
        title: 'Fold Corners Together',
        desc: 'Fold the top vertex downward to touch the base. Fold the left and right corners inward to meet the top vertex.',
        formula: 'All three angles meet at one point'
      },
      {
        title: 'Straight Line Formation',
        desc: 'The three angles fit together with zero gaps and zero overlap, perfectly forming a straight line (180° / π radians).',
        formula: 'α + β + γ = 180°'
      }
    ],
    derivation: [
      { text: 'Construct a line through top vertex C parallel to base AB:', math: 'L \\parallel AB' },
      { text: 'Alternate interior angle with ∠A:', math: '∠A\' = ∠A' },
      { text: 'Alternate interior angle with ∠B:', math: '∠B\' = ∠B' },
      { text: 'Angles on straight line L sum to a straight angle:', math: '∠A\' + ∠C + ∠B\' = 180°' },
      { text: 'Substituting original angles:', math: '∠A + ∠B + ∠C = 180°  ■' }
    ],
    intuition: 'Euclid’s fifth postulate (the parallel postulate) guarantees that parallel lines maintain constant distance. On spherical or hyperbolic surfaces, this sum is strictly greater or less than 180°!',
    quiz: {
      question: 'In a right triangle where one acute angle is 37°, what is the measure of the second acute angle?',
      options: ['43°', '53°', '63°', '143°'],
      correct: 1,
      explanation: 'Correct! The angles sum to 180°, so 90° + 37° + θ = 180° → θ = 90° - 37° = 53°.'
    },
    sliders: [
      { id: 'topX', label: 'Apex X Position', min: 50, max: 250, val: 140, step: 2 },
      { id: 'topY', label: 'Apex Height', min: 40, max: 140, val: 60, step: 2 }
    ],
    renderType: 'triangle_angle_sum'
  },
  {
    id: 'lesson-05',
    num: '05',
    title: 'Area of a Trapezoid: Duplication & Rotation',
    subtitle: 'Forming a parallelogram of base (a + b) and height h from two congruent trapezoids',
    category: 'Geometry',
    formula: 'Area = ½ · (a + b) · h',
    mission: 'Prove that the area of any trapezoid with parallel sides a and b and height h is exactly ½(a+b)h by duplicating it, rotating the copy 180°, and joining them into a parallelogram.',
    steps: [
      {
        title: 'The Given Trapezoid',
        desc: 'Consider a trapezoid with top base a (amber), bottom base b (cyan), and vertical height h.',
        formula: 'Bases: a, b; Height: h'
      },
      {
        title: 'Duplicate & 180° Inversion',
        desc: 'Create an exact duplicate of the trapezoid and rotate it 180° in the plane so its top and bottom swap.',
        formula: 'Copy has top b, bottom a'
      },
      {
        title: 'Docking into a Parallelogram',
        desc: 'Slide the inverted trapezoid next to the original until their non-parallel legs touch along their entire length.',
        formula: 'New Base = a + b, Height = h'
      },
      {
        title: 'Halving the Parallelogram',
        desc: 'The combined shape is a parallelogram of base (a+b) and height h. Since two identical trapezoids formed it, one trapezoid has exactly half the area.',
        formula: 'Area = ½(a + b)h'
      }
    ],
    derivation: [
      { text: 'Base of joined parallelogram:', math: 'B = a + b' },
      { text: 'Height of joined parallelogram:', math: 'H = h' },
      { text: 'Area of parallelogram:', math: 'A_{parallelogram} = B × H = (a + b)h' },
      { text: 'Since two congruent trapezoids make up the parallelogram:', math: '2 × A_{trapezoid} = (a + b)h' },
      { text: 'Dividing by 2:', math: 'A_{trapezoid} = \\frac{a + b}{2} × h  ■' }
    ],
    intuition: 'The term (a+b)/2 is simply the arithmetic mean of the two parallel bases—the length of the midline! The area of a trapezoid is simply the midline length times height.',
    quiz: {
      question: 'A trapezoid has bases a = 7 and b = 13, with height h = 6. What is its area?',
      options: ['60', '120', '42', '78'],
      correct: 0,
      explanation: 'Correct! Area = ½ × (7 + 13) × 6 = ½ × 20 × 6 = 60.'
    },
    sliders: [
      { id: 'topBase', label: 'Top Base (a)', min: 30, max: 90, val: 50, step: 1 },
      { id: 'botBase', label: 'Bottom Base (b)', min: 60, max: 140, val: 110, step: 1 },
      { id: 'height', label: 'Height (h)', min: 40, max: 100, val: 70, step: 1 }
    ],
    renderType: 'trapezoid_duplication'
  },
  {
    id: 'lesson-06',
    num: '06',
    title: 'Area of a Triangle: Shearing & Cavalieri',
    subtitle: 'Continuous shear deformation preserving base, height, and area',
    category: 'Geometry',
    formula: 'Area = ½ · Base · Height',
    mission: 'Demonstrate Cavalieri’s principle in 2D: sliding the top vertex of a triangle parallel to its base shears horizontal cross-sections without changing their lengths, strictly preserving total area.',
    steps: [
      {
        title: 'Initial Right/Acute Triangle',
        desc: 'A triangle with base b on the bottom horizontal axis and apex at vertical height h.',
        formula: 'Area = ½ b · h'
      },
      {
        title: 'Horizontal Cross-Section Slices',
        desc: 'Slice the triangle into dozens of thin horizontal bars. At any relative height y, the bar width is b · (1 - y/h).',
        formula: 'Slice width w(y) is linear'
      },
      {
        title: 'Shear Translation of Slices',
        desc: 'Slide the apex horizontally by an offset distance Δx. Each slice slides proportionally without any stretching or compression.',
        formula: 'Individual slice areas invariant'
      },
      {
        title: 'Enclosing Rectangle Doubling',
        desc: 'Any sheared triangle can be doubled to form an equivalent parallelogram of base b and height h, confirming area is strictly ½ b h.',
        formula: 'Area = ½ · b · h'
      }
    ],
    derivation: [
      { text: 'Base length along baseline:', math: 'b' },
      { text: 'Perpendicular height from base to apex:', math: 'h' },
      { text: 'Width of horizontal slice at height y:', math: 'w(y) = b(1 - y/h)' },
      { text: 'Total area by Cavalieri integration:', math: 'A = \\int_0^h b(1 - y/h) dy = [by - \\frac{by^2}{2h}]_0^h' },
      { text: 'Result is independent of apex x-offset:', math: 'A = bh - ½ bh = ½ bh  ■' }
    ],
    intuition: 'Bonaventura Cavalieri recognized in 1635 that geometric shapes of equal height with equal cross-sectional lengths at all levels have identical area, regardless of slant.',
    quiz: {
      question: 'If you drag the apex of a triangle 200 units to the right while keeping its vertical height constant, what happens to its area?',
      options: ['It increases', 'It decreases', 'It stays exactly the same', 'It doubles'],
      correct: 2,
      explanation: 'Correct! Because the base and the perpendicular height remain unchanged, the area ½bh is completely invariant under shearing.'
    },
    sliders: [
      { id: 'base', label: 'Base (b)', min: 60, max: 160, val: 120, step: 1 },
      { id: 'height', label: 'Height (h)', min: 40, max: 120, val: 80, step: 1 },
      { id: 'shear', label: 'Shear Offset (x)', min: -80, max: 120, val: 40, step: 1 }
    ],
    renderType: 'triangle_cavalieri_shear'
  },
  {
    id: 'lesson-07',
    num: '07',
    title: 'Sum of Odd Numbers: L-Shaped Gnomons',
    subtitle: 'Visualizing 1 + 3 + 5 + ... + (2n - 1) = n² via nested corner brackets',
    category: 'Number Theory',
    formula: '1 + 3 + 5 + ... + (2n - 1) = n²',
    mission: 'Discover why summing the first n consecutive odd numbers always produces a perfect square n² by wrapping successive L-shaped borders (gnomons) around a unit square.',
    steps: [
      {
        title: 'The Seed Square (n = 1)',
        desc: 'Begin with 1 unit square in the top-left corner. Total sum = 1 = 1².',
        formula: '1 = 1²'
      },
      {
        title: 'Second Gnomon (n = 2)',
        desc: 'Add 3 tiles in an L-shape around the seed (1 right, 1 corner, 1 below). We now have a 2×2 square of 4 tiles.',
        formula: '1 + 3 = 4 = 2²'
      },
      {
        title: 'Third Gnomon (n = 3)',
        desc: 'Wrap 5 tiles around the 2×2 square (2 right, 1 corner, 2 below). This expands it into a 3×3 square of 9 tiles.',
        formula: '1 + 3 + 5 = 9 = 3²'
      },
      {
        title: 'General n-th Gnomon (2n - 1)',
        desc: 'To expand an (n-1)×(n-1) square to n×n requires (n-1) tiles on top, (n-1) on the side, plus 1 corner tile: total 2n - 1.',
        formula: 'n² - (n - 1)² = 2n - 1'
      }
    ],
    derivation: [
      { text: 'Difference between consecutive squares:', math: 'n² - (n-1)²' },
      { text: 'Expand the binomial:', math: '= n² - (n² - 2n + 1)' },
      { text: 'Simplify:', math: '= 2n - 1' },
      { text: 'Telescoping sum of differences:', math: '\\sum_{k=1}^n (2k - 1) = \\sum_{k=1}^n [k² - (k-1)²]' },
      { text: 'All middle terms cancel out:', math: '= n² - 0² = n²  ■' }
    ],
    intuition: 'The Pythagoreans termed each L-shaped border a "gnomon" (the carpenter’s square). It demonstrates how discrete arithmetic and continuous geometry mirror each other.',
    quiz: {
      question: 'What is the sum of the first 15 consecutive odd integers (1 + 3 + 5 + ... + 29)?',
      options: ['210', '225', '240', '256'],
      correct: 1,
      explanation: 'Correct! The sum of the first n odd numbers is n². Here n = 15, so 15² = 225.'
    },
    sliders: [
      { id: 'nValue', label: 'Value of n', min: 2, max: 10, val: 6, step: 1 }
    ],
    renderType: 'odd_numbers_gnomon'
  },
  {
    id: 'lesson-08',
    num: '08',
    title: 'Sum of Natural Numbers: Triangular Numbers',
    subtitle: 'Gauss’ proof: 1 + 2 + ... + n = n(n + 1)/2 via staircase rotation',
    category: 'Number Theory',
    formula: '1 + 2 + 3 + ... + n = \\frac{n(n + 1)}{2}',
    mission: 'Prove Carl Friedrich Gauss’ famous summation formula by duplicating a staircase of 1 to n blocks, rotating it 180°, and interlocking them into an n × (n + 1) rectangle.',
    steps: [
      {
        title: 'The Triangular Staircase (1 to n)',
        desc: 'Arrange blocks in columns of heights 1, 2, 3, ..., up to n. The total number of blocks is S = 1 + 2 + ... + n.',
        formula: 'S = 1 + 2 + ... + n'
      },
      {
        title: 'Duplicate the Staircase',
        desc: 'Create an exact clone of the staircase in an amber accent color. It also contains exactly S blocks.',
        formula: 'Clone contains S blocks'
      },
      {
        title: '180° Inversion & Interlocking',
        desc: 'Rotate the duplicate upside down and slide it against the original staircase. The heights (k) and (n + 1 - k) sum to (n + 1) in every single column!',
        formula: 'Every column height = n + 1'
      },
      {
        title: 'The n × (n + 1) Rectangle',
        desc: 'The combined shape is an exact rectangle of width n and height n + 1 containing n(n + 1) blocks. Half belongs to our original staircase.',
        formula: '2S = n(n + 1) \\implies S = \\frac{n(n+1)}{2}'
      }
    ],
    derivation: [
      { text: 'Write the sum forwards:', math: 'S = 1 + 2 + 3 + ... + n' },
      { text: 'Write the sum in reverse order:', math: 'S = n + (n-1) + ... + 1' },
      { text: 'Add both equations term-by-term:', math: '2S = (n+1) + (n+1) + ... + (n+1)' },
      { text: 'There are exactly n identical terms:', math: '2S = n(n + 1)' },
      { text: 'Divide both sides by 2:', math: 'S = \\frac{n(n + 1)}{2}  ■' }
    ],
    intuition: 'Ten-year-old Gauss famously solved 1 + 2 + ... + 100 in seconds by pairing 1+100=101, 2+99=101, ..., up to 50 pairs of 101 = 5050.',
    quiz: {
      question: 'What is the sum of integers from 1 to 20?',
      options: ['190', '200', '210', '220'],
      correct: 2,
      explanation: 'Correct! Using n(n+1)/2 with n = 20: (20 × 21) / 2 = 10 × 21 = 210.'
    },
    sliders: [
      { id: 'nStairs', label: 'Steps (n)', min: 3, max: 12, val: 6, step: 1 }
    ],
    renderType: 'triangular_numbers_staircase'
  },
  {
    id: 'lesson-09',
    num: '09',
    title: 'Algebraic Identity: (a + b)²',
    subtitle: 'Geometric partitioning of a square into a², 2ab, and b²',
    category: 'Algebra',
    formula: '(a + b)² = a² + 2ab + b²',
    mission: 'Visualize why the square of a sum (a+b)² is not simply a² + b², but contains two additional cross-term rectangles of area a × b.',
    steps: [
      {
        title: 'Square of Side Length (a + b)',
        desc: 'Draw a square whose side is divided into two segments of lengths a (cyan) and b (amber). Total side length is (a + b).',
        formula: 'Total Area = (a + b)²'
      },
      {
        title: 'Partition Grid Lines',
        desc: 'Extend the dividing points across both horizontal and vertical directions, segmenting the large square into 4 distinct quadrants.',
        formula: 'Divided into 4 sub-regions'
      },
      {
        title: 'Identify the Four Quadrants',
        desc: 'Top-left is square of side a (area a²). Bottom-right is square of side b (area b²). The top-right and bottom-left are rectangles of dimensions a × b.',
        formula: 'Sub-areas: a², ab, ab, b²'
      },
      {
        title: 'Sum the Sub-Areas',
        desc: 'Summing all four sub-regions gives the total area: a² + ab + ab + b² = a² + 2ab + b².',
        formula: '(a + b)² = a² + 2ab + b²'
      }
    ],
    derivation: [
      { text: 'Total area of outer square:', math: 'A = (a + b) × (a + b)' },
      { text: 'Distribute the first term a:', math: 'a(a + b) = a² + ab' },
      { text: 'Distribute the second term b:', math: 'b(a + b) = ba + b² = ab + b²' },
      { text: 'Combine all terms:', math: 'A = a² + ab + ab + b²' },
      { text: 'Collect like cross-terms:', math: '(a + b)² = a² + 2ab + b²  ■' }
    ],
    intuition: 'The common beginner algebraic mistake of writing (a+b)² = a²+b² (the "freshman’s dream") is visually corrected here: omitting 2ab completely throws away half of the area!',
    quiz: {
      question: 'If a = 10 and b = 3, what is the combined area of the two cross-term rectangles 2ab?',
      options: ['30', '60', '109', '169'],
      correct: 1,
      explanation: 'Correct! Each cross-term rectangle has area a × b = 10 × 3 = 30. The two together have area 2ab = 60.'
    },
    sliders: [
      { id: 'paramA', label: 'Segment a', min: 40, max: 120, val: 80, step: 1 },
      { id: 'paramB', label: 'Segment b', min: 20, max: 80, val: 40, step: 1 }
    ],
    renderType: 'square_of_sum'
  },
  {
    id: 'lesson-10',
    num: '10',
    title: 'Difference of Squares: a² - b²',
    subtitle: 'Dissecting an L-shape into a single rectangle of (a - b) × (a + b)',
    category: 'Algebra',
    formula: 'a² - b² = (a - b)(a + b)',
    mission: 'Prove that removing a small square b² from a large square a² leaves an L-shaped region that can be cut and reassembled into a single rectangle of width (a - b) and length (a + b).',
    steps: [
      {
        title: 'Large Square with Corner Cutout',
        desc: 'Start with a square of side a (area a²). Excise a small square of side b from the bottom-right corner (area b²).',
        formula: 'Remaining Area = a² - b²'
      },
      {
        title: 'The L-Shaped Remainder',
        desc: 'The remaining shape is an L-region with outer dimensions a, notch dimensions b, and inner thicknesses (a - b).',
        formula: 'Thickness = a - b'
      },
      {
        title: 'Horizontal Dissection Cut',
        desc: 'Cut the L-shape into two rectangles along the horizontal boundary: Rectangle 1 of size (a - b) × a, and Rectangle 2 of size (a - b) × b.',
        formula: 'Both share common width (a - b)'
      },
      {
        title: 'Rotation & Reassembly',
        desc: 'Rotate Rectangle 2 by 90° and dock it against the end of Rectangle 1. Together they form a single seamless rectangle of dimensions (a - b) × (a + b).',
        formula: 'Area = (a - b)(a + b)'
      }
    ],
    derivation: [
      { text: 'Area of large square:', math: 'A_1 = a²' },
      { text: 'Area of removed small square:', math: 'A_2 = b²' },
      { text: 'Remaining L-shaped area:', math: 'A = a² - b²' },
      { text: 'Decomposed into two rectangles of height (a - b):', math: 'A = (a - b)a + (a - b)b' },
      { text: 'Factor out the common factor (a - b):', math: 'a² - b² = (a - b)(a + b)  ■' }
    ],
    intuition: 'This factorization is invaluable for mental arithmetic: computing 53 × 47 is just (50 + 3)(50 - 3) = 50² - 3² = 2500 - 9 = 2491!',
    quiz: {
      question: 'Calculate 102² - 98² using the difference of squares identity:',
      options: ['400', '800', '1600', '10000'],
      correct: 1,
      explanation: 'Correct! a² - b² = (a - b)(a + b) = (102 - 98)(102 + 98) = 4 × 200 = 800.'
    },
    sliders: [
      { id: 'sideA', label: 'Outer Side a', min: 70, max: 130, val: 100, step: 1 },
      { id: 'sideB', label: 'Cutout Side b', min: 20, max: 60, val: 40, step: 1 }
    ],
    renderType: 'difference_of_squares'
  }
];
