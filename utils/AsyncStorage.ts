// utils/AsyncStorage.js
import { DateTask, WeekTask, DefaultTask, Tasks, DaysOfWeek } from './DataTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const setItem = async (key: string, value: Tasks[]) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting item:', error);
  }
};

export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if(value) {
      return JSON.parse(value)
    }else {
      return []
    }
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  }
};

export const getDataItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  }
};

export const setDataItem = async (key: string, value: string | Date) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting item:', error);
  }
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing item:', error);
  }
};

export const mergeItem = async (key: string, value: any) => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error merging item:', error);
  }
};

export const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

export const getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.error('Error getting all keys:', error);
    return [];
  }
};

export const getAllItems = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    return items
  } catch (error) {
    console.error('Error getting all items:', error);
    return {};
  }
};

export const removeMultiple = async (keys: string[]) => {
    try {
        await AsyncStorage.multiRemove(keys)
    } catch (error) {
        console.log("Error removing multiple items:", error)
    }
}

export const getMultiple = async (keys: string[]) => {
    let values
    try {
        values = await AsyncStorage.multiGet(keys)
        return values
    } catch (error) {
        console.log("Error geting multiple items: ", error)
        return []
    }
}

interface Data {
  day: number,
  month: number,
  year: number
}

export const getAllTasks = async () => {
  let result = []
  const data: Data = {
    day: 1,
    month: 12,
    year: 2000
  }
  const data2: Data = {
    day: 2,
    month: 12,
    year: 2000
  }
  const data3: Data = {
    day: 3,
    month: 12,
    year: 2000
  }
  const data4: Data = {
    day: 4,
    month: 12,
    year: 2000
  }

  const objArr = [data2, data3, data4] /*
  try {
    AsyncStorage.multiRemove(["task", "task1", "task2", "task3", "task4"])
    await setItem("task1", data);
    await setItem("task2", objArr);
    await setItem("task3", "hello3");
    const keys = await AsyncStorage.getAllKeys();
    const item = await AsyncStorage.getItem("task1")
    const item2 = await AsyncStorage.getItem("task2")
    const items = await AsyncStorage.multiGet(keys);
    const item3 = await getItem("task3")
    console.log(item3)


    //console.log(await AsyncStorage.getItem("task3"))
    //console.log(JSON.parse(items[1][1])[0].month)
    //const data1: Data = JSON.parse(item!!);
    //const data2 = JSON.parse(item!!.replace(/\"/g, ''));
    //console.log(JSON.parse(item).day)
    //console.log(JSON.parse(item2)[0].day)
    //console.log(`data1, ${item}`);
    //console.log(`data2, ${data2}`)
  } catch (error) {
    console.log(error)
    return []
  } */
}


[["task", "\"hello\""], ["task1", "\"hello1\""], ["task2", "\"hello2\""], ["task3", "\"hello3\""], ["task4", "\"hello4\""]]