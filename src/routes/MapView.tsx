import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Building, BookOpen, Users, Coffee, Settings, Globe, Shield, ArrowLeft, ArrowRight } from 'lucide-react';
import { useGameContext } from '../state/GameContext';
import { visitPlace } from '../state/actions';
import { places } from '../data/places';
import { calculateProgress } from '../state/selectors';
import SectionHeader from '../components/SectionHeader';
import ProgressBar from '../components/ProgressBar';

const placeIcons = {
  classroom: Building,
  library: BookOpen,
  activities: Users,
  teachers_room: Coffee,
  admin: Settings,
  playground: Globe,
  gate: Shield
};

const MapView: React.FC = () => {
  const { state, dispatch } = useGameContext();
  const navigate = useNavigate();

  const currentProgress = calculateProgress(state);

  const handlePlaceClick = (placeId: typeof places[0]['id']) => {
    dispatch(visitPlace(placeId));
    navigate(`/place/${placeId}`);
  };

  return (
    <div className="min-h-screen p-6 pb-32">
      <div className="max-w-6xl mx-auto">
        <SectionHeader 
          title="خريطة المؤسسة"
          subtitle="اختر المكان الذي تريد استكشافه للبحث عن أدلة وشهود"
          icon={<Map className="w-8 h-8 text-white" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => {
            const Icon = placeIcons[place.id];
            const hasVisited = state.placesVisited.includes(place.id);
            
            return (
              <div
                key={place.id}
                onClick={() => handlePlaceClick(place.id)}
                className={`
                  relative cursor-pointer p-6 rounded-xl transition-all duration-300 transform hover:scale-105 card-shadow
                  ${hasVisited 
                    ? 'bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-400/50' 
                    : 'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40'
                  }
                `}
              >
                <div className="text-center space-y-4">
                  <div className={`
                    w-16 h-16 mx-auto rounded-full flex items-center justify-center
                    ${hasVisited 
                      ? 'bg-gradient-to-br from-green-400 to-green-600' 
                      : 'bg-gradient-to-br from-secondary-400 to-secondary-600'
                    }
                  `}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white">{place.name}</h3>
                    <p className="text-gray-300 text-sm">{place.description}</p>
                    <p className="text-secondary-400 text-xs mt-1">
                      {place.charactersPresent.length} شخصية متاحة
                    </p>
                  </div>
                </div>

                {hasVisited && (
                  <div className="absolute top-3 left-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {state.evidences.length > 0 && (
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => navigate('/avatar')}
              className="btn-ghost inline-flex items-center gap-2"
            >
              <ArrowRight className="w-5 h-5" />
              <span>عودة</span>
            </button>
            <button
              onClick={() => navigate('/linking')}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <span>ربط الأدلة</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <ProgressBar 
        progress={currentProgress}
        evidenceCount={state.evidences.length}
        placesVisited={state.placesVisited.length}
        charactersInteracted={state.charactersTalked.length}
        linksCreated={state.links.length}
      />
    </div>
  );
};

export default MapView;