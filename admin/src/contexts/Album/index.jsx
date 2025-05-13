import axios from "axios";
import { createContext, useContext, useState } from "react";
import apis from "../../apis";

const AlbumContext = createContext();

const AlbumProvider = ({ children }) => {
	const [loadingAlbumList, setLoadingAlbumList] = useState(false);
	const [loadingAlbumDetails, setLoadingAlbumDetails] = useState(false);
	const [loadingAlbumByUser, setLoadingAlbumByUser] = useState(false);
	const [error, setError] = useState(false);

	const fetchAlbumList = async (current, pageSize) => {
		try {
			setLoadingAlbumList(true);
			setError("");

			return await axios.get(
				`${apis.albums}?pageSize=${pageSize}&current=${current}`
			);
		} catch (error) {
			console.log("Error occurs while fetching albums", error);
			setError("Error occurs while fetching albums");
		} finally {
			setLoadingAlbumList(false);
		}
	};

	const fetchAlbumDetails = async (albumId) => {
		try {
			setLoadingAlbumDetails(true);
			setError("");

			return await axios.get(`${apis.albums}/${albumId}`);
		} catch (error) {
			console.log("Error occurs while fetching albums", error);
			setError("Error occurs while fetching albums");
		} finally {
			setLoadingAlbumDetails(false);
		}
	};

	// fetchAlbumByUserId, loadingAlbumByUser
	const fetchAlbumByUserId = async (userId) => {
		try {
			setLoadingAlbumByUser(true);
			setError("");

			return await axios.get(`${apis.albums}?userId=${userId}`);
		} catch (error) {
			console.log("Error occurs while fetching albums", error);
			setError("Error occurs while fetching albums");
		} finally {
			setLoadingAlbumByUser(false);
		}
	};

	return (
		<AlbumContext.Provider
			value={{
				fetchAlbumList,
				loadingAlbumList,

				fetchAlbumDetails,
				loadingAlbumDetails,

				fetchAlbumByUserId,
				loadingAlbumByUser,

				error,
			}}>
			{children}
		</AlbumContext.Provider>
	);
};

export const useAlbum = () => useContext(AlbumContext);
export default AlbumProvider;
