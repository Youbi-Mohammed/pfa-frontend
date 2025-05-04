// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { RootState } from '../../app/store'; // Assure-toi d'avoir ce type

// interface TestState {
//   protectedData: string | null;
//   isLoading: boolean;
//   isError: boolean;
//   message: string;
// }
// import {
//     AuthState,
//     LoginData,
//     RegisterData,
//     ErrorResponse,
//     DecodedToken,
//     User,
//     UserLogin,
//   } from '../../types/authTypes'

//   import { ProjetData } from '../../types/projectTypes';
  
// interface TestState {
//     protectedData: string | null;
//     isLoading: boolean;
//     isError: boolean;
//     message: string;
//   }
  
// const initialState: TestState = {
//   protectedData: null,
//   isLoading: false,
//   isError: false,
//   message: '',
// };
// const API_URL = 'http://localhost:8080/api/Encadrant/project/'

// const userJson = localStorage.getItem('user')
// const user: User | null = userJson ? JSON.parse(userJson) : null

// export const createproject = createAsyncThunk<String,ProjetData, { 
//     state: RootState,
//     rejectValue: ErrorResponse 
//   }>(
//     'project/create',
//     async (projectData,  { getState, rejectWithValue }) =>{
   
//        try {
//           const { auth } = getState();
//           const { user } = auth;
          
//           if (!user?.token) {
//             return rejectWithValue({ message: 'Authentification requise' });
//           }
    
//             const response=await axios.post(API_URL+ 'create-projects', {projectData,
//     headers: {
//               Authorization: `Bearer ${user.token}`,
//             },
//           });
          
//           return response.data;
//         } catch (error) {
//           if (axios.isAxiosError(error) && error.response) {
//             return rejectWithValue(error.response.data as ErrorResponse);
//           }
//           return rejectWithValue({ 
//             message: 'Erreur réseau ou serveur indisponible' 
//           });
//         }
//       }
//     );



import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { ProjetData } from '../../types/projectTypes';

const API_URL = 'http://localhost:8080/api/Encadrant/project/';

interface ProjectState {
  projects: ProjetData[];
  currentProject: ProjetData | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
};

// Création d'un projet
export const createProject = createAsyncThunk(
  'projects/create',
  async (projectData: ProjetData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as RootState;
      const response = await axios.post(
        `${API_URL}create-projects`,
        projectData,
        {
          headers: {
            Authorization: `Bearer ${auth.user?.token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erreur de création');
    }
  }
);

// Récupération de tous les projets
export const fetchProjects = createAsyncThunk(
  'projects/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as RootState;
      const response = await axios.get(`${API_URL}my-projets`, {
        headers: {
          Authorization: `Bearer ${auth.user?.token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erreur de chargement');
    }
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    resetProjectState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    setCurrentProject: (state, action: PayloadAction<ProjetData | null>) => {
      state.currentProject = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Création
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state, action: PayloadAction<ProjetData>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects.push(action.payload);
        state.message = 'Projet créé avec succès';
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Récupération
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<ProjetData[]>) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
  }
});

export const { resetProjectState, setCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;