/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Image , Icon, Button} from 'semantic-ui-react';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);

        const purl=this.props.imageId ? this.props.imageId : '../../../../images/cameraRetro.jpg';
        
        this.state={
           file:purl, 
           file1:''           
        }
        this.myRef=React.createRef();
        this.handleImgChange=this.handleImgChange.bind(this)
        this.handleImgClick=this.handleImgClick.bind(this)
        this.handleUpload=this.handleUpload.bind(this)
        
    };

    handleImgChange(e) {
        this.setState({file:URL.createObjectURL(e.target.files[0])})
        this.setState({file1:e.target.files[0]})
    }

    handleImgClick(){
        this.myRef.current.click();
    }

   componentDidUpdat(prevProps){
        if(prevProps.imageId==''){
            this.setState({file:this.props.imageId})
        }
   }

    handleUpload(e){
        e.preventDefault();
        const formData=new FormData()
        formData.append('file',this.state.file1)
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateProfilePhoto',
            headers: {
                'Authorization': 'Bearer ' + cookies,
            },
            type: "POST",
            data: formData,
            contentType : false,
            cache : false,
            processData:false,
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show("Photo added sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Photo did not added successfully", "error", null, null)
                }
            }.bind(this)
        })
    }

    render() {
        return(
        <div>
            <div onClick={this.handleImgClick}> 
                <img src={this.state.file} alt='sorry' style={{width:'230px',
                             height:'230px',
                             borderRadius:'100%',
                             border:'solid',
                             objectFit:'cover'
                            }} />
                            
                <input type='file' ref={this.myRef} onChange={this.handleImgChange} accept='image/png,image/jpeg,image/jpg,image/gif' 
                      name='file'   style={{display:'none'}} />
            </div>
            
           {this.state.file1 ?
        <Button primary onClick={this.handleUpload} style={{backgroundColor:'#032040'}}><Icon name='upload'/>UPLOAD</Button>: false
         }
        </div>
        ) }
}
