import React from 'react';
import '../css/components/buttons.css';

const CATEGORIES = [
  { key: 'all', label: 'All', count: 14 },
  { key: 'language', label: 'Languages', count: 5 },
  { key: 'framework', label: 'Frameworks', count: 4 },
  { key: 'infrastructure', label: 'Infrastructure', count: 5 },
];

const FilterButton = ({ category, isActive, onClick }) => {
  return (
    <button
      className={`filter-btn${isActive ? ' active' : ''}`}
      data-category={category.key}
      onClick={() => onClick(category.key)}
      aria-pressed={isActive}
      aria-label={`Filter by ${category.label}`}
      type="button"
    >
      {category.label}
      <span className="btn-count">{category.count}</span>
    </button>
  );
};

const ButtonGroup = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="button-controls">
      <div className="button-container" role="toolbar" aria-label="Filter tech stack by category">
        {CATEGORIES.map((cat) => (
          <FilterButton
            key={cat.key}
            category={cat}
            isActive={activeFilter === cat.key}
            onClick={onFilterChange}
          />
        ))}
      </div>
    </div>
  );
};

export { CATEGORIES };
export default ButtonGroup;
