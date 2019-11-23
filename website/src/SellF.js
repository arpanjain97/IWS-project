import React,{Component} from 'react'
import { Card, Icon, Image,Input,Form,Segment,Button } from 'semantic-ui-react'
import Imageup from './Imageup';
import FileUploadProgress  from 'react-fileupload-progress';
import axios from 'axios'
import faker from 'faker'
import _ from 'lodash'
const options = [
  { key: 1, text: '1', value: 1 },
  { key: 2, text: '2', value: 2 },
  { key: 3, text: '3', value: 3 },
  { key: 4, text: '4', value: 4 },
  { key: 5, text: '4+', value: 5 },
  
]

const addressDefinitions = faker.definitions.address
const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
  key: addressDefinitions.state_abbr[index],
  text: state,
  value: state,
}))
class SellF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      city:'',
      state:'',
      zipcode:'',
      amount:0,
      image:'',
      img:'',
      beds:0
    }
  }
  handleSelectChange=(e,{value})=>this.setState({state:value})
  handleBedChange=(e,{value})=>this.setState({beds:value})
  handleItemClick = () => {
    axios.post('https://10.6.5.246:8000/search',{
        query:this.state.search,
        bedrooms:this.state.beds,
        budget:this.state.budget
    })  .then(function (response) {
      console.log(response);
    })
  }
  upload=()=>{
    return(
      <div>
      <Imageup />
      </div>
    )

  }
    render(){
        return(
      
           <div>
                <Segment inverted>
    <Form inverted>
      <Form.Group>
      <Form.Input label='First name' placeholder='First Name' width={6} />
      <Form.Input label='Middle Name' placeholder='Middle Name' width={4} />
      <Form.Input label='Last Name' placeholder='Last Name' width={6} />
    </Form.Group>
    <Form.Group>
      
      <Form.Input placeholder='Address' width={8} onChange={(event)=>{
        this.setState({address:event.target.value})
      }} /><Form.Input placeholder='City' width={2} onChange={(event)=>{
        this.setState({city:event.target.value})
      }} />
      <Form.Input placeholder='Zipcode' width={2} onChange={(event)=>{
        this.setState({zipcode:event.target.value})
      }} />
      <Form.Select placeholder='State' width={1} options={stateOptions} color="white" onChange={this.handleSelectChange}/>
      
      </Form.Group>
    <Form.Group>
      <Form.Input placeholder='Price in USD' width={8} onChange={(event)=>{
        this.setState({amount:event.target.value})
      }} />
      <Form.Select placeholder='Number of Bedrooms' width={1} options={options} color="white" onChange={this.handleBedChange}/>
    </Form.Group>
    <FileUploadProgress key='ex1' method='POST' url='https://api.chatting-store.xyz/upload'
          onProgress={(e, request, progress) => {console.log('progress', e, request, progress);}}
          onLoad={ (e, request) => {console.log('load', e, JSON.parse(request.response));
          axios.post('https://api.chatting-store.xyz/property',{
            address:{street:this.state.address,zipcode:this.state.zipcode,city:this.state.city,state:this.state.state},
            bedrooms:this.state.beds,
            amount:this.state.budget,
            image:{
              filename:JSON.parse(request.response).filename,
              mimetype:JSON.parse(request.response).mimetype,
              
            },
            
        })  .then(function (response) {
          console.log("Success");
        })
        }}
          onError={ (e, request) => {console.log('error', e, request);}}
          onAbort={ (e, request) => {console.log('abort', e, request);}}
          />
      <Button type='submit' onClick={this.handleItemClick}>Submit</Button>
    </Form>
  </Segment>
  </div>
   
        );
    }

}


export default SellF;