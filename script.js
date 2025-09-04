class QuoteApp {
    constructor() {
        this.currentQuote = null;
        this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        this.init();
    }

    init() {
        document.getElementById('new-quote').onclick = () => this.getNewQuote();
        document.getElementById('share-quote').onclick = () => this.shareQuote();
        document.getElementById('favorite-quote').onclick = () => this.favoriteQuote();

        this.getNewQuote();
        this.showFavorites();
    }

    async getNewQuote() {
        document.getElementById('quote-text').textContent = 'Loading...';
        document.getElementById('quote-author').textContent = '';

        try {
            // Try the API with a timeout of 3 seconds
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 3000);

            const response = await fetch('https://api.quotable.io/random', { signal: controller.signal });
            clearTimeout(timeout);

            const data = await response.json();
            this.currentQuote = { content: data.content, author: data.author };
            this.displayQuote(data.content, data.author);
        } catch (error) {
            // Try backup quotes.json file
            try {
                const localQuotes = await this.fetchLocalQuotes();
                const random = localQuotes[Math.floor(Math.random() * localQuotes.length)];
                this.currentQuote = random;
                this.displayQuote(random.content, random.author);
            } catch (e) {
                // Fallback to hardcoded
                const fallback = this.getFallbackQuote();
                this.displayQuote(fallback.content, fallback.author);
            }
        }
    }

    async fetchLocalQuotes() {
        const response = await fetch('quotes.json');
        if (!response.ok) throw new Error('Local quotes file not found');
        return await response.json();
    }

    displayQuote(content, author) {
        document.getElementById('quote-text').textContent = `"${content}"`;
        document.getElementById('quote-author').textContent = `— ${author}`;
    }

    async shareQuote() {
        if (!this.currentQuote) return;

        const text = `"${this.currentQuote.content}" — ${this.currentQuote.author}`;

        if (navigator.share) {
            try {
                await navigator.share({ text });
            } catch (e) {
                this.copyToClipboard(text);
            }
        } else {
            this.copyToClipboard(text);
        }
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Quote copied to clipboard!');
        }).catch(() => {
            alert('Could not copy quote');
        });
    }

    favoriteQuote() {
        if (!this.currentQuote) return;

        if (this.favorites.some(fav => fav.content === this.currentQuote.content)) {
            alert('Quote already in your favourites!');
            return;
        }

        this.favorites.unshift(this.currentQuote);
        if (this.favorites.length > 5) this.favorites.pop();

        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.showFavorites();
        alert('Quote added to your favourites!');
    }

    showFavorites() {
        const list = document.getElementById('favorites-list');
        list.innerHTML = '';

        if (this.favorites.length === 0) {
            list.innerHTML = '<p style="color: #999; font-style: italic;">No favourite quotes yet</p>';
            return;
        }

        this.favorites.forEach((quote, index) => {
            const item = document.createElement('div');
            item.className = 'favorite-item';
            item.innerHTML = `
                <div style="font-size: 1em; margin-bottom: 7px;">"${quote.content}"</div>
                <div style="font-size: 0.85em; color: #8B4513;">— ${quote.author}</div>
                <button class="remove" title="Remove" onclick="app.removeFavorite(${index})">&times;</button>
            `;
            list.appendChild(item);
        });
    }

    removeFavorite(index) {
        this.favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.showFavorites();
    }

    getFallbackQuote() {
        const quotes = [
            { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
            { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
            { content: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" }
        ];
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        this.currentQuote = random;
        return random;
    }
}

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new QuoteApp();
});