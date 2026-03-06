import { motion } from "framer-motion";

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="header"
    >
      {/* Logo */}
      <span className="header__logo">
        G-Scores
      </span>

      {/* Mobile */}
      <button
        onClick={onMenuToggle}
        className="header__menu-btn"
        aria-label="Toggle menu"
      >
        ☰
      </button>
    </motion.header>
  );
}

export default Header;