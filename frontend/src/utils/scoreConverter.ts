import type { ScoreData, Student, Top10StudentData } from "../types";

export const convertScoreDataToStudent = (data: ScoreData): Student => {
  const scores: Record<string, number | null> = {};

  // Map all subjects from API to scores object
  const subjectMapping: Record<keyof Omit<ScoreData, "id" | "student_id" | "language_code">, string> = {
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

  Object.entries(subjectMapping).forEach(([key, label]) => {
    const scoreValue = data[key as keyof typeof subjectMapping];
    scores[label] = scoreValue !== null ? parseFloat(scoreValue) : null;
  });

  return {
    regNumber: data.student_id,
    scores,
  };
};

export const convertTop10DataToStudent = (data: Top10StudentData): Student => {
  // Map 3 subjects returned by the API for top 10 students
  const scores: Record<string, number | null> = {
    Mathematics: parseFloat(data.math),
    Physics: parseFloat(data.physics),
    Chemistry: parseFloat(data.chemistry),
  };

  return {
    regNumber: data.student_id,
    scores,
    total: parseFloat(data.total),
  };
};
