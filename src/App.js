import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import AppLocale from './lang';
import ColorSwitcher from './components/common/ColorSwitcher';
import NotificationContainer from './components/common/react-notifications/NotificationContainer';
import { isMultiColorActive } from './constants/defaultValues';
import { getDirection } from './helpers/Utils';
import './assets/css/MyCss/MyStyle2.css'

const ViewMain = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views')
);
// const Login = React.lazy(() =>
//   import(/* webpackChunkName: "views" */ './Component/LoginSigup/LoginSigup')
// );
const ViewCourse = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views/Content/index')
);

const Login = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './Component/LoginSigup/LogIn')
);
const ViewUpload = React.lazy(() =>
    import(/* webpackChunkName: "views-app" */ './views/upload/index')
);
const ViewAccessLevel = React.lazy(() =>
    import(/* webpackChunkName: "views-app" */ './views/accessLevel')
);
// const ViewUser = React.lazy(() =>
//     import(/* webpackChunkName: "views-user" */ './views/user')
// );
const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);

class App extends Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }

  render() {
    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];

    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <React.Fragment>
            <NotificationContainer />
            {isMultiColorActive && <ColorSwitcher />}
            <Suspense fallback={<div className="loading" />}>
              <Router>
                <Switch>
                  <Route
                    path="/app"
                    render={props => <ViewApp {...props} />}
                  />
                  <Route
                    path="/error"
                    exact
                    render={props => <ViewError {...props} />}
                  />
                    {/*<Route*/}
                        {/*path="/user"*/}
                        {/*render={props => <ViewUser {...props} />}*/}
                    {/*/>   */}
                    <Route
                        path="/content"
                        render={props => <ViewCourse {...props} />}
                    />
                    <Route
                        path="/upload"
                        render={props => <ViewUpload {...props} />}
                    />
                    <Route
                        path="/access-level"
                        render={props => <ViewAccessLevel {...props} />}
                    />
                  <Route
                    path="/"
                    exact
                    render={props => <ViewMain {...props} />}
                  />
                    <Route
                    path="/login"
                    exact
                    render={props => <Login {...props} />}
                  />
                  <Redirect to="/error" />
                </Switch>
              </Router>
            </Suspense>
          </React.Fragment>
        </IntlProvider>
          <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale };
};
const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
