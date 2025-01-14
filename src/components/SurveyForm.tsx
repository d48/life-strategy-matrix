import React from 'react';
import { SurveyData } from '../types';

interface SurveyFormProps {
  data: SurveyData[];
  onDataChange: (newData: SurveyData[]) => void;
}

export const SurveyForm: React.FC<SurveyFormProps> = ({
  data,
  onDataChange
}) => {
  const handleChange = (id: string, field: keyof SurveyData, value: number) => {
    const newData = data.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onDataChange(newData);
  };

  return (
    <div className="space-y-6 p-10 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Life Areas Assessment
        </h2>
        <p className="text-gray-600">
          <ol className="list-decimal list-outside mt-5">
            <li className='mb-5'>
              <strong>Rate</strong> each <strong>life area</strong> based on its{' '}
              <strong>importance</strong> to you and your current{' '}
              <strong>satisfaction</strong> level. Also indicate{' '}
              <strong>how many hours per week</strong> you typically spend on
              each area.
            </li>
            <li className='mb-5'>
              After you have rated each life area, <strong>review</strong> the
              chart to see which areas are <strong>most important</strong> to
              you and <strong>how</strong> you're spending your time.
            </li>

            <li>
              <strong>Evaluate</strong> if any <strong>changes</strong> are
              needed to spend time in areas that{' '}
              <strong>align with your values and purpose</strong>.
            </li>
          </ol>
        </p>
        <p className="text-gray-600 mt-5"></p>
      </div>

      {data.map((item) => (
        <div
          key={item.id}
          className="space-y-4 pb-6 border-b border-gray-200 last:border-0"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {item.question}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Importance
                </label>
                <span className="text-sm text-gray-500">{item.importance}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={item.importance}
                onChange={(e) =>
                  handleChange(item.id, 'importance', Number(e.target.value))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-600 [&::-moz-range-thumb]:border-0 [&::-webkit-slider-runnable-track]:bg-gray-200 [&::-moz-range-track]:bg-gray-200"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Satisfaction
                </label>
                <span className="text-sm text-gray-500">
                  {item.satisfaction}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={item.satisfaction}
                onChange={(e) =>
                  handleChange(item.id, 'satisfaction', Number(e.target.value))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-600 [&::-moz-range-thumb]:border-0 [&::-webkit-slider-runnable-track]:bg-gray-200 [&::-moz-range-track]:bg-gray-200"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Time Spent (Hours/Week)
                </label>
                <span className="text-sm text-gray-500">{item.weight} hrs</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                value={item.weight}
                onChange={(e) =>
                  handleChange(item.id, 'weight', Number(e.target.value))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-600 [&::-moz-range-thumb]:border-0 [&::-webkit-slider-runnable-track]:bg-gray-200 [&::-moz-range-track]:bg-gray-200"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 hr</span>
                <span>40 hrs</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
