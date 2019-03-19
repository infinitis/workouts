<?php

$source = debug_backtrace();
if($source[0]['file']!=dirname(dirname(__DIR__)).DIRECTORY_SEPARATOR."dbq.php"){
	exit("Unauthorized");
}

/**
 * Echo anything necessary from execute, but make sure it returns true otherwise it will log an error
*/


class recent_workouts_data extends module_recent_workouts implements imodquery {
	
	//Query: recent_workouts_data
	
	public function execute () {
		$db = $this->db;
		$tosend = array("raw"=>array(),"workouts"=>array());
		$_POST['filter']="%".$_POST['filter']."%";
		$sortby = ((isset($_POST['sorting']))&&(isset($_POST['order'])))?$this->build_sortby($_POST['sorting'],$_POST['order']):"";//build_sortby is from class_workout_management.php
		$stmt = $db->prepare(sprintf("SELECT `c`.`id`,`c`.`wid`,`c`.`date`,`c`.`comments` as `comments_count`,`w`.`workout_name` FROM `workout_count` as `c` INNER JOIN `workouts` as `w` ON `c`.`wid`=`w`.`siid` WHERE `workout_name` LIKE ? OR `c`.`comments` LIKE ? %s LIMIT 100",$sortby));
		$stmt->bind_param('ss',$_POST['filter'],$_POST['filter']);
		if(!($stmt->execute())){
			self::log_error(mysqli_stmt_error($stmt));
			return FALSE;
		}
		$stmt->bind_result($id,$wid,$date,$comments,$name);
		while($stmt->fetch()){
			$tosend["raw"][]=array("id"=>$id,"wid"=>$wid,"date"=>$date,"comments"=>$comments,"workout_name"=>$name);
		}
		$stmt->close();
		$stmt = $db->prepare("SELECT `id`,`workout_name`,`comments` FROM `workouts` WHERE 1");
		if(!($stmt->execute())){
			self::log_error(mysqli_stmt_error($stmt));
			return FALSE;
		}
		$stmt->bind_result($id,$name,$comments);
		while($stmt->fetch()){
			$tosend["workouts"][$id]=array("id"=>$id,"workout_name"=>$name,"comments"=>$comments);
		}
		$stmt->close();
		echo json_encode($tosend);
		return TRUE;
	}
	
}

?>