import { motion } from 'motion/react';
import { Send, LogOut, CheckCircle2, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useTelegram } from '../contexts/TelegramContext';
import { Badge } from './ui/badge';

export function TelegramButton() {
  const { user, isConnected, connectTelegram, disconnectTelegram } = useTelegram();

  if (!isConnected) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={connectTelegram}
          className="rounded-full gap-2 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 text-white"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Connect Telegram</span>
        </Button>
      </motion.div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="rounded-full gap-2 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 text-white">
            <CheckCircle2 className="w-4 h-4" />
            <span className="hidden sm:inline">
              @{user?.username || user?.first_name || 'Connected'}
            </span>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-64 bg-card/95 backdrop-blur-xl border border-primary/30 rounded-2xl p-2"
      >
        <DropdownMenuLabel className="text-muted-foreground text-xs">
          Telegram Account
        </DropdownMenuLabel>
        
        <div className="px-2 py-3 mb-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white">
                {user?.first_name?.[0] || 'T'}
              </span>
            </div>
            <div>
              <div className="mb-1">
                {user?.first_name} {user?.last_name}
              </div>
              {user?.username && (
                <div className="text-xs text-muted-foreground">
                  @{user.username}
                </div>
              )}
            </div>
          </div>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        </div>

        <DropdownMenuSeparator className="bg-border/50" />

        <DropdownMenuItem 
          onClick={() => window.open('https://t.me/YourGameBot', '_blank')}
          className="rounded-xl cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Open Bot
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-border/50" />

        <DropdownMenuItem 
          onClick={disconnectTelegram}
          className="rounded-xl cursor-pointer hover:bg-red-500/10 focus:bg-red-500/10 text-red-400"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}