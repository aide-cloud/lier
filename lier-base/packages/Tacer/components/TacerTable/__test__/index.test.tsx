import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../../../tests/mountTest';
import TacerTable from '../index';

mountTest(TacerTable);

describe('TacerTable', () => {
  it('render button count correctly', () => {
    const component = mount(<TacerTable />);

    expect(component.find('h3').text()).toBe('This is TacerTable');
  });
});
