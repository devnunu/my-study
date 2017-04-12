import React from 'react';


export default class TabButton extends React.Component{
  render(){
    return(
      <div style={styles.tab}>
          <p  onClick={this.props.onClick} style={styles.text}>{this.props.name.title}</p>
      </div>
    );
  }
}

const styles = {
  tab : {
    width: "80px",
    position:"relative",
    backgroundColor : "lightgreen",
    textAlign : "center",
    border:"solid 1px grey"
  },
  text:{
    fontWeight:"bold"
  }
}