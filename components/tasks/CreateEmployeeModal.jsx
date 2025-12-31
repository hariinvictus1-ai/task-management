import { Picker } from '@react-native-picker/picker';
import { useQuery } from '@tanstack/react-query';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { getGoals } from '../../app/api/goals.api';

function CreateEmployeeModal({
    visible = false,
    onClose = () => { },
    colors = {},

    taskType = 'main',        // 'main' | 'subtask'
    parentTasks = [],
    employees =[]
}) {


    const { data: goals } = useQuery({
        queryKey: ['goals'],
        queryFn: getGoals,

    });

    // const {data : employees} = useQuery({
    //     queryKey:["getEmployees"],
    //     queryFn:getEmployeesForTaskCreation
    // })

    // useEffect(() => {
    //     console.log(employees, "======employees")
    // }, [employees])

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
                            {/* Title */}
                            <Text style={[styles.title, { color: colors.textPrimary }]}>
                                Create Task
                            </Text>

                            {/* Task Name */}
                            <Text style={[styles.label, { color: colors.textSecondary }]}>
                                Task Name
                            </Text>
                            <TextInput
                                placeholder="Enter task name"
                                placeholderTextColor={colors.textSecondary}
                                style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
                            />

                            {/* Description */}
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
                            />

                            {/* Task Type */}
                            <Text style={[styles.label, { color: colors.textSecondary }]}>
                                Task Type
                            </Text>
                            <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>
                                {taskType}
                            </Text>

                            {/* Goal (main task only) */}
                            {taskType === 'main' && (
                                <>
                                    <Text style={[styles.label, { color: colors.textSecondary }]}>
                                        Goal
                                    </Text>
                                    <View style={[styles.picker, { borderColor: colors.border }]}>
                                        <Picker
                                            style={{ color: colors.textPrimary }}
                                            dropdownIconColor={colors.textPrimary}
                                        >
                                            {goals?.map(goal => (
                                                <Picker.Item
                                                    key={goal.id}
                                                    label={goal.goal_name}
                                                    value={goal.id}
                                                />
                                            ))}
                                        </Picker>
                                    </View>
                                </>
                            )}

                            {/* Parent Task (subtask only) */}
                            {taskType === 'subtask' && (
                                <>
                                    <Text style={[styles.label, { color: colors.textSecondary }]}>
                                        Parent Task
                                    </Text>
                                    <View style={[styles.picker, { borderColor: colors.border }]}>
                                        <Picker
                                            style={{ color: colors.textPrimary }}
                                            dropdownIconColor={colors.textPrimary}
                                        >
                                            {parentTasks.map(task => (
                                                <Picker.Item
                                                    key={task.id}
                                                    label={task.name}
                                                    value={task.id}
                                                />
                                            ))}
                                        </Picker>
                                    </View>
                                </>
                            )}

                            {/* Assign To */}
                            <Text style={[styles.label, { color: colors.textSecondary }]}>
                                Assign To
                            </Text>
                            <View style={[styles.picker, { borderColor: colors.border }]}>
                                <Picker
                                    style={{ color: colors.textPrimary }}
                                    dropdownIconColor={colors.textPrimary}
                                >
                                    {employees?.map(emp => (
                                        <Picker.Item
                                            key={emp.id}
                                            label={emp.name}
                                            value={emp.id}
                                        />
                                    ))}
                                </Picker>
                            </View>

                            {/* Dates */}
                            <Text style={[styles.label, { color: colors.textSecondary }]}>
                                Start Date
                            </Text>
                            <TextInput
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor={colors.textSecondary}
                                style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
                            />

                            <Text style={[styles.label, { color: colors.textSecondary }]}>
                                Due Date
                            </Text>
                            <TextInput
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor={colors.textSecondary}
                                style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
                            />

                            {/* Progress (subtask only) */}
                            {taskType === 'subtask' && (
                                <>
                                    <Text style={[styles.label, { color: colors.textSecondary }]}>
                                        Progress (%)
                                    </Text>
                                    <TextInput
                                        placeholder="0 – 100"
                                        placeholderTextColor={colors.textSecondary}
                                        keyboardType="numeric"
                                        style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
                                    />
                                </>
                            )}

                            {/* Footer */}
                            <View style={styles.footer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.secondary, { borderColor: colors.border }]}
                                    onPress={onClose}
                                >
                                    <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: colors.primary }]}
                                >
                                    <Text style={{ color: '#fff', fontWeight: '700' }}>
                                        Create
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

export default CreateEmployeeModal;


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
        height: '85%',                 // ✅ FIXED HEIGHT
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    scrollContent: {
        paddingBottom: 24,             // space below buttons
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

    picker: {
        borderWidth: 1,
        borderRadius: 12,
        overflow: 'hidden',
    },

    footer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 24,
        marginBottom: 8,
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
