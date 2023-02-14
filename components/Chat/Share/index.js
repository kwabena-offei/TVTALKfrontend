import { ShareModal } from "./ShareModal"
import { ShareDrawer } from "./ShareDrawer"

const Share = ({ isMobile, ...props }) => {
  if (isMobile) {
    return (
      <ShareDrawer {...props} />
    )
  }
  return (
    <ShareModal {...props} />
  )
}

export default Share;