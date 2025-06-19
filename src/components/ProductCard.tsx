
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, TrendingUp, TrendingDown, Package } from 'lucide-react';
import { Product } from '../types';
import { DynamicPricingEngine } from '../services/pricingEngine';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onProductView }) => {
  const [currentProduct, setCurrentProduct] = useState(product);
  const [priceChange, setPriceChange] = useState<'up' | 'down' | 'stable'>('stable');
  const pricingEngine = DynamicPricingEngine.getInstance();

  useEffect(() => {
    const interval = setInterval(() => {
      const factors = {
        stockLevel: currentProduct.stock,
        demandLevel: pricingEngine.simulateDemand(currentProduct),
        userBehavior: 0.5,
        timeOfDay: new Date().getHours(),
        seasonality: 1
      };

      const newPrice = pricingEngine.calculateDynamicPrice(currentProduct, factors);
      const oldPrice = currentProduct.currentPrice;

      if (Math.abs(newPrice - oldPrice) > 0.01) {
        setPriceChange(newPrice > oldPrice ? 'up' : 'down');
        
        setCurrentProduct(prev => ({
          ...prev,
          currentPrice: newPrice,
          demand: factors.demandLevel,
          priceHistory: [
            ...prev.priceHistory,
            {
              timestamp: Date.now(),
              price: newPrice,
              reason: pricingEngine.getPriceChangeReason(oldPrice, newPrice, factors)
            }
          ]
        }));

        setTimeout(() => setPriceChange('stable'), 2000);
      }
    }, 10000 + Math.random() * 20000); // Random interval between 10-30 seconds

    return () => clearInterval(interval);
  }, [currentProduct, pricingEngine]);

  const handleProductClick = () => {
    onProductView(currentProduct);
  };

  const getStockStatus = (stock: number) => {
    if (stock <= 5) return { label: 'Limited Stock', color: 'destructive' as const };
    if (stock <= 15) return { label: 'Low Stock', color: 'default' as const };
    return { label: 'In Stock', color: 'secondary' as const };
  };

  const stockStatus = getStockStatus(currentProduct.stock);
  const priceIncrease = currentProduct.currentPrice > currentProduct.basePrice;
  const priceDifference = Math.abs(currentProduct.currentPrice - currentProduct.basePrice);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <CardContent className="p-6" onClick={handleProductClick}>
        <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          <Package className="w-16 h-16 text-gray-400" />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
            {currentProduct.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{currentProduct.description}</p>
          
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={stockStatus.color}>{stockStatus.label}</Badge>
            <Badge variant="outline">{currentProduct.stock} left</Badge>
            <Badge variant="secondary">{currentProduct.demand} views</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold transition-colors duration-500 ${
                  priceChange === 'up' ? 'text-red-600' : 
                  priceChange === 'down' ? 'text-green-600' : 
                  'text-gray-900'
                }`}>
                  ${currentProduct.currentPrice.toFixed(2)}
                </span>
                {priceChange === 'up' && <TrendingUp className="w-4 h-4 text-red-500" />}
                {priceChange === 'down' && <TrendingDown className="w-4 h-4 text-green-500" />}
              </div>
              
              {priceDifference > 0.01 && (
                <div className="text-sm">
                  {priceIncrease ? (
                    <span className="text-red-600">+${priceDifference.toFixed(2)} from base</span>
                  ) : (
                    <span className="text-green-600">-${priceDifference.toFixed(2)} from base</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(currentProduct);
          }}
          className="w-full"
          disabled={currentProduct.stock === 0}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {currentProduct.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
