import React from 'react';
import styled from 'styled-components';

import { HomePage } from './pages';

const Container = styled.div`
${'' /* background: red;
color: #fff;
font-size: 2rem; */}
`;

const App = () => {
    return (
        <Container>
            <HomePage />
        </Container>
    )
}

export default App;