import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useQuery } from '@tanstack/react-query';

import { getUserDetails } from '../../../(auth)/authStorage';
import { getUserTasks } from '../../../api/tasks.api';
import { useAppTheme } from '../../theme/ThemeContext';

import EmployeeTaskComponent from '../../../../components/tasks/EmployeeTaskComponent';
import ManagerOrLeadeTaskComponenet from '../../../../components/tasks/ManagerOrLeadeTaskComponenet';

export function TasksScreen() {
    const { colors } = useAppTheme();

    const {
        data,
        isLoading,
        error,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ['userTaskDetails'],
        queryFn: getUserTasks,
        refetchOnMount: 'always',
    });

    const [selectedTask, setSelectedTask] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        async function getUserData() {
            const stored = await getUserDetails();
            setUserRole(JSON.parse(stored)?.role);
        }
        getUserData();
    }, []);


    const openTask = (task) => {
        setSelectedTask(task);
        setModalVisible(true);
    };

    const closeTask = () => {
        setModalVisible(false);
        setSelectedTask(null);
    };

    if (isLoading) {
        return (
            <View style={[styles.loaderContainer, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.loaderText, { color: colors.textSecondary }]}>
                    Loading tasks…
                </Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.loaderContainer, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.textPrimary }}>
                    Failed to load tasks
                </Text>
            </View>
        );
    }

    return (
        <>
            {userRole === 'employee' ? (
                <EmployeeTaskComponent
                    data={data}
                    isFetching={isFetching}
                    refetch={refetch}
                    colors={colors}
                    selectedTask={selectedTask}
                    modalVisible={modalVisible}
                    openTask={openTask}
                    closeTask={closeTask}
                />
            ) : (
                <ManagerOrLeadeTaskComponenet
                    colors={colors}
                    assignedTaks={data}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderText: {
        marginTop: 12,
        fontSize: 14,
    },
});
