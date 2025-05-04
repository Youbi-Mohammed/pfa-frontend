// // import React, { useState } from "react";
// //
// //import './SaisirProject.css'




// // rah mzl mkmlt khdma 3lih w9"li mochkil f backend w7ta had intefrace raha ghir slakia , w 7ta les champs mzdtch 
// //bzf dyal les champs w ga3 les champs li kaynin f entiti dyal projet 7it ba9i les relation w ba9I chla 7wayj 
// // 7TA lghda enshalah rah ma9drtch krchi raha tWj3ni  
// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import axios from 'axios';
// import { UserLogin } from '../types/authTypes'; 

// interface ProjectData {
//   titre: string;
//   description: string;
//   competences: string;
//   statut: string;
// }

// const CreateProjectForm: React.FC = () => {
//   const [formData, setFormData] = useState<ProjectData>({
//     titre: '',
//     description: '',
//     competences: '',
//     statut: ''
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const storedUser = localStorage.getItem('user');
//     const user: UserLogin | null = storedUser ? JSON.parse(storedUser) : null;
//     const token = user?.token;

//     if (!token) {
//       alert('Utilisateur non connecté');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:8080/api/Encadrant/project/create-projects', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       console.log('Projet créé :', response.data);
//       // Tu peux afficher un message de succès ici ou réinitialiser le formulaire

//     } catch (error) {
//       console.error('Erreur lors de la création du projet :', error);
//     }
//   };

//   return (
//    <form onSubmit={handleSubmit}>
//       <input type="text" name="titre" placeholder="Titre" onChange={handleChange} required />
//       <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
//       <input type="text" name="competences" placeholder="Compétences" onChange={handleChange} required />
//       <input type="text" name="statut" placeholder="Statut" onChange={handleChange} required />
//       <button type="submit">Créer le projet</button>
//     </form>
//   );
// };

// export default CreateProjectForm;



// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import axios from 'axios';
// import { useAppSelector } from '../app/hooks.tsx'; 

// interface ProjectData {
//   titre: string;
//   description: string;
//   competences: string;
//   statut: string;
// }

// const CreateProjectForm: React.FC = () => {
//   const [formData, setFormData] = useState<ProjectData>({
//     titre: '',
//     description: '',
//     competences: '',
//     statut: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   // Récupérez l'utilisateur depuis le store Redux
//   const { user } = useAppSelector((state) => state.auth);

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!user || !user.token) {
//       alert('Veuillez vous connecter pour créer un projet');
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'http://localhost:8080/api/Encadrant/project/create-projects', 
//         formData, 
//         {
//           headers: {
//             'Authorization': `Bearer ${user.token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       console.log('Projet créé :', response.data);
//       // Réinitialiser le formulaire après succès
//       setFormData({
//         titre: '',
//         description: '',
//         competences: '',
//         statut: ''
//       });

//     } catch (error) {
//       console.error('Erreur lors de la création du projet :', error);
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           console.error('Erreur serveur:', error.response.data);
//         } else if (error.request) {
//           console.error('Pas de réponse du serveur');
//         } else {
//           console.error('Erreur de configuration:', error.message);
//         }
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input 
//         type="text" 
//         name="titre" 
//         value={formData.titre}
//         placeholder="Titre" 
//         onChange={handleChange} 
//         required 
//       />
//       <textarea
//         name="description" 
//         value={formData.description}
//         placeholder="Description" 
//         onChange={handleChange} 
//         required 
//       />
//       <input 
//         type="text" 
//         name="competences" 
//         value={formData.competences}
//         placeholder="Compétences" 
//         onChange={handleChange} 
//         required 
//       />
//       <input
//         name="statut" 
//         value={formData.statut}
//         onChange={handleChange}
//         required
//       />
     
//       <button type="submit" disabled={isSubmitting}>
//         {isSubmitting ? 'Création en cours...' : 'Créer le projet'}
//       </button>
//     </form>
//   );
// };

// export default CreateProjectForm;


// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import axios from 'axios';
// import { useAppSelector } from '../app/hooks.tsx'; 

// interface ProjectData {
//   titre: string;
//   description: string;
//   competences: string;
//   statut: string;
// }

// const CreateProjectForm: React.FC = () => {
//   // Données fixes pour le test
//   const fixedProjectData: ProjectData = {
//     titre: 'Projet Test',
//     description: 'Description de test pour le projet',
//     competences: 'React, Spring Boot',
//     statut: 'EN_ATTENTE'
//   };

//   const [formData, setFormData] = useState<ProjectData>(fixedProjectData);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [testMode, setTestMode] = useState(true); // Mode test activé par défaut
  
//   // Récupérez l'utilisateur depuis le store Redux
//   const { user } = useAppSelector((state) => state.auth);

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!user || !user.token) {
//       alert('Veuillez vous connecter pour créer un projet');
//       setIsSubmitting(false);
//       return;
//     }

//     // Utilise les données fixes si en mode test
//     const dataToSend = testMode ? fixedProjectData : formData;

//     try {
//       const response = await axios.post(
//         'http://localhost:8080/api/Encadrant/project/create-projects', 
//         dataToSend, 
//         {
//           headers: {
//             'Authorization': `Bearer ${user.token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       console.log('Réponse du serveur:', response.data);
//       alert(`Projet créé avec succès! ID: ${response.data.id || 'N/A'}`);

//       if (!testMode) {
//         // Réinitialiser seulement si en mode normal
//         setFormData({
//           titre: '',
//           description: '',
//           competences: '',
//           statut: ''
//         });
//       }

//     } catch (error) {
//       console.error('Erreur lors de la création du projet:', error);
//       let errorMessage = 'Erreur lors de la création du projet';
      
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           console.error('Détails erreur:', error.response.data);
//           errorMessage = error.response.data.message || errorMessage;
//         }
//       }
      
//       alert(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
//         <label>
//           <input 
//             type="checkbox" 
//             checked={testMode} 
//             onChange={() => setTestMode(!testMode)} 
//           />
//           Mode Test (données fixes)
//         </label>
//         {testMode && (
//           <p style={{ color: 'green' }}>
//             En mode test - Les données fixes seront envoyées au serveur
//           </p>
//         )}
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Titre: </label>
//           <input 
//             type="text" 
//             name="titre" 
//             value={formData.titre}
//             placeholder="Titre" 
//             onChange={handleChange} 
//             required 
//             disabled={testMode}
//           />
//           {testMode && <span> (Valeur fixe: "{fixedProjectData.titre}")</span>}
//         </div>

//         <div>
//           <label>Description: </label>
//           <textarea
//             name="description" 
//             value={formData.description}
//             placeholder="Description" 
//             onChange={handleChange} 
//             required 
//             disabled={testMode}
//           />
//           {testMode && <span> (Valeur fixe: "{fixedProjectData.description}")</span>}
//         </div>

//         <div>
//           <label>Compétences: </label>
//           <input 
//             type="text" 
//             name="competences" 
//             value={formData.competences}
//             placeholder="Compétences" 
//             onChange={handleChange} 
//             required 
//             disabled={testMode}
//           />
//           {testMode && <span> (Valeur fixe: "{fixedProjectData.competences}")</span>}
//         </div>

//         <div>
//           <label>Statut: </label>
//           {testMode && <span> (Valeur fixe: "{fixedProjectData.statut}")</span>}
//         </div>
     
//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Envoi en cours...' : 'Tester la création de projet'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateProjectForm;
//peut etre erreur juste dans la case des competances ou jai entrer compteance comme String mais avec react cest un array des string 
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createProject } from '../features/project/projectSlice';
import { ProjetData } from '../types/projectTypes';

const ProjectCreateForm = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isError, message } = useAppSelector((state) => state.projects);
  
  const [formData, setFormData] = useState<ProjetData>({
    titre: '',
    description: '',
    competences: '',
    statut: 'en_attente' // Valeur par défaut
  });

  const [currentSkill, setCurrentSkill] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() && !formData.competences.includes(currentSkill.trim())) {
      setFormData({
        ...formData,
      });
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
     
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createProject(formData));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Créer un nouveau projet</h2>
      
      {isError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {message}
        </div>
      )}
      
      {isSuccess && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Projet créé avec succès!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Champ Titre */}
        <div className="mb-4">
          <label htmlFor="titre" className="block text-gray-700 font-medium mb-2">
            Titre du projet*
          </label>
          <input
            type="text"
            id="titre"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Champ Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Champ Compétences */}
        {/* <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Compétences requises
          </label>
          <div className="flex mb-2">
            <input
              type="text"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ajouter une compétence"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
            >
              Ajouter
            </button>
          </div>
          
           <div className="flex flex-wrap gap-2">
            {formData.competences.map((skill) => (
              <div key={skill} className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
                <span className="mr-2">{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>  
        
        
        </div> */}
        <div className="mb-4">
  <label htmlFor="competences" className="block text-gray-700 font-medium mb-2">
    Compétences requises (séparées par des virgules)
  </label>
  <input
    type="text"
    id="competences"
    name="competences"
    value={formData.competences} // Maintenant un string directement
    onChange={(e) => {
      setFormData({
        ...formData,
        competences: e.target.value
      });
    }}
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Ex: React, Node.js, MongoDB"
  />
</div>

        {/* Champ Statut */}
        <div className="mb-6">
          <label htmlFor="statut" className="block text-gray-700 font-medium mb-2">
            Statut*
          </label>
          <select
            id="statut"
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="en_attente">En attente</option>
            <option value="en_cours">En cours</option>
            <option value="termine">Terminé</option>
            <option value="annule">Annulé</option>
          </select>
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Création en cours...
            </span>
          ) : (
            'Créer le projet'
          )}
        </button>
      </form>
    </div>
  );
};

export default ProjectCreateForm;