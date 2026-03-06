import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchSubjectScores } from "../store/slices/distributionSlice";

const CHART_COLORS = {
  primary: "#1a237e",
  secondary: "#0d1b6e",
  accent: "#1e2fa0",
};

const SUBJECT_MAPPING: Record<string, string> = {
  math: "Mathematics",
  vietnamese: "Vietnamese",
  foreign_language: "Foreign Language",
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
  history: "History",
  geography: "Geography",
  civic_education: "Civic Education",
};

const Reports = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.distribution);

  useEffect(() => {
    dispatch(fetchSubjectScores());
  }, [dispatch]);

  const subjectCharts = useMemo(() => {
    if (!data) return [];
    
    return Object.entries(data).map(([subject, distribution]) => {
      const chartData = [
        { category: "X >= 8", count: distribution.excellent },
        { category: "6 <= X < 8", count: distribution.good },
        { category: "4 <= X < 6", count: distribution.average },
        { category: "0 <= X < 4", count: distribution.poor },
      ];

      return {
        subject: SUBJECT_MAPPING[subject] || subject,
        total: distribution.total,
        chartData,
      };
    });
  }, [data]);

  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-navy-600 tracking-tight">
          Reports
        </h1>
        <p className="text-sm text-gray-400 mt-1 font-normal">
          Score distribution by subject
        </p>
      </div>

      {loading ? (
        <motion.div
          className="reports__loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-2xl font-semibold text-navy-600">
            Loading reports
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.5, 1] }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.5, 1], delay: 0.2 }}
            >
              .
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.5, 1], delay: 0.4 }}
            >
              .
            </motion.span>
          </p>
        </motion.div>
      ) : error ? (
        <motion.div
          className="reports__error"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {error}
        </motion.div>
      ) : data && subjectCharts.length > 0 ? (
        <div className="space-y-8">
          {subjectCharts.map((chart, index) => (
            <motion.div
              key={chart.subject}
              className="reports__chart-container"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.1 }}
            >
              <h2 className="text-base font-bold text-navy-600 mb-4">
                {chart.subject} (Total: {chart.total} students)
              </h2>

              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chart.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis
                    dataKey="category"
                    tick={{ fill: "#64748b", fontSize: 15, dy: 15 }}
                  />
                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e0e7ff",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(26,35,126,0.1)",
                    }}
                    labelStyle={{ color: "#1a237e", fontWeight: "bold" }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {chart.chartData.map((_, idx) => (
                      <Cell
                        key={`cell-${idx}`}
                        fill={
                          idx % 3 === 0
                            ? CHART_COLORS.primary
                            : idx % 3 === 1
                            ? CHART_COLORS.secondary
                            : CHART_COLORS.accent
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          className="reports__placeholder"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <p className="text-5xl" aria-hidden="true">📋</p>
          <p className="text-lg font-bold text-navy-600">No Data Available</p>
          <p className="text-sm text-slate-400 font-normal max-w-xs">
            Unable to load report data at this time.
          </p>
        </motion.div>
      )}
    </>
  );
}

export default Reports;