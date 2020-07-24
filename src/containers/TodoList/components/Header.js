import React, { Component }from 'react';

class Header extends Component {
    constructor (props) {
        super(props)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleInputKeyup = this.handleInputKeyup.bind(this)
        this.state = {
            value: ''
        }
    }

    handleInputChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    handleInputKeyup (e) {
        const { value } = this.state
        if (e.keyCode === 13 && value) {
            this.props.addUndoItem(value)
            this.setState({value: ''})
        }
    }

    render () {
        const { value } = this.state
        return (
        <div className="header">
            <div className="header-contain">
                TodoList
                <input
                placeholder="Todo hi"
                className="header-input"
                data-test='input'
                value={value}
                onChange={this.handleInputChange}
                onKeyUp={this.handleInputKeyup}
                />
            </div> 
        </div>
        )
    }
}

export default Header;
