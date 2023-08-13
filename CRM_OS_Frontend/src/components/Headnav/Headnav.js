import { Menu } from "antd";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router-dom";
import getPermissions from "../../utils/getPermissions";
// import styles from "./Sidenav.module.css";

const Headnav = () => {
	const permissions = getPermissions();

	// console.log(permissions);

	const hasPermission = (item) => {
		return permissions?.includes(item ? item : "");
	};

	const menu = [
		permissions && {
			label: (
				<NavLink to='/admin/dashboard'>
					<span>Dashboard</span>
				</NavLink>
			),
			key: "dashboard",
		},
		(hasPermission("readAll-contact") ||
			hasPermission("readSingle-contact") ||
			hasPermission("create-contact")) && {
			label: (
				<NavLink to='/admin/contact'>
					<span>Contact</span>
				</NavLink>
			),
			key: "contact",
		},
		(hasPermission("readAll-company") ||
			hasPermission("readSingle-company") ||
			hasPermission("create-company")) && {
			label: (
				<NavLink to='/admin/company'>
					<span>Company</span>
				</NavLink>
			),
			key: "company",
		},
		(hasPermission("readAll-opportunity") ||
			hasPermission("readSingle-opportunity") ||
			hasPermission("create-opportunity")) && {
			label: (
				<NavLink to='/admin/opportunity'>
					<span>Opportunity</span>
				</NavLink>
			),
			key: "opportunity",
		},
		(hasPermission("readAll-quote") ||
			hasPermission("readSingle-quote") ||
			hasPermission("create-quote") ||
			hasPermission("readAll-product") ||
			hasPermission("readSingle-product") ||
			hasPermission("create-product")) && {
			label: (
				<span className='flex items-center gap-1'>
					Quote <IoIosArrowDown />
				</span>
			),
			key: "quotes",

			children: [
				(hasPermission("readAll-quote") ||
					hasPermission("readSingle-quote") ||
					hasPermission("create-quote")) && {
					label: (
						<NavLink to='/admin/quote'>
							<span>Quote</span>
						</NavLink>
					),
					key: "quote",
				},
				(hasPermission("readAll-product") ||
					hasPermission("readSingle-product") ||
					hasPermission("create-product")) && {
					label: (
						<NavLink to='/admin/products'>
							<span>Products</span>
						</NavLink>
					),
					key: "products",
				},
			],
		},
		(hasPermission("readAll-crmTask") ||
			hasPermission("readSingle-crmTask") ||
			hasPermission("create-crmTask")) && {
			label: (
				<NavLink to='/admin/task'>
					<span>Task</span>
				</NavLink>
			),
			key: "task",
		},
		(hasPermission("readAll-note") ||
			hasPermission("readSingle-note") ||
			hasPermission("create-note") ||
			hasPermission("readAll-attachment") ||
			hasPermission("readSingle-attachment") ||
			hasPermission("create-attachment") ||
			hasPermission("readAll-email") ||
			hasPermission("readSingle-email") ||
			hasPermission("create-email")) && {
			label: (
				<span className='flex items-center gap-1'>
					Others <IoIosArrowDown />
				</span>
			),
			key: "others",

			children: [
				(hasPermission("readAll-note") ||
					hasPermission("readSingle-note") ||
					hasPermission("create-note")) && {
					label: (
						<NavLink to='/admin/note'>
							<span>Note</span>
						</NavLink>
					),
					key: "note",
				},
				(hasPermission("readAll-attachment") ||
					hasPermission("readSingle-attachment") ||
					hasPermission("create-attachment")) && {
					label: (
						<NavLink to='/admin/attachment'>
							<span>Attachment</span>
						</NavLink>
					),
					key: "attachment",
				},
				(hasPermission("readAll-email") ||
					hasPermission("readSingle-email") ||
					hasPermission("create-email")) && {
					label: (
						<NavLink to='/admin/email'>
							<span>Email</span>
						</NavLink>
					),
					key: "email",
				},
			],
		},
		permissions && {
			label: (
				<NavLink to='/admin/setup'>
					<span>Setup</span>
				</NavLink>
			),
			key: "setup",
		},
	];

	return (
		<div className='w-[90%]'>
			<Menu
				className='bg-teal-900 text-white border-none font-poppins'
				mode='horizontal'
				items={menu}
			/>
		</div>
	);
};

export default Headnav;
