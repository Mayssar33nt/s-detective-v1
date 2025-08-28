import type { Evidence, CaseId } from '../types';

export const evidenceRegistry: Record<string, Evidence> = {
  // ========== BULLYING CASE EVIDENCE ==========
  'BUL-CLS-1': {
    id: 'BUL-CLS-1',
    title: 'خريطة تفاعل الصف',
    description: 'مخطط يوضح التفاعلات بين التلاميذ وتغيرها',
    caseId: 'bullying',
    placeId: 'classroom',
    characterId: 'omar',
    weight: { accuracy: 1 }
  },
  'BUL-CLS-2': {
    id: 'BUL-CLS-2', 
    title: 'سجل مشاركة سامي الزمني',
    description: 'تراجع واضح في مستوى مشاركة سامي منذ الأربعاء',
    caseId: 'bullying',
    placeId: 'classroom',
    characterId: 'omar',
    weight: { accuracy: 2 }
  },
  'BUL-LIB-1': {
    id: 'BUL-LIB-1',
    title: 'سجل جهاز مستعار f77',
    description: 'استخدام جهاز باسم مستعار مشبوه الساعة 12:50',
    caseId: 'bullying',
    placeId: 'library',
    characterId: 'ali',
    weight: { accuracy: 2, critical: 1 }
  },
  'BUL-PLY-1': {
    id: 'BUL-PLY-1',
    title: 'هتافات جارحة في الملعب',
    description: 'ألقاب وهتافات مؤذية موجهة لسامي',
    caseId: 'bullying',
    placeId: 'playground',
    characterId: 'kholoud',
    weight: { accuracy: 1 }
  },
  'BUL-NGJ-1': {
    id: 'BUL-NGJ-1',
    title: 'لقطة شاشة مجهولة',
    description: 'صورة شاشة تظهر رسائل مؤذية من مصدر غير معروف',
    caseId: 'bullying',
    placeId: 'classroom',
    characterId: 'najwa',
    weight: { accuracy: 1, critical: 1 }
  },
  'BUL-ADM-1': {
    id: 'BUL-ADM-1',
    title: 'شكاية رسمية',
    description: 'بلاغ مكتوب تم تقديمه للإدارة حول التنمر',
    caseId: 'bullying',
    placeId: 'admin',
    characterId: 'principal',
    weight: { accuracy: 1 }
  },
  'BUL-CNS-1': {
    id: 'BUL-CNS-1',
    title: 'توجيه إنصافي',
    description: 'نصائح للتعامل العادل والمتوازن مع الموقف',
    caseId: 'bullying',
    placeId: 'admin',
    characterId: 'mohammed',
    weight: { empathy: 1 }
  },
  'BUL-ACT-1': {
    id: 'BUL-ACT-1',
    title: 'جدول نشاط يبرئ نور',
    description: 'حضور نور الكامل في نشاط وقت الحادثة المزعومة',
    caseId: 'bullying',
    placeId: 'activities',
    characterId: 'ikram',
    weight: { accuracy: 2 }
  },
  'BUL-GAT-1': {
    id: 'BUL-GAT-1',
    title: 'ملاحظة دخول متأخر',
    description: 'سامي يصل متأخراً ومتردداً في الأيام الأخيرة',
    caseId: 'bullying',
    placeId: 'gate',
    characterId: 'guard',
    weight: { accuracy: 1 }
  },

  // ========== FRIENDS CONFLICT CASE EVIDENCE ==========
  'FCF-CLS-1': {
    id: 'FCF-CLS-1',
    title: 'تغير في مجموعات العمل',
    description: 'نور وفهد لم يعودا يعملان معاً في المشاريع',
    caseId: 'friends_conflict',
    placeId: 'classroom',
    characterId: 'omar',
    weight: { accuracy: 1 }
  },
  'FCF-CLS-2': {
    id: 'FCF-CLS-2',
    title: 'توتر ملحوظ',
    description: 'تجنب النظر والحديث بين الصديقين السابقين',
    caseId: 'friends_conflict',
    placeId: 'classroom',
    characterId: 'najwa',
    weight: { accuracy: 1 }
  },
  'FCF-PLY-1': {
    id: 'FCF-PLY-1',
    title: 'تجنب اللعب المشترك',
    description: 'توقف نور وفهد عن اللعب معاً في الملعب',
    caseId: 'friends_conflict',
    placeId: 'playground',
    characterId: 'kholoud',
    weight: { accuracy: 1 }
  },
  'FCF-LIB-1': {
    id: 'FCF-LIB-1',
    title: 'بحث منفصل',
    description: 'كل منهما يبحث في مواضيع مختلفة بدلاً من التعاون',
    caseId: 'friends_conflict',
    placeId: 'library',
    characterId: 'ali',
    weight: { accuracy: 1 }
  },
  'FCF-CNS-1': {
    id: 'FCF-CNS-1',
    title: 'استراتيجية الوساطة',
    description: 'خطة مدروسة لإصلاح العلاقة بين الأصدقاء',
    caseId: 'friends_conflict',
    placeId: 'admin',
    characterId: 'mohammed',
    weight: { empathy: 1 }
  },
  'FCF-ACT-1': {
    id: 'FCF-ACT-1',
    title: 'مشاركة منفصلة',
    description: 'كل منهما ينضم لأنشطة مختلفة تماماً',
    caseId: 'friends_conflict',
    placeId: 'activities',
    characterId: 'ikram',
    weight: { accuracy: 1 }
  },
  'FCF-ADM-1': {
    id: 'FCF-ADM-1',
    title: 'طلب تغيير المقعد',
    description: 'أحدهما طلب تغيير مقعده في الصف',
    caseId: 'friends_conflict',
    placeId: 'admin',
    characterId: 'principal',
    weight: { accuracy: 1 }
  },

  // ========== BIKE PRESSURE CASE EVIDENCE ==========
  'BIK-GAT-1': {
    id: 'BIK-GAT-1',
    title: 'ملاحظة تدفق الدراجات',
    description: 'ازدحام وتوتر في منطقة ركن الدراجات صباحاً',
    caseId: 'bike_pressure',
    placeId: 'gate',
    characterId: 'guard',
    weight: { accuracy: 2 }
  },
  'BIK-PLY-1': {
    id: 'BIK-PLY-1',
    title: 'مقارنات ضارة',
    description: 'تعليقات حول أنواع الدراجات وأسعارها',
    caseId: 'bike_pressure',
    placeId: 'playground',
    characterId: 'fahd',
    weight: { accuracy: 1 }
  },
  'BIK-CLS-1': {
    id: 'BIK-CLS-1',
    title: 'قلق مالي',
    description: 'تلميذ يبدو قلقاً حول تكاليف الدراجة الجديدة',
    caseId: 'bike_pressure',
    placeId: 'classroom',
    characterId: 'omar',
    weight: { empathy: 1 }
  },
  'BIK-CNS-1': {
    id: 'BIK-CNS-1',
    title: 'نصائح إدارة الضغط',
    description: 'استراتيجيات للتعامل مع الضغط الاجتماعي',
    caseId: 'bike_pressure',
    placeId: 'admin',
    characterId: 'mohammed',
    weight: { empathy: 1 }
  },
  'BIK-ADM-1': {
    id: 'BIK-ADM-1',
    title: 'سياسة المدرسة',
    description: 'قوانين المدرسة حول الممتلكات الشخصية',
    caseId: 'bike_pressure',
    placeId: 'admin',
    characterId: 'principal',
    weight: { accuracy: 1 }
  },

  // ========== FAMILY ISSUE CASE EVIDENCE ==========
  'FAM-CLS-1': {
    id: 'FAM-CLS-1',
    title: 'تذبذب التركيز',
    description: 'عدم انتظام في مستوى التركيز والأداء الأكاديمي',
    caseId: 'family_issue',
    placeId: 'classroom',
    characterId: 'omar',
    weight: { accuracy: 1 }
  },
  'FAM-CLS-2': {
    id: 'FAM-CLS-2',
    title: 'تغيرات سلوكية',
    description: 'انطوائية وتراجع في المشاركة الصفية',
    caseId: 'family_issue',
    placeId: 'classroom',
    characterId: 'najwa',
    weight: { empathy: 1 }
  },
  'FAM-LIB-1': {
    id: 'FAM-LIB-1',
    title: 'هروب للمكتبة',
    description: 'قضاء وقت مفرط في المكتبة تجنباً للعودة للمنزل',
    caseId: 'family_issue',
    placeId: 'library',
    characterId: 'ali',
    weight: { accuracy: 1, empathy: 1 }
  },
  'FAM-CNS-1': {
    id: 'FAM-CNS-1',
    title: 'خطة دعم أسري',
    description: 'استراتيجية شاملة لدعم التلميذ أثناء الأزمة الأسرية',
    caseId: 'family_issue',
    placeId: 'admin',
    characterId: 'mohammed',
    weight: { empathy: 2 }
  },
  'FAM-ADM-1': {
    id: 'FAM-ADM-1',
    title: 'تواصل مع الأهل',
    description: 'محاولات التواصل مع الأسرة لفهم الوضع',
    caseId: 'family_issue',
    placeId: 'admin',
    characterId: 'principal',
    weight: { accuracy: 1 }
  },

  // ========== EXAM ANXIETY CASE EVIDENCE ==========
  'EXM-CLS-1': {
    id: 'EXM-CLS-1',
    title: 'انخفاض المشاركة',
    description: 'تراجع واضح في المشاركة قبل فترة الامتحانات',
    caseId: 'exam_anxiety',
    placeId: 'classroom',
    characterId: 'omar',
    weight: { accuracy: 1 }
  },
  'EXM-LIB-1': {
    id: 'EXM-LIB-1',
    title: 'دراسة مفرطة',
    description: 'قضاء ساعات مفرطة في المكتبة مع علامات إرهاق',
    caseId: 'exam_anxiety',
    placeId: 'library',
    characterId: 'ali',
    weight: { accuracy: 1, empathy: 1 }
  },
  'EXM-CNS-1': {
    id: 'EXM-CNS-1',
    title: 'تقنيات إدارة القلق',
    description: 'استراتيجيات للتعامل مع قلق الامتحانات',
    caseId: 'exam_anxiety',
    placeId: 'admin',
    characterId: 'mohammed',
    weight: { empathy: 2 }
  },
  'EXM-PLY-1': {
    id: 'EXM-PLY-1',
    title: 'تجنب الأنشطة',
    description: 'تراجع في المشاركة في الأنشطة الرياضية',
    caseId: 'exam_anxiety',
    placeId: 'playground',
    characterId: 'kholoud',
    weight: { accuracy: 1 }
  },
  'EXM-ACT-1': {
    id: 'EXM-ACT-1',
    title: 'ورشة إدارة الضغط',
    description: 'برنامج لمساعدة التلاميذ على التعامل مع ضغط الامتحانات',
    caseId: 'exam_anxiety',
    placeId: 'activities',
    characterId: 'ikram',
    weight: { empathy: 1 }
  },

  // ========== ISOLATION CASE EVIDENCE ==========
  'ISO-CLS-1': {
    id: 'ISO-CLS-1',
    title: 'خريطة تفاعل متناقصة',
    description: 'تناقص واضح في الروابط الاجتماعية للتلميذ',
    caseId: 'isolation',
    placeId: 'classroom',
    characterId: 'omar',
    weight: { accuracy: 1 }
  },
  'ISO-PLY-1': {
    id: 'ISO-PLY-1',
    title: 'لعب منفرد',
    description: 'قضاء وقت الاستراحة وحيداً في زاوية الملعب',
    caseId: 'isolation',
    placeId: 'playground',
    characterId: 'kholoud',
    weight: { accuracy: 1, empathy: 1 }
  },
  'ISO-LIB-1': {
    id: 'ISO-LIB-1',
    title: 'ملاذ آمن',
    description: 'قضاء معظم الوقت الحر في المكتبة وحيداً',
    caseId: 'isolation',
    placeId: 'library',
    characterId: 'ali',
    weight: { accuracy: 1 }
  },
  'ISO-CNS-1': {
    id: 'ISO-CNS-1',
    title: 'برنامج إدماج اجتماعي',
    description: 'خطة متدرجة لإعادة دمج التلميذ اجتماعياً',
    caseId: 'isolation',
    placeId: 'admin',
    characterId: 'mohammed',
    weight: { empathy: 2 }
  },
  'ISO-ACT-1': {
    id: 'ISO-ACT-1',
    title: 'أنشطة جماعية مناسبة',
    description: 'أنشطة مصممة لتشجيع التفاعل الاجتماعي',
    caseId: 'isolation',
    placeId: 'activities',
    characterId: 'ikram',
    weight: { empathy: 1 }
  },
  'ISO-GAT-1': {
    id: 'ISO-GAT-1',
    title: 'وصول وانصراف منعزل',
    description: 'يأتي ويغادر وحيداً دون تفاعل مع الآخرين',
    caseId: 'isolation',
    placeId: 'gate',
    characterId: 'guard',
    weight: { accuracy: 1 }
  }
};

export const getEvidencesByCase = (caseId: CaseId): Evidence[] => {
  return Object.values(evidenceRegistry).filter(evidence => evidence.caseId === caseId);
};

export const getEvidenceById = (id: string): Evidence | undefined => {
  return evidenceRegistry[id];
};