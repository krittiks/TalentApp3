/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { Button,Input,Table,TableCell,Icon, Tab } from 'semantic-ui-react';

export default class Language extends React.Component {
    constructor(props) {
        super(props);       
   
        this.state={            
            showAddLang:false,
                     
            langData1:{
                name:'',
                level:''
            },
            langEditData:{
                name:'',
                level:'',
                id:''
            },
           langDisp:[],
           updateState: 'null'
        }
        this.addNewLang=this.addNewLang.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loadData=this.loadData.bind(this)
        this.addLanguages=this.addLanguages.bind(this)        
        this.closeAdd=this.closeAdd.bind(this)
        this.langDel=this.langDel.bind(this)
        this.langEdit=this.langEdit.bind(this)
        this.handleEdit=this.handleEdit.bind(this)
        this.closeEditLang=this.closeEditLang.bind(this)       
    }

    addNewLang(){
        const langData = Object.assign({}, this.props.languageData)
        this.setState({
            showAddLang: true,
            langData1: langData
        })
    }

    render(){
        return (
            <div className='ui sixteen wide column' style={{display:'grid' }}>
            {this.state.showAddLang ? this.renderAdd() : this.renderDisp() }        
            <Table striped style={{marginTop:0}}>
                <Table.Body>
                    {
                        this.state.langDisp.map(l=>(
                        this.state.updateState==l.id ? this.renderEdit(l,this.state.langDisp) 
                        :                        
                        <tr key={l.id}>
                        <td style={{width:230}}>{l.language}</td>
                        <td style={{width:220}}>{l.languageLevel}</td>
                        <td style={{width:260, paddingLeft:250}}> 
                        <Icon name='pencil alternate' onClick={(event)=>this.handleEdit(event,l)}/>                       
                        <Icon name='close' onClick={()=>this.langDel(l.id)}/>
                        </td>
                    </tr>             
                        ))
                    }
                </Table.Body>
            </Table>
            </div>
        )
    }    

    handleChange(event){
       
        const data = Object.assign({}, this.state.langData1)
        data[event.target.name] = event.target.value
        this.setState({langData1:data})
    }  
    
    closeAdd(){
        this.setState({
            showAddLang : false
        })
    }

    addLanguages(){
        this.setState({
        showAddLang : false
        })

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            //url: 'http://localhost:60290/profile/profile/addLanguage',
            url: 'https://talentserviceprofile3.azurewebsites.net/profile/profile/addLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.langData1),
            success: function (res) {
                 if (res.success == true) {
                    TalentUtil.notification.show("Language updated sucessfully", "success", null, null)
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Language did not update successfully", "error", null, null)
                }
            }.bind(this)
        })
    }

    renderAdd(){
    const langOpt=['Basic','Conversational','Fluent','Native/Bilingual']
    let loptions=[]
    loptions=langOpt.map(x=> <option key={x} value={x}>{x}</option>)

        return(
            <div className='ui sixteen wide column' style={{display:'flex',marginBottom:14}}>
                <div style=  {{
                    marginRight: 10,
                   display: 'inline-block',
                   flexDirection:'row'                
                }}>
               
                <Input 
                placeholder='Add Language'         
                name='name' 
                value={this.state.langData1.name }
                onChange={this.handleChange}               
               />
                </div>
               <div style={{ display: 'inline-block', marginRight:10}}>
                
                <select
                name='level'
                placeholder='Language Level'                
                value={this.state.langData1.level}
                onChange={this.handleChange}
                >
                <option value="">Language level</option> 
                 {loptions} 
                    </select>
                                   
                </div>
            <button type="button" className="ui teal button" onClick={this.addLanguages}>Add</button>
            <button type="button" className="ui button" onClick={this.closeAdd} >Cancel</button>
            </div>
        )
    }
   
    componentDidMount() {
        this.loadData()
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            //url: 'http://localhost:60290/profile/profile/getLanguage',
            url: 'https://talentserviceprofile3.azurewebsites.net/profile/profile/getLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res){
              this.setState({langDisp:res.data})
            }.bind(this)                
        })        
    }

    langDel(id){
        let ldel={id:id}       
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
           // url: 'http://localhost:60290/profile/profile/deleteLanguage',
            url: 'https://talentserviceprofile3.azurewebsites.net/profile/profile/deleteLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(ldel),
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show("Language deleted sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Language did not deleted successfully", "error", null, null)
                }
            }
        })
        const list=this.state.langDisp.filter(li=>li.id!==id)
        this.setState({langDisp:list})
    }

    langEdit(newData){  
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            //url: 'http://localhost:60290/profile/profile/updateLanguage',
            url : 'https://talentserviceprofile3.azurewebsites.net/profile/profile/updateLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(newData),
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show("Language updated sucessfully", "success", null, null)
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Language did not updated successfully", "error", null, null)
                }
            }.bind(this)
        })                
        this.closeEditLang()
    }
    
    handleEdit(event,l){
        event.preventDefault()
        this.setState({updateState:l.id})
        const data=Object.assign({},this.state.langEditData)
        data["id"]=l.id
        data["name"]=l.language
        data["level"]=l.languageLevel
        this.setState({langEditData:data})
    }

    renderEdit(current,lists){
        
    const langOpt=['Basic','Conversational','Fluent','Native/Bilingual']
    let loptions=[]
    loptions=langOpt.map(x=> <option key={x} value={x}>{x}</option>)
        
    const handleEditInput=(e)=>{   
        e.preventDefault()     
        const lname=e.target.getAttribute("name")
        const lvalue=e.target.value
        const newData=  Object.assign({},this.state.langEditData)
        newData[lname] = lvalue
        newData["id"]=current.id

        this.setState({langEditData:newData})
    }        
        return(            
            <tr>
            <td>
                <Input 
                  name='name' 
                 value={this.state.langEditData.name}
                 onChange={handleEditInput}
                 />
               
            </td> 
            <td>
                <select
                name='level'
                value={this.state.langEditData.level}
                onChange={handleEditInput}
                >
                <option value="">Language level</option> 
                 {loptions} 
                    </select>
            </td>           
                
            <td>
            <button type="button" className="ui teal button" onClick={()=>this.langEdit(this.state.langEditData)}
                
            >Save</button>
            <button type="button" className="ui button" onClick={this.closeEditLang}
            >Cancel</button>
             </td>
            </tr>           
            
        )
    }

    closeEditLang(){
        this.setState({updateState:'null'})
    }

    renderDisp() {
        return(
        <div className='ui sixteen wide column' style={{display:'grid' }}>                
                <Table striped>
                  <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell  style={{width:225}} >Language</Table.HeaderCell>
                        <Table.HeaderCell style={{width:220}}>Level</Table.HeaderCell>
                        <Table.HeaderCell  style={{width:260, paddingLeft:180}} ><Button type="button" color='teal' onClick={this.addNewLang}>+Add New</Button>
                        </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>               
                </Table>              
            </div>
        )
        
    }
}