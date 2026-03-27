/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { 
  ShoppingBag, 
  Sprout, 
  Bird, 
  Hotel, 
  MessageSquare, 
  ShoppingCart, 
  ChevronRight, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  Info,
  Phone,
  CreditCard,
  MapPin,
  ExternalLink,
  Calendar,
  LayoutDashboard,
  Sun,
  Moon,
  Utensils,
  Monitor,
  Star,
  Bed
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PRODUCTS } from './constants';
import { Product, OrderItem, Booking } from './types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Tab = 'home' | 'shop' | 'nursery' | 'livestock' | 'hospitality' | 'cart' | 'advice';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [roomCategory, setRoomCategory] = useState<'sc' | 'nsc'>('sc');
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [deliveryPreference, setDeliveryPreference] = useState<'pickup' | 'delivery'>('pickup');
  const [booking, setBooking] = useState<Booking>({ type: '', date: '', guests: 1, days: 1, needs: '' });
  const [showPayment, setShowPayment] = useState(false);
  const bookingRef = useRef<HTMLDivElement>(null);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const renderHome = () => (
    <div className="space-y-12">
      <section className="text-center space-y-4 py-12 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black tracking-widest uppercase mb-4"
        >
          Celebrating 40+ Years of Impact
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif font-bold text-cheptebo-green tracking-tight leading-tight"
        >
          Karibuni Cheptebo
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-emerald-700 max-w-3xl mx-auto leading-relaxed"
        >
          Empowering the Kerio Valley through sustainable agriculture, 
          innovation, and holistic community development since 1984.
        </motion.p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { id: 'shop', icon: ShoppingBag, label: 'Value-Added Shop', color: 'bg-orange-50 text-orange-700 border-orange-200', desc: 'Dried fruits, honey & juices' },
          { id: 'nursery', icon: Sprout, label: 'Tree Nursery', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', desc: 'KEPHIS certified seedlings' },
          { id: 'livestock', icon: Bird, label: 'Livestock & Poultry', color: 'bg-amber-50 text-amber-700 border-amber-200', desc: 'Improved breeds & fresh milk' },
          { id: 'hospitality', icon: Hotel, label: 'Hospitality', color: 'bg-blue-50 text-blue-700 border-blue-200', desc: 'Cottages & conference halls' },
        ].map((dept) => (
          <motion.button
            key={dept.id}
            whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(dept.id as Tab)}
            className={cn(
              "flex flex-col items-start p-8 rounded-3xl border-2 transition-all shadow-sm text-left group",
              dept.color
            )}
          >
            <dept.icon className="w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
            <span className="font-black text-xl mb-2">{dept.label}</span>
            <span className="text-sm opacity-80">{dept.desc}</span>
          </motion.button>
        ))}
      </div>

      {/* Impact & Mission Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] border border-emerald-100 shadow-sm space-y-6">
          <h2 className="text-3xl font-serif font-bold text-cheptebo-green">Our Mission</h2>
          <p className="text-emerald-800 text-lg leading-relaxed">
            To demonstrate and promote sustainable agricultural practices that transform lives, 
            ensuring food security and economic independence for the people of Kerio Valley.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="space-y-1">
              <span className="text-4xl font-serif font-bold text-cheptebo-green">350+</span>
              <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Farmers Supported</p>
            </div>
            <div className="space-y-1">
              <span className="text-4xl font-serif font-bold text-cheptebo-green">40yr</span>
              <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Legacy of Impact</p>
            </div>
          </div>
        </div>

        <div className="bg-cheptebo-green text-white p-10 rounded-3xl shadow-xl overflow-hidden relative flex flex-col justify-center">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-serif font-bold flex items-center gap-3">
              <Info className="w-8 h-8 text-cheptebo-gold" />
              Expert Advice
            </h2>
            <p className="text-emerald-50 text-lg">
              Not sure what to plant? Our experts recommend the best varieties for your specific climate and soil type.
            </p>
            <button 
              onClick={() => setActiveTab('advice')}
              className="bg-white text-cheptebo-green px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all flex items-center gap-2 w-fit shadow-lg"
            >
              Get Agricultural Advice <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-cheptebo-dark/50 rounded-full -mr-40 -mt-40 blur-3xl opacity-50" />
        </div>
      </section>

      {/* Media & Stories Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-serif font-bold text-cheptebo-green">Featured Breeding Animals</h2>
          <button onClick={() => setActiveTab('livestock')} className="text-cheptebo-green font-bold flex items-center gap-2 hover:underline">
            View All Livestock <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 flex flex-col sm:flex-row items-center gap-6 group cursor-pointer overflow-hidden" onClick={() => setActiveTab('livestock')}>
            <div className="w-32 h-32 bg-emerald-100 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
              <img 
                src="https://lh3.googleusercontent.com/d/1iOgcRs30LqphqfBxAiYzBzIB8JEqLaCP" 
                alt="Galla Goat" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-cheptebo-green">Galla Goats</h3>
              <p className="text-emerald-600">Superior breeding stock for dry areas. High meat and milk yield.</p>
            </div>
          </div>
          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 flex flex-col sm:flex-row items-center gap-6 group cursor-pointer overflow-hidden" onClick={() => setActiveTab('livestock')}>
            <div className="w-32 h-32 bg-emerald-100 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
              <img 
                src="https://lh3.googleusercontent.com/d/1dALbHyiuS53DhZu-g1AQVwsg9PQf7ts1" 
                alt="Dairy Heifer" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-cheptebo-green">Dairy Heifers</h3>
              <p className="text-emerald-600">High-yielding dairy breeds, acclimatized for the Kerio Valley.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Facilities Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-serif font-bold text-cheptebo-green">Featured Facilities</h2>
          <button onClick={() => setActiveTab('hospitality')} className="text-cheptebo-green font-bold flex items-center gap-2 hover:underline">
            View All Facilities <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 flex flex-col items-center text-center gap-6 group cursor-pointer overflow-hidden" onClick={() => setActiveTab('hospitality')}>
            <div className="w-full h-48 bg-emerald-100 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
              <img 
                src="https://lh3.googleusercontent.com/d/1qt66ZuZcRpR6_XESD5hNcweIlZh6-mKF" 
                alt="Conference Hall" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-cheptebo-green">Conference Halls</h3>
              <p className="text-emerald-600 text-sm">Modern facilities for training, workshops, and community events. Up to 200 pax.</p>
            </div>
          </div>

          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 flex flex-col items-center text-center gap-6 group cursor-pointer overflow-hidden" onClick={() => setActiveTab('hospitality')}>
            <div className="w-full h-48 bg-emerald-100 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
              <div className="w-full h-full bg-emerald-200 flex items-center justify-center">
                <MapPin className="w-16 h-16 text-cheptebo-green" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-cheptebo-green">Luxury Cottages</h3>
              <p className="text-emerald-600 text-sm">Premium self-contained units with scenic views of the Kerio Valley.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Media & Stories Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-serif font-bold text-cheptebo-green">The Cheptebo Story</h2>
          <button className="text-cheptebo-green font-bold flex items-center gap-2 hover:underline">
            View All Media <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Making a Difference', desc: 'The history and vision of Cheptebo RDC.', tag: 'Documentary' },
            { title: 'Tissue Culture Bananas', desc: 'Innovation in banana production.', tag: 'Innovation' },
            { title: 'Demonstration Farm', desc: 'A tour of our training facilities.', tag: 'Training' },
          ].map((story, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-video bg-emerald-100 rounded-3xl mb-4 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center bg-cheptebo-dark/20 group-hover:bg-cheptebo-dark/40 transition-all">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-cheptebo-green border-b-[8px] border-b-transparent ml-1" />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-cheptebo-green rounded-full">
                    {story.tag}
                  </span>
                </div>
              </div>
              <h3 className="font-serif font-bold text-cheptebo-green group-hover:text-cheptebo-dark transition-colors">{story.title}</h3>
              <p className="text-sm text-emerald-700">{story.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="bg-emerald-50 p-10 rounded-3xl border border-emerald-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-cheptebo-green">Visit Us</h2>
            <p className="text-emerald-600 text-lg">
              We are located in the scenic Kerio Valley, providing a peaceful environment for learning, growth, and relaxation.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                  <MapPin className="w-6 h-6 text-cheptebo-green" />
                </div>
                <div>
                  <p className="font-bold text-cheptebo-green uppercase tracking-widest text-xs mb-1">Our Address</p>
                  <p className="text-cheptebo-green font-bold">A.I.C Cheptebo Rural Development Centre</p>
                  <p className="text-emerald-600">P.O. Box 614-30700</p>
                  <p className="text-emerald-600">ITEN, Kenya</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                  <Phone className="w-6 h-6 text-cheptebo-green" />
                </div>
                <div>
                  <p className="font-bold text-cheptebo-green uppercase tracking-widest text-xs mb-1">Call Us</p>
                  <p className="text-cheptebo-green font-bold">+254 722 296370</p>
                  <p className="text-emerald-600 text-sm">Available Mon - Sat, 8am - 5pm</p>
                </div>
              </div>
            </div>
          </div>
          <div className="aspect-video bg-emerald-200 rounded-[2rem] overflow-hidden shadow-inner relative group">
            <img 
              src="https://lh3.googleusercontent.com/d/1qt66ZuZcRpR6_XESD5hNcweIlZh6-mKF" 
              alt="Cheptebo Location" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-cheptebo-dark/10 group-hover:bg-transparent transition-colors" />
          </div>
        </div>
      </section>
    </div>
  );

  const renderProductList = (category: Product['category']) => {
    const filtered = PRODUCTS.filter(p => p.category === category);
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-2 text-cheptebo-green hover:text-cheptebo-dark font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <h2 className="text-2xl font-serif font-bold capitalize text-cheptebo-green">{category} Department</h2>
        </div>
        {category === 'shop' && (
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center gap-3 text-emerald-800 text-sm">
            <Info className="w-5 h-5 text-cheptebo-green shrink-0" />
            <p>Looking for chicks, milk, or breeding animals? Visit our <button onClick={() => setActiveTab('livestock')} className="font-bold underline">Livestock & Poultry</button> section.</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <motion.div 
              layout
              key={product.id}
              className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden"
            >
              {product.image && (
                <div className="aspect-video bg-emerald-50 rounded-xl mb-4 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-serif font-bold text-cheptebo-green">{product.name}</h3>
                <p className="text-emerald-700 text-sm">{product.description}</p>
                <p className="text-xl font-bold text-cheptebo-green">Ksh {product.price.toLocaleString()}</p>
              </div>
              <button 
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-cheptebo-green text-white py-3 rounded-xl font-bold hover:bg-cheptebo-dark transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add to Order
              </button>
            </motion.div>
          ))}
        </div>

        {category === 'shop' && (
          <div className="mt-16 space-y-12">
            {/* Related Mango Products */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-emerald-100 pb-4">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-cheptebo-green">Related Mango Products</h3>
                  <p className="text-emerald-600 text-sm">Explore more from our mango orchards</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS.filter(p => p.id.startsWith('dm-') || p.id.startsWith('gm-')).slice(0, 4).map(product => (
                  <div key={product.id} className="bg-white p-4 rounded-xl border border-emerald-50 shadow-sm hover:shadow-md transition-all group">
                    {product.image && (
                      <div className="aspect-square bg-emerald-50 rounded-lg mb-3 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <h4 className="font-serif font-bold text-cheptebo-green text-sm mb-1">{product.name}</h4>
                    <p className="text-emerald-700 font-bold text-sm">Ksh {product.price.toLocaleString()}</p>
                    <button 
                      onClick={() => {
                        if (product.category === 'nursery') {
                          setActiveTab('nursery');
                        } else {
                          addToCart(product);
                        }
                      }}
                      className="mt-3 w-full py-2 text-xs font-bold border border-emerald-200 text-cheptebo-green rounded-lg hover:bg-emerald-50 transition-colors"
                    >
                      {product.category === 'nursery' ? 'View in Nursery' : 'Add to Order'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Honey & Bee Products Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-emerald-100 pb-4">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-cheptebo-green">Pure Refined Honey</h3>
                  <p className="text-emerald-600 text-sm">Harvested from our own apiaries in the Kerio Valley</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PRODUCTS.filter(p => p.id.startsWith('h-')).map(product => (
                  <div key={product.id} className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 flex flex-col items-center text-center gap-4 group">
                    {product.image && (
                      <div className="w-full aspect-video bg-white rounded-xl overflow-hidden shadow-sm">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-serif font-bold text-cheptebo-green">{product.name}</h4>
                      <p className="text-emerald-700 text-sm">{product.description}</p>
                    </div>
                    <div className="flex items-center justify-between w-full mt-2">
                      <span className="text-lg font-bold text-cheptebo-green">Ksh {product.price.toLocaleString()}</span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-cheptebo-green text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-cheptebo-dark transition-colors"
                      >
                        Add to Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderLivestock = () => {
    const filtered = PRODUCTS.filter(p => p.category === 'livestock');
    const breeding = filtered.filter(p => p.unit === 'inquiry');
    const regular = filtered.filter(p => p.unit !== 'inquiry');

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <h2 className="text-2xl font-bold text-emerald-900">Livestock & Poultry Department</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-emerald-800 flex items-center gap-2">
                <Bird className="w-6 h-6" /> Poultry (Improved Kienyeji)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {regular.filter(p => p.id.startsWith('ch-')).map(product => (
                  <motion.div 
                    layout
                    key={product.id}
                    className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden"
                  >
                    {product.image && (
                      <div className="aspect-video bg-emerald-50 rounded-xl mb-4 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-bold text-emerald-900">{product.name}</h3>
                      <p className="text-emerald-600 text-sm">{product.description}</p>
                      <p className="text-xl font-black text-emerald-700">Ksh {product.price.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="mt-4 w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add to Order
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-emerald-800 flex items-center gap-2">
                <Info className="w-6 h-6" /> Dairy Products
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {regular.filter(p => p.id.startsWith('m-')).map(product => (
                  <motion.div 
                    layout
                    key={product.id}
                    className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-bold text-emerald-900">{product.name}</h3>
                      <p className="text-emerald-600 text-sm">{product.description}</p>
                      <p className="text-xl font-black text-emerald-700">Ksh {product.price.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="mt-4 w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add to Order
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-emerald-800">Breeding Animals</h3>
            <div className="space-y-4">
              {breeding.map(product => (
                <div key={product.id} className="bg-amber-50 p-6 rounded-2xl border border-amber-100 space-y-4 overflow-hidden">
                  {product.image && (
                    <div className="aspect-video bg-amber-100 rounded-xl overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover hover:scale-110 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
                      <Bird className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-amber-900">{product.name}</h4>
                  </div>
                  <p className="text-sm text-amber-800">{product.description}</p>
                  <div className="pt-2">
                    <button 
                      onClick={() => {
                        const message = `Halo Cheptebo! I am inquiring about the current price for: ${product.name}.`;
                        window.open(`https://wa.me/254722296370?text=${encodeURIComponent(message)}`, '_blank');
                      }}
                      className="w-full bg-amber-600 text-white py-3 rounded-xl font-bold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" /> Inquire Price via WhatsApp
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-emerald-900 text-white p-6 rounded-2xl space-y-4">
              <h4 className="font-bold flex items-center gap-2">
                <Info className="w-5 h-5" /> Breeding Excellence
              </h4>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Our Galla Goats and Dairy Heifers are bred for high performance in the Kerio Valley climate. 
                We provide full vaccination records and breeding history for all animals.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHospitality = () => {
    const filtered = PRODUCTS.filter(p => p.category === 'hospitality');

    const scrollToBooking = (type: string) => {
      setBooking(prev => ({ ...prev, type }));
      bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
      <div className="space-y-12">
        <div className="flex items-center justify-between">
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-2 text-cheptebo-green hover:text-cheptebo-dark font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <h2 className="text-2xl font-serif font-bold text-cheptebo-green">Hospitality & Conferences</h2>
        </div>

        {/* Hero Section: Everything Under One Roof */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-cheptebo-green px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
            <Star className="w-3 h-3 fill-cheptebo-green" /> OUR FACILITIES
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cheptebo-green">Everything Under One Roof</h2>
          <p className="text-emerald-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            From world-class conference halls to comfortable accommodation and superb catering — 
            AIC Cheptebo delivers a seamless event experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Conference Hall Card */}
          <div className="bg-white rounded-3xl overflow-hidden border border-emerald-100 shadow-sm flex flex-col group">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/d/1qt66ZuZcRpR6_XESD5hNcweIlZh6-mKF" 
                alt="Conference Hall" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-cheptebo-dark/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-widest">
                CONFERENCE HALLS
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <Monitor className="w-6 h-6 text-cheptebo-green" />
                </div>
                <h3 className="text-xl font-serif font-bold text-cheptebo-green">Conference Hall</h3>
              </div>
              <p className="text-sm text-emerald-700 leading-relaxed">
                Four purpose-built conference halls in a tranquil hilltop environment. Each hall is fully set up to support professional training, workshops and high-level meetings.
              </p>
              <ul className="space-y-3 pt-4 border-t border-emerald-50">
                {[
                  'Digital projector & projection screen',
                  'PA system & microphones',
                  'Whiteboards & flip charts',
                  'Stationery for all delegates',
                  'Large hall (3,000 KSh/day) · Small hall (2,000 KSh/day)'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-emerald-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cheptebo-green shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Accommodation Card */}
          <div className="bg-white rounded-3xl overflow-hidden border border-emerald-100 shadow-sm flex flex-col group">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/d/1gGW4WiXTzBDnUhcwnhZJcBvScemIxsMj" 
                alt="Guest Accommodation" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-cheptebo-dark/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-widest">
                ACCOMMODATION
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <Bed className="w-6 h-6 text-cheptebo-green" />
                </div>
                <h3 className="text-xl font-serif font-bold text-cheptebo-green">Guest Accommodation</h3>
              </div>
              <p className="text-sm text-emerald-700 leading-relaxed">
                Comfortable en-suite and standard rooms for up to 100 guests, situated in peaceful surroundings to ensure your delegates rest and recharge fully.
              </p>
              <ul className="space-y-3 pt-4 border-t border-emerald-50">
                {[
                  'Self-contained rooms (single, double, family)',
                  'Non-self-contained rooms (single & double)',
                  'Clean linen & daily housekeeping',
                  'Hot water showers',
                  'From 600 KSh (bed only) per person'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-emerald-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cheptebo-green shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dining Card */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden border border-emerald-100 shadow-sm flex flex-col group">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1550966842-2849a220276c?auto=format&fit=crop&q=80&w=800" 
                alt="Dining & Kitchen" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-cheptebo-dark/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-widest">
                DINING
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <Utensils className="w-6 h-6 text-cheptebo-green" />
                </div>
                <h3 className="text-xl font-serif font-bold text-cheptebo-green">Dining & Kitchen</h3>
              </div>
              <p className="text-sm text-emerald-700 leading-relaxed">
                Our professional kitchen team delivers nutritious, well-prepared meals throughout the day — keeping your delegates energised and satisfied from morning to evening.
              </p>
              <ul className="space-y-3 pt-4 border-t border-emerald-50">
                {[
                  'Full cooked breakfast each morning',
                  'Hot lunch & dinner service',
                  'Morning & afternoon tea breaks',
                  'Mineral water throughout sessions',
                  'Special dietary needs accommodated'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-emerald-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="space-y-8">


            <div className="bg-white rounded-[2.5rem] border border-emerald-100 shadow-sm overflow-hidden">
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-600 rounded-lg">
                    <Hotel className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-emerald-900">Room Rates</h3>
                    <p className="text-sm text-emerald-600">All rates in Kenya Shillings (KSh) per room per night</p>
                  </div>
                </div>
              </div>

              <div className="flex border-b border-emerald-100">
                <button 
                  onClick={() => setRoomCategory('sc')}
                  className={cn(
                    "flex-1 py-4 px-6 font-bold text-sm flex items-center justify-center gap-2 transition-all",
                    roomCategory === 'sc' ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  )}
                >
                  <Hotel className="w-4 h-4" /> SELF-CONTAINED ROOMS
                </button>
                <button 
                  onClick={() => setRoomCategory('nsc')}
                  className={cn(
                    "flex-1 py-4 px-6 font-bold text-sm flex items-center justify-center gap-2 transition-all",
                    roomCategory === 'nsc' ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  )}
                >
                  <Hotel className="w-4 h-4" /> NON-SELF-CONTAINED ROOMS
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-emerald-600 text-white">
                      <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest">Room Type</th>
                      <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-center">Bed & Breakfast</th>
                      <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-center">Half Board</th>
                      <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-center">Full Board</th>
                      <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-center">Bed Only</th>
                      <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {roomCategory === 'sc' ? (
                      <>
                        <tr className="bg-cheptebo-dark text-white">
                          <td colSpan={6} className="py-2 px-6 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-cheptebo-gold" /> Standard Self-Contained Rooms
                          </td>
                        </tr>
                        <tr className="border-b border-emerald-50 hover:bg-emerald-50/50 transition-colors">
                          <td className="py-4 px-6 font-bold text-emerald-900 flex items-center gap-2"><Plus className="w-4 h-4 text-emerald-400" /> Single</td>
                          <td 
                            onClick={() => scrollToBooking('Self-Contained Single (Bed & Breakfast)')}
                            className="py-4 px-6 text-emerald-700 text-center font-bold cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Bed & Breakfast"
                          >
                            2,200
                          </td>
                          <td 
                            onClick={() => scrollToBooking('Self-Contained Single (Half Board)')}
                            className="py-4 px-6 text-emerald-700 text-center font-bold cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Half Board"
                          >
                            2,700
                          </td>
                          <td 
                            onClick={() => scrollToBooking('Self-Contained Single (Full Board)')}
                            className="py-4 px-6 text-amber-600 text-center font-black cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Full Board"
                          >
                            3,050
                          </td>
                          <td 
                            onClick={() => scrollToBooking('Self-Contained Single (Bed Only)')}
                            className="py-4 px-6 text-emerald-900 text-center font-black cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Bed Only"
                          >
                            1,500
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button 
                              onClick={() => scrollToBooking('Self-Contained Single')}
                              className="bg-emerald-100 text-emerald-700 p-2 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
                              title="Book Now"
                            >
                              <Calendar className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                        <tr className="border-b border-emerald-50 hover:bg-emerald-50/50 transition-colors">
                          <td className="py-4 px-6 font-bold text-emerald-900 flex items-center gap-2"><Plus className="w-4 h-4 text-emerald-400" /> Double</td>
                          <td 
                            onClick={() => scrollToBooking('Self-Contained Double (Bed & Breakfast)')}
                            className="py-4 px-6 text-emerald-700 text-center font-bold cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Bed & Breakfast"
                          >
                            3,200
                          </td>
                          <td 
                            onClick={() => scrollToBooking('Self-Contained Double (Half Board)')}
                            className="py-4 px-6 text-emerald-700 text-center font-bold cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Half Board"
                          >
                            4,200
                          </td>
                          <td 
                            onClick={() => scrollToBooking('Self-Contained Double (Full Board)')}
                            className="py-4 px-6 text-emerald-700 text-center font-bold cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Full Board"
                          >
                            5,600
                          </td>
                          <td 
                            onClick={() => scrollToBooking('Self-Contained Double (Bed Only)')}
                            className="py-4 px-6 text-emerald-900 text-center font-black cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Bed Only"
                          >
                            2,500
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button 
                              onClick={() => scrollToBooking('Self-Contained Double')}
                              className="bg-emerald-100 text-emerald-700 p-2 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
                              title="Book Now"
                            >
                              <Calendar className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                        <tr className="hover:bg-emerald-50/50 transition-colors">
                          <td className="py-4 px-6 font-bold text-emerald-900 flex items-center gap-2"><Plus className="w-4 h-4 text-emerald-400" /> Family / Couple</td>
                          <td 
                            onClick={() => scrollToBooking('Self-Contained Family/Couple (Bed & Breakfast)')}
                            className="py-4 px-6 text-emerald-700 text-center font-bold cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Bed & Breakfast"
                          >
                            2,700
                          </td>
                          <td 
                            onClick={() => scrollToBooking('Self-Contained Family/Couple (Half Board)')}
                            className="py-4 px-6 text-emerald-700 text-center font-bold cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Half Board"
                          >
                            3,300
                          </td>
                          <td 
                            onClick={() => scrollToBooking('Self-Contained Family/Couple (Full Board)')}
                            className="py-4 px-6 text-emerald-700 text-center font-bold cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Full Board"
                          >
                            5,100
                          </td>
                          <td 
                            onClick={() => scrollToBooking('Self-Contained Family/Couple (Bed Only)')}
                            className="py-4 px-6 text-emerald-900 text-center font-black cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Bed Only"
                          >
                            2,000
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button 
                              onClick={() => scrollToBooking('Self-Contained Family/Couple')}
                              className="bg-emerald-100 text-emerald-700 p-2 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
                              title="Book Now"
                            >
                              <Calendar className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr className="bg-cheptebo-dark text-white">
                          <td colSpan={6} className="py-2 px-6 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-cheptebo-gold" /> Standard Non-Self-Contained Rooms
                          </td>
                        </tr>
                        <tr className="border-b border-emerald-50 hover:bg-emerald-50/50 transition-colors">
                          <td className="py-4 px-6 font-bold text-emerald-900 flex items-center gap-2"><Plus className="w-4 h-4 text-emerald-400" /> Single</td>
                          <td 
                            onClick={() => scrollToBooking('Non-Self-Contained Single (Bed & Breakfast)')}
                            className="py-4 px-6 text-emerald-700 text-center font-bold cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Bed & Breakfast"
                          >
                            1,100
                          </td>
                          <td 
                            onClick={() => scrollToBooking('Non-Self-Contained Single (Half Board)')}
                            className="py-4 px-6 text-emerald-700 text-center font-bold cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Half Board"
                          >
                            1,500
                          </td>
                          <td 
                            onClick={() => scrollToBooking('Non-Self-Contained Single (Full Board)')}
                            className="py-4 px-6 text-emerald-700 text-center font-bold cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Full Board"
                          >
                            2,100
                          </td>
                          <td 
                            onClick={() => scrollToBooking('Non-Self-Contained Single (Bed Only)')}
                            className="py-4 px-6 text-emerald-900 text-center font-black cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Bed Only"
                          >
                            600
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button 
                              onClick={() => scrollToBooking('Non-Self-Contained Single')}
                              className="bg-emerald-100 text-emerald-700 p-2 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
                              title="Book Now"
                            >
                              <Calendar className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                        <tr className="hover:bg-emerald-50/50 transition-colors">
                          <td className="py-4 px-6 font-bold text-emerald-900 flex items-center gap-2"><Plus className="w-4 h-4 text-emerald-400" /> Double</td>
                          <td 
                            onClick={() => scrollToBooking('Non-Self-Contained Double (Bed & Breakfast)')}
                            className="py-4 px-6 text-emerald-700 text-center font-bold cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Bed & Breakfast"
                          >
                            2,000
                          </td>
                          <td 
                            onClick={() => scrollToBooking('Non-Self-Contained Double (Half Board)')}
                            className="py-4 px-6 text-emerald-700 text-center font-bold cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Half Board"
                          >
                            2,900
                          </td>
                          <td 
                            onClick={() => scrollToBooking('Non-Self-Contained Double (Full Board)')}
                            className="py-4 px-6 text-emerald-700 text-center font-bold cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Full Board"
                          >
                            4,100
                          </td>
                          <td 
                            onClick={() => scrollToBooking('Non-Self-Contained Double (Bed Only)')}
                            className="py-4 px-6 text-emerald-900 text-center font-black cursor-pointer hover:bg-emerald-600 hover:text-white transition-all"
                            title="Book Bed Only"
                          >
                            1,200
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button 
                              onClick={() => scrollToBooking('Non-Self-Contained Double')}
                              className="bg-emerald-100 text-emerald-700 p-2 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
                              title="Book Now"
                            >
                              <Calendar className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-emerald-50 border-t border-emerald-100">
                <p className="text-[10px] text-emerald-600 italic text-center">
                  * Rates are per room per night unless specified. Full Board includes Breakfast, Lunch, and Dinner.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-emerald-100 shadow-sm overflow-hidden">
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-600 rounded-lg">
                    <LayoutDashboard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-emerald-900">Conference Package Rates</h3>
                    <p className="text-sm text-emerald-600">All rates in Kenya Shillings (KSh) per person</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-cheptebo-green text-white font-serif">
                        <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest">Package Description</th>
                        <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-right">Rate (KSh)</th>
                        <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-center">Action</th>
                      </tr>
                    </thead>
                  <tbody className="text-sm">
                    <tr className="bg-cheptebo-dark text-white">
                      <td colSpan={3} className="py-2 px-6 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <Sun className="w-3 h-3 text-cheptebo-gold" /> Day Conference Packages
                      </td>
                    </tr>
                    <tr className="border-b border-emerald-50 hover:bg-emerald-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-bold text-emerald-900">Full Day Conference Package</p>
                        <p className="text-xs text-emerald-600">Per person — conference hall facilities & all meals</p>
                      </td>
                      <td className="py-4 px-6 text-right font-black text-emerald-900">2,000</td>
                      <td className="py-4 px-6 text-center">
                          <button 
                            onClick={() => scrollToBooking('Full Day Conference Package')}
                            className="bg-emerald-100 text-cheptebo-green p-2 rounded-lg hover:bg-cheptebo-green hover:text-white transition-all"
                            title="Book Now"
                          >
                            <Calendar className="w-4 h-4" />
                          </button>
                      </td>
                    </tr>
                    <tr className="border-b border-emerald-50 hover:bg-emerald-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-bold text-emerald-900">Half Day Conference Package</p>
                        <p className="text-xs text-emerald-600">Per person — conference hall facilities & meals</p>
                      </td>
                      <td className="py-4 px-6 text-right font-black text-emerald-900">1,500</td>
                      <td className="py-4 px-6 text-center">
                          <button 
                            onClick={() => scrollToBooking('Half Day Conference Package')}
                            className="bg-emerald-100 text-cheptebo-green p-2 rounded-lg hover:bg-cheptebo-green hover:text-white transition-all"
                            title="Book Now"
                          >
                            <Calendar className="w-4 h-4" />
                          </button>
                      </td>
                    </tr>

                    <tr className="bg-cheptebo-dark text-white">
                      <td colSpan={3} className="py-2 px-6 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <Moon className="w-3 h-3 text-cheptebo-gold" /> Residential Conference Packages
                      </td>
                    </tr>
                    <tr className="border-b border-emerald-50 bg-amber-50/30 hover:bg-amber-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-emerald-900">Full Board Conference Package</p>
                          <span className="bg-amber-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">Best Value</span>
                        </div>
                        <p className="text-xs text-emerald-600">Per person — conference hall, all meals & accommodation</p>
                      </td>
                      <td className="py-4 px-6 text-right font-black text-amber-600">4,500</td>
                      <td className="py-4 px-6 text-center">
                          <button 
                            onClick={() => scrollToBooking('Full Board Conference Package')}
                            className="bg-emerald-100 text-cheptebo-green p-2 rounded-lg hover:bg-cheptebo-green hover:text-white transition-all"
                            title="Book Now"
                          >
                            <Calendar className="w-4 h-4" />
                          </button>
                      </td>
                    </tr>
                    <tr className="border-b border-emerald-50 hover:bg-emerald-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-bold text-emerald-900">Half Board Conference Package</p>
                        <p className="text-xs text-emerald-600">Per person — conference hall, meals & accommodation</p>
                      </td>
                      <td className="py-4 px-6 text-right font-black text-emerald-900">2,700</td>
                      <td className="py-4 px-6 text-center">
                          <button 
                            onClick={() => scrollToBooking('Half Board Conference Package')}
                            className="bg-emerald-100 text-cheptebo-green p-2 rounded-lg hover:bg-cheptebo-green hover:text-white transition-all"
                            title="Book Now"
                          >
                            <Calendar className="w-4 h-4" />
                          </button>
                      </td>
                    </tr>
                    <tr className="border-b border-emerald-50 hover:bg-emerald-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-bold text-emerald-900">Bed and Breakfast</p>
                        <p className="text-xs text-emerald-600">Per person</p>
                      </td>
                      <td className="py-4 px-6 text-right font-black text-emerald-900">2,200</td>
                      <td className="py-4 px-6 text-center">
                          <button 
                            onClick={() => scrollToBooking('Conference Bed and Breakfast')}
                            className="bg-emerald-100 text-cheptebo-green p-2 rounded-lg hover:bg-cheptebo-green hover:text-white transition-all"
                            title="Book Now"
                          >
                            <Calendar className="w-4 h-4" />
                          </button>
                      </td>
                    </tr>

                    <tr className="bg-cheptebo-dark text-white">
                      <td colSpan={3} className="py-2 px-6 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <Hotel className="w-3 h-3 text-cheptebo-gold" /> Hall Hire Only
                      </td>
                    </tr>
                    <tr className="border-b border-emerald-50 hover:bg-emerald-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-bold text-emerald-900">Conference Hall Hire — Large Hall</p>
                        <p className="text-xs text-emerald-600">Per day</p>
                      </td>
                      <td className="py-4 px-6 text-right font-black text-emerald-900">3,000</td>
                      <td className="py-4 px-6 text-center">
                          <button 
                            onClick={() => scrollToBooking('Conference Hall Hire — Large Hall')}
                            className="bg-emerald-100 text-cheptebo-green p-2 rounded-lg hover:bg-cheptebo-green hover:text-white transition-all"
                            title="Book Now"
                          >
                            <Calendar className="w-4 h-4" />
                          </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-emerald-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-bold text-emerald-900">Conference Hall Hire — Small Hall</p>
                        <p className="text-xs text-emerald-600">Per day</p>
                      </td>
                      <td className="py-4 px-6 text-right font-black text-emerald-900">2,000</td>
                      <td className="py-4 px-6 text-center">
                          <button 
                            onClick={() => scrollToBooking('Conference Hall Hire — Small Hall')}
                            className="bg-emerald-100 text-cheptebo-green p-2 rounded-lg hover:bg-cheptebo-green hover:text-white transition-all"
                            title="Book Now"
                          >
                            <Calendar className="w-4 h-4" />
                          </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div ref={bookingRef} className="bg-white p-10 rounded-[2.5rem] border border-emerald-100 shadow-sm space-y-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-serif font-bold text-cheptebo-green">Book Training or Event</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-emerald-700 uppercase">Room or Event Type</label>
                <input 
                  type="text" 
                  value={booking.type}
                  placeholder="e.g. Luxury Cottage"
                  className="w-full p-4 bg-emerald-50 border-2 border-emerald-100 rounded-2xl focus:border-cheptebo-green outline-none transition-all"
                  onChange={(e) => setBooking(prev => ({ ...prev, type: e.target.value }))}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-emerald-700 uppercase">Event Date</label>
                <input 
                  type="date" 
                  className="w-full p-4 bg-emerald-50 border-2 border-emerald-100 rounded-2xl focus:border-cheptebo-green outline-none transition-all"
                  onChange={(e) => setBooking(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-emerald-700 uppercase">Number of Guests</label>
                  <input 
                    type="number" 
                    min="1"
                    value={booking.guests}
                    placeholder="e.g. 20"
                    className="w-full p-4 bg-emerald-50 border-2 border-emerald-100 rounded-2xl focus:border-cheptebo-green outline-none transition-all"
                    onChange={(e) => setBooking(prev => ({ ...prev, guests: parseInt(e.target.value) || 1 }))}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-emerald-700 uppercase">Number of Days/Nights</label>
                  <input 
                    type="number" 
                    min="1"
                    value={booking.days}
                    placeholder="e.g. 3"
                    className="w-full p-4 bg-emerald-50 border-2 border-emerald-100 rounded-2xl focus:border-cheptebo-green outline-none transition-all"
                    onChange={(e) => setBooking(prev => ({ ...prev, days: parseInt(e.target.value) || 1 }))}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-emerald-700 uppercase">Accommodation & Catering Needs</label>
                <textarea 
                  placeholder="Tell us more about your requirements..."
                  className="w-full p-4 bg-emerald-50 border-2 border-emerald-100 rounded-2xl focus:border-cheptebo-green outline-none transition-all h-32"
                  onChange={(e) => setBooking(prev => ({ ...prev, needs: e.target.value }))}
                />
              </div>
              <button 
                onClick={() => {
                  const message = `Halo Cheptebo! I would like to book:\nType: ${booking.type}\nDate: ${booking.date}\nGuests: ${booking.guests}\nDuration: ${booking.days} day(s)/night(s)\nNeeds: ${booking.needs}`;
                  window.open(`https://wa.me/254722296370?text=${encodeURIComponent(message)}`, '_blank');
                  setActiveTab('home');
                }}
                className="w-full bg-cheptebo-dark text-white py-4 rounded-2xl font-black text-lg hover:bg-cheptebo-green transition-colors"
              >
                Submit Inquiry via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAdvice = () => (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-2">
        <button onClick={() => setActiveTab('home')} className="p-2 hover:bg-emerald-50 rounded-full">
          <ArrowLeft className="w-6 h-6 text-cheptebo-green" />
        </button>
        <h2 className="text-3xl font-serif font-bold text-cheptebo-green">Expert Agricultural Advice</h2>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-cheptebo-green">Where is your farm located?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="p-6 border-2 border-emerald-100 rounded-2xl hover:border-cheptebo-green hover:bg-emerald-50 text-left transition-all group">
              <span className="block font-bold text-emerald-900 group-hover:text-cheptebo-green">Dry Areas (e.g., Kerio Valley)</span>
              <span className="text-sm text-emerald-600">High heat, low rainfall.</span>
            </button>
            <button className="p-6 border-2 border-emerald-100 rounded-2xl hover:border-cheptebo-green hover:bg-emerald-50 text-left transition-all group">
              <span className="block font-bold text-emerald-900 group-hover:text-cheptebo-green">Highland Areas</span>
              <span className="text-sm text-emerald-600">Cooler temperatures, higher rainfall.</span>
            </button>
          </div>
        </div>

        <div className="p-6 bg-emerald-50 rounded-2xl space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-48 h-32 bg-emerald-100 rounded-xl overflow-hidden shrink-0">
              <img 
                src="https://lh3.googleusercontent.com/d/19Ygb48RJspV1VikwweLzhKVpPFZoOOry" 
                alt="Pixie Orange Seedling" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-cheptebo-green flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-cheptebo-green" />
                Our Recommendation
              </h4>
              <p className="text-emerald-700">
                For dry areas like the Kerio Valley, we strongly recommend **Pixie Oranges** and **Apple Mangoes**. 
                These varieties are drought-tolerant and have high market demand.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setActiveTab('nursery')}
              className="bg-cheptebo-green text-white px-6 py-3 rounded-xl font-bold hover:bg-cheptebo-dark transition-colors"
            >
              View Nursery Catalog
            </button>
            <button 
              onClick={() => {
                const message = "Halo Cheptebo! I would like some agricultural advice for my farm.";
                window.open(`https://wa.me/254722296370?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="flex items-center justify-center gap-2 text-cheptebo-green font-bold hover:underline"
            >
              <MessageSquare className="w-5 h-5" /> Talk to an Expert
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCart = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold text-cheptebo-green">Your Order Summary</h2>
        <button onClick={() => setActiveTab('home')} className="text-cheptebo-green font-medium hover:underline">Continue Shopping</button>
      </div>

      {cart.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <ShoppingCart className="w-16 h-16 mx-auto text-emerald-200" />
            <p className="text-emerald-600 text-lg">Your order is empty.</p>
            <button 
              onClick={() => setActiveTab('home')}
              className="bg-cheptebo-green text-white px-8 py-3 rounded-full font-bold hover:bg-cheptebo-dark transition-colors"
            >
              Browse Products
            </button>
          </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.product.id} className="bg-white p-4 rounded-2xl border border-emerald-100 flex items-center gap-4">
                <div className="flex-1">
                  <h4 className="font-serif font-bold text-cheptebo-green">{item.product.name}</h4>
                  <p className="text-emerald-600 text-sm">Ksh {item.product.price} / {item.product.unit}</p>
                </div>
                <div className="flex items-center gap-3 bg-emerald-50 rounded-lg p-1">
                  <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1 hover:bg-white rounded"><Minus className="w-4 h-4" /></button>
                  <span className="font-bold w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1 hover:bg-white rounded"><Plus className="w-4 h-4" /></button>
                </div>
                <button onClick={() => removeFromCart(item.product.id)} className="text-red-400 hover:text-red-600 p-2">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}

            <div className="bg-white p-6 rounded-2xl border border-emerald-100 space-y-4">
              <h3 className="font-serif font-bold text-cheptebo-green">Delivery Preference</h3>
              <div className="flex gap-4">
                <button 
                  onClick={() => setDeliveryPreference('pickup')}
                  className={cn(
                    "flex-1 p-4 rounded-xl border-2 text-center font-bold transition-all",
                    deliveryPreference === 'pickup' ? "border-cheptebo-green bg-emerald-50 text-cheptebo-green" : "border-emerald-100 text-emerald-400"
                  )}
                >
                  <MapPin className="w-5 h-5 mx-auto mb-1" />
                  Self-Pickup
                </button>
                <button 
                  onClick={() => setDeliveryPreference('delivery')}
                  className={cn(
                    "flex-1 p-4 rounded-xl border-2 text-center font-bold transition-all",
                    deliveryPreference === 'delivery' ? "border-cheptebo-green bg-emerald-50 text-cheptebo-green" : "border-emerald-100 text-emerald-400"
                  )}
                >
                  <Phone className="w-5 h-5 mx-auto mb-1" />
                  Delivery
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-cheptebo-green text-white p-6 rounded-3xl shadow-lg space-y-4">
              <h3 className="text-xl font-serif font-bold">Total Amount</h3>
              <div className="flex justify-between text-emerald-100">
                <span>Subtotal</span>
                <span>Ksh {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-100">
                <span>Delivery</span>
                <span>{deliveryPreference === 'pickup' ? 'Free' : 'Calculated at checkout'}</span>
              </div>
              <div className="h-px bg-emerald-800" />
              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span>Ksh {cartTotal.toLocaleString()}</span>
              </div>
              <button 
                onClick={() => setShowPayment(true)}
                className="w-full bg-white text-cheptebo-green py-4 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard className="w-6 h-6" /> Pay via M-Pesa
              </button>
              <button 
                onClick={() => {
                  const message = `Halo Cheptebo! I would like to order:\n${cart.map(item => `- ${item.product.name} (x${item.quantity})`).join('\n')}\n\nTotal: Ksh ${cartTotal.toLocaleString()}`;
                  window.open(`https://wa.me/254722296370?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="w-full bg-cheptebo-dark text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-6 h-6" /> Order via WhatsApp
              </button>
            </div>
            <p className="text-xs text-emerald-600 text-center italic">
              Payments are secured via M-Pesa STK Push (IntaSend).
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-emerald-950 font-sans selection:bg-emerald-200">
      {/* Top Bar */}
      <div className="bg-cheptebo-dark text-white py-2 text-[10px] font-bold uppercase tracking-[0.2em]">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> +254 722 296370</span>
            <span className="flex items-center gap-1.5"><MessageSquare className="w-3 h-3" /> cheptebordc@gmail.com</span>
          </div>
          <a href="https://www.cheptebo.org" target="_blank" rel="noopener noreferrer" className="hover:text-cheptebo-gold transition-colors flex items-center gap-1.5">
            VISIT OFFICIAL SITE <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-40 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-64 h-32 flex items-center justify-center">
              <img 
                src="https://lh3.googleusercontent.com/d/1lxWK_Z9UkvbyjmiWtCh5d-aUMRwoUtMh" 
                alt="Cheptebo Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden lg:block border-l border-emerald-100 pl-4">
              <h1 className="font-serif font-bold text-2xl tracking-tight text-cheptebo-green leading-none">A.I.C CHEPTEBO</h1>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-600">Rural Development Centre</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 font-bold text-emerald-800 text-sm">
            <button onClick={() => setActiveTab('home')} className={cn("hover:text-cheptebo-green transition-colors", activeTab === 'home' && "text-cheptebo-green")}>HOME</button>
            <button onClick={() => setActiveTab('shop')} className={cn("hover:text-cheptebo-green transition-colors", activeTab === 'shop' && "text-cheptebo-green")}>SHOP</button>
            <button onClick={() => setActiveTab('nursery')} className={cn("hover:text-cheptebo-green transition-colors", activeTab === 'nursery' && "text-cheptebo-green")}>NURSERY</button>
            <button onClick={() => setActiveTab('livestock')} className={cn("hover:text-cheptebo-green transition-colors", activeTab === 'livestock' && "text-cheptebo-green")}>LIVESTOCK</button>
            <button onClick={() => setActiveTab('hospitality')} className={cn("hover:text-cheptebo-green transition-colors", activeTab === 'hospitality' && "text-cheptebo-green")}>HOSPITALITY</button>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('cart')}
              className="relative p-2 hover:bg-emerald-50 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-cheptebo-green" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-cheptebo-gold text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'home' && renderHome()}
            {activeTab === 'shop' && renderProductList('shop')}
            {activeTab === 'nursery' && renderProductList('nursery')}
            {activeTab === 'livestock' && renderLivestock()}
            {activeTab === 'hospitality' && renderHospitality()}
            {activeTab === 'advice' && renderAdvice()}
            {activeTab === 'cart' && renderCart()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-cheptebo-dark text-emerald-100 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-8">
            <div className="flex flex-col items-start gap-4">
              <div className="w-80 h-40 flex items-center justify-center">
                <img 
                  src="https://lh3.googleusercontent.com/d/1lxWK_Z9UkvbyjmiWtCh5d-aUMRwoUtMh" 
                  alt="Cheptebo Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h2 className="font-serif font-bold text-3xl tracking-tight text-white">A.I.C CHEPTEBO</h2>
            </div>
            <p className="text-emerald-400 text-sm leading-relaxed">
              A community-based organization supported by the AIC Church and international partners. 
              Committed to Integrity, Quality, and Community Impact.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/cheptebo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-emerald-900 rounded-full flex items-center justify-center hover:bg-emerald-800 transition-colors"
              >
                <span className="font-black text-xs text-white">f</span>
              </a>
              <button className="w-8 h-8 bg-emerald-900 rounded-full flex items-center justify-center hover:bg-emerald-800 transition-colors">
                <span className="font-black text-xs text-white">in</span>
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="font-black text-white uppercase tracking-widest text-xs">Our Core Values</h3>
            <ul className="space-y-3 text-sm text-emerald-400">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Integrity & Honesty</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Stewardship of Resources</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Excellence in Service</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Community Transformation</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-black text-white uppercase tracking-widest text-xs">Quick Links</h3>
            <ul className="space-y-3 text-sm text-emerald-400">
              <li><button onClick={() => setActiveTab('advice')} className="hover:text-white transition-colors">Agricultural Advice</button></li>
              <li><button onClick={() => setActiveTab('hospitality')} className="hover:text-white transition-colors">Book Accommodation</button></li>
              <li><button onClick={() => setActiveTab('livestock')} className="hover:text-white transition-colors">Livestock & Poultry</button></li>
              <li><button onClick={() => setActiveTab('nursery')} className="hover:text-white transition-colors">Tree Nursery</button></li>
              <li><button onClick={() => setActiveTab('shop')} className="hover:text-white transition-colors">Value-Added Shop</button></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-black text-white uppercase tracking-widest text-xs">Contact & Partners</h3>
            <div className="space-y-4 text-sm text-emerald-400">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="font-bold text-white leading-tight">A.I.C Cheptebo Rural Development Centre</p>
                  <p>P.O. Box 614-30700</p>
                  <p>ITEN, Kenya</p>
                </div>
              </div>
              <p className="flex items-center gap-3"><Phone className="w-4 h-4 text-emerald-600" /> +254 722 296370</p>
              <div className="pt-4 space-y-2">
                <p className="text-[10px] uppercase font-black text-emerald-700 tracking-widest">Supported By</p>
                <p className="text-xs text-emerald-500">AIC Church Kenya, Government of Japan, & International Partners</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-emerald-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-emerald-600 font-bold uppercase tracking-widest">
          <span>© 2026 AIC Cheptebo Rural Development Centre</span>
          <div className="flex gap-8">
            <button className="hover:text-emerald-400">Privacy Policy</button>
            <button className="hover:text-emerald-400">Terms of Service</button>
          </div>
        </div>
      </footer>

      {/* Payment Modal Mock */}
      <AnimatePresence>
        {showPayment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-cheptebo-dark/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-emerald-100 text-cheptebo-green rounded-full flex items-center justify-center mx-auto">
                  <CreditCard className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-cheptebo-green">M-Pesa Payment</h3>
                <p className="text-emerald-600">Enter your M-Pesa number to receive the STK Push.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-cheptebo-green uppercase tracking-wider">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="07XX XXX XXX" 
                    className="w-full p-4 bg-emerald-50 border-2 border-emerald-100 rounded-2xl focus:border-cheptebo-green outline-none transition-all font-bold"
                  />
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl flex justify-between items-center">
                  <span className="text-emerald-700 font-medium">Amount to Pay</span>
                  <span className="text-xl font-bold text-cheptebo-green">Ksh {cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setShowPayment(false)}
                  className="flex-1 py-4 font-bold text-cheptebo-green hover:bg-emerald-50 rounded-2xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('STK Push Sent! Please check your phone.');
                    setShowPayment(false);
                    setCart([]);
                    setActiveTab('home');
                  }}
                  className="flex-1 py-4 bg-cheptebo-green text-white font-bold rounded-2xl hover:bg-cheptebo-dark shadow-lg transition-all"
                >
                  Pay Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
