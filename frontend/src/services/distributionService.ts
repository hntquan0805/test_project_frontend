import axios, { AxiosError } from "axios";
import type { AllStudentsCountApiResponse, DistributionApiResponse, SubjectData } from "../types";
import apiClient from "./api";

/**
 * Fetch score distribution for all subjects
 */
export const fetchScoreDistribution = async (): Promise<SubjectData> => {
  try {
    const response = await apiClient.get<DistributionApiResponse>("/score/statistics");

    if (!response.data.success || !response.data.data) {
      throw new Error("Invalid API response");
    }

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      if (axiosError.response?.status === 404) {
        throw new Error("Score distribution not found");
      }
      
      if (axiosError.response?.status === 500) {
        throw new Error("Server error occurred");
      }
      
      throw new Error(axiosError.message || "Failed to fetch score distribution");
    }
    
    throw new Error("An unexpected error occurred");
  }
};

/**
 * Fetch total count of all students
 */
export const fetchAllStudentsCount = async (): Promise<number> => {
  try {
    const response = await apiClient.get<AllStudentsCountApiResponse>("/score/all");
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message || "Failed to fetch all students count");
    }
    throw new Error("An unexpected error occurred");
  }
};
