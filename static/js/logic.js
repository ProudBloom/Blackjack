let blackjackGame = 
{
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',],
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const HIT_SOUND = new Audio('static/sounds/swish.m4a');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjachHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjachHit()
{
    let card = randomCard();
    showCard(YOU, card);
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
}

function showCard(activePlayer, card)
{
    let cardImage = document.createElement('img');
    cardImage.src = 'static/img/' + card + '.png'
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    HIT_SOUND.play();
}

function randomCard()
{
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}