import React from 'react';

export default class TabPannel extends React.Component{
  render(){
    const details = (
      <p>{this.props.head.body}</p>
    )
    const blank = (
      <p>없다</p>
    )
    return(
      <div style = {styles.pannel}>
        {this.props.isSelected ? details : blank}
      </div>
    );
  }
}

const styles = {
  pannel :{
    textAlign:"center",
    marginTop:"50px",
    bottom:0,
    border:"1px solid gray",
    boxSizing:"border-box"
  }
}

TabPannel.defaultProps = {
  head:{
    body : ''
  }
};
