import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class Signup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:''
    }
  }
  render(){
    return(
      <div>
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
     Create an account
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />
          <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Retype Password'
          type='password'
        />
          <Button color='teal' fluid size='large'>
            Sign Up
          </Button>
        </Segment>
      </Form>
      <Message>
        Already have an account? <a href='/Login'>Login</a>
      </Message>
    </Grid.Column>
  </Grid>
  </div>
)
    }
  }
export default Signup