import React, { useMemo } from 'react';
import '../css/components/buttons.css';

// Tech data counts derived from TechStack3D techData
const TECH_COUNTS = {
  language: 5,
  framework: 4,
  infrastructure: 5,
};

const buildCategories = (counts) => {
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  return [
    { key: 'all', label: 'All', count: total },
    { key: 'language', label: 'Languages', count: counts.language },
    { key: 'framework', label: 'Frameworks', count: counts.framework },
    { key: 'infrastructure', label: 'Infrastructure', count: counts.infrastructure },
  ];
};

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
  const categories = useMemo(() => buildCategories(TECH_COUNTS), []);

  return (
    <div className="button-controls">
      <div className="button-container" role="toolbar" aria-label="Filter tech stack by category">
        {categories.map((cat) => (
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

export { TECH_COUNTS, buildCategories };
export default ButtonGroup;
