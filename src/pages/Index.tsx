
import SwapInterface from "@/components/SwapInterface";
import { Button } from "@/components/ui/button";
import { Wallet, Droplets } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    // Mock wallet connection
    setIsWalletConnected(!isWalletConnected);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
          {/* FlowSwap Logo */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
            <div className="text-white font-bold text-xl">FS</div>
          </div>
          <h1 className="text-2xl font-bold text-white">FlowSwap</h1>
        </div>
        
        {/* Connect Wallet Button */}
        <Button 
          onClick={handleConnectWallet}
          className={`flex items-center gap-2 ${
            isWalletConnected 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <Wallet size={16} />
          {isWalletConnected ? 'Connected' : 'Connect Wallet'}
        </Button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          {/* Link to Faucet Page - above the main heading */}
          <div className="mb-6">
            <Link to="/faucet">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 bg-purple-600/20 border-purple-500 text-purple-300 hover:bg-purple-600 hover:text-white transition-colors"
              >
                <Droplets className="h-4 w-4" />
                Get Test Tokens from Faucet
              </Button>
            </Link>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-2">Trade with Zero Slippage</h2>
          <p className="text-lg text-gray-300">Swap tokens and provide liquidity on the Flow blockchain</p>
        </div>
        <SwapInterface />
      </div>
    </div>
  );
};

export default Index;
