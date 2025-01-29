import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { useState, useEffect } from "react";
import * as asyncStore from "@/utils/AsyncStorage";
import { DateTask, DefaultTask, WeekTask, Tasks, DaysOfWeek } from "@/utils/DataTypes";

export default function CalenderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Calender screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
