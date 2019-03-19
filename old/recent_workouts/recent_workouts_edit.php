<?php

$source = debug_backtrace();
if($source[0]['file']!=dirname(dirname(__DIR__)).DIRECTORY_SEPARATOR."dbq.php"){
	exit("Unauthorized");
}

/**
 * Echo anything necessary from execute, but make sure it returns true otherwise it will log an error
*/


class recent_workouts_edit extends module_recent_workouts implements imodquery {
	
	//Query: recent_workouts_edit
	
	public function execute () {
		$db = $this->db;
		$stmt = $db->prepare("UPDATE `workout_count` SET `wid`=?,`comments`=?,`date`=? WHERE `id`=? LIMIT 1;");
		$stmt->bind_param('issi',$_POST['wid'],$_POST['comments'],$_POST['date'],$_POST['id']);
		$content = array("UPDATE","workout_count",array("wid","comments","date"),array($_POST['wid'],$_POST['comments'],$_POST['date']));
		if(!($this->database_query($stmt,$content,"UPDATE",$_POST['id']))){
			self::log_error("Database query failed.");
			return FALSE;
		}
		echo "success";
		return TRUE;
	}
	
}

?>