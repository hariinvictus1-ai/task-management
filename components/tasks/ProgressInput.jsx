import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TaskDetailRow } from './TaskDetailRow';

export const ProgressInput = React.memo(function ProgressInput({
    mode,
    value,
    onChange,
    colors,
}) {
    if (mode === 'view') {
        return <TaskDetailRow label="Progress" value={`${value}%`} />;
    }

    return (
        <View style={styles.block}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
                Progress (%)
            </Text>

            <TextInput
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                placeholder="0 - 100"
                placeholderTextColor={colors.muted}
                style={[
                    styles.input,
                    { borderColor: colors.border, color: colors.textPrimary },
                ]}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    block: { marginTop: 12 },
    label: { fontSize: 12, marginBottom: 6 },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 44,
    },
});
