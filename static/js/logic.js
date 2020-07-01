let blackjackGame = 
{
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',],
    'cardMap': {'2' : 2, '3' : 3, '4' : 4, '5' : 5, '6' : 6, '7' : 7, '8' : 8, '9' : 9, '10' : 10, 'J' : 10, 'Q' : 10, 'K' : 10, 'A' : [1,11]},
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const HIT_SOUND = new Audio('static/sounds/swish.m4a');
const FAIL_SOUND = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjachHit);
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
    console.log('Score: ' + activePlayer['score']);
}

function showScore(activePlayer)
{
    if(activePlayer['score'] > 21)
    {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else
    {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

