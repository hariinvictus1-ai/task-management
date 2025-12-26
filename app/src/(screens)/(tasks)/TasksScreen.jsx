import { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { TaskCard } from '../../../../components/tasks/TaskCard';
import { TaskDetailsModal } from '../../../../components/tasks/TaskDetailsModal';

import { getUserTasks } from '../../../api/tasks.api';
import { useAppTheme } from '../../theme/ThemeContext';



export function TasksScreen() {
    const { colors } = useAppTheme();
    const { data, isLoading, error } = useQuery({
        queryKey: ['userTaskDetails'],
        queryFn: getUserTasks
    })

    useEffect(() => {
        console.log(data, "data")
    }, [data])

    const [selectedTask, setSelectedTask] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const openTask = (task) => {
        setSelectedTask(task);
        setModalVisible(true);
    };

    const closeTask = () => {
        setModalVisible(false);
        setSelectedTask(null);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            <FlatList
                data={data}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        onPress={() => openTask(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
            <View style={[styles.bottomBar, { backgroundColor: colors.card }]}>
                <Text style={[styles.bottomText, { color: colors.primary }]}>
                    Sort
                </Text>

                <View style={[styles.divider, { backgroundColor: colors.border }]} />

                <Text style={[styles.bottomText, { color: colors.primary }]}>
                    Filters
                </Text>
            </View>
            <TaskDetailsModal
                visible={modalVisible}
                task={selectedTask}
                onClose={closeTask}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
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
});
