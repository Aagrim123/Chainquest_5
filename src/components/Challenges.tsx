import { motion } from 'motion/react';
import { Shield, Gem, TrendingUp } from 'lucide-react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

const challenges = [
  {
    icon: Shield,
    title: 'On-Chain Actions',
    description: 'Every move, every battle, every transaction is recorded immutably on the blockchain, ensuring fairness and transparency.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Gem,
    title: 'NFT Representation',
    description: 'Your characters, items, and achievements are true NFTs that you own forever. Trade, sell, or showcase your collection.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: TrendingUp,
    title: 'Transparent Player Economy',
    description: 'A player-driven economy where supply and demand are visible to all. Make informed decisions and build your fortune.',
    gradient: 'from-orange-500 to-red-500',
  },
];

export function Challenges() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
            Core Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built on cutting-edge blockchain technology to revolutionize gaming
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            return (
              <motion.div
                key={challenge.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className="relative p-8 rounded-2xl bg-card border border-border overflow-hidden h-full transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20">
                  <div className={`absolute inset-0 bg-gradient-to-br ${challenge.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${challenge.gradient} flex items-center justify-center mb-6 relative z-10`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="mb-4 relative z-10" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                    {challenge.title}
                  </h3>

                  <p className="text-muted-foreground relative z-10">
                    {challenge.description}
                  </p>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  );
}
