import type { CaseId, PlaceId, CharacterId } from '../types';

export const CASE_IDS: CaseId[] = [
  'friends_conflict',
  'bullying', 
  'bike_pressure',
  'family_issue',
  'exam_anxiety',
  'isolation'
];

export const PLACE_IDS: PlaceId[] = [
  'classroom',
  'library',
  'activities',
  'teachers_room',
  'admin',
  'playground',
  'gate'
];

export const CHARACTER_IDS: CharacterId[] = [
  'omar',
  'ikram',
  'ali',
  'kholoud',
  'mohammed',
  'sami',
  'nour',
  'fahd',
  'najwa',
  'principal',
  'guard'
];

export const DETECTIVE_TITLES = [
  'المحقق الاجتماعي',
  'كاشف الأسرار',
  'فارس المدرسة',
  'الحكيم',
  'المنصفة',
  'الحكيمة',
  'مكتشفة الأسرار'
];

export const TARGET_EVIDENCES = 8;
export const MIN_LINKING_REASONING_LENGTH = 80;