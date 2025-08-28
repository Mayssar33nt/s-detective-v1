import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, RotateCcw, Info, Users, Target, Clock, Award, BookOpen } from 'lucide-react';
import { useGameContext } from '../state/GameContext';
import { selectCase, resetGame } from '../state/actions';
import { clearGameState } from '../state/storage';
import { cases } from '../data/cases';
import SectionHeader from '../components/SectionHeader';
import CaseCard from '../components/CaseCard';

const CaseSelect: React.FC = () => {
  const { state, dispatch } = useGameContext();
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCaseSelect = (caseId: typeof cases[0]['id']) => {
    dispatch(selectCase(caseId));
  };

  const handleNext = () => {
    if (state.selectedCaseId) {
      navigate('/avatar');
    }
  };

  const handleReset = () => {
    if (confirm('هل أنت متأكد من إعادة تعيين جميع البيانات؟ سيتم فقدان جميع التقدم المحرز.')) {
      dispatch(resetGame());
      clearGameState();
      // Force page reload to ensure clean state
      window.location.reload();
    }
  };

  const handleImageClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Image with Flip Animation */}
        <div className="mb-8 perspective-1000">
          <div 
            className={`relative w-full h-80 sm:h-96 md:h-80 cursor-pointer transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={handleImageClick}
          >
            {/* Front Side - Image */}
            <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/assets/detective.png"
                alt="المحقق الاجتماعي"
                className="w-full h-full object-cover"
                loading="eager"
                onError={(e) => {
                  console.error('Image failed to load:', e);
                  // Fallback to a placeholder
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                  المحقق الاجتماعي
                </h1>
                <p className="text-white/90 text-base drop-shadow-md">
                  اضغط لمعرفة المزيد عن اللعبة
                </p>
              </div>
              <div className="absolute top-4 right-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <Info className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Back Side - Game Info */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
              <div className="p-4 sm:p-6 h-full flex flex-col justify-between text-white">
                <div className="text-center">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold mb-2">عن اللعبة</h2>
                  <div className="w-8 sm:w-12 h-0.5 bg-secondary-400 mx-auto rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs flex-1 content-center">
                  <div className="bg-white/10 rounded-lg p-3 sm:p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-1 sm:mb-2">
                      <Target className="w-4 h-4 text-secondary-400" />
                      <h3 className="font-semibold text-xs sm:text-sm">الهدف</h3>
                    </div>
                    <p className="text-white/90 leading-relaxed text-xs">
                      تطوير مهارات التحقيق الاجتماعي وحل المشكلات المدرسية بطريقة تفاعلية وممتعة
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-lg p-3 sm:p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-1 sm:mb-2">
                      <Users className="w-4 h-4 text-secondary-400" />
                      <h3 className="font-semibold text-xs sm:text-sm">الشخصيات</h3>
                    </div>
                    <p className="text-white/90 leading-relaxed text-xs">
                      11 شخصية متنوعة من المعلمين والتلاميذ والإدارة، كل منها له دور مهم في القصة
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-lg p-3 sm:p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-1 sm:mb-2">
                      <BookOpen className="w-4 h-4 text-secondary-400" />
                      <h3 className="font-semibold text-xs sm:text-sm">القضايا</h3>
                    </div>
                    <p className="text-white/90 leading-relaxed text-xs">
                      6 قضايا اجتماعية مختلفة: التنمر، خلاف الأصدقاء، الضغط الاجتماعي، والمزيد
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-lg p-3 sm:p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-1 sm:mb-2">
                      <Award className="w-4 h-4 text-secondary-400" />
                      <h3 className="font-semibold text-xs sm:text-sm">التقييم</h3>
                    </div>
                    <p className="text-white/90 leading-relaxed text-xs">
                      نظام تقييم شامل يقيس الدقة، السرعة، التعاطف، التفكير النقدي والذكاء
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-white/80 text-xs">
                    من تطوير المختص الاجتماعي ذ. اوعليت محمد
                  </p>
                  <p className="text-secondary-400 text-xs mt-1">
                    اضغط مرة أخرى للعودة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SectionHeader 
          title="اختر القضية"
          subtitle="اختر إحدى القضايا الاجتماعية للتحقيق فيها وحلها"
          icon={<Search className="w-8 h-8 text-white" />}
        />

        {/* Reset Button */}
        {(state.selectedCaseId || state.detective || state.evidences.length > 0) && (
          <div className="text-center mb-6">
            <button
              onClick={handleReset}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>إعادة تعيين</span>
            </button>
            <p className="text-gray-400 text-sm mt-2">مسح جميع البيانات والبدء من جديد</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cases.map((caseItem) => (
            <CaseCard
              key={caseItem.id}
              case={caseItem}
              isSelected={state.selectedCaseId === caseItem.id}
              onSelect={() => handleCaseSelect(caseItem.id)}
            />
          ))}
        </div>

        {state.selectedCaseId && (
          <div className="text-center animate-slide-up">
            <div className="bg-white/10 rounded-xl p-6 mb-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-3">ملخص القضية</h3>
              <p className="text-gray-300 leading-relaxed">
                {cases.find(c => c.id === state.selectedCaseId)?.briefing}
              </p>
            </div>
            
            <button
              onClick={handleNext}
              className="btn-primary inline-flex items-center gap-2"
            >
              <span>التالي</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseSelect;