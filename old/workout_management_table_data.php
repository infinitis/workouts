<?php

$source = debug_backtrace();
if($source[0]['file']!=dirname(dirname(__DIR__)).DIRECTORY_SEPARATOR."dbq.php"){
	exit("Unauthorized");
}

/**
 * Echo anything necessary from execute, but make sure it returns true otherwise it will log an error
*/


class workout_management_table_data extends module_workout_management implements imodquery {
	
	//Query: workout_management_table_data
	
	public function execute () {
		$db = $this->db;
		$tosend = array("raw"=>array(),"hash"=>"");
		$sortby = ((isset($_POST['sorting']))&&(isset($_POST['order'])))?$this->build_sortby($_POST['sorting'],$_POST['order']):"";//build_sortby is from class_workout_management.php
		$stmt = $db->prepare(sprintf("SELECT md5(CONCAT_WS('%%',`w`.`id`,`w`.`siid`,`w`.`workout_name`,RPAD(`w`.`workout_attributes`,(SELECT COUNT(*) FROM `workouts_attributes`),'0'),`w`.`comments`,MAX(`c`.`date`),COUNT(`c`.`wid`))) FROM `workouts` as `w` LEFT JOIN `workout_count` as `c` ON `w`.`siid`=`c`.`wid` WHERE 1 GROUP BY `w`.`siid`%s",$sortby));
		if(!($stmt->execute())){
			self::log_error(mysqli_stmt_error($stmt));
			return FALSE;
		}
		$stmt->bind_result($hash);
		while($stmt->fetch()){
			$tosend['hash']=($tosend['hash']=="")?$hash:md5($hash.$tosend['hash']);
		}
		$stmt->close();
		$stmt = $db->prepare(sprintf("SELECT `w`.`id`,`w`.`siid`,`w`.`workout_name`,RPAD(`w`.`workout_attributes`,(SELECT COUNT(*) FROM `workouts_attributes`),'0') as `workout_attributes`,`w`.`comments`,MAX(`c`.`date`) as `last_done`,COUNT(`c`.`wid`) as `times_done` FROM `workouts` as `w` LEFT JOIN `workout_count` as `c` ON `w`.`siid`=`c`.`wid` WHERE 1 GROUP BY `w`.`siid`%s",$sortby));
		if(!($stmt->execute())){
			self::log_error(mysqli_stmt_error($stmt));
			return FALSE;
		}
		$stmt->bind_result($id,$siid,$name,$attrs,$comments,$last,$times);
		while($stmt->fetch()){
			$row = array("id"=>$id,"siid"=>$siid,"name"=>$name,"attrs"=>array(),"comments"=>$comments,"last"=>$last,"times"=>$times);
			$temp = str_split($attrs);
			for($i=0;$i<count($temp);$i++){
				if($temp[$i]==1){
					$row["attrs"][$i]="Yes";
				}
				else {
					$row["attrs"][$i]="No";
				}
			}
			$tosend['raw'][]=$row;
		}
		echo json_encode($tosend);
		return TRUE;
	}
	
}

?>