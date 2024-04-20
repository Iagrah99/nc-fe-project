import styled from 'styled-components'

const Main = styled.main`
    margin: 0 2rem;
    min-height: 100vh; 

    @media only screen and (max-width: 500px) {
        margin: 0;
      }

      @media only screen and (max-width: 768px) and (min-width: 501px) {
        margin: 0 0.5rem;
      }
`

export default Main