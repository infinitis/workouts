<?php

$source = debug_backtrace();
if($source[0]['file']!=dirname(dirname(__DIR__)).DIRECTORY_SEPARATOR."dbq.php"){
	exit("Unauthorized");
}

/**
 * Echo anything necessary from execute, but make sure it returns true otherwise it will log an error
*/


class workout_management_attribute_delete extends module_workout_management implements imodquery {
	
	//Query: workout_management_attribute_delete
	
	public function execute () {
		$db = $this->db;
		$stmt = $db->prepare("SELECT `attribute_num` FROM `workouts_attributes` WHERE `id`=?");
		$stmt->bind_param('i',$_POST['id']);
		if(!($stmt->execute())){
			self::log_error(mysqli_stmt_error($stmt));
			return FALSE;
		}
		$stmt->bind_result($num);
		$stmt->fetch();
		$stmt->close();
		$stmt = $db->prepare("DELETE FROM `workouts_attributes` WHERE `id`=? LIMIT 1");
		$stmt->bind_param('i',$_POST['id']);
		$content = array("DELETE","workouts_attributes",$_POST['id']);
		if(!($this->database_query($stmt,$content,"DELETE",$_POST['id']))){
			self::log_error("Database query failed.");
			return FALSE;
		}
		$stmt = $db->prepare("SELECT `id`,`attribute_num` FROM `workouts_attributes` WHERE `attribute_num`>?");
		$stmt->bind_param('i',$num);
		if(!($stmt->execute())){
			self::log_error(mysqli_stmt_error($stmt));
			return FALSE;
		}
		$stmt->bind_result($id,$attrnum);
		$data = array();
		while($stmt->fetch()){
			$data[$id]=$attrnum-1;
		}
		$stmt->close();
		foreach($data as $id=>$newnum){
			$stmt = $db->prepare("UPDATE `workouts_attributes` SET `attribute_num`=? WHERE `id`=? LIMIT 1");
			$stmt->bind_param('ii',$newnum,$id);
			$content = array("UPDATE","workouts_attributes",array("attribute_num"),array($newnum));
			if(!($this->database_query($stmt,$content,"UPDATE",$id))){
				self::log_error("Database query failed.");
				return FALSE;
			}
		}
		$stmt = $db->prepare("SELECT `id`,`workout_attributes` FROM `workouts` WHERE 1");
		if(!($stmt->execute())){
			self::log_error(mysqli_stmt_error($stmt));
			return FALSE;
		}
		$stmt->bind_result($id,$attrs);
		$toset = array();
		while($stmt->fetch()){
			$toset[$id]=str_split($attrs);
		}
		$stmt->close();
		foreach($toset as $k=>$attrs){
			unset($attrs[$num]);
			$toset[$k]=implode("",$attrs);
		}
		foreach($toset as $k=>$attrs){
			$stmt = $db->prepare("UPDATE `workouts` SET `workout_attributes`=? WHERE `id`=? LIMIT 1");
			$stmt->bind_param('si',$attrs,$k);
			$content = array("UPDATE","workouts",array("workout_attributes"),array($attrs));
			if(!($this->database_query($stmt,$content,"UPDATE",$k))){
				self::log_error("Database query failed.");
				return FALSE;
			}
		}
		echo "success";
		return TRUE;
	}
	
}

?>