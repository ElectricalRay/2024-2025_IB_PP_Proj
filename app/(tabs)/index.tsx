import { Text, View, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from "react-native";
import { Keyboard } from "react-native";
import { Link } from "expo-router";
import Task from "@/components/tasks";
import React from "react";
import { useState } from "react";
import * as asyncStore from "@/utils/AsyncStorage";

export default function Index() {
  const [task, setTask] = useState<string | undefined>();
  const [taskItems, setTaskItems] = useState<any[]>([]);

  const handleAddTask = () => {
    Keyboard.dismiss()
    if(task){
      setTaskItems([...taskItems, task])
      setTask(undefined)
    }
  }

  const completeTask = (index:number) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1)
    setTaskItems(itemsCopy)
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>

        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item}/>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTasksWrapper}>
        <TextInput style={styles.input} placeholder="Write a task" value={task} onChangeText={text => setTask(text)}/>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e'
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  items: {
    marginTop: 30
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#cococo',
    borderWidth: 1,
    width: 250,

  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#cococo',
    borderWidth: 1,
  },
  addText: {

  },
  writeTasksWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});