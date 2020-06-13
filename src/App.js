import React, {Component, Suspense, useContext} from 'react';
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
import AuthRoute from "./Component/Common/AuthRoute/AuthRoute";
import UserProvider, {UserContext} from "./Component/Common/Context/UserProvider";
import Courses from "./Component/Content/Courses/Courses";

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
const Exit = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views/ExitView')
);
const ViewUpload = React.lazy(() =>
    import(/* webpackChunkName: "views-app" */ './views/upload/index')
);
const ViewAccessLevel = React.lazy(() =>
    import(/* webpackChunkName: "views-app" */ './views/accessLevel')
);
const ViewUser = React.lazy(() =>
    import(/* webpackChunkName: "views-user" */ './views/user')
);
const ViewStudio = React.lazy(() =>
    import(/* webpackChunkName: "views-user" */ './views/studio')
);
const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app')
);
const ViewConfigure = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/configure/index')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);
const UnAuthRoute = ({ component: Component, ...rest }) => {
    const User=useContext(UserContext);
    let authUser=User.isLogIn;

    return (
        <Route
            {...rest}
            render={props =>
                !authUser ? (
                    <Component {...props} />
                ) : (
                    <>
                        <Redirect to="/content" />
                    </>

                )
            }
        />

    );
};









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

              <UserProvider>
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

                    <AuthRoute path="/user"  component={ViewUser} {...this.props}/>
                    <AuthRoute path="/content"  component={ViewCourse} {...this.props}/>
                    <AuthRoute path="/upload"  component={ViewUpload} {...this.props}/>
                    <AuthRoute path="/studio"  component={ViewStudio} {...this.props}/>
                    <AuthRoute path="/access-level"  component={ViewAccessLevel} {...this.props}/>

                    <AuthRoute path="/exit"  component={Exit} {...this.props}/>
                    <AuthRoute  path="/configure"  component={ViewConfigure} {...this.props} />
                    <UnAuthRoute  path="/login"  component={Login} {...this.props} />

                    {/*<Route*/}
                        {/*path="/login"*/}
                        {/*exact*/}
                        {/*render={props => <Login {...props} />}*/}
                    {/*/>*/}
                    <AuthRoute path="/"  component={ViewMain} {...this.props}/>


                    {/*<Route*/}
                        {/*path="/exit"*/}
                        {/*exact*/}
                        {/*render={props => <Exit {...props} />}*/}
                    {/*/>*/}

                    {/*<Route*/}
                        {/*path="/access-level"*/}
                        {/*render={props => <ViewAccessLevel {...props} />}*/}
                    {/*/>*/}
                    {/*<Route*/}
                        {/*path="/"*/}
                        {/*exact*/}
                        {/*render={props => <ViewMain {...props} />}*/}
                    {/*/>*/}


                  <Redirect to="/error" />
                </Switch>
              </Router>
            </Suspense>
              </UserProvider>
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
