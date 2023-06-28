import SearchIcon from '@mui/icons-material/Search';
import style from "../../styles/Search.module.css";
function Search({onSearch}) {

	const handleChangeInput = (e)=>{
		onSearch(e.target.value)
	}

	return <div className={style.search_form}>
		<SearchIcon />
		<input type="text" onChange={handleChangeInput} />
	</div>;
}

export default Search;
