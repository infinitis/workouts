<script type="text/javascript">
var WorkoutManagementWorkoutTable = React.createClass({
	loadDataFromServer: function () {
		serverRequest({query_type:"workout_management_table_data",sorting:this.state.sorting,order:this.state.order},"json")
		.then(function(data) {
			//console.log(data);
			if(data.hash!=this.state.hash){
				this.setState({data:data.raw,hash:data.hash});
			}
		}.bind(this))
		.catch(function(error) {
			console.error("WorkoutManagementWorkoutTable.php","workout_management_table_data",error);
		});
	},
	componentDidMount: function () {
		this.loadDataFromServer();
	},
	shouldComponentUpdate: function (nextProps,nextState) {
		if((this.props.hash!=nextProps.hash)||(JSON.stringify(this.state)!=JSON.stringify(nextState))){
			return true;
		}
		return false;
	},
	componentWillReceiveProps: function (nextProps) {
		if(this.props.hash!=nextProps.hash){
			this.loadDataFromServer();
		}
	},
	getInitialState: function() {
		return {data:[],hash:""};
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
	render: function() {
		var rows = [];
		var rowtype = "odd";
		for(var i in this.state.data){
			rows.push(React.createElement(WorkoutManagementWorkoutTableRows,{key:"wm-row-"+this.state.data[i].id,data:this.state.data[i],rowtype:rowtype}));
			rowtype = (rowtype=="odd")?"even":"odd";
		}
		var heads = [];
		for(var head in this.props.attributes){
			heads.push(React.createElement("th",{key:"workout-table-head-"+head,className:(typeof this.state.sorting!="undefined")?(typeof this.state.sorting["workout_attributes_"+this.props.attributes[head]["attribute_num"]]!="undefined")?"sortedby":"":"",onClick:this.changeSorting.bind(this,"workout_attributes_"+this.props.attributes[head]["attribute_num"])},this.props.attributes[head]["attribute_name"],
				React.createElement("i",{className:((typeof this.state.sorting!="undefined")&&(typeof this.state.sorting["workout_attributes_"+this.props.attributes[head]["attribute_num"]]!="undefined"))?"fa fa-sort-"+this.state.sorting["workout_attributes_"+this.props.attributes[head]["attribute_num"]].toLowerCase():"fa fa-sort"})
			));
		}
		return React.createElement("div",null,
			React.createElement("div",{className:"workout-management-table-div"},
				React.createElement("table",{className:"workout-management-table"},
					React.createElement("thead",null,
						React.createElement("tr",null,
							React.createElement("th",{className:(typeof this.state.sorting!="undefined")?(typeof this.state.sorting.workout_name!="undefined")?"sortedby":"":"",onClick:this.changeSorting.bind(this,"workout_name")},"Workout Name",
								React.createElement("i",{className:((typeof this.state.sorting!="undefined")&&(typeof this.state.sorting.workout_name!="undefined"))?"fa fa-sort-"+this.state.sorting.workout_name.toLowerCase():"fa fa-sort"})
							),
							heads,
							React.createElement("th",{className:(typeof this.state.sorting!="undefined")?(typeof this.state.sorting.times!="undefined")?"sortedby":"":"",onClick:this.changeSorting.bind(this,"times")},"Times Done",
								React.createElement("i",{className:((typeof this.state.sorting!="undefined")&&(typeof this.state.sorting.times!="undefined"))?"fa fa-sort-"+this.state.sorting.times.toLowerCase():"fa fa-sort"})
							),
							React.createElement("th",{className:(typeof this.state.sorting!="undefined")?(typeof this.state.sorting.last!="undefined")?"sortedby":"":"",onClick:this.changeSorting.bind(this,"last")},"Last Done",
								React.createElement("i",{className:((typeof this.state.sorting!="undefined")&&(typeof this.state.sorting.last!="undefined"))?"fa fa-sort-"+this.state.sorting.last.toLowerCase():"fa fa-sort"})
							),
							React.createElement("th",{className:(typeof this.state.sorting!="undefined")?(typeof this.state.sorting.comments!="undefined")?"sortedby":"":"",onClick:this.changeSorting.bind(this,"comments")},"Comments",
								React.createElement("i",{className:((typeof this.state.sorting!="undefined")&&(typeof this.state.sorting.comments!="undefined"))?"fa fa-sort-"+this.state.sorting.comments.toLowerCase():"fa fa-sort"})
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
require("WorkoutManagementWorkoutTableRows/WorkoutManagementWorkoutTableRows.php");
?>