import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../../../tests/mountTest';
import Avatar from '../index';

mountTest(Avatar);

describe('Avatar', () => {
  it('render button count correctly', () => {
    const component = mount(<Avatar />);

    expect(component.find('h3').text()).toBe('This is Avatar');
  });
});
