import { useNavigate } from 'react-router-dom';
import heroBg from '../assets/Product_Hero_TH.png';
import {
  Cpu,
  Activity,
  Zap,
  ShieldAlert,
  Layers,
  Sliders,
  LineChart,
  Gauge,
  CheckCircle2,
  Workflow,
  ArrowRight,
  Server,
  Network
} from 'lucide-react';

export default function DeviceNovaProductPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen font-sans bg-[#060A10] text-[#F2F6FA] overflow-hidden relative">
      {/* GLOBAL BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00D9FF]/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-10 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-[#00D9FF]/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* =========================================================
      SECTION 1: HERO WITH INDUSTRIAL BACKGROUND IMAGE
      ========================================================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 px-6 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 z-0" />
        {/* Ambient Glow Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[15%] left-[10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        {/* Cyan Nodes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[30%] left-[20%] w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_15px_#00D9FF]" />
          <div className="absolute top-[45%] right-[25%] w-3 h-3 rounded-full bg-[#00D9FF] shadow-[0_0_20px_#00D9FF]" />
          <div className="absolute bottom-[25%] left-[40%] w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_15px_#00D9FF]" />
          <div className="absolute top-[60%] left-[70%] w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_15px_#00D9FF]" />
        </div>
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/10 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
            <span className="text-xs font-mono tracking-wider text-[#00D9FF] uppercase">Powered by NVIDIA H100 Architecture</span>
          </div>
          {/* Heading */}
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white max-w-6xl mb-6">
            The Edge Intelligence Platform
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              for Industrial IoT
            </span>
          </h1>
          {/* Description */}
          <p className="max-w-3xl text-base md:text-xl leading-relaxed text-slate-300 mb-10">
            Real-time device monitoring, local edge processing, and autonomous
            industrial decision-making running directly on your sensors, PLCs, and
            gateways, with near-zero latency and no dependency on a cloud round trip.
          </p>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => window.open('https://app.device-nova.com/', '_blank', 'noopener noreferrer')}
              className="group px-8 py-4 bg-[#00D9FF] text-[#060A10] font-semibold rounded-xl hover:bg-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.4)] flex items-center gap-2"
            >
              Open the Dashboard
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 border border-slate-600 rounded-xl text-white backdrop-blur-md hover:border-[#00D9FF] hover:bg-[#00D9FF]/10 transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
      SECTION 2: BENTO GRID DASHBOARD EXTRAVAGANZA
      ========================================================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Item 1: Live Telemetry Widget */}
          <div className="md:col-span-2 p-6 rounded-2xl border border-[#00D9FF]/10 bg-[#0D131C]/60 backdrop-blur-xl transition-all shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D9FF]/5 rounded-full blur-2xl group-hover:bg-[#00D9FF]/10 transition-all" />
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-mono uppercase text-[#00D9FF] tracking-widest">Live Engine Pipeline</span>
                <h3 className="text-xl font-bold mt-1 text-white">Autonomous Machine Telemetry</h3>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs flex items-center gap-1 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                ACTIVE
              </span>
            </div>
            <div className="h-44 bg-[#060A10]/50 rounded-xl p-4 border border-slate-800/60 flex flex-col justify-between font-mono text-xs text-slate-400">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span>[DEVICE_ID: PLC_NODE_74]</span>
                <span className="text-[#00D9FF]">Vibration Frequency: 42.8 Hz</span>
              </div>
              <div className="flex items-end gap-1.5 h-24 pt-4">
                {[40, 55, 32, 60, 85, 42, 30, 45, 65, 70, 92, 40, 50, 75, 35, 60, 45, 80].map((val, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-[#00D9FF] rounded-t opacity-80" style={{ height: `${val}%` }} />
                ))}
              </div>
              <div className="flex justify-between pt-2 text-[10px] text-slate-500">
                <span>0.00ms (Local Edge)</span>
                <span>Inferencing via TensorRT</span>
              </div>
            </div>
          </div>
          {/* Bento Item 2: Mini Gauge Metrics */}
          <div className="p-6 rounded-2xl border border-[#00D9FF]/10 bg-[#0D131C]/60 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="p-3 bg-[#00D9FF]/10 text-[#00D9FF] rounded-xl w-fit mb-4">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Zero-Cloud Latency</h3>
              <p className="text-sm mt-2 text-slate-400">Eliminating cloud round trips avoids costly edge-to-cloud operational friction entirely.</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/40 flex items-baseline gap-2">
              <span className="text-4xl font-bold font-mono text-[#00D9FF] tracking-tight">&lt;1.2ms</span>
              <span className="text-xs text-slate-500 font-mono">Response Time</span>
            </div>
          </div>
          {/* Bento Item 3: Hardware Support */}
          <div className="p-6 rounded-2xl border border-[#00D9FF]/10 bg-[#0D131C]/60 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">PLC &amp; Gateway Native</h3>
              <p className="text-sm mt-2 text-slate-400">Deploys out-of-the-box on your existing production sensors and industrial controllers.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-slate-800/40 rounded text-xs font-mono text-slate-300">Modbus</span>
              <span className="px-2 py-1 bg-slate-800/40 rounded text-xs font-mono text-slate-300">OPC UA</span>
              <span className="px-2 py-1 bg-slate-800/40 rounded text-xs font-mono text-slate-300">MQTT</span>
            </div>
          </div>
          {/* Bento Item 4: AI Model Efficiency */}
          <div className="md:col-span-2 p-6 rounded-2xl border border-[#00D9FF]/10 bg-[#0D131C]/60 backdrop-blur-xl relative overflow-hidden group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-md">
                <span className="text-xs font-mono uppercase text-blue-400 tracking-widest">Optimization Strategy</span>
                <h3 className="text-xl font-bold text-white">Lightweight Edge Deployment</h3>
                <p className="text-sm text-slate-400">We transform high-fidelity models using NVIDIA Triton and TensorRT down to miniature payloads optimized specifically for resource-constrained gateways.</p>
              </div>
              <div className="flex-1 bg-[#060A10]/40 p-4 rounded-xl border border-slate-800/60 font-mono text-xs">
                <div className="flex justify-between mb-1">
                  <span>FP32 Base Accuracy</span>
                  <span className="text-slate-300">99.4%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mb-3"><div className="bg-slate-500 h-1.5 rounded-full w-[99.4%]" /></div>
                <div className="flex justify-between mb-1">
                  <span>INT8 Quantized (Edge)</span>
                  <span className="text-[#00D9FF]">98.9%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full"><div className="bg-[#00D9FF] h-1.5 rounded-full w-[98.9%]" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
      SECTION 3: NVIDIA INDUSTRIAL INTEGRATION SHOWCASE
      ========================================================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading text-white">NVIDIA Core Acceleration Ecosystem</h2>
          <p className="text-slate-400">Deep technology integrations powering enterprise intelligence at extreme scale.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'NVIDIA NeMo', desc: 'Develops advanced AI models capable of understanding high-velocity machine behavior patterns, sensor telemetry, and vibration anomalies.', icon: Workflow },
            { title: 'NVIDIA TensorRT', desc: 'Optimizes machine learning models for high-performance execution, squeezing low-latency capabilities out of constrained architectures.', icon: Zap },
            { title: 'NVIDIA Triton Server', desc: 'Handles distributed inference configurations seamlessly across thousands of active industrial endpoints concurrently.', icon: Layers },
            { title: 'NVIDIA RAPIDS', desc: 'GPU-accelerated pipelines that execute immediate tabular data cleaning and lightning-fast streaming ingestion frames.', icon: LineChart },
            { title: 'NVIDIA CUDA', desc: 'Enables parallel-processing compute matrix frameworks required to train ultra-precise deep learning networks.', icon: Sliders },
            { title: 'NVIDIA Jetson AI Stack', desc: 'Extends robust edge intelligence directly onto rugged physical field microcontrollers in challenging smart-factory layouts.', icon: Cpu },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-[#00D9FF]/10 bg-[#0D131C]/60 backdrop-blur-md hover:border-[#00D9FF]/40 transition-all duration-300 group">
              <div className="p-3 bg-gradient-to-br from-slate-800 to-slate-900 text-[#00D9FF] rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-[#00D9FF] transition-colors text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
      SECTION 4: CORE CAPABILITIES / USE CASES
      ========================================================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="bg-gradient-to-r from-blue-950/20 to-[#00D9FF]/5 rounded-3xl border border-[#00D9FF]/20 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono text-[#00D9FF] uppercase tracking-widest block mb-2">Platform Capabilities</span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">Engineered for Industrial Infrastructure Networks</h2>
            <p className="text-slate-400">Device Nova continuously parses structural metrics to maximize efficiency and minimize operational danger zones.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
            <div className="flex gap-4">
              <div className="mt-1 text-[#00D9FF]"><ShieldAlert className="w-5 h-5" /></div>
              <div>
                <h4 className="text-lg font-bold mb-1 text-white">Predictive Maintenance Alerting</h4>
                <p className="text-sm text-slate-400">Anticipates compound machine breakdown signs hours before critical operational degradation happens, avoiding emergency workflow halts.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 text-[#00D9FF]"><Activity className="w-5 h-5" /></div>
              <div>
                <h4 className="text-lg font-bold mb-1 text-white">Real-Time Anomaly Isolation</h4>
                <p className="text-sm text-slate-400">Isolates anomalous voltage spikes or erratic thermal shifts instantly on the edge, locking down faults before they cascade.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 text-[#00D9FF]"><Sliders className="w-5 h-5" /></div>
              <div>
                <h4 className="text-lg font-bold mb-1 text-white">Autonomous Machine Tuning</h4>
                <p className="text-sm text-slate-400">Enables control systems to safely adjust cycle metrics locally based on AI inferences regarding environmental load fluctuations.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 text-[#00D9FF]"><Zap className="w-5 h-5" /></div>
              <div>
                <h4 className="text-lg font-bold mb-1 text-white">Energy Footprint Optimization</h4>
                <p className="text-sm text-slate-400">Dynamically maps equipment power drainage curves to streamline aggregate consumption trends without reducing manufacturing yield.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
      SECTION 5: AWS SCALE & CLOUD SPECIFICATIONS
      ========================================================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-2">Cloud Training Infrastructure</span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">Enterprise Scaling on AWS</h2>
          <p className="text-slate-400">While execution occurs completely at the Edge, deep retraining workflows leverage top-tier global compute fabrics.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* EC2 P4d Box */}
          <div className="p-8 rounded-2xl border border-[#00D9FF]/10 bg-[#0D131C]/60 backdrop-blur-md relative group flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-mono text-slate-500">INSTANCE TYPE</span>
                  <h3 className="text-2xl font-bold font-mono mt-1 text-white">Amazon EC2 P4d</h3>
                </div>
                <span className="px-2 py-1 bg-slate-800 rounded font-mono text-xs text-slate-400">NVIDIA A100</span>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00D9FF]" /> Multi-Node Model Training Frameworks</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00D9FF]" /> 320GB Total Aggregate GPU Memory</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00D9FF]" /> Complex Historical Telemetry Baselines</li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800/40 text-xs text-slate-500 font-mono">
              Deployed for mid-tier baseline configuration sweeps.
            </div>
          </div>
          {/* EC2 P5 Box */}
          <div className="p-8 rounded-2xl border backdrop-blur-md bg-gradient-to-b from-[#0D131C] to-black border-[#00D9FF]/40 relative group flex flex-col justify-between shadow-[0_0_30px_rgba(0,217,255,0.05)]">
            <div className="absolute top-0 right-12 transform -translate-y-1/2 px-3 py-1 bg-[#00D9FF] text-[#060A10] font-mono text-[10px] uppercase font-bold tracking-widest rounded-full">
              Ultimate Compute Matrix
            </div>
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-mono text-[#00D9FF]">INSTANCE TYPE</span>
                  <h3 className="text-2xl font-bold font-mono mt-1 text-white">Amazon EC2 P5</h3>
                </div>
                <span className="px-2 py-1 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded font-mono text-xs text-[#00D9FF]">NVIDIA H100</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00D9FF]" /> Large-Scale Predictive Failure Models</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00D9FF]" /> Massive Transformer Behavior Patterns</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00D9FF]" /> Ultra-fast Edge Optimization Compilation</li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800/40 text-xs text-[#00D9FF]/70 font-mono">
              Accelerates training cycles by up to 3x over legacy systems.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
      SECTION 6: PREMIUM CYBERPUNK CTA WITH GLOW GRADIENTS
      ========================================================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="relative rounded-3xl overflow-hidden border border-[#00D9FF]/30 bg-gradient-to-b from-[#0D131C] to-[#060A10] p-12 text-center shadow-[0_0_50px_rgba(0,217,255,0.1)]">
          {/* Internal Grid Accents mimicking structural blocks from watermarked_img_16834896153765630299.png */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#00D9FF]/10 rounded-full blur-[80px]" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="flex justify-center gap-4 mb-6">
              <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700 text-[#00D9FF]">
                <Server className="w-5 h-5" />
              </div>
              <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700 text-[#00D9FF]">
                <Network className="w-5 h-5" />
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 tracking-tight text-white">
              Ready to Upgrade Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#00D9FF]">
                Industrial Infrastructure Network?
              </span>
            </h2>
            <p className="text-base md:text-lg mb-10 max-w-2xl mx-auto text-slate-400">
              Deploy high-performance parallel pipelines seamlessly onto live facility networks. Experience zero cloud-friction telemetry monitoring immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/contact')}
                className="w-full sm:w-auto px-8 py-4 bg-[#00D9FF] text-[#060A10] font-bold rounded-xl transition-all duration-300 hover:bg-[#00b0cc] hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] flex items-center justify-center gap-2"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
