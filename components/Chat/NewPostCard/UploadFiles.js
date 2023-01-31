'use client';

import getConfig from 'next/config';
import { PickerOverlay } from 'filestack-react';

function UploadFiles (props) {
  const { publicRuntimeConfig } = getConfig();
  const apiKey = publicRuntimeConfig.FILESTACK_API_KEY
  console.log('apiKey', apiKey)

  return (
    <PickerOverlay
      apikey={apiKey}
      onUploadDone={(res) => console.log(res)}
    />
  )
}
export default UploadFiles;