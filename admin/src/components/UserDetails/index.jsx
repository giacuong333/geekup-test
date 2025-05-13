import { Breadcrumb, Flex, Spin, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import paths from "../../paths";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	ArrowLeftOutlined,
	EyeOutlined,
	LoadingOutlined,
} from "@ant-design/icons";
import { useUser } from "../../contexts/User";
import apis from "../../apis";
import { useAlbum } from "../../contexts/Album";

const BreadCrumb = () => {
	return (
		<Breadcrumb
			items={[
				{
					title: <Link to={paths.users}>Users</Link>,
				},
				{
					title: <p className='font-semibold'>Details</p>,
				},
			]}
			className='!mb-4 !px-2'
		/>
	);
};

const UserDetails = () => {
	const [userDetails, setUserDetails] = useState({});
	const [albums, setAlbums] = useState([]);
	const userId = useLocation()?.state?.userId;

	const { fetchUserDetails, loadingUserDetails } = useUser();
	const { fetchAlbumByUserId, loadingAlbumByUser } = useAlbum();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const [albumsResponse, userDetailsResponse] = await Promise.all([
				fetchAlbumByUserId(userId),
				fetchUserDetails(userId),
			]);

			console.log(albumsResponse);

			if (
				userDetailsResponse?.status === 200 &&
				albumsResponse?.status === 200
			) {
				const user = {
					...userDetailsResponse?.data,
					avatar: `${apis.avatarGeneration}?name=${userDetailsResponse?.data?.name}&background=random`,
				};
				const albums = albumsResponse?.data?.map((item) => {
					return {
						...item,
						key: item?.id,
						actions: (
							<EyeOutlined
								title='View Album'
								className='text-lg p-1 rounded hover:bg-black/5'
								onClick={() =>
									navigate(`${paths?.albumDetails.replace(":id", item?.id)}`, {
										state: { albumId: item?.id, userId: user?.id },
									})
								}
							/>
						),
					};
				});

				setUserDetails(user);
				setAlbums(albums);
			}
		};

		fetchData();
	}, [userId]);

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
			{ title: "ID", dataIndex: "id" },
			{ title: "Title", dataIndex: "title" },
			{ title: "Actions", dataIndex: "actions" },
		],
		[]
	);

	return (
		<div className='p-10'>
			<div className='mt-4 p-6 rounded bg-gray-700/5 border-t-2'>
				{loadingUserDetails && loadingAlbumByUser ? (
					<Flex align='center' justify='center' className='min-h-52'>
						<Spin
							indicator={
								<LoadingOutlined
									style={{ fontSize: 48 }}
									spin
									className='h-full !text-fuchsia-700/50'
								/>
							}
						/>
					</Flex>
				) : (
					<>
						<Flex
							align='start'
							justify='space-between'
							className='border-b border-black/20 !pb-6'>
							<div>
								<BreadCrumb />

								<Flex align='start' justify='space-between'>
									<div className='flex items-center gap-2'>
										<Link to={paths.users} className='!text-black'>
											<ArrowLeftOutlined className='cursor-pointer p-2 rounded hover:bg-black/5' />
										</Link>
										<p className='text-xl font-semibold'>User Details</p>
									</div>
								</Flex>
							</div>
							<div>
								<Flex align='start' gap='small'>
									<img
										src={userDetails?.avatar}
										alt={userDetails?.name}
										className='rounded-full w-8 h-8'
									/>
									<span>
										<p>{userDetails?.name}</p>
										<a href={`mailto:${userDetails?.email}`}>
											{userDetails?.email}
										</a>
									</span>
								</Flex>
							</div>
						</Flex>

						<div className='pt-6'>
							<p className='text-lg font-semibold mb-2'>Albums</p>
							<Table
								className='rounded'
								dataSource={albums}
								columns={columns}
								loading={loadingAlbumByUser}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default UserDetails;
