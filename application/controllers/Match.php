<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Match extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		//$this->load->view('welcome_message');
		$this->load->database();

		$this->load->model('match_model');

		if( $_SERVER['REQUEST_METHOD']=='POST' ){
			//add
			$this->addMatch();

		}elseif( $_SERVER['REQUEST_METHOD']=='PUT' ){
			//edit
			$this->editMatch();

		}elseif( $_SERVER['REQUEST_METHOD']=='DELETE' ){
			//remove
			$this->removeMatch();
			
		}elseif( $_SERVER['REQUEST_METHOD']=='GET' ){
			//fetch
			$this->getpage();
		}else{
			var_dump( $_SERVER['REQUEST_METHOD'] );
		}
	}

	public function addMatch()
	{
		$data = file_get_contents("php://input", 'r');
		$data = json_decode($data);

		$this->load->model('match_model');
		$this->match_model->insert_data($data);
		echo json_encode( array("success"=>true) );
	}

	public function getpage()
	{
		$this->load->model('match_model');
		echo json_encode( $this->match_model->get_last_ten() );
	}

	public function editMatch()
	{
		$data = file_get_contents("php://input", 'r');
		$data = json_decode($data);

		$this->load->model('match_model');
		$this->match_model->update_data($GLOBALS['params'][0], $data);
		echo json_encode( array("success"=>true) );
	}

	public function removeMatch()
	{
		$data = file_get_contents("php://input", 'r');
		$data = json_decode($data);

		$this->load->model('match_model');
		$this->match_model->delete_data($GLOBALS['params'][0]);
		echo json_encode( array("success"=>true) );
	}

}
