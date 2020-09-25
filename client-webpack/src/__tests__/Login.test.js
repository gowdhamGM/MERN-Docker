import React from 'react';
import { expect } from 'chai';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';


configure({ adapter: new Adapter() });
import Login from '../auth/login';

describe('<Login>', () => {
  it('has a login button', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.containsMatchingElement(<button type="submit">Login</button>)).to.be.true;
  });

  it('has a email input field', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.containsMatchingElement(<input type="text" />)).to.be.true;
  });

  it('has a password input field', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.containsMatchingElement(<input type="password" />)).to.be.true;
  });

  it('passes login information', () => {
    const email = 'jai@jai.com';
    const password = '12345';
    const wrapper = shallow(<Login handleLogin={state => {
      expect(state.email).to.be.equal(email);
      expect(state.password).to.be.equal(password);
    }}/>);
    wrapper.setState({ email: 'jai@jai.com', password: '12345'});
    wrapper.find('button').simulate('click');
  });
});