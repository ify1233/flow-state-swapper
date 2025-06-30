
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplets, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FaucetCard = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedToken, setSelectedToken] = useState("ETH");
  const [isRequesting, setIsRequesting] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState("");
  const { toast } = useToast();

  const testTokens = [
    { symbol: "ETH", name: "Test Ethereum", amount: "0.1" },
    { symbol: "USDC", name: "Test USD Coin", amount: "100" },
    { symbol: "FLOW", name: "Flow Token", amount: "10" },
    { symbol: "WBTC", name: "Test Wrapped Bitcoin", amount: "0.001" }
  ];

  const testAddresses = {
    ETH: "0x1234567890abcdef1234567890abcdef12345678",
    USDC: "0xabcdef1234567890abcdef1234567890abcdef12",
    FLOW: "0x567890abcdef1234567890abcdef1234567890ab",
    WBTC: "0xcdef1234567890abcdef1234567890abcdef1234"
  };

  const handleRequestTokens = async () => {
    if (!walletAddress) {
      toast({
        title: "Wallet Required",
        description: "Please enter your wallet address to receive test tokens",
        variant: "destructive",
      });
      return;
    }

    setIsRequesting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsRequesting(false);
      toast({
        title: "Tokens Sent!",
        description: `${testTokens.find(t => t.symbol === selectedToken)?.amount} ${selectedToken} sent to your wallet`,
      });
    }, 2000);
  };

  const copyToClipboard = async (address: string, token: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(token);
      setTimeout(() => setCopiedAddress(""), 2000);
      toast({
        title: "Address Copied",
        description: `${token} contract address copied to clipboard`,
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600/20 p-2 rounded-lg">
            <Droplets className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Test Token Faucet</h3>
            <p className="text-sm text-gray-400">Get free test tokens for swapping and liquidity</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Wallet Address Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Your Wallet Address</label>
          <Input
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="0x..."
            className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
          />
        </div>

        {/* Token Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300">Select Token</label>
          <div className="grid grid-cols-2 gap-2">
            {testTokens.map((token) => (
              <Button
                key={token.symbol}
                variant={selectedToken === token.symbol ? "default" : "outline"}
                onClick={() => setSelectedToken(token.symbol)}
                className={`h-auto p-3 ${
                  selectedToken === token.symbol
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-700/50 hover:bg-gray-700 text-gray-300 border-gray-600"
                }`}
              >
                <div className="text-left">
                  <div className="font-semibold">{token.symbol}</div>
                  <div className="text-xs opacity-80">{token.amount} tokens</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Request Button */}
        <Button
          onClick={handleRequestTokens}
          disabled={isRequesting || !walletAddress}
          className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isRequesting ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Sending...
            </div>
          ) : (
            `Request ${selectedToken} Tokens`
          )}
        </Button>

        {/* Contract Addresses */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300">Test Token Contract Addresses</h4>
          <div className="space-y-2">
            {testTokens.map((token) => (
              <div key={token.symbol} className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3">
                <div>
                  <div className="font-medium text-white">{token.symbol}</div>
                  <div className="text-xs text-gray-400 font-mono">
                    {testAddresses[token.symbol as keyof typeof testAddresses]}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(testAddresses[token.symbol as keyof typeof testAddresses], token.symbol)}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-600"
                >
                  {copiedAddress === token.symbol ? (
                    <Check size={14} className="text-green-400" />
                  ) : (
                    <Copy size={14} />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-900/30 rounded-lg p-3 border border-blue-800/30">
          <p className="text-xs text-blue-200">
            💡 <strong>Note:</strong> These are test tokens for development purposes only. 
            You can request tokens once every 24 hours per address.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FaucetCard;
