import {Input} from 'antd';
import * as React from "react";

interface IProps extends React.ComponentProps<typeof Input> {
    classname?: string;
}

export default function DefaultInput({classname, ...rest}: IProps) {
    return <div className={`w-full`}>
        <Input
            autoFocus={true}
            className={`rounded-[18px] h-[38px] w-full pl-[18px] pr-[50px] caret-[gray] ${classname}`} {...rest}/>
    </div>
}
