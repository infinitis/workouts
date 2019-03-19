<?php

$source = debug_backtrace();
if($source[0]['file']!=dirname(dirname(__DIR__)).DIRECTORY_SEPARATOR."dbq.php"){
	exit("Unauthorized");
}

/**
 * Echo anything necessary from execute, but make sure it returns true otherwise it will log an error
*/


class workout_management_attributes_reorder extends module_workout_management implements imodquery {
	
	//Query: workout_management_attributes_reorder
	
	public function execute () {
		$db = $this->db;
		$stmt = $db->prepare("SELECT `id`,`attribute_num` FROM `workouts_attributes` WHERE 1 ORDER BY `attribute_num` ASC");
		if(!($stmt->execute())){
			self::log_error(mysqli_stmt_error($stmt));
			return FALSE;
		}
		$stmt->bind_result($id,$num);
		$data = array();
		while($stmt->fetch()){
			$data[$num]=$id;
		}
		$stmt->close();
		$initial=$data;
		$key=$data[$_POST['attrnum']];
		unset($data[$_POST['attrnum']]);
		$data = array_values($data);
		if($_POST['vd']<0){
			$diff = ceil($_POST['vd']);
			$pos = (($_POST['attrnum']+$diff)<0)?0:$_POST['attrnum']+$diff;
		}
		else {
			$diff = floor($_POST['vd']);
			$pos = $_POST['attrnum']+$diff;
		}
		array_splice($data,$pos,0,$key);
		$data = array_values($data);
		foreach($initial as $key=>$value){
			if($value!=$data[$key]){
				$stmt = $db->prepare("UPDATE `workouts_attributes` SET `attribute_num`=? WHERE `id`=? LIMIT 1");
				$stmt->bind_param('ii',$key,$data[$key]);
				$content = array("UPDATE","workouts_attributes",array("attribute_num"),array($key));
				if(!($this->database_query($stmt,$content,"UPDATE",$data[$key]))){
					self::log_error("Database query failed.");
					return FALSE;
				}
			}
		}
		echo "success";
		return TRUE;
	}
	
}

?>