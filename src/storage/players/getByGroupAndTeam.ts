import { getAllPlayersByGroup } from './getAllByGroup';
import { PlayerStorageDTO } from './PlayerStorageDTO';

export async function getPlayersByGroupAndTeam(
  group: string,
  team: string
): Promise<PlayerStorageDTO[]> {
  try {
    const storage = await getAllPlayersByGroup(group);

    const players = storage.filter((player) => player.team === team);

    return players;
  } catch (error) {
    throw error;
  }
}
