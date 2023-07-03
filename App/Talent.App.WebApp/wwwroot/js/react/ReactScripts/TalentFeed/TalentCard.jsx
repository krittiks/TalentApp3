import React from 'react';
import PropTypes from 'prop-types'
import { Popup, Icon,Card , Button, CardGroup} from 'semantic-ui-react'
import TalentDetail from './TalentDetail.jsx'
import ReactPlayer from 'react-player';

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
    
       this.state={
        userOpen:false,
        newUser:[{}]
       }

       this.cardOpen=this.cardOpen.bind(this)
       this.videoOpen=this.videoOpen.bind(this)
       this.showVideo=this.showVideo.bind(this)
       this.getMultipleRandom=this.getMultipleRandom.bind(this);
    };    

    cardOpen(){
        this.setState({
            userOpen:true
        })
    }

    videoOpen(){
            this.setState({
                userOpen : false
            })
    }

    showVideo(){
       return(
       <video controls style={{width : "-webkit-fill-available"}}>
       <source src='mov_bbb.mp4' type='video/mp4'/>    
       </video>     
    )
    }
    
    getMultipleRandom(arr, num) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());      
        return shuffled.slice(0, num);
    }

    render() {
       return(
        <div>            
        <Card.Group>
            {this.getMultipleRandom(this.props.talentData, 5).map(card=>( 
        <Card key={card.id} style={{display:'inline-table' }}>        
        <Card.Content>
        <Card.Header >
           <div style={{display:'flex', height:40
                           }}>
            <div> 
        {card.name}
        </div>
            <div style={{ marginLeft : 'auto'}}><Icon name ='favorite' size='big'/></div>
        </div>
        </Card.Header>
        <Card.Description>

        <div style={{ border :'groove',
                         display:'flex',width : 520, height : 350       
                    }}>
        
        {this.state.userOpen? 
        <TalentDetail pid={card.photoId} curEmp={card.currentEmployment} visa={card.visa} pos={card.level}/> 
        : this.showVideo()}
        </div>   
         
        <div style={{display:'flex', 
                    marginTop :10
                                }}>
        {this.state.userOpen ? <div style={{width:130, textAlign : 'center'}}><Icon name='video' size='big' 
            onClick={()=>this.videoOpen()}/> </div>
            : <div style={{width:130, textAlign : 'center'}}><Icon name='user' size='big' 
            onClick={()=>this.cardOpen()}/>  </div>
        }                            
            
            <div style={{width:130,textAlign : 'center'}}><Icon name='file pdf outline' size='big'/> </div>                           
            <div style={{width:130,textAlign : 'center'}}><Icon name='linkedin' size='big'/></div>
            <div style={{width:130,textAlign : 'center'}}><Icon name='github' size='big'/></div>
       </div>      
        </Card.Description>

      </Card.Content>
      <Card.Content extra>

      {card.skills.map(s=>{return (<Button basic color='blue'> {s} </Button>)})}
      
      </Card.Content>
    </Card>
    ))}
    </Card.Group>
        </div>
     )        
    }
}

