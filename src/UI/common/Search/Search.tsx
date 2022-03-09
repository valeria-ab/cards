import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import useDebounce from './CustomHook';
import s from './Search.module.scss';

type SearchPropsType = {
    title: string
    onKeyUpHandler: (value: string) => void
}

const Search = React.memo((props: SearchPropsType) => {
    const [value, setValue] = useState(props.title)

    const onKeyUpHandler = useDebounce(() => props.onKeyUpHandler(value), 1000)

    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {props.onKeyUpHandler(value)}
    }

    const setInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }


    return <div className={s.Search}>
        <input className={s.SearchInput}
               type="text"
               value={value}
               placeholder={'Search...'}
               onChange={setInputValueHandler}
               onKeyUp={onKeyUpHandler}
               onKeyPress={onEnterPressHandler}
        />
    </div>
});

export default Search;
