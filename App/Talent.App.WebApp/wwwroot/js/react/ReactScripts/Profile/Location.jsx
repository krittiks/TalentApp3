import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Dropdown, FormDropdown, Select , Input} from 'semantic-ui-react';

export class Address extends React.Component {
    constructor(props) {
        super(props)
        const add = this.props.addressData ? this.props.addressData :{
            number:"",
            street:"",
            suburb:"",
            postCode:0,
            city:"",
            country:""            
        }
        
    this.state = {
        showEditSection: false,
        newAdd: add
       
    }

    this.openEdit = this.openEdit.bind(this)
    this.closeEdit = this.closeEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveContact = this.saveContact.bind(this)
    this.renderEdit = this.renderEdit.bind(this)
    this.renderDisplay = this.renderDisplay.bind(this)
    }

    openEdit() {
        const add = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newAdd: add
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        let data = Object.assign({}, this.state.newAdd)
        data[event.target.name] = event.target.value
        this.setState({
            newAdd:  data
        })
    }

    saveContact() {
        let ads = Object.assign({}, this.state.newAdd)
        this.props.saveProfileData({address:ads})
        this.closeEdit()
    }
   
    render() {
        return(
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()           
        )       
    }

    renderEdit() {
        //country options
        let contOptions= Object.keys(Countries).map((e)=> 
        <option key={e} value={e}>{e} </option>)
           
        //city options
        let selectedcoun= this.state.newAdd.country
        if(selectedcoun !="" && selectedcoun!=null){
            var selectedcity= (Countries[selectedcoun]).map((e)=> 
            <option key={e} value={e}>{e} </option>)
        }  
        return (
        <div className='ui sixteen wide column'>
            <div style={{display:'flex',marginBottom:20}}>
                <div style=  {{marginRight: 20,display:'grid' }}> Number
                <Input 
                 name='number' 
                 placeholder="Number"
                 value={this.state.newAdd.number}
                 onChange={this.handleChange}
                /> </div>

                <div style={{ marginRight: 20, display:'grid', width:400 }} >  Street
                <Input 
                 name='street' 
                 placeholder="Street"
                 value={this.state.newAdd.street}
                 onChange={this.handleChange}
                /> </div>

                <div style= {{ display:'grid',width:185 }}> Suburb
                <Input 
                 name='suburb' 
                 placeholder="Suburb"
                 value={this.state.newAdd.suburb}
                 onChange={this.handleChange}
                /> </div>
            </div>

            <div style={{display:'flex', marginBottom:20}}>
                <div style= {{ marginRight: 20,
                   display: 'grid',
                   width:270           
                }}> Country
                <select
                name='country'
                value={this.state.newAdd.country ||""}
                onChange={this.handleChange}
                >
                <option value="">Country</option> 
                 {contOptions} 
                    </select>
                </div>
            <div style=  {{
                    marginRight: 20,
                    width:320,
                    display: 'grid'             
                }}> City
                <select
                name='city'
                value={this.state.newAdd.city ||""}
                onChange={this.handleChange}
                >
                <option value="">City</option> 
                 {selectedcity} 
                </select>
            </div>
                <div style=  {{
                   width:185,
                   display: 'grid',
                }}> Postcode
                <Input 
                 name='postCode' 
                 placeholder="Postcode"
                 value={this.state.newAdd.postCode}
                 onChange={this.handleChange}
                 /></div>
            </div>

            <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
            <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>

            
        </div>
        )
    }
    renderDisplay() {
    let address = this.props.addressData.number +" "+ this.props.addressData.street + " "+this.props.addressData.suburb +" "+
                    this.props.addressData.postCode
     
        return (   
        <div className='row'>
          <div className="ui sixteen wide column">
            <React.Fragment>
            <p>Address: {address}</p>
            <p>City: {this.props.addressData.city}</p>
            <p>Country: {this.props.addressData.country}</p>
            </React.Fragment>
            <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
         </div>
        </div>
        )
    }

}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)

       const newNtly = this.props.nationalityData ? this.props.nationalityData : ""
        this.state={
            newNtly1: newNtly,
            showEdit:false
        }
       
        this.handleNlty=this.handleNlty.bind(this)
        this.closeEdit=this.closeEdit.bind(this)
       this.saveNtn=this.saveNtn.bind(this)
       this.openEdit=this.openEdit.bind(this)
    }

    handleNlty(event){
        this.setState({newNtly1:event.target.value})
    }

    openEdit(){
        const nation=this.props.nationalityData ? this.props.nationalityData :""
        this.setState({
            newNtly1:nation,
            showEdit:true                
        })
    }

    closeEdit(){
        this.setState({showEdit:false})
    }

    saveNtn(){       
        this.props.saveProfileData({nationality:this.state.newNtly1})
        this.closeEdit()
    }

    render() {
        return (
           this.state.showEdit ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        
        let contOption= Object.keys(Countries).map((e)=> 
        <option key={e} value={e}>{e} </option>)    

        return(
            <div className='ui sixteen wide column'>
             <div className='field' style={{display:'flex'}}>
                <div style={{display:'inline-flex'}}>
                <select
                name='country'
                value={this.state.newNtly1||this.props.nationalityData}
                onChange={this.handleNlty}
                >
                <option value="">Select Nationality</option> 
                 {contOption} 
                </select>                
                </div>
                
                <button type="button" className="ui right floated teal button" onClick={this.saveNtn}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
              
                </div>
            </div>
        )
        
    }

    renderDisplay(){
      let contOption= Object.keys(Countries).map((e)=> 
      <option key={e} value={e}>{e} </option>)   
        return(
            <div className='ui sixteen wide column'>
            <div style={{display:'inline-flex'}}>
               <select 
               name='country' readOnly
               value={this.props.nationalityData||""}
               >
               <option value="">Select Nationality</option> 
                {contOption} 
               </select>                
               </div>
               <button type="button" className="ui right floated teal button" 
               onClick={this.openEdit}>Edit</button>
            </div>  
        )
    }
}