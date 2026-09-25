import { useState, useEffect, useCallback, useMemo } from 'react';
import { SOP_MODULES } from '../data/sopData';
import { Stage } from '../types';

const STORAGE_KEY = 'amazon_mountain_sop_checklist_v1';

export function useChecklistStorage() {
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return {};
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedMap));
    } catch {
      // ignore
    }
  }, [checkedMap]);

  const toggleItem = useCallback((itemId: string) => {
    setCheckedMap((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  }, []);

  const isItemChecked = useCallback(
    (itemId: string) => !!checkedMap[itemId],
    [checkedMap]
  );

  const isStageComplete = useCallback(
    (stage: Stage) => {
      if (!stage.checklist || stage.checklist.length === 0) return false;
      return stage.checklist.every((item) => !!checkedMap[item.id]);
    },
    [checkedMap]
  );

  const getStageStats = useCallback(
    (stage: Stage) => {
      const total = stage.checklist.length;
      const completed = stage.checklist.filter((item) => !!checkedMap[item.id]).length;
      const isDone = total > 0 && completed === total;
      return { total, completed, isDone, percent: total > 0 ? Math.round((completed / total) * 100) : 0 };
    },
    [checkedMap]
  );

  const toggleAllInStage = useCallback((stage: Stage, targetState?: boolean) => {
    setCheckedMap((prev) => {
      const next = { ...prev };
      const shouldCheck = targetState !== undefined ? targetState : !stage.checklist.every((it) => !!prev[it.id]);
      stage.checklist.forEach((item) => {
        next[item.id] = shouldCheck;
      });
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    if (window.confirm('確定要清空所有已勾選的領隊檢核項目嗎？')) {
      setCheckedMap({});
    }
  }, []);

  // Overall calculations
  const totalItemsCount = useMemo(() => {
    return SOP_MODULES.reduce(
      (acc, mod) => acc + mod.stages.reduce((sAcc, s) => sAcc + s.checklist.length, 0),
      0
    );
  }, []);

  const completedItemsCount = useMemo(() => {
    let count = 0;
    SOP_MODULES.forEach((mod) => {
      mod.stages.forEach((s) => {
        s.checklist.forEach((item) => {
          if (checkedMap[item.id]) count++;
        });
      });
    });
    return count;
  }, [checkedMap]);

  const completedStagesCount = useMemo(() => {
    let count = 0;
    SOP_MODULES.forEach((mod) => {
      mod.stages.forEach((s) => {
        if (s.checklist.length > 0 && s.checklist.every((item) => !!checkedMap[item.id])) {
          count++;
        }
      });
    });
    return count;
  }, [checkedMap]);

  const overallPercent = totalItemsCount > 0 ? Math.round((completedItemsCount / totalItemsCount) * 100) : 0;

  return {
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
  };
}
