import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '@storage/config';

import { getAllPlayersByGroup } from './getAllByGroup';

export async function playerRemoveByGroup(
  playerName: string,
  group: string
): Promise<void> {
  try {
    const storage = await getAllPlayersByGroup(group);

    const filtered = storage.filter((player) => player.name !== playerName);
    const players = JSON.stringify(filtered);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);
  } catch (error) {
    throw error;
  }
}
