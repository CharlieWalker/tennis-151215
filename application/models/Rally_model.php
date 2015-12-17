<?php
class Rally_model extends CI_Model {
       /*  [id]: INTEGER
            [id]: PRIMARY KEY
        [match_id]: INTEGER
        [round]: INTEGER
        [turn]: INTEGER
        [isSingle]: BOOLEAN
        [ARound]: INTEGER
        [BRound]: INTEGER
        [APoint]: INTEGER
        [BPoint]: INTEGER
        [serverPlayer]: INTEGER
        [receiverPlayer]: INTEGER
        [AFlick]: INTEGER
        [BFlick]: INTEGER
        [flick]: INTEGER
        [timeout]: BOOLEAN
        [foul]: BOOLEAN
        [rule]: BOOLEAN
        [actionSide]: CHAR(1)
        [actionPlayer]: INTEGER
        [f_APoint]: INTEGER
        [f_BPoint]: INTEGER
        [gameStart]: BOOLEAN
        [gameEnd]: BOOLEAN
        [matchStart]: BOOLEAN
        [matchEnd]: BOOLEAN
        [ts]: is_integer()*/
        public $id;  
        public $match_id;  
        public $round;  
        public $turn;  
        public $isSingle;  
        public $ARound;  
        public $BRound;  
        public $APoint;  
        public $BPoint;

        public $serverPlayer;  
        public $receiverPlayer;  
        public $AFlick;  
        public $BFlick;  

        public $flick;  
        public $timeout;  
        public $foul;  
        public $rule;  

        public $actionSide;  
        public $actionPlayer;  
        public $f_APoint;  
        public $f_BPoint;  

        public $gameStart;  
        public $gameEnd;  
        public $matchStart;  
        public $matchEnd;  

        public $ts;

        private $table = 'rally';

        public function __construct()
        {
                // Call the CI_Model constructor
                parent::__construct();
        }

        public function get_last_ten()
        {
                //$query = $this->db->get($this->table, 10);
            $query = $this->db->get($this->table);
                return $query->result();
        }

        public function insert_data($data)
        {
                $_d = array(
                        'id' => $data->id,
                        'match_id' => $data->match_id,
                        'round' => $data->round,
                        'turn' => $data->turn,
                        'isSingle' => $data->isSingle,
                        'ARound' => $data->ARound,
                        'BRound' => $data->BRound,
                        'APoint' => $data->APoint,
                        'BPoint' => $data->BPoint,
                        'serverPlayer' => $data->serverPlayer,
                        'receiverPlayer' => $data->receiverPlayer,
                        'AFlick' => $data->AFlick,
                        'BFlick' => $data->BFlick,
                        'flick' => $data->flick,
                        'timeout' => $data->timeout,
                        'foul' => $data->foul,
                        'rule' => $data->rule,
                        'actionSide' => $data->actionSide,
                        'actionPlayer' => $data->actionPlayer,
                        'f_APoint' => $data->f_APoint,
                        'f_BPoint' => $data->f_BPoint,
                        'gameStart' => $data->gameStart,
                        'gameEnd' => $data->gameEnd,
                        'matchStart' => $data->matchStart,
                        'matchEnd' => $data->matchEnd,
                        'ts' => $data->ts
                        );
                
                $this->db->insert($this->table, $_d);
        }

        public function update_data($id, $data)
        {
                $_d = array(
                        //'id' => $data->id,
                        //'match_id' => $data->match_id,
                        'round' => $data->round,
                        'turn' => $data->turn,
                        'isSingle' => $data->isSingle,
                        'ARound' => $data->ARound,
                        'BRound' => $data->BRound,
                        'APoint' => $data->APoint,
                        'BPoint' => $data->BPoint,
                        'serverPlayer' => $data->serverPlayer,
                        'receiverPlayer' => $data->receiverPlayer,
                        'AFlick' => $data->AFlick,
                        'BFlick' => $data->BFlick,
                        'flick' => $data->flick,
                        'timeout' => $data->timeout,
                        'foul' => $data->foul,
                        'rule' => $data->rule,
                        'actionSide' => $data->actionSide,
                        'actionPlayer' => $data->actionPlayer,
                        'f_APoint' => $data->f_APoint,
                        'f_BPoint' => $data->f_BPoint,
                        'gameStart' => $data->gameStart,
                        'gameEnd' => $data->gameEnd,
                        'matchStart' => $data->matchStart,
                        'matchEnd' => $data->matchEnd,
                        'ts' => $data->ts
                        );

                $this->db->update($this->table, $_d, array('id' => $id));
        }

        public function delete_data($id)
        {
                $this->db->where('id', $id);
                $this->db->delete($this->table);
        }

}