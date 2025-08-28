import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, icon }) => {
  return (
    <div className="text-center space-y-3 mb-8">
      {icon && (
        <div className="flex justify-center">
          <div className="p-3 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full">
            {icon}
          </div>
        </div>
      )}
      <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>
      {subtitle && (
        <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;