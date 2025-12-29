import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { View } from 'react-native';

import { removeToken } from '../(auth)/authStorage';
import { useAppTheme } from '../src/theme/ThemeContext';


export default function DrawerLayout() {
  const { colors } = useAppTheme();
  const router = useRouter();

  const handleLogout = async () => {
    await removeToken();
    router.replace('/login');
  };

  return (
    <Drawer
      drawerContent={(props) => (
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ flex: 1 }}   
        >
  
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
    />
  );
}
