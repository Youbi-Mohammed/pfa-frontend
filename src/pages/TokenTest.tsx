import React, { useState, useEffect } from "react"
// import { useAppSelector } from "../app/hooks"
import axios from 'axios';
import { getSecureData } from "../api/userApi"  // Assure-toi que le chemin est correct

// const TokenTest = () => {
//   const user = useAppSelector((state) => state.auth.user)
//   const [userInfo, setUserInfo] = useState<any>(null)
//   const [error, setError] = useState<string>("")

//   useEffect(() => {
//     const fetchData = async () => {
//       if (user?.token) {
//         try {
//           const response = await getSecureData(user.token)
//           setUserInfo(response.data)
//         } catch (err: any) {
//           setError("Erreur lors de la récupération des données sécurisées")
//           console.error(err)
//         }
//       } else {
//         setError("Aucun token trouvé")
//       }
//     }

//     fetchData()
//   }, [user])

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h2>Infos de l'utilisateur connecté</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {userInfo ? (
//         <div style={{ marginTop: "10px" }}>
//           <p><strong>Nom :</strong> {userInfo.firstName} {userInfo.lastName}</p>
//           <p><strong>Email :</strong> {userInfo.email}</p>
//           <p><strong>Rôle :</strong> {userInfo.roleId}</p>
//         </div>
//       ) : (
//         <p>Chargement des données sécurisées...</p>
//       )}
//     </div>
//   )
// }

// export default TokenTest

 // Assurez-vous que le chemin est correct

// interface UserInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   roleId: number;
// }

// const TokenTest = () => {
  
//        // 1. Récupération du user depuis Redux
//   const user = useAppSelector((state) => state.auth.user);
  
//   // 2. Vérification de la connexion
//   if (!user || !user.token) {
//     return (
//       <div style={{ 
//         padding: '20px', 
//         color: 'red',
//         fontFamily: 'Arial'
//       }}>
//         Aucun utilisateur connecté ou token manquant
//       </div>
//     );
//   }

//   // 3. Affichage du token
//   return (
//     <div style={{ 
//       padding: '20px',
//       fontFamily: 'Arial',
//       maxWidth: '600px',
//       margin: '0 auto'
//     }}>
//       <h2 style={{ color: '#333' }}>Votre token de connexion</h2>
      
//       <div style={{
//         marginTop: '15px',
//         padding: '15px',
//         backgroundColor: '#f5f5f5',
//         borderRadius: '4px',
//         wordBreak: 'break-all'  // Pour les longs tokens
//       }}>
//         <strong>Token JWT :</strong>
//         <p style={{ marginTop: '8px' }}>{user.token}</p>
//       </div>
      
//       <p style={{
//         marginTop: '10px',
//         fontSize: '0.8rem',
//         color: 'orange'
//       }}>
//         ⚠️ Attention : Ne partagez jamais ce token avec quelqu'un !
//       </p>
//     </div>
//   );
// };

// export default TokenTest;

/////test 



// interface UserData {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   roleId: number;
//   // Ajoutez d'autres propriétés selon votre API
// }

// interface ApiError {
//   message: string;
//   // Ajoutez d'autres propriétés d'erreur si nécessaire
// }

// const UserProfileTest = () => {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [token, setToken] = useState<string>('');

//   const fetchUserData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       if (!token.trim()) {
//         throw new Error('Veuillez entrer un token JWT valide');
//       }

//       const response = await axios.get<UserData>('http://localhost:8080/api/users/current', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setUserData(response.data);
//     } catch (err) {
//       handleApiError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApiError = (error: unknown) => {
//     if (axios.isAxiosError<ApiError>(error)) {
//       // Erreur Axios avec réponse du serveur
//       setError(error.response?.data?.message || error.message || 'Erreur API inconnue');
//     } else if (error instanceof Error) {
//       // Erreur JavaScript standard
//       setError(error.message);
//     } else {
//       // Erreur inconnue
//       setError('Une erreur inconnue est survenue');
//     }
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       try {
//         const user = JSON.parse(storedUser);
//         if (user?.token && typeof user.token === 'string') {
//           setToken(user.token);
//         }
//       } catch (e) {
//         console.error('Erreur de parsing du user localStorage', e);
//       }
//     }
//   }, []);

//   return (
//     <div style={{ 
//       maxWidth: '800px', 
//       margin: '0 auto', 
//       padding: '20px',
//       fontFamily: 'Arial'
//     }}>
//       <h1 style={{ color: '#333' }}>Test d'authentification</h1>
      
//       <div style={{ 
//         margin: '20px 0',
//         padding: '15px',
//         backgroundColor: '#f5f5f5',
//         borderRadius: '5px'
//       }}>
//         <h3>Configuration</h3>
//         <div style={{ margin: '10px 0' }}>
//           <label style={{ display: 'block', marginBottom: '5px' }}>
//             Token JWT:
//           </label>
//           <textarea
//             value={token}
//             onChange={(e) => setToken(e.target.value)}
//             style={{
//               width: '100%',
//               minHeight: '60px',
//               padding: '8px',
//               borderRadius: '4px',
//               border: '1px solid #ddd'
//             }}
//             placeholder="Collez votre token JWT ici"
//             aria-label="Token JWT"
//           />
//         </div>
//         <button
//           onClick={fetchUserData}
//           style={{
//             padding: '8px 15px',
//             backgroundColor: '#4CAF50',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer'
//           }}
//           disabled={loading || !token.trim()}
//         >
//           {loading ? 'Chargement...' : 'Tester le token'}
//         </button>
//       </div>

//       {error && (
//         <div style={{
//           padding: '15px',
//           backgroundColor: '#ffebee',
//           color: '#d32f2f',
//           borderRadius: '4px',
//           margin: '20px 0'
//         }}>
//           <strong>Erreur :</strong> {error}
//         </div>
//       )}

//       {userData && (
//         <div style={{
//           marginTop: '20px',
//           padding: '15px',
//           border: '1px solid #e0e0e0',
//           borderRadius: '5px'
//         }}>
//           <h3 style={{ color: '#333', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
//             Données utilisateur récupérées
//           </h3>
//           <div style={{
//             backgroundColor: '#fafafa',
//             padding: '15px',
//             borderRadius: '4px'
//           }}>
//             <p><strong>ID:</strong> {userData.id}</p>
//             <p><strong>Nom:</strong> {userData.firstName} {userData.lastName}</p>
//             <p><strong>Email:</strong> {userData.email}</p>
//             <p><strong>Rôle:</strong> {userData.roleId}</p>
//           </div>
//         </div>
//       )}

//       <div style={{ marginTop: '30px', fontSize: '0.9em', color: '#666' }}>
//         <h3>Comment utiliser :</h3>
//         <ol>
//           <li>Connectez-vous à votre application pour obtenir un token</li>
//           <li>Collez le token dans le champ ci-dessus</li>
//           <li>Cliquez sur "Tester le token"</li>
//           <li>Les données utilisateur apparaîtront si le token est valide</li>
//         </ol>
//       </div>
//     </div>
//   );
// };

// export default UserProfileTest;

// // Version 1: Fonction pure (pour les appels API)
// export const fetchUserData = async (token: string) => {
//   try {
//     const response = await axios.get('http://localhost:8080/api/test/tokentest', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("API Error:", error);
//     throw new Error("Erreur lors de la récupération des données utilisateur");
//   }
// };

// // Version 2: Hook personnalisé (pour usage dans les composants)
// export const useUserData = () => {
//   const [data, setData] = useState<any>(null);
//   const [error, setError] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const user = useAppSelector((state) => state.auth.user);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user?.token) {
//         setError("Aucun token d'authentification trouvé");
//         setLoading(false);
//         return;
//       }

//       try {
//         const userData = await fetchUserData(user.token);
//         setData(userData);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Erreur inconnue");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user?.token]);

//   return { data, error, loading };
// };

// // Exemple d'utilisation dans un composant :
// const UserProfile = () => {
//   const { data, error, loading } = useUserData();

//   if (loading) return <p>Chargement...</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;

//   return (
//     <div>
//       <h2>Profil Utilisateur</h2>
//       {data && (
//         <div>
//           <p>Nom: {data.firstName} {data.lastName}</p>
//           <p>Email: {data.email}</p>
//           <p>Rôle: {data.roleId}</p>
//         </div>
//       )}
//     </div>
//   );
// };

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProtectedData, clearTestData } from '../features/userapi/testSlice';

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