import { Container, Subtitle, Title } from './styles';

type Props = {
  title: string;
  subtitle: string;
};

export function Highlight({ title, subtitle }: Props): JSX.Element {
  return (
    <Container>
      <Title>{title}</Title>

      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
}
