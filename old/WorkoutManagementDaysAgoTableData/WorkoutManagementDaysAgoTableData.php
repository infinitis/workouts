<script type="text/javascript">
var WorkoutManagementDaysAgoTableData = React.createClass({//Recent Workouts Table
	render: function() {
		var heads = [];
		for(var attr in this.props.attributes){
			heads.push(React.createElement("th",{key:"da-th-"+attr},this.props.attributes[attr]["attribute_name"]));
		}
		var rows=[];
		rows.push(React.createElement("td",{key:"da"},"Days Ago"));
		for(var key in this.props.data){
			rows.push(React.createElement("td",{key:"da-"+key},this.props.data[key]));
		}
		return React.createElement("table",{className:(heads.length>0)?"":"hidden"},
			React.createElement("thead",null,
				React.createElement("tr",null,
					React.createElement("th",null),
					heads
				)
			),
			React.createElement("tbody",null,
				React.createElement("tr",null,rows)
			)
		);
	}
});
</script>