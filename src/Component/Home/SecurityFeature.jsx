import React from "react";
import { Slide } from "react-awesome-reveal";
import { Zap, Shield, Phone } from "lucide-react";

const SecurityFeature = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-base-content text-center mb-12">
          Security & Support Excellence
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/*  Security Feature  */}
          <Slide direction="left" triggerOnce>
            <div className="p-8 bg-base-100 dark:bg-base-300 rounded-xl shadow-2xl border-l-4 border-teal-500 hover:shadow-teal-500/30 transition duration-300 transform hover:scale-[1.01]">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-teal-500 rounded-full mr-4 shadow-lg shadow-teal-500/40">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-base-content">
                  Data Security Assured
                </h3>
              </div>
              <p className="text-base-content/80 text-lg leading-relaxed mb-4">
                We utilize **end-to-end security** and custom **JWT
                verification** across all transactions and data retrieval
                points. Your payment history and personal profile details are
                rigorously protected by our secure backend architecture.
              </p>
              <div className="text-sm font-medium text-teal-600 dark:text-teal-400 flex items-center">
                <Zap className="w-4 h-4 mr-1" />
                Fully compliant with modern security standards.
              </div>
            </div>
          </Slide>

          {/* Contact/Support  */}
          <Slide direction="right" triggerOnce>
            <div className="p-8 bg-base-100 dark:bg-base-300 rounded-xl shadow-2xl border-l-4 border-cyan-500 hover:shadow-cyan-500/30 transition duration-300 transform hover:scale-[1.01]">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-cyan-600 rounded-full mr-4 shadow-lg shadow-cyan-600/40">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-base-content">
                  Dedicated Support
                </h3>
              </div>
              <p className="text-base-content/80 text-lg mb-6 leading-relaxed">
                Facing a billing issue, having technical difficulties, or need
                assistance with reporting? Our specialized support team is
                available 24/7 to provide quick and effective solutions.
              </p>
              <button className="px-6 py-3 bg-cyan-600 text-white rounded-md shadow-lg shadow-cyan-500/40 hover:bg-cyan-700 transition duration-200 w-full md:w-auto">
                Get Support Now
              </button>
            </div>
          </Slide>
        </div>
      </div>
    </section>
  );
};

export default SecurityFeature;
