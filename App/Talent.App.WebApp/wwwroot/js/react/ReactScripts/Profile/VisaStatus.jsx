import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { Input,Dropdown } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        
        const vstat=this.props.visaStatus ? this.props.visaStatus : ''
      
        this.state={
            visaStatus:vstat,
            visaExp:moment(),               
            showEdit : false,
        }
        this.openEdit=this.openEdit.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleSave=this.handleSave.bind(this)
        this.closeEdit=this.closeEdit.bind(this)
    }  

    componentDidUpdate(prevProps){    
        if(prevProps.visaExpiryDate==''){
            this.setState({visaExp:this.props.visaExpiryDate}) 
        }
   }

    render(){
        return(
        this.state.showEdit ? this.renderEdit() : this.renderDisp()
        )
    }

    
    renderEdit(){
        const vOpt=['Citizen','Permanent Resident','Work Visa','Student Visa']
        let visaOptions=[]
        visaOptions=vOpt.map(x=> <option key={x} value={x}>{x}</option>)
        return(
              <div className="ui sixteen wide column" style={{display : 'flex'}}>   
              <div style={{width:250, display:'inline-grid'}}>
                Visa Type
                <select
                name='visaStatus'
                value={this.state.visaStatus ||""}
                onChange={this.handleChange}
                >
                <option value="">Visa Status</option> 
                 {visaOptions} 
                </select>
                </div>

                {(this.state.visaStatus=='Work Visa')||(this.state.visaStatus=='Student Visa') ? 
                this.showExp() : this.hideExp() }
               
                <div style={{marginTop:'auto', 
                display:'inline-flex'}}>
                <button type="button" className="ui right floated teal button" onClick={this.handleSave}
                >Save</button>

                <button type="button" className="ui right floated teal button" onClick={this.closeEdit}
                >Cancel</button>
                 </div>
            </div>
        )
    }

    showExp(){
        return(
            <div style={{display:'inline-grid', marginLeft : 20,marginRight:20}}>
                Visa Expiry Date
               <DatePicker 
                    placeholderText="Visa Expiry date"
                    selected={moment(this.state.visaExp)||''}
                    onChange={(date) => this.setState({visaExp:date})}  
                    dateFormat='DD/MM/YYYY'           
                    />
            </div>
        )
    }

    hideExp(){
        return(
            <div style={{width:150, display:'inline-flex',marginLeft : 50,marginRight:200}}>
            </div>
        )
    }

    handleSave(){
        let visa ={visaStatus:this.state.visaStatus,visaExpiryDate:this.state.visaExp}
        this.props.saveProfileData(visa)
        this.closeEdit()
    }

    closeEdit(){
        this.setState({showEdit:false})
    }

    handleChange(event){ 
        this.setState({visaStatus:event.target.value})
    } 

    openEdit(){
        let dt=this.props.visaStatus ? this.props.visaStatus :'' 
        this.setState({showEdit:true, 
                        visaStatus:dt})
    }

    showExp1(){
        return(
            <div style={{display:'inline-grid', marginLeft : 20,marginRight:20}}>
                Visa Expiry Date
               <DatePicker 
                    placeholderText="Visa Expiry date"
                    selected={moment(this.props.visaExpiryDate)}
                    dateFormat='DD/MM/YYYY'           
                    />
            </div>
        )
    }

    hideExp1(){
        return(
            <div style={{width:200, display:'inline-flex',marginLeft : 50,marginRight:200}}>
            </div>
        )
    }

    renderDisp() {
        const vOpt=['Citizen','Permanent Resident','Work Visa','Student Visa']
        let visaOptions=[]
        visaOptions=vOpt.map(x=> <option key={x} value={x}>{x}</option>)
        return(            
            <div className="ui sixteen wide column" style={{display : 'flex'}}>   
                <div style={{width:200, display:'inline-grid'}}>
                Visa Type
                <select
                name='visaStatus' readOnly
                value={this.props.visaStatus || ''} 
                >
                <option value=''>Visa Status</option>  
                {visaOptions} 
                </select>                
                </div>

                {(this.props.visaStatus=='Work Visa')||(this.props.visaStatus=='Student Visa') ? 
                this.showExp1() : this.hideExp1() }

                <div style={{marginTop:'auto', marginLeft:'auto', display:'inline-flex'}}>
                <button type="button" className="ui right floated teal button" onClick={this.openEdit}
               >Edit</button></div>
               </div>
        )
    }
}