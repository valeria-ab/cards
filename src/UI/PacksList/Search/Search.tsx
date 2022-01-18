import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setSearchValue} from '../../../BLL/search/searchActions';

const Search = () => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch();
    const search = () => {
        dispatch(setSearchValue(value))
        console.log('dispatch(getProducts())')
    };
    return <div>
        <input placeholder={'Search...'}
               onChange={(e) => setValue(e.currentTarget.value)}/>
        <button onClick={search}>Search</button>
    </div>

};

export default Search;
