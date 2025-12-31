import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TaskCard } from "./TaskCard";
import { TaskDetailsModal } from "./TaskDetailsModal";


function EmployeeTaskComponent({
    data,
    isFetching,
    refetch,
    colors,
    selectedTask,
    modalVisible,
    openTask,
    closeTask,
}) {


    return <>
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
                refreshing={isFetching}
                onRefresh={refetch}
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

    </>
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  list: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 80, // space for bottom bar
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

export default EmployeeTaskComponent