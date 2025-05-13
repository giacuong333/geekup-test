import Layout from "../layout";
import paths from "../paths";

import Users from "../components/Users";
import UserDetails from "../components/UserDetails";
import Albums from "../components/Albums";
import AlbumDetails from "../components/AlbumDetails";

const routes = [
	{
		id: 1,
		route: paths.albums,
		layout: Layout,
		component: Albums,
	},
	{
		id: 2,
		route: paths.users,
		layout: Layout,
		component: Users,
	},
	{
		id: 3,
		route: paths.userDetails,
		layout: Layout,
		component: UserDetails,
	},
	{
		id: 4,
		route: paths.albumDetails,
		layout: Layout,
		component: AlbumDetails,
	},
];

export default routes;
