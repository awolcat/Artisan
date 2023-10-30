import {useParams} from 'react-router-dom';

export default function Profile() {
    const { name } = useParams();
    return (
        <div className='profile'>{ name }</div>
    );
}