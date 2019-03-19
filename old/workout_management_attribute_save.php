<?php

$source = debug_backtrace();
if($source[0]['file']!=dirname(dirname(__DIR__)).DIRECTORY_SEPARATOR."dbq.php"){
	exit("Unauthorized");
}

/**
 * Echo anything necessary from execute, but make sure it returns true otherwise it will log an error
*/


class workout_management_attribute_save extends module_workout_management implements imodquery {
	
	//Query: workout_management_attribute_save
	
	public function execute () {
		$db = $this->db;
		$stmt = $db->prepare("UPDATE `workouts_attributes` SET `attribute_name`=?,`attribute_label`=?,`comments`=? WHERE `id`=? LIMIT 1");
		$stmt->bind_param('sssi',$_POST['name'],$_POST['label'],$_POST['comments'],$_POST['id']);
		$content = array("UPDATE","workouts_attributes",array("attribute_name","attribute_label","comments"),array($_POST['name'],$_POST['label'],$_POST['comments']));
		if(!($this->database_query($stmt,$content,"UPDATE",$_POST['id']))){
			self::log_error("Database query failed.");
			return FALSE;
		}
		echo "success";
		return TRUE;
	}
	
}

?>