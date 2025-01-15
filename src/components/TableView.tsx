import React, { useState } from 'react';
import { SurveyData } from '../types';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface TableViewProps {
  data: SurveyData[];
}

type SortField = 'question' | 'importance' | 'satisfaction' | 'weight';
type SortDirection = 'asc' | 'desc' | null;

export const TableView: React.FC<TableViewProps> = ({ data }) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Cycle through: null (default) -> asc -> desc -> null (default)
      if (sortDirection === null) {
        setSortDirection('asc');
      } else if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = sortField && sortDirection
    ? [...data].sort((a, b) => {
        const multiplier = sortDirection === 'asc' ? 1 : -1;
        if (sortField === 'question') {
          return multiplier * a[sortField].localeCompare(b[sortField]);
        }
        return multiplier * (a[sortField] - b[sortField]);
      })
    : data;

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="inline-block w-4 h-4 ml-1 text-gray-400" />;
    }
    if (sortDirection === 'asc') {
      return <ArrowUp className="inline-block w-4 h-4 ml-1 text-indigo-600" />;
    }
    if (sortDirection === 'desc') {
      return <ArrowDown className="inline-block w-4 h-4 ml-1 text-indigo-600" />;
    }
    return <ArrowUpDown className="inline-block w-4 h-4 ml-1 text-gray-400" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('question')}
            >
              Life Area <SortIcon field="question" />
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('importance')}
            >
              Importance <SortIcon field="importance" />
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('satisfaction')}
            >
              Satisfaction <SortIcon field="satisfaction" />
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('weight')}
            >
              Time Spent (hrs) <SortIcon field="weight" />
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.question}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.importance}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.satisfaction}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.weight}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};