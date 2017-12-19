<?php

$source = debug_backtrace();
if($source[0]['file']!=dirname(dirname(__DIR__)).DIRECTORY_SEPARATOR."dbq.php"){
	exit("Unauthorized");
}

/**
 * Echo anything necessary from execute, but make sure it returns true otherwise it will log an error
*/


class recent_workouts_delete extends module_recent_workouts implements imodquery {
	
	//Query: recent_workouts_delete
	
	public function execute () {
		$db = $this->db;
		$stmt = $db->prepare("DELETE FROM `workout_count` WHERE `id`=? LIMIT 1");
		$stmt->bind_param('i',$_POST['id']);
		$content = array("DELETE","workout_count",array($_POST['id']));
		if(!($this->database_query($stmt,$content,"DELETE",$_POST['id']))){
			self::log_error("Database query failed.");
			return FALSE;
		}
		echo "success";
		return TRUE;
	}
	
}

?>