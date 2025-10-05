# Telegram Bot Integration Guide

## Overview
This application now includes full Telegram bot integration for the airdrop system, allowing users to complete social tasks and earn rewards through Telegram.

## Features

### ✅ Core Functionality
- **Connect/Disconnect Telegram**: Link Telegram account to the platform
- **User Profile Display**: Shows Telegram username and profile info
- **Task System**: Complete various Telegram tasks to earn rewards
- **Progress Tracking**: Track completed tasks and earned rewards
- **Exclusive Airdrops**: Special airdrops only available for Telegram users
- **Real-time Verification**: Task completion verification system

### 🎯 Telegram Tasks Available
1. **Join Telegram Channel** (+50 GAME)
2. **Join Community Group** (+50 GAME)
3. **Share with Friends** (+100 GAME)
4. **Daily Check-in** (+150 GAME for 7 consecutive days)
5. **Rate the Bot** (+75 GAME)

### 🎁 Telegram Exclusive Airdrop
- **Reward**: 425 GAME tokens
- **Requirements**:
  - Connect Telegram account
  - Complete at least 3 Telegram tasks
  - Connect wallet
- **Status**: Active

## Implementation Details

### File Structure
```
/contexts/TelegramContext.tsx     - Telegram provider and state management
/components/TelegramButton.tsx    - UI component for Telegram connection
/pages/AirdropPage.tsx            - Enhanced with Telegram tasks
/App.tsx                          - Wrapped with TelegramProvider
```

### Components Created

#### 1. TelegramContext (`/contexts/TelegramContext.tsx`)
Manages Telegram authentication and task completion:
- User authentication state
- Task completion tracking
- localStorage persistence
- Mock data for development

#### 2. TelegramButton (`/components/TelegramButton.tsx`)
Beautiful dropdown button showing:
- Connection status
- User profile (name, username)
- Verification badge
- Quick access to bot
- Disconnect option

#### 3. Enhanced AirdropPage (`/pages/AirdropPage.tsx`)
Complete redesign with:
- Dual-tab interface (Airdrops + Telegram Tasks)
- Telegram-exclusive airdrop campaign
- Real-time progress tracking
- Dynamic requirement checking
- Visual task completion indicators

## Usage

### For Users

#### Step 1: Connect Telegram
1. Click the blue "Connect Telegram" button in the top navigation bar
2. Or click the banner on the Airdrop page
3. The bot will open (simulated in demo mode)
4. Click "Start" in the bot
5. Your account will be automatically connected

#### Step 2: Complete Tasks
1. Navigate to the "Airdrop" page
2. Click the "Telegram Tasks" tab
3. Complete tasks one by one:
   - Join Channel/Group tasks: Opens Telegram link
   - Share tasks: Opens share dialog
   - Check-in tasks: Click to verify
   - Rating tasks: Opens rating page
4. Each task rewards GAME tokens instantly upon completion

#### Step 3: Claim Exclusive Airdrop
1. Complete at least 3 Telegram tasks
2. Ensure wallet is connected
3. Check "Telegram Exclusive" airdrop progress
4. Click "Claim Rewards" when all requirements are met

### For Developers

#### Setting Up Your Bot

1. **Create a Telegram Bot**
   - Message [@BotFather](https://t.me/BotFather) on Telegram
   - Send `/newbot` and follow instructions
   - Save your bot token

2. **Configure Bot Settings**
   ```javascript
   // In TelegramContext.tsx, update:
   const botUsername = 'YourGameBot'; // Your bot username
   ```

3. **Set Up Web App**
   - In BotFather, send `/newapp`
   - Provide your web app URL
   - Set short name and description

4. **Enable Telegram WebApp**
   ```html
   <!-- Add to your index.html -->
   <script src="https://telegram.org/js/telegram-web-app.js"></script>
   ```

#### Using the Context

```tsx
import { useTelegram } from './contexts/TelegramContext';

function MyComponent() {
  const {
    user,                    // Telegram user object
    isConnected,             // Connection status
    isTelegramAvailable,     // Check if Telegram WebApp is available
    connectTelegram,         // Function to connect
    disconnectTelegram,      // Function to disconnect
    completeTelegramTask,    // Function to complete task
  } = useTelegram();

  return (
    <div>
      {isConnected ? (
        <p>Welcome, {user?.first_name}!</p>
      ) : (
        <button onClick={connectTelegram}>Connect</button>
      )}
    </div>
  );
}
```

#### Task Verification Flow

```tsx
// Complete a task
const handleTask = async (taskId: string) => {
  const success = await completeTelegramTask(taskId);
  
  if (success) {
    // Task completed successfully
    // Update UI, add rewards, etc.
  }
};
```

## Backend Integration (Future Enhancement)

For production, you'll need a backend to:

### 1. Telegram Bot Setup
```javascript
// Example using node-telegram-bot-api
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  // Generate auth link
  const authLink = `${WEB_APP_URL}?telegram_user_id=${userId}`;
  
  bot.sendMessage(chatId, 'Welcome! Click below to open the app:', {
    reply_markup: {
      inline_keyboard: [[
        { text: '🎮 Open Game', web_app: { url: authLink } }
      ]]
    }
  });
});
```

### 2. Verification Endpoints

```typescript
// API endpoints needed:

// POST /api/telegram/auth
// Verify Telegram auth data
app.post('/api/telegram/auth', async (req, res) => {
  const { id, first_name, username, auth_date, hash } = req.body;
  
  // Verify hash using your bot token
  if (verifyTelegramAuth(req.body, BOT_TOKEN)) {
    // Create or update user in database
    const user = await createOrUpdateUser({ id, first_name, username });
    res.json({ success: true, user });
  } else {
    res.status(401).json({ error: 'Invalid auth data' });
  }
});

// POST /api/telegram/tasks/verify
// Verify task completion
app.post('/api/telegram/tasks/verify', async (req, res) => {
  const { userId, taskId } = req.body;
  
  switch (taskId) {
    case 'join_channel':
      // Check if user is member of channel
      const isMember = await bot.getChatMember(CHANNEL_ID, userId);
      return res.json({ verified: isMember.status !== 'left' });
      
    case 'join_group':
      // Check group membership
      const isGroupMember = await bot.getChatMember(GROUP_ID, userId);
      return res.json({ verified: isGroupMember.status !== 'left' });
      
    // Add other task verifications
  }
});

// POST /api/telegram/rewards/claim
// Claim rewards
app.post('/api/telegram/rewards/claim', async (req, res) => {
  const { userId, airdropId } = req.body;
  
  // Verify requirements
  const requirements = await verifyAirdropRequirements(userId, airdropId);
  
  if (requirements.allMet) {
    // Send tokens to wallet
    await distributeRewards(userId, airdropId);
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Requirements not met', requirements });
  }
});
```

### 3. Verification Helper

```javascript
// Verify Telegram auth data
function verifyTelegramAuth(authData, botToken) {
  const crypto = require('crypto');
  
  const { hash, ...data } = authData;
  const dataCheckString = Object.keys(data)
    .sort()
    .map(k => `${k}=${data[k]}`)
    .join('\n');
    
  const secretKey = crypto
    .createHash('sha256')
    .update(botToken)
    .digest();
    
  const hmac = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');
    
  return hmac === hash;
}
```

## Configuration

### Update Bot Links
In the following files, replace placeholder links with your actual bot:

1. **TelegramContext.tsx**
   ```tsx
   const botUsername = 'YourGameBot'; // Replace
   ```

2. **TelegramButton.tsx**
   ```tsx
   onClick={() => window.open('https://t.me/YourGameBot', '_blank')}
   ```

3. **AirdropPage.tsx** (telegramTasks array)
   ```tsx
   link: 'https://t.me/YourGameChannel',    // Replace
   link: 'https://t.me/YourGameGroup',      // Replace
   ```

## Testing

### Demo Mode (Current Implementation)
The current implementation uses mock data for testing:
- Simulated Telegram connection (1.5 second delay)
- Mock user data generated
- Task completion simulated
- All stored in localStorage

### Testing Checklist
- [ ] Connect Telegram button works
- [ ] User profile displays correctly
- [ ] Tasks can be completed
- [ ] Progress tracked correctly
- [ ] Exclusive airdrop requirements update
- [ ] Points accumulate properly
- [ ] Disconnect works and clears data
- [ ] Data persists on page reload

### Production Testing
1. Deploy bot to Telegram
2. Set up webhook or polling
3. Test real auth flow
4. Verify channel/group membership checks
5. Test reward distribution
6. Monitor error handling

## Security Considerations

1. **Auth Verification**: Always verify Telegram auth data on backend
2. **Task Verification**: Check memberships server-side
3. **Rate Limiting**: Prevent task spam
4. **Reward Distribution**: Use secure smart contract calls
5. **Data Privacy**: Don't store sensitive user data
6. **HTTPS Only**: Telegram WebApp requires HTTPS

## Roadmap

### Phase 1: Current ✅
- Basic Telegram integration
- Mock task system
- UI components
- Local storage

### Phase 2: Backend (Next)
- Real Telegram bot
- Server-side verification
- Database integration
- Webhook setup

### Phase 3: Advanced
- Referral system
- Daily streaks
- Leaderboards
- Push notifications
- Mini-games in bot

## Support

### Common Issues

**Q: Telegram button doesn't appear**
A: Check that TelegramProvider wraps your app in App.tsx

**Q: Tasks don't complete**
A: In demo mode, there's a 2-second delay. In production, check backend logs.

**Q: Connection doesn't persist**
A: Data is stored in localStorage. Check browser settings.

**Q: Exclusive airdrop not claimable**
A: Ensure all three requirements are met: Telegram connected, 3+ tasks completed, wallet connected.

## Resources

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram WebApps](https://core.telegram.org/bots/webapps)
- [BotFather Guide](https://core.telegram.org/bots#botfather)
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)

---

**Note**: This is a client-side demo implementation. For production, implement proper backend verification and security measures.