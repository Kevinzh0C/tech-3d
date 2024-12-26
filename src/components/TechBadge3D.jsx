import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, MeshDistortMaterial, useDetectGPU, RoundedBox } from '@react-three/drei';

const TechBadge3D = ({ name, color, logo, category, ...props }) => {
  const meshRef = useRef();
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [lowPerformance, setLowPerformance] = useState(false);
  
  // 检测GPU性能，在低端设备上降低效果
  const GPUTier = useDetectGPU();
  
  useEffect(() => {
    if (GPUTier && GPUTier.tier < 2) {
      setLowPerformance(true);
    }
  }, [GPUTier]);
  
  // 根据类别设置不同的材质属性
  const getMaterialProps = () => {
    switch(category) {
      case 'language':
        return { 
          color: hovered ? '#333333' : '#000000',
          emissive: hovered ? '#ffffff' : '#222222',
          emissiveIntensity: hovered ? 0.8 : 0.3,
          metalness: lowPerformance ? 0.5 : 0.8,
          roughness: lowPerformance ? 0.4 : 0.2,
          clearcoat: lowPerformance ? 0.3 : 0.5,
          clearcoatRoughness: 0.2
        };
      case 'framework':
        return { 
          color: hovered ? '#eeeeee' : '#ffffff',
          emissive: hovered ? '#aaaaff' : '#666666',
          emissiveIntensity: hovered ? 0.8 : 0.3,
          metalness: lowPerformance ? 0.3 : 0.5,
          roughness: lowPerformance ? 0.5 : 0.3,
          clearcoat: lowPerformance ? 0.3 : 0.5,
          clearcoatRoughness: 0.2
        };
      case 'infrastructure':
        return { 
          color: hovered ? '#1a90ff' : '#0078D6',
          emissive: hovered ? '#66ccff' : '#0055aa',
          emissiveIntensity: hovered ? 0.8 : 0.3,
          metalness: lowPerformance ? 0.4 : 0.7,
          roughness: lowPerformance ? 0.4 : 0.2,
          clearcoat: lowPerformance ? 0.3 : 0.5,
          clearcoatRoughness: 0.2
        };
      default:
        return { 
          color: hovered ? '#666666' : '#444444',
          emissive: hovered ? '#999999' : '#555555',
          emissiveIntensity: hovered ? 0.8 : 0.3,
          metalness: lowPerformance ? 0.3 : 0.6,
          roughness: lowPerformance ? 0.5 : 0.3,
          clearcoat: lowPerformance ? 0.3 : 0.5,
          clearcoatRoughness: 0.2
        };
    }
  };

  // 动画效果
  useFrame((state, delta) => {
    if (meshRef.current) {
      // 悬停时的缩放动画
      meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = 
        hovered ? 1.2 : 1;
      
      // 悬停时轻微倾斜向用户
      if (hovered) {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1;
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
        
        // 文本脉动效果
        if (textRef.current) {
          textRef.current.scale.x = textRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.05;
        }
      } else {
        // 非悬停时的轻微旋转
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.05;
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
        
        // 重置文本大小
        if (textRef.current) {
          textRef.current.scale.x = textRef.current.scale.y = 1;
        }
      }
    }
  });

  const materialProps = getMaterialProps();

  return (
    <group {...props}>
      {/* 徽章背景 - 使用圆角盒子替代平面，增加立体感 */}
      <RoundedBox
        ref={meshRef}
        args={[2.2, 0.9, 0.1]} // 宽度、高度、深度
        radius={0.15} // 圆角半径
        smoothness={4} // 圆角平滑度
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <MeshDistortMaterial
          {...materialProps}
          distort={hovered ? (lowPerformance ? 0.1 : 0.2) : (lowPerformance ? 0.05 : 0.1)}
          speed={hovered ? (lowPerformance ? 1 : 2) : (lowPerformance ? 0.5 : 1)}
          transparent
          opacity={0.95}
        />
      </RoundedBox>
      
      {/* 技术名称文本 */}
      <Text
        ref={textRef}
        position={[0, 0, 0.15]}
        fontSize={0.22}
        color={category === 'framework' ? '#000000' : '#ffffff'}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptsg8zYS_SKggPNwC4waqZPBQ.woff"
        letterSpacing={0.05}
        outlineWidth={hovered ? 0.01 : 0}
        outlineColor={category === 'framework' ? '#ffffff' : '#000000'}
      >
        {name}
      </Text>
      
      {/* 悬停时显示的额外信息 */}
      {hovered && (
        <Text
          position={[0, -0.35, 0.15]}
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptsg8zYS_SKggPNwC4waqZPBQ.woff"
          opacity={0.8}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Text>
      )}
    </group>
  );
};

export default TechBadge3D;
