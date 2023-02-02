'use client';

import getConfig from 'next/config';
import { PickerOverlay } from 'filestack-react';

function UploadFiles ({ onClose, onOpen, onCancel, onUploadDone, accept, sources }) {
  const { publicRuntimeConfig } = getConfig();
  const apiKey = publicRuntimeConfig.FILESTACK_API_KEY

  return (
    <PickerOverlay
      apikey={apiKey}
      pickerOptions={{
        // allowManualRetry: true,
        accept: accept,
        onClose: onClose,
        onCancel: onCancel,
        onOpen: onOpen,
        fromSources: sources ? [ ...sources ] : [ 'local_file_system' ],
        maxFiles: 10,
      }}
      onUploadDone={onUploadDone}
      />
  )
}
export default UploadFiles;