import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { getUserDetails, removeToken } from '../(auth)/authStorage';
import { useAppTheme } from '../src/theme/ThemeContext';

const ROLE_SCREENS = {
  employee: [
    { name: 'tasks', title: 'Tasks' },
    { name: 'reviews', title: 'Reviews' },
  ],
  manager: [
    { name: 'tasks', title: 'Tasks' },
    { name: 'reviews', title: 'Reviews' },
  ],
  lead: [
    { name: 'tasks', title: 'Tasks' },
    { name: 'reviews', title: 'Reviews' },
  ],
  admin: [
    { name: 'employees', title: 'Employees' },
  ],
};


export default function DrawerLayout() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const [user, setUser] = useState(undefined); // undefined = loading, null = not logged in

  /* Load user once on mount */
  useEffect(() => {
    async function loadUser() {
      const data = await getUserDetails();
      if (!data) {
        setUser(null);
        return;
      }
      try {
        setUser(JSON.parse(data));
      } catch (error) {
        setUser(null);
      }
    }
    loadUser();
  }, []);

  const handleLogout = async () => {
    await removeToken();
    setUser(null);
    router.replace('/login');
  };

  // Don't render anything until we know the auth state
  if (user === undefined) {
    return null; // You can replace this with a SplashScreen or Loader
  }

  // If no user or no role, prevent rendering the drawer (or redirect earlier)
  if (!user || !user.role) {
    return null;
  }

  const screens = ROLE_SCREENS[user.role] || [];

  return (
    <Drawer
      drawerContent={(props) => (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
          <DrawerItemList {...props} />
          <View style={{ flex: 1 }} />
          <DrawerItem
            label="Logout"
            onPress={handleLogout}
            labelStyle={{ color: colors.textPrimary }}
          />
        </DrawerContentScrollView>
      )}
      screenOptions={{
        headerShown: true,
        drawerType: 'front',
        drawerStyle: { backgroundColor: colors.background },
        drawerLabelStyle: { color: colors.textPrimary },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
        headerStyle: { backgroundColor: colors.card },
        headerTitleStyle: { color: colors.textPrimary },
        headerTintColor: colors.textPrimary,
        sceneContainerStyle: { backgroundColor: colors.background },
      }}
    >
      {screens.map((screen) => (
        <Drawer.Screen
          key={screen.name}
          name={screen.name}
          options={{ title: screen.title }}
        />
      ))}
    </Drawer>
  );
}