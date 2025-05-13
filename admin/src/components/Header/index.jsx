import { Flex, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Header = ({ searchValue, onSearchValue }) => {
	return (
		<header className='w-full h-16 border-b border-black/5 px-6'>
			<Flex align='center' className='h-full'>
				<Flex align='center' justify='space-between' className='w-full'>
					<Input
						size='large'
						placeholder='Search'
						prefix={<SearchOutlined size='medium' />}
						className='w-full max-w-xs !rounded !outline-none hover:!border-fuchsia-700 focus:!border-fuchsia-700'
						value={searchValue}
						onChange={onSearchValue}
					/>
					<div></div>
				</Flex>
			</Flex>
		</header>
	);
};

export default Header;
