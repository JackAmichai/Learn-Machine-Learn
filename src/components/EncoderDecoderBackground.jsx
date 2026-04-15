import React, { useEffect, useRef } from 'react';

export function EncoderDecoderBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Define Encoder-Decoder Network Topology
    // We represent a feed-forward autoencoder layered struct
    const layerCounts = [12, 8, 4, 2, 4, 8, 12];
    const nodes = [];
    const margins = { x: 100, y: 100 };
    
    function initNetwork() {
      nodes.length = 0;
      const numLayers = layerCounts.length;
      const xStep = (width - margins.x * 2) / (numLayers - 1);
      
      for (let l = 0; l < numLayers; l++) {
        const count = layerCounts[l];
        const x = margins.x + l * xStep;
        
        // Distribute nodes vertically
        const ySpaceAvailable = height - margins.y * 2;
        const yStep = count > 1 ? ySpaceAvailable / (count - 1) : 0;
        const yStart = count > 1 ? margins.y : height / 2;

        for (let i = 0; i < count; i++) {
          nodes.push({
            x,
            y: yStart + i * yStep,
            layer: l,
            id: `${l}-${i}`
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

    // Pulses (data signals)
    const pulses = [];
    
    function spawnPulse() {
      if (Math.random() > 0.05) return;
      
      const layer0Nodes = nodes.filter(n => n.layer === 0);
      if(layer0Nodes.length === 0) return;
      const startNode = layer0Nodes[Math.floor(Math.random() * layer0Nodes.length)];
      
      // Target a random node in layer 1
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
        speed: 0.01 + Math.random() * 0.02
      });
    }

    let animationFrameId;

    function render() {
      ctx.fillStyle = '#050A10'; // Deep professional dark background
      ctx.fillRect(0, 0, width, height);
      
      // Draw edges
      ctx.strokeStyle = 'rgba(0, 242, 255, 0.05)';
      ctx.lineWidth = 1;
      
      for (let l = 0; l < layerCounts.length - 1; l++) {
         const currentLayer = nodes.filter(n => n.layer === l);
         const nextLayer = nodes.filter(n => n.layer === l + 1);
         
         currentLayer.forEach(cNode => {
           nextLayer.forEach(nNode => {
             ctx.beginPath();
             ctx.moveTo(cNode.x, cNode.y);
             ctx.lineTo(nNode.x, nNode.y);
             ctx.stroke();
           });
         });
      }

      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        // Latent space (bottleneck) gets special coloring
        if (node.layer === 3) {
          ctx.fillStyle = 'rgba(255, 85, 85, 0.8)';
          ctx.shadowColor = 'rgba(255, 85, 85, 1)';
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = 'rgba(0, 242, 255, 0.5)';
          ctx.shadowBlur = 0;
        }
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
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
        // Color based on whether it's encoding or decoding
        if(p.currentLayer < 3) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.shadowColor = 'rgba(255, 255, 255, 1)';
        } else {
          ctx.fillStyle = 'rgba(0, 242, 255, 0.8)';
          ctx.shadowColor = 'rgba(0, 242, 255, 1)';
        }
        
        ctx.shadowBlur = 5;
        ctx.arc(currX, currY, 2, 0, Math.PI * 2);
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
