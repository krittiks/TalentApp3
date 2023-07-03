import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);

    const  status1=this.props.jobSeekStatus ? this.props.jobSeekStatus :
        {
            status : "",
            availableData  : ""
        }
    this.state={
        jobStat:status1,
        showEdit:false,       
        }  
       
     this.handleChange=this.handleChange.bind(this)
     this.openEdit=this.openEdit.bind(this)
     this.closeEdit=this.closeEdit.bind(this)
    this.saveStatus=this.saveStatus.bind(this)
    this.handleChange1=this.handleChange1.bind(this)
    }

    handleChange(e){
        let data = Object.assign({},this.state.jobStat)
        data[e.target.name]=e.target.value
        this.setState({jobStat:data})
    }

    handleChange1(e){    
        let data = Object.assign({},this.props.jobSeekStatus)
        data[e.target.name]=e.target.value
        this.setState({jobStat:data})
    }
    
    render(){
        return(
        this.state.showEdit ? this.renderEdit() : this.renderDisp()
        )
    }

    renderEdit(){
        return(
            <div className='ui sixteen wide column' style={{display : 'flex'}}>
                <div style={{display : 'block', width : 750}}>   
                <b>Current Status</b> <br/>
                    <input id='radio1' name='status'
                    type='radio' 
                    value='Actively looking for a job' 
                    checked={this.state.jobStat.status=='Actively looking for a job'?true:false}
                    onChange={this.handleChange}
                    /> 
                    <label htmlFor='radio1'>Actively looking for a job</label><br/>

                    <input id='radio2' name='status'
                    type='radio' 
                    value='Not looking for a job at the moment' 
                    checked={this.state.jobStat.status=='Not looking for a job at the moment'?true:false}
                    onChange={this.handleChange}
                    /> 
                    <label htmlFor='radio2'>Not looking for a job at the moment</label><br/>

                    <input id='radio3'  name='status'
                    type='radio' 
                    value='Currently employed but open to offers' 
                    checked={this.state.jobStat.status=='Currently employed but open to offers'?true:false}
                    onChange={this.handleChange}
                    />
                    <label htmlFor='radio3'>Currently employed but open to offers</label><br/>

                    <input id='radio4'  name='status'
                    type='radio' 
                    value='Will be available on later date' 
                    checked={this.state.jobStat.status=='Will be available on later date'?true:false}
                    onChange={this.handleChange}
                    />
                    <label htmlFor='radio4'>Will be available on later date</label><br/>
                    
                </div>
                <div  style={{display:'flex' , margin:'auto'}}>
                <button type="button" className="ui right floated teal button"  onClick={this.saveStatus}
                >Save</button>   </div>
                <div  style={{display:'flex' , margin:'auto'}}>
                <button type="button"  className="ui button"  onClick={this.closeEdit}
                >Cancel</button>   </div>
            </div>
        )        
    }

    saveStatus(){
        this.props.saveProfileData({jobSeekingStatus:this.state.jobStat})
        this.setState({showEdit:false})
    }

    openEdit(){
        let data = Object.assign({},this.props.jobSeekStatus)
        this.setState({showEdit:true, 
                        jobStat:data})
    }

    closeEdit(){
        this.setState({showEdit:false})
    }

    renderDisp() {
        return(
            <div className='ui sixteen wide column' style={{display : 'flex'}}>
              <div style={{display : 'block', width : 750}}>   
                <b>Current Status</b> <br/>
                   <input id='radio1' name='status'
                    type='radio' readOnly
                    value='Actively looking for a job' 
                    checked={ this.props.jobSeekStatus!=null?
                        this.props.jobSeekStatus.status=='Actively looking for a job': null}
                    onChange={this.handleChange1}
                    /> 
                    <label htmlFor='radio1'>Actively looking for a job</label><br/>
                     <input id='radio2' name='status'
                    type='radio' readOnly
                    value='Not looking for a job at the moment' 
                    checked={ this.props.jobSeekStatus!=null? 
                        this.props.jobSeekStatus.status=='Not looking for a job at the moment' : null}
                    onChange={this.handleChange1}
                    /> 
                    <label htmlFor='radio2'>Not looking for a job at the moment</label><br/>

                    <input id='radio3'  name='status'
                    type='radio' readOnly
                    value='Currently employed but open to offers' 
                    checked={ this.props.jobSeekStatus!=null?
                        this.props.jobSeekStatus.status=='Currently employed but open to offers': null}
                    onChange={this.handleChange1}
                    />
                    <label htmlFor='radio3'>Currently employed but open to offers</label><br/>

                    <input id='radio4'  name='status'
                    type='radio'  readOnly
                    value='Will be available on later date' 
                    checked={this.props.jobSeekStatus!=null?
                        this.props.jobSeekStatus.status=='Will be available on later date' : null}
                    onChange={this.handleChange1}
                    />
                    <label htmlFor='radio4'>Will be available on later date</label><br/>
                    
                </div>
                <div  style={{display:'flex' , margin:'auto'}}>
                <button type="button" className="ui right floated teal button"  onClick={this.openEdit}
                >Edit</button>
              </div>                 
            </div>
        )
    }
}