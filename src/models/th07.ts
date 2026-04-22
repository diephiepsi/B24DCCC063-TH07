import { useState, useEffect } from 'react';

export default () => {
  const [currentUser, setCurrentUser] = useState<string | null>(() => localStorage.getItem('th07_user'));
  
  // Danh sách tài khoản (Username & Password) để đăng nhập và phân việc
  const [allUsers, setAllUsers] = useState<any[]>(() => {
    const saved = localStorage.getItem('th07_accounts');
    return saved ? JSON.parse(saved) : [{ username: 'admin', password: '123' }];
  });

  const [tasks, setTasks] = useState<any[]>(() => {
    const saved = localStorage.getItem('th07_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (currentUser) localStorage.setItem('th07_user', currentUser);
    else localStorage.removeItem('th07_user');
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('th07_accounts', JSON.stringify(allUsers));
    localStorage.setItem('th07_tasks', JSON.stringify(tasks));
  }, [allUsers, tasks]);

  return { currentUser, setCurrentUser, allUsers, setAllUsers, tasks, setTasks };
};