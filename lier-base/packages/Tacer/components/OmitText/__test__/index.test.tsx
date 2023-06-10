import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../../../tests/mountTest';
import OmitText from '../index';

mountTest(OmitText);

describe('OmitText', () => {
  it('render button count correctly', () => {
    const component = mount(<OmitText />);

    expect(component.find('h3').text()).toBe('This is OmitText');
  });
});
