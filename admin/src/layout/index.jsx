import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Button, Flex } from "antd";
import { LeftOutlined } from "@ant-design/icons";

const Layout = ({ children }) => {
	const [collapseSidebar, setCollapseSidebar] = useState(false);

	const toggleCollapse = () => {
		setCollapseSidebar(!collapseSidebar);
	};

	return (
		<Flex>
			{/* Sidebar */}
			<div
				className={`
					h-screen w-full relative transition-all border-r border-black/5
					${collapseSidebar ? "max-w-16" : "max-w-3xs"}`}>
				<div className='absolute w-full'>
					<Sidebar collapsed={collapseSidebar} />
				</div>
				<Button
					shape='circle'
					icon={<LeftOutlined />}
					className={`
							absolute z-10 top-4 -right-full -translate-x-1/2
							!outline-none shadow 
							hover:!border-fuchsia-700 hover:!text-fuchsia-700 
							transition-all
							${collapseSidebar ? "rotate-180" : "rotate-0"}`}
					onClick={toggleCollapse}
				/>
			</div>

			{/* Main component */}
			<div className='w-full flex-1'>{children}</div>
		</Flex>
	);
};

export default Layout;
