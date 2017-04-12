import React from 'react';
import TabButton from  './TabButton';
import TabPannel from './TabPannel';

export default class Tabs extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedKey:-1,
      head : [{
        title : '1번',
        body : '1번이야 1번'
      },{
        title : '2번',
        body : '2번이야 2번'
      },{
        title : '3번',
        body : '3번이야 3번'
      }]
    }

    this.handleClick = this. handleClick.bind(this);
  }

  handleClick(key){
    this.setState({
      selectedKey:key
    });
    console.log(this.state.selectedKey);
  }

  render(){
    const data =  this.state.head;

    const mapToComponent = (data) => {
      return (data.map((data,i)=>{
        return (<TabButton
          name={data}
          onClick = {() => this.handleClick(i)}/>);
      }));
    };

    return (
      <div style={styles.tabs}>
          {mapToComponent(this.state.head)}
          <div>
            <TabPannel
              isSelected={this.state.selectedKey != -1}
              head={this.state.head[this.state.selectedKey]}/>
          </div>
      </div>
    )
  }
}

const styles = {
  tabs :{
    width :"70%",
    margin:"0 auto",
    position:"absolute",
    border:"solid 1px grey"
  }
}
