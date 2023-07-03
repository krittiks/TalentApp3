import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx'
import TalentCardDetail from '../TalentFeed/TalentCardDetail.jsx';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { Table,Image } from 'semantic-ui-react';

export default class TalentDetail extends React.Component {

    constructor(props) {
        super(props)

    }

    render() {
        return(
            <div>
                <Table fixed>
                    <Table.Row>
                    <Table.Cell>
                            <Image src={this.props.pid} 
                            width = '260px' height = '320px'/>
                        </Table.Cell> 
                        <Table.Cell 
                        style={{textAlign:'top',display: 'block', justifyContent: 'top',alignItems: 'left',}}>
                            <h2>Talent Snapshot</h2> <br/>
                            <strong>CURRENT EMPLOYER </strong><br/>{this.props.curEmp}
                            <br/><br/>
                            <strong>VISA STATUS</strong> <br/>{this.props.visa}
                            <br/><br/>
                            <strong>POSITION </strong><br/>{this.props.pos}
                            <br/><br/>
                        </Table.Cell>                        
                    </Table.Row>
                </Table>
            </div>
        )
        
    }
}