import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ShoppingCart, TrendingUp, Eye } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export const nfts = [
  {
    id: 1,
    name: 'Cyber Dragon',
    type: 'Character',
    price: '2.5',
    rarity: 'Legendary',
    emoji: '🐲',
    image: 'https://images.unsplash.com/photo-1610926597998-fc7f2c1b89b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    stats: { attack: 95, defense: 88, speed: 92 },
  },
  {
    id: 2,
    name: 'Quantum Sword',
    type: 'Weapon',
    price: '1.8',
    rarity: 'Epic',
    emoji: '⚔️',
    image: 'https://images.unsplash.com/photo-1757083840090-17a7bfca08c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    stats: { attack: 92, defense: 45, speed: 78 },
  },
  {
    id: 3,
    name: 'Crystal Land',
    type: 'Land',
    price: '5.0',
    rarity: 'Legendary',
    emoji: '🏰',
    image: 'https://images.unsplash.com/photo-1668182148176-71ee34380376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    stats: { attack: 0, defense: 100, speed: 0 },
  },
  {
    id: 4,
    name: 'Shadow Assassin',
    type: 'Character',
    price: '3.2',
    rarity: 'Epic',
    emoji: '🥷',
    image: 'https://images.unsplash.com/photo-1748349287155-1fe9b065a544?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    stats: { attack: 88, defense: 72, speed: 98 },
  },
  {
    id: 5,
    name: 'Phoenix Wings',
    type: 'Accessory',
    price: '1.2',
    rarity: 'Rare',
    emoji: '🦅',
    image: 'https://images.unsplash.com/photo-1524005552021-ae918bff36ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    stats: { attack: 65, defense: 70, speed: 95 },
  },
  {
    id: 6,
    name: 'Mystic Orb',
    type: 'Item',
    price: '0.8',
    rarity: 'Rare',
    emoji: '🔮',
    image: 'https://images.unsplash.com/photo-1624197486147-db677e74fcb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    stats: { attack: 75, defense: 80, speed: 60 },
  },
];

const rarityColors: Record<string, string> = {
  Legendary: 'from-yellow-500 to-orange-500',
  Epic: 'from-purple-500 to-pink-500',
  Rare: 'from-blue-500 to-cyan-500',
};

interface MarketplaceProps {
  onNFTClick?: (nftId: number) => void;
}

export function Marketplace({ onNFTClick }: MarketplaceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="marketplace" className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
            NFT Marketplace
          </h2>
          <p className="text-xl text-muted-foreground">
            Trade rare items, characters, and lands with true ownership
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredId(nft.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden group cursor-pointer h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <motion.div
                    className={`aspect-square bg-gradient-to-br ${rarityColors[nft.rarity]} p-1`}
                    animate={{
                      scale: hoveredId === nft.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full h-full bg-card flex items-center justify-center rounded-lg">
                      <motion.div
                        className="text-8xl"
                        animate={{
                          rotateY: hoveredId === nft.id ? 180 : 0,
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        {nft.emoji}
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <Badge className={`absolute top-4 right-4 bg-gradient-to-r ${rarityColors[nft.rarity]}`}>
                    {nft.rarity}
                  </Badge>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === nft.id ? 1 : 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      onClick={() => onNFTClick?.(nft.id)}
                      className="w-12 h-12 rounded-full bg-primary flex items-center justify-center cursor-pointer"
                    >
                      <Eye className="w-6 h-6 text-white" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      onClick={() => onNFTClick?.(nft.id)}
                      className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center cursor-pointer"
                    >
                      <ShoppingCart className="w-6 h-6 text-white" />
                    </motion.div>
                  </motion.div>
                </div>

                <CardContent className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="mb-1" style={{ fontWeight: 600 }}>{nft.name}</h3>
                      <p className="text-sm text-muted-foreground">{nft.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
                        {nft.price}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +12%
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">ATK</div>
                      <div className="text-sm" style={{ fontWeight: 600 }}>{nft.stats.attack}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">DEF</div>
                      <div className="text-sm" style={{ fontWeight: 600 }}>{nft.stats.defense}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground">SPD</div>
                      <div className="text-sm" style={{ fontWeight: 600 }}>{nft.stats.speed}</div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <motion.div
                    className="w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 group"
                      onClick={() => onNFTClick?.(nft.id)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                      Buy Now
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
