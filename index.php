<?php
    namespace blackjack;

    require('card.php');

    $suits = ['heart', 'spade', 'club', 'diamond'];
    $values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];

    $deck = [];
    foreach ($suits as $suit) {
        foreach ($values as $value) {

            $deck[] = new card($suit, $value);
        }
    }

    shuffle($deck);

?>

<html>
<head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
    <link rel="stylesheet" href="css/playingcards.css" />
    <link rel="stylesheet" href="css/blackjack.css" />

</head>
<body>
<div id="heading">
    <h1>BlackJack</h1>
</div>
<div id="wrapper">
    <div id="croupier"></div>

    <div id="croupier-text"><span>0</span> Points</div>

    <div id="middle">
        <div id="deck-wrapper">
            <div id="deck">
                <div class="card-empty"></div>
                <?php
                    foreach($deck as $card){
                        echo $card;
                    }
                ?>
            </div>
        </div>

        <div id="discard-wrapper">
            <div id="discard">
                <div class="card-empty"></div>
            </div>
        </div>

    </div>

    <div id="hand"></div>

    <div id="toolbar">
        <button type="button" class="btn btn-primary" id="hit">HIT</button>
        <span id="toolbar-text"><span>0</span> Points on hand</span>

        <button type="button" class="btn btn-danger" id="stand">STAND</button>
    </div>
</div>



<div id="ace-modal" class="modal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">You hit Ace!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>It's up to you how you want to count Aces on your hand...</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-points="1"><span>1</span> point</button>
                <button type="button" class="btn btn-primary" data-points="11"><span>11</span> points</button>
            </div>
        </div>
    </div>
</div>

<div id="game-overlay">
    <div class="wrapper">
        <button id="game-start" class="btn btn-lg btn-primary">Start Game</button>
    </div>
</div>


<script src="https://code.jquery.com/jquery-3.2.1.js" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
<script src="js/blackjack.js"></script>

</body>
</html>