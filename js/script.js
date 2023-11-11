const tanah = document.querySelectorAll(".tanah");
const tikus = document.querySelectorAll(".tikus");
const score = document.querySelector(".score");
const pop = document.querySelector("#pop");

let tanahSebelum;
let selesai;
let skor;

// fungsi untuk membuat random tempat tikus muncul
function randomTanah(tanah) {
  const t = Math.floor(Math.random() * tanah.length);
  const tanahRandom = tanah[t];
  if (tanahRandom == tanahSebelum) {
    randomTanah(tanah);
  }
  tanahSebelum = tanahRandom;
  return tanahRandom;
}

// function untuk membuat random waktu munculnya tikus
function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// function untuk memunculkan tikus sesuai dengan hasil lokasi tanah random
function tikusMuncul() {
  const tanahRandom = randomTanah(tanah);
  const wRandom = randomWaktu(300, 1000); //300 & 1000 adalam milisecond
  tanahRandom.classList.add("muncul");

  setTimeout(() => {
    tanahRandom.classList.remove("muncul");
    if (!selesai) {
      tikusMuncul();
    }
  }, wRandom);
}

//function untuk memulai waktu
function mulai() {
  selesai = false;
  skor = 0;
  score.textContent = 0;
  tikusMuncul();
  setTimeout(() => {
    selesai = true;
  }, 20000);
}

// function untuk memukul
function pukul() {
  skor++;
  this.parentNode.classList.remove("muncul");
  this.style.transition = "TOP 0s";
  pop.play();
  score.textContent = skor;
}

tikus.forEach((t) => {
  t.addEventListener("click", pukul);
});
