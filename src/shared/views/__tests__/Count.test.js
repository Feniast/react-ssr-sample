import React from 'react';
import { shallow } from 'enzyme';
import { Count } from '../Count';

describe('About Views Test', () => {
  it('should render correctly', () => {
    const increment = jest.fn();
    const decrement = jest.fn();
    const count = 1;
    const component = shallow(
      <Count count={count} doubleCount={count * 2} increment={increment} decrement={decrement} />
    );

    expect(component.find('.count').text()).toEqual("Count: 1");

    component.find('.btn-plus').simulate('click');
    expect(increment).toHaveBeenCalled();

    component.find('.btn-minus').simulate('click');
    expect(decrement).toHaveBeenCalled();

    expect(component).toMatchSnapshot();
  });
});
