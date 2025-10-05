import { motion } from 'motion/react';
import { User, Trophy, Zap, TrendingUp, Award, Star } from 'lucide-react';
import { Progress } from '../components/ui/progress';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const playerStats = {
  username: 'CryptoGamer',
  level: 42,
  xp: 7500,
  xpToNext: 10000,
  wins: 148,
  losses: 62,
  winRate: 70.5,
  totalEarnings: 2458.75,
};

const nftInventory = [
  { id: 1, name: 'Cyber Sword', rarity: 'Legendary', power: 950, image: 'https://images.unsplash.com/photo-1618609378039-b572f64c5b42?w=400&h=400&fit=crop' },
  { id: 2, name: 'Quantum Shield', rarity: 'Epic', power: 780, image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&h=400&fit=crop' },
  { id: 3, name: 'Plasma Gun', rarity: 'Rare', power: 620, image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=400&fit=crop' },
  { id: 4, name: 'Nova Armor', rarity: 'Epic', power: 810, image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop' },
  { id: 5, name: 'Stellar Boots', rarity: 'Rare', power: 540, image: 'https://images.unsplash.com/photo-1617791160588-241658c0f566?w=400&h=400&fit=crop' },
  { id: 6, name: 'Void Gauntlet', rarity: 'Legendary', power: 920, image: 'https://images.unsplash.com/photo-1618609377864-68609b857e90?w=400&h=400&fit=crop' },
];

const performanceData = [
  { date: 'Mon', wins: 8, earnings: 124 },
  { date: 'Tue', wins: 12, earnings: 189 },
  { date: 'Wed', wins: 9, earnings: 142 },
  { date: 'Thu', wins: 15, earnings: 234 },
  { date: 'Fri', wins: 11, earnings: 176 },
  { date: 'Sat', wins: 18, earnings: 289 },
  { date: 'Sun', wins: 14, earnings: 218 },
];

const rarityColors = {
  Legendary: 'from-amber-500 to-orange-500',
  Epic: 'from-purple-500 to-pink-500',
  Rare: 'from-blue-500 to-cyan-500',
};

export function DashboardPage() {
  const navigate = useNavigate();
  const xpPercentage = (playerStats.xp / playerStats.xpToNext) * 100;

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
            Game Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your performance, manage your NFT inventory, and analyze your gaming statistics
          </p>
        </motion.div>

        {/* Player Profile Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-8 mb-8 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-50" />
                <Avatar className="h-24 w-24 border-4 border-primary/30 relative">
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" />
                  <AvatarFallback>{playerStats.username[0]}</AvatarFallback>
                </Avatar>
              </motion.div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2>{playerStats.username}</h2>
                  <Badge className="bg-gradient-to-r from-primary to-secondary">
                    Level {playerStats.level}
                  </Badge>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">XP Progress</span>
                    <span className="text-sm">{playerStats.xp} / {playerStats.xpToNext}</span>
                  </div>
                  <div className="relative">
                    <Progress value={xpPercentage} className="h-3" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-50 blur-sm"
                      style={{ width: `${xpPercentage}%` }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Wins</div>
                      <div>{playerStats.wins}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    <div>
                      <div className="text-sm text-muted-foreground">Win Rate</div>
                      <div>{playerStats.winRate}%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Earnings</div>
                      <div>${playerStats.totalEarnings}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <div>
                      <div className="text-sm text-muted-foreground">Total Games</div>
                      <div>{playerStats.wins + playerStats.losses}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* NFT Inventory */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="mb-6">NFT Inventory</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nftInventory.map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl overflow-hidden group cursor-pointer hover:border-primary/60 transition-all">
                  <div className="relative mb-4 rounded-2xl overflow-hidden">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${rarityColors[nft.rarity as keyof typeof rarityColors]} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                    <Badge className={`absolute top-2 right-2 bg-gradient-to-r ${rarityColors[nft.rarity as keyof typeof rarityColors]}`}>
                      {nft.rarity}
                    </Badge>
                  </div>
                  <h3 className="mb-2">{nft.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Power</span>
                    </div>
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {nft.power}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="mb-6">Weekly Performance</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
              <h3 className="mb-4">Daily Wins</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" />
                  <XAxis dataKey="date" stroke="rgba(224, 231, 255, 0.5)" />
                  <YAxis stroke="rgba(224, 231, 255, 0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(26, 26, 62, 0.9)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(12px)',
                    }}
                  />
                  <Bar dataKey="wins" fill="url(#colorWins)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="colorWins" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
              <h3 className="mb-4">Daily Earnings</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" />
                  <XAxis dataKey="date" stroke="rgba(224, 231, 255, 0.5)" />
                  <YAxis stroke="rgba(224, 231, 255, 0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(26, 26, 62, 0.9)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(12px)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="url(#colorEarnings)"
                    strokeWidth={3}
                    dot={{ fill: '#ec4899', r: 5 }}
                  />
                  <defs>
                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
