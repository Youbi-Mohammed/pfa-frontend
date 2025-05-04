import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store'; // Assure-toi d'avoir ce type

interface TestState {
  protectedData: string | null;
  isLoading: boolean;
  isError: boolean;
  message: string;
}
import {
    AuthState,
    LoginData,
    RegisterData,
    ErrorResponse,
    DecodedToken,
    User,
    UserLogin,
  } from '../../types/authTypes'
  
const initialState: TestState = {
  protectedData: null,
  isLoading: false,
  isError: false,
  message: '',
};

export const fetchProtectedData = createAsyncThunk<string, void, { 
  state: RootState,
  rejectValue: ErrorResponse 
}>(
  'test/fetchProtectedData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const { user } = auth;
      
      if (!user?.token) {
        return rejectWithValue({ message: 'Authentification requise' });
      }

      const response = await axios.get('http://localhost:8080/api/test/debug', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as ErrorResponse);
      }
      return rejectWithValue({ 
        message: 'Erreur réseau ou serveur indisponible' 
      });
    }
  }
);

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    clearTestData: (state) => {
      state.protectedData = null;
      state.message = '';
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProtectedData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(fetchProtectedData.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.protectedData = action.payload;
      })
      .addCase(fetchProtectedData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'Erreur inconnue';
      });
  },
});

export const { clearTestData } = testSlice.actions;
export default testSlice.reducer;