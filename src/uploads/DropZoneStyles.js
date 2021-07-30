import * as animationUpload from '../images/lottie/uploaded.json';
import * as errorAnimationUpload from '../images/lottie/error.json';
import * as loadingAnimationUpload from '../images/lottie/loading.json';
import { makeStyles } from '@material-ui/core/styles';



export const baseStyle = {
    height: '300px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#000',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#000',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    margin: '30px 0',
};

export const activeStyle = {
    borderColor: '#2196f3'
};

export const acceptStyle = {
    borderColor: '#00e676'
};

export const rejectStyle = {
    borderColor: '#ff1744'
};

export const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root, & .MuiButton-root': {
            margin: "10px 0",
            width: "100%",
        },
        '& .MuiButton-root': {
            height: "60px",
        },
    },
}));

export const errorStyle = {
    container: {
        alignItems: 'center'
    },
    message: {
        width: '415px',
        /* height: 300px; */
        overflow: 'hidden',
        margin: '0px auto',
        fontSize: '21px',
        /* color: red; */
        color: 'rgb(208, 2, 27)',
        outline: 'none',
        whiteSpace: 'nowrap',
        marginBottom: '10px'
    },
    errorButton: {
        width: '300px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    errorButtonContainer: {
        marginTop: '50px',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    newErrorButtonContainer:{
        marginTop: '50px',
        display: 'flex',
        border: '1px solid black',
        justifyContent: 'center'    
    },
    newErrorButton: {
        width: '300px',
        height: '74px',
        backgroundColor: 'white',
        fontWeight: 800
    }
} 

export const loadingStyle = {
    container: {
        alignItems: 'center'
    },
    message: {
        width: '415px',
        overflow: 'hidden',
        margin: '0px auto',
        fontSize: '21px',
        outline: 'none',
        whiteSpace: 'nowrap',
        marginBottom: '10px',
        textAlign: 'center'
    }
}


export const defaultOptions = {
    loop: false,
    autoplay: true, 
    animationData: animationUpload.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

export const errorDefaultOptions = {
    loop: false,
    autoplay: true, 
    animationData: errorAnimationUpload.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
}

export const loadingDefaultOptions = {
    loop: false,
    autoplay: true, 
    animationData: loadingAnimationUpload.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
}