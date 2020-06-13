import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const ClassRoomList = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Studios/ClassRoom/ClassRoomList/ClassRoomList')
);
const ClassRoomCreate = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Studios/ClassRoom/ClassRoomCreate/ClassRoomCreate')
);
const ClassRoomEdit = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Studios/ClassRoom/ClassRoomEdit/ClassRoomEdit')
);
const ClassRoomDetails = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Studios/ClassRoom/ClassRoomDetails/ClassRoomDetails')
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
                <Route
                path={`${match.url}/edit/:id?`}
                render={props => <ClassRoomEdit {...props} />}
              />
                <Route
                path={`${match.url}/detail/:id?`}
                render={props => <ClassRoomDetails {...props} />}
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
