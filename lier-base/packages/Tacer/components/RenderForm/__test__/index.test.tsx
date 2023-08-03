import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../../../tests/mountTest';
import RenderForm from '../index';

mountTest(RenderForm);

describe('RenderForm', () => {
  it('render button count correctly', () => {
    const component = mount(<RenderForm />);

    expect(component.find('h3').text()).toBe('This is RenderForm');
  });
});
