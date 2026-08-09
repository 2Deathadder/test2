import { useEffect, useMemo, useState } from 'react';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';

const seed = [
  { id: '1', title: 'Préparer la revue produit', description: 'Synthétiser les retours utilisateurs pour la prochaine réunion.', assigneeId: 'sarah', status: 'in_progress', updatedAt: 'Aujourd’hui' },
  { id: '2', title: 'Finaliser les maquettes mobiles', description: 'Valider les écrans avec l’équipe design.', assigneeId: 'thomas', status: 'todo', updatedAt: 'Hier' },
  { id: '3', title: 'Mettre à jour la documentation API', description: 'Ajouter les exemples de payloads manquants.', assigneeId: 'ines', status: 'done', updatedAt: 'Lun. 12 fév.' },
  { id: '4', title: 'Analyser les performances du checkout', description: '', assigneeId: 'sarah', status: 'done', updatedAt: 'Lun. 12 fév.' },
  { id: '5', title: 'Planifier le sprint 24', description: 'Préparer les objectifs et les tickets prioritaires.', assigneeId: 'marc', status: 'in_progress', updatedAt: 'Ven. 9 fév.' }
];

export function useTasks() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('taskflow-tasks') || 'null') || seed);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => setTasks(snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))));
  }, []);

  const createTask = async task => {
    setSaving(true);
    const next = { ...task, updatedAt: 'À l’instant' };
    try {
      if (isFirebaseConfigured) await addDoc(collection(db, 'tasks'), { ...task, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      else setTasks(current => [{ ...next, id: crypto.randomUUID() }, ...current]);
    } finally { setSaving(false); }
  };

  const updateStatus = (id, status) => setTasks(current => current.map(task => task.id === id ? { ...task, status, updatedAt: 'À l’instant' } : task));
  const stats = useMemo(() => ({ total: tasks.length, todo: tasks.filter(t => t.status === 'todo').length, inProgress: tasks.filter(t => t.status === 'in_progress').length, done: tasks.filter(t => t.status === 'done').length }), [tasks]);
  return { tasks, stats, createTask, updateStatus, saving };
}