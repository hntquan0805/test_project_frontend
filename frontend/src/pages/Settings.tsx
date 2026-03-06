import { motion } from "framer-motion";

const Settings = () => {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-navy-600 tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-gray-400 mt-1 font-normal">
          Manage your account and preferences
        </p>
      </div>

      <motion.div
        className="settings_placeholder"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <p className="text-5xl" aria-hidden="true">⚙️</p>
        <p className="text-lg font-bold text-navy-600">Settings Coming Soon</p>
        <p className="text-sm text-slate-400 font-normal max-w-xs">
          Account and configuration options will be available here.
        </p>
      </motion.div>
    </>
  );
}

export default Settings;