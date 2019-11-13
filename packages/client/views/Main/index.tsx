import React from 'react';
import { withUserAgent } from 'next-useragent';

import AppBar from '../../components/AppBar';
import Drawer from '../../components/Drawer';
import AppContent from '../../components/AppContent';

const Main = ({ ua }) => {
  const { isDesktop } = ua;

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
      }}
    >
      <AppBar />
      <Drawer isDesktop={isDesktop} />
      <AppContent>
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
      </AppContent>
    </div>
  );
};

Main.getInitialProps = context => {
  const userAgent = context.ua.source;

  return { userAgent };
};

export default withUserAgent(Main);
