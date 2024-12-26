import React, { Suspense, useState, useEffect } from 'react';
import TechStack3D from './components/TechStack3D';
import './index.css';

const App = () => {
  const [loading, setLoading] = useState(true);

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
          <TechStack3D />
        </Suspense>
      </div>
      
      <footer className="footer">
        <p>使用 React Three Fiber 和 Drei 构建 | 拖动可旋转视图 | 悬停在技术上可查看详情</p>
      </footer>
    </div>
  );
};

export default App;
