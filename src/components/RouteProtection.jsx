import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import PropTypes from 'prop-types';

const RouteProtection = ({ children }) => {
  const currentUserId = useSelector((store) => store.users.current_user?.id);
  if (currentUserId) return children;
  return <Navigate to="/login" />;
};

export default RouteProtection;

RouteProtection.propTypes = {
  children: PropTypes.elementType.isRequired,
};

/* Al utilizar *** PropTypes.elementType, ***
aseguras que se pase un COMPONENTE válido como
hijo en lugar de cualquier otro tipo de nodo React. */
