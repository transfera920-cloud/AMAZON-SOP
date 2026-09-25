import React, { useState } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  Circle,
  Printer,
  RotateCcw,
  ArrowRight,
  Filter,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SOP_MODULES, BRAND_INFO } from '../data/sopData';
import { Stage } from '../types';

interface FullChecklistViewProps {
  isItemChecked: (itemId: string) => boolean;
  toggleItem: (itemId: string) => void;
  isStageComplete: (stage: Stage) => boolean;
  onSelectStage: (stage: Stage) => void;
  onResetChecklist: () => void;
  completedStagesCount: number;
  totalStagesCount: number;
  overallPercent: number;
}

export const FullChecklistView: React.FC<FullChecklistViewProps> = ({
  isItemChecked,
  toggleItem,
  isStageComplete,
  onSelectStage,
  onResetChecklist,
  completedStagesCount,
  totalStagesCount,
  overallPercent,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'uncompleted' | 'completed'>('all');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'module-1': true,
    'module-2': true,
    'module-3': true,
    'module-4': true,
    'module-5': true,
  });

  const toggleModuleExpand = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-[#161a16] border border-[#2d3a2d] rounded-xl p-5 sm:p-6 shadow-xl print:bg-white print:text-black print:border-black">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#7cae7a] bg-[#2d5a27]/25 px-2.5 py-1 rounded border border-[#7cae7a]/30 mb-2 print:border-black print:text-black">
              <a href={BRAND_INFO.brandUrl} className="hover:underline">{BRAND_INFO.organization}</a>
              <span>•</span>
              <span>領隊總檢核表</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white print:text-black">
              全階段實務檢核清單（Master Checklist）
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl print:text-gray-700">
              集中檢視五大核心模組、十大標準階段之所有領隊必備作業。所有勾選狀態皆自動儲存，支援直接列印作為出團隨隊查核紙本。
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-lg bg-[#2d5a27] hover:bg-[#3d7a35] text-white border border-[#7cae7a]/30 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors print:hidden"
            >
              <Printer className="w-4 h-4 text-[#7cae7a]" />
              <span>列印 / 存為 PDF</span>
            </button>
            <button
              onClick={onResetChecklist}
              className="px-3.5 py-2 rounded-lg bg-[#0d0f0d] hover:bg-rose-950/40 text-gray-400 hover:text-rose-300 border border-[#2d3a2d] text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors print:hidden"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重置全部</span>
            </button>
          </div>
        </div>

        {/* Big Overall Progress Bar */}
        <div className="mt-5 pt-4 border-t border-[#2d3a2d] print:border-gray-300">
          <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
            <span className="text-gray-300 font-semibold print:text-black">
              總體檢核進度：已完成 {completedStagesCount} / {totalStagesCount} 階段
            </span>
            <span className="font-mono font-bold text-[#f27d26] print:text-black">
              {overallPercent}%
            </span>
          </div>
          <div className="w-full bg-[#0d0f0d] rounded-full h-2.5 overflow-hidden border border-[#2d3a2d] print:border-gray-400">
            <div
              className="bg-[#f27d26] h-full transition-all duration-300 print:bg-black"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3 flex-wrap print:hidden">
        <div className="flex items-center gap-1.5 bg-[#141814] border border-[#2d3a2d] p-1 rounded-xl">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterMode === 'all'
                ? 'bg-[#2d5a27] text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            全部項目 (47)
          </button>
          <button
            onClick={() => setFilterMode('uncompleted')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterMode === 'uncompleted'
                ? 'bg-[#f27d26] text-black font-bold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            僅顯示未完成
          </button>
          <button
            onClick={() => setFilterMode('completed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterMode === 'completed'
                ? 'bg-[#7cae7a] text-black font-bold shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            僅顯示已完成
          </button>
        </div>

        <div className="text-xs text-gray-400 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-[#7cae7a]" />
          <span>點擊任意項目即可立即核取</span>
        </div>
      </div>

      {/* Modules and Stages Checklist Tree */}
      <div className="space-y-5">
        {SOP_MODULES.map((module) => {
          const isExpanded = !!expandedModules[module.id];

          return (
            <div
              key={module.id}
              className="bg-[#141814] border border-[#2d3a2d] rounded-xl overflow-hidden shadow-md print:bg-white print:border-black print:text-black"
            >
              {/* Module Accordion Header */}
              <div
                onClick={() => toggleModuleExpand(module.id)}
                className="p-4 bg-[#1a1f1a] border-b border-[#2d3a2d] flex items-center justify-between cursor-pointer hover:bg-[#1f261f] transition-colors print:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded bg-[#0d0f0d] border border-[#2d3a2d] print:hidden">
                    <Layers className="w-4 h-4 text-[#7cae7a]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#7cae7a]">
                        {module.moduleNumber}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white print:text-black">
                        {module.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 font-mono">
                    {module.stages.length} 個階段
                  </span>
                  <button className="text-gray-400 print:hidden">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Stages List inside Module */}
              {isExpanded && (
                <div className="p-4 sm:p-5 space-y-5 divide-y divide-[#2d3a2d] print:divide-gray-300">
                  {module.stages.map((stage) => {
                    const isDone = isStageComplete(stage);
                    const filteredItems = stage.checklist.filter((item) => {
                      const checked = isItemChecked(item.id);
                      if (filterMode === 'uncompleted') return !checked;
                      if (filterMode === 'completed') return checked;
                      return true;
                    });

                    if (filteredItems.length === 0 && filterMode !== 'all') {
                      return null;
                    }

                    return (
                      <div key={stage.id} className="pt-4 first:pt-0">
                        {/* Stage Mini Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2.5">
                            <span className="text-[10px] font-mono font-bold text-black bg-[#f27d26] px-2 py-0.5 rounded print:text-black print:border-black">
                              STAGE {stage.stageNumber}
                            </span>
                            <h4 className="text-sm font-bold text-white print:text-black">
                              {stage.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-3">
                            {isDone ? (
                              <span className="text-xs font-semibold text-[#7cae7a] flex items-center gap-1 print:text-black">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>本階段完成</span>
                              </span>
                            ) : (
                              <span className="text-xs text-[#f27d26] flex items-center gap-1">
                                <Circle className="w-3.5 h-3.5" />
                                <span>進行中</span>
                              </span>
                            )}

                            <button
                              onClick={() => onSelectStage(stage)}
                              className="text-xs text-gray-400 hover:text-[#7cae7a] flex items-center gap-1 transition-colors print:hidden"
                            >
                              <span>查看詳細教案</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Checklist items in this stage */}
                        <div className="space-y-2">
                          {filteredItems.map((item) => {
                            const checked = isItemChecked(item.id);

                            return (
                              <div
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 select-none ${
                                  checked
                                    ? 'bg-[#2d5a27]/20 border-[#7cae7a]/40 text-white print:bg-gray-100 print:border-black'
                                    : 'bg-[#0d0f0d] border-[#2d3a2d] hover:border-[#425942] text-gray-300'
                                }`}
                              >
                                <div className="mt-0.5 shrink-0">
                                  <div
                                    className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
                                      checked
                                        ? 'bg-[#7cae7a] text-black font-bold'
                                        : 'border border-[#7cae7a]/60 bg-transparent'
                                    }`}
                                  >
                                    {checked && <CheckSquare className="w-3 h-3 text-black" />}
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className={`text-xs sm:text-sm ${checked ? 'line-through text-gray-400' : 'text-slate-200 font-medium'}`}>
                                      {item.label}
                                    </span>
                                    {item.important && (
                                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#f27d26] text-black print:hidden">
                                        必要
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
