import React from 'react';

import styled from 'styled-components';

const Home = () => (
  <div>
    Hello world
    <Kang>강과눈</Kang>
  </div>
);

const Kang = styled.div`
  background: red;
  color: white;
`;

export default Home;
