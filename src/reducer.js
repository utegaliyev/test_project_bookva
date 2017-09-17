import {REQUEST_FETCH_CONTENT_FAILED, REQUEST_FETCH_CONTENT_START,
        REQUEST_FETCH_CONTENT_SUCCESS} from './action';
export default function customer(
                            state = {content: '', fetching: false, error: ''}, action){
    switch (action.type) {
        case REQUEST_FETCH_CONTENT_START:
            return Object.assign({}, state, {fetching: true, error: '', content: ''});
        case REQUEST_FETCH_CONTENT_SUCCESS:
            return Object.assign({}, state, {fetching: false, error: '', content: action.content});
        case REQUEST_FETCH_CONTENT_FAILED:
            return Object.assign({}, state, {fetching: false, error: action.error});
        default:
            return state;
    }
};
