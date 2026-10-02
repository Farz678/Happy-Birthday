const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const glow = $('.cursor-glow');
document.addEventListener('mousemove', (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const musicBtn = $('#musicBtn');
const musicArrow = $('.music-arrow');

// Ambil nama lagu dari atribut data-song di setiap HTML
const songPath = document.body.dataset.song;
const backgroundMusic = songPath ? new Audio(songPath) : null;

if (backgroundMusic) {
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.35;
}

// Tombol panah untuk akses keyboard
musicArrow?.addEventListener('click', () => {
  musicBtn?.focus();
});

musicBtn?.addEventListener('click', async () => {
  if (!backgroundMusic) {
    console.error('Lagu belum diatur! Periksa atribut data-song di HTML.');
    return;
  }

  try {
    if (backgroundMusic.paused) {
      await backgroundMusic.play();
      musicBtn.classList.add('playing');
      musicBtn.textContent = '♫';
    } else {
      backgroundMusic.pause();
      musicBtn.classList.remove('playing');
      musicBtn.textContent = '♪';
    }
  } catch (error) {
    console.error('Music could not be played:', error);
  }
});

const birthdayDate = new Date('2026-12-01T00:00:00').getTime();
function updateCountdown() {
  const countdown = $('#countdown');
  if (!countdown) return;

  const difference = Math.max(birthdayDate - Date.now(), 0);
  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference % 86400000) / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);
  const seconds = Math.floor((difference % 60000) / 1000);

  $('#days').textContent = String(days).padStart(2, '0');
  $('#hours').textContent = String(hours).padStart(2, '0');
  $('#mins').textContent = String(minutes).padStart(2, '0');
  $('#secs').textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

const reasons = [
  'Your gentle heart.',
  'Your beautifully unique mind.',
  'You feel like home.',
  'The peace you bring me.',
  'Your words heal more than you know.',
  'You know how to calm my storms.',
  'Your long texts mean the world to me.',
  'You believe in me when I struggle.',
  'You make hard days feel lighter.',
  'You remind me Im doing enough.',
  'Your silly little gaming noises.',
  'Every random sound you make.',
  'Your cute, changing voices.',
  'How you make me laugh without trying.',
  'You are my favorite teammate.',
  'Even silence feels nice with you.',
  'I love the way you see things.',
  'You make me feel understood.',
  'You care in the smallest ways.',
  'You make ordinary moments special.',
  'I can be myself around you.',
  'You make my heart feel safe.',
  'I admire your thoughtful heart.',
  'You make distance feel smaller.',
  'There is no one quite like you.',
  'I love growing alongside you.',
  'I want more little moments with you.',
  'I want to cheer for you, too.',
  'You deserve all the love I have.',
  'Because you are you, my Lila.',
];

const reasonGrid = $('#reasonGrid');
if (reasonGrid) {
  const imageFolder = reasonGrid.dataset.imageFolder || 'assets';
  const reasonImages = Array.from({ length: 30 }, (_, index) => `${imageFolder}/${index + 1}.jpg`);

reasonGrid.innerHTML = reasons.slice(0, 30)
    .map((reason, index) => {
      const image = reasonImages[index % reasonImages.length];
      return `
      <article class="reason-card reveal" tabindex="0">
        <div class="reason-inner">
          <div class="reason-front">
            <h3>${index + 1}</h3>
            <p>tap love note</p>
          </div>
          <div class="reason-back" style="background-image: linear-gradient(to bottom, rgba(62,50,50,.08), rgba(62,50,50,.18) 45%, rgba(62,50,50,.78)), url('${image}');">
            <p>${reason}</p>
          </div>
        </div>
      </article>`;
    })
    .join('');
}

$('#randomReasonBtn')?.addEventListener('click', () => {
  $('#randomReason').textContent = reasons[Math.floor(Math.random() * reasons.length)];
});

const envelope = $('#envelope');
const letterText = `If I could give you one thing, I'd let you see yourself through my eyes, even just for a moment. Maybe then you'd understand why you mean so much to me.
I love your gentle heart, your beautiful mind, and all the little things that make you, you. The silly noises, your random 'arghh', and the way you make ordinary moments feel like memories worth keeping. Somehow, even on my heaviest days, you make the world feel a little softer.
I hope you never feel like you have to be perfect to deserve love. You can have your bad days, chase your dreams, and take your time figuring life out. I'll always want to see you grow, find happiness, and become the person you've always wanted to be.
Happy birthday, my love. May this new chapter bring you the gentleness you give to others, the happiness your heart deserves, and countless little reasons to smile.
And if life gave me a thousand chances to begin again, I'd still hope that somehow, in every universe, I'd find my way to you.
I love you, always. ♡`;
let hasTypedLetter = false;

envelope?.addEventListener('click', () => {
  envelope.classList.add('open');
  if (hasTypedLetter) return;

  hasTypedLetter = true;
  let index = 0;
  const typedLetter = $('#typedLetter');
  const typing = setInterval(() => {
    typedLetter.textContent += letterText[index] || '';
    index += 1;
    if (index > letterText.length) clearInterval(typing);
  }, 65);
});

const cake = $('#birthdayCake') || $('.cake');
const cutCakeBtn = $('.cut-cake-btn');
const cakeStageText = $('#cakeStageText');
let cakeAnimationStarted = false;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

cutCakeBtn?.addEventListener('click', async () => {
  if (!cake || cakeAnimationStarted) return;

  cakeAnimationStarted = true;
  cutCakeBtn.disabled = true;

  cakeStageText.textContent = 'blowing the candles... 🌬️';
  cutCakeBtn.textContent = 'Blowing Candles...';
  cake.classList.add('blow');
  await wait(1500);

  cakeStageText.textContent = ' cake is cutting 🔪';
  cutCakeBtn.textContent = '';
  cake.classList.add('knife-in');
  await wait(1200);

  cakeStageText.textContent = ' into a slice... 🍰';
  cutCakeBtn.textContent = 'Cutting Slice...';
  cake.classList.add('sliced');
  await wait(900);

  cakeStageText.textContent = 'first slice for my Lalaboooo 🎉';
  cutCakeBtn.textContent = 'Cake Cut 🎉';

  if (typeof confetti === 'function') {
    confetti({ particleCount: 280, spread: 115, origin: { y: 0.62 } });
  }
});
