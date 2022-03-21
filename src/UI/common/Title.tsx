import React from 'react';
import s from './Table/Table.module.scss';



type TitleInfoType = {
    value: string
}

export const Title = React.memo((props: TitleInfoType) => {

    return (
        <div className={s.Table__name}>
            <h3>{props.value}</h3>
        </div>
    )
})
