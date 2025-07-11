import { useState } from "react";
import styled from "styled-components";

const FALLBACK_IMAGE = "https://via.placeholder.com/300x300?text=Sin+imagen";

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`;

function SafeImage({ src, alt, ...rest }) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE);

  const handleError = () => {
    setImageSrc(FALLBACK_IMAGE); // usa imagen por defecto si falla
  };

  const handleLoad = (e) => {
    const img = e.target;
    if (img.naturalWidth > 2500 || img.naturalHeight > 2500) {
      console.warn(`⚠️ Imagen demasiado grande: ${img.naturalWidth}x${img.naturalHeight}`);
    }
  };

  return (
    <StyledImage
      src={imageSrc}
      alt={alt}
      onError={handleError}
      onLoad={handleLoad}
      {...rest}
    />
  );
}

export default SafeImage;

