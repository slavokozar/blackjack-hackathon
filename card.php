<?php
namespace blackjack;

class card
{
    // properties of each particular card
    public $suit = null; // hearts, spades, clubs, diamonds
    public $value = null; // 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A
    public $blackjack_value = null; // 1-11

    public function __construct($suit, $value)
    {
        $this->suit = $suit;
        $this->value = $value;
    }

    public function __toString()
    {
        return '<div class="card" data-suit="'.$this->suit.'" data-value="'.$this->value.'"></div>';
    }
}