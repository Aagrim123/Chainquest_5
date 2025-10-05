import { motion } from 'motion/react';
import { Gift, Calendar, Users, Trophy, Check, Lock, Send, MessageCircle, Share2, Star } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { useTelegram } from '../contexts/TelegramContext';
import { useWeb3 } from '../contexts/Web3Context';

const telegramTasks = [
  {
    id: 'join_channel',
    name: 'Join Telegram Channel',
    description: 'Join our official Telegram channel',
    reward: 50,
    icon: Send,
    action: 'Join Channel',
    link: 'https://t.me/YourGameChannel',
  },
  {
    id: 'join_group',
    name: 'Join Community Group',
    description: 'Join the community discussion group',
    reward: 50,
    icon: MessageCircle,
    action: 'Join Group',
    link: 'https://t.me/YourGameGroup',
  },
  {
    id: 'share_bot',
    name: 'Share with Friends',
    description: 'Share the bot with 3 friends',
    reward: 100,
    icon: Share2,
    action: 'Share',
    link: 'https://t.me/share/url?url=https://t.me/YourGameBot',
  },
  {
    id: 'daily_check',
    name: 'Daily Check-in',
    description: 'Check in daily for 7 consecutive days',
    reward: 150,
    icon: Calendar,
    action: 'Check In',
    link: null,
  },
  {
    id: 'rate_bot',
    name: 'Rate the Bot',
    description: 'Give us a 5-star rating',
    reward: 75,
    icon: Star,
    action: 'Rate Now',
    link: null,
  },
];

const airdrops = [
  {
    id: 1,
    name: 'Season 1 Rewards',
    status: 'active',
    reward: '500 GAME',
    participants: 12450,
    endsIn: '3 days',
    requirements: ['Hold 100+ GAME', 'Complete 5 trades', 'Stake any NFT'],
    completed: [true, true, false],
    claimable: false,
  },
  {
    id: 2,
    name: 'NFT Holders Bonus',
    status: 'active',
    reward: '1,000 GAME',
    participants: 3450,
    endsIn: '7 days',
    requirements: ['Own Legendary NFT', 'Trade volume > $1000'],
    completed: [false, true],
    claimable: false,
  },
  {
    id: 3,
    name: 'Early Adopters',
    status: 'claimable',
    reward: '250 GAME',
    participants: 8920,
    endsIn: 'Claim now',
    requirements: ['Registered before Jan 2025'],
    completed: [true],
    claimable: true,
  },
  {
    id: 4,
    name: 'Telegram Exclusive',
    status: 'active',
    reward: '425 GAME',
    participants: 15200,
    endsIn: '5 days',
    requirements: ['Connect Telegram', 'Complete 3 Telegram tasks', 'Connect wallet'],
    completed: [false, false, false],
    claimable: false,
    isTelegramExclusive: true,
  },
];

const stats = [
  { label: 'Total Airdrops', value: '4', icon: Gift, color: 'primary' },
  { label: 'Total Claimed', value: '250 GAME', icon: Trophy, color: 'secondary' },
  { label: 'Participants', value: '30K+', icon: Users, color: 'accent' },
];

export function AirdropPage() {
  const [completedTasksLocal, setCompletedTasksLocal] = useState<Set<string>>(new Set());
  const [telegramPoints, setTelegramPoints] = useState(0);
  const { isConnected: telegramConnected, user: telegramUser, completeTelegramTask } = useTelegram();
  const { isConnected: walletConnected } = useWeb3();

  const handleClaim = (airdropName: string) => {
    toast.success(`Claimed ${airdropName} rewards!`, {
      description: 'Tokens will be sent to your wallet',
    });
  };

  const handleTelegramTask = async (task: typeof telegramTasks[0]) => {
    if (!telegramConnected) {
      toast.error('Please connect Telegram first', {
        description: 'Click the Telegram button in the top bar',
      });
      return;
    }

    if (completedTasksLocal.has(task.id)) {
      toast.info('Task already completed!');
      return;
    }

    // Open link if available
    if (task.link) {
      window.open(task.link, '_blank');
    }

    // Simulate task completion
    toast.loading('Verifying task...', { id: task.id });
    
    setTimeout(async () => {
      const success = await completeTelegramTask(task.id);
      
      if (success) {
        setCompletedTasksLocal(prev => new Set(prev).add(task.id));
        setTelegramPoints(prev => prev + task.reward);
        toast.success(`Task completed! +${task.reward} GAME`, {
          id: task.id,
          description: task.name,
        });
      }
    }, 2000);
  };

  const getTelegramExclusiveProgress = () => {
    const telegramTasksCompleted = Array.from(completedTasksLocal).length;
    return {
      connected: telegramConnected,
      tasksCompleted: telegramTasksCompleted >= 3,
      walletConnected: walletConnected,
    };
  };

  const progress = getTelegramExclusiveProgress();
  const allRequirementsMet = progress.connected && progress.tasksCompleted && progress.walletConnected;

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
            Airdrops & Rewards
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Participate in airdrops and complete Telegram tasks to earn free tokens. Connect your Telegram and wallet to unlock exclusive rewards!
          </p>
        </motion.div>

        {/* Telegram Banner */}
        {!telegramConnected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Card className="p-6 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-primary/10 backdrop-blur-lg border border-blue-500/30 rounded-3xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2">Connect Telegram for Exclusive Rewards</h3>
                  <p className="text-sm text-muted-foreground">
                    Join our Telegram community and complete tasks to earn up to 425 GAME tokens!
                  </p>
                </div>
                <Button
                  onClick={() => toast.info('Click the Telegram button in the top bar to connect')}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 rounded-full px-8 shrink-0"
                >
                  Connect Now
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
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

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Tabs defaultValue="airdrops" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-2xl p-1">
                  <TabsTrigger value="airdrops" className="rounded-xl">
                    Airdrops
                  </TabsTrigger>
                  <TabsTrigger value="telegram" className="rounded-xl">
                    Telegram Tasks
                    {telegramConnected && completedTasksLocal.size > 0 && (
                      <Badge className="ml-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {completedTasksLocal.size}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>

                {/* Airdrops Tab */}
                <TabsContent value="airdrops" className="mt-6">
                  <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                    <h3 className="mb-6">Available Airdrops</h3>
                    <div className="space-y-4">
                      {airdrops.map((airdrop, index) => {
                        const isTelegramExclusive = airdrop.isTelegramExclusive;
                        const telegramRequirementsMet = isTelegramExclusive ? allRequirementsMet : true;

                        return (
                          <motion.div
                            key={airdrop.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * index }}
                            className={`p-6 rounded-2xl border ${
                              isTelegramExclusive
                                ? 'bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border-blue-500/30'
                                : 'bg-background/50 border-border/50'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-start gap-3">
                                <div className={`w-12 h-12 rounded-full ${
                                  isTelegramExclusive
                                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                                    : 'bg-gradient-to-br from-primary to-secondary'
                                } flex items-center justify-center`}>
                                  {isTelegramExclusive ? (
                                    <Send className="w-6 h-6 text-white" />
                                  ) : (
                                    <Gift className="w-6 h-6 text-white" />
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4>{airdrop.name}</h4>
                                    {isTelegramExclusive && (
                                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                        Telegram
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      className={
                                        airdrop.status === 'active'
                                          ? 'bg-green-500/20 text-green-400'
                                          : airdrop.status === 'claimable'
                                          ? 'bg-blue-500/20 text-blue-400'
                                          : 'bg-gray-500/20 text-gray-400'
                                      }
                                    >
                                      {airdrop.status}
                                    </Badge>
                                    <Badge variant="outline" className="border-border/50">
                                      <Users className="w-3 h-3 mr-1" />
                                      {airdrop.participants.toLocaleString()}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                                  {airdrop.reward}
                                </div>
                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {airdrop.endsIn}
                                </div>
                              </div>
                            </div>

                            <div className="mb-4">
                              <div className="text-sm text-muted-foreground mb-3">Requirements:</div>
                              <div className="space-y-2">
                                {airdrop.requirements.map((req, i) => {
                                  let isCompleted = airdrop.completed[i];
                                  
                                  // Check Telegram exclusive requirements dynamically
                                  if (isTelegramExclusive) {
                                    if (req === 'Connect Telegram') isCompleted = progress.connected;
                                    if (req === 'Complete 3 Telegram tasks') isCompleted = progress.tasksCompleted;
                                    if (req === 'Connect wallet') isCompleted = progress.walletConnected;
                                  }

                                  return (
                                    <div key={i} className="flex items-center gap-2 text-sm">
                                      {isCompleted ? (
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                          <Check className="w-3 h-3 text-green-400" />
                                        </div>
                                      ) : (
                                        <div className="w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center">
                                          <Lock className="w-3 h-3 text-muted-foreground" />
                                        </div>
                                      )}
                                      <span className={isCompleted ? 'text-green-400' : 'text-muted-foreground'}>
                                        {req}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {airdrop.status !== 'ended' && (
                              <>
                                <div className="mb-4">
                                  <div className="flex justify-between text-sm mb-2">
                                    <span className="text-muted-foreground">Progress</span>
                                    <span>
                                      {isTelegramExclusive
                                        ? `${Object.values(progress).filter(Boolean).length}/${airdrop.requirements.length}`
                                        : `${airdrop.completed.filter(Boolean).length}/${airdrop.requirements.length}`
                                      }
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      isTelegramExclusive
                                        ? (Object.values(progress).filter(Boolean).length / airdrop.requirements.length) * 100
                                        : (airdrop.completed.filter(Boolean).length / airdrop.requirements.length) * 100
                                    }
                                    className="h-2"
                                  />
                                </div>

                                <Button
                                  onClick={() => handleClaim(airdrop.name)}
                                  disabled={isTelegramExclusive ? !allRequirementsMet : !airdrop.claimable}
                                  className={`
                                    w-full rounded-full
                                    ${(isTelegramExclusive ? allRequirementsMet : airdrop.claimable)
                                      ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90'
                                      : 'opacity-50 cursor-not-allowed'
                                    }
                                  `}
                                >
                                  {(isTelegramExclusive ? allRequirementsMet : airdrop.claimable)
                                    ? 'Claim Rewards'
                                    : 'Complete Requirements'}
                                </Button>
                              </>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </Card>
                </TabsContent>

                {/* Telegram Tasks Tab */}
                <TabsContent value="telegram" className="mt-6">
                  <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3>Telegram Tasks</h3>
                      {telegramConnected && (
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          {telegramPoints} GAME earned
                        </Badge>
                      )}
                    </div>

                    {!telegramConnected ? (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                          <Send className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="mb-2">Connect Telegram to Get Started</h4>
                        <p className="text-muted-foreground mb-6">
                          Complete simple tasks and earn GAME tokens instantly!
                        </p>
                        <Button
                          onClick={() => toast.info('Click the Telegram button in the top bar')}
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 rounded-full px-8"
                        >
                          Connect Telegram
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {telegramTasks.map((task, index) => {
                          const isCompleted = completedTasksLocal.has(task.id);

                          return (
                            <motion.div
                              key={task.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 * index }}
                              className="p-6 rounded-2xl border bg-background/50 border-border/50"
                            >
                              <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                                  isCompleted
                                    ? 'bg-green-500/20'
                                    : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
                                }`}>
                                  {isCompleted ? (
                                    <Check className="w-6 h-6 text-green-400" />
                                  ) : (
                                    <task.icon className="w-6 h-6 text-blue-400" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h4 className="mb-1">{task.name}</h4>
                                  <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                                  <div className="flex items-center justify-between">
                                    <Badge className="bg-primary/20 text-primary border-primary/30">
                                      +{task.reward} GAME
                                    </Badge>
                                    <Button
                                      onClick={() => handleTelegramTask(task)}
                                      disabled={isCompleted}
                                      size="sm"
                                      className={`rounded-full ${
                                        isCompleted
                                          ? 'opacity-50 cursor-not-allowed'
                                          : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90'
                                      }`}
                                    >
                                      {isCompleted ? 'Completed' : task.action}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </Card>
                </TabsContent>
              </Tabs>
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
                <h3 className="mb-4">How Airdrops Work</h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs text-primary">1</span>
                    </div>
                    <p>Complete the required tasks for each airdrop campaign</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs text-primary">2</span>
                    </div>
                    <p>Wait for the airdrop period to end or requirements to be verified</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs text-primary">3</span>
                    </div>
                    <p>Claim your rewards when the airdrop becomes available</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs text-blue-400">4</span>
                    </div>
                    <p>Connect Telegram for exclusive tasks and bonus rewards!</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-4">My Rewards</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-background/50 rounded-xl border border-border/50">
                    <div className="text-sm text-muted-foreground mb-1">Total Claimed</div>
                    <div className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      250 GAME
                    </div>
                  </div>
                  <div className="p-4 bg-background/50 rounded-xl border border-border/50">
                    <div className="text-sm text-muted-foreground mb-1">Telegram Rewards</div>
                    <div className="text-2xl bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                      {telegramPoints} GAME
                    </div>
                  </div>
                  <div className="p-4 bg-background/50 rounded-xl border border-border/50">
                    <div className="text-sm text-muted-foreground mb-1">Pending Claims</div>
                    <div className="text-2xl text-yellow-400">1</div>
                  </div>
                  <div className="p-4 bg-background/50 rounded-xl border border-border/50">
                    <div className="text-sm text-muted-foreground mb-1">Active Campaigns</div>
                    <div className="text-2xl">4</div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {telegramConnected && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg border border-blue-500/30 rounded-3xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Send className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm">Telegram Connected</h4>
                      <p className="text-xs text-muted-foreground">
                        @{telegramUser?.username || telegramUser?.first_name}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Complete {5 - completedTasksLocal.size} more tasks to unlock the exclusive Telegram airdrop!
                  </p>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}