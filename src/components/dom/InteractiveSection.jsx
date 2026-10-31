import React from 'react';
import { Sliders, RefreshCw, Zap, Eye, Disc } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useNexusStore } from '../../store/useNexusStore';

const colorOptions = [
  { label: 'ELECTRIC CYAN', value: '#00f0ff' },
  { label: 'NEO VIOLET', value: '#7928ca' },
  { label: 'RADIANT PURPLE', value: '#b800ff' },
  { label: 'SOLAR EMERALD', value: '#00ff88' },
  { label: 'CHROME WHITE', value: '#f8fafc' },
];

export const InteractiveSection = () => {
  const distortion = useNexusStore((s) => s.distortion);
  const viscosity = useNexusStore((s) => s.viscosity);
  const wireframe = useNexusStore((s) => s.wireframe);
  const coreColor = useNexusStore((s) => s.coreColor);

  const setDistortion = useNexusStore((s) => s.setDistortion);
  const setViscosity = useNexusStore((s) => s.setViscosity);
  const setWireframe = useNexusStore((s) => s.setWireframe);
  const setCoreColor = useNexusStore((s) => s.setCoreColor);
  const setCursor = useNexusStore((s) => s.setCursor);

  const handleReset = () => {
    setDistortion(0.8);
    setViscosity(1.2);
    setWireframe(false);
    setCoreColor('#00f0ff');
  };

  return (
    <section id="interactive" className="relative min-h-screen py-32 px-6 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-16 border-b border-white/5">
        <div>
          <Badge variant="cyan" className="mb-4">
            PHASE 03 // TACTILE SYNTHESIZER
          </Badge>
          <h2 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight">
            INTERACTIVE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple">
              PLAYGROUND
            </span>
          </h2>
        </div>
        <p className="max-w-md font-sans text-chrome-mute text-sm leading-relaxed">
          Directly manipulate the quantum parameters governing the central liquid-metal topology.
          Adjust wave distortion, fluid viscosity, and material refraction in real time.
        </p>
      </div>

      {/* Control Console Grid */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Interactive Panel */}
        <div className="lg:col-span-6 glass-panel-glow p-8 sm:p-10 space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-neon-cyan" />
              <span className="font-mono text-xs tracking-ultra uppercase text-white font-bold">
                CORE SYNTHESIZER HUD
              </span>
            </div>
            <button
              onClick={handleReset}
              onMouseEnter={() => setCursor('hover', 'RESET')}
              onMouseLeave={() => setCursor('default')}
              className="flex items-center gap-1.5 text-xs font-mono text-chrome-mute hover:text-neon-cyan transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>RESET</span>
            </button>
          </div>

          {/* Slider 1: Distortion Frequency */}
          <div className="space-y-3">
            <div className="flex justify-between font-mono text-xs">
              <span className="text-chrome-silver">SURFACE WAVE DISTORTION</span>
              <span className="text-neon-cyan font-bold">{distortion.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.5"
              step="0.05"
              value={distortion}
              onChange={(e) => setDistortion(parseFloat(e.target.value))}
              onMouseEnter={() => setCursor('hover', 'SLIDE')}
              onMouseLeave={() => setCursor('default')}
              className="w-full h-1.5 bg-charcoal-800 rounded-lg appearance-none cursor-pointer accent-neon-cyan focus:outline-none"
            />
            <div className="flex justify-between text-[10px] font-mono text-chrome-dark">
              <span>0.1 (LAMINAR)</span>
              <span>2.5 (TURBULENT)</span>
            </div>
          </div>

          {/* Slider 2: Viscosity Flow Speed */}
          <div className="space-y-3">
            <div className="flex justify-between font-mono text-xs">
              <span className="text-chrome-silver">VISCOSITY REACTION RATE</span>
              <span className="text-neon-purple font-bold">{viscosity.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.1"
              value={viscosity}
              onChange={(e) => setViscosity(parseFloat(e.target.value))}
              onMouseEnter={() => setCursor('hover', 'SLIDE')}
              onMouseLeave={() => setCursor('default')}
              className="w-full h-1.5 bg-charcoal-800 rounded-lg appearance-none cursor-pointer accent-neon-purple focus:outline-none"
            />
            <div className="flex justify-between text-[10px] font-mono text-chrome-dark">
              <span>0.2 (HIGH DAMPING)</span>
              <span>3.0 (SUPERFLUID)</span>
            </div>
          </div>

          {/* Color Matrix Palette Selector */}
          <div className="space-y-3">
            <span className="font-mono text-xs text-chrome-silver block">
              EMISSION SPECTRUM HUE
            </span>
            <div className="flex flex-wrap gap-2.5">
              {colorOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setCoreColor(opt.value)}
                  onMouseEnter={() => setCursor('hover', 'COLOR')}
                  onMouseLeave={() => setCursor('default')}
                  className={`flex items-center gap-2 px-3 py-2 text-[10px] font-mono uppercase tracking-widest border transition-all ${
                    coreColor === opt.value
                      ? 'border-white text-white bg-white/10 shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                      : 'border-white/10 text-chrome-mute hover:border-white/30'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: opt.value }}
                  />
                  <span>{opt.label.split(' ')[1]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Wireframe Toggle */}
          <div className="pt-2 flex items-center justify-between border-t border-white/5">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-neon-cyan" />
              <span className="font-mono text-xs text-chrome-silver">
                POLYGONAL WIREFRAME MODE
              </span>
            </div>
            <button
              onClick={() => setWireframe(!wireframe)}
              onMouseEnter={() => setCursor('hover', wireframe ? 'SOLID' : 'MESH')}
              onMouseLeave={() => setCursor('default')}
              className={`px-4 py-1.5 text-xs font-mono uppercase border transition-all ${
                wireframe
                  ? 'border-neon-cyan bg-neon-cyan/20 text-white shadow-neon-cyan'
                  : 'border-white/10 text-chrome-dark hover:border-white/30'
              }`}
            >
              {wireframe ? 'ACTIVATED' : 'BYPASSED'}
            </button>
          </div>
        </div>

        {/* Right Explanatory Spec Sheet */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel p-8 space-y-6">
            <h3 className="font-display font-bold text-2xl text-white">
              REAL-TIME VOLUMETRIC SYNTHESIS
            </h3>
            <p className="font-sans text-chrome-mute text-sm leading-relaxed font-light">
              Unlike pre-baked video loops or static assets, every frame in NEXUS is computed
              procedurally on your GPU. The liquid core geometry recalculates vertex normal vectors
              in real time as you adjust the sliders, casting authentic dynamic specular glares.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 font-mono text-xs">
              <div className="p-4 border border-white/5 bg-charcoal-950/60">
                <span className="text-chrome-dark block text-[10px]">CURRENT FREQ</span>
                <span className="text-neon-cyan font-bold text-sm">
                  {(distortion * 18.4).toFixed(1)} GHz
                </span>
              </div>
              <div className="p-4 border border-white/5 bg-charcoal-950/60">
                <span className="text-chrome-dark block text-[10px]">FLOW DAMPING</span>
                <span className="text-neon-purple font-bold text-sm">
                  {(viscosity * 0.42).toFixed(2)} cP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

