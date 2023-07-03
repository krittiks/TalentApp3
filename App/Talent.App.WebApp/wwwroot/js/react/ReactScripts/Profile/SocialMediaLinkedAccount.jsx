/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Icon,Button, Popup,Input } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);

        const  acntDetails=this.props.linkedAccounts ? this.props.linkedAccounts :
        {
            linkedIn : "",
            github  : ""
        }

        this.state = {
            showEditSection: false,
            newAcnts:  acntDetails
        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveAcnt = this.saveAcnt.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.handleBtn=this.handleBtn.bind(this)
    }

    openEdit() {
        const acn=Object.assign({},this.props.linkedAccounts)
       this.setState({
        showEditSection : true,
        newAcnts : acn
       })
    }

    closeEdit() {
        this.setState({showEditSection:false})
    }

    handleChange(event) {
        let data = Object.assign({},this.state.newAcnts)
        data[event.target.name]=event.target.value
        this.setState({
            newAcnts:data
        })
    }

    saveAcnt() {        
        let acnts=Object.assign({},this.state.newAcnts)
        this.props.saveProfileData({linkedAccounts:acnts})
        this.closeEdit()
    }
   
    render() {
        return (
           this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    handleBtn(e){
        e.preventDefault()  
    }

    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
               <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.state.newAcnts.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your linkedIn Url"
                    errorMessage="Please enter a valid linkedIn url"
                />
                <ChildSingleInput
                    inputType="text"
                    label="Github"
                    name="github"
                    value={this.state.newAcnts.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your github Url"
                    errorMessage="Please enter a valid github url"
                />
                <div >
                <button type="button" className="ui teal button" onClick={this.saveAcnt}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                </div>
            </div>
        )
    }

    renderDisplay() {        
        return (
        <div className='row'>
         <div className="ui sixteen wide column">  
            <Button color='blue' onClick={this.handleBtn} style=  {{'marginLeft': 2, width: 150}}>
            <Icon name='linkedin' /> LinkedIn
            </Button>               
            <Button color='black' onClick={this.handleBtn} style=  {{'marginLeft': 10, width: 150}}>
            <Icon name='github' /> GitHub
            </Button> 
            <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
         </div>
        </div>
        )
    }    

}