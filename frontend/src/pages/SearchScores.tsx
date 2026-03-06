import { useState, useEffect, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScoreCard from "../components/ScoreCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchScore, clearScore, clearError } from "../store/slices/scoreSlice";

const SearchScores = () => {
  const [regInput, setRegInput] = useState<string>("");
  const dispatch = useAppDispatch();
  const { currentStudent, loading, error } = useAppSelector((state) => state.score);

  useEffect(() => {
    return () => {
      dispatch(clearScore());
    };
  }, [dispatch]);

  const handleSearch = () => {
    if (error) {
      dispatch(clearError());
    }

    const trimmed = regInput.trim();
    if (!trimmed) {
      return;
    }

    dispatch(fetchScore(trimmed));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-navy-600 tracking-tight">
          Search Scores
        </h1>
        <p className="text-sm text-gray-400 mt-1 font-normal">
          Enter a registration number to view detailed results
        </p>
      </div>

      {/* Search card */}
      <div className="search__card">
        <h2 className="text-base font-bold text-navy-600 mb-5">
          User Registration
        </h2>

        <label
          htmlFor="reg-input"
          className="block text-[0.8125rem] text-gray-500 font-medium mb-2"
        >
          Registration Number:
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="reg-input"
            type="text"
            value={regInput}
            onChange={(e) => setRegInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter registration number"
            disabled={loading}
            className="search__input"
          />

          <motion.button
            type="button"
            onClick={handleSearch}
            disabled={loading}
            whileTap={!loading ? { y: 0 } : {}}
            className="search__submit-btn"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="inline-block"
                  aria-hidden="true"
                >
                  ⏳
                </motion.span>
                Searching...
              </span>
            ) : (
              "Submit"
            )}
          </motion.button>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error !== null && (
            <motion.p
              role="alert"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="search__error"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {currentStudent !== null ? (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-base font-bold text-navy-600 mb-4">
              Detailed Scores
            </h2>
            <ScoreCard student={currentStudent} />
          </motion.div>
        ) : (
          !loading && error === null && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="search__empty-state"
            >
              <p className="text-4xl mb-4" aria-hidden="true">🔍</p>
              <p className="text-base font-semibold text-slate-400">
                Enter a registration number to view scores
              </p>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </>
  );
}

export default SearchScores;