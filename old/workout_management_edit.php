<?php

$source = debug_backtrace();
if($source[0]['file']!=dirname(dirname(__DIR__)).DIRECTORY_SEPARATOR."dbq.php"){
	exit("Unauthorized");
}

/**
 * Echo anything necessary from execute, but make sure it returns true otherwise it will log an error
*/


class workout_management_edit extends module_workout_management implements imodquery {
	
	//Query: workout_management_edit
	
	public function execute () {
		$db = $this->db;
		foreach($_POST['attributes'] as $k=>$v){
			$_POST['attributes'][$k]=($v=="Yes")?"1":"0";
		}
		$_POST['attributes']=implode($_POST['attributes']);
		$stmt = $db->prepare("UPDATE `workouts` SET `workout_attributes`=?,`workout_name`=?,`comments`=? WHERE `id`=? LIMIT 1");
		$stmt->bind_param('sssi',$_POST['attributes'],$_POST['workout_name'],$_POST['comments'],$_POST['id']);
		$content = array("UPDATE","workouts",array("workout_attributes","workout_name","comments"),array($_POST['attributes'],$_POST['workout_name'],$_POST['comments']));
		if(!($this->database_query($stmt,$content,"UPDATE",$_POST['id']))){
			self::log_error("Database query failed.");
			return FALSE;
		}
		echo "success";
		return TRUE;
	}
	
}

?>