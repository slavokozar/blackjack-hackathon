var game = {
    'speed' : 1500,
    'canHit' : false,
    'burntCard' : false,
    'initialized' : false,
    'aceValue' : null,
    'handPoints' : 0,
    'croupierPoints' : 0
};

var $deck = $('#deck');
var $discard = $('#discard');
var $hand = $('#hand');
var $croupier = $('#croupier');

$deck.find('.card').each(function(){
    var $card = $(this);

    $card.addClass('flipped').html(renderCard($card.data('value'), $card.data('suit')));
});

$('#game-start').click(function(){
    $('#game-overlay').remove();

    startGame();
});

function startGame(){
    if(!game.burntCard){
        //burn first card
        discard();

        game.burntCard = true;
        return;
    }

    var handCards = $hand.find('.card').length;
    var croupierCards = $croupier.find('.card').length;

    if(handCards == 2 && croupierCards == 2){
        var value = $croupier.find('.card').first().removeClass('flipped').data('value');

        $('#croupier-text span').html(blackjackValue(value));

        game.initialized = true;
    }else if(handCards == croupierCards){
        hit();
    }else if(handCards > croupierCards){
        croupier();
    }
}

$('#hit').click(function(){
    if(game.canHit){
        hit();
    }

});

$('#stand').click(function(){
    if(game.initialized){
        stand();
    }
});


function renderCard(value, suit){
    var symbols = {
        'club' : '♣',
        'diamond' : '♦',
        'spade' : '♠',
        'heart' : '♥'
    };
    var symbol = symbols[suit];

    var cards = {
        'back' : '<div class="card-back"><span class="middle_center"><img src="img/back.png"/></span></div>',
        '2' : '<div class="card-two ' + suit + '"><div class="corner top"><span class="number">2</span><span>' + symbol + '</span></div><span class="suit top_center">' + symbol + '</span><span class="suit bottom_center">' + symbol + '</span><div class="corner bottom"><span class="number">2</span><span>' + symbol + '</span></div></div>',
        '3' : '<div class="card-three ' + suit + '"><div class="corner top"><span class="number">3</span><span>' + symbol + '</span></div><span class="suit top_center">' + symbol + '</span><span class="suit middle_center">' + symbol + '</span><span class="suit bottom_center">' + symbol + '</span><div class="corner bottom"><span class="number">3</span><span>' + symbol + '</span></div></div>',
        '4' : '<div class="card-four ' + suit + '"><div class="corner top"><span class="number">4</span><span>' + symbol + '</span></div><span class="suit top_left">' + symbol + '</span><span class="suit top_right">' + symbol + '</span><span class="suit bottom_left">' + symbol + '</span><span class="suit bottom_right">' + symbol + '</span><div class="corner bottom"><span class="number">4</span><span>' + symbol + '</span></div></div>',
        '5' : '<div class="card-five ' + suit + '"><div class="corner top"><span class="number">5</span><span>' + symbol + '</span></div><span class="suit top_left">' + symbol + '</span><span class="suit top_right">' + symbol + '</span><span class="suit middle_center">' + symbol + '</span><span class="suit bottom_left">' + symbol + '</span><span class="suit bottom_right">' + symbol + '</span><div class="corner bottom"><span class="number">5</span><span>' + symbol + '</span></div></div>',
        '6' : '<div class="card-six ' + suit + '"><div class="corner top"><span class="number">6</span><span>' + symbol + '</span></div><span class="suit top_left">' + symbol + '</span><span class="suit top_right">' + symbol + '</span><span class="suit middle_left">' + symbol + '</span><span class="suit middle_right">' + symbol + '</span><span class="suit bottom_left">' + symbol + '</span><span class="suit bottom_right">' + symbol + '</span><div class="corner bottom"><span class="number">6</span><span>' + symbol + '</span></div></div>',
        '7' : '<div class="card-seven ' + suit + '"><div class="corner top"><span class="number">7</span><span>' + symbol + '</span></div><span class="suit top_left">' + symbol + '</span><span class="suit top_right">' + symbol + '</span><span class="suit middle_left">' + symbol + '</span><span class="suit middle_top">' + symbol + '</span><span class="suit middle_right">' + symbol + '</span><span class="suit bottom_left">' + symbol + '</span><span class="suit bottom_right">' + symbol + '</span><div class="corner bottom"><span class="number">7</span><span>' + symbol + '</span></div></div>',
        '8' : '<div class="card-eight ' + suit + '"><div class="corner top"><span class="number">8</span><span>' + symbol + '</span></div><span class="suit top_left">' + symbol + '</span><span class="suit top_right">' + symbol + '</span><span class="suit middle_left">' + symbol + '</span><span class="suit middle_top">' + symbol + '</span><span class="suit middle_right">' + symbol + '</span><span class="suit middle_bottom">' + symbol + '</span><span class="suit bottom_left">' + symbol + '</span><span class="suit bottom_right">' + symbol + '</span><div class="corner bottom"><span class="number">8</span><span>' + symbol + '</span></div></div>',
        '9' : '<div class="card-nine ' + suit + '"><div class="corner top"><span class="number">9</span><span>' + symbol + '</span></div><span class="suit top_left">' + symbol + '</span><span class="suit top_right">' + symbol + '</span><span class="suit middle_top_left">' + symbol + '</span><span class="suit middle_center">' + symbol + '</span><span class="suit middle_top_right">' + symbol + '</span><span class="suit bottom_left">' + symbol + '</span><span class="suit bottom_right">' + symbol + '</span><span class="suit middle_bottom_left">' + symbol + '</span><span class="suit middle_bottom_right">' + symbol + '</span><div class="corner bottom"><span class="number">9</span><span>' + symbol + '</span></div></div>',
        '10': '<div class="card-ten ' + suit + '"><div class="corner top"><span class="number">10</span><span>' + symbol + '</span></div><span class="suit top_left">' + symbol + '</span><span class="suit top_right">' + symbol + '</span><span class="suit middle_top_left">' + symbol + '</span><span class="suit middle_top_center">' + symbol + '</span><span class="suit middle_top_right">' + symbol + '</span><span class="suit bottom_left">' + symbol + '</span><span class="suit bottom_right">' + symbol + '</span><span class="suit middle_bottom_center">' + symbol + '</span><span class="suit middle_bottom_left">' + symbol + '</span><span class="suit middle_bottom_right">' + symbol + '</span><div class="corner bottom"><span class="number">10</span><span>' + symbol + '</span></div></div>',
        'J' : '<div class="card-jack ' + suit + '"><div class="corner top"><span class="number">J</span><span>' + symbol + '</span></div><span class="face middle_center"><img src="img/faces/face-jack-' + suit + '.png"/></span><div class="corner bottom"><span class="number">J</span><span>' + symbol + '</span></div></div>',
        'Q' : '<div class="card-queen ' + suit + '"><div class="corner top"><span class="number">Q</span><span>' + symbol + '</span></div><span class="face middle_center"><img src="img/faces/face-queen-' + suit + '.png"/></span><div class="corner bottom"><span class="number">Q</span><span>' + symbol + '</span></div></div>',
        'K' : '<div class="card-king ' + suit + '"><div class="corner top"><span class="number">K</span><span>' + symbol + '</span></div><span class="face middle_center"><img src="img/faces/face-king-' + suit + '.png"/></span><div class="corner bottom"><span class="number">K</span><span>' + symbol + '</span></div></div>',
        'A' : '<div class="card-ace ' + suit + '"><div class="corner top"><span class="number">A</span><span>' + symbol + '</span></div><span class="suit middle_center">' + symbol + '</span><div class="corner bottom"><span class="number">A</span><span>' + symbol + '</span></div></div>'
    }

    return cards[value];
}

function hit(){
    game.canHit = false;

    var $card = $deck.find('.card').last();

    var cardOffset = $card.offset()
    $card.detach().appendTo('body').css({
        'position' : 'absolute',
        'top' : cardOffset.top,
        'left' : cardOffset.left
    });

    $card.css('z-index', 10);


    $card.animate({
        left: ($hand.offset().left + ($hand.outerWidth() / 2) - ($card.outerWidth() / 2)) + 'px',
        top: $hand.offset().top + 'px'
    }, game.speed, function() {

        $card.detach().appendTo($hand).removeAttr('style').removeClass('flipped');
        game.canHit = true;



        if($card.data('value') == 'A' && game.aceValue == null){
            aceModal();
        }else{
            calculateHand();

            if(!game.initialized){
                startGame();
            }
        }
    });
}

function stand(){
    $croupier.find('.card').removeClass('flipped');

    calculateCroupier();
}

function discard(flip){
    var $card = $deck.find('.card').last();

    $card.css('z-index', 10);

    $card.animate({
        left: ($discard.offset().left - $deck.offset().left) + 'px',
    }, game.speed, function() {

        $card.detach().appendTo($discard).removeAttr('style');

        if(flip != null) $card.removeClass('flipped');

        if(!game.initialized){
            startGame();
        }
    });


}

function croupier(flip){
    var $card = $deck.find('.card').last();

    var cardOffset = $card.offset()
    $card.detach().appendTo('body').css({
        'position' : 'absolute',
        'top' : cardOffset.top,
        'left' : cardOffset.left
    });

    $card.css('z-index', 10);

    $card.animate({
        left: ($croupier.offset().left + ($croupier.outerWidth() / 2) - ($card.outerWidth() / 2)) + 'px',
        top: $croupier.offset().top + 'px'
    }, game.speed, function() {

        $card.detach().appendTo($croupier).removeAttr('style');

        if(flip != null) $card.removeClass('flipped');

        calculateCroupier();

        if(!game.initialized){
            startGame();
        }
    });
}

function calculateHand(){
    var sum = 0;

    $hand.find('.card').each(function(){
        var value = $(this).data('value');

        sum += blackjackValue(value);
    });

    $('#toolbar-text span').html(sum);

    game.handPoints = sum;

    if(sum == 21){
        console.log('standing');
        // stand();
    }else if(sum > 21){
        console.log('you lost');
        results('loose');
    }
}

function calculateCroupier(){
    var sum = 0;

    $croupier.find('.card').each(function(){
        var value = $(this).data('value');

        sum += blackjackValue(value);
    });

    game.croupierPoints = sum;

    if(game.initialized){
        $('#croupier-text span').html(sum);

        if(sum > 21){
            results('win');
        }else if(sum < 17){
            croupier(true);
        }else{
            if(game.croupierPoints > game.handPoints){
                results('loose');
            }else if(game.croupierPoints == game.handPoints){
                results('draw');
            }else if(game.croupierPoints < game.handPoints){
                results('win');
            }
        }
    }
}

function blackjackValue(value){
    if(value == 'J' || value == 'Q' || value == 'K'){
        value = 10;
    }else if(value == 'A'){
        value = game.aceValue;
    }

    return value;
}

function aceModal(){
    $('#ace-modal').modal('show');
}x  

$('#ace-modal .btn').click(function(){
    $('#ace-modal').modal('hide');
    game.aceValue = $(this).data('points');
    calculateHand();

    if(!game.initialized){
        startGame();
    }
});

function results(result){
    if(result == 'win'){

        var $result = $('<div id="game-overlay"><div class="wrapper"><h1>You won :)</h1></div></div>');

    }else if(result == 'loose'){

        var $result = $('<div id="game-overlay"><div class="wrapper"><h1>You lost :\'(</h1></div></div>');

    }else if(result == 'draw'){

        var $result = $('<div id="game-overlay"><div class="wrapper"><h1>It\'s a draw ;)</h1></div></div>');

    }

    setTimeout(function(){ $('body').append($result) }, game.speed);
}