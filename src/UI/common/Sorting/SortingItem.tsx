import {Dispatch} from 'redux';
import {SortingPacksType} from '../../../DAL/packs-api';
import s from './Sorting.module.css';
import ArrowBackIcon from '../../../image/27323.svg'
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
}

export const SortingItem = React.memo((props: SortingPropsType) => {


    return (
        <div className={s.openDivStyles}>
            <button className={props.setSortPacksValues.some((element: string) => element === props.sortBy)
                ? `${s.filter__btn} ${s.chosenButtonBackground}`
                : s.filter__btn
            }
                    onClick={() => props.setArrowUp(!props.isArrowUp)}
                // onBlur={() => props.setArrowUp(false)}
            >
                <span>{props.title}</span>
                <img src={arrow}
                     className={props.isArrowUp
                         ? s.filterIcon_imgOpened
                         : s.filterIcon_img}
                />
            </button>


            {props.isArrowUp &&
                // <div
                //     onClick={() => props.setArrowUp(false)}
                //     className={s.onBlurStyle}
                // >
                <div className={s.dropdown}>
                    <ul className={s.sortingUl}>
                        <li className={s.dropdownItem}
                            onClick={() => {
                                props.dispatch(setSortPacksValueAC(props.setSortPacksValues[1]))
                                props.setArrowUp(!props.isArrowUp)
                            }}
                        ><img src={ArrowBackIcon} height={'6px'}
                              style={{
                                  transform: 'rotate(90deg)',
                                  display: 'inline-block'
                              }}/>
                            ascending
                        </li>
                        <li className={s.dropdownItem}
                            onClick={() => {
                                props.dispatch(setSortPacksValueAC(props.setSortPacksValues[0]))
                                props.setArrowUp(!props.isArrowUp)
                            }}
                        ><img src={ArrowBackIcon} height={'6px'}
                              style={{
                                  transform: 'rotate(270deg)',
                                  display: 'inline-block'
                              }}/>
                            descending
                        </li>
                    </ul>
                </div>
                // </div>
            }
        </div>

    )
})