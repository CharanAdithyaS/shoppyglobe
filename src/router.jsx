import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Layout = lazy(() => import('./components/Layout'));
const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Cart = lazy(() => import('./components/Cart'));
const Checkout = lazy(() => import('./components/Checkout'));
const NotFound = lazy(() => import('./components/NotFound'));

function PageLoader() {
  return (
    <div className="page-loader">
      <p>Loading page...</p>
    </div>
  );
}

function withSuspense(Component) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(Layout),
    children: [
      {
        index: true,
        element: withSuspense(ProductList),
      },
      {
        path: 'product/:id',
        element: withSuspense(ProductDetail),
      },
      {
        path: 'cart',
        element: withSuspense(Cart),
      },
      {
        path: 'checkout',
        element: withSuspense(Checkout),
      },
      {
        path: '*',
        element: withSuspense(NotFound),
      },
    ],
    errorElement: withSuspense(NotFound),
  },
]);

export default router;
