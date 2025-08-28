import React from 'react';

interface AvatarPickerProps {
  selectedAvatar: string;
  onSelect: (avatar: string) => void;
  gender: 'M' | 'F';
}

const avatars = {
  M: [
    '/assets/avatars/detective_male_adult.png',
    '/assets/avatars/detective_male_young.png',
    '/assets/avatars/detective_male_expert.png'
  ],
  F: [
    '/assets/avatars/detective_female_adult.png', 
    '/assets/avatars/detective_female_young.png',
    '/assets/avatars/detective_female_expert.png'
  ]
};

const AvatarPicker: React.FC<AvatarPickerProps> = ({ selectedAvatar, onSelect, gender }) => {
  const availableAvatars = avatars[gender];

  const getAvatarIcon = (index: number) => {
    switch (index) {
      case 0: return '🔍'; // مبتدئ - عدسة مكبرة
      case 1: return '🕵️'; // متوسط - محقق
      case 2: return '🏆'; // عالية - كأس
      default: return '🔍';
    }
  };
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-200">درجة الخبرة في التحقيق</label>
      <div className="grid grid-cols-3 gap-4">
        {availableAvatars.map((avatar, index) => (
          <div
            key={avatar}
            onClick={() => onSelect(avatar)}
            className={`
              cursor-pointer p-3 rounded-xl border-2 transition-all duration-200 transform hover:scale-105
              ${selectedAvatar === avatar
                ? 'border-secondary-400 bg-secondary-500/20'
                : 'border-white/20 hover:border-white/40 bg-white/5'
              }
            `}
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
              {getAvatarIcon(index)}
            </div>
            <p className="text-center text-sm mt-2 text-gray-300">
              {index === 0 && (
                <>
                  المحقق المتدرّب
                  <br />
                  (Apprentice Detective)
                </>
              )}
              {index === 1 && (
                <>
                  المحقق المتمرس
                  <br />
                  (Skilled Investigator)
                </>
              )}
              {index === 2 && (
                <>
                  المحقق الأسطوري
                  <br />
                  (Legendary Detective)
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarPicker;