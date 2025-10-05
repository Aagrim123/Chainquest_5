import { motion } from 'motion/react';
import { useState } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, BarChart3 } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Slider } from '../components/ui/slider';
import { toast } from 'sonner@2.0.3';

const positions = [
  {
    id: 1,
    asset: 'ETH/USDC',
    direction: 'Long',
    leverage: 5,
    collateral: 1000,
    position: 5000,
    pnl: 245.50,
    pnlPercent: 24.55,
    liquidationPrice: 1850,
  },
  {
    id: 2,
    asset: 'BTC/USDC',
    direction: 'Short',
    leverage: 3,
    collateral: 2000,
    position: 6000,
    pnl: -180.20,
    pnlPercent: -9.01,
    liquidationPrice: 52000,
  },
];

export function LeveragePage() {
  const [leverage, setLeverage] = useState([5]);
  const [collateral, setCollateral] = useState('');
  const [direction, setDirection] = useState<'long' | 'short'>('long');

  const positionSize = collateral ? parseFloat(collateral) * leverage[0] : 0;
  const liquidationPrice = direction === 'long' ? 1800 : 2200;

  const handleOpenPosition = () => {
    if (!collateral) {
      toast.error('Please enter collateral amount');
      return;
    }
    toast.success(`${direction.toUpperCase()} position opened with ${leverage[0]}x leverage!`);
    setCollateral('');
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
          <div className="flex items-center gap-3 mb-4">
            <h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Leverage Trading
            </h1>
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              <AlertTriangle className="w-3 h-3 mr-1" />
              High Risk
            </Badge>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Amplify your trading positions with up to 10x leverage. Trade responsibly and manage your risk carefully.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trading Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Volume', value: '$45.2M', icon: BarChart3, color: 'primary' },
                { label: 'Open Interest', value: '$12.8M', icon: DollarSign, color: 'secondary' },
                { label: 'Long Positions', value: '67%', icon: TrendingUp, color: 'green' },
                { label: 'Short Positions', value: '33%', icon: TrendingDown, color: 'red' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <Card className="p-4 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-2xl">
                    <div className={`p-2 rounded-lg bg-${stat.color}-500/10 w-fit mb-2`}>
                      <stat.icon className={`w-4 h-4 text-${stat.color}-400`} />
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                    <div className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Open Positions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-6">Open Positions</h3>
                {positions.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No open positions
                  </div>
                ) : (
                  <div className="space-y-4">
                    {positions.map((position, index) => (
                      <motion.div
                        key={position.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className="p-5 bg-background/50 rounded-2xl border border-border/50"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <h4>{position.asset}</h4>
                            <Badge
                              className={`
                                ${position.direction === 'Long'
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-red-500/20 text-red-400'
                                }
                              `}
                            >
                              {position.leverage}x {position.direction}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className={`text-xl ${position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {position.pnl >= 0 ? '+' : ''}{position.pnl.toFixed(2)} USDC
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Collateral</div>
                            <div className="text-sm">{position.collateral} USDC</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Position Size</div>
                            <div className="text-sm">{position.position} USDC</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Liquidation</div>
                            <div className="text-sm text-red-400">${position.liquidationPrice}</div>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 rounded-full border-primary/30"
                          >
                            Add Margin
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 rounded-full border-red-500/30 text-red-400 hover:bg-red-500/10"
                          >
                            Close Position
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          </div>

          {/* Sidebar - New Position */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
                <h3 className="mb-6">Open Position</h3>

                {/* Direction Selector */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Button
                    onClick={() => setDirection('long')}
                    className={`
                      rounded-xl transition-all
                      ${direction === 'long'
                        ? 'bg-green-500/20 text-green-400 border-2 border-green-500/50'
                        : 'bg-background/50 text-muted-foreground border border-border/50'
                      }
                    `}
                    variant="outline"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Long
                  </Button>
                  <Button
                    onClick={() => setDirection('short')}
                    className={`
                      rounded-xl transition-all
                      ${direction === 'short'
                        ? 'bg-red-500/20 text-red-400 border-2 border-red-500/50'
                        : 'bg-background/50 text-muted-foreground border border-border/50'
                      }
                    `}
                    variant="outline"
                  >
                    <TrendingDown className="w-4 h-4 mr-2" />
                    Short
                  </Button>
                </div>

                {/* Collateral Input */}
                <div className="mb-6">
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Collateral (USDC)
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={collateral}
                    onChange={(e) => setCollateral(e.target.value)}
                    className="bg-background/50 border-border/50 rounded-xl"
                  />
                </div>

                {/* Leverage Slider */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-muted-foreground">Leverage</span>
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {leverage[0]}x
                    </span>
                  </div>
                  <Slider
                    value={leverage}
                    onValueChange={setLeverage}
                    min={1}
                    max={10}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1x</span>
                    <span>5x</span>
                    <span>10x</span>
                  </div>
                </div>

                {/* Position Summary */}
                <div className="p-4 bg-background/50 rounded-xl border border-border/50 mb-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Position Size</span>
                    <span>{positionSize.toFixed(2)} USDC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Liquidation Price</span>
                    <span className="text-red-400">${liquidationPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Trading Fee</span>
                    <span>0.1%</span>
                  </div>
                </div>

                {/* Warning */}
                <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30 mb-6">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                    <div className="text-sm text-yellow-400">
                      Leveraged trading carries high risk. You may lose your entire collateral.
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleOpenPosition}
                  disabled={!collateral}
                  className={`
                    w-full rounded-full
                    ${direction === 'long'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90'
                      : 'bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90'
                    }
                  `}
                >
                  Open {direction === 'long' ? 'Long' : 'Short'} Position
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
