import React, {useEffect} from 'react';
import styles from './EditPack.module.scss';



export const EditPack =React.memo(() => {

    useEffect(() => {
        const body = document.querySelector('body');
        if (body) body.style.overflow = 'hidden';
        return () => {
            if (body) body.style.overflow = 'auto';
        };
    }, []);




 return (
     <div className={styles.modal}>
         <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
             <div className={styles.wrap}>
                 <div className={styles.header}>
                     <h2 className={styles.title}>Edit pack name</h2>
                 </div>
                 <p className={styles.text}>Pack name</p>
                 <input
                     type='text'
                     className={styles.input}
                 />
                 <div className={styles.wrapBtn}>
                     <button className={styles.btnCancel}>
                         Cancel
                     </button>
                     <button className={styles.btnSave} >
                         Save
                     </button>
                 </div>
             </div>
         </div>
     </div>
    );
});

