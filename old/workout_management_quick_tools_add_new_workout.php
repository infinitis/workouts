<?php

$source = debug_backtrace();
if($source[0]['file']!=dirname(dirname(__DIR__)).DIRECTORY_SEPARATOR."dbq.php"){
	exit("Unauthorized");
}

/**
 * Echo anything necessary from execute, but make sure it returns true otherwise it will log an error
*/


class workout_management_quick_tools_add_new_workout extends module_workout_management implements imodquery {
	
	//Query: workout_management_quick_tools_add_new_workout
	
	public function execute () {
		$db = $this->db;
		$stmt = $db->prepare("INSERT INTO `workout_count`(`wid`, `date`, `comments`) VALUES (?,?,?)");
		$stmt->bind_param('iss',$_POST['wid'],$_POST['date'],$_POST['comments']);
		$content=array("INSERT","workout_count",array("wid","date","comments"),array($_POST['wid'],$_POST['date'],$_POST['comments']));
		if(!($this->database_query($stmt,$content,"INSERT",NULL))){
			self::log_error("Database query failed.");
			return FALSE;
		}
		echo "success";
		return TRUE;
	}
	
}

?>