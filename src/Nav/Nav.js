import './Nav.css'
import React, { useState, useEffect } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const Nav = ({ linkList }) => {

  const [activeIndex, setActiveIndex] = useState(linkList.findIndex(link => link.path === "/"));
  const [hoverIndex, setHoverIndex] = useState(undefined);

  return (
    <div className="nav">
      <ul className="nav-list">
        <div data-indicator className="nav-indicator"
          style={{
            "--nav-selected-index": hoverIndex ?? activeIndex,
            "--nav-indicator-bg-color": hoverIndex === undefined ? "var(--highlight-2)" : "white"
          }}
        >
          <div className="nav-corners"></div>
        </div>
        {linkList.map((link, index) => (
          <CustomLink
            key={index}
            index={index}
            to={link.path}
            hoverIndex={hoverIndex}
            setHoverIndex={setHoverIndex}
            setActiveIndex={setActiveIndex}
          >
              <div className="nav-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                > {link.svgPath} </svg>
              </div>
              <div className="nav-icon-text">{link.label}</div>
          </CustomLink>
        ))}
      </ul>
    </div>
  )
}

const CustomLink = ({ to, index, hoverIndex, setHoverIndex, setActiveIndex, children, ...props }) => {
    const resolvedPath = useResolvedPath(to);
    const isHovered = hoverIndex === index;
    const otherLinkHovered = hoverIndex !== undefined;
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    useEffect(() => {
      if(isActive) setActiveIndex(index);
    }, [isActive, index, setActiveIndex]);

    return (
      <li className={isHovered || (isActive && !otherLinkHovered) ? "nav-selected" : ""}
        onMouseOver={() => setHoverIndex(index)}
        onMouseOut={() => setHoverIndex(undefined)}
      >
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
}

export {
    Nav
}


