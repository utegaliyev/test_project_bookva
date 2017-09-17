import axios from 'axios';
export const REQUEST_FETCH_CONTENT_START = 'REQUEST_FETCH_CONTENT_START';
export const REQUEST_FETCH_CONTENT_SUCCESS = 'REQUEST_FETCH_CONTENT_SUCCESS';
export const REQUEST_FETCH_CONTENT_FAILED = 'REQUEST_FETCH_CONTENT_FAILED';



export function fetchContent(){
    return (dispatch ) => {
        dispatch({type: REQUEST_FETCH_CONTENT_START});
        axios.get('/doc')
            .then(function (response) {
                dispatch({type: REQUEST_FETCH_CONTENT_SUCCESS, content: response.data.doc});
            })
            .catch(function (error) {
                dispatch({type: REQUEST_FETCH_CONTENT_FAILED, content: error.message});
            })
    }
}