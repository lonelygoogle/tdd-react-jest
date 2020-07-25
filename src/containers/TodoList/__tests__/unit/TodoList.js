import React from 'react';
import TodoList from '../../index';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { waitForElementToBeRemoved } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

test('TodoList 初始化列表为空', () => {
  const wrapper = shallow(<TodoList />)
  expect(wrapper.state('undoList')).toEqual([])
});

test('TodoList 应该给header传递一个增加undoList的方法', () => {
  const wrapper = shallow(<TodoList />)
  const Header = wrapper.find('Header')
  expect(Header.prop('addUndoItem')).toBeTruthy()
});

test('当header回车时， undoList应该新增内容', () => {
    const wrapper = shallow(<TodoList />)
    wrapper.instance().addUndoItem('学习React')
    expect(wrapper.state('undoList').length).toBe(1)
    expect(wrapper.state('undoList')[0]).toBe('学习React')
    wrapper.instance().addUndoItem('学习React')
    expect(wrapper.state('undoList').length).toBe(2)
});

// test('TodoList 应该给未完成列表传递list数据，以及deleteItem方法', () => {
//     const wrapper = shallow(<TodoList />);
//     const UndoList = wrapper.find('UndoList');
//     expect(UndoList.prop('list')).toBeTruthy();
//     expect(UndoList.prop('deleteItem')).toBeTruthy();
//   });

  test('当delete方法被执行时， undoList应该删除内容', () => {
    const wrapper = shallow(<TodoList />)
    wrapper.setState({
        undoList: ['hsq', 'gqm', 'hym']
    })
    wrapper.instance().deleteItem(1)
    expect(wrapper.state('undoList')).toEqual(['hsq', 'hym'])
});