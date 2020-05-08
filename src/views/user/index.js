import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';

const UserAll = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../Component/User/UserShowAll/UserShowAll')
);
const UserInfo = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../Component/User/UserInfo/UserInfo')
);
const UserSignUp = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../Component/User/UserSignUp/UserSignUp')
);


class App extends Component {
    render() {
        const { match } = this.props;

        return (
            <AppLayout>
                <div className="dashboard-wrapper">
                    <Suspense fallback={<div className="loading" />}>
                        <Switch>
                            <Redirect exact from={`${match.url}/`} to={`${match.url}/all`} />
                            <Route
                                path={`${match.url}/all`}
                                render={props => <UserAll {...props} />}
                            />
                            <Route
                                path={`${match.url}/info/:phoneNumber?`}
                                render={props => <UserInfo {...props} />}
                            />
                            <Route
                                path={`${match.url}/sign-up`}
                                render={props => <UserSignUp {...props} />}
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
