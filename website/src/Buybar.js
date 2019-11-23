import React , {Component} from 'react';
import {Menu,Input,Dropdown,Card, Button,Form} from 'semantic-ui-react'
import Beds from './Beds';
import Hometypes from './Hometypes'
//import Priceslider from './priceslider';
import Rheostat from 'rheostat';

const beds = [
  { key: 1, text: '1', value: 1 },
  { key: 2, text: '2', value: 2 },
  { key: 3, text: '3', value: 3 },{ key: 4, text: '4', value: 4 },
  { key: 5, text: '4+', value: 5 },
]
const options = [
  { key: 1, text: '250k', value: 250000 },
  { key: 2, text: '500k', value: 500000 },
  { key: 1, text: '1M', value: 1000000 },
  { key: 2, text: '1M+', value: 1000001 },
  
]


class Buybar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      budget:0,
      activeItem: 'home' ,
      beds:null
    }
  }
  



    handleItemClick = () => {
      console.log(this.state.beds)
      console.log(this.state.budget)
      console.log(this.state.search)
    }
    handleSelectChange=(e,{value})=>this.setState({budget:value})
    handleBedChange=(e,{value})=>this.setState({beds:value})
    render(){
        return(
            <div>
                <Menu inverted pointing >
                <Menu.Menu position='left'>
            <Menu.Item>
            <Form onSubmit={this.handleItemClick}>
              <Form.Input icon='search' placeholder='Search...'  onChange={(event)=>{
                this.setState({search:event.target.value})
              }} />
              </Form>
            </Menu.Item>
          </Menu.Menu>
          <Menu.Item>
          </Menu.Item>
            
          <Dropdown clearable options={options} fluid
  selection
  multiple={false}
 placeholder="Budget 0-" onChange={this.handleSelectChange} />
          <Dropdown clearable options={beds}
  color="black" 
  multiple
  search
  selection placeholder="Number of Bedrooms" onChange={this.handleBedChange} />

                </Menu>
            </div>
        )

    }
}

export default Buybar;