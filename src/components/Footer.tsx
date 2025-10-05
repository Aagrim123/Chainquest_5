import { motion } from 'motion/react';
import { Gamepad2, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 bg-card/30 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <span className="font-['Orbitron',_sans-serif] bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ChainQuest
            </span>
          </motion.div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.div>
            <span>for the blockchain gaming community</span>
          </div>

          <div className="text-muted-foreground text-sm">
            © 2025 ChainQuest. All rights reserved.
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            This is a demo application showcasing blockchain gaming concepts.
            No real transactions or cryptocurrency are involved.
          </p>
        </div>
      </div>
    </footer>
  );
}
