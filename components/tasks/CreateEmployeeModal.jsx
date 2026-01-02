import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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
import { createTask, getEmployeesForTaskCreation, getParentTasks } from '../../app/api/tasks.api';
import FormDropdown from '../ui/FormDropdown';

function CreateEmployeeModal({
    visible = false,
    onClose = () => { },
    colors = {},
}) {
    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [activePicker, setActivePicker] = useState(null);
    const [taskTypeOpen, setTaskTypeOpen] = useState(false);
    const [taskTypeValue, setTaskTypeValue] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [taskTypes, setTaskTypes] = useState([
        { label: 'Main Task', value: 'main' },
        { label: 'Subtask', value: 'subtask' }
    ]);
    const [goalOpen, setGoalOpen] = useState(false);
    const [goalValue, setGoalValue] = useState(null);
    const [parentOpen, setParentOpen] = useState(false);
    const [parentValue, setParentValue] = useState(null);
    const [assigneeOpen, setAssigneeOpen] = useState(false);
    const [assigneeValue, setAssigneeValue] = useState(null);
    const [taskName, setTaskname] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const { data: goals } = useQuery({
        queryKey: ['goals'],
        queryFn: getGoals,
    });

    const { data: employees } = useQuery({
        queryKey: ['employees'],
        queryFn: getEmployeesForTaskCreation,
    });

    const { data: parentTasks, isFetching } = useQuery({
        queryKey: ['parent_tasks', taskTypeValue],
        queryFn: getParentTasks,
        enabled: taskTypeValue === 'subtask',
    });


    const formatDate = (date) =>
        date ? date.toISOString().split('T')[0] : '';

    const goalItems =
        goals?.map(g => ({ label: g.goal_name, value: g.id })) || [];

    const parentItems =
        parentTasks?.map(t => ({ label: t.name, value: t.id })) || [];

    const assigneeItems =
        employees?.map(e => ({ label: e.name, value: e.id })) || [];

    function resetForm() {
        setTaskname('');
        setTaskDescription('');
        setTaskTypeValue(null);
        setGoalValue(null);
        setParentValue(null);
        setAssigneeValue(null);
        setStartDate(null);
        setDueDate(null);
    }

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (payload) => createTask(payload),

        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
            resetForm()
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
                                onChange={(e) => {
                                    setTaskname(e.nativeEvent.text)
                                }}
                            />

                            {/* Description */}
                            <Text style={[styles.label, { color: colors.textSecondary }]}>
                                Description
                            </Text>
                            <TextInput
                                placeholder="Enter description"
                                placeholderTextColor={colors.textSecondary}
                                multiline
                                style={[styles.textArea, { borderColor: colors.border, color: colors.textPrimary }]}
                                onChange={(e) => {
                                    setTaskDescription(e.nativeEvent.text);
                                }}
                            />

                            {/* Task Type */}
                            <FormDropdown
                                id="taskType"
                                label="Task Type"
                                open={taskTypeOpen}
                                value={taskTypeValue}
                                items={taskTypes}
                                setOpen={setTaskTypeOpen}
                                setValue={setTaskTypeValue}
                                setItems={setTaskTypes}
                                placeholder="Select task type"
                                zIndex={5000}
                                colors={colors}
                                activeDropdown={activeDropdown}
                                setActiveDropdown={setActiveDropdown}
                            />

                            {/* Goal */}
                            {taskTypeValue === 'main' && (
                                <FormDropdown
                                    id="goal"
                                    label="Goal"
                                    open={goalOpen}
                                    value={goalValue}
                                    items={goalItems}
                                    setOpen={setGoalOpen}
                                    setValue={setGoalValue}
                                    placeholder="Select goal"
                                    zIndex={4000}
                                    colors={colors}
                                    activeDropdown={activeDropdown}
                                    setActiveDropdown={setActiveDropdown}
                                />
                            )}

                            {/* Parent Task */}
                            {taskTypeValue === 'subtask' && (
                                <FormDropdown
                                    id="parent"
                                    label="Parent Task"
                                    open={parentOpen}
                                    value={parentValue}
                                    items={parentItems}
                                    setOpen={setParentOpen}
                                    setValue={setParentValue}
                                    placeholder="Select parent task"
                                    zIndex={4000}
                                    colors={colors}
                                    activeDropdown={activeDropdown}
                                    setActiveDropdown={setActiveDropdown}
                                />
                            )}

                            <FormDropdown
                                id="assignee"
                                label="Assign To"
                                open={assigneeOpen}
                                value={assigneeValue}
                                items={assigneeItems}
                                setOpen={setAssigneeOpen}
                                setValue={setAssigneeValue}
                                placeholder="Select employee"
                                searchable
                                zIndex={3000}
                                colors={colors}
                                activeDropdown={activeDropdown}
                                setActiveDropdown={setActiveDropdown}
                            />

                            {/* Dates */}
                            <Text style={[styles.label, { color: colors.textSecondary }]}>
                                Start Date
                            </Text>
                            <TouchableOpacity onPress={() => setActivePicker('start')}>
                                <View style={[styles.input, { borderColor: colors.border, justifyContent: 'center' }]}>
                                    <Text style={{ color: startDate ? colors.textPrimary : colors.textSecondary }}>
                                        {startDate ? formatDate(startDate) : 'Select start date'}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <Text style={[styles.label, { color: colors.textSecondary }]}>
                                Due Date
                            </Text>
                            <TouchableOpacity onPress={() => setActivePicker('due')}>
                                <View style={[styles.input, { borderColor: colors.border, justifyContent: 'center' }]}>
                                    <Text style={{ color: dueDate ? colors.textPrimary : colors.textSecondary }}>
                                        {dueDate ? formatDate(dueDate) : 'Select due date'}
                                    </Text>
                                </View>
                            </TouchableOpacity>

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
                                    style={[
                                        styles.button,
                                        { backgroundColor: colors.primary, opacity: isPending ? 0.6 : 1 },
                                    ]}
                                    onPress={() =>
                                        mutate({
                                            task: {
                                                name: taskName,
                                                description: taskDescription,
                                                task_type: taskTypeValue,
                                                goal_id: goalValue || null,
                                                parent_id: parentValue || null,
                                                assigned_to: assigneeValue,
                                                start_date: formatDate(startDate),
                                                due_date: formatDate(dueDate),
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

                        <DateTimePickerModal
                            isVisible={!!activePicker}
                            mode="date"
                            onConfirm={(date) => {
                                activePicker === 'start' ? setStartDate(date) : setDueDate(date);
                                setActivePicker(null);
                            }}
                            onCancel={() => setActivePicker(null)}
                            minimumDate={
                                activePicker === 'start'
                                    ? new Date()
                                    : startDate || new Date()
                            }
                        />
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
        height: '85%',
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
    segmentWrapper: {
        flexDirection: 'row',
        borderRadius: 14,
        backgroundColor: 'transparent',
        gap: 10,
        marginTop: 6,
    },

    segment: {
        flex: 1,
        height: 40,
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
