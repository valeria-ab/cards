import React from 'react';
import styles from "./Table.module.scss";
import {useSelector} from "react-redux";
import {IAppStore} from "../../BLL/store/store";
import {cardPacksType} from "../../DAL/Packs-api";

export const Table =React.memo(() => {

    const cardPacks = useSelector<IAppStore, cardPacksType[]>((state) => state.packs.cardPacks);


 return (
     <div className={styles.table}>
         <div className={styles.header}>
             <div className={styles.header__item}>Name</div>
             <div className={styles.header__item}>Cards</div>
             <div className={styles.header__item}>Last Updated</div>
             <div className={styles.header__item}>Created by</div>
             <div className={styles.header__item}>Actions</div>
         </div>
         <div className={styles.table__main}>
             {cardPacks.map((pack)=> {
                 return (<div key={pack._id} className={styles.table__row}>
                     <div className={styles.table__name}>{pack.name}</div>
                     <div className={styles.table__cards}>{pack.cardsCount}</div>
                     <div className={styles.table__updated}>{pack.updated}</div>
                     <div className={styles.table__created}>{pack.created}</div>
                     <div className={styles.table__actions}><div className="buttons"> <button>Delete</button> <button>Edit</button></div> </div>
                 </div>)
             })}
         </div>
     </div>
    );
});

