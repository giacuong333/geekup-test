import { Breadcrumb, Flex, Spin, Modal } from "antd";
import { useEffect, useState } from "react";
import paths from "../../paths";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { useUser } from "../../contexts/User";
import apis from "../../apis";
import { useAlbum } from "../../contexts/Album";

const mockAlbumData = [
	{
		id: 1,
		name: "Album name #1",
		imageUrl:
			"https://cdn.dribbble.com/userupload/8187380/file/original-3161b9d04842f3047b70f4d51e413729.png?resize=752x752&vertical=center",
	},
	{
		id: 2,
		name: "Album name #2",
		imageUrl:
			"https://cdn.dribbble.com/userupload/29929938/file/original-8da1d28000376c8a3ef7544fdd11be1b.png?resize=1024x768&vertical=center",
	},
	{
		id: 3,
		name: "Album name #3",
		imageUrl:
			"https://cdn.dribbble.com/userupload/10435388/file/original-bf11893b860e2946af70f839b0042b91.jpeg?resize=1024x768&vertical=center",
	},
];

const BreadCrumb = () => {
	return (
		<Breadcrumb
			items={[
				{
					title: <Link to={paths.albums}>Albums</Link>,
				},
				{
					title: <p className='font-semibold'>Details</p>,
				},
			]}
			className='!mb-4 !px-2'
		/>
	);
};

const AlbumDetails = () => {
	const [images, setImages] = useState(mockAlbumData);
	const [userDetails, setUserDetails] = useState({});
	const [albumDetails, setAlbumDetails] = useState({});
	const [selectedImage, setSelectedImage] = useState(null);
	const { albumId, userId } = useLocation()?.state;

	const { fetchAlbumDetails, loadingAlbumDetails } = useAlbum();
	const { fetchUserDetails, loadingUserDetails } = useUser();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const [albumDetailResponse, userDetailResponse] = await Promise.all([
				fetchAlbumDetails(albumId),
				fetchUserDetails(userId),
			]);

			if (
				albumDetailResponse?.status === 200 &&
				userDetailResponse?.status === 200
			) {
				const user = {
					...userDetailResponse?.data,
					avatar: `${apis.avatarGeneration}?name=${userDetailResponse?.data?.name}&background=random`,
				};
				const album = {
					...albumDetailResponse?.data,
				};

				setUserDetails(user);
				setAlbumDetails(album);
			}
		};

		fetchData();
	}, [albumId, userId]);

	const handleImageClick = (image) => {
		setSelectedImage(image);
	};

	const handleCloseModal = () => {
		setSelectedImage(null);
	};

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

	return (
		<div className='p-10'>
			<div className='mt-4 p-6 rounded bg-gray-700/5 border-t-2'>
				{loadingUserDetails && loadingAlbumDetails ? (
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
										<Link to={paths.albums} className='!text-black'>
											<ArrowLeftOutlined className='cursor-pointer p-2 rounded hover:bg-black/5' />
										</Link>
										<p className='text-xl font-semibold'>Albums Details</p>
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
							<p className='text-lg font-semibold mb-2'>
								{albumDetails?.title}
							</p>

							<ul className='flex flex-wrap items-start gap-6'>
								{images?.map((item) => (
									<li
										key={item?.id}
										className='w-fit h-80 cursor-pointer'
										onClick={() => handleImageClick(item)}>
										<div className='w-sm h-full overflow-hidden rounded-md shadow-md'>
											<img
												src={item?.imageUrl}
												alt={item?.name}
												className='w-full h-full object-center object-cover'
											/>
										</div>
									</li>
								))}
							</ul>
						</div>

						<Modal
							open={!!selectedImage}
							onCancel={handleCloseModal}
							footer={null}
							centered
							width={800}>
							<img
								src={selectedImage?.imageUrl}
								alt={selectedImage?.name}
								className='w-full h-auto object-contain'
							/>
						</Modal>
					</>
				)}
			</div>
		</div>
	);
};

export default AlbumDetails;
