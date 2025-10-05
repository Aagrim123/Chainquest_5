import { motion } from 'motion/react';
import { useState } from 'react';
import { TrendingUp, Clock, Shield, DollarSign, Info, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner@2.0.3';

const lendingPools = [
  {
    id: 1,
    name: 'USDC Pool',
    apy: 12.5,
    totalDeposited: '2,456,789',
    available: '456,789',
    utilization: 81,
    icon: '💵',
    risk: 'Low',
  },
  {
    id: 2,
    name: 'ETH Pool',
    apy: 8.3,
    totalDeposited: '1,234,567',
    available: '234,567',
    utilization: 71,
    icon: '💎',
    risk: 'Medium',
  },
  {
    id: 3,
    name: 'GAME Token Pool',
    apy: 18.7,
    totalDeposited: '3,456,789',
    available: '856,789',
    utilization: 75,
    icon: '🎮',
    risk: 'Medium',
  },
  {
    id: 4,
    name: 'BTC Pool',
    apy: 6.9,
    totalDeposited: '987,654',
    available: '187,654',
    utilization: 62,
    icon: '₿',
    risk: 'Low',
  },
];

const myDeposits = [
  { asset: 'USDC', amount: 5000, apy: 12.5, earned: 156.25 },
  { asset: 'ETH', amount: 2.5, apy: 8.3, earned: 0.0518 },
];

export function LendingPage() {
  const [activeTab, setActiveTab] = useState('lend');
  const [selectedPool, setSelectedPool] = useState<number | null>(null);
  const [amount, setAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleLend = () => {
    if (!selectedPool) {
      toast.error('Please select a lending pool first');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount to lend');
      return;
    }
    
    const selectedPoolData = lendingPools.find(pool => pool.id === selectedPool);
    if (selectedPoolData) {
      toast.success(`Successfully lent ${amount} to ${selectedPoolData.name}!`, {
        description: `You're now earning ${selectedPoolData.apy}% APY`
      });
      setAmount('');
      setSelectedPool(null);
    }
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      toast.error('Please enter a valid amount to withdraw');
      return;
    }
    
    toast.success(`Successfully withdrew ${withdrawAmount} tokens!`, {
      description: 'Your funds will be available in your wallet shortly'
    });
    setWithdrawAmount('');
  };

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
            Lending Pools
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Earn passive income by lending your crypto assets to borrowers. All loans are over-collateralized and secured by smart contracts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Total Value Locked', value: '$8.1M', icon: DollarSign, color: 'primary' },
                { label: 'Average APY', value: '11.6%', icon: TrendingUp, color: 'secondary' },
                { label: 'Active Lenders', value: '1,247', icon: Shield, color: 'accent' },
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

            {/* Lending Pools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-6">Available Pools</h3>
                <div className="space-y-4">
                  {lendingPools.map((pool, index) => (
                    <motion.div
                      key={pool.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      onClick={() => setSelectedPool(pool.id)}
                      className={`
                        p-5 rounded-2xl border cursor-pointer transition-all duration-300
                        ${selectedPool === pool.id
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
                              <Badge
                                className={`
                                  ${pool.risk === 'Low' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}
                                `}
                              >
                                {pool.risk} Risk
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {pool.apy}%
                          </div>
                          <div className="text-sm text-muted-foreground">APY</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Total Deposited</div>
                          <div className="text-sm">${pool.totalDeposited}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Available</div>
                          <div className="text-sm">${pool.available}</div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Utilization Rate</span>
                          <span>{pool.utilization}%</span>
                        </div>
                        <Progress value={pool.utilization} className="h-2" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lending Interface */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="lend" className="flex-1">Lend</TabsTrigger>
                    <TabsTrigger value="withdraw" className="flex-1">Withdraw</TabsTrigger>
                  </TabsList>

                  <TabsContent value="lend" className="space-y-4">
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

                    {selectedPool && (
                      <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                        <div className="flex items-start gap-2 mb-3">
                          <Info className="w-4 h-4 text-primary mt-0.5" />
                          <div className="text-sm">
                            <p className="text-muted-foreground mb-1">Estimated Returns</p>
                            <p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                              {amount ? `$${(parseFloat(amount) * 0.125).toFixed(2)} / year` : '$0.00 / year'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleLend}
                      disabled={!selectedPool || !amount}
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 rounded-full"
                    >
                      Lend Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </TabsContent>

                  <TabsContent value="withdraw" className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Amount</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="bg-background/50 border-border/50 rounded-xl"
                      />
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-accent to-secondary hover:opacity-90 rounded-full"
                    >
                      Withdraw
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </TabsContent>
                </Tabs>
              </Card>
            </motion.div>

            {/* My Deposits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-4">My Deposits</h3>
                <div className="space-y-3">
                  {myDeposits.map((deposit, index) => (
                    <div
                      key={index}
                      className="p-4 bg-background/50 rounded-xl border border-border/50"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">{deposit.asset}</span>
                        <Badge className="bg-gradient-to-r from-primary to-secondary">
                          {deposit.apy}% APY
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-muted-foreground">Deposited</div>
                          <div>{deposit.amount} {deposit.asset}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Earned</div>
                          <div className="text-green-400">+{deposit.earned} {deposit.asset}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
