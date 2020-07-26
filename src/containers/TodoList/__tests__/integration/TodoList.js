import React from 'react';
import TodoList from '../../index';
import { Provider } from 'react-redux'
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { findTestWrapper } from '../../../../utils/testUtils'
import store from '../../../../store/createStore'
import axios from '../../__mocks__/axios'

beforeEach(() => {
    axios.success = true
})
// test(`
//     1.header输入框输入内容
//     2.点击回车
//     3.列表中展示用户输入的内容型
//     `, () => {
//         const wrapper = mount(
//             <Provider store={store}><TodoList /></Provider>
//         )
//         const inputElem = findTestWrapper(wrapper, 'header-input')
//         const content = "Dell Lee"
//         inputElem.simulate('change', {
//             target: {value: content}
//         })
//         inputElem.simulate('keyUp', {
//             keyCode: 13
//         })
//         const listItem = findTestWrapper(wrapper, 'list-item')
//         expect(listItem.length).toEqual(1)
//         expect(listItem.text()).toContain(content)
// })

// test(`
//     1.用户打开界面，请求正常
//     2.应该展示接口返回的数据
//     `, (done) => {
//         const wrapper = mount(
//             <Provider store={store}><TodoList /></Provider>
//         )

//         // jest.runAllTimers()
//         // expect(setTimeout).toHaveBeenCalledTimes(1)
//         process.nextTick(() => {
//             wrapper.update()
//             console.log(wrapper.debug())
//             const listItem = findTestWrapper(wrapper, 'list-item')
//             expect(listItem.length).toEqual(1)
//             done()
//         })
// })

test(`
    1.用户打开界面，请求不正常
    2.页面无列表内容，但能把页面展示出来
    `, (done) => {
        axios.success = false
        const wrapper = mount(
            <Provider store={store}><TodoList /></Provider>
        )
        process.nextTick(() => {
            wrapper.update()
            console.log(wrapper.debug())
            console.log(1111111111111)
            const listItem = findTestWrapper(wrapper, 'list-item')
            expect(listItem.length).toEqual(0)
            done()
        })
})

