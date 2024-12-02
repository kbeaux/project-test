import { useNavigate } from "react-router-dom";
import { VideoHero } from "@/components/home/VideoHero";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { MarketHighlights } from "@/components/home/MarketHighlights";
import { FeaturedAgents } from "@/components/home/FeaturedAgents";
import { CTASection } from "@/components/home/CTASection";
import { PropertySearchParams } from "@/types/search";

export function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (params: PropertySearchParams) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.append(key, value.toString());
      }
    });
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <div>
      <VideoHero onSearch={handleSearch} />
      <FeaturedProperties />
      <MarketHighlights />
      <FeaturedAgents />
      <CTASection />
    </div>
  );
}
