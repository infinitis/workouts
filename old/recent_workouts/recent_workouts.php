<div class='top-bar'>
<h1>Recent Workouts</h1>
</div>
<div id='content'></div>
<script type="text/javascript">//Recent Workouts Table and Functionality
var RecentWorkoutsTable = React.createClass({
	loadDataFromServer: function () {
		serverRequest({query_type:"recent_workouts_data",sorting:this.state.sorting,order:this.state.order,filter:this.state.filter},"json")
		.then(function(data) {
			console.log(data);
			this.setState({workouts:data.workouts,data:data.raw});
		}.bind(this))
		.catch(function(error) {
			console.error("recent_workouts.php","recent_workouts_data",error);
		});
	},
	getInitialState: function() {
		return {hash:"",workouts:[],data:[],filter:""};
	},
	componentDidMount: function() {
		this.loadDataFromServer();
		setInterval(this.loadDataFromServer, 2000);
	},
	shouldComponentUpdate: function (nextProps,nextState) {
		if(JSON.stringify(nextState)==JSON.stringify(this.state)){
			return false;
		}
		return true;
	},
	changeSorting: function (key,event) {
		if(typeof this.state.sorting=="undefined"){
			var toset = {};
			toset[key]="ASC";
			var order = [key];
		}
		else {
			var toset = this.state.sorting;
			var order = (typeof this.state.order!="undefined")?this.state.order:[];
			if(typeof this.state.sorting[key]!="undefined"){
				toset[key]=(this.state.sorting[key]=="ASC")?"DESC":"ASC";
			}
			else {
				toset[key]="ASC";
			}
			if(event.shiftKey){
				if(order.indexOf(key)<0){
					order.push(key);
				}
			}
			else {
				for(var i in toset){
					if(i!=key){
						delete toset[i];
					}
				}
				order = [key];
			}
		}
		this.setState({sorting:toset,order:order},function () {
			this.loadDataFromServer();
		});
	},
	handleFilterChange: function (event) {
		this.setState({filter:event.target.value});
	},
	render: function() {
		var rows = [];
		var rowtype = "odd";
		for( var i in this.state.data){
			rows.push(React.createElement(RecentWorkoutsTableRow,{data:this.state.data[i],key:"rtr-"+this.state.data[i].id,workouts:this.state.workouts,rowtype:rowtype}));
			rowtype = (rowtype=="odd")?"even":"odd";
		};
		return React.createElement("div",null,
			React.createElement("div",{className:"recent-workouts-table-div"},
				React.createElement("div",{className:"recent-workouts-filter-div"},
					React.createElement("input",{placeholder:"Search workouts...",value:this.state.filter,onChange:this.handleFilterChange})
				),
				(rows.length==0)?React.createElement("div",null,
					React.createElement("span",null,"No workouts logged.")
				):React.createElement("table",{className:"recent-workouts-table"},
					React.createElement("thead",null,
						React.createElement("tr",null,
							React.createElement("th",{className:(typeof this.state.sorting!="undefined")?(typeof this.state.sorting.workout_name!="undefined")?"sortedby":"":"",onClick:this.changeSorting.bind(this,"workout_name")},"Workout Name",
								React.createElement("i",{className:((typeof this.state.sorting!="undefined")&&(typeof this.state.sorting.workout_name!="undefined"))?"fa fa-sort-"+this.state.sorting.workout_name.toLowerCase():"fa fa-sort"})
							),
							React.createElement("th",{className:(typeof this.state.sorting!="undefined")?(typeof this.state.sorting.date!="undefined")?"sortedby":"":"",onClick:this.changeSorting.bind(this,"date")},"Date",
								React.createElement("i",{className:((typeof this.state.sorting!="undefined")&&(typeof this.state.sorting.date!="undefined"))?"fa fa-sort-"+this.state.sorting.date.toLowerCase():"fa fa-sort"})
							),
							React.createElement("th",{className:(typeof this.state.sorting!="undefined")?(typeof this.state.sorting.comments_count!="undefined")?"sortedby":"":"",onClick:this.changeSorting.bind(this,"comments_count")},"Comments",
								React.createElement("i",{className:((typeof this.state.sorting!="undefined")&&(typeof this.state.sorting.comments_count!="undefined"))?"fa fa-sort-"+this.state.sorting.comments_count.toLowerCase():"fa fa-sort"})
							)
						)
					),
					React.createElement("tbody",null,rows)
				)
			)
		);
	}
});
</script>
<?php
require("RecentWorkoutsTableRow/RecentWorkoutsTableRow.php");
?>
<script type="text/javascript">
var ReactTable = ReactDOM.render(React.createElement(RecentWorkoutsTable,null),document.getElementById('content'));
</script>
