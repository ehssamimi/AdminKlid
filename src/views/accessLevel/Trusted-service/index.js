import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const Show = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './../../../Component/Access_level/TrustedService/Show/ShowTrustedService')
);
const Create = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './../../../Component/Access_level/TrustedService/Create/CreateTrustedService')
);


class App extends Component {
  render() {
    const { match } = this.props;

    return (

        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect exact from={`${match.url}/`} to={`${match.url}/show`} />
              <Route
                path={`${match.url}/show`}
                render={props => <Show {...props} />}
              />
                <Route
                path={`${match.url}/create/:Id?`}
                render={props => <Create {...props} />}
              />

              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>

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
