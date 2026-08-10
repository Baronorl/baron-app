import React, {useMemo, useState, useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import {
  Search, MapPin, CalendarDays, Users, Star, ShieldCheck, Heart, MessageCircle,
  BriefcaseBusiness, Home as HomeIcon, UserRound, ChevronRight, Sparkles,
  Martini, Building2, PartyPopper, Check, Send, Clock3, DollarSign, Menu,
  X, Languages, LayoutDashboard, WalletCards, BadgeCheck
} from 'lucide-react';
import './styles.css';

const i18n = {
  en: {
    find:"Find a Pro", post:"Post an Event", quotes:"Quotes", messages:"Messages", bookings:"Bookings",
    pro:"BarOn Pro", login:"Log in", hero:"Make your event unforgettable.",
    sub:"Find trusted bartenders and mobile bars for weddings, birthdays, corporate events and private celebrations.",
    cta:"Find My Bar", second:"Post My Event", need:"What do you need?", where:"Where is your event?",
    date:"Event date", guests:"Guests", popular:"Popular near you", how:"How BarOn works",
    step1:"Tell us about your event", step2:"Compare trusted Bar Pros", step3:"Book with confidence",
    lang:"Español", verified:"Verified", from:"Starting at", profile:"View Profile", availability:"Check Availability",
    request:"Request Quote", allPros:"Bar Pros available for your event", budget:"Budget", eventType:"Event Type",
    service:"Service", rating:"Rating", results:"Results", back:"Back", packages:"Packages", reviews:"Reviews",
    about:"About", location:"Location", book:"Accept & Continue", send:"Send Quote", dashboard:"Dashboard",
    leads:"Leads", earnings:"Earnings", calendar:"Calendar", newLeads:"New Leads", upcoming:"Upcoming Events",
    monthly:"Bookings this month", est:"Estimated Earnings"
  },
  es: {
    find:"Buscar Pro", post:"Publicar Evento", quotes:"Cotizaciones", messages:"Mensajes", bookings:"Reservas",
    pro:"BarOn Pro", login:"Entrar", hero:"Haz que tu evento sea inolvidable.",
    sub:"Encuentra bartenders y barras móviles para bodas, cumpleaños, eventos corporativos y celebraciones privadas.",
    cta:"Encontrar mi bar", second:"Publicar mi evento", need:"¿Qué necesitas?", where:"¿Dónde es tu evento?",
    date:"Fecha del evento", guests:"Invitados", popular:"Populares cerca de ti", how:"Cómo funciona BarOn",
    step1:"Cuéntanos sobre tu evento", step2:"Compara Bar Pros confiables", step3:"Reserva con confianza",
    lang:"English", verified:"Verificado", from:"Desde", profile:"Ver perfil", availability:"Ver disponibilidad",
    request:"Solicitar cotización", allPros:"Bar Pros disponibles para tu evento", budget:"Presupuesto", eventType:"Tipo de evento",
    service:"Servicio", rating:"Calificación", results:"Resultados", back:"Atrás", packages:"Paquetes", reviews:"Reseñas",
    about:"Acerca de", location:"Ubicación", book:"Aceptar y continuar", send:"Enviar cotización", dashboard:"Panel",
    leads:"Oportunidades", earnings:"Ganancias", calendar:"Calendario", newLeads:"Nuevos leads", upcoming:"Próximos eventos",
    monthly:"Reservas este mes", est:"Ganancias estimadas"
  }
};

const providers = [
  {id:1,name:"Cocktail Culture Orlando",rating:4.9,reviews:127,city:"Orlando, FL",distance:"50 mi",price:750,languages:"English · Español",type:"Mobile Bar · Weddings",emoji:"🍸"},
  {id:2,name:"Pour Decisions Mobile Bar",rating:4.8,reviews:98,city:"Kissimmee, FL",distance:"35 mi",price:650,languages:"English · Español",type:"Mobile Bar · Private Events",emoji:"🥂"},
  {id:3,name:"On The Rocks Events",rating:4.9,reviews:156,city:"Winter Park, FL",distance:"60 mi",price:800,languages:"English",type:"Full Bar · Corporate",emoji:"🍹"},
  {id:4,name:"Brindis Mobile Mixology",rating:4.9,reviews:84,city:"Davenport, FL",distance:"45 mi",price:700,languages:"Español · English",type:"Mixology · Quinceañeras",emoji:"✨"},
  {id:5,name:"Golden Hour Bartending",rating:4.7,reviews:69,city:"Lake Buena Vista, FL",distance:"30 mi",price:550,languages:"English",type:"Bartender · Weddings",emoji:"🍾"},
  {id:6,name:"The Social Pour",rating:4.8,reviews:113,city:"Orlando, FL",distance:"40 mi",price:720,languages:"English · Español",type:"Cocktail Catering",emoji:"🍸"}
];

function Logo({compact=false}) {
  return <button className={"logo "+(compact?"compact":"")} onClick={()=>location.hash=""}>
    <span>Bar</span><span className="logo-on">On</span>
  </button>
}

function App(){
  const [lang,setLang]=useState(localStorage.getItem("baron-lang")||"en");
  const [page,setPage]=useState("home");
  const [selected,setSelected]=useState(providers[0]);
  const [selectedQuote,setSelectedQuote]=useState(null);
  const [mobile,setMobile]=useState(false);
  const t=i18n[lang];
  const go=(p)=>{setPage(p); window.scrollTo({top:0,behavior:"smooth"});}
  const toggle=()=>{const n=lang==="en"?"es":"en"; setLang(n); localStorage.setItem("baron-lang",n);}
  return <div className="app-shell">
    <header>
      <Logo />
      <nav className="desktop-nav">
        <button onClick={()=>go("find")}>{t.find}</button>
        <button onClick={()=>go("post")}>{t.post}</button>
        <button onClick={()=>go("bookings")}>{t.bookings}</button>
        <button onClick={()=>go("messages")}>{t.messages}</button>
        <button className="pro-link" onClick={()=>go("pro")}>{t.pro}</button>
      </nav>
      <div className="header-actions">
        <button className="lang" onClick={toggle}><Languages size={16}/>{t.lang}</button>
        <button className="outline-btn">{t.login}</button>
        <button className="menu-btn" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button>
      </div>
    </header>
    {mobile && <div className="mobile-menu">
      {[["find",t.find],["post",t.post],["quotes",t.quotes],["messages",t.messages],["bookings",t.bookings],["pro",t.pro]].map(x=>
        <button key={x[0]} onClick={()=>{go(x[0]);setMobile(false)}}>{x[1]}</button>
      )}
    </div>}
    <main>
      {page==="home" && <Home t={t} go={go} setSelected={setSelected}/>}
      {page==="find" && <Find t={t} go={go} setSelected={setSelected}/>}
      {page==="profile" && <Provider t={t} p={selected} go={go}/>}
      {page==="post" && <PostEvent t={t} go={go}/>}
      {page==="quotes" && (
  <Quotes
    t={t}
    go={go}
    setSelectedQuote={setSelectedQuote}
  />
)}
      {page==="messages" && <Messages t={t}/>}
      {page==="bookings" && <Bookings t={t} go={go}/>}\n      {page==="bookingdetail" && <BookingDetail t={t} go={go}/>}
      {page==="pro" && <ProDashboard t={t} go={go}/>}
      {page==="lead" && <LeadDetail t={t} go={go}/>}
      {page==="sendquote" && <SendQuote t={t} go={go}/>}
      {page==="checkout" && (
  <Checkout
    t={t}
    go={go}
    selectedQuote={selectedQuote}
  />
)}
      {page==="confirmed" && <Confirmed t={t} go={go}/>}
    </main>
    <footer>
      <Logo compact/>
      <span>© 2026 BarOn · Demo MVP</span>
      <span>Party On. BarOn.</span>
    </footer>
  </div>
}

function SearchCard({t,go}) {
  return <div className="search-card">
    <div className="field"><Martini/><div><small>{t.need}</small><strong>Bartender / Mobile Bar</strong></div></div>
    <div className="field"><MapPin/><div><small>{t.where}</small><strong>Orlando, FL</strong></div></div>
    <div className="field"><CalendarDays/><div><small>{t.date}</small><strong>Oct 17, 2026</strong></div></div>
    <div className="field"><Users/><div><small>{t.guests}</small><strong>120</strong></div></div>
    <button className="gold-btn large" onClick={()=>go("find")}><Search size={18}/>{t.cta}</button>
  </div>
}

function Home({t,go,setSelected}) {
  return <>
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow"><Sparkles size={16}/> Party On. BarOn.</span>
        <h1>{t.hero}</h1>
        <p>{t.sub}</p>
        <div className="hero-buttons">
          <button className="gold-btn" onClick={()=>go("find")}>{t.cta}<ChevronRight size={18}/></button>
          <button className="ghost-btn" onClick={()=>go("post")}>{t.second}</button>
        </div>
      </div>
      <div className="hero-visual">
        <div className="glass-card">
          <div className="cocktail">🍸</div>
          <strong>Turn your event ON.</strong>
          <span>Premium bartenders · Mobile bars · Full cocktail experiences</span>
        </div>
      </div>
    </section>
    <section className="search-wrap"><SearchCard t={t} go={go}/></section>
    <section>
      <div className="section-head"><div><span className="eyebrow">Central Florida</span><h2>{t.popular}</h2></div><button className="text-btn" onClick={()=>go("find")}>{t.find} →</button></div>
      <div className="provider-grid">
        {providers.slice(0,3).map(p=><ProviderCard key={p.id} p={p} t={t} onOpen={()=>{setSelected(p);go("profile")}}/>)}
      </div>
    </section>
    <section className="how">
      <div className="section-head"><div><span className="eyebrow">Simple. Fast. Trusted.</span><h2>{t.how}</h2></div></div>
      <div className="steps">
        <Step icon={<PartyPopper/>} n="01" title={t.step1}/>
        <Step icon={<ShieldCheck/>} n="02" title={t.step2}/>
        <Step icon={<BadgeCheck/>} n="03" title={t.step3}/>
      </div>
    </section>
    <section className="pro-cta">
      <div><span className="eyebrow">For professionals</span><h2>Grow your bar business with BarOn Pro.</h2><p>Get discovered, receive qualified event leads, send quotes and manage bookings.</p></div>
      <button className="gold-btn" onClick={()=>go("pro")}>Join BarOn Pro <ChevronRight size={18}/></button>
    </section>
  </>
}

function Step({icon,n,title}) {
  return <div className="step-card"><span className="step-no">{n}</span><div className="icon-circle">{icon}</div><h3>{title}</h3></div>
}

function ProviderCard({p,t,onOpen}) {
  return <article className="provider-card">
    <div className="provider-image"><span>{p.emoji}</span><button><Heart size={18}/></button><div className="verified"><ShieldCheck size={14}/>{t.verified}</div></div>
    <div className="provider-body">
      <div className="rating"><Star size={15} fill="currentColor"/><b>{p.rating}</b><span>({p.reviews})</span></div>
      <h3>{p.name}</h3><p>{p.type}</p>
      <div className="meta"><MapPin size={15}/>{p.city} · +{p.distance}</div>
      <div className="meta"><Languages size={15}/>{p.languages}</div>
      <div className="provider-foot"><div><small>{t.from}</small><strong>${p.price}</strong></div><button onClick={onOpen}>{t.profile}</button></div>
    </div>
  </article>
}

function Find({t,go,setSelected}) {
  return <section className="page">
    <div className="page-title"><span className="eyebrow">BarOn Marketplace</span><h1>{t.allPros}</h1><p>Orlando, FL · Oct 17 · 120 guests</p></div>
    <div className="filters">
      {[t.location,t.eventType,t.service,t.budget,t.rating].map((x,i)=><button key={i}>{x}<ChevronRight size={15}/></button>)}
      <button className="verified-filter"><ShieldCheck size={16}/> {t.verified}</button>
    </div>
    <div className="provider-grid">
      {providers.map(p=><ProviderCard key={p.id} p={p} t={t} onOpen={()=>{setSelected(p);go("profile")}}/>)}
    </div>
  </section>
}

function Provider({t,p,go}) {
  return <section className="page provider-page">
    <button className="text-btn" onClick={()=>go("find")}>← {t.back}</button>
    <div className="profile-hero">
      <div className="profile-cover"><span>{p.emoji}</span></div>
      <div className="profile-card">
        <div className="rating"><Star size={16} fill="currentColor"/><b>{p.rating}</b> ({p.reviews} {t.reviews})</div>
        <h1>{p.name}</h1>
        <div className="badge-row"><span className="verified"><ShieldCheck size={14}/>{t.verified}</span><span>{p.languages}</span></div>
        <p><MapPin size={16}/>{p.city} · Serves +{p.distance}</p>
        <p><Clock3 size={16}/> Responds within 1 hour</p>
        <div className="sticky-actions"><button className="ghost-btn"><MessageCircle size={18}/> Message</button><button className="gold-btn" onClick={()=>go("quotes")}>{t.request}</button></div>
      </div>
    </div>
    <div className="content-grid">
      <div>
        <div className="content-card"><h2>{t.about}</h2><p>Professional event bar team specializing in weddings, private parties and premium cocktail experiences across Central Florida.</p></div>
        <div className="content-card"><h2>{t.packages}</h2>
          {[["Bartender Only",350,"Professional bartender, basic tools, setup & breakdown"],["Signature Bar",850,"Bartender, mobile bar setup, mixers, garnishes"],["Full Cocktail Experience",1500,"Premium mobile bar, multiple bartenders, cocktail menu, ice & setup"]].map(x=>
            <div className="package" key={x[0]}><div><h3>{x[0]}</h3><p>{x[2]}</p></div><strong>{t.from} ${x[1]}</strong></div>
          )}
        </div>
      </div>
      <aside className="quote-box"><h3>{t.availability}</h3><p>Oct 17, 2026 · Orlando, FL</p><div className="price-big"><small>{t.from}</small>${p.price}</div><button className="gold-btn full" onClick={()=>go("quotes")}>{t.request}</button></aside>
    </div>
  </section>
}

function PostEvent({t,go}) {
  const [step,setStep]=useState(1);
  const [done,setDone]=useState(false);
  if(done) return <section className="center-state"><div className="success-icon"><Check/></div><h1>Your event is live!</h1><p>Matching BarOn Pros can now send you quotes.</p><button className="gold-btn" onClick={()=>go("quotes")}>View Quotes</button></section>
  const titles=["Choose your event","Event details","Build your bar","Set your budget","Review & post"];
  return <section className="page narrow">
    <div className="page-title"><span className="eyebrow">{t.post}</span><h1>{titles[step-1]}</h1><p>Step {step} of 5</p></div>
    <div className="progress"><span style={{width:`${step*20}%`}}/></div>
    <div className="form-card">
      {step===1 && <ChoiceGrid items={["Wedding","Birthday","Corporate Event","Private Party","Quinceañera","Anniversary"]}/>}
      {step===2 && <div className="form-grid"><Input label="Date" value="Oct 17, 2026"/><Input label="Start time" value="5:00 PM"/><Input label="Service hours" value="5 hours"/><Input label="Guests" value="150"/><Input label="Location" value="Orlando, FL"/><Input label="Venue" value="Outdoor"/></div>}
      {step===3 && <ChoiceGrid items={["Mobile Bar","Bartender(s)","Mixers","Ice","Garnishes","Glassware","Signature Cocktails","Mocktails"]}/>}
      {step===4 && <ChoiceGrid items={["Under $500","$500–$1,000","$1,000–$1,500","$1,500–$2,500","$2,500+"]}/>}
      {step===5 && <div className="review-card"><h3>Wedding · Orlando</h3><p>Oct 17, 2026 · 150 guests · 5 hours</p><div className="tags"><span>Mobile Bar</span><span>2 Bartenders</span><span>Mixers</span><span>Signature Cocktails</span></div><strong>Budget: $1,000–$1,500</strong></div>}
      <div className="wizard-actions"><button className="ghost-btn" disabled={step===1} onClick={()=>setStep(step-1)}>Back</button><button className="gold-btn" onClick={()=>step===5?setDone(true):setStep(step+1)}>{step===5?"Post Event":"Continue"}</button></div>
    </div>
  </section>
}

function ChoiceGrid({items}) {
  const [selected,setSelected]=useState([items[0]]);
  return <div className="choice-grid">{items.map(x=><button key={x} className={selected.includes(x)?"selected":""} onClick={()=>setSelected(s=>s.includes(x)?s.filter(a=>a!==x):[...s,x])}>{x}{selected.includes(x)&&<Check size={16}/>}</button>)}</div>
}
function Input({label,value}) { return <label className="input"><span>{label}</span><input defaultValue={value}/></label> }

function Quotes({t,go,setSelectedQuote}) {
  return <section className="page">
    <div className="page-title"><span className="eyebrow">{t.quotes}</span><h1>Maria & David’s Wedding</h1><p>October 17 · Orlando, FL · 150 guests</p></div>
    <div className="quote-grid">
      {providers.slice(0,3).map((p,i)=><div className="quote-card" key={p.id}>
        <div className="quote-top"><div className="avatar">{p.emoji}</div><div><h3>{p.name}</h3><div className="rating"><Star size={14} fill="currentColor"/>{p.rating} · <ShieldCheck size={14}/>{t.verified}</div></div></div>
        <div className="quote-price">${[1350,1480,1600][i]}<small>estimated total</small></div>
        <div className="tags"><span>Mobile Bar</span><span>2 Bartenders</span><span>Mixers</span><span>5 Hours</span></div>
        <p>We'd love to create a custom cocktail experience for your wedding.</p>
        <div className="quote-actions"><button className="ghost-btn"><MessageCircle size={17}/> Message</button><button className="gold-btn" onClick={()=>{
  setSelectedQuote({
    provider:p.name,
    price:[1350,1480,1600][i]
  });
  go("checkout");
}}>Accept Quote</button></div>
      </div>)}
    </div>
  </section>
}

function Checkout({t,go,selectedQuote}) {
const packagePrice = selectedQuote?.price || 1200;
const providerName = selectedQuote?.provider || "Cocktail Culture Orlando";
const total = packagePrice + 50 + 100;
const deposit = total * 0.30;
  return <section className="page narrow">
    <div className="page-title"><span className="eyebrow">Checkout</span><h1>Confirm your BarOn booking</h1></div>
    <div className="checkout-card">
      <div><h3>{providerName}</h3><p>Signature Bar · Wedding · Oct 17, 2026</p></div>
      <div className="line"><span>Package</span><strong>${packagePrice.toLocaleString()}</strong></div>
      <div className="line"><span>Travel</span><strong>$50</strong></div>
      <div className="line"><span>Estimated service fee</span><strong>$100</strong></div>
      <div className="line total"><span>Total</span><strong>${total.toLocaleString()}</strong></div>
      <div className="deposit"><span>Deposit due today</span><strong>${deposit.toLocaleString()}</strong></div>
      <label className="agree"><input type="checkbox" defaultChecked/> I agree to the demo booking terms.</label>
      <button className="gold-btn full" onClick={()=>{
  const booking={
    id:Date.now(),
    provider: providerName,
    event:"Maria & David's Wedding",
    date:"Oct 17, 2026",
    location:"Orlando, FL",
    price: `$${total.toLocaleString()}`,
    status:"Confirmed"
  };

  const saved=JSON.parse(localStorage.getItem("baron_bookings") || "[]");
  localStorage.setItem("baron_bookings",JSON.stringify([...saved,booking]));

  go("confirmed");
}}>Confirm Booking</button>
    </div>
  </section>
}

function Confirmed({go}) {
  return <section className="center-state"><div className="success-icon"><Check/></div><span className="eyebrow">Booking confirmed</span><h1>Your bar is ON!</h1><p>Cocktail Culture Orlando · October 17, 2026 · Orlando, FL</p><div className="confirmation">Confirmation #BARON-1026-417</div><button className="gold-btn" onClick={()=>go("bookings")}>View Booking</button></section>
}

function Messages() {
  const chats=["Cocktail Culture Orlando","Pour Decisions Mobile Bar","BarOn Support"];
  const [active,setActive]=useState(chats[0]);
const [draft,setDraft]=useState("");
const [messagesByChat,setMessagesByChat]=useState(()=>{
  const saved=localStorage.getItem("baron_messages_by_chat");
  return saved ? JSON.parse(saved) : {};
});

const sentMessages=messagesByChat[active] || [];

useEffect(()=>{
  localStorage.setItem(
    "baron_messages_by_chat",
    JSON.stringify(messagesByChat)
  );
},[messagesByChat]);
  return <section className="page">
    <div className="page-title"><span className="eyebrow">Messages</span><h1>Conversations</h1></div>
    <div className="messages-layout">
      <div className="conversation-list">{chats.map((c,i)=><button className={active===c?"active":""} onClick={()=>setActive(c)} key={c}><div className="avatar">{["🍸","🥂","⚡"][i]}</div><div><strong>{c}</strong><span>{i===0?"Your quote is ready.":"Thanks for reaching out..."}</span></div></button>)}</div>
      <div className="chat"><div className="chat-head"><strong>{active}</strong><span>Usually replies within 1 hour</span></div><div className="chat-body"><div className="bubble theirs">Hi Maria! We'd love to help with your event.</div><div className="bubble mine">Amazing. Can you include two signature cocktails?</div><div className="bubble theirs">Absolutely — I just updated your proposal.</div>
{sentMessages.map((msg,i)=>
  <div className="bubble mine" key={i}>{msg}</div>
)}</div><div className="composer"><input
  placeholder="Type a message..."
  value={draft}
  onChange={(e)=>setDraft(e.target.value)}
/>
<button onClick={()=>{
  if(draft.trim()){
    setMessagesByChat({
  ...messagesByChat,
  [active]: [...sentMessages,draft.trim()]
});
    setDraft("");
  }
}}>
  <Send/>
</button></div></div>
    </div>
  </section>
}

function Bookings({go}) {
  const bookings=JSON.parse(localStorage.getItem("baron_bookings") || "[]");
const [tab,setTab]=useState("Upcoming");

const filteredBookings=bookings.filter(b=>{
  if(tab==="Upcoming") return b.status==="Confirmed";
  if(tab==="Completed") return b.status==="Completed";
  if(tab==="Cancelled") return b.status==="Cancelled";
  return true;
});
  return (
    <section className="page">
      <div className="page-title">
        <span className="eyebrow">Bookings</span>
        <h1>Your events</h1>
      </div>

      <div className="tabs">
        <button
  className={tab==="Upcoming" ? "active" : ""}
  onClick={()=>setTab("Upcoming")}
>
  Upcoming
</button>

<button
  className={tab==="Completed" ? "active" : ""}
  onClick={()=>setTab("Completed")}
>
  Completed
</button>

<button
  className={tab==="Cancelled" ? "active" : ""}
  onClick={()=>setTab("Cancelled")}
>
  Cancelled
</button>
      </div>

      {filteredBookings.length===0 ? (
        <div className="content-card">
          <h3>No bookings yet</h3>
          <p>Your confirmed bookings will appear here.</p>
        </div>
      ) : (
        filteredBookings.map((booking)=>(
          <div className="booking-card" key={booking.id}>
            <div className="booking-date">
              <strong>17</strong>
              <span>OCT</span>
            </div>

            <div className="booking-main">
              <span className="status">{booking.status}</span>
              <h3>{booking.event}</h3>
              <p>{booking.provider} · {booking.location}</p>
            </div>

            <div className="booking-price">
              <strong>{booking.price}</strong>
              <button
                className="ghost-btn"
                onClick={()=>go("bookingdetail")}
              >
                View Details
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );
}
function BookingDetail({go}) {
  const bookings=JSON.parse(localStorage.getItem("baron_bookings") || "[]");
  const booking=bookings[bookings.length-1];

  if(!booking){
    return (
      <section className="page narrow">
        <button className="text-btn" onClick={()=>go("bookings")}>
          ← Back to Bookings
        </button>

        <div className="content-card">
          <h2>Booking not found</h2>
          <p>No confirmed booking is available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page narrow">
      <button className="text-btn" onClick={()=>go("bookings")}>
        ← Back to Bookings
      </button>

      <div className="page-title booking-detail-title">
        <span className="eyebrow">Confirmed Booking</span>
        <h1>{booking.event}</h1>
        <p>{booking.provider} · {booking.date} · {booking.location}</p>
      </div>

      <div className="booking-detail-status">
        <div className="success-icon small"><Check/></div>
        <div>
          <strong>Your bar is ON.</strong>
          <span>Confirmation #{booking.id}</span>
        </div>
        <span className="status">{booking.status}</span>
      </div>

      <div className="content-card">
        <h2>Event details</h2>
        <div className="detail-grid booking-info-grid">
          <div><small>Date</small><strong>{booking.date}</strong></div>
          <div><small>Start time</small><strong>5:00 PM</strong></div>
          <div><small>Guests</small><strong>150</strong></div>
          <div><small>Service</small><strong>5 hours</strong></div>
          <div><small>Location</small><strong>{booking.location}</strong></div>
          <div><small>Venue</small><strong>Outdoor</strong></div>
        </div>
      </div>

      <div className="content-card">
        <div className="booking-provider">
          <div className="avatar big">🍸</div>
          <div>
            <span className="eyebrow">Your BarOn Pro</span>
            <h2>{booking.provider}</h2>
            <div className="rating">
              <Star size={15} fill="currentColor"/>4.9 · <ShieldCheck size={15}/> Verified
            </div>
          </div>
        </div>

        <div className="tags">
          <span>Signature Bar</span>
          <span>2 Bartenders</span>
          <span>Mixers</span>
          <span>Signature Cocktails</span>
        </div>

        <button
          className="ghost-btn full booking-message"
          onClick={()=>go("messages")}
        >
          <MessageCircle size={18}/> Message Provider
        </button>
      </div>

      <div className="content-card">
        <h2>Payment summary</h2>
        <div className="line"><span>Package</span><strong>$1,200</strong></div>
        <div className="line"><span>Travel</span><strong>$50</strong></div>
        <div className="line"><span>Estimated service fee</span><strong>$100</strong></div>
        <div className="line total"><span>Total</span><strong>{booking.price}</strong></div>
        <div className="deposit"><span>Demo deposit</span><strong>$405</strong></div>
        <p className="demo-note">Demo MVP only — no real payment has been processed.</p>
      </div>

      <div className="booking-detail-actions">
        <button className="ghost-btn" onClick={()=>go("messages")}>
          <MessageCircle size={18}/> Message Provider
 </button>
<button
className="danger-btn"
            onClick={()=>{
    const bookings=JSON.parse(localStorage.getItem("baron_bookings") || "[]");

    const updated=bookings.map(b=>
      b.id===booking.id
        ? {...b,status:"Cancelled"}
        : b
    );

    localStorage.setItem("baron_bookings",JSON.stringify(updated));
    go("bookings");
  }}
>

  Cancel Booking
</button><button
  className="gold-btn"
  onClick={()=>{
    const bookings=JSON.parse(localStorage.getItem("baron_bookings") || "[]");

    const updated=bookings.map(b=>
      b.id===booking.id
        ? {...b,status:"Completed"}
        : b
    );

    localStorage.setItem("baron_bookings",JSON.stringify(updated));
    go("bookings");
  }}
>
  Complete Booking
</button>
      </div>
    </section>
  );
}

function LeadDetail({go}) {
  return <section className="page narrow">
    <button className="text-btn" onClick={()=>go("pro")}>← Back to leads</button>
    <div className="page-title"><span className="eyebrow">New Event Opportunity</span><h1>Wedding in Orlando</h1><p>Maria · October 17, 2026</p></div>
    <div className="content-card">
      <div className="detail-grid"><div><small>Guests</small><strong>150</strong></div><div><small>Service hours</small><strong>5</strong></div><div><small>Budget</small><strong>$1,000–$1,500</strong></div><div><small>Location</small><strong>Orlando, FL</strong></div></div>
      <h3>Services requested</h3><div className="tags"><span>Mobile Bar</span><span>2 Bartenders</span><span>Mixers</span><span>Ice</span><span>Signature Cocktails</span></div>
      <p className="notes">“We’d love two signature cocktails and a polished, modern bar setup for our outdoor wedding.”</p>
      <div className="quote-actions"><button className="ghost-btn">Decline</button><button className="gold-btn" onClick={()=>go("sendquote")}>Send Quote</button></div>
    </div>
  </section>
}

function SendQuote({go}) {
  const [sent,setSent]=useState(false);
  if(sent) return <section className="center-state"><div className="success-icon"><Send/></div><h1>Quote sent successfully</h1><p>Maria will be notified and can message you with questions.</p><button className="gold-btn" onClick={()=>go("pro")}>Back to Dashboard</button></section>
  return <section className="page narrow"><div className="page-title"><span className="eyebrow">BarOn Pro</span><h1>Build your proposal</h1></div><div className="form-card"><div className="form-grid"><Input label="Package name" value="Signature Wedding Bar"/><Input label="Price" value="$1,350"/><Input label="Deposit" value="$405"/><Input label="Bartenders" value="2"/><Input label="Hours" value="5"/><Input label="Travel fee" value="$50"/></div><label className="input"><span>Message</span><textarea defaultValue="We’d love to create a memorable cocktail experience for your wedding."/></label><button className="gold-btn full" onClick={()=>setSent(true)}>Send Quote</button></div></section>
}

createRoot(document.getElementById('root')).render(<App/>);


