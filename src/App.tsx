import React, { useState, useEffect } from 'react';
import { SurveyForm } from './components/SurveyForm';
import { ScatterPlotMatrix } from './components/ScatterPlotMatrix';
import { SurveyData } from './types';
import { Target } from 'lucide-react';
import { supabase } from './lib/supabase';

const initialData: SurveyData[] = [
  {
    id: '1',
    question: 'Significant Other',
    description: 'Date nights, shared hobbies, daily communication, planning future together',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '2',
    question: 'Family',
    description: 'Family dinners, holiday celebrations, video calls with relatives, helping with homework',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '3',
    question: 'Friendship',
    description: 'Coffee meetups, group activities, regular check-ins, shared celebrations',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '4',
    question: 'Physical Health / Sports',
    description: 'Gym workouts, team sports, yoga, running, hiking',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '5',
    question: 'Mental Health / Mindfulness',
    description: 'Meditation, therapy sessions, journaling, stress management',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '6',
    question: 'Spirituality / Faith',
    description: 'Religious services, prayer, spiritual reading, meditation practice',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '7',
    question: 'Community / Citizenship',
    description: 'Volunteering, neighborhood events, local government participation',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '8',
    question: 'Societal Engagement',
    description: 'Activism, charitable giving, environmental initiatives',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '9',
    question: 'Job / Career',
    description: 'Work tasks, professional development, networking, skill building',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '10',
    question: 'Education / Learning',
    description: 'Online courses, reading, workshops, language learning',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '11',
    question: 'Financing',
    description: 'Budgeting, investing, financial planning, tracking expenses',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '12',
    question: 'Hobbies / Interests',
    description: 'Photography, gardening, cooking, musical instruments',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '13',
    question: 'Online Entertainment',
    description: 'Streaming services, social media, video games, podcasts',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '14',
    question: 'Offline Entertainment',
    description: 'Reading books, attending concerts, theater, museums',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '15',
    question: 'Physiological Needs',
    description: 'Sleep, nutrition, hydration, rest',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '16',
    question: 'Activities of Daily Living',
    description: 'Cleaning, grocery shopping, personal hygiene, commuting',
    importance: 5,
    satisfaction: 5,
    weight: 1
  }
];

function App() {
  const [surveyData, setSurveyData] = useState<SurveyData[]>(initialData);

  useEffect(() => {
    const loadSharedData = async () => {
      const params = new URLSearchParams(window.location.search);
      const shareId = params.get('share');
      
      if (shareId) {
        try {
          const { data, error } = await supabase
            .from('surveys')
            .select('data')
            .eq('id', shareId)
            .single();

          if (error) throw error;
          if (data) {
            setSurveyData(data.data);
          }
        } catch (error) {
          console.error('Error loading shared data:', error);
          alert('Failed to load shared data. The link might be invalid.');
        }
      }
    };

    loadSharedData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-indigo-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Life Strategy Matrix</h1>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto px-4">
            Strategic thinking to create the life you want. Applying corporate strategy for business success combined with a positive psychology framework to help you live a meaningful life.{' '}
            <a 
              href="https://www.youtube.com/watch?v=dbiNhAZlXZk" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-indigo-600 hover:text-indigo-800"
            >
              Inspired by Boston Consulting Group presentation
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:order-2 sticky top-0 z-10 bg-gray-100 pt-4 pb-4">
            <ScatterPlotMatrix data={surveyData} />
          </div>
          <div className="lg:order-1">
            <SurveyForm data={surveyData} onDataChange={setSurveyData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;