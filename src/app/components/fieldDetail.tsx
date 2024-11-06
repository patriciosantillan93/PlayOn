// FieldDetails.tsx
import React from 'react';

interface FieldDetailProps {
  title: string;
  content: string;
  imageUrl?: string;
}

const FieldDetail: React.FC<FieldDetailProps> = ({ title, content, imageUrl }) => {
  return (
    <div className="field-container">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="field-image" />
      )}
      <div className="field-details">
        <h2 className="card-title">{title}</h2>
        <p className="card-content">{content}</p>
      </div>
    </div>
  );
};

export default FieldDetail;