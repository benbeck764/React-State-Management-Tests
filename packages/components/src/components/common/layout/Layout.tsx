import { FC, PropsWithChildren, ReactNode } from 'react';
import {
  StyledStickyHeaderContainer,
  StyledPageContainer,
  StyledPageContent,
  StyledMainContainer
} from './Layout.styles';

type LayoutProps = PropsWithChildren<{
  HeaderComponent: ReactNode;
  PlayerComponent: ReactNode;
}>;

const Layout: FC<LayoutProps> = (props) => {
  const { children, HeaderComponent, PlayerComponent } = props;

  return (
    <StyledMainContainer>
      <StyledStickyHeaderContainer>{HeaderComponent}</StyledStickyHeaderContainer>

      <StyledPageContainer container direction="column">
        <StyledPageContent>{children}</StyledPageContent>
      </StyledPageContainer>

      {PlayerComponent}
    </StyledMainContainer>
  );
};

export default Layout;
