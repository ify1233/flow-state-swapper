
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Settings, Info } from "lucide-react";
import TokenSelector from "./TokenSelector";
import { useToast } from "@/hooks/use-toast";

const SwapCard = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromToken, setFromToken] = useState({ symbol: "ETH", name: "Ethereum", icon: "⟠" });
  const [toToken, setToToken] = useState({ symbol: "USDC", name: "USD Coin", icon: "💵" });
  const [slippage, setSlippage] = useState("0.5");
  const { toast } = useToast();

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSwap = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to swap",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Swap Initiated",
      description: `Swapping ${fromAmount} ${fromToken.symbol} for ${toAmount || "..."} ${toToken.symbol}`,
    });
  };

  const calculateToAmount = (amount: string) => {
    if (!amount) return "";
    // Mock exchange rate calculation
    const rate = fromToken.symbol === "ETH" ? 2500 : 0.0004;
    return (parseFloat(amount) * rate).toFixed(6);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateToAmount(value));
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Swap Tokens</h3>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Settings size={16} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* From Token */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>From</span>
            <span>Balance: 2.5482 {fromToken.symbol}</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 rounded-xl p-3">
            <TokenSelector 
              selectedToken={fromToken} 
              onTokenSelect={setFromToken}
            />
            <Input
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              placeholder="0.0"
              className="border-0 bg-transparent text-right text-xl font-semibold focus-visible:ring-0"
              type="number"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleSwapTokens}
            variant="ghost"
            size="sm"
            className="h-10 w-10 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            <ArrowUpDown size={16} className="text-blue-600" />
          </Button>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>To</span>
            <span>Balance: 1,250.00 {toToken.symbol}</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 rounded-xl p-3">
            <TokenSelector 
              selectedToken={toToken} 
              onTokenSelect={setToToken}
            />
            <Input
              value={toAmount}
              placeholder="0.0"
              className="border-0 bg-transparent text-right text-xl font-semibold focus-visible:ring-0"
              readOnly
            />
          </div>
        </div>

        {/* Swap Details */}
        {fromAmount && (
          <div className="bg-blue-50 rounded-xl p-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Rate</span>
              <span>1 {fromToken.symbol} = {calculateToAmount("1")} {toToken.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Slippage Tolerance</span>
              <span>{slippage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Network Fee</span>
              <span>~$2.50</span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <Button 
          onClick={handleSwap}
          className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
          disabled={!fromAmount || parseFloat(fromAmount) <= 0}
        >
          {!fromAmount ? "Enter an amount" : "Swap Tokens"}
        </Button>

        {/* Info */}
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
          <Info size={12} />
          <span>By trading you agree to FlowSwap's Terms of Service</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SwapCard;
