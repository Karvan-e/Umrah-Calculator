function v15Icon(name){const p={customer:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.2"/><path d="M5.5 20c.7-3.5 3-5.5 6.5-5.5s5.8 2 6.5 5.5"/></svg>',passengers:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M3.8 20c.6-3.5 2.5-5.4 5.2-5.4s4.6 1.9 5.2 5.4"/><path d="M14 15.5c2.9-.2 4.9 1.3 5.8 4.5"/></svg>',journey:'<svg viewBox="0 0 24 24"><path d="M5 19 19 5"/><path d="M8 5h11v11"/><circle cx="5" cy="19" r="2"/></svg>',hotel:'<svg viewBox="0 0 24 24"><path d="M4 20V6l8-3 8 3v14"/><path d="M7 20v-7h10v7M7 9h2M15 9h2M7 12h2M15 12h2"/></svg>',visa:'<svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M13 8h4M13 11h4M7 15h10M7 18h7"/></svg>',flight:'<svg viewBox="0 0 24 24"><path d="M3 13h7l3-8 2 .8-1.2 7.2H21l-2 2h-6.2l1.2 5.2-2 .8-3-6H3z"/></svg>',transport:'<svg viewBox="0 0 24 24"><path d="M5 16V9l2-3h10l2 3v7"/><path d="M5 11h14M7 18h3M14 18h3"/><circle cx="7.5" cy="16.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/></svg>',extras:'<svg viewBox="0 0 24 24"><path d="M5 7h14v14H5z"/><path d="M8 7V5h8v2M9 11h6M9 15h6"/></svg>',ticket:'<svg viewBox="0 0 24 24"><path d="M4 7a2 2 0 0 0 0 4v2a2 2 0 0 0 0 4h16v-4a2 2 0 0 0 0-4V7z"/><path d="M12 8v8"/></svg>',calculator:'<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2M14 11h2M8 15h2M14 15h2M8 18h8"/></svg>'};return p[name]||p.ticket}

const roomTypes=['Sharing','Quint','Quad','Triple','Double','Full Room'];
const defaultHotels=[
['Makkah','Wedam Six','Ibrahim Khalil Road','Shuttle',15,15,18,24,35,70],['Makkah','White Lion','Hijra Road','1100 M',20,20,24,32,49,95],['Makkah','Masarat Khalil / Nada Hijra','Ibrahim Khalil / Hijra Road','750 M',41,null,45,60,90,180],['Makkah','Saif Al Majd','Hijra Road','750 M',43,43,50,67,100,200],['Makkah','Masarat Golden','Ibrahim Khalil Road','550 M',48,48,55,73,110,220],['Makkah','Badar Masa','Ibrahim Khalil Road','550 M',null,57,68,90,135,270],['Makkah','Tara Zahbi (Old-Majd Al Zahabi)','Manshia','400 M',null,null,75,100,150,300],
['Madinah','Qadat Al Dyyafah / Afaq Al Masi','Omer Bin Al Khattab Road','Shuttle',27,27,30,40,60,120],['Madinah','Hamouda Al Masi','Masjid Bilal Side','650 M',38,38,43,57,85,170],['Madinah','Hamouda Nebras Silver','Al Zahida Area Quba Road','550 M',44,44,53,70,105,210],['Madinah','Hamouda Nebras 1&2 (Old Burj Hakeem)','Masjid Bilal Side','450 M',48,48,55,73,110,220],['Madinah','Mukhtara Diamond','Markazia','120 M',null,null,75,100,150,300],['Madinah','Ansar Golden Tulip','Markazia','100 M',null,null,100,133,200,400]
];
let hotels=JSON.parse(localStorage.getItem('keaHotelsV10')||localStorage.getItem('keaHotelsV7')||'null')||defaultHotels;
const defaultVisaTypes=[{name:'Umrah Visa',adult:[615,665,690,715,765],child:615,infant:475,durations:[{days:15,pkr:0},{days:21,pkr:0},{days:30,pkr:0},{days:90,pkr:0}],active:true},{name:'Only Visa',adult:[615,665,690,715,765],child:615,infant:475,durations:[{days:15,pkr:40000},{days:21,pkr:41000},{days:28,pkr:42000},{days:75,pkr:45000}],active:true},{name:'Visit Visa',adult:[0,0,0,0,0],child:0,infant:0,durations:[{days:30,pkr:0}],active:true},{name:'Work Visa',adult:[0,0,0,0,0],child:0,infant:0,durations:[{days:30,pkr:0}],active:true},{name:'Study Visa',adult:[0,0,0,0,0],child:0,infant:0,durations:[{days:30,pkr:0}],active:true}];
let visaTypes=JSON.parse(localStorage.getItem('keaVisaV10')||localStorage.getItem('keaVisaV7')||'null')||JSON.parse(JSON.stringify(defaultVisaTypes));
(function ensureVisaTypes(){visaTypes.forEach(v=>{v.adult=Array.isArray(v.adult)?[0,1,2,3,4].map(i=>Number(v.adult[i]||0)):[0,0,0,0,0];v.child=Number(v.child||0);v.infant=Number(v.infant||0);v.durations=Array.isArray(v.durations)?v.durations.map(d=>({days:Number(d.days)||0,pkr:Number(d.pkr)||0})).filter(d=>d.days>0):[];if(!v.durations.length)v.durations=[{days:30,pkr:0}];if(String(v.name||'').trim().toLowerCase()==='umrah visa'){const umrahDays=[15,21,30,90];v.durations=umrahDays.map(days=>{const old=v.durations.find(d=>Number(d.days)===days);return {days,pkr:0};});}if(!Array.isArray(v.adultRules)||!v.adultRules.length){v.adultRules=[{label:'05–49',min:5,max:49,price:Number(v.adult[0]||0),active:true},{label:'04',min:4,max:4,price:Number(v.adult[1]||0),active:true},{label:'03',min:3,max:3,price:Number(v.adult[2]||0),active:true},{label:'02',min:2,max:2,price:Number(v.adult[3]||0),active:true},{label:'01',min:1,max:1,price:Number(v.adult[4]||0),active:true}];}else{v.adultRules=v.adultRules.map(r=>({label:String(r.label||''),min:Number(r.min)||1,max:Number(r.max)||Number(r.min)||1,price:Number(r.price)||0,active:r.active!==false}));}if(v.active===undefined)v.active=true;});localStorage.setItem('keaVisaV10',JSON.stringify(visaTypes));})();
let transport=JSON.parse(localStorage.getItem('keaTransportV10')||localStorage.getItem('keaTransportV7')||'null')||[{name:'Airport Transfer — Private Sedan',price:0,unit:'per vehicle',active:true},{name:'Makkah ↔ Madinah — Bus',price:0,unit:'per vehicle',active:true}];
let extras=JSON.parse(localStorage.getItem('keaExtrasV10')||localStorage.getItem('keaExtrasV7')||'null')||[{name:'Ziyarah (Makkah)',price:0,unit:'per person',active:true},{name:'Ziyarah (Madinah)',price:0,unit:'per person',active:true},{name:'SIM Card',price:0,unit:'per SIM',active:true}];
let fx=Number(localStorage.getItem('keaFxV15')||75),quotes=[],q=null,step=0,hotelCity='Makkah',pc=null,packageCosts=[];
const AUTH_KEY='keaUsersV10',SESSION_KEY='keaSessionV10';
const SECURITY_QUESTIONS=[
  'What city were you born in?',
  'What is your mother’s maiden name?',
  'What was the name of your first school?',
  'What is the name of your first pet?',
  'What was the make or model of your first car?'
];
let users=JSON.parse(localStorage.getItem(AUTH_KEY)||'null');
if(!users){
  users=[{username:'Umar',email:'umar@karvan-e-asal.local',firstName:'Umar',lastName:'',name:'Umar',contact:'',agency:'Karvan e Asal',address:'',role:'superadmin',active:true,passHash:'f21b65d0d8d1636ed42c50658ad9170de8e8b3404f50f48a21ea7a3b23866999',securityQuestion:'',securityAnswerHash:'',createdAt:new Date().toISOString()}];
  localStorage.setItem(AUTH_KEY,JSON.stringify(users));
}else{
  let changed=false;
  users=users.map(u=>{u.email=u.email||'';u.firstName=u.firstName||((u.name||u.username||'').split(' ')[0]);u.lastName=u.lastName||'';u.contact=u.contact||'';u.agency=u.agency||'';u.address=u.address||'';u.securityQuestion=u.securityQuestion||'';u.securityAnswerHash=u.securityAnswerHash||'';return u;});
  if(!users.some(u=>u.username.toLowerCase()==='umar')){users.push({username:'Umar',email:'umar@karvan-e-asal.local',firstName:'Umar',lastName:'',name:'Umar',contact:'',agency:'Karvan e Asal',address:'',role:'superadmin',active:true,passHash:'f21b65d0d8d1636ed42c50658ad9170de8e8b3404f50f48a21ea7a3b23866999',securityQuestion:'',securityAnswerHash:'',createdAt:new Date().toISOString()});changed=true;} 
  if(changed||users.length) localStorage.setItem(AUTH_KEY,JSON.stringify(users));
}
if(!localStorage.getItem('keaQuotesV10_Umar')&&localStorage.getItem('keaQuotesV7')){localStorage.setItem('keaQuotesV10_Umar',localStorage.getItem('keaQuotesV7'));}
var currentUser=null;
function hashText(t){return crypto.subtle.digest('SHA-256',new TextEncoder().encode(t)).then(b=>Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join(''));}
function quoteKey(){return 'keaQuotesV10_'+(currentUser?.username||'guest');}
function loadUserQuotes(){quotes=JSON.parse(localStorage.getItem(quoteKey())||'[]');}
function saveQuotes(){localStorage.setItem(quoteKey(),JSON.stringify(quotes));}
function packageKey(){return 'keaPackageCostsV11_'+(currentUser?.username||'guest');}
function loadPackageCosts(){packageCosts=JSON.parse(localStorage.getItem(packageKey())||'[]');}
function savePackageCosts(){localStorage.setItem(packageKey(),JSON.stringify(packageCosts));}
function sessionUser(){let u=sessionStorage.getItem(SESSION_KEY);return u?users.find(x=>x.username.toLowerCase()===u.toLowerCase()&&x.active):null;}
function showAuthError(msg){let e=$('authError');e.textContent=msg||'';e.style.display=msg?'block':'none';}
function fillSecurityQuestions(){let opts=SECURITY_QUESTIONS.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('');$('regQuestion').innerHTML='<option value="">Select a security question</option>'+opts;$('resetQuestion').innerHTML='<option value="">Select a security question</option>'+opts;}
function showAuthPanel(panel){['login','register','forgot'].forEach(x=>$(x+'Panel').style.display=x===panel?'block':'none');showAuthError('');if(panel==='register'||panel==='forgot')fillSecurityQuestions();}
async function loadResetQuestionFromEmail(){try{const email=$('resetEmail').value.trim().toLowerCase();if(!email)return;const r=await sb().rpc('get_password_reset_question',{p_email:email});if(r?.error||!r?.data)return;const q=String(r.data);const sel=$('resetQuestion');if([...sel.options].some(o=>o.value===q))sel.value=q;}catch(e){}}
function usernameFromEmail(email){let base=email.split('@')[0].toLowerCase().replace(/[^a-z0-9._-]/g,'');if(base.length<3)base='user'+base;let u=base,i=2;while(users.some(x=>x.username.toLowerCase()===u.toLowerCase()))u=base+(i++);return u;}
async function loginUser(){let un=$('loginUser').value.trim().toLowerCase(),pw=$('loginPass').value;let err=$('authError');let u=users.find(x=>(x.username.toLowerCase()===un||String(x.email||'').toLowerCase()===un)&&x.active);if(!u){showAuthError('Invalid email/username, password, or inactive account.');return;}let h=await hashText(pw);if(h!==u.passHash){showAuthError('Invalid email/username or password.');return;}currentUser=u;sessionStorage.setItem(SESSION_KEY,u.username);loadUserQuotes();loadPackageCosts();$('authScreen').style.display='none';$('appRoot').style.display='block';applyUserUI();init();}
async function registerUser(){let first=$('regFirst').value.trim(),last=$('regLast').value.trim(),email=$('regEmail').value.trim().toLowerCase(),contact=$('regContact').value.trim(),agency=$('regAgency').value.trim(),address=$('regAddress').value.trim(),pass=$('regPass').value,pass2=$('regPass2').value,question=$('regQuestion').value,answer=$('regAnswer').value.trim();if(!first||!last||!email||!contact||!agency||!address||!pass||!pass2||!question||!answer)return showAuthError('Please complete all required registration fields.');if(!/^\S+@\S+\.\S+$/.test(email))return showAuthError('Please enter a valid email address.');if(users.some(u=>String(u.email||'').toLowerCase()===email))return showAuthError('An account with this email already exists.');if(pass.length<8)return showAuthError('Password must be at least 8 characters.');if(pass!==pass2)return showAuthError('Passwords do not match.');let username=usernameFromEmail(email);let [passHash,securityAnswerHash]=await Promise.all([hashText(pass),hashText(answer.toLowerCase())]);let u={username,email,firstName:first,lastName:last,name:(first+' '+last).trim(),contact,agency,address,role:'user',active:true,passHash,securityQuestion:question,securityAnswerHash,createdAt:new Date().toISOString()};users.push(u);localStorage.setItem(AUTH_KEY,JSON.stringify(users));$('loginUser').value=username;$('loginPass').value='';showAuthPanel('login');showAuthError('Account created successfully. Your username is '+username+'. You can now sign in.');}
async function resetPasswordBySecurity(){let email=$('resetEmail').value.trim().toLowerCase(),question=$('resetQuestion').value,answer=$('resetAnswer').value.trim(),p=$('resetPass').value,p2=$('resetPass2').value;let u=users.find(x=>String(x.email||'').toLowerCase()===email);if(!u)return showAuthError('No registered account was found for this email.');if(!u.securityQuestion||!u.securityAnswerHash)return showAuthError('This account does not have a password-recovery security question. Ask an administrator to reset the password.');if(question!==u.securityQuestion)return showAuthError('The selected security question does not match this account.');if(p.length<8)return showAuthError('New password must be at least 8 characters.');if(p!==p2)return showAuthError('New passwords do not match.');let ah=await hashText(answer.toLowerCase());if(ah!==u.securityAnswerHash)return showAuthError('Incorrect security answer.');u.passHash=await hashText(p);localStorage.setItem(AUTH_KEY,JSON.stringify(users));showAuthPanel('login');showAuthError('Password reset successfully. You can now sign in.');}
function logoutUser(){sessionStorage.removeItem(SESSION_KEY);currentUser=null;quotes=[];q=null;$('appRoot').style.display='none';$('authScreen').style.display='flex';$('loginPass').value='';$('authError').style.display='none';}
function applyUserUI(){ $('topUserName').textContent=currentUser?.name||currentUser?.username||'User';$('topUserRole').textContent=' • '+(currentUser?.role==='superadmin'?'Super Admin':currentUser?.role==='admin'?'Administrator':'User');let admin=['admin','superadmin'].includes(currentUser?.role);document.querySelectorAll('.adminOnly').forEach(x=>x.style.display=admin?'':'none');}
function setTheme(mode){const m=mode==='night'?'night':'day';document.documentElement.setAttribute('data-theme',m);localStorage.setItem('keaTheme',m);const icon=document.getElementById('themeToggleIcon');if(icon)icon.innerHTML=m==='night'?'<svg viewBox="0 0 24 24"><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5z"/></svg>':'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';const db=document.getElementById('dayModeBtn'),nb=document.getElementById('nightModeBtn');if(db)db.classList.toggle('primary',m==='day');if(nb)nb.classList.toggle('primary',m==='night');const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute('content',m==='night'?'#07111f':'#061a3a');}
function toggleTheme(){setTheme(document.documentElement.getAttribute('data-theme')==='night'?'day':'night')}
(function(){setTheme(localStorage.getItem('keaTheme')==='night'?'night':'day')})();
function initAuth(){let u=sessionUser();if(u){currentUser=u;loadUserQuotes();loadPackageCosts();$('authScreen').style.display='none';$('appRoot').style.display='block';applyUserUI();init();}else{$('authScreen').style.display='flex';$('appRoot').style.display='none';}}

const airports=[['Islamabad','ISB','Pakistan','PK'],['Lahore','LHE','Pakistan','PK'],['Rawalpindi','RWP','Pakistan','PK'],['Sialkot','SKT','Pakistan','PK'],['Karachi','KHI','Pakistan','PK'],['Multan','MUX','Pakistan','PK'],['Jeddah','JED','Saudi Arabia','SA'],['Madinah','MED','Saudi Arabia','SA'],['Riyadh','RUH','Saudi Arabia','SA'],['Dubai','DXB','United Arab Emirates','AE'],['Istanbul','IST','Türkiye','TR'],['Doha','DOH','Qatar','QA'],['Abu Dhabi','AUH','United Arab Emirates','AE'],['Muscat','MCT','Oman','OM'],['Bahrain','BAH','Bahrain','BH']];
let airlines=JSON.parse(localStorage.getItem('keaAirlinesV10')||localStorage.getItem('keaAirlinesV7')||'null')||[
['Pakistan International Airlines','PIA','PK'],['Airblue','Airblue','PA'],['AirSial','AirSial','PF'],['Fly Jinnah','Fly Jinnah','9P'],['SereneAir','SereneAir','ER'],['Saudia','Saudia','SV'],['flynas','flynas','XY'],['flyadeal','flyadeal','F3'],['Emirates','Emirates','EK'],['flydubai','flydubai','FZ'],['Air Arabia','Air Arabia','G9'],['Etihad Airways','Etihad','EY'],['Qatar Airways','Qatar','QR'],['SalamAir','SalamAir','OV'],['Turkish Airlines','Turkish','TK'],['Pegasus Airlines','Pegasus','PC'],['Gulf Air','Gulf Air','GF'],['Kuwait Airways','Kuwait Airways','KU'],['Oman Air','Oman Air','WY'],['Jazeera Airways','Jazeera','J9'],['Azerbaijan Airlines','Azerbaijan','J2'],['Uzbekistan Airways','Uzbekistan','HY'],['Batik Air Malaysia','Batik Air','OD'],['Royal Jordanian','Royal Jordanian','RJ'],['EgyptAir','EgyptAir','MS'],['SriLankan Airlines','SriLankan','UL']
];
function airlineOpts(v){return '<option value="">Select airline</option>'+airlines.map(a=>`<option value="${esc(a[0])}" ${v===a[0]?'selected':''}>${esc(a[0])} (${a[2]})</option>`).join('')}

const stepNames=['Customer','Passengers','Journey','Hotels','Visa','Flights','Transport','Extras'];
function $(id){return document.getElementById(id)} function sar(x){return 'SAR '+Number(x||0).toFixed(2)} function pkr(x){return 'PKR '+Math.round(Number(x||0)).toLocaleString()} function esc(s){return String(s??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]))}
function showPage(id,btn){if(id==='admin'&&!['admin','superadmin'].includes(currentUser?.role)){alert('Admin access required.');return;}document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));$(id).classList.add('active');document.querySelectorAll('.navitem,.mobileNav button').forEach(b=>b.classList.remove('active'));if(btn)btn.classList.add('active');else{let target=id==='calculator'?'new booking':id==='packageCost'?'package cost q':id==='quotes'?'voucher':id==='sales'?'sales':id==='voucher'?'voucher preview':id;let b=[...document.querySelectorAll('.navitem')].find(x=>x.textContent.toLowerCase().includes(target));if(b)b.classList.add('active')}if(id==='dashboard')dashboard();if(id==='quotes')renderSavedFiles('voucher');if(id==='sales')renderSales();if(id==='packageCost')renderPackageCost();if(id==='summary')renderSummary();if(id==='hotels')renderHotels();if(id==='visa')renderVisa();if(id==='flights')renderFlightManager();if(id==='transport')renderSimple('transport');if(id==='extras')renderSimple('extras');if(id==='settings'){$('fxInput').value=fx;renderRecycleBin();}if(id==='invoicePage')renderInvoice();if(id==='voucher')renderVoucher();if(id==='settings')renderAirlines();if(id==='admin')renderAdmin()}
function syncPassengers(){
  const total=q.adults+q.childBed+q.childNoBed+q.infants;
  const old=Array.isArray(q.passengers)?q.passengers:[];
  q.passengers=Array.from({length:total},(_,i)=>old[i]||{name:i===0?q.customer:'',passport:'',type:i<q.adults?'Adult':i<q.adults+q.childBed?'Child - With Bed':i<q.adults+q.childBed+q.childNoBed?'Child - Without Bed':'Infant',bed:i<q.adults+q.childBed?'Yes':'No',mofa:'',grp:'',visaNo:'',pnr:'',gender:''});
  q.passengers.forEach((p,i)=>{p.type=i<q.adults?'Adult':i<q.adults+q.childBed?'Child - With Bed':i<q.adults+q.childBed+q.childNoBed?'Child - Without Bed':'Infant';p.bed=(p.type==='Adult'||p.type==='Child - With Bed')?'Yes':'No';if(p.gender===undefined)p.gender=''});
}
function passengerRows(){
  syncPassengers();
  return q.passengers.map((p,i)=>`<div class="card" style="box-shadow:none;padding:10px;margin:7px 0;background:#fafbfc"><div style="display:flex;justify-content:space-between"><b>Passenger ${i+1} — ${esc(p.type)}</b><span class="badge">${p.bed==='Yes'?'Bed: Yes':'Bed: No'}</span></div><div class="grid" style="margin-top:8px"><div class="field"><label>Mutamer Name</label><input value="${esc(p.name)}" oninput="q.passengers[${i}].name=this.value"></div><div class="field"><label>Gender</label><select onchange="q.passengers[${i}].gender=this.value"><option value="" ${!p.gender?'selected':''}>Select Gender</option><option value="Male" ${p.gender==='Male'?'selected':''}>Male</option><option value="Female" ${p.gender==='Female'?'selected':''}>Female</option><option value="Other" ${p.gender==='Other'?'selected':''}>Other</option></select></div><div class="field"><label>Passport #</label><input value="${esc(p.passport)}" oninput="q.passengers[${i}].passport=this.value"></div><div class="field"><label>MOFA #</label><input value="${esc(p.mofa)}" oninput="q.passengers[${i}].mofa=this.value"></div><div class="field"><label>GRP #</label><input value="${esc(p.grp)}" oninput="q.passengers[${i}].grp=this.value"></div><div class="field"><label>Visa #</label><input value="${esc(p.visaNo)}" oninput="q.passengers[${i}].visaNo=this.value"></div><div class="field"><label>PNR</label><input value="${esc(p.pnr)}" oninput="q.passengers[${i}].pnr=this.value"></div></div></div>`).join('');
}
function newBooking(){q={bookingDate:new Date().toISOString().slice(0,10),customer:'',contact:'',whatsapp:'',reference:'KEA-'+Date.now().toString().slice(-6),package:'Umrah 1448-H',visaShirka:'',reservationNo:'',transportCompany:'',transportType:'Company Transport',transportDescription:'',departureCity:'ISB',adults:1,childBed:0,childNoBed:0,infants:0,passengers:[],departure:'',arrival:'',returnDate:'',visa:'Umrah Visa',visaDuration:30,stays:[{city:'Makkah',hotel:'',room:'Sharing',rooms:0,in:'',out:'',meal:'RO',conf:''},{city:'Madinah',hotel:'',room:'Sharing',rooms:0,in:'',out:'',meal:'RO',conf:''},{city:'Makkah',hotel:'',room:'Sharing',rooms:0,in:'',out:'',meal:'RO',conf:''},{city:'Madinah',hotel:'',room:'Sharing',rooms:0,in:'',out:'',meal:'RO',conf:''}],flights:[{type:'Outbound',from:'ISB',to:'JED',date:'',timeOut:'',timeIn:'',flight:'',airline:'Pakistan International Airlines',via:'Direct'},{type:'Return',from:'JED',to:'ISB',date:'',timeOut:'',timeIn:'',flight:'',airline:'Pakistan International Airlines',via:'Direct'}],tickets:{adult:0,childBed:0,childNoBed:0,infant:0},transport:[],extras:[]};step=-1;showPage('calculator');renderWizard()}
function startFullBooking(){step=0;showPage('calculator');renderWizard()}
function renderSteps(){const icons=['customer','passengers','journey','hotel','visa','flight','transport','extras']; $('steps').innerHTML=stepNames.map((x,i)=>`<button type="button" class="step ${i===step?'active':''}" onclick="goBookingStep(${i})"><span class="stepicon">${v15Icon(icons[i])}</span>${i+1}. ${x}</button>`).join('') }
function normalizeBooking(){if(!q)return;q.stays=Array.isArray(q.stays)?q.stays:[];while(q.stays.length<4)q.stays.push({city:q.stays.length%2===0?'Makkah':'Madinah',hotel:'',room:'Sharing',rooms:0,in:'',out:'',meal:'RO',conf:''});q.flights=Array.isArray(q.flights)?q.flights:[];if(!q.flights.length)q.flights=[{type:'Outbound',from:'ISB',to:'JED',date:'',timeOut:'',timeIn:'',flight:'',airline:'Pakistan International Airlines',via:'Direct'},{type:'Return',from:'JED',to:'ISB',date:'',timeOut:'',timeIn:'',flight:'',airline:'Pakistan International Airlines',via:'Direct'}];q.tickets=q.tickets||{adult:0,childBed:0,childNoBed:0,infant:0};q.transport=Array.isArray(q.transport)?q.transport:[];q.extras=Array.isArray(q.extras)?q.extras:[];q.passengers=Array.isArray(q.passengers)?q.passengers:[];q.adults=Number(q.adults)||0;q.childBed=Number(q.childBed)||0;q.childNoBed=Number(q.childNoBed)||0;q.infants=Number(q.infants)||0;}
function goBookingStep(i){if(i<0||i>7)return;step=i;showPage('calculator');renderWizard();window.scrollTo({top:0,behavior:'smooth'});}
function adminEditVoucherSection(i){if(!isSuperAdmin()||!q)return;window._adminEditing=window._adminEditing||{type:'Voucher',user:currentUser.username,index:q._editIndex};q._editIndex=Number.isInteger(q._editIndex)?q._editIndex:window._adminEditing.index;step=i;showPage('calculator');renderWizard();window.scrollTo({top:0,behavior:'smooth'});}
function nav(){return `<div style="display:flex;justify-content:space-between;gap:8px;margin-top:14px"><button type="button" class="btn outline" onclick="goBookingStep(Math.max(0,step-1))">← Previous</button><button type="button" class="btn primary" onclick="${step===7?'finishQuote()':'goBookingStep(step+1)'}">${step===7?'Save Voucher':'Next →'}</button></div>`}
function renderWizard(){let w=$('wizard');if(!q)return;normalizeBooking();if(step===-1){$('steps').innerHTML='';w.innerHTML=`<div class="choicegrid"><div class="choicecard" onclick="startFullBooking()"><div class="choiceicon">${v15Icon('ticket')}</div><h3>New Booking</h3><p>Create a complete booking with passenger details, hotels, visa, flights, transport, services and an automatically generated voucher.</p><button class="btn gold" style="margin-top:8px">Start New Booking</button></div><div class="choicecard" onclick="newPackageCost()"><div class="choiceicon">'+v15Icon('calculator')+'</div><h3>Calculate the Package</h3><p>Quickly calculate visa, hotel accommodation and ticket cost for adults, children with/without bed and infants.</p><button class="btn primary" style="margin-top:8px">Open Package Cost Q</button></div></div>`;return;}renderSteps();if(!q)return;
const adminEdit=isSuperAdmin() && (Number.isInteger(q._editIndex) || window._adminEditing?.type==='Voucher');const adminBar=adminEdit?`<div class="notice" style="margin-bottom:10px"><b>Super Admin Edit Mode</b><button type="button" class="btn outline" style="float:right;padding:6px 9px" onclick="showPage('voucher');renderVoucher()">Back to Voucher</button><div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">${stepNames.map((n,i)=>`<button type="button" class="btn outline" onclick="adminEditVoucherSection(${i})">${i+1}. ${n}</button>`).join('')}</div></div>`:'';
if(step===0)w.innerHTML=adminBar+`<h3 class="section-title">Customer & Origin</h3><div class="grid"><div class="field" style="grid-column:span 2"><label>Customer Name</label><input value="${esc(q.customer)}" oninput="q.customer=this.value"></div><div class="field"><label>Contact</label><input value="${esc(q.contact)}" oninput="q.contact=this.value"></div><div class="field"><label>Reference</label><input value="${esc(q.reference)}" oninput="q.reference=this.value"></div><div class="field"><label>Booking Date</label><input type="date" value="${q.bookingDate||''}" onchange="q.bookingDate=this.value"></div><div class="field"><label>Departure City</label><select onchange="q.departureCity=this.value">${airports.filter(a=>a[3]==='PK').map(a=>`<option value="${a[1]}" ${q.departureCity===a[1]?'selected':''}>${a[0]} (${a[1]})</option>`).join('')}</select></div></div>${nav()}`;
else if(step===1)w.innerHTML=adminBar+`<h3 class="section-title">Passengers & Voucher Details</h3><div class="grid"><div class="field"><label>Package</label><input value="${esc(q.package)}" oninput="q.package=this.value"></div><div class="field"><label>Visa Shirkat / Company Name</label><input value="${esc(q.visaShirka)}" oninput="q.visaShirka=this.value"></div><div class="field"><label>Reservation No.</label><input value="${esc(q.reservationNo)}" oninput="q.reservationNo=this.value"></div><div class="field"><label>WhatsApp</label><input value="${esc(q.whatsapp)}" oninput="q.whatsapp=this.value"></div></div><div class="paxgrid" style="margin-top:10px">${pax('Adults','adults')}${pax('Child With Bed','childBed')}${pax('Child Without Bed','childNoBed')}${pax('Infants','infants')}</div><div class="notice" style="margin-top:10px">Infant = visa only by default. Child without bed = visa + ticket, no hotel bed. Child with bed = hotel occupancy participant.</div><h3 class="section-title" style="margin-top:14px">Passenger / Mutamer Details</h3>${passengerRows()}${nav()}`;
else if(step===2)w.innerHTML=adminBar+`<h3 class="section-title">Journey Dates</h3><div class="grid"><div class="field"><label>Departure from Pakistan</label><input type="date" value="${q.departure}" onchange="q.departure=this.value"></div><div class="field"><label>Arrival in KSA</label><input type="date" value="${q.arrival}" onchange="q.arrival=this.value"></div><div class="field"><label>Return from KSA</label><input type="date" value="${q.returnDate}" onchange="q.returnDate=this.value"></div></div><div class="metrics" style="margin-top:12px"><div class="metric"><div class="k">Makkah Nights</div><div class="v">${cityNights('Makkah')}</div></div><div class="metric"><div class="k">Madinah Nights</div><div class="v">${cityNights('Madinah')}</div></div></div>${nav()}`;
else if(step===3)w.innerHTML=adminBar+`<h3 class="section-title">Hotel Selection</h3><div class="muted">Four stays are supported: Makkah → Madinah → Makkah → Madinah.</div>${q.stays.map((s,i)=>stayHTML(s,i)).join('')}${nav()}`;
else if(step===4)w.innerHTML=adminBar+visaStep()+nav();
else if(step===5)w.innerHTML=adminBar+`<h3 class="section-title">Flight Details</h3>${q.flights.map((f,i)=>flightHTML(f,i)).join('')}<button class="btn outline" onclick="q.flights.push({type:'Transit',from:'DXB',to:'JED',date:'',timeOut:'',timeIn:'',flight:'',airline:'',via:'Other'});renderWizard()">+ Add Flight Leg</button><div class="card" style="box-shadow:none;padding:10px;margin-top:10px;background:#f9fafb"><div class="grid"><div class="field"><label>Adult Ticket PKR</label><input type="number" value="${q.tickets.adult}" oninput="q.tickets.adult=+this.value||0"></div><div class="field"><label>Child With Bed PKR</label><input type="number" value="${q.tickets.childBed}" oninput="q.tickets.childBed=+this.value||0"></div><div class="field"><label>Child Without Bed PKR</label><input type="number" value="${q.tickets.childNoBed}" oninput="q.tickets.childNoBed=+this.value||0"></div><div class="field"><label>Infant Ticket PKR</label><input type="number" value="${q.tickets.infant}" oninput="q.tickets.infant=+this.value||0"></div></div></div>${nav()}`;
else if(step===6)w.innerHTML=adminBar+`<h3 class="section-title">Transportation & Voucher Details</h3><div class="grid"><div class="field"><label>Transport Company</label><input value="${esc(q.transportCompany)}" oninput="q.transportCompany=this.value"></div><div class="field"><label>Transport Type</label><select onchange="q.transportType=this.value"><option ${q.transportType==='Company Transport'?'selected':''}>Company Transport</option><option ${q.transportType==='Self Transport'?'selected':''}>Self Transport</option><option ${q.transportType==='Private Transport'?'selected':''}>Private Transport</option></select></div><div class="field" style="grid-column:span 2"><label>Description</label><input value="${esc(q.transportDescription)}" oninput="q.transportDescription=this.value"></div></div>${q.transport.map((x,i)=>serviceRow(x,i,'transport')).join('')}<button class="btn outline" onclick="q.transport.push({name:transport[0]?.name||'',qty:1});renderWizard()">+ Add Transport</button>${nav()}`;
else if(step===7)w.innerHTML=adminBar+`<h3 class="section-title">Extras / Services</h3>${extras.map(x=>`<label style="display:block;padding:9px;border:1px solid var(--line);border-radius:9px;margin:7px 0;font-size:11px"><input type="checkbox" style="width:auto;min-height:0" ${q.extras.includes(x.name)?'checked':''} onchange="toggleExtra('${esc(x.name)}',this.checked)"> ${esc(x.name)} <span class="muted">(${sar(x.price)} ${esc(x.unit)})</span></label>`).join('')}${nav()}`;}
function pax(label,key){return `<div class="pax"><b>${label}</b><div class="counter"><button onclick="q.${key}=Math.max(0,q.${key}-1);renderWizard()">−</button><input readonly value="${q[key]}"><button onclick="q.${key}++;renderWizard()">+</button></div></div>`}
function airportOpts(value, countryFilter){
  const list = countryFilter ? airports.filter(a=>a[3]===countryFilter) : airports;
  return '<option value="">Select airport</option>' + list.map(a=>`<option value="${esc(a[1])}" ${value===a[1]?'selected':''}>${esc(a[0])} (${a[1]}) — ${esc(a[2])}</option>`).join('');
}
function flightHTML(f,i){
  f=f||{};
  const type=f.type||'Outbound';
  const from=f.from||'';
  const to=f.to||'';
  const via=f.via||'Direct';
  return `<div class="flight" style="margin-top:10px">
    <div class="stayhead"><b>Flight Leg ${i+1}</b><button type="button" class="btn danger" onclick="removeFlight(${i})">Remove</button></div>
    <div class="grid" style="margin-top:9px">
      <div class="field"><label>Flight Type</label><select onchange="q.flights[${i}].type=this.value;renderWizard()">
        ${['Outbound','Return','Transit','Transit Return'].map(x=>`<option value="${x}" ${type===x?'selected':''}>${x}</option>`).join('')}
      </select></div>
      <div class="field"><label>Airline</label><select onchange="q.flights[${i}].airline=this.value">${airlineOpts(f.airline)}</select></div>
      <div class="field"><label>Flight #</label><input value="${esc(f.flight||'')}" placeholder="e.g. PK-739" oninput="q.flights[${i}].flight=this.value"></div>
      <div class="field"><label>Routing</label><select onchange="q.flights[${i}].via=this.value"><option ${via==='Direct'?'selected':''}>Direct</option><option ${via==='Dubai'?'selected':''}>Dubai</option><option ${via==='Doha'?'selected':''}>Doha</option><option ${via==='Istanbul'?'selected':''}>Istanbul</option><option ${via==='Abu Dhabi'?'selected':''}>Abu Dhabi</option><option ${via==='Muscat'?'selected':''}>Muscat</option><option ${via==='Other'?'selected':''}>Other</option></select></div>
      <div class="field"><label>From Airport</label><select onchange="q.flights[${i}].from=this.value">${airportOpts(from)}</select></div>
      <div class="field"><label>To Airport</label><select onchange="q.flights[${i}].to=this.value">${airportOpts(to)}</select></div>
      <div class="field"><label>Travel Date</label><input type="date" value="${esc(f.date||'')}" onchange="q.flights[${i}].date=this.value"></div>
      <div class="field"><label>Departure Time</label><input type="time" value="${esc(f.timeOut||'')}" onchange="q.flights[${i}].timeOut=this.value"></div>
      <div class="field"><label>Arrival Time</label><input type="time" value="${esc(f.timeIn||'')}" onchange="q.flights[${i}].timeIn=this.value"></div>
    </div>
  </div>`;
}
function removeFlight(i){
  if(!q||!Array.isArray(q.flights))return;
  if(q.flights.length<=1){alert('At least one flight leg must remain.');return;}
  if(!confirm('Remove this flight leg?'))return;
  q.flights.splice(i,1);renderWizard();
}
function hotelObj(s){if(!s)return null;return hotels.find(h=>Array.isArray(h)&&h[0]===s.city&&h[1]===s.hotel)||null}
function stayHTML(s,i){let hs=hotels.filter(h=>h[0]===s.city),h=hotelObj(s);return `<div class="stay"><div class="stayhead"><b>${i+1}. ${s.city}</b><span class="badge">${stayNights(s)} nights</span></div><div class="grid" style="margin-top:8px"><div class="field"><label>Check-in</label><input type="date" value="${s.in||''}" onchange="q.stays[${i}].in=this.value;renderWizard()"></div><div class="field"><label>Check-out</label><input type="date" value="${s.out||''}" onchange="q.stays[${i}].out=this.value;renderWizard()"></div><div class="field" style="grid-column:span 2"><label>Hotel</label><select onchange="q.stays[${i}].hotel=this.value;renderWizard()"><option value="">Select hotel</option>${hs.map(x=>`<option ${s.hotel===x[1]?'selected':''}>${esc(x[1])}</option>`).join('')}</select></div><div class="field"><label>Room Type</label><select onchange="q.stays[${i}].room=this.value;renderWizard()">${roomTypes.map(r=>`<option ${s.room===r?'selected':''}>${r}</option>`).join('')}</select></div><div class="field"><label>Rooms (0 = sharing)</label><input type="number" min="0" value="${s.rooms||0}" onchange="q.stays[${i}].rooms=+this.value||0;renderWizard()"></div><div class="field"><label>Meal</label><select onchange="q.stays[${i}].meal=this.value"><option ${s.meal==='RO'||!s.meal?'selected':''}>RO</option><option ${s.meal==='BB'?'selected':''}>BB</option><option ${s.meal==='HB'?'selected':''}>HB</option><option ${s.meal==='FB'?'selected':''}>FB</option></select></div><div class="field"><label>Confirmation #</label><input value="${esc(s.conf||'')}" oninput="q.stays[${i}].conf=this.value"></div></div><div class="rate">Distance: <b>${esc(h?.[3]||'—')}</b> • Location: ${esc(h?.[2]||'—')} • Cost: <b>${sar(hotelCost(s))}</b></div></div>`}
function selectedVisaRule(v,duration){return (v?.durations||[]).find(d=>Number(d.days)===Number(duration))||null}
function visaForGroup(){let n=q.adults+q.childBed+q.childNoBed,v=visaTypes.find(x=>x.name===q.visa)||visaTypes[0];if(!v)return 0;let d=selectedVisaRule(v,q.visaDuration);if(d&&Number(d.pkr)>0)return Number(d.pkr)/fx;let r=(v.adultRules||[]).find(x=>x.active!==false&&n>=Number(x.min)&&n<=Number(x.max));return r?Number(r.price||0):0}
function visaStep(){let v=visaTypes.find(x=>x.name===q.visa)||visaTypes[0],n=q.adults+q.childBed+q.childNoBed;if(!v)return `<div class="notice">No active visa type is configured.</div>`;let dur=v.durations||[];if(!dur.some(d=>Number(d.days)===Number(q.visaDuration)))q.visaDuration=dur[0]?.days||30;let rule=selectedVisaRule(v,q.visaDuration),priceSar=rule&&Number(rule.pkr)>0?Number(rule.pkr)/fx:visaForGroup();return `<h3 class="section-title">Visa Selection</h3><div class="grid2"><div class="field"><label>Visa Type</label><select onchange="q.visa=this.value;q.visaDuration=(visaTypes.find(x=>x.name===this.value)?.durations?.[0]?.days||30);renderWizard()">${visaTypes.filter(x=>x.active).map(x=>`<option ${q.visa===x.name?'selected':''}>${esc(x.name)}</option>`).join('')}</select></div><div class="field"><label>Visa Duration / Category</label><select onchange="q.visaDuration=+this.value;renderWizard()">${dur.map(d=>`<option value="${d.days}" ${Number(q.visaDuration)===Number(d.days)?'selected':''}>${d.days} Days — PKR ${Number(d.pkr).toLocaleString()} / SAR ${(Number(d.pkr)/fx).toFixed(2)}</option>`).join('')}</select></div></div><div class="notice" style="margin-top:8px"><b>Selected:</b> ${esc(v.name)} • <b>${q.visaDuration} days</b> • <b>${sar(priceSar)} per person</b> • 1 SAR = ${fx} PKR</div><div class="tablewrap" style="margin-top:10px"><table class="table"><tr><th>Adult Group</th><th>SAR</th><th>PKR</th></tr>${[[0,'05–49'],[1,'04'],[2,'03'],[3,'02'],[4,'01']].map(([i,l])=>`<tr><td>${l}</td><td>${v.adult[i]}</td><td>${Math.round(v.adult[i]*fx).toLocaleString()}</td></tr>`).join('')}</table></div><div class="grid2" style="margin-top:10px"><div class="field"><label>Child Visa (SAR)</label><input type="number" value="${v.child}" onchange="v.child=+this.value||0;saveData();renderWizard()"></div><div class="field"><label>Infant Visa (SAR)</label><input type="number" value="${v.infant}" onchange="v.infant=+this.value||0;saveData();renderWizard()"></div></div>`}
function stayNights(s){if(!s.in||!s.out)return 0;return Math.max(0,Math.round((new Date(s.out)-new Date(s.in))/86400000))}
function cityNights(c){return q.stays.filter(s=>s.city===c).reduce((a,s)=>a+stayNights(s),0)}
function hotelProvider(h){return h?.[10]?.provider||'Gulf'}
function hotelPeriods(h){return Array.isArray(h?.[10]?.periods)?h[10].periods:[]}
function meePeriodForDate(h,date){const d=String(date||'').slice(0,10);return hotelProvider(h)==='Meezab'&&d?hotelPeriods(h).find(p=>d>=String(p.start).slice(0,10)&&d<=String(p.end).slice(0,10))||null:null}
function meePerPersonRate(h,date,room){const p=meePeriodForDate(h,date);if(!p)return null;if(room==='Sharing')return p.sharing==null?null:Number(p.sharing);if(room==='Full Room')return p.room==null?null:Number(p.room);const div={Quint:5,Quad:4,Triple:3,Double:2}[room];return div&&p.room!=null?Number(p.room)/div:null}
function hotelRate(s){let h=hotelObj(s);if(!h)return 0;let r=hotelProvider(h)==='Meezab'?meePerPersonRate(h,s.in,s.room):h[4+roomTypes.indexOf(s.room)];return r==null?0:r}
function hotelCost(s){let r=hotelRate(s),n=stayNights(s),eligible=q.adults+q.childBed;if(!r||!n)return 0;if(s.rooms>0||s.room==='Full Room')return r*Math.max(1,s.rooms)*n;return r*eligible*n}
function totals(){let v=visaTypes.find(x=>x.name===q.visa)||visaTypes[0],groupVisa=visaForGroup(),hotel=q.stays.reduce((a,s)=>a+hotelCost(s),0),eligible=q.adults+q.childBed,adultHotel=eligible?hotel*q.adults/eligible:0,childHotel=eligible?hotel*q.childBed/eligible:0,av=q.adults*groupVisa,cv=(q.childBed+q.childNoBed)*(v?.child||0),iv=q.infants*(v?.infant||0),at=q.adults*q.tickets.adult/fx,ct=(q.childBed*q.tickets.childBed+q.childNoBed*q.tickets.childNoBed)/fx,it=q.infants*q.tickets.infant/fx,trans=q.transport.reduce((a,x)=>a+(transport.find(t=>t.name===x.name)?.price||0)*(x.qty||1),0),ex=q.extras.reduce((a,n)=>{let e=extras.find(x=>x.name===n);return a+(e?.price||0)*(e?.unit.includes('person')?(q.adults+q.childBed+q.childNoBed+q.infants):1)},0);return{av,cv,iv,adultHotel,childHotel,at,ct,it,trans,ex,adult:av+adultHotel+at,child:cv+childHotel+ct,infant:iv+it,hotel,grand:av+cv+iv+hotel+at+ct+it+trans+ex}}
function newPackageCost(){pc={id:Date.now(),date:new Date().toISOString().slice(0,10),reference:'PCQ-'+Date.now().toString().slice(-6),visa:'Umrah Visa',visaDuration:30,adults:1,childBed:0,childNoBed:0,infants:0,makkahHotel:'',makkahRoom:'Sharing',makkahRooms:0,makkahNights:0,madinahHotel:'',madinahRoom:'Sharing',madinahRooms:0,madinahNights:0,tickets:{adult:0,childBed:0,childNoBed:0,infant:0}};showPage('packageCost');renderPackageCost()}
function pcVisaPerAdult(){let v=visaTypes.find(x=>x.name===pc.visa)||visaTypes[0],d=selectedVisaRule(v,pc.visaDuration);if(d&&Number(d.pkr)>0)return Number(d.pkr)/fx;let n=pc.adults+pc.childBed+pc.childNoBed;return n>=5?v.adult[0]:n===4?v.adult[1]:n===3?v.adult[2]:n===2?v.adult[3]:v.adult[4]}
function pcHotelObj(city,name){return hotels.find(h=>h[0]===city&&h[1]===name)}
function pcRate(city,name,room,checkin){let h=pcHotelObj(city,name);if(!h)return 0;let r=hotelProvider(h)==='Meezab'?meePerPersonRate(h,checkin,room):h[4+roomTypes.indexOf(room)];return r==null?0:r}
function pcHotelCost(city,name,room,rooms,nights){let r=pcRate(city,name,room);if(!r||!nights)return 0;let eligible=pc.adults+pc.childBed;if(rooms>0||room==='Full Room')return r*Math.max(1,rooms)*nights;return r*eligible*nights}
function pcTotals(){let v=visaTypes.find(x=>x.name===pc.visa)||visaTypes[0],av=pc.adults*pcVisaPerAdult(),cv=(pc.childBed+pc.childNoBed)*v.child,iv=pc.infants*v.infant,mc=pcHotelCost('Makkah',pc.makkahHotel,pc.makkahRoom,pc.makkahRooms,pc.makkahNights),dc=pcHotelCost('Madinah',pc.madinahHotel,pc.madinahRoom,pc.madinahRooms,pc.madinahNights),hotel=mc+dc,eligible=pc.adults+pc.childBed,adultHotel=eligible?hotel*pc.adults/eligible:0,childBedHotel=eligible?hotel*pc.childBed/eligible:0,at=pc.adults*pc.tickets.adult/fx,ctb=pc.childBed*pc.tickets.childBed/fx,ctn=pc.childNoBed*pc.tickets.childNoBed/fx,it=0;return{av,cv,iv,mc,dc,hotel,adultHotel,childBedHotel,at,ctb,ctn,it,adult:av+adultHotel+at,childBed:(pc.childBed*v.child)+childBedHotel+ctb,childNoBed:(pc.childNoBed*v.child)+ctn,infant:iv+it,grand:av+cv+iv+hotel+at+ctb+ctn+it}}
function pcPax(label,key){return `<div class="pax"><b>${label}</b><div class="counter"><button onclick="pc.${key}=Math.max(0,pc.${key}-1);renderPackageCost()">−</button><input readonly value="${pc[key]}"><button onclick="pc.${key}++;renderPackageCost()">+</button></div></div>`}
function pcHotelFields(city,prefix){let nameKey=prefix+'Hotel',roomKey=prefix+'Room',roomsKey=prefix+'Rooms',nightsKey=prefix+'Nights',names=hotels.filter(h=>h[0]===city);return `<div class="stay"><div class="stayhead"><b>${city} Accommodation</b><span class="badge">${pc[nightsKey]} nights</span></div><div class="grid" style="margin-top:8px"><div class="field" style="grid-column:span 2"><label>Hotel</label><select onchange="pc.${nameKey}=this.value;renderPackageCost()"><option value="">Select hotel</option>${names.map(h=>`<option ${pc[nameKey]===h[1]?'selected':''}>${esc(h[1])}</option>`).join('')}</select></div><div class="field"><label>Room Type</label><select onchange="pc.${roomKey}=this.value;renderPackageCost()">${roomTypes.map(r=>`<option ${pc[roomKey]===r?'selected':''}>${r}</option>`).join('')}</select></div><div class="field"><label>Rooms (0 = sharing)</label><input type="number" min="0" value="${pc[roomsKey]}" onchange="pc.${roomsKey}=+this.value||0;renderPackageCost()"></div><div class="field"><label>Nights</label><input type="number" min="0" value="${pc[nightsKey]}" onchange="pc.${nightsKey}=+this.value||0;renderPackageCost()"></div></div><div class="rate">Distance: <b>${esc(pcHotelObj(city,pc[nameKey])?.[3]||'—')}</b> • Rate: <b>${sar(pcRate(city,pc[nameKey],pc[roomKey]))}</b> • Cost: <b>${sar(pcHotelCost(city,pc[nameKey],pc[roomKey],pc[roomsKey],pc[nightsKey]))}</b></div></div>`}
function renderPackageCost(){let box=$('packageCostBody');if(!box)return;if(!pc){box.innerHTML='<div class="choicegrid"><div class="choicecard" onclick="newPackageCost()"><div class="choiceicon">'+v15Icon('calculator')+'</div><h3>Calculate the Package</h3><p>Start a simple visa + hotel + ticket calculation.</p></div></div>';return;}let t=pcTotals();box.innerHTML=`<div class="grid"><div class="field"><label>Booking / Calculation Date</label><input type="date" value="${pc.date}" onchange="pc.date=this.value"></div><div class="field"><label>Reference</label><input value="${esc(pc.reference)}" oninput="pc.reference=this.value"></div><div class="field"><label>Visa Type</label><select onchange="pc.visa=this.value;renderPackageCost()">${visaTypes.filter(v=>v.active).map(v=>`<option ${pc.visa===v.name?'selected':''}>${esc(v.name)}</option>`).join('')}</select></div><div class="field"><label>Visa Duration / Category</label><select onchange="pc.visaDuration=+this.value;renderPackageCost()">${(visaTypes.find(x=>x.name===pc.visa)||visaTypes[0]).durations.map(d=>`<option value="${d.days}" ${Number(pc.visaDuration)===Number(d.days)?'selected':''}>${d.days} Days — PKR ${Number(d.pkr).toLocaleString()} / SAR ${(Number(d.pkr)/fx).toFixed(2)}</option>`).join('')}</select></div><div class="notice"><b>Adult visa:</b> ${sar(pcVisaPerAdult())} per person based on ${pc.adults+pc.childBed+pc.childNoBed} non-infant pax.</div></div><h3 class="section-title" style="margin-top:14px">Passengers</h3><div class="paxgrid">${pcPax('Adults','adults')}${pcPax('Child With Bed','childBed')}${pcPax('Child Without Bed','childNoBed')}${pcPax('Infants','infants')}</div><div class="notice" style="margin-top:10px">Same accommodation rule as New Booking: child without bed is not counted for hotel occupancy; child with bed is counted. Infant has no hotel bed.</div><h3 class="section-title" style="margin-top:14px">Hotel Accommodation</h3>${pcHotelFields('Makkah','makkah')}${pcHotelFields('Madinah','madinah')}<h3 class="section-title" style="margin-top:14px">Ticket Cost (PKR)</h3><div class="grid"><div class="field"><label>Adult Ticket</label><input type="number" value="${pc.tickets.adult}" onchange="pc.tickets.adult=+this.value||0;renderPackageCost()"></div><div class="field"><label>Child With Bed Ticket</label><input type="number" value="${pc.tickets.childBed}" onchange="pc.tickets.childBed=+this.value||0;renderPackageCost()"></div><div class="field"><label>Child Without Bed Ticket</label><input type="number" value="${pc.tickets.childNoBed}" onchange="pc.tickets.childNoBed=+this.value||0;renderPackageCost()"></div><div class="field"><label>Infant Ticket</label><input type="number" value="0" readonly><div class="mini-note">Infant ticket = SAR 0 / PKR 0 by package rule.</div></div></div><h3 class="section-title" style="margin-top:14px">Package Result</h3><div class="pcresult">${pc.adults?`<div class="pcrow"><span>Adults (${pc.adults})<br><span class="mini-note">Visa ${sar(t.av)} • Hotel ${sar(t.adultHotel)} • Ticket ${sar(t.at)}</span></span><b>${sar(t.adult)}<br><span class="mini-note">${pkr(t.adult*fx)}</span></b></div>`:''}${pc.childBed?`<div class="pcrow"><span>Child With Bed (${pc.childBed})<br><span class="mini-note">Visa ${sar(pc.childBed*(visaTypes.find(x=>x.name===pc.visa)||visaTypes[0]).child)} • Hotel ${sar(t.childBedHotel)} • Ticket ${sar(t.ctb)}</span></span><b>${sar(t.childBed)}<br><span class="mini-note">${pkr(t.childBed*fx)}</span></b></div>`:''}${pc.childNoBed?`<div class="pcrow"><span>Child Without Bed (${pc.childNoBed})<br><span class="mini-note">Visa ${sar(pc.childNoBed*(visaTypes.find(x=>x.name===pc.visa)||visaTypes[0]).child)} • Hotel SAR 0 • Ticket ${sar(t.ctn)}</span></span><b>${sar(t.childNoBed)}<br><span class="mini-note">${pkr(t.childNoBed*fx)}</span></b></div>`:''}${pc.infants?`<div class="pcrow"><span>Infants (${pc.infants})<br><span class="mini-note">Visa ${sar(t.iv)} • Hotel SAR 0 • Ticket ${sar(t.it)}</span></span><b>${sar(t.infant)}<br><span class="mini-note">${pkr(t.infant*fx)}</span></b></div>`:''}<div class="pcrow"><span>Makkah Hotel</span><b>${sar(t.mc)}<br><span class="mini-note">${pkr(t.mc*fx)}</span></b></div><div class="pcrow"><span>Madinah Hotel</span><b>${sar(t.dc)}<br><span class="mini-note">${pkr(t.dc*fx)}</span></b></div><div class="pcrow pcgrand"><span>Total Package Cost</span><b>${sar(t.grand)}<br><span class="mini-note">${pkr(t.grand*fx)} • 1 SAR = ${fx} PKR</span></b></div></div><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button class="btn gold" onclick="savePackageCost()">Save Package Cost Q</button><button class="btn outline" onclick="newPackageCost()">Clear / New</button></div><h3 class="section-title" style="margin-top:16px">My Saved Package Cost Q</h3>${packageCosts.length?packageCosts.map((x,i)=>`<div class="service" style="display:flex;justify-content:space-between;align-items:center"><div><b>${esc(x.reference)}</b><div class="muted">${esc(x.date)} • ${x.adults} adults • ${x.childBed} child with bed • ${x.childNoBed} child without bed • ${x.infants} infants • ${sar(x.total)}</div></div><div style="display:flex;gap:5px;flex-wrap:wrap"><button class="btn outline" onclick="openSavedQuote(${i})">Open</button><button class="btn outline" onclick="printSavedQuote(${i})">Print PDF</button><button class="btn outline" onclick="downloadSavedQuote(${i})">Download</button>${isSuperAdmin()?`<button class="btn outline" onclick="editSavedQuote(${i})">Edit</button><button class="btn danger" onclick="deleteSavedRecord('quote',${i})">Delete</button>`:''}</div></div>`).join(''):'<div class="muted">No saved Package Cost Q records yet.</div>'}`}
function savePackageCost(){if(!pc)return;const wasEdit=isSuperAdmin()&&Number.isInteger(pc._editIndex);pc.total=pcTotals().grand;pc.savedAt=pc.savedAt||new Date().toISOString();pc.savedBy=wasEdit&&window._adminEditing?window._adminEditing.user:(currentUser?.username||'guest');if(wasEdit&&window._adminEditing?.type==='Package Cost Q'){let owner=window._adminEditing.user;let arr=JSON.parse(localStorage.getItem('keaPackageCostsV11_'+owner)||'[]');let idx=window._adminEditing.index;delete pc._editIndex;arr[idx]=JSON.parse(JSON.stringify(pc));localStorage.setItem('keaPackageCostsV11_'+owner,JSON.stringify(arr));window._adminEditing=null;packageCosts=owner===currentUser.username?arr:packageCosts;}else if(wasEdit){let idx=pc._editIndex;delete pc._editIndex;packageCosts[idx]=JSON.parse(JSON.stringify(pc));savePackageCosts();}else{packageCosts.unshift(JSON.parse(JSON.stringify(pc)));packageCosts=packageCosts.slice(0,100);savePackageCosts();}renderPackageCost();alert(wasEdit?'Package Cost Q updated.':'Package Cost Q saved to your account.');}
function finishQuote(){const wasEdit=isSuperAdmin()&&Number.isInteger(q._editIndex);q.total=totals().grand;q.savedAt=q.savedAt||new Date().toISOString();q.id=q.id||Date.now();if(wasEdit&&window._adminEditing?.type==='Voucher'){let owner=window._adminEditing.user;let arr=JSON.parse(localStorage.getItem('keaQuotesV10_'+owner)||'[]');let idx=window._adminEditing.index;delete q._editIndex;arr[idx]=JSON.parse(JSON.stringify(q));localStorage.setItem('keaQuotesV10_'+owner,JSON.stringify(arr));window._adminEditing=null;quotes=owner===currentUser.username?arr:quotes;}else if(wasEdit){let idx=q._editIndex;delete q._editIndex;quotes[idx]=JSON.parse(JSON.stringify(q));saveQuotes();}else{quotes.unshift(JSON.parse(JSON.stringify(q)));quotes=quotes.slice(0,100);saveQuotes();}renderSummary();renderVoucher();showPage('voucher');dashboard();alert('Voucher '+(wasEdit?'updated':'saved')+' successfully.')}
function renderInvoice(){if(!q)return;let t=totals();$('invoice').innerHTML=`<div class="invoicehead"><div class="invoiceBrand"><img class="invoiceLogo" src="assets/logo.png" alt="Karvan e Asal logo"><div><h2>KARVAN E ASAL</h2><div class="muted">UMRAH PACKAGE QUOTATION</div><div class="brandSub">TRAVEL & TOURS • UMRAH • TICKETS • HOTELS • TRANSPORT</div></div></div><div><b>Reference</b><div class="muted">${esc(q.reference)}</div><b>Customer</b><div class="muted">${esc(q.customer)||'—'}</div></div><div><b>Contact</b><div class="muted">${esc(q.contact)||'—'}</div><b>Group</b><div class="muted">${q.adults+q.childBed+q.childNoBed+q.infants} persons</div></div></div><h3>Passenger Cost Breakdown</h3><div class="tablewrap"><table class="table"><tr><th>Passenger</th><th>Visa</th><th>Hotel</th><th>Ticket</th><th>Total</th></tr><tr><td>Adults (${q.adults})</td><td>${sar(t.av)}</td><td>${sar(t.adultHotel)}</td><td>${sar(t.at)}</td><td><b>${sar(t.adult)}</b></td></tr><tr><td>Children (${q.childBed+q.childNoBed})</td><td>${sar(t.cv)}</td><td>${sar(t.childHotel)}</td><td>${sar(t.ct)}</td><td><b>${sar(t.child)}</b></td></tr><tr><td>Infants (${q.infants})</td><td>${sar(t.iv)}</td><td>SAR 0</td><td>${sar(t.it)}</td><td><b>${sar(t.infant)}</b></td></tr></table></div><h3>Hotel Details</h3>${q.stays.map((s,i)=>`<div class="row"><span><b>${i+1}. ${esc(s.city)} — ${esc(s.hotel)||'Not selected'}</b><br><span class="muted">${esc(hotelObj(s)?.[2]||'—')} • Distance ${esc(hotelObj(s)?.[3]||'—')} • ${stayNights(s)} nights • ${esc(s.room)}</span></span><b>${sar(hotelCost(s))}</b></div>`).join('')}<h3>Flight Summary</h3>${q.flights.map(f=>`<div class="row"><span>${esc(f.type)}: ${f.from} → ${f.to}<br><span class="muted">${esc(f.date)||'—'} • ${esc(f.flight)||'Flight —'} • ${esc(f.airline)||'Airline —'} • ${esc(f.via)}</span></span></div>`).join('')}<h3>Grand Total</h3><div class="totalbox"><div class="row grand"><span>${sar(t.grand)}</span><b>${pkr(t.grand*fx)}</b></div><div class="muted">Exchange Rate: 1 SAR = ${fx} PKR</div></div>`}
function fmtDate(d){if(!d)return '';let x=new Date(d+'T00:00:00');return isNaN(x)?d:x.toLocaleDateString('en-GB',{day:'2-digit',month:'2-digit',year:'2-digit'});}
function fmtDayTime(date,time){if(!date)return '';return fmtDate(date)+(time?' '+time:'');}
function renderVoucher(){
  if(!q)return;
  syncPassengers();
  let t=totals();
  const head=q.passengers[0]||{};
  const paxTotal=q.adults+q.childBed+q.childNoBed+q.infants;
  const outbound=q.flights.filter(f=>f.type==='Outbound'||f.type==='Transit');
  const ret=q.flights.filter(f=>f.type==='Return'||f.type==='Transit Return');
  const rows=q.passengers.map((p,i)=>`<tr><td>${i+1}</td><td>${esc(p.passport)||'—'}</td><td>${esc(p.name)||'—'}</td><td>${p.type==='Infant'?'Infant':p.type.startsWith('Child')?'Child':'Adult'}</td><td>${paxTotal}</td><td>${p.bed}</td><td>${esc(p.mofa)||'—'}</td><td>${esc(p.grp)||'—'}</td><td>${esc(p.visaNo)||'—'}</td><td>${esc(p.pnr)||'—'}</td></tr>`).join('');
  const hotelRows=q.stays.filter(s=>s.hotel||s.in||s.out).map(s=>{let h=hotelObj(s);return `<tr><td>${esc(s.city)}</td><td>${esc(s.hotel)||'—'}</td><td>${esc(h?.[3]||'—')}</td><td>${esc(s.meal||'RO')}</td><td>${esc(s.conf||'—')}</td><td>${esc(s.room||'Sharing')}</td><td>${fmtDate(s.in)||'—'}</td><td>${fmtDate(s.out)||'—'}</td><td>${stayNights(s)}</td></tr>`}).join('');
  const flightTable=(list)=>list.map(f=>`<tr><td>${esc(f.flight)||'—'}</td><td>${esc(f.from)||'—'}-${esc(f.to)||'—'}</td><td>${esc(f.date)||'—'}</td><td>${esc(f.timeOut)||'—'}</td><td>${esc(f.timeIn)||'—'}</td><td>${esc(f.airline)||'—'}</td></tr>`).join('');
  $('voucherBody').innerHTML=`
  <div class="voucherNoPrint no-print">${isSuperAdmin() && (Number.isInteger(q._editIndex) || window._adminEditing?.type==='Voucher') ? `<div class="card" style="padding:10px;margin:0 0 10px;background:#f7fbff;border:1px solid #cbd8ea"><div style="font-weight:900;color:var(--navy);font-size:11px;margin-bottom:7px">Super Admin Edit Mode — choose any section to edit</div><div style="display:flex;gap:6px;flex-wrap:wrap">${stepNames.map((n,i)=>`<button type="button" class="btn outline" onclick="adminEditVoucherSection(${i})">${i+1}. ${n}</button>`).join('')}</div></div>` : ''}</div>
  <div class="voucherHead">
    <div class="voucherBrand"><img class="voucherLogo" src="assets/logo.png" alt="Karvan e Asal logo"><div><div class="voucherTitle">KARVAN E ASAL</div><div class="voucherSub">TRAVEL & TOURS</div><div class="vsmall">Umrah • Tickets • Hotels • Transport</div></div></div>
    <div class="voucherSampleTitle">Hotel Voucher</div>
    <div class="voucherMeta"><div><b>Voucher Date:</b> ${fmtDate(new Date().toISOString().slice(0,10))}</div><div><b>Package:</b> ${esc(q.package)||'Umrah Package'}</div><div><b>PAX:</b> ${paxTotal}</div></div>
  </div>
  <div class="voucherGrid">
    <div class="voucherMeta"><b>Visa Shirkat Name:</b> ${esc(q.visaShirka)||'—'}<br><b>Family Head:</b> ${esc(q.customer)||head.name||'—'}<br><b>WhatsApp:</b> ${esc(q.whatsapp||q.contact)||'—'}</div>
    <div class="voucherMeta" style="text-align:right"><b>Reservation No:</b> ${esc(q.reservationNo||q.reference)||'—'}<br><b>Departure:</b> ${esc(q.departureCity)||'—'}<br><b>Visa Type:</b> ${esc(q.visa)||'—'}</div>
  </div>
  <div class="vsectionTitle">PASSENGER / MUTAMER DETAILS</div>
  <table class="vtable"><tr><th>SNO</th><th>Passport</th><th>Mutamer Name</th><th>G</th><th>PAX</th><th>Bed</th><th>MOFA #</th><th>GRP #</th><th>Visa #</th><th>PNR</th></tr>${rows||'<tr><td colspan="10">No passenger details entered.</td></tr>'}</table>
  <div class="vsectionTitle">ACCOMMODATION</div>
  <table class="vtable"><tr><th>City</th><th>Hotel Name</th><th>View / Distance</th><th>Meal</th><th>Conf#</th><th>Room Type</th><th>Check-in</th><th>Check-out</th><th>Nights</th></tr>${hotelRows||'<tr><td colspan="9">No hotel selected.</td></tr>'}<tr><th colspan="8" style="text-align:right">Total Nights</th><th>${q.stays.reduce((a,s)=>a+stayNights(s),0)}</th></tr></table>
  <div class="vsectionTitle">TRANSPORT SERVICES</div>
  <table class="vtable"><tr><th>Travel Date</th><th>Transporter</th><th>Type</th><th>Description</th></tr><tr><td>${fmtDate(q.departure)||'—'}</td><td>${esc(q.transportCompany)||'—'}</td><td>${esc(q.transportType)||'—'}</td><td>${esc(q.transportDescription)||'—'}</td></tr></table>
  <div class="vsectionTitle vblue">DEPARTURE (PAKISTAN TO KSA)</div>
  <table class="vtable"><tr><th>Flight</th><th>Sector</th><th>Departure</th><th>Arrival</th><th>Airline</th></tr>${flightTable(outbound)||'<tr><td colspan="5">No outbound flight entered.</td></tr>'}</table>
  <div class="vsectionTitle vblue">ARRIVAL (KSA TO PAK)</div>
  <table class="vtable"><tr><th>Flight</th><th>Sector</th><th>Departure</th><th>Arrival</th><th>Airline</th></tr>${flightTable(ret)||'<tr><td colspan="5">No return flight entered.</td></tr>'}</table>
  <div class="voucherNote"><b>Special Instructions:</b><br><span class="vsmall">Please verify passport, visa, flight and hotel information before travel. Hotel check-in/out and transport are subject to operational availability. Terms & Conditions intentionally excluded as requested.</span></div>
  `;
}
function printVoucher(){showPage('voucher');setTimeout(()=>window.print(),50)}
function downloadVoucher(){const html=`<!doctype html><html><head><meta charset="utf-8"><title>Voucher ${esc(q?.reference||'')}</title><style>body{font-family:Arial,sans-serif;padding:25px;color:#111}h1{color:#061a3a}.box{border:1px solid #ccc;padding:12px;margin:10px 0}table{width:100%;border-collapse:collapse}th,td{padding:7px;border-bottom:1px solid #ddd;text-align:left}</style></head><body>${$('voucherBody')?.innerHTML||''}<div id="v14BuildAudit" data-build="V15-Sales-Umrah-3Month-Audited" style="display:none"></div>

<style id="v14-bottom-option2">
/* Option 2 — Gold & Navy Minimal bottom navigation */
@media(max-width:650px){
  .mobileNav{
    background:linear-gradient(180deg,rgba(255,224,139,.97) 0%,rgba(226,183,80,.97) 52%,rgba(198,145,39,.98) 100%)!important;
    border-top:1px solid rgba(255,247,211,.9)!important;
    box-shadow:0 -6px 18px rgba(6,26,58,.16),inset 0 1px 0 rgba(255,255,255,.5)!important;
    grid-template-columns:repeat(8,minmax(0,1fr))!important;
    min-height:68px!important;
    padding:6px 3px calc(6px + env(safe-area-inset-bottom))!important;
    gap:2px!important;
  }
  .mobileNav button{
    display:flex!important;
    flex-direction:column!important;
    align-items:center!important;
    justify-content:center!important;
    min-width:0!important;
    min-height:54px!important;
    padding:4px 2px!important;
    border:0!important;
    border-radius:10px!important;
    background:transparent!important;
    color:#06204a!important;
    text-shadow:none!important;
    font-size:7px!important;
    font-weight:800!important;
    line-height:1.05!important;
  }
  .mobileNav button b{
    display:block!important;
    font-weight:800!important;
    max-width:100%!important;
    overflow:hidden!important;
    text-overflow:ellipsis!important;
    white-space:nowrap!important;
  }
  .mobileNav .navsvg{
    width:21px!important;
    height:21px!important;
    display:flex!important;
    align-items:center!important;
    justify-content:center!important;
    margin:0 0 4px!important;
    color:#06204a!important;
  }
  .mobileNav .navsvg svg{
    width:21px!important;
    height:21px!important;
    fill:none!important;
    stroke:currentColor!important;
    stroke-width:1.9!important;
    stroke-linecap:round!important;
    stroke-linejoin:round!important;
  }
  .mobileNav button.active{
    background:linear-gradient(180deg,#06204a 0%,#0a3268 100%)!important;
    color:#f7d36b!important;
    box-shadow:0 2px 7px rgba(6,26,58,.22),inset 0 1px 0 rgba(255,255,255,.13)!important;
  }
  .mobileNav button.active .navsvg{color:#f7d36b!important}
  .mobileNav button.active .navsvg svg{stroke:currentColor!important}
}
</style>

</body></html>`;const blob=new Blob([html],{type:'text/html'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Karvan-e-Asal-Voucher-'+(q?.reference||'voucher')+'.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
async function shareVoucher(){try{const html=`<!doctype html><html><body>${$('voucherBody')?.innerHTML||''}
<style id="v14-bottom-option2">
/* Option 2 — Gold & Navy Minimal bottom navigation */
@media(max-width:650px){
  .mobileNav{
    background:linear-gradient(180deg,rgba(255,224,139,.97) 0%,rgba(226,183,80,.97) 52%,rgba(198,145,39,.98) 100%)!important;
    border-top:1px solid rgba(255,247,211,.9)!important;
    box-shadow:0 -6px 18px rgba(6,26,58,.16),inset 0 1px 0 rgba(255,255,255,.5)!important;
    grid-template-columns:repeat(8,minmax(0,1fr))!important;
    min-height:68px!important;
    padding:6px 3px calc(6px + env(safe-area-inset-bottom))!important;
    gap:2px!important;
  }
  .mobileNav button{
    display:flex!important;
    flex-direction:column!important;
    align-items:center!important;
    justify-content:center!important;
    min-width:0!important;
    min-height:54px!important;
    padding:4px 2px!important;
    border:0!important;
    border-radius:10px!important;
    background:transparent!important;
    color:#06204a!important;
    text-shadow:none!important;
    font-size:7px!important;
    font-weight:800!important;
    line-height:1.05!important;
  }
  .mobileNav button b{
    display:block!important;
    font-weight:800!important;
    max-width:100%!important;
    overflow:hidden!important;
    text-overflow:ellipsis!important;
    white-space:nowrap!important;
  }
  .mobileNav .navsvg{
    width:21px!important;
    height:21px!important;
    display:flex!important;
    align-items:center!important;
    justify-content:center!important;
    margin:0 0 4px!important;
    color:#06204a!important;
  }
  .mobileNav .navsvg svg{
    width:21px!important;
    height:21px!important;
    fill:none!important;
    stroke:currentColor!important;
    stroke-width:1.9!important;
    stroke-linecap:round!important;
    stroke-linejoin:round!important;
  }
  .mobileNav button.active{
    background:linear-gradient(180deg,#06204a 0%,#0a3268 100%)!important;
    color:#f7d36b!important;
    box-shadow:0 2px 7px rgba(6,26,58,.22),inset 0 1px 0 rgba(255,255,255,.13)!important;
  }
  .mobileNav button.active .navsvg{color:#f7d36b!important}
  .mobileNav button.active .navsvg svg{stroke:currentColor!important}
}
</style>

</body></html>`;const file=new File([html],'Karvan-e-Asal-Voucher-'+(q?.reference||'voucher')+'.html',{type:'text/html'});if(navigator.share&&(!navigator.canShare||navigator.canShare({files:[file]}))){await navigator.share({title:'Karvan e Asal Voucher',files:[file]});}else{downloadVoucher();alert('The voucher was downloaded. On iPhone, use Share → Save to Files.')}}catch(e){if(e.name!=='AbortError')downloadVoucher()}}
function exportBackup(){let data={version:10,user:currentUser?.username||'',fx,hotels,visaTypes,airlines,transport,extras,quotes};let blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Karvan-e-Asal-Backup-'+(currentUser?.username||'user')+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function importBackup(ev){let f=ev.target.files?.[0];if(!f)return;let r=new FileReader();r.onload=()=>{try{let d=JSON.parse(r.result);if(d.fx)fx=d.fx;if(d.hotels)hotels=d.hotels;if(d.visaTypes)visaTypes=d.visaTypes;if(d.airlines)airlines=d.airlines;if(d.transport)transport=d.transport;if(d.extras)extras=d.extras;if(d.quotes)quotes=d.quotes;saveData();saveQuotes();dashboard();renderVisa();renderHotels();renderAirlines();alert('Backup imported successfully for '+(currentUser?.name||'this account')+'.')}catch(e){alert('Invalid backup file.')}};r.readAsText(f)}
function renderAdmin(){if(!['admin','superadmin'].includes(currentUser?.role))return;let rows=users.map((u,i)=>{let uq=JSON.parse(localStorage.getItem('keaQuotesV10_'+u.username)||localStorage.getItem('keaQuotesV11_'+u.username)||'[]');let up=JSON.parse(localStorage.getItem('keaPackageCostsV11_'+u.username)||'[]');return `<tr><td><strong>${esc(u.username)}</strong></td><td>${esc(u.name)}</td><td>${u.role==='superadmin'?'<span class="admin-badge">Super Admin</span>':esc(u.role)}</td><td>${u.active?'<span class="admin-badge">Active</span>':'<span class="admin-badge off">Disabled</span>'}</td><td>${uq.length}</td><td>${up.length}</td><td><button class="btn outline" onclick="editUser(${i})">Edit</button> <button class="btn outline" onclick="resetUserPassword(${i})">Reset Password</button> ${u.username.toLowerCase()!=='umar'?`<button class="btn danger" onclick="deleteUser(${i})">Delete</button>`:''}</td></tr>`}).join('');let records=[];if(currentUser?.role==='superadmin'){records=users.flatMap(u=>{let uq=JSON.parse(localStorage.getItem('keaQuotesV10_'+u.username)||localStorage.getItem('keaQuotesV11_'+u.username)||'[]');let up=JSON.parse(localStorage.getItem('keaPackageCostsV11_'+u.username)||'[]');return uq.map((x,i)=>({type:'Voucher',user:u.username,index:i,ref:x.reference,date:x.savedAt||x.bookingDate,data:x})).concat(up.map((x,i)=>({type:'Package Cost Q',user:u.username,index:i,ref:x.reference,date:x.savedAt||x.date,data:x})));});window._adminRecords=records;}let all=currentUser?.role==='superadmin'?`<div class="card" style="box-shadow:none;margin-top:12px"><h3 class="section-title">All User Saved Files — Super Admin Only</h3>${records.length?`<div class="tablewrap"><table class="table"><tr><th>Type</th><th>User</th><th>Reference</th><th>Date</th><th>Actions</th></tr>${records.map((r,i)=>`<tr><td>${r.type}</td><td>${esc(r.user)}</td><td>${esc(r.ref)}</td><td>${esc(fmtDate(r.date))}</td><td><button class="btn outline" onclick="adminOpenRecord(${i})">Open</button> <button class="btn outline" onclick="adminEditRecord(${i})">Edit</button> <button class="btn outline" onclick="adminPrintRecord(${i})">Print PDF</button> <button class="btn outline" onclick="adminDownloadRecord(${i})">Download</button> <button class="btn danger" onclick="adminDeleteRecord(${i})">Delete</button></td></tr>`).join('')}</table></div>`:'<div class="muted">No saved files.</div>'}</div>`:'';$('adminUserTable').innerHTML=`<div class="tablewrap"><table class="table admin-table"><tr><th>Username</th><th>Name</th><th>Role</th><th>Status</th><th>Vouchers</th><th>Package Cost Q</th><th>Actions</th></tr>${rows}</table></div>${all}`}
function adminOpenRecord(i){let r=window._adminRecords?.[i];if(!r)return;if(r.type==='Voucher'){q=JSON.parse(JSON.stringify(r.data));renderVoucher();showPage('voucher');}else{pc=JSON.parse(JSON.stringify(r.data));renderPackageCost();showPage('packageCost');}}
function adminEditRecord(i){let r=window._adminRecords?.[i];if(!r||!isSuperAdmin())return;window._adminEditing={type:r.type,user:r.user,index:r.index};if(r.type==='Voucher'){q=JSON.parse(JSON.stringify(r.data));q._editIndex=r.index;step=0;showPage('calculator');renderWizard();}else{pc=JSON.parse(JSON.stringify(r.data));pc._editIndex=r.index;showPage('packageCost');renderPackageCost();}}
function adminPrintRecord(i){let r=window._adminRecords?.[i];if(!r)return;if(r.type==='Voucher'){q=JSON.parse(JSON.stringify(r.data));renderVoucher();printVoucher();}else{pc=JSON.parse(JSON.stringify(r.data));renderPackageCost();setTimeout(()=>window.print(),50);}}
function adminDownloadRecord(i){let r=window._adminRecords?.[i];if(!r)return;if(r.type==='Voucher'){q=JSON.parse(JSON.stringify(r.data));renderVoucher();downloadVoucher();}else{pc=JSON.parse(JSON.stringify(r.data));const html=`<!doctype html><html><head><meta charset="utf-8"><title>${esc(pc.reference||'Package Cost Q')}</title><style>body{font-family:Arial;padding:25px}h1{color:#061a3a}.box{border:1px solid #ccc;padding:12px;margin:10px 0}</style></head><body><h1>KARVAN E ASAL</h1><h2>Package Cost Q</h2><div class="box">Owner: ${esc(r.user||'')}<br>Reference: ${esc(pc.reference||'')}<br>Date: ${esc(pc.date||'')}<br>Adults: ${pc.adults||0}<br>Child With Bed: ${pc.childBed||0}<br>Child Without Bed: ${pc.childNoBed||0}<br>Infants: ${pc.infants||0}<br>Total: ${sar(pc.total||0)} / ${pkr((pc.total||0)*fx)}</div>
<style id="v14-bottom-option2">
/* Option 2 — Gold & Navy Minimal bottom navigation */
@media(max-width:650px){
  .mobileNav{
    background:linear-gradient(180deg,rgba(255,224,139,.97) 0%,rgba(226,183,80,.97) 52%,rgba(198,145,39,.98) 100%)!important;
    border-top:1px solid rgba(255,247,211,.9)!important;
    box-shadow:0 -6px 18px rgba(6,26,58,.16),inset 0 1px 0 rgba(255,255,255,.5)!important;
    grid-template-columns:repeat(8,minmax(0,1fr))!important;
    min-height:68px!important;
    padding:6px 3px calc(6px + env(safe-area-inset-bottom))!important;
    gap:2px!important;
  }
  .mobileNav button{
    display:flex!important;
    flex-direction:column!important;
    align-items:center!important;
    justify-content:center!important;
    min-width:0!important;
    min-height:54px!important;
    padding:4px 2px!important;
    border:0!important;
    border-radius:10px!important;
    background:transparent!important;
    color:#06204a!important;
    text-shadow:none!important;
    font-size:7px!important;
    font-weight:800!important;
    line-height:1.05!important;
  }
  .mobileNav button b{
    display:block!important;
    font-weight:800!important;
    max-width:100%!important;
    overflow:hidden!important;
    text-overflow:ellipsis!important;
    white-space:nowrap!important;
  }
  .mobileNav .navsvg{
    width:21px!important;
    height:21px!important;
    display:flex!important;
    align-items:center!important;
    justify-content:center!important;
    margin:0 0 4px!important;
    color:#06204a!important;
  }
  .mobileNav .navsvg svg{
    width:21px!important;
    height:21px!important;
    fill:none!important;
    stroke:currentColor!important;
    stroke-width:1.9!important;
    stroke-linecap:round!important;
    stroke-linejoin:round!important;
  }
  .mobileNav button.active{
    background:linear-gradient(180deg,#06204a 0%,#0a3268 100%)!important;
    color:#f7d36b!important;
    box-shadow:0 2px 7px rgba(6,26,58,.22),inset 0 1px 0 rgba(255,255,255,.13)!important;
  }
  .mobileNav button.active .navsvg{color:#f7d36b!important}
  .mobileNav button.active .navsvg svg{stroke:currentColor!important}
}
</style>

</body></html>`;const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([html],{type:'text/html'}));a.download='Karvan-e-Asal-Package-Cost-Q-'+(pc.reference||'package')+'.html';a.click();}}
function adminDeleteRecord(i){let r=window._adminRecords?.[i];if(!r||!isSuperAdmin())return;if(!confirm('First confirmation: Delete this '+r.type+' for '+r.user+'?'))return;if(!confirm('Second confirmation: Move this '+r.type+' to the Super Admin Recycle Bin?'))return;let key=r.type==='Voucher'?'keaQuotesV10_':'keaPackageCostsV11_';let arr=JSON.parse(localStorage.getItem(key+r.user)||'[]');let item=arr[r.index];if(!item)return;let rb=loadRecycle();(r.type==='Voucher'?rb.vouchers:rb.quotes).unshift({deletedAt:new Date().toISOString(),deletedBy:currentUser.username,owner:r.user,data:item});saveRecycle(rb);arr.splice(r.index,1);localStorage.setItem(key+r.user,JSON.stringify(arr));renderAdmin();renderRecycleBin();alert('Moved to Recycle Bin.');}
async function editUser(i){openUserModal(i)}
async function resetUserPassword(i){let p=prompt('Enter new password for '+users[i].username+' (minimum 6 characters)');if(p===null)return;if(p.length<6)return alert('Password must be at least 6 characters.');users[i].passHash=await hashText(p);localStorage.setItem(AUTH_KEY,JSON.stringify(users));alert('Password reset successfully.')}
function deleteUser(i){if(!confirm('Delete user '+users[i].username+'? Their saved vouchers will also be deleted from this device.'))return;localStorage.removeItem('keaQuotesV10_'+users[i].username);localStorage.removeItem('keaQuotesV11_'+users[i].username);localStorage.removeItem('keaPackageCostsV11_'+users[i].username);users.splice(i,1);localStorage.setItem(AUTH_KEY,JSON.stringify(users));renderAdmin()}
function renderAirlines(){$('airlineManager').innerHTML=`<div class="tablewrap"><table class="table"><tr><th>Airline</th><th>Code</th><th>Action</th></tr>${airlines.map((a,i)=>`<tr><td><strong>${esc(a[0])}</strong></td><td>${esc(a[2])}</td><td><button class="btn outline" onclick="editAirline(${i})">Edit</button></td></tr>`).join('')}</table></div>`}
function addAirline(){let n=prompt('Airline name');if(!n)return;let code=prompt('IATA airline code','');airlines.push([n,n,code||'']);localStorage.setItem('keaAirlinesV10',JSON.stringify(airlines));renderAirlines()}
function editAirline(i){airlines[i][0]=prompt('Airline name',airlines[i][0])||airlines[i][0];airlines[i][2]=prompt('IATA airline code',airlines[i][2])||airlines[i][2];localStorage.setItem('keaAirlinesV10',JSON.stringify(airlines));renderAirlines()}
function saveData(){localStorage.setItem('keaVisaV10',JSON.stringify(visaTypes));localStorage.setItem('keaHotelsV10',JSON.stringify(hotels));localStorage.setItem('keaTransportV10',JSON.stringify(transport));localStorage.setItem('keaExtrasV10',JSON.stringify(extras));localStorage.setItem('keaAirlinesV10',JSON.stringify(airlines))}
function renderHotels(btn){if(btn){document.querySelectorAll('#hotels .tabs button').forEach(x=>x.classList.remove('on'));btn.classList.add('on')}$('hotelTable').innerHTML=hotels.filter(h=>h[0]===hotelCity).map(h=>`<tr><td><strong>${esc(h[1])}</strong></td><td>${esc(h[2])}</td><td>${esc(h[3])}</td>${roomTypes.map((r,i)=>`<td>${h[4+i]??'N/A'}</td>`).join('')}<td><button class="btn outline" onclick="openHotelModal(${hotels.indexOf(h)})">Edit</button></td></tr>`).join('')}
function openHotelModal(index=null){let h=index===null?null:hotels[index];$('modalbox').innerHTML=`<div class="modalhead"><h3>${h?'Edit Hotel':'Add New Hotel'}</h3><button class="btn outline" onclick="closeModal()">×</button></div><div class="grid" style="margin-top:12px"><div class="field"><label>City</label><select id="hmCity"><option ${h?.[0]==='Makkah'?'selected':''}>Makkah</option><option ${h?.[0]==='Madinah'?'selected':''}>Madinah</option></select></div><div class="field"><label>Hotel Name</label><input id="hmName" value="${esc(h?.[1]||'')}"></div><div class="field"><label>Location</label><input id="hmLoc" value="${esc(h?.[2]||'')}"></div><div class="field"><label>Distance</label><input id="hmDist" value="${esc(h?.[3]||'')}"></div>${roomTypes.map((r,i)=>`<div class="field"><label>${r} Rate (SAR)</label><input id="hm${i}" type="number" value="${h?.[4+i]??''}"></div>`).join('')}</div><div class="modal-actions"><button class="btn outline" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveHotel(${index===null?'null':index})">Save Hotel</button></div>`;$('modal').classList.add('open');document.body.classList.add('modal-open')}
function saveHotel(index){let h=[$('hmCity').value,$('hmName').value,$('hmLoc').value,$('hmDist').value,...roomTypes.map((r,i)=>{let v=$('hm'+i).value;return v===''?null:+v})];if(!h[1])return alert('Hotel name is required.');if(index===null)hotels.push(h);else hotels[index]=h;saveData();closeModal();renderHotels()}
function renderVisa(){$('visaTable').innerHTML=visaTypes.map((v,i)=>{const umrah=window.v14VisaIsUmrah(v);return `<tr><td><strong>${esc(v.name)}</strong></td><td colspan="5">${(v.durations||[]).map(d=>`<span class="badge" style="margin:2px;display:inline-block">${d.days===90?'3 Months':d.days+' Days'}${umrah?' — Group pricing':' — PKR '+Number(d.pkr).toLocaleString()+' / SAR '+(Number(d.pkr)/fx).toFixed(2)}</span>`).join('')}</td><td>${v.child}</td><td>${v.infant}</td><td>${v.active?'Active':'Inactive'}</td><td><button class="btn outline" onclick="openVisaModal(${i})">Edit</button> <button class="btn danger" onclick="deleteVisaType(${i})">Delete</button></td></tr>`}).join('')}
function deleteVisaType(index){let v=visaTypes[index];if(!v)return;if(!confirm('Delete visa type “'+v.name+'”?'))return;if(!confirm('Confirm again: permanently remove this visa type and its duration/group pricing?'))return;visaTypes.splice(index,1);saveData();renderVisa();}
function addVisaDurationRow(){let wrap=$('vmDurations'),d=document.createElement('div');d.className='grid2';d.style.marginTop='6px';d.innerHTML=`<div class="field"><label>Duration (Days)</label><input class="vmdays" type="number" min="1" value="30"></div><div class="field"><label>Price (PKR)</label><input class="vmpkr" type="number" min="0" value="0"></div><button type="button" class="btn danger" style="grid-column:span 2" onclick="if(confirm('Remove this duration/category?'))this.parentElement.remove()">Remove</button>`;wrap.appendChild(d)}
function addVisaGroupRow(){let wrap=$('vmGroups'),d=document.createElement('div');d.className='grid';d.style.marginTop='6px';d.innerHTML=`<div class="field"><label>Display Name</label><input class="vmglabel" value="New Group"></div><div class="field"><label>From Pax</label><input class="vmgmin" type="number" min="1" value="1"></div><div class="field"><label>To Pax</label><input class="vmgmax" type="number" min="1" value="1"></div><div class="field"><label>Price (SAR / Person)</label><input class="vmgprice" type="number" min="0" value="0"></div><button type="button" class="btn danger" style="grid-column:span 2" onclick="if(confirm('Remove this passenger group?'))this.parentElement.remove()">Remove</button>`;wrap.appendChild(d)}
function openVisaModal(index=null){let v=index===null?{name:'',adult:[0,0,0,0,0],adultRules:[],child:0,infant:0,durations:[{days:30,pkr:0}],active:true}:visaTypes[index];const umrah=window.v14VisaIsUmrah(v);if(umrah)window.v14EnsureUmrahDurations(v);let rows=(v.durations||[]).map(d=>`<div class="grid2" style="margin-top:6px"><div class="field"><label>Duration / Category</label><input class="vmdays" type="number" min="1" value="${d.days}" ${umrah?'readonly':''}></div><div class="field">${umrah?'<label>Pricing</label><input value="Uses Passenger Group Price — No separate duration price" readonly>':'<label>Price (PKR)</label><input class="vmpkr" type="number" min="0" value="'+d.pkr+'">'}</div>${umrah?'':'<button type="button" class="btn danger" style="grid-column:span 2" onclick="if(confirm(\'Remove this duration/category?\'))this.parentElement.remove()">Remove</button>'}</div>`).join('');let rules=(v.adultRules&&v.adultRules.length?v.adultRules:[{label:'05–49',min:5,max:49,price:v.adult?.[0]||0,active:true},{label:'04',min:4,max:4,price:v.adult?.[1]||0,active:true},{label:'03',min:3,max:3,price:v.adult?.[2]||0,active:true},{label:'02',min:2,max:2,price:v.adult?.[3]||0,active:true},{label:'01',min:1,max:1,price:v.adult?.[4]||0,active:true}]);let groupRows=rules.map(r=>`<div class="grid" style="margin-top:6px"><div class="field"><label>Display Name</label><input class="vmglabel" value="${esc(r.label)}"></div><div class="field"><label>From Pax</label><input class="vmgmin" type="number" min="1" value="${r.min}"></div><div class="field"><label>To Pax</label><input class="vmgmax" type="number" min="1" value="${r.max}"></div><div class="field"><label>Price (SAR / Person)</label><input class="vmgprice" type="number" min="0" value="${r.price}"></div><button type="button" class="btn danger" style="grid-column:span 2" onclick="if(confirm('Remove this passenger group?'))this.parentElement.remove()">Remove</button></div>`).join('');$('modalbox').innerHTML=`<div class="modalhead"><h3>${index===null?'Add New Visa Type':'Edit Visa Type & Prices'}</h3><button class="btn outline" onclick="closeModal()">×</button></div><div class="grid2" style="margin-top:12px"><div class="field"><label>Visa Type Name</label><input id="vmName" value="${esc(v.name)}"></div><div class="field"><label>Status</label><select id="vmActive"><option value="1" ${v.active?'selected':''}>Active</option><option value="0" ${!v.active?'selected':''}>Inactive</option></select></div></div><h4 style="color:var(--navy);margin:14px 0 7px">Visa Duration / Category Prices</h4><div id="vmDurations">${rows}</div><button type="button" class="btn outline" style="margin-top:8px" onclick="addVisaDurationRow()">+ Add Duration / Category</button><div class="notice" style="margin-top:10px">${umrah?'Umrah Visa durations are categories only: 15 Days, 21 Days, 30 Days and 3 Months. They do not have separate prices; the selected passenger-group price applies to all durations.':'You can rename, edit, add or remove every duration/category. Prices are entered in PKR and automatically shown in SAR at 1 SAR = '+fx+' PKR.'}</div><h4 style="color:var(--navy);margin:14px 0 7px">Adult Passenger Group Rules</h4><div id="vmGroups">${groupRows}</div><button type="button" class="btn outline" style="margin-top:8px" onclick="addVisaGroupRow()">+ Add Passenger Group</button><div class="notice" style="margin-top:10px">You can rename or remove groups such as 05–49 Pax, 04 Pax, 03 Pax, 02 Pax and 01 Pax, or create your own ranges.</div><div class="grid2" style="margin-top:10px"><div class="field"><label>Child Visa (SAR)</label><input id="vchild" type="number" value="${v.child}"></div><div class="field"><label>Infant Visa (SAR)</label><input id="vinfant" type="number" value="${v.infant}"></div></div><div style="display:flex;justify-content:flex-end;gap:8px;margin-top:13px"><button class="btn outline" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveVisa(${index===null?'null':index})">Save Changes</button></div>`;$('modal').classList.add('open');document.body.classList.add('modal-open')}
function saveVisa(index){const name=$('vmName').value.trim();if(!name)return alert('Visa type is required.');const umrah=/^umrah(?:\s+visa)?$/i.test(name);let durations=umrah?[15,21,30,90].map(days=>({days,pkr:0})):[...document.querySelectorAll('#vmDurations .grid2')].map(r=>({days:Number(r.querySelector('.vmdays')?.value)||0,pkr:Number(r.querySelector('.vmpkr')?.value)||0})).filter(d=>d.days>0);let adultRules=[...document.querySelectorAll('#vmGroups .grid')].map(r=>({label:(r.querySelector('.vmglabel')?.value||'').trim(),min:Number(r.querySelector('.vmgmin')?.value)||0,max:Number(r.querySelector('.vmgmax')?.value)||0,price:Number(r.querySelector('.vmgprice')?.value)||0,active:true})).filter(r=>r.label&&r.min>0&&r.max>=r.min);let seen=[];for(const r of adultRules){for(const x of seen){if(r.min<=x.max&&x.min<=r.max)return alert('Passenger group ranges overlap: '+r.label+' and '+x.label+'. Please use non-overlapping ranges.')}seen.push(r);}let adult=[0,0,0,0,0];adultRules.forEach(r=>{if(r.min>=5)adult[0]=r.price;else if(r.min===4&&r.max===4)adult[1]=r.price;else if(r.min===3&&r.max===3)adult[2]=r.price;else if(r.min===2&&r.max===2)adult[3]=r.price;else if(r.min===1&&r.max===1)adult[4]=r.price;});let v={name,adult,adultRules,child:+$('vchild').value||0,infant:+$('vinfant').value||0,durations,active:$('vmActive').value==='1'};if(!durations.length)return alert('Add at least one duration/category.');if(!adultRules.length)return alert('Add at least one passenger group rule.');if(index===null)visaTypes.push(v);else visaTypes[index]=v;saveData();closeModal();renderVisa()}
function closeModal(){$('modal').classList.remove('open');document.body.classList.remove('modal-open')}
function renderFlightManager(){if(!$(`flightManager`))return;$(`flightManager`).innerHTML=`<div class="notice">Manage flight details used by New Booking. Airlines can be selected from the built-in list, and airports use internationally recognized IATA codes.</div><div style="margin-top:10px"><button type="button" class="btn primary" onclick="showPage('calculator');step=5;renderWizard()">Open Flight Entry</button></div>`}
function serviceRow(x,i,kind){let arr=kind==='transport'?transport:extras;return `<div class="service"><div class="grid"><div class="field" style="grid-column:span 2"><label>Service</label><select onchange="q.${kind}[${i}].name=this.value;renderWizard()">${arr.filter(a=>a.active).map(a=>`<option ${x.name===a.name?'selected':''}>${esc(a.name)}</option>`).join('')}</select></div><div class="field"><label>Quantity</label><input type="number" value="${x.qty||1}" onchange="q.${kind}[${i}].qty=+this.value||0"></div></div></div>`}
function renderSimple(kind){let arr=kind==='transport'?transport:extras;$(kind==='transport'?'transportManager':'extrasManager').innerHTML=`<div class="tablewrap"><table class="table"><tr><th>Name</th><th>Price</th><th>Unit</th><th>Status</th><th>Action</th></tr>${arr.map((x,i)=>`<tr><td><strong>${esc(x.name)}</strong></td><td>${x.price}</td><td>${esc(x.unit)}</td><td>${x.active?'Active':'Inactive'}</td><td><button class="btn outline" onclick="editSimple('${kind}',${i})">Edit</button></td></tr>`).join('')}</table></div>`}
function addSimple(kind){let n=prompt('Name');if(!n)return;let p=+prompt('Price (SAR)','0')||0,u=prompt('Unit','per person')||'per person',a=kind==='transport'?transport:extras;a.push({name:n,price:p,unit:u,active:true});saveData();renderSimple(kind)}
function editSimple(kind,i){let a=kind==='transport'?transport:extras,x=a[i];x.name=prompt('Name',x.name)||x.name;x.price=+prompt('Price (SAR)',x.price)||0;x.unit=prompt('Unit',x.unit)||x.unit;x.active=confirm('Keep active?');saveData();renderSimple(kind)}
function toggleExtra(n,on){if(on&&!q.extras.includes(n))q.extras.push(n);if(!on)q.extras=q.extras.filter(x=>x!==n)}
function isSuperAdmin(){return currentUser?.role==='superadmin'}
function recycleKey(){return 'keaRecycleV13_'+(isSuperAdmin()?'SUPERADMIN':(currentUser?.username||'guest'))}
function loadRecycle(){return JSON.parse(localStorage.getItem(recycleKey())||'{"vouchers":[],"quotes":[]}')}
function saveRecycle(r){localStorage.setItem(recycleKey(),JSON.stringify(r))}
function renderSavedFiles(type='voucher',btn){if(btn){document.querySelectorAll('#quotes .tabs button').forEach(x=>x.classList.remove('on'));btn.classList.add('on');}else{let b=type==='voucher'?$('savedVoucherTab'):$('savedQuoteTab');if(b){document.querySelectorAll('#quotes .tabs button').forEach(x=>x.classList.remove('on'));b.classList.add('on');}}
 if(type==='voucher'){ $('quoteList').innerHTML=quotes.length?quotes.map((x,i)=>`<div class="service"><div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start"><div><b style="color:var(--navy)">${esc(x.reference)}</b><div class="muted">${esc(x.customer)||'No customer'} • ${x.adults} adults • ${x.childBed+x.childNoBed} children • ${x.infants} infants • Saved ${fmtDate(x.savedAt||x.bookingDate)}</div></div><div style="display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end"><button class="btn outline" onclick="openSavedVoucher(${i})">Open</button><button class="btn outline" onclick="printSavedVoucher(${i})">Print PDF</button><button class="btn outline" onclick="downloadSavedVoucher(${i})">Download</button>${isSuperAdmin()?`<button class="btn outline" onclick="editSavedVoucher(${i})">Edit</button><button class="btn danger" onclick="deleteSavedRecord('voucher',${i})">Delete</button>`:''}</div></div></div>`).join(''):'<div class="muted">No saved vouchers yet.</div>'; }
 else { $('quoteList').innerHTML=packageCosts.length?packageCosts.map((x,i)=>`<div class="service"><div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start"><div><b style="color:var(--navy)">${esc(x.reference)}</b><div class="muted">${esc(x.date||x.savedAt||'')} • ${x.adults} adults • ${x.childBed} child with bed • ${x.childNoBed} child without bed • ${x.infants} infants • ${sar(x.total)}</div></div><div style="display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end"><button class="btn outline" onclick="openSavedQuote(${i})">Open</button><button class="btn outline" onclick="printSavedQuote(${i})">Print PDF</button><button class="btn outline" onclick="downloadSavedQuote(${i})">Download</button>${isSuperAdmin()?`<button class="btn outline" onclick="editSavedQuote(${i})">Edit</button><button class="btn danger" onclick="deleteSavedRecord('quote',${i})">Delete</button>`:''}</div></div></div>`).join(''):'<div class="muted">No saved Package Cost Q records yet.</div>';}}
function openSavedVoucher(i){q=JSON.parse(JSON.stringify(quotes[i]));renderVoucher();showPage('voucher');if(isSuperAdmin()){$('voucherBody').scrollIntoView({behavior:'smooth',block:'start'})}}
function editSavedVoucher(i){if(!isSuperAdmin())return; q=JSON.parse(JSON.stringify(quotes[i]));q._editIndex=i;window._adminEditing={type:'Voucher',user:currentUser.username,index:i};step=0;showPage('calculator');renderWizard()}
function printSavedVoucher(i){q=JSON.parse(JSON.stringify(quotes[i]));renderVoucher();printVoucher()}
function downloadSavedVoucher(i){q=JSON.parse(JSON.stringify(quotes[i]));renderVoucher();downloadVoucher()}
function openSavedQuote(i){pc=JSON.parse(JSON.stringify(packageCosts[i]));renderPackageCost();showPage('packageCost')}
function editSavedQuote(i){if(!isSuperAdmin())return;pc=JSON.parse(JSON.stringify(packageCosts[i]));pc._editIndex=i;window._adminEditing={type:'Package Cost Q',user:currentUser.username,index:i};renderPackageCost();showPage('packageCost')}
function printSavedQuote(i){pc=JSON.parse(JSON.stringify(packageCosts[i]));renderPackageCost();setTimeout(()=>window.print(),50)}
function downloadSavedQuote(i){pc=JSON.parse(JSON.stringify(packageCosts[i]));renderPackageCost();const html=`<!doctype html><html><head><meta charset="utf-8"><title>${esc(pc.reference||'Package Cost Q')}</title><style>body{font-family:Arial;padding:25px}h1{color:#061a3a}.box{border:1px solid #ccc;padding:12px;margin:10px 0}</style></head><body><h1>KARVAN E ASAL</h1><h2>Package Cost Q</h2><div class="box">Reference: ${esc(pc.reference||'')}<br>Date: ${esc(pc.date||'')}<br>Adults: ${pc.adults||0}<br>Child With Bed: ${pc.childBed||0}<br>Child Without Bed: ${pc.childNoBed||0}<br>Infants: ${pc.infants||0}<br>Total: ${sar(pc.total||0)} / ${pkr((pc.total||0)*fx)}</div>
<style id="v14-bottom-option2">
/* Option 2 — Gold & Navy Minimal bottom navigation */
@media(max-width:650px){
  .mobileNav{
    background:linear-gradient(180deg,rgba(255,224,139,.97) 0%,rgba(226,183,80,.97) 52%,rgba(198,145,39,.98) 100%)!important;
    border-top:1px solid rgba(255,247,211,.9)!important;
    box-shadow:0 -6px 18px rgba(6,26,58,.16),inset 0 1px 0 rgba(255,255,255,.5)!important;
    grid-template-columns:repeat(8,minmax(0,1fr))!important;
    min-height:68px!important;
    padding:6px 3px calc(6px + env(safe-area-inset-bottom))!important;
    gap:2px!important;
  }
  .mobileNav button{
    display:flex!important;
    flex-direction:column!important;
    align-items:center!important;
    justify-content:center!important;
    min-width:0!important;
    min-height:54px!important;
    padding:4px 2px!important;
    border:0!important;
    border-radius:10px!important;
    background:transparent!important;
    color:#06204a!important;
    text-shadow:none!important;
    font-size:7px!important;
    font-weight:800!important;
    line-height:1.05!important;
  }
  .mobileNav button b{
    display:block!important;
    font-weight:800!important;
    max-width:100%!important;
    overflow:hidden!important;
    text-overflow:ellipsis!important;
    white-space:nowrap!important;
  }
  .mobileNav .navsvg{
    width:21px!important;
    height:21px!important;
    display:flex!important;
    align-items:center!important;
    justify-content:center!important;
    margin:0 0 4px!important;
    color:#06204a!important;
  }
  .mobileNav .navsvg svg{
    width:21px!important;
    height:21px!important;
    fill:none!important;
    stroke:currentColor!important;
    stroke-width:1.9!important;
    stroke-linecap:round!important;
    stroke-linejoin:round!important;
  }
  .mobileNav button.active{
    background:linear-gradient(180deg,#06204a 0%,#0a3268 100%)!important;
    color:#f7d36b!important;
    box-shadow:0 2px 7px rgba(6,26,58,.22),inset 0 1px 0 rgba(255,255,255,.13)!important;
  }
  .mobileNav button.active .navsvg{color:#f7d36b!important}
  .mobileNav button.active .navsvg svg{stroke:currentColor!important}
}
</style>

</body></html>`;const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([html],{type:'text/html'}));a.download='Karvan-e-Asal-Package-Cost-Q-'+(pc.reference||'package')+'.html';a.click();}
function deleteSavedRecord(type,i){if(!isSuperAdmin())return;let arr=type==='voucher'?quotes:packageCosts;let item=arr[i];if(!item)return;let label=type==='voucher'?'voucher':'Package Cost Q';if(!confirm('First confirmation: Delete this '+label+'?'))return;if(!confirm('Second confirmation: This '+label+' will move to Recycle Bin. Continue?'))return;let r=loadRecycle();(type==='voucher'?r.vouchers:r.quotes).unshift({deletedAt:new Date().toISOString(),deletedBy:currentUser.username,data:JSON.parse(JSON.stringify(item))});saveRecycle(r);arr.splice(i,1);type==='voucher'?saveQuotes():savePackageCosts();renderSavedFiles(type);dashboard();alert('Moved to Recycle Bin.');}
function renderRecycleBin(){if(!isSuperAdmin()){$('recycleBin').innerHTML='<div class="notice">Only Super Admin can recover or permanently delete items from the Recycle Bin.</div>';return;}let r=loadRecycle();let html='';if(!r.vouchers.length&&!r.quotes.length)html='<div class="muted">Recycle Bin is empty.</div>';else{html+=(r.vouchers.length?'<h4 style="color:var(--navy)">Deleted Vouchers</h4>':'')+r.vouchers.map((x,i)=>`<div class="service"><b>${esc(x.data.reference)}</b><div class="muted">Owner: ${esc(x.owner||currentUser.username)} • Deleted ${fmtDate(x.deletedAt)}</div><div style="margin-top:6px"><button class="btn outline" onclick="recoverRecord('voucher',${i})">Recover</button><button class="btn danger" onclick="permanentDelete('voucher',${i})">Delete Permanently</button></div></div>`).join('');html+=(r.quotes.length?'<h4 style="color:var(--navy);margin-top:12px">Deleted Package Cost Q</h4>':'')+r.quotes.map((x,i)=>`<div class="service"><b>${esc(x.data.reference)}</b><div class="muted">Owner: ${esc(x.owner||currentUser.username)} • Deleted ${fmtDate(x.deletedAt)}</div><div style="margin-top:6px"><button class="btn outline" onclick="recoverRecord('quote',${i})">Recover</button><button class="btn danger" onclick="permanentDelete('quote',${i})">Delete Permanently</button></div></div>`).join('');} $('recycleBin').innerHTML=html}
function recoverRecord(type,i){if(!isSuperAdmin())return;let r=loadRecycle(),arr=type==='voucher'?r.vouchers:r.quotes,item=arr[i]?.data;if(!item)return;if(type==='voucher'){quotes.unshift(item);saveQuotes();}else{packageCosts.unshift(item);savePackageCosts();}arr.splice(i,1);saveRecycle(r);renderRecycleBin();renderSavedFiles(type);alert('Recovered successfully.');}
function permanentDelete(type,i){if(!isSuperAdmin())return;if(!confirm('First confirmation: Permanently delete this item?'))return;if(!confirm('Second confirmation: This cannot be recovered. Permanently delete now?'))return;let r=loadRecycle();(type==='voucher'?r.vouchers:r.quotes).splice(i,1);saveRecycle(r);renderRecycleBin();}

function salesRecords(){
  if(isSuperAdmin()){
    return users.flatMap(u=>{
      let arr=JSON.parse(localStorage.getItem('keaQuotesV10_'+u.username)||localStorage.getItem('keaQuotesV11_'+u.username)||'[]');
      return arr.map((x,i)=>Object.assign({},x,{_owner:u.username,_ownerName:u.name||u.username,_ownerIndex:i}));
    });
  }
  return quotes.map((x,i)=>Object.assign({},x,{_owner:currentUser?.username||'',_ownerName:currentUser?.name||currentUser?.username||'',_ownerIndex:i}));
}
function dateOnly(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate());}
function salesRange(period){
  const now=new Date(); const today=dateOnly(now); let from=new Date(today),to=new Date(today);
  if(period==='daily'){}
  else if(period==='weekly'){let day=today.getDay(); let diff=day===0?6:day-1; from.setDate(today.getDate()-diff); to.setDate(from.getDate()+6);}
  else if(period==='monthly'){from=new Date(today.getFullYear(),today.getMonth(),1);to=new Date(today.getFullYear(),today.getMonth()+1,0);}
  else if(period==='3month'){from.setMonth(today.getMonth()-2,1);to=new Date(today.getFullYear(),today.getMonth()+1,0);}
  else if(period==='6month'){from.setMonth(today.getMonth()-5,1);to=new Date(today.getFullYear(),today.getMonth()+1,0);}
  else if(period==='yearly'){from=new Date(today.getFullYear(),0,1);to=new Date(today.getFullYear(),11,31);}
  else {let f=$('salesFrom')?.value,t=$('salesTo')?.value;if(f)from=new Date(f+'T00:00:00');if(t)to=new Date(t+'T00:00:00');}
  to.setHours(23,59,59,999); return {from,to};
}
function saleDate(x){return x.bookingDate||String(x.savedAt||'').slice(0,10)||'';}
function saleUmrahDays(x){
  if(Number(x.umrahDays)>0)return Number(x.umrahDays);
  const dates=[];(x.stays||[]).forEach(s=>{if(s.in)dates.push(new Date(s.in+'T00:00:00'));if(s.out)dates.push(new Date(s.out+'T00:00:00'));});
  if(x.departure)dates.push(new Date(x.departure+'T00:00:00'));if(x.returnDate)dates.push(new Date(x.returnDate+'T00:00:00'));
  if(dates.length>=2){let min=Math.min(...dates.map(d=>d.getTime())),max=Math.max(...dates.map(d=>d.getTime()));return Math.max(0,Math.round((max-min)/86400000));}
  return (x.stays||[]).reduce((n,s)=>n+stayNights(s),0);
}
function renderSales(){
  const sel=$('salesPeriod'); if(!sel)return; const period=sel.value||'monthly'; $('salesCustomDates').style.display=period==='custom'?'grid':'none';
  const {from,to}=salesRange(period); const records=salesRecords().filter(x=>{let d=saleDate(x);if(!d)return false;let dt=new Date(d+'T12:00:00');return dt>=from&&dt<=to;}).sort((a,b)=>saleDate(b).localeCompare(saleDate(a)));
  const total=records.reduce((n,x)=>n+Number(x.total||0),0),pax=records.reduce((n,x)=>n+Number(x.adults||0)+Number(x.childBed||0)+Number(x.childNoBed||0)+Number(x.infants||0),0);
  $('salesTotalSar').textContent=sar(total);$('salesTotalPkr').textContent=pkr(total*fx);$('salesCount').textContent=records.length;$('salesPax').textContent=pax;
  $('salesList').innerHTML=records.length?`<div class="tablewrap"><table class="table"><thead><tr><th>Date</th><th>Description / Head of Family</th><th>Pax</th><th>Adult</th><th>Child</th><th>Infant</th><th>Umrah Days</th><th>Total Package</th><th>Owner</th><th></th></tr></thead><tbody>${records.map((x,i)=>{let totalP=Number(x.adults||0)+Number(x.childBed||0)+Number(x.childNoBed||0)+Number(x.infants||0);return `<tr><td>${esc(saleDate(x))}</td><td><strong>${esc(x.customer||'—')}</strong></td><td>${totalP}</td><td>${Number(x.adults||0)}</td><td>${Number(x.childBed||0)+Number(x.childNoBed||0)}</td><td>${Number(x.infants||0)}</td><td>${saleUmrahDays(x)}</td><td><strong>${sar(x.total)}<br><span class="muted">${pkr(Number(x.total||0)*fx)}</span></strong></td><td>${isSuperAdmin()?esc(x._ownerName||x._owner):''}</td><td><button class="btn outline" onclick="openSaleVoucher(${i})">Open Voucher</button></td></tr>`}).join('')}</tbody></table></div>`:'<div class="muted">No voucher sales found for this period.</div>';
  window._salesRecords=records;
}
function openSaleVoucher(i){const x=window._salesRecords?.[i];if(!x)return;q=JSON.parse(JSON.stringify(x));delete q._owner;delete q._ownerName;delete q._ownerIndex;renderVoucher();showPage('voucher');}
function renderQuotes(){$('quoteList').innerHTML=quotes.length?quotes.map((x,i)=>`<div class="service" style="display:flex;justify-content:space-between;align-items:center"><div><b style="color:var(--navy)">${esc(x.reference)}</b><div class="muted">${esc(x.customer)||'No customer'} • ${x.adults} adults • ${x.childBed+x.childNoBed} children • ${x.infants} infants • Saved ${fmtDate(x.savedAt||x.bookingDate)}</div></div><button class="btn outline" onclick="q=JSON.parse(JSON.stringify(quotes[${i}]));renderInvoice();showPage('invoicePage')">Open Voucher</button></div>`).join(''):'<div class="muted">No saved vouchers yet.</div>'}
function dashboard(){$('mQuotes').textContent=quotes.length;$('mHotels').textContent=hotels.length;$('mVisa').textContent=visaTypes.length;$('mFx').textContent=fx}
function saveFx(){fx=Number($('fxInput').value)||75;localStorage.setItem('keaFxV15',fx);dashboard();alert('Exchange rate saved.')}
function init(){loadUserQuotes();loadPackageCosts();dashboard();renderHotels();renderVisa();renderSimple('transport');renderSimple('extras');$('fxInput').value=fx;renderAirlines();if(!q){q={bookingDate:new Date().toISOString().slice(0,10),customer:'',contact:'',whatsapp:'',reference:'KEA-'+Date.now().toString().slice(-6),package:'Umrah 1448-H',visaShirka:'',reservationNo:'',transportCompany:'',transportType:'Company Transport',transportDescription:'',departureCity:'ISB',adults:1,childBed:0,childNoBed:0,infants:0,passengers:[],departure:'',arrival:'',returnDate:'',visa:'Umrah Visa',visaDuration:30,stays:[{city:'Makkah',hotel:'',room:'Sharing',rooms:0,in:'',out:'',meal:'RO',conf:''},{city:'Madinah',hotel:'',room:'Sharing',rooms:0,in:'',out:'',meal:'RO',conf:''},{city:'Makkah',hotel:'',room:'Sharing',rooms:0,in:'',out:'',meal:'RO',conf:''},{city:'Madinah',hotel:'',room:'Sharing',rooms:0,in:'',out:'',meal:'RO',conf:''}],flights:[{type:'Outbound',from:'ISB',to:'JED',date:'',timeOut:'',timeIn:'',flight:'',airline:'Pakistan International Airlines',via:'Direct'},{type:'Return',from:'JED',to:'ISB',date:'',timeOut:'',timeIn:'',flight:'',airline:'Pakistan International Airlines',via:'Direct'}],tickets:{adult:0,childBed:0,childNoBed:0,infant:0},transport:[],extras:[]};step=-1;}renderWizard()}





(function(){
  const cfg=window.KARVAN_SUPABASE||{};
  function onlineError(msg){
    try{ showAuthError(msg); }catch(e){ const el=document.getElementById('authError'); if(el){el.textContent=msg;el.style.display='block';} }
    console.error('[V15 Sales]',msg);
  }
  if(!cfg.url || !cfg.publishableKey || !window.supabase){
    console.error('[V15 Sales] Supabase configuration/library unavailable.');
    return;
  }
  const sb=window.supabase.createClient(cfg.url,cfg.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  window.KARVAN_ONLINE={sb,enabled:true};
  const originalSet=localStorage.setItem.bind(localStorage);
  const pending=new Map();
  async function getProfileByAuthUser(){
    const {data:{user},error:ue}=await sb.auth.getUser();
    if(ue||!user) return null;
    const {data,error}=await sb.from('profiles').select('*').eq('id',user.id).maybeSingle();
    if(error){console.error('Profile load failed',error);return null;}
    return data;
  }
  async function loadServer(){
    const {data:{user},error:ue}=await sb.auth.getUser();
    if(ue||!user) return null;
    const p=await getProfileByAuthUser();
    if(!p) return null;
    currentUser=Object.assign({},currentUser||{},p,{username:p.username||user.email?.split('@')[0],email:p.email||user.email||''});
    const superA=currentUser.role==='superadmin';
    if(superA){
      const pr=await sb.from('profiles').select('*').order('created_at',{ascending:true});
      if(!pr.error&&pr.data){
        users=pr.data.map(x=>({username:x.username||String(x.email||'').split('@')[0],email:x.email||'',firstName:x.first_name||'',lastName:x.last_name||'',name:[x.first_name,x.last_name].filter(Boolean).join(' ')||x.username||'',contact:x.contact||'',agency:x.agency||'',address:x.address||'',role:x.role||'user',active:x.active!==false,id:x.id}));
        originalSet(AUTH_KEY,JSON.stringify(users));
      }
    }
    const vq=superA?await sb.from('vouchers').select('*'):await sb.from('vouchers').select('*').eq('owner_id',user.id);
    const pq=superA?await sb.from('package_costs').select('*'):await sb.from('package_costs').select('*').eq('owner_id',user.id);
    if(vq.data){
      const by={};
      vq.data.forEach(r=>{const k=r.owner_username||currentUser.username;(by[k]??=[]).push({...r.payload,_onlineId:r.id});});
      if(superA) Object.entries(by).forEach(([k,a])=>originalSet('keaQuotesV10_'+k,JSON.stringify(a)));
      else originalSet('keaQuotesV10_'+currentUser.username,JSON.stringify(by[currentUser.username]||[]));
    }
    if(pq.data){
      const by={};
      pq.data.forEach(r=>{const k=r.owner_username||currentUser.username;(by[k]??=[]).push({...r.payload,_onlineId:r.id});});
      if(superA) Object.entries(by).forEach(([k,a])=>originalSet('keaPackageCostsV11_'+k,JSON.stringify(a)));
      else originalSet('keaPackageCostsV11_'+currentUser.username,JSON.stringify(by[currentUser.username]||[]));
    }
    return currentUser;
  }
  async function syncKey(key){
    if(!key.startsWith('keaQuotesV10_')&&!key.startsWith('keaPackageCostsV11_')) return;
    const username=key.replace(/^kea(QuotesV10_|PackageCostsV11_)/,'');
    if(!username) return;
    const {data:{user}}=await sb.auth.getUser(); if(!user) return;
    const {data:prof}=await sb.from('profiles').select('id,username').ilike('username',username).maybeSingle(); if(!prof) return;
    let arr=[]; try{arr=JSON.parse(localStorage.getItem(key)||'[]')}catch{}
    const table=key.startsWith('keaQuotesV10_')?'vouchers':'package_costs';
    const existing=await sb.from(table).select('id,payload').eq('owner_id',prof.id);
    const keep=new Set();
    for(const item of arr){
      const payload=JSON.parse(JSON.stringify(item)); delete payload._onlineId;
      const id=item._onlineId;
      if(id){keep.add(id);await sb.from(table).update({payload,total:Number(item.total||0),reference:item.reference||null,booking_date:item.bookingDate||null,updated_at:new Date().toISOString()}).eq('id',id);}
      else{const ins=await sb.from(table).insert({owner_id:prof.id,owner_username:username,payload,total:Number(item.total||0),reference:item.reference||null,booking_date:item.bookingDate||null}).select('id').single();if(ins.data?.id){item._onlineId=ins.data.id;keep.add(ins.data.id);}}
    }
    if(existing.data){for(const row of existing.data){if(!keep.has(row.id))await sb.from(table).delete().eq('id',row.id);}}
  }
  localStorage.setItem=function(k,v){originalSet(k,v);if(window.KARVAN_ONLINE?.enabled&&(k.startsWith('keaQuotesV10_')||k.startsWith('keaPackageCostsV11_'))){clearTimeout(pending.get(k));pending.set(k,setTimeout(()=>syncKey(k).catch(console.error),500));}};
  window.initAuthOnline=async function(){
    try{
      const {data:{session},error}=await sb.auth.getSession();
      if(error) throw error;
      if(session){
        const p=await loadServer();
        if(!p){await sb.auth.signOut();return onlineError('Your online profile could not be loaded. Please contact the Super Admin.');}
        if(p.active===false){await sb.auth.signOut();return onlineError('This account is inactive. Please contact the Super Admin.');}
        sessionStorage.setItem(SESSION_KEY,p.username||'');loadUserQuotes();loadPackageCosts();$('authScreen').style.display='none';$('appRoot').style.display='block';applyUserUI();init();
      }else{$('authScreen').style.display='flex';$('appRoot').style.display='none';}
    }catch(e){onlineError('Unable to initialize online login: '+(e.message||e));}
  };
  window.loginUser=async function(){
    const raw=$('loginUser').value.trim(),pw=$('loginPass').value;
    if(!raw||!pw)return onlineError('Please enter your username/email and password.');
    const button=document.querySelector('#loginPanel button[onclick="loginUser()"]');
    if(button){button.disabled=true;button.textContent='Signing in…';}
    try{
      let email=raw;
      if(!raw.includes('@')){
        const {data,error}=await sb.rpc('get_login_email_by_username',{p_username:raw});
        if(error){console.error('Username RPC failed',error);throw new Error('Username login service is not configured. Please run the V15 username-login SQL in Supabase.');}
        email=typeof data==='string'?data:(Array.isArray(data)?(data[0]?.email||data[0]):data?.email||'');
      }
      email=String(email||'').trim();
      if(!email.includes('@'))return onlineError('No active account was found for this username.');
      const {data,error}=await sb.auth.signInWithPassword({email,password:pw});
      if(error)throw error;
      if(!data?.user)throw new Error('Supabase did not return an authenticated user.');
      const p=await loadServer();
      if(!p){await sb.auth.signOut();return onlineError('Login succeeded, but the user profile could not be loaded. Check the profiles RLS policy.');}
      if(p.active===false){await sb.auth.signOut();return onlineError('This account is inactive. Please contact the Super Admin.');}
      sessionStorage.setItem(SESSION_KEY,p.username||'');loadUserQuotes();loadPackageCosts();$('authScreen').style.display='none';$('appRoot').style.display='block';applyUserUI();init();
    }catch(e){onlineError(e?.message||'Sign in failed. Please try again.');}
    finally{if(button){button.disabled=false;button.textContent='Sign In';}}
  };
  window.registerUser=async function(){
    try{
      let first=$('regFirst').value.trim(),last=$('regLast').value.trim(),email=$('regEmail').value.trim().toLowerCase(),contact=$('regContact').value.trim(),agency=$('regAgency').value.trim(),address=$('regAddress').value.trim(),pass=$('regPass').value,pass2=$('regPass2').value,question=$('regQuestion').value,answer=$('regAnswer').value.trim();
      if(!first||!last||!email||!contact||!agency||!address||!pass||!pass2||!question||!answer)return onlineError('Please complete all required registration fields.');
      if(pass!==pass2)return onlineError('Passwords do not match.');
      const username=usernameFromEmail(email);
      const {error}=await sb.auth.signUp({email,password:pass,options:{data:{username,firstName:first,lastName:last,contact,agency,address,securityQuestion:question}}});
      if(error)throw error;
      showAuthPanel('login');onlineError('Account created. Check your email if email confirmation is enabled, then sign in.');
    }catch(e){onlineError(e?.message||'Registration failed.');}
  };
  window.logoutUser=async function(){await sb.auth.signOut();sessionStorage.removeItem(SESSION_KEY);location.reload();};
  window.resetPasswordBySecurity=async function(){onlineError('For online accounts, use the secure password-reset email flow.');};
  setTimeout(()=>window.initAuthOnline(),0);
})();


/* ================= V15 SALES CONSOLIDATED ONLINE HARDENING ================= */
(function(){
  'use strict';
  const KEYMAP={
    fx:'fx', hotels:'hotels', visaTypes:'visaTypes', airlines:'airlines',
    transport:'transport', extras:'extras'
  };
  const LOCAL_KEYS={
    fx:'keaFxV15',hotels:'keaHotelsV10',visaTypes:'keaVisaV10',
    airlines:'keaAirlinesV10',transport:'keaTransportV10',extras:'keaExtrasV10'
  };
  let hydrating=false, installed=false;

  function online(){return !!window.KARVAN_ONLINE?.enabled&&!!window.KARVAN_ONLINE.sb}
  function sb(){return window.KARVAN_ONLINE.sb}
  function admin(){return typeof isSuperAdmin==='function'&&isSuperAdmin()}
  function msg(s){try{onlineError(s)}catch(e){alert(s)}}
  function json(v){try{return JSON.parse(v)}catch(e){return null}}

  async function upsertConfig(key,value){
    if(!online()||!admin()||hydrating)return;
    const {data:{user}}=await sb().auth.getUser(); if(!user)return;
    const {error}=await sb().from('app_config').upsert({key,value,updated_by:user.id,updated_at:new Date().toISOString()});
    if(error)console.error('[V15 config]',key,error);
  }

  async function loadConfig(){
    if(!online())return;
    const {data:{user}}=await sb().auth.getUser(); if(!user)return;
    const r=await sb().from('app_config').select('key,value').in('key',Object.values(KEYMAP));
    if(r.error){console.error('[V15 config load]',r.error);return}
    const rows=Object.fromEntries((r.data||[]).map(x=>[x.key,x.value]));
    hydrating=true;
    try{
      for(const [localName,remoteKey] of Object.entries(KEYMAP)){
        const remote=rows[remoteKey];
        if(remote===undefined||remote===null)continue;
        let empty=(Array.isArray(remote)&&remote.length===0);
        if(remoteKey==='fx')empty=!Number(remote);
        const local=window[localName];
        if(empty&&admin()&&local && (!Array.isArray(local)||local.length)){
          await upsertConfig(remoteKey,local);
        }else if(!empty){
          if(localName==='fx') window.fx=Number(remote)||75;
          else window[localName]=Array.isArray(remote)?remote:local;
          if(localName==='visaTypes' && Array.isArray(window.visaTypes)){
            let changed=false;
            window.visaTypes.forEach(v=>{if(window.v14EnsureUmrahDurations(v))changed=true});
            if(changed && admin()) await upsertConfig('visaTypes',window.visaTypes);
          }
        }
      }
      if(typeof renderVisa==='function')renderVisa();
      if(typeof renderHotels==='function')renderHotels();
      if(typeof renderAirlines==='function')renderAirlines();
      if(typeof renderRecycleBin==='function')renderRecycleBin();
      const fi=document.getElementById('fxInput');if(fi)fi.value=window.fx||75;
    }finally{hydrating=false}
  }

  async function syncAllConfig(){
    if(!online()||!admin()||hydrating)return;
    await Promise.all([
      upsertConfig('fx',Number(window.fx)||75),
      upsertConfig('hotels',window.hotels||[]),
      upsertConfig('visaTypes',window.visaTypes||[]),
      upsertConfig('airlines',window.airlines||[]),
      upsertConfig('transport',window.transport||[]),
      upsertConfig('extras',window.extras||[])
    ]);
  }

  /* Config changes are centrally stored. localStorage remains only a UI cache. */
  const baseSaveData=window.saveData;
  window.saveData=function(){
    if(online()&&!admin())return;
    if(typeof baseSaveData==='function')baseSaveData();
    syncAllConfig().catch(e=>console.error('[V15 config sync]',e));
  };

  const baseSet=localStorage.setItem.bind(localStorage);
  localStorage.setItem=function(k,v){
    baseSet(k,v);
    if(!hydrating&&online()&&admin()){
      const map={
        keaFxV15:'fx',keaHotelsV10:'hotels',keaVisaV10:'visaTypes',
        keaAirlinesV10:'airlines',keaTransportV10:'transport',keaExtrasV10:'extras'
      };
      if(map[k])upsertConfig(map[k],map[k]==='fx'?Number(v):json(v)).catch(console.error);
    }
  };

  /* Exchange rate: single source of truth, default 75. */
  window.saveFx=async function(){
    if(!admin())return msg('Only Super Admin can change the exchange rate.');
    const value=Number(document.getElementById('fxInput')?.value);
    if(!value||value<=0)return msg('Enter a valid SAR to PKR exchange rate.');
    window.fx=value;
    baseSet('keaFxV15',String(value));
    await upsertConfig('fx',value);
    if(typeof renderVisa==='function')renderVisa();
    if(typeof renderWizard==='function')renderWizard();
    if(typeof renderPackageCost==='function')renderPackageCost();
    alert('Exchange rate saved online: 1 SAR = '+value+' PKR.');
  };

  /* Visa: duration and passenger-group pricing are deliberately separate.
     Only Visa uses duration price per person and never uses hotel/group pricing. */
  window.v14VisaIsOnly=function(v){return String(v?.name||'').trim().toLowerCase()==='only visa'};
  window.v14VisaIsUmrah=function(v){return /^umrah(?:\s+visa)?$/i.test(String(v?.name||'').trim())};
  window.v14EnsureUmrahDurations=function(v){
    if(!window.v14VisaIsUmrah(v))return false;
    const wanted=[15,21,30,90];
    const current=Array.isArray(v.durations)?v.durations:[];
    v.durations=wanted.map(days=>({days,pkr:0}));
    return current.length!==4 || wanted.some((d,i)=>Number(current[i]?.days)!==d || Number(current[i]?.pkr||0)!==0);
  }
  window.v14FindGroup=function(v,n){
    const rules=(v?.adultRules||[]).filter(r=>r.active!==false&&Number(r.min)>0&&Number(r.max)>=Number(r.min));
    return rules.find(r=>n>=Number(r.min)&&n<=Number(r.max))||null;
  };
  window.visaForGroup=function(){
    const v=visaTypes.find(x=>x.name===q.visa)||visaTypes[0]; if(!v)return 0;
    if(v14VisaIsOnly(v)){const d=selectedVisaRule(v,q.visaDuration);return d&&Number(d.pkr)>0?Number(d.pkr)/fx:0}
    const n=Number(q.adults||0)+Number(q.childBed||0)+Number(q.childNoBed||0);
    const r=v14FindGroup(v,n);return r?Number(r.price||0):0;
  };
  window.pcVisaPerAdult=function(){
    const v=visaTypes.find(x=>x.name===pc.visa)||visaTypes[0]; if(!v)return 0;
    if(v14VisaIsOnly(v)){const d=selectedVisaRule(v,pc.visaDuration);return d&&Number(d.pkr)>0?Number(d.pkr)/fx:0}
    const n=Number(pc.adults||0)+Number(pc.childBed||0)+Number(pc.childNoBed||0);
    const r=v14FindGroup(v,n);return r?Number(r.price||0):0;
  };

  /* Replace totals so Only Visa duration price is per person for adult/child/infant.
     Umrah Visa keeps generic passenger-group adult pricing and child/infant pricing. */
  window.totals=function(){
    const v=visaTypes.find(x=>x.name===q.visa)||visaTypes[0], only=v14VisaIsOnly(v);
    const groupVisa=visaForGroup(), hotel=q.stays.reduce((a,s)=>a+hotelCost(s),0);
    const eligible=q.adults+q.childBed,adultHotel=eligible?hotel*q.adults/eligible:0,childHotel=eligible?hotel*q.childBed/eligible:0;
    const onlySar=only?groupVisa:0;
    const av=only?q.adults*onlySar:q.adults*groupVisa;
    const cv=only?(q.childBed+q.childNoBed)*onlySar:(q.childBed+q.childNoBed)*(v?.child||0);
    const iv=only?q.infants*onlySar:q.infants*(v?.infant||0);
    const at=q.adults*q.tickets.adult/fx,ct=(q.childBed*q.tickets.childBed+q.childNoBed*q.tickets.childNoBed)/fx,it=q.infants*q.tickets.infant/fx;
    const trans=q.transport.reduce((a,x)=>a+(transport.find(t=>t.name===x.name)?.price||0)*(x.qty||1),0);
    const ex=q.extras.reduce((a,n)=>{const e=extras.find(x=>x.name===n);return a+(e?.price||0)*(e?.unit?.includes('person')?(q.adults+q.childBed+q.childNoBed+q.infants):1)},0);
    return{av,cv,iv,adultHotel,childHotel,at,ct,it,trans,ex,adult:av+adultHotel+at,child:cv+childHotel+ct,infant:iv+it,hotel,grand:av+cv+iv+hotel+at+ct+it+trans+ex}
  };
  window.pcTotals=function(){
    const v=visaTypes.find(x=>x.name===pc.visa)||visaTypes[0],only=v14VisaIsOnly(v),per=pcVisaPerAdult();
    const av=pc.adults*per,cv=only?pc.childBed*per:(pc.childBed+pc.childNoBed)*(v?.child||0),iv=only?pc.infants*per:pc.infants*(v?.infant||0);
    const mc=pcHotelCost('Makkah',pc.makkahHotel,pc.makkahRoom,pc.makkahRooms,pc.makkahNights),dc=pcHotelCost('Madinah',pc.madinahHotel,pc.madinahRoom,pc.madinahRooms,pc.madinahNights);
    const hotel=mc+dc,eligible=pc.adults+pc.childBed,adultHotel=eligible?hotel*pc.adults/eligible:0,childBedHotel=eligible?hotel*pc.childBed/eligible:0;
    const at=pc.adults*pc.tickets.adult/fx,ctb=pc.childBed*pc.tickets.childBed/fx,ctn=pc.childNoBed*pc.tickets.childNoBed/fx,it=pc.infants*pc.tickets.infant/fx;
    return{av,cv,iv,mc,dc,hotel,adultHotel,childBedHotel,at,ctb,ctn,it,adult:av+adultHotel+at,childBed:(only?pc.childBed*per:pc.childBed*(v?.child||0))+childBedHotel+ctb,childNoBed:(only?pc.childNoBed*per:pc.childNoBed*(v?.child||0))+ctn,infant:iv+it,grand:av+cv+iv+hotel+at+ctb+ctn+it}
  };

  const baseSaveVisa=window.saveVisa;
  window.saveVisa=function(index){
    const durations=[...document.querySelectorAll('#vmDurations .grid2')].map(r=>({days:Number(r.querySelector('.vmdays')?.value)||0,pkr:Number(r.querySelector('.vmpkr')?.value)||0})).filter(d=>d.days>0);
    const adultRules=[...document.querySelectorAll('#vmGroups .grid')].map(r=>({label:(r.querySelector('.vmglabel')?.value||'').trim(),min:Number(r.querySelector('.vmgmin')?.value)||0,max:Number(r.querySelector('.vmgmax')?.value)||0,price:Number(r.querySelector('.vmgprice')?.value)||0,active:true})).filter(r=>r.label&&r.min>0&&r.max>=r.min);
    if(!document.getElementById('vmName')?.value.trim())return alert('Visa type is required.');
    const sorted=[...adultRules].sort((a,b)=>a.min-b.min);
    for(let i=1;i<sorted.length;i++){if(sorted[i].min<=sorted[i-1].max)return alert('Passenger group ranges overlap. '+sorted[i-1].label+' and '+sorted[i].label+' cannot overlap.')}
    if(!durations.length)return alert('Add at least one duration/category.');
    if(!adultRules.length)return alert('Add at least one passenger group rule.');
    const name=document.getElementById('vmName').value.trim();
    const v={name,adult:[0,0,0,0,0],adultRules,durations,child:Number(document.getElementById('vchild')?.value)||0,infant:Number(document.getElementById('vinfant')?.value)||0,active:document.getElementById('vmActive')?.value==='1'};
    adultRules.forEach(r=>{if(r.min>=5&&r.max>=r.min)v.adult[0]=r.price;else if(r.min===4&&r.max===4)v.adult[1]=r.price;else if(r.min===3&&r.max===3)v.adult[2]=r.price;else if(r.min===2&&r.max===2)v.adult[3]=r.price;else if(r.min===1&&r.max===1)v.adult[4]=r.price});
    if(index===null)visaTypes.push(v);else visaTypes[index]=v;
    saveData();closeModal();renderVisa();
  };

  /* Hotel/airline/transport/extra CRUD. Only Super Admin may mutate shared configuration. */
  window.deleteHotel=async function(i){
    if(!admin())return msg('Only Super Admin can delete hotels.');
    if(!hotels[i])return;
    if(!confirm('Delete this hotel?')||!confirm('Confirm again: permanently remove this hotel?'))return;
    hotels.splice(i,1);saveData();renderHotels();
  };
  const baseRenderHotels=window.renderHotels;
  window.renderHotels=function(btn){
    if(typeof baseRenderHotels==='function')baseRenderHotels(btn);
    const rows=document.querySelectorAll('#hotelTable tr');
    rows.forEach((tr,i)=>{const cityHotels=hotels.filter(h=>h[0]===hotelCity);const h=cityHotels[i];if(!h)return;const last=tr.lastElementChild;if(last)last.innerHTML+='<button class="btn danger" style="margin-left:4px" onclick="deleteHotel('+hotels.indexOf(h)+')">Delete</button>'});
  };
  const baseRenderAirlines=window.renderAirlines;
  window.deleteAirline=async function(i){
    if(!admin())return msg('Only Super Admin can delete airlines.');
    if(!airlines[i])return;
    if(!confirm('Delete this airline?')||!confirm('Confirm again: permanently remove this airline?'))return;
    airlines.splice(i,1);saveData();renderAirlines();
  };
  window.renderAirlines=function(){
    if(!document.getElementById('airlineManager'))return;
    $('airlineManager').innerHTML='<div class="tablewrap"><table class="table"><tr><th>Airline</th><th>Code</th><th>Action</th></tr>'+
      airlines.map((a,i)=>'<tr><td><strong>'+esc(a[0])+'</strong></td><td>'+esc(a[2])+'</td><td><button class="btn outline" onclick="editAirline('+i+')">Edit</button><button class="btn danger" onclick="deleteAirline('+i+')">Delete</button></td></tr>').join('')+'</table></div>';
  };
  const baseRenderSimple=window.renderSimple;
  window.deleteSimple=function(kind,i){
    if(!admin())return msg('Only Super Admin can delete '+kind+'.');
    const arr=kind==='transport'?transport:extras;if(!arr[i])return;
    if(!confirm('Delete this '+kind+' item?')||!confirm('Confirm again: permanently remove it?'))return;
    arr.splice(i,1);saveData();renderSimple(kind);
  };
  window.renderSimple=function(kind){
    if(typeof baseRenderSimple==='function')baseRenderSimple(kind);
    const id=kind==='transport'?'transportManager':'extrasManager',el=$(id);if(!el)return;
    const arr=kind==='transport'?transport:extras;
    el.querySelectorAll('.service').forEach((row,i)=>{
      if(row.querySelector('.v14-delete-config'))return;
      const b=document.createElement('button');b.className='btn danger v14-delete-config';b.textContent='Delete';b.onclick=()=>deleteSimple(kind,i);row.appendChild(b);
    });
  };

  /* Online profiles/admin. Password changes use Supabase reset email; account disable is online. */
  window.renderAdmin=async function(){
    if(!admin())return;
    const {data:profiles,error}=await sb().from('profiles').select('*').order('created_at',{ascending:true});
    if(error)return console.error(error);
    users=(profiles||[]).map(p=>({id:p.id,username:p.username||p.email?.split('@')[0],email:p.email||'',firstName:p.first_name||'',lastName:p.last_name||'',name:[p.first_name,p.last_name].filter(Boolean).join(' ')||p.username||'',contact:p.contact||'',agency:p.agency||'',address:p.address||'',role:p.role||'user',active:p.active!==false,securityQuestion:p.security_question||''}));
    const rows=users.map((u,i)=>'<tr><td><strong>'+esc(u.username)+'</strong></td><td>'+esc(u.email)+'</td><td>'+esc(u.name)+'</td><td>'+esc(u.role)+'</td><td>'+(u.active?'Active':'Disabled')+'</td><td><button class="btn outline" onclick="editUser('+i+')">Edit</button> <button class="btn outline" onclick="resetUserPassword('+i+')">Reset Password</button> '+(u.username.toLowerCase()!=='umar'?'<button class="btn danger" onclick="deleteUser('+i+')">Disable</button>':'')+'</td></tr>').join('');
    $('adminUserTable').innerHTML='<div class="tablewrap"><table class="table"><tr><th>Username</th><th>Email</th><th>Name</th><th>Role</th><th>Status</th><th>Actions</th></tr>'+rows+'</table></div><div class="notice" style="margin-top:10px">User accounts and status are stored in Supabase. Password resets are handled by Supabase Auth.</div>';
  };
  window.editUser=async function(i){
    if(!admin())return;
    const u=users[i];if(!u)return;
    const first=prompt('First name',u.firstName),last=prompt('Last name',u.lastName),contact=prompt('Contact',u.contact),agency=prompt('Agency',u.agency),address=prompt('Address',u.address);
    if(first===null)return;
    const {error}=await sb().from('profiles').update({first_name:first,last_name:last,contact:contact||'',agency:agency||'',address:address||'',updated_at:new Date().toISOString()}).eq('id',u.id);
    if(error)return alert(error.message);
    await renderAdmin();
  };
  window.resetUserPassword=async function(i){
    if(!admin())return;
    const u=users[i];if(!u?.email)return;
    const {error}=await sb().auth.resetPasswordForEmail(u.email,{redirectTo:location.origin+location.pathname});
    if(error)return alert(error.message);
    alert('A secure password reset link has been sent to '+u.email+'.');
  };
  window.deleteUser=async function(i){
    if(!admin())return;
    const u=users[i];if(!u||u.username.toLowerCase()==='umar')return;
    if(!confirm('Disable '+u.username+'?')||!confirm('Confirm again: disable this account online?'))return;
    const {error}=await sb().from('profiles').update({active:false,updated_at:new Date().toISOString()}).eq('id',u.id);
    if(error)return alert(error.message);
    await renderAdmin();
  };

  /* Registration + security-question reset. The security answer is verified server-side,
     then Supabase sends the actual password-reset link. */
  window.registerUser=async function(){
    try{
      const first=$('regFirst').value.trim(),last=$('regLast').value.trim(),email=$('regEmail').value.trim().toLowerCase(),
      contact=$('regContact').value.trim(),agency=$('regAgency').value.trim(),address=$('regAddress').value.trim(),
      pass=$('regPass').value,pass2=$('regPass2').value,question=$('regQuestion').value,answer=$('regAnswer').value.trim();
      if(!first||!last||!email||!contact||!agency||!address||!pass||!pass2||!question||!answer)return msg('Please complete all required registration fields.');
      if(pass.length<8)return msg('Password must be at least 8 characters.');
      if(pass!==pass2)return msg('Passwords do not match.');
      const username=usernameFromEmail(email);
      const {data,error}=await sb().auth.signUp({email,password:pass,options:{data:{username,firstName:first,lastName:last,contact,agency,address,securityQuestion:question,securityAnswer:answer}}});
      if(error)throw error;
      msg('Account created. Check your email for confirmation if enabled, then sign in.');
      showAuthPanel('login');
    }catch(e){msg(e?.message||'Registration failed.')}
  };
  window.resetPasswordBySecurity=async function(){
    const button=document.querySelector('#forgotPanel button[onclick="resetPasswordBySecurity()"]');
    try{
      const email=$('resetEmail').value.trim().toLowerCase(),question=$('resetQuestion').value,answer=$('resetAnswer').value.trim();
      if(!email||!question||!answer)return msg('Enter your registered email, security question and answer.');
      if(button){button.disabled=true;button.textContent='Verifying…';}
      const vr=await sb().rpc('verify_password_reset',{p_email:email,p_question:question,p_answer:answer});
      if(vr.error)throw vr.error;
      if(vr.data!==true)return msg('The security question or answer is incorrect.');
      const redirectTo=new URL(location.pathname,location.origin).href;
      const {error}=await sb().auth.resetPasswordForEmail(email,{redirectTo});
      if(error)throw error;
      $('resetAnswer').value='';
      msg('Verified. Check '+email+' for your secure password-reset link.');
    }catch(e){msg(e?.message||'Unable to start password reset.')}
    finally{if(button){button.disabled=false;button.textContent='Verify & Send Reset Link';}}
  };

  /* Online recycle bin. Two confirmations remain mandatory. */
  async function onlineRecycle(type,item){
    if(!online()||!admin())return null;
    const {data:{user}}=await sb().auth.getUser();if(!user)return null;
    const ownerId=item._ownerId||item.owner_id||user.id;
    const ownerName=item._owner||item._ownerName||currentUser?.username||'';
    const originalId=item._onlineId||null;
    const payload=JSON.parse(JSON.stringify(item));delete payload._onlineId;delete payload._ownerId;
    const ins=await sb().from('recycle_bin').insert({owner_id:ownerId,owner_username:ownerName,record_type:type==='voucher'?'voucher':'quote',original_id:originalId,payload,deleted_by:user.id}).select('id').single();
    if(ins.error)throw ins.error;
    if(originalId){
      const table=type==='voucher'?'vouchers':'package_costs';
      const del=await sb().from(table).delete().eq('id',originalId);
      if(del.error)throw del.error;
    }
    return ins.data.id;
  }
  window.deleteSavedRecord=async function(type,i){
    if(!admin())return;
    const arr=type==='voucher'?quotes:packageCosts,item=arr[i];if(!item)return;
    if(!confirm('First confirmation: Delete this '+(type==='voucher'?'voucher':'Package Cost Q')+'?'))return;
    if(!confirm('Second confirmation: Move it to the online Recycle Bin?'))return;
    try{
      await onlineRecycle(type,item);arr.splice(i,1);
      renderSavedFiles(type);dashboard();await renderRecycleBin();
    }catch(e){alert('Delete failed: '+e.message)}
  };
  window.renderRecycleBin=async function(){
    if(!admin())return;
    const {data,error}=await sb().from('recycle_bin').select('*').order('deleted_at',{ascending:false});
    if(error){$('recycleBin').innerHTML='<div class="notice">'+esc(error.message)+'</div>';return}
    if(!data?.length){$('recycleBin').innerHTML='<div class="muted">Online Recycle Bin is empty.</div>';return}
    $('recycleBin').innerHTML=data.map(r=>'<div class="service"><b>'+esc(r.payload?.reference||r.id)+'</b><div class="muted">Owner: '+esc(r.owner_username||'')+' • '+esc(r.record_type)+' • Deleted '+fmtDate(r.deleted_at)+'</div><div style="margin-top:6px"><button class="btn outline" onclick="recoverOnlineRecord(\''+r.id+'\')">Recover</button><button class="btn danger" onclick="permanentDeleteOnline(\''+r.id+'\')">Delete Permanently</button></div></div>').join('');
  };
  window.recoverOnlineRecord=async function(id){
    if(!admin())return;if(!confirm('Recover this record?'))return;
    const {data:r,error}=await sb().from('recycle_bin').select('*').eq('id',id).single();if(error)return alert(error.message);
    const table=r.record_type==='voucher'?'vouchers':'package_costs';
    const payload=r.payload||{};
    const ins=await sb().from(table).insert({owner_id:r.owner_id,owner_username:r.owner_username,payload,total:Number(payload.total||0),reference:payload.reference||null,booking_date:payload.bookingDate||null}).select('id').single();
    if(ins.error)return alert(ins.error.message);
    await sb().from('recycle_bin').delete().eq('id',id);
    await loadServerData();await renderRecycleBin();
  };
  window.permanentDeleteOnline=async function(id){
    if(!admin())return;if(!confirm('First confirmation: permanently delete?'))return;if(!confirm('Second confirmation: this cannot be recovered. Continue?'))return;
    const {error}=await sb().from('recycle_bin').delete().eq('id',id);if(error)return alert(error.message);
    await renderRecycleBin();
  };

  /* Reliable Sales comes from Supabase sales table. Cache is refreshed from server for reporting. */
  async function loadOnlineSales(){
    if(!online())return;
    const {data:{user}}=await sb().auth.getUser();if(!user)return;
    const r=await sb().from('sales').select('*').order('booking_date',{ascending:false});
    if(r.error){console.error('[V15 sales]',r.error);return}
    const rows=r.data||[];
    window._onlineSalesRows=rows;
    window.salesRecords=function(){
      return rows.map(x=>Object.assign({},x.payload||{},{
        _owner:x.owner_username,_ownerName:x.owner_username, _onlineId:x.voucher_id,
        total:Number(x.total||0),bookingDate:x.booking_date,customer:x.description,
        adults:x.adults,childBed:x.child_bed,childNoBed:x.child_no_bed,infants:x.infants,umrahDays:x.umrah_days
      }));
    };
    if(typeof renderSales==='function')renderSales();
  }

  /* Keep user-specific Voucher/Quote records online, but use Supabase as source of truth. */
  async function loadOnlineConfigAndData(){
    if(!online())return;
    await loadConfig();
    await loadOnlineSales();
    if(admin()&&typeof renderAdmin==='function')await renderAdmin();
    if(admin()&&typeof renderRecycleBin==='function')await renderRecycleBin();
    if(window.v14PurgeLocalCache)window.v14PurgeLocalCache();
  }

  /* Hook the existing online load without replacing its secure session flow. */
  function install(){
    if(installed||!online())return;
    installed=true;
    setTimeout(()=>loadOnlineConfigAndData().catch(console.error),50);
    try{
      const oldInit=window.initAuthOnline;
      window.initAuthOnline=async function(){await oldInit();if(online())await loadOnlineConfigAndData()};
    }catch(e){}
  }
  const timer=setInterval(()=>{if(online()){clearInterval(timer);install()}},100);
  setTimeout(()=>clearInterval(timer),15000);

})();


(function(){
  function onReady(){
    const online=window.KARVAN_ONLINE?.enabled, sb=window.KARVAN_ONLINE?.sb;
    if(!online||!sb)return;
    const emailEl=document.getElementById('resetEmail'), qEl=document.getElementById('resetQuestion');
    if(emailEl&&qEl&&!emailEl.dataset.v14Bound){
      emailEl.dataset.v14Bound='1';
      emailEl.addEventListener('blur',async function(){
        const email=this.value.trim().toLowerCase();
        if(!email){qEl.innerHTML='<option value="">Enter your email first</option>';return;}
        qEl.innerHTML='<option value="">Loading security question…</option>';
        try{
          const r=await sb.rpc('get_password_reset_question',{p_email:email});
          if(r.error)throw r.error;
          if(!r.data){qEl.innerHTML='<option value="">No active account found for this email</option>';return;}
          const text=String(r.data);
          qEl.innerHTML='<option value="'+text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')+'">'+text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</option>';
        }catch(e){
          console.error('Security question lookup failed',e);
          qEl.innerHTML='<option value="">Unable to load security question</option>';
        }
      });
    }
    sb.auth.onAuthStateChange(async (event)=>{
      if(event!=='PASSWORD_RECOVERY')return;
      let panel=document.getElementById('v14RecoveryPanel');
      if(!panel){
        panel=document.createElement('div');panel.id='v14RecoveryPanel';panel.className='modal open';
        panel.innerHTML='<div class="modalbox"><div class="modalhead"><h3>Set New Password</h3></div><div class="field" style="margin-top:12px"><label>New Password</label><input id="v14NewPw" type="password" minlength="8"></div><div class="field" style="margin-top:10px"><label>Confirm Password</label><input id="v14NewPw2" type="password" minlength="8"></div><button id="v14SetPw" class="btn gold" style="width:100%;margin-top:12px">Update Password</button></div>';
        document.body.appendChild(panel);
        document.getElementById('v14SetPw').onclick=async()=>{
          const a=document.getElementById('v14NewPw').value,b=document.getElementById('v14NewPw2').value;
          if(a.length<8||a!==b)return alert('Password must be at least 8 characters and both entries must match.');
          const r=await sb.auth.updateUser({password:a});
          if(r.error)return alert(r.error.message);
          panel.remove();alert('Password updated successfully. Please sign in again.');await sb.auth.signOut();location.reload();
        };
      }
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',onReady);else setTimeout(onReady,300);
})();


(function(){
  const admin=()=>typeof isSuperAdmin==='function'&&isSuperAdmin();
  const deny=()=>alert('Only Super Admin can edit shared configuration.');
  window.addAirline=function(){if(!admin())return deny();let n=prompt('Airline name');if(!n)return;let code=prompt('IATA airline code','');airlines.push([n,n,code||'']);saveData();renderAirlines()};
  window.editAirline=function(i){if(!admin())return deny();if(!airlines[i])return;airlines[i][0]=prompt('Airline name',airlines[i][0])||airlines[i][0];airlines[i][2]=prompt('IATA airline code',airlines[i][2])||airlines[i][2];saveData();renderAirlines()};
  window.addSimple=function(kind){if(!admin())return deny();let n=prompt('Name');if(!n)return;let p=Number(prompt('Price (SAR)','0'))||0,u=prompt('Unit','per person')||'per person',a=kind==='transport'?transport:extras;a.push({name:n,price:p,unit:u,active:true});saveData();renderSimple(kind)};
  window.editSimple=function(kind,i){if(!admin())return deny();let a=kind==='transport'?transport:extras,x=a[i];if(!x)return;x.name=prompt('Name',x.name)||x.name;x.price=Number(prompt('Price (SAR)',x.price))||0;x.unit=prompt('Unit',x.unit)||x.unit;x.active=confirm('Keep active?');saveData();renderSimple(kind)};
  window.saveHotel=function(index){if(!admin())return deny();let h=[$('hmCity').value,$('hmName').value,$('hmLoc').value,$('hmDist').value,...roomTypes.map((r,i)=>{let v=$('hm'+i).value;return v===''?null:+v})];if(!h[1])return alert('Hotel name is required.');if(index===null)hotels.push(h);else hotels[index]=h;saveData();closeModal();renderHotels()};
  window.openHotelModal=function(index=null){if(!admin())return deny();let h=index===null?null:hotels[index];if(!h&&index!==null)return; $('modalbox').innerHTML='<div class="modalhead"><h3>'+(h?'Edit Hotel':'Add New Hotel')+'</h3><button class="btn outline" onclick="closeModal()">×</button></div><div class="grid" style="margin-top:12px"><div class="field"><label>City</label><select id="hmCity"><option '+(h?.[0]==='Makkah'?'selected':'')+'>Makkah</option><option '+(h?.[0]==='Madinah'?'selected':'')+'>Madinah</option></select></div><div class="field"><label>Hotel Name</label><input id="hmName" value="'+esc(h?.[1]||'')+'"></div><div class="field"><label>Location</label><input id="hmLoc" value="'+esc(h?.[2]||'')+'"></div><div class="field"><label>Distance</label><input id="hmDist" value="'+esc(h?.[3]||'')+'"></div>'+roomTypes.map((r,i)=>'<div class="field"><label>'+r+' Rate (SAR)</label><input id="hm'+i+'" type="number" value="'+(h?.[4+i]??'')+'"></div>').join('')+'</div><div class="modal-actions"><button class="btn outline" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveHotel('+(index===null?'null':index)+')">Save Hotel</button></div>';$('modal').classList.add('open');document.body.classList.add('modal-open')};
})();


(function(){
 const admin=()=>typeof isSuperAdmin==='function'&&isSuperAdmin();
 const deny=()=>alert('Only Super Admin can edit shared configuration.');
 const oldOpenVisa=window.openVisaModal;
 window.openVisaModal=function(i){if(!admin())return deny();return oldOpenVisa(i)};
 const oldDeleteVisa=window.deleteVisaType;
 window.deleteVisaType=function(i){if(!admin())return deny();return oldDeleteVisa(i)};
 const oldAddDur=window.addVisaDurationRow,oldAddGroup=window.addVisaGroupRow;
 window.addVisaDurationRow=function(){if(!admin())return deny();return oldAddDur()};
 window.addVisaGroupRow=function(){if(!admin())return deny();return oldAddGroup()};
 const oldSaveVisa=window.saveVisa;
 window.saveVisa=function(i){if(!admin())return deny();return oldSaveVisa(i)};
})();


(function(){
 const admin=()=>typeof isSuperAdmin==='function'&&isSuperAdmin();
 window.openUserModal=function(){if(!admin())return;alert('For secure online accounts, new users register from the Login → Register New User screen. Super Admin can then manage, edit, disable and reset accounts here.');};
 const oldNormalize=window.normalizeBooking;
 window.normalizeBooking=function(){
   if(typeof oldNormalize==='function')oldNormalize();
   if(typeof q!=='undefined'&&q&&String(q.visa||'').toLowerCase()==='only visa')q.stays=[];
 };
 const oldRenderWizard=window.renderWizard;
 window.renderWizard=function(){
   if(typeof q!=='undefined'&&q&&step===3&&String(q.visa||'').toLowerCase()==='only visa'){
     const w=$('wizard');if(!w)return;
     w.innerHTML='<h3 class="section-title">Hotel Selection</h3><div class="notice"><b>Hotels are not included with Only Visa.</b><br>Only Visa is priced only by the selected 15, 21, 28 or 75-day duration and has no hotel or accommodation charges. To add hotels, go back to Visa and select <b>Umrah Visa</b>.</div><div style="display:flex;justify-content:space-between;gap:8px;margin-top:14px"><button type="button" class="btn outline" onclick="goBookingStep(2)">← Previous</button><button type="button" class="btn primary" onclick="goBookingStep(4)">Next → Visa</button></div>';
     return;
   }
   return oldRenderWizard();
 };
 window.visaStep=function(){
   let v=visaTypes.find(x=>x.name===q.visa)||visaTypes[0];if(!v)return '<div class="notice">No active visa type is configured.</div>';
   const only=window.v14VisaIsOnly(v);const umrah=window.v14VisaIsUmrah(v);
   if(umrah)window.v14EnsureUmrahDurations(v);
   const dur=v.durations||[];
   if(only&&!dur.some(d=>Number(d.days)===Number(q.visaDuration)))q.visaDuration=dur[0]?.days||15;
   const d=selectedVisaRule(v,q.visaDuration),price=only&&d?Number(d.pkr)/fx:visaForGroup();
   const typeOptions=visaTypes.filter(x=>x.active).map(x=>'<option '+(q.visa===x.name?'selected':'')+'>'+esc(x.name)+'</option>').join('');
   const durationHtml='<div class="field"><label>'+ (umrah?'Visa Duration / Category':'Visa Duration / Category') +'</label><select onchange="q.visaDuration=+this.value;renderWizard()">'+dur.map(x=>'<option value="'+x.days+'" '+(Number(q.visaDuration)===Number(x.days)?'selected':'')+'>'+ (x.days===90?'3 Months':x.days+' Days') + (only?' — PKR '+Number(x.pkr).toLocaleString()+' / SAR '+(Number(x.pkr)/fx).toFixed(2):' — Same Passenger-Group Price') +'</option>').join('')+'</select></div>';
   const groups=(v.adultRules||[]).filter(r=>r.active!==false).sort((a,b)=>a.min-b.min).map(r=>'<tr><td>'+esc(r.label)+'</td><td>'+r.min+'–'+r.max+'</td><td>'+Number(r.price||0).toFixed(2)+'</td><td>'+Math.round(Number(r.price||0)*fx).toLocaleString()+'</td></tr>').join('');
   return '<h3 class="section-title">Visa Selection</h3><div class="grid2"><div class="field"><label>Visa Type</label><select onchange="q.visa=this.value;q.visaDuration=(visaTypes.find(x=>x.name===this.value)?.durations?.[0]?.days||15);if(this.value!==\'Umrah Visa\')q.stays=[];renderWizard()">'+typeOptions+'</select></div>'+durationHtml+'</div>'+
     '<div class="notice" style="margin-top:8px"><b>Selected:</b> '+esc(v.name)+' • <b>'+(Number(q.visaDuration)===90?'3 Months':q.visaDuration+' Days')+'</b> '+(only?'• <b>'+sar(price)+' per person</b>':'• <b>Passenger-group pricing — duration does not change the price</b>')+' • 1 SAR = '+fx+' PKR</div>'+
     (only?'':'<div class="tablewrap" style="margin-top:10px"><table class="table"><tr><th>Passenger Group</th><th>Range</th><th>SAR / Person</th><th>PKR / Person</th></tr>'+groups+'</table></div><div class="grid2" style="margin-top:10px"><div class="field"><label>Child Visa (SAR)</label><input type="number" value="'+v.child+'" onchange="v.child=+this.value||0;saveData();renderWizard()"></div><div class="field"><label>Infant Visa (SAR)</label><input type="number" value="'+v.infant+'" onchange="v.infant=+this.value||0;saveData();renderWizard()"></div></div>');
 };
})();


(function(){
 const onlyVisa=v=>String(v?.name||'').toLowerCase()==='only visa';
 const oldTotals=window.totals;
 window.totals=function(){
   const t=oldTotals();
   const v=visaTypes.find(x=>x.name===q.visa)||visaTypes[0];
   if(!v||onlyVisa(v)){
     t.hotel=0;t.adultHotel=0;t.childHotel=0;
     t.adult=(t.av);t.child=t.cv;t.grand=t.av+t.cv+t.iv+t.at+t.ct+t.it+t.trans+t.ex;
   }
   return t;
 };
 const oldPcTotals=window.pcTotals;
 window.pcTotals=function(){
   const t=oldPcTotals(),v=visaTypes.find(x=>x.name===pc.visa)||visaTypes[0];
   if(!v||onlyVisa(v)){
     t.mc=0;t.dc=0;t.hotel=0;t.adultHotel=0;t.childBedHotel=0;
     t.adult=t.av+t.at;t.childBed=(onlyVisa(v)?pc.childBed*pcVisaPerAdult():t.childBed)+t.ctb;
     t.childNoBed=(onlyVisa(v)?pc.childNoBed*pcVisaPerAdult():t.childNoBed)+t.ctn;t.infant=t.iv+t.it;
     t.grand=t.av+t.cv+t.iv+t.at+t.ctb+t.ctn+t.it;
   }
   return t;
 };
})();


(function(){
  const protectedKeys=new Set([
    'keaUsersV10','keaFxV15','keaHotelsV10','keaHotelsV7','keaVisaV10','keaVisaV7',
    'keaAirlinesV10','keaAirlinesV7','keaTransportV10','keaTransportV7','keaExtrasV10','keaExtrasV7'
  ]);
  const purge=()=>{
    try{
      [...protectedKeys].forEach(k=>localStorage.removeItem(k));
      Object.keys(localStorage).filter(k=>k.startsWith('keaQuotesV10_')||k.startsWith('keaQuotesV11_')||k.startsWith('keaPackageCostsV11_')).forEach(k=>localStorage.removeItem(k));
    }catch(e){}
  };
  const oldSet=localStorage.setItem.bind(localStorage);
  localStorage.setItem=function(k,v){
    oldSet(k,v);
    if(protectedKeys.has(k)||k.startsWith('keaQuotesV10_')||k.startsWith('keaQuotesV11_')||k.startsWith('keaPackageCostsV11_')){
      setTimeout(()=>{try{localStorage.removeItem(k)}catch(e){}},2200);
    }
  };
  window.v14PurgeLocalCache=purge;
})();
