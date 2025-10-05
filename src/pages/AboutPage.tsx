import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Shield, Gem, TrendingUp, Lock, Users, Zap } from 'lucide-react';
import { Card } from '../components/ui/card';

const timelineSteps = [
  {
    icon: Shield,
    title: 'Verifiable Ownership',
    description: 'Every asset you own is verifiably yours on the blockchain. No central authority can revoke or manipulate your digital property.',
    gradient: 'from-primary to-blue-500',
  },
  {
    icon: Gem,
    title: 'Provable Scarcity',
    description: 'Smart contracts ensure that rare items remain rare. No hidden inflation, no server-side manipulation—just pure mathematical certainty.',
    gradient: 'from-secondary to-purple-500',
  },
  {
    icon: TrendingUp,
    title: 'Player Economy Transparency',
    description: 'All trades, drops, and transactions are recorded on-chain. The entire economy is visible and auditable by anyone, anywhere.',
    gradient: 'from-accent to-pink-500',
  },
  {
    icon: Lock,
    title: 'True Digital Ownership',
    description: 'Your NFTs are yours to keep, trade, or sell—even outside the game. Take your assets to any compatible platform or marketplace.',
    gradient: 'from-primary to-secondary',
  },
  {
    icon: Users,
    title: 'Community Governance',
    description: 'Token holders can vote on game updates, economic changes, and feature proposals. The community shapes the future of the game.',
    gradient: 'from-secondary to-accent',
  },
  {
    icon: Zap,
    title: 'Instant Settlements',
    description: 'Blockchain technology enables near-instant trade settlements with minimal fees. No waiting periods, no middlemen.',
    gradient: 'from-accent to-primary',
  },
];

function TimelineStep({ step, index }: { step: typeof timelineSteps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`flex items-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <div className="flex-1">
        <Card className="p-8 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl group hover:border-primary/60 transition-all">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-start gap-6"
          >
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${step.gradient} bg-opacity-10 shrink-0`}>
              <step.icon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        </Card>
      </div>

      {/* Timeline connector */}
      <div className="hidden lg:block relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center`}
        >
          <div className="w-8 h-8 rounded-full bg-background" />
        </motion.div>
      </div>

      <div className="flex-1 hidden lg:block" />
    </motion.div>
  );
}

export function AboutPage() {
  return (
    <div className="min-h-screen pt-6 pb-16">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <h1 className="mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            About Blockchain Gaming
          </h1>
          <p className="text-muted-foreground text-xl leading-relaxed">
            Discover how blockchain technology is revolutionizing gaming by bringing true ownership, transparency, and player-driven economies to the forefront.
          </p>
        </motion.div>

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-20"
        >
          <Card className="p-12 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
            <div className="relative z-10">
              <h2 className="mb-6 text-center">Why Blockchain Gaming?</h2>
              <p className="text-muted-foreground text-center text-lg leading-relaxed max-w-4xl mx-auto">
                Traditional gaming keeps players locked in walled gardens where they don't truly own their assets. 
                Blockchain gaming changes this paradigm by giving players verifiable ownership, transparent economies, 
                and the freedom to trade their assets across platforms. It's not just about playing—it's about owning 
                a piece of the virtual worlds you help build.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Timeline */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            Core Principles
          </motion.h2>
          
          <div className="space-y-8 max-w-5xl mx-auto">
            {timelineSteps.map((step, index) => (
              <TimelineStep key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="mb-12 text-center">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Cross-Platform Trading',
                description: 'Trade your NFTs on any marketplace that supports the standard',
              },
              {
                title: 'Low Transaction Fees',
                description: 'Optimized smart contracts minimize gas costs for all transactions',
              },
              {
                title: 'Instant Verification',
                description: 'Verify authenticity and ownership in seconds',
              },
              {
                title: 'Decentralized Storage',
                description: 'Asset metadata stored on IPFS for permanent availability',
              },
              {
                title: 'Fair Launch',
                description: 'No pre-mines or insider advantages—everyone starts equal',
              },
              {
                title: 'Open Source',
                description: 'Smart contracts are public and audited for transparency',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl group hover:border-primary/60 transition-all h-full">
                  <h3 className="mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
