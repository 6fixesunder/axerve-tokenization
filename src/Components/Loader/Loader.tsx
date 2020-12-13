import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { useContext, useState } from 'react';
import { AppContext } from '../../hooks/UseAppContext';
import "./Loader.scss";

function Loader() {
    const { loaderVisible } = useContext(AppContext);

    return (
        <div className="Loader"
            style={{ display: `${loaderVisible ? 'flex' : 'none'}` }}
        >
            <CircularProgress
                className="CirculaLoader"
                color="secondary" />
        </div>
    )

}

export default Loader;