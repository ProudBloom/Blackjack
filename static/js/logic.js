let blackjackGame = 
{
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',],
    'cardMap': {'2' : 2, '3' : 3, '4' : 4, '5' : 5, '6' : 6, '7' : 7, '8' : 8, '9' : 9, '10' : 10, 'J' : 10, 'Q' : 10, 'K' : 10, 'A' : [1,11]},
    'winCounter' : 0,
    'loseCounter' : 0,
    'drawCounter' : 0,
    'isStand': false,
    'isTurnOver': false,

}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const HIT_SOUND = new Audio('static/sounds/swish.m4a');
const FAIL_SOUND = new Audio('static/sounds/aww.mp3');
const WIN_SOUND = new Audio('static/sounds/cash.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjachHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', blackjackStand);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjachHit()
{
    let card = randomCard();
    if(blackjackGame['isStand'] === false)
    {
        showCard(YOU, card);
        updateScore(YOU, card);
        showScore(YOU);
    }
}

function blackjackStand()
{
    dealerLogic();
}

function blackjackDeal()
{
    if(blackjackGame['isTurnOver'])
    {
        blackjackGame['isStand'] = false;
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
    
        YOU['score'] = 0;
        document.querySelector(YOU['scoreSpan']).textContent = YOU['score'];
        document.querySelector(YOU['scoreSpan']).style.color = 'white';
    
        DEALER['score'] = 0;
        document.querySelector(DEALER['scoreSpan']).textContent = DEALER['score'];
        document.querySelector(DEALER['scoreSpan']).style.color = 'white';
    
        document.querySelector('#blackjack-result').textContent = 'Let\'s play!';
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['isTurnOver'] = true;
    }
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

async function dealerLogic()
{
    blackjackGame['isStand'] = true;

    while(DEALER['score'] <= 16 && blackjackGame['isStand'] && YOU['score'] > 0)
    {
        let card = randomCard();
        showCard(DEALER, card);
        updateScore(DEALER, card);
        showScore(DEALER);
        await sleep(500);
    }

    blackjackGame['isTurnOver'] = true;
    computeWinner();
}

function computeWinner()
{
    let result = document.querySelector('#blackjack-result');
    
    if(blackjackGame['isTurnOver'])
    {
        if(YOU['score'] <= 21 && DEALER['score'] <= 21)
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

}

function win(res)
{
    let wins = document.querySelector('#wins');

    res.textContent = 'YOU WIN!';
    res.style.color = 'green';
    blackjackGame['winCounter']++;
    wins.textContent = blackjackGame['winCounter'];
    WIN_SOUND.play();
}

function loss(res)
{
    let losses = document.querySelector('#losses');

    res.textContent = 'YOU LOST';
    res.style.color = 'red';
    blackjackGame['loseCounter']++;
    losses.textContent = blackjackGame['loseCounter'];
    FAIL_SOUND.play();
}

function draw(res)
{
    let draws = document.querySelector('#draws');

    res.textContent = 'DRAW';
    res.style.color = 'orange';
    blackjackGame['drawCounter']++;
    draws.textContent = blackjackGame['drawCounter'];
}

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.querySelector('#play-btt').addEventListener('click', closeMenu);
document.querySelector('#navigate-to-menu-btt').addEventListener('click', showMenu);

document.querySelector('#rules-btt').addEventListener('click', showRules);
document.querySelector('#close-rules-btt').addEventListener('click', closeRules);

function closeMenu()
{
    document.querySelector('.menu').style.display = 'none';
}

function showMenu()
{
    document.querySelector('.menu').style.display = 'flex';
}

function closeRules()
{
    document.querySelector('.rules').style.display = 'none';
}

function showRules()
{
    document.querySelector('.rules').style.display = 'flex';
}