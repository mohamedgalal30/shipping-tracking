import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DataTable from 'react-table';

import * as actions from '../actions/tasks';
import BlankList from '../../core/components/common/BlankList';
import Select from '../../core/components/common/Select';

import 'react-table/react-table.css'


class TasksPage extends React.Component {
	componentDidMount() {
		const { page, pageSize, sort, filter } = this.props.listInfo;
		const params = { page, pageSize, sort, filter };

		this.props.actions.fetchTasks(params);
	}


	fetchTasks = (newParams = {}) => {
		const { page, pageSize, sort, filter } = this.props.listInfo;
		const params = { page, pageSize, sort, filter, ...newParams };

		this.props.actions.fetchTasks(params);
	}


	handleTableSortedChange = (newSorted, column, shiftKey) => {
		if (shiftKey) return;

		const sortColumn = newSorted[0].id;
		const sortDirection = newSorted[0].desc ? "DESC" : "";
		const sort = `${sortColumn} ${sortDirection}`;

		this.fetchTasks({ sort })
	}

	onStatusChange = (newStatus, taskId) => {
		this.props.actions.updateStatus(taskId, newStatus);
	}

	render() {

		const {
			listData,
			listInfo,
		} = this.props;


		const {
			page,
			pageSize,
			sort,
			isFetching,
			totalCount,
		} = listInfo;

		const statusList = ["completed", "started", "pending", "failed"];

		const idCell = ({ original }) => <span>
			<NavLink to={`/tasks/${original.id}/map`} >
				{`# ${original.id}`}
			</NavLink>
		</span>

		const statusCell = ({ original }) => <span>
			<Select data={statusList} onChange={event => this.onStatusChange(event.currentTarget.value, original.id)} value={original.status} name="staus" />
		</span>

		const columns = [
			{
				Header: 'ID',
				accessor: 'id',
				Cell: idCell
			},
			{
				Header: 'Courier',
				accessor: 'courier',
			},
			{
				Header: 'Driver Name',
				accessor: 'driverName',
				sortable: false,
			},
			{
				Header: 'Description',
				accessor: 'description',
				sortable: false,
			},
			{
				Header: 'Status',
				accessor: 'status',
				Cell: statusCell
			},
			{
				Header: 'Delivery Date',
				accessor: 'deliveryDate',
			},
			{
				Header: 'Start Date',
				accessor: 'startedAt',
			},
			{
				Header: 'Finish Date',
				accessor: 'finishedAt',
			},
			{
				Header: 'Driver Comment',
				accessor: 'driverComment',
				sortable: false,
			},
		];

		if (listData.length) {

			return (
				<DataTable
					columns={columns}
					data={listData}
					itemsInDataCount={totalCount}
					// manual
					resizable={true}
					loading={isFetching}
					// sort={sort}
					onSortedChange={this.handleTableSortedChange}
					minRows={0}
					showPaginationBottom={false}
				/>
			);

		} else return <BlankList />
	}
}


function mapStateToProps(state, ownProps) {
	const stateProps = {
		listData: state.tasks.list.data,
		listInfo: state.tasks.list.info,
	};
	return stateProps;
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);