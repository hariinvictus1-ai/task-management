import { Picker } from '@react-native-picker/picker';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { updateTask } from '../../app/api/tasks.api';
import { useAppTheme } from '../../app/src/theme/ThemeContext';
import { ProgressInput } from './ProgressInput';
import { TaskDetailRow } from './TaskDetailRow';



const STATUS_OPTIONS = [
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Completed', value: 'completed' },
];

export function TaskDetailsModal({ visible, task, onClose }) {
  const { colors } = useAppTheme();
  const [mode, setMode] = useState('view');
  const [form, setForm] = useState(null);
  const router = useRouter();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!task) return;

    setForm({
      status: task.status,
      progress: String(task.progess ?? 0),
    });

    setMode('view');
  }, [task]);

  if (!task || !form) return null;

  const handleProgressChange = (value) => {
    const numeric = value.replace(/[^0-9]/g, '');
    const clamped =
      numeric === ''
        ? ''
        : Math.min(100, Math.max(0, Number(numeric))).toString();

    setForm({ ...form, progress: clamped });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: colors.card }]}>

          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Task Details
          </Text>

          <TaskDetailRow label="Task Name" value={task.name} />
          <TaskDetailRow label="Task Type" value={task.task_type} />
          <TaskDetailRow label="Created By" value={task.created_by} />
          {task.parent_task && (
            <TaskDetailRow label="Parent Task" value={task.parent_task} />
          )}
          <TaskDetailRow label="Start Date" value={task.start_date} />
          <TaskDetailRow label="Due Date" value={task.due_date} />

          {mode === 'view' ? (
            <TaskDetailRow
              label="Status"
              value={form.status.replace('_', ' ')}
            />
          ) : (
            <View style={styles.block}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Status
              </Text>

              <View style={[styles.pickerWrapper, { borderColor: colors.border }]}>
                <Picker
                  selectedValue={form.status}
                  onValueChange={(v) =>
                    setForm({ ...form, status: v })
                  }
                  style={{ color: "white" }}
                >
                  {STATUS_OPTIONS.map(opt => (
                    <Picker.Item
                      key={opt.value}
                      label={opt.label}
                      value={opt.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          )}

          <ProgressInput
            mode={mode}
            value={form.progress}
            onChange={handleProgressChange}
            colors={colors}
          />

          <View style={styles.footer}>
            {mode === 'edit' ? (
              <>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.secondaryButton,
                    { borderColor: colors.border },
                  ]}
                  onPress={() => setMode('view')}
                >
                  <Text style={[styles.buttonText, { color: colors.textPrimary }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.primaryButton,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={async () => {
                    try {
                      const payload = {
                        status: form.status,
                        progress: Number(form.progress || 0),
                        id: task.id,
                      };

                      await updateTask(payload);

                      queryClient.invalidateQueries({ queryKey: ['userTaskDetails'] });

                      Alert.alert('Success', 'Task updated successfully');

                      setMode('view');
                      onClose();
                    } catch (error) {

                      Alert.alert(
                        'Update failed',
                        'Unable to update task. Please try again.'
                      );
                    }
                  }}

                >
                  <Text style={[styles.buttonText, { color: '#fff' }]}>
                    Save
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
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

                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.primaryButton,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={() => setMode('edit')}
                >
                  <Text style={[styles.buttonText, { color: '#fff' }]}>
                    Edit
                  </Text>
                </TouchableOpacity>
              </>
            )}
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
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  fieldBlock: {
    marginTop: 12,
  },
  label: {
    fontSize: 12,
    marginBottom: 6,
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 15,
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
  footer: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 12,
  },

  primaryButton: {
    backgroundColor: '#3B82F6',
    elevation: 2,
  },

  secondaryButton: {
    borderWidth: 1,
    backgroundColor: 'transparent',
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

});
