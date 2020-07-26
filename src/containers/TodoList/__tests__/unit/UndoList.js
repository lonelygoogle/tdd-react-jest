import React from 'react';
import UndoList from '../../components/UndoList';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { findTestWrapper } from '../../../../utils/testUtils'

Enzyme.configure({ adapter: new Adapter() });

describe('UndoList组件', () => {
    test('列表当数据为空数组时，count为零，列表无内容', () => {
        const wrapper = shallow(<UndoList list={[]}/>)
        const countElem = findTestWrapper(wrapper, "count")
        const listItem = findTestWrapper(wrapper, "list-item")
        expect(countElem.text()).toEqual('0')
        expect(listItem.length).toEqual(0)
    });
    
    test('列表有数据时，count显示数据长度，列表不为空', () => {
        // const dataList = ['学习jest','学习TDD','学习单元测试']
        const dataList = [{
            status: 'div',
            value: '学习jest'
        },{
            status: 'div',
            value: '学习TDD'
        },{
            status: 'div',
            value: '学习单元测试'
        }]
        const wrapper = shallow(<UndoList list={dataList}/>)
        const countElem = findTestWrapper(wrapper, "count")
        const listItem = findTestWrapper(wrapper, "list-item")
        expect(countElem.text()).toEqual('3')
        expect(listItem.length).toEqual(3)
    });
    
    test('列表有数据时，要存在删除按钮', () => {
        // const dataList = ['学习jest','学习TDD','学习单元测试']
        const dataList = [{
            status: 'div',
            value: '学习jest'
        },{
            status: 'div',
            value: '学习TDD'
        },{
            status: 'div',
            value: '学习单元测试'
        }]
        const wrapper = shallow(<UndoList list={dataList}/>)
        const deleteItem = findTestWrapper(wrapper, "delete-item")
        expect(deleteItem.length).toEqual(3)
    });
    
    test('列表有数据时，点击某个删除按钮，会调用删除方法', () => {
        // const dataList = ['学习jest','学习TDD','学习单元测试']
        const dataList = [{
            status: 'div',
            value: '学习jest'
        },{
            status: 'div',
            value: '学习TDD'
        },{
            status: 'div',
            value: '学习单元测试'
        }]
        const fn = jest.fn()
        const wrapper = shallow(<UndoList deleteItem={fn} list={dataList}/>)
        const deleteItems = findTestWrapper(wrapper, "delete-item")
        const index = 1
        deleteItems.at(index).simulate('click', {
            stopPropagation: () => {}
        })
        expect(fn).toHaveBeenLastCalledWith(index)
    });

    test('当某一项被点击的时候，触发执行changeStatus函数', () => {
        // const dataList = ['学习jest','学习TDD','学习单元测试']
        const dataList = [{
            status: 'div',
            value: '学习jest'
        },{
            status: 'div',
            value: '学习TDD'
        },{
            status: 'div',
            value: '学习单元测试'
        }]
        const fn = jest.fn()
        const wrapper = shallow(<UndoList changeStatus={fn} list={dataList}/>)
        const deleteItems = findTestWrapper(wrapper, "list-item")
        const index = 1
        deleteItems.at(index).simulate('click')
        expect(fn).toHaveBeenLastCalledWith(index)
    });

    test('当某一项status是input时，展示输入框', () => {
        // const dataList = ['学习jest','学习TDD','学习单元测试']
        const dataList = [{
            status: 'input',
            value: '学习jest'
        },{
            status: 'div',
            value: '学习TDD'
        },{
            status: 'div',
            value: '学习单元测试'
        }]
        const wrapper = shallow(<UndoList list={dataList}/>)
        const inputItems = findTestWrapper(wrapper, "input")
        expect(inputItems.length).toBe(1)
    });

    test('当某一个输入框失去焦点时，触发执行handleBlur函数', () => {
        // const dataList = ['学习jest','学习TDD','学习单元测试']
        const dataList = [{
            status: 'input',
            value: '学习jest'
        },{
            status: 'div',
            value: '学习TDD'
        },{
            status: 'div',
            value: '学习单元测试'
        }]
        const fn = jest.fn()
        const wrapper = shallow(<UndoList handleBlur={fn} list={dataList}/>)
        const inputElem = findTestWrapper(wrapper, "input")
        inputElem.simulate('blur')
        expect(fn).toHaveBeenLastCalledWith(0)
    });

    test('当某一个输入框变更时，触发执行valueChange函数', () => {
        // const dataList = ['学习jest','学习TDD','学习单元测试']
        const dataList = [{
            status: 'input',
            value: '学习jest'
        }]
        const value = '学习TDD'
        const fn = jest.fn()
        const wrapper = shallow(<UndoList valueChange={fn} list={dataList}/>)
        const inputElem = findTestWrapper(wrapper, "input")
        inputElem.simulate('change', {
            target: {value}
        })
        expect(fn).toHaveBeenLastCalledWith(0, value)
    });
});

