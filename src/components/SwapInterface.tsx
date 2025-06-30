
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import SwapCard from "./SwapCard";
import LiquidityCard from "./LiquidityCard";

const SwapInterface = () => {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <Tabs defaultValue="swap" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 border border-gray-700">
          <TabsTrigger 
            value="swap" 
            className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
          >
            Swap
          </TabsTrigger>
          <TabsTrigger 
            value="liquidity" 
            className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
          >
            Liquidity
          </TabsTrigger>
        </TabsList>
        <TabsContent value="swap" className="mt-6">
          <SwapCard />
        </TabsContent>
        <TabsContent value="liquidity" className="mt-6">
          <LiquidityCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SwapInterface;
