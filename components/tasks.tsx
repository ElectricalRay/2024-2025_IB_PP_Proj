import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { DateTask, DefaultTask, WeekTask, Tasks, DaysOfWeek } from "@/utils/DataTypes";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useContext } from "react";
import { ThemeContext } from "@/constants/ThemeContext";

type Props = {
    task: Tasks
    planning?: boolean
    taskIndex?: number
    onPress?: (parameter: number) => void
    completed?: boolean
}

export default function Task(props: Props) {
    const {task, planning, taskIndex, onPress, completed} = props
    const theme = useContext(ThemeContext)
    if (!theme) return null;

    const styles = StyleSheet.create({
        item: {
            backgroundColor: '#fff',
            padding: 15,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20
        },
        itemLeft: {
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap'
        },
        square: {
            opacity: 0.4,
            marginRight: 15
        },
        itemText: {
            maxWidth: '80%',  
        },
        circular: {
            width: 12,
            height: 12,
            borderColor: theme.accentColor,
            borderWidth: 2,
            borderRadius: 5
        },
    })

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                {"day" in task && <MaterialIcons name="view-week" size={24} color={theme.accentColor} style={styles.square} />}
                {"date" in task && <Ionicons name="calendar-clear" size={24} color={theme.accentColor} style={styles.square}/>}
                {!("day" in task) && !("date" in task) && <Entypo name="bookmark" size={24} color={theme.accentColor} style={styles.square}/>}
                <Text style={styles.itemText}>{task.taskDir}</Text>
            </View>
            {(planning && onPress && taskIndex != undefined) || (completed && onPress && taskIndex != undefined) ? (
                <TouchableOpacity onPress={() => onPress(taskIndex)}>
                    <Text>Remove</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.circular}></View>
            )}
        </View>
    )   
}

