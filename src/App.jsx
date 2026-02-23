import React, { Suspense, useState, useEffect } from 'react';
import TechStack3D from './components/TechStack3D';
import Button from './components/Button';
import './index.css';
import './css/components/buttons.css';
import './css/responsive.css';

const CATEGORIES = [
  { key: 'all', label: '全部' },
  { key: 'language', label: '编程语言' },
  { key: 'framework', label: '框架' },
  { key: 'infrastructure', label: '基础设施' },
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

      <nav className="button-container" aria-label="技术栈分类筛选">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.key}
            label={cat.label}
            category={cat.key === 'all' ? '' : cat.key}
            isActive={activeCategory === cat.key}
            onClick={() => setActiveCategory(cat.key)}
          />
        ))}
      </nav>

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
