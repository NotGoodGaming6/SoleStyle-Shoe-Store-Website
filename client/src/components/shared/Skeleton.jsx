import React from 'react';

const Skeleton = ({ className, width, height, borderRadius = '0.5rem' }) => {
  return (
    <div 
      className={`skeleton ${className}`} 
      style={{ 
        width: width || '100%', 
        height: height || '1rem',
        borderRadius: borderRadius
      }}
    />
  );
};

export const ProductSkeleton = () => {
  return (
    <div className="group relative flex flex-col gap-4">
      <Skeleton height="300px" borderRadius="1rem" />
      <div className="flex flex-col gap-2 px-1">
        <Skeleton width="40%" height="0.75rem" />
        <Skeleton width="90%" height="1.25rem" />
        <div className="flex items-center gap-2 mt-2">
          <Skeleton width="30%" height="1.5rem" />
          <Skeleton width="20%" height="1rem" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
