import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useGameContext } from '../state/GameContext';
import { places } from '../data/places';
import { characters } from '../data/characters';
import SectionHeader from '../components/SectionHeader';
import CharacterCard from '../components/CharacterCard';
import type { PlaceId } from '../types';

const PlaceCharacters: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const { state } = useGameContext();
  const navigate = useNavigate();

  const place = places.find(p => p.id === placeId as PlaceId);
  const placeCharacters = characters.filter(char => 
    place?.charactersPresent.includes(char.id)
  );

  if (!place) {
    return <div>مكان غير موجود</div>;
  }

  const handleCharacterClick = (characterId: string) => {
    navigate(`/dialog/${characterId}`);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader 
          title={`شخصيات ${place.name}`}
          subtitle={place.description}
          icon={<MessageCircle className="w-8 h-8 text-white" />}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {placeCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onClick={() => handleCharacterClick(character.id)}
              hasInteracted={state.charactersTalked.includes(character.id)}
            />
          ))}
        </div>

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

export default PlaceCharacters;