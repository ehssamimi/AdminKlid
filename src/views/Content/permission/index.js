import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const SetPermissionToAllVideo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Content/Permissions/SetPermissionToAllVideo/SetPermissionToAllVideo')
);


class App extends Component {
  render() {
    const { match } = this.props;

    return (

        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect exact from={`${match.url}/`} to={`${match.url}/access-all`} />
              <Route
                path={`${match.url}/access-all`}
                render={props => <SetPermissionToAllVideo {...props} />}
              />
              {/*<Route*/}
                {/*path={`${match.url}/second-menu`}*/}
                {/*render={props => <SecondMenu {...props} />}*/}
              {/*/>*/}
              {/*<Route*/}
                {/*path={`${match.url}/blank-page`}*/}
                {/*render={props => <BlankPage {...props} />}*/}
              {/*/>*/}
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
