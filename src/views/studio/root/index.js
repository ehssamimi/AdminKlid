import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const RootRoomList = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Studios/Root/RootList/StudioList')
);
const RootRoomCreate = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Studios/Root/RootCreate/StudioCreate')
);
const StudioStep2 = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Studios/Root/RootList/Step2/StudioStep2')
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
                            render={props => <RootRoomList {...props} />}
                        />
                        <Route
                            path={`${match.url}/create`}
                            render={props => <RootRoomCreate {...props} />}
                        />
                        <Route
                            path={`${match.url}/details/:id?`}
                            render={props => <StudioStep2 {...props} />}
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
