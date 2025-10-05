import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Trophy, Sword, Shield, Zap, TrendingUp, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

const playerStats = [
  { label: 'Win Rate', value: '72%', icon: Trophy, color: 'text-yellow-500' },
  { label: 'Total Battles', value: '1,234', icon: Sword, color: 'text-red-500' },
  { label: 'Defense', value: '892', icon: Shield, color: 'text-blue-500' },
  { label: 'Power Level', value: '9,500', icon: Zap, color: 'text-purple-500' },
];

const nftInventory = [
  { name: 'Legendary Dragon', rarity: 'Legendary', power: 9500, image: '🐉' },
  { name: 'Mystic Sword', rarity: 'Epic', power: 7800, image: '⚔️' },
  { name: 'Crystal Shield', rarity: 'Rare', power: 6200, image: '🛡️' },
  { name: 'Magic Potion', rarity: 'Common', power: 2100, image: '🧪' },
];

const rarityColors: Record<string, string> = {
  Legendary: 'from-yellow-500 to-orange-500',
  Epic: 'from-purple-500 to-pink-500',
  Rare: 'from-blue-500 to-cyan-500',
  Common: 'from-gray-500 to-gray-600',
};

export function Dashboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="dashboard" className="py-24 bg-background relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
            Game Dashboard
          </h2>
          <p className="text-xl text-muted-foreground">
            Track your progress and manage your NFT collection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Avatar className="w-24 h-24 border-4 border-primary">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white" style={{ fontSize: '2rem' }}>
                        CQ
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                </div>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  Player #42069
                </CardTitle>
                <Badge className="mt-2 bg-gradient-to-r from-primary to-secondary">
                  Level 47
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Experience</span>
                      <span className="text-sm">7,840 / 10,000 XP</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="grid grid-cols-2 gap-4">
                      {playerStats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                          <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="p-3 rounded-lg bg-muted/50 text-center"
                          >
                            <Icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                            <div style={{ fontWeight: 600 }}>{stat.value}</div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle>NFT Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {nftInventory.map((nft, index) => (
                    <motion.div
                      key={nft.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.03, rotate: 1 }}
                      className="group relative p-4 rounded-xl border border-border bg-gradient-to-br from-card to-muted/30 overflow-hidden cursor-pointer"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${rarityColors[nft.rarity]} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <div className="text-4xl">{nft.image}</div>
                          <Badge className={`bg-gradient-to-r ${rarityColors[nft.rarity]}`}>
                            {nft.rarity}
                          </Badge>
                        </div>
                        
                        <h4 className="mb-2" style={{ fontWeight: 600 }}>{nft.name}</h4>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <TrendingUp className="w-4 h-4" />
                          <span>Power: {nft.power.toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
