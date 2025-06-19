
import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality noise-canceling wireless headphones with premium sound',
    basePrice: 299.99,
    currentPrice: 299.99,
    stock: 15,
    category: 'Electronics',
    image: '/placeholder.svg',
    demand: 45,
    priceHistory: [
      { timestamp: Date.now() - 86400000, price: 299.99, reason: 'Initial price' }
    ],
    tags: ['wireless', 'premium', 'audio']
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitoring and GPS',
    basePrice: 199.99,
    currentPrice: 199.99,
    stock: 8,
    category: 'Fitness',
    image: '/placeholder.svg',
    demand: 78,
    priceHistory: [
      { timestamp: Date.now() - 86400000, price: 199.99, reason: 'Initial price' }
    ],
    tags: ['fitness', 'smart', 'health']
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    description: 'Professional ergonomic chair with lumbar support and adjustable height',
    basePrice: 449.99,
    currentPrice: 449.99,
    stock: 25,
    category: 'Furniture',
    image: '/placeholder.svg',
    demand: 32,
    priceHistory: [
      { timestamp: Date.now() - 86400000, price: 449.99, reason: 'Initial price' }
    ],
    tags: ['office', 'ergonomic', 'furniture']
  },
  {
    id: '4',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact waterproof speaker with 12-hour battery life',
    basePrice: 79.99,
    currentPrice: 79.99,
    stock: 3,
    category: 'Electronics',
    image: '/placeholder.svg',
    demand: 92,
    priceHistory: [
      { timestamp: Date.now() - 86400000, price: 79.99, reason: 'Initial price' }
    ],
    tags: ['portable', 'waterproof', 'audio']
  },
  {
    id: '5',
    name: 'Premium Coffee Maker',
    description: 'Programmable coffee maker with built-in grinder and thermal carafe',
    basePrice: 189.99,
    currentPrice: 189.99,
    stock: 12,
    category: 'Kitchen',
    image: '/placeholder.svg',
    demand: 56,
    priceHistory: [
      { timestamp: Date.now() - 86400000, price: 189.99, reason: 'Initial price' }
    ],
    tags: ['coffee', 'kitchen', 'appliance']
  },
  {
    id: '6',
    name: 'Gaming Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with tactile switches',
    basePrice: 129.99,
    currentPrice: 129.99,
    stock: 20,
    category: 'Gaming',
    image: '/placeholder.svg',
    demand: 67,
    priceHistory: [
      { timestamp: Date.now() - 86400000, price: 129.99, reason: 'Initial price' }
    ],
    tags: ['gaming', 'mechanical', 'rgb']
  }
];
