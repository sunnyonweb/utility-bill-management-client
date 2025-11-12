import React from "react";
import BannerSection from "../Component/Home/BannerSection";
import CategorySection from "../Component/Home/CategorySection";
import RecentBillsSection from "../Component/Home/RecentBillsSection";
import SecurityFeature from "../Component/Home/SecurityFeature";
import HighlightsSection from "../Component/Home/HighlightsSection";
import Financial from "../Component/Home/Financial";

const Home = () => {
  return (
    <div className="min-h-screen bg-base-100 dark:bg-base-200">
      <div className="container mx-auto px-4 py-8 space-y-16">
        <BannerSection></BannerSection>
        <HighlightsSection></HighlightsSection>
        <CategorySection></CategorySection>
        <RecentBillsSection></RecentBillsSection>
        <Financial></Financial>
        <SecurityFeature></SecurityFeature>
      </div>
    </div>
  );
};

export default Home;
