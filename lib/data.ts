export type Stay = { slug:string; name:string; category:string; price:number; size:string; bed:string; view:string; capacity:number; description:string; image:string; images:string[]; amenities:string[]; features:string[]; included:string[]; policy:string };
export type Experience = { slug:string; title:string; category:string; duration:string; price:string; image:string; description:string; inclusions:string[] };
export type Offer = { slug:string; title:string; subtitle:string; image:string; description:string; price:string; validity:string; inclusions:string[]; terms:string; active:boolean };
export type DiningVenue = { name:string; concept:string; cuisine:string; hours:string; image:string; description:string };
export const stays: (Stay & {name_id?:string; description_id?:string})[] = [
  { slug:"ocean-villa", name:"Ocean Villa", category:"Villa", price:890, size:"380 m²", bed:"King + Daybed", view:"Oceanfront", capacity:4, description:"A private villa perched above the Indian Ocean with infinity pool, open-air pavilion and dedicated host. Floor-to-ceiling glass dissolves the boundary between interior and horizon.", image:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80", images:["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80","https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80"], amenities:["Infinity Pool","Private Butler","Outdoor Shower","Minibar","Yoga Deck","Cinema Projector"], features:["Direct beach access","Sunset pavilion","24h concierge"], included:["Daily breakfast","Afternoon tea","Minibar replenishment"], policy:"Check-in 15:00 • Check-out 12:00 • Cancellation 7 days prior" },
  { slug:"jungle-suite", name:"Jungle Suite", category:"Suite", price:420, size:"92 m²", bed:"King", view:"Jungle Valley", capacity:2, description:"Elevated among the canopy, the Jungle Suite frames valley mist at dawn and fireflies at dusk. Dark teak, linen and stone in quiet dialogue.", image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80", images:["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80","https://images.unsplash.com/photo-1551882547-b79c417633b?w=1200&q=80"], amenities:["Terrace","Soaking Tub","Espresso Bar","Bose Sound"], features:["Valley view","Open-air bath"], included:["Breakfast","Valley trek"], policy:"Check-in 14:00 • Check-out 11:00" },
  { slug:"cliff-residence", name:"Cliff Residence", category:"Residence", price:1850, size:"720 m²", bed:"4 King", view:"Cliff & Ocean", capacity:8, description:"Four pavilions around a 22-meter pool, for families and private gatherings. A residence that feels like a village for one party only.", image:"https://images.unsplash.com/photo-1571003123894-1f0594d2b597?w=1200&q=80", images:["https://images.unsplash.com/photo-1571003123894-1f0594d2b597?w=1200&q=80","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80"], amenities:["22m Pool","Chef Kitchen","Spa Bale","Staff Quarters"], features:["Private compound","Helipad access"], included:["Chef breakfast","Daily spa ritual"], policy:"Minimum 3 nights • Private transfer included" },
  { slug:"garden-loft", name:"Garden Loft", category:"Room", price:290, size:"48 m²", bed:"Queen", view:"Garden", capacity:2, description:"Ground-floor loft opening onto frangipani garden. Intimate, light-filled, perfect for slow mornings.", image:"https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80", images:["https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80"], amenities:["Garden Terrace","Rain Shower","Workspace"], features:["Garden access"], included:["Breakfast"], policy:"Check-in 14:00" },
];
export const experiences: Experience[] = [
  { slug:"sunrise-yoga", title:"Sunrise Valley Yoga", category:"Wellness", duration:"60 min", price:"Included", image:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80", description:"Breath and movement on the valley deck as mist lifts.", inclusions:["Mat & props","Herbal tonic"] },
  { slug:"private-surf", title:"Private Surf Guiding", category:"Adventure", duration:"Half day", price:"From $180", image:"https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=900&q=80", description:"Local surf guide, uncrowded breaks, board curation.", inclusions:["Guide","Board","Transfer"] },
  { slug:"temple-dawn", title:"Temple at Dawn", category:"Culture", duration:"3 hours", price:"From $95", image:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80", description:"Pre-opening access to water temple with historian.", inclusions:["Historian","Offerings","Breakfast bento"] },
  { slug:"romance-dinner", title:"Cliffside Private Dinner", category:"Romance", duration:"Evening", price:"From $240", image:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80", description:"Four courses by chef, cliff edge, lantern light.", inclusions:["Chef menu","Wine pairing","Floral styling"] },
];
export const offers: Offer[] = [
  { slug:"long-stay", title:"Stay Longer, Breathe Deeper", subtitle:"4 nights • 15% saving", image:"https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=900&q=80", description:"For those who measure time differently. Longer you stay, deeper the island settles in you.", price:"From $420/night", validity:"Until 31 Dec 2026", inclusions:["Daily breakfast","60-min spa","Airport transfer"], terms:"Min 4 nights, non-refundable", active:true },
  { slug:"honeymoon", title:"Honeymoon Escape", subtitle:"Romance, curated", image:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80", description:"Private dinner, couple spa, sunrise yoga — arranged before you arrive.", price:"From $890/night", validity:"Until 31 Mar 2027", inclusions:["Cliff dinner","Couple massage","Late check-out"], terms:"3-night min", active:true },
  { slug:"family", title:"Family Residence Week", subtitle:"Gather at the cliff", image:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80", description:"Cliff Residence for the whole clan — chef, nanny, pool entirely yours.", price:"From $1,850/night", validity:"Until 31 Dec 2026", inclusions:["Private chef","Kids program","Babysitting 4h"], terms:"4-bedroom residence", active:true },
];
export const dining: DiningVenue[] = [
  { name:"S E R A", concept:"Wood fire & Ocean", cuisine:"Coastal • Tasting Menu", hours:"18:00–23:00 • Closed Tue", image:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80", description:"Chef's counter over live fire. Fish landed at dawn, vegetables from the hill." },
  { name:"Bale Dauh", concept:"Day Pavilion", cuisine:"Indonesian • Brunch", hours:"07:00–15:00", image:"https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80", description:"Long breakfast under frangipani. Jamu, sambal, and hand-rolled noodles." },
];
export const testimonials = [
  { name:"Elena & Marcus", location:"Berlin", text:"Not a hotel — a house that happens to have the most thoughtful staff in Bali.", avatar:"E" },
  { name:"James T.", location:"Singapore", text:"Every hour felt composed, like a film still. We extended three nights.", avatar:"J" },
  { name:"Sakura Y.", location:"Kyoto", text:"The light, the quiet, the way the villa frames the ocean. Unforgettable.", avatar:"S" },
];
export const faqs = [
  { q:"How far from the airport?", a:"40 minutes by private transfer. We arrange reception and fast-track on request.", cat:"Location" },
  { q:"Is breakfast included?", a:"Yes for all direct bookings — served at Bale Dauh or in-villa.", cat:"Dining" },
  { q:"Cancellation policy?", a:"Free up to 7 days prior (14 days for Residence). After that, one night charged.", cat:"Booking" },
  { q:"Are children welcome?", a:"Yes. Residence and Ocean Villa are family-ready; we provide cots, nanny and kids program.", cat:"Family" },
  { q:"Do you accommodate dietary needs?", a:"Chef adapts across vegan, gluten-free and halal with advance notice.", cat:"Dining" },
  { q:"Transfer options?", a:"Private SUV, or helicopter 12 minutes from Ngurah Rai.", cat:"Transport" },
];
export const gallery = [
  { src:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80", cat:"Villas", alt:"Ocean villa pool" },
  { src:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80", cat:"Rooms", alt:"Suite interior" },
  { src:"https://images.unsplash.com/photo-1571003123894-1f0594d2b597?w=1200&q=80", cat:"Architecture", alt:"Cliff residence" },
  { src:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80", cat:"Pool", alt:"Infinity pool at sunset" },
  { src:"https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80", cat:"Nature", alt:"Jungle valley" },
  { src:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", cat:"Dining", alt:"Restaurant fire" },
  { src:"https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=1200&q=80", cat:"Experiences", alt:"Surf" },
  { src:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80", cat:"Experiences", alt:"Yoga" },
];
