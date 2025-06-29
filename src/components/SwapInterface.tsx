
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SwapCard from "./SwapCard";
import LiquidityCard from "./LiquidityCard";
import { ArrowLeftRight, Droplets } from "lucide-react";

const SwapInterface = () => {
  return (
    <div className="max-w-md mx-auto">
      <Tabs defaultValue="swap" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-800/80 backdrop-blur-sm border border-gray-700">
          <TabsTrigger 
            value="swap" 
            className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
          >
            <ArrowLeftRight size={16} />
            Swap
          </TabsTrigger>
          <TabsTrigger 
            value="liquidity" 
            className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
          >
            <Droplets size={16} />
            Liquidity
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="swap">
          <SwapCard />
        </TabsContent>
        
        <TabsContent value="liquidity">
          <LiquidityCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SwapInterface;
