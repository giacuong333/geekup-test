import axios from "axios";
import { createContext, useContext, useState } from "react";
import apis from "../../apis";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [loadingUserList, setLoadingUserList] = useState(false);
	const [loadingUserDetails, setLoadingUserDetails] = useState(false);
	const [error, setError] = useState(false);

	const fetchUserList = async (current, pageSize) => {
		try {
			setLoadingUserList(true);
			setError("");

			return await axios.get(
				`${apis.users}?current=${current}&pageSize=${pageSize}`
			);
		} catch (error) {
			console.log("Error occurs while fetching albums", error);
			setError("Error occurs while fetching albums");
		} finally {
			setLoadingUserList(false);
		}
	};

	const fetchUserDetails = async (userId) => {
		try {
			setLoadingUserDetails(true);
			setError("");

			return await axios.get(apis.userDetails.replace(":id", userId));
		} catch (error) {
			console.log("Error occurs while fetching albums", error);
			setError("Error occurs while fetching albums");
		} finally {
			setLoadingUserDetails(false);
		}
	};
	return (
		<UserContext.Provider
			value={{
				fetchUserList,
				loadingUserList,

				fetchUserDetails,
				loadingUserDetails,

				error,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
export default UserProvider;
