<script type="text/javascript">
var WorkoutManagementAttributesManager = React.createClass({
	handleAddNewAttr: function () {
		serverRequest({query_type:"workout_management_add_attribute"})
		.then(function(data) {
			console.log(data);
		})
		.catch(function(error) {
			console.error("WorkoutManagementAttributesManager","workout_management_add_attribute",error);
		});
	},
	render: function () {
		var rows = [];
		for(var attr in this.props.data){
			rows.push(React.createElement(AttributesManagerRow,{key:"wm-attr-manager-row-"+this.props.data[attr].id,data:this.props.data[attr]}));
		}
		return React.createElement("div",{className:"wm-attr-manager-div"},
			React.createElement("h3",null,"Manage Attributes"),
			React.createElement("div",{style:{height:5*this.props.data.length+"vh"},className:"wm-attr-manager-container"},rows),
			React.createElement("input",{type:"button",onClick:this.handleAddNewAttr,value:"Add New Attribute"})
		);
	}
});
</script>
<?php
require("AttributesManagerRow/AttributesManagerRow.php");
?>