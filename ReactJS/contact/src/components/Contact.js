import React from 'react';
import ContactInfo from './Contactinfo';

export default class Contact extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      keyword : '',
      contactData : [{
        name:'james',
        phone :'01029393829'
      },{
        name:'jim',
        phone :'01029393829'
      },{
        name:'jone',
        phone :'01029393829'
      },{
        name:'jack',
        phone :'01029393829'
      }]
    };

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
      this.setState({
        keyword: e.target.value
      });
    }

    render(){
      const mapToComponents = (data) => {
        data.sort();
        data =  data.filter(
          (contact) => {
            return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
          }
        );
        return data.map((contact,i) => {
          return (<ContactInfo contact={contact} key={i}/>);
        });
      };

      return(
        <div>
          <h1>Contacts</h1>
          <input
            name = "keword"
            placeholder="Search"
            value = {this.state.keyword}
            onChange = {this.handleChange}
          />
          <div>{mapToComponents(this.state.contactData)}</div>
        </div>
      );
    }
}
