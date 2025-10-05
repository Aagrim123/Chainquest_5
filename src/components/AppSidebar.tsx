import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  ShoppingBag,
  Compass,
  CreditCard,
  TrendingUp,
  Droplets,
  Link2,
  Coins,
  Gem,
  Gift,
  Trophy,
  Briefcase,
  MoreHorizontal,
  LogOut,
  Gamepad2,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: 'Explore', path: '/', icon: Compass },
  { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Chess Game', path: '/chess', icon: Gamepad2 },
  { name: 'Lending', path: '/lending', icon: CreditCard },
  { name: 'Leverage', path: '/leverage', icon: TrendingUp },
  { name: 'Liquidity', path: '/liquidity', icon: Droplets },
  { name: 'Bridge', path: '/bridge', icon: Link2 },
  { name: 'Stake', path: '/stake', icon: Coins },
  { name: 'NFT Farming', path: '/farming', icon: Gem },
  { name: 'Airdrop', path: '/airdrop', icon: Gift },
  { name: 'Competition', path: '/competition', icon: Trophy },
  { name: 'Portfolio', path: '/portfolio', icon: Briefcase },
  { name: 'About', path: '/about', icon: MoreHorizontal },
  { name: 'Contact', path: '/contact', icon: MoreHorizontal },
];

export function AppSidebar() {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border backdrop-blur-xl z-50 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Gem className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h2 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ChainQuest
            </h2>
            <p className="text-xs text-muted-foreground">Blockchain Gaming</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.div
                  className={`
                    relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent'
                    }
                  `}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-r-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : ''}`} />
                  <span className="flex-1">{item.name}</span>
                  
                  {(hoveredItem === item.name || isActive) && (
                    <motion.div
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <motion.button
          onClick={() => {}}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </motion.button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5);
        }
      `}</style>
    </motion.aside>
  );
}
