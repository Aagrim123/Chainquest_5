import { motion } from 'motion/react';
import { Wallet, TrendingUp, TrendingDown, DollarSign, Coins, Gem, Activity } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const portfolioData = [
  { date: 'Jan 1', value: 5000 },
  { date: 'Jan 8', value: 5500 },
  { date: 'Jan 15', value: 5200 },
  { date: 'Jan 22', value: 6100 },
  { date: 'Jan 29', value: 6800 },
  { date: 'Feb 5', value: 7200 },
  { date: 'Feb 12', value: 8500 },
];

const assets = [
  { name: 'GAME Token', amount: 12450, value: 6225, change: 12.5, icon: '🎮' },
  { name: 'ETH', amount: 2.5, value: 5000, change: -3.2, icon: '💎' },
  { name: 'USDC', amount: 3500, value: 3500, change: 0, icon: '💵' },
  { name: 'BTC', amount: 0.05, value: 2150, change: 8.7, icon: '₿' },
];

const nftAssets = [
  { name: 'Cyber Sword', rarity: 'Legendary', value: 1500, image: '⚔️' },
  { name: 'Quantum Shield', rarity: 'Epic', value: 800, image: '🛡️' },
  { name: 'Nova Armor', rarity: 'Epic', value: 900, image: '🦾' },
  { name: 'Plasma Gun', rarity: 'Rare', value: 450, image: '🔫' },
];

const transactions = [
  { type: 'Stake', asset: 'GAME', amount: '+500', time: '2 hours ago', status: 'success' },
  { type: 'Trade', asset: 'ETH/USDC', amount: '-0.5 ETH', time: '5 hours ago', status: 'success' },
  { type: 'Claim', asset: 'Rewards', amount: '+125 GAME', time: '1 day ago', status: 'success' },
  { type: 'Bridge', asset: 'USDC', amount: '1000', time: '2 days ago', status: 'pending' },
];

export function PortfolioPage() {
  const totalValue = assets.reduce((acc, asset) => acc + asset.value, 0);
  const nftValue = nftAssets.reduce((acc, nft) => acc + nft.value, 0);
  const totalPortfolio = totalValue + nftValue;
  const portfolioChange = ((portfolioData[portfolioData.length - 1].value - portfolioData[0].value) / portfolioData[0].value) * 100;

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
            Portfolio
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Track your assets, monitor performance, and manage your blockchain gaming portfolio in one place.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Total Value Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-8 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Total Portfolio Value</div>
                    <div className="text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                      ${totalPortfolio.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2">
                      {portfolioChange >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      )}
                      <span className={portfolioChange >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(2)}%
                      </span>
                      <span className="text-muted-foreground text-sm">Last 30 days</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Wallet className="w-8 h-8 text-primary" />
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={portfolioData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                    <XAxis dataKey="date" stroke="#a5b4fc" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#a5b4fc" style={{ fontSize: '12px' }} />
                    <Tooltip
                      contentStyle={{ background: '#0f0f1e', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '12px' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Assets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-6">Token Holdings</h3>
                <div className="space-y-3">
                  {assets.map((asset, index) => (
                    <motion.div
                      key={asset.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="p-4 rounded-xl border bg-background/50 border-border/50 hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="text-2xl">{asset.icon}</div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span>{asset.name}</span>
                              <Badge
                                className={asset.change >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                              >
                                {asset.change >= 0 ? '+' : ''}{asset.change}%
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">{asset.amount.toLocaleString()} {asset.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="mb-1">${asset.value.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">
                            {((asset.value / totalValue) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* NFT Assets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-6">NFT Collection</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nftAssets.map((nft, index) => (
                    <motion.div
                      key={nft.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="p-4 rounded-xl border bg-background/50 border-border/50 hover:border-primary/30 transition-all"
                    >
                      <div className="text-4xl mb-3 text-center">{nft.image}</div>
                      <div className="text-center mb-2">{nft.name}</div>
                      <div className="flex items-center justify-between">
                        <Badge
                          className={
                            nft.rarity === 'Legendary'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : nft.rarity === 'Epic'
                              ? 'bg-purple-500/20 text-purple-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }
                        >
                          {nft.rarity}
                        </Badge>
                        <span className="text-sm text-green-400">${nft.value}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">Token Value</div>
                      <div>${totalValue.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <Gem className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">NFT Value</div>
                      <div>${nftValue.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Coins className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">Total Assets</div>
                      <div>{assets.length + nftAssets.length}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {transactions.map((tx, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl border bg-background/50 border-border/50"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-primary" />
                          <span className="text-sm">{tx.type}</span>
                        </div>
                        <Badge
                          className={
                            tx.status === 'success'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }
                        >
                          {tx.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{tx.asset}</span>
                        <span>{tx.amount}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{tx.time}</div>
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
