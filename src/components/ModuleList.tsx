import React from 'react';
import {
  Megaphone,
  ShieldCheck,
  Users,
  Radio,
  CloudSunRain,
  ChevronRight,
  CheckCircle2,
  CircleDashed,
  ArrowRight,
} from 'lucide-react';
import { SOP_MODULES, BRAND_INFO } from '../data/sopData';
import { Module, Stage } from '../types';

interface ModuleListProps {
  onSelectStage: (stage: Stage) => void;
  isStageComplete: (stage: Stage) => boolean;
  getStageStats: (stage: Stage) => { total: number; completed: number; isDone: boolean; percent: number };
}

export const ModuleList: React.FC<ModuleListProps> = ({
  onSelectStage,
  isStageComplete,
  getStageStats,
}) => {
  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Megaphone':
        return <Megaphone className="w-5 h-5 text-[#7cae7a]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#7cae7a]" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#7cae7a]" />;
      case 'Radio':
        return <Radio className="w-5 h-5 text-[#f27d26]" />;
      case 'CloudSunRain':
        return <CloudSunRain className="w-5 h-5 text-[#f27d26]" />;
      default:
        return <Megaphone className="w-5 h-5 text-[#7cae7a]" />;
    }
  };

  const getModuleCompletion = (module: Module) => {
    const totalStages = module.stages.length;
    const completedStages = module.stages.filter((s) => isStageComplete(s)).length;
    const isModuleDone = totalStages > 0 && completedStages === totalStages;
    return { totalStages, completedStages, isModuleDone };
  };

  return (
    <div className="space-y-6">
      {/* Intro Box */}
      <div className="bg-[#161a16] border border-[#2d3a2d] rounded-xl p-5 md:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#7cae7a] bg-[#2d5a27]/25 px-2.5 py-1 rounded-full border border-[#7cae7a]/30 mb-2">
              <span>出團標準作業系統</span>
              <span>•</span>
              <span>五大核心模組 ｜ 十個標準階段</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              高山團隊出團 SOP 階段指引
            </h2>
            <p className="text-sm text-gray-300 mt-1 max-w-3xl leading-relaxed">
              本教案為 <a href={BRAND_INFO.brandUrl} className="text-[#7cae7a] hover:underline font-medium">{BRAND_INFO.organization}</a> 領隊培訓標準教材。依序完成五大模組與各階段執行檢查，確保每一環節皆符合「專業嚴謹、團隊互助、科學安全、平安歸來」之規範。
            </p>
          </div>

          <div className="bg-[#0d0f0d] border border-[#2d3a2d] rounded-lg p-3.5 shrink-0 flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-mono font-black text-white">5</div>
              <div className="text-[11px] text-gray-400">核心模組</div>
            </div>
            <div className="h-8 w-px bg-[#2d3a2d]" />
            <div className="text-center">
              <div className="text-2xl font-mono font-black text-[#7cae7a]">10</div>
              <div className="text-[11px] text-gray-400">標準階段</div>
            </div>
            <div className="h-8 w-px bg-[#2d3a2d]" />
            <div className="text-center">
              <div className="text-2xl font-mono font-black text-[#f27d26]">47</div>
              <div className="text-[11px] text-gray-400">領隊檢核項</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Container */}
      <div className="space-y-6">
        {SOP_MODULES.map((module) => {
          const { totalStages, completedStages, isModuleDone } = getModuleCompletion(module);

          return (
            <div
              key={module.id}
              className="bg-[#141814] border border-[#2d3a2d] hover:border-[#3d533d] rounded-xl overflow-hidden transition-all shadow-md"
            >
              {/* Module Header Bar */}
              <div className="p-4 sm:p-5 bg-[#1a1f1a] border-b border-[#2d3a2d] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#0d0f0d] border border-[#2d3a2d] shrink-0">
                    {getModuleIcon(module.iconName)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-[#7cae7a] bg-[#2d5a27]/30 px-2 py-0.5 rounded border border-[#7cae7a]/30">
                        {module.moduleNumber}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {module.title}
                      </h3>
                      {isModuleDone && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#7cae7a] bg-[#2d5a27]/30 px-2 py-0.5 rounded border border-[#7cae7a]/40">
                          <CheckCircle2 className="w-3.5 h-3.5" /> 模組已完成
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">
                      {module.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#2d3a2d]">
                  <div className="text-xs font-mono text-gray-400">
                    完成階段：
                    <span className={`font-bold ml-1 ${completedStages === totalStages ? 'text-[#7cae7a]' : 'text-gray-300'}`}>
                      {completedStages}/{totalStages}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stages Grid in this Module */}
              <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-[#141814]">
                {module.stages.map((stage) => {
                  const stats = getStageStats(stage);

                  return (
                    <div
                      key={stage.id}
                      onClick={() => onSelectStage(stage)}
                      className={`group relative p-4 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                        stats.isDone
                          ? 'bg-[#2d5a27]/15 border-[#7cae7a]/40 hover:border-[#7cae7a]/70 hover:bg-[#2d5a27]/25'
                          : 'bg-[#0d0f0d]/80 border-[#2d3a2d] hover:border-[#425942] hover:bg-[#161a16]'
                      }`}
                    >
                      <div>
                        {/* Stage Top Bar */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold text-black bg-[#f27d26] px-2 py-0.5 rounded">
                              STAGE {stage.stageNumber}
                            </span>
                            <span className="text-xs text-gray-400">
                              {stage.checklist.length} 項檢核
                            </span>
                          </div>

                          {stats.isDone ? (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#7cae7a]">
                              <CheckCircle2 className="w-4 h-4 text-[#7cae7a]" />
                              <span>本階段完成</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-mono text-gray-400">
                              <CircleDashed className="w-3.5 h-3.5 text-gray-500" />
                              <span>{stats.completed}/{stats.total}</span>
                            </span>
                          )}
                        </div>

                        {/* Title & Summary */}
                        <h4 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-[#7cae7a] transition-colors">
                          {stage.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                          {stage.summary}
                        </p>
                      </div>

                      {/* Bottom Action Hint */}
                      <div className="mt-4 pt-3 border-t border-[#2d3a2d]/80 flex items-center justify-between text-xs">
                        {/* Progress Bar inside card */}
                        <div className="flex-1 max-w-[140px] bg-[#0d0f0d] rounded-full h-1.5 overflow-hidden mr-3 border border-[#2d3a2d]">
                          <div
                            className={`h-full transition-all duration-300 ${
                              stats.isDone ? 'bg-[#7cae7a]' : 'bg-[#f27d26]'
                            }`}
                            style={{ width: `${stats.percent}%` }}
                          />
                        </div>

                        <div className="text-gray-400 group-hover:text-[#7cae7a] flex items-center gap-1 font-medium transition-colors">
                          <span>進入教案與檢核</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
    </div>
  );
};
