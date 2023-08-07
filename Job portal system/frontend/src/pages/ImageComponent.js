import React from 'react';
import './css/jobs.css';
const ImageComponent = ({ imageName }) => {
  const imagePath = `/companylogo/${imageName}`;
  return <img src={require('./companylogo/'+imageName)} alt={'./companylogo/'+imageName} className="img-fluid"/>;
};

export default ImageComponent;
