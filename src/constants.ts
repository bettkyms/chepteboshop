import { Product } from './types';

export const PRODUCTS: Product[] = [
  // Value-Added Shop
  { id: 'dm-50g', name: 'Dried Mangoes (50g)', category: 'shop', description: 'No added sugar, KEBS certified.', price: 60, unit: 'pack', image: 'https://lh3.googleusercontent.com/d/10bSHlsYDLjECxMIq87N24drVh95on9t_' },
  { id: 'dm-100g', name: 'Dried Mangoes (100g)', category: 'shop', description: 'No added sugar, KEBS certified.', price: 120, unit: 'pack', image: 'https://lh3.googleusercontent.com/d/10bSHlsYDLjECxMIq87N24drVh95on9t_' },
  { id: 'dm-1kg', name: 'Dried Mangoes (1kg)', category: 'shop', description: 'No added sugar, KEBS certified.', price: 1000, unit: 'pack', image: 'https://lh3.googleusercontent.com/d/10bSHlsYDLjECxMIq87N24drVh95on9t_' },
  { id: 'mj-500ml', name: 'Mango Juice (500ml)', category: 'shop', description: 'Freshly squeezed.', price: 150, unit: 'bottle', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=800' },
  { id: 'mj-1l', name: 'Mango Juice (1L)', category: 'shop', description: 'Freshly squeezed.', price: 280, unit: 'bottle', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=800' },
  { id: 'mj-5l', name: 'Mango Juice (5L)', category: 'shop', description: 'Freshly squeezed.', price: 1200, unit: 'jerrycan', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=800' },
  { id: 'h-300g', name: 'Refined Honey (300g)', category: 'shop', description: 'Pure and refined.', price: 250, unit: 'jar', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800' },
  { id: 'h-500g', name: 'Refined Honey (500g)', category: 'shop', description: 'Pure and refined.', price: 450, unit: 'jar', image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800' },
  { id: 'h-1kg', name: 'Refined Honey (1kg)', category: 'shop', description: 'Pure and refined.', price: 850, unit: 'jar', image: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&q=80&w=800' },
  
  // Tree Nursery
  { id: 'gm-apple', name: 'Grafted Mango (Apple)', category: 'nursery', description: 'High yield, sweet.', price: 200, unit: 'seedling', image: 'https://lh3.googleusercontent.com/d/1W0oZPvMEcE7VM_PYBcH2nfQ0VKV2fF1h' },
  { id: 'gm-kent', name: 'Grafted Mango (Kent)', category: 'nursery', description: 'Large, fiberless.', price: 200, unit: 'seedling', image: 'https://lh3.googleusercontent.com/d/1W0oZPvMEcE7VM_PYBcH2nfQ0VKV2fF1h' },
  { id: 'gm-tommy', name: 'Grafted Mango (Tommy Atkins)', category: 'nursery', description: 'Disease resistant.', price: 200, unit: 'seedling', image: 'https://lh3.googleusercontent.com/d/1W0oZPvMEcE7VM_PYBcH2nfQ0VKV2fF1h' },
  { id: 'c-pixie', name: 'Pixie Orange', category: 'nursery', description: 'High yield, dry area recommended.', price: 250, unit: 'seedling', image: 'https://lh3.googleusercontent.com/d/19Ygb48RJspV1VikwweLzhKVpPFZoOOry' },
  { id: 'c-navel', name: 'Washington Navel', category: 'nursery', description: 'Seedless, juicy.', price: 250, unit: 'seedling', image: 'https://lh3.googleusercontent.com/d/19Ygb48RJspV1VikwweLzhKVpPFZoOOry' },
  { id: 'c-lemon', name: 'Lemon', category: 'nursery', description: 'Prolific bearer.', price: 200, unit: 'seedling', image: 'https://lh3.googleusercontent.com/d/19Ygb48RJspV1VikwweLzhKVpPFZoOOry' },
  { id: 'a-hass', name: 'Avocado (Hass)', category: 'nursery', description: 'Export grade.', price: 180, unit: 'seedling', image: 'https://lh3.googleusercontent.com/d/1NUTLI-3hYjiUD1QztadbUK9hMfiWeChZ' },
  { id: 'a-fuerte', name: 'Avocado (Fuerte)', category: 'nursery', description: 'Creamy texture.', price: 180, unit: 'seedling', image: 'https://lh3.googleusercontent.com/d/1NUTLI-3hYjiUD1QztadbUK9hMfiWeChZ' },
  { id: 't-bamboo', name: 'Bamboo', category: 'nursery', description: 'Fast growing.', price: 100, unit: 'seedling', image: 'https://lh3.googleusercontent.com/d/1RTH2e9RIysUvs_tdEnXvL7TrMfN0Yllq' },
  { id: 't-moringa', name: 'Moringa', category: 'nursery', description: 'Nutritious leaves.', price: 80, unit: 'seedling', image: 'https://lh3.googleusercontent.com/d/1RTH2e9RIysUvs_tdEnXvL7TrMfN0Yllq' },
  { id: 't-grevillea', name: 'Grevillea', category: 'nursery', description: 'Timber tree.', price: 60, unit: 'seedling', image: 'https://lh3.googleusercontent.com/d/1RTH2e9RIysUvs_tdEnXvL7TrMfN0Yllq' },

  // Livestock
  { id: 'ch-day', name: 'Improved Kienyeji Chicks (Day-old)', category: 'livestock', description: 'Vaccinated.', price: 100, unit: 'chick', image: 'https://lh3.googleusercontent.com/d/1ncQbJ-VMy-lNfYq1KqopBWRw7sBoFBvA' },
  { id: 'ch-1m', name: 'Improved Kienyeji Chicks (1-Month)', category: 'livestock', description: 'Hardy.', price: 250, unit: 'chick', image: 'https://lh3.googleusercontent.com/d/1ncQbJ-VMy-lNfYq1KqopBWRw7sBoFBvA' },
  { id: 'm-cow', name: 'Fresh Cow Milk', category: 'livestock', description: 'Pasteurized.', price: 60, unit: 'L' },
  { id: 'm-goat', name: 'Fresh Goat Milk', category: 'livestock', description: 'Highly nutritious.', price: 100, unit: 'L' },
  { id: 'b-goat', name: 'Galla Goat (Breeding)', category: 'livestock', description: 'Superior breeding stock, high yield.', price: 0, unit: 'inquiry', image: 'https://lh3.googleusercontent.com/d/1iOgcRs30LqphqfBxAiYzBzIB8JEqLaCP' },
  { id: 'b-heifer', name: 'Dairy Heifer (Breeding)', category: 'livestock', description: 'High-yielding dairy breed.', price: 0, unit: 'inquiry', image: 'https://lh3.googleusercontent.com/d/1dALbHyiuS53DhZu-g1AQVwsg9PQf7ts1' },

  // Hospitality
  { id: 'acc-sc-single', name: 'Standard Self-Contained (Single)', category: 'hospitality', description: 'En-suite single room with hot water shower.', price: 1500, unit: 'night', image: 'https://lh3.googleusercontent.com/d/1gGW4WiXTzBDnUhcwnhZJcBvScemIxsMj' },
  { id: 'acc-sc-double', name: 'Standard Self-Contained (Double)', category: 'hospitality', description: 'En-suite double room with hot water shower.', price: 2500, unit: 'night', image: 'https://lh3.googleusercontent.com/d/1gGW4WiXTzBDnUhcwnhZJcBvScemIxsMj' },
  { id: 'acc-sc-family', name: 'Standard Self-Contained (Family/Couple)', category: 'hospitality', description: 'En-suite family/couple room with hot water shower.', price: 2000, unit: 'night', image: 'https://lh3.googleusercontent.com/d/1gGW4WiXTzBDnUhcwnhZJcBvScemIxsMj' },
  { id: 'acc-nsc-single', name: 'Standard Non-Self-Contained (Single)', category: 'hospitality', description: 'Clean single room with shared facilities.', price: 600, unit: 'night' },
  { id: 'acc-nsc-double', name: 'Standard Non-Self-Contained (Double)', category: 'hospitality', description: 'Clean double room with shared facilities.', price: 1200, unit: 'night' },
  { id: 'acc-cottage', name: 'Luxury Cottage', category: 'hospitality', description: 'Premium self-contained units with scenic Kerio Valley views.', price: 3500, unit: 'night', image: 'https://lh3.googleusercontent.com/d/1gGW4WiXTzBDnUhcwnhZJcBvScemIxsMj' },
  { id: 'acc-hall-large', name: 'Conference Hall Hire — Large Hall', category: 'hospitality', description: 'Spacious hall for large gatherings and events.', price: 3000, unit: 'day' },
  { id: 'acc-hall-small', name: 'Conference Hall Hire — Small Hall', category: 'hospitality', description: 'Ideal for small meetings and workshops.', price: 2000, unit: 'day' },
  { id: 'conf-full-day', name: 'Full Day Conference Package', category: 'hospitality', description: 'Per person — conference hall facilities & all meals.', price: 2000, unit: 'person' },
  { id: 'conf-half-day', name: 'Half Day Conference Package', category: 'hospitality', description: 'Per person — conference hall facilities & meals.', price: 1500, unit: 'person' },
  { id: 'conf-fb', name: 'Full Board Conference Package', category: 'hospitality', description: 'Per person — conference hall, all meals & accommodation.', price: 4500, unit: 'person' },
  { id: 'conf-hb', name: 'Half Board Conference Package', category: 'hospitality', description: 'Per person — conference hall, meals & accommodation.', price: 2700, unit: 'person' },
  { id: 'conf-bb', name: 'Conference Bed and Breakfast', category: 'hospitality', description: 'Per person.', price: 2200, unit: 'person' },
];
