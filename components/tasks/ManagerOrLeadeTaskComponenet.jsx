import { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

function ManagerOrLeadTaskComponent({ colors }) {
    const [activeTab, setActiveTab] = useState('assigned');
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [createdTasks, setCreatedTasks] = useState([])

    const data =
        activeTab === 'assigned' ? assignedTasks : createdTasks;

    return (
        <View style={styles.container}>

            {/* TOP TABS */}
            <View style={[styles.tabsContainer, { borderBottomColor: colors.border }]}>
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

            {/* TASK LIST */}
            <FlatList
                data={data}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TaskCard task={item} />
                )}
                showsVerticalScrollIndicator={false}
            />

            {/* BOTTOM BAR */}
            <View style={[styles.bottomBar, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
                <Text style={[styles.bottomText, { color: colors.primary }]}>
                    Sort
                </Text>

                <View style={[styles.divider, { backgroundColor: colors.border }]} />

                <Text style={[styles.bottomText, { color: colors.primary }]}>
                    Filters
                </Text>
            </View>
        </View>
    );
}

export default ManagerOrLeadTaskComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    /* TOP TABS */
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

    /* LIST */
    list: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 80,
    },

    /* BOTTOM BAR */
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
