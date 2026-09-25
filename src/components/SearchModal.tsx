import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Layers, BookmarkCheck, CheckSquare, AlertTriangle } from 'lucide-react';
import { SOP_MODULES } from '../data/sopData';
import { Stage } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStage: (stage: Stage) => void;
}

interface SearchResult {
  stage: Stage;
  moduleTitle: string;
  matchType: 'title' | 'purpose' | 'step' | 'note' | 'checklist';
  snippet: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectStage }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const list: SearchResult[] = [];

    SOP_MODULES.forEach((mod) => {
      mod.stages.forEach((stage) => {
        // Match stage title
        if (stage.title.toLowerCase().includes(q) || stage.summary.toLowerCase().includes(q)) {
          list.push({
            stage,
            moduleTitle: mod.title,
            matchType: 'title',
            snippet: `${stage.title} — ${stage.summary}`,
          });
          return;
        }

        // Match core purpose
        if (stage.corePurpose.toLowerCase().includes(q)) {
          list.push({
            stage,
            moduleTitle: mod.title,
            matchType: 'purpose',
            snippet: stage.corePurpose,
          });
          return;
        }

        // Match steps
        const matchedStep = stage.standardFlow.find(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.description.toLowerCase().includes(q) ||
            s.keyPoints?.some((kp) => kp.toLowerCase().includes(q))
        );
        if (matchedStep) {
          list.push({
            stage,
            moduleTitle: mod.title,
            matchType: 'step',
            snippet: `${matchedStep.stepNumber} ${matchedStep.title}: ${matchedStep.description}`,
          });
          return;
        }

        // Match notes
        const matchedNote = stage.leaderNotes.find(
          (n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
        );
        if (matchedNote) {
          list.push({
            stage,
            moduleTitle: mod.title,
            matchType: 'note',
            snippet: `【${matchedNote.title}】${matchedNote.content}`,
          });
          return;
        }

        // Match checklist
        const matchedCheck = stage.checklist.find((c) => c.label.toLowerCase().includes(q));
        if (matchedCheck) {
          list.push({
            stage,
            moduleTitle: mod.title,
            matchType: 'checklist',
            snippet: `檢核項：${matchedCheck.label}`,
          });
        }
      });
    });

    return list;
  }, [query]);

  if (!isOpen) return null;

  const getMatchBadge = (type: SearchResult['matchType']) => {
    switch (type) {
      case 'title':
        return <span className="text-[10px] bg-[#2d5a27]/30 text-[#7cae7a] border border-[#7cae7a]/30 px-1.5 py-0.5 rounded">階段標題</span>;
      case 'purpose':
        return <span className="text-[10px] bg-[#2d5a27]/20 text-[#7cae7a] border border-[#7cae7a]/30 px-1.5 py-0.5 rounded">核心目的</span>;
      case 'step':
        return <span className="text-[10px] bg-[#2d5a27]/30 text-[#7cae7a] border border-[#7cae7a]/30 px-1.5 py-0.5 rounded">標準步驟</span>;
      case 'note':
        return <span className="text-[10px] bg-[#f27d26]/20 text-[#f27d26] border border-[#f27d26]/30 px-1.5 py-0.5 rounded">注意事項</span>;
      case 'checklist':
        return <span className="text-[10px] bg-[#f27d26]/20 text-[#f27d26] border border-[#f27d26]/30 px-1.5 py-0.5 rounded">檢核項目</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#161a16] border border-[#2d3a2d] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 bg-[#1a1f1a] border-b border-[#2d3a2d] flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜尋 SOP 關鍵字（例如：inReach、留守、Windy、退費、互助組、保險...）"
            className="flex-1 bg-transparent border-0 text-white placeholder-gray-500 focus:outline-none text-sm sm:text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-white p-1 text-xs"
            >
              清除
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#0d0f0d] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tag Suggestions */}
        <div className="px-4 py-2.5 bg-[#0d0f0d] border-b border-[#2d3a2d] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-gray-500 shrink-0">熱門關鍵字：</span>
          {['Windy', 'inReach', '互助組', '退費機制', '個資', '接駁', '保險', 'Go / No-Go'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2 py-0.5 rounded bg-[#161a16] hover:bg-[#202620] text-gray-300 border border-[#2d3a2d] transition-colors shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2 bg-[#141814]">
          {query.trim() === '' ? (
            <div className="text-center py-10 text-gray-500 text-sm">
              請輸入關鍵字搜尋教案五大模組與十大階段 SOP 條文
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-10 text-gray-500 text-sm">
              查無符合「{query}」的 SOP 教案內容
            </div>
          ) : (
            results.map((res, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectStage(res.stage);
                  onClose();
                }}
                className="p-3.5 rounded-xl bg-[#0d0f0d] border border-[#2d3a2d] hover:border-[#7cae7a]/50 hover:bg-[#161a16] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-black bg-[#f27d26] px-1.5 py-0.2 rounded">
                      STAGE {res.stage.stageNumber}
                    </span>
                    <span className="text-xs font-bold text-white group-hover:text-[#7cae7a] transition-colors">
                      {res.stage.title}
                    </span>
                  </div>
                  {getMatchBadge(res.matchType)}
                </div>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {res.snippet}
                </p>

                <div className="mt-2 text-[11px] text-gray-500 flex items-center justify-between">
                  <span>{res.moduleTitle}</span>
                  <span className="text-[#7cae7a] group-hover:underline flex items-center gap-1 font-medium">
                    前往階段 <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
