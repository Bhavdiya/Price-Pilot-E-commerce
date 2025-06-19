
import { Product, PricingFactors } from '../types';

export class DynamicPricingEngine {
  private static instance: DynamicPricingEngine;
  
  static getInstance(): DynamicPricingEngine {
    if (!DynamicPricingEngine.instance) {
      DynamicPricingEngine.instance = new DynamicPricingEngine();
    }
    return DynamicPricingEngine.instance;
  }

  calculateDynamicPrice(product: Product, factors: PricingFactors): number {
    let priceMultiplier = 1;
    
    // Stock-based pricing (scarcity premium)
    if (product.stock < 10) {
      priceMultiplier += 0.15; // 15% increase for low stock
    } else if (product.stock < 5) {
      priceMultiplier += 0.25; // 25% increase for very low stock
    }
    
    // Demand-based pricing
    const demandMultiplier = Math.min(factors.demandLevel / 100, 0.3);
    priceMultiplier += demandMultiplier;
    
    // Time-based pricing (peak hours)
    const hour = new Date().getHours();
    if (hour >= 18 && hour <= 21) { // Peak shopping hours
      priceMultiplier += 0.05;
    }
    
    // User behavior scoring
    if (factors.userBehavior > 0.8) {
      priceMultiplier += 0.1; // Premium for high-value users
    }
    
    // Apply limits to prevent extreme pricing
    priceMultiplier = Math.max(0.7, Math.min(1.5, priceMultiplier));
    
    return Math.round(product.basePrice * priceMultiplier * 100) / 100;
  }

  getPriceChangeReason(oldPrice: number, newPrice: number, factors: PricingFactors): string {
    if (newPrice > oldPrice) {
      if (factors.stockLevel < 10) return "High demand, limited stock";
      if (factors.demandLevel > 50) return "Increased demand";
      return "Market adjustment";
    } else if (newPrice < oldPrice) {
      return "Stock replenished";
    }
    return "Price stable";
  }

  simulateDemand(product: Product): number {
    // Simple demand simulation based on various factors
    const baselineViews = 50;
    const randomFactor = Math.random() * 0.5;
    const stockFactor = product.stock < 20 ? 1.5 : 1;
    const priceFactor = product.currentPrice < product.basePrice ? 1.3 : 0.8;
    
    return Math.round(baselineViews * stockFactor * priceFactor * (1 + randomFactor));
  }
}
