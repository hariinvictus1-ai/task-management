import { useQuery } from '@tanstack/react-query';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONT_SIZES } from '../../constants/theme';
import { getRecentTasks } from './apis/dashboard.api';

const DashboardScreen = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['recentTasks'],
        queryFn: getRecentTasks,
    });

    if (isLoading) return <Text style={styles.loading}>Loading…</Text>;
    if (error) return <Text style={styles.error}>Something went wrong</Text>;

    const tasks = data || [];
    const recentTasks = tasks.slice(0, 3);

    // productivity calculation
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const progress =
        tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return COLORS.success;
            case 'in_progress':
                return COLORS.warning;
            case 'pending':
            default:
                return COLORS.danger;
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return 'checkmark-circle';
            case 'in_progress':
                return 'time-outline';
            case 'pending':
            default:
                return 'alert-circle-outline';
        }
    };

    const renderTask = ({ item }) => (
        <TouchableOpacity style={styles.taskCard} activeOpacity={0.85}>
            <View style={styles.taskLeft}>
                <Icon
                    name={getStatusIcon(item.status)}
                    size={20}
                    color={getStatusColor(item.status)}
                />
                <View style={styles.taskText}>
                    <Text style={styles.taskId}>Task #{item.id}</Text>
                    <Text style={styles.taskName} numberOfLines={1}>
                        {item.name}
                    </Text>
                </View>
            </View>
            <Icon name="chevron-forward" size={18} color={COLORS.textSecondary} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>Welcome back</Text>
            <View style={styles.heroCard}>
                <Text style={styles.heroTitle}>Overview of your productivity</Text>
                <View style={styles.progressRow}>
                    <View style={styles.progressTrack}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${progress}%` },
                            ]}
                        />
                    </View>
                    <Text style={styles.progressText}>{progress}%</Text>
                </View>

                <Text style={styles.heroSubText}>
                    You’ve completed {completedTasks} of {tasks.length} tasks
                </Text>
            </View>

            {/* TASKS SECTION */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Tasks</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View all</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={recentTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderTask}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            />
        </View>
    );
};

export default DashboardScreen;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 16,
    },

    subtitle: {
        fontSize: FONT_SIZES.body,
        fontFamily: 'InterRegular',
        color: COLORS.textSecondary,
        marginBottom: 16,
    },

    heroCard: {
        backgroundColor: '#0F172A', 
        borderRadius: 20,
        padding: 20,
        marginBottom: 28,
    },

    heroTitle: {
        fontSize: 20,
        fontFamily: 'InterSemiBold',
        color: '#FFFFFF',
        marginBottom: 16,
    },

    progressRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    progressTrack: {
        flex: 1,
        height: 8,
        borderRadius: 8,
        backgroundColor: '#334155',
        marginRight: 12,
    },

    progressFill: {
        height: 8,
        borderRadius: 8,
        backgroundColor: COLORS.primary,
    },

    progressText: {
        fontSize: FONT_SIZES.small,
        fontFamily: 'InterMedium',
        color: '#E5E7EB',
    },

    heroSubText: {
        fontSize: FONT_SIZES.small,
        fontFamily: 'InterRegular',
        color: '#CBD5E1',
        marginTop: 12,
    },

    /* SECTION */
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },

    sectionTitle: {
        fontSize: FONT_SIZES.section,
        fontFamily: 'InterSemiBold',
        color: COLORS.textPrimary,
    },

    viewAll: {
        fontSize: FONT_SIZES.small,
        fontFamily: 'InterMedium',
        color: COLORS.primary,
    },

    /* TASK CARD */
    taskCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 2,
    },

    taskLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    taskText: {
        marginLeft: 12,
    },

    taskId: {
        fontSize: FONT_SIZES.small,
        fontFamily: 'InterRegular',
        color: COLORS.textSecondary,
    },

    taskName: {
        fontSize: FONT_SIZES.body,
        fontFamily: 'InterMedium',
        color: COLORS.textPrimary,
        marginTop: 2,
    },

    loading: {
        padding: 20,
        fontFamily: 'InterRegular',
        color: COLORS.textSecondary,
    },

    error: {
        padding: 20,
        fontFamily: 'InterRegular',
        color: COLORS.danger,
    },
});
