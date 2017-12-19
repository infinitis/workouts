<script type="text/javascript">
var RecentWorkoutsTableRow = React.createClass({
	getInitialState: function () {
		return {wid:this.props.data.wid,date:this.props.data.date,comments:this.props.data.comments,deletetd:"hidden",view:""};
	},
	handleValueChange: function(event,type) {
		switch(type){
			case "wid":
				this.setState({wid:event.target.value},function () {
					this.sendValues();
				});
				break;
			case "comments":
				this.setState({comments:event.target.value});
				break;
			default:
				console.log('error');
		}
	},
	setDate: function (newdate) {
		this.setState({date:newdate},function () {
			this.sendValues();
		});
	},
	handleDatePicker: function (event) {
		generateDatePicker(event.target.value)
		.then(function(result) {
			if(result!==false){
				this.setDate(result);
			}
		}.bind(this));
	},
	sendValues: function () {
		serverRequest({query_type:'recent_workouts_edit',wid:this.state.wid,comments:this.state.comments,date:this.state.date,id:this.props.data.id})
		.then(function(data) {
			console.log(data);
		})
		.catch(function(error) {
			console.error("RecentWorkoutsTableRow.php","recent_workouts_edit",error);
		});
	},
	deleteToggle: function (type) {
		this.setState({deletetd:type});
	},
	deleteEntry: function () {
		var c = confirm("Are you sure you wish to delete this workout?");
		if(c==true){
			this.setState({view:"hidden"},function () {
				serverRequest({query_type:'recent_workouts_delete',id:this.props.data.id})
				.then(function(data) {
					console.log(data);
				})
				.catch(function(error) {
					console.error("RecentWorkoutsTableRow.php","recent_workouts_delete",error);
				});
			});
		}
	},
	render: function() {
		var options = [];
		for (var workout in this.props.workouts){
			options.push(React.createElement("option",{value:this.props.workouts[workout].id,key:this.props.data.id+'-'+workout},this.props.workouts[workout].workout_name));
		}
		return React.createElement("tr",{onMouseEnter:this.deleteToggle.bind(this,""),onMouseLeave:this.deleteToggle.bind(this,"hidden"),className:this.props.rowtype+" "+this.state.view},
			React.createElement("td",{className:"inputok"},
				React.createElement("select",{className:"recent-workouts-table-select",value:this.state.wid,onChange:this.handleValueChange.bind(this,"wid")},options)
			),
			React.createElement("td",{className:"inputok"},
				React.createElement("input",{readOnly:true,className:"recent-workouts-table-input",value:this.state.date,onClick:this.handleDatePicker})
			),
			React.createElement("td",{className:"inputok"},
				React.createElement("textarea",{className:"recent-workouts-table-textarea",value:this.state.comments,onChange:this.handleValueChange.bind(this,"comments"),onBlur:this.sendValues}),
				React.createElement("div",{className:this.state.deletetd},
					React.createElement("div",{className:"recent-workouts-table-delete-container"},
						React.createElement("i",{className:"fa fa-trash-o",onClick:this.deleteEntry})
					)
				)
			)
		);
	}
});
</script>