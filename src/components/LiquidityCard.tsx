
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Minus } from "lucide-react";
import TokenSelector from "./TokenSelector";
import { useToast } from "@/hooks/use-toast";

const LiquidityCard = () => {
  const [tokenA, setTokenA] = useState({ symbol: "ETH", name: "Ethereum", icon: "⟠" });
  const [tokenB, setTokenB] = useState({ symbol: "USDC", name: "USD Coin", icon: "💵" });
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const { toast } = useToast();

  const handleAmountAChange = (value: string) => {
    setAmountA(value);
    // Mock ratio calculation
    if (value) {
      const ratio = 2500; // ETH to USDC ratio
      setAmountB((parseFloat(value) * ratio).toFixed(2));
    } else {
      setAmountB("");
    }
  };

  const handleAddLiquidity = () => {
    if (!amountA || !amountB) {
      toast({
        title: "Invalid Amounts",
        description: "Please enter valid amounts for both tokens",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Liquidity Added",
      description: `Added ${amountA} ${tokenA.symbol} and ${amountB} ${tokenB.symbol} to pool`,
    });
  };

  const handleRemoveLiquidity = () => {
    toast({
      title: "Liquidity Removed",
      description: "Successfully removed liquidity from pool",
    });
  };

  return (
    <Card className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <h3 className="text-lg font-semibold text-white">Liquidity Pools</h3>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="add" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-700/50 border border-gray-600">
            <TabsTrigger value="add" className="flex items-center gap-2 text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-600">
              <Plus size={14} />
              Add
            </TabsTrigger>
            <TabsTrigger value="remove" className="flex items-center gap-2 text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-600">
              <Minus size={14} />
              Remove
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add" className="space-y-4">
            {/* Token A Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Token A</span>
                <span>Balance: 2.5482 {tokenA.symbol}</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-700/50 rounded-xl p-3 border border-gray-600">
                <TokenSelector 
                  selectedToken={tokenA} 
                  onTokenSelect={setTokenA}
                />
                <Input
                  value={amountA}
                  onChange={(e) => handleAmountAChange(e.target.value)}
                  placeholder="0.0"
                  className="border-0 bg-transparent text-right text-xl font-semibold focus-visible:ring-0 text-white"
                  type="number"
                />
              </div>
            </div>

            {/* Plus Icon */}
            <div className="flex justify-center">
              <div className="h-8 w-8 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center">
                <Plus size={16} className="text-gray-400" />
              </div>
            </div>

            {/* Token B Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Token B</span>
                <span>Balance: 1,250.00 {tokenB.symbol}</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-700/50 rounded-xl p-3 border border-gray-600">
                <TokenSelector 
                  selectedToken={tokenB} 
                  onTokenSelect={setTokenB}
                />
                <Input
                  value={amountB}
                  placeholder="0.0"
                  className="border-0 bg-transparent text-right text-xl font-semibold focus-visible:ring-0 text-white"
                  readOnly
                />
              </div>
            </div>

            {/* Pool Info */}
            {amountA && amountB && (
              <div className="bg-green-900/30 rounded-xl p-3 space-y-2 text-sm border border-green-800/30">
                <div className="flex justify-between">
                  <span className="text-gray-400">Pool Share</span>
                  <span className="text-white">0.01%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">LP Tokens</span>
                  <span className="text-white">0.0158 ETH-USDC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Pool Ratio</span>
                  <span className="text-white">1 ETH = 2500 USDC</span>
                </div>
              </div>
            )}

            <Button 
              onClick={handleAddLiquidity}
              className="w-full h-12 text-lg font-semibold bg-green-600 hover:bg-green-700 transition-colors"
              disabled={!amountA || !amountB}
            >
              Add Liquidity
            </Button>
          </TabsContent>

          <TabsContent value="remove" className="space-y-4">
            <div className="text-center py-8">
              <div className="bg-gray-700/30 rounded-xl p-6 mb-4 border border-gray-600">
                <h4 className="font-semibold mb-2 text-white">Your Liquidity Positions</h4>
                <div className="space-y-3">
                  <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span>⟠💵</span>
                      <span className="font-medium text-white">ETH-USDC</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white">$1,247.82</div>
                      <div className="text-sm text-gray-400">0.0158 LP</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleRemoveLiquidity}
                variant="outline"
                className="w-full h-12 text-lg font-semibold border-red-500/50 text-red-400 hover:bg-red-900/20 hover:border-red-400"
              >
                Remove Liquidity
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LiquidityCard;
