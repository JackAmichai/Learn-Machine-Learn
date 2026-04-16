import React, { useEffect, useRef } from 'react';

export function EncoderDecoderBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Define Network Topology (Encoder-Decoder)
    const layerCounts = [14, 10, 6, 3, 6, 10, 14];
    const nodes = [];
    const margins = { x: 80, y: 100 };
    
    function initNetwork() {
      nodes.length = 0;
      const numLayers = layerCounts.length;
      const xStep = (width - margins.x * 2) / (numLayers - 1);
      
      for (let l = 0; l < numLayers; l++) {
        const count = layerCounts[l];
        const x = margins.x + l * xStep;
        
        const ySpaceAvailable = height - margins.y * 2;
        const yStep = count > 1 ? ySpaceAvailable / (count - 1) : 0;
        const yStart = count > 1 ? margins.y : height / 2;

        for (let i = 0; i < count; i++) {
          nodes.push({
            x,
            y: yStart + i * yStep,
            layer: l,
            id: `${l}-${i}`,
            pulseOffset: Math.random() * Math.PI * 2,
            size: 2 + Math.random() * 2
          });
        }
      }
    }

    initNetwork();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNetwork();
    });

    const pulses = [];
    const particles = [];
    
    function spawnPulse() {
      if (Math.random() > 0.08) return;
      
      const layer0Nodes = nodes.filter(n => n.layer === 0);
      if(layer0Nodes.length === 0) return;
      const startNode = layer0Nodes[Math.floor(Math.random() * layer0Nodes.length)];
      
      const layer1Nodes = nodes.filter(n => n.layer === 1);
      const targetNode = layer1Nodes[Math.floor(Math.random() * layer1Nodes.length)];

      pulses.push({
        x: startNode.x,
        y: startNode.y,
        currentLayer: 0,
        startX: startNode.x,
        startY: startNode.y,
        targetX: targetNode.x,
        targetY: targetNode.y,
        progress: 0,
        speed: 0.008 + Math.random() * 0.015,
        type: Math.random() > 0.2 ? 'data' : 'sparkle'
      });
    }

    function spawnParticle() {
      if (particles.length > 100) return;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2,
        opacity: Math.random() * 0.5
      });
    }

    let animationFrameId;
    let time = 0;

    function render() {
      time += 0.01;

      // Layered radial gradients for depth — gives an "atmospheric" feel
      const bgGrad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
      bgGrad.addColorStop(0, '#0a0a18');
      bgGrad.addColorStop(0.6, '#06060e');
      bgGrad.addColorStop(1, '#020205');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle teal aurora top-left
      const aurora1 = ctx.createRadialGradient(width * 0.2, height * 0.25, 0, width * 0.2, height * 0.25, width * 0.45);
      aurora1.addColorStop(0, 'rgba(0, 242, 255, 0.10)');
      aurora1.addColorStop(1, 'rgba(0, 242, 255, 0)');
      ctx.fillStyle = aurora1;
      ctx.fillRect(0, 0, width, height);

      // Magenta aurora bottom-right
      const aurora2 = ctx.createRadialGradient(width * 0.8, height * 0.8, 0, width * 0.8, height * 0.8, width * 0.5);
      aurora2.addColorStop(0, 'rgba(112, 0, 255, 0.10)');
      aurora2.addColorStop(1, 'rgba(112, 0, 255, 0)');
      ctx.fillStyle = aurora2;
      ctx.fillRect(0, 0, width, height);
      
      // Ambient particles
      spawnParticle();
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          particles.splice(i, 1);
          return;
        }
        ctx.fillStyle = `rgba(0, 242, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections with glow
      ctx.lineWidth = 1;
      for (let l = 0; l < layerCounts.length - 1; l++) {
         const currentLayer = nodes.filter(n => n.layer === l);
         const nextLayer = nodes.filter(n => n.layer === l + 1);
         
         currentLayer.forEach(cNode => {
           nextLayer.forEach(nNode => {
             const dist = Math.sqrt((cNode.x - nNode.x)**2 + (cNode.y - nNode.y)**2);
             const opacity = Math.max(0.02, 0.1 - (dist / 1000));
             ctx.strokeStyle = `rgba(0, 242, 255, ${opacity})`;
             ctx.beginPath();
             ctx.moveTo(cNode.x, cNode.y);
             ctx.lineTo(nNode.x, nNode.y);
             ctx.stroke();
           });
         });
      }

      // Draw nodes
      nodes.forEach(node => {
        const pulse = Math.sin(time + node.pulseOffset) * 0.5 + 0.5;
        ctx.beginPath();
        
        if (node.layer === 3) { // Bottleneck
          ctx.fillStyle = `rgba(255, 85, 85, ${0.4 + pulse * 0.4})`;
          ctx.shadowColor = 'rgba(255, 85, 85, 0.8)';
          ctx.shadowBlur = 5 + pulse * 10;
        } else {
          ctx.fillStyle = `rgba(0, 242, 255, ${0.2 + pulse * 0.3})`;
          ctx.shadowBlur = 2 + pulse * 4;
          ctx.shadowColor = 'rgba(0, 242, 255, 0.5)';
        }
        
        ctx.arc(node.x, node.y, node.size + pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Update and draw pulses
      spawnPulse();
      
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;
        
        if (p.progress >= 1) {
          p.currentLayer++;
          if (p.currentLayer >= layerCounts.length - 1) {
             pulses.splice(i, 1);
             continue;
          }
          
          p.progress = 0;
          p.startX = p.targetX;
          p.startY = p.targetY;
          
          const nextLayerNodes = nodes.filter(n => n.layer === p.currentLayer + 1);
          const nextNode = nextLayerNodes[Math.floor(Math.random() * nextLayerNodes.length)];
          p.targetX = nextNode.x;
          p.targetY = nextNode.y;
        }

        const currX = p.startX + (p.targetX - p.startX) * p.progress;
        const currY = p.startY + (p.targetY - p.startY) * p.progress;

        ctx.beginPath();
        if (p.type === 'sparkle') {
          ctx.fillStyle = '#fff';
          ctx.shadowColor = '#fff';
          ctx.shadowBlur = 10;
          ctx.arc(currX, currY, 3, 0, Math.PI * 2);
        } else {
          const color = p.currentLayer < 3 ? 'rgba(0, 242, 255, 0.9)' : 'rgba(112, 0, 255, 0.9)';
          ctx.fillStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = 6;
          ctx.arc(currX, currY, 2, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', initNetwork);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="bg-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}
