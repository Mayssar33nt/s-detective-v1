import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, ArrowRight, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useGameContext } from '../state/GameContext';
import { createLink } from '../state/actions';
import { getAvailableEvidenceForLinking } from '../state/selectors';
import SectionHeader from '../components/SectionHeader';
import EvidenceChip from '../components/EvidenceChip';
import type { EvidenceLink } from '../types';

const LinkingBoard: React.FC = () => {
  const { state, dispatch } = useGameContext();
  const navigate = useNavigate();
  
  const [evidence1Id, setEvidence1Id] = useState('');
  const [evidence2Id, setEvidence2Id] = useState('');
  const [reasoning, setReasoning] = useState('');

  const availableEvidences = getAvailableEvidenceForLinking(state);
  const canCreateLink = evidence1Id && evidence2Id && evidence1Id !== evidence2Id && reasoning.length >= 80;

  const handleCreateLink = () => {
    if (!canCreateLink) return;

    const link: EvidenceLink = {
      id: `link-${Date.now()}`,
      evidence1Id,
      evidence2Id,
      reasoning,
      score: reasoning.length >= 100 ? 2 : 1,
      createdAt: new Date()
    };

    dispatch(createLink(link));
    setEvidence1Id('');
    setEvidence2Id('');
    setReasoning('');
  };

  const handleDeleteLink = (linkId: string) => {
    // This would require a DELETE_LINK action - simplified for MVP
    console.log('Delete link:', linkId);
  };

  const evidence1 = state.evidences.find(e => e.id === evidence1Id);
  const evidence2 = state.evidences.find(e => e.id === evidence2Id);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader 
          title="ربط الأدلة"
          subtitle="اربط الأدلة المجمعة لتكوين فهم شامل للقضية"
          icon={<Link2 className="w-8 h-8 text-white" />}
        />

        <div className="space-y-8">
          {/* Create Link Form */}
          <div className="bg-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">إنشاء رابط جديد</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Evidence 1 */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  الدليل الأول
                </label>
                <select
                  value={evidence1Id}
                  onChange={(e) => setEvidence1Id(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-secondary-400"
                >
                  <option value="" className="bg-gray-800">اختر دليلاً</option>
                  {availableEvidences.map((evidence) => (
                    <option key={evidence.id} value={evidence.id} className="bg-gray-800">
                      {evidence.title}
                    </option>
                  ))}
                </select>
                {evidence1 && (
                  <div className="mt-2">
                    <EvidenceChip evidence={evidence1} />
                  </div>
                )}
              </div>

              {/* Evidence 2 */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  الدليل الثاني
                </label>
                <select
                  value={evidence2Id}
                  onChange={(e) => setEvidence2Id(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-secondary-400"
                >
                  <option value="" className="bg-gray-800">اختر دليلاً</option>
                  {availableEvidences.filter(e => e.id !== evidence1Id).map((evidence) => (
                    <option key={evidence.id} value={evidence.id} className="bg-gray-800">
                      {evidence.title}
                    </option>
                  ))}
                </select>
                {evidence2 && (
                  <div className="mt-2">
                    <EvidenceChip evidence={evidence2} />
                  </div>
                )}
              </div>
            </div>

            {/* Reasoning */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                لماذا ترى هذا الربط منطقياً؟ (80 حرف على الأقل)
              </label>
              <textarea
                value={reasoning}
                onChange={(e) => setReasoning(e.target.value)}
                rows={4}
                placeholder="اشرح كيف يرتبط هذان الدليلان وما يكشفانه معاً..."
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-400 resize-none"
              />
              <div className={`text-sm mt-1 ${reasoning.length >= 80 ? 'text-green-400' : 'text-gray-400'}`}>
                {reasoning.length} / 80 حرف
              </div>
            </div>

            <button
              onClick={handleCreateLink}
              disabled={!canCreateLink}
              className={`
                inline-flex items-center gap-2
                ${canCreateLink ? 'btn-primary' : 'bg-gray-600 text-gray-400 cursor-not-allowed py-3 px-6 rounded-lg'}
              `}
            >
              <Plus className="w-5 h-5" />
              <span>ربط الأدلة</span>
            </button>
          </div>

          {/* Existing Links */}
          {state.links.length > 0 && (
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">الروابط المنشأة</h3>
              <div className="space-y-4">
                {state.links.map((link) => {
                  const ev1 = state.evidences.find(e => e.id === link.evidence1Id);
                  const ev2 = state.evidences.find(e => e.id === link.evidence2Id);
                  
                  return (
                    <div key={link.id} className="bg-white/5 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {ev1 && <EvidenceChip evidence={ev1} />}
                          <span className="text-gray-400">←→</span>
                          {ev2 && <EvidenceChip evidence={ev2} />}
                        </div>
                        <button
                          onClick={() => handleDeleteLink(link.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-gray-300 text-sm">{link.reasoning}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => navigate('/map')}
            className="btn-ghost inline-flex items-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            <span>عودة للخريطة</span>
          </button>

          {state.evidences.length >= 4 && (
            <button
              onClick={() => navigate('/score')}
              className="btn-primary inline-flex items-center gap-2"
            >
              <span>التقييم النهائي</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkingBoard;