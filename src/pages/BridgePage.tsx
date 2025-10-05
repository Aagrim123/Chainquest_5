import { motion } from 'motion/react';
import { useState } from 'react';
import { ArrowRight, ArrowLeftRight, Shield, Clock, DollarSign, Zap } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner@2.0.3';

const chains = [
  { id: 'ethereum', name: 'Ethereum', icon: '🔷', color: 'from-blue-500 to-blue-600' },
  { id: 'polygon', name: 'Polygon', icon: '⬣', color: 'from-purple-500 to-purple-600' },
  { id: 'bsc', name: 'BSC', icon: '🟡', color: 'from-yellow-500 to-yellow-600' },
  { id: 'avalanche', name: 'Avalanche', icon: '🔺', color: 'from-red-500 to-red-600' },
  { id: 'arbitrum', name: 'Arbitrum', icon: '🔵', color: 'from-cyan-500 to-cyan-600' },
  { id: 'optimism', name: 'Optimism', icon: '🔴', color: 'from-pink-500 to-pink-600' },
];

const tokens = [
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', icon: '💎' },
  { id: 'usdc', symbol: 'USDC', name: 'USD Coin', icon: '💵' },
  { id: 'usdt', symbol: 'USDT', name: 'Tether', icon: '💚' },
  { id: 'game', symbol: 'GAME', name: 'Game Token', icon: '🎮' },
];

const recentTransfers = [
  {
    id: 1,
    from: 'Ethereum',
    to: 'Polygon',
    amount: '100 USDC',
    status: 'Completed',
    time: '5 min ago',
  },
  {
    id: 2,
    from: 'BSC',
    to: 'Ethereum',
    amount: '0.5 ETH',
    status: 'Processing',
    time: '12 min ago',
  },
  {
    id: 3,
    from: 'Polygon',
    to: 'Arbitrum',
    amount: '250 GAME',
    status: 'Completed',
    time: '1 hour ago',
  },
];

export function BridgePage() {
  const [fromChain, setFromChain] = useState('ethereum');
  const [toChain, setToChain] = useState('polygon');
  const [selectedToken, setSelectedToken] = useState('usdc');
  const [amount, setAmount] = useState('');

  const estimatedTime = '2-5 minutes';
  const bridgeFee = amount ? (parseFloat(amount) * 0.001).toFixed(4) : '0';

  const handleSwapChains = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  const handleBridge = () => {
    if (!amount) {
      toast.error('Please enter an amount to bridge');
      return;
    }
    toast.success('Bridge transaction initiated!');
    setAmount('');
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
            Cross-Chain Bridge
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Transfer your assets seamlessly across different blockchain networks with low fees and fast confirmation times.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bridge Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Bridged', value: '$124M', icon: DollarSign, color: 'primary' },
                { label: 'Supported Chains', value: '6', icon: Shield, color: 'secondary' },
                { label: 'Avg Time', value: '3 min', icon: Clock, color: 'accent' },
                { label: 'Bridge Fee', value: '0.1%', icon: Zap, color: 'primary' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <Card className="p-4 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-2xl">
                    <div className={`p-2 rounded-lg bg-${stat.color}/10 w-fit mb-2`}>
                      <stat.icon className={`w-4 h-4 text-${stat.color}`} />
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                    <div className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Bridge Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-8 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-6">Transfer Assets</h3>

                {/* From Chain */}
                <div className="mb-4">
                  <label className="text-sm text-muted-foreground mb-3 block">From</label>
                  <Select value={fromChain} onValueChange={setFromChain}>
                    <SelectTrigger className="bg-background/50 border-border/50 rounded-xl h-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {chains.filter(c => c.id !== toChain).map((chain) => (
                        <SelectItem key={chain.id} value={chain.id}>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{chain.icon}</span>
                            <span>{chain.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center -my-2 relative z-10">
                  <motion.button
                    onClick={handleSwapChains}
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/50"
                  >
                    <ArrowLeftRight className="w-5 h-5 text-white" />
                  </motion.button>
                </div>

                {/* To Chain */}
                <div className="mb-6">
                  <label className="text-sm text-muted-foreground mb-3 block">To</label>
                  <Select value={toChain} onValueChange={setToChain}>
                    <SelectTrigger className="bg-background/50 border-border/50 rounded-xl h-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {chains.filter(c => c.id !== fromChain).map((chain) => (
                        <SelectItem key={chain.id} value={chain.id}>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{chain.icon}</span>
                            <span>{chain.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Token Selection */}
                <div className="mb-6">
                  <label className="text-sm text-muted-foreground mb-3 block">Token</label>
                  <Select value={selectedToken} onValueChange={setSelectedToken}>
                    <SelectTrigger className="bg-background/50 border-border/50 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tokens.map((token) => (
                        <SelectItem key={token.id} value={token.id}>
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{token.icon}</span>
                            <div>
                              <div>{token.symbol}</div>
                              <div className="text-xs text-muted-foreground">{token.name}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Amount Input */}
                <div className="mb-6">
                  <label className="text-sm text-muted-foreground mb-3 block">Amount</label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-background/50 border-border/50 rounded-xl h-14 pr-20"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-primary"
                    >
                      MAX
                    </Button>
                  </div>
                </div>

                {/* Transaction Summary */}
                {amount && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-background/50 rounded-2xl border border-border/50 mb-6 space-y-3"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">You will receive</span>
                      <span>{(parseFloat(amount) - parseFloat(bridgeFee)).toFixed(4)} {tokens.find(t => t.id === selectedToken)?.symbol}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Bridge Fee (0.1%)</span>
                      <span>{bridgeFee} {tokens.find(t => t.id === selectedToken)?.symbol}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Estimated Time</span>
                      <span>{estimatedTime}</span>
                    </div>
                  </motion.div>
                )}

                <Button
                  onClick={handleBridge}
                  disabled={!amount}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 rounded-full h-14"
                >
                  Bridge Tokens
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Supported Chains */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-4">Supported Chains</h3>
                <div className="space-y-2">
                  {chains.map((chain) => (
                    <div
                      key={chain.id}
                      className="flex items-center gap-3 p-3 bg-background/50 rounded-xl border border-border/50"
                    >
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${chain.color} flex items-center justify-center text-xl`}>
                        {chain.icon}
                      </div>
                      <span>{chain.name}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Recent Transfers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-4">Recent Transfers</h3>
                <div className="space-y-3">
                  {recentTransfers.map((transfer) => (
                    <div
                      key={transfer.id}
                      className="p-4 bg-background/50 rounded-xl border border-border/50"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">{transfer.from}</span>
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{transfer.to}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{transfer.amount}</span>
                        <Badge
                          className={
                            transfer.status === 'Completed'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }
                        >
                          {transfer.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{transfer.time}</div>
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
