import React from 'react';
import TodoList from '../../index';
import { Provider } from 'react-redux'
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { findTestWrapper } from '../../../../utils/testUtils'
import store from '../../../../store/createStore'

test(`
    1.header输入框输入内容
    2.点击回车
    3.列表中展示用户输入的内容型
    `, () => {
        const wrapper = mount(
            <Provider store={store}><TodoList /></Provider>
        )
        const inputElem = findTestWrapper(wrapper, 'header-input')
        const content = "Dell Lee"
        inputElem.simulate('change', {
            target: {value: content}
        })
        inputElem.simulate('keyUp', {
            keyCode: 13
        })
        const listItem = findTestWrapper(wrapper, 'list-item')
        expect(listItem.length).toEqual(1)
        expect(listItem.text()).toContain(content)
})


// it(`
//   1. Header 输入框输入内容
//   2. 点击回车
//   3. 列表中展示用户输入的内容项
// `, () => {
//   const wrapper = mount(
//     <Provider store={store}><TodoList /></Provider>
//   );
//   const inputElem = findTestWrapper(wrapper, 'header-input');
//   const content = "Dell Lee";
//   inputElem.simulate('change', {
//     target: {value: content}
//   });
//   inputElem.simulate('keyUp', {
//     keyCode: 13
//   });
//   const listItem = findTestWrapper(wrapper, 'list-item');
//   expect(listItem.length).toEqual(1);
//   expect(listItem.text()).toContain(content);
// });