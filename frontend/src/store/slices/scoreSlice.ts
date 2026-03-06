import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Student } from "../../types";
import { fetchStudentScore, fetchTop10Students } from "../../services/scoreService";

interface ScoreState {
  currentStudent: Student | null;
  top10Students: Student[];
  loading: boolean;
  top10Loading: boolean;
  error: string | null;
  top10Error: string | null;
}

const initialState: ScoreState = {
  currentStudent: null,
  top10Students: [],
  loading: false,
  top10Loading: false,
  error: null,
  top10Error: null,
};

export const fetchScore = createAsyncThunk<
  Student,
  string,
  { rejectValue: string }
>(
  "score/fetchScore",
  async (studentId: string, { rejectWithValue }) => {
    try {
      const student = await fetchStudentScore(studentId);
      return student;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const fetchTop10 = createAsyncThunk<
  Student[],
  void,
  { rejectValue: string }
>(
  "score/fetchTop10",
  async (_, { rejectWithValue }) => {
    try {
      const students = await fetchTop10Students();
      return students;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    clearScore: (state) => {
      state.currentStudent = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearTop10Error: (state) => {
      state.top10Error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScore.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentStudent = null;
      })
      .addCase(fetchScore.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStudent = action.payload;
        state.error = null;
      })
      .addCase(fetchScore.rejected, (state, action) => {
        state.loading = false;
        state.currentStudent = null;
        state.error = action.payload || "Failed to fetch student score";
      })
      .addCase(fetchTop10.pending, (state) => {
        state.top10Loading = true;
        state.top10Error = null;
      })
      .addCase(fetchTop10.fulfilled, (state, action) => {
        state.top10Loading = false;
        state.top10Students = action.payload;
        state.top10Error = null;
      })
      .addCase(fetchTop10.rejected, (state, action) => {
        state.top10Loading = false;
        state.top10Students = [];
        state.top10Error = action.payload || "Failed to fetch top 10 students";
      });
  },
});

export const { clearScore, clearError, clearTop10Error } = scoreSlice.actions;
export default scoreSlice.reducer;
