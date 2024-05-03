import styled from 'styled-components'

export const ArticleCardStyled = styled.article`

  display: flex;
  flex-wrap: wrap;

  @media only screen and (max-width: 500px) {
    flex-direction: column;
    flex-wrap: nowrap;
    margin-inline: 0.5rem;
  }
`