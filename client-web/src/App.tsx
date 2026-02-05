import { Suspense, useEffect } from 'react';
import { axiosInterceptor } from './config/axiosInterceptor';
import { useAuthStore } from './features/auth/store/useAuthStore';
import routerMeta from './router/routerMeta';
import { ErrorBoundary } from "react-error-boundary";
import { QueryClientProvider, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { queryClient } from './shared/lib/queryClient';
import { Route, Routes } from 'react-router-dom';
import { lazyImport } from './router/lazyImports';
import LoadingFallback from './shared/ui/LoadingFallback';
import ErrorFallback from './shared/ui/ErrorFallback';
import ProtectedRoute from './router/ProtectedRoute';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from './shared/ui/Navbar';
import './App.css'

axiosInterceptor();

const authRoutes = [routerMeta.LoginPage, routerMeta.RegisterPage];

const layoutRoutes = Object.keys(routerMeta)
  .map((key) => routerMeta[key])
  .filter((route) => !authRoutes.includes(route));

function App() {
  const { reset } = useQueryErrorResetBoundary();
  const { getCurrentUser, isAuthenticated, accessToken } = useAuthStore();

  // Obtener usuario actual al iniciar la app si hay token
  useEffect(() => {
    if (isAuthenticated && accessToken) {
      getCurrentUser();
    }
  }, [isAuthenticated, getCurrentUser, accessToken]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {authRoutes.map((meta) => {
            const Component = lazyImport(meta.feature!, meta.site!, meta.page!);

            return (
              <Route
                key={meta.path}
                path={meta.path}
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <ErrorBoundary
                      onReset={reset}
                      fallbackRender={({ resetErrorBoundary }) => (
                        <ErrorFallback resetErrorBoundary={resetErrorBoundary} />
                      )}
                    >
                      <Component />
                    </ErrorBoundary>
                  </Suspense>
                }
              />
            );
          })}

          {/* Rutas con Layout */}
          <Route element={<Navbar />}>
            {layoutRoutes.map((meta) => {
              const Component = lazyImport(meta.feature!, meta.site!, meta.page!);

              // Si la ruta es privada (site === 'private'), protegerla
              const element = (
                <Suspense fallback={<LoadingFallback />}>
                  <ErrorBoundary
                    onReset={reset}
                    fallbackRender={({ resetErrorBoundary }) => (
                      <ErrorFallback resetErrorBoundary={resetErrorBoundary} />
                    )}
                  >
                    <Component />
                  </ErrorBoundary>
                </Suspense>
              );

              // Verificar si la ruta requiere autenticación
              const isPrivateRoute = meta.site === 'private';

              return (
                <Route
                  key={meta.path}
                  path={meta.path}
                  element={
                    isPrivateRoute ? (
                      <ProtectedRoute path={meta.path}>
                        {element}
                      </ProtectedRoute>
                    ) : (
                      element
                    )
                  }
                />
              );
            })}
          </Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  )
}

export default App
