import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import PropTypes from 'prop-types';

const RouteProtection = ({ children }) => {
  const currentUserId = useSelector((store) => store.users.current_user_id);
  if (currentUserId) return children;
  return <Navigate to="/login" />;
};

export default RouteProtection;

RouteProtection.propTypes = {
  children: PropTypes.shape().isRequired,
};
