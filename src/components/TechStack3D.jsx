import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  Float, 
  Preload, 
  AdaptiveDpr, 
  useDetectGPU, 
  BakeShadows,
  Stars
} from '@react-three/drei';
import TechBadge3D from './TechBadge3D';

// 技术栈数据
const techData = {
  languages: [
    { name: 'Rust', color: '#000000', logo: 'rust', category: 'language' },
    { name: 'Go', color: '#000000', logo: 'go', category: 'language' },
    { name: 'JavaScript', color: '#000000', logo: 'javascript', category: 'language' },
    { name: 'TypeScript', color: '#000000', logo: 'typescript', category: 'language' },
    { name: 'Python', color: '#000000', logo: 'python', category: 'language' }
  ],
  frameworks: [
    { name: 'Node.js', color: '#ffffff', logo: 'node.js', category: 'framework' },
    { name: 'Express', color: '#ffffff', logo: 'express', category: 'framework' },
    { name: 'React', color: '#ffffff', logo: 'react', category: 'framework' },
    { name: 'Redux', color: '#ffffff', logo: 'redux', category: 'framework' }
  ],
  infrastructure: [
    { name: 'AWS', color: '#0078D6', logo: 'amazon-web-services', category: 'infrastructure' },
    { name: 'Docker', color: '#0078D6', logo: 'docker', category: 'infrastructure' },
    { name: 'Kubernetes', color: '#0078D6', logo: 'kubernetes', category: 'infrastructure' },
    { name: 'Linux', color: '#0078D6', logo: 'linux', category: 'infrastructure' },
    { name: 'Nginx', color: '#0078D6', logo: 'nginx', category: 'infrastructure' }
  ]
};

// 背景网格效果
const Grid = () => {
  const gridRef = useRef();
  
  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.z = -5 + Math.sin(clock.getElapsedTime() * 0.1) * 0.5;
    }
  });
  
  return (
    <group ref={gridRef} position={[0, 0, -5]}>
      <gridHelper 
        args={[30, 30, '#1a2b4e', '#0a1529']} 
        position={[0, -5, 0]} 
        rotation={[Math.PI / 2, 0, 0]} 
      />
    </group>
  );
};

// 粒子效果
const Particles = () => {
  const particlesRef = useRef();
  const { viewport } = useThree();
  const count = 200;
  
  // 生成随机粒子位置
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 30;
      temp.push({ position: [x, y, z], size: Math.random() * 0.05 + 0.01 });
    }
    return temp;
  }, [count]);
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });
  
  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial color="#4080ff" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
};

// 响应式布局控制组件
const ResponsiveLayout = ({ children }) => {
  const { viewport } = useThree();
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    // 根据视口宽度调整整体缩放
    const calculateScale = () => {
      if (viewport.width < 5) {
        return 0.7; // 移动设备
      } else if (viewport.width < 8) {
        return 0.85; // 平板设备
      } else {
        return 1; // 桌面设备
      }
    };
    
    setScale(calculateScale());
  }, [viewport.width]);
  
  return (
    <group scale={scale}>
      {children}
    </group>
  );
};

// 性能优化的技术栈组件
const TechStackGroup = () => {
  const groupRef = useRef();
  const { viewport } = useThree();
  const GPUTier = useDetectGPU();
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  
  useEffect(() => {
    if (GPUTier && GPUTier.tier < 2) {
      setIsLowPerformance(true);
    }
    
    setIsSmallScreen(viewport.width < 5);
  }, [GPUTier, viewport.width]);

  // 使用useMemo缓存计算结果，避免重复计算
  const allTech = useMemo(() => {
    // 计算徽章位置的函数
    const calculatePositions = (items, yLevel, radius, startAngle = 0) => {
      // 在小屏幕上减小半径和高度差异
      const actualRadius = isSmallScreen ? radius * 0.7 : radius;
      const actualYLevel = isSmallScreen ? yLevel * 0.6 : yLevel;
      
      return items.map((item, index) => {
        const angle = startAngle + (index / items.length) * Math.PI * 2;
        const x = Math.sin(angle) * actualRadius;
        const z = Math.cos(angle) * actualRadius;
        return { ...item, position: [x, actualYLevel, z] };
      });
    };

    // 为每个类别计算位置
    const languages = calculatePositions(techData.languages, 2, 3);
    const frameworks = calculatePositions(techData.frameworks, 0, 4, Math.PI / 4);
    const infrastructure = calculatePositions(techData.infrastructure, -2, 5, Math.PI / 8);

    // 合并所有技术
    return [...languages, ...frameworks, ...infrastructure];
  }, [isSmallScreen]);

  // 整体旋转动画
  useFrame((state) => {
    if (groupRef.current) {
      // 在低性能设备上减慢旋转速度
      const rotationSpeed = isLowPerformance ? 0.03 : 0.05;
      groupRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      {allTech.map((tech, index) => (
        <Float 
          key={tech.name} 
          speed={isLowPerformance ? 1 : 1.5} 
          rotationIntensity={isLowPerformance ? 0.1 : 0.2} 
          floatIntensity={isLowPerformance ? 0.3 : 0.5}
          position={tech.position}
        >
          <TechBadge3D 
            name={tech.name} 
            color={tech.color} 
            logo={tech.logo} 
            category={tech.category} 
          />
        </Float>
      ))}
    </group>
  );
};

// 主相机控制组件
const CameraController = () => {
  const { viewport } = useThree();
  const [cameraPosition, setCameraPosition] = useState([0, 0, 10]);
  
  useEffect(() => {
    // 根据视口宽度调整相机位置
    if (viewport.width < 5) {
      setCameraPosition([0, 0, 14]); // 移动设备上拉远相机
    } else if (viewport.width < 8) {
      setCameraPosition([0, 0, 12]); // 平板设备
    } else {
      setCameraPosition([0, 0, 10]); // 桌面设备
    }
  }, [viewport.width]);
  
  return (
    <OrbitControls 
      enableZoom={true} 
      enablePan={false} 
      autoRotate 
      autoRotateSpeed={0.5}
      maxPolarAngle={Math.PI / 1.5}
      minPolarAngle={Math.PI / 3}
      maxDistance={20}
      minDistance={5}
      camera={{ position: cameraPosition, fov: 50 }}
    />
  );
};

const TechStack3D = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const GPUTier = useDetectGPU();
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  
  useEffect(() => {
    // 检测是否为触摸设备
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    if (GPUTier && GPUTier.tier < 2) {
      setIsLowPerformance(true);
    }
  }, [GPUTier]);
  
  return (
    <Canvas 
      camera={{ position: [0, 0, 10], fov: 50 }}
      dpr={[1, 2]} // 限制最大像素比为2，提高性能
      performance={{ min: 0.5 }} // 允许在低性能设备上降低渲染质量
      style={{ 
        touchAction: isTouchDevice ? 'none' : 'auto', // 触摸设备上禁用默认触摸行为
        width: '100%', 
        height: '100%' 
      }}
    >
      {/* 环境光和氛围 */}
      <color attach="background" args={['#030712']} />
      <fog attach="fog" args={['#030712', 10, 25]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4080ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#80ffff" />
      
      {/* 背景元素 */}
      {!isLowPerformance && <Grid />}
      {!isLowPerformance && <Particles />}
      {!isLowPerformance && <Stars radius={100} depth={50} count={1000} factor={4} />}
      
      {/* 响应式布局包装 */}
      <ResponsiveLayout>
        {/* 主要技术栈组 - 使用单独的组件以便优化 */}
        <TechStackGroup />
      </ResponsiveLayout>
      
      {/* 相机控制 */}
      <CameraController />
      
      {/* 环境 */}
      <Environment preset="night" />
      
      {/* 性能优化组件 */}
      <AdaptiveDpr pixelated />
      <BakeShadows />
      <Preload all />
    </Canvas>
  );
};

export default TechStack3D;
