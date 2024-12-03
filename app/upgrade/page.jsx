"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaCrown, FaStar } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';

// Ensure you replace this with your actual Stripe public key
const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY'); 

const plans = [
  {
    title: 'Free Plan',
    icon: <FaRocket size={32} />,
    description: 'Basic features for personal use. Limited video generation options.',
    price: 'Free',
    features: ['3 videos per month', 'Standard quality', 'Watermark included'],
    bgColor: 'bg-blue-200',
    amount: 0, // No payment required for free plan
  },
  {
    title: 'Pro Plan',
    icon: <FaCrown size={32} />,
    description: 'Advanced features for creators and influencers.',
    price: '$19/mo',
    features: ['Unlimited videos', 'HD quality', 'Custom watermarks'],
    bgColor: 'bg-purple-200',
    amount: 1900, // Price in cents (e.g., $19 = 1900 cents)
  },
  {
    title: 'Business Plan',
    icon: <FaStar size={32} />,
    description: 'Comprehensive tools for professionals and businesses.',
    price: '$49/mo',
    features: ['Unlimited videos', '4K quality', 'No watermarks', 'Priority support'],
    bgColor: 'bg-yellow-200',
    amount: 4900, // Price in cents (e.g., $49 = 4900 cents)
  },
];

const UpgradePlans = () => {
  const handleCheckout = async (amount) => {
    // 1. Get Stripe.js instance
    const stripe = await stripePromise;

    // 2. Call your backend to create a payment intent (You need to implement this on your server)
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    
    const { clientSecret } = await response.json();

    // 3. Redirect to Stripe's hosted checkout page
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price_data: { currency: 'usd', product_data: { name: 'Video Generation Plan' }, unit_amount: amount }, quantity: 1 }],
      mode: 'payment',
      clientReferenceId: 'your-client-reference-id',
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });

    if (error) {
      console.error("Stripe Checkout Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center py-12 px-4 md:px-8 lg:px-16 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Upgrade Your Experience</h1>
      <p className="text-lg text-gray-600 mb-12">Choose a plan that suits your needs and start generating high-quality AI videos.</p>
      <div className="flex flex-wrap justify-center gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`w-80 p-6 rounded-xl shadow-lg ${plan.bgColor} hover:bg-opacity-90`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">{plan.icon}</div>
              <h2 className="text-2xl font-semibold text-gray-900">{plan.title}</h2>
              <p className="text-gray-700 mt-2">{plan.description}</p>
              <p className="text-3xl font-bold text-gray-900 my-4">{plan.price}</p>
              <ul className="text-gray-600 text-sm space-y-1 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i}>• {feature}</li>
                ))}
              </ul>
              <button
                className="px-6 py-2 rounded-lg text-white font-semibold bg-gray-800 hover:bg-gray-900 focus:outline-none transition"
                onClick={() => handleCheckout(plan.amount)} // Trigger checkout on button click
              >
                Choose Plan
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UpgradePlans;
