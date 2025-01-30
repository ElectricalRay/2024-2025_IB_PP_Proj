import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { DateTask, DefaultTask, WeekTask, Tasks, DaysOfWeek } from "@/utils/DataTypes";

type Props = {
    task: Tasks
    planning?: boolean
    taskIndex?: number
    onPress?: (parameter: number) => void
}

export default function Task(props: Props) {
    const {task, planning, taskIndex, onPress} = props

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.square}></View>
                <Text style={styles.itemText}>{task.taskDir}</Text>
            </View>
            {planning && onPress && taskIndex != undefined ? (
                <TouchableOpacity onPress={() => onPress(taskIndex)}>
                    <Text>Remove</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.circular}></View>
            )}
        </View>
    )   
}

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
        width: 24,
        height: 24,
        backgroundColor: '#ff3d3d',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15
    },
    itemText: {
        maxWidth: '80%',  
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#ff3d3d',
        borderWidth: 2,
        borderRadius: 5
    },
})