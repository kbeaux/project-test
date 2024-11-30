import { useTranslation } from "react-i18next";
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
interface PropertyGalleryProps {
  images: string[];
}
export function PropertyGallery({
  images
}: PropertyGalleryProps) {
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlePrevious = () => {
    setCurrentImage(prev => prev === 0 ? images.length - 1 : prev - 1);
  };
  const handleNext = () => {
    setCurrentImage(prev => prev === images.length - 1 ? 0 : prev + 1);
  };
  return <>
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
          <img src={images[currentImage] || 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2940&auto=format&fit=crop'} alt={t("property")} className="w-full h-full object-cover cursor-pointer" onClick={() => setIsModalOpen(true)} />
        </div>

        {images.length > 1 && <>
            <button onClick={handlePrevious} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100">
              <ChevronRight className="h-6 w-6" />
            </button>
          </>}

        {images.length > 1 && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => <button key={index} onClick={() => setCurrentImage(index)} className={`w-2 h-2 rounded-full ${currentImage === index ? 'bg-white' : 'bg-white/50'}`} />)}
          </div>}
      </div>

      {/* Modal */}
      {isModalOpen && <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-white hover:text-gray-300">
            <X className="h-8 w-8" />
          </button>

          <div className="relative max-w-7xl mx-auto px-4">
            <img src={images[currentImage]} alt={t("property")} className="max-h-[90vh] w-auto mx-auto" />

            {images.length > 1 && <>
                <button onClick={handlePrevious} className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300">
                  <ChevronLeft className="h-12 w-12" />
                </button>
                <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300">
                  <ChevronRight className="h-12 w-12" />
                </button>
              </>}
          </div>
        </div>}
    </>;
}