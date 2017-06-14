import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {focus:0};
    }

    handleClick(index){
        this.setState({focus:index});
    }

    render(){

        let self = this;

        return (
            <ul>{this.props.menus.map(function(val, index){
                    let style = '';
                    
                    if(self.state.focus===index){
                       style = "focused"
                    }

                    return <li className={style} onClick={self.handleClick.bind(self, index)}>{val}</li>
                })
             }
             <p>selected : {this.props.menus[this.state.focus]}</p>
            </ul>
        );
    }

}

ReactDom.render(
    <Menu menus={["exampe1","exampe2","exampe3","exampe4"]}/>
    ,document.getElementById("root")
);