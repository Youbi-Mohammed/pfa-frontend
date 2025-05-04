// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import type { RootState, AppDispatch } from './store';

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// app/hooks.ts
import { 
    TypedUseSelectorHook, 
    useDispatch, 
    useSelector 
  } from 'react-redux';
  import type { AppDispatch, RootState } from './store';
  
  // 1. Exportez les hooks typés
  export const useAppDispatch: () => AppDispatch = useDispatch;
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  
  // 2. Optionnel : Version simplifiée si les types génériques posent problème
  // export const useAppDispatch = useDispatch<AppDispatch>;
  // export const useAppSelector = useSelector<RootState>;