import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CorePillarsBar } from './components/CorePillarsBar';
import { ModuleList } from './components/ModuleList';
import { StageDetail } from './components/StageDetail';
import { FullChecklistView } from './components/FullChecklistView';
import { LeaderToolsModal } from './components/LeaderToolsModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { useChecklistStorage } from './hooks/useChecklistStorage';
import { Stage, ViewMode } from './types';
import { SOP_MODULES } from './data/sopData';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('modules');
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const {
    checkedMap,
    toggleItem,
    isItemChecked,
    isStageComplete,
    getStageStats,
    toggleAllInStage,
    resetAll,
    totalItemsCount,
    completedItemsCount,
    completedStagesCount,
    overallPercent,
  } = useChecklistStorage();

  const totalStagesCount = 10;

  // Handle stage selection
  const handleSelectStage = (stage: Stage) => {
    setSelectedStage(stage);
    setCurrentView('stage');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToModules = () => {
    setCurrentView('modules');
    setSelectedStage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectView = (view: ViewMode) => {
    setCurrentView(view);
    if (view === 'modules') {
      setSelectedStage(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0d0f0d] bg-[radial-gradient(circle_at_top_right,_#1a231a_0%,_#0d0f0d_55%)] text-slate-100 flex flex-col font-sans selection:bg-[#2d5a27] selection:text-[#7cae7a]">
      {/* Sticky App Header */}
      <Header
        currentView={currentView}
        onSelectView={handleSelectView}
        onOpenTools={() => setIsToolsOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        completedStagesCount={completedStagesCount}
        totalStagesCount={totalStagesCount}
        overallPercent={overallPercent}
        onResetChecklist={resetAll}
      />

      {/* Core Principles & Association Subtitle */}
      <CorePillarsBar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        {currentView === 'modules' && (
          <ModuleList
            onSelectStage={handleSelectStage}
            isStageComplete={isStageComplete}
            getStageStats={getStageStats}
          />
        )}

        {currentView === 'stage' && selectedStage && (
          <StageDetail
            stage={selectedStage}
            onBackToModules={handleBackToModules}
            onSelectStage={handleSelectStage}
            isItemChecked={isItemChecked}
            toggleItem={toggleItem}
            toggleAllInStage={toggleAllInStage}
            isStageComplete={isStageComplete}
            getStageStats={getStageStats}
          />
        )}

        {currentView === 'all-checklists' && (
          <FullChecklistView
            isItemChecked={isItemChecked}
            toggleItem={toggleItem}
            isStageComplete={isStageComplete}
            onSelectStage={handleSelectStage}
            onResetChecklist={resetAll}
            completedStagesCount={completedStagesCount}
            totalStagesCount={totalStagesCount}
            overallPercent={overallPercent}
          />
        )}
      </main>

      {/* Modals */}
      <LeaderToolsModal
        isOpen={isToolsOpen}
        onClose={() => setIsToolsOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectStage={handleSelectStage}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
