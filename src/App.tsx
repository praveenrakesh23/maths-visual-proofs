import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/common/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { LineRotationalSymmetryProofPage } from './components/proof/LineRotationalSymmetryProofPage';
import { TessellationsRepeatedTransformationsProofPage } from './components/proof167/TessellationsRepeatedTransformationsProofPage';
import { TransformationMatrices2DProofPage } from './components/proof168/TransformationMatrices2DProofPage';
import { FirstOrderDifferentialEquationSlopeFieldProofPage } from './components/proof169/FirstOrderDifferentialEquationSlopeFieldProofPage';
import { SimpleHarmonicMotionProofPage } from './components/proof170/SimpleHarmonicMotionProofPage';
import { FourierSeriesWaveBuildingProofPage } from './components/proof171/FourierSeriesWaveBuildingProofPage';
import { LaplaceTransformDecaySystemProofPage } from './components/proof172/LaplaceTransformDecaySystemProofPage';
import { GradientSteepestIncreaseProofPage } from './components/proof173/GradientSteepestIncreaseProofPage';
import { DivergenceCurlVectorFieldProofPage } from './components/proof174/DivergenceCurlVectorFieldProofPage';
import { TrapezoidalRuleNumericalIntegrationProofPage } from './components/proof175/TrapezoidalRuleNumericalIntegrationProofPage';
import { LinearProgrammingFeasibleRegionProofPage } from './components/proof176/LinearProgrammingFeasibleRegionProofPage';
import { ArithmeticProgressionEqualStepsProofPage } from './components/proof177/ArithmeticProgressionEqualStepsProofPage';
import { SumFirstNNaturalNumbersProofPage } from './components/proof178/SumFirstNNaturalNumbersProofPage';
import { SumFirstNOddNumbersProofPage } from './components/proof179/SumFirstNOddNumbersProofPage';
import { SumArithmeticProgressionProofPage } from './components/proof180/SumArithmeticProgressionProofPage';
import { GeometricProgressionRepeatedScalingProofPage } from './components/proof181/GeometricProgressionRepeatedScalingProofPage';
import { FiniteGeometricSeriesSumProofPage } from './components/proof182/FiniteGeometricSeriesSumProofPage';
import { SierpinskiRetainedAreaProofPage } from './components/proof183/SierpinskiRetainedAreaProofPage';
import { SierpinskiRemovedSquareSumProofPage } from './components/proof184/SierpinskiRemovedSquareSumProofPage';
import { TriangularNumbersProofPage } from './components/proof186/TriangularNumbersProofPage';
import { SquareNumbersOddLayersProofPage } from './components/proof187/SquareNumbersOddLayersProofPage';
import { FibonacciSequenceTilingProofPage } from './components/proof188/FibonacciSequenceTilingProofPage';
import { FibonacciSpiralApproximationProofPage } from './components/proof189/FibonacciSpiralApproximationProofPage';
import { NewProofModal } from './components/dashboard/NewProofModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [activeProofId, setActiveProofId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Sync with browser URL / hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('fibonacci-spiral-approximation')) {
        setActiveProofId('fibonacci-spiral-approximation');
      } else if (hash.includes('fibonacci-sequence-tiling')) {
        setActiveProofId('fibonacci-sequence-tiling');
      } else if (hash.includes('square-numbers-odd-layers')) {
        setActiveProofId('square-numbers-odd-layers');
      } else if (hash.includes('triangular-numbers')) {
        setActiveProofId('triangular-numbers');
      } else if (hash.includes('sierpinski-removed-square-sum')) {
        setActiveProofId('sierpinski-removed-square-sum');
      } else if (hash.includes('sierpinski-retained-area')) {
        setActiveProofId('sierpinski-retained-area');
      } else if (hash.includes('finite-geometric-series-sum')) {
        setActiveProofId('finite-geometric-series-sum');
      } else if (hash.includes('geometric-progression-repeated-scaling')) {
        setActiveProofId('geometric-progression-repeated-scaling');
      } else if (hash.includes('sum-arithmetic-progression')) {
        setActiveProofId('sum-arithmetic-progression');
      } else if (hash.includes('sum-first-n-odd-numbers')) {
        setActiveProofId('sum-first-n-odd-numbers');
      } else if (hash.includes('sum-first-n-natural-numbers')) {
        setActiveProofId('sum-first-n-natural-numbers');
      } else if (hash.includes('arithmetic-progression-equal-steps')) {
        setActiveProofId('arithmetic-progression-equal-steps');
      } else if (hash.includes('linear-programming-feasible-region')) {
        setActiveProofId('linear-programming-feasible-region');
      } else if (hash.includes('trapezoidal-rule-numerical-integration')) {
        setActiveProofId('trapezoidal-rule-numerical-integration');
      } else if (hash.includes('divergence-curl-vector-field')) {
        setActiveProofId('divergence-curl-vector-field');
      } else if (hash.includes('gradient-steepest-increase')) {
        setActiveProofId('gradient-steepest-increase');
      } else if (hash.includes('laplace-transform-decay-system')) {
        setActiveProofId('laplace-transform-decay-system');
      } else if (hash.includes('fourier-series-wave-building')) {
        setActiveProofId('fourier-series-wave-building');
      } else if (hash.includes('first-order-differential-equation-slope-field')) {
        setActiveProofId('first-order-differential-equation-slope-field');
      } else if (hash.includes('simple-harmonic-motion')) {
        setActiveProofId('simple-harmonic-motion');
      } else if (hash.includes('tessellations-repeated-transformations')) {
        setActiveProofId('tessellations-repeated-transformations');
      } else if (hash.includes('transformation-matrices-2d')) {
        setActiveProofId('transformation-matrices-2d');
      } else if (hash.includes('line-rotational-symmetry')) {
        setActiveProofId('line-rotational-symmetry');
      } else {
        setActiveProofId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectProof = (proofId: string) => {
    setActiveProofId(proofId);
    if (
      proofId === 'fibonacci-spiral-approximation' ||
      proofId === 'fibonacci-sequence-tiling' ||
      proofId === 'square-numbers-odd-layers' ||
      proofId === 'triangular-numbers' ||
      proofId === 'sierpinski-removed-square-sum' ||
      proofId === 'sierpinski-retained-area' ||
      proofId === 'finite-geometric-series-sum' ||
      proofId === 'geometric-progression-repeated-scaling' ||
      proofId === 'sum-arithmetic-progression' ||
      proofId === 'sum-first-n-odd-numbers' ||
      proofId === 'sum-first-n-natural-numbers' ||
      proofId === 'arithmetic-progression-equal-steps'
    ) {
      window.location.hash = `/visual-proofs/sequences-and-series/${proofId}`;
    } else if (
      proofId === 'first-order-differential-equation-slope-field' || 
      proofId === 'simple-harmonic-motion' ||
      proofId === 'fourier-series-wave-building' ||
      proofId === 'laplace-transform-decay-system' ||
      proofId === 'gradient-steepest-increase' ||
      proofId === 'divergence-curl-vector-field' ||
      proofId === 'trapezoidal-rule-numerical-integration' ||
      proofId === 'linear-programming-feasible-region'
    ) {
      window.location.hash = `/visual-proofs/engineering-mathematics/${proofId}`;
    } else {
      window.location.hash = `/visual-proofs/transformations-symmetry/${proofId}`;
    }
  };

  const handleBackToDashboard = () => {
    setActiveProofId(null);
    window.location.hash = '';
  };

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'proofs' || tab === 'explore') {
      if (!activeProofId) {
        setActiveProofId('line-rotational-symmetry');
        window.location.hash = '/visual-proofs/transformations-symmetry/line-rotational-symmetry';
      }
    }
  };

  // Render the appropriate Proof studio or Dashboard
  const renderContent = () => {
    switch (activeProofId) {
      case 'fibonacci-spiral-approximation':
        return <FibonacciSpiralApproximationProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'fibonacci-sequence-tiling':
        return <FibonacciSequenceTilingProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'square-numbers-odd-layers':
        return <SquareNumbersOddLayersProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'triangular-numbers':
        return <TriangularNumbersProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'sierpinski-removed-square-sum':
        return <SierpinskiRemovedSquareSumProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'sierpinski-retained-area':
        return <SierpinskiRetainedAreaProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'finite-geometric-series-sum':
        return <FiniteGeometricSeriesSumProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'geometric-progression-repeated-scaling':
        return <GeometricProgressionRepeatedScalingProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'sum-arithmetic-progression':
        return <SumArithmeticProgressionProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'sum-first-n-odd-numbers':
        return <SumFirstNOddNumbersProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'sum-first-n-natural-numbers':
        return <SumFirstNNaturalNumbersProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'arithmetic-progression-equal-steps':
        return <ArithmeticProgressionEqualStepsProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'linear-programming-feasible-region':
        return <LinearProgrammingFeasibleRegionProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'trapezoidal-rule-numerical-integration':
        return <TrapezoidalRuleNumericalIntegrationProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'divergence-curl-vector-field':
        return <DivergenceCurlVectorFieldProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'gradient-steepest-increase':
        return <GradientSteepestIncreaseProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'laplace-transform-decay-system':
        return <LaplaceTransformDecaySystemProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'fourier-series-wave-building':
        return <FourierSeriesWaveBuildingProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'first-order-differential-equation-slope-field':
        return <FirstOrderDifferentialEquationSlopeFieldProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'simple-harmonic-motion':
        return <SimpleHarmonicMotionProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'tessellations-repeated-transformations':
        return <TessellationsRepeatedTransformationsProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'transformation-matrices-2d':
        return <TransformationMatrices2DProofPage onBackToDashboard={handleBackToDashboard} />;
      case 'line-rotational-symmetry':
        return <LineRotationalSymmetryProofPage onBackToDashboard={handleBackToDashboard} />;
      default:
        return (
          <DashboardView
            onSelectProof={handleSelectProof}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f3f4f9] font-sans antialiased text-slate-800">
      {/* Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onGoToDashboard={handleBackToDashboard}
        currentProofId={activeProofId || undefined}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {renderContent()}
      </main>

      {/* Custom Formula Proof Creator Modal */}
      <NewProofModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onLaunchProof={handleSelectProof}
      />
    </div>
  );
};

export default App;
