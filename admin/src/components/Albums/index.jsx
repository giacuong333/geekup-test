import { useEffect, useMemo, useState } from "react";
import Header from "../Header";
import { Avatar, Spin, Table } from "antd";
import { EyeOutlined, LoadingOutlined } from "@ant-design/icons";
import paths from "../../paths";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAlbum } from "../../contexts/Album";
import { useUser } from "../../contexts/User";
import apis from "../../apis";

const Albums = () => {
	const [searchValue, setSearchValue] = useState("");
	const [albumList, setAlbumList] = useState([]);

	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = parseInt(searchParams.get("current") || 1);
	const itemsPerPage = parseInt(searchParams.get("pageSize") || 10);
	const [current, setCurrent] = useState(currentPage);
	const [pageSize, setPageSize] = useState(itemsPerPage);

	const { fetchAlbumList, loadingAlbumList } = useAlbum();
	const { fetchUserList, loadingUserList } = useUser();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const [albumListResponse, userListResponse] = await Promise.all([
				fetchAlbumList(current, pageSize),
				fetchUserList(),
			]);

			if (
				albumListResponse?.status === 200 &&
				userListResponse?.status === 200
			) {
				const dataSrouce = albumListResponse?.data?.map((album) => {
					const user = userListResponse?.data?.find(
						(u) => u?.id === album?.userId
					);
					return {
						...album,
						key: album?.id,
						user: {
							id: user?.id,
							name: user?.name,
							avatar: `${apis.avatarGeneration}?name=${user?.name}&background=random`,
						},
						actions: (
							<EyeOutlined
								title='View Album'
								className='text-lg p-1 rounded hover:bg-black/5'
								onClick={() =>
									navigate(paths.albumDetails.replace(":id", album?.id), {
										state: { albumId: album?.id, userId: user?.id },
									})
								}
							/>
						),
					};
				});

				setAlbumList(dataSrouce);
			}
		};

		fetchData();
	}, [current, pageSize]);

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

	const columns = useMemo(
		() => [
			{ title: "Id", dataIndex: "id" },
			{ title: "Title", dataIndex: "title" },
			{
				title: "User",
				dataIndex: "user",
				render: (user) =>
					(
						<Link
							to={paths.userDetails.replace(":id", user?.id)}
							className='flex items-center gap-2'>
							<img
								src={user?.avatar}
								alt={user?.name}
								className='w-8 h-8 rounded-full object-cover'
							/>
							<p>{user?.name}</p>
						</Link>
					) || "N/A",
			},
			{ title: "Actions", dataIndex: "actions" },
		],
		[]
	);

	const filteredDataSource = useMemo(
		() =>
			albumList?.filter((data) => {
				return data.title
					.toLowerCase()
					.includes(searchValue.trim().toLowerCase());
			}),
		[albumList, searchValue]
	);

	const changeValue = (e) => {
		setSearchValue(e.target.value);
	};

	return (
		<div>
			<Header setSearchValue={searchValue} onSearchValue={changeValue} />

			<div className='p-6 bg-[#f5f5f5] min-h-screen max-h-full'>
				<Table
					dataSource={filteredDataSource}
					columns={columns}
					className='bg-white rounded-lg'
					loading={loadingAlbumList && loadingUserList}
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
						showTotal: (total) => `Total ${total} albums`,
					}}
				/>
			</div>
		</div>
	);
};

export default Albums;
