'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await new Promise((res) => setTimeout(res, 1000));
      toast.success('You have successfully subscribed to our newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Subscription failed. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#f2f4f5] dark:bg-gray-800 w-full px-4 pb-4 pt-8 rounded-md xl:max-w-[1300px] xl:mx-auto">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Get the latest updates on medical discoveries, health tips, and exclusive offers straight to your inbox.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full sm:w-2/3 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary text-white dark:text-black px-6 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200 text-sm font-semibold"
          >
            {submitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
