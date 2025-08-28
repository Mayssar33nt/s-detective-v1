import type { CaseDialogPack, CharacterId, CaseId } from '../types';

// Dialog templates for each case and character
const dialogPacks: CaseDialogPack[] = [
  {
    caseId: 'bullying',
    bundles: [
      {
        characterId: 'omar',
        questions: [
          {
            id: 'omar-bul-1',
            text: 'لاحظت تغيراً في سلوك أحد التلاميذ مؤخراً. هل يمكنك مساعدتي في فهم الوضع؟',
            options: [
              {
                label: 'أخبرني عن التغيرات التي لاحظتها',
                grantsEvidenceIds: ['BUL-CLS-1'],
                effects: { empathy: 1 }
              },
              {
                label: 'هل تشك في وجود تنمر؟',
                grantsEvidenceIds: ['BUL-CLS-2'],
                effects: { trust: -1 }
              }
            ],
            replyAfterPick: 'سامي كان نشطاً جداً في المشاركة، لكن منذ الأربعاء الماضي أصبح صامتاً ومنطوياً.'
          }
        ]
      },
      {
        characterId: 'ali',
        questions: [
          {
            id: 'ali-bul-1',
            text: 'هل لاحظت أي نشاط غير عادي في المكتبة مؤخراً؟',
            options: [
              {
                label: 'أي نوع من النشاط تقصد؟',
                grantsEvidenceIds: ['BUL-LIB-1'],
                effects: { empathy: 1 }
              },
              {
                label: 'هل يستخدم أحد أجهزة الكمبيوتر بطريقة مشبوهة؟',
                grantsEvidenceIds: ['BUL-LIB-1'],
                effects: { trust: 1 }
              }
            ],
            replyAfterPick: 'نعم، لاحظت استخدام جهاز باسم مستعار f77 الساعة 12:50. كان يتصفح مواقع التواصل الاجتماعي.'
          }
        ]
      },
      {
        characterId: 'kholoud',
        questions: [
          {
            id: 'kholoud-bul-1',
            text: 'كيف الوضع في الملعب؟ هل هناك أي توترات بين التلاميذ؟',
            options: [
              {
                label: 'أخبريني عن التفاعلات بين التلاميذ',
                grantsEvidenceIds: ['BUL-PLY-1'],
                effects: { empathy: 1 }
              },
              {
                label: 'هل سمعت أي تعليقات مؤذية؟',
                grantsEvidenceIds: ['BUL-PLY-1'],
                effects: { trust: 1 }
              }
            ],
            replyAfterPick: 'للأسف، سمعت بعض الألقاب المؤذية موجهة لسامي أثناء اللعب. لم أتدخل فوراً وأشعر بالذنب.'
          }
        ]
      },
      {
        characterId: 'najwa',
        questions: [
          {
            id: 'najwa-bul-1',
            text: 'كممثلة للقسم، هل لاحظت أي مشاكل بين زملائك؟',
            options: [
              {
                label: 'أخبريني عما تعرفينه',
                grantsEvidenceIds: ['BUL-NGJ-1'],
                effects: { empathy: 1 }
              },
              {
                label: 'هل هناك رسائل مؤذية يتم تداولها؟',
                grantsEvidenceIds: ['BUL-NGJ-1'],
                effects: { trust: 1 }
              }
            ],
            replyAfterPick: 'وصلتني لقطة شاشة تظهر رسائل مؤذية، لكن لا أعرف من أرسلها. أشعر بالقلق على سامي.'
          }
        ]
      },
      {
        characterId: 'principal',
        questions: [
          {
            id: 'principal-bul-1',
            text: 'هل تم تقديم أي شكاوى رسمية حول التنمر؟',
            options: [
              {
                label: 'أريد الاطلاع على الشكاوى المقدمة',
                grantsEvidenceIds: ['BUL-ADM-1'],
                effects: { trust: 1 }
              },
              {
                label: 'ما هي سياسة المدرسة في التعامل مع التنمر؟',
                effects: { empathy: 1 }
              }
            ],
            replyAfterPick: 'نعم، تم تقديم بلاغ مكتوب من أحد الأولياء. نحن نأخذ هذه الأمور بجدية تامة.'
          }
        ]
      },
      {
        characterId: 'mohammed',
        questions: [
          {
            id: 'mohammed-bul-1',
            text: 'كمختص اجتماعي، ما رأيك في هذه الحالة؟',
            options: [
              {
                label: 'أريد نصائحك في التعامل مع الموقف',
                grantsEvidenceIds: ['BUL-CNS-1'],
                effects: { empathy: 2 }
              },
              {
                label: 'كيف يمكننا حماية الضحية؟',
                grantsEvidenceIds: ['BUL-CNS-1'],
                effects: { empathy: 1 }
              }
            ],
            replyAfterPick: 'المهم هو التعامل بعدالة مع جميع الأطراف. يجب حماية الضحية دون إلحاق الضرر بالآخرين.'
          }
        ]
      },
      {
        characterId: 'ikram',
        questions: [
          {
            id: 'ikram-bul-1',
            text: 'هل شاركت نور في الأنشطة مؤخراً؟',
            options: [
              {
                label: 'أريد التحقق من حضور نور',
                grantsEvidenceIds: ['BUL-ACT-1'],
                effects: { trust: 1 }
              },
              {
                label: 'هل لاحظت أي سلوك غريب منها؟',
                effects: { empathy: 1 }
              }
            ],
            replyAfterPick: 'نور كانت حاضرة في النشاط وقت الحادثة المزعومة. لديها جدول حضور كامل.'
          }
        ]
      },
      {
        characterId: 'guard',
        questions: [
          {
            id: 'guard-bul-1',
            text: 'هل لاحظت أي تغيير في سلوك التلاميذ عند الدخول؟',
            options: [
              {
                label: 'أخبرني عن ملاحظاتك',
                grantsEvidenceIds: ['BUL-GAT-1'],
                effects: { empathy: 1 }
              },
              {
                label: 'هل يبدو أحد التلاميذ خائفاً؟',
                grantsEvidenceIds: ['BUL-GAT-1'],
                effects: { trust: 1 }
              }
            ],
            replyAfterPick: 'سامي يصل متأخراً هذه الأيام، ويبدو مترددaً في الدخول. كأنه يتجنب شيئاً ما.'
          }
        ]
      }
    ]
  },
  {
    caseId: 'friends_conflict',
    bundles: [
      {
        characterId: 'omar',
        questions: [
          {
            id: 'omar-fcf-1',
            text: 'لاحظت تغيراً في ديناميكية الصف. هل يمكنك مساعدتي؟',
            options: [
              {
                label: 'ما التغيير الذي لاحظته؟',
                grantsEvidenceIds: ['FCF-CLS-1'],
                effects: { empathy: 1 }
              },
              {
                label: 'هل هناك مشكلة بين نور وفهد؟',
                grantsEvidenceIds: ['FCF-CLS-1'],
                effects: { trust: 1 }
              }
            ],
            replyAfterPick: 'نور وفهد كانا أفضل الأصدقاء، لكنهما لم يعودا يعملان معاً في المشاريع.'
          }
        ]
      },
      {
        characterId: 'najwa',
        questions: [
          {
            id: 'najwa-fcf-1',
            text: 'كممثلة القسم، هل تعرفين ما حدث بين نور وفهد؟',
            options: [
              {
                label: 'أخبريني ما تعرفينه',
                grantsEvidenceIds: ['FCF-CLS-2'],
                effects: { empathy: 1 }
              },
              {
                label: 'متى بدأت المشكلة؟',
                grantsEvidenceIds: ['FCF-CLS-2'],
                effects: { trust: 1 }
              }
            ],
            replyAfterPick: 'يتجنبان النظر لبعضهما البعض ولا يتحدثان. الجو متوتر جداً بينهما.'
          }
        ]
      }
    ]
  }
];

export const getCharacterQuestions = (caseId: CaseId, characterId: CharacterId) => {
  const pack = dialogPacks.find(p => p.caseId === caseId);
  if (!pack) return [];
  
  const bundle = pack.bundles.find(b => b.characterId === characterId);
  return bundle?.questions || [];
};

export const getAllDialogPacks = () => dialogPacks;