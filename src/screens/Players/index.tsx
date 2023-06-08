import { useCallback, useEffect, useRef, useState } from 'react';

import { FlatList, TextInput } from 'react-native';
import { Alert } from 'react-native';

import { Button } from '@components/Button';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ListEmpty } from '@components/ListEmpty';
import { PlayerCard } from '@components/PlayerCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { removeGroupByName } from '@storage/groups/removeByName';
import { createPlayer } from '@storage/players/create';
import { getPlayersByGroupAndTeam } from '@storage/players/getByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/players/PlayerStorageDTO';
import { playerRemoveByGroup } from '@storage/players/removeByGroup';
import { AppError } from '@utils/AppError';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

type RouteParams = {
  group: string;
};

export function Players(): JSX.Element {
  const [playerName, setPlayerName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const navigation = useNavigation();

  const { params } = useRoute();
  const { group } = params as RouteParams;

  const playerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer(): Promise<void> {
    if (!playerName.trim()) {
      setPlayerName('');

      return Alert.alert(
        'Nova pessoa',
        'Informe o nome da pessoa para adicionar!'
      );
    }

    const newPlayer = {
      name: playerName,
      team: selectedTeam,
    };

    try {
      await createPlayer(newPlayer, group);

      playerNameInputRef.current?.blur();
      setPlayerName('');
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message);
      } else {
        Alert.alert('Nova pessoa', 'Não foi possível adicionar a pessoa!');
      }
    }
  }

  const fetchPlayersByTeam = useCallback(async () => {
    try {
      const playersByTeam = await getPlayersByGroupAndTeam(group, selectedTeam);
      setPlayers(playersByTeam);
    } catch (error) {
      Alert.alert(
        'Pessoas',
        'Não foi possível carregar as pessoas do time selecionado.'
      );
    }
  }, [group, selectedTeam]);

  async function handleRemovePlayer(playerName: string): Promise<void> {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.');
    }
  }

  async function groupRemove(): Promise<void> {
    try {
      await removeGroupByName(group);

      navigation.navigate('groups');
    } catch (error) {
      Alert.alert('Remover grupo', 'Não foi possível remover o grupo.');
    }
  }

  async function handleGroupRemove(): Promise<void> {
    Alert.alert('Remover', 'Deseja remover o grupo?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => groupRemove(),
      },
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [fetchPlayersByTeam, selectedTeam]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group || 'Nome do Grupo'}
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input
          inputRef={playerNameInputRef}
          onChangeText={setPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={playerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item: team }) => (
            <Filter
              title={team}
              isActive={team === selectedTeam}
              onPress={() => setSelectedTeam(team)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(player) => player.name}
        renderItem={({ item: player }) => (
          <PlayerCard
            name={player.name}
            onRemove={() => handleRemovePlayer(player.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time." />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  );
}
