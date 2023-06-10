import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../../../tests/mountTest';
import CopyText from '../index';

mountTest(CopyText);

describe('CopyText', () => {
  it('render button count correctly', () => {
    const component = mount(<CopyText />);

    expect(component.find('h3').text()).toBe('This is CopyText');
  });
});
