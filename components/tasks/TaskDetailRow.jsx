import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppTheme } from '../../app/src/theme/ThemeContext';

export function TaskDetailRow({
  label,
  value,
  editable = false,
  multiline = false,
}) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        {label}
      </Text>

      {editable ? (
        <TextInput
          defaultValue={value}
          multiline={multiline}
          placeholderTextColor={colors.textPrimary} // 👈 here
          style={[
            styles.input,
            {
              color: colors.textPrimary,
              borderColor: colors.border,
            },

          ]}
        />
      ) : (
        <Text style={[styles.value, { color: colors.textPrimary }]}>
          {value || '-'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
});
