import React from 'react';
import ContactInfo from './Contactinfo';

export default class Contact extends React.Component{

  constructor(props){
    super(props);
    this.state = {
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
    }

    render(){
      const mapToComponents = (data) => {
        return data.map((contact,i) => {
          return (<ContactInfo contact={contact} key={i}/>);
        });
      };

      return(
        <div>
          <h1>Contacts</h1>
          <div>{mapToComponents(this.state.contactData)}</div>
        </div>
      );
    }
}
