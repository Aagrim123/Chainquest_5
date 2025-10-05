import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner@2.0.3';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

interface TelegramContextType {
  user: TelegramUser | null;
  isConnected: boolean;
  isTelegramAvailable: boolean;
  connectTelegram: () => void;
  disconnectTelegram: () => void;
  completeTelegramTask: (taskId: string) => Promise<boolean>;
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

// Mock Telegram WebApp interface for development
const mockTelegramWebApp = {
  initDataUnsafe: {
    user: null as any,
  },
  ready: () => {},
  expand: () => {},
  close: () => {},
  MainButton: {
    show: () => {},
    hide: () => {},
    setText: (text: string) => {},
    onClick: (callback: () => void) => {},
  },
};

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isTelegramAvailable, setIsTelegramAvailable] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Check if Telegram WebApp is available
    if (typeof window !== 'undefined') {
      // @ts-ignore
      const tg = window.Telegram?.WebApp || mockTelegramWebApp;
      
      // For development, we'll simulate Telegram availability
      setIsTelegramAvailable(true);

      // Try to get user data from Telegram WebApp
      if (tg.initDataUnsafe?.user) {
        const telegramUser: TelegramUser = {
          id: tg.initDataUnsafe.user.id,
          first_name: tg.initDataUnsafe.user.first_name,
          last_name: tg.initDataUnsafe.user.last_name,
          username: tg.initDataUnsafe.user.username,
          photo_url: tg.initDataUnsafe.user.photo_url,
          auth_date: Date.now(),
          hash: 'simulated_hash',
        };
        setUser(telegramUser);
      }

      // Initialize Telegram WebApp
      tg.ready();
      tg.expand();

      // Load completed tasks from localStorage
      const savedTasks = localStorage.getItem('telegram_completed_tasks');
      if (savedTasks) {
        setCompletedTasks(new Set(JSON.parse(savedTasks)));
      }
    }
  }, []);

  const connectTelegram = () => {
    // In a real implementation, this would:
    // 1. Open Telegram bot link
    // 2. User clicks "Start" in bot
    // 3. Bot sends user back to web app with auth data
    
    // For demo purposes, we'll simulate a connection
    const mockUser: TelegramUser = {
      id: Math.floor(Math.random() * 1000000),
      first_name: 'Demo',
      last_name: 'User',
      username: 'demo_user',
      auth_date: Date.now(),
      hash: 'mock_hash_' + Date.now(),
    };

    // Simulate opening Telegram bot
    const botUsername = 'YourGameBot'; // Replace with your actual bot username
    const botUrl = `https://t.me/${botUsername}?start=webapp`;
    
    toast.info('Opening Telegram...', {
      description: 'Click Start in the bot to connect',
      duration: 3000,
    });

    // For demo, we'll auto-connect after a short delay
    setTimeout(() => {
      setUser(mockUser);
      localStorage.setItem('telegram_user', JSON.stringify(mockUser));
      toast.success('Connected to Telegram!', {
        description: `Welcome, ${mockUser.first_name}!`,
      });
    }, 1500);

    // In production, open the bot:
    // window.open(botUrl, '_blank');
  };

  const disconnectTelegram = () => {
    setUser(null);
    setCompletedTasks(new Set());
    localStorage.removeItem('telegram_user');
    localStorage.removeItem('telegram_completed_tasks');
    toast.info('Disconnected from Telegram');
  };

  const completeTelegramTask = async (taskId: string): Promise<boolean> => {
    if (!user) {
      toast.error('Please connect Telegram first');
      return false;
    }

    // Simulate API call to verify task completion
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newCompleted = new Set(completedTasks);
    newCompleted.add(taskId);
    setCompletedTasks(newCompleted);
    
    // Save to localStorage
    localStorage.setItem('telegram_completed_tasks', JSON.stringify(Array.from(newCompleted)));

    return true;
  };

  return (
    <TelegramContext.Provider
      value={{
        user,
        isConnected: !!user,
        isTelegramAvailable,
        connectTelegram,
        disconnectTelegram,
        completeTelegramTask,
      }}
    >
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegram() {
  const context = useContext(TelegramContext);
  if (context === undefined) {
    throw new Error('useTelegram must be used within a TelegramProvider');
  }
  return context;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}