import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export type EditTaskArgs = {
  id: number;
  newTitle: string;
};
export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const founTaskSameTitle = tasks.find((task) => task.title === newTaskTitle);

    if (founTaskSameTitle) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome."
      );
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldTasks) => [...oldTasks, newTask]);
  }

  function handleEditTask({ id, newTitle }: EditTaskArgs) {
    const updateedTask = tasks.map((task) => ({ ...task }));

    const foundItem = updateedTask.find((item) => item.id === id);

    if (!foundItem) return;

    foundItem.title = newTitle;
    setTasks(updateedTask);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const foundItem = updatedTasks.find((item) => item.id === id);

    if (!foundItem) return;

    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          style: "cancel",
          text: "Não",
        },
        {
          style: "destructive",
          text: "Sim",
          onPress: () => {
            setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id));
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
