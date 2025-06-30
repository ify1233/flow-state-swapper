
import FaucetCard from "@/components/FaucetCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Faucet = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    // Mock wallet connection
    setIsWalletConnected(!isWalletConnected);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              <ArrowLeft size={20} />
              Back to Swap
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            {/* FlowSwap Logo */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
              <div className="text-white font-bold text-xl">FS</div>
            </div>
            <h1 className="text-2xl font-bold text-white">FlowSwap Faucet</h1>
          </div>
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
          <h2 className="text-4xl font-bold text-white mb-2">Test Token Faucet</h2>
          <p className="text-lg text-gray-300">Get free test tokens for swapping and providing liquidity</p>
        </div>
        
        <div className="max-w-md mx-auto">
          <FaucetCard />
        </div>
      </div>
    </div>
  );
};

export default Faucet;
