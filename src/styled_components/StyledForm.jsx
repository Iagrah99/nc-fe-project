import styled from 'styled-components'

export const CustomForm = styled.form`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  @media only screen and (max-width: 500px) {
   margin: 0 1rem;
  }
`