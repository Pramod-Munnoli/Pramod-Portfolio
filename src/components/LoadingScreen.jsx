import { motion } from 'framer-motion'

export default function LoadingScreen({ progress }) {
  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold gradient-text"
        style={{ fontFamily: 'var(--font-heading)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        PM
      </motion.h1>
      <motion.p
        className="text-[var(--text-secondary)] mt-4 text-sm tracking-widest uppercase"
        style={{ fontFamily: 'var(--font-mono)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Loading Experience...
      </motion.p>
      <div className="loading-bar">
        <motion.div
          className="loading-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <motion.span
        className="text-[var(--text-muted)] text-xs mt-3"
        style={{ fontFamily: 'var(--font-mono)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {Math.round(progress)}%
      </motion.span>
    </motion.div>
  )
}
