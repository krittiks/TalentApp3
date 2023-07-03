import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Loader } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import TalentProfile from '../EmployerFeed/TalentProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import TalentDetail from './TalentDetail.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: {companyContact :{name :'',email :'', phone :'', 
                                              location:{country :'',city:''}
                                            }}  ,
            tlnt:[{
                id:'',
                name:'',
                level:'',
                currentEmployment :'',
                photoId:'',
                skills:[],
                visa :'',
                videoUrl : ''
                }]         
        }
        this.init = this.init.bind(this);
        this.loadEmployer=this.loadEmployer.bind(this);
        this.loadTalent=this.loadTalent.bind(this);
        
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this
    }

    componentDidMount() {
        //window.addEventListener('scroll', this.handleScroll);
        this.loadEmployer()
        this.loadTalent()
        this.init()        
    };

    loadEmployer(){
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            //url: 'http://localhost:60290/profile/profile/getEmployerProfile',
            url :'https://talentserviceprofile3.azurewebsites.net/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                if (res.employer) {
                    this.setState({companyDetails : res.employer})
                }
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        }) 
    }
   
    loadTalent(){
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            //url: 'http://localhost:60290/profile/profile/getTalent',
            url:'https://talentserviceprofile3.azurewebsites.net/profile/profile/getTalent',
            headers: {
                'Authorization': 'Bearer '+cookies ,
                'Content-Type': 'application/json'
            },
            type: "GET",
            dataType: "json",
            success: function (res) {
                   this.setState({tlnt:res.data})
                }.bind(this)  
            })  
    }    

    render() {
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui grid talent-feed container">
                    <div className="four wide column">
                        <CompanyProfile  com={this.state.companyDetails.companyContact}/>
                    </div>
                    <div className="eight wide column">                        
                        <TalentCard talentData={this.state.tlnt}/>     
                    </div>
                    <div className="four wide column">
                        <div className="ui card">
                            <FollowingSuggestion />
                        </div>
                    </div>
                </div>
            </BodyWrapper>

        )
    }
}