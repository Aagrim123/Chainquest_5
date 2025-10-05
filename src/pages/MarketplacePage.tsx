import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, TrendingUp, Zap } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { nfts } from '../components/Marketplace';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export function MarketplacePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [sortBy, setSortBy] = useState('trending');

  const handleNFTClick = (nftId: number) => {
    navigate(`/nft/${nftId}`);
  };

  const filteredNFTs = nfts.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRarity = selectedRarity === 'all' || nft.rarity.toLowerCase() === selectedRarity;
    return matchesSearch && matchesRarity;
  });

  return (
    <div className="min-h-screen pt-6 pb-16">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            NFT Marketplace
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover, collect, and trade unique NFTs. Each asset is verified on-chain with provable scarcity and true digital ownership.
          </p>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search NFTs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 border-primary/20 focus:border-primary/50 rounded-full"
                />
              </div>

              {/* Rarity Filter */}
              <Tabs value={selectedRarity} onValueChange={setSelectedRarity} className="w-full lg:w-auto">
                <TabsList className="grid grid-cols-4 bg-background/50 backdrop-blur-sm">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="legendary">Legendary</TabsTrigger>
                  <TabsTrigger value="epic">Epic</TabsTrigger>
                  <TabsTrigger value="rare">Rare</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-[180px] bg-background/50 border-primary/20 rounded-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Trending
                    </div>
                  </SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { label: 'Total Volume', value: '$2.4M', icon: TrendingUp },
            { label: 'Floor Price', value: '0.5 ETH', icon: Zap },
            { label: 'Items Listed', value: filteredNFTs.length, icon: SlidersHorizontal },
          ].map((stat, index) => (
            <Card
              key={stat.label}
              className="p-4 bg-card/50 backdrop-blur-lg border border-primary/30 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <div className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        {/* NFT Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filteredNFTs.length === 0 ? (
            <Card className="p-12 text-center bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl">
              <p className="text-muted-foreground">No NFTs found matching your filters.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredNFTs.map((nft, index) => (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index % 8) }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => handleNFTClick(nft.id)}
                  className="cursor-pointer"
                >
                  <Card className="overflow-hidden bg-card/50 backdrop-blur-lg border border-primary/30 rounded-3xl group hover:border-primary/60 transition-all">
                    <div className="relative overflow-hidden">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Badge className={`absolute top-3 right-3 ${
                        nft.rarity === 'Legendary' ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                        nft.rarity === 'Epic' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                        'bg-gradient-to-r from-blue-500 to-cyan-500'
                      }`}>
                        {nft.rarity}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="mb-2 truncate">{nft.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Price</span>
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {nft.price} ETH
                        </span>
                      </div>
                      <Button
                        className="w-full mt-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNFTClick(nft.id);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
