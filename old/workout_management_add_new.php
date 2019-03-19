<?php

$source = debug_backtrace();
if($source[0]['file']!=dirname(dirname(__DIR__)).DIRECTORY_SEPARATOR."dbq.php"){
	exit("Unauthorized");
}

/**
 * Echo anything necessary from execute, but make sure it returns true otherwise it will log an error
*/


class workout_management_add_new extends module_workout_management implements imodquery {
	
	//Query: workout_management_add_new
	
	public function execute () {
		$db = $this->db;
		$stmt = $db->prepare("SELECT RPAD('',(SELECT COUNT(*) as `count` FROM `workouts_attributes` WHERE 1),'0') FROM `workouts_attributes` WHERE 1 LIMIT 1");
		if(!($stmt->execute())){
			self::log_error(mysqli_stmt_error($stmt));
			return FALSE;
		}
		$stmt->bind_result($attr);
		$stmt->fetch();
		$stmt->close();
		$stmt = $db->prepare("SELECT IFNULL(MAX(`siid`)+1,0) FROM `workouts` WHERE 1");
		if(!($stmt->execute())){
			self::log_error(mysqli_stmt_error($stmt));
			return FALSE;
		}
		$stmt->bind_result($max);
		$stmt->fetch();
		$stmt->close();
		$stmt = $db->prepare("INSERT INTO `workouts` (`siid`,`workout_name`,`workout_attributes`,`comments`) VALUES (?,'New Workout',?,'New Workout')");
		$stmt->bind_param('is',$max,$attr);
		$content = array("INSERT","workouts",array("siid","workout_name","workout_attributes","comments"),array($max,"New Workout",$attr,"New Workout"));
		if(!($this->database_query($stmt,$content,"INSERT",NULL))){
			self::log_error("Database query failed.");
			return FALSE;
		}
		echo "success";
		return TRUE;
	}
	
}

?>