$(document).ready(() => {
  const fallingAnimation = function (className, numFallingItems, ...imgURLstring) {
    const imgArray = imgURLstring.slice();
    let arrayIndex = 0;

    for (let i = 0; i < numFallingItems; i++) {
      arrayIndex = arrayIndex === imgArray.length ? 0 : arrayIndex;

      const browserWidth = $(window).width();
      const randomSpawnLocation = Math.floor(browserWidth * Math.random());

      const randomTimeDelay = Math.random() * 20;
      const randomFallSpeed = (Math.random() * 20) + 10;


      const imgSpan = $(`<span class=${className}>`)
        .css({
          left: randomSpawnLocation,
          top: '-150px',
          '-webkit-animation-delay': `${randomTimeDelay}s`,
          '-webkit-animation-duration': `${randomFallSpeed}s`,
        });

      $(imgSpan).prepend(`<img src=${imgArray[arrayIndex]} alt='falling image'>`);

      $('body').append(imgSpan);
      arrayIndex++;
    }
  };


  let count = 1;
  let playerCaseValue;
  const cases = [
    [1, 'https://i.imgur.com/duLAXL8.jpg'],
    [5, 'https://i.imgur.com/CZTEwI3.jpg'],
    [10, 'https://i.imgur.com/M5Rh1cn.jpg'],
    [15, 'https://i.imgur.com/gsZggyL.jpg'],
    [25, 'https://i.imgur.com/SNyxJiy.jpg'],
    [50, 'https://i.imgur.com/mTdRcTS.jpg'],
    [75, 'https://i.imgur.com/UJridqa.jpg'],
    [100, 'https://i.imgur.com/IojY5yn.jpg'],
    [200, 'https://i.imgur.com/q3kVqNM.jpg'],
    [300, 'https://i.imgur.com/BPUxm4D.jpg'],
    [400, 'https://i.imgur.com/9uA22XY.jpg'],
    [500, 'https://i.imgur.com/fpKWUsH.jpg'],
    [750, 'https://i.imgur.com/x43Fv5F.jpg'],
    [1000, 'https://i.imgur.com/e5X0ToS.jpg'],
    [5000, 'https://i.imgur.com/gcOpD5Y.jpg'],
    [10000, 'https://i.imgur.com/5STfKHn.jpg'],
    [25000, 'https://i.imgur.com/pqhnRkH.jpg'],
    [50000, 'https://i.imgur.com/shh9HfV.jpg'],
    [75000, 'https://i.imgur.com/7agP78q.jpg'],
    [100000, 'https://i.imgur.com/UYHtjMg.jpg'],
    [200000, 'https://i.imgur.com/zVUI8zp.jpg'],
    [300000, 'https://i.imgur.com/HhJQ66c.jpg'],
    [400000, 'https://i.imgur.com/jeUKcrc.jpg'],
    [500000, 'https://i.imgur.com/9PfGFqA.jpg'],
    [750000, 'https://i.imgur.com/LfOlOes.jpg'],
    [1000000, 'https://i.imgur.com/RNllA0l.jpg'],
  ];

  const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const randColor = function () {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  $('#randButton').on('click', () => {
    $('.rectangle').each(function () {
      $(this).css('background', randColor());
    });
  });

  $('#addSquares').click(() => {
    if (count < 25) { // limited number of squares for game
      const $rect = $('<div>', { id: `rect${count}`, class: 'rectangle' });
      $('.container').append($rect);
      $(`#rect${count}`).css('background-color', randColor());
      count++;
    }
  });

  $('#startGame').click(() => {
    $('.sideBar').remove();
    $('.rectangle').stop();
    $('.rectangle').remove();
    count = 0;

    alert('WELCOME TO DEAL OR NO DEAL: HACK REACTOR EDITION');

    for (var i = 0; i < 13; i++) {
      var $sideBar = $('<span>', { id: `briefcase_${cases[i][0]}`, class: 'sideBar' }).html(`$${numberWithCommas(cases[i][0])}`);
      $('.leftSide').append($sideBar).css('margin-left', -200).delay(200)
        .animate({
          marginLeft: '0',
        }, 400);
    }
    for (var i = 13; i < 26; i++) {
      var $sideBar = $('<span>', { id: `briefcase_${cases[i][0]}`, class: 'sideBar' }).html(`$${numberWithCommas(cases[i][0])}`);
      $('.rightSide').append($sideBar).css('margin-right', -200).delay(200)
        .animate({
          marginRight: '0',
        }, 400);
    }


    while (count < 25) {
      const $rect = $('<div>', { id: `rect${count}`, class: 'rectangle' });
      $('.container').append($rect);
      $(`#rect${count}`).css('background-color', randColor());
      count++;
    }

    const casesCopy = [...cases];
    let rectCount = 0;
    const shuffledCases = [];
    while (casesCopy.length > 0) {
      const caseIndex = Math.floor(Math.random() * casesCopy.length);
      shuffledCases.push(casesCopy[caseIndex]);
      casesCopy.splice(caseIndex, 1);
    }

    const getPlayerCase = (function askPlayerCase(fail) {
      const chooseCase = fail === false ? prompt('Choose a case number between 1 - 26.')
        : prompt('Your input was not between 1 - 26. Please choose again.');

      return (/^\d?\d$/.test(chooseCase)
    && chooseCase <= 26
    && chooseCase >= 1)
        ? chooseCase : askPlayerCase('again');
    }(false));

    const playerCaseArr = shuffledCases.splice(getPlayerCase, 1);
    playerCaseValue = playerCaseArr[0][0];

    for (let i = shuffledCases.length - 1; i >= 0; i--) {
      $(`#rect${rectCount}`).html(`${'<img class= cases draggable= false onmousedown = return false user-drag: none ' + 'id= '}` + `case${shuffledCases[i][0]}` + ` src=${shuffledCases[i][1]}>`);
      $('#cases').css('opacity', 0);
      shuffledCases.splice(i, 1);
      rectCount++;
    }

    alert('Pick 5 cases and wait for a call from the banker.');

    let lastPicked;
    let casesLeft = 26;
    let clickCount = 0;
    const clickedAlready = [];
    let valueLeft = 3418431;
    var gameOver;
    let bankerOffer;
    let roundNumber;
    let dealEvent;
    var gameOver;

    $('div .rectangle').on('click', function () {
      $(this).stop(true, false).slideUp('slow', function () {
        $(this).css('display', 'flex');
        $(this).css('background', 'transparent');
        const thisCase = $(`#${$(this).attr('id')} img:first`);
        lastPicked = $(thisCase).attr('id');
        const lastPickedNumOnly = Number(lastPicked.substring(4));
        if (!clickedAlready.includes(lastPickedNumOnly)) {
          clickedAlready.push(lastPickedNumOnly);

          casesLeft--;
          clickCount++;
          valueLeft -= lastPickedNumOnly;


          $(thisCase).css('opacity', 1);
          $(`#briefcase_${lastPickedNumOnly}`).fadeTo('fast', 0.2).delay(200, 'next').queue(() => {
            getOffer = function (remainCaseCount, remainValue, clickCount) {
              roundNumber = clickCount <= 5 ? 1
                : clickCount <= 10 ? 2
                  : clickCount <= 14 ? 3
                    : clickCount <= 17 ? 4
                      : clickCount <= 19 ? 5
                        : clickCount <= 20 ? 6
                          : clickCount <= 21 ? 7
                            : clickCount <= 22 ? 8
                              : clickCount <= 23 ? 9
                                : 10;
              dealEvent = [5, 10, 14, 17, 19, 20, 21, 22, 23].includes(clickCount);

              bankerOffer = (remainValue / remainCaseCount * (roundNumber / 10)).toFixed(2);
              bankerOffer = numberWithCommas(bankerOffer);

              if (dealEvent) {
                var dealOrNoDeal = confirm(`The Banker would like to offer you $${bankerOffer}. \nOr you can keep your case and keep playing. \nDEAL or NO DEAL (OK for DEAL. CANCEL for NO DEAL)?`);
              }
              return dealOrNoDeal;
            };

            const celebrateAnimation = function () {
              fallingAnimation('bills', 50, 'https://static1.squarespace.com/static/ta/522a22cbe4b04681b0bff826/3181/assets/images/photos/staff/john-michelin.jpg', 'https://d1qb2nb5cznatu.cloudfront.net/users/6080438-large?1499796283', 'https://pbs.twimg.com/profile_images/557695178194960384/WzRnLoFe_400x400.jpeg');
              $('div .rectangle').off('click');
            };


            gameOver = getOffer(casesLeft, valueLeft, clickCount);

            if (gameOver) {
              const tookDeal = numberWithCommas(playerCaseValue);
              alert(`You won $${bankerOffer}!!! \n Your chosen case had $${tookDeal}.`);


              celebrateAnimation();
            } else if (roundNumber === 10) {
              tradeCases = confirm('Would you like to keep your case or trade your case for the last unopened case? Click OK to trade. Click CANCEL to keep your case.');
              if (tradeCases) {
                const tradedCases = numberWithCommas(valueLeft - playerCaseValue);
                alert(`You traded cases. Hope it was a good decision! You take home $${tradedCases}!`);
                celebrateAnimation();
              } else {
                const yourCase = numberWithCommas(playerCaseValue);
                alert(`You stuck with your case the entire time! Enjoy your $${yourCase}!`);
              }
              celebrateAnimation();
            } else if (dealEvent) {
              const pickNum = [5, 4, 3, 2, 1, 1, 1, 1, 1];
              alert(`Pick ${pickNum[roundNumber - 1]} case(s) and then wait for a call from the banker.`);
            }
          });
        }
      });
    });
  });
});
