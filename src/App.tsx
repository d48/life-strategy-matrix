import React, { useState, useEffect } from 'react';
import { SurveyForm } from './components/SurveyForm';
import { ScatterPlotMatrix } from './components/ScatterPlotMatrix';
import { SurveyData } from './types';
import { Target } from 'lucide-react';
import { supabase } from './lib/supabase';

const initialData: SurveyData[] = [
  {
    id: '1',
    question: 'Career & Work',
    description: 'Professional growth, job satisfaction, workplace relationships, and career development goals.',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '2',
    question: 'Finance & Wealth',
    description: 'Financial security, savings, investments, budgeting, and long-term financial planning.',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '3',
    question: 'Health & Fitness',
    description: 'Physical well-being, exercise, nutrition, sleep quality, and preventive healthcare.',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '4',
    question: 'Mental & Emotional Well-being',
    description: 'Psychological health, stress management, emotional intelligence, and mental resilience.',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '5',
    question: 'Relationships & Family',
    description: 'Quality of personal relationships, family bonds, and social connections.',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '6',
    question: 'Personal Growth',
    description: 'Self-improvement, learning new skills, and developing personal capabilities.',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '7',
    question: 'Spirituality & Faith',
    description: 'Religious or spiritual practices, beliefs, and connection to higher purpose.',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '8',
    question: 'Recreation & Hobbies',
    description: 'Leisure activities, creative pursuits, and enjoyable pastimes.',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '9',
    question: 'Home & Environment',
    description: 'Living space, home maintenance, and creating a comfortable environment.',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '10',
    question: 'Community & Social Impact',
    description: 'Contributing to society, volunteering, and making a positive difference.',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '11',
    question: 'Learning & Education',
    description: 'Formal education, self-study, and intellectual development.',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '12',
    question: 'Travel & Adventure',
    description: 'Exploring new places, experiencing different cultures, and creating memories.',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '13',
    question: 'Time Management',
    description: 'Organization, productivity, and balance between different life areas.',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '14',
    question: 'Creative Expression',
    description: 'Artistic pursuits, self-expression, and creative outlets.',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '15',
    question: 'Social Life & Friends',
    description: 'Friendships, social activities, and building meaningful connections.',
    importance: 5,
    satisfaction: 5,
    weight: 1
  },
  {
    id: '16',
    question: 'Life Vision & Purpose',
    description: 'Long-term goals, personal mission, and sense of purpose.',
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