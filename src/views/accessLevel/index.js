import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';

const Permission = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './permission')
);
const Roles = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './role')
);
const UserRole = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './User-role')
);
const TrustedService = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './Trusted-service')
);


class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect exact from={`${match.url}/`} to={`${match.url}/permission`} />
              <Route
                path={`${match.url}/permission`}
                render={props => <Permission {...props} />}
              />
                <Route
                path={`${match.url}/role`}
                render={props => <Roles {...props} />}
              />
                <Route
                path={`${match.url}/user-role`}
                render={props => <UserRole {...props} />}
              />       <Route
                path={`${match.url}/trusted_service`}
                render={props => <TrustedService {...props} />}
              />

              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
