import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import {
  AuthState,
  LoginData,
  RegisterData,
  ErrorResponse,
  DecodedToken,
  User,
  UserLogin,
} from '../../types/authTypes'

const API_URL = 'http://localhost:8080/api/auth/'

const userJson = localStorage.getItem('user')
const user: User | null = userJson ? JSON.parse(userJson) : null

const initialState: AuthState = {
  user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const register = createAsyncThunk<string, RegisterData, { rejectValue: ErrorResponse }>(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL + 'register', userData)
      return response.data.message
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data as ErrorResponse)
      }
      return thunkAPI.rejectWithValue({ message: 'Une erreur est survenue' })
    }
  }
)

export const login = createAsyncThunk<UserLogin, LoginData, { rejectValue: ErrorResponse }>(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL + 'login', userData)
      const token = response.data.token

      const decoded: DecodedToken = jwtDecode(token)

      const user: UserLogin = {
        email: decoded.email,
        roleId: Number(decoded.role), 
        token: token,
      }

      localStorage.setItem('user', JSON.stringify(user))
      return user

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data as ErrorResponse)
      }
      return thunkAPI.rejectWithValue({ message: 'Erreur de connexion' })
    }
  }
)

//  Logout
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user')
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload 
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload?.message || 'Erreur'
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload?.message || 'Erreur de connexion'
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
