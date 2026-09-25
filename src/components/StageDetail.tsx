import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Flame,
  Lightbulb,
  CheckSquare,
  Sparkles,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  BookmarkCheck,
  HelpCircle,
} from 'lucide-react';
import { Stage, Module } from '../types';
import { SOP_MODULES } from '../data/sopData';

interface StageDetailProps {
  stage: Stage;
  onBackToModules: () => void;
  onSelectStage: (stage: Stage) => void;
  isItemChecked: (itemId: string) => boolean;
  toggleItem: (itemId: string) => void;
  toggleAllInStage: (stage: Stage, targetState?: boolean) => void;
  isStageComplete: (stage: Stage) => boolean;
  getStageStats: (stage: Stage) => { total: number; completed: number; isDone: boolean; percent: number };
}

export const StageDetail: React.FC<StageDetailProps> = ({
  stage,
  onBackToModules,
  onSelectStage,
  isItemChecked,
  toggleItem,
  toggleAllInStage,
  isStageComplete,
  getStageStats,
}) => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Find module and adjacent stages
  const currentModule = SOP_MODULES.find((m) => m.id === stage.moduleId) as Module;
  const allStages = SOP_MODULES.flatMap((m) => m.stages);
  const currentIndex = allStages.findIndex((s) => s.id === stage.id);
  const prevStage = currentIndex > 0 ? allStages[currentIndex - 1] : null;
  const nextStage = currentIndex < allStages.length - 1 ? allStages[currentIndex + 1] : null;

  const stats = getStageStats(stage);
  const isComplete = isStageComplete(stage);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs & Navigation Header */}
      <div className="bg-[#161a16] border border-[#2d3a2d] rounded-xl p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
            <button
              onClick={onBackToModules}
              className="hover:text-[#7cae7a] transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>五大模組總覽</span>
            </button>
            <span>/</span>
            <span className="text-gray-300 font-medium">{currentModule?.moduleNumber}：{currentModule?.title}</span>
            <span>/</span>
            <span className="text-[#7cae7a] font-bold">階段 {stage.stageNumber}</span>
          </div>

          {/* Adjacent Stage Switches */}
          <div className="flex items-center gap-2">
            {prevStage ? (
              <button
                onClick={() => onSelectStage(prevStage)}
                className="px-2.5 py-1.5 rounded-lg bg-[#0d0f0d] border border-[#2d3a2d] text-gray-300 hover:border-[#435943] hover:text-white text-xs flex items-center gap-1 transition-colors"
                title={`上一階段：階段 ${prevStage.stageNumber} ${prevStage.shortTitle}`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">上一階段 ({prevStage.stageNumber})</span>
              </button>
            ) : null}

            {nextStage ? (
              <button
                onClick={() => onSelectStage(nextStage)}
                className="px-2.5 py-1.5 rounded-lg bg-[#0d0f0d] border border-[#2d3a2d] text-gray-300 hover:border-[#435943] hover:text-white text-xs flex items-center gap-1 transition-colors"
                title={`下一階段：階段 ${nextStage.stageNumber} ${nextStage.shortTitle}`}
              >
                <span className="hidden sm:inline">下一階段 ({nextStage.stageNumber})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : null}
          </div>
        </div>

        {/* Stage Main Title Banner */}
        <div className="mt-4 pt-4 border-t border-[#2d3a2d] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-[10px] font-mono font-bold text-black bg-[#f27d26] px-2.5 py-0.5 rounded">
                STAGE {stage.stageNumber}
              </span>
              <span className="text-xs font-medium text-gray-400">
                {currentModule?.title}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-white tracking-tight">
              【階段 {stage.stageNumber}｜{stage.title}】
            </h2>
            <p className="text-sm text-gray-400 mt-1.5 max-w-3xl">
              {stage.summary}
            </p>
          </div>

          {/* Completion Status Pill */}
          <div className="shrink-0 flex items-center gap-3">
            {isComplete ? (
              <div className="bg-[#2d5a27]/30 border border-[#7cae7a]/40 px-4 py-2.5 rounded-xl flex items-center gap-2.5 text-[#7cae7a] shadow-lg">
                <CheckCircle2 className="w-5 h-5 text-[#7cae7a]" />
                <div>
                  <div className="text-xs text-[#7cae7a]/80 font-medium">檢核狀態</div>
                  <div className="text-sm font-bold tracking-wide">本階段完成</div>
                </div>
              </div>
            ) : (
              <div className="bg-[#0d0f0d] border border-[#2d3a2d] px-4 py-2.5 rounded-xl flex items-center gap-2.5 text-gray-300">
                <Circle className="w-5 h-5 text-[#f27d26]" />
                <div>
                  <div className="text-xs text-gray-400 font-medium">領隊檢核中</div>
                  <div className="text-sm font-bold font-mono text-[#f27d26]">
                    {stats.completed} / {stats.total} 項完成
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5 Core Teaching Sections */}
      <div className="space-y-6">
        {/* 1. 【核心目的】 */}
        <section className="bg-[#141814] border border-[#2d3a2d] rounded-xl p-5 sm:p-6 shadow-md relative overflow-hidden">
          <div className="flex items-center gap-2.5 mb-3 text-[#7cae7a]">
            <span className="w-1 h-4 bg-[#7cae7a] rounded-full"></span>
            <h3 className="text-xs font-bold text-[#7cae7a] uppercase tracking-wider">
              一、核心目的（Why & Objective）
            </h3>
          </div>
          <div className="p-4 rounded-lg bg-[#0d0f0d] border border-[#2d3a2d] text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
            {stage.corePurpose}
          </div>
        </section>

        {/* 2. 【標準流程】 */}
        <section className="bg-[#141814] border border-[#2d3a2d] rounded-xl p-5 sm:p-6 shadow-md">
          <div className="flex items-center gap-2.5 mb-4 text-[#7cae7a]">
            <span className="w-1 h-4 bg-[#7cae7a] rounded-full"></span>
            <h3 className="text-xs font-bold text-[#7cae7a] uppercase tracking-wider">
              二、標準作業流程（Standard SOP Flow）
            </h3>
          </div>

          <div className="space-y-4">
            {stage.standardFlow.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-[#0d0f0d] border border-[#2d3a2d] rounded-xl p-4 sm:p-5 hover:border-[#435943] transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono font-bold text-xs text-[#7cae7a] bg-[#2d5a27]/30 px-2.5 py-1 rounded border border-[#7cae7a]/30 shrink-0 mt-0.5">
                    步驟 {step.stepNumber}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300 mt-1.5 leading-relaxed">
                      {step.description}
                    </p>

                    {step.keyPoints && step.keyPoints.length > 0 && (
                      <div className="mt-3.5 pt-3 border-t border-[#2d3a2d]">
                        <div className="text-xs font-semibold text-gray-400 mb-2">執行細部要點：</div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {step.keyPoints.map((point, idx) => (
                            <li
                              key={idx}
                              className="text-xs text-gray-300 bg-[#141814] border border-[#2d3a2d] px-3 py-2 rounded flex items-start gap-2"
                            >
                              <span className="text-[#7cae7a] font-mono mt-0.5">•</span>
                              <span className="leading-snug">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {step.templateSnippet && (
                      <div className="mt-4 bg-[#141814] border border-[#2d3a2d] rounded-lg p-3.5">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-semibold text-[#7cae7a] flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" /> 標準文字公版範本
                          </span>
                          <button
                            onClick={() => handleCopy(step.templateSnippet!, step.stepNumber)}
                            className="px-2.5 py-1 rounded text-xs bg-[#2d5a27] hover:bg-[#3d7a35] text-white flex items-center gap-1.5 transition-colors border border-[#7cae7a]/30"
                          >
                            {copiedSnippet === step.stepNumber ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-[#7cae7a]" />
                                <span className="text-[#7cae7a]">已複製</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-gray-300" />
                                <span>複製範本</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap leading-relaxed bg-[#0d0f0d] p-3 rounded border border-[#2d3a2d] overflow-x-auto">
                          {step.templateSnippet}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 【領隊注意事項】 */}
        <section className="bg-[#141814] border border-[#2d3a2d] rounded-xl p-5 sm:p-6 shadow-md">
          <div className="flex items-center gap-2.5 mb-4 text-[#7cae7a]">
            <span className="w-1 h-4 bg-[#7cae7a] rounded-full"></span>
            <h3 className="text-xs font-bold text-[#7cae7a] uppercase tracking-wider">
              三、領隊注意事項（Key Operational Warnings）
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {stage.leaderNotes.map((note, idx) => {
              const isDanger = note.type === 'danger';
              const isPrinciple = note.type === 'principle';

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex items-start gap-3 ${
                    isDanger
                      ? 'bg-rose-950/20 border-rose-900/40 text-rose-200'
                      : isPrinciple
                      ? 'bg-[#2d5a27]/20 border-[#7cae7a]/30 text-emerald-200'
                      : 'bg-[#f27d26]/10 border-[#f27d26]/30 text-amber-200'
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-[#0d0f0d] border border-[#2d3a2d] shrink-0 mt-0.5">
                    {isDanger ? (
                      <Flame className="w-4 h-4 text-rose-400" />
                    ) : isPrinciple ? (
                      <BookmarkCheck className="w-4 h-4 text-[#7cae7a]" />
                    ) : (
                      <Lightbulb className="w-4 h-4 text-[#f27d26]" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <span>{note.title}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#0d0f0d] border border-[#2d3a2d]">
                        {isDanger ? '重大警戒' : isPrinciple ? '核心準則' : '實務建議'}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm leading-relaxed text-gray-300">
                      {note.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. 【執行檢查表】 */}
        <section className="bg-[#161a16] border border-[#2d3a2d] rounded-xl p-5 sm:p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5 text-[#7cae7a]">
              <span className="w-1 h-4 bg-[#7cae7a] rounded-full"></span>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  四、領隊執行檢查表（實務檢核）
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  出團前逐項核實並點擊勾選，系統將自動保存檢核紀錄於本機。
                </p>
              </div>
            </div>

            {/* Quick Bulk Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleAllInStage(stage, true)}
                className="px-3 py-1.5 rounded-lg bg-[#2d5a27] hover:bg-[#3d7a35] text-white text-xs font-bold tracking-wider uppercase transition-all"
              >
                全部勾選
              </button>
              <button
                onClick={() => toggleAllInStage(stage, false)}
                className="px-3 py-1.5 rounded-lg bg-[#0d0f0d] border border-[#2d3a2d] text-gray-400 hover:text-white text-xs font-medium transition-all"
              >
                清除勾選
              </button>
            </div>
          </div>

          {/* Checklist Items Container */}
          <div className="space-y-2.5">
            {stage.checklist.map((item) => {
              const checked = isItemChecked(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                    checked
                      ? 'bg-[#2d5a27]/20 border-[#7cae7a]/50 text-white shadow-sm'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                        checked
                          ? 'border-2 border-[#7cae7a] bg-[#7cae7a] text-black font-bold'
                          : 'border-2 border-[#7cae7a]/60 bg-transparent hover:border-[#7cae7a]'
                      }`}
                    >
                      {checked && <Check className="w-3.5 h-3.5 stroke-[3] text-black" />}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm sm:text-base leading-snug ${checked ? 'line-through text-gray-400' : 'font-medium text-white'}`}>
                        {item.label}
                      </span>
                      {item.important && (
                        <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#f27d26] text-black">
                          必要核取
                        </span>
                      )}
                    </div>
                    {item.detail && (
                      <p className="text-xs text-gray-400 mt-1">
                        {item.detail}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. 【完成確認】 */}
        <section className="bg-[#141814] border border-[#2d3a2d] rounded-xl p-5 sm:p-6 shadow-md">
          <div className="flex items-center gap-2.5 mb-3 text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-[#7cae7a]" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              五、完成確認（Stage Verification）
            </h3>
          </div>

          {isComplete ? (
            <div className="bg-[#2d5a27]/25 border border-[#7cae7a]/40 rounded-xl p-5 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#2d5a27] border border-[#7cae7a] flex items-center justify-center text-white shrink-0 mx-auto sm:mx-0">
                  <Check className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">
                    【本階段完成】階段 {stage.stageNumber} 檢核項目已全數核訖
                  </div>
                  <div className="text-xs text-[#7cae7a] mt-0.5">
                    領隊已確認本階段標準作業流程，具備進入下一階段出團準備之條件。
                  </div>
                </div>
              </div>

              {nextStage ? (
                <button
                  onClick={() => onSelectStage(nextStage)}
                  className="px-5 py-2.5 rounded-lg bg-[#2d5a27] hover:bg-[#3d7a35] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shrink-0"
                >
                  <span>前進下一階段 ({nextStage.stageNumber})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onBackToModules}
                  className="px-5 py-2.5 rounded-lg bg-[#2d5a27] hover:bg-[#3d7a35] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shrink-0"
                >
                  <span>返回五大模組總覽</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="bg-[#0d0f0d] border border-[#2d3a2d] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-gray-200">
                  尚有 {stats.total - stats.completed} 個檢核項目未完成
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  請確認上方檢查表中的所有必要項目均已落實後勾選。
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleAllInStage(stage, true)}
                  className="px-4 py-2 rounded-lg bg-[#2d5a27] hover:bg-[#3d7a35] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  一鍵確認全數完成
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Bottom Paging Footer */}
      <div className="pt-4 border-t border-[#2d3a2d] flex items-center justify-between gap-4">
        {prevStage ? (
          <button
            onClick={() => {
              onSelectStage(prevStage);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-xl bg-[#141814] hover:bg-[#1a201a] text-gray-200 border border-[#2d3a2d] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>上一階段：{prevStage.stageNumber} {prevStage.shortTitle}</span>
          </button>
        ) : (
          <div />
        )}

        {nextStage ? (
          <button
            onClick={() => {
              onSelectStage(nextStage);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-xl bg-[#2d5a27] hover:bg-[#3d7a35] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors"
          >
            <span>下一階段：{nextStage.stageNumber} {nextStage.shortTitle}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onBackToModules}
            className="px-4 py-2.5 rounded-xl bg-[#141814] hover:bg-[#1a201a] text-gray-200 border border-[#2d3a2d] text-xs sm:text-sm font-semibold transition-colors"
          >
            返回五大模組
          </button>
        )}
      </div>
    </div>
  );
};
