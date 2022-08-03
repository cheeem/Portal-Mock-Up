import './Nav.css'
import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const Nav = ({ linkList }) => {
  return (
    <div className="nav">
        <div className='nav-header'>
          <div className='nav-header-img'> </div>
          <p className='nav-header-title'> </p>
        </div>
        <ul className='nav-link-list'>
            {linkList.map((link, index) => <CustomLink key={index} to={link.path}> {link.label} </CustomLink>)} 
        </ul>
    </div>
  )
}

const CustomLink = ({ to, children, ...props }) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
      <li className={isActive ? 'nav-link-active' : 'nav-link-inactive'}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
}

export {
    Nav
}


