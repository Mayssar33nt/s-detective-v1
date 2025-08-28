import type { Case } from '../types';

export const cases: Case[] = [
  {
    id: 'friends_conflict',
    title: 'خلاف أصدقاء',
    description: 'تدهور علاقة صداقة بين تلميذين مقربين',
    briefing: 'لاحظت إدارة المدرسة تغيراً في علاقة صداقة قوية. مهمتك اكتشاف الأسباب واقتراح حل.',
    targetEvidences: 8
  },
  {
    id: 'bullying',
    title: 'تنمر وعنف مدرسي', 
    description: 'حالة تنمر محتملة تؤثر على تلميذ',
    briefing: 'تم الإبلاغ عن تغيرات سلوكية لدى أحد التلاميذ. ابحث عن أدلة التنمر وطرق المعالجة.',
    targetEvidences: 8
  },
  {
    id: 'bike_pressure',
    title: 'ضغط الدراجات',
    description: 'مشكلة تتعلق بركن الدراجات والضغط الاجتماعي',
    briefing: 'شكاوى من سلوكيات في منطقة ركن الدراجات تحتاج للتحقيق.',
    targetEvidences: 8
  },
  {
    id: 'family_issue',
    title: 'مشكل أسري',
    description: 'تأثير المشاكل العائلية على الأداء المدرسي',
    briefing: 'انخفاض أداء تلميذ مع مؤشرات لمشاكل أسرية تحتاج لمعالجة حساسة.',
    targetEvidences: 8
  },
  {
    id: 'exam_anxiety',
    title: 'قلق من الامتحانات',
    description: 'قلق شديد من الامتحانات يؤثر على التلاميذ',
    briefing: 'ازدياد حالات القلق قبل فترة الامتحانات. ابحث عن الأسباب وطرق الدعم.',
    targetEvidences: 8
  },
  {
    id: 'isolation',
    title: 'العزلة والوحدة',
    description: 'تلميذ يعاني من العزلة الاجتماعية',
    briefing: 'ملاحظة تراجع في التفاعل الاجتماعي لأحد التلاميذ. ابحث عن الأسباب والحلول.',
    targetEvidences: 8
  }
];