import React from 'react';

interface ProgressBarProps {
  progress: number;
  evidenceCount: number;
  placesVisited: number;
  charactersInteracted: number;
  linksCreated: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  evidenceCount,
  placesVisited,
  charactersInteracted,
  linksCreated
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm p-4 border-t border-white/20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">تقدم التحقيق</h3>
          <span className="text-2xl font-bold text-secondary-400">{progress}%</span>
        </div>
        
        <div className="progress-bar mb-3">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-secondary-400 font-semibold">{evidenceCount}</div>
            <div className="text-gray-300">أدلة مجمعة</div>
          </div>
          <div className="text-center">
            <div className="text-secondary-400 font-semibold">{placesVisited}</div>
            <div className="text-gray-300">أماكن زارها</div>
          </div>
          <div className="text-center">
            <div className="text-secondary-400 font-semibold">{charactersInteracted}</div>
            <div className="text-gray-300">شخصيات حاورها</div>
          </div>
          <div className="text-center">
            <div className="text-secondary-400 font-semibold">{linksCreated}</div>
            <div className="text-gray-300">روابط أنشأها</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;