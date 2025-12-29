import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { login } from '../api/auth.api';
import { useAppTheme } from '../src/theme/ThemeContext';
import { saveToken } from './authStorage';

export default function LoginScreen() {
    const { colors } = useAppTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const handleLogin = async () => {
        setLoading(true);
        let data = await login({ email, password })
        await saveToken(data.data.token);
        router.replace("/tasks")
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: colors.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.card}>
                <Text style={[styles.title, { color: colors.textPrimary }]}>
                    Welcome back
                </Text>

                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                    Login to continue
                </Text>

                {/* Email */}
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor={colors.muted}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={[
                        styles.input,
                        {
                            borderColor: colors.border,
                            color: colors.textPrimary,
                        },
                    ]}
                />

                {/* Password */}
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor={colors.muted}
                    secureTextEntry
                    style={[
                        styles.input,
                        {
                            borderColor: colors.border,
                            color: colors.textPrimary,
                        },
                    ]}
                />

                {/* Button */}
                <TouchableOpacity
                    onPress={handleLogin}
                    disabled={loading}
                    style={[
                        styles.button,
                        { backgroundColor: colors.primary },
                        loading && { opacity: 0.7 },
                    ]}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Signing in…' : 'Login'}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        borderRadius: 16,
        padding: 20,
        gap: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 12,
    },
    input: {
        height: 46,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        fontSize: 15,
    },
    button: {
        height: 46,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
});
