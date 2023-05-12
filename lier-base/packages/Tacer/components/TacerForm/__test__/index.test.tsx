import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../../../tests/mountTest';
import TacerForm from '../index';

mountTest(TacerForm);

describe('TacerForm', () => {
  it('render button count correctly', () => {
    const component = mount(<TacerForm />);

    expect(component.find('h3').text()).toBe('This is TacerForm');
  });
});
