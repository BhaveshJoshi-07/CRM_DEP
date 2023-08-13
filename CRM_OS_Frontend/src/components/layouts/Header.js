import React, { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import { Button, Dropdown, Menu } from "antd";

import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import HeadNav from "../Headnav/Headnav";
import styles from "./Header.module.css";

function Header({ onPress }) {
	useEffect(() => window.scrollTo(0, 0));

	const isLogged = localStorage.getItem("isLogged");
	const user = localStorage.getItem("user");

	const items = [
		{
			key: "1",
			label: (
				<p
					style={{ margin: 0, padding: "0.2rem 0.5rem" }}
					className='flex align-items-center txt-color-secondary'>
					<UserOutlined style={{ fontSize: "16px" }} />{" "}
					<span className=' font-weight-bold me-2 ms-1'>{user}</span>
				</p>
			),
		},
		{
			key: "2",
			label: (
				<p
					style={{ margin: 0, padding: "0.2rem 0.5rem" }}
					className='flex align-items-center txt-color-secondary'>
					<Link to='/admin/auth/logout' className={styles.logoutLink}>
						<LogoutOutlined className='text-danger' />
						<span className=' font-weight-bold'>Log Out</span>
					</Link>
				</p>
			),
		},
	];

	const [isDarkMode, setDarkMode] = useState(false);
	const [hasLogin, setHasLogin] = useState(false);

	const toggleDarkMode = (checked) => {
		setDarkMode(checked);
	};

	useEffect(() => {
		if (isDarkMode) document.body.className = "dark-theme";
		if (!isDarkMode) document.body.className = "light-theme";
	}, [isDarkMode]);

	//check if url has login or register in it and set the state accordingly
	useEffect(() => {
		if (window.location.href.includes("login")) {
			setHasLogin(true);
		} else if (window.location.href.includes("register")) {
			setHasLogin(true);
		} else {
			setHasLogin(false);
		}
	}, []);

	return (
		<>
			<div className='flex justify-between items-center bg-teal-900'>
				<div className='w-[60%] md:w-[90%] flex px-4 gap-3'>
					<span className='flex items-center gap-2 font-bold font-poppins text-white select-none'>
						CRM <span className='text-teal-400'>OS</span>
					</span>
					<HeadNav />
				</div>

				<div className='flex justify-end items-center'>
					{!hasLogin && (
						<DarkModeSwitch
							style={{ margin: "1rem" }}
							checked={isDarkMode}
							onChange={toggleDarkMode}
							size={20}
						/>
					)}
					{isLogged && (
						<div>
							<Dropdown
								overlay={<Menu className='new-card' items={items} />}
								placement='bottomLeft'
								className='user-dropdown mr-2'>
								<Button className='user-btn'>
									<UserOutlined style={{ fontSize: "16px" }} />
								</Button>
							</Dropdown>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default Header;
