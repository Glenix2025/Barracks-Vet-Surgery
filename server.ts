import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory array to store patient registrations made during the demo session
const registeredPatients: any[] = [];

// API Route: Register new patient
app.post('/api/register', (req, res) => {
  const { ownerName, email, phone, petName, petType, reason, preferredDate } = req.body;
  
  if (!ownerName || !phone || !petName) {
    return res.status(400).json({ error: 'Missing required fields (ownerName, phone, petName)' });
  }

  const newPatient = {
    id: `reg_${Date.now()}`,
    ownerName,
    email,
    phone,
    petName,
    petType,
    reason,
    preferredDate: preferredDate || 'Flexible / TBD',
    createdAt: new Date().toISOString(),
  };

  registeredPatients.push(newPatient);
  console.log('✅ New Patient Registered:', newPatient);
  
  res.status(201).json({ 
    success: true, 
    message: 'Patient registered successfully in clinic intake memory.',
    patient: newPatient
  });
});

// API Route: Fetch current session registrations (to show live dashboard for demo)
app.get('/api/registrations', (req, res) => {
  res.json({ registrations: registeredPatients });
});

// Helper for offline rule-based backup bot (so chatbot still works beautifully if API key is not yet set)
function getRuleBasedResponse(message: string): string {
  const msg = message.toLowerCase();
  
  // Emergency check
  if (
    msg.includes('vomit') || 
    msg.includes('bleed') || 
    msg.includes('blood') || 
    msg.includes('unresponsive') || 
    msg.includes('seizure') || 
    msg.includes('breath') || 
    msg.includes('limp') || 
    msg.includes('hit') || 
    msg.includes('poison') || 
    msg.includes('chocolate') || 
    msg.includes('chok') ||
    msg.includes('accident') ||
    msg.includes('urgent') ||
    msg.includes('dying')
  ) {
    return "This sounds urgent, please call The Barracks Vet Surgery now on (02) 9969 1100 during business hours, or SASH Emergency on (02) 9889 0289 for after hours and emergency care. We recommend getting in touch immediately rather than booking online.";
  }

  // Opening hours
  if (msg.includes('hour') || msg.includes('open') || msg.includes('close') || msg.includes('time') || msg.includes('sunday') || msg.includes('saturday')) {
    return "No worries! We are open Monday to Friday from 8:30am to 5:30pm, and Saturdays from 8:00am to 12:30pm. We are closed on Sundays, with consultations conducted by appointment.";
  }

  // Location / Parking
  if (msg.includes('located') || msg.includes('where') || msg.includes('address') || msg.includes('parking') || msg.includes('park') || msg.includes('map')) {
    return "We are located at 2A Best Avenue, Mosman, in the beautiful former army site at Georges Heights (next to Headland Park). We have free, easy parking spots right at our front door, so you won't need to stress about finding a spot!";
  }

  // Dog & Cat support
  if (msg.includes('dog') || msg.includes('cat') || msg.includes('treat') || msg.includes('species') || msg.includes('rat') || msg.includes('guinea') || msg.includes('rabbit')) {
    return "We absolutely treat dogs, cats, and small mammals like guinea pigs and fancy rats! Dogs are weighed at reception on arrival, and we have a separate cat consultation room infused with calming Feliway pheromones so your cat can settle down peacefully.";
  }

  // Book appointment / Calendly
  if (msg.includes('book') || msg.includes('appointment') || msg.includes('schedule') || msg.includes('intake') || msg.includes('calendly') || msg.includes('register')) {
    return "G'day! You can book an appointment instantly via our Calendly scheduling link (https://calendly.com/pawsy1432/brunswick-veterinary-clinic) or complete our New Patient Registration Form on this page. You can also give us a ring on (02) 9969 1100 to lock in a spot!";
  }

  // Emergency query
  if (msg.includes('emergency') || msg.includes('after hour') || msg.includes('sash') || msg.includes('outside')) {
    return "For any after-hours emergencies, please contact SASH (Sydney Animal Specialists Hospital) directly on (02) 9889 0289. During opening hours, please call us immediately on (02) 9969 1100.";
  }

  // Vaccinations
  if (msg.includes('vaccin') || msg.includes('shot') || msg.includes('booster') || msg.includes('puppy') || msg.includes('kitten')) {
    return "Yes, we offer full vaccination programs for puppies, kittens, adult booster cycles, and senior cats and dogs. Dr James Ross conducts a full checkup during every vaccination check to make sure your pet is in top shape.";
  }

  // First visit Checklist
  if (msg.includes('bring') || msg.includes('first visit') || msg.includes('checklist')) {
    return "For your pet's first visit, please bring any previous vaccination cards or medical history you have. On arrival, dogs will be weighed at reception, and cats will head straight into our dedicated cat consult room.";
  }

  // Dental Care
  if (msg.includes('dental') || msg.includes('teeth') || msg.includes('tooth') || msg.includes('dentist') || msg.includes('scaling')) {
    return "We offer comprehensive dental care, including professional ultrasonic scaling, teeth polishing, and surgical extractions on site. Dr James can also advise on premium diet options and dental home care routines.";
  }

  // Surgical procedures
  if (msg.includes('surg') || msg.includes('operat') || msg.includes('de-sex') || msg.includes('desex') || msg.includes('tumor') || msg.includes('orthopaed')) {
    return "Dr James Ross performs soft tissue surgeries (such as de-sexing, tumor removals, abdominal surgeries) and basic orthopaedic procedures in our sterile surgical suite. All surgical cases receive tailored pain relief and dedicated nursing care.";
  }

  // Digital x-ray
  if (msg.includes('x-ray') || msg.includes('radiograph') || msg.includes('imaging') || msg.includes('scan')) {
    return "Yes, we have state-of-the-art digital radiography (x-ray) on site. It provides instant high-resolution diagnostics with reduced waiting times, and we consult with external radiologists free of charge for complex cases.";
  }

  // Price / Cost
  if (msg.includes('cost') || msg.includes('price') || msg.includes('fee') || msg.includes('dollar') || msg.includes('expensive')) {
    return "The cost of a consultation varies depending on your pet and the reason for your visit. Rather than a flat figure, please call our friendly team on (02) 9969 1100 to discuss what your pet needs so we can give you a clear, honest quote.";
  }

  // Referral
  if (msg.includes('refer') || msg.includes('specialist') || msg.includes('hospital')) {
    return "We work closely with the top veterinary specialists in Sydney (including SASH) and can coordinate direct referrals for advanced cardiac, dermatology, or intensive care needs if your companion requires it.";
  }

  // Suburbs serviced
  if (msg.includes('suburb') || msg.includes('service') || msg.includes('mosman') || msg.includes('cremorne') || msg.includes('neutral bay') || msg.includes('sydney')) {
    return "We primarily service Mosman, Cremorne, Neutral Bay, Clifton Gardens, Beauty Point, Balmoral, and surrounding Lower North Shore suburbs of Sydney. G'day to all our local neighbors!";
  }

  // Check up frequency
  if (msg.includes('how often') || msg.includes('frequency') || msg.includes('check up') || msg.includes('annual') || msg.includes('senior')) {
    return "We recommend a full wellness exam once a year for young adult dogs and cats. For older pets over 7 or 8 years, twice-yearly geriatric health check-ups help us catch age-related changes early and keep them comfortable.";
  }

  // General default friendly response
  return "G'day! I'm Pawsy, the assistant here at The Barracks Vet Surgery. For bookings, feel free to use our Calendly link (https://calendly.com/pawsy1432/brunswick-veterinary-clinic). For anything medical or urgent, please ring our clinic directly on (02) 9969 1100, or let me know what else I can help with!";
}

// API Route: AI Chat with Pawsy
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid or missing messages array.' });
  }

  const latestMessageText = messages[messages.length - 1]?.text || '';
  
  // 1. Check for urgent keywords first to enforce prompt override
  const msgLower = latestMessageText.toLowerCase();
  if (
    msgLower.includes('vomit') || 
    msgLower.includes('bleed') || 
    msgLower.includes('blood') || 
    msgLower.includes('unresponsive') || 
    msgLower.includes('seizure') || 
    msgLower.includes('breath') || 
    msgLower.includes('limp') || 
    msgLower.includes('hit') || 
    msgLower.includes('poison') || 
    msgLower.includes('chocolate') || 
    msgLower.includes('chok') ||
    msgLower.includes('accident') ||
    msgLower.includes('urgent') ||
    msgLower.includes('dying')
  ) {
    return res.json({ 
      text: "This sounds urgent, please call The Barracks Vet Surgery now on (02) 9969 1100 during business hours, or SASH Emergency on (02) 9889 0289 for after hours and emergency care.",
      isUrgentDirect: true
    });
  }

  // 2. Initialize Gemini API if key is present
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    // If no API key is supplied, return rule-based response instantly so the iFrame preview remains fully functional
    console.log('⚠️ No GEMINI_API_KEY found, fallback to rule-based conversation engine');
    const replyText = getRuleBasedResponse(latestMessageText);
    return res.json({ text: replyText });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Format conversation history for Gemini
    const systemPrompt = `You are Pawsy, the friendly, warm, and highly reassuring AI Chatbot for The Barracks Vet Surgery in Mosman, NSW, Australia. 
Your tone must be written in natural Australian English (using terms like "G'day", "no worries", "cheers" naturally).
You must limit your replies strictly to 2 to 3 sentences maximum. Keep things concise and scannable.
Never offer medical diagnoses, guess what is wrong with a pet, or prescribe medication dosages. Always direct medical doubts to the phone or Dr James Ross.

PRACTICE KNOWLEDGE BASE:
- Location: 2A Best Avenue, Mosman, NSW 2088. Located in Georges Heights, Headland Park. Flat, free, easy parking directly at our front door.
- Phone: (02) 9969 1100.
- Emergency: SASH Emergency (Sydney Animal Specialists Hospital) on (02) 9889 0289 for after-hours.
- Hours: Mon-Fri: 8:30am - 5:30pm, Sat: 8:00am - 12:30pm, Sun: Closed.
- Principal Vet: Dr James Ross (founder, USyd grad, over 20 years local experience, established practice in 2009).
- Services: Wellness exams, puppy/kitten vaccinations, dentistry/surgery, skin care (dermatology), weight management, de-sexing, soft tissue surgery, basic orthopaedic, digital X-rays, worming/tick prevention, behavioural guidance.
- New Client Process: Can register online or over the phone. Dogs are weighed on arrival, cats taken immediately to their separate consult room with comforting Feliway pheromones.
- Bookings: Direct users to register on this page, or call (02) 9969 1100, or book instantly via our Calendly scheduler link: https://calendly.com/pawsy1432/brunswick-veterinary-clinic.
- Pricing: Consult costs vary depending on the pet type and symptoms. Say it varies, and offer to have the reception team confirm an exact quote over the phone.

SPECIAL RULES:
- If a user mentions anything that sounds like a clinical emergency (vomiting, bleeding, unresponsiveness, seizure, difficulty breathing, limping, car accident, chocolate or poison ingestion), immediately reply: "This sounds urgent, please call The Barracks Vet Surgery now on (02) 9969 1100 during business hours, or SASH Emergency on (02) 9889 0289 for after hours and emergency care."
- If asked anything outside your knowledge (complex pricing, specific drug dosing), say you cannot advise on that and offer to have the practice call them back, or point to (02) 9969 1100.`;

    // Map message history to Gemini contents structure
    const contents = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Inject system instructions as the preamble
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: "Understood. I will act as Pawsy, answering with warm Australian English, keeping responses to 2-3 sentences, and steering clear of diagnosis or medical advice." }] },
        ...contents
      ]
    });

    const replyText = response.text || "G'day! I had a little trouble processing that. Feel free to call us directly on (02) 9969 1100 for immediate help!";
    res.json({ text: replyText });

  } catch (error) {
    console.error('🔴 Gemini API call error:', error);
    // Graceful fallback to rule-based engine if network fails or quota runs out
    const replyText = getRuleBasedResponse(latestMessageText);
    res.json({ text: replyText });
  }
});


// Vite Dev / Prod Server pipeline integration
async function startServer() {
  // Vite dev server integration or static server
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 The Barracks Vet Surgery Server running on http://localhost:${PORT}`);
  });
}

startServer();
