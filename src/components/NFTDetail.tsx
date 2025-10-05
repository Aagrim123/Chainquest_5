import { motion } from 'motion/react';
import { ArrowLeft, ShoppingCart, TrendingUp, Shield, Zap, Activity, Heart, Share2, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

interface NFT {
  id: number;
  name: string;
  type: string;
  price: string;
  rarity: string;
  emoji: string;
  image?: string;
  stats: { attack: number; defense: number; speed: number };
}

interface NFTDetailProps {
  nft: NFT;
  onBack: () => void;
}

const rarityColors: Record<string, string> = {
  Legendary: 'from-yellow-500 to-orange-500',
  Epic: 'from-purple-500 to-pink-500',
  Rare: 'from-blue-500 to-cyan-500',
};

export function NFTDetail({ nft, onBack }: NFTDetailProps) {
  const handlePurchase = () => {
    toast.success(`Purchase initiated for ${nft.name}! Connect your wallet to complete the transaction.`);
  };

  const handleAddToCart = () => {
    toast.success(`${nft.name} added to cart!`);
  };

  const handleLike = () => {
    toast.success(`Added ${nft.name} to favorites!`);
  };

  const handleShare = () => {
    toast.success('Link copied to clipboard!');
  };

  const currentPrice = parseFloat(nft.price);
  const priceHistory = [
    { date: 'Oct 1', price: currentPrice * 0.84 },
    { date: 'Oct 5', price: currentPrice * 0.92 },
    { date: 'Oct 10', price: currentPrice * 1.12 },
    { date: 'Oct 15', price: currentPrice },
    { date: 'Oct 20', price: currentPrice * 1.2 },
    { date: 'Oct 25', price: currentPrice * 1.08 },
    { date: 'Now', price: currentPrice },
  ];

  const maxPrice = Math.max(...priceHistory.map(p => p.price));

  return (
    <div className="min-h-screen py-6 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  onClick={onBack}
                  className="cursor-pointer hover:text-primary transition-colors"
                >
                  Marketplace
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="w-4 h-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{nft.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Button
            variant="ghost"
            onClick={onBack}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - NFT Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <motion.div
                  className={`relative aspect-square bg-gradient-to-br ${rarityColors[nft.rarity]} p-2`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full bg-card flex items-center justify-center rounded-lg relative overflow-hidden">
                    {nft.image ? (
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <motion.div
                        className="text-9xl"
                        animate={{
                          y: [0, -20, 0],
                          rotateZ: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {nft.emoji}
                      </motion.div>
                    )}
                    
                    <Badge className={`absolute top-4 right-4 bg-gradient-to-r ${rarityColors[nft.rarity]} text-lg px-4 py-2`}>
                      {nft.rarity}
                    </Badge>

                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button 
                          variant="secondary" 
                          size="icon" 
                          className="rounded-full bg-card/80 backdrop-blur-sm hover:bg-red-500/20 hover:text-red-500 transition-colors"
                          onClick={handleLike}
                        >
                          <Heart className="w-5 h-5" />
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button 
                          variant="secondary" 
                          size="icon" 
                          className="rounded-full bg-card/80 backdrop-blur-sm hover:bg-blue-500/20 hover:text-blue-500 transition-colors"
                          onClick={handleShare}
                        >
                          <Share2 className="w-5 h-5" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-muted-foreground mb-2">Token ID</h3>
                    <code className="px-3 py-1 rounded bg-muted text-sm">
                      0x742d...{nft.id}a8f
                    </code>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-muted-foreground mb-3">Ownership History</h3>
                    <div className="space-y-2">
                      {['0x8B4f...3c2a', '0x1A2b...9d4e', '0xFf3c...7b1a'].map((address, index) => (
                        <div key={address} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Owner #{3 - index}</span>
                          <code className="text-xs">{address}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Details & Purchase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 space-y-6">
                <div>
                  <Badge className="mb-3 bg-primary/20 text-primary">{nft.type}</Badge>
                  <h1 className="mb-2" style={{ fontSize: '2rem', fontWeight: 700 }}>{nft.name}</h1>
                  <p className="text-muted-foreground">
                    A rare {nft.rarity.toLowerCase()} tier {nft.type.toLowerCase()} with exceptional stats and unique abilities in the ChainQuest universe.
                  </p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-end gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Current Price</div>
                      <div className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
                        {nft.price} ETH
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-green-500 mb-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>+12.5%</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 py-6"
                        onClick={handlePurchase}
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Buy Now
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        variant="outline" 
                        className="px-6 py-6 border-2 border-primary/50"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="mb-4" style={{ fontWeight: 600 }}>Stats & Attributes</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-red-500" />
                        Attack Power
                      </span>
                      <span style={{ fontWeight: 600 }}>{nft.stats.attack}</span>
                    </div>
                    <Progress value={nft.stats.attack} max={100} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-500" />
                        Defense
                      </span>
                      <span style={{ fontWeight: 600 }}>{nft.stats.defense}</span>
                    </div>
                    <Progress value={nft.stats.defense} max={100} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-green-500" />
                        Speed
                      </span>
                      <span style={{ fontWeight: 600 }}>{nft.stats.speed}</span>
                    </div>
                    <Progress value={nft.stats.speed} max={100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="mb-4" style={{ fontWeight: 600 }}>Price History</h3>
                <div className="space-y-3">
                  {priceHistory.map((item, index) => (
                    <div key={item.date} className="flex items-center gap-3">
                      <div className="text-sm text-muted-foreground w-16">{item.date}</div>
                      <div className="flex-1">
                        <div className="relative h-8 bg-muted/30 rounded overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.price / maxPrice) * 100}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary"
                          />
                          <div className="absolute inset-0 flex items-center px-3 text-sm" style={{ fontWeight: 600 }}>
                            {item.price.toFixed(2)} ETH
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="mb-4" style={{ fontWeight: 600 }}>Item Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">Minted</div>
                    <div>Sep 15, 2024</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Edition</div>
                    <div>1 of 100</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Blockchain</div>
                    <div>Ethereum</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Standard</div>
                    <div>ERC-721</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
