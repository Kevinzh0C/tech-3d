import React, { Suspense, useState, useEffect } from 'react';
import TechStack3D from './components/TechStack3D';
import './index.css';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'language', label: 'Languages' },
  { key: 'framework', label: 'Frameworks' },
  { key: 'infrastructure', label: 'Infrastructure' },
];

const App = () => {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    // 模拟加载过程
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      {loading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <span>加载3D技术栈...</span>
        </div>
      )}
      
      <header className="header">
        <h1>技术栈3D展示</h1>
        <p>一个高级、专业的3D技术栈可视化组件，展示团队的核心技术能力</p>
      </header>
      
      <div className="canvas-container">
        <Suspense fallback={null}>
          <TechStack3D activeCategory={activeCategory} />
        </Suspense>
      </div>

      <div className="button-container">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type="button"
            className={
              'button-container__btn' +
              (activeCategory === cat.key ? ' button-container__btn--active' : '')
            }
            onClick={() => setActiveCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <footer className="footer">
        <div className="footer__hints">
          <span className="footer__hint">Drag to rotate</span>
          <span className="footer__hint">Hover for details</span>
          <span className="footer__hint">Built with React Three Fiber</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
