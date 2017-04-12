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
    width: "32%",
    margin:"0 auto",
    position:"relative",
    backgroundColor : "lightgreen",
    textAlign : "center",
    border:"solid 1px grey",
    float:"left"
  },
  text:{
    fontWeight:"bold"
  }
}
