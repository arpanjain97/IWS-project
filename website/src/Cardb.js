import React,{Component} from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import {FlippingCard,FlippingCardBack,FlippingCardFront,ProductCard,NewsHeaderCard} from 'react-ui-cards';

class Cardb extends Component{
  
render(){
  return(
    <FlippingCard>
        <FlippingCardBack>
        <ProductCard description={this.props.data.bedrooms+" Bedrooms "+this.props.data.address.street+" "+this.props.data.address.city+" "+this.props.data.address.state+"-"+this.props.data.address.zipcode} photos={[this.props.data.image]} productName={this.props.data.address.street} price={"$"+this.props.data.amount}/>
  	  </FlippingCardBack>
  	  <FlippingCardFront>
        <NewsHeaderCard thumbnail={this.props.data.image} title={this.props.data.address.street} />
        </FlippingCardFront>
  </FlippingCard>
);
}
}

export default Cardb