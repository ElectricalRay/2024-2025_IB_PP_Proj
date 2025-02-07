import { Text, View, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ScrollView, SectionList } from "react-native";
import React from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

//<AntDesign name="eye" size={24} color="black" />
//<Entypo name="database" size={24} color="black" />

const DATA = [
    {
        title: 'Appearance',
        data: ['Accent Color']
    },
    {
        title: 'System',
        data: ['Clear All Tasks']
    }
]
export default function SettingsScreen () {
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
                        </View>
                    )}
                    renderSectionHeader={({section: {title}}) => (
                        <View style={styles.sectionHeader}>
                            <View style={styles.headerIconContainer}>
                                <AntDesign name="eye" size={24} color="black" />
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
        borderBottomColor: '#ff3d3d',
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
        backgroundColor: '#25292e',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        verticalAlign: 'middle',
        marginLeft: 15,
        marginBottom: 10,
        borderColor: '#ff3d3d',
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    sectionItemText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#fff'
    }, 
    sectionHeader: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#25292e',
        marginTop: 10,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5

    },
    sectionHeaderText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    headerIconContainer: {
        backgroundColor: '#fff',
        height: '100%',
    }
})