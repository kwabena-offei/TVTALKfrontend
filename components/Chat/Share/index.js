import { ShareModal } from "./ShareModal"
import { ShareDrawer } from "./ShareDrawer"
import { setShare } from '../../../services/share';

const Share = ({ isMobile, id, type, setShares, ...props }) => {
  const onShare = async () => {
    if (type === "comment" || "story") {
      try {
        const { data } = await setShare({ id: id, type: `${type}_id` });
        setShares(data.shares_count)
        return data;
      } catch (error) {
        console.log("share error", error);
      }
    }
    console.log(`shared ${type}`, id, type);
  };

  if (isMobile) {
    return (
      <ShareDrawer {...props} onShare={onShare} />
    )
  }
  return (
    <ShareModal {...props} onShare={onShare} />
  )
}

export default Share;