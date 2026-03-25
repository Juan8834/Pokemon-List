## Pokémon List App

A sleek and interactive React application to explore Pokémon using the PokéAPI. Browse Pokémon with pagination, search for your favorites, and view detailed stats in a card-based layout.

## 🌟 Features

Fetch Pokémon from PokéAPI

Paginated list: Browse Pokémon 10 at a time

Search functionality: Find Pokémon by name

Interactive cards: Click a Pokémon card to view details

Detailed info: Height, weight, base experience, abilities

Responsive design: Works on desktop, tablets, and mobile

Dark theme UI: Red and dark tones for a Pokémon-style aesthetic

## 🛠️ Tech Stack

React 19 – Frontend library for building UI

Axios / Fetch API – For fetching Pokémon data

CSS – Custom styles with responsive breakpoints

React Scripts – CRA tooling for development and build

## 📂 Project Structure
pokemon-list/
├─ public/
│  └─ index.html
├─ src/
│  ├─ App.jsx          # Main component handling state, pagination, and search
│  ├─ PokemonList.jsx  # Displays all Pokémon cards
│  ├─ Pokemon.jsx      # Single Pokémon card with popup details
│  ├─ PokemonDetails.jsx # Detailed Pokémon info panel
│  ├─ ErrorBoundary.jsx # Error handling wrapper
│  ├─ index.js         # App entry point
│  └─ index.css / App.css # Global and component styling
├─ package.json
└─ README.md
```
🚀 Getting Started

Clone the repo

git clone https://github.com/Juan8834/pokemon-list.git
cd pokemon-list

Install dependencies

npm install

Start the development server

npm start

Open http://localhost:3000
 to view it in the browser.

```
Pokémon List View – Paginated, clickable cards

Card Details – Popups or inline card info for selected Pokémon

Search Bar – Filter Pokémon by name

Responsive Layout – Works on mobile, tablet, and desktop

(You can add actual screenshots here for visual appeal)

##⚡ Future Improvements

Add sorting by stats (height, weight, experience)

Implement infinite scroll instead of pagination

Add dark/light theme toggle

Include type filters (Water, Fire, Grass, etc.)

Add animations for card selection and popups

## 📜 License

MIT License – Open source and free to use
