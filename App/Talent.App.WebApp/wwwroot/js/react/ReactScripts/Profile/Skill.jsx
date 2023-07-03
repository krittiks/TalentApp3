/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { Button,Input,Table,TableCell,Icon, Tab } from 'semantic-ui-react';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);

        this.state={ 
        showAddSkill:false,
                     
            skillData:{
                name:'',
                level:''
            },
            skillEditData:{
                name:'',
                level:'',
                id:''
            },
           skillDisp:[],
           updateState: 'null'
        }
        this.addNewSkill=this.addNewSkill.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loadData=this.loadData.bind(this)
        this.addSkills=this.addSkills.bind(this)        
        this.closeSkill=this.closeSkill.bind(this)
        this.skillDel=this.skillDel.bind(this)
        this.skillEdit=this.skillEdit.bind(this)
        this.handleEdit=this.handleEdit.bind(this)
        this.closeEditSkill=this.closeEditSkill.bind(this)       
      
    };

    componentDidMount() {
        this.loadData()
    }

    addNewSkill(){
        this.setState({
            showAddSkill: true,
        })
    }

    addSkills(){
        this.setState({
        showAddSkill : false
        })

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            //url: 'http://localhost:60290/profile/profile/addSkill',
            url: 'https://talentserviceprofile3.azurewebsites.net/profile/profile/addSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.skillData),
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show("Skill updated sucessfully", "success", null, null)
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Skill did not update successfully", "error", null, null)
                }
            }.bind(this)
        })
    }

    handleChange(event){       
        const data = Object.assign({}, this.state.skillData)
        data[event.target.name] = event.target.value
        this.setState({skillData:data})
    }  

    closeSkill(){
        this.setState({
            showAddSkill : false
        })
    }

    renderAdd(){
        const skOpt=['Beginner','Intermediate','Expert']
        let skoptions=[]
        skoptions=skOpt.map(x=> <option key={x} value={x}>{x}</option>)
    
            return(
                <div className='ui sixteen wide column' style={{display:'flex',marginBottom:14}}>
                    <div style=  {{
                        marginRight: 10,
                       display: 'inline-block',
                       flexDirection:'row'                
                    }}>
                   
                    <Input 
                    placeholder='Add Skill'         
                    name='name' 
                    value={this.state.skillData.name }
                    onChange={this.handleChange}               
                   />
                    </div>
                   <div style={{ display: 'inline-block', marginRight:10}}>
                    
                    <select
                    name='level'
                    placeholder='Skill Level'                
                    value={this.state.skillData.level}
                    onChange={this.handleChange}
                    >
                    <option value="">Skill level</option> 
                     {skoptions} 
                        </select>
                                       
                    </div>
                <button type="button" className="ui teal button" onClick={this.addSkills}>Add</button>
                <button type="button" className="ui button" onClick={this.closeSkill}>Cancel</button>
                </div>
            )
        }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            //url: 'http://localhost:60290/profile/profile/getSkill',
            url: 'https://talentserviceprofile3.azurewebsites.net/profile/profile/getSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res){
                this.setState({skillDisp:res.data})
            }.bind(this)       
        })
    }

    skillDel(id){
        let sdel={id:id}       
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            //url: 'http://localhost:60290/profile/profile/deleteSkill',
            url: 'https://talentserviceprofile3.azurewebsites.net/profile/profile/deleteSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(sdel),
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show("Skill deleted sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Skill did not deleted successfully", "error", null, null)
                }
            }
        })
        const list=this.state.skillDisp.filter(sk=>sk.id!==id)
        this.setState({skillDisp:list})
    }

    skillEdit(){         
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            //url: 'http://localhost:60290/profile/profile/updateSkill',
            url: 'https://talentserviceprofile3.azurewebsites.net/profile/profile/updateSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.skillEditData),
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show("Skill updated sucessfully", "success", null, null)
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Skill did not updated successfully", "error", null, null)
                }
            }.bind(this)
        })                
        this.closeEditSkill()
    }
    
    handleEdit(event,s){
        event.preventDefault()
        this.setState({updateState:s.id})
        const data=Object.assign({},this.state.skillEditData)
        data["id"]=s.id
        data["name"]=s.skill
        data["level"]=s.experienceLevel
        this.setState({skillEditData:data})
    }

    renderEdit(current,lists){
        
    const skOpt=['Beginner','Intermediate','Expert']
    let skoptions=[]
    skoptions=skOpt.map(x=> <option key={x} value={x}>{x}</option>)
        
    const handleEditInput=(e)=>{   
        e.preventDefault()     
        const sname=e.target.getAttribute("name")
        const svalue=e.target.value
        const newData=  Object.assign({},this.state.skillEditData)
        newData[sname] = svalue
        newData["id"]=current.id

        this.setState({skillEditData:newData})   
        }
        
        return(            
            <tr>
            <td>
                <Input 
                  name='name' 
                 value={this.state.skillEditData.name}
                 onChange={handleEditInput}
                 />
               
            </td> 
            <td>
                <select
                name='level'
                value={this.state.skillEditData.level}
                onChange={handleEditInput}
                >
                <option value="">Skill level</option> 
                 {skoptions} 
                    </select>
            </td>           
                
            <td>
            <button type="button" className="ui teal button" onClick={this.skillEdit}
                
            >Save</button>
            <button type="button" className="ui button" onClick={this.closeEditSkill}
            >Cancel</button>
             </td>
            </tr>           
            
        )
    }

    closeEditSkill(){
        this.setState({updateState:'null'})
    }

   render() {
    return(
        <div className='ui sixteen wide column' style={{display:'grid' }}>
            {this.state.showAddSkill ? this.renderAdd() : this.renderDisp() }        
            <Table striped style={{marginTop:0}}>
                <Table.Body>
                    {
                        this.state.skillDisp.map(sk=>(
                        this.state.updateState==sk.id ? this.renderEdit(sk,this.state.skillDisp) :                        
                    <tr key={sk.id}>
                        <td style={{width:230}}>{sk.skill}</td>
                        <td style={{width:220}}>{sk.experienceLevel}</td>
                        <td style={{width:260, paddingLeft:250}}> 
                        <Icon name='pencil alternate' onClick={(event)=>this.handleEdit(event,sk)}
                        />                       
                        <Icon name='close' onClick={()=>this.skillDel(sk.id)}
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
    
    renderDisp() {
        return(
        <div className='ui sixteen wide column' style={{display:'grid' }}>                
                <Table striped>
                  <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell  style={{width:225}} >Skill</Table.HeaderCell>
                        <Table.HeaderCell style={{width:220}}>Level</Table.HeaderCell>
                        <Table.HeaderCell  style={{width:260, paddingLeft:180}}>
                            <Button type="button" color='teal' onClick={this.addNewSkill}>
                            +Add New</Button>
                        </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>               
                </Table>              
            </div>
        )
        
    }
}
