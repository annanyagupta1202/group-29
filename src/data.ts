import type { ChannelMetric, City, PriceTest, Segment } from './types';

// PII-safe aggregate extracted from the 12 supplied exhibits. No names, emails, or respondent IDs are bundled.
const rawPriceTests: [number,string,number,number,number,number][] = [
  [1.79,'DTC Online',61.7,1.39,.77,55.3],[1.79,'Retail/Grocery',61.7,1.02,.40,39.2],[1.79,'Gym & Office',61.7,1.43,.81,56.7],
  [2.19,'DTC Online',51.7,1.78,1.16,65.1],[2.19,'Retail/Grocery',51.7,1.25,.63,50.3],[2.19,'Gym & Office',51.7,1.75,1.13,64.6],
  [2.59,'DTC Online',26.7,2.16,1.54,71.4],[2.59,'Retail/Grocery',26.7,1.48,.86,58],[2.59,'Gym & Office',26.7,2.07,1.45,70.1]
];
export const priceTests: PriceTest[] = rawPriceTests.map(([price,channel,acceptance,net,contribution,margin])=>({price,channel,acceptance,net,contribution,margin}));
export const segments: Segment[] = [
 {name:'Urban Wellness Professionals',n:112,frequency:7.56,spend:21.73,sensitivity:3.63,intent:9.12,channel:{dtc:60,retail:36,gym:16},vw:[1.21,1.81,2.75,3.48]},
 {name:'Fitness & Gym-Goers',n:83,frequency:6.23,spend:20.11,sensitivity:5.44,intent:7.97,channel:{dtc:14,retail:32,gym:37},vw:[1,1.59,2.5,3.11]},
 {name:'On-the-go Commuters',n:90,frequency:5.87,spend:19.97,sensitivity:5.98,intent:6.71,channel:{dtc:15,retail:54,gym:21},vw:[.89,1.39,2.08,2.7]},
 {name:'Students & Budget-Conscious',n:135,frequency:5.1,spend:17.24,sensitivity:7.93,intent:5.5,channel:{dtc:30,retail:73,gym:32},vw:[.69,1.09,1.71,2.2]}
];
export const cities: City[] = [
 {name:'Berlin',n:81,intent:7.4,frequency:6.16,spend:19.98,marketShare:.18,cagr:.09},{name:'Munich',n:57,intent:7.3,frequency:6.38,spend:19.89,marketShare:.15,cagr:.09},{name:'Hamburg',n:48,intent:7.52,frequency:6.32,spend:20.27,marketShare:.10,cagr:.07},{name:'Cologne',n:45,intent:7.04,frequency:6.03,spend:18.1,marketShare:.09,cagr:.07},{name:'Frankfurt',n:32,intent:7.18,frequency:5.95,spend:20.93,marketShare:.08,cagr:.07},{name:'Other Germany',n:157,intent:7.05,frequency:6.07,spend:19.23,marketShare:.4,cagr:.07}
];
export const channels: ChannelMetric[] = [
 {name:'DTC Online',preference:119,cac:28.14,ltv:81.39,source:'Referral / Subscription proxy'}, {name:'Retail/Grocery',preference:195,cac:60.13,ltv:174.17,source:'Retail Sampling proxy'}, {name:'Gym & Office',preference:106,cac:37.53,ltv:100.82,source:'Influencer / Content proxy'}
];
export const competitors = [
 ['PulsUp','Mass market',1.17,100,'2 promo months; avg shelf €1.06'],['Mate Libre','Heritage / loyal niche',1.71,40,'1 promo month; avg shelf €1.56'],['VoltFit','Premium performance',2.53,85,'1 promo month; avg shelf €2.37'],['Root & Rise','Boutique adaptogenic',3.04,15,'1 promo month; avg shelf €2.91']
];
export const quotes = [
 ['Urban Wellness Professionals','“I don’t mind paying more for clean ingredients.”','High intent and lowest price sensitivity support premium value.'],['Fitness & Gym-Goers','“It needs a real reason to take shelf space.”','Strong intent, but performance proof is essential.'],['Students & Budget-Conscious','“€2.50 for a can is a hard no.”','Survey sensitivity is highest; this is not the lead segment.'],['On-the-go Commuters','“If it’s not at the kiosk near the station I’ll never try it.”','Retail convenience matters, despite lower intent.']
];
export const seasonality = [{m:'Jan',v:78},{m:'Feb',v:80},{m:'Mar',v:88},{m:'Apr',v:98},{m:'May',v:118},{m:'Jun',v:132},{m:'Jul',v:138},{m:'Aug',v:128},{m:'Sep',v:104},{m:'Oct',v:90},{m:'Nov',v:82},{m:'Dec',v:84}];
export const weatherByMonth = [2,3,6,10,15,18,20,19,15,10,5,3];
export const competitorPromoRisk: Record<string,number> = {Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:.28,Jul:.2,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0};
export const quality = { duplicateSalesRows:4, anomaly:'Netherlands Retail/Grocery has an unusual May–June 2026 volume spike; excluded from German demand calibration.', historicalMarkets:'NL/DK/SE only — never German sales.', cogs:.62, overallVw:[.93,1.43,2.21,2.81] };
export function validateData(){
 const fail=(message:string):never=>{throw new Error(`Data validation failed: ${message}.`);};
 if(priceTests.length!==9)fail('expected 9 price/channel rows');
 const requiredChannels=['DTC Online','Retail/Grocery','Gym & Office'];
 for(const price of [1.79,2.19,2.59])for(const channel of requiredChannels){const row=priceTests.find(x=>x.price===price&&x.channel===channel);if(!row)fail(`missing ${channel} row for €${price.toFixed(2)}`);}
 const numeric=(value:number)=>Number.isFinite(value);
 if(priceTests.some(x=>[x.price,x.acceptance,x.net,x.contribution,x.margin].some(v=>!numeric(v))))fail('price data contains non-finite values');
 if(priceTests.some(x=>x.price<=0||x.acceptance<0||x.acceptance>100||x.contribution<=0||x.margin<0))fail('price data contains invalid ranges');
 if(segments.some(s=>!s.n||s.vw.length!==4||[s.n,s.frequency,s.spend,s.sensitivity,s.intent,...s.vw,...Object.values(s.channel)].some(v=>!numeric(v))))fail('segment data contains invalid values');
 if(cities.length<5||cities.some(s=>[s.n,s.intent,s.frequency,s.spend,s.marketShare,s.cagr].some(v=>!numeric(v))))fail('city data contains invalid values');
 if(channels.length!==3||channels.some(s=>!s.name||[s.preference,s.cac,s.ltv].some(v=>!numeric(v))||s.cac<=0||s.ltv<=0))fail('channel economics are incomplete or invalid');
 if(seasonality.length!==12||seasonality.some(s=>!numeric(s.v))||weatherByMonth.length!==12||weatherByMonth.some(v=>!numeric(v)))fail('seasonality or weather data is invalid');
 return true;
}
