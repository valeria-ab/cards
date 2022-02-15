import React, {ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes} from 'react'
import s from './Paginations.module.scss'
import {getPacksTC, setCardPacksPageCountAC} from '../../../BLL/packs/packs-reducer';
import {useDispatch} from 'react-redux';

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: string[]
    onChangeOption?: (option: string) => void
}

const Select: React.FC<SuperSelectPropsType> = (
    {
        options,
        onChange, onChangeOption,
        ...restProps
    }
) => {
const dispatch=useDispatch()
    const mappedOptions: any[] = options ? options.map((o, i) => (
        <option className={s.option} key={'option-' + i} value={o}>{o}</option>
    )) : []

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
        dispatch(setCardPacksPageCountAC(+e.currentTarget.value))
        // dispatch(getPacksTC())
    }

    return (
        <select className={s.select} onChange={onChangeCallback} {...restProps}>
            {mappedOptions}
        </select>
    )
}

export default Select;
