import React from 'react';
import { Compass, CheckSquare, Layers, Search, FileText, RotateCcw } from 'lucide-react';
import { BRAND_INFO } from '../data/sopData';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onOpenTools: () => void;
  onOpenSearch: () => void;
  completedStagesCount: number;
  totalStagesCount: number;
  overallPercent: number;
  onResetChecklist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  onOpenTools,
  onOpenSearch,
  completedStagesCount,
  totalStagesCount,
  overallPercent,
  onResetChecklist,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#1a1f1a]/95 backdrop-blur-md border-b border-[#2d3a2d] transition-colors">
      {/* Top Banner with Brand info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Brand Info & Main H1 */}
          <div className="flex items-center gap-3">
            <a
              href="https://amazon-hike.com/intro"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#2d5a27] border border-[#7cae7a]/40 flex items-center justify-center font-black text-xs tracking-wider text-white hover:bg-[#3d7a35] hover:border-[#7cae7a] transition-all shrink-0 shadow-sm"
              title="前往亞馬遜國家山岳協會"
            >
              ANMA
            </a>
            <div>
              <div className="flex items-center gap-2">
                <a
                  href="https://amazon-hike.com/intro"
                  className="text-xs font-bold tracking-wider text-[#7cae7a] uppercase bg-[#2d5a27]/25 px-2 py-0.5 rounded border border-[#7cae7a]/25 hover:bg-[#2d5a27]/40 hover:text-white transition-colors inline-block"
                  title="前往亞馬遜國家山岳協會"
                >
                  {BRAND_INFO.organization}
                </a>
                <span className="text-xs text-gray-400 hidden sm:inline">高山團務 SOP 教案</span>
              </div>
              <h1 
                onClick={() => onSelectView('modules')}
                className="text-base sm:text-lg font-bold text-white hover:text-[#7cae7a] transition-colors cursor-pointer"
                title="亞馬遜國家山岳協會｜出團標準作業流程"
              >
                {BRAND_INFO.title}
              </h1>
            </div>
          </div>

          {/* Action Bar & Stats */}
          <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3 flex-wrap">
            {/* Overall Progress Badge */}
            <button
              onClick={() => onSelectView('all-checklists')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition-all ${
                currentView === 'all-checklists'
                  ? 'bg-[#2d5a27]/30 border-[#7cae7a]/50 text-[#7cae7a]'
                  : 'bg-[#141814] border-[#2d3a2d] text-slate-300 hover:border-[#425542] hover:text-white'
              }`}
              title="點擊查看全流程檢核進度"
            >
              <CheckSquare className="w-4 h-4 text-[#7cae7a]" />
              <span>檢核進度</span>
              <span className="font-mono font-bold text-[#f27d26] bg-[#0d0f0d] px-1.5 py-0.5 rounded border border-[#f27d26]/30">
                {completedStagesCount}/{totalStagesCount} 階段 ({overallPercent}%)
              </span>
            </button>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onSelectView('modules')}
                className={`p-2 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors ${
                  currentView === 'modules'
                    ? 'bg-[#2d5a27]/40 text-white border border-[#7cae7a]/40 shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-[#141814] border border-transparent hover:border-[#2d3a2d]'
                }`}
                title="五大模組總覽"
              >
                <Layers className="w-4 h-4" />
                <span className="hidden sm:inline">五大模組</span>
              </button>

              <button
                onClick={onOpenTools}
                className="p-2 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium text-gray-400 hover:text-white hover:bg-[#141814] flex items-center gap-1.5 transition-colors border border-transparent hover:border-[#2d3a2d]"
                title="領隊實用公版與工具"
              >
                <FileText className="w-4 h-4 text-[#f27d26]" />
                <span className="hidden sm:inline">領隊工具箱</span>
              </button>

              <button
                onClick={onOpenSearch}
                className="p-2 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium text-gray-400 hover:text-white hover:bg-[#141814] flex items-center gap-1.5 transition-colors border border-transparent hover:border-[#2d3a2d]"
                title="搜尋 SOP 規範"
              >
                <Search className="w-4 h-4 text-[#7cae7a]" />
                <span className="hidden sm:inline">搜尋</span>
              </button>

              {completedStagesCount > 0 && (
                <button
                  onClick={onResetChecklist}
                  className="p-2 rounded-lg text-xs text-gray-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors border border-transparent hover:border-rose-900/40"
                  title="重置全部檢核狀態"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
