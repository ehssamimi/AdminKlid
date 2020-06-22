import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const PackageList = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Studios/Package/Package-list/Package-list')
);
const PackageCreate = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Studios/Package/Package-create/PackageCreate')
);
const PackageDetail = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Studios/Package/PackageDetail/PackageDetail')
);
const PackageUpdate = React.lazy(() =>
    import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Studios/Package/PackageEdit/PackageEdit')
);
// const StudioStep2 = React.lazy(() =>
//     import(/* webpackChunkName: "viwes-gogo" */ '../../../Component/Studios/Root/RootList/Step2/StudioStep2')
// );


class App extends Component {
    render() {
        const { match } = this.props;

        return (

            <div className="dashboard-wrapper">
                <Suspense fallback={<div className="loading" />}>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={`${match.url}/create`} />
                        <Route
                            path={`${match.url}/list`}
                            render={props => <PackageList {...props} />}
                        />
                        <Route
                            path={`${match.url}/create`}
                            render={props => <PackageCreate {...props} />}
                        />
                        <Route
                            path={`${match.url}/detail/:id?`}
                            render={props => <PackageDetail {...props} />}
                        />
                        <Route
                            path={`${match.url}/update/:id?`}
                            render={props => <PackageUpdate {...props} />}
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
