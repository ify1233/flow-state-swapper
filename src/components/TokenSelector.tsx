
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChevronDown, Search } from "lucide-react";
import AddTokenDialog from "./AddTokenDialog";

interface Token {
  symbol: string;
  name: string;
  icon: string;
  address?: string;
  isCustom?: boolean;
}

interface TokenSelectorProps {
  selectedToken: Token;
  onTokenSelect: (token: Token) => void;
}

const defaultTokens: Token[] = [
  { symbol: "ETH", name: "Ethereum", icon: "⟠" },
  { symbol: "USDC", name: "USD Coin", icon: "💵" },
  { symbol: "USDT", name: "Tether", icon: "💰" },
  { symbol: "DAI", name: "Dai Stablecoin", icon: "🟡" },
  { symbol: "WBTC", name: "Wrapped Bitcoin", icon: "₿" },
  { symbol: "UNI", name: "Uniswap", icon: "🦄" },
  { symbol: "LINK", name: "Chainlink", icon: "🔗" },
  { symbol: "AAVE", name: "Aave", icon: "👻" },
];

const TokenSelector = ({ selectedToken, onTokenSelect }: TokenSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customTokens, setCustomTokens] = useState<Token[]>([]);

  const allTokens = [...defaultTokens, ...customTokens];

  const filteredTokens = allTokens.filter(
    token =>
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (token.address && token.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleTokenSelect = (token: Token) => {
    onTokenSelect(token);
    setOpen(false);
    setSearchTerm("");
  };

  const handleAddCustomToken = (token: Token) => {
    // Check if token already exists
    const exists = allTokens.some(
      existingToken => 
        existingToken.symbol.toLowerCase() === token.symbol.toLowerCase() ||
        (existingToken.address && token.address && existingToken.address.toLowerCase() === token.address.toLowerCase())
    );

    if (!exists) {
      setCustomTokens(prev => [...prev, token]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-auto p-2 gap-2 hover:bg-transparent text-white"
        >
          <span className="text-2xl">{selectedToken.icon}</span>
          <div className="text-left">
            <div className="font-semibold text-white">{selectedToken.symbol}</div>
            <div className="text-xs text-gray-400">{selectedToken.name}</div>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Select a Token</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search tokens or paste address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          
          <div className="max-h-60 overflow-y-auto space-y-1">
            {filteredTokens.map((token) => (
              <Button
                key={`${token.symbol}-${token.address || 'default'}`}
                variant="ghost"
                className="w-full justify-start h-auto p-3 hover:bg-gray-700 text-white"
                onClick={() => handleTokenSelect(token)}
              >
                <span className="text-2xl mr-3">{token.icon}</span>
                <div className="text-left flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{token.symbol}</span>
                    {token.isCustom && (
                      <span className="text-xs bg-blue-600/20 text-blue-400 px-1.5 py-0.5 rounded">
                        Custom
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">{token.name}</div>
                  {token.address && (
                    <div className="text-xs text-gray-500 font-mono">
                      {token.address.slice(0, 6)}...{token.address.slice(-4)}
                    </div>
                  )}
                </div>
              </Button>
            ))}
            
            {filteredTokens.length === 0 && searchTerm && (
              <div className="text-center py-4 text-gray-400">
                No tokens found
              </div>
            )}
          </div>
          
          <div className="border-t border-gray-700 pt-4">
            <AddTokenDialog onAddToken={handleAddCustomToken} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenSelector;
