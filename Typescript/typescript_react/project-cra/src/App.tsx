import * as React from 'react';
import './App.css';

const logo = require('./logo.svg');

export interface AppProps {
  name : string;
  company? : string;
}

interface AppState {
  age:number
}

class App extends React.Component < AppProps , AppState > {
  static defaultProps ={
    company : 'studio'
  };

  constructor(props:AppProps) {
    super();
    this.state = {
      age : 35
    };
    this._rollback = this._rollback.bind(this);
  }

  componentWillMount() {
    console.log('App componentWillMount');
  }

  componentDidMount() {
    console.log('App componentDidMount');
    setInterval(() => {
      this.setState({
        age : this.state.age + 1
      });
    }, 2000);
    
  }

  componentWillUnmount() {
    console.log('App componentWillUnmount');
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.props.name},{this.props.company}, {this.state.age}</h2>
        </div>
        <p className="App-intro">
          <StatelessComponent name = {this.props.name} />
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={this._rollback}>회춘</button>
      </div>
    );
  }

  private _rollback() : void{
    this.setState({
      age:20
    });
  }
}


const StatelessComponent:React.SFC<AppProps> = (props) => {
  return (
    <h2>{props.name} {props.company}</h2>
  )
}

StatelessComponent.defaultProps = {
  company : "Home"
};



export default App;
