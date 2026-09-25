export interface ChecklistItem {
  id: string;
  label: string;
  detail?: string;
  important?: boolean;
}

export interface SOPStep {
  stepNumber: string;
  title: string;
  description: string;
  keyPoints?: string[];
  templateSnippet?: string;
}

export interface LeaderNote {
  type: 'danger' | 'warning' | 'tip' | 'principle';
  title: string;
  content: string;
}

export interface Stage {
  id: string;
  stageNumber: string; // e.g. "01"
  title: string;
  shortTitle: string;
  summary: string;
  moduleId: string;
  corePurpose: string;
  standardFlow: SOPStep[];
  leaderNotes: LeaderNote[];
  checklist: ChecklistItem[];
  practicalReference?: {
    title: string;
    description: string;
    items: string[];
    sampleTemplate?: string;
  };
}

export interface Module {
  id: string;
  moduleNumber: string; // e.g. "模組一"
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  stages: Stage[];
}

export type ViewMode = 'modules' | 'stage' | 'all-checklists' | 'search';
