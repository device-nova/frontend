import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={`border-b border-border transition-colors duration-300 ${isOpen ? 'border-cyan/20' : ''}`}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left focus-visible:ring-2 focus-visible:ring-cyan rounded-md transition-colors duration-300 ${
          isOpen ? '' : 'hover:bg-surface/40'
        }`}
      >
        <span className={`font-display text-base sm:text-lg font-medium transition-colors duration-300 ${
          isOpen ? 'text-cyan' : 'text-primary'
        }`}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? 'bg-cyan/10 border-cyan/30 text-cyan shadow-glow-cyan'
              : 'border-border text-muted'
          }`}
        >
          <Plus size={16} aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 sm:pb-8 text-sm sm:text-base text-muted leading-relaxed pr-4 sm:pr-10 max-w-4xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="divide-y-0">
      {items.map((item, idx) => (
        <AccordionItem
          key={item.question}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === idx}
          onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
        />
      ))}
    </div>
  );
}
