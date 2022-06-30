import React from 'react';
import PropTypes from 'prop-types';

import './RecomendationsCarrousel.css';

function RecomendationsCarrousel({ children }) {
  return (
    <div
      className="recomendations"
    >
      {children}
    </div>
  );
}

RecomendationsCarrousel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecomendationsCarrousel;
