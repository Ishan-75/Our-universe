/**
 * OUR LITTLE UNIVERSE - Central Relationship Configuration
 * 
 * Edit this ONE file to personalize almost the entire website.
 * Replace photos, songs, and text here, and place your files in /public/assets/
 */

export const relationshipData = {
  // Couple Names
  couple: {
    person1: "Ishan",        // Your Name
    person2: "Suganthi",        // Her Name
    relationshipStartDate: "2026-06-21", // Format: YYYY-MM-DD for real-time days counter
  },

  // Hero Section
  hero: {
    image: "/assets/photos/hero-placeholder.jpg",
    title: "Somewhere between two ordinary people...",
    subtitle: "something extraordinary happened.",
    enterButtonText: "ENTER OUR UNIVERSE →",
  },

  // Section 02 - Our Story (Relationship Timeline)
  timeline: [
    {
      date: " February 2026",
      title: "The Beginning",
      tag: "First Spark",
      description: "A chance conversation that was supposed to last few minutes turned into hours. Neither of us wanted the moment to end.",
      image: "/assets/photos/memory-01.jpg"
    },
    {
      date: "March 2026",
      title: "The Stage were we felt closeness!",
      tag: "Evening MAX Memory",
      description: "You drove from your house, just to meet me and left to work. Many time you were late but still chose to say some stories.",
      image: "/assets/photos/memory-02.jpg"
    },
    {
      date: "May 2026",
      title: "A Summer turned out unforgettable!",
      tag: "A season in a Joy" ,
      description: "Ahhh!!... A summer which I loved the most cause it feels more like a romantic month for us. We both had crush on eachother and spend time without knowingly.",
      image: "/assets/photos/memory-03.jpg"
    },
    {
      date: "Auguest 2026",
      title: "Maybe a afternoon Promise",
      tag: "New Chapter",
      description: "Still remember how we do kiss. and you you behave in kitchen which is so awesome and adorable!!. We do say love you, fuck you, A promise of life!!.",
      image: "/assets/photos/memory-04.jpg"
    },
    {
      date: "Present & Always",
      title: "Every Small Ordinary Day",
      tag: "Our Quiet Magic",
      description: "My day feel so empty without you😭. A little few second of my crave to see you!! Your abscence can me Made. Where Your presence make me cherish!!.",
      image: "/assets/photos/memory-05.jpg"
    }
  ],

  // Section 03 - Memory Galaxy
  // Stars mapped into celestial galaxy coordinates (x: 10-90%, y: 15-85%)
  categories: [
    { id: "all", label: "✨ All Stars" },
    { id: "Us", label: "❤️ Us" },
    { id: "Stupid Moments", label: "😂 Stupid Moments" },
    { id: "Late Nights", label: "🌙 Late Nights" },
    { id: "Favorite Memories", label: "🥹 Favorite Memories" },
    { id: "Adventures", label: "✈️ Adventures" }
  ],

  memories: [
    {
      id: 1,
      category: "Us",
      image: "/assets/photos/memory-06.jpg",
      title: "Midnight Alleyway Stroll",
      date: "September 2026",
      description: "A day we had recreated our old days meet!!!....That joy in our faces..AWW",
      starCoords: { x: 22, y: 32 },
      brightness: 1.2
    },
    {
      id: 2,
      category: "Late Nights",
      image: "/assets/photos/memory-07.jpg",
      title: `A romantic "Pericha pazham!!"`,
      date: "Auguest 2026",
      description: "We do eat a lot. Especially liked to be feed in your hand and peaks🌚",
      starCoords: { x: 50, y: 22 },
      brightness: 1.5
    },
    {
      id: 3,
      category: "Temple",
      image: "/assets/photos/memory-08.jpg",
      title: "Sparklers on the Beach",
      date: "October 2023",
      description: "Sometimes we go to temple for peace. But me came to temple just to get more time with my peace(Suganthi)",
      starCoords: { x: 78, y: 35 },
      brightness: 1.3
    },  ],

  // Section 04 - Things I Never Say Enough
  messages: [
    "I love the way you make completely ordinary days feel like a movie.",
    "Your laugh is my absolute favorite sound in the universe — it never fails to pull me out of a bad day.",
    "I love how your eyes soften when you talk about the things you are passionate about.",
    "Thank you for being my safest haven and my wildest adventure all at once.",
    "Even when we are doing completely nothing in silence, there is nowhere else on earth I’d rather be.",
    "You have shown me what genuine kindness, gentle patience, and unconditional warmth feel like.",
    "No matter what changes in this crazy world, choosing you will always be the easiest decision I ever make."
  ],

  // Section 05 - Our Songs
  songs: [
    {
      id: "song1",
      title: "Naane Varugiraen",
      artist: "A.R.Rahman",
      cover: "/assets/photos/song-cover-01.jpg",
      audio: "/assets/songs/song-01.mp3",
      duration: "0:12",
      memory: "Playing in the car on our first long late-night drive with the windows down."
    },
    // {
    //   id: "song2",
    //   title: "Midnight Aurora",
    //   artist: "Celestial Soundscape",
    //   cover: "/assets/photos/song-cover-02.jpg",
    //   audio: "/assets/songs/song-02.mp3",
    //   duration: "0:12",
    //   memory: "The track that was playing in the background during our first rainy evening conversation."
    // },
    // {
    //   id: "song3",
    //   title: "Constellation Waltz",
    //   artist: "Nocturne Dreamer",
    //   cover: "/assets/photos/song-cover-03.jpg",
    //   audio: "/assets/songs/song-03.mp3",
    //   duration: "0:12",
    //   memory: "The soft melody we danced to barefoot in the living room at 2 AM."
    // }
  ],

  // Section 06 - If We Were... (Playful scenarios)
  scenarios: [
    {
      id: "paris",
      title: "If we were in Paris...",
      emoji: "🇫🇷",
      prompt: "Picture us getting lost in Montmartre...",
      story: "We'd wake up late to the scent of fresh butter croissants, walk through cobblestone alleys avoiding the tourist crowds, buy a vintage second-hand book by the Seine, and sit on a green park bench watching the rain tap against our umbrella.",
      image: "/assets/photos/memory-01.jpg"
    },
    {
      id: "house",
      title: "If we had a house together...",
      emoji: "🏡",
      prompt: "Our future cozy sanctuary...",
      story: "A sunlit kitchen filled with trailing green plants, records playing in the living room, a deeply comfortable oversized sofa where we fall asleep halfway through movies, and a balcony where we sip morning tea while watching the sun rise.",
      image: "/assets/photos/memory-02.jpg"
    },
    {
      id: "travel",
      title: "If we could travel anywhere tomorrow...",
      emoji: "✈️",
      prompt: "One ticket to anywhere on Earth...",
      story: "A secluded glass cabin deep in Norway or Iceland. Wrapped in oversized woolen sweaters, hot chocolate in hand, gazing through the glass ceiling at emerald aurora dancing across the night sky, with zero alarms set.",
      image: "/assets/photos/memory-03.jpg"
    },
    {
      id: "old",
      title: "If we were old and looking back...",
      emoji: "🌙",
      prompt: "Decades from today...",
      story: "We would sit on the porch rocking chairs, wrinkled hands intertwined, looking back at this exact website and laughing at how young and starry-eyed we were — proud that every single dream we whispered about came true.",
      image: "/assets/photos/hero-placeholder.jpg"
    }
  ],

  // Section 07 - The Letter
  letter: {
    envelopeTitle: "A letter I wanted you to have.",
    openPrompt: "Click to unfold my heart",
    date: "Tonight, under the starlight",
    greeting: "Dear Suganthi,",
    paragraphs: [
      "I built this universe for you because ordinary words sometimes fall short of capturing what you truly mean to me.",
      "Before you came into my life, days were just dates on a calendar and the night sky was just dark empty space. But with you, every quiet second has gained depth, color, and music.",
      "Thank you for your patience on my hard days, for your contagious laughter that lights up any room, and for the effortless way you make me feel understood without having to say a single word.",
      "Whatever this world brings our way — the unpredictable storms, the glorious highs, and every quiet morning in between — I want you to know that I am right beside you, holding your hand.",
      "You are my favorite person, my favorite adventure, and my favorite Everything in this vast universe."
    ],
    closing: "Forever and always,",
    signature: "Siluku💃"
  },

  // Section 08 - Future Us
  future: [
    {
      id: 1,
      title: "Today & Every Moment",
      date: "Right Now",
      description: "Cherishing every laugh, every late-night conversation, and every little universe we build together.",
      locked: false,
    },
    {
      id: 2,
      title: "Our Next Big Escape",
      date: "Upcoming Adventure",
      description: "Passports ready, suitcases packed, heading toward a new coastline where nobody knows our names.",
      locked: false,
    },
    {
      id: 3,
      title: "The Dream Home",
      date: "Milestone",
      description: "High ceilings, sunbeams across wooden floors, and keys with both our initials on the keychain.",
      locked: true,
      unlockHint: "A cozy kitchen, a big bookshelf, and waking up next to you every single morning."
    },
    {
      id: 4,
      title: "Golden Hour of Our Lives",
      date: "Decades Ahead",
      description: "Still making each other laugh till our eyes water, still holding hands as if it were the first day.",
      locked: true,
      unlockHint: "A lifetime of inside jokes, silver hair, and the exact same love."
    }
  ],

  // Final Section - The Ending
  ending: {
    quote1: "Out of all the people in the world…",
    quote2: "…I’m so glad I found you.",
    finalMessage: "This isn’t the end of our story. It’s only the beginning."
  }
};
