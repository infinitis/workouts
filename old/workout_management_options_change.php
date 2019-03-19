<?php

$source = debug_backtrace();
if($source[0]['file']!=dirname(dirname(__DIR__)).DIRECTORY_SEPARATOR."dbq.php"){
	exit("Unauthorized");
}

/**
 * Echo anything necessary from execute, but make sure it returns true otherwise it will log an error
*/


class workout_management_options_change extends module_workout_management implements imodquery {
	
	//Query: workout_management_options_change
	
	public function execute () {
		$db = $this->db;
		if(($_POST['field']=="workout")&&($_POST['value']=="added")){
			if(!($this->option_delete("date","workout_management"))){
				self::log_error("Option delete failed.");
				return FALSE;
			}
			if(!($this->option_delete("wid","workout_management"))){
				self::log_error("Option delete failed.");
				return FALSE;
			}
			if(!($this->option_delete("comments","workout_management"))){
				self::log_error("Option delete failed.");
				return FALSE;
			}
		}
		else {
			if((isset($_POST['value']))&&(isset($_POST['field']))){
				$this->option_set($_POST['field'],$_POST['value'],"workout_management");
			}
		}
		echo "success";
		return TRUE;
	}
	
}

?>