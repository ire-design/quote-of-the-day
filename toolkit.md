# JavaScript Web APIs Toolkit – Quote App

## 1. Project Overview

**Tech**: JavaScript Web APIs (Fetch, Web Share, Local Storage)  
**Goal**: Simple quote app showing modern web development  
**Why**: These APIs are essential for modern websites – fetching data, sharing content, storing user data locally.

## 2. Technology Summary

**JavaScript Web APIs** let websites access browser features beyond basic HTML/CSS/JS.

**Real example**: Twitter uses Fetch API for loading tweets, Web Share for sharing, Local Storage for settings.

## 3. Setup

```bash
mkdir quote-app
cd quote-app
# Create: index.html, style.css, script.js, quotes.json, README.md

python -m http.server 8000
# Open http://localhost:8000
```

## 4. Key Code

### HTML Structure
```html
<div class="container">
    <h1>Quote of the Day</h1>
    <div class="quote-box">
        <div id="quote-text">Loading...</div>
        <div id="quote-author"></div>
    </div>
    <button id="new-quote">New Quote</button>
    <button id="share-quote">Share</button>
    <button id="favorite-quote">Favourite</button>
</div>
```

### CSS (Playfair Display + Brown Theme)
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap');

body {
    font-family: 'Playfair Display', serif;
    background: linear-gradient(135deg, #8B4513, #D2B48C);
}
```

### JavaScript APIs
```javascript
// Fetch API with timeout and local fallback
async getNewQuote() {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        const response = await fetch('https://api.quotable.io/random', { signal: controller.signal });
        clearTimeout(timeout);
        const data = await response.json();
        this.displayQuote(data.content, data.author);
    } catch (error) {
        const localQuotes = await this.fetchLocalQuotes();
        const random = localQuotes[Math.floor(Math.random() * localQuotes.length)];
        this.displayQuote(random.content, random.author);
    }
}

// Web Share API
async shareQuote() {
    const text = `"${this.currentQuote.content}" — ${this.currentQuote.author}`;
    if (navigator.share) {
        await navigator.share({ text });
    } else {
        navigator.clipboard.writeText(text);
    }
}

// Local Storage
favoriteQuote() {
    this.favorites.unshift(this.currentQuote);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
}
```

## 5. AI Prompts Used

**Prompt 1**: "I am intermediate-level developer. Guide me in using JavaScript APIs"  
**Result**: Got architecture with Fetch, Web Share, Local Storage  
**Rating**: Perfect for beginner project

**Prompt 2**: "How to add local fallback for quotes?"  
**Result**: Added quotes.json and fallback logic  
**Rating**: Essential for robustness

**Prompt 3**: "How to style favourite quotes section?"  
**Result**: Improved CSS for favourite quotes and remove button  
**Rating**: Improved usability

## 6. Common Issues

**Problem**: Quotes not loading  
**Solution**: Check internet connection, app has fallback quotes

**Problem**: Sharing not working  
**Solution**: App falls back to clipboard copy automatically

**Problem**: Favourite quotes disappear  
**Solution**: Check if local storage is enabled in browser

## 7. What I Learned

- Modern web APIs make complex features simple
- Fetch API is much cleaner than old XMLHttpRequest
- Progressive enhancement ensures app works everywhere
- Clean code is easier to debug and maintain
- Separation of HTML/CSS/JS improves organization

## 8. References

- [MDN Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [Quotable API](https://quotable.io)
- [Google Fonts](https://fonts.google.com)

---

**Simple, functional, and demonstrates real-world web development skills!**  