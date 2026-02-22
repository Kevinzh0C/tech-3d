import React, { Suspense, useState, useEffect } from 'react';
import TechStack3D from './components/TechStack3D';
import './index.css';

const categories = ['all', 'language', 'framework', 'infrastructure'];

const categoryLabels = {
  all: '全部',
  language: '编程语言',
  framework: '框架',
  infrastructure: '基础设施',
};

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
        <div className="button-container">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn${activeCategory === cat ? ' filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </header>
      
      <div className="canvas-container">
        <Suspense fallback={null}>
          <TechStack3D activeCategory={activeCategory} />
        </Suspense>
      </div>
      
      <footer className="footer">
        <p>使用 React Three Fiber 和 Drei 构建 | 拖动可旋转视图 | 悬停在技术上可查看详情</p>
      </footer>
    </div>
  );
};

export default App;
