import axios, { AxiosError } from "axios";
import type { ScoreApiResponse, Student, Top10StudentApiResponse } from "../types";
import { convertScoreDataToStudent, convertTop10DataToStudent } from "../utils/ScoreConverter";
import apiClient from "./api";

/**
 * Fetch student score by ID
 */
export const fetchStudentScore = async (studentId: string): Promise<Student> => {
  try {
    const response = await apiClient.get<ScoreApiResponse>(`/score/${studentId}`);

    if (!response.data.success || !response.data.data) {
      throw new Error("Invalid API response");
    }

    return convertScoreDataToStudent(response.data.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      if (axiosError.response?.status === 404) {
        throw new Error("Student not found");
      }
      
      if (axiosError.code === "ECONNABORTED") {
        throw new Error("Request timeout");
      }
      
      if (axiosError.code === "ERR_NETWORK") {
        throw new Error("Network error. Please check your connection.");
      }
      
      throw new Error(`API error: ${axiosError.response?.status || "Unknown"}`);
    }
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error("Failed to fetch student score");
  }
};

/**
 * Fetch top 10 students with highest total scores
 */
export const fetchTop10Students = async (): Promise<Student[]> => {
  try {
    const response = await apiClient.get<Top10StudentApiResponse>(`/score/top10`);
    if (!response.data.success || !response.data.data) {
      throw new Error("Invalid API response");
    }
    return response.data.data.map(convertTop10DataToStudent);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      if (axiosError.code === "ECONNABORTED") {
        throw new Error("Request timeout");
      }

      if (axiosError.code === "ERR_NETWORK") {
        throw new Error("Network error. Please check your connection.");
      }

      throw new Error(`API error: ${axiosError.response?.status || "Unknown"}`);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to fetch top 10 students");
  }
};
