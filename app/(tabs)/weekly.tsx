import { Text, View, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React from 'react';
import { useState, useEffect } from "react";
import * as asyncStore from "@/utils/AsyncStorage";
import { DateTask, DefaultTask, WeekTask, Tasks, DaysOfWeek } from "@/utils/DataTypes";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function WeeklyScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>

        <View style={styles.headerContainer}>
          <Text style={styles.sectionTitle}>Weekly Tasks</Text>
          
          <TouchableOpacity style={styles.addButton}>
            <AntDesign name="plus" size={20} color='white'/>
            <Text style={styles.btnText}>Add Task</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity>
            <Text>Mo</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>Tu</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>We</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>Th</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>Fr</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>Sa</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>Su</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 90,
    paddingHorizontal: 30,
    backgroundColor: '#28def3'
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    verticalAlign: 'middle'
  },
  sectionTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 28,
  },
  addButton: {
    backgroundColor: '#9c2cf3',
    width: 100,
    height: 40,
    borderRadius: 45,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  btnText: {
   color: '#fff',
   fontSize: 12,
   fontWeight: 'bold',
  }
});
