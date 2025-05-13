import { useEffect, useMemo, useState } from "react";
import Header from "../Header";
import { Spin, Table } from "antd";
import axios from "axios";
import apis from "../../apis";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../../contexts/User";
import paths from "../../paths";
import { EyeOutlined, LoadingOutlined } from "@ant-design/icons";

const Users = () => {
	const [searchValue, setSearchValue] = useState("");
	const [userList, setUserList] = useState([]);

	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = parseInt(searchParams.get("current") || 1);
	const itemsPerPage = parseInt(searchParams.get("pageSize") || 10);
	const [current, setCurrent] = useState(currentPage);
	const [pageSize, setPageSize] = useState(itemsPerPage);

	const { fetchUserList, loadingUserList } = useUser();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetchUserList(current, pageSize);
			if (response?.status === 200) {
				const dataSrouce = response?.data?.map((item) => {
					return {
						...item,
						key: item?.id,
						avatar: {
							url: `${apis.avatarGeneration}?name=${item?.name}&background=random`,
							alt: item?.name,
						},
						actions: (
							<EyeOutlined
								title='View User'
								className='text-lg p-1 rounded hover:bg-black/5'
								onClick={() =>
									navigate(paths.userDetails.replace(":id", item?.id), {
										state: { userId: item?.id },
									})
								}
							/>
						),
					};
				});
				setUserList(dataSrouce);
			}
		};

		fetchData();
	}, []);

	console.log(userList);

	const filteredUserList = useMemo(() => {
		return userList?.filter((data) => {
			return data.name
				.toLowerCase()
				.includes(searchValue?.trim().toLowerCase());
		});
	}, [userList, searchValue]);

	const columns = useMemo(
		() => [
			{ title: "Id", dataIndex: "id" },
			{
				title: "Avatar",
				dataIndex: "avatar",
				render: (avatar) => {
					return (
						<img
							src={avatar?.url}
							alt={avatar?.name}
							className='w-8 h-8 rounded-full object-cover'
						/>
					);
				},
			},
			{ title: "Name", dataIndex: "name" },
			{
				title: "Email",
				dataIndex: "email",
				render: (email) => {
					return (
						<a href={`mailto:${email}`} className='cursor-pointer'>
							{email}
						</a>
					);
				},
			},
			{
				title: "Phone",
				dataIndex: "phone",
				render: (phone) => {
					return (
						<a href={`tel:${phone}`} className='cursor-pointer'>
							{phone}
						</a>
					);
				},
			},
			{
				title: "Website",
				dataIndex: "website",
				render: (website) => {
					return (
						<a
							href={`https://${website}`}
							target='_blank'
							className='cursor-pointer'>
							{website}
						</a>
					);
				},
			},
			{ title: "Actions", dataIndex: "actions" },
		],
		[]
	);

	Spin.setDefaultIndicator(
		<Spin
			indicator={
				<LoadingOutlined
					style={{ fontSize: 48 }}
					spin
					className='h-full !text-fuchsia-700/50'
				/>
			}
		/>
	);

	const changeValue = (e) => {
		setSearchValue(e.target.value);
	};

	return (
		<div>
			<Header setSearchValue={searchValue} onSearchValue={changeValue} />

			<div className='p-6 bg-[#f5f5f5] min-h-screen max-h-full'>
				<Table
					dataSource={filteredUserList}
					columns={columns}
					loading={loadingUserList}
					pagination={{
						current: current,
						pageSize: pageSize,
						showSizeChanger: true,
						pageSizeOptions: [5, 10, 20, 50],
						onChange: (current, pageSize) => {
							setCurrent(current);
							setPageSize(pageSize);
							setSearchParams({
								current: current.toString(),
								pageSize: pageSize.toString(),
							});
						},
						showTotal: (total) => `Total ${total} users`,
					}}
				/>
			</div>
		</div>
	);
};

export default Users;
