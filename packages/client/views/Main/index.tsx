import React from 'react';
import { withUserAgent } from 'next-useragent';

import AppBar from '../../components/AppBar';
import Drawer from '../../components/Drawer';

const Main = ({ ua }) => {
  const { isDesktop } = ua;

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <AppBar />
      <Drawer isDesktop={isDesktop} />
      <main
        style={{
          flexGrow: 1,
        }}
      >
        <div>
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
        </div>
        <div>
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
        </div>
        <div>
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamco
        </div>
      </main>
    </div>
  );
};

Main.getInitialProps = context => {
  const userAgent = context.ua.source;

  return { userAgent };
};

export default withUserAgent(Main);
