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
  expect(Header.prop('addUndoItem')).toBe(wrapper.instance().addUndoItem)
});

test('当header回车时， undoList应该新增内容', () => {
  const wrapper = shallow(<TodoList />)
  const Header = wrapper.find('Header')
  const addFunc = Header.prop('addUndoItem')
  addFunc('学习React')
  expect(wrapper.state('undoList').length).toBe(1)
  expect(wrapper.state('undoList')[0]).toBe('学习React')
  addFunc('学习React')
  expect(wrapper.state('undoList').length).toBe(2)

});