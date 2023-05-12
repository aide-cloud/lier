import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../../../tests/mountTest';
import TacerFormModal from '../index';

mountTest(TacerFormModal);

describe('TacerFormModal', () => {
  it('render button count correctly', () => {
    const component = mount(<TacerFormModal />);

    expect(component.find('h3').text()).toBe('This is TacerFormModal');
  });
});
