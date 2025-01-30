import { Text, View, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React from 'react';
import { useState, useEffect } from "react";
import * as asyncStore from "@/utils/AsyncStorage";
import { DateTask, DefaultTask, WeekTask, Tasks, DaysOfWeek } from "@/utils/DataTypes";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function WeeklyScreen() {
  const [daySelected, setDaySelected] = useState<string>()
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>

        <View style={styles.headerContainer}>
          <Text style={styles.headerSectionTitle}>Weekly Tasks</Text>
          
          <TouchableOpacity style={styles.addButton}>
            <AntDesign name="plus" size={20} color='white' style={{marginLeft: 5}}/>
            <Text style={styles.btnText}>Add Task</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.daysContainer}>
          <TouchableOpacity onPress={() => setDaySelected('monday')} style={daySelected === "monday" ? [styles.dayBtn, {backgroundColor: 'yellow'}] : styles.dayBtn}>
            <Text style={styles.dayBtnText}>Mo</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setDaySelected('tuesday')} style={daySelected === "tuesday" ? [styles.dayBtn, {backgroundColor: 'yellow'}] : styles.dayBtn}>
            <Text style={styles.dayBtnText}>Tu</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setDaySelected('wednesday')} style={daySelected === "wednesday" ? [styles.dayBtn, {backgroundColor: 'yellow'}] : styles.dayBtn}>
            <Text style={styles.dayBtnText}>We</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setDaySelected('thursday')} style={daySelected === "thursday" ? [styles.dayBtn, {backgroundColor: 'yellow'}] : styles.dayBtn}>
            <Text style={styles.dayBtnText}>Th</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setDaySelected('friday')} style={daySelected === "friday" ? [styles.dayBtn, {backgroundColor: 'yellow'}] : styles.dayBtn}>
            <Text style={styles.dayBtnText}>Fr</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setDaySelected('saturday')} style={daySelected === "saturday" ? [styles.dayBtn, {backgroundColor: 'yellow'}] : styles.dayBtn}>
            <Text style={styles.dayBtnText}>Sa</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setDaySelected('sunday')} style={daySelected === "sunday" ? [styles.dayBtn, {backgroundColor: 'yellow'}] : styles.dayBtn}>
            <Text style={styles.dayBtnText}>Su</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tasksContainer}>
        <Text>Tasks</Text>
      </View>
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
    backgroundColor: '#999999'
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
    borderRadius: 45
  },
  dayBtnText: {
    fontSize: 15
  }
});
