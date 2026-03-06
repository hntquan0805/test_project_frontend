import { motion } from "framer-motion";

interface ScoreCardProps {
  student: {
    name?: string;
    regNumber: string;
    scores: Record<string, number | null>;
  };
}

const ScoreCard = ({ student }: ScoreCardProps) => {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_24px_rgba(26,35,126,0.10)]
                 border border-blue-50"
    >
      {/* Student header */}
      <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100">
        <div className="min-w-0">
          <p className="text-base font-bold text-gray-900 truncate">
            {student.name || `Student ${student.regNumber}`}
          </p>
          <p className="text-[0.8125rem] text-gray-400 mt-0.5">
            Registration No: {student.regNumber}
          </p>
        </div>
      </div>

      {/* Scores grid */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(student.scores).map(([subject, score]) => (
          <motion.div
            key={subject}
            className="score-card__item"
          >
            <p className="score-card__subject">
              {subject}
            </p>
            <p className={score !== null ? "score-card__value" : "score-card__value score-card__value--empty"}>
              {score !== null ? score : "---"}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ScoreCard;