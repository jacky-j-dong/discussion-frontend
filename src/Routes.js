/* eslint-disable react/no-array-index-key */
import React, {
  // lazy,
  Suspense,
  Fragment
} from 'react';
import {
  Switch,
  Redirect,
  Route,
  withRouter
} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
// import DocsLayout from 'src/layouts/DocsLayout';
// import MainLayout from 'src/layouts/MainLayout';
// import HomeView from 'src/views/pages/HomeView';
import FeedView from 'src/views/social/FeedView';
import LoginView from 'src/views/auth/LoginView';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthGuard from 'src/components/AuthGuard';
import GuestGuard from 'src/components/GuestGuard';

const routesConfig = [
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: LoginView
  },
  {
    exact: true,
    path: '/app',
    guard: AuthGuard,
    layout: DashboardLayout,
    component: FeedView
  },
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/app" />
  }

];

const renderRoutes = (routes) => (routes ? (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
) : null);

// const renderRoutes = (routes) => (
//   <Switch>
//     <Route exact path="/login" component={LoginView} />
//     <Route exact path="/app" component={FeedView} />
//     <Redirect exact from="/" to="/app" />
//   </Switch>
// );

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
