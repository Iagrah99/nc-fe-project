import styled from 'styled-components'

export const Div = styled.div`

  max-width: 700px;
  display: flex;
  gap: 1rem; 
  justify-content: space-evenly; 
  margin: auto; 
  padding: 1rem;

  @media only screen and (max-width: 500px) {
    flex-direction: column;
  }
`