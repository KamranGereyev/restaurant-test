import './index.css'
const Search = ({...props}) => {
    return (
        <div className='wrapper-search-div'>
            <input {...props}/>
        </div>
    );
};

export default Search;
