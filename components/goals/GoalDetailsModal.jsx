import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { updateGoal } from '../../app/api/goals.api';
import { useAppTheme } from '../../app/src/theme/ThemeContext';
import { ProgressInput } from '../tasks/ProgressInput';
import { TaskDetailRow } from '../tasks/TaskDetailRow';
// import { ProgressInput } from './ProgressInput';
// import { TaskDetailRow } from './TaskDetailRow';

const STATUS_OPTIONS = [
    { label: 'Open', value: 'open' },
    { label: 'Completed', value: 'completed' },
];

export function GoalDetailsModal({ visible, goal, onClose }) {
    const { colors } = useAppTheme();
    const queryClient = useQueryClient();

    const [mode, setMode] = useState('view');
    const [form, setForm] = useState(null);

    useEffect(() => {
        if (!goal) return;

        setForm({
            status: goal.status,
            progress: String(goal.progress ?? 0),
        });

        setMode('view');
    }, [goal]);

    if (!goal || !form) return null;

    const handleProgressChange = (value) => {
        const numeric = value.replace(/[^0-9]/g, '');
        const clamped =
            numeric === ''
                ? ''
                : Math.min(100, Math.max(0, Number(numeric))).toString();

        setForm({ ...form, progress: clamped });
    };

    const handleSave = async () => {
        try {
            await updateGoal({
                id: goal.id,
                status: form.status,
                progress: Number(form.progress || 0),
            });

            queryClient.invalidateQueries({ queryKey: ['goals'] });

            Alert.alert('Success', 'Goal updated successfully');
            setMode('view');
            onClose();
        } catch (e) {
            Alert.alert('Update failed', 'Unable to update goal');
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={[styles.container, { backgroundColor: colors.card }]}>

                    <Text style={[styles.title, { color: colors.textPrimary }]}>
                        Goal Details
                    </Text>

                    <TaskDetailRow label="Goal Name" value={goal.goal_name} />
                    <TaskDetailRow label="Description" value={goal.description || '—'} />
                    <TaskDetailRow
                        label="Created On"
                        value={new Date(goal.created_at).toDateString()}
                    />

                    <TaskDetailRow
                        label="Status"
                        value={form.status.toUpperCase()}
                    />

                    <ProgressInput
                        mode={mode}
                        value={form.progress}
                        onChange={handleProgressChange}
                        colors={colors}
                    />

                    <View style={styles.footer}>
                        <>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    styles.secondaryButton,
                                    { borderColor: colors.border },
                                ]}
                                onPress={onClose}
                            >
                                <Text style={[styles.buttonText, { color: colors.textPrimary }]}>
                                    Close
                                </Text>
                            </TouchableOpacity>
                        </>

                    </View>

                </View>
            </View>
        </Modal>
    );
}



const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'flex-end',
    },
    container: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        maxHeight: '90%',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },
    footer: {
        marginTop: 24,
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        flex: 1,
        height: 44,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '600',
    },
    primaryButton: {
        elevation: 2,
    },
    secondaryButton: {
        borderWidth: 1,
        backgroundColor: 'transparent',
    },
});
