import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from 'routers';
import DefaultLayout from '@components/Layout/DefaultLayout';
import { Fragment } from 'react';
import AuthContextProvider from 'context/AuthContext';
import ProtectedRoute from 'routers/ProtectedRoute';
// import './App.css';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Router>
          <Routes>
            {publicRoutes.map((route) => {
              let Layout = DefaultLayout
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }
              const Page = route.component;
              return (
                <Route
                  exact={true}
                  key={route.path}
                  path={route.path}
                  element={
                    (
                      <Layout>
                        <Page />
                      </Layout>)

                  } />)
            })}
            {privateRoutes.map((route) => {
              let Layout = DefaultLayout
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }
              return (
                <Route
                  exact={true}
                  key={route.path}
                  path={route.path}
                  element={
                    (
                      <Layout>
                        <ProtectedRoute component={route.component} />
                      </Layout>)

                  } />)
            })}
          </Routes>
        </Router>
      </AuthContextProvider>

    </>

  );
}

export default App;
