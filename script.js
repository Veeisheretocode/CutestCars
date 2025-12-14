//here ill put my logic for loading screen alright
//this will make it disappear after screen is loaded tbh
var loadingScreen = document.querySelector(".loadingScreen");
window.addEventListener('load', function() {
  loadingScreen.style.display = 'none';
})


//timer section
function updateTimer() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); //when tomorrow happend clock sets to 0000

    const distance = tomorrow - now;
//this is so that on ext day clock will not get confused and think tomorrow is already yesterday now
    if (distance < 0) {
        tomorrow.setDate(now.getDate() + 2);
        tomorrow.setHours(0, 0, 0, 0);
        const newDistance = tomorrow - now;
        updateDisplay(newDistance);
    } else {
        updateDisplay(distance);
    }
}

function updateDisplay(distance) {
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
}

updateTimer();//this is the main function running basically
setInterval(updateTimer, 1000); //contatly updating the timer


//image change daily after midnight-

//my image array
const images = [
  "images/img1.jpg",
  "images/img2.jpg",
  "images/img3.jpg",
  "images/img4.jpg",
  "images/img5.jpg",
  "images/img6.jpg",
  "images/img7.jpg",
  "images/img8.jpg",
  "images/img9.jpg",
];

//decide which image to show today based on the date
function getTodayImageIndex() {
  const today = new Date();

  const startOfYear = new Date(today.getFullYear(), 0, 1);
  // Days passed since start of year
  const daysSinceStart =
    Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24));
  // Map day number to image index (cycle through images)
  const index = daysSinceStart % images.length;
  return index;
}

//this will get the image for today
function setImageForToday() {
  const imgEl = document.getElementById("dailyImage");
  if (!imgEl) return; 
  const index = getTodayImageIndex();
  imgEl.src = images[index];
}

//calculate how long until the next midnight
function msUntilNextMidnight() {
  const now = new Date();
  const tomorrowMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0,
    0
  );
  return tomorrowMidnight - now;
}

//automatic change at midnight
function scheduleMidnightUpdate() {
  const timeToMidnight = msUntilNextMidnight();

  setTimeout(() => {
    // Change image for the new day
    setImageForToday();

    // After that, change every 24 hours
    setInterval(setImageForToday, 24 * 60 * 60 * 1000);
  }, timeToMidnight);
}

//Run on page load
setImageForToday();
scheduleMidnightUpdate();


