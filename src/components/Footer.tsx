import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-6 mt-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center space-y-2">
          <p className="text-white/80 text-sm">
            من تطوير المختص الاجتماعي ذ. اوعليت محمد
          </p>
          <div className="flex items-center justify-center gap-2 text-white/60 text-xs">
            <span>صنع بحب</span>
            <Heart className="w-4 h-4 text-red-400 fill-current" />
            <span>2026 ©</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;