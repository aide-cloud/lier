import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../../../tests/mountTest';
import TacerSearch from '../index';

mountTest(TacerSearch);

describe('TacerSearch', () => {
  it('render button count correctly', () => {
    const component = mount(<TacerSearch />);

    expect(component.find('h3').text()).toBe('This is TacerSearch');
  });
});
