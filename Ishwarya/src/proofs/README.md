# Maths Universe — Separated Proofs Structure

Each visual proof is maintained in its own dedicated, self-contained directory with pure math calculations, state reducers, UI components, styles, completion evaluators, and unit tests:

```
src/proofs/
├── 068-integration-by-parts/
│   ├── IntegrationByPartsVisualProofPage.tsx
│   ├── IntegrationByPartsVisualProofPage.module.css
│   ├── integration-by-parts-visual-proofConfig.ts
│   ├── integration-by-parts-visual-proofMath.ts
│   ├── integration-by-parts-visual-proofReducer.ts
│   ├── integration-by-parts-visual-proofCompletion.ts
│   └── integration-by-parts-visual-proof.test.ts
│
├── 073-even-odd-pairing/
│   ├── EvenOddPairingProofPage.tsx
│   ├── EvenOddPairingProofPage.module.css
│   ├── even-odd-pairingConfig.ts
│   ├── even-odd-pairingMath.ts
│   ├── even-odd-pairingReducer.ts
│   ├── even-odd-pairingCompletion.ts
│   └── even-odd-pairing.test.ts
│
├── 105-matrix-addition-cell-by-cell/
│   ├── MatrixAdditionCellByCellProofPage.tsx
│   ├── MatrixAdditionCellByCellProofPage.module.css
│   ├── matrix-addition-cell-by-cellConfig.ts
│   ├── matrix-addition-cell-by-cellMath.ts
│   ├── matrix-addition-cell-by-cellReducer.ts
│   ├── matrix-addition-cell-by-cellCompletion.ts
│   └── matrix-addition-cell-by-cell.test.ts
│
├── 106-matrix-multiplication-row-column/
│   ├── MatrixMultiplicationRowColumnProofPage.tsx
│   ├── MatrixMultiplicationRowColumnProofPage.module.css
│   ├── matrix-multiplication-row-columnConfig.ts
│   ├── matrix-multiplication-row-columnMath.ts
│   ├── matrix-multiplication-row-columnReducer.ts
│   ├── matrix-multiplication-row-columnCompletion.ts
│   └── matrix-multiplication-row-column.test.ts
│
├── 107-matrix-linear-transformation-grid/
│   ├── MatrixLinearTransformationGridProofPage.tsx
│   ├── MatrixLinearTransformationGridProofPage.module.css
│   ├── matrix-linear-transformation-gridConfig.ts
│   ├── matrix-linear-transformation-gridMath.ts
│   ├── matrix-linear-transformation-gridReducer.ts
│   ├── matrix-linear-transformation-gridCompletion.ts
│   └── matrix-linear-transformation-grid.test.ts
│
├── 108-determinant-area-scale-factor/
│   ├── DeterminantAreaScaleFactorProofPage.tsx
│   ├── DeterminantAreaScaleFactorProofPage.module.css
│   ├── determinant-area-scale-factorConfig.ts
│   ├── determinant-area-scale-factorMath.ts
│   ├── determinant-area-scale-factorReducer.ts
│   ├── determinant-area-scale-factorCompletion.ts
│   └── determinant-area-scale-factor.test.ts
│
├── 109-linear-system-line-intersection/
│   ├── LinearSystemLineIntersectionProofPage.tsx
│   ├── LinearSystemLineIntersectionProofPage.module.css
│   ├── linear-system-line-intersectionConfig.ts
│   ├── linear-system-line-intersectionMath.ts
│   ├── linear-system-line-intersectionReducer.ts
│   ├── linear-system-line-intersectionCompletion.ts
│   └── linear-system-line-intersection.test.ts
│
├── 110-row-operations-preserve-solutions/
│   ├── RowOperationsPreserveSolutionsProofPage.tsx
│   ├── RowOperationsPreserveSolutionsProofPage.module.css
│   ├── row-operations-preserve-solutionsConfig.ts
│   ├── row-operations-preserve-solutionsMath.ts
│   ├── row-operations-preserve-solutionsReducer.ts
│   ├── row-operations-preserve-solutionsCompletion.ts
│   └── row-operations-preserve-solutions.test.ts
│
├── 111-eigenvectors-directions-do-not-turn/
│   ├── EigenvectorsDirectionsDoNotTurnProofPage.tsx
│   ├── EigenvectorsDirectionsDoNotTurnProofPage.module.css
│   ├── eigenvectors-directions-do-not-turnConfig.ts
│   ├── eigenvectors-directions-do-not-turnMath.ts
│   ├── eigenvectors-directions-do-not-turnReducer.ts
│   ├── eigenvectors-directions-do-not-turnCompletion.ts
│   └── eigenvectors-directions-do-not-turn.test.ts
│
└── 112-matrix-inverse-undo-transformation/
    ├── MatrixInverseUndoTransformationProofPage.tsx
    ├── MatrixInverseUndoTransformationProofPage.module.css
    ├── matrix-inverse-undo-transformationConfig.ts
    ├── matrix-inverse-undo-transformationMath.ts
    ├── matrix-inverse-undo-transformationReducer.ts
    ├── matrix-inverse-undo-transformationCompletion.ts
    └── matrix-inverse-undo-transformation.test.ts
```

## Proofs Index

| ID | Number | Title | Category | Route |
|---|---|---|---|---|
| `integration-by-parts-visual-proof` | **068** | Integration by Parts | Calculus | `/visual-proofs/calculus/integration-by-parts-visual-proof` |
| `even-odd-pairing` | **073** | Even and Odd Numbers as Pairing Patterns | Number Theory | `/visual-proofs/number-theory/even-odd-pairing` |
| `matrix-addition-cell-by-cell` | **105** | Matrix Addition as Cell-by-Cell Addition | Matrices & Linear Algebra | `/visual-proofs/matrices-linear-algebra/matrix-addition-cell-by-cell` |
| `matrix-multiplication-row-column` | **106** | Matrix Multiplication as Row-by-Column Dot Product | Matrices & Linear Algebra | `/visual-proofs/matrices-linear-algebra/matrix-multiplication-row-column` |
| `matrix-linear-transformation-grid` | **107** | Matrix as Linear Transformation | Matrices & Linear Algebra | `/visual-proofs/matrices-linear-algebra/matrix-linear-transformation-grid` |
| `determinant-area-scale-factor` | **108** | Determinant as Area Scale Factor | Matrices & Linear Algebra | `/visual-proofs/matrices-linear-algebra/determinant-area-scale-factor` |
| `linear-system-line-intersection` | **109** | Solving 2×2 Linear Systems as Line Intersection | Matrices & Linear Algebra | `/visual-proofs/matrices-linear-algebra/linear-system-line-intersection` |
| `row-operations-preserve-solutions` | **110** | Row Operations Preserve Solution Set | Matrices & Linear Algebra | `/visual-proofs/matrices-linear-algebra/row-operations-preserve-solutions` |
| `eigenvectors-directions-do-not-turn` | **111** | Eigenvectors as Directions That Do Not Turn | Matrices & Linear Algebra | `/visual-proofs/matrices-linear-algebra/eigenvectors-directions-do-not-turn` |
| `matrix-inverse-undo-transformation` | **112** | Matrix Inverse as Undoing a Transformation | Matrices & Linear Algebra | `/visual-proofs/matrices-linear-algebra/matrix-inverse-undo-transformation` |
