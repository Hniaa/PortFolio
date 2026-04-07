
        const chat = document.getElementById('chat');
        const totalImages = 8;
        let currentImage = 0;

        function changeImage() {
            currentImage = (currentImage + 1) % totalImages;
            chat.src = `image${currentImage}.png`;
        }

        // Changer l'image toutes les 150 ms (ajuster selon le rendu souhaité)
        setInterval(changeImage, 150);