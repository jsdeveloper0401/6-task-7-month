import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import PhotoSizeSelectActualRoundedIcon from '@mui/icons-material/PhotoSizeSelectActualRounded';
import DynamicFeedRoundedIcon from '@mui/icons-material/DynamicFeedRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';

const routes = [
	{
		path: "/main",
		content: "Cars",
		icon: <DirectionsCarFilledRoundedIcon/>
	},
	{
		path: "/main/albums",
		content: "Albums",
		icon: <CollectionsBookmarkRoundedIcon/>
	},
	{
		path: "/main/comments",
		content: "Comments",
		icon: <ForumRoundedIcon/>
	},
	{
		path: "/main/photos",
		content: "Photos",
		icon: <PhotoSizeSelectActualRoundedIcon/>
	},
	{
		path: "/main/posts",
		content: "Posts",
		icon: <DynamicFeedRoundedIcon/>
	},
	{
		path: "/main/todos",
		content: "Todos",
		icon: <ListAltRoundedIcon/>
	},
	{
		path: "/main/users",
		content: "Users",
		icon: <GroupRoundedIcon/>
	}
];

export default routes;