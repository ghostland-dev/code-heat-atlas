
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { DirectoryMetrics, mockDirectories } from '@/utils/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CodeVisualizationProps {
  isLoading?: boolean;
}

const CodeVisualization = ({ isLoading = false }: CodeVisualizationProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || isLoading) return;

    // Set up scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#1A1F2C');
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      60,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 15;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    canvasRef.current.appendChild(renderer.domElement);
    
    // Add ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Add directional lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create heat map visualization
    const createHeatmapCube = (data: DirectoryMetrics, index: number, total: number) => {
      // Map complexity to color
      const getHeatColor = (value: number) => {
        if (value < 40) return new THREE.Color('#33C3F0'); // Low - blue
        if (value < 70) return new THREE.Color('#F97316'); // Medium - orange
        return new THREE.Color('#ea384c'); // High - red
      };
      
      // Calculate size based on lines of code
      const maxSize = 2;
      const size = Math.max(0.5, Math.min(maxSize, (data.linesOfCode / 25000) * maxSize));
      
      // Create box geometry and material
      const geometry = new THREE.BoxGeometry(size, size, size);
      const material = new THREE.MeshPhongMaterial({ 
        color: getHeatColor(data.complexity),
        transparent: true,
        opacity: 0.75
      });
      
      const cube = new THREE.Mesh(geometry, material);
      
      // Position around a circle
      const angle = (index / total) * Math.PI * 2;
      const radius = 6;
      cube.position.x = Math.cos(angle) * radius;
      cube.position.y = Math.sin(angle) * radius;
      
      // Add label
      const fontSize = 0.3;
      const nameCanvas = document.createElement('canvas');
      const nameContext = nameCanvas.getContext('2d');
      
      if (nameContext) {
        nameCanvas.width = 256;
        nameCanvas.height = 64;
        nameContext.fillStyle = 'white';
        nameContext.font = '24px Inter, sans-serif';
        nameContext.textAlign = 'center';
        nameContext.fillText(data.name, 128, 32);
        
        const nameTexture = new THREE.CanvasTexture(nameCanvas);
        const nameMaterial = new THREE.SpriteMaterial({ map: nameTexture });
        const nameSprite = new THREE.Sprite(nameMaterial);
        nameSprite.scale.set(2, 0.5, 1);
        nameSprite.position.set(cube.position.x, cube.position.y - size / 1.5, cube.position.z);
        scene.add(nameSprite);
      }
      
      return cube;
    };
    
    // Create cubes for each directory
    mockDirectories.forEach((dir, index) => {
      const cube = createHeatmapCube(dir, index, mockDirectories.length);
      scene.add(cube);
    });
    
    // Create a rotation center object
    const rotationCenter = new THREE.Object3D();
    scene.add(rotationCenter);
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Slow automatic rotation
      rotationCenter.rotation.y += 0.002;
      scene.rotation.y = rotationCenter.rotation.y;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current && canvasRef.current.contains(renderer.domElement)) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, [isLoading]);
  
  return (
    <Card className="w-full h-[500px] relative">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Code Complexity Heatmap</span>
          <div className="flex items-center text-xs gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-heat-low"></div>
              <span>Low Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-heat-medium"></div>
              <span>Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-heat-high"></div>
              <span>High Risk</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div ref={canvasRef} className="w-full h-[440px]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <div className="animate-pulse-glow text-primary font-medium">Analyzing repository...</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeVisualization;
