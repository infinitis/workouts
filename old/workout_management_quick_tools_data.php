<?php

$source = debug_backtrace();
if($source[0]['file']!=dirname(dirname(__DIR__)).DIRECTORY_SEPARATOR."dbq.php"){
	exit("Unauthorized");
}

/**
 * Echo anything necessary from execute, but make sure it returns true otherwise it will log an error
*/


class workout_management_quick_tools_data extends module_workout_management implements imodquery {
	
	//Query: workout_management_quick_tools_data
	
	public function execute () {
		$db = $this->db;
		$tosend = array("workouts"=>array(),"options"=>array());
		$stmt = $db->prepare("SELECT `id`,`siid`,`workout_name`,`workout_attributes`,`comments` FROM `workouts` WHERE 1 ORDER BY `workout_name` ASC");
		if(!($stmt->execute())){
			self::log_error(mysqli_stmt_error($stmt));
			return FALSE;
		}
		$stmt->bind_result($id,$siid,$name,$attrs,$comments);
		while($stmt->fetch()){
			$tosend["workouts"][]=array("id"=>$id,"siid"=>$siid,"workout_name"=>$name,"workout_attributes"=>$attrs,"comments"=>$comments);
		}
		$tosend['options']=$this->page_options_get("workout_management");
		echo json_encode($tosend);
		return TRUE;
	}
	
}

?>