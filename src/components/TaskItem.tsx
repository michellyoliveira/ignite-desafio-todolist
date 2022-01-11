import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { EditTaskArgs } from "../pages/Home";
import { Task } from "./TasksList";

import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";

interface TasksItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ id, newTitle }: EditTaskArgs) => void;
}

export function TaskItem({
  task,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskEditingValue, setTaskEditingValue] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskEditingValue(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ id: task.id, newTitle: taskEditingValue });
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <View style={styles.taskContainer}>
      <View style={styles.taskInfoContainer}>
        <TouchableOpacity
          //testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            //testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          {/*  <Text style={task.done ? styles.taskTextDone : styles.taskText}>
            {task.title}
          </Text> */}

          <TextInput
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={taskEditingValue}
            onChangeText={setTaskEditingValue}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.taskIconsContainer}>
        {isEditing ? (
          <TouchableOpacity
            //testID={`trash-${index}`}
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            //testID={`trash-${index}`}
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.taskButtonsDivider} />

        <TouchableOpacity
          //testID={`trash-${index}`}
          disabled={isEditing}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskInfoContainer: {
    flex: 1,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  taskIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 24,
    paddingLeft: 12,
  },
  taskButtonsDivider: {
    width: 1,
    height: 24,
    color: "rgba(196, 196, 196, 0.24)",
    marginHorizontal: 12,
  },
});
