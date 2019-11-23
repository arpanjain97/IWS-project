import React,{Component} from 'react';
import { Route, Switch } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment,Card,Menu,Dropdown } from 'semantic-ui-react'
import SplitPane from 'react-split-pane'
import Map from './Map'
import Cardb from './Cardb'
import Buybar from './Buybar'
import ScrollArea from 'react-scrollbar'
import {FlippingCard,FlippingCardBack,FlippingCardFront,ProductCard,NewsHeaderCard} from 'react-ui-cards';
//import axios from 'axios';
import axios from 'axios';
import Chatbot from './chatbot/Chatbot';
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
  
class Buy extends Component{
    constructor(props) {
        super(props);
        this.state = {
          search: '',
          budget:0,
          activeItem: 'home' ,
          beds:null,
          data:null
        }
      }
      handleItemClick = () => {
        axios.post('https://api.chatting-store.xyz/search',{
            query:this.state.search,
            bedrooms:this.state.beds,
            budget:this.state.budget
        })  .then( (response) => {
          console.log(response.data.results);
          this.setState({data:response.data.results});
          console.log(this.state.data);


        })
      }
    handleSelectChange=(e,{value})=>this.setState({budget:value})
    handleBedChange=(e,{value})=>this.setState({beds:value})
    hrend=()=>{
      return this.state.data.map((dat)=>
       
        <Cardb data= {dat} />
       
      )}
    
    render(){
    return(
        <div>
        
            <div>
      <SplitPane split="vertical" minSize="50vw" defaultSize="50vw">
   <div><Map /></div>
   <div>
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
   
      <div class="row">
      { this.state.data!=null ?this.hrend() 
        :null
      }
   
     
  </div>
    

   </div>
</SplitPane>

</div>
                
       
</div>
    );
}
}
export default Buy;
