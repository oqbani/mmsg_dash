import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavLinksContext } from "./NavLinksProvider";
const Nav: React.FC = () => {
  const navlinks = useContext(NavLinksContext);
  const location = useLocation();
  if (!navlinks || navlinks.length === 0) {
    return <div>Erreur de navigation</div>;
  }

  const [active, setActive] = useState<string>(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  

  return (
    <div className="sidenav">
      {navlinks.map((link, index) => (
        <li key={index} onClick={() => setActive(link.slug)}>
          <Link
            to={`/${link.slug}`}
            className={active === link.slug ? 'active' : ""}
          >
            <div className="icon">
              <p className="circle"></p>
              <link.icon />
            </div>
            <span>{link.link.toUpperCase()}</span>
          </Link>
        </li>
      ))}
    </div>
  );
};

export default Nav;
