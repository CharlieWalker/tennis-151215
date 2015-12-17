<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Rally extends CI_Controller {

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

		$this->load->model('rally_model');

		if( $_SERVER['REQUEST_METHOD']=='POST' ){
			//add
			$this->addRally();

		}elseif( $_SERVER['REQUEST_METHOD']=='PUT' ){
			//edit
			$this->editRally();

		}elseif( $_SERVER['REQUEST_METHOD']=='DELETE' ){
			//remove
			$this->removeRally();
			
		}elseif( $_SERVER['REQUEST_METHOD']=='GET' ){
			//fetch
			$this->getpage();
		}else{
			var_dump( $_SERVER['REQUEST_METHOD'] );
		}
	}

	public function addRally()
	{
		$data = file_get_contents("php://input", 'r');
		$data = json_decode($data);

		$this->load->model('rally_model');
		$this->rally_model->insert_data($data);
		echo json_encode( array("success"=>true) );
	}

	public function getpage()
	{
		$this->load->model('rally_model');
		echo json_encode( $this->rally_model->get_last_ten() );
	}

	public function editRally()
	{
		$data = file_get_contents("php://input", 'r');
		$data = json_decode($data);

		$this->load->model('rally_model');
		$this->rally_model->update_data($GLOBALS['params'][0], $data);
		echo json_encode( array("success"=>true) );
	}

	public function removeRally()
	{
		$data = file_get_contents("php://input", 'r');
		$data = json_decode($data);
		$id = $GLOBALS['params'][0];

		$this->load->model('rally_model');
		$this->rally_model->delete_data($id);
		echo json_encode( array("success"=>true, 'id'=>$id)  );
	}

}
