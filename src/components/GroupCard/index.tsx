import { TouchableOpacityProps } from 'react-native';

import { Container, Icon, Title } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
};

export function GroupCard({ title, ...rest }: Props): JSX.Element {
  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  );
}
