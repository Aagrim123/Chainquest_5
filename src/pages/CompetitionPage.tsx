import { motion } from 'motion/react';
import { Trophy, Medal, Star, TrendingUp, Users, Award } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { toast } from 'sonner@2.0.3';

const competitions = [
  {
    id: 1,
    name: 'Trading Championship',
    status: 'active',
    prize: '10,000 GAME',
    participants: 2450,
    endsIn: '5 days',
    myRank: 42,
    requirements: 'Trade volume > $5000',
  },
  {
    id: 2,
    name: 'NFT Battle Royale',
    status: 'active',
    prize: '5,000 GAME',
    participants: 1876,
    endsIn: '2 days',
    myRank: 15,
    requirements: 'Win 10 battles',
  },
  {
    id: 3,
    name: 'Staking Marathon',
    status: 'upcoming',
    prize: '7,500 GAME',
    participants: 0,
    endsIn: 'Starts in 3 days',
    myRank: null,
    requirements: 'Stake for 30 days',
  },
];

const leaderboard = [
  { rank: 1, username: 'CryptoKing', score: 15420, reward: '3,000 GAME', avatar: 'CK' },
  { rank: 2, username: 'NFTMaster', score: 14890, reward: '2,000 GAME', avatar: 'NM' },
  { rank: 3, username: 'TradeWizard', score: 13250, reward: '1,500 GAME', avatar: 'TW' },
  { rank: 4, username: 'BlockchainPro', score: 12800, reward: '1,000 GAME', avatar: 'BP' },
  { rank: 5, username: 'GameChampion', score: 11950, reward: '800 GAME', avatar: 'GC' },
  { rank: 42, username: 'You', score: 5420, reward: '100 GAME', avatar: 'YO' },
];

export function CompetitionPage() {
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
            Competitions
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Compete with players worldwide and climb the leaderboards to win exclusive rewards and prizes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Active Competitions', value: '2', icon: Trophy, color: 'primary' },
                { label: 'Best Rank', value: '#15', icon: Medal, color: 'secondary' },
                { label: 'Total Prizes Won', value: '450 GAME', icon: Award, color: 'accent' },
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

            {/* Competitions List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-6">Active Competitions</h3>
                <div className="space-y-4">
                  {competitions.map((comp, index) => (
                    <motion.div
                      key={comp.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="p-5 rounded-2xl border bg-background/50 border-border/50"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="mb-2">{comp.name}</h4>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  comp.status === 'active'
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-yellow-500/20 text-yellow-400'
                                }
                              >
                                {comp.status}
                              </Badge>
                              <Badge variant="outline" className="border-border/50">
                                <Users className="w-3 h-3 mr-1" />
                                {comp.participants.toLocaleString()}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                            {comp.prize}
                          </div>
                          <div className="text-sm text-muted-foreground">{comp.endsIn}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Requirements</div>
                          <div className="text-sm">{comp.requirements}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">My Rank</div>
                          <div className="text-sm">
                            {comp.myRank ? `#${comp.myRank}` : 'Not participating'}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => toast.success(`Joined ${comp.name}!`)}
                        className={`
                          w-full rounded-full
                          ${comp.status === 'active'
                            ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90'
                            : 'opacity-50 cursor-not-allowed'
                          }
                        `}
                        disabled={comp.status !== 'active'}
                      >
                        {comp.myRank ? 'View Details' : comp.status === 'active' ? 'Join Competition' : 'Coming Soon'}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-6">Leaderboard - Trading Championship</h3>
                <div className="space-y-2">
                  {leaderboard.map((player, index) => (
                    <motion.div
                      key={player.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      className={`
                        p-4 rounded-xl border transition-all
                        ${player.username === 'You'
                          ? 'bg-primary/10 border-primary/50'
                          : 'bg-background/50 border-border/50'
                        }
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center shrink-0
                            ${player.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                              player.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                              player.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-amber-800' :
                              'bg-muted/50'}
                          `}>
                            {player.rank <= 3 ? (
                              <Medal className="w-4 h-4 text-white" />
                            ) : (
                              <span className="text-sm">{player.rank}</span>
                            )}
                          </div>
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                              {player.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span>{player.username}</span>
                              {player.rank <= 3 && (
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">{player.score.toLocaleString()} points</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-green-400">{player.reward}</div>
                        </div>
                      </div>
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
                <h3 className="mb-4">Prize Distribution</h3>
                <div className="space-y-3">
                  {[
                    { rank: '1st Place', prize: '3,000 GAME', percent: 30 },
                    { rank: '2nd Place', prize: '2,000 GAME', percent: 20 },
                    { rank: '3rd Place', prize: '1,500 GAME', percent: 15 },
                    { rank: '4th-10th', prize: '500 GAME', percent: 5 },
                    { rank: '11th-50th', prize: '100 GAME', percent: 1 },
                  ].map((tier) => (
                    <div key={tier.rank} className="p-3 bg-background/50 rounded-xl border border-border/50">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">{tier.rank}</span>
                        <span className="text-green-400">{tier.prize}</span>
                      </div>
                      <Progress value={tier.percent * 3} className="h-1" />
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-4">Competition Tips</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <p>Participate early to maximize your chances of winning</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Trophy className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    <p>Complete daily tasks to climb the leaderboard faster</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <p>Top 50 players receive guaranteed prizes</p>
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
