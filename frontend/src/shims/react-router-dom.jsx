import React, { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext({
  pathname: window.location.pathname || '/',
  navigate: () => {},
  params: {},
  outlet: null
});

export function BrowserRouter({ children }) {
  const [pathname, setPathname] = useState(window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to, options) => {
    if (typeof to === 'number') {
      window.history.go(to);
      return;
    }
    const target = to.startsWith('/') ? to : '/' + to;
    if (options && options.replace) {
      window.history.replaceState({}, '', target);
    } else {
      window.history.pushState({}, '', target);
    }
    setPathname(target);
  };

  return (
    <RouterContext.Provider value={{ pathname, navigate, params: {}, outlet: null }}>
      {children}
    </RouterContext.Provider>
  );
}

function matchPath(routePattern, currentPath, isPrefix = false) {
  if (routePattern === '*') return { matches: true, params: {} };
  if (!routePattern) return { matches: false, params: {} };

  const isWildcard = routePattern.endsWith('/*');
  const cleanPattern = isWildcard ? routePattern.slice(0, -2) : routePattern;

  const patternParts = cleanPattern.split('/').filter(Boolean);
  const pathParts = currentPath.split('/').filter(Boolean);

  if (!isWildcard && !isPrefix && patternParts.length !== pathParts.length) {
    return { matches: false, params: {} };
  }
  if ((isWildcard || isPrefix) && pathParts.length < patternParts.length) {
    return { matches: false, params: {} };
  }

  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    const p = patternParts[i];
    if (p.startsWith(':')) {
      params[p.slice(1)] = pathParts[i];
    } else if (p.toLowerCase() !== pathParts[i]?.toLowerCase()) {
      return { matches: false, params: {} };
    }
  }

  return { matches: true, params };
}

export function Routes({ children }) {
  const { pathname, navigate } = useContext(RouterContext);

  const routes = React.Children.toArray(children).filter(React.isValidElement);

  for (const route of routes) {
    const { path, element, children: subRoutes, index } = route.props;

    // Direct match or parent match
    if (path) {
      const hasSubRoutes = Boolean(subRoutes);
      const parentMatch = matchPath(path, pathname, hasSubRoutes);

      if (parentMatch.matches) {
        // Check sub routes (nested)
        let matchedChildElement = null;
        let combinedParams = { ...parentMatch.params };

        if (hasSubRoutes) {
          const subRouteList = React.Children.toArray(subRoutes).filter(React.isValidElement);
          // Try to match sub route
          const basePath = path.replace(/\/\*$/, '');
          const subPath = pathname.slice(basePath.length) || '/';

          let hasSubMatch = false;
          for (const sub of subRouteList) {
            if (sub.props.index && (subPath === '/' || subPath === '')) {
              matchedChildElement = sub.props.element;
              hasSubMatch = true;
              break;
            }
            if (sub.props.path) {
              const subMatch = matchPath(sub.props.path, subPath);
              if (subMatch.matches) {
                matchedChildElement = sub.props.element;
                combinedParams = { ...combinedParams, ...subMatch.params };
                hasSubMatch = true;
                break;
              }
            }
          }

          // If this parent route has subroutes, only consider it a match if a child matched
          if (!hasSubMatch) {
            continue;
          }
        }

        return (
          <RouterContext.Provider value={{ pathname, navigate, params: combinedParams, outlet: matchedChildElement }}>
            {element}
          </RouterContext.Provider>
        );
      }
    }
  }

  return null;
}

export function Route(props) {
  return props.element || null;
}

export function Outlet() {
  const { outlet } = useContext(RouterContext);
  return outlet || null;
}

export function Navigate({ to, replace }) {
  const { navigate } = useContext(RouterContext);
  useEffect(() => {
    navigate(to, { replace });
  }, [to, replace, navigate]);
  return null;
}

export function Link({ to, children, className, style, ...rest }) {
  const { navigate } = useContext(RouterContext);

  const handleClick = (e) => {
    if (!to.startsWith('http') && !to.startsWith('mailto')) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} style={style} {...rest}>
      {children}
    </a>
  );
}

export function NavLink({ to, children, className, style, end, ...rest }) {
  const { pathname, navigate } = useContext(RouterContext);

  const isActive = end ? pathname === to : pathname === to || pathname.startsWith(to + '/');

  const computedClass = typeof className === 'function' ? className({ isActive }) : className;
  const computedStyle = typeof style === 'function' ? style({ isActive }) : style;

  const handleClick = (e) => {
    if (!to.startsWith('http')) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={handleClick} className={computedClass} style={computedStyle} {...rest}>
      {typeof children === 'function' ? children({ isActive }) : children}
    </a>
  );
}

export function useNavigate() {
  const { navigate } = useContext(RouterContext);
  return navigate;
}

export function useParams() {
  const { params } = useContext(RouterContext);
  return params || {};
}

export function useLocation() {
  const { pathname } = useContext(RouterContext);
  return { pathname, search: '', hash: '' };
}

export default {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  Link,
  NavLink,
  useNavigate,
  useParams,
  useLocation
};
