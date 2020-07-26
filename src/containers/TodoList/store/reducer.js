import { CHANGE_INPUT_VALUE } from './constants'

const initialState = {
    inputValue: ''
}

export default (state = initialState, actions) => {
    switch (actions.type) {
        case CHANGE_INPUT_VALUE: 
            return {inputValue: actions.value}

        default: return state
    }
}