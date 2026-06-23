import { motion } from 'framer-motion';

export default function RadarSweep({ active = true, size = 160, centerImage }) {
  if (!active) {
    return (
      <div
        className="relative flex items-center justify-center rounded-full border-2 border-cyan/30"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        {centerImage ? (
          <img src={centerImage} alt="" className="h-12 w-12 object-contain rounded-full" />
        ) : (
          <div className="h-2 w-2 rounded-full bg-cyan" />
        )}
      </div>
    );
  }

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden="true"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 rounded-full border border-cyan/20" />
      <div className="absolute inset-3 rounded-full border border-cyan/15" />
      <div className="absolute inset-6 rounded-full border border-cyan/10" />

      <div
        className="absolute inset-0 rounded-full animate-radar-sweep"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(0,217,255,0) 0deg, rgba(0,217,255,0) 270deg, rgba(0,217,255,0.55) 345deg, rgba(0,217,255,0.9) 360deg)',
          maskImage: 'radial-gradient(circle, transparent 0%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 0%, black 100%)',
        }}
      />

      {centerImage ? (
        <motion.div
          className="relative z-10 rounded-full bg-void/60 backdrop-blur-sm p-1"
          animate={{ boxShadow: ['0 0 10px rgba(0,217,255,0.3)', '0 0 25px rgba(0,217,255,0.6)', '0 0 10px rgba(0,217,255,0.3)'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src={centerImage}
            alt=""
            className="h-14 w-14 object-contain rounded-full"
          />
        </motion.div>
      ) : (
        <div className="h-2.5 w-2.5 rounded-full bg-cyan shadow-glow-cyan relative z-10" />
      )}
    </motion.div>
  );
}
