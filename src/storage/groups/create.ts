import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '@storage/config';
import { AppError } from '@utils/AppError';

import { getAllGroups } from './getAll';

export async function createGroup(groupName: string): Promise<void> {
  try {
    const storedGroups = await getAllGroups();

    const groupAlreadyExists = storedGroups.includes(groupName);

    if (groupAlreadyExists) {
      throw new AppError('Já existe uma turma com este nome!');
    }

    const storage = JSON.stringify([...storedGroups, groupName]);
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
