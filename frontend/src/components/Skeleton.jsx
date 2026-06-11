import React from 'react';
import './Skeleton.css';

const Skeleton = ({ type = 'text', width, height, count = 1 }) => {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="skeleton-wrapper">
      {items.map((i) => (
        <div
          key={i}
          className={`skeleton skeleton-${type}`}
          style={{ width, height }}
        />
      ))}
    </div>
  );
};

export const MenuSkeleton = () => (
  <div className="menu-skeleton-grid">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="menu-skeleton-card">
        <div className="skeleton skeleton-image" style={{ height: 200 }} />
        <div className="menu-skeleton-body">
          <div className="skeleton skeleton-title" style={{ width: '70%' }} />
          <div className="skeleton skeleton-text" style={{ width: '100%' }} />
          <div className="skeleton skeleton-text" style={{ width: '60%' }} />
          <div className="skeleton skeleton-price" style={{ width: '30%' }} />
        </div>
      </div>
    ))}
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="table-skeleton">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="table-skeleton-row">
        {[1, 2, 3, 4].map((j) => (
          <div key={j} className="skeleton skeleton-cell" style={{ width: `${20 + j * 5}%` }} />
        ))}
      </div>
    ))}
  </div>
);

export default Skeleton;
