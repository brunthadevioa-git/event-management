require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event');

async function seedMore() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nexusEventsDB');
  
  console.log('Connected to MongoDB. Seeding more events...');

  await Event.insertMany([
    {
      title: 'Full Stack JavaScript Bootcamp',
      description: 'An intensive 3-day bootcamp covering React, Node.js, and MongoDB for aspiring developers.',
      date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      location: 'New York City, NY',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'Cybersecurity Summit 2026',
      description: 'Learn the latest techniques in ethical hacking, network security, and cryptography from top experts.',
      date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days
      location: 'Washington D.C.',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'Women in Tech Leadership',
      description: 'A networking event and panel discussion featuring successful women leaders in the technology industry.',
      date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
      location: 'Austin, TX',
      imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'Cloud Native Conference',
      description: 'Explore the ecosystem of Kubernetes, Docker, and microservices architecture at scale.',
      date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
      location: 'Seattle, WA',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'Web3 & Blockchain Meetup',
      description: 'Connect with local blockchain enthusiasts and learn about smart contract development and DeFi.',
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
      location: 'Miami, FL',
      imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=1000'
    }
  ]);

  console.log('Successfully added 5 new events!');
  process.exit(0);
}

seedMore().catch(err => {
  console.error(err);
  process.exit(1);
});
