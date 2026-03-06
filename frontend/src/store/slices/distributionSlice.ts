import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { SubjectData } from '../../types';
import { fetchAllStudentsCount, fetchScoreDistribution } from '../../services/distributionService';

interface ScoresState {
  data: SubjectData | null;
  allStudentsCount: number | null;
  loading: boolean;
  allStudentsCountLoading: boolean;
  error: string | null;
  allStudentsCountError: string | null;
}

const initialState: ScoresState = {
  data: null,
  allStudentsCount: null,
  loading: false,
  allStudentsCountLoading: false,
  error: null,
  allStudentsCountError: null,
};

export const fetchSubjectScores = createAsyncThunk<SubjectData, void>(
  'scores/fetchSubjectScores',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchScoreDistribution();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const fetchTotalStudentsCount = createAsyncThunk<number, void>(
  'scores/fetchTotalStudentsCount',
  async (_, { rejectWithValue }) => {
    try {
      const count = await fetchAllStudentsCount();
      return count;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const scoresSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjectScores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjectScores.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSubjectScores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTotalStudentsCount.pending, (state) => {
        state.allStudentsCountLoading = true;
        state.allStudentsCountError = null;
      })
      .addCase(fetchTotalStudentsCount.fulfilled, (state, action) => {
        state.allStudentsCountLoading = false;
        state.allStudentsCount = action.payload;
      })
      .addCase(fetchTotalStudentsCount.rejected, (state, action) => {
        state.allStudentsCountLoading = false;
        state.allStudentsCountError = action.payload as string;
      });
  },
});

export default scoresSlice.reducer;