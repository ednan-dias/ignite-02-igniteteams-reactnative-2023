import logoImg from '@assets/logo.png';
import { useNavigation } from '@react-navigation/native';

import { BackButton, BackIcon, Container, Logo } from './styles';

type Props = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: Props): JSX.Element {
  const navigation = useNavigation();

  function handleGoHome(): void {
    navigation.navigate('groups');
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoHome}>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  );
}
