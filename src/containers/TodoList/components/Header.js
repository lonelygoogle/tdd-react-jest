import React, { Component }from 'react';
import { connect } from 'react-redux'
import { actions } from '../store/'

class Header extends Component {
    constructor (props) {
        super(props)
        this.handleInputKeyup = this.handleInputKeyup.bind(this)
    }


    handleInputKeyup (e) {
        const { value } = this.props
        if (e.keyCode === 13 && value) {
            this.props.addUndoItem(value)
            this.props.handleInputChange('')
        }
    }

    render () {
        const { value, handleInputChange } = this.props
        return (
        <div className="header">
            <div className="header-contain">
                TodoList
                <input
                placeholder="Todo hi"
                className="header-input"
                data-test='header-input'
                value={value}
                onChange={e => handleInputChange(e.target.value)}
                onKeyUp={this.handleInputKeyup}
                />
            </div> 
        </div>
        )
    }
}

const mapState = (state) => {
    return {
        value: state.todo.inputValue
    }
}

const mapDispatch = (dispatch) => ({
    handleInputChange (value) {
        console.log('gaikbain', value)
        dispatch(actions.changeInputValue(value))
    }
})

export default connect(mapState, mapDispatch)(Header);
