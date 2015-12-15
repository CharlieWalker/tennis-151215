<?php
class Match_model extends CI_Model {
        public $id;  
        public $gname;  
        public $gdate;  
        public $category;  
        public $gevent;  
        public $round;  
        public $gnum;  
        public $isSingle;  

        public $player11last;  
        public $player11first;  
        public $player11team;  
        public $player11genre;  

        public $player12last;  
        public $player12first;  
        public $player12team;  
        public $player12genre;  

        public $player21last;  
        public $player21first;  
        public $player21team;  
        public $player21genre;  

        public $player22last;  
        public $player22first;  
        public $player22team;  
        public $player22genre;  

        public $ts;

        private $table = 'match';

        public function __construct()
        {
                // Call the CI_Model constructor
                parent::__construct();
        }

        public function get_last_ten()
        {
                $query = $this->db->get($this->table, 10);
                return $query->result();
        }

        public function insert_data($data)
        {
                $this->id    = $data->id;
                $this->gname  = $data->gname;
                $this->gdate  = date('Y-m-j', $data->gdate);
                $this->category  = $data->category;
                $this->gevent  = $data->gevent;
                $this->round  = $data->round;
                $this->gnum  = $data->gnum;
                $this->isSingle  = $data->isSingle;

                $this->player11last  = $data->player11last;
                $this->player11first  = $data->player11first;
                $this->player11team  = $data->player11team;
                $this->player11genre  = $data->player11genre;

                $this->player12last  = $data->player12last;
                $this->player12first  = $data->player12first;
                $this->player12team  = $data->player12team;
                $this->player12genre  = $data->player12genre;

                $this->player21last  = $data->player21last;
                $this->player21first  = $data->player21first;
                $this->player21team  = $data->player21team;
                $this->player21genre  = $data->player21genre;

                $this->player22last  = $data->player22last;
                $this->player22first  = $data->player22first;
                $this->player22team  = $data->player22team;
                $this->player22genre  = $data->player22genre;

                $this->ts  = $data->ts;
                
                $this->db->insert($this->table, $this);
        }

        public function update_data($id, $data)
        {
                $_d = array(
                        'gname'  => $data->gname,
                        'gdate'  => date('Y-m-j', $data->gdate),
                        'category'  => $data->category,
                        'gevent'  => $data->gevent,
                        'round'  => $data->round,
                        'gnum'  => $data->gnum,
                        'isSingle'  => $data->isSingle,

                        'player11last'  => $data->player11last,
                        'player11first'  => $data->player11first,
                        'player11team'  => $data->player11team,
                        'player11genre'  => $data->player11genre,

                        'player12last'  => $data->player12last,
                        'player12first'  => $data->player12first,
                        'player12team'  => $data->player12team,
                        'player12genre'  => $data->player12genre,

                        'player21last'  => $data->player21last,
                        'player21first'  => $data->player21first,
                        'player21team'  => $data->player21team,
                        'player21genre'  => $data->player21genre,

                        'player22last'  => $data->player22last,
                        'player22first'  => $data->player22first,
                        'player22team'  => $data->player22team,
                        'player22genre'  => $data->player22genre,

                        'ts'  => $data->ts,
                );

                $this->db->update($this->table, $_d, array('id' => $id));
        }

        public function delete_data($id)
        {
                $this->db->where('id', $id);
                $this->db->delete($this->table);
        }

}