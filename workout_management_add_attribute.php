<?php

$source = debug_backtrace();
if($source[0]['file']!=dirname(dirname(__DIR__)).DIRECTORY_SEPARATOR."dbq.php"){
	exit("Unauthorized");
}

/**
 * Echo anything necessary from execute, but make sure it returns true otherwise it will log an error
*/


class workout_management_add_attribute extends module_workout_management implements imodquery {
	
	//Query: workout_management_add_attribute
	
	public function execute () {
		$db = $this->db;
		$stmt = $db->prepare("SELECT IFNULL(MAX(`attribute_num`)+1,0) FROM `workouts_attributes` WHERE 1");
		if(!($stmt->execute())){
			self::log_error(mysqli_stmt_error($stmt));
			return FALSE;
		}
		$stmt->bind_result($max);
		$stmt->fetch();
		$stmt->close();
		$stmt = $db->prepare("INSERT INTO `workouts_attributes` (attribute_num,attribute_name,attribute_label,comments) VALUES (?,'New Attribute','Attribute Label','New Attribute')");
		$stmt->bind_param('i',$max);
		$content = array("INSERT","workouts_attributes",array("attribute_num","attribute_name","attribute_label","comments"),array($max,"New Attribute","Attribute Label","New Attribute"));
		if(!($this->database_query($stmt,$content,"INSERT",NULL))){
			self::log_error("Database query failed.");
			return FALSE;
		}
		echo "success";
		return TRUE;
	}
	
}

?>