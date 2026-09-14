// student_pedagogy.js - Comprehensive Pedagogical Data Layer for all 32 Lessons
// Provides real-world metaphors, historical context, student misconceptions/pitfalls,
// stage-by-stage spoken cues, and sandbox calculation configurations.

export const LESSON_PEDAGOGY = {
  'lesson-01': {
    metaphor: 'Like reorganizing furniture in a room: two identical square rooms have four identical triangular sofas arranged differently. The remaining floor space must be equal in both rooms!',
    history: 'Recorded in the Zhoubi Suanjing (c. 1046–256 BCE) in ancient China and independently formulated by Pythagoras of Samos in Magna Graecia.',
    pitfall: 'Don’t confuse side lengths with areas! The theorem states that the AREAS of the squares sum up, not the lengths of the edges (a + b ≠ c).',
    cues: [
      'Stage 1: A square frame of side (a + b) containing four identical right triangles and a tilted inner square c².',
      'Stage 2: Slide two triangles across the frame to regroup into two rectangular pairs.',
      'Stage 3: The empty space divides cleanly into two standalone squares of areas a² and b².',
      'Stage 4: Because the overall outer frame never changed area, the empty space c² must equal a² + b².'
    ],
    sandbox: { type: 'pythagoras', labelA: 'Leg a', labelB: 'Leg b', defaultA: 3, defaultB: 4 }
  },
  'lesson-02': {
    metaphor: 'Unrolling a roll of tape or peeling an onion: unroll every concentric ring of radius r from the center outward to lay them down as horizontal strips, forming a right triangle of base 2πr and height r.',
    history: 'Archimedes of Syracuse proved this in "Measurement of a Circle" (c. 250 BCE) using the method of exhaustion with inscribed and circumscribed 96-sided polygons.',
    pitfall: 'Students often wonder why the curved circle turns into straight triangle edges. In the limit of infinitesimally thin rings, the curvature vanishes!',
    cues: [
      'Stage 1: A circle of radius r sliced into alternating interlocking pie sectors.',
      'Stage 2: Unfold the sectors into a comb-like zig-zag pattern alternating top and bottom.',
      'Stage 3: Slide the two halves together to form a near-parallelogram of base πr and height r.',
      'Stage 4: In the infinite limit, the wavy boundary becomes perfectly flat: Area = base × height = πr × r = πr².'
    ],
    sandbox: { type: 'circle', labelA: 'Radius r', labelB: 'None', defaultA: 5, defaultB: 0 }
  },
  'lesson-03': {
    metaphor: 'Tearing the three corners off a paper triangle and butting them together along a straight ruler edge: they form an unbroken half-turn (a straight line)!',
    history: 'Found in Euclid’s Elements, Book I, Proposition 32, using a parallel line drawn through one vertex.',
    pitfall: 'This theorem is only true on a flat Euclidean plane. On a curved sphere (like the Earth), triangle angles always sum to MORE than 180°!',
    cues: [
      'Stage 1: Triangle ABC with interior angles α, β, and γ color-coded.',
      'Stage 2: Draw a line parallel to base BC passing through vertex A.',
      'Stage 3: Using alternate interior angles, angle β maps to the left of vertex A, and angle γ maps to the right.',
      'Stage 4: Angles α, β, and γ sit adjacent along the straight line, forming 180°.'
    ],
    sandbox: { type: 'triangle_angles', labelA: 'Angle α (°)', labelB: 'Angle β (°)', defaultA: 65, defaultB: 45 }
  },
  'lesson-04': {
    metaphor: 'Folding a rectangular sheet of paper along its diagonal: cutting the rectangle in half creates two identical right triangles, so each triangle has exactly half the rectangle’s area.',
    history: 'Used by ancient Egyptian and Mesopotamian surveyors (rope-stretchers) to calculate field boundaries after Nile floods.',
    pitfall: 'Remember that "height" must be measured perpendicular to the base, NOT along the slanted side of the triangle!',
    cues: [
      'Stage 1: A generic triangle with base b and perpendicular height h.',
      'Stage 2: Clone the triangle, rotate it 180 degrees, and attach it to form a parallelogram.',
      'Stage 3: Shear or slice the protruding triangular ear of the parallelogram and shift it to the other side to make a rectangle of area b × h.',
      'Stage 4: Because the original triangle is exactly half of this rectangle, its area is ½ × b × h.'
    ],
    sandbox: { type: 'triangle_area', labelA: 'Base b', labelB: 'Height h', defaultA: 8, defaultB: 5 }
  },
  'lesson-05': {
    metaphor: 'A deck of playing cards pushed sideways: whether the deck stands straight or is slanted into a leaning tower, every individual card keeps its area, so total area is identical!',
    history: 'Bonaventura Cavalieri formulated this principle of indivisibles in 1635, forming a crucial bridge between Euclidean geometry and integral calculus.',
    pitfall: 'Students frequently mistake the slanted edge length for height. Shearing increases the perimeter, but the perpendicular distance between top and bottom stays constant.',
    cues: [
      'Stage 1: A parallelogram with base b and height h.',
      'Stage 2: Drop an altitude from the top-left vertex to cut off a right triangle.',
      'Stage 3: Translate that right triangle across the figure to attach to the opposite slanted edge.',
      'Stage 4: The transformed figure is an exact rectangle with base b and height h. Area = b × h.'
    ],
    sandbox: { type: 'parallelogram', labelA: 'Base b', labelB: 'Height h', defaultA: 7, defaultB: 4 }
  },
  'lesson-06': {
    metaphor: 'A rectangular garden partitioned into four plots: a tomato bed (a × a), a potato bed (b × b), and two identical lettuce beds (a × b).',
    history: 'Geometric algebra practiced by the Babylonians and formalized in Euclid’s Elements, Book II, Proposition 4.',
    pitfall: 'The "Freshman’s Dream" trap: writing (a + b)² = a² + b². Never forget the two rectangular cross-terms (2ab)!',
    cues: [
      'Stage 1: A large square of side length (a + b).',
      'Stage 2: Subdivide the sides at distance a, creating four interior quadrilaterals.',
      'Stage 3: Identify the pieces: one square of a², one square of b², and two rectangles each of area a × b.',
      'Stage 4: Summing the components: (a + b)² = a² + 2ab + b².'
    ],
    sandbox: { type: 'binomial', labelA: 'Length a', labelB: 'Length b', defaultA: 5, defaultB: 3 }
  },
  'lesson-07': {
    metaphor: 'L-shaped carpenter’s framing squares (gnomons): wrapping an L-shaped band of 3 tiles around 1 gives 4 (2²); wrapping 5 tiles gives 9 (3²); wrapping 7 gives 16 (4²).',
    history: 'Discovered by the ancient Pythagoreans (c. 500 BCE) using pebbles arranged in sand, known as "pebble arithmetic".',
    pitfall: 'Counting terms vs value of the term: the nth odd number is 2n - 1, while the sum of the first n odd numbers is n².',
    cues: [
      'Stage 1: Start with a single tile (1 = 1²).',
      'Stage 2: Add an L-shaped corner border of 3 tiles to make a 2 × 2 square (1 + 3 = 4 = 2²).',
      'Stage 3: Add another L-shaped border of 5 tiles to make a 3 × 3 square (1 + 3 + 5 = 9 = 3²).',
      'Stage 4: Repeating for n layers proves that the sum of the first n odd numbers is always n².'
    ],
    sandbox: { type: 'odd_sum', labelA: 'Number of terms n', labelB: 'None', defaultA: 6, defaultB: 0 }
  },
  'lesson-08': {
    metaphor: 'A staircase of wooden blocks: take two identical staircases of height n and slot them upside-down into each other like interlocking puzzle teeth to make an n × (n + 1) rectangle!',
    history: 'Famously summed by a 10-year-old Carl Friedrich Gauss in 1787 by pairing 1 + 100 = 101, 2 + 99 = 101, ..., 50 + 51 = 101.',
    pitfall: 'Dividing by 2 at the wrong time: remember that the rectangle contains TWO staircases, so you must divide by 2 at the end.',
    cues: [
      'Stage 1: A staircase triangular grid representing 1 + 2 + 3 + ... + n.',
      'Stage 2: Duplicate the staircase in a contrasting color.',
      'Stage 3: Rotate the duplicate 180 degrees and interlock it with the first staircase.',
      'Stage 4: The combined shape is an n × (n + 1) rectangle. Since it holds two copies, the sum is n(n + 1) / 2.'
    ],
    sandbox: { type: 'natural_sum', labelA: 'Number of terms n', labelB: 'None', defaultA: 7, defaultB: 0 }
  },
  'lesson-09': {
    metaphor: 'Cutting a wedge of lemon: the circular arc along the peel is directly proportional to how wide you open your knife at the center (the angle θ).',
    history: 'Developed by Hipparchus and Ptolemy for celestial navigation and trigonometry in the Almagest.',
    pitfall: 'Using degrees instead of radians! The elegant formula s = rθ ONLY works when angle θ is measured in radians.',
    cues: [
      'Stage 1: A circle with radius r and an angle θ subtending an arc length s.',
      'Stage 2: Vary the angle from 0 to 2π radians and track the proportion of the circumference.',
      'Stage 3: When θ = 1 radian, arc length s equals exactly the radius r by definition.',
      'Stage 4: For any angle θ, arc length s = rθ, and sector area is ½ r² θ.'
    ],
    sandbox: { type: 'circle_arc', labelA: 'Radius r', labelB: 'Angle θ (rad)', defaultA: 6, defaultB: 1.5 }
  },
  'lesson-10': {
    metaphor: 'A seesaw balanced at its fulcrum: if a heavy child sits close and a light child sits far, weight × distance balances out. Similarly, the centroid is the unique balance point where all medians meet.',
    history: 'Archimedes established the center of gravity of triangles in "On the Equilibrium of Planes" (c. 250 BCE).',
    pitfall: 'Thinking medians bisect angles: medians bisect the OPPOSITE SIDES, not the vertex angles (unless the triangle is equilateral).',
    cues: [
      'Stage 1: Triangle ABC with midpoints marked on each of the three sides.',
      'Stage 2: Draw the three medians connecting each vertex to the opposite side midpoint.',
      'Stage 3: All three lines intersect concurrently at a single point G (the centroid).',
      'Stage 4: The centroid partitions every median in an exact 2:1 ratio from vertex to base.'
    ],
    sandbox: { type: 'generic', labelA: 'Base Scale', labelB: 'Skew', defaultA: 10, defaultB: 2 }
  },
  'lesson-11': {
    metaphor: 'Eating half of a chocolate bar, then half of what remains, then half again: no matter how long you keep eating halves, you can never eat more than 1 whole chocolate bar!',
    history: 'Zeno of Elea proposed the paradox of Achilles and the tortoise (c. 450 BCE); geometric series resolved it by showing infinite parts converge to a finite sum.',
    pitfall: 'Assuming infinite terms must blow up to infinity. When the ratio |r| &lt; 1, each term shrinks fast enough for the total sum to stay strictly finite.',
    cues: [
      'Stage 1: A 1 × 1 unit square of total area 1.',
      'Stage 2: Divide the square vertically and color the left half (area ½). Remaining uncolored is ½.',
      'Stage 3: Bisect the remainder horizontally (¼), then vertically (⅛), then horizontally (1/16).',
      'Stage 4: As k → ∞, the shaded slivers pack the entire unit square with 0 gap: ½ + ¼ + ⅛ + ... = 1.'
    ],
    sandbox: { type: 'series', labelA: 'Common ratio r', labelB: 'First term a', defaultA: 0.5, defaultB: 0.5 }
  },
  'lesson-12': {
    metaphor: 'Perigal’s sliding puzzle: cut the larger square into 4 congruent quadrilaterals by lines parallel and perpendicular to the hypotenuse. They assemble around the smaller square to tile c² perfectly!',
    history: 'Discovered in 1873 by Henry Perigal, a London stockbroker who had the dissection diagram carved onto his tombstone.',
    pitfall: 'Believing dissection proofs only work for special 3-4-5 triangles. Perigal’s dissection works for EVERY right triangle regardless of leg lengths.',
    cues: [
      'Stage 1: A right triangle with squares erected on legs a and b, and hypotenuse c.',
      'Stage 2: Cut square b into 4 congruent quadrilaterals by two orthogonal cuts passing through its center.',
      'Stage 3: Translate square a and the four quadrilaterals across into the hypotenuse square c².',
      'Stage 4: The 5 pieces fit with zero gap and zero overlap, proving a² + b² = c².'
    ],
    sandbox: { type: 'pythagoras', labelA: 'Leg a', labelB: 'Leg b', defaultA: 4, defaultB: 3 }
  },
  'lesson-13': {
    metaphor: 'Slicing a pepperoni pizza: unroll the triangular slices side-by-side in alternating directions to make a scalloped rectangle of height equal to apothem a and base equal to half the perimeter (p/2).',
    history: 'Used by Archimedes and Islamic mathematicians like Al-Biruni to approximate π to incredible precision.',
    pitfall: 'Confusing apothem with radius: the apothem is perpendicular to the side; the radius connects the center to a vertex.',
    cues: [
      'Stage 1: A regular n-sided polygon partitioned into n congruent isosceles triangles from its center.',
      'Stage 2: Unfold the n triangles along a baseline.',
      'Stage 3: Invert alternating triangles to interlock them into a near-parallelogram.',
      'Stage 4: The base is half the perimeter (p/2) and the height is the apothem a: Area = ½ × a × p.'
    ],
    sandbox: { type: 'polygon', labelA: 'Sides n', labelB: 'Radius r', defaultA: 6, defaultB: 5 }
  },
  'lesson-14': {
    metaphor: 'A square sheet of cookie dough with a smaller square cut out of the corner: slice the remaining L-shaped border into two strips and butt them together into one long rectangle!',
    history: 'A foundational identity in Babylonian algebra and Euclid’s Elements, Book II, Proposition 5.',
    pitfall: 'Writing a² - b² = (a - b)². Notice that (a - b)² is missing the cross terms, while (a - b)(a + b) correctly yields a² - b².',
    cues: [
      'Stage 1: A square of area a² with a corner square of area b² removed.',
      'Stage 2: The remaining L-shaped region has area a² - b².',
      'Stage 3: Make a straight cut from the inner corner to divide the L into two rectangles: (a - b) × a and (a - b) × b.',
      'Stage 4: Rotate and align the two strips end-to-end to form one rectangle of dimensions (a - b) × (a + b).'
    ],
    sandbox: { type: 'diff_squares', labelA: 'Length a', labelB: 'Length b', defaultA: 6, defaultB: 2 }
  },
  'lesson-15': {
    metaphor: 'Living in an equilateral triangular park: no matter where your picnic blanket is placed inside the park, the sum of the shortest walking distances to the three boundary fences is always the same!',
    history: 'Discovered in 1659 by Italian mathematician Vincenzo Viviani, a devoted pupil of Galileo Galilei.',
    pitfall: 'Assuming Viviani’s property holds for all triangles: it only holds if the triangle is equilateral (equal sides).',
    cues: [
      'Stage 1: An equilateral triangle ABC of side s and altitude h, with an interior point P.',
      'Stage 2: Draw perpendiculars d₁, d₂, and d₃ from P to the three sides.',
      'Stage 3: Connect P to vertices A, B, and C to partition the triangle into three sub-triangles of areas ½ s d₁, ½ s d₂, and ½ s d₃.',
      'Stage 4: The sum of sub-triangle areas equals total area: ½ s(d₁ + d₂ + d₃) = ½ s h, so d₁ + d₂ + d₃ = h.'
    ],
    sandbox: { type: 'viviani', labelA: 'Altitude h', labelB: 'Point X', defaultA: 10, defaultB: 3 }
  },
  'lesson-16': {
    metaphor: 'Taking a 50% shortcut across a mountain peak: connecting the halfway marks on two hiking trails creates a path that runs exactly parallel to the valley floor and measures half the valley length.',
    history: 'Euclid’s Elements, Book VI, Proposition 2 on similar triangles.',
    pitfall: 'Assuming the area of the top triangle is half of the total triangle: its area is actually (½)² = ¼ of the total area!',
    cues: [
      'Stage 1: Triangle ABC with midpoints D and E marked on sides AB and AC.',
      'Stage 2: Connect midpoints D and E with segment DE.',
      'Stage 3: Because AD/AB = AE/AC = ½ and angle A is shared, triangle ADE is similar to triangle ABC with scale factor ½.',
      'Stage 4: Therefore segment DE is parallel to BC and its length is exactly ½ BC.'
    ],
    sandbox: { type: 'generic', labelA: 'Base Length', labelB: 'Altitude', defaultA: 8, defaultB: 5 }
  },
  'lesson-17': {
    metaphor: 'Building a triangular brick pyramid: clone the pyramid, flip it upside down, and lock the two pyramids together into a rectangle with n rows and n + 1 columns.',
    history: 'Recorded in the ancient Indian mathematics text "Aryabhatiya" (499 CE) by Aryabhata.',
    pitfall: 'Forgetting to divide by 2 when computing the sum of an arithmetic progression.',
    cues: [
      'Stage 1: A triangular staircase array representing 1 + 2 + 3 + ... + n.',
      'Stage 2: Clone the staircase in another color and rotate 180 degrees.',
      'Stage 3: Fit the two staircases together into an n × (n + 1) rectangle.',
      'Stage 4: Total blocks in rectangle = n(n + 1). Half of them belong to the original sum: S = n(n + 1) / 2.'
    ],
    sandbox: { type: 'natural_sum', labelA: 'n terms', labelB: 'None', defaultA: 8, defaultB: 0 }
  },
  'lesson-18': {
    metaphor: 'A trapezoid and its upside-down twin: glue two identical trapezoids together along their slanted side to make one large parallelogram of base (a + b) and height h!',
    history: 'Known to Babylonian builders and codified in Heron of Alexandria’s "Metrica" (c. 60 CE).',
    pitfall: 'Averaging the slanted sides instead of the parallel bases: the area depends on the parallel bases a and b, not the slanted legs.',
    cues: [
      'Stage 1: A trapezoid with parallel bases a (top) and b (bottom) and height h.',
      'Stage 2: Duplicate the trapezoid and rotate the clone 180 degrees.',
      'Stage 3: Join the two trapezoids along their matching slanted edge to form a single parallelogram.',
      'Stage 4: The parallelogram has base (a + b) and height h, so its area is (a + b)h. Each trapezoid has area ½(a + b)h.'
    ],
    sandbox: { type: 'trapezoid', labelA: 'Top base a', labelB: 'Bottom base b', defaultA: 4, defaultB: 8 }
  },
  'lesson-19': {
    metaphor: 'Four points pinned to a hoop: Ptolemy’s theorem says that for any four points on a circle, the product of the cross diagonals equals the sum of the products of opposite sides.',
    history: 'Formulated by Claudius Ptolemy in the Almagest (c. 150 CE) to construct his table of chords (early trigonometry).',
    pitfall: 'Ptolemy’s EQUALITY only holds for CYCLIC quadrilaterals (all four vertices on a circle). For non-cyclic quadrilaterals, ac + bd > ef (Ptolemy’s Inequality).',
    cues: [
      'Stage 1: A cyclic quadrilateral with vertices A, B, C, D on a circle and opposite sides a, c and b, d.',
      'Stage 2: Draw the two diagonals e = AC and f = BD.',
      'Stage 3: Construct similar triangles by projecting chords from the circle boundary.',
      'Stage 4: Multiplying corresponding proportions yields ac + bd = ef.'
    ],
    sandbox: { type: 'generic', labelA: 'Circle Radius', labelB: 'Chord Offset', defaultA: 7, defaultB: 2 }
  },
  'lesson-20': {
    metaphor: 'A spotlight at the edge of a stage versus a spotlight at the center: the central spotlight spreads across twice the angle of the spotlight on the edge of the circle.',
    history: 'Euclid’s Elements, Book III, Proposition 20.',
    pitfall: 'Moving the inscribed angle vertex outside or inside the circle: the vertex MUST lie exactly on the circle circumference for the 2:1 ratio to hold.',
    cues: [
      'Stage 1: A circle with center O and an inscribed angle subtended by arc AB with vertex P on the circle.',
      'Stage 2: Draw the central angle subtended by the same arc AB with vertex at center O.',
      'Stage 3: Draw diameter line from P through center O to create two isosceles triangles with radiuses.',
      'Stage 4: The exterior angle of each triangle is twice its base angle, proving Central Angle = 2 × Inscribed Angle.'
    ],
    sandbox: { type: 'inscribed_angle', labelA: 'Arc span (°)', labelB: 'Position', defaultA: 80, defaultB: 0 }
  },
  'lesson-21': {
    metaphor: 'Stretching a rubber circular balloon: pull a circle of radius 1 along the x-axis by a factor of a and along the y-axis by a factor of b. Area scales linearly by a × b, turning π into πab!',
    history: 'Archimedes demonstrated this in "On Conoids and Spheroids" using Cavalieri-style indivisibles.',
    pitfall: 'Using the ellipse perimeter formula: while area is simply πab, the perimeter of an ellipse is an elliptic integral with no simple elementary formula!',
    cues: [
      'Stage 1: A unit circle of radius 1 and area π.',
      'Stage 2: Uniformly stretch the horizontal axis by factor a (area becomes πa).',
      'Stage 3: Uniformly stretch the vertical axis by factor b.',
      'Stage 4: By Cavalieri’s principle of linear scaling, every vertical cross-section scales by b: Area = πab.'
    ],
    sandbox: { type: 'ellipse', labelA: 'Semi-major a', labelB: 'Semi-minor b', defaultA: 5, defaultB: 3 }
  },
  'lesson-22': {
    metaphor: 'Looking at a diameter from anywhere along the rim of a coin: anywhere you stand on the semicircle rim, your field of view between the two diameter ends is always an exact 90° right angle.',
    history: 'Attributed to Thales of Miletus (c. 624–546 BCE), who sacrificed an ox in celebration when he proved it.',
    pitfall: 'Remember that the opposite hypotenuse must be an exact diameter passing through the circle’s center.',
    cues: [
      'Stage 1: A circle with diameter AB passing through center O, and any point P on the circumference.',
      'Stage 2: Connect line segments PA, PB, and radius PO.',
      'Stage 3: Triangles POA and POB are isosceles because OA = OB = OP = radius.',
      'Stage 4: The sum of angles in triangle APB is 2α + 2β = 180°, therefore α + β = 90°.'
    ],
    sandbox: { type: 'thales', labelA: 'Point P Angle (°)', labelB: 'None', defaultA: 45, defaultB: 0 }
  },
  'lesson-23': {
    metaphor: 'Driving a car around any closed polygon: every time you hit a corner, you turn through the exterior angle. Once you make a full loop and return home, your car has turned exactly 360°!',
    history: 'A foundational principle of turtle geometry and Gauss-Bonnet theorem in differential geometry.',
    pitfall: 'Confusing exterior angles with interior angles: the sum of interior angles grows with sides (n - 2) × 180°, but exterior angles ALWAYS sum to 360° regardless of n!',
    cues: [
      'Stage 1: An arbitrary convex polygon with exterior angles extended at each vertex.',
      'Stage 2: Translate the exterior angle vectors inward toward a single origin point.',
      'Stage 3: Notice that the angle rays meet with zero gap and zero overlap.',
      'Stage 4: The rays fan out to complete one full revolution of 360 degrees.'
    ],
    sandbox: { type: 'exterior_angles', labelA: 'Number of vertices n', labelB: 'None', defaultA: 5, defaultB: 0 }
  },
  'lesson-24': {
    metaphor: 'Leonardo da Vinci’s rotation proof: join two identical copies of a right triangle to squares a² and b² to form a hexagon. Rotate one triangle to form an identical hexagon with square c²!',
    history: 'Drawn by Leonardo da Vinci in his notebooks around 1500, celebrated for its exquisite symmetry.',
    pitfall: 'Students often overlook the symmetry: both hexagons have two axes of symmetry and identical area, so subtracting the two triangles leaves a² + b² = c².',
    cues: [
      'Stage 1: Right triangle with squares a² and b² and a duplicate triangle forming a 6-sided polygon.',
      'Stage 2: Draw the line of bilateral symmetry splitting the hexagon into two congruent halves.',
      'Stage 3: Rearrange the components with square c² and the two triangles into an identical hexagon.',
      'Stage 4: Since both hexagons have equal area, removing the two shared triangles proves a² + b² = c².'
    ],
    sandbox: { type: 'pythagoras', labelA: 'Leg a', labelB: 'Leg b', defaultA: 3, defaultB: 4 }
  },
  'lesson-25': {
    metaphor: 'A TV screen with aspect ratio p:h matching h:q: the geometric mean height h satisfies h/p = q/h, so the square on the altitude h² equals the rectangle p × q.',
    history: 'Euclid’s Elements, Book VI, Proposition 8 (Altitude Theorem).',
    pitfall: 'Don’t confuse geometric mean with arithmetic mean! The arithmetic mean is (p + q)/2; the geometric mean is √(pq).',
    cues: [
      'Stage 1: A right triangle with altitude h dropped from the right angle to hypotenuse segments p and q.',
      'Stage 2: Altitude h splits the triangle into two smaller right triangles that are both similar to the original.',
      'Stage 3: Setting up the ratio of corresponding legs: h / p = q / h.',
      'Stage 4: Cross-multiplying yields h² = p × q, meaning h is the geometric mean √(pq).'
    ],
    sandbox: { type: 'geometric_mean', labelA: 'Segment p', labelB: 'Segment q', defaultA: 4, defaultB: 9 }
  },
  'lesson-26': {
    metaphor: 'Heron’s formula elevated to four sides: just as Heron calculates triangle area from semiperimeter s, Brahmagupta calculates cyclic quadrilateral area as √((s-a)(s-b)(s-c)(s-d)).',
    history: 'Discovered in 628 CE by Indian mathematician and astronomer Brahmagupta in the "Brahmasphutasiddhanta".',
    pitfall: 'Brahmagupta’s formula ONLY works if the quadrilateral can be inscribed in a circle (cyclic).',
    cues: [
      'Stage 1: A cyclic quadrilateral with side lengths a, b, c, d and semiperimeter s = (a+b+c+d)/2.',
      'Stage 2: Draw diagonal and decompose into two triangles.',
      'Stage 3: Express area using sine and cosine rules with opposite angles summing to 180°.',
      'Stage 4: Simplifying yields Brahmagupta’s formula: Area = √((s-a)(s-b)(s-c)(s-d)).'
    ],
    sandbox: { type: 'generic', labelA: 'Radius', labelB: 'Side Variation', defaultA: 8, defaultB: 2 }
  },
  'lesson-27': {
    metaphor: 'Three laser pointers shining from the three corners of a triangular room: the three beams meet at a single common focal point if and only if their edge segment ratios multiply to 1.',
    history: 'Published by Italian mathematician Giovanni Ceva in 1678 in "De lineis rectis".',
    pitfall: 'Multiplying the wrong segments: follow the perimeter cyclically in ONE direction: (AF/FB) × (BD/DC) × (CE/EA) = 1.',
    cues: [
      'Stage 1: Triangle ABC with cevians AD, BE, and CF drawn from vertices to opposite sides.',
      'Stage 2: Measure edge segments AF, FB, BD, DC, CE, and EA.',
      'Stage 3: Apply the ratio of triangle areas sharing common altitudes.',
      'Stage 4: When all three cevians intersect at point P, (AF/FB) × (BD/DC) × (CE/EA) = 1.'
    ],
    sandbox: { type: 'generic', labelA: 'Point X', labelB: 'Point Y', defaultA: 5, defaultB: 5 }
  },
  'lesson-28': {
    metaphor: 'A shoemaker’s knife (arbelos): within the crescent region between three mutually tangent semicircles, the two twin circles nestled on either side of the dividing vertical line are IDENTICAL in size!',
    history: 'First studied by Archimedes in the Book of Lemmas (c. 250 BCE); the twin circles were later named Archimedean twin circles.',
    pitfall: 'Assuming the two twin circles have different sizes because one side of the arbelos is wider than the other: their radii are strictly equal regardless of the dividing ratio!',
    cues: [
      'Stage 1: An outer semicircle of diameter AB with an interior point C dividing it into two smaller semicircles.',
      'Stage 2: Erect a perpendicular line at C up to the outer semicircle.',
      'Stage 3: Inscribe the two twin circles, each tangent to the dividing line and two of the semicircles.',
      'Stage 4: Both circles have radius r = (r₁r₂) / (r₁ + r₂), proving they are congruent twins.'
    ],
    sandbox: { type: 'arbelos', labelA: 'Radius r₁', labelB: 'Radius r₂', defaultA: 3, defaultB: 5 }
  },
  'lesson-29': {
    metaphor: 'Two ladders propped between two buildings: a tall ladder and a short ladder cross each other in mid-air. The height of their crossing point depends ONLY on the ladder heights, not on how far apart the buildings are!',
    history: 'A classical problem in recreational mathematics and electrical parallel resistance (1/R = 1/R₁ + 1/R₂).',
    pitfall: 'Thinking that moving the walls further apart changes the crossing height: the crossing height h is independent of building separation d!',
    cues: [
      'Stage 1: Two vertical walls of heights a and b separated by distance d.',
      'Stage 2: Draw diagonal crossing lines from the top of each wall to the base of the other.',
      'Stage 3: Using similar triangles, the crossing height h satisfies h/a + h/b = 1.',
      'Stage 4: Therefore h = (ab) / (a + b), which is half the harmonic mean of a and b.'
    ],
    sandbox: { type: 'ladders', labelA: 'Height a', labelB: 'Height b', defaultA: 6, defaultB: 3 }
  },
  'lesson-30': {
    metaphor: 'Blowing air into a 3D polyhedral cage like an inflatable beach ball: whether you inflate a cube, a pyramid, or an icosahedron, the count of Vertices - Edges + Faces is always 2!',
    history: 'Discovered by Leonhard Euler in 1752, laying the cornerstone of modern topology.',
    pitfall: 'Euler’s formula V - E + F = 2 applies to convex polyhedra without donut holes. A polyhedron with 1 hole (torus) has V - E + F = 0.',
    cues: [
      'Stage 1: A 3D polyhedron (e.g. cube: V=8, E=12, F=6).',
      'Stage 2: Project its vertices and edges onto a 2D planar Schlegel diagram.',
      'Stage 3: Sequentially remove faces and edges, noting that V - E + F stays invariant at each step.',
      'Stage 4: Reduce to a single tree: V - E + F = 2 holds universally for all spherical polyhedra.'
    ],
    sandbox: { type: 'euler', labelA: 'Shape Type', labelB: 'None', defaultA: 1, defaultB: 0 }
  },
  'lesson-31': {
    metaphor: 'The regular pentagram star: every diagonal cuts every intersecting diagonal in the Divine Proportion φ ≈ 1.6180339..., nesting an infinite sequence of self-similar smaller stars!',
    history: 'The pentagram was the official emblem of the Pythagorean brotherhood (c. 500 BCE) who swore oaths on its mathematical harmony.',
    pitfall: 'Confusing the diagonal ratio with the side ratio: the diagonal d relates to side s by d = φ × s, where φ = (1 + √5)/2.',
    cues: [
      'Stage 1: A regular pentagon of side s with all 5 diagonals drawn to form a pentagram star.',
      'Stage 2: Identify the isosceles golden triangles with angles 72°, 72°, and 36°.',
      'Stage 3: Notice the smaller inverted pentagon created in the center by the intersecting diagonals.',
      'Stage 4: By similar triangles, diagonal / side = φ = (1 + √5) / 2 ≈ 1.618.'
    ],
    sandbox: { type: 'golden_ratio', labelA: 'Scale', labelB: 'None', defaultA: 10, defaultB: 0 }
  },
  'lesson-32': {
    metaphor: 'String art between two straight rods: pick three pegs on one rod and three pegs on the other. Draw criss-cross strings between them. The three string crossing points will ALWAYS fall onto a single straight line!',
    history: 'Formulated by Pappus of Alexandria in his "Synagoge" (c. 340 CE), founding the discipline of projective geometry.',
    pitfall: 'Assuming the two lines must be parallel: Pappus’s theorem holds whether the two initial lines are parallel or intersecting!',
    cues: [
      'Stage 1: Two lines with points A, B, C on line 1 and points D, E, F on line 2.',
      'Stage 2: Draw criss-cross segments: AE and BD meeting at X; AF and CD meeting at Y; BF and CE meeting at Z.',
      'Stage 3: Observe points X, Y, and Z as the points on the lines move.',
      'Stage 4: Points X, Y, and Z remain strictly collinear, forming Pappus’s line.'
    ],
    sandbox: { type: 'generic', labelA: 'Line Tilt', labelB: 'Spacing', defaultA: 8, defaultB: 4 }
  }
};

export function getLessonPedagogy(lessonId, lesson) {
  if (LESSON_PEDAGOGY[lessonId]) {
    return LESSON_PEDAGOGY[lessonId];
  }

  const title = lesson ? lesson.title : 'Mathematical Invariant';
  const formula = lesson ? lesson.formula : 'Topological Conservation';

  return {
    metaphor: `Physical conservation in geometry: as components deform or rearrange, core invariants such as total area, perimeter projections, or volume remain strictly constant.`,
    history: `A classical cornerstone of mathematical thought, translating abstract algebraic statements into concrete visual intuition.`,
    pitfall: `Never judge area or invariant properties purely by visual shape changes. Continuous rigid transformations guarantee exact equality.`,
    cues: [
      `Stage 1: Initial configuration — inspect baseline geometric entities defining ${formula}.`,
      `Stage 2: Action phase — observe continuous deformation or rotation as the transformation progresses.`,
      `Stage 3: Intermediate alignment — notice how components pack and maintain conserved boundaries without loss.`,
      `Stage 4: Final invariant proof — the pieces fully align, confirming that ${formula} holds strictly.`
    ],
    sandbox: { type: 'generic', labelA: 'Scale', labelB: 'Param', defaultA: 10, defaultB: 5 }
  };
}
