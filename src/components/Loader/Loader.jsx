import { ThreeDots } from  'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
    return (
        <div className={css.loader}>
            <ThreeDots 
                height = "80"
                width = "80"
                radius = "9"
                color = 'rgb(55, 95, 206)'
                ariaLabel = 'three-dots-loading'     
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Loader;