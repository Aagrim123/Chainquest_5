import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { CheckCircle2, Lock, BarChart3, Users } from 'lucide-react';

const timeline = [
  {
    icon: Lock,
    title: 'Verifiable Ownership',
    description: 'True digital ownership through blockchain technology. Every asset you acquire is cryptographically proven to be yours.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: BarChart3,
    title: 'Provable Scarcity',
    description: 'Limited edition items with transparent supply. Know exactly how rare your assets are with on-chain verification.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Users,
    title: 'Player Economy Transparency',
    description: 'A fully transparent, player-driven economy where all transactions are visible and verifiable on the blockchain.',
    gradient: 'from-orange-500 to-red-500',
  },
];

const features = [
  'Decentralized game state',
  'Instant peer-to-peer trading',
  'No hidden mechanics',
  'Community governance',
  'Cross-game compatibility',
  '永久资产所有权',
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
            Why Blockchain Gaming?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionizing the gaming industry with transparency and true ownership
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-16">
          {timeline.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative mb-12 last:mb-0"
              >
                <div className="flex items-start gap-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <div className="flex-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: '100%' } : {}}
                      transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
                      className="h-px bg-gradient-to-r from-primary/50 to-transparent mb-4"
                    />
                    
                    <h3 className="mb-3" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                      {item.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {index < timeline.length - 1 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={isInView ? { height: '3rem' } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                    className="w-px bg-gradient-to-b from-primary/50 to-transparent ml-8 mt-4"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20">
            <h3 className="text-center mb-8" style={{ fontSize: '1.75rem', fontWeight: 600 }}>
              What We Offer
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-card/50 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
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
