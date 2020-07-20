import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('renders learn react link', () => {
  // const { getByText } = render(<App />);
  // const linkElement = getByText(/hello/i);
  // expect(linkElement).toBeInTheDocument();
  const wrapper = shallow(<App />)
  console.log(wrapper.debug())
  // expect(wrapper.find('[data-test="container"]').length).toBe(1)
  // expect(wrapper.find('[data-test="container"]').prop('title')).toBe('huangsiqin')
  expect(wrapper.find('[data-test="container"]')).toExist()
});
