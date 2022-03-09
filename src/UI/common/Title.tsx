import React from 'react';
import s from './Table/Table.module.scss';



type TitleInfoType = {
    value: string
}

export const Title = React.memo((props: TitleInfoType) => {

    return (
        <div className={s.Table__name}>
            <h2>{props.value}</h2>
        </div>
    )
})
