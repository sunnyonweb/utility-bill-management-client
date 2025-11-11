import React from "react";

const SecurityFeature = () => {
  return (
    <div>
      <section className="py-16 bg-base-200 dark:bg-base-300 rounded-xl shadow-inner grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
        {/* Extra Section 1: Security Feature */}
        <div className="p-6 bg-base-100 dark:bg-base-100/70 rounded-lg shadow-xl border-l-4 border-teal-500">
          <div className="flex items-center mb-4">
            <span className="text-3xl text-teal-600 mr-3">🔒</span>
            <h3 className="text-2xl font-bold text-base-content">
              Data Security Assured
            </h3>
          </div>
          <p className="text-base-content/80 text-lg">
            We use industry-standard JWT encryption to ensure every transaction
            and profile access is secure. Your payment history and personal
            details are always protected.
          </p>
        </div>

        {/* Extra Section 2: Contact/Support */}
        <div className="p-6 bg-base-100 dark:bg-base-100/70 rounded-lg shadow-xl border-l-4 border-cyan-500">
          <div className="flex items-center mb-4">
            <span className="text-3xl text-cyan-600 mr-3">📞</span>
            <h3 className="text-2xl font-bold text-base-content">
              Dedicated Support
            </h3>
          </div>
          <p className="text-base-content/80 text-lg mb-6">
            Facing a billing issue or need technical help? Our specialized
            support team is available to provide quick, effective assistance
            24/7.
          </p>
          <button className="px-6 py-2 bg-cyan-600 text-white rounded-md shadow-md hover:bg-cyan-700 transition">
            Get Support Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default SecurityFeature;
