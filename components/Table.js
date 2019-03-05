import React, { Component } from 'react'
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { getHistory } from '../libs/user';
import { getToken, redirectIfNotAuthenticated, isAuthenticated } from '../libs/auth';
import './css/Search.css';
import App from './App'
import { deleteUserHistory, getUserHistory } from '../services/userApi';
import { connect } from 'react-redux';
var ReactBsTable = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;


class Table extends Component {
    constructor(props) {
        super();

        console.log('This happens 1st.');

        this.state = {
            loading: 'initial',
            data: '',
        };

    }
    
    async  loadData() {
        const { userToken } = this.props;
        return await getUserHistory(userToken)
    }
    componentDidMount() {

        console.log('This happens 3rd.');

        this.setState({ loading: 'true' });
        this.loadData()
            .then((data) => {
                console.log('This happens 7th.');
                this.setState({
                    data: data,
                    loading: 'false'
                });
            });
    }


    render() {
        const { onRowClick } = this.props;
        // console.log('history',history)

        var options = {
            onRowClick: function (row) {
                // call callback function with data on the search
                onRowClick(row)
                /// close the popup
                console.log(row)
            }
        }

        return (
            <App>
                <button
                    type="button"
                    className="History-button"
                    onClick={this.hdandleRow}
                >
                    <span>Clear </span>
                </button>
                <BootstrapTable data={this.state.data.data} options={options}>
                    <TableHeaderColumn dataField='search_term' isKey>Search term</TableHeaderColumn>
                    <TableHeaderColumn dataField='service'>Service</TableHeaderColumn>
                    <TableHeaderColumn dataField='time'>Time</TableHeaderColumn>
                    <TableHeaderColumn dataField='num_of_results'>Number of results</TableHeaderColumn>
                </BootstrapTable>
            </App>
        );
    }
    hdandleRow = () => {
        const { userToken } = this.props;
        console.log('delete user history data', userToken)
        deleteUserHistory(userToken);

    };

}

export default connect()(Table)