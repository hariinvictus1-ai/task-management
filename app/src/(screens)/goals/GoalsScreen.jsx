import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { getGoals } from '../../../api/goals.api';

import CreateGoalModal from '../../../../components/goals/CreateGoalModal';
import { GoalDetailsModal } from '../../../../components/goals/GoalDetailsModal';
import { useAppTheme } from '../../theme/ThemeContext';

function GoalsScreen() {
    const { colors } = useAppTheme();
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [createGoalModel, setCreateGoalModel] = useState(false);
    const {
        data,
        isLoading,
        error,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ['goals'],
        queryFn: getGoals,
        refetchOnMount: 'always',
    });

    if (isLoading) {
        return (
            <View style={[styles.loaderContainer, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.loaderText, { color: colors.textSecondary }]}>
                    Loading goals…
                </Text>
            </View>
        );
    }


    if (error) {
        const errorMessage =
            error?.response?.data?.error ||
            error?.message ||
            'Something went wrong';

        const isUnauthorized =
            errorMessage.toLowerCase().includes('not authorized');

        return (
            <View style={[styles.loaderContainer, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>
                    {isUnauthorized ? 'Session expired' : 'Error'}
                </Text>

                <Text
                    style={{
                        color: colors.textSecondary,
                        marginTop: 8,
                        textAlign: 'center',
                    }}
                >
                    {isUnauthorized
                        ? 'You are not authorized to view goals. Please login again.'
                        : errorMessage}
                </Text>
            </View>
        );
    }


    if (!data || data.length === 0) {
        return (
            <View style={[styles.loaderContainer, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.textSecondary }}>
                    No goals found
                </Text>
            </View>
        );
    }


    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={data}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.list}
                refreshing={isFetching}
                onRefresh={refetch}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    const progress = item.progress ?? 0;

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
                            onPress={() => {
                                setSelectedGoal(item);
                                setModalVisible(true);
                            }}
                            style={[styles.goalCard, { backgroundColor: colors.card }]}
                        >
                            <View style={styles.headerRow}>
                                <Text style={[styles.goalTitle, { color: colors.textPrimary }]}>
                                    {item.goal_name}
                                </Text>

                                <View
                                    style={[
                                        styles.statusBadge,
                                        {
                                            backgroundColor:
                                                item.status === 'open'
                                                    ? colors.border
                                                    : '#22C55E',
                                        },
                                    ]}
                                >
                                    <Text style={styles.statusText}>
                                        {item.status.toUpperCase()}
                                    </Text>
                                </View>
                            </View>

                            {item.description ? (
                                <Text
                                    style={[styles.goalDescription, { color: colors.textSecondary }]}
                                    numberOfLines={2}
                                >
                                    {item.description}
                                </Text>
                            ) : null}

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

                            <Text style={[styles.dateText, { color: colors.textSecondary }]}>
                                Created on {new Date(item.created_at).toDateString()}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />

            {/* Modal MUST live outside FlatList */}
            <GoalDetailsModal
                visible={modalVisible}
                goal={selectedGoal}
                onClose={() => {
                    setModalVisible(false);
                    setSelectedGoal(null);
                }}
            />

            <TouchableOpacity
                style={[
                    styles.fab,
                    { backgroundColor: colors.primary },
                ]}
                onPress={() => setCreateGoalModel(true)}
            >
                <Text style={styles.fabText}>+ Goal</Text>
            </TouchableOpacity>

            {
                createGoalModel && <CreateGoalModal visible={createGoalModel} onClose={() => { setCreateGoalModel(false) }} colors={colors} />
            }


        </View>
    );
}

export default GoalsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    list: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 24,
    },

    goalCard: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#626364ff',
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

    goalTitle: {
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

    goalDescription: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 12,
    },

    progressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
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
        marginBottom: 8,
    },

    progressBarFill: {
        height: '100%',
        borderRadius: 6,
    },

    dateText: {
        fontSize: 11,
        marginTop: 4,
    },

    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loaderText: {
        marginTop: 12,
        fontSize: 14,
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 72,
        height: 48,
        paddingHorizontal: 26,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
    },
    fabText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
    }
});
