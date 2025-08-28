export interface Detective {
  name: string;
  gender: 'M' | 'F';
  title: string;
  avatarUrl: string;
}

export type CaseId = 
  | 'friends_conflict'
  | 'bullying'
  | 'bike_pressure'
  | 'family_issue'
  | 'exam_anxiety'
  | 'isolation';

export type PlaceId = 
  | 'classroom'
  | 'library'
  | 'activities'
  | 'teachers_room'
  | 'admin'
  | 'playground'
  | 'gate';

export type CharacterId = 
  | 'omar'
  | 'ikram'
  | 'ali'
  | 'kholoud'
  | 'mohammed'
  | 'sami'
  | 'nour'
  | 'fahd'
  | 'najwa'
  | 'principal'
  | 'guard';

export interface Evidence {
  id: string;
  title: string;
  description?: string;
  caseId: CaseId;
  placeId: PlaceId;
  characterId?: CharacterId;
  weight: {
    accuracy?: number;
    empathy?: number;
    critical?: number;
  };
}

export interface DialogOption {
  label: string;
  grantsEvidenceIds?: string[];
  opensQuestionId?: string;
  effects?: {
    empathy?: number;
    trust?: number;
  };
}

export interface DialogQuestion {
  id: string;
  text: string;
  requiresEvidenceIds?: string[];
  tone?: 'neutral' | 'supportive' | 'accusatory';
  options: DialogOption[];
  replyAfterPick?: string;
}

export interface CharacterDialogBundle {
  characterId: CharacterId;
  questions: DialogQuestion[];
}

export interface CaseDialogPack {
  caseId: CaseId;
  bundles: CharacterDialogBundle[];
}

export interface EvidenceLink {
  id: string;
  evidence1Id: string;
  evidence2Id: string;
  reasoning: string;
  score: number;
  createdAt: Date;
}

export interface GameState {
  selectedCaseId: CaseId | null;
  detective: Detective | null;
  evidences: Evidence[];
  placesVisited: PlaceId[];
  charactersTalked: CharacterId[];
  links: EvidenceLink[];
  currentDialog: {
    characterId: CharacterId | null;
    questionIndex: number;
    answeredQuestionIds: string[];
  };
  progress: number;
  scores: {
    accuracy: number;
    speed: number;
    empathy: number;
    critical: number;
    intelligence: number;
  };
  startedAt: Date | null;
  completedAt: Date | null;
}

export interface Case {
  id: CaseId;
  title: string;
  description: string;
  briefing: string;
  targetEvidences: number;
}

export interface Place {
  id: PlaceId;
  name: string;
  description: string;
  charactersPresent: CharacterId[];
}

export interface Character {
  id: CharacterId;
  name: string;
  role: string;
  description: string;
  avatarUrl: string;
  places: PlaceId[];
}