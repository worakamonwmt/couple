let noClickCount = 0;
const questions = [
    "ไม่คิดบ้างเหรอ?",
    "แน่ใจหรือ?",
    "ไม่เปลี่ยนใจจริงๆ นะ?",
    "ยังคิดว่าไม่อยู่ใช่ไหม?",
    "คิดดีแล้วใช่ไหม?",
    "ครั้งสุดท้ายแล้วนะ?",
    "นี่คือการตัดสินใจครั้งสุดท้ายจริงๆ นะ?"
];

document.addEventListener("DOMContentLoaded", function() {
    showInitialMeme();
});

function showInitialMeme() {
    const initialImageUrl = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmEybnNlMG1nMnViOWY1eGUwZDhyMjljdTA1anU5NnptM2M0ZWNiciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ybEXZcycd789q/giphy.gif'; 
    document.getElementById('meme').src = initialImageUrl;
}

function handleNoClick() {
    noClickCount++;

    if (noClickCount <= questions.length) {
        changeQuestion();
    }

    if (noClickCount < 7) {
        fetchRandomCryMeme();
    } else if (noClickCount === 7) {
        showScaryVideo();
    }
}

function changeQuestion() {
    if (noClickCount <= questions.length) {
        document.getElementById('question-text').innerText = questions[noClickCount - 1];
    }
}

async function fetchRandomCryMeme() {
    const apiKey = 'Nn1KwpIR4TqiicN3Y3DEIBAWMyWg6x9Y'; 
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/random?tag=sad&api_key=${apiKey}&rating=g`);
        const data = await response.json();
        const imageUrl = data.data.images.original.url;
        document.getElementById('meme').src = imageUrl;
    } catch (error) {
        console.error('Error fetching the meme:', error);
    }
}

function showScaryVideo() {
    const videoId = '2fwGR1vdYrs'; 
    showYouTubeVideo(videoId);
}

function handleYesClick() {
    const videoId = 'uyidwhqRkZw'; 
    showYouTubeVideo(videoId);
}

function showYouTubeVideo(videoId) {
    const iframe = document.createElement('iframe');

    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100vw';
    iframe.style.height = '100vh';
    iframe.style.zIndex = '9999';
    iframe.allow = 'autoplay';

    document.body.appendChild(iframe);

    // Remove the iframe after the video ends
    iframe.onended = function() {
        document.body.removeChild(iframe);
    };
}
