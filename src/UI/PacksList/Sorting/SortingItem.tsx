import {Dispatch} from 'redux';
import {SortingPacksType} from '../../../DAL/packs-api';
import s from '../../Profile/ProfilePage.module.css';
import arrow
    from '../../../image/png-transparent-arrow-computer-icons-bar-chart-arrow-angle-chevron-svg-filter-effects-thumbnail.png';
import {setSortPacksValueAC} from '../../../BLL/packs/packs-reducer';
import React from 'react';

type SortingPropsType = {
    title: string
    isArrowUp: boolean
    setArrowUp: (value: boolean) => void
    dispatch: Dispatch
    setSortPacksValues: SortingPacksType[]
}
export const SortingItem = (props: SortingPropsType) => {
    return (
        <div className={props.isArrowUp ? s.openDivStyles : ''}>
            <button className={s.filter__btn}
                    onClick={() => props.setArrowUp(!props.isArrowUp)}
                // onBlur={() => setLastUpdatedArrowUp(false)}
            >
                <span>{props.title}</span>
                <span className={s.filter__icon}>
                                <img src={arrow}
                                     className={props.isArrowUp
                                         ? s.filterIcon_imgOpened
                                         : s.filterIcon_img}
                                />
                        </span>
            </button>
            <div className={s.dropdown}>
                <ul>
                    <li className={s.dropdownItem}
                        onClick={() => props.dispatch(setSortPacksValueAC(props.setSortPacksValues[1]))}
                    >по возрастанию
                    </li>
                    <li className={s.dropdownItem}
                        onClick={() => {
                            props.dispatch(setSortPacksValueAC(props.setSortPacksValues[0]))
                        }}
                    >по убыванию
                    </li>
                </ul>
            </div>
        </div>

    )
}