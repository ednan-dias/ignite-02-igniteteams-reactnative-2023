import { useState } from 'react';

import { Alert } from 'react-native';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { createGroup } from '@storage/groups/create';
import { AppError } from '@utils/AppError';

import { Container, Content, Icon } from './styles';

export function NewGroup(): JSX.Element {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  async function handleNavigatePlayers(): Promise<void> {
    try {
      if (!group.trim()) {
        setGroup('');
        return Alert.alert('Nova Turma', 'Informe o nome da turma!');
      }

      await createGroup(group);
      navigation.navigate('players', { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Turma', error.message);
      } else {
        Alert.alert('Novo Turma', 'Não foi possível criar um novo turma!');
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="Nova turma"
          subtitle="crie uma para adicionar as pessoas"
        />

        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
          value={group}
        />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNavigatePlayers}
        />
      </Content>
    </Container>
  );
}
