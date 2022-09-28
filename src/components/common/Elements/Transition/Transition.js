import * as React from 'react';
import { Slide, Grow, Fade, Collapse } from '@material-ui/core';

export default function Transition({transitionType,active,direction,children,timeout, ref}) {

  return (
      <React.Fragment>
          {transitionType === 'fade' && (
              <Fade in={active} {...{timeout:timeout}} ref={ref}>
                  {children}
              </Fade>
          )}
          {transitionType === 'collapse' && (
              <Collapse in={active} {...{timeout:timeout}} ref={ref}>{children}</Collapse>
          )}
          {transitionType === 'grow' && (
              <Grow in={active} {...{timeout:timeout}} ref={ref}>{children}</Grow>
          )}
          {transitionType === 'slide' && (
              <Slide direction={direction} in={active} {...{timeout:timeout}} ref={ref}>{children}</Slide>
          )}
      </React.Fragment>
  );
}
