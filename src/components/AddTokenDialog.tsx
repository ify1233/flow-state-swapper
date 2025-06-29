
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Token {
  symbol: string;
  name: string;
  icon: string;
  address?: string;
  isCustom?: boolean;
}

interface AddTokenDialogProps {
  onAddToken: (token: Token) => void;
}

const AddTokenDialog = ({ onAddToken }: AddTokenDialogProps) => {
  const [open, setOpen] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddToken = async () => {
    if (!tokenAddress || !tokenSymbol || !tokenName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all token details",
        variant: "destructive",
      });
      return;
    }

    // Basic address validation (simplified)
    if (!tokenAddress.startsWith("0x") || tokenAddress.length !== 42) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid token contract address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real implementation, you would fetch token details from the blockchain
      // For now, we'll create a custom token with the provided details
      const customToken: Token = {
        symbol: tokenSymbol.toUpperCase(),
        name: tokenName,
        icon: "🪙", // Default icon for custom tokens
        address: tokenAddress,
        isCustom: true,
      };

      onAddToken(customToken);
      
      toast({
        title: "Token Added",
        description: `${tokenSymbol.toUpperCase()} has been added to your token list`,
      });

      // Reset form
      setTokenAddress("");
      setTokenSymbol("");
      setTokenName("");
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add token. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start h-auto p-3 hover:bg-gray-700 text-gray-400 border border-gray-600 border-dashed"
        >
          <Plus size={16} className="mr-3" />
          <span>Add Custom Token</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Add Custom Token</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="token-address" className="text-gray-300">
              Token Contract Address
            </Label>
            <Input
              id="token-address"
              placeholder="0x..."
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="token-symbol" className="text-gray-300">
              Token Symbol
            </Label>
            <Input
              id="token-symbol"
              placeholder="e.g., FLOW"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="token-name" className="text-gray-300">
              Token Name
            </Label>
            <Input
              id="token-name"
              placeholder="e.g., Flow Token"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={handleAddToken}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Token"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTokenDialog;
