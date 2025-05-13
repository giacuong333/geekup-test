import { Link, useLocation } from "react-router-dom";
import paths from "../../paths";
import { UserOutlined, DatabaseOutlined } from "@ant-design/icons";

const sidebarItems = [
	{
		id: 1,
		name: "Albums",
		path: paths.albums,
		icon: DatabaseOutlined,
	},
	{
		id: 2,
		name: "Users",
		path: paths.users,
		icon: UserOutlined,
	},
];

const Sidebar = ({ collapsed }) => {
	const currentPath = useLocation().pathname;

	return (
		<div>
			<h1
				className={`
					text-4xl font-bold transition-all w-full flex items-center 
					${collapsed ? "p-2 justify-center" : "p-4"}`}>
				<span className='text-black bg-fuchsia-700/20 rounded px-2'>A</span>
				<p className={`${collapsed ? "opacity-0 w-0" : "opacity-100"}`}>dmin</p>
			</h1>
			<ul
				className={`w-full flex flex-col gap-1 transition-all
				${collapsed ? "p-2" : "p-4"}`}>
				{sidebarItems.map(({ id, name, path, icon: Icon }) => {
					const isCurrentPath = currentPath?.includes(path);

					return (
						<li
							key={id}
							className={`
							hover:bg-black/5 rounded cursor-pointer group transition-all border-l-2 
							${
								isCurrentPath
									? "bg-fuchsia-700/10 hover:bg-fuchsia-700/10 border-fuchsia-700"
									: "border-transparent"
							}`}>
							<Link
								to={path}
								className={`flex items-center transition-all 
							${collapsed ? "justify-center p-4" : "gap-2 py-2 px-4"}`}>
								<Icon
									className={`!text-black/70 group-hover:!text-fuchsia-700/90 ${
										isCurrentPath ? "!text-fuchsia-700/90" : ""
									}`}
								/>
								<p
									className={`group-hover:!text-black transition
								${isCurrentPath ? "!text-black" : "!text-black/70"} 
								${collapsed ? "hidden" : "block"}`}>
									{name}
								</p>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Sidebar;
