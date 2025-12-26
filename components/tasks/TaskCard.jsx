import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppTheme } from '../../app/src/theme/ThemeContext';
import { CircularProgress } from './CircularProgress';

const STATUS_COLORS = {
  pending: '#F59E0B',
  completed: '#10B981',
  in_progress: '#3B82F6',
};

export function TaskCard({ task , onPress }) {
  const { colors, scheme } = useAppTheme();
  const statusColor = STATUS_COLORS[task.status] || '#9CA3AF';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: `${statusColor}33`,
        },
        
      ]}
    >
      {/* Status bar */}
      <View style={[styles.statusBar, { backgroundColor: statusColor }]} />

      <View style={styles.content}>
        {/* Top row */}
        <View style={styles.topRow}>
          <Text style={[styles.taskId, { color: colors.muted }]}>
            #{task.id}
          </Text>

          <CircularProgress progress={task.progess} />
        </View>

        {/* Task name */}
        <Text style={[styles.taskName, { color: colors.textPrimary }]}>
          {task.name}
        </Text>

        {/* Meta */}
        <View style={styles.metaRow}>
          <Text style={[styles.metaText, { color: colors.textSecondary }]}>
            Created by:{' '}
            <Text style={[styles.metaValue, { color: colors.textPrimary }]}>
              {task.created_by}
            </Text>
          </Text>

          <Text style={[styles.statusText, { color: statusColor }]}>
            {task.status}
          </Text>
        </View>
      </View>

      {/* Arrow */}
      <View style={styles.arrow}>
        <Icon
          name="chevron-forward"
          size={20}
          color={colors.muted}
        />
      </View>
    </TouchableOpacity>
  );
}



const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 14,
    marginVertical: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  statusBar: {
    width: 6,
  },
  content: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskId: {
    fontSize: 12,
    fontWeight: '500',
  },
  taskName: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '700',
  },
  metaRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
  },
  metaValue: {
    fontWeight: '600',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  arrow: {
    justifyContent: 'center',
    paddingRight: 8,
  },
});
