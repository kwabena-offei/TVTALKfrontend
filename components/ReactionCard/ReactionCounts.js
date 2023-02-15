import InfoCountWithIcon from './InfoCountWithIcon';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MessagesIcon from '../Icons/MessagesIcon';
import ShareIcon from '../Icons/ShareIcon';

export const ReactionCounts = ({ likes, shares, sub_comments, isMobile }) => {
  const reactionsInfoCounts = {
    likes: {
      count: likes,
      icon: <FavoriteIcon color="primary" fontSize="inherit"/>,
      route: 'likes'
    },
    comments: {
      count: sub_comments,
      icon: <MessagesIcon color="primary" fontSize="inherit"/>,
      route: 'replies'
    },
    shares: {
      count: shares,
      icon: <ShareIcon color="primary" fontSize="inherit"/>,
      route: 'shares'
    }
  }

  return(
    <>
      {Object.entries(reactionsInfoCounts).map(([key, value]) => {
        return (
        <InfoCountWithIcon
          isMobile={isMobile}
          key={key} {...value}
        />) })}
    </>
  )
}