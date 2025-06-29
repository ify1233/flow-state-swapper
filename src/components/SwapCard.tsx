
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Settings, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import TokenSelector from "./TokenSelector";
import { useToast } from "@/hooks/use-toast";

const SwapCard = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromToken, setFromToken] = useState({ symbol: "ETH", name: "Ethereum", icon: "⟠" });
  const [toToken, setToToken] = useState({ symbol: "USDC", name: "USD Coin", icon: "💵" });
  const [slippage, setSlippage] = useState("0.5");
  const [customSlippage, setCustomSlippage] = useState("");
  const [slippageDialogOpen, setSlippageDialogOpen] = useState(false);
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

  const handleSlippageChange = (value: string) => {
    if (value === "custom") {
      setSlippage(customSlippage || "1.0");
    } else {
      setSlippage(value);
      setCustomSlippage("");
    }
  };

  const handleCustomSlippageChange = (value: string) => {
    setCustomSlippage(value);
    setSlippage(value);
  };

  const presetSlippages = ["0.1", "0.5", "1.0"];

  return (
    <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Swap Tokens</h3>
          <Dialog open={slippageDialogOpen} onOpenChange={setSlippageDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700">
                <Settings size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle>Slippage Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-300 mb-3 block">
                    Slippage Tolerance
                  </Label>
                  <RadioGroup
                    value={presetSlippages.includes(slippage) ? slippage : "custom"}
                    onValueChange={handleSlippageChange}
                    className="space-y-2"
                  >
                    {presetSlippages.map((preset) => (
                      <div key={preset} className="flex items-center space-x-2">
                        <RadioGroupItem value={preset} id={`slippage-${preset}`} />
                        <Label htmlFor={`slippage-${preset}`} className="text-white cursor-pointer">
                          {preset}%
                        </Label>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="slippage-custom" />
                      <Label htmlFor="slippage-custom" className="text-white cursor-pointer">
                        Custom
                      </Label>
                      <Input
                        value={customSlippage}
                        onChange={(e) => handleCustomSlippageChange(e.target.value)}
                        placeholder="1.0"
                        className="w-20 bg-gray-700 border-gray-600 text-white text-sm"
                        type="number"
                        step="0.1"
                        min="0"
                        max="50"
                      />
                      <span className="text-gray-300 text-sm">%</span>
                    </div>
                  </RadioGroup>
                </div>
                <div className="text-xs text-gray-400 bg-gray-700/50 p-3 rounded-lg">
                  <p>Slippage tolerance is the maximum amount of price movement you're willing to accept for your trade.</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* From Token */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>From</span>
            <span>Balance: 2.5482 {fromToken.symbol}</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-700/50 rounded-xl p-3 border border-gray-600">
            <TokenSelector 
              selectedToken={fromToken} 
              onTokenSelect={setFromToken}
            />
            <Input
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              placeholder="0.0"
              className="border-0 bg-transparent text-right text-xl font-semibold focus-visible:ring-0 text-white"
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
            className="h-10 w-10 rounded-full bg-blue-600/20 hover:bg-blue-600/30 transition-colors border border-blue-500/30"
          >
            <ArrowUpDown size={16} className="text-blue-400" />
          </Button>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>To</span>
            <span>Balance: 1,250.00 {toToken.symbol}</span>
          </div>
          <div className="flex items-center space-x-2 bg-gray-700/50 rounded-xl p-3 border border-gray-600">
            <TokenSelector 
              selectedToken={toToken} 
              onTokenSelect={setToToken}
            />
            <Input
              value={toAmount}
              placeholder="0.0"
              className="border-0 bg-transparent text-right text-xl font-semibold focus-visible:ring-0 text-white"
              readOnly
            />
          </div>
        </div>

        {/* Swap Details */}
        {fromAmount && (
          <div className="bg-blue-900/30 rounded-xl p-3 space-y-2 text-sm border border-blue-800/30">
            <div className="flex justify-between">
              <span className="text-gray-400">Rate</span>
              <span className="text-white">1 {fromToken.symbol} = {calculateToAmount("1")} {toToken.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Slippage Tolerance</span>
              <span className="text-white">{slippage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Network Fee</span>
              <span className="text-white">~$2.50</span>
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
        <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-700/30 rounded-lg p-2 border border-gray-600/30">
          <Info size={12} />
          <span>By trading you agree to FlowSwap's Terms of Service</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SwapCard;
