import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, RefreshCw, Zap, Eye, Disc, Sparkles, Activity, Dna, Radio } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { MagneticButton } from '../ui/MagneticButton';
import { SpotlightCard } from '../reactbits/SpotlightCard';
import { DecryptedText } from '../reactbits/DecryptedText';
import { BlurText } from '../reactbits/BlurText';
import { useNexusStore } from '../../store/useNexusStore';

const spectrumColors = [
  { label: 'ELECTRIC CYAN', hex: '#00f0ff', glow: 'rgba(0, 240, 255, 0.4)' },
  { label: 'NEO VIOLET', hex: '#7928ca', glow: 'rgba(121, 40, 202, 0.4)' },
  { label: 'RADIANT PURPLE', hex: '#b800ff', glow: 'rgba(184, 0, 255, 0.4)' },
  { label: 'CYBER EMERALD', hex: '#00ff88', glow: 'rgba(0, 255, 136, 0.4)' },
  { label: 'CHROME WHITE', hex: '#f8fafc', glow: 'rgba(248, 250, 252, 0.4)' },
  { label: 'SOLAR AMBER', hex: '#ffaa00', glow: 'rgba(255, 170, 0, 0.4)' },
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

  // Status feedback message when triggering real-time actions
  const [feedback, setFeedback] = useState('SYSTEM SYNCHRONIZED // READY FOR OBSERVER INPUT');

  // 1. Shockwave Pulse Action
  const triggerShockwave = () => {
    setFeedback('>> SHOCKWAVE DISPATCHED: HIGH-FREQUENCY OSCILLATION');
    const origDist = distortion;
    setDistortion(2.4);

    let step = 2.4;
    const interval = setInterval(() => {
      step -= 0.1;
      if (step <= origDist) {
        setDistortion(origDist);
        clearInterval(interval);
        setFeedback('SYSTEM SYNCHRONIZED // HARMONIC RESTORED');
      } else {
        setDistortion(step);
      }
    }, 40);
  };

  // 2. Randomize Matrix Parameters
  const randomizeMatrix = () => {
    const randomDist = +(Math.random() * 1.8 + 0.3).toFixed(2);
    const randomVisc = +(Math.random() * 2.2 + 0.4).toFixed(2);
    const randomColor = spectrumColors[Math.floor(Math.random() * spectrumColors.length)].hex;
    const randomWire = Math.random() > 0.5;

    setDistortion(randomDist);
    setViscosity(randomVisc);
    setCoreColor(randomColor);
    setWireframe(randomWire);

    setFeedback(`>> RANDOMIZED MATRIX: FREQ ${randomDist}x // VISC ${randomVisc}x // COLOR ${randomColor}`);
  };

  // 3. Reset to Baseline
  const resetHarmonics = () => {
    setDistortion(0.8);
    setViscosity(1.2);
    setWireframe(false);
    setCoreColor('#00f0ff');
    setFeedback('BASELINE HARMONICS RESTORED (FREQ 0.8x // VISC 1.2x // CYAN)');
  };

  return (
    <section id="interactive" className="relative min-h-screen py-32 px-6 sm:px-10 max-w-7xl mx-auto z-10 select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-gradient-to-br from-neon-cyan/10 via-neon-purple/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-12 border-b border-white/5">
        <div>
          <Badge variant="cyan" className="mb-4">
            PHASE 03 // QUANTUM SYNTHESIZER
          </Badge>
          <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight">
            TACTILE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple">
              PLAYGROUND
            </span>
          </h2>
        </div>

        <div className="max-w-md space-y-2">
          <BlurText
            text="Every control directly mutates the WebGL vertex pipelines, normal coordinates, and photon emission spectrum on your GPU."
            delay={30}
            direction="top"
            className="font-sans text-sm text-chrome-mute leading-relaxed font-light"
          />
          <div className="flex items-center gap-2 font-mono text-[11px] text-neon-cyan">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <DecryptedText text={feedback} speed={25} maxIterations={10} className="font-bold truncate" />
          </div>
        </div>
      </div>

      {/* Interactive 3D Spotlight Cards Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* CARD 1: Surface Wave Distortion */}
        <SpotlightCard
          spotlightColor="rgba(0, 240, 255, 0.18)"
          borderColor="rgba(0, 240, 255, 0.4)"
          className="p-8 sm:p-10 flex flex-col justify-between"
          onMouseEnter={() => setCursor('drag', 'WAVE')}
          onMouseLeave={() => setCursor('default')}
        >
          <div>
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-neon-cyan" />
                <span className="font-mono text-xs text-white font-bold tracking-ultra uppercase">
                  WAVE DISTORTION
                </span>
              </div>
              <span className="font-mono text-xs text-neon-cyan font-bold bg-neon-cyan/10 px-2 py-0.5 border border-neon-cyan/30">
                {distortion.toFixed(2)}x
              </span>
            </div>

            <p className="font-sans text-xs text-chrome-mute leading-relaxed font-light mb-6">
              Modulate the trigonometric wave amplitude deforming the central icosahedron mesh.
            </p>

            {/* Slider with Touch Action */}
            <div className="space-y-3">
              <input
                type="range"
                min="0.2"
                max="2.5"
                step="0.05"
                value={distortion}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setDistortion(val);
                  setFeedback(`SURFACE DISTORTION ADJUSTED: ${val.toFixed(2)}x`);
                }}
                className="w-full h-2 bg-charcoal-800 rounded-lg appearance-none cursor-pointer accent-neon-cyan focus:outline-none touch-pan-y"
              />
              <div className="flex justify-between font-mono text-[10px] text-chrome-dark">
                <span>0.20 (LAMINAR)</span>
                <span>1.35 (HARMONIC)</span>
                <span>2.50 (TURBULENT)</span>
              </div>
            </div>

            {/* Presets */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { label: 'CALM', val: 0.3 },
                { label: 'DEFAULT', val: 0.8 },
                { label: 'FLUID', val: 1.5 },
                { label: 'CHAOS', val: 2.3 },
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    setDistortion(p.val);
                    setFeedback(`WAVE PRESET APPLIED: ${p.label} (${p.val}x)`);
                  }}
                  className={`px-3 py-1.5 text-[10px] font-mono border transition-all ${
                    Math.abs(distortion - p.val) < 0.1
                      ? 'border-neon-cyan bg-neon-cyan/20 text-white font-bold shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                      : 'border-white/10 text-chrome-dark hover:border-white/20 hover:text-chrome-silver'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </SpotlightCard>

        {/* CARD 2: Viscosity & Flow Dynamics */}
        <SpotlightCard
          spotlightColor="rgba(121, 40, 202, 0.22)"
          borderColor="rgba(121, 40, 202, 0.4)"
          className="p-8 sm:p-10 flex flex-col justify-between"
          onMouseEnter={() => setCursor('drag', 'FLOW')}
          onMouseLeave={() => setCursor('default')}
        >
          <div>
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <Dna className="w-4 h-4 text-neon-purple" />
                <span className="font-mono text-xs text-white font-bold tracking-ultra uppercase">
                  FLOW VISCOSITY
                </span>
              </div>
              <span className="font-mono text-xs text-neon-purple font-bold bg-neon-purple/10 px-2 py-0.5 border border-neon-purple/30">
                {viscosity.toFixed(2)}x
              </span>
            </div>

            <p className="font-sans text-xs text-chrome-mute leading-relaxed font-light mb-6">
              Controls the temporal oscillation frequency and fluid resistance on the 3D surface.
            </p>

            {/* Slider with Touch Action */}
            <div className="space-y-3">
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={viscosity}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setViscosity(val);
                  setFeedback(`VISCOSITY VELOCITY ADJUSTED: ${val.toFixed(2)}x`);
                }}
                className="w-full h-2 bg-charcoal-800 rounded-lg appearance-none cursor-pointer accent-neon-purple focus:outline-none touch-pan-y"
              />
              <div className="flex justify-between font-mono text-[10px] text-chrome-dark">
                <span>0.2 (HIGH DAMPING)</span>
                <span>1.5 (EQUILIBRIUM)</span>
                <span>3.0 (SUPERFLUID)</span>
              </div>
            </div>

            {/* Presets */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { label: 'SLOW LIQUID', val: 0.5 },
                { label: 'GALLIUM', val: 1.2 },
                { label: 'QUICKSILVER', val: 2.0 },
                { label: 'SUPERFLUID', val: 2.8 },
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    setViscosity(p.val);
                    setFeedback(`FLOW PRESET APPLIED: ${p.label} (${p.val}x)`);
                  }}
                  className={`px-3 py-1.5 text-[10px] font-mono border transition-all ${
                    Math.abs(viscosity - p.val) < 0.15
                      ? 'border-neon-purple bg-neon-purple/20 text-white font-bold shadow-[0_0_10px_rgba(184,0,255,0.2)]'
                      : 'border-white/10 text-chrome-dark hover:border-white/20 hover:text-chrome-silver'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </SpotlightCard>

        {/* CARD 3: Emissive Spectrum Palette */}
        <SpotlightCard
          spotlightColor="rgba(0, 240, 255, 0.15)"
          borderColor="rgba(255, 255, 255, 0.2)"
          className="p-8 sm:p-10 flex flex-col justify-between"
          onMouseEnter={() => setCursor('hover', 'SPECTRUM')}
          onMouseLeave={() => setCursor('default')}
        >
          <div>
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <Disc className="w-4 h-4 text-neon-cyan" />
                <span className="font-mono text-xs text-white font-bold tracking-ultra uppercase">
                  PHOTON SPECTRUM
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full border border-white/20"
                  style={{ backgroundColor: coreColor }}
                />
                <span className="font-mono text-[10px] text-chrome-silver uppercase">
                  {coreColor}
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-chrome-mute leading-relaxed font-light mb-6">
              Shifts the key point-light wavelength and internal core emission in real time.
            </p>

            {/* Interactive Color Matrix Palette */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {spectrumColors.map((color) => {
                const isSelected = coreColor.toLowerCase() === color.hex.toLowerCase();
                return (
                  <button
                    key={color.hex}
                    onClick={() => {
                      setCoreColor(color.hex);
                      setFeedback(`LIGHT SPECTRUM ENGAGED: ${color.label}`);
                    }}
                    className={`flex items-center gap-2.5 p-2.5 text-[10px] font-mono border transition-all text-left ${
                      isSelected
                        ? 'border-white bg-white/10 text-white font-bold shadow-glass'
                        : 'border-white/10 text-chrome-dark hover:border-white/30 hover:text-chrome-silver'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color.hex, boxShadow: `0 0 8px ${color.glow}` }}
                    />
                    <span className="truncate">{color.label.split(' ')[1] || color.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </SpotlightCard>

        {/* CARD 4: Polygonal Wireframe Toggle */}
        <SpotlightCard
          spotlightColor="rgba(0, 240, 255, 0.18)"
          borderColor="rgba(0, 240, 255, 0.3)"
          className="p-8 sm:p-10 flex flex-col justify-between"
          onMouseEnter={() => setCursor('hover', 'TOPOLOGY')}
          onMouseLeave={() => setCursor('default')}
        >
          <div>
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <Eye className="w-4 h-4 text-neon-cyan" />
                <span className="font-mono text-xs text-white font-bold tracking-ultra uppercase">
                  TOPOLOGY RENDER MODE
                </span>
              </div>
              <span
                className={`font-mono text-[10px] px-2 py-0.5 border ${
                  wireframe
                    ? 'border-neon-cyan bg-neon-cyan/20 text-white font-bold'
                    : 'border-white/10 text-chrome-dark'
                }`}
              >
                {wireframe ? 'HOLOGRAPHIC MESH' : 'SOLID CHROMIUM'}
              </span>
            </div>

            <p className="font-sans text-xs text-chrome-mute leading-relaxed font-light mb-6">
              Toggle GPU rasterization between specular liquid chrome and illuminated polygonal wireframe.
            </p>

            {/* Toggle Switch */}
            <div className="p-4 border border-white/10 bg-charcoal-950/80 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-mono text-xs text-white block">
                  {wireframe ? 'WIREFRAME VECTORS ACTIVE' : 'SPECULAR SURFACE ACTIVE'}
                </span>
                <span className="font-mono text-[10px] text-chrome-dark">
                  VERTICES: 2,562 // FACES: 5,120
                </span>
              </div>

              <button
                onClick={() => {
                  const next = !wireframe;
                  setWireframe(next);
                  setFeedback(next ? 'WIREFRAME RASTERIZATION ENGAGED' : 'SPECULAR RASTERIZATION ENGAGED');
                }}
                className={`px-4 py-2 font-mono text-xs font-bold uppercase border transition-all ${
                  wireframe
                    ? 'bg-neon-cyan text-void border-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-white/5 text-chrome-silver border-white/10 hover:border-white/30'
                }`}
              >
                {wireframe ? 'SWITCH SOLID' : 'SWITCH MESH'}
              </button>
            </div>
          </div>
        </SpotlightCard>
      </div>

      {/* Master Action Console Bar with Magnetic Buttons */}
      <div className="mt-12 p-6 sm:p-8 glass-panel border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 flex items-center justify-center text-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <span className="font-mono text-xs text-white font-bold uppercase tracking-wider block">
              MASTER CONTROL DISPATCH
            </span>
            <span className="font-mono text-[10px] text-chrome-dark">
              INSTANTLY TRANSMIT REAL-TIME KERNEL MACROS
            </span>
          </div>
        </div>

        {/* Magnetic Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <MagneticButton
            variant="cyan"
            size="md"
            icon={Zap}
            cursorLabel="PULSE"
            onClick={triggerShockwave}
          >
            PULSE SHOCKWAVE
          </MagneticButton>

          <MagneticButton
            variant="purple"
            size="md"
            icon={Sparkles}
            cursorLabel="RANDOM"
            onClick={randomizeMatrix}
          >
            RANDOMIZE MATRIX
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            size="md"
            icon={RefreshCw}
            cursorLabel="RESET"
            onClick={resetHarmonics}
          >
            HARMONIZE BASELINE
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
