import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { getUserTasks } from '../../app/api/tasks.api';

import CreateEmployeeModal from './CreateEmployeeModal';
import { TaskCard } from './TaskCard';
import { TaskDetailsModal } from './TaskDetailsModal';

function ManagerOrLeadTaskComponent({ colors, assignedTasks }) {
    const [activeTab, setActiveTab] = useState('assigned');
    const [viewTask, setViewTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [createEmployeeVisible, setCreateEmployeeVisible] = useState(false);

    const {
        data: createdTasks,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['tasks', activeTab],
        queryFn: () => getUserTasks(activeTab),
        enabled: activeTab === 'created',
        keepPreviousData: true,
        retry: false,
    });

    const safeAssignedTasks = Array.isArray(assignedTasks)
        ? assignedTasks
        : [];
    const safeCreatedTasks = Array.isArray(createdTasks)
        ? createdTasks
        : [];

    const data =
        activeTab === 'assigned'
            ? safeAssignedTasks
            : safeCreatedTasks;

    const openTask = (task) => {
        setSelectedTask(task);
        setViewTask(true);
    };

    const closeTask = () => {
        setViewTask(false);
        setSelectedTask(null);
    };

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.tabsContainer,
                    {
                        borderBottomColor: colors.border,
                        backgroundColor: colors.background,
                    },
                ]}
            >
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === 'assigned' && {
                            borderBottomColor: colors.primary,
                        },
                    ]}
                    onPress={() => setActiveTab('assigned')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            {
                                color:
                                    activeTab === 'assigned'
                                        ? colors.primary
                                        : colors.textSecondary,
                            },
                        ]}
                    >
                        Assigned to Me
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === 'created' && {
                            borderBottomColor: colors.primary,
                        },
                    ]}
                    onPress={() => setActiveTab('created')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            {
                                color:
                                    activeTab === 'created'
                                        ? colors.primary
                                        : colors.textSecondary,
                            },
                        ]}
                    >
                        Created by Me
                    </Text>
                </TouchableOpacity>
            </View>
            {activeTab === 'created' && isLoading && (
                <Text style={{ padding: 16, color: colors.textSecondary }}>
                    Loading tasks…
                </Text>
            )}
            {error && (
                <Text style={{ padding: 16, color: 'red' }}>
                    Failed to load tasks
                </Text>
            )}
            <FlatList
                data={data}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TaskCard task={item} onPress={() => openTask(item)} />
                )}
                ListEmptyComponent={
                    !isLoading && (
                        <Text style={{ padding: 16, color: colors.textSecondary }}>
                            No tasks found
                        </Text>
                    )
                }
                style={{ backgroundColor: colors.background }}
                showsVerticalScrollIndicator={false}
            />
            {activeTab === 'created' &&
                !viewTask &&
                !createEmployeeVisible && (
                    <TouchableOpacity
                        style={[
                            styles.fab,
                            { backgroundColor: colors.primary },
                        ]}
                        onPress={() => setCreateEmployeeVisible(true)}
                    >
                        <Text style={styles.fabText}>+ Employee</Text>
                    </TouchableOpacity>
                )}

            <View
                style={[
                    styles.bottomBar,
                    {
                        backgroundColor: colors.card,
                        borderTopColor: colors.border,
                    },
                ]}
            >
                <Text style={[styles.bottomText, { color: colors.primary }]}>
                    Sort
                </Text>

                <View
                    style={[styles.divider, { backgroundColor: colors.border }]}
                />

                <Text style={[styles.bottomText, { color: colors.primary }]}>
                    Filters
                </Text>
            </View>
            <TaskDetailsModal
                visible={viewTask}
                task={selectedTask}
                onClose={closeTask}
            />

            <CreateEmployeeModal
                visible={createEmployeeVisible}
                onClose={() => setCreateEmployeeVisible(false)}
                colors={colors}
            />
        </View>
    );
}

export default ManagerOrLeadTaskComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    tabsContainer: {
        flexDirection: 'row',
        height: 48,
        borderBottomWidth: 1,
    },

    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },

    tabText: {
        fontSize: 14,
        fontWeight: '600',
    },

    list: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 80,
    },

    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
    },

    bottomText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
    },

    divider: {
        width: 1,
        height: '60%',
    },

    fab: {
        position: 'absolute',
        right: 16,
        bottom: 72,
        height: 48,
        paddingHorizontal: 16,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
    },

    fabText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
    },
});
