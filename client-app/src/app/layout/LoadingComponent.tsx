import { Dimmer, Loader } from 'semantic-ui-react';

//Loading indicator typescript
interface Props{
    inverted?: boolean;
    content?: string;
}

export default function LoadingComponent({inverted =true,content = 'Loading...'}: Props){
    return(
        <Dimmer active={true} inverted ={inverted} >
        <Loader content={content}/>
        </Dimmer>
    )
}