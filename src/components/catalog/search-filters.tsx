'use client';

import { useCallback, useState, useTransition } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { cn, focusRing } from '@/lib/design-system';
import { Input, Select, Button, Badge } from '@/components/ui';
import { filterOptions } from '@/data/content';

interface SearchFiltersProps {
  type: string;
  filters: Record<string, string>;
  onFiltersChange: (filters: Record<string, string>) => void;
  availableFilters: string[];
}

export const SearchFilters = ({
  type,
  filters,
  onFiltersChange,
  availableFilters,
}: SearchFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      startTransition(() => {
        onFiltersChange({
          ...filters,
          [key]: value,
        });
      });
    },
    [filters, onFiltersChange]
  );

  const handleClearFilter = useCallback(
    (key: string) => {
      startTransition(() => {
        const newFilters = { ...filters };
        delete newFilters[key];
        onFiltersChange(newFilters);
      });
    },
    [filters, onFiltersChange]
  );

  const handleClearAll = useCallback(() => {
    startTransition(() => {
      onFiltersChange({ type });
    });
  }, [type, onFiltersChange]);

  const activeFiltersCount = Object.keys(filters).filter(
    (key) => key !== 'type' && key !== 'sort' && filters[key]
  ).length;

  return (
    <div className="space-y-4">
      {/* Search Bar + Filter Toggle */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <Input
            placeholder={`Search ${type}...`}
            value={filters.query || ''}
            onChange={(e) => handleFilterChange('query', e.target.value)}
            className="pl-10"
          />
        </div>

        <Button
          variant={isExpanded ? 'secondary' : 'outline'}
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs text-white">
              {activeFiltersCount}
            </span>
          )}
        </Button>

        <Select
          value={filters.sort || 'newest'}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
          className="w-40"
        >
          <option value="newest">Newest</option>
          <option value="relevance">Relevance</option>
        </Select>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <div className="flex flex-wrap gap-4">
            {availableFilters.includes('genre') && (
              <div className="w-full sm:w-auto">
                <label className="mb-1.5 block text-sm text-neutral-400">Genre</label>
                <Select
                  value={filters.genre || ''}
                  onChange={(e) => handleFilterChange('genre', e.target.value)}
                  className="w-full sm:w-40"
                >
                  <option value="">All Genres</option>
                  {filterOptions.genre.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </div>
            )}

            {availableFilters.includes('mood') && (
              <div className="w-full sm:w-auto">
                <label className="mb-1.5 block text-sm text-neutral-400">Mood</label>
                <Select
                  value={filters.mood || ''}
                  onChange={(e) => handleFilterChange('mood', e.target.value)}
                  className="w-full sm:w-40"
                >
                  <option value="">All Moods</option>
                  {filterOptions.mood.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </div>
            )}

            {availableFilters.includes('bpm') && (
              <div className="w-full sm:w-auto">
                <label className="mb-1.5 block text-sm text-neutral-400">BPM</label>
                <Select
                  value={filters.bpm || ''}
                  onChange={(e) => handleFilterChange('bpm', e.target.value)}
                  className="w-full sm:w-40"
                >
                  <option value="">Any BPM</option>
                  {filterOptions.bpm.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </div>
            )}
          </div>

          {activeFiltersCount > 0 && (
            <div className="mt-4 flex items-center gap-2 border-t border-neutral-800 pt-4">
              <span className="text-sm text-neutral-400">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {Object.entries(filters)
                  .filter(([key, value]) => key !== 'type' && key !== 'sort' && value)
                  .map(([key, value]) => (
                    <Badge key={key} variant="primary" className="gap-1">
                      {key}: {value}
                      <button
                        onClick={() => handleClearFilter(key)}
                        className="ml-1 hover:text-white"
                        aria-label={`Remove ${key} filter`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
              </div>
              <button
                onClick={handleClearAll}
                className="ml-auto text-sm text-neutral-400 hover:text-neutral-100"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
