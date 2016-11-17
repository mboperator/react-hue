import React from 'react';
import { connectModule } from 'redux-modules';
import { Container } from 'rebass';
import { compose, lifecycle } from 'recompose';
import debugMode from '../../utils/debugMode';
import Login from '../Login';
import AvailableLights from '../AvailableLights';
import module from './module';

const Controller = ({ children, errors, username, actions, bulbs }) => (
  <Container>
    Controller
    <Login onLogin={actions.login} activeProfile={username}/>
    {errors &&
      <div>
        <h2>Error!</h2>
        {errors.description}
      </div>
    }
    {children}
    <AvailableLights
      updateLight={actions.updateLight}
      lights={bulbs}
      fetchLights={actions.fetchLights}
    />
  </Container>
);

export default compose(
  connectModule(module),
  // debugMode(),
  lifecycle({
    componentDidMount() {
      this.props.actions.init({ ipAddress: this.props.ipAddress });
    },
  })
)(Controller);
