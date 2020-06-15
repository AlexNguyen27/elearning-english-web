import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NotFound from '../layout/NotFound';

const ProtectedRoute = ({
  component: Component,
  authorized,
  auth: { isAuthenticated, isTeacher, isAdmin },
  student,
  dispatch,
  ...rest
}) => {
  const page = (props) => {
    if (isAuthenticated) {
      if (
        isAdmin || isTeacher ||
        (authorized && !isTeacher) ||
        (student && isTeacher) ||
        (authorized === undefined && !isTeacher)
      ) {
        return <Component {...props} dispatch={dispatch} />;
      }
      return (
        <NotFound
          alertText="Unauthorized"
          descriptionText="Sorry, you are not allowed to see this page"
        />
      );
    }
    return <Redirect to="/login" />;
  };

  return (
    <div>
      <Route {...rest} render={(props) => page(props)} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProtectedRoute);
