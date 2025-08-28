import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { useGameContext } from '../state/GameContext';
import { talkToCharacter, answerQuestion, updateProgress } from '../state/actions';
import { getCharacterQuestions } from '../data/dialogTemplates';
import { characters } from '../data/characters';
import { places } from '../data/places';
import { calculateProgress } from '../state/selectors';
import SectionHeader from '../components/SectionHeader';
import EvidenceChip from '../components/EvidenceChip';
import type { CharacterId } from '../types';

const DialogRunner: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const { state, dispatch } = useGameContext();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showReply, setShowReply] = useState(false);
  const [newEvidenceIds, setNewEvidenceIds] = useState<string[]>([]);

  const character = characters.find(c => c.id === characterId as CharacterId);
  const characterPlace = places.find(p => p.charactersPresent.includes(characterId as CharacterId));
  
  const questions = state.selectedCaseId ? 
    getCharacterQuestions(state.selectedCaseId, characterId!) : [];
    
  const currentQuestion = questions[currentQuestionIndex];
  const hasMoreQuestions = currentQuestionIndex < questions.length - 1;

  useEffect(() => {
    if (characterId && !state.charactersTalked.includes(characterId as CharacterId)) {
      dispatch(talkToCharacter(characterId as CharacterId));
    }
  }, [characterId, dispatch, state.charactersTalked]);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const option = currentQuestion.options[optionIndex];
    
    if (option.grantsEvidenceIds?.length) {
      setNewEvidenceIds(option.grantsEvidenceIds);
      dispatch(answerQuestion(currentQuestion.id, option.grantsEvidenceIds, option.effects));
    } else if (option.effects) {
      dispatch(answerQuestion(currentQuestion.id, [], option.effects));
    }
    
    setShowReply(true);
    
    // Update progress
    const newProgress = calculateProgress(state);
    dispatch(updateProgress(newProgress));
  };

  const handleContinue = () => {
    if (hasMoreQuestions) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowReply(false);
      setNewEvidenceIds([]);
    }
  };

  const handleBackToMap = () => {
    navigate('/map');
  };

  if (!character || !currentQuestion) {
    return <div>شخصية غير موجودة</div>;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader 
          title={`حوار مع ${character.name}`}
          subtitle={`${character.role} في ${characterPlace?.name}`}
          icon={<MessageCircle className="w-8 h-8 text-white" />}
        />

        <div className="bg-white/10 rounded-xl p-6 mb-6">
          {/* Character Info */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-white/5 rounded-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center text-2xl">
              {character.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{character.name}</h3>
              <p className="text-gray-300">{character.role}</p>
              <p className="text-sm text-secondary-400">{characterPlace?.name}</p>
            </div>
          </div>

          {/* Question */}
          <div className="space-y-4">
            <div className="bg-primary-800/30 rounded-lg p-4">
              <p className="text-white font-medium text-lg leading-relaxed">
                {currentQuestion.text}
              </p>
            </div>

            {/* Options */}
            {!showReply && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`
                      w-full text-right p-4 rounded-lg transition-all duration-200 transform hover:scale-105
                      ${selectedOption === index
                        ? 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-gray-200 border border-white/20 hover:border-white/40'
                      }
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {/* Reply */}
            {showReply && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-secondary-800/30 rounded-lg p-4">
                  <p className="text-white">
                    <strong>{character.name}:</strong> {currentQuestion.replyAfterPick}
                  </p>
                </div>

                {/* New Evidence */}
                {newEvidenceIds.length > 0 && (
                  <div className="bg-green-800/20 border border-green-500/30 rounded-lg p-4">
                    <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      دليل جديد تم جمعه!
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {newEvidenceIds.map(evidenceId => {
                        const evidence = state.evidences.find(e => e.id === evidenceId);
                        return evidence && (
                          <EvidenceChip key={evidence.id} evidence={evidence} />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handleBackToMap}
            className="btn-ghost inline-flex items-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            <span>عودة للخريطة</span>
          </button>

          {showReply && hasMoreQuestions && (
            <button
              onClick={handleContinue}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <span>متابعة الأسئلة</span>
              <MessageCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogRunner;