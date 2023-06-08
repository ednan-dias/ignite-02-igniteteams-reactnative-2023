import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/config';

import { getAllGroups } from './getAll';

export async function removeGroupByName(groupToDelete: string): Promise<void> {
  try {
    const storedGroups = await getAllGroups();
    const groups = storedGroups.filter((group) => group !== groupToDelete);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupToDelete}`);
  } catch (error) {
    throw error;
  }
}
