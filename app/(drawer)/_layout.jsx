import { Drawer } from 'expo-router/drawer';
import { useAppTheme } from '../src/theme/ThemeContext';

export default function DrawerLayout() {
  const { colors } = useAppTheme();

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerType: 'front',

        // 🔹 Drawer background
        drawerStyle: {
          backgroundColor: colors.background,
        },

        // 🔹 Drawer labels
        drawerLabelStyle: {
          color: colors.textPrimary,
        },

        // 🔹 Active item
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,

        // 🔹 Header styling
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTitleStyle: {
          color: colors.textPrimary,
        },
        headerTintColor: colors.textPrimary,

        // 🔹 Scene background
        sceneContainerStyle: {
          backgroundColor: colors.background,
        },
      }}
    />
  );
}
