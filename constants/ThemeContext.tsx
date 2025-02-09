import React, {createContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
    accentColor: string;
    primaryColor: string;
    secondaryColor: string;
    mode: 'dark' | 'light';
    setAccentColor: (color: string) => void;
    setPrimaryColor: (color: string) => void;
    setSecondaryColor: (color: string) => void;
    setMode: (newMode : 'light' | 'dark') => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({children} : {children: ReactNode}) => {
    const [accentColor, setAccentColor] = useState<string>('#ff3d3d')
    const [primaryColor, setPrimaryColor] = useState<string>('#25292e')
    const [secondaryColor, setSecondaryColor] = useState<string>('#ffffff')
    const [mode, setMode] = useState<'light' | 'dark'>('dark')

    useEffect(() => {
        const loadAccentColor = async () => {
            try {
                const storedColor = await AsyncStorage.getItem('accentColor')
                if(storedColor) {
                    setAccentColor(storedColor)
                }
            } catch (error) {
                console.log('Error getting accent color: ', error)
            }
        }

        const loadPrimaryColor = async () => {
            try {
                const storedColor = await AsyncStorage.getItem('primaryColor')
                if(storedColor) {
                    setPrimaryColor(storedColor)
                }
            } catch (error) {
                console.log('Error getting primary color: ', error)
            }
        }

        const loadSecondaryColor = async () => {
            try {
                const storedColor = await AsyncStorage.getItem('secondaryColor')
                if(storedColor) {
                    setSecondaryColor(storedColor)
                }
            } catch (error) {
                console.log('Error getting secondary color: ', error)
            }
        }

        const loadMode = async () => {
            try {
                const storedMode = await AsyncStorage.getItem("mode")
                if(storedMode && (storedMode === 'dark' || storedMode === 'light')) {
                    setMode(storedMode)
                }
            } catch (error) {
                console.log("Error getting mode: ", error)
            }
        }

        loadMode()
        loadPrimaryColor()
        loadSecondaryColor()
        loadAccentColor();
    }, [])

    const updateAccentColor = async (color: string) => {
        try {
            setAccentColor(color)
            await AsyncStorage.setItem('accentColor', color)
        } catch (error) {
            console.log("Error updating accent color: ", error)
        }
    }

    const updatePrimaryColor = async(color: string) => {
        try {
            setPrimaryColor(color)
            await AsyncStorage.setItem('primaryColor', color)
        } catch (error) {
            console.log("Error updating primary color: ", error)
        }
    }

    const updateSecondaryColor = async(color: string) => {
        try {
            setSecondaryColor(color)
            await AsyncStorage.setItem('secondaryColor', color)
        } catch (error) {
            console.log("Error updating secondary color: ", error)
        }
    }

    const updateMode = async(newMode: 'dark' | 'light') => {
        try {
            setMode(newMode)
            await AsyncStorage.setItem('mode', newMode)
        } catch (error) {
            console.log("Error updating mode: ", error)
        }
    }

    return (
        <ThemeContext.Provider value={{ accentColor, primaryColor, secondaryColor, mode, setAccentColor: updateAccentColor, setPrimaryColor: updatePrimaryColor, setSecondaryColor: updateSecondaryColor, setMode: updateMode}}>
            {children}
        </ThemeContext.Provider>
    )
}