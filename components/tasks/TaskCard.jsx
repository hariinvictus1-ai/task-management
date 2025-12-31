import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppTheme } from '../../app/src/theme/ThemeContext';

const STATUS_COLORS = {
  pending: '#F59E0B',
  completed: '#10B981',
  in_progress: '#3B82F6',
};
export function TaskCard({ task, onPress }) {
  const { colors } = useAppTheme();

  const progress = task.progess ?? 0;

  const progressColor =
    progress >= 100
      ? '#22C55E'
      : progress >= 70
        ? '#3B82F6'
        : progress >= 30
          ? '#F59E0B'
          : '#EF4444';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: "#626364ff",
        },
      ]}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.taskName, { color: colors.textPrimary }]}>
          {task.name}
        </Text>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: progressColor },
          ]}
        >
          <Text style={styles.statusText}>
            {task.status.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Meta */}
      <Text style={[styles.taskId, { color: colors.textSecondary }]}>
        Task #{task.id}
      </Text>

      <Text style={[styles.metaText, { color: colors.textSecondary }]}>
        Created by{' '}
        <Text style={[styles.metaValue, { color: colors.textPrimary }]}>
          {task.created_by}
        </Text>
      </Text>

      {/* Progress */}
      <View style={styles.progressRow}>
        <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>
          Progress
        </Text>
        <Text style={[styles.progressValue, { color: progressColor }]}>
          {progress}%
        </Text>
      </View>

      <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${progress}%`,
              backgroundColor: progressColor,
            },
          ]}
        />
      </View>

      {/* Arrow */}
      <View style={styles.arrow}>
        <Icon name="chevron-forward" size={20} color={colors.muted} />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  taskName: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },

  taskId: {
    fontSize: 12,
    marginTop: 6,
  },

  metaText: {
    fontSize: 12,
    marginTop: 4,
  },

  metaValue: {
    fontWeight: '600',
  },

  progressRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  progressLabel: {
    fontSize: 12,
  },

  progressValue: {
    fontSize: 12,
    fontWeight: '700',
  },

  progressBarBg: {
    height: 8,
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 6,
  },

  progressBarFill: {
    height: '100%',
    borderRadius: 6,
  },

  arrow: {
    position: 'absolute',
    right: 12,
    bottom: 60,
  },
});
