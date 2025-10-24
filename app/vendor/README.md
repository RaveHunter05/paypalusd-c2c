# Vendor Application Screens

## 📱 Overview

This directory contains the complete vendor point-of-sale (POS) application with 5 screens for accepting PYUSD payments.

---

## 🎯 Screens

### 1. Dashboard (`dashboard.tsx`)
**Route:** `/vendor/dashboard`

Main hub showing sales metrics and quick actions.

**Features:**
- Daily income display
- Monthly income display
- Transaction count
- New Payment button
- History button
- Withdraw button

**API Calls:**
- `GET /api/vendors/{address}/stats`

---

### 2. Generate Order (`generate-order.tsx`)
**Route:** `/vendor/generate-order`

Point-of-sale interface to create payment orders.

**Features:**
- Numeric keypad input
- Large amount display
- QR code generation
- Order creation

**API Calls:**
- `POST /api/orders`

**QR Format (Ethereum Payment URI - EIP-681):**
```
ethereum:0xVENDOR_ADDRESS@84532/transfer?
  address=0x036CbD53842c5426634e7929541eC2318f3dCF7e&
  uint256=100000000&
  data=0x6f726465725f69645f68657865636f646564
```

**Components:**
- `ethereum:` - Protocol
- `0xVENDOR_ADDRESS` - Recipient (vendor wallet)
- `@84532` - Chain ID (Base Sepolia)
- `/transfer` - Function
- `address=0x036Cb...` - PYUSD token address on Base Sepolia
- `uint256=100000000` - Amount in PYUSD wei (6 decimals)
- `data=0x...` - Order ID encoded as hex

---

### 3. Wait Payment (`wait-payment.tsx`)
**Route:** `/vendor/wait-payment`

Active monitoring screen while awaiting payment confirmation.

**Features:**
- Real-time polling (2s intervals)
- Animated loading indicator
- Order details display
- Auto-navigation on confirmation

**API Calls:**
- `GET /api/orders/{orderId}` (polling)

**Navigation:**
- Success → `/vendor/payment-success`
- Failed → `/vendor/dashboard`

---

### 4. Payment Success (`payment-success.tsx`)
**Route:** `/vendor/payment-success`

Confirmation screen for successful payments.

**Features:**
- Success animation
- Amount display
- Transaction hash
- Basescan link
- Quick actions

**External Links:**
- `https://sepolia.basescan.org/tx/{txHash}`

---

### 5. Sales History (`history.tsx`)
**Route:** `/vendor/history`

Transaction history with search and filters.

**Features:**
- Transaction list
- Search by Order ID/buyer
- Filter by status
- Pull-to-refresh

**API Calls:**
- `GET /api/vendors/{address}/transactions`

**Filters:**
- Status: All, Confirmed, Pending, Failed
- Search: Order ID or buyer name

---

## 🔄 Navigation Flow

```
Dashboard
  ↓
Generate Order
  ↓
Wait Payment
  ↓
Payment Success
  ↓
Back to Dashboard or Generate Order
```

---

## 🎨 UI Components Used

### Common Components
- `IconSymbol` - SF Symbols icons
- `TouchableOpacity` - Buttons
- `ScrollView` - Scrollable content
- `ActivityIndicator` - Loading states

### External Libraries
- `react-native-qrcode-svg` - QR code generation
- `expo-haptics` - Haptic feedback
- `expo-router` - Navigation

---

## 🔌 Dependencies

### Hooks
```typescript
import { useAccount } from 'wagmi';           // Wallet connection
import { useRouter } from 'expo-router';      // Navigation
import { useState, useEffect } from 'react';  // State management
```

### Services
```typescript
import { apiService } from '@/services/api';  // Backend API
```

### Types
```typescript
import type { Order, DashboardStats } from '@/services/api';
```

---

## 📝 State Management

Each screen manages its own local state using React hooks:

```typescript
const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);
const [error, setError] = useState(null);
```

---

## 🎯 Common Patterns

### Wallet Validation
```typescript
const { address, isConnected } = useAccount();

if (!isConnected) {
  return <WalletNotConnectedScreen />;
}
```

### API Error Handling
```typescript
try {
  const data = await apiService.method();
  setData(data);
} catch (error) {
  console.error('Error:', error);
  Alert.alert('Error', 'Operation failed');
}
```

### Navigation
```typescript
// Push to stack
router.push('/vendor/screen-name');

// Replace (no back)
router.replace('/vendor/screen-name');

// Go back
router.back();
```

---

## 🎨 Styling

All screens use Tailwind CSS via NativeWind:

```tsx
<View className="flex-1 bg-white dark:bg-gray-900">
  <Text className="text-2xl font-bold text-blue-600">
    Title
  </Text>
</View>
```

### Color Scheme
- **Primary:** Blue (#2563EB)
- **Success:** Green (#16A34A)
- **Warning:** Yellow (#EAB308)
- **Error:** Red (#EF4444)

---

## 📱 Responsive Design

All screens adapt to:
- ✅ Light/Dark mode
- ✅ Different screen sizes
- ✅ Portrait/Landscape
- ✅ Safe area insets

---

## 🔒 Security

### Input Validation
```typescript
// Amount validation
if (!amount || parseFloat(amount) <= 0) {
  Alert.alert('Error', 'Invalid amount');
  return;
}
```

### Authentication
```typescript
// Bearer token in API headers
const token = await AsyncStorage.getItem('vendor_token');
headers: { Authorization: `Bearer ${token}` }
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Dashboard loads stats
- [ ] Generate order creates QR
- [ ] Wait payment polls correctly
- [ ] Success screen shows details
- [ ] History filters work
- [ ] Dark mode works
- [ ] Pull-to-refresh works
- [ ] Navigation flow correct

### Test Data
Use mock backend responses for offline testing.

---

## 📚 Related Files

- **API Service:** `../../services/api.ts`
- **Types:** `../../types/vendor.ts`
- **Layout:** `./_layout.tsx`
- **Home Link:** `../(tabs)/index.tsx`

---

## 🚀 Quick Start

1. **Connect Wallet**
   ```typescript
   // User must connect via WalletConnect
   ```

2. **Navigate to Dashboard**
   ```typescript
   router.push('/vendor/dashboard');
   ```

3. **Create Order**
   ```typescript
   const order = await apiService.createOrder({
     vendor_address: address,
     amount: "100.00"
   });
   ```

4. **Monitor Payment**
   ```typescript
   apiService.subscribeToOrder(orderId, callback);
   ```

---

## 🔧 Customization

### Modify Colors
Edit Tailwind classes in each screen.

### Change Polling Interval
In `wait-payment.tsx`:
```typescript
const intervalId = setInterval(async () => {
  // Poll logic
}, 2000); // Change this value
```

### Add New Filters
In `history.tsx`, add to filter options.

---

## 📞 Support

See main documentation:
- `../../VENDOR_APP_GUIDE.md` - Complete guide
- `../../VENDOR_QUICKSTART.md` - Quick start
- `../../PHASE2_IMPLEMENTATION_SUMMARY.md` - Implementation details

---

**Status:** ✅ Production Ready
**Version:** 1.0.0
**Last Updated:** October 23, 2025
