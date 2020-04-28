import React from "react";
import { Segment, Dimmer, Loader } from "semantic-ui-react";

const Spinner = () => {
  return (
    <Dimmer active inverted>
      <Loader inverted content="Loading..." />
    </Dimmer>
  );
};

export default Spinner;
