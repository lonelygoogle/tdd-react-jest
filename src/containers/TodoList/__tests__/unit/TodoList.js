import React from 'react';
import TodoList from '../../index';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { waitForElementToBeRemoved } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

describe('TodoList组件', () => {
    test('初始化列表为空', () => {
      const wrapper = shallow(<TodoList />)
      expect(wrapper.state('undoList')).toEqual([])
    });
    
    test('应该给header传递一个增加undoList的方法', () => {
      const wrapper = shallow(<TodoList />)
      const Header = wrapper.find('Header')
      expect(Header.prop('addUndoItem')).toBeTruthy()
    });
    
    test('当header回车时，undoList应该新增内容', () => {
        const wrapper = shallow(<TodoList />)
        const content = '学习React'
        wrapper.instance().addUndoItem(content)
        expect(wrapper.state('undoList').length).toBe(1)
        expect(wrapper.state('undoList')[0]).toEqual({
            status: 'div',
            value: content
        })
        wrapper.instance().addUndoItem('学习React')
        expect(wrapper.state('undoList').length).toBe(2)
    });
    
      test('当delete方法被执行时， undoList应该删除内容', () => {
        const wrapper = shallow(<TodoList />)
        const data = [{
            status: 'div',
            value: '学习jest'
        },{
            status: 'div',
            value: '学习TDD'
        },{
            status: 'div',
            value: '学习单元测试'
        }]
        wrapper.setState({
            undoList: data
        })
        wrapper.instance().deleteItem(1)
        expect(wrapper.state('undoList')).toEqual([data[0], data[2]])
    });

      test('当changeStatus方法被执行时， undoList的status被修改', () => {
        const wrapper = shallow(<TodoList />)
        const data = [{
            status: 'div',
            value: '学习jest'
        },{
            status: 'div',
            value: '学习TDD'
        },{
            status: 'div',
            value: '学习单元测试'
        }]
        wrapper.setState({
            undoList: data
        })
        wrapper.instance().changeStatus(1)
        expect(wrapper.state('undoList')[1]).toEqual({
            ...data[1],
            status: 'input'
        })
    });

      test('当valueChange方法被执行时， undoList的内容被修改', () => {
        const wrapper = shallow(<TodoList />)
        const data = [{
            status: 'input',
            value: '学习jest'
        }]
        const value = '学习TDD'
        wrapper.setState({
            undoList: data
        })
        wrapper.instance().valueChange(0, value)
        expect(wrapper.state('undoList')[0]).toEqual({
            ...data[0],
            value
        })
    });

      test('当handleBlur方法被执行时， undoList的status被修改', () => {
        const wrapper = shallow(<TodoList />)
        const data = [{
            status: 'input',
            value: '学习jest'
        },{
            status: 'div',
            value: '学习TDD'
        },{
            status: 'div',
            value: '学习单元测试'
        }]
        wrapper.setState({
            undoList: data
        })
        wrapper.instance().handleBlur(0)
        expect(wrapper.state('undoList')[0]).toEqual({
            ...data[0],
            status: 'div'
        })
    });

});
