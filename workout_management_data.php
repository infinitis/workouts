<?php

$source = debug_backtrace();
if($source[0]['file']!=dirname(dirname(__DIR__)).DIRECTORY_SEPARATOR."dbq.php"){
	exit("Unauthorized");
}

/**
 * Echo anything necessary from execute, but make sure it returns true otherwise it will log an error
*/


class workout_management_data extends module_workout_management implements imodquery {
	
	//Query: workout_management_data
	
	public function execute () {
		$db = $this->db;
		$tosend = array("hash"=>"","recent"=>array(),"attributes"=>array());
		$stmt = $db->prepare("SELECT md5(CONCAT_WS('%%',`c`.`id`,`c`.`wid`,`c`.`date`,`c`.`comments`,`c`.`modified`)) FROM `workout_count` as `c` WHERE 1 UNION SELECT md5(CONCAT_WS('%%',`w`.`id`,`w`.`siid`,`w`.`workout_name`,`w`.`workout_attributes`,`w`.`comments`,`w`.`modified`)) FROM `workouts` as `w` WHERE 1 UNION SELECT md5(CONCAT_WS('%%',`a`.`id`,`a`.`attribute_num`,`a`.`attribute_name`,`a`.`attribute_label`,`a`.`comments`,`a`.`modified`)) FROM `workouts_attributes` as `a` WHERE 1");
		if(!($stmt->execute())){
			self::log_error(mysqli_stmt_error($stmt));
			return FALSE;
		}
		$stmt->bind_result($hash);
		while($stmt->fetch()){
			$tosend['hash']=($tosend['hash']=="")?$hash:md5($hash.$tosend['hash']);
		}
		$stmt->close();
		$stmt = $db->prepare("SELECT `id`,`attribute_num`,`attribute_name`,`attribute_label`,`comments` FROM `workouts_attributes` WHERE 1 ORDER BY `attribute_num` ASC;");
		if(!($stmt->execute())){
			self::log_error(mysqli_stmt_error($stmt));
			return FALSE;
		}
		$stmt->bind_result($id,$num,$name,$label,$comments);
		while($stmt->fetch()){
			$tosend['attributes'][$num]=array("id"=>$id,"attribute_num"=>$num,"attribute_name"=>$name,"attribute_label"=>$label,"comments"=>$comments);
			$tosend['recent'][$num]=NULL;
		}
		$stmt->close();
		$stmt = $db->prepare("SELECT `w`.`workout_attributes`,MAX(`c`.`date`) as `last_done` FROM `workouts` as `w` LEFT JOIN `workout_count` as `c` ON `w`.`siid`=`c`.`wid` WHERE 1 GROUP BY `w`.`siid` ORDER BY `last_done` DESC");
		if(!($stmt->execute())){
			self::log_error(mysqli_stmt_error($stmt));
			return FALSE;
		}
		$stmt->bind_result($attrs,$last);
		while($stmt->fetch()){
			$temp = str_split($attrs);
			while(count($temp)<count($tosend['attributes'])){
				$temp[]=0;
			}
			$i=0;
			while($i<count($temp)){
				if($temp[$i]==1){
					if(isset($tosend['recent'][$i])){
						if($tosend['recent'][$i]<$last){
							$tosend['recent'][$i]=$last;
						}
				}
					else {
						$tosend['recent'][$i]=$last;
					}
				}
				$i++;
			}
			unset($temp);
		}
		$stmt->close();
		ksort($tosend['recent']);
		$i=0;
		foreach($tosend['recent'] as $key=>$val){
			$now = time();
			$tosend['recent'][$key] = ($val!=NULL)?floor(($now-strtotime($val))/(60*60*24)):"N/A";
		}
		$tosend["recent"]=$tosend['recent'];
		echo json_encode($tosend);
		return TRUE;
	}
	
}

?>