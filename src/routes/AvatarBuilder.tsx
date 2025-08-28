import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ArrowLeft, ArrowRight } from 'lucide-react';
import { useGameContext } from '../state/GameContext';
import { createDetective } from '../state/actions';
import { DETECTIVE_TITLES } from '../data/constants';
import { cases } from '../data/cases';
import SectionHeader from '../components/SectionHeader';
import AvatarPicker from '../components/AvatarPicker';

const AvatarBuilder: React.FC = () => {
  const { state, dispatch } = useGameContext();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'M' | 'F'>('M');
  const [title, setTitle] = useState(DETECTIVE_TITLES[0]);
  const [avatarUrl, setAvatarUrl] = useState('/assets/avatars/detective_male_adult.png');

  const handleGenderChange = (newGender: 'M' | 'F') => {
    setGender(newGender);
    setAvatarUrl(newGender === 'M' ? '/assets/avatars/detective_male_adult.png' : '/assets/avatars/detective_female_adult.png');
  };

  const handleStartInvestigation = () => {
    if (!name.trim()) return;
    
    dispatch(createDetective({
      name: name.trim(),
      gender,
      title,
      avatarUrl
    }));
    
    navigate('/map');
  };

  const isFormValid = name.trim().length > 0;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader 
          title="إنشاء شخصية المحقق"
          subtitle="قم بتخصيص شخصية المحقق الاجتماعي"
          icon={<User className="w-8 h-8 text-white" />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <div className="bg-white/10 rounded-xl p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  الاسم *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="أدخل اسمك"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-400"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">الجنس</label>
                <div className="flex gap-4">
                  {[
                    { value: 'M', label: 'ذكر' },
                    { value: 'F', label: 'أنثى' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={option.value}
                        checked={gender === option.value}
                        onChange={() => handleGenderChange(option.value as 'M' | 'F')}
                        className="w-4 h-4 text-secondary-500"
                      />
                      <span className="text-white">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">اللقب</label>
                <select
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-secondary-400"
                >
                  {DETECTIVE_TITLES.map((titleOption) => (
                    <option key={titleOption} value={titleOption} className="bg-gray-800">
                      {titleOption}
                    </option>
                  ))}
                </select>
              </div>

              <AvatarPicker
                selectedAvatar={avatarUrl}
                onSelect={setAvatarUrl}
                gender={gender}
              />
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">معاينة بطاقة المحقق</h3>
              
              <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl p-6 text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center text-4xl">
                  {gender === 'M' ? '🕵️‍♂️' : '🕵️‍♀️'}
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-white">
                    {name || 'اسم المحقق'}
                  </h4>
                  <p className="text-white/80">
                    {gender === 'F' ? title.replace('المحقق', 'المحققة').replace('الاجتماعي', 'الاجتماعية') : title}
                  </p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/90 text-sm">
                    القضية: {cases.find(c => c.id === state.selectedCaseId)?.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={() => navigate('/')}
            className="btn-ghost inline-flex items-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            <span>رجوع</span>
          </button>
          
          <button
            onClick={handleStartInvestigation}
            disabled={!isFormValid}
            className={`
              inline-flex items-center gap-2
              ${isFormValid ? 'btn-primary' : 'bg-gray-600 text-gray-400 cursor-not-allowed py-3 px-6 rounded-lg'}
            `}
          >
            <span>بدء التحقيق</span>
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarBuilder;