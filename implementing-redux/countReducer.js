import COUNTER_ACTIONS from './COUNTER_ACTIONS.js';

const countReducer = (state = 0, action = {}) => {
    switch (action.type) {
        case COUNTER_ACTIONS.INCREMENT:
            return state + 1;
        case COUNTER_ACTIONS.DECREMENT:
            return state - 1;
        case COUNTER_ACTIONS.RESET :
            return 0;
        case COUNTER_ACTIONS.SET :
            return action.count;
        default:
            return state;
    }
};

export default countReducer;
