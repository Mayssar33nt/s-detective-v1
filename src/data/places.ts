import type { Place } from '../types';

export const places: Place[] = [
  {
    id: 'classroom',
    name: 'القسم',
    description: 'حيث يتم التعلم والتفاعل اليومي',
    charactersPresent: ['omar', 'sami', 'nour', 'najwa']
  },
  {
    id: 'library',
    name: 'المكتبة',
    description: 'مكان هادئ للقراءة والبحث',
    charactersPresent: ['ali']
  },
  {
    id: 'activities',
    name: 'قاعة الأنشطة',
    description: 'مركز الأنشطة اللاصفية والإبداع',
    charactersPresent: ['ikram']
  },
  {
    id: 'teachers_room',
    name: 'قاعة الأساتذة',
    description: 'مكان راحة وتنسيق المدرسين',
    charactersPresent: ['omar', 'ikram', 'kholoud']
  },
  {
    id: 'admin',
    name: 'الإدارة',
    description: 'مكتب الإدارة والمختص الاجتماعي',
    charactersPresent: ['principal', 'mohammed']
  },
  {
    id: 'playground',
    name: 'الملعب',
    description: 'ساحة اللعب والرياضة',
    charactersPresent: ['kholoud', 'fahd']
  },
  {
    id: 'gate',
    name: 'مدخل المؤسسة',
    description: 'المدخل الرئيسي للمدرسة',
    charactersPresent: ['guard']
  }
];