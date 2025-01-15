import React, { useState } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Scatter } from 'react-chartjs-2';
import { SurveyData } from '../types';
import { Share2, Maximize2, Minimize2, BarChart2, Table } from 'lucide-react';
import { nanoid } from 'nanoid';
import { supabase } from '../lib/supabase';
import { TableView } from './TableView';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, annotationPlugin);

interface ScatterPlotMatrixProps {
  data: SurveyData[];
}

export const ScatterPlotMatrix: React.FC<ScatterPlotMatrixProps> = ({ data }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  const handleShare = async () => {
    try {
      setIsSharing(true);
      setShareError(null);
      
      const id = nanoid(10);
      const url = `${window.location.origin}?share=${id}`;
      
      try {
        await navigator.clipboard.writeText(url);
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
      }

      const { error } = await supabase
        .from('surveys')
        .insert([{ id, data }]);

      if (error) throw error;

      setShareUrl(url);
    } catch (error) {
      console.error('Error sharing chart:', error);
      setShareError('Failed to save chart data. The URL was copied to your clipboard.');
    } finally {
      setIsSharing(false);
    }
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'chart' ? 'table' : 'chart');
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        min: 0,
        max: 10,
        title: {
          display: true,
          text: 'Satisfaction',
          font: {
            size: 14,
            weight: 700
          }
        },
        grid: {
          display: false,
          drawBorder: true,
        },
        ticks: {
          display: true,
          callback: function(tickValue: number | string) {
            if (tickValue === 0) return 'Low';
            if (tickValue === 10) return 'High';
            return tickValue;
          }
        }
      },
      y: {
        min: 0,
        max: 10,
        title: {
          display: true,
          text: 'Importance',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          display: false,
          drawBorder: true,
        },
        ticks: {
          display: true,
          callback: function(value: number) {
            if (value === 0) return 'Low';
            if (value === 10) return 'High';
            return value;
          }
        }
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: { dataIndex: number }) => {
            const point = data[context.dataIndex];
            return `${point.question} (Time Spent: ${point.weight} hours)`;
          },
        },
      },
      annotation: {
        annotations: {
          verticalLine: {
            type: 'line' as const,
            xMin: 5,
            xMax: 5,
            borderColor: 'rgba(0, 0, 0, 0.2)',
            borderWidth: 1,
            borderDash: [5, 5],
          },
          horizontalLine: {
            type: 'line' as const,
            yMin: 5,
            yMax: 5,
            borderColor: 'rgba(0, 0, 0, 0.2)',
            borderWidth: 1,
            borderDash: [5, 5],
          }
        }
      }
    }
  };

  const chartData = {
    datasets: [
      {
        label: 'Life Areas',
        data: data.map((point) => ({
          x: point.satisfaction,
          y: point.importance,
          r: Math.max(4, (point.weight / 2) * 2)
        })),
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        pointRadius: data.map(point => Math.max(4, (point.weight / 2) * 2)),
        pointHoverRadius: data.map(point => Math.max(5, (point.weight / 2) * 2.5))
      },
    ],
  };

  const chartContainerClass = isMaximized
    ? 'fixed inset-0 z-50 bg-white p-4 overflow-auto'
    : 'bg-white p-4 rounded-lg shadow-md sticky top-4';

  const chartHeight = isMaximized 
    ? 'h-[80vh]' 
    : 'h-[250px] lg:h-[300px]';

  return (
    <div className={chartContainerClass}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Life Strategy Analysis</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleViewMode}
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label={viewMode === 'chart' ? 'Switch to table view' : 'Switch to chart view'}
          >
            {viewMode === 'chart' ? (
              <Table className="w-5 h-5" />
            ) : (
              <BarChart2 className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={toggleMaximize}
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label={isMaximized ? 'Minimize view' : 'Maximize view'}
          >
            {isMaximized ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      
      {viewMode === 'chart' ? (
        <div className={`${chartHeight} w-full`}>
          <Scatter options={options} data={chartData} />
        </div>
      ) : (
        <TableView data={data} />
      )}

      <div className="mt-3 flex flex-col items-center gap-2">
        <button
          onClick={handleShare}
          disabled={isSharing}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <Share2 className="w-4 h-4 mr-2" />
          {isSharing ? 'Sharing...' : 'Share Chart'}
        </button>
        {shareError && (
          <div className="text-sm text-amber-600 text-center">
            {shareError}
          </div>
        )}
        {shareUrl && !shareError && (
          <div className="text-sm text-gray-600 text-center">
            <div className="font-medium">Link copied to clipboard!</div>
            <div className="mt-2 p-2 bg-gray-100 rounded break-all">
              {shareUrl}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};