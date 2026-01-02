import { useTheme } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getUserReviews } from '../../../api/reviews.api';

function ReviewsScreen() {
    // mock data – replace with react-query data

    const { colors } = useTheme();
    const tasks = [
        {
            id: 1,
            name: 'API Integration',
            created_by: 'John',
            progress: 100,
            completed_at: '2026-01-01',
            review: { rating: 4 },
        },
        {
            id: 2,
            name: 'UI Cleanup',
            created_by: 'Sarah',
            progress: 100,
            completed_at: '2026-01-02',
            review: null,
        },
    ];

    const { data: userReviews, isLoading } = useQuery({
        queryKey: ["getUserReviews"],
        queryFn: getUserReviews
    })

    return (
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 1)', height: "100%" }}>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

export default ReviewsScreen;
const renderItem = ({ item }) => {
    const hasReview = !!item.review;
    return (
        <View style={styles.card}>
            <View
                style={[
                    styles.statusBar,
                    { backgroundColor: hasReview ? '#10B981' : '#F59E0B' },
                ]}
            />

            <View style={styles.content}>
                <View style={styles.rowBetween}>
                    <Text style={styles.taskName}>{item.name}</Text>
                    <Text style={styles.progress}>100%</Text>
                </View>

                <Text style={styles.meta}>
                    Created by: <Text style={styles.metaBold}>{item.created_by}</Text>
                </Text>
                <Text style={styles.meta}>
                    Completed on: <Text style={styles.metaBold}>{item.completed_at}</Text>
                </Text>

                <View style={styles.reviewRow}>
                    {hasReview ? (
                        <>
                            <View style={styles.rating}>
                                <Icon name="star" size={16} color="#FACC15" />
                                <Text style={styles.ratingText}>
                                    {item.review.rating}/5
                                </Text>
                            </View>

                            <TouchableOpacity style={styles.actionBtn}>
                                <Text style={styles.actionText}>View Review</Text>
                            </TouchableOpacity>
                        </>
                    ) : (

                        <><View style={styles.rating}>
                            <Icon name="star" size={16} color="#FACC15" />
                            <Text style={styles.ratingText}>
                                --/5
                            </Text>
                        </View>
                            <TouchableOpacity style={[styles.actionBtn, styles.pendingBtn]}>
                                <Text style={styles.pendingText}>Review Pending</Text>
                            </TouchableOpacity>
                        </>

                    )}
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    list: {
        padding: 16,
    },

    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 14,
        marginBottom: 14,
        overflow: 'hidden',
        elevation: 2,
    },

    statusBar: {
        width: 4,
    },

    content: {
        flex: 1,
        padding: 14,
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    taskName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
    },

    progress: {
        fontSize: 13,
        fontWeight: '600',
        color: '#10B981',
    },

    meta: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 4,
    },

    metaBold: {
        fontWeight: '600',
        color: '#374151',
    },

    reviewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },

    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    ratingText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#111827',
    },

    actionBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        backgroundColor: '#EEF2FF',
    },

    actionText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4338CA',
    },

    pendingBtn: {
        backgroundColor: '#FEF3C7',
        // marginLeft:"auto"
    },

    pendingText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#92400E',
    },
});
