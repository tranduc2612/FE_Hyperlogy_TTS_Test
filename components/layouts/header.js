import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCardIcon from '@mui/icons-material/AddCard';
import Link from "next/link";
import style from "../../styles/Layout.module.css";

function Header() {
	return (
		<header className={style.Header}>
			<nav className={style.nav}>
				<ul className={style.list}>
					<li className={style.logo}>
						<b>Quản lí tài sản</b>
					</li>
					<li className={`${style.item}`}>
						<Link className={`${style.link}`} href="/taisan">
							<AttachMoneyIcon />
							<span>Tài sản</span>
						</Link>
					</li>
					<li className={`${style.item}`}>
						<Link className={`${style.link}`} href="/nhanvien">
							<PeopleIcon />
							<span>Nhân Viên</span>
						</Link>
					</li>
					<li className={`${style.item}`}>
						<Link className={`${style.link}`} href="/taisan/create">
							<AddCircleIcon />
							<span>Tạo tài sản</span>
						</Link>
					</li>
					<li className={`${style.item}`}>
						<Link className={`${style.link}`} href="/taisan/gan">
							<AddCardIcon />
							<span>Gán tài sản</span>
						</Link>
					</li>
					<li className={`${style.item}`}>
						<Link className={`${style.link}`} href="/nhanvien/create">
							<PersonAddIcon />
							<span>Tạo nhân viên</span>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
