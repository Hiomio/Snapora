import React from 'react';
import { Info, Star, Flag } from 'lucide-react';
import Link from 'next/link';
import TechnicalDetails from './sidebar/TechnicalDetails';
import LicenseInfo from './sidebar/LicenseInfo';
import RatingsReviews from './sidebar/RatingsReviews';
import RelatedImages from './sidebar/RelatedImages';
import ReportImage from './sidebar/ReportImage';

const Sidebar = ({ image, relatedImages }) => {
  return (
    <div className="col-span-1 lg:col-span-4 space-y-4 sm:space-y-6">
      {/* Technical details */}
      <div className="px-0 sm:px-4 lg:px-0">
        <TechnicalDetails image={image} />
      </div>
      
      {/* License info */}
      <div className="px-0 sm:px-4 lg:px-0">
        <LicenseInfo image={image} />
      </div>
      
      {/* Ratings & reviews */}
      <div className="px-0 sm:px-4 lg:px-0">
        <RatingsReviews imageId={image._id} />
      </div>
      
      {/* Related images */}
      <div className="px-0 sm:px-4 lg:px-0">
        <RelatedImages image={image} relatedImages={relatedImages} />
      </div>
      
      {/* Report section */}
      <div className="px-0 sm:px-4 lg:px-0">
        <ReportImage imageId={image._id} ownerId={image.user?._id} />
      </div>
    </div>
  );
};

export default Sidebar; 