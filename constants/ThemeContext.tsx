import React, {createContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
    accentColor: string;
    setAccentColor: (color: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({children} : {children: ReactNode}) => {
    const [accentColor, setAccentColor] = useState<string>('#ff3d3d')

    useEffect(() => {
        const loadColor = async () => {
            try {
                const storedColor = await AsyncStorage.getItem('accentColor')
                if(storedColor) {
                    setAccentColor(storedColor)
                }
            } catch (error) {
                console.log('Error getting accent color: ', error)
            }
        }

        loadColor();
    }, [])

    const updateAccentColor = async (color: string) => {
        try {
            setAccentColor(color)
            await AsyncStorage.setItem('accentColor', color)
        } catch (error) {
            console.log("Error updating accent color: ", error)
        }
    }

    return (
        <ThemeContext.Provider value={{ accentColor, setAccentColor: updateAccentColor}}>
            {children}
        </ThemeContext.Provider>
    )
}