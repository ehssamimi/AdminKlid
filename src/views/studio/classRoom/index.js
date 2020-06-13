import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const ClassRoomList = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Studios/ClassRoom/ClassRoomList/ClassRoomList')
);
const ClassRoomCreate = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Studios/ClassRoom/ClassRoomCreate/ClassRoomCreate')
);


class App extends Component {
  render() {
    const { match } = this.props;

    return (

        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
              <Route
                path={`${match.url}/list`}
                render={props => <ClassRoomList {...props} />}
              />
                <Route
                path={`${match.url}/create`}
                render={props => <ClassRoomCreate {...props} />}
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
