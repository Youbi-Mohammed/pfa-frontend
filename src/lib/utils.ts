import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Fonction utilitaire pour fusionner les classes CSS.
 * @param inputs Un tableau de valeurs de classes CSS (chaînes, objets, tableaux).
 * @returns Une chaîne contenant les classes CSS fusionnées.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Vous pouvez ajouter d'autres fonctions utilitaires ici, par exemple :
// - Fonctions de formatage de date
// - Fonctions de manipulation de chaînes de caractères
// - Fonctions pour obtenir des valeurs à partir de cookies ou du stockage local
// - Fonctions pour vérifier le type d'une variable
// - Fonctions pour la gestion des erreurs
