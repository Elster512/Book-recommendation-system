import React from 'react';
import { Link } from 'react-router-dom';
interface ICustomLinkProps {
  children: React.ReactNode;
  to: string;
}
const CustomLink: React.FC<ICustomLinkProps> = ({ children, to }) => {
  return (
    <Link
      to={`/${to}`}
      style={{
        textDecoration: 'none',
        display: 'block',
        width: 'min-content',
        height: 'min-content',
      }}
      replace
    >
      {children}
    </Link>
  );
};

export default CustomLink;
