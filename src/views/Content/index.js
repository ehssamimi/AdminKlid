import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';


const Courses = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './../../Component/Content/Courses/Courses')
);const CourseDetail = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './../../Component/Content/CourseDetail/CourseDetail')
);


class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect exact from={`${match.url}/`} to={`${match.url}/courses`} />
              <Route
                path={`${match.url}/courses/:id?`}
                render={props => <Courses {...props} />}
              />
                <Route
                path={`${match.url}/course/:id`}
                render={props => <CourseDetail {...props} />}
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
