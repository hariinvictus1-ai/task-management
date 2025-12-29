import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { getToken } from './(auth)/authStorage';

export default function Index() {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      setIsLoggedIn(!!token);
      setChecking(false);
    })();
  }, []);

  if (checking) return null; // or a splash loader

  return isLoggedIn
    ? <Redirect href="/tasks" />
    : <Redirect href="/login" />;
}
