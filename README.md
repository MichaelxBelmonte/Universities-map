# 🎓 Universities Map - Global Universities Database

<div align="center">

![Universities Map](https://img.shields.io/badge/Universities-104%20Italian-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Made with AI](https://img.shields.io/badge/Made%20with-AI%20%F0%9F%A4%96-purple)

**An interactive world map of universities to guide students in their academic journey**

*Built by humans, perfected by AI (yes, Claude helped a lot... don't tell the professors! 🤫)*

[Report Bug](https://github.com/MichaelxBelmonte/Universities-map/issues) · [Request Feature](https://github.com/MichaelxBelmonte/Universities-map/issues)

</div>

---

## 🌍 The Big Dream

Look, choosing a university is hard. Like, *really* hard. There are thousands of options, each promising to be the "best choice for your future" (spoiler: they all say that).

So we thought: **what if there was a map?** Not just any map, but an interactive, beautiful, AI-powered map that actually helps you make sense of this chaos.

Universities Map is on a mission to become the **world's most comprehensive database of universities**, with an AI assistant that doesn't just tell you "it depends" (though sometimes it really does).

> **Fun fact:** This entire project was built with the help of AI. We're basically using AI to help students find universities where they'll learn about... AI. It's AIs all the way down. 🤯

### Current Status: Italy 🇮🇹
We started with our home turf - **104 Italian universities** with **147+ campus locations**. Why Italy first? Well, someone had to start somewhere, and we like pizza. 🍕

What we've got so far:
- ✅ Public universities (Statale) - The classic choice
- ✅ Private universities (Non Statale) - For that premium education experience
- ✅ Online universities (Telematica) - Study in your pajamas? We got you
- ✅ Special status institutions (Ordinamento Speciale) - Because some schools are just *different*

### Future Goal: The World 🌎
Next stop: **everywhere**. France, Germany, USA, Japan, Australia... We're coming for all of you.

The dream is to have every single university on Earth on this map. And yes, we're planning to use more AI to help us get there faster. Because manually adding 20,000+ universities? No thanks. We're smart, not crazy. 🤖

---

## ✨ Features (aka "Cool Stuff We Built")

### 🗺️ Interactive Map
Because staring at Excel spreadsheets is no fun:
- **Beautiful Leaflet-powered map** - Thanks OpenStreetMap, you're the real MVP
- **Smart clustering** - When universities get too cozy, we group them (no one likes overlapping markers)
- **Multi-campus support** - Some universities have more locations than Starbucks
- **Dark mode** - Because your eyes matter, and we're not monsters

### 🎨 Modern UI/UX
We asked Claude: "Make it pretty but not too pretty." Here's what happened:
- **Liquid Glass Design** - That fancy glassmorphism everyone's doing (yes, we followed the trend)
- **Responsive layout** - Works on your phone, tablet, laptop, and probably your smart fridge
- **Smooth animations** - Everything fades and glows. It's 2025, baby!
- **Accessible** - Screen readers welcome. We're inclusive like that.

### 🌐 Multi-language Support
Because not everyone speaks one language:
- **Italian (IT)** - Default, *ovviamente*
- **English (EN)** - For the international crowd
- **Auto-detection** - We'll guess your language (usually correctly)
- **Remembers your choice** - localStorage is magic ✨

*PS: Adding more languages soon. French? Spanish? Klingon? Let us know!*

### 🔍 Advanced Filtering
Finding the right university shouldn't be like finding a needle in a haystack:
- **Real-time search** - Type and watch the magic happen
- **Category filters** - Public? Private? Online? We got categories for your categories
- **Instant results** - No loading spinners from 2010
- **Smart empty states** - If we can't find it, we'll tell you nicely (not "ERROR 404" like it's 1995)

### 📊 Data Structure
Each university entry includes:
- University name
- Official website URL
- Category/Type (Public, Private, Online, Special)
- Geographic coordinates (latitude, longitude)
- Campus name (for multi-campus institutions)
- City and region
- Main campus designation

---

## 🚀 Tech Stack

### Core
- **[Next.js 16.1](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling

### Mapping
- **[Leaflet](https://leafletjs.com/)** - Interactive maps
- **[React Leaflet](https://react-leaflet.js.org/)** - React components for Leaflet
- **[Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)** - Marker clustering

### Fonts
- **[Sora](https://fonts.google.com/specimen/Sora)** - Display font
- **[Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)** - Body font

---

## 🏃 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn or pnpm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/MichaelxBelmonte/Universities-map.git
cd Universities-map
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000/universities](http://localhost:3000/universities)

---

## 📁 Project Structure

```
universities-map/
├── src/
│   ├── app/
│   │   ├── universities/
│   │   │   └── page.tsx          # Main universities page
│   │   ├── layout.tsx             # Root layout with providers
│   │   └── globals.css            # Global styles (liquid glass design)
│   ├── components/
│   │   ├── Header.tsx             # Header with stats and language switcher
│   │   ├── LanguageSwitcher.tsx   # Language toggle (IT/EN)
│   │   ├── UniversitiesClient.tsx # Client wrapper with state management
│   │   ├── UniversitiesSidebar.tsx # Search, filters, and university list
│   │   └── UniversitiesMap.tsx    # Interactive Leaflet map
│   ├── lib/
│   │   ├── i18n/
│   │   │   ├── translations.ts    # Translation strings (IT/EN)
│   │   │   └── LanguageContext.tsx # Language provider
│   │   ├── types.ts               # TypeScript definitions
│   │   ├── coordinates.ts         # University coordinates mapping
│   │   └── loadUniversities.ts    # Data loader
│   └── data/
│       └── universities/          # JSON files (104 universities)
├── public/
└── package.json
```

---

## 🗄️ Data Format

Each university is stored as a JSON file in `src/data/universities/`:

```json
{
  "university": {
    "name": "Università degli Studi di Bologna",
    "category": "statale",
    "officialUrl": "https://www.unibo.it"
  }
}
```

Multi-campus universities are defined in `src/lib/coordinates.ts`:

```typescript
{
  unibo: [
    {
      campus: "Bologna - Sede Centrale",
      coords: [44.4949, 11.3426],
      main: true
    },
    {
      campus: "Cesena",
      coords: [44.1397, 12.2453]
    }
  ]
}
```

---

## 🤝 Contributing (Yes, We Need Your Help!)

Listen, we can't map 20,000+ universities alone. That's where you come in!

We welcome all contributions - big, small, weird, whatever. Even if it's just fixing a typo (there are probably many, Claude isn't perfect... yet).

### Adding Universities

It's actually pretty simple:
1. **Create a JSON file** in `src/data/universities/` (copy-paste an existing one, we don't judge)
2. **Add coordinates** in `src/lib/coordinates.ts` (Google Maps is your friend)
3. **Submit a Pull Request** (first time? It's easier than you think!)

### Other Ways to Contribute

- 🌍 **Add universities from new countries** - Know a university we're missing? Tell us!
- 🤖 **AI Integration** - Help us make Claude even smarter (if that's possible)
- 📚 **Rich data** - Programs, tuition, rankings... we want it all
- 🔗 **API** - Build a public API so others can use our data
- 📱 **Mobile app** - React Native? Flutter? Surprise us
- 🧪 **Tests** - Because breaking things in production is bad (apparently)
- 📊 **Analytics** - Help us understand what students actually want
- 🎨 **Design** - Make it even prettier (hard, but not impossible)
- 📝 **Documentation** - Explain things better than we do
- 🐛 **Bug hunting** - Find bugs, report bugs, fix bugs (the circle of dev life)

> **Pro tip:** If you're a student and want to add your university to the map, do it! It's literally the easiest way to contribute to open source. Plus, you can tell your friends you're a contributor now. 😎

---

## 🛣️ Roadmap (Our Master Plan)

This is the dream. Will we achieve it? Only time (and coffee) will tell.

### Phase 1: European Expansion 🇪🇺 (Q1 2025)
*Because Europe has good universities and better food*
- [ ] France - Bonjour, universities!
- [ ] Germany - Guten Tag, engineering schools!
- [ ] Spain - Hola, study abroad programs!
- [ ] United Kingdom - Oxford, Cambridge, and the rest
- [ ] Netherlands - Windmills and world-class education
- [ ] Switzerland - Expensive but worth it?

### Phase 2: Global Coverage 🌎 (Q2-Q3 2025)
*Going big or going home (probably both)*
- [ ] United States - Harvard, MIT, and 4,000 others
- [ ] Canada - Sorry, we're coming for you too
- [ ] Australia - G'day mate, let's map some unis
- [ ] China - 3,000+ universities. This will take a while.
- [ ] Japan - Konnichiwa, prestigious universities!
- [ ] South Korea - K-pop universities included
- [ ] India - IITs and beyond
- [ ] Brazil - Samba your way to education

### Phase 3: AI Integration 🤖 (Q4 2025)
*This is where it gets really interesting*
- [ ] GPT/Claude integration - "Hey AI, where should I study?"
- [ ] Natural language search - "Find me a university that's good at marine biology but also has great food"
- [ ] Personalized recommendations - Based on your interests, budget, and inability to wake up before 10am
- [ ] Career path analysis - From "I want to save the world" to "I need to pay rent"
- [ ] Scholarship matching - Because student debt is scary

### Phase 4: Rich Data 📊 (2026)
*All the information, all in one place*
- [ ] University rankings (controversial, but everyone wants them)
- [ ] Available programs/courses (thousands of them)
- [ ] Tuition fees (prepare your wallet)
- [ ] Admission requirements (how hard is it to get in?)
- [ ] Student reviews (the unfiltered truth)
- [ ] Campus photos/virtual tours (pretty buildings sell)

> **Reality check:** These timelines are optimistic. Very optimistic. Like "everything will go perfectly" optimistic. But hey, a developer can dream, right? 🌈

---

## 📜 License

This project is licensed under the MIT License.

---

## 🤖 Built with AI (Yes, Really)

Let's be honest: This project wouldn't exist without AI. Here's the truth:

- **Claude Opus 4.5** wrote like... 70% of the code? Maybe 80%? Look, we lost count.
- The human (Michael) provided the vision, pizza breaks, and occasional "no, that's not what I meant"
- Claude handled the TypeScript, the React components, the styling, the multi-language support, the bug fixes...
- Basically, Claude was the senior developer and Michael was the product manager who kept changing requirements

**But here's the cool part:** We're not hiding it. We're *celebrating* it. This is what modern development looks like in 2025. Human creativity + AI execution = awesome stuff.

Some people will say "but that's cheating!" To them we say: We're building a tool to help students find universities where they'll learn to use AI. The irony is perfect. 🎭

---

## 🙏 Acknowledgments (Thank You!)

- **YouthLink** - For believing in this crazy idea
- **Claude (Anthropic)** - For being an absolute beast of a coding partner
- **OpenStreetMap** - Free maps > expensive maps
- **Leaflet** - Making maps interactive since forever
- **Next.js Team** - React but better
- **Coffee** - The real MVP
- **Stack Overflow** - Even AI needs to Google stuff sometimes
- **All contributors** - You know who you are ❤️

---

## 📧 Contact (Hit Us Up!)

**Michael Belmonte**
- GitHub: [@MichaelxBelmonte](https://github.com/MichaelxBelmonte)
- Got questions? Open an issue. Got ideas? Open an issue. Found a bug? Definitely open an issue.

**Project Link:** [https://github.com/MichaelxBelmonte/Universities-map](https://github.com/MichaelxBelmonte/Universities-map)

---

<div align="center">

**Made with ❤️, ☕, and 🤖 for students worldwide**

⭐ Star this repo if you find it helpful!

🤝 Contribute if you want to be part of something big!

🚀 Share it with students who need help choosing a university!

---

*PS: If you're reading this and thinking "I should contribute", you absolutely should. Even if it's just adding one university. Do it. Be the change. 💪*

</div>
