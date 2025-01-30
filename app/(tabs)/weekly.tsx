import { Text, View, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React from 'react';
import { useState, useEffect } from "react";
import * as asyncStore from "@/utils/AsyncStorage";
import { DateTask, DefaultTask, WeekTask, Tasks, DaysOfWeek } from "@/utils/DataTypes";
import AntDesign from '@expo/vector-icons/AntDesign';
import Task from "@/components/tasks";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

export default function WeeklyScreen() {
  const [daySelected, setDaySelected] = useState<DaysOfWeek>("sunday")
  const [tasksList, setTaskList] = useState<Tasks[]>([]);
  const [addingItem, setAddingItem] = useState<boolean>(false);
  const [task, setTask] = useState<string | undefined>()

  const days: DaysOfWeek[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

  useEffect(() => {
    console.log("day changed to ", daySelected)
    if(daySelected && daySelected.length > 0) {
      const getTasks = async () => {
        try {
          const tasksJSON = await asyncStore.getItem(daySelected)
          
          if(tasksJSON && tasksJSON.length > 0) {
            console.log(tasksJSON)
            setTaskList(tasksJSON)
          } else {
            setTaskList([])
          }    
        } catch (error) {
          console.log(`Error getting ${daySelected}'s tasks: `, error)
        }
        
      }

      getTasks()
    } 
  }, [daySelected])


  const removeTask = async (taskIndex:number) => {
    try {
      let itemsCopy = [...tasksList];
      itemsCopy.splice(taskIndex,1)
      await asyncStore.setItem(daySelected, itemsCopy)
      setTaskList(itemsCopy)
    } catch (error) {
      console.log(`Error removing one of ${daySelected}'s tasks`, error)
    }
  }

  const handleAddTask = async () => {
    Keyboard.dismiss()
    if(task) {
      const newTask: WeekTask = {
        day: daySelected,
        taskDir: task
      }
      try {
        const dayTasksJSON = await asyncStore.getItem(daySelected)
        if(dayTasksJSON && dayTasksJSON.length > 0) {
          dayTasksJSON.push(newTask)
          await asyncStore.setItem(daySelected, dayTasksJSON)
          setTaskList(dayTasksJSON)
        } else {
          const dayTaskArr = [newTask]
          setTaskList(dayTaskArr)
          await asyncStore.setItem(daySelected, dayTaskArr)
        }
      } catch (error) {
        console.log(`Error adding task for ${daySelected}: `, error)
      }
      setTask(undefined)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>

        <View style={styles.headerContainer}>
          <Text style={styles.headerSectionTitle}>Weekly Tasks</Text>
          
          <TouchableOpacity style={styles.addButton} onPress={() => {
            setAddingItem(!addingItem)
            setTask(undefined)
          }}>
            
            {addingItem ? (
              <AntDesign name="minus" size={20} color="white" style={{marginLeft: 5}}/>
            ): (
              <AntDesign name="plus" size={20} color='white' style={{marginLeft: 5}}/>
            )}
            <Text style={styles.btnText}>{addingItem ? "Stop" : "Add Task"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.daysContainer}>
          {
            days.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => setDaySelected(item)} style={daySelected === item ? [styles.dayBtn, {backgroundColor: '#ff3d3d'}] : styles.dayBtn}>
                  <Text style={styles.dayBtnText}>{item.substring(0,1).toUpperCase() + item.substring(1,2)}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>

      <View style={styles.tasksContainer}>
        <Text style={styles.tasksSectionTitle}>Tasks</Text>

        <ScrollView style={addingItem ? [styles.items, {maxHeight: '70%'}] : styles.items}>
          {
            tasksList.map((item, index) => {
              return (
                <Task task={item} planning={true} onPress={removeTask} taskIndex={index} key={index}/>
              )
            })
          }
        </ScrollView>
      </View>

      {addingItem && (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"} style={styles.writeTasksWrapper}>
          <TextInput style={styles.input} placeholder="Write a task" value={task} onChangeText={text => setTask(text)}/>
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  topContainer: {
    paddingTop: 80,
    paddingHorizontal: 30,
    borderBottomColor: '#ff3d3d',
    borderWidth: 2
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    verticalAlign: 'auto'
  },
  headerSectionTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  addButton: {
    backgroundColor: '#9c2cf3',
    width: 112.5,
    height: 45,
    borderRadius: 45,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  btnText: {
   color: '#fff',
   fontSize: 12,
   fontWeight: 'bold',
   marginRight: 5
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 25,
    marginBottom: 15
  },
  dayBtn: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 30,
    borderRadius: 20
  },
  dayBtnText: {
    fontSize: 15,
    color: '#fff'
  },
  tasksContainer: {
    paddingHorizontal: 30,
    paddingTop: 30
  },
  tasksSectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 25,
    maxHeight: '75%'
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
