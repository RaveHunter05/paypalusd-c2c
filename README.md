# PYUSD C2C Payments 💸💸💸

Payments between clients, using PYUSD (stable coin from paypal)

## Instructions

(Use Node version: 20.19.2)

1. Download or clone the repo
2. Install npm packages

`npm install`

3. Run the command:

`npx expo start --tunnel`




# Sepolia Network Configuration

## 🔄 **Cambio de Red: Base Sepolia → Ethereum Sepolia**

---

## 📋 **Configuración Actual**

### **Red:**
- **Network:** Ethereum Sepolia
- **Chain ID:** 11155111 (0xaa36a7)
- **Explorer:** https://sepolia.etherscan.io/
- **RPC:** https://rpc.sepolia.org

### **Token Configurado:**
- **Address:** `0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9`
- **Token:** PYUSDC
- **Decimals:** 6
- **Symbol:** PYUSDC

---


## 📱 **Configurar MetaMask en Sepolia**

### **1. Cambiar Red:**
- Abre MetaMask
- Selecciona "Sepolia test network"
- Si no aparece, añádela manualmente

### **2. Añadir Token Personalizado:**
```
Token Contract Address: 0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9
Token Symbol: PYUSDC
Token Decimals: 6
```

### **3. Obtener Tokens:**
- Busca faucet del token específico
- O usa Uniswap/Aave en Sepolia para intercambiar

---

## 🎯 **Deep Link de MetaMask**

### **Formato Actual:**
```
https://metamask.app.link/send/
  0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9  // Token address
  @11155111                                     // Sepolia Chain ID
  /transfer?
  address=0xVENDOR_ADDRESS&                    // Destinatario
  uint256=100000000                            // Monto (100.00 con 6 decimales)
```

### **Ejemplo Completo:**
```
https://metamask.app.link/send/0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9@11155111/transfer?address=0xABC123...&uint256=100000000
```

---

## 🔧 **Troubleshooting**

### **❌ MetaMask no abre la pantalla de envío:**
- **Causa:** Token address incorrecto o MetaMask no reconoce el formato
- **Solución:** Verifica que el token existe en Sepolia

### **❌ "Insufficient funds":**
- **Causa:** No tienes el token en tu wallet
- **Solución:** Obtén tokens de prueba del faucet

### **❌ "Wrong network":**
- **Causa:** MetaMask está en otra red
- **Solución:** Cambia a Sepolia en MetaMask

---

## 📚 **Recursos Sepolia**

### **Documentación:**
- https://ethereum.org/en/developers/docs/networks/#sepolia
- https://sepolia.dev/

### **Exploradores:**
- https://sepolia.etherscan.io/
- https://sepolia.otterscan.io/

### **Faucets:**
- https://sepoliafaucet.com/
- https://www.alchemy.com/faucets/ethereum-sepolia

### **RPC Endpoints:**
```
https://rpc.sepolia.org
https://sepolia.infura.io/v3/YOUR_KEY
https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
```
