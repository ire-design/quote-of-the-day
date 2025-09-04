# Quote of the Day App

A simple web app that shows inspirational quotes using modern web APIs.

Demo link []

## Features

- Get random quotes from an API, with local backup if offline
- Share quotes (copy to clipboard or device-native share)
- Save up to 5 favourite quotes locally
- Clean brown-themed design with Google Fonts
- Works on mobile and desktop

## Technologies Used

- **HTML5** – Structure
- **CSS3** – Styling with Playfair Display font
- **JavaScript** – Fetch API, Web Share API, Local Storage
- **Quotable API** – External quote service
- **quotes.json** – Local backup quotes

## Files

```
├── index.html      # Main structure
├── style.css       # Brown theme styling
├── script.js       # App logic with APIs and local fallback
└── README.md       # This file
```

## Setup

1. Download all files to the same folder (including `quotes.json`)
2. Open `index.html` in browser, or use local server:
   ```bash
   python -m http.server 8000
   ```
3. Visit `http://localhost:8000`

## Usage

- **New Quote**: Click button to get a fresh quote
- **Share**: Copy to clipboard or use device sharing  
- **Favourite**: Add quote to favourites (max 5)
- **Remove**: Click × on any favourite to delete

## Browser Support

Works on Chrome, Firefox, Safari, Edge (modern versions)

## API Integration

Uses Quotable.io for quotes.
If the API is slow or offline, loads from `quotes.json`.
If both fail, uses built-in hardcoded quotes.

## 🐛 Troubleshooting

### Common Issues

#### Quotes Not Loading
- **Issue**: No quotes appear after clicking "New Quote"
- **Solution**: Check internet connection. App will use local backup quotes if needed.
- **Debug**: Open browser dev tools and check console for API errors.

#### Favourites Not Saving
- **Issue**: Favourites disappear after browser restart
- **Solution**: Ensure local storage is enabled in browser settings.
- **Debug**: Check if localStorage is available: `console.log(typeof Storage)`

#### Share Button Not Working
- **Issue**: Share functionality doesn't work
- **Solution**: Web Share API is not supported on all browsers.
- **Fallback**: App automatically falls back to clipboard copy.

### Browser Compatibility
- **Chrome/Edge**: Full support for all features
- **Firefox**: Full support with minor visual differences
- **Safari**: Good support, Web Share API available on iOS
- **Older Browsers**: Basic functionality with fallbacks

## Potential Challenges from Vanilla JS

- Asynchronous Operations: Managing fetch requests, promises, and async/await
- Error Handling: Network failures, API rate limits, malformed responses
- State Management: Tracking current quote, loading states, user preferences
- DOM Manipulation: Updating elements efficiently
- CORS Issues: Some quote APIs may have restrictions

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Contribution Guidelines
- Follow existing code style
- Add comments for complex logic
- Test on multiple browsers
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License – see the LICENSE file for details.

## 🙏 Acknowledgments

- **Quotable API** for providing free inspirational quotes
- **Web APIs** community for excellent documentation
- **GenAI tools
- **Open Source** community for inspiration and resources

## 📞 Support

Having issues? Here’s how to get help:

1. **Check** the troubleshooting section above
2. **Search** existing issues on GitHub
3. **Create** a new issue with detailed description
4. **Join** our community discussions

---

**My Favourite 🎉** 

*"The only way to do great work is to love what you do." – Steve Jobs*


