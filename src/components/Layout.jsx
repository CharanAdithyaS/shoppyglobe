import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, selectSearchTerm } from '../redux/searchSlice';

const Header = lazy(() => import('./Header'));

function Layout() {
  const dispatch = useDispatch();
  const searchValue = useSelector(selectSearchTerm);

  return (
    <div className="app">
      <Suspense fallback={<div className="header-skeleton" />}>
        <Header
          onSearchChange={(value) => dispatch(setSearchTerm(value))}
          searchValue={searchValue}
        />
      </Suspense>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>© 2026 ShoppyGlobe — React Assignment Project</p>
      </footer>
    </div>
  );
}

export default Layout;
