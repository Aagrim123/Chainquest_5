import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner@2.0.3';

interface Web3ContextType {
  account: string | null;
  isConnected: boolean;
  chainId: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isMetaMaskInstalled: boolean;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      setIsMetaMaskInstalled(true);

      // Check if already connected
      checkIfWalletIsConnected();

      // Listen for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged);

      // Listen for chain changes
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        const chain = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(chain);
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      toast.success('Wallet connected successfully!');
    } else {
      setAccount(null);
      toast.info('Wallet disconnected');
    }
  };

  const handleChainChanged = (chainId: string) => {
    setChainId(chainId);
    // Reload the page as recommended by MetaMask
    window.location.reload();
  };

  const connectWallet = async () => {
    if (!isMetaMaskInstalled) {
      toast.error('MetaMask is not installed!', {
        description: 'Please install MetaMask to connect your wallet.',
        action: {
          label: 'Install',
          onClick: () => window.open('https://metamask.io/download/', '_blank'),
        },
      });
      return;
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        const chain = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(chain);
        
        // Get chain name
        const chainName = getChainName(chain);
        
        toast.success('Wallet connected!', {
          description: `Connected to ${chainName}`,
        });
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      
      if (error.code === 4001) {
        toast.error('Connection rejected', {
          description: 'You rejected the connection request.',
        });
      } else {
        toast.error('Failed to connect wallet', {
          description: 'Please try again.',
        });
      }
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
    toast.info('Wallet disconnected');
  };

  const getChainName = (chainId: string): string => {
    const chains: Record<string, string> = {
      '0x1': 'Ethereum Mainnet',
      '0x89': 'Polygon',
      '0x38': 'BSC',
      '0xa86a': 'Avalanche',
      '0xa4b1': 'Arbitrum',
      '0xa': 'Optimism',
      '0xaa36a7': 'Sepolia Testnet',
      '0x13881': 'Mumbai Testnet',
    };
    return chains[chainId] || 'Unknown Network';
  };

  return (
    <Web3Context.Provider
      value={{
        account,
        isConnected: !!account,
        chainId,
        connectWallet,
        disconnectWallet,
        isMetaMaskInstalled,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}