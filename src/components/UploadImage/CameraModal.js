import React from "react";

import { Layer } from "grommet";

function CameraModal(props) {

  const { onClose, children } = props;

  return (
    <Layer position="center" modal onClickOutside={onClose} onEsc={onClose}>
      {children}
    </Layer>
  )
}

export default CameraModal;

