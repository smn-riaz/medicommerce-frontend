import React from 'react';

const NewsLetter = () => {
    return (
        <div>
          <section className="bg-white dark:bg-gray-800 w-full px-4 py-12">
  <div className="max-w-3xl mx-auto text-center">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
      Subscribe to Our Newsletter
    </h2>
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
      Get the latest updates on medical discoveries, health tips, and exclusive offers straight to your inbox.
    </p>

    <form className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full sm:w-2/3 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <button
        type="submit"
        className="bg-primary text-white dark:text-black px-6 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200 text-sm font-semibold"
      >
        Subscribe
      </button>
    </form>
  </div>
</section>
  
        </div>
    );
};

export default NewsLetter;