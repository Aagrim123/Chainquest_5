import { motion } from 'motion/react';
import { useState } from 'react';
import { Droplets, TrendingUp, DollarSign, Percent, Plus, Minus } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner@2.0.3';

const liquidityPools = [
  {
    id: 1,
    pair: 'ETH/USDC',
    tvl: '5,234,567',
    apr: 24.5,
    volume24h: '1,234,567',
    myLiquidity: 1250,
    myShare: 0.024,
    fees24h: 45.30,
  },
  {
    id: 2,
    pair: 'GAME/ETH',
    tvl: '2,456,789',
    apr: 45.8,
    volume24h: '567,890',
    myLiquidity: 0,
    myShare: 0,
    fees24h: 0,
  },
  {
    id: 3,
    pair: 'BTC/USDC',
    tvl: '8,901,234',
    apr: 18.2,
    volume24h: '2,345,678',
    myLiquidity: 3500,
    myShare: 0.039,
    fees24h: 78.50,
  },
];

export function LiquidityPage() {
  const [selectedPool, setSelectedPool] = useState(liquidityPools[0]);
  const [activeTab, setActiveTab] = useState('add');
  const [amount1, setAmount1] = useState('');
  const [amount2, setAmount2] = useState('');

  const handleAddLiquidity = () => {
    if (!amount1 || !amount2) {
      toast.error('Please enter amounts for both tokens');
      return;
    }
    toast.success('Liquidity added successfully!');
    setAmount1('');
    setAmount2('');
  };

  const handleRemoveLiquidity = () => {
    toast.success('Liquidity removed successfully!');
  };

  const totalMyLiquidity = liquidityPools.reduce((acc, pool) => acc + pool.myLiquidity, 0);
  const totalFeesEarned = liquidityPools.reduce((acc, pool) => acc + pool.fees24h, 0);

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
            Liquidity Pools
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Provide liquidity to trading pairs and earn fees from every trade. Your tokens are pooled with other users' tokens.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'My Liquidity', value: `$${totalMyLiquidity.toLocaleString()}`, icon: DollarSign, color: 'primary' },
                { label: 'Fees Earned (24h)', value: `$${totalFeesEarned.toFixed(2)}`, icon: TrendingUp, color: 'secondary' },
                { label: 'Total Pools', value: '3', icon: Droplets, color: 'accent' },
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

            {/* Available Pools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-6">Available Pools</h3>
                <div className="space-y-4">
                  {liquidityPools.map((pool, index) => (
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
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                              <Droplets className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <div>
                            <h4 className="mb-1">{pool.pair}</h4>
                            {pool.myLiquidity > 0 && (
                              <Badge className="bg-green-500/20 text-green-400">
                                Active Position
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {pool.apr}%
                          </div>
                          <div className="text-sm text-muted-foreground">APR</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">TVL</div>
                          <div className="text-sm">${pool.tvl}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Volume 24h</div>
                          <div className="text-sm">${pool.volume24h}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">My Share</div>
                          <div className="text-sm">{pool.myShare}%</div>
                        </div>
                      </div>

                      {pool.myLiquidity > 0 && (
                        <>
                          <div className="h-px bg-border/50 my-3" />
                          <div className="flex justify-between">
                            <div>
                              <div className="text-sm text-muted-foreground">My Liquidity</div>
                              <div>${pool.myLiquidity.toLocaleString()}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">Fees Earned 24h</div>
                              <div className="text-green-400">+${pool.fees24h.toFixed(2)}</div>
                            </div>
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
            {/* Add/Remove Liquidity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <div className="mb-4">
                  <h3>{selectedPool.pair}</h3>
                  <p className="text-sm text-muted-foreground">
                    APR: {selectedPool.apr}%
                  </p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="add" className="flex-1">
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </TabsTrigger>
                    <TabsTrigger value="remove" className="flex-1">
                      <Minus className="w-4 h-4 mr-2" />
                      Remove
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="add" className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        {selectedPool.pair.split('/')[0]} Amount
                      </label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={amount1}
                        onChange={(e) => setAmount1(e.target.value)}
                        className="bg-background/50 border-border/50 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        {selectedPool.pair.split('/')[1]} Amount
                      </label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={amount2}
                        onChange={(e) => setAmount2(e.target.value)}
                        className="bg-background/50 border-border/50 rounded-xl"
                      />
                    </div>

                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Percent className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Pool Share</span>
                      </div>
                      <div className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {amount1 && amount2 ? '0.045%' : '0%'}
                      </div>
                    </div>

                    <Button
                      onClick={handleAddLiquidity}
                      disabled={!amount1 || !amount2}
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 rounded-full"
                    >
                      Add Liquidity
                    </Button>
                  </TabsContent>

                  <TabsContent value="remove" className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-3">
                        <span className="text-muted-foreground">Amount to Remove</span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} className="h-2 mb-2" />
                      <div className="flex gap-2">
                        {[25, 50, 75, 100].map((percent) => (
                          <Button
                            key={percent}
                            variant="outline"
                            size="sm"
                            className="flex-1 rounded-full border-primary/30"
                          >
                            {percent}%
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-background/50 rounded-xl border border-border/50">
                      <div className="text-sm text-muted-foreground mb-2">You will receive</div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">{selectedPool.pair.split('/')[0]}</span>
                          <span className="text-sm">0.125</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">{selectedPool.pair.split('/')[1]}</span>
                          <span className="text-sm">312.50</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleRemoveLiquidity}
                      disabled={selectedPool.myLiquidity === 0}
                      className="w-full bg-gradient-to-r from-accent to-secondary hover:opacity-90 rounded-full"
                    >
                      Remove Liquidity
                    </Button>
                  </TabsContent>
                </Tabs>
              </Card>
            </motion.div>

            {/* Pool Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-4">Pool Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Liquidity</span>
                    <span>${selectedPool.tvl}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">24h Volume</span>
                    <span>${selectedPool.volume24h}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">24h Fees</span>
                    <span className="text-green-400">${selectedPool.fees24h.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">APR</span>
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {selectedPool.apr}%
                    </span>
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
