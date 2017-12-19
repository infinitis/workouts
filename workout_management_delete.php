<?php

$source = debug_backtrace();
if($source[0]['file']!=dirname(dirname(__DIR__)).DIRECTORY_SEPARATOR."dbq.php"){
	exit("Unauthorized");
}

/**
 * Echo anything necessary from execute, but make sure it returns true otherwise it will log an error
*/


class workout_management_delete extends module_workout_management implements imodquery {
	
	//Query: workout_management_delete
	
	public function execute () {
		$db = $this->db;
		$stmt = $db->prepare("DELETE FROM `workouts` WHERE `id`=? LIMIT 1");
		$stmt->bind_param('i',$_POST['id']);
		$content = array("DELETE","workouts",array($_POST['id']));
		if(!($this->database_query($stmt,$content,"DELETE",$_POST['id']))){
			self::log_error("Database query failed.");
			return FALSE;
		}
		$stmt = $db->prepare("SELECT `id` FROM `workout_count` WHERE `wid`=?");
		$stmt->bind_param('i',$_POST['id']);
		$todelete = array();
		if(!($stmt->execute())){
			self::log_error(mysqli_stmt_error($stmt));
			return FALSE;
		}
		$stmt->bind_result($id);
		while($stmt->fetch()){
			$todelete[]=$id;
		}
		$stmt->close();
		foreach($todelete as $i=>$id){
			$stmt = $db->prepare("DELETE FROM `workout_count` WHERE `id`=? LIMIT 1");
			$stmt->bind_param('i',$id);
			$content = array("DELETE","workout_count",array($id));
			if(!($this->database_query($stmt,$content,"DELETE",$id))){
				self::log_error("Database query failed.");
				return FALSE;
			}
		}
		echo "success";
		return TRUE;
	}
	
}

?>