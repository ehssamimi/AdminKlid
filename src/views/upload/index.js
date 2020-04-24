import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';

const Upload = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './../../Component/Upload/UploadVideos')
);


class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect exact from={`${match.url}/`} to={`${match.url}/upload-video`} />
              <Route
                path={`${match.url}/upload-video`}
                render={props => <Upload {...props} />}
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
