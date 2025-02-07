import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, TextInput, ScrollView } from 'react-native';
import React, { memo, useCallback } from 'react';
import { useState, useEffect } from "react";
import * as asyncStore from "@/utils/AsyncStorage";
import { DateTask, DefaultTask, WeekTask, Tasks, DaysOfWeek } from "@/utils/DataTypes";
import { Calendar, CalendarList, Agenda, WeekCalendar, ExpandableCalendar, CalendarProvider } from 'react-native-calendars';
import { useIsFocused } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useRef } from 'react';
import Task from '@/components/tasks';

  const MemoizedExpandableCalendar = memo(({onDayPressed, dateSelected, onToggle} : {onDayPressed: any, dateSelected: any, onToggle: any}) => (
    <ExpandableCalendar
      firstDay={0}
      hideArrows={false}
      disableAllTouchEventsForDisabledDays
      onDayPress={onDayPressed}
      onCalendarToggled={onToggle}
      allowShadow={false}
      showSixWeeks={true}
      style={{borderBottomColor: '#ff3d3d', borderBottomWidth: 2}}
      theme={{
        backgroundColor: '#25292e',
        calendarBackground: '#25292e',
        todayTextColor: '#ff3d3d',
        dayTextColor: '#ffffff',
        textDisabledColor: '#9b9b9b',
        textSectionTitleColor: '#ffffff',
        monthTextColor: '#ffffff',
        selectedDayBackgroundColor: '#ff3d3d',
        selectedDayTextColor: '#25292e',
        arrowColor: '#ff3d3d',
        textMonthFontWeight: 'medium',
      }}
      />
  ))

export default function CalenderScreen() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toLocaleDateString('en-CA'))
  const isFocused = useIsFocused();
  const [addingItem, setAddingItem] = useState<boolean>(false)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [tasksList, setTaskList] = useState<Tasks[]>([]) 
  const [task, setTask] = useState<string | undefined>()
  

  useEffect(() => {
    console.log('date changed to ', selectedDate)
    if(selectedDate && selectedDate.length > 0) {
      const getTasks = async () => {
        try {
          const tasksJson = await asyncStore.getItem(selectedDate)
          if(tasksJson && tasksJson.length > 0) {
            console.log(tasksJson)
            setTaskList(tasksJson)
          } else {
            setTaskList([])
          }
        } catch (error) {
          console.log(`Error getting ${selectedDate}'s tasks: `, error)
        }
      }

      getTasks()
    }
  }, [selectedDate])  

  useEffect(() => {
    if(!isFocused) {
      setAddingItem(false)
    }
  }, [isFocused])  

  useEffect(() => {
    console.log("expanded?: ", isExpanded)
  },[isExpanded])

  const handleDaySelect = useCallback((day:any) => {
    setSelectedDate(day.dateString)
    console.log('selected date: ', day.dateString)
  }, [])

  const handleExpand = (isOpen : boolean) => {
    setIsExpanded(isOpen)
  }

  const handleAddTask = async () => {
    Keyboard.dismiss()
    if(task) {
      const newTask: DateTask = {
        date: selectedDate,
        taskDir: task,
        addToHome: false
      }

      try {
        const dateTasksJSON = await asyncStore.getItem(selectedDate)
        if(dateTasksJSON && dateTasksJSON.length > 0) {
          dateTasksJSON.push(newTask)
          await asyncStore.setItem(selectedDate, dateTasksJSON)
          setTaskList(dateTasksJSON)
        } else {
          const dateTaskArr = [newTask]
          await asyncStore.setItem(selectedDate, dateTaskArr)
          setTaskList(dateTaskArr)
        }
      } catch (error) {
        console.log(`Error adding a task for ${selectedDate}: `, error)
      }
      setTask(undefined)
    }
  }

  const removeTask = async (taskIndex:number) => {
    try {
      let itemsCopy = await asyncStore.getItem(selectedDate)
      let todayItems = await asyncStore.getItem('today')
      todayItems = todayItems.filter((arrElement: Tasks) => !("date" in arrElement && arrElement.taskDir === itemsCopy[taskIndex].taskDir))
      await asyncStore.setItem("today", todayItems)
      itemsCopy.splice(taskIndex, 1)
      await asyncStore.setItem(selectedDate, itemsCopy)
      setTaskList(itemsCopy)
      console.log(itemsCopy)
    } catch (error) {
      console.log(`Error removing a task for ${selectedDate}: `, error)
    }
  }


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Calendar Tasks</Text>

            <TouchableOpacity style={styles.addButton} onPress={() => {
              setAddingItem(!addingItem)
            }}>
              {addingItem ? (
                <AntDesign name='minus' size={20} color={'white'} style={{marginLeft: 5}}/>
              ) : (
                <AntDesign name='plus' size={20} color={'white'} style={{marginLeft: 5}}/>
              )}
              <Text style={styles.btnText}>{addingItem ? "Stop" : "Add Task"}</Text>
            </TouchableOpacity>
          </View>
          <View style={isExpanded ? [styles.calendarContainer, {height: 355}] : styles.calendarContainer}>
            <CalendarProvider
              date={selectedDate}
            >
              <View>
                <MemoizedExpandableCalendar onDayPressed={handleDaySelect} dateSelected={selectedDate} onToggle={handleExpand}/>
              </View>
            </CalendarProvider>
          </View>
        </View>
        <View style={isExpanded ? [styles.taskContainer, {maxHeight: '33%'}] : styles.taskContainer}>
          <Text style={styles.tasksSectionTitle}>Tasks</Text>
          
          <ScrollView>
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
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.writeTasksWrapper}>
            <TextInput style={styles.input} placeholder='Write a task' value={task} onChangeText={text => setTask(text)}/>
            <TouchableOpacity onPress={() => handleAddTask()}>
              <View style={styles.addWrapper}>
                <Text style={styles.addText}>+</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e'
  },
  topSection: {
    backgroundColor: '#25292e',
    paddingTop: 80,
  },
  headerText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 30
  },
  calendarContainer: {
    height: 144,
  },
  calendar: {
    flex: 1,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    verticalAlign: 'auto',
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  addButton: {
    backgroundColor: '#ff3d3d',
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
   taskContainer: {
    paddingHorizontal: 30,
    paddingTop: 30,
    maxHeight: '58%'
   },
   tasksSectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20
   },
   writeTasksWrapper: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
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

   }
});