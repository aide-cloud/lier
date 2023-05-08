import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../../../tests/mountTest';
import TacerModal from '../index';

mountTest(TacerModal);

describe('TacerModal', () => {
  it('render button count correctly', () => {
    const component = mount(<TacerModal />);

    expect(component.find('h3').text()).toBe('This is TacerModal');
  });
});
