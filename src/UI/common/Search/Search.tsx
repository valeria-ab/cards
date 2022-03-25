import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import useDebounce from './CustomHook';
import s from './Search.module.scss';
import {setSearchPackNameAC} from '../../../BLL/packs/packs-reducer';
import {useSelector} from 'react-redux';
import {IAppStore} from '../../../BLL/store/store';
import {InitialCardsStateType} from '../../../BLL/cards/cards-reducer';

type SearchPropsType = {
    value: string
    onKeyUpHandler: (value: string) => void
}

const Search = React.memo((props: SearchPropsType) => {
    const [value, setValue] = useState(props.value)

    const onKeyUpHandler = useDebounce(() => props.onKeyUpHandler(value), 1000)

    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {props.onKeyUpHandler(value)}
    }

    const setInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    //
    // useEffect(() => {
    //     console.log("useEff " + props.value)
    //     return () => {
    //         setValue(props.value)
    //     }
    // }, [props.value])

    return (
        <input className={s.searchInput}
               type="text"
               value={value}
               placeholder={'Search...'}
               onChange={setInputValueHandler}
               onKeyUp={onKeyUpHandler}
               onKeyPress={onEnterPressHandler}
        />

    )
});

export default Search;
