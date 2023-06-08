import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '@storage/config';
import { AppError } from '@utils/AppError';

import { getAllPlayersByGroup } from './getAllByGroup';
import { PlayerStorageDTO } from './PlayerStorageDTO';

export async function createPlayer(
  newPlayer: PlayerStorageDTO,
  group: string
): Promise<void> {
  try {
    const storedPlayers = await getAllPlayersByGroup(group);

    const playerAlreadyExists = storedPlayers.filter(
      (player) => player.name === newPlayer.name
    );

    if (playerAlreadyExists.length > 0) {
      throw new AppError('Essa pessoa já está adicionada em um time!');
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}
