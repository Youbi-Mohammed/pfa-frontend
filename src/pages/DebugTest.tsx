import React from 'react';
import axios from 'axios';

// const TestConnection = () => {
//   const callDebugEndpoint = async () => {
//     try {
//       console.log("Envoi de la requête au backend...");
//       const response = await axios.get('http://localhost:8080/api/test/debug');
//       console.log("Réponse du backend:", response.data);
//     } catch (error) {
//       console.error("Erreur de connexion:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Test de connexion backend</h2>
//       <button onClick={callDebugEndpoint}>
//         Tester la connexion
//       </button>
//     </div>
//   );
// };

// export default TestConnection;
// // src/components/TestConnection.tsx
// import { AxiosError } from 'axios';
// import axiosInstance from '../api/userApi';
// import  { useState } from 'react';


// interface UserData {
//   id: number;
//   name: string;
//   email: string;
// }

// const DataFetcher: React.FC = () => {
//   const [data, setData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Fonction séparée pour le fetching
//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await axios.get<UserData>('/api/data');
//       setData(response.data);
//     } catch (err) {
//       setError('Failed to fetch data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Rendu du composant
//   return (
//     <div>
//       <button onClick={fetchData} disabled={loading}>
//         {loading ? 'Loading...' : 'Fetch Data'}
//       </button>
      
//       {error && <p className="error">{error}</p>}
      
//       {data && (
//         <div>
//           <h2>{data.name}</h2>
//           <p>{data.email}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DataFetcher;

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProtectedData, clearTestData } from '../features/userapi/testSlice';
import { useEffect } from 'react';

const TestComponent = () => {
  const dispatch = useAppDispatch();
  
  
  // Récupère les états depuis le store
  const { 
    protectedData, 
    isLoading, 
    isError, 
    message 
  } = useAppSelector((state) => state.test);
  
  const { user } = useAppSelector((state) => state.auth);

  // Effet pour charger les données au montage
  useEffect(() => {
    if (user?.token) {
      dispatch(fetchProtectedData());
    }
  }, [dispatch, user?.token]);

  // Fonction pour recharger les données
  const handleRefresh = () => {
    dispatch(clearTestData());
    dispatch(fetchProtectedData());
  };

  if (!user) {
    return (
      <div className="alert alert-warning">
        Vous devez être connecté pour voir ces données.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p>Chargement des données protégées...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger">
        <h4>Erreur</h4>
        <p>{message || 'Erreur lors du chargement des données'}</p>
        <button 
          onClick={handleRefresh}
          className="btn btn-sm btn-outline-danger"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2>Données Protégées</h2>
        <button 
          onClick={handleRefresh}
          className="btn btn-sm btn-outline-primary"
        >
          Actualiser
        </button>
      </div>
      <div className="card-body">
        {protectedData ? (
          <pre className="p-3 bg-light rounded">
            <code>{protectedData}</code>
          </pre>
        ) : (
          <p>Aucune donnée disponible</p>
        )}
      </div>
    </div>
  );
};

export default TestComponent;