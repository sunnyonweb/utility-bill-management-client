import React from "react";
// 🔑 Imported React Awesome Reveal for dynamic animation
import { Fade, Slide } from "react-awesome-reveal";
import { CheckCircle, Zap, Shield, FileText } from "lucide-react";

const HighlightsSection = () => {
  const features = [
    {
      title: "JWT Protected Security Layer",
      description:
        "All sensitive data access (like My Pay Bills) is verified instantly using custom JSON Web Tokens (JWT) signed by our server, guaranteeing user data isolation and integrity.",
      icon: <Shield className="w-6 h-6 text-white" />,
      color: "bg-cyan-600",
    },
    {
      title: "Current Month Bill Validation",
      description:
        "The payment button logic is validated against the server date to ensure you can only pay bills due in the current calendar month, preventing accidental transactions.",
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      color: "bg-teal-600",
    },
    {
      title: "On-Demand PDF Report Generation",
      description:
        "Instantly download a comprehensive PDF report of your personal bill payment history (including username, amount, and date) using jsPDF, fulfilling external compliance needs.",
      icon: <FileText className="w-6 h-6 text-white" />,
      color: "bg-blue-600",
    },
    {
      title: "Optimized MERN Stack Performance",
      description:
        "Our application leverages the efficiency of the MERN stack (MongoDB, Express, React, Node.js) for quick loading times, responsive filtering, and seamless data management.",
      icon: <Zap className="w-6 h-6 text-white" />,
      color: "bg-indigo-600",
    },
  ];

  return (
    <section className="py-20 bg-base-100 dark:bg-base-200">
      <div className="container mx-auto px-4">
        <Fade triggerOnce duration={1500}>
          <h2 className="text-4xl font-extrabold text-base-content text-center mb-4">
            Core Value Propositions
          </h2>
          <p className="text-xl text-base-content/70 text-center mb-16">
            Discover the technology and safeguards built into BillManager Pro.
          </p>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
          {features.map((feature, index) => (
            // 🔑 Reveal component adds animation on scroll
            <Slide
              key={index}
              direction={index % 2 === 0 ? "left" : "right"}
              triggerOnce
              delay={index * 150}
            >
              <div className="group flex items-start space-x-6 p-6 bg-base-100 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-cyan-400/30 border border-base-300 dark:border-base-content/20 transition duration-300">
                {/* Icon Container with Color Accent */}
                <div
                  className={`flex-shrink-0 p-3 rounded-full ${feature.color} shadow-lg shadow-gray-500/30 group-hover:shadow-cyan-500/50 transition duration-300`}
                >
                  {feature.icon}
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-2xl font-bold text-base-content mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-base-content/80 text-md leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Slide>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
