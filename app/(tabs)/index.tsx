import { Text, View, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Keyboard } from "react-native";
import { Link } from "expo-router";
import Task from "@/components/tasks";
import React from "react";
import { useState, useEffect } from "react";
import * as asyncStore from "@/utils/AsyncStorage";
import { DateTask, DefaultTask, WeekTask, Tasks, DaysOfWeek } from "@/utils/DataTypes";

export default function Index() {
  const [task, setTask] = useState<string | undefined>();
  const [taskItems, setTaskItems] = useState<Tasks[]>([]);
  
  
  useEffect(() => {
    const getTodayTasks = async () => {
      try {
        const todayTasksJSON = await asyncStore.getItem("today")
        if(todayTasksJSON && todayTasksJSON.length > 0) {
          const todayTasks = todayTasksJSON;
          setTaskItems(todayTasks)
        }
      } catch (error) {
        console.log("Error getting today's tasks: ", error)
      }
    }

    getTodayTasks();
  }, [task])

  const handleAddTask = async () => {
    Keyboard.dismiss()
    if(task){
      const newTask: DefaultTask = {
        taskDir: task
      }
      try {
        const todayTasksJSON = await asyncStore.getItem("today")
        if(todayTasksJSON && todayTasksJSON.length > 0){
          let todayTasks = todayTasksJSON
          todayTasks.push(newTask)
          await asyncStore.setItem("today", todayTasks)
          setTaskItems(todayTasks)
        } else {
          const todayTaskArr = [newTask]
          setTaskItems(todayTaskArr)
          await asyncStore.setItem("today", todayTaskArr)
        }
      } catch (error) {
        console.log("Error adding new today task to data: ", error)
      }
      setTask(undefined)
    }
    
  }

  const completeTask = async (index:number) => {
    try {
      let itemsCopy = [...taskItems];
      itemsCopy.splice(index, 1) 
      await asyncStore.setItem("today", itemsCopy)
      setTaskItems(itemsCopy)
    } catch (error) {
      console.log("Error completing task: ", error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>

        <ScrollView style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task task={item}/>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
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
    marginTop: 30,
    maxHeight: '85%'
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