import React, { useState } from "react";
import './SaisirProject.css'




// rah mzl mkmlt khdma 3lih w9"li mochkil f backend w7ta had intefrace raha ghir slakia , w 7ta les champs mzdtch 
//bzf dyal les champs w ga3 les champs li kaynin f entiti dyal projet 7it ba9i les relation w ba9I chla 7wayj 
// 7TA lghda enshalah rah ma9drtch krchi raha tWj3ni  
const SaisirProject: React.FC = () => {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    competences: "",
    rapport: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Données soumises :", formData);
   
  };

  
    return (
        <form onSubmit={handleSubmit} className="project-form-container">
          <h2 className="project-form-title">Créer un projet</h2>
      
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            placeholder="Titre du projet"
            required
          />
      
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          ></textarea>
      
          <input
            type="text"
            name="competences"
            value={formData.competences}
            onChange={handleChange}
            placeholder="Compétences requises"
          />
      
         
       
      
          <input
            type="file"
            name="rapport"
            onChange={handleChange}
            placeholder=" rapport"
            accept=".pdf,.doc,.docx"
          />
      
      
          <button type="submit">Enregistrer</button>
        </form>
      );
      
};

export default SaisirProject;
