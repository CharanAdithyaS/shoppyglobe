import { useState } from 'react';
import PropTypes from 'prop-types';

// lazy loads images so page feels faster on slow connections
function LazyImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`lazy-image-wrap ${loaded ? 'is-loaded' : ''}`}>
      {!loaded && <div className="lazy-image-placeholder" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

LazyImage.defaultProps = {
  className: '',
};

export default LazyImage;
