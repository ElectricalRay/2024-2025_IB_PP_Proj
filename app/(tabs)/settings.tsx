import { Text, View, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native";
import React from 'react';

export default function SettingsScreen () {
    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.headingTitle}>Settings Screen</Text>
            </View>
            <View style={styles.settingsContainer}>
                <Text style={{color: '#fff'}}>Hello</Text>
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
        verticalAlign: 'auto'
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
        paddingTop: 30
    },

})