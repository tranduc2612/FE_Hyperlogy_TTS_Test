import SearchIcon from '@mui/icons-material/Search';
import style from "../../styles/Search.module.css"
function Search({onSearch}) {
	return <div className={style.search_form}>
		<SearchIcon />
		<input type="text" onChange={(e)=>onSearch(e.target.value)} />
	</div>;
}

export default Search;
