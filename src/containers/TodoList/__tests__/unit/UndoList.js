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
        const dataList = ['学习jest','学习TDD','学习单元测试']
        const wrapper = shallow(<UndoList list={dataList}/>)
        const countElem = findTestWrapper(wrapper, "count")
        const listItem = findTestWrapper(wrapper, "list-item")
        expect(countElem.text()).toEqual('3')
        expect(listItem.length).toEqual(3)
    });
    
    test('列表有数据时，要存在删除按钮', () => {
        const dataList = ['学习jest','学习TDD','学习单元测试']
        const wrapper = shallow(<UndoList list={dataList}/>)
        const deleteItem = findTestWrapper(wrapper, "delete-item")
        expect(deleteItem.length).toEqual(3)
    });
    
    test('列表有数据时，点击某个删除按钮，会调用删除方法', () => {
        const dataList = ['学习jest','学习TDD','学习单元测试']
        const fn = jest.fn()
        const wrapper = shallow(<UndoList deleteItem={fn} list={dataList}/>)
        const deleteItems = findTestWrapper(wrapper, "delete-item")
        const index = 1
        deleteItems.at(index).simulate('click')
        expect(fn).toHaveBeenLastCalledWith(index)
    });
});

