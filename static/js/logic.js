let blackjackGame = 
{
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',],
    'cardMap': {'2' : 2, '3' : 3, '4' : 4, '5' : 5, '6' : 6, '7' : 7, '8' : 8, '9' : 9, '10' : 10, 'J' : 10, 'Q' : 10, 'K' : 10, 'A' : [1,11]},
}

let winCounter = 0;
let loseCounter = 0;
let drawCounter = 0;

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const HIT_SOUND = new Audio('static/sounds/swish.m4a');
const FAIL_SOUND = new Audio('static/sounds/aww.mp3');
const WIN_SOUND = new Audio('static/sounds/cash.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjachHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjachHit()
{
    let card = randomCard();
    showCard(YOU, card);
    updateScore(YOU, card);
    showScore(YOU);
}

function blackjackDeal()
{
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for(var i = 0; i < dealerImages.length; i++)
    {
        dealerImages[i].remove();
    }

    for(var i = 0; i < yourImages.length; i++)
    {
        yourImages[i].remove();
    }

    computeWinner();

    YOU['score'] = 0;
    document.querySelector(YOU['scoreSpan']).textContent = YOU['score'];
    document.querySelector(YOU['scoreSpan']).style.color = 'white';

    DEALER['score'] = 0;
    document.querySelector(DEALER['scoreSpan']).textContent = DEALER['score'];
    document.querySelector(DEALER['scoreSpan']).style.color = 'white';
}

function showCard(activePlayer, card)
{
    if(activePlayer['score'] <= 21)
    {
        let cardImage = document.createElement('img');
        cardImage.src = 'static/img/' + card + '.png'
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        HIT_SOUND.play();
    }
}

function randomCard()
{
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function updateScore(activePlayer, card)
{
    if(activePlayer['score'] <= 21)
    {
        if(card === 'A')
        {
            if(activePlayer['score'] + blackjackGame['cardMap'][card][1] <= 21)
            {
                activePlayer['score'] += blackjackGame['cardMap'][card][1];
            }
            else
            {
                activePlayer['score'] += blackjackGame['cardMap'][card][0];
            }
        }
        else
        {
            activePlayer['score'] += blackjackGame['cardMap'][card];
        }
    }
}

function showScore(activePlayer)
{
    if(activePlayer['score'] > 21)
    {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
        console.log(activePlayer['score']);
    }
    else
    {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function dealerLogic()
{
    let card = randomCard();
    showCard(DEALER, card);
    updateScore(DEALER, card);
    showScore(DEALER);
}

function computeWinner()
{
    let result = document.querySelector('#blackjack-result');

    if((YOU['score'] <= 21) && (DEALER['score'] <= 21))
    {
        if(YOU['score'] < DEALER['score'])  loss(result);

        else if(YOU['score'] > DEALER['score']) win(result);

        else draw(result);
    }

    else if(YOU['score'] > 21)
    {
        if(DEALER['score'] < 21 && DEALER['score'] > 0) loss(result);

        else draw(result);
    }

    else
    {
        if(YOU['score'] < 21 && YOU['score'] > 0) win(result);

        else draw(result);
    }
}

function win(res)
{
    let wins = document.querySelector('#wins');

    res.textContent = 'YOU WIN!';
    res.style.color = 'green';
    winCounter++;
    wins.textContent = winCounter;
    WIN_SOUND.play();
}

function loss(res)
{
    let losses = document.querySelector('#losses');

    res.textContent = 'YOU LOST';
    res.style.color = 'red';
    loseCounter++;
    losses.textContent = loseCounter;
    FAIL_SOUND.play();
}

function draw(res)
{
    let draws = document.querySelector('#draws');

    res.textContent = 'DRAW';
    res.style.color = 'orange';
    drawCounter++;
    draws.textContent = drawCounter;
}