import { Text, View, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Keyboard } from "react-native";
import { Link } from "expo-router";
import Task from "@/components/tasks";
import React, { useCallback, useRef } from "react";
import { useState, useEffect } from "react";
import * as asyncStore from "@/utils/AsyncStorage";
import { DateTask, DefaultTask, WeekTask, Tasks, DaysOfWeek} from "@/utils/DataTypes";
import { TouchableWithoutFeedback } from "react-native";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";


export default function Index() {
  const [task, setTask] = useState<string | undefined>();
  const [taskItems, setTaskItems] = useState<Tasks[]>([]);
  const days: DaysOfWeek[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const isFocused = useIsFocused();

  const getDay = () => {
    const today = new Date();
    const dayNum = today.getDay()
    const day = days[dayNum]
    return day
  }

  useEffect(() => {
    const updateData = async () => {
      try {
        const lastExecuted = await asyncStore.getDataItem("lastExecuted")
        const lastExecutedDate = lastExecuted ? new Date(lastExecuted) : null
        const now = new Date()

        if (!lastExecutedDate || now.getTime() - lastExecutedDate.getTime() >= 7 * 24 * 60 * 60 * 1000) {

          for(let i = 0; i < days.length; i++) {
            const tasks = await asyncStore.getItem(days[i])
            if(tasks && tasks.length > 0) {
              const newTasks = tasks.map((element: WeekTask) => {
                element.addedToHome = false
                element.completed = false
              })
              await asyncStore.setItem(days[i], newTasks)
            }
          }
          await asyncStore.setDataItem("lastExecuted", now)
        }
      } catch (error) {
        console.log("Error resetting weekly task data values: ", error)
      }
    }

    updateData();
  })

  useEffect(() => {
    if(!isFocused) {
      setTaskItems([])
    }
  }, [isFocused])

  useEffect(() => {
    if(isFocused){
      const today = getDay()

      const filterOutOldWeeklyTasks = async () => {
        try {
          let allTodayTasks = await asyncStore.getItem("today")
          const filteredTodayTasks = allTodayTasks.filter((element : Tasks) => ("day" in element && element.day === today) || !("day" in element))
          await asyncStore.setItem("today", filteredTodayTasks)
        } catch (error) {
          console.log("Error filtering out old weekly tasks:", error)
        }
      }

      const getTodayWeeklyTasks = async () => {
        try {
          const todayWeeklyTasksJSON = await asyncStore.getItem(today)
          if(todayWeeklyTasksJSON && todayWeeklyTasksJSON.length > 0) {
            let notDoneWeeklyTasks = todayWeeklyTasksJSON.filter((task: WeekTask) => task.completed === false && task.addedToHome === false)
            todayWeeklyTasksJSON.forEach((element: WeekTask) => {
              if(element.addedToHome === false) {
                element.addedToHome = true
              }
            });
            await asyncStore.setItem(today, todayWeeklyTasksJSON)
            const todayTasksJSON = await asyncStore.getItem("today")
            let allTodayTasks = todayTasksJSON
            allTodayTasks.push(...notDoneWeeklyTasks)
            asyncStore.setItem("today", allTodayTasks)
            setTaskItems(allTodayTasks)
          }
        } catch (error) {
          console.log("Error getting today's weekly tasks: ", error)
        }
      }

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

      filterOutOldWeeklyTasks();
      getTodayWeeklyTasks();
      getTodayTasks();

    }
  }, [task, isFocused])

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
      if("day" in itemsCopy[index] && "taskDir" in itemsCopy[index] && "completed" in itemsCopy[index]) {
        const weeklyTasks = await asyncStore.getItem(itemsCopy[index].day)
        const itemIndex = weeklyTasks.findIndex((arrItem: Tasks) => arrItem.taskDir === itemsCopy[index].taskDir)
        console.log("weekly tasks: ",weeklyTasks)
        console.log("item index: ", itemIndex)
        console.log("items copy index item: ", itemsCopy[index])
        if(itemIndex >= 0) {
          weeklyTasks[itemIndex].completed = true
          await asyncStore.setItem(itemsCopy[index].day, weeklyTasks)
        }

      }
      itemsCopy.splice(index, 1) 
      await asyncStore.setItem("today", itemsCopy)
      setTaskItems(itemsCopy)
    } catch (error) {
      console.log("Error completing task: ", error)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() =>Keyboard.dismiss()}>
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
    </TouchableWithoutFeedback>
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
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});