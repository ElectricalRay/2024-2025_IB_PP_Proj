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
import Octicons from '@expo/vector-icons/Octicons';
import { useContext } from "react";
import { ThemeContext } from "@/constants/ThemeContext";


export default function Index() {
  const theme = useContext(ThemeContext)
  if (!theme) return null;

  const [task, setTask] = useState<string | undefined>();
  const [taskItems, setTaskItems] = useState<Tasks[]>([]);
  const days: DaysOfWeek[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const isFocused = useIsFocused();
  const [todoOrCompleted, setTodoOrCompleted] = useState(false)
  const [completedTasks, setCompletedTasks] = useState<Tasks[]>([])
  const [render, setRender] = useState(false)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primaryColor
    },
    tasksWrapper: {
      paddingTop: 80,
    },
    sectionTitle: {
      fontSize: 30,
      fontWeight: 'bold',
      color: theme.secondaryColor
    },
    items: {
      marginTop: 30,
      maxHeight: '85%',
      paddingHorizontal: 20
    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: theme.secondaryColor,
      borderRadius: 60,
      borderColor: theme.primaryColor,
      borderWidth: 1,
      width: 250,
      color: theme.primaryColor
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: theme.secondaryColor,
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.primaryColor,
      borderWidth: 1,
    },
    addText: {
      color: theme.primaryColor
    },
    writeTasksWrapper: {
      position: 'absolute',
      bottom: 20,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      verticalAlign: 'auto',
      width: '100%',
      borderBottomColor: theme.accentColor,
      borderBottomWidth: 2,
      paddingBottom: 20,
      paddingHorizontal: 20
    },
    toggleButton: {
      backgroundColor: theme.accentColor,
      width: 112.5,
      height: 45,
      borderRadius: 45,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    },
    toggleBtnText: {
     color: theme.secondaryColor,
     fontSize: 12,
     fontWeight: 'bold',
    }
  });

  const getFormattedDate = () => {
    const today = new Date().toLocaleDateString('en-CA')
    return today
  }


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
      setTodoOrCompleted(false)
    }
  }, [isFocused])

  useEffect(() => {
    if(isFocused){
      const today = getDay()
      const todayDate = getFormattedDate()

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

      const getTodayDateTasks = async () => {
        try {
          const todayDateTasksJSON = await asyncStore.getItem(todayDate)
          if(todayDateTasksJSON && todayDateTasksJSON.length > 0) {
            let notAddedDateTasks = todayDateTasksJSON.filter((task: DateTask) => task.addToHome === false)
            todayDateTasksJSON.forEach((element: DateTask) => {
              if(element.addToHome === false) {
                element.addToHome = true
              }
            });
            await asyncStore.setItem(todayDate, todayDateTasksJSON)
            const todayTasksJSON = await asyncStore.getItem("today")
            let allTodayTasks = todayTasksJSON
            allTodayTasks.push(...notAddedDateTasks)
            asyncStore.setItem("today", allTodayTasks)
            setTaskItems(allTodayTasks)
          }
        } catch (error) {
          console.log("Error getting today's date tasks: ", error)
        }
      }

      const filterOutOldDateTasks = async () => {
        try {
          let allTodayTasks = await asyncStore.getItem("today")
          const filteredTodayTasks = allTodayTasks.filter((element : Tasks) => ("date" in element && element.date === todayDate) || !("date" in element))
          await asyncStore.setItem("today", filteredTodayTasks)
        } catch (error) {
          console.log("Error filtering out old date tasks:", error)
        }
      }

      const getCompleted = async () => {
        try {
          const completedJSON = await asyncStore.getItem("complete")
          if(completedJSON && completedJSON.length > 0) {
            setCompletedTasks(completedJSON)
          }
        } catch (error) {
          console.log("Error getting completed tasks: ", error)
        }
      }

      const doAll = async () => {
        await filterOutOldDateTasks();
        await filterOutOldWeeklyTasks();
        await getTodayWeeklyTasks();
        await getTodayDateTasks();
        await getTodayTasks();
      }

      if(todoOrCompleted) {
        getCompleted()
      }

      doAll()
      

    }
  }, [task, isFocused, todoOrCompleted])

  useEffect(() => {
    if(!todoOrCompleted || !isFocused) {
      setCompletedTasks([])
    }
  }, [todoOrCompleted, isFocused])

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

      if("date" in itemsCopy[index] && "taskDir" in itemsCopy[index] && "addToHome" in itemsCopy[index]) {
        let dateTasks = await asyncStore.getItem(itemsCopy[index].date)
        const itemIndex = dateTasks.findIndex((arrItem: Tasks) => arrItem.taskDir === itemsCopy[index].taskDir)
        console.log("date tasks: ",dateTasks)
        console.log("item index: ", itemIndex)
        console.log("items copy index item: ", itemsCopy[index])
        if(itemIndex >= 0) {
          dateTasks.splice(itemIndex,1)
          await asyncStore.setItem(itemsCopy[index].date, dateTasks)
        }
      }

      const completed = await asyncStore.getItem("complete")
      completed.push(itemsCopy[index])
      await asyncStore.setItem("complete", completed)

      itemsCopy.splice(index, 1) 
      await asyncStore.setItem("today", itemsCopy)
      setTaskItems(itemsCopy)
    } catch (error) {
      console.log("Error completing task: ", error)
    }
  }

  const onCompletedRemove = async (index : number) => {
    try {
      let itemsCopy = [...completedTasks]
      itemsCopy.splice(index, 1)
      await asyncStore.setItem("complete", itemsCopy)
      setCompletedTasks(itemsCopy)
    } catch (error) {
      console.log("Error removing completed task: ", error)
    } 
  }

  return (
    <TouchableWithoutFeedback onPress={() =>Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.tasksWrapper}>
          <View style={styles.headerContainer}>
            <Text style={styles.sectionTitle}>{todoOrCompleted ? "Completed Tasks" : "Today's Tasks"}</Text>
            <TouchableOpacity onPress={() => setTodoOrCompleted(!todoOrCompleted)} style={styles.toggleButton}>
              <Octicons name="arrow-switch" size={20} color={theme.secondaryColor} />
              <Text style={styles.toggleBtnText}>{todoOrCompleted ? "To Do" : "Completed"}</Text>
            </TouchableOpacity>
          </View>
          

          <ScrollView style={styles.items}>
            {todoOrCompleted ?
              completedTasks.map((item, index) => {
                return (
                 <Task task={item} completed={true} onPress={onCompletedRemove} taskIndex={index} key={index} mode={theme.mode}/>
                )
              }) : 
              taskItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task task={item} mode={theme.mode}/>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTasksWrapper}>
          <TextInput style={theme.mode === 'light' ? [styles.input, {backgroundColor: '#616161'}] : styles.input} placeholder="Write a task" value={task} onChangeText={text => setTask(text)} placeholderTextColor={theme.primaryColor}/>
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={theme.mode === 'light' ? [styles.addWrapper, {backgroundColor: '#616161'}] : styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>

      </View>
    </TouchableWithoutFeedback>
  );
}

