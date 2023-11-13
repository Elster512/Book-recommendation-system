import React from "react";
import { Link } from "react-router-dom";
interface ICustomLinkProps {
  children: React.ReactNode;
  to: string;
}
const CustomLink: React.FC<ICustomLinkProps> = ({ children, to }) => {
  return (
    <Link
      to={`/${to}`}
      style={{
        textDecoration: "none",
        width: "min-content",
        height: "min-content",
      }}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
