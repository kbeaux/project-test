import { useTranslation } from "react-i18next";
import { useRef, useEffect } from 'react';
import { HeroSearch } from './HeroSearch';
import { PropertySearchParams } from '@/types/search';
interface VideoHeroProps {
  onSearch: (params: PropertySearchParams) => void;
}
export function VideoHero({
  onSearch
}: VideoHeroProps) {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Video autoplay failed:', error);
      });
    }
  }, []);
  return <div className="relative h-[80vh] overflow-hidden">
      <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" poster="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2940&auto=format&fit=crop">
        <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eba0aa30f52a7a3577af8969f4fc36461cd14&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />{t("your.browser.does.not.support.the.video.tag.")}</video>
      
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t("find.your.perfect.commercial.space")}</h1>
          <p className="text-xl md:text-2xl mb-12">{t("discover.premium.commercial.properties.in.prime.locations")}</p>
          <HeroSearch onSearch={onSearch} />
        </div>
      </div>
    </div>;
}