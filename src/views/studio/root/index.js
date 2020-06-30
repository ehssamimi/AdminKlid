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
const Studios = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Studios/Root/CurrentStudio/Studios.js')
);
const StudiosInRow = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Studios/Root/CurrentStudio/StudiosInRows/StudiosInRow')
);
const StudioClass = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Studios/Root/CurrentStudio/StudioClass/StudioClass')
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
                        <Route
                            path={`${match.url}/current/:id?`}
                            render={props => <StudiosInRow {...props} />}
                        />
                        <Route
                            path={`${match.url}/studios`}
                            render={props => <Studios {...props} />}
                        />
                        <Route
                            path={`${match.url}/class/:id?`}
                            render={props => <StudioClass {...props} />}
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
