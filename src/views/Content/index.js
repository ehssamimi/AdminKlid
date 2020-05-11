import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
import TeacherDetails from "../../Component/Content/DetailsContentComponent/TeacherDetails/TeacherDetails";


const Courses = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './../../Component/Content/Courses/Courses')
);
const CourseDetail = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ '../../Component/Content/DetailsContentComponent/CourseDetail/CourseDetail')
);
const LessonDetails = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ '../../Component/Content/DetailsContentComponent/LessonDetails/LessonDetails')
);
const ChapterDetails = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ '../../Component/Content/DetailsContentComponent/ChapterDetails/ChapterDetails')
);
const ItemDetails = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ '../../Component/Content/DetailsContentComponent/ItemDetails/ItemDetails')
);
const InprogressVideo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ '../../Component/Content/InprogressVideo/InprogressVideo')
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
                path={`${match.url}/in-progress`}
                render={props => <InprogressVideo {...props} />}
              />
                <Route
                path={`${match.url}/courses/:id?`}
                render={props => <Courses {...props} />}
              />
                <Route
                path={`${match.url}/course/:id/:index?`}
                render={props => <CourseDetail {...props} />}
              />
                <Route
                path={`${match.url}/lesson/:id/:index/:lesson/:TeacherIndex?`}
                render={props => <LessonDetails {...props} />}
              />
                <Route
                path={`${match.url}/teacher/:id/:index/:lesson/:TeacherIndex/:teacher/:chapterIndex?`}
                render={props => <TeacherDetails {...props} />}
              />
                <Route
                path={`${match.url}/chapter/:id/:index/:lesson/:TeacherIndex/:teacher/:chapterIndex/:chapter/:itemIndex?`}
                render={props => <ChapterDetails {...props} />}
              />
                <Route
                path={`${match.url}/detail-item/:id/:index/:lesson/:TeacherIndex/:teacher/:chapterIndex/:chapter/:itemIndex`}
                render={props => <ItemDetails {...props} />}
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
