<script type="text/javascript">
var AttributesManagerRow = React.createClass({
	getInitialState: function () {
		return ({dragEnd:Number(this.props.data.attribute_num)*5,edit:0,name:this.props.data.attribute_name,label:this.props.data.attribute_label,comments:this.props.data.comments});
	},
	componentDidUpdate: function (prevProps,prevState) {
		if((this.state.dragging)&&(!prevState.dragging)&&(this.state.edit===0)){
			document.addEventListener('mousemove',this.onMouseMove);
			document.addEventListener('mouseup',this.onMouseUp);
		}
		else if((!this.state.dragging)&&(prevState.dragging)){
			document.removeEventListener('mousemove',this.onMouseMove);
			document.removeEventListener('mouseup',this.onMouseUp);
		}
		/*var attrnum = this.props.data.attribute_num;
		$('#attribute-manager-row-'+this.props.data.id).draggable({
			containment:'parent',
			revert:true,
			start: function () {
				//console.log('start drag');
			},
			stop: function (e,ui) {
				var vd = ui.position.top/$(this).outerHeight();
				serverRequest({query_type:"workout_management_attributes_reorder",attrnum:attrnum,vd:vd})
				.then(function(data) {
					console.log(data);
				})
				.catch(function(error) {
					console.error("AttributesManagerRow","workout_management_attributes_reorder",error);
				});
			
			}
		});*/
	},
	componentWillReceiveProps: function (nextProps) {
		if(this.state.edit!==1){
			if((!(Number.isInteger(this.state.dragEnd)))||(this.props.data.attribute_num!=nextProps.data.attribute_num)){
				this.setState({dragEnd:Number(nextProps.data.attribute_num)*5});
			}
		}
	},
	shouldComponentUpdate: function (nextProps,nextState) {
		if((JSON.stringify(nextState)==JSON.stringify(this.state))&&(JSON.stringify(nextProps)==JSON.stringify(this.props))){
			return false;
		}
		return true;
	},
	onMouseDown: function (event) {
		var target = event.target;
		var targettype = target.tagName.toLowerCase();
		if((targettype!="i")&&(targettype!="input")){
			this.setState({dragging:true,dragStart:event.pageY});
			event.stopPropagation();
			event.preventDefault();
		}
	},
	onMouseUp: function (event) {
		this.setState({dragging:false},function () {
			this.handleDragEnd();
		});
		event.stopPropagation();
		event.preventDefault();
	},
	onMouseMove: function (event) {
		if(!(this.state.dragging)){
			return false;
		}
		this.setState({dragEnd:(100*(event.pageY-this.state.dragStart)/document.documentElement.clientHeight)+this.props.data.attribute_num*5});
	},
	handleDragEnd: function () {
		var vd = (this.state.dragEnd - this.props.data.attribute_num*5)/5;
		serverRequest({query_type:"workout_management_attributes_reorder",attrnum:this.props.data.attribute_num,vd:vd})
		.then(function(data) {
			console.log(data);
		})
		.catch(function(error) {
			console.error("AttributeManagerRow.php","workout_management_attributes_reorder",error);
		});
	},
	handleSetEdit: function () {
		this.setState({edit:(this.state.edit==0)?1:0});
	},
	handleChange: function (type,event) {
		if(this.state.edit==1){
			switch(type){
				case "name":
					this.setState({name:event.target.value});
					break;
				case "label":
					this.setState({label:event.target.value});
					break;
				case "comments":
					this.setState({comments:event.target.value});
					break;
				default:
					console.log('error');
					break;
			}
		}
	},
	handleAcceptChanges: function () {
		serverRequest({query_type:"workout_management_attribute_save",id:this.props.data.id,name:this.state.name,label:this.state.label,comments:this.state.comments})
		.then(function(data) {
			console.log(data);
			this.setState({edit:0});
		}.bind(this))
		.catch(function(error) {
			console.error("AttributesManagerRow","workout_management_attribute_save",error);
		});
	},
	handleDelete: function () {
		var c = confirm("Are you sure you wish to delete this attribute [name=\""+this.state.name+"\"] ?");
		if(c==true){
			serverRequest({query_type:"workout_management_attribute_delete",id:this.props.data.id})
			.then(function(data) {
				console.log(data);
				this.setState({edit:"deleted"});
			}.bind(this))
			.catch(function(error) {
				console.error("AttributesManagerRow","workout_management_attribute_delete",error);
			});
		}
	},
	render: function () {
		return React.createElement("div",{style:{top:this.state.dragEnd+"vh"},className:((this.state.edit==1)?"editable":"")+" wm-attributes-manager-row",onMouseDown:this.onMouseDown},
			(this.state.edit===1)?React.createElement("input",{type:"text",value:this.state.name,onChange:this.handleChange.bind(this,"name")}):React.createElement("span",null,this.state.name),
			(this.state.edit===1)?React.createElement("i",{className:"fa fa-check",onClick:this.handleAcceptChanges}):"",
			React.createElement("i",{className:"fa fa-pencil",onClick:this.handleSetEdit}),
			React.createElement("i",{className:"fa fa-trash",onClick:this.handleDelete})
		);
	}
});
</script>