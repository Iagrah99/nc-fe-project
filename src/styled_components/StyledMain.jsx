import styled from 'styled-components'

const Main = styled.main`
    min-height: 100vh; 
    background-color: #000;

    @media only screen and (max-width: 500px) {
        margin: 0;
      }

      @media only screen and (max-width: 768px) and (min-width: 501px) {
        margin: 0 0.5rem;
      }
`

export default Main