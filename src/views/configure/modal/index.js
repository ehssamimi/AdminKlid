import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';



const List = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Configure/POPUp/PopUpLists/PopUpLists')
);
const Add= React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Configure/POPUp/CreatePopUp')
);


class App extends Component {
  render() {
    const { match } = this.props;

    return (

        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect exact from={`${match.url}/`} to={`${match.url}/add`} />
              <Route
                path={`${match.url}/add`}
                render={props => <Add {...props} />}
              />
              <Route
                path={`${match.url}/list`}
                render={props => <List {...props} />}
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
