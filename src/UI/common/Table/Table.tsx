import React from 'react';
import s from './Table.module.scss';
import {CardPacksType} from '../../../DAL/packs-api';
import {NavLink} from 'react-router-dom';


type PacksTableType = {
    packsList: CardPacksType[]
    onLearnButtonClick: (pack: CardPacksType) => void
    userId: string
    editModeOn: (pack: CardPacksType) => void
    deleteModeOn: (pack: CardPacksType) => void
}
export const Table = React.memo((props: PacksTableType) => {


    return (
        <div className={s.table}>
            <div className={s.tableMain}>
                <table className={s.tableWrapper}>
                    <thead className={s.tableHeader}>
                    <tr className={s.table__headRow}>
                        <th className={s.table__head}>
                            Name
                        </th>
                        <th className={s.table__head}>
                            Cards
                        </th>
                        <th className={s.table__head}>
                            Last Updated
                        </th>
                        <th className={s.table__head}>Created by</th>
                        <th className={s.table__head}>Actions</th>
                    </tr>
                    </thead>
                    <tbody className={s.table__main}>
                    {props.packsList.map((pack) => {

                        return (<tr key={pack._id} className={s.table__row}>
                            <NavLink to={`/pack/${pack._id}/${pack.name}`}>
                                <td className={s.table__data}>{pack.name}</td>
                            </NavLink>
                            <td className={s.table__data}>{pack.cardsCount}</td>
                            <td className={s.table__data}>{pack.updated.slice(0, 10)}</td>
                            <td className={s.table__data}>{pack.user_name}</td>
                            <td className={s.table__data}>
                                {props.userId === pack.user_id ?
                                    <div className={s.buttons}>
                                        <button className={s.delButtonWrapper}
                                                onClick={() => props.deleteModeOn(pack)}>Delete
                                        </button>
                                        <button className={s.buttonWrapper}
                                                onClick={() => props.editModeOn(pack)}>Edit
                                        </button>
                                        <NavLink to={`/learn/${pack._id}/${pack.name}`}>
                                            {
                                                pack.cardsCount > 0 && <button className={s.buttonWrapper}
                                                                               // onClick={() => props.onLearnButtonClick(pack)

                                                >Learn
                                                </button>
                                            }
                                        </NavLink>

                                    </div>
                                    : pack.cardsCount > 0 &&
                                    <NavLink to={`/learn/${pack._id}/${pack.name}`}>
                                        <button className={s.buttonWrapper}
                                                onClick={() => props.onLearnButtonClick(pack)}>Learn
                                        </button>
                                    </NavLink>
                                }
                            </td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
});