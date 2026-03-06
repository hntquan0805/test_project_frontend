import { NavLink } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { LayoutDashboard, Search, BarChart3, Settings } from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Search Scores", to: "/search", icon: Search },
  { label: "Reports", to: "/reports", icon: BarChart3 },
  { label: "Settings", to: "/settings", icon: Settings },
];

const sidebarVariants: Variants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
};

const itemVariants: Variants = {
  hidden:  { x: -20, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.07 + 0.15, duration: 0.35, ease: "easeOut" },
  }),
};

const SidebarContent = ({ onClose, isCollapsed }: { onClose: () => void; isCollapsed?: boolean }) => {
  return (
    <div
      className="flex flex-col h-full py-7"
      style={{
        background: "linear-gradient(180deg, #f5c518 0%, #8fa832 45%, #2e8b6e 100%)",
      }}
    >
      {!isCollapsed && (
        <p className="px-6 text-2xl font-bold tracking-[2px]
                      uppercase text-black/40 select-none">
          Menu
        </p>
      )}

      <nav className="flex flex-col gap-0.5 mt-2">
        {NAV_ITEMS.map(({ label, to, icon: Icon }, i) => (
          <motion.div
            key={to}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <NavLink
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `nav-link-item${isActive ? " active" : ""}`
              }
              title={isCollapsed ? label : undefined}
            >
              <span className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                <Icon className={`${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'}`} />
                {!isCollapsed && <span>{label}</span>}
              </span>
            </NavLink>
          </motion.div>
        ))}
      </nav>
    </div>
  );
}

const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }: { 
  isOpen: boolean; 
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}) => {
  return (
    <>
      {/* ── Desktop ── */}
      <aside 
        className={`hidden md:block shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden shadow-[2px_0_16px_rgba(0,0,0,0.08)] transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-52'
        }`}
      >
        <SidebarContent onClose={onClose} isCollapsed={isCollapsed} />
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 hover:bg-white text-black/60 hover:text-black rounded-full p-2 shadow-lg transition-all"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className={`w-5 h-5 transition-transform duration-300 ${
                isCollapsed ? 'rotate-180' : ''
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>
          </button>
        )}
      </aside>

      {/* ── Mobile ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 top-16 bg-black/40 z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="sidebar__drawer"
            >
              <SidebarContent onClose={onClose} isCollapsed={false} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;