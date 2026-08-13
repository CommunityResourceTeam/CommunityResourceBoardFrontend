export const MOCK_POSTS = [
  {
    _id: "post_456",
    authorId: "user_123",
    title: "West Seattle Food Bank",
    description: "Provides free groceries to residents of West Seattle. Also offers rent and utilities assistance, clothing, and bus tickets.",
    location: {
      address: "4425 41st Ave SW",
      city: "Seattle",
      state: "WA",
      zip: "98116",
      coordinates: { latitude: 47.5636, longitude: -122.3877 }
    },
    hours: {
      monday: [],
      tuesday: [{ open: "10:00", close: "14:00" }],
      wednesday: [{ open: "12:00", close: "19:00" }],
      thursday: [{ open: "10:00", close: "14:00" }],
      friday: [{ open: "10:00", close: "14:00" }],
      saturday: [],
      sunday: []
    },
    website: "https://westseattlefoodbank.org",
    tags: [
      { tagId: "0", name: "Food Assistance" },
      { tagId: "1", name: "Free" }
    ],
    comments: []
  },
  {
    _id: "post_457",
    authorId: "user_456",
    title: "Neighborcare Health at Columbia City",
    description: "Low-cost primary medical and dental care for individuals and families regardless of income or insurance status.",
    location: {
      address: "4400 37th Ave S",
      city: "Seattle",
      state: "WA",
      zip: "98118",
      coordinates: { latitude: 47.5590, longitude: -122.2864 }
    },
    hours: {
      monday: [{ open: "08:00", close: "17:00" }],
      tuesday: [{ open: "08:00", close: "17:00" }],
      wednesday: [{ open: "09:30", close: "17:00" }],
      thursday: [{ open: "08:00", close: "17:00" }],
      friday: [{ open: "08:00", close: "17:00" }],
      saturday: [{ open: "09:30", close: "13:30" }],
      sunday: []
    },
    website: "https://neighborcare.org",
    tags: [
      { tagId: "2", name: "Healthcare" },
      { tagId: "1", name: "Free" }
    ],
    comments: []
  },
  {
    _id: "post_458",
    authorId: "user_789",
    title: "Downtown Emergency Service Center (DESC)",
    description: "Emergency shelter, clinical services, and case management for adults experiencing chronic homelessness, mental illness, or chemical dependency.",
    location: {
      address: "515 3rd Ave S",
      city: "Seattle",
      state: "WA",
      zip: "98104",
      coordinates: { latitude: 47.5985, longitude: -122.3295 }
    },
    hours: {
      monday: [{ open: "08:00", close: "16:45" }],
      tuesday: [{ open: "08:00", close: "16:45" }],
      wednesday: [{ open: "08:00", close: "16:45" }],
      thursday: [{ open: "08:00", close: "16:45" }],
      friday: [{ open: "08:00", close: "16:45" }],
      saturday: [{ open: "08:00", close: "16:45" }],
      sunday: [{ open: "08:00", close: "16:45" }]
    },
    website: "https://www.desc.org",
    tags: [
      { tagId: "3", name: "Shelter" },
      { tagId: "1", name: "Free" },
      { tagId: "4", name: "Walk-In Intake" }
    ],
    comments: []
  },
  {
    _id: "post_459",
    authorId: "user_234",
    title: "SPL Homework Help — Columbia Branch",
    description: "Free after-school tutoring for K-12 students. Trained volunteers help with any subject; no appointment or library card needed.",
    location: {
      address: "4721 Rainier Ave S",
      city: "Seattle",
      state: "WA",
      zip: "98118",
      coordinates: { latitude: 47.5657, longitude: -122.2871 }
    },
    hours: {
      monday: [],
      tuesday: [{ open: "16:00", close: "19:00" }],
      wednesday: [{ open: "18:00", close: "19:30" }],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    },
    website: "https://www.spl.org/programs-and-services/learning/student-success/homework-help",
    tags: [
      { tagId: "5", name: "Education" },
      { tagId: "1", name: "Free" },
      { tagId: "6", name: "Youth" }
    ],
    comments: []
  },
  {
    _id: "post_460",
    authorId: "user_567",
    title: "Northwest Justice Project",
    description: "Free civil legal aid for low-income individuals — housing, government benefits, consumer issues, and family safety cases.",
    location: {
      address: "401 2nd Ave S, Suite 407",
      city: "Seattle",
      state: "WA",
      zip: "98104",
      coordinates: { latitude: 47.6014, longitude: -122.3305 }
    },
    hours: {
      monday: [{ open: "09:00", close: "17:00" }],
      tuesday: [{ open: "09:00", close: "17:00" }],
      wednesday: [{ open: "09:00", close: "17:00" }],
      thursday: [{ open: "09:00", close: "17:00" }],
      friday: [{ open: "09:00", close: "17:00" }],
      saturday: [],
      sunday: []
    },
    website: "https://nwjustice.org",
    tags: [
      { tagId: "7", name: "Legal Services" },
      { tagId: "1", name: "Free" }
    ],
    comments: []
  },
  {
    _id: "post_461",
    authorId: "user_890",
    title: "Rainier Valley Food Bank — Mobile Market",
    description: "Weekly pop-up grocery market where guests choose fresh produce and pantry staples. One shopping visit per household.",
    location: {
      address: "9021 Rainier Ave S",
      city: "Seattle",
      state: "WA",
      zip: "98118",
      coordinates: { latitude: 47.5233, longitude: -122.2685 }
    },
    hours: {
      monday: [],
      tuesday: [],
      wednesday: [{ open: "09:00", close: "14:00" }],
      thursday: [],
      friday: [{ open: "09:00", close: "14:00" }],
      saturday: [],
      sunday: []
    },
    website: "https://www.rvfb.org",
    tags: [
      { tagId: "0", name: "Food Assistance" },
      { tagId: "1", name: "Free" },
      { tagId: "8", name: "Mobile Service" }
    ],
    comments: []
  }
];