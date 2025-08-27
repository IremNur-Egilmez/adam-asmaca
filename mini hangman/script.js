let oyunBitti = false;                       // Oyun durumunu tutar: true olursa klavye girişleri işlenmez (oyun kilitlenir).

const kelimeler = ["masa", "sandalye", "bilgisayar", "klavye", "lamba"]; // Olası gizli kelimelerin listesi (oyun bu diziden rastgele seçecek).
let gizliKelime = kelimeler[Math.floor(Math.random() * kelimeler.length)]; // 0..length-1 arasında rastgele bir indeks seçip o kelimeyi alır.
let correctLetters = [];                     // Doğru tahmin edilmiş harfler burada birikir (tekrar eklenmemesi için dizi kontrol edilir).
let wrongLetters = [];                       // Yanlış tahmin edilen harfler burada toplanır (hak hesaplamasında kullanılır).
const maxHak = 6;                            // Maksimum yanlış tahmin sayısı (0'dan sayıldığı için 6 yanlışta oyun biter).

function kelimeyiGuncelle() {
  const kelimeAlani = document.getElementById("word"); // Kelimenin gösterildiği kapsayıcı (her harf için <span> oluşturulacak).
  kelimeAlani.innerHTML = gizliKelime                  // Gizli kelimeyi karakterlerine ayır (ör. "masa" -> ["m","a","s","a"])
    .split("")
    .map((harf) =>                                     // Her harf için bir <span> üret.
      `<span>${correctLetters.includes(harf) ? harf : ""}</span>` 
      // Eğer ilgili harf doğru tahmin listesinde varsa harfi göster, yoksa boş string koy (alt çizgi yerine boş gösterim).
    )
    .join("");                                         // Elde edilen HTML parçalarını bitiştirip tek bir string haline getir.
}

function yanlisHarfleriGuncelle() {
  const yanlisAlani = document.getElementById("wrong-letters"); // Yanlış harflerin yazılacağı alanı yakala.
  yanlisAlani.innerText = `Yanlış harfler: ${wrongLetters.join(", ")}`; // Yanlış harfleri virgülle ayırıp tek satırda göster.
}

function kalanHakGuncelle() {
  const hakAlani = document.getElementById("kalan-hak"); // Kalan hak bilgisini gösterecek element.
  hakAlani.textContent = `Kalan Hakkın: ${maxHak - wrongLetters.length}`; // Max hakkın içinden yapılan yanlış sayısını düş.
}

function oyunuKontrolEt() {
  const kelimeAlani = document.getElementById("word");   // Ekrandaki <span> lerin bulunduğu kapsayıcı.
  const mesajAlani = document.getElementById("message"); // Kazanma/kaybetme mesajlarının gösterileceği element.
  const gösterilenKelime = Array.from(kelimeAlani.children) // <word> içindeki tüm çocukları (span) bir diziye çevir.
    .map((span) => span.textContent)                     // Her span içindeki karakteri al (doğru tahmin edilmemişse boş olabilir).
    .join("");                                           // Harfleri sırayla birleştirerek ekranda görünen kelimeyi oluştur.

  if (gösterilenKelime === gizliKelime) {                // Ekranda görünen (tahmin edilmiş) kelime, gizli kelimeyle aynısı ise:
    mesajAlani.textContent = "🎉 Tebrikler! Kelimeyi buldun!"; // Kazanma mesajı göster.
    mesajAlani.style.color = "green";                    // Mesajı yeşil renkle vurgula.
    oyunBitti = true;                                    // Oyun bitti: artık klavye girişleri işlenmez.
  }

  if (wrongLetters.length === maxHak) {                  // Yanlış sayısı maksimuma ulaştıysa:
    mesajAlani.textContent = `😢 Kaybettin! Doğru kelime: ${gizliKelime}`; // Kaybetme mesajı ve doğru kelimeyi göster.
    mesajAlani.style.color = "red";                      // Mesajı kırmızı renkle vurgula.
    oyunBitti = true;                                    // Oyun kilitlenir.
  }
}

function oyunuYenidenBaslat() {
  oyunBitti = false;                                     // Oyunu yeniden başlatırken kilidi kaldır.
  correctLetters = [];                                   // Doğru harfler listesini sıfırla.
  wrongLetters = [];                                     // Yanlış harfler listesini sıfırla.
  gizliKelime = kelimeler[Math.floor(Math.random() * kelimeler.length)]; // Yeni bir rastgele kelime seç.

  kelimeyiGuncelle();                                    // Ekrandaki kelime görünümünü (boş/uygun) yeniden çiz.
  yanlisHarfleriGuncelle();                              // Yanlış harf alanını temizle/güncelle.
  kalanHakGuncelle();                                    // Kalan hak bilgisini yenile.

  const mesajAlani = document.getElementById("message"); // Mesaj alanını da sıfırla.
  mesajAlani.textContent = "";                           // Herhangi bir kazanma/kaybetme mesajı olmasın.
  mesajAlani.style.color = "black";                      // Mesaj rengini varsayılana çek.
}

window.addEventListener("keydown", function (e) {        // Tüm pencere için klavye tuşu dinleyicisi ekle.
  if (oyunBitti) return;                                 // Oyun bittiyse hiçbir giriş işlenmesin (erken çıkış).

  const harf = e.key.toLowerCase();                      // Basılan tuşun karakterini al, küçük harfe çevir (Türkçe dahil).

  if (harf.match(/^[a-zçğıöşü]$/)) {                     // Sadece tek harften oluşan (a..z ve Türkçe karakterler) girişleri kabul et.
    if (gizliKelime.includes(harf)) {                    // Basılan harf gizli kelimede var mı?
      if (!correctLetters.includes(harf)) {              // Daha önce doğru harflere eklenmemişse (tekrar eklemeyi engeller).
        correctLetters.push(harf);                       // Doğru harfler listesine ekle.
        kelimeyiGuncelle();                              // Ekranda kelime görünümünü güncelle (açılan harfleri göster).
        oyunuKontrolEt();                                // Kazanma durumu oluştu mu kontrol et.
      }
    } else {                                             // Harf gizli kelimede yoksa:
      if (!wrongLetters.includes(harf)) {                // Aynı yanlış harfi ikinci kez eklememek için kontrol et.
        wrongLetters.push(harf);                         // Yanlış harfler listesine ekle.
        yanlisHarfleriGuncelle();                        // Yanlış harfler alanını güncelle.
        kalanHakGuncelle();                              // Kalan hak sayısını güncelle.
        oyunuKontrolEt();                                // Kaybetme durumu oluştu mu kontrol et.
      }
    }
  }
});

document.getElementById("restart").addEventListener("click", oyunuYenidenBaslat);
// "Yeniden Başlat" butonuna tıklanınca oyunu başlatan fonksiyonu çalıştır (tüm state'i sıfırlar).

// İlk ekran yüklemesi: Sayfa açılır açılmaz başlangıç durumunu oluştur.
kelimeyiGuncelle();                                      // Kelime görselini (boş span'lar) çiz.
kalanHakGuncelle();                                      // Başlangıçta kalan hakları göster.
