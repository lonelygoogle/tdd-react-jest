import React from 'react';
import { render } from '@testing-library/react';
import Header from '../../components/Header';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('header组件包含input框 初始值为空', () => {
  const wrapper = shallow(<Header />)
  console.log(wrapper.debug())
  const inputElem = wrapper.find('[data-test="input"]')
  expect(inputElem.prop('value')).toEqual('')
});

test('header组件包含input框 跟随用户输入改变', () => {
  const wrapper = shallow(<Header />)
  console.log(wrapper.debug())
  const inputElem = wrapper.find('[data-test="input"]')
  const userInput = '今天学习jest'
  inputElem.simulate('change', {
    target: {value: userInput}
  })
  expect(wrapper.state('value')).toEqual(userInput)
});

test('header组件包含input框 按回车时 如果无内容 无操作', () => {
  const fn = jest.fn()
  const wrapper = shallow(<Header addUndoItem={fn}/>)
  // console.log(wrapper.debug())
  const inputElem = wrapper.find('[data-test="input"]')
  wrapper.setState({value: ''})
  inputElem.simulate('keyUp', {
    keyCode: 13
  })
  expect(fn).not.toHaveBeenCalled()
  // expect(wrapper.state('value')).toEqual(userInput)
});

test('header组件包含input框 按回车时 如果有内容 函数被调用', () => {
  const fn = jest.fn()
  const wrapper = shallow(<Header addUndoItem={fn}/>)
  const inputElem = wrapper.find('[data-test="input"]')
  const userInput = '学习React'
  wrapper.setState({value: userInput})
  inputElem.simulate('keyUp', {
    keyCode: 13
  })
  expect(fn).toHaveBeenCalled()
  expect(fn).toHaveBeenLastCalledWith(userInput)
  
  // expect(wrapper.state('value')).toEqual(userInput)
});

test('header组件包含input框 按回车时 如果有内容 最后input应该清楚掉', () => {
  const fn = jest.fn()
  const wrapper = shallow(<Header addUndoItem={fn}/>)
  const inputElem = wrapper.find('[data-test="input"]')
  const userInput = '学习React'
  wrapper.setState({value: userInput})
  inputElem.simulate('keyUp', {
    keyCode: 13
  })
  const newInputElem = wrapper.find('[data-test="input"]')
  expect(newInputElem.prop('value')).toBe('')
});