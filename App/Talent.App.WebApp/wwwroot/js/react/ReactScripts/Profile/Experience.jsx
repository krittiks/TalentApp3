/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Button,Input,Table,TableCell,Icon, Tab } from 'semantic-ui-react';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);

    this.state={ 
        showAddExp:false, 
        showEditExp:false,                       
        newExp: {
            id:"",
            company:"",
            position:"",
            responsibilities:"",
            start:moment(),
            end:moment()
        },        
        expDisp:[],
        expEditData:{
            id:"",
            company:"",
            position:"",
            responsibilities:"",
            start:"",
            end:""
        },
    }
         this.addNewExp=this.addNewExp.bind(this)
         this.handleChange = this.handleChange.bind(this)
         this.handleChangeDate=this.handleChangeDate.bind(this)
         this.loadData=this.loadData.bind(this)
         this.addExps=this.addExps.bind(this) 
         this.closeAddExp=this.closeAddExp.bind(this)
         this.expDel=this.expDel.bind(this)
         this.expEdit=this.expEdit.bind(this)
         this.handleEdit=this.handleEdit.bind(this)
         this.closeEditExp=this.closeEditExp.bind(this) 
         this.openEdit=this.openEdit.bind(this)  
    }

    render(){
        return(
            this.state.showAddExp ? this.renderAdd() :  
                                    this.state.showEditExp ? this.renderEdit() :this.renderDisp()                       
        )
    }

    closeAddExp(){
        this.setState({showAddExp:false})
    }
    
    renderDisp() {
        return(            
            <div className='ui sixteen wide column' style={{display:'grid' }}>
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell style={{width:80}}>Company</Table.HeaderCell>
                        <Table.HeaderCell style={{width:90}}>Position</Table.HeaderCell>
                        <Table.HeaderCell style={{width:100, }}>Responsibilities</Table.HeaderCell>
                        <Table.HeaderCell style={{width:100}}>Start</Table.HeaderCell>
                        <Table.HeaderCell style={{width:100}}>End</Table.HeaderCell>
                        <Table.HeaderCell style={{width:60}}>
                            <Button type="button" color='teal' onClick={this.addNewExp}
                            >+Add New</Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>               
                <Table.Body>
                    {
                        this.state.expDisp.map(ex=>(
                    <tr key={ex.id}>
                        <td style={{width:80,whiteSpace:'normal'}}>{ex.company}</td>
                        <td style={{width:90,whiteSpace:'normal' }}>{ex.position}</td>
                        <td style={{width:100,whiteSpace:'normal'}}>{ex.responsibilities}</td>
                        <td style={{width:100}}>{moment(ex.start).format('Do MMM,YYYY')}</td>
                        <td style={{width:100}}>{moment(ex.end).format('Do MMM,YYYY')}</td>
                        <td style={{width:60}}> 
                        <Icon name='pencil alternate' onClick={(event)=>{this.openEdit()
                                                                        this.handleEdit(event,ex)
                                                                        }}
                        />                       
                        <Icon name='close' onClick={()=>this.expDel(ex.id)}
                        />
                        </td>
                    </tr>             
                        ))
                    }
                </Table.Body>
            </Table>
            </div>
        )        
    }

    componentDidMount() {
        this.loadData()
    }
    
    renderAdd(){
        return(
        <div  className='ui sixteen wide column' >
            <div style={{display:'flex',marginBottom:10}}>
                <div style={{width:400,marginRight:10}}>
                <ChildSingleInput 
                    inputType="text"
                    label="Company"
                    name="company"
                    value={this.state.newExp.company}
                    controlFunc={this.handleChange}
                    maxLength={50}
                    placeholder="Company name"
                    errorMessage="Please enter a valid company name"
                />
                </div>
                <div style={{width:400}}>
                <ChildSingleInput
                    inputType="text"
                    label="Position"
                    name="position"
                    value={this.state.newExp.position}
                    controlFunc={this.handleChange}
                    maxLength={50}
                    placeholder="Position"
                    errorMessage="Please enter a valid position"
                /></div>
                </div>
                <div>
                <ChildSingleInput
                    inputType="text"
                    label="Responsibilities"
                    name="responsibilities"
                    value={this.state.newExp.responsibilities}
                    controlFunc={this.handleChange}
                    maxLength={100}
                    placeholder="Responsibilities"
                    errorMessage="Please enter valid responsibilities"
                />
                </div>
                <div style={{display:'flex',marginBottom:10,marginTop:10}}>
                    <div style={{marginRight:10}}>
                    <b>Start Date : </b> <br/>
                    <DatePicker 
                        placeholderText="Start date"
                        selected={this.state.newExp.start}
                        onChange={(date) => this.handleChangeDate(date, "start")}  
                        maxDate={moment()}            
                    /></div>
                   <div>
                    <b>End Date : </b><br/>
                    <DatePicker 
                        placeholderText="End date"
                        selected={this.state.newExp.end}
                        onChange={(date) => this.handleChangeDate(date, "end")}  
                    /> </div>                    
                </div>
                <div style={{ marginBottom:10}} >  
                <button type="button" className="ui teal button" onClick={this.addExps}>Add</button>
                <button type="button" className="ui button" onClick={this.closeAddExp} >Cancel </button>
                </div>
                {this.renderDisp()}
        </div>          
        ) 
    }

    handleChange(event){       
        let data = Object.assign({}, this.state.newExp)
        data[event.target.name] = event.target.value
        this.setState({newExp:data})
         
    } 

    handleChangeDate(date, name) {    
            var data = Object.assign({}, this.state.newExp)
            data[name] = date
            this.setState({newExp:data})            
    }

    addNewExp(){   
        let expr = Object.assign({}, this.props.experienceData)    
        this.setState({showAddExp:true, 
                    newExp:expr})
    }

    addExps(){  
        this.setState({  showAddExp : false  })
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            //url: 'http://localhost:60290/profile/profile/addExp',
            url: 'https://talentserviceprofile3.azurewebsites.net/profile/profile/addExp',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.newExp),
            success: function (res) {
               if (res.success == true) {
                    TalentUtil.notification.show("Experience added sucessfully", "success", null, null)
                   const newlist=this.state.expDisp.push(res.data)
                   this.loadData()
                } else {
                    TalentUtil.notification.show("Experience did not added successfully", "error", null, null)
                }
            }.bind(this)
        })
    }   

    expDel(id){
        let exdel={id:id}       
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
           // url: 'http://localhost:60290/profile/profile/deleteExp',
            url: 'https://talentserviceprofile3.azurewebsites.net/profile/profile/deleteExp',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(exdel),
            success: function (res) {
               if (res.success == true) {
                    TalentUtil.notification.show("Experience deleted sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Experience did not deleted successfully", "error", null, null)
                }
            }
        })
        const list=this.state.expDisp.filter(ex=>ex.id!==id)
        this.setState({expDisp:list})
    }

    closeEditExp(){
        this.setState({showEditExp:false})
    }

    expEdit(){         
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            //url: 'http://localhost:60290/profile/profile/updateExp',
            url: 'https://talentserviceprofile3.azurewebsites.net/profile/profile/updateExp',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.expEditData),
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show("Experience updated sucessfully", "success", null, null)
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Experience did not updated successfully", "error", null, null)
                }
            }.bind(this)
        })                
        this.closeEditExp()
    }
    
    openEdit(){
        this.setState({showEditExp:true})
    }

    handleEdit(event,ex){
        event.preventDefault()        
        let data=Object.assign({},this.state.expEditData)
        data["id"]=ex.id
        data["company"]=ex.company
        data["position"]=ex.position
        data["responsibilities"]=ex.responsibilities
        data["start"]=ex.start
        data["end"]=ex.end
        this.setState({expEditData:data})
    }

    renderEdit(){     
        const handleEditInput=(e)=>{   
        e.preventDefault()     
        const xname=e.target.getAttribute("name")
        const xvalue=e.target.value
        const newData=  Object.assign({},this.state.expEditData)
        newData[xname] = xvalue
        newData["id"]=this.state.expEditData.id

        this.setState({expEditData:newData})
       }        
        return(  
            <div  className='ui sixteen wide column' >
            <div style={{display:'flex',marginBottom:10}}>
                <div style={{width:400,marginRight:10}}>
                <ChildSingleInput 
                    inputType="text"
                    label="Company"
                    name="company"
                    value={this.state.expEditData.company}
                    controlFunc={handleEditInput}
                    maxLength={50}
                    errorMessage="Please enter a valid company name"
                />
                </div>
                <div style={{width:400}}>
                <ChildSingleInput
                    inputType="text"
                    label="Position"
                    name="position"
                    value={this.state.expEditData.position}
                    controlFunc={handleEditInput}
                    maxLength={50}
                    errorMessage="Please enter a valid position"
                /></div>
                </div>
                <div>
                <ChildSingleInput
                    inputType="text"
                    label="Responsibilities"
                    name="responsibilities"
                    value={this.state.expEditData.responsibilities}
                    controlFunc={handleEditInput}
                    maxLength={100}
                    errorMessage="Please enter valid responsibilities"
                />
                </div>
                <div style={{display:'flex',marginBottom:10,marginTop:10}}>
                    <div style={{marginRight:10}}>
                    <b>Start Date : </b> <br/>
                    <DatePicker 
                        selected={moment(this.state.expEditData.start)}
                        onChange={(date) => this.handleEditDate(date, "start")}  
                        maxDate={moment()}            
                    /></div>
                   <div>
                    <b>End Date : </b><br/>
                    <DatePicker 
                       selected={moment(this.state.expEditData.end)}
                        onChange={(date) => this.handleEditDate(date, "end")}  
                    /> </div>                    
                </div>
                <div style={{ marginBottom:10}} >  
                <button type="button" className="ui teal button" onClick={this.expEdit}>Update</button>
                <button type="button" className="ui button" onClick={this.closeEditExp} >Cancel </button>
                </div>
                {this.renderDisp()}
        </div>                    
        )
    }

    handleEditDate(date, name) {    
        var data = Object.assign({}, this.state.expEditData)
        data[name] = date
        this.setState({expEditData:data})            
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            //url: 'http://localhost:60290/profile/profile/getExp',
            url: 'https://talentserviceprofile3.azurewebsites.net/profile/profile/getExp',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res){
              this.setState({expDisp:res.data})
            }.bind(this)       
        })
    }
}
