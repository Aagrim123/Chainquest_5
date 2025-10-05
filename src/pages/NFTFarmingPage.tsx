import { motion } from 'motion/react';
import { useState } from 'react';
import { Gem, TrendingUp, Award, Zap } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner@2.0.3';

const farms = [
  {
    id: 1,
    name: 'Legendary Heroes Farm',
    nftRequired: 'Cyber Sword',
    multiplier: '3x',
    apr: 156.8,
    rewards: '450 GAME/day',
    poolSize: '1.2M GAME',
    participating: true,
    earned: 2340,
  },
  {
    id: 2,
    name: 'Epic Items Pool',
    nftRequired: 'Quantum Shield',
    multiplier: '2x',
    apr: 98.5,
    rewards: '280 GAME/day',
    poolSize: '850K GAME',
    participating: false,
    earned: 0,
  },
  {
    id: 3,
    name: 'Rare Collectibles',
    nftRequired: 'Any NFT',
    multiplier: '1.5x',
    apr: 67.2,
    rewards: '150 GAME/day',
    poolSize: '500K GAME',
    participating: true,
    earned: 876,
  },
];

export function NFTFarmingPage() {
  const [selectedFarm, setSelectedFarm] = useState(farms[0]);

  const totalEarned = farms.reduce((acc, farm) => acc + farm.earned, 0);

  return (
    <div className="min-h-screen pt-6 pb-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            NFT Farming
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Stake your NFTs to earn additional rewards. Higher rarity NFTs provide better multipliers and increased yield.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Total Earned', value: `${totalEarned} GAME`, icon: Award, color: 'primary' },
                { label: 'Active Farms', value: '2', icon: Zap, color: 'secondary' },
                { label: 'Avg APR', value: '107%', icon: TrendingUp, color: 'accent' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg bg-${stat.color}/10`}>
                        <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                      </div>
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                    </div>
                    <div className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Farms List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-6">Available Farms</h3>
                <div className="space-y-4">
                  {farms.map((farm, index) => (
                    <motion.div
                      key={farm.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      onClick={() => setSelectedFarm(farm)}
                      className={`
                        p-5 rounded-2xl border cursor-pointer transition-all duration-300
                        ${selectedFarm.id === farm.id
                          ? 'bg-primary/10 border-primary/50'
                          : 'bg-background/50 border-border/50 hover:border-primary/30'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <Gem className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="mb-1">{farm.name}</h4>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-gradient-to-r from-primary to-secondary">
                                {farm.multiplier} Multiplier
                              </Badge>
                              {farm.participating && (
                                <Badge className="bg-green-500/20 text-green-400">
                                  Active
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {farm.apr}%
                          </div>
                          <div className="text-sm text-muted-foreground">APR</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">NFT Required</div>
                          <div className="text-sm">{farm.nftRequired}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Daily Rewards</div>
                          <div className="text-sm">{farm.rewards}</div>
                        </div>
                      </div>

                      {farm.participating && (
                        <>
                          <div className="h-px bg-border/50 my-3" />
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm text-muted-foreground">Earned</div>
                              <div className="text-green-400">+{farm.earned} GAME</div>
                            </div>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                toast.success('Rewards claimed!');
                              }}
                              size="sm"
                              className="bg-gradient-to-r from-primary to-secondary rounded-full"
                            >
                              Harvest
                            </Button>
                          </div>
                        </>
                      )}
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-4">{selectedFarm.name}</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">APR</span>
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {selectedFarm.apr}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Multiplier</span>
                    <span>{selectedFarm.multiplier}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pool Size</span>
                    <span>{selectedFarm.poolSize}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Daily Rewards</span>
                    <span>{selectedFarm.rewards}</span>
                  </div>
                </div>

                {selectedFarm.participating ? (
                  <>
                    <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/30 mb-4">
                      <div className="text-sm text-green-400 mb-2">You are farming!</div>
                      <div className="text-2xl text-green-400 mb-1">+{selectedFarm.earned} GAME</div>
                      <div className="text-sm text-muted-foreground">Total earned</div>
                    </div>
                    <Button
                      onClick={() => toast.success('Farming stopped!')}
                      variant="outline"
                      className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-full"
                    >
                      Stop Farming
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => toast.success('Started farming!')}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 rounded-full"
                  >
                    Start Farming
                  </Button>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
