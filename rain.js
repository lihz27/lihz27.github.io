const fallingAnimation = function (className, numFallingItems, ...imgURLstring) {
  const imgArray = imgURLstring.slice();
  let arrayIndex = 0;

  for (let i = 0; i < numFallingItems; i++) {
    arrayIndex = arrayIndex === imgArray.length ? 0 : arrayIndex;

    const browserWidth = $(window).width();
    const randomSpawnLocation = Math.floor(browserWidth * Math.random());

    const randomTimeDelay = Math.random() * 20;
    const randomFallSpeed = Math.random() * 20 + 10;

    const imgSpan = $(`<span class=${className}>`).css({
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
