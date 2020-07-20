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