import React from 'react';
import Cookies from 'js-cookie';
import { Loader, Card , Icon, Image} from 'semantic-ui-react';


export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {  
        let location = { city: '', country: '' }
        if (this.props.com && this.props.com.location) {
            location = this.props.com.location
        }
     
        return(    
        <div> 
            
       <Card>
       <Card.Content>
        
         <img className="ui circular image" src="https://react.semantic-ui.com/images/wireframe/square-image.png" 
         style={{ textAlign: 'center',
            display: 'block', 
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto', width:70, height:70}}/>
            
        <Card.Header style={{display:'table', margin:'auto'}}>{this.props.com.name}</Card.Header>
        <Card.Meta style={{display:'table',margin:'auto' }}><Icon name='pin'/> {location.city},{location.country}</Card.Meta>
        
        <Card.Description style={{display:'table', textAlign :'center',
                                }}>
            
          We currenlty donot have specific skills that we desire 
        </Card.Description>

      </Card.Content>
      <Card.Content extra>
        <Icon name='phone'/> : {this.props.com.phone} <br/>
        <Icon name='mail'/> : {this.props.com.email}
      </Card.Content>
    </Card>
     </div>  
    )}
}