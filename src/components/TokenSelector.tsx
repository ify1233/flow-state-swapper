
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChevronDown, Search } from "lucide-react";

interface Token {
  symbol: string;
  name: string;
  icon: string;
}

interface TokenSelectorProps {
  selectedToken: Token;
  onTokenSelect: (token: Token) => void;
}

const tokens: Token[] = [
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

  const filteredTokens = tokens.filter(
    token =>
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTokenSelect = (token: Token) => {
    onTokenSelect(token);
    setOpen(false);
    setSearchTerm("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-auto p-2 gap-2 hover:bg-transparent"
        >
          <span className="text-2xl">{selectedToken.icon}</span>
          <div className="text-left">
            <div className="font-semibold text-gray-900">{selectedToken.symbol}</div>
            <div className="text-xs text-gray-500">{selectedToken.name}</div>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select a Token</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search tokens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="max-h-60 overflow-y-auto space-y-1">
            {filteredTokens.map((token) => (
              <Button
                key={token.symbol}
                variant="ghost"
                className="w-full justify-start h-auto p-3 hover:bg-gray-50"
                onClick={() => handleTokenSelect(token)}
              >
                <span className="text-2xl mr-3">{token.icon}</span>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{token.symbol}</div>
                  <div className="text-sm text-gray-500">{token.name}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenSelector;
