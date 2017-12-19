<?php

/**
 * Recent Workouts Module Class
 * Required methods, then custom methods, then variables
 * Three variables are required (header, stylesheets, module_file)
 * Add to required_table_structure variable and uncomment the table_verify function in the __construct method to check table structure before loading class
 */

class module_recent_workouts extends module_workout_management implements imodule {
	
	const MODULE_NAME = "Recent Workouts";
	
	public function __construct() {
		parent::__construct();
		if(!($this->table_verify($this->get_required_module_table_data()))){
			self::log_error(self::MODULE_NAME." required tables verification failed.");
		}
		//Options: Module Name,linked module path,quick_tool_icon (font awesome icon class)
		//Default is array ("",NULL,NULL)
		$options = array (self::MODULE_NAME,"workout_management/",NULL);
		if(!($this->module_check(__FILE__,$options))){
			self::log_error(self::MODULE_NAME." module not loaded correctly.");
		}
		if(!($this->public_check($this->fields_marked_public,__FILE__))){
			self::log_error(self::MODULE_NAME." public fields not correctly implemented.");
		}
	}
	
	//Start required methods
	public function cron_tasks () {
		//Insert any methods here to run every 30 minutes, make sure to return TRUE
		return TRUE;
	}
	
	public function get_header () {
		//Add any extra javascript scripts/css required to header
		$return = $this->get_default_header();
		if((stripos($return,"</HEAD>")!==FALSE)&&(stripos($return,"</HEAD>")==strlen($return)-7)){
			if((is_array($this->header_scripts))&&(count($this->header_scripts)>0)){
				$return = rtrim($return,"</HEAD>");
				foreach($this->header_scripts as $i=>$v){
					if($v['sri']!=""){
						$return .= "<script type='".$v['type']."' src='".$v['src']."' integrity='".$v['sri']."' crossorigin='anonymous'></script>\n";
					}
					else {
						$return .= "<script type='".$v['type']."' src='".$v['src']."'></script>\n";
					}
				}
				$return .= "</HEAD>";
			}
			$stylesheets = $this->get_stylesheets();
			if($stylesheets!=""){
				$return = rtrim($return,"</HEAD>");
				$return .= $stylesheets;
				$return .= "</HEAD>";
			}
		}
		return $return;
	}
	
	public function get_required_module_table_data ($type = "all") {
		$tables = $this->required_table_structure;
		foreach($tables as $name=>$rows){
			//Double check blockchain tracking row and delete once found
			if(!((isset($rows[0]))&&(($rows[0]===0)||($rows[0]===1)))){
				unset($tables[$name]);
				self::log_error(sprintf("Table structure data for `%s` not formatted correctly.%s",$name));
				continue;
			}
			if(($rows[0]===0)&&($type!="all")){
				unset($tables[$name]);
			}
			else {
				unset($rows[0]);
				$tables[$name] = array_values($rows);
			}
		}
		return $tables;
	}
	
	public function get_stylesheets () {
		//Generate stylesheet <link>(s)
		$return = "";
		if(file_exists(__DIR__.DIRECTORY_SEPARATOR."style.css")){
			$return .= "<LINK href='".ltrim(substr(__DIR__.DIRECTORY_SEPARATOR."style.css",strlen(dirname(dirname(dirname(__DIR__))))),"/")."' rel='stylesheet' type='text/css'>\n";
		}
		foreach($this->stylesheets as $i=>$v){
			$return .= "<LINK href='".$v['href']."' rel='".$v['rel']."' type='".$v['type']."'>\n";
		}
		return $return;
	}
	
	public function load_module ($get_header = NULL,$module_file = NULL,$generate_menu = FALSE) {
		//Add 3rd parameter bool (TRUE to generate menu, FALSE or omit to not)
		//Check to see if this has been called from child module
		if(($get_header===NULL)||($module_file===NULL)){
			if(!(parent::load_module($this->get_header(),__DIR__.DIRECTORY_SEPARATOR.$this->module_file,TRUE))){
				return FALSE;
			}
		}
		else {
			if(!(parent::load_module($get_header,$module_file,$generate_menu))){
				return FALSE;
			}
		}
		return TRUE;
	}
	//End required methods
	
	//Start custom methods
	
	//End custom methods
	
	//Start required table structure data
	//Use the following code to generate table data
	/*
	$data = array(0 => 0);//Change to 1 if tracked by blockchain
	$query = "DESCRIBE `%%TABLE_NAME%%`;";
	$result = mysqli_query($db,$query) or die(mysqli_error($db));
	while($row = mysqli_fetch_assoc($result)){
		$data[]=$row;
	}
	exit("<pre>".var_export($data)."</pre>");
	*/
	private $required_table_structure = array (
		
	);
	//End required table structure data
	
	//Start public fields
	//Fields in this area will be added to the public table so that they will be displayed in the public feed area
	//Format of each row: 0 => array ("table" => "", "title_field" => "", "description_field" => "","denotes_public_field" => "","denotes_public_value"=>"" )
	private $fields_marked_public = array (
		
	);
	//End public fields
	
	//Header Variable (each row contains info linking to a javascript script used by the module and inserted into the header)
	//Format of each row: 0 => array ("type" => "", "src" => "", "sri" => "")
	private $header_scripts = array (
		0 => array ("type" => "text/javascript", "src" => "js/custom/datepicker.js", "sri" => "sha384-AbJvjf2C2pgqlpImUmOmuW/mmbyLeKADFVtJynfREH6mETlFGqjxUyXLbDcVy7RY")
	);
	
	//Extra stylesheet information (each row contains a stylesheet to be loaded with the module
	//Format for each row: 0 => array ( "href" => "", "rel"=> "", "type"=>"" )
	private $stylesheets = array (
		0 => array ("href" => "js/custom/datepicker.css", "rel" => "stylesheet", "type" => "text/css")
	);
	
	//Main file to load -- fill in and update
	private $module_file = "recent_workouts.php";
	
}