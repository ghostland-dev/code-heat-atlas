
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { DirectoryMetrics, mockDirectories } from '@/utils/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

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
      
      // Add hover effect
      cube.userData = { originalScale: { x: cube.scale.x, y: cube.scale.y, z: cube.scale.z } };
      
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
    
    // Animation for cube entrance
    const cubes: THREE.Mesh[] = [];
    
    // Create cubes for each directory with delayed appearance
    mockDirectories.forEach((dir, index) => {
      setTimeout(() => {
        const cube = createHeatmapCube(dir, index, mockDirectories.length);
        cube.scale.set(0.01, 0.01, 0.01); // Start very small
        scene.add(cube);
        cubes.push(cube);
      }, index * 200); // Stagger the appearance
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
    
    // Raycaster for mouse interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredCube: THREE.Mesh | null = null;
    
    const onMouseMove = (event: MouseEvent) => {
      if (!canvasRef.current) return;
      
      // Calculate mouse position in normalized device coordinates
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Reset previously hovered cube
      if (hoveredCube) {
        const originalScale = hoveredCube.userData.originalScale;
        hoveredCube.scale.lerp(new THREE.Vector3(originalScale.x, originalScale.y, originalScale.z), 0.2);
      }
      
      // Find intersections
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubes);
      
      if (intersects.length > 0) {
        hoveredCube = intersects[0].object as THREE.Mesh;
        hoveredCube.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.2);
        document.body.style.cursor = 'pointer';
      } else {
        hoveredCube = null;
        document.body.style.cursor = 'default';
      }
    };
    
    canvasRef.current.addEventListener('mousemove', onMouseMove);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Slow automatic rotation
      rotationCenter.rotation.y += 0.002;
      scene.rotation.y = rotationCenter.rotation.y;
      
      // Gradually scale cubes to full size
      cubes.forEach(cube => {
        if (cube !== hoveredCube) {
          const originalScale = cube.userData.originalScale || { x: 1, y: 1, z: 1 };
          cube.scale.lerp(new THREE.Vector3(originalScale.x, originalScale.y, originalScale.z), 0.05);
        }
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousemove', onMouseMove);
        if (canvasRef.current.contains(renderer.domElement)) {
          canvasRef.current.removeChild(renderer.domElement);
        }
      }
      scene.clear();
    };
  }, [isLoading]);
  
  return (
    <Card className="w-full h-[500px] relative transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Code Complexity Heatmap</span>
          <div className="flex items-center text-xs gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#33C3F0]"></div>
              <span>Low Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#F97316]"></div>
              <span>Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ea384c]"></div>
              <span>High Risk</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div ref={canvasRef} className="w-full h-[440px]" aria-label="3D visualization of code complexity">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10 animate-in fade-in duration-300">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <div className="text-primary font-medium">Analyzing repository...</div>
              <div className="text-sm text-muted-foreground mt-2">This may take a moment</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeVisualization;
