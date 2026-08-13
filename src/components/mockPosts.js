export const MOCK_POSTS = [
  {
    _id: "post_456",
    authorId: "user_123",
    title: "Food Bank",
    description: "Provides free groceries and meals to individuals and families experiencing food insecurity.",
    location: {
      address: "123 Example St",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      coordinates: { latitude: 47.6062, longitude: -122.3321 }
    },
    hours: {
      monday: [{ open: "09:00", close: "17:00" }],
      tuesday: [{ open: "09:00", close: "17:00" }],
      wednesday: [],
      thursday: [{ open: "10:00", close: "18:00" }],
      friday: [{ open: "09:00", close: "15:00" }],
      saturday: [],
      sunday: []
    },
    website: "https://example.org",
    tags: [
      { tagId: "0", name: "Food Assistance" },
      { tagId: "1", name: "Free" }
    ],
    comments: []
  },
  {
    _id: "post_457",
    authorId: "user_456",
    title: "Community Health Clinic",
    description: "Low-cost medical services, health screenings, and wellness checks.",
    location: {
      address: "456 Healthcare Ave",
      city: "Seattle",
      state: "WA",
      zip: "98104",
      coordinates: { latitude: 47.6011, longitude: -122.3299 }
    },
    hours: {
      monday: [{ open: "08:00", close: "16:00" }],
      tuesday: [{ open: "08:00", close: "16:00" }]
    },
    website: "https://healthclinic.org",
    tags: [
      { tagId: "2", name: "Healthcare" },
      { tagId: "1", name: "Free" }
    ],
    comments: []
  }
];