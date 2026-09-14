import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "katex/dist/katex.min.css";
import "./styles/global.css";
import IntegrationByPartsVisualProofPage from "./proofs/068-integration-by-parts/IntegrationByPartsVisualProofPage";
import EvenOddPairingProofPage from "./proofs/073-even-odd-pairing/EvenOddPairingProofPage";
import MatrixAdditionCellByCellProofPage from "./proofs/105-matrix-addition-cell-by-cell/MatrixAdditionCellByCellProofPage";
import MatrixMultiplicationRowColumnProofPage from "./proofs/106-matrix-multiplication-row-column/MatrixMultiplicationRowColumnProofPage";
import MatrixLinearTransformationGridProofPage from "./proofs/107-matrix-linear-transformation-grid/MatrixLinearTransformationGridProofPage";
import DeterminantAreaScaleFactorProofPage from "./proofs/108-determinant-area-scale-factor/DeterminantAreaScaleFactorProofPage";
import LinearSystemLineIntersectionProofPage from "./proofs/109-linear-system-line-intersection/LinearSystemLineIntersectionProofPage";
import RowOperationsPreserveSolutionsProofPage from "./proofs/110-row-operations-preserve-solutions/RowOperationsPreserveSolutionsProofPage";
import EigenvectorsDirectionsDoNotTurnProofPage from "./proofs/111-eigenvectors-directions-do-not-turn/EigenvectorsDirectionsDoNotTurnProofPage";
import MatrixInverseUndoTransformationProofPage from "./proofs/112-matrix-inverse-undo-transformation/MatrixInverseUndoTransformationProofPage";

const ROUTE_068 = "/visual-proofs/calculus/integration-by-parts-visual-proof";
const ROUTE_073 = "/visual-proofs/number-theory/even-odd-pairing";
const ROUTE_105 = "/visual-proofs/matrices-linear-algebra/matrix-addition-cell-by-cell";
const ROUTE_106 = "/visual-proofs/matrices-linear-algebra/matrix-multiplication-row-column";
const ROUTE_107 = "/visual-proofs/matrices-linear-algebra/matrix-linear-transformation-grid";
const ROUTE_108 = "/visual-proofs/matrices-linear-algebra/determinant-area-scale-factor";
const ROUTE_109 = "/visual-proofs/matrices-linear-algebra/linear-system-line-intersection";
const ROUTE_110 = "/visual-proofs/matrices-linear-algebra/row-operations-preserve-solutions";
const ROUTE_111 = "/visual-proofs/matrices-linear-algebra/eigenvectors-directions-do-not-turn";
const ROUTE_112 = "/visual-proofs/matrices-linear-algebra/matrix-inverse-undo-transformation";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);

    const pathname = window.location.pathname;
    if (pathname === "/" || pathname === "") {
      window.history.replaceState({}, "", ROUTE_112);
      setCurrentPath(ROUTE_112);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigateTo = (route: string) => {
    window.history.pushState({}, "", route);
    setCurrentPath(route);
  };

  const is068 = currentPath.includes("integration-by-parts") || currentPath.includes("068");
  const is073 = currentPath.includes("even-odd-pairing") || currentPath.includes("073");
  const is105 = currentPath.includes("matrix-addition") || currentPath.includes("105");
  const is106 = currentPath.includes("matrix-multiplication") || currentPath.includes("106");
  const is107 = currentPath.includes("linear-transformation") || currentPath.includes("107");
  const is108 = currentPath.includes("determinant") || currentPath.includes("108");
  const is109 = currentPath.includes("linear-system") || currentPath.includes("109");
  const is110 = currentPath.includes("row-operations") || currentPath.includes("110");
  const is111 = currentPath.includes("eigenvectors") || currentPath.includes("111");
  const is112 =
    currentPath.includes("matrix-inverse") ||
    currentPath.includes("112") ||
    (!is068 && !is073 && !is105 && !is106 && !is107 && !is108 && !is109 && !is110 && !is111);

  return (
    <div>
      {/* Proof Switcher Navigation Bar */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 24px",
          background: "#1e1b4b",
          color: "#ffffff",
          fontSize: "13px",
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#a78bfa", fontSize: "16px" }}>✦</span>
          <span>Maths Universe Proofs Gallery</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <button
            onClick={() => navigateTo(ROUTE_112)}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              background: is112 ? "#4f46e5" : "rgba(255, 255, 255, 0.12)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Proof 112: Matrix Inverse
          </button>

          <button
            onClick={() => navigateTo(ROUTE_111)}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              background: is111 && !is112 ? "#4f46e5" : "rgba(255, 255, 255, 0.12)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Proof 111: Eigenvectors
          </button>

          <button
            onClick={() => navigateTo(ROUTE_110)}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              background: is110 && !is112 && !is111 ? "#4f46e5" : "rgba(255, 255, 255, 0.12)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Proof 110: Row Operations
          </button>

          <button
            onClick={() => navigateTo(ROUTE_109)}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              background:
                is109 && !is112 && !is111 && !is110 ? "#4f46e5" : "rgba(255, 255, 255, 0.12)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Proof 109: Linear Systems
          </button>

          <button
            onClick={() => navigateTo(ROUTE_108)}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              background:
                is108 && !is112 && !is111 && !is110 && !is109
                  ? "#4f46e5"
                  : "rgba(255, 255, 255, 0.12)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Proof 108: Determinant & Area
          </button>

          <button
            onClick={() => navigateTo(ROUTE_107)}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              background:
                is107 && !is112 && !is111 && !is110 && !is109 && !is108
                  ? "#4f46e5"
                  : "rgba(255, 255, 255, 0.12)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Proof 107: Linear Transformation
          </button>

          <button
            onClick={() => navigateTo(ROUTE_106)}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              background:
                is106 && !is112 && !is111 && !is110 && !is109 && !is108 && !is107
                  ? "#4f46e5"
                  : "rgba(255, 255, 255, 0.12)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Proof 106: Matrix Multiplication
          </button>

          <button
            onClick={() => navigateTo(ROUTE_105)}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              background:
                is105 && !is112 && !is111 && !is110 && !is109 && !is108 && !is107 && !is106
                  ? "#4f46e5"
                  : "rgba(255, 255, 255, 0.12)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Proof 105: Matrix Addition
          </button>

          <button
            onClick={() => navigateTo(ROUTE_073)}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              background:
                is073 && !is112 && !is111 && !is110 && !is109 && !is108 && !is107 && !is106 && !is105
                  ? "#4f46e5"
                  : "rgba(255, 255, 255, 0.12)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Proof 073: Even & Odd Pairing
          </button>

          <button
            onClick={() => navigateTo(ROUTE_068)}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              background: is068 ? "#4f46e5" : "rgba(255, 255, 255, 0.12)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Proof 068: Integration by Parts
          </button>
        </div>
      </header>

      {/* Render Active Proof */}
      {is068 ? (
        <IntegrationByPartsVisualProofPage />
      ) : is073 ? (
        <EvenOddPairingProofPage />
      ) : is105 ? (
        <MatrixAdditionCellByCellProofPage />
      ) : is106 ? (
        <MatrixMultiplicationRowColumnProofPage />
      ) : is107 ? (
        <MatrixLinearTransformationGridProofPage />
      ) : is108 ? (
        <DeterminantAreaScaleFactorProofPage />
      ) : is109 ? (
        <LinearSystemLineIntersectionProofPage />
      ) : is110 ? (
        <RowOperationsPreserveSolutionsProofPage />
      ) : is111 ? (
        <EigenvectorsDirectionsDoNotTurnProofPage />
      ) : (
        <MatrixInverseUndoTransformationProofPage />
      )}
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
