import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../../../tests/mountTest';
import UploadImage from '../index';

mountTest(UploadImage);

describe('UploadImage', () => {
  it('render button count correctly', () => {
    const component = mount(<UploadImage />);

    expect(component.find('h3').text()).toBe('This is UploadImage');
  });
});
