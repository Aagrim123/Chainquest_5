import { motion } from 'motion/react';
import { Wallet, LogOut, Copy, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useWeb3 } from '../contexts/Web3Context';
import { toast } from 'sonner@2.0.3';

export function WalletButton() {
  const { account, isConnected, connectWallet, disconnectWallet, chainId } = useWeb3();
  const [copied, setCopied] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getChainName = (chainId: string | null): string => {
    if (!chainId) return 'Unknown';
    const chains: Record<string, string> = {
      '0x1': 'Ethereum',
      '0x89': 'Polygon',
      '0x38': 'BSC',
      '0xa86a': 'Avalanche',
      '0xa4b1': 'Arbitrum',
      '0xa': 'Optimism',
      '0xaa36a7': 'Sepolia',
    };
    return chains[chainId] || 'Unknown Network';
  };

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      toast.success('Address copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const viewOnExplorer = () => {
    if (account) {
      const explorerUrl = chainId === '0x1' 
        ? `https://etherscan.io/address/${account}`
        : `https://etherscan.io/address/${account}`;
      window.open(explorerUrl, '_blank');
    }
  };

  if (!isConnected) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={connectWallet}
          className="rounded-full gap-2 px-6 bg-white text-background hover:bg-white/90"
        >
          <Wallet className="w-4 h-4" />
          <span className="hidden sm:inline">Connect</span>
        </Button>
      </motion.div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="rounded-full gap-2 px-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white">
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">
              {account ? formatAddress(account) : 'Connected'}
            </span>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-64 bg-card/95 backdrop-blur-xl border border-primary/30 rounded-2xl p-2"
      >
        <DropdownMenuLabel className="text-muted-foreground text-xs">
          My Wallet
        </DropdownMenuLabel>
        
        <div className="px-2 py-3 mb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Network</span>
            <span className="text-sm bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {getChainName(chainId)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Address</span>
            <span className="text-sm font-mono">
              {account ? formatAddress(account) : ''}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-border/50" />

        <DropdownMenuItem 
          onClick={copyAddress}
          className="rounded-xl cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
        >
          {copied ? (
            <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 mr-2" />
          )}
          {copied ? 'Copied!' : 'Copy Address'}
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={viewOnExplorer}
          className="rounded-xl cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View on Explorer
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-border/50" />

        <DropdownMenuItem 
          onClick={disconnectWallet}
          className="rounded-xl cursor-pointer hover:bg-red-500/10 focus:bg-red-500/10 text-red-400"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}