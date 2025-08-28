import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, FileText, RotateCcw, Download, ArrowRight, Target, Zap, Heart, Brain, Lightbulb, User } from 'lucide-react';
import { useGameContext } from '../state/GameContext';
import { calculateScores, generateReport } from '../state/scoring';
import { resetGame } from '../state/actions';
import { clearGameState } from '../state/storage';
import SectionHeader from '../components/SectionHeader';

// Circular Progress Component
const CircularProgress: React.FC<{ 
  percentage: number; 
  size?: number; 
  strokeWidth?: number; 
  color?: string;
  icon?: React.ReactNode;
  label?: string;
}> = ({ 
  percentage, 
  size = 120, 
  strokeWidth = 8, 
  color = '#3b82f6',
  icon,
  label
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${color}40)`
            }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {icon && (
            <div className="mb-1" style={{ color }}>
              {icon}
            </div>
          )}
          <span className="text-2xl font-bold text-white">{percentage}</span>
        </div>
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-300 text-center">{label}</span>
      )}
    </div>
  );
};

const ScorePanel: React.FC = () => {
  const { state, dispatch } = useGameContext();
  const navigate = useNavigate();
  const [showAdviceModal, setShowAdviceModal] = useState(false);

  const scores = calculateScores(state);
  const averageScore = Math.round((scores.accuracy + scores.speed + scores.empathy + scores.critical + scores.intelligence) / 5);

  const skillData = [
    {
      key: 'accuracy',
      label: 'الدقة',
      score: scores.accuracy,
      color: '#10b981',
      icon: <Target className="w-6 h-6" />
    },
    {
      key: 'speed',
      label: 'السرعة',
      score: scores.speed,
      color: '#f59e0b',
      icon: <Zap className="w-6 h-6" />
    },
    {
      key: 'empathy',
      label: 'التعاطف',
      score: scores.empathy,
      color: '#ef4444',
      icon: <Heart className="w-6 h-6" />
    },
    {
      key: 'critical',
      label: 'التفكير النقدي',
      score: scores.critical,
      color: '#8b5cf6',
      icon: <Brain className="w-6 h-6" />
    },
    {
      key: 'intelligence',
      label: 'الذكاء',
      score: scores.intelligence,
      color: '#06b6d4',
      icon: <Lightbulb className="w-6 h-6" />
    }
  ];

  const getSpecialistAdvice = () => {
    const caseAdvice = {
      'bullying': {
        title: 'نصائح للتعامل مع التنمر',
        prevention: [
          'تعزيز الثقة بالنفس من خلال الأنشطة الإيجابية',
          'تعلم مهارات التواصل الحازم والواضح',
          'بناء شبكة دعم من الأصدقاء والمعلمين',
          'الإبلاغ الفوري عن أي حالة تنمر للمسؤولين'
        ],
        handling: [
          'عدم الرد بالعنف أو الانتقام',
          'طلب المساعدة من شخص بالغ موثوق',
          'توثيق الحوادث بالتواريخ والتفاصيل',
          'التركيز على الأنشطة الإيجابية والهوايات'
        ],
        support: [
          'التحدث مع المختص الاجتماعي في المدرسة',
          'الانضمام لمجموعات الدعم النفسي',
          'ممارسة تقنيات الاسترخاء والتأمل',
          'الحفاظ على التواصل المفتوح مع الأهل'
        ]
      },
      'friends_conflict': {
        title: 'نصائح لحل النزاعات بين الأصدقاء',
        prevention: [
          'التواصل الصادق والمفتوح مع الأصدقاء',
          'احترام الاختلافات في الآراء والشخصيات',
          'تجنب الغيرة والمقارنات الضارة',
          'وضع حدود صحية في العلاقات'
        ],
        handling: [
          'الاستماع لوجهة نظر الطرف الآخر',
          'الاعتذار عند الخطأ دون تبرير',
          'البحث عن حلول وسط مقبولة للجميع',
          'أخذ وقت للتفكير قبل اتخاذ قرارات متسرعة'
        ],
        support: [
          'طلب وساطة من شخص محايد وموثوق',
          'التركيز على الذكريات الإيجابية المشتركة',
          'تعلم مهارات حل المشكلات والتفاوض',
          'الاستعانة بالمرشد الطلابي عند الحاجة'
        ]
      },
      'exam_anxiety': {
        title: 'نصائح للتعامل مع قلق الامتحانات',
        prevention: [
          'وضع جدول دراسي منتظم ومتوازن',
          'ممارسة الرياضة والأنشطة البدنية',
          'الحصول على نوم كافي ومنتظم',
          'تناول غذاء صحي ومتوازن'
        ],
        handling: [
          'ممارسة تقنيات التنفس العميق',
          'تقسيم المواد إلى أجزاء صغيرة قابلة للإدارة',
          'استخدام تقنيات الاسترخاء والتأمل',
          'التفكير الإيجابي وتجنب الأفكار السلبية'
        ],
        support: [
          'التحدث مع المعلمين حول المخاوف',
          'الانضمام لمجموعات الدراسة التعاونية',
          'طلب المساعدة من المختص النفسي',
          'الحصول على دعم الأهل والأصدقاء'
        ]
      },
      'isolation': {
        title: 'نصائح للتعامل مع العزلة الاجتماعية',
        prevention: [
          'المشاركة في الأنشطة المدرسية والاجتماعية',
          'تطوير مهارات التواصل الاجتماعي',
          'بناء اهتمامات وهوايات مشتركة مع الآخرين',
          'التطوع في الأعمال الخيرية والمجتمعية'
        ],
        handling: [
          'البدء بخطوات صغيرة في التفاعل الاجتماعي',
          'الانضمام للأندية والجمعيات الطلابية',
          'طلب المساعدة من المرشد الطلابي',
          'التركيز على بناء علاقة واحدة قوية أولاً'
        ],
        support: [
          'التحدث مع المختص الاجتماعي في المدرسة',
          'الحصول على دعم نفسي متخصص',
          'المشاركة في برامج التأهيل الاجتماعي',
          'الاستفادة من برامج الدعم النفسي الجماعي'
        ]
      },
      'family_issue': {
        title: 'نصائح للتعامل مع المشاكل الأسرية',
        prevention: [
          'الحفاظ على التواصل المفتوح مع أفراد الأسرة',
          'احترام وجهات النظر المختلفة داخل الأسرة',
          'المشاركة في الأنشطة الأسرية الإيجابية',
          'تجنب التدخل في النزاعات بين الكبار'
        ],
        handling: [
          'التعبير عن المشاعر بطريقة هادئة ومحترمة',
          'البحث عن مساحة آمنة للتعبير عن الذات',
          'التركيز على الدراسة والأنشطة الإيجابية',
          'طلب المساعدة من شخص بالغ موثوق'
        ],
        support: [
          'التحدث مع المختص الاجتماعي في المدرسة',
          'الاستعانة بخدمات الإرشاد الأسري',
          'الانضمام لمجموعات الدعم للأطفال',
          'الحصول على دعم نفسي متخصص عند الحاجة'
        ]
      },
      'bike_pressure': {
        title: 'نصائح للتعامل مع الضغط الاجتماعي',
        prevention: [
          'بناء الثقة بالنفس والاستقلالية',
          'تعلم قول "لا" بطريقة مهذبة وحازمة',
          'اختيار الأصدقاء الإيجابيين والداعمين',
          'التركيز على القيم والمبادئ الشخصية'
        ],
        handling: [
          'عدم الانصياع للضغوط السلبية من الأقران',
          'البحث عن بدائل إيجابية للأنشطة الضارة',
          'طلب المساعدة من الكبار عند الحاجة',
          'التفكير في العواقب قبل اتخاذ القرارات'
        ],
        support: [
          'التحدث مع المرشد الطلابي حول الضغوط',
          'الانضمام لبرامج تعزيز الثقة بالنفس',
          'الحصول على دعم الأهل في اتخاذ القرارات',
          'المشاركة في أنشطة إيجابية بديلة'
        ]
      }
    };

    return caseAdvice[state.selectedCaseId as keyof typeof caseAdvice] || caseAdvice['bullying'];
  };

  const handleShowAdvice = () => {
    setShowAdviceModal(true);
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { text: 'ممتاز', color: 'text-green-400', bg: 'bg-green-500/20' };
    if (score >= 80) return { text: 'جيد جداً', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    if (score >= 70) return { text: 'جيد', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    if (score >= 60) return { text: 'مقبول', color: 'text-orange-400', bg: 'bg-orange-500/20' };
    return { text: 'يحتاج تحسين', color: 'text-red-400', bg: 'bg-red-500/20' };
  };

  const performance = getPerformanceLevel(averageScore);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="تقرير الأداء"
          subtitle="مراجعة شاملة لأدائك في التعامل مع الحالة"
          icon={<Trophy className="w-8 h-8 text-white" />}
        />

        {/* Main Score Card */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <CircularProgress
                percentage={averageScore}
                size={160}
                strokeWidth={12}
                color="#f59e0b"
                icon={<Trophy className="w-8 h-8" />}
              />
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-2">النتيجة الإجمالية</h3>
            <div className={`inline-flex items-center px-4 py-2 rounded-full ${performance.bg} ${performance.color} font-semibold`}>
              {performance.text}
            </div>
            <p className="text-gray-300 mt-2">من 100 درجة</p>
          </div>

          {/* Detective Info */}
          <div className="bg-white/5 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-white">{state.detective?.name}</h4>
                <p className="text-secondary-400">{state.detective?.title}</p>
                <p className="text-gray-400 text-sm">القضية: {state.selectedCaseId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {skillData.map((skill) => (
            <div key={skill.key} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
              <CircularProgress
                percentage={skill.score}
                size={100}
                strokeWidth={6}
                color={skill.color}
                icon={skill.icon}
                label={skill.label}
              />
            </div>
          ))}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-6 border border-blue-400/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{state.evidences.length}</div>
              <div className="text-blue-300 text-sm">أدلة مجمعة</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-6 border border-green-400/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{state.placesVisited.length}</div>
              <div className="text-green-300 text-sm">أماكن زارها</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-6 border border-purple-400/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{state.charactersTalked.length}</div>
              <div className="text-purple-300 text-sm">شخصيات حاورها</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl p-6 border border-orange-400/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">{state.links.length}</div>
              <div className="text-orange-300 text-sm">روابط أنشأها</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={handleShowAdvice}
            className="bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-semibold py-6 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
          >
            <span className="text-3xl">👨‍⚕️</span>
            <div className="text-right">
              <div className="font-bold">نصائح المختص</div>
              <div className="text-sm opacity-90">محمد الاجتماعي</div>
            </div>
          </button>

          <button
            onClick={() => {
              const report = generateReport(state);
              const blob = new Blob([report], { type: 'text/html;charset=utf-8' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'تقرير_الأداء.html';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-6 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
          >
            <Download className="w-6 h-6" />
            <div className="text-right">
              <div className="font-bold">تحميل التقرير</div>
              <div className="text-sm opacity-90">ملف HTML</div>
            </div>
          </button>

          <button
            onClick={() => {
              dispatch(resetGame());
              clearGameState();
              navigate('/');
            }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-6 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
          >
            <RotateCcw className="w-6 h-6" />
            <div className="text-right">
              <div className="font-bold">قضية جديدة</div>
              <div className="text-sm opacity-90">إعادة اللعب</div>
            </div>
          </button>
        </div>

        {/* Specialist Advice Modal */}
        {showAdviceModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
              <div className="p-6 border-b border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-2xl">👨‍⚕️</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">المختص الاجتماعي محمد</h2>
                      <p className="text-gray-600">نصائح وإرشادات متخصصة</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAdviceModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-3xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-8 text-right" dir="rtl">
                {(() => {
                  const advice = getSpecialistAdvice();
                  return (
                    <div className="space-y-8">
                      <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-gray-800 mb-3">{advice.title}</h3>
                        <p className="text-gray-600 text-lg">إرشادات شاملة للتعامل مع الحالة والوقاية منها</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Prevention */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 shadow-lg">
                          <h4 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-3">
                            <span className="text-2xl">🛡️</span>
                            الوقاية
                          </h4>
                          <ul className="space-y-3">
                            {advice.prevention.map((tip, index) => (
                              <li key={index} className="text-green-700 flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                                <span className="text-green-500 text-xl mt-0.5">•</span>
                                <span className="text-sm leading-relaxed">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Handling */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-lg">
                          <h4 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-3">
                            <span className="text-2xl">🤝</span>
                            التعامل
                          </h4>
                          <ul className="space-y-3">
                            {advice.handling.map((tip, index) => (
                              <li key={index} className="text-blue-700 flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                                <span className="text-blue-500 text-xl mt-0.5">•</span>
                                <span className="text-sm leading-relaxed">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Support */}
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 shadow-lg">
                          <h4 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-3">
                            <span className="text-2xl">💜</span>
                            الدعم
                          </h4>
                          <ul className="space-y-3">
                            {advice.support.map((tip, index) => (
                              <li key={index} className="text-purple-700 flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                                <span className="text-purple-500 text-xl mt-0.5">•</span>
                                <span className="text-sm leading-relaxed">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200 shadow-lg">
                        <h4 className="text-xl font-bold text-yellow-800 mb-3 flex items-center gap-3">
                          <span className="text-2xl">⚠️</span>
                          تذكر دائماً
                        </h4>
                        <p className="text-yellow-700 leading-relaxed">
                          لا تتردد في طلب المساعدة من المختصين والأشخاص الموثوقين. كل مشكلة لها حل، والخطوة الأولى هي الاعتراف بوجودها والبحث عن المساعدة المناسبة.
                        </p>
                      </div>

                      <div className="text-center mt-8">
                        <button
                          onClick={() => setShowAdviceModal(false)}
                          className="bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          شكراً لك، المختص محمد
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="text-center">
          <button
            onClick={() => navigate('/map')}
            className="btn-ghost inline-flex items-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            <span>عودة للخريطة</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScorePanel;