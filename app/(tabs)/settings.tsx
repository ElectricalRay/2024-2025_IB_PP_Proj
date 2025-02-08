import { Text, View, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ScrollView, SectionList } from "react-native";
import React from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useContext } from "react";
import { ThemeContext } from "@/constants/ThemeContext";
import * as asyncStore from '@/utils/AsyncStorage';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reloadAppAsync } from "expo";


//<AntDesign name="eye" size={24} color="black" />
//<Entypo name="database" size={24} color="black" />

const DATA = [
    {
        title: 'Appearance',
        data: ['Accent Color']
    },
    {
        title: 'System',
        data: ['Clear All Tasks', 'Clear Completed']
    }
]
export default function SettingsScreen () {
    const theme = useContext(ThemeContext)
    if(!theme) return null;

    const accentColors = [
        {color: '#ff3d3d', name: 'red'},
        {color: '#ffb03d', name: 'orange'},
        {color: '#d5da48', name: 'yellow'},
        {color: '#08e604', name: 'green'},
        {color: '#3d55ff', name: 'blue'},
        {color: '#b83dff', name: 'purple'}
    ]

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#25292e'
        },
        headingContainer: {
            justifyContent: 'space-between',
            flexDirection: 'row',
            verticalAlign: 'auto',
            width: '100%',
            paddingBottom: 20,
            borderBottomColor: theme.accentColor,
            borderBottomWidth: 2
        },
        headingTitle: {
            fontSize: 30,
            fontWeight: 'bold',
            color: '#fff',
            paddingTop: 80,
            paddingHorizontal: 20,
        },
        settingsContainer: {
            paddingHorizontal: 20,
            paddingTop: 10
        },
        sectionItem: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#25292e',
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderRadius: 10,
            verticalAlign: 'middle',
            marginLeft: 15,
            borderColor: theme.accentColor,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            marginTop: -1
        },
        sectionItemText: {
            fontSize: 15,
            fontWeight: '500',
            color: '#fff',
            verticalAlign: 'middle'
        }, 
        sectionHeader: {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#25292e',
            marginTop: 15,
            marginBottom: 10,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 5,
        },
        sectionHeaderText: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 20,
        },
        headerIconContainer: {
            backgroundColor: theme.accentColor,
            display: 'flex',
            paddingVertical: 'auto',
            marginRight: 15,
            borderRadius: 5
        },
        square: {
            width: 24,
            height: 24,
            borderRadius: 5,
            marginLeft: 15,
        },
        squaresContainer: {
            display: 'flex',
            flexDirection: 'row'
        },
        systemButton: {
            backgroundColor: theme.accentColor,
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginRight: 10,
            display: 'flex',
            justifyContent: 'center',
        },
        systemBtnText: {
            fontWeight: 'bold',
            color: '#fff'
        }
    })

    const handleAccentChange = (colorObj: {color: string, name: string}) => {
        theme.setAccentColor(colorObj.color)
    }

    const handleExecute = async () => {
        try {
            const color = await AsyncStorage.getItem("accentColor")
            await asyncStore.clearStorage();
            color && theme.setAccentColor(color)
            reloadAppAsync();
        } catch (error) {
            console.log("Error resetting accent color after clearing storage: ", error)
        }
        
    }

    const handleCompleteClear = async () => {
        try {
            await asyncStore.removeItem('complete')
        } catch (error) {
            console.log("Error clearing completed: ", error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.headingTitle}>Settings Screen</Text>
            </View>
            <View style={styles.settingsContainer}>
                <SectionList 
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item}) => (
                        <View style={styles.sectionItem}>
                            <Text style={styles.sectionItemText}>{item}</Text>
                            {
                                item === 'Accent Color' && 
                                    <View style={styles.squaresContainer}>
                                        {accentColors.map((item, index) => {
                                            return (
                                                <TouchableOpacity key={index} style={[styles.square, {backgroundColor: item.color}]} onPress={() => handleAccentChange(item)}></TouchableOpacity>
                                            )
                                        })}
                                    </View>
                            }
                            {
                                item === 'Clear All Tasks' &&
                                    <TouchableOpacity style={styles.systemButton} onPress={() => handleExecute()}>
                                        <Text style={styles.systemBtnText}>Clear</Text>
                                    </TouchableOpacity>
                            }
                            {
                                item === 'Clear Completed' && 
                                    <TouchableOpacity style={styles.systemButton} onPress={() => handleCompleteClear()}>
                                        <Text style={styles.systemBtnText}>Clear</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                    )}
                    renderSectionHeader={({section: {title}}) => (
                        <View style={styles.sectionHeader}>
                            <View style={styles.headerIconContainer}>
                                {title === 'Appearance' && <AntDesign name="eye" size={30} color="#25292e" />}
                                {title === 'System' && <Entypo name="database" size={30} color="#25292e" />}
                            </View>
                            <Text style={styles.sectionHeaderText}>{title}</Text>
                        </View>
                        
                    )}
                >

                </SectionList>
            </View>
        </View>
    )
}

