import React, { useState, useEffect, useCallback } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/Table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/Dialog"
import Label from "../components/Label"
import Textarea from "../components/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/Select"
import { Alert, AlertDescription, AlertTitle } from "../components/Alert"
import { AlertCircle, PlusCircle, UserPlus, Trash2, Users, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "../lib/utils"
import { toast } from 'sonner';

interface Groupe {
  id: number;
  nom: string;
  subject: string;
  project?: { id: number; nom: string };
  users?: { id: number; nom: string; email: string }[];
  representant?: { id: number; nom: string; email: string };
}

interface Project {
    id: number;
    nom: string;
}

const GroupeManagement = () => {
  const [groupes, setGroupes] = useState<Groupe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [nouveauGroupe, setNouveauGroupe] = useState<Omit<Groupe, 'id'>>({
    nom: '',
    subject: '',
  });
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<number | undefined>();


    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [groupeToInvite, setGroupeToInvite] = useState<Groupe | null>(null);
    const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);

    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [groupeToRemoveStudent, setGroupeToRemoveStudent] = useState<Groupe | null>(null);
    const [studentToRemoveEmail, setStudentToRemoveEmail] = useState<string>('');

  const fetchGroupes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/groupes'); // Remplacez par votre URL
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data: Groupe[] = await response.json();
      setGroupes(data);
    } catch (error: any) {
      setError(error.message);
      toast.error(`Erreur lors de la récupération des groupes: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

    const fetchProjects = useCallback(async () => {
        try {
            const response = await fetch('/api/projects'); // Remplacez par l'endpoint de vos projets
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const data: Project[] = await response.json();
            setProjects(data);
        } catch (error: any) {
            setError(error.message);
             toast.error(`Erreur lors de la récupération des projets: ${error.message}`);
        }
    },[]);

  useEffect(() => {
    fetchGroupes();
        fetchProjects();
  }, [fetchGroupes, fetchProjects]);

    const handleCreateGroupe = async () => {
        try {
            if (!nouveauGroupe.nom.trim() || !nouveauGroupe.subject.trim() || !selectedProjectId) {
                toast.error("Veuillez remplir tous les champs obligatoires.");
                return; // Prevent the request
            }

            const response = await fetch('/api/groupes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...nouveauGroupe,
                    projectId: selectedProjectId,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json(); // Attempt to get error message.
                const errorMessage = errorData?.message || 'Erreur lors de la création du groupe';
                throw new Error(errorMessage);
            }
            const newGroupe: Groupe = await response.json();
            setGroupes(prev => [...prev, newGroupe]);
            setIsCreateModalOpen(false);
            setNouveauGroupe({ nom: '', subject: '' });
            setSelectedProjectId(undefined);
            toast.success("Groupe créé avec succès !");
        } catch (error: any) {
            setError(error.message);
            toast.error(`Erreur: ${error.message}`);
        }
    };

    const handleDeleteGroupe = async (id: number) => {
        try {
            const response = await fetch(`/api/groupes/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData?.message || "Erreur lors de la suppression du groupe";
                throw new Error(errorMessage);
            }
            setGroupes(prev => prev.filter((groupe) => groupe.id !== id));
             toast.success("Groupe supprimé avec succès !");
        } catch (error: any) {
            setError(error.message);
            toast.error(`Erreur: ${error.message}`);
        }
    };

    const handleInviteStudents = async () => {
        if (!groupeToInvite) return;

        try {
             if (emailsToInvite.length === 0) {
                toast.error("Veuillez entrer au moins une adresse email.");
                return;
            }
            const response = await fetch(`/api/groupes/${groupeToInvite.id}/invite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emails: emailsToInvite }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData?.message || "Erreur lors de l'invitation";
                throw new Error(errorMessage);
            }
            await fetchGroupes(); // Refresh
            setIsInviteModalOpen(false);
            setEmailsToInvite([]);
            setGroupeToInvite(null);
            toast.success("Étudiants invités avec succès !");

        } catch (error: any) {
            setError(error.message);
            toast.error(`Erreur: ${error.message}`);
        }
    };

    const handleRemoveStudent = async () => {
        if (!groupeToRemoveStudent || !studentToRemoveEmail) return;
        try {
            const response = await fetch(`/api/groupes/${groupeToRemoveStudent.id}/remove?email=${studentToRemoveEmail}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData?.message || "Erreur lors de la suppression de l'étudiant";
                throw new Error(errorMessage);
            }
            await fetchGroupes();
            setIsRemoveModalOpen(false);
            setStudentToRemoveEmail('');
            setGroupeToRemoveStudent(null);
            toast.success("Étudiant retiré du groupe avec succès !");

        } catch (error: any) {
            setError(error.message);
            toast.error(`Erreur: ${error.message}`);
        }
    };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Chargement des groupes...</p>
      </div>
    );
  }

  if (error) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Users className="h-6 w-6" />
        Gestion des Groupes
      </h1>

      <div className="mb-4">
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Nouveau Groupe
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Créer un Groupe</DialogTitle>
                <DialogDescription>
                    Créez un nouveau groupe en remplissant les informations ci-dessous.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nom" className="text-right">
                    Nom <span className="text-red-500">*</span>
                    </Label>
                    <Input
                    id="nom"
                    value={nouveauGroupe.nom}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNouveauGroupe({ ...nouveauGroupe, nom: e.target.value })}
                    className="col-span-3"
                    required
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">
                    Sujet <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                    id="subject"
                    value={nouveauGroupe.subject}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNouveauGroupe({ ...nouveauGroupe, subject: e.target.value })}
                    className="col-span-3"
                    required
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="project" className="text-right">
                            Projet <span className="text-red-500">*</span>
                        </Label>
                        <Select onValueChange={(value) => setSelectedProjectId(Number(value))} value={selectedProjectId?.toString()}>
                            <SelectTrigger className="col-span-3" required>
                                <SelectValue placeholder="Sélectionner un projet" />
                            </SelectTrigger>
                            <SelectContent>
                                {projects.map((project) => (
                                    <SelectItem key={project.id} value={project.id.toString()}>
                                        {project.nom}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Annuler</Button>
                <Button type="submit" onClick={handleCreateGroupe} >Créer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Sujet</TableHead>
              <TableHead>Projet</TableHead>
              <TableHead>Représentant</TableHead>
              <TableHead>Membres</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
            {groupes.map((groupe) => (
                <motion.tr
                    key={groupe.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0}}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                >
              <TableCell className="font-medium">{groupe.nom}</TableCell>
              <TableCell>{groupe.subject}</TableCell>
              <TableCell>{groupe.project ? groupe.project.nom : 'N/A'}</TableCell>
              <TableCell>
                {groupe.representant
                  ? `${groupe.representant.nom} (${groupe.representant.email})`
                  : 'N/A'}
              </TableCell>
              <TableCell>
                {groupe.users ? groupe.users.length : 0}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon" title="Voir les membres">
                                <Users className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Membres du groupe {groupe.nom}</DialogTitle>
                            </DialogHeader>
                            {groupe.users && groupe.users.length > 0 ? (
                            <ul className="list-disc list-inside">
                                {groupe.users.map(user => (
                                    <li key={user.id}>{user.nom} ({user.email})</li>
                                ))}
                            </ul>
                            ) : (
                                <p>Aucun membre dans ce groupe.</p>
                            )}
                            <DialogFooter>
                                <Button variant="outline" onClick={() => {
                                    setIsInviteModalOpen(true);
                                    setGroupeToInvite(groupe);
                                }}>
                                    <UserPlus className="mr-2 h-4 w-4" /> Inviter
                                </Button>
                                 <Button variant="destructive" onClick={() => {
                                    setIsRemoveModalOpen(true);
                                    setGroupeToRemoveStudent(groupe);
                                }}>
                                    <Trash2 className="mr-2 h-4 w-4" /> Retirer
                                </Button>
                                <Button onClick={() => {}}>Fermer</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteGroupe(groupe.id)}
                    title="Supprimer le groupe"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </motion.tr>
            ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

        {/* Invite Students Modal */}
        <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Inviter des étudiants au groupe {groupeToInvite?.nom}</DialogTitle>
                    <DialogDescription>
                        Entrez les adresses e-mail des étudiants à inviter, séparées par des virgules.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Label htmlFor="emails">Adresses e-mail <span className="text-red-500">*</span></Label>
                    <Textarea
                        id="emails"
                        placeholder="etudiant1@example.com,etudiant2@example.com,etudiant3@example.com"
                        value={emailsToInvite.join(',')}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEmailsToInvite(e.target.value.split(',').map(email => email.trim()).filter(email => email !== ''))}
                        required
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsInviteModalOpen(false)}>Annuler</Button>
                    <Button onClick={handleInviteStudents} disabled={emailsToInvite.length === 0}>Inviter</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* Remove Student Modal */}
        <Dialog open={isRemoveModalOpen} onOpenChange={setIsRemoveModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Retirer un étudiant du groupe {groupeToRemoveStudent?.nom}</DialogTitle>
                    <DialogDescription>
                        Entrez l'adresse e-mail de l'étudiant à retirer.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Label htmlFor="email">Adresse e-mail de l'étudiant <span className="text-red-500">*</span></Label>
                    <Input
                        id="email"
                        placeholder="etudiant@example.com"
                        value={studentToRemoveEmail}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStudentToRemoveEmail(e.target.value)}
                        required
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsRemoveModalOpen(false)}>Annuler</Button>
                    <Button onClick={handleRemoveStudent} disabled={!studentToRemoveEmail}>Retirer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
};

export default GroupeManagement;