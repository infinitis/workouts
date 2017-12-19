<div class='top-bar'><h1>Workout Management</h1></div>
<div id='content'></div>
<script type="text/javascript">
var WorkoutManagementContent = React.createClass({//Main React Component
	loadDataFromServer: function () {
		serverRequest({query_type:'workout_management_data'},"json")
		.then(function(data) {
			console.log(data);
			this.setState({hash:data.hash,recent:data.recent,attributes:data.attributes});
		}.bind(this))
		.catch(function(error) {
			console.error("workout_management.php","workout_management_data",error);
		});
	},
	getInitialState: function() {
		return {hash:"",recent:[],attributes:[],view:""};
	},
	componentDidMount: function() {
		this.loadDataFromServer();
		setInterval(this.loadDataFromServer, 2000);	
	},
	handleView: function (type) {
		this.setState({view:type});
	},
	handleAddNew: function () {
		serverRequest({query_type:'workout_management_add_new'})
		.then(function(data) {
			console.log(data);
		})
		.catch(function(error) {
			console.error("workout_management.php","workout_management_add_new",error);
		});
	},
	render: function() {
		return React.createElement("div",null,
			(this.state.attributes.length==0)?React.createElement("div",null,"No Workout Attributes defined. Click the 'Manage Attributes' button below."):"",
			React.createElement(WorkoutManagementDaysAgoTableData,{data:this.state.recent,attributes:this.state.attributes}),
			React.createElement("input",{type:"button",value:(this.state.view=="")?"Manage Attributes":"Save Attributes",onClick:this.handleView.bind(this,(this.state.view=="")?"edit":"")}),
			(this.state.view=="edit")?React.createElement(WorkoutManagementAttributesManager,{data:this.state.attributes}):"",
			React.createElement(WorkoutManagementWorkoutTable,{hash:this.state.hash,attributes:this.state.attributes}),
			React.createElement("input",{type:"button",value:"Add new Workout",onClick:this.handleAddNew}),
			React.createElement("form",{className:"link-to-page-form",method:"post"},
				React.createElement("input",{type:"hidden",name:"page",value:"recent_workouts"}),
				React.createElement("input",{type:"submit",className:"link-to-page-button",value:"Recent Workouts"})
			)
		);
	}
});
</script>
<?php
require("WorkoutManagementDaysAgoTableData/WorkoutManagementDaysAgoTableData.php");
require("WorkoutManagementAttributesManager/WorkoutManagementAttributesManager.php");
require("WorkoutManagementWorkoutTable/WorkoutManagementWorkoutTable.php");
?>
<script type="text/javascript">
var ReactTable = ReactDOM.render(React.createElement(WorkoutManagementContent,null),document.getElementById('content'));
</script>