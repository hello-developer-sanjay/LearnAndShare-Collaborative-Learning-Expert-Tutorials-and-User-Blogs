import { GET_CERTIFICATES, CERTIFICATES_ERROR } from '../actions/types';

const initialState = {
    certificates: [],
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CERTIFICATES:
            return {
                ...state,
                certificates: payload,
                loading: false
            };
        case CERTIFICATES_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
