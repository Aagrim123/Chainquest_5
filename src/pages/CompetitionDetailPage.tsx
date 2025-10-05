import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { Trophy, Medal, Star, TrendingUp, Users, Award, Clock, Target, Gift, ArrowLeft, Eye, Share2 } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner@2.0.3';

const competitionData = {
  '1': {
    id: 1,
    name: 'Trading Championship',
    description: 'Compete with traders worldwide to achieve the highest trading volume and win amazing prizes.',
    status: 'active',
    prize: '10,000 GAME',
    totalPrizePool: '25,000 GAME',
    participants: 2450,
    maxParticipants: 5000,
    endsIn: '5 days',
    endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    startedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    myRank: 42,
    myScore: 5420,
    requirements: ['Trade volume > $5000', 'Minimum 10 trades', 'KYC verified'],
    rules: [
      'Only spot trading counts towards volume',
      'Trades must be completed during competition period',
      'Wash trading is prohibited and will result in disqualification',
      'Winners will be announced within 24 hours of competition end'
    ],
    prizeDistribution: [
      { rank: '1st Place', prize: '3,000 GAME', percentage: 30 },
      { rank: '2nd Place', prize: '2,000 GAME', percentage: 20 },
      { rank: '3rd Place', prize: '1,500 GAME', percentage: 15 },
      { rank: '4th-10th', prize: '500 GAME each', percentage: 20 },
      { rank: '11th-50th', prize: '100 GAME each', percentage: 15 }
    ],
    image: '🏆',
    category: 'Trading',
    difficulty: 'Medium'
  },
  '2': {
    id: 2,
    name: 'NFT Battle Royale',
    description: 'Battle with your NFTs in epic arena matches. Last warrior standing wins the ultimate prize.',
    status: 'active',
    prize: '5,000 GAME',
    totalPrizePool: '15,000 GAME',
    participants: 1876,
    maxParticipants: 2000,
    endsIn: '2 days',
    endsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    startedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    myRank: 15,
    myScore: 8750,
    requirements: ['Own at least 1 Battle NFT', 'Complete tutorial', 'Connect wallet'],
    rules: [
      'Each NFT can battle once per day',
      'Battles are automatic based on NFT stats',
      'Higher rarity NFTs have battle advantages',
      'Minimum 10 battles required for prize eligibility'
    ],
    prizeDistribution: [
      { rank: '1st Place', prize: '2,000 GAME', percentage: 40 },
      { rank: '2nd Place', prize: '1,200 GAME', percentage: 24 },
      { rank: '3rd Place', prize: '800 GAME', percentage: 16 },
      { rank: '4th-20th', prize: '100 GAME each', percentage: 20 }
    ],
    image: '⚔️',
    category: 'Gaming',
    difficulty: 'Hard'
  }
};

const detailedLeaderboard = [
  { rank: 1, username: 'CryptoKing', score: 15420, reward: '3,000 GAME', avatar: 'CK', change: 0, badges: ['🔥', '👑'] },
  { rank: 2, username: 'NFTMaster', score: 14890, reward: '2,000 GAME', avatar: 'NM', change: 1, badges: ['⚡'] },
  { rank: 3, username: 'TradeWizard', score: 13250, reward: '1,500 GAME', avatar: 'TW', change: -1, badges: ['🎯'] },
  { rank: 4, username: 'BlockchainPro', score: 12800, reward: '1,000 GAME', avatar: 'BP', change: 2, badges: ['💎'] },
  { rank: 5, username: 'GameChampion', score: 11950, reward: '800 GAME', avatar: 'GC', change: 0, badges: ['🚀'] },
  { rank: 6, username: 'DeFiHero', score: 11420, reward: '700 GAME', avatar: 'DH', change: 3, badges: ['🌟'] },
  { rank: 7, username: 'MetaTrader', score: 10890, reward: '600 GAME', avatar: 'MT', change: -2, badges: ['⭐'] },
  { rank: 8, username: 'CoinFlip', score: 10340, reward: '500 GAME', avatar: 'CF', change: 1, badges: ['💫'] },
  { rank: 9, username: 'TokenKnight', score: 9870, reward: '500 GAME', avatar: 'TK', change: -1, badges: ['🛡️'] },
  { rank: 10, username: 'ChainRunner', score: 9420, reward: '500 GAME', avatar: 'CR', change: 0, badges: ['⚡'] },
  { rank: 42, username: 'You', score: 5420, reward: '100 GAME', avatar: 'YO', change: 5, badges: ['🎮'] },
];

export function CompetitionDetailPage() {
  const { id } = useParams();
  const competition = competitionData[id as keyof typeof competitionData];

  if (!competition) {
    return (
      <div className="min-h-screen pt-6 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Competition Not Found</h2>
          <Link to="/competition">
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Competitions
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const timeLeft = Math.max(0, competition.endsAt.getTime() - Date.now());
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return (
    <div className="min-h-screen pt-6 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link to="/competition" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Competitions
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-6">
            <div className="text-6xl">{competition.image}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {competition.name}
                </h1>
                <Badge className={
                  competition.status === 'active'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }>
                  {competition.status}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">{competition.description}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {competition.totalPrizePool}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-secondary" />
                  <span>{competition.participants.toLocaleString()} / {competition.maxParticipants.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <span>{daysLeft}d {hoursLeft}h left</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => toast.info('Competition details shared!')}
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                onClick={() => toast.success(`Joined ${competition.name}!`)}
                className="bg-gradient-to-r from-primary to-secondary rounded-full"
              >
                {competition.myRank ? 'Already Joined' : 'Join Competition'}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Participation</span>
              <span>{((competition.participants / competition.maxParticipants) * 100).toFixed(1)}%</span>
            </div>
            <Progress value={(competition.participants / competition.maxParticipants) * 100} className="h-2" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Performance */}
            {competition.myRank && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                  <h3 className="mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    My Performance
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                      <div className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        #{competition.myRank}
                      </div>
                      <div className="text-sm text-muted-foreground">Current Rank</div>
                    </div>
                    <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                      <div className="text-2xl bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                        {competition.myScore.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Score</div>
                    </div>
                    <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                      <div className="text-2xl text-green-400">
                        100 GAME
                      </div>
                      <div className="text-sm text-muted-foreground">Est. Reward</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <Tabs defaultValue="leaderboard">
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="leaderboard" className="flex-1">Leaderboard</TabsTrigger>
                    <TabsTrigger value="rules" className="flex-1">Rules</TabsTrigger>
                    <TabsTrigger value="prizes" className="flex-1">Prizes</TabsTrigger>
                  </TabsList>

                  <TabsContent value="leaderboard" className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3>Live Leaderboard</h3>
                      <Badge className="bg-gradient-to-r from-primary to-secondary">
                        <Eye className="w-3 h-3 mr-1" />
                        Live Updates
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {detailedLeaderboard.map((player, index) => (
                        <motion.div
                          key={player.rank}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.05 * index }}
                          className={`
                            p-4 rounded-xl border transition-all
                            ${player.username === 'You'
                              ? 'bg-primary/10 border-primary/50'
                              : 'bg-background/50 border-border/50 hover:border-primary/30'
                            }
                          `}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 flex-1">
                              <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center shrink-0
                                ${player.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                                  player.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                                  player.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-amber-800' :
                                  'bg-muted/50'}
                              `}>
                                {player.rank <= 3 ? (
                                  <Medal className="w-5 h-5 text-white" />
                                ) : (
                                  <span className="text-sm">{player.rank}</span>
                                )}
                              </div>
                              <Avatar className="w-12 h-12">
                                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                                  {player.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span>{player.username}</span>
                                  {player.badges.map((badge, idx) => (
                                    <span key={idx} className="text-sm">{badge}</span>
                                  ))}
                                  {player.change !== 0 && (
                                    <Badge className={`text-xs ${
                                      player.change > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                    }`}>
                                      {player.change > 0 ? '↑' : '↓'}{Math.abs(player.change)}
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-muted-foreground">{player.score.toLocaleString()} points</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-green-400">{player.reward}</div>
                              <div className="text-xs text-muted-foreground">Est. Reward</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="rules" className="space-y-4">
                    <h3>Competition Rules</h3>
                    <div className="space-y-3">
                      {competition.rules.map((rule, index) => (
                        <div key={index} className="p-4 bg-background/50 rounded-xl border border-border/50">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-xs text-primary">{index + 1}</span>
                            </div>
                            <p className="text-sm">{rule}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="prizes" className="space-y-4">
                    <h3>Prize Distribution</h3>
                    <div className="space-y-3">
                      {competition.prizeDistribution.map((tier, index) => (
                        <div key={index} className="p-4 bg-background/50 rounded-xl border border-border/50">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-muted-foreground">{tier.rank}</span>
                            <span className="text-green-400">{tier.prize}</span>
                          </div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Prize Pool Share</span>
                            <span>{tier.percentage}%</span>
                          </div>
                          <Progress value={tier.percentage * 2} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Competition Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-4">Competition Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Category</span>
                    <Badge className="bg-gradient-to-r from-primary to-secondary">{competition.category}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Difficulty</span>
                    <Badge className={
                      competition.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                      competition.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }>
                      {competition.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Started</span>
                    <span>{competition.startedAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ends</span>
                    <span>{competition.endsAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-4">Requirements</h3>
                <div className="space-y-2">
                  {competition.requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl border border-primary/30">
                    <div className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                      {competition.totalPrizePool}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Prize Pool</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-background/50 rounded-xl border border-border/50">
                      <div className="text-lg">{competition.participants}</div>
                      <div className="text-xs text-muted-foreground">Participants</div>
                    </div>
                    <div className="text-center p-3 bg-background/50 rounded-xl border border-border/50">
                      <div className="text-lg">{daysLeft}</div>
                      <div className="text-xs text-muted-foreground">Days Left</div>
                    </div>
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