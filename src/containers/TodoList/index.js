import React, { Component }from 'react';
import Header from './components/Header'
import UndoList from './components/UndoLIst'
import './style.css'
class TodoList extends Component {
    constructor (props) {
        super(props)
        this.addUndoItem = this.addUndoItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.valueChange = this.valueChange.bind(this)
        this.state = {
            undoList: []
        }
    }
    addUndoItem (value) {
        this.setState({
            undoList: [...this.state.undoList, {
                status: 'div',
                value
            }]
        })
    }

    changeStatus (index) {
        // console.log(index)
        const newList = this.state.undoList.map((item, listIndex) => {
            if (index === listIndex) {
                return {
                    ...item,
                    status: 'input'
                }
            } else {
                return {
                    ...item,
                    status: 'div'
                }
            }
        })
        this.setState({undoList: newList})
    }

    deleteItem (index) {
        const newList = [...this.state.undoList]
        newList.splice(index, 1)
        this.setState({
            undoList: newList
        })
    }

    handleBlur(index) {
        console.log('blur', index)
        const newList = this.state.undoList.map((item, listIndex) => {
          if(index === listIndex) {
            return {
              ...item,
              status: 'div'
            }
          }
          return item;
        })
        this.setState({undoList: newList})
      }

    valueChange(index, value) {
        const newList = this.state.undoList.map((item, listIndex) => {
          if(index === listIndex) {
            return {
              ...item,
              value,
            }
          }
          return item;
        })
        this.setState({undoList: newList})
      }

    render () {
        const { undoList } = this.state
        return (
            <div>
                <Header addUndoItem={this.addUndoItem}></Header>
                <UndoList
                list={undoList}
                deleteItem={this.deleteItem}
                changeStatus={this.changeStatus}
                handleBlur={this.handleBlur}
                valueChange={this.valueChange}
                />
            </div>
        )
    }
}

export default TodoList;
