import type { Character } from '../types';

export const characters: Character[] = [
  {
    id: 'omar',
    name: 'أستاذ عمر',
    role: 'مربي القسم',
    description: 'مربي ذو خبرة يهتم بسلوك التلاميذ',
    avatarUrl: '/assets/characters/omar.png',
    places: ['classroom', 'teachers_room']
  },
  {
    id: 'ikram',
    name: 'أستاذة إكرام',
    role: 'منسقة الأنشطة',
    description: 'متخصصة في الأنشطة التربوية',
    avatarUrl: '/assets/characters/ikram.png', 
    places: ['activities', 'teachers_room']
  },
  {
    id: 'ali',
    name: 'أستاذ علي',
    role: 'أمين المكتبة',
    description: 'أمين المكتبة ومسؤول التقنية',
    avatarUrl: '/assets/characters/ali.png',
    places: ['library']
  },
  {
    id: 'kholoud',
    name: 'أستاذة خلود',
    role: 'التربية البدنية',
    description: 'أستاذة الرياضة والأنشطة البدنية',
    avatarUrl: '/assets/characters/kholoud.png',
    places: ['teachers_room', 'playground']
  },
  {
    id: 'mohammed',
    name: 'محمد',
    role: 'المختص الاجتماعي',
    description: 'مختص في الصحة النفسية والاجتماعية',
    avatarUrl: '/assets/characters/mohammed.png',
    places: ['admin']
  },
  {
    id: 'principal',
    name: 'المدير',
    role: 'مدير المؤسسة',
    description: 'مدير المدرسة المسؤول عن السياسات',
    avatarUrl: '/assets/characters/principal.png',
    places: ['admin']
  },
  {
    id: 'sami',
    name: 'سامي',
    role: 'تلميذ',
    description: 'تلميذ في المرحلة الثانوية',
    avatarUrl: '/assets/characters/sami.png',
    places: ['classroom']
  },
  {
    id: 'nour',
    name: 'نور',
    role: 'تلميذة',
    description: 'تلميذة متفوقة ونشطة',
    avatarUrl: '/assets/characters/nour.png',
    places: ['classroom']
  },
  {
    id: 'fahd',
    name: 'فهد',
    role: 'تلميذ',
    description: 'تلميذ يحب الرياضة',
    avatarUrl: '/assets/characters/fahd.png',
    places: ['playground']
  },
  {
    id: 'najwa',
    name: 'نجوى',
    role: 'ممثلة القسم',
    description: 'ممثلة القسم والمتحدثة باسم التلاميذ',
    avatarUrl: '/assets/characters/najwa.png',
    places: ['classroom']
  },
  {
    id: 'guard',
    name: 'عم أحمد',
    role: 'حارس المدرسة',
    description: 'حارس المدرسة الذي يراقب المدخل',
    avatarUrl: '/assets/characters/guard.png',
    places: ['gate']
  }
];