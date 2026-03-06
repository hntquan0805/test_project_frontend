import { useEffect, useState } from "react";
import { motion, type Variants, animate } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchTotalStudentsCount } from "../store/slices/distributionSlice";
import { fetchTop10 } from "../store/slices/scoreSlice";

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const AnimatedCounter = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.floor(latest));
      }
    });

    return controls.stop;
  }, [value]);

  return <>{displayValue.toLocaleString()}</>;
};

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { allStudentsCount, allStudentsCountLoading } = useSelector(
    (state: RootState) => state.distribution
  );
  
  const { top10Students, top10Loading } = useSelector(
    (state: RootState) => state.score
  );

  useEffect(() => {
    dispatch(fetchTotalStudentsCount());
    dispatch(fetchTop10());
  }, [dispatch]);

  return (
    <>
      {/* Page header */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-navy-600 tracking-tight">
          Welcome
        </h1>
        <p className="text-base text-gray-400 mt-3 font-normal">
          National High School Exam Results Dashboard
        </p>
      </div>

      {/* Total Students Card */}
      <motion.div
        className="mb-8 text-center"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div>
          <p className="text-6xl font-extrabold leading-none text-[#1a237e] mb-3">
            {allStudentsCountLoading ? "..." : allStudentsCount ? <AnimatedCounter value={allStudentsCount} /> : "0"}
          </p>
          <p className="text-base text-gray-400 font-normal">Total Students</p>
        </div>
      </motion.div>

      {/* Top 10 Students Table */}
      <motion.div
        className="bg-white rounded-2xl p-6 md:p-8 border border-blue-50
                   shadow-[0_2px_12px_rgba(26,35,126,0.07)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h2 className="text-base font-bold text-navy-600 mb-4">
          Top 10 Students - Group A (Math, Physics, Chemistry)
        </h2>
        
        {top10Loading ? (
          <p className="text-sm text-gray-400 font-normal">Loading...</p>
        ) : top10Students.length === 0 ? (
          <p className="text-sm text-gray-400 font-normal">No data available</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-navy-600">
                    Rank
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-navy-600">
                    Student ID
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-navy-600">
                    Total Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {top10Students.map((student, index) => (
                  <tr 
                    key={student.regNumber}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-navy-600">
                      {student.regNumber}
                    </td>
                    <td className="py-3 px-4 text-sm font-bold text-right text-[#d4a017]">
                      {student.total?.toFixed(2) || "0.00"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </>
  );
}

export default Dashboard;