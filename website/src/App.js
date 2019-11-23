import React,{Component} from 'react';
import { Route, Switch } from 'react-router-dom'
import logo from './logo.svg';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import SellF from './SellF'
import './App.css';
import Home from './Home';
import Buy from './Buy'
import Login from './Login'
import Signup from './SignUp';
import Buybar from './Buybar'
import Chatbot from './chatbot/Chatbot';
import Chat from './Chat';
class App extends Component {
  render(){
  return (
    <div>
  
    <Menu
              fixed='top'
              
              size='large'
            >
            
              <Container>
             
                <Menu.Item as={Link} to="/">
                  Home
                </Menu.Item>
                <Menu.Item as={Link} to="/buy">Buy</Menu.Item>
                <Menu.Item as={Link} to="/sell">Sell</Menu.Item>
                <Menu.Item as={Link} to="/chat">Rent</Menu.Item>
                <Menu.Item position='right'>
                  <Button as={Link} to="/Login" >
                    Log in
                  </Button>
                  <Button as={Link} to="/SignUp"  style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
           <br /><br /><br />
           
    <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/buy" component={Buy} />
    <Route exact path="/Login" component={Login} />
    <Route exact path="/SignUp" component={Signup} />
    <Route exact path="/sell" component={SellF} />
    <Route exact path="/rent" component={Chat} />


  </Switch>
  </div>
  );
}
}
export default App;
