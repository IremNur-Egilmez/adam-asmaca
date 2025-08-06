let oyunBitti = false;

const kelimeler = ["masa", "sandalye", "bilgisayar", "klavye", "lamba"];
let gizliKelime = kelimeler[Math.floor(Math.random() * kelimeler.length)];
let correctLetters = [];
let wrongLetters = [];
const maxHak = 6;

function kelimeyiGuncelle() {
  const kelimeAlani = document.getElementById("word");
  kelimeAlani.innerHTML = gizliKelime
    .split("")
    .map((harf) =>
      `<span>${correctLetters.includes(harf) ? harf : ""}</span>`
    )
    .join("");
}

function yanlisHarfleriGuncelle() {
  const yanlisAlani = document.getElementById("wrong-letters");
  yanlisAlani.innerText = `Yanlış harfler: ${wrongLetters.join(", ")}`;
}

function kalanHakGuncelle() {
  const hakAlani = document.getElementById("kalan-hak");
  hakAlani.textContent = `Kalan Hakkın: ${maxHak - wrongLetters.length}`;
}

function oyunuKontrolEt() {
  const kelimeAlani = document.getElementById("word");
  const mesajAlani = document.getElementById("message");
  const gösterilenKelime = Array.from(kelimeAlani.children)
    .map((span) => span.textContent)
    .join("");

  if (gösterilenKelime === gizliKelime) {
    mesajAlani.textContent = "🎉 Tebrikler! Kelimeyi buldun!";
    mesajAlani.style.color = "green";
    oyunBitti = true;
  }

  if (wrongLetters.length === maxHak) {
    mesajAlani.textContent = `😢 Kaybettin! Doğru kelime: ${gizliKelime}`;
    mesajAlani.style.color = "red";
    oyunBitti = true;
  }
}

function oyunuYenidenBaslat() {
  oyunBitti = false;
  correctLetters = [];
  wrongLetters = [];
  gizliKelime = kelimeler[Math.floor(Math.random() * kelimeler.length)];

  kelimeyiGuncelle();
  yanlisHarfleriGuncelle();
  kalanHakGuncelle();

  const mesajAlani = document.getElementById("message");
  mesajAlani.textContent = "";
  mesajAlani.style.color = "black";
}

window.addEventListener("keydown", function (e) {
  if (oyunBitti) return;

  const harf = e.key.toLowerCase();

  if (harf.match(/^[a-zçğıöşü]$/)) {
    if (gizliKelime.includes(harf)) {
      if (!correctLetters.includes(harf)) {
        correctLetters.push(harf);
        kelimeyiGuncelle();
        oyunuKontrolEt();
      }
    } else {
      if (!wrongLetters.includes(harf)) {
        wrongLetters.push(harf);
        yanlisHarfleriGuncelle();
        kalanHakGuncelle();
        oyunuKontrolEt();
      }
    }
  }
});

document.getElementById("restart").addEventListener("click", oyunuYenidenBaslat);

// İlk ekran yüklemesi
kelimeyiGuncelle();
kalanHakGuncelle();
