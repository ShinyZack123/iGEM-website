import { useLocation } from "react-router-dom";
import "../assets/css/header.css";

interface HeaderProps {
  title: string;
  lead: string;
}

export function Header({ title, lead }: HeaderProps) {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <header className="header-hero">
      <div className="header-container">
        <h1 className="header-title">{title}</h1>
        <p className="header-lead">{lead}</p>
      </div>
    </header>
  );
}
