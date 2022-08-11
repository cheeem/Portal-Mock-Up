import './Nav.css'
import React, { useState, useEffect } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const Nav = ({ linkList }) => {

  const [selectedIndex, setSelectedIndex] = useState(linkList.findIndex(link => link.path === "/"));

  return (
    <div className="nav">
      <ul className="nav-list">
        <div data-indicator className="nav-indicator" style={{"--nav-selected": selectedIndex}}>
          <div className="nav-corners"></div>
        </div>
        {linkList.map((link, index) => (
          <CustomLink key={index} index={index} to={link.path} setSelectedIndex={setSelectedIndex}>
              <div className="nav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> {link.svgPath} </svg>
              </div>
              <div className="nav-icon-text">{link.label}</div>
          </CustomLink>
        ))}
      </ul>
    </div>
  )
}

const CustomLink = ({ to, index, setSelectedIndex, children, ...props }) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    useEffect(() => {
      if(isActive) setSelectedIndex(index);
    }, [isActive, index, setSelectedIndex]);

    return (
      <li className={isActive ? "nav-active" : ""} style={isActive ? {"--nav-selected": index} : {}}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
}

export {
    Nav
}


