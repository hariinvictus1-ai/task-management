import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { createGoal } from '../../app/api/goals.api';

function CreateGoalModal({
    visible = false,
    onClose = () => { },
    colors = {},
}) {
    const [goalName, setGoalName] = useState('');
    const [description, setDescription] = useState('');

    const queryClient = useQueryClient();

    function resetForm() {
        setGoalName('');
        setDescription('');
    }

    const { mutate, isPending } = useMutation({
        mutationFn: (payload) => createGoal(payload),
        onSuccess: () => {
            queryClient.invalidateQueries(['goals']);
            resetForm();
            onClose();
        },
    });

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.keyboardWrapper}
                >
                    <View style={[styles.container, { backgroundColor: colors.card }]}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={styles.scrollContent}
                        >
                            <Text style={[styles.title, { color: colors.textPrimary }]}>
                                Create Goal
                            </Text>

                            <Text style={[styles.label, { color: colors.textSecondary }]}>
                                Goal Name
                            </Text>
                            <TextInput
                                placeholder="Enter goal name"
                                placeholderTextColor={colors.textSecondary}
                                style={[
                                    styles.input,
                                    { borderColor: colors.border, color: colors.textPrimary },
                                ]}
                                value={goalName}
                                onChangeText={setGoalName}
                            />

                            <Text style={[styles.label, { color: colors.textSecondary }]}>
                                Description
                            </Text>
                            <TextInput
                                placeholder="Enter description"
                                placeholderTextColor={colors.textSecondary}
                                multiline
                                style={[
                                    styles.textArea,
                                    { borderColor: colors.border, color: colors.textPrimary },
                                ]}
                                value={description}
                                onChangeText={setDescription}
                            />
                            <View style={styles.footer}>
                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        styles.secondary,
                                        { borderColor: colors.border },
                                    ]}
                                    onPress={onClose}
                                >
                                    <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        {
                                            backgroundColor: colors.primary,
                                            opacity: isPending ? 0.6 : 1,
                                        },
                                    ]}
                                    onPress={() =>
                                        mutate({
                                            goal: {
                                                goal_name: goalName,
                                                description,
                                            },
                                        })
                                    }
                                    disabled={isPending}
                                >
                                    <Text style={{ color: '#fff', fontWeight: '700' }}>
                                        {isPending ? 'Creating…' : 'Create'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}

export default CreateGoalModal;


export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    keyboardWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    container: {
        height: '60%',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    scrollContent: {
        paddingBottom: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 16,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 6,
        marginTop: 14,
    },
    input: {
        height: 46,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 14,
        fontSize: 14,
    },
    textArea: {
        minHeight: 90,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingTop: 12,
        fontSize: 14,
        textAlignVertical: 'top',
    },
    footer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 24,
    },
    button: {
        flex: 1,
        height: 46,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondary: {
        borderWidth: 1,
        backgroundColor: 'transparent',
    },
});
