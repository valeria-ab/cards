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
    sortBy: '' | SortingPacksType
    position: { top: string  }
}

export const SortingItem = React.memo((props: SortingPropsType) => {


    return (
        <div className={props.isArrowUp ? s.openDivStyles : ''}>
            <button className={props.setSortPacksValues.some((element: string) => element === props.sortBy)
                ? `${s.filter__btn} ${s.chosenButtonBackground}`
                : s.filter__btn
            }
                    onClick={() => props.setArrowUp(!props.isArrowUp)}
                // onBlur={() => props.setArrowUp(false)}
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
            {props.isArrowUp &&

                <div
                    onClick={() => props.setArrowUp(false) }
                    style={{
                    position: 'fixed',
                    zIndex: 10,
                    width: '100%',
                    height: '100%',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                    // backgroundColor: 'black',
                    //opacity: 0.3,
                }}>
                    <div className={s.dropdown} style={props.position}>
                        <ul>
                            <li className={s.dropdownItem}
                                onClick={() => {
                                    props.dispatch(setSortPacksValueAC(props.setSortPacksValues[1]))
                                    // props.setArrowUp(!props.isArrowUp)
                                }}
                            >по возрастанию
                            </li>
                            <li className={s.dropdownItem}
                                onClick={() => {
                                    props.dispatch(setSortPacksValueAC(props.setSortPacksValues[0]))
                                    // props.setArrowUp(!props.isArrowUp)
                                }}
                            >по убыванию
                            </li>
                        </ul>
                    </div>
                </div>}
        </div>

    )
})