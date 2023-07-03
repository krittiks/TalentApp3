/* Self introduction section */
import React, { Component } from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import Cookies from 'js-cookie'
import { Table } from 'semantic-ui-react';

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);
        
        const sum=this.props.summary?this.props.summary:""
        const desc=this.props.description?this.props.description:""
        
        this.state={
            bio:{
                summary:sum,
                description:desc
            },
            showEditBio:false
        }

    this.handleChange=this.handleChange.bind(this)
    this.handleSave=this.handleSave.bind(this)
    this.openEdit=this.openEdit.bind(this)
    this.closeEdit=this.closeEdit.bind(this)
    };

    handleChange(event){
        const data1 = Object.assign({}, this.state.bio)
        data1[event.target.name] = event.target.value
        this.setState({bio:data1})
    }
    
handleSave(){
    const data = Object.assign({}, this.state.bio)
    this.props.updateProfileData(data)
    this.closeEdit()
}

openEdit(){    
    this.setState({showEditBio:true, 
    bio:{
        summary: this.props.summary,
        description:this.props.description
    }})
}

    closeEdit(){
       this.setState({showEditBio:false})
    }
        
    render() {
        return(
                this.state.showEditBio ? this.renderEdit() : this.renderDisp() 
            )
       }

   renderDisp(){   
        return(
            <div className='ui sixteen wide column'>
                <textarea 
                name='summary'
                placeholder='Please provide a short summary about yourself'
                value={this.props.summary }
                onChange={this.handleChange}
                rows={2}
                maxLength={150}
                />   
                <div style=  {{
                    'marginTop': 10,
                    'marginBottom': 10 }}>
                <label>summary must not be more than 150 characters</label>
                </div>       

                <textarea 
                name="description"
                placeholder='Please tell us about any hobbies, expertise or anything else you would like to add'
                value={this.props.description }
                onChange={this.handleChange}
                rows={7}
                maxLength={600}
                />
                 <div style=  {{
                    'marginTop': 10,
                    }}>
                <label>Description must be between 150-600 characters</label>
                </div>
                <div style=  {{ 'marginLeft': 740 }}>
                    <button type="button" className="ui teal button" 
                    onClick={this.openEdit }>Edit</button>
                
                </div>
            </div>
        )
    }

    renderEdit(){
        return(            
            <div className='ui sixteen wide column'>
            <textarea 
            name='summary'
            placeholder='Please provide a short summary about yourself'
            value={this.state.bio.summary }
            onChange={this.handleChange}
            rows={2}
            maxLength={150}
            />   
            <div style=  {{
                'marginTop': 10,
                'marginBottom': 10 }}>
            <label>summary must not be more than 150 characters</label>
            </div>       

            <textarea 
            name="description"
            placeholder='Please tell us about any hobbies, expertise or anything else you would like to add'
            value={this.state.bio.description }
            onChange={this.handleChange}
            rows={7}
            maxLength={600}
            />
             <div style=  {{
                'marginTop': 10,
                }}>
            <label>Description must be between 150-600 characters</label>
            </div>
            <div style=  {{ 'marginLeft': 645 }}>
                
             <button type="button" className="ui teal button"                   
                 onClick={this.handleSave} 
            >Save</button>
            <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        </div>      
        )
    }
}


