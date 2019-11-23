import React,{Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import axios from 'axios';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:''
    }
  }
    handleLogin=()=>{
      //axios.

    }
  render(){
    return(

  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
       Log-in to your account
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'  onChange={(email) => this.setState({email})} />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={(email) => this.setState({email})}
          />

          <Button color='teal' fluid size='large' onClick={this.handleLogin}>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='/SignUp'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
);
    }}

export default LoginForm