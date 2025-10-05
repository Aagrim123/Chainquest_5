import { motion } from 'motion/react';
import { useState } from 'react';
import { Coins, Lock, TrendingUp, Calendar, Gift, Zap } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner@2.0.3';

const stakingPools = [
  {
    id: 1,
    name: 'GAME Token',
    apy: 45.2,
    lockPeriod: '30 days',
    totalStaked: '12,456,789',
    myStake: 5000,
    rewards: 187.5,
    icon: '🎮',
  },
  {
    id: 2,
    name: 'ETH Staking',
    apy: 12.5,
    lockPeriod: '90 days',
    totalStaked: '8,234,567',
    myStake: 2.5,
    rewards: 0.078,
    icon: '💎',
  },
  {
    id: 3,
    name: 'NFT Boost Pool',
    apy: 78.9,
    lockPeriod: '180 days',
    totalStaked: '3,456,789',
    myStake: 0,
    rewards: 0,
    icon: '🚀',
  },
];

export function StakePage() {
  const [selectedPool, setSelectedPool] = useState(stakingPools[0]);
  const [activeTab, setActiveTab] = useState('stake');
  const [amount, setAmount] = useState('');

  const handleStake = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount to stake');
      return;
    }
    
    if (parseFloat(amount) > 10000) {
      toast.error('Maximum stake amount is 10,000 tokens');
      return;
    }
    
    toast.success(`Successfully staked ${amount} ${selectedPool.name.split(' ')[0]} tokens!`, {
      description: `Earning ${selectedPool.apy}% APY with ${selectedPool.lockPeriod} lock period`
    });
    setAmount('');
  };

  const handleUnstake = () => {
    if (selectedPool.myStake === 0) {
      toast.error('No tokens staked in this pool');
      return;
    }
    
    toast.success(`Unstaking ${selectedPool.myStake} ${selectedPool.name.split(' ')[0]} tokens initiated!`, {
      description: 'Your tokens will be available after the cooldown period'
    });
  };

  const handleClaimRewards = () => {
    const pool = stakingPools.find(p => p.id === selectedPool.id);
    if (!pool || pool.rewards === 0) {
      toast.error('No rewards available to claim');
      return;
    }
    
    toast.success(`Successfully claimed ${pool.rewards} ${pool.name.split(' ')[0]} tokens!`, {
      description: 'Rewards have been added to your wallet'
    });
  };

  const totalStaked = stakingPools.reduce((acc, pool) => {
    if (pool.name === 'GAME Token') return acc + pool.myStake;
    if (pool.name === 'ETH Staking') return acc + (pool.myStake * 2000); // Assume ETH = $2000
    return acc;
  }, 0);

  const totalRewards = stakingPools.reduce((acc, pool) => {
    if (pool.name === 'GAME Token') return acc + pool.rewards;
    if (pool.name === 'ETH Staking') return acc + (pool.rewards * 2000);
    return acc;
  }, 0);

  return (
    <div className="min-h-screen pt-6 pb-16">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Staking Pools
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Stake your tokens to earn passive rewards. Lock your assets for fixed periods to maximize your returns.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Total Staked', value: `$${totalStaked.toLocaleString()}`, icon: Coins, color: 'primary' },
                { label: 'Total Rewards', value: `$${totalRewards.toFixed(2)}`, icon: Gift, color: 'secondary' },
                { label: 'Active Stakes', value: '2', icon: Zap, color: 'accent' },
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

            {/* Staking Pools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-6">Available Pools</h3>
                <div className="space-y-4">
                  {stakingPools.map((pool, index) => (
                    <motion.div
                      key={pool.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      onClick={() => setSelectedPool(pool)}
                      className={`
                        p-5 rounded-2xl border cursor-pointer transition-all duration-300
                        ${selectedPool.id === pool.id
                          ? 'bg-primary/10 border-primary/50'
                          : 'bg-background/50 border-border/50 hover:border-primary/30'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{pool.icon}</div>
                          <div>
                            <h4 className="mb-1">{pool.name}</h4>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-gradient-to-r from-primary to-secondary">
                                {pool.apy}% APY
                              </Badge>
                              <Badge variant="outline" className="border-border/50">
                                <Lock className="w-3 h-3 mr-1" />
                                {pool.lockPeriod}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {pool.myStake > 0 && (
                          <Badge className="bg-green-500/20 text-green-400">
                            Active
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Total Staked</div>
                          <div className="text-sm">{pool.totalStaked}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">My Stake</div>
                          <div className="text-sm">
                            {pool.myStake > 0 ? pool.myStake : 'None'}
                          </div>
                        </div>
                      </div>

                      {pool.myStake > 0 && (
                        <>
                          <div className="h-px bg-border/50 my-3" />
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm text-muted-foreground">Pending Rewards</div>
                              <div className="text-green-400">+{pool.rewards} {pool.name.split(' ')[0]}</div>
                            </div>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleClaimRewards();
                              }}
                              size="sm"
                              className="bg-gradient-to-r from-primary to-secondary rounded-full"
                            >
                              Claim
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
            {/* Stake/Unstake Interface */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{selectedPool.icon}</span>
                    <div>
                      <h3>{selectedPool.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedPool.apy}% APY
                      </p>
                    </div>
                  </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="stake" className="flex-1">Stake</TabsTrigger>
                    <TabsTrigger value="unstake" className="flex-1">Unstake</TabsTrigger>
                  </TabsList>

                  <TabsContent value="stake" className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Amount</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-background/50 border-border/50 rounded-xl"
                      />
                    </div>

                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Lock Period</span>
                        <span>{selectedPool.lockPeriod}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Est. Annual Rewards</span>
                        <span className="text-green-400">
                          {amount ? `+${(parseFloat(amount) * selectedPool.apy / 100).toFixed(2)}` : '0'}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={handleStake}
                      disabled={!amount}
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 rounded-full"
                    >
                      Stake Tokens
                    </Button>
                  </TabsContent>

                  <TabsContent value="unstake" className="space-y-4">
                    <div className="p-4 bg-background/50 rounded-xl border border-border/50">
                      <div className="text-sm text-muted-foreground mb-1">Your Stake</div>
                      <div className="text-2xl mb-2">{selectedPool.myStake}</div>
                      <div className="text-sm text-muted-foreground">
                        Pending Rewards: <span className="text-green-400">{selectedPool.rewards}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-yellow-400 mt-0.5" />
                        <div className="text-sm text-yellow-400">
                          Unstaking before lock period ends may result in reduced rewards
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleUnstake}
                      disabled={selectedPool.myStake === 0}
                      className="w-full bg-gradient-to-r from-accent to-secondary hover:opacity-90 rounded-full"
                    >
                      Unstake Tokens
                    </Button>
                  </TabsContent>
                </Tabs>
              </Card>
            </motion.div>

            {/* Staking Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-4">Pool Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">APY:</span>
                    <span className="ml-auto bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {selectedPool.apy}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Lock className="w-4 h-4 text-secondary" />
                    <span className="text-muted-foreground">Lock Period:</span>
                    <span className="ml-auto">{selectedPool.lockPeriod}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Coins className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">Total Staked:</span>
                    <span className="ml-auto">{selectedPool.totalStaked}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
