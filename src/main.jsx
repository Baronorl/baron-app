import React, {useMemo, useState, useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import {
  Search, MapPin, CalendarDays, Users, Star, ShieldCheck, Heart, MessageCircle,
  BriefcaseBusiness, Home as HomeIcon, UserRound, ChevronRight, Sparkles,
  Martini, Building2, PartyPopper, Check, Send, Clock3, DollarSign, Menu,
  X, Languages, LayoutDashboard, WalletCards, BadgeCheck
} from 'lucide-react';
import './styles.css';
import baronLogo from "./assets/baron-logo.png";

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
  {id:1,name:"Cocktail Culture Orlando",verified: true,rating:4.9,reviews:127,city:"Orlando, FL",distance:"50 mi",price:750,languages:"English · Español",type:"Mobile Bar · Weddings",emoji:"🍸"},
  {id:2,name:"Pour Decisions Mobile Bar",verified: true,rating:4.8,reviews:98,city:"Kissimmee, FL",distance:"35 mi",price:650,languages:"English · Español",type:"Mobile Bar · Private Events",emoji:"🥂"},
  {id:3,name:"On The Rocks Events",verified: false,rating:4.9,reviews:156,city:"Winter Park, FL",distance:"60 mi",price:800,languages:"English",type:"Full Bar · Corporate",emoji:"🍹"},
  {id:4,name:"Brindis Mobile Mixology",rating:4.9,reviews:84,city:"Davenport, FL",distance:"45 mi",price:700,languages:"Español · English",type:"Mixology · Quinceañeras",emoji:"✨"},
  {id:5,name:"Golden Hour Bartending",rating:4.7,reviews:69,city:"Lake Buena Vista, FL",distance:"30 mi",price:550,languages:"English",type:"Bartender · Weddings",emoji:"🍾"},
  {id:6,name:"The Social Pour",rating:4.8,reviews:113,city:"Orlando, FL",distance:"40 mi",price:720,languages:"English · Español",type:"Cocktail Catering",emoji:"🍸"}
];

function Logo({compact=false}) {
  return <button className={"logo "+(compact?"compact":"")} onClick={()=>window.location.reload()}>
    <span>Bar</span><span className="logo-on">On</span>
  </button>
}

function App(){
  const [lang,setLang]=useState(localStorage.getItem("baron-lang")||"en");
  const [page,setPage]=useState("home");
  const [selected,setSelected]=useState(providers[0]);
  const [selectedQuote,setSelectedQuote]=useState(null);

  const [eventData,setEventData]=useState({
  event:"Wedding",
  date:"Oct 17, 2026",
  time:"5:00 PM",
  location:"Orlando, FL",
  guests:"150",
  hours:"5",
  budget:"$1,000-$1,500"
});
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
        <button
  className="pro-link"
  onClick={()=>{
    const isLoggedIn = localStorage.getItem("baron_session") === "true";
    go(isLoggedIn ? "pro" : "login");
  }}
>
  {t.pro}
</button>
      </nav>
      <div className="header-actions">
        <button className="lang" onClick={toggle}><Languages size={16}/>{t.lang}</button>
        <button className="outline-btn" onClick={()=>go("login")}>{t.login}</button>
        <button className="menu-btn" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button>
      </div>
    </header>
    {mobile && <div className="mobile-menu">
      {[["find",t.find],["post",t.post],["quotes",t.quotes],["messages",t.messages],["bookings",t.bookings],["pro",t.pro]].map(x=>
        <button key={x[0]} onClick={()=>{go(x[0]);setMobile(false)}}>{x[1]}</button>
      )}
    </div>}
    <main>
 {page==="home" && (
  <Home
    t={t}
    go={go}
    setSelected={setSelected}
    setEventData={setEventData}
  />
)}
      {page==="find" && (
  <Find
    t={t}
    go={go}
    setSelected={setSelected}
    eventData={eventData}
  />
)}
      {page==="profile" && <Provider t={t} p={selected} go={go}/>}
      {page==="post" && (
  <PostEvent
    t={t}
    go={go}
    eventData={eventData}
    setEventData={setEventData}
  />
)}
      {page==="quotes" && (
  <Quotes
    t={t}
    go={go}
    setSelectedQuote={setSelectedQuote}
    eventData={eventData}
  />
)}
      {page==="messages" && <Messages t={t}/>}
      {page==="bookings" && <Bookings t={t} go={go}/>}\n      {page==="bookingdetail" && <BookingDetail t={t} go={go}/>}
      {page==="pro" && <ProDashboard t={t} go={go}/>}
      {page==="lead" && <LeadDetail t={t} go={go}/>}
      {page==="login" && <Login t={t} go={go}/>}
      {page==="signup" && <Signup go={go}/>}
      {page==="sendquote" && <SendQuote t={t} go={go}/>}
      {page==="checkout" && (
      <Checkout
      t={t}
      go={go}
      selectedQuote={selectedQuote}
      eventData={eventData}
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

function SearchCard({t,go,setEventData}) {
  const [need, setNeed] = useState("Bartender");
  const [where, setWhere] = useState("Orlando, FL");
  const [date, setDate] = useState("2026-10-17");
  const [guests, setGuests] = useState("120");

  return (
    <div className="search-card">

      <div className="field">
        <Martini />
        <div>
          <small>{t.need}</small>
          <select
  value={need}
  onChange={(e) => setNeed(e.target.value)}
>
  <option value="Bartender">Bartender</option>
  <option value="Mobile Bar">Mobile Bar</option>
</select>
        </div>
      </div>

      <div className="field">
        <MapPin />
        <div>
          <small>{t.where}</small>
          <input
  type="text"
  list="us-cities"
  value={where}
  onChange={(e) => setWhere(e.target.value)}
/>

<datalist id="us-cities">
  <option value="Jacksonville, FL" />
  <option value="Orlando, FL" />
  <option value="Miami, FL" />
  <option value="Tampa, FL" />
  <option value="Atlanta, GA" />
  <option value="New York, NY" />
  <option value="Los Angeles, CA" />
  <option value="Chicago, IL" />
</datalist>
        </div>
      </div>

      <div className="field">
        <CalendarDays />
        <div>
          <small>{t.date}</small>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <Users />
        <div>
          <small>{t.guests}</small>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
      </div>

      <button
        className="gold-btn large"
        onClick={() => {
  setEventData(prev => ({
    ...prev,
    need,
    location: where,
    date,
    guests
  }));

  go("find");
}}
      >
        <Search size={18} />
        {t.cta}
      </button>

    </div>
  );
}
function Home({t,go,setSelected,setEventData}) {
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
          <div className="cocktail">
  <img
    src={baronLogo}
    alt="BarOn logo"
    style={{
      width: "300px",
      height: "300px",
      objectFit: "contain",
      borderRadius: "100pz"
    }}
  />
</div>
          <strong>Turn your event ON.</strong>
          <span>Premium bartenders · Mobile bars · Full cocktail experiences</span>
        </div>
      </div>
    </section>
    <section className="search-wrap"><SearchCard
  t={t}
  go={go}
  setEventData={setEventData}
/></section>
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

function Find({t,go,setSelected,eventData}) {
const [verifiedOnly, setVerifiedOnly] = useState(false);
const [budgetMax, setBudgetMax] = useState(null);
const [ratingMin, setRatingMin] = useState(null);
const [serviceFilter, setServiceFilter] = useState(
  (eventData?.need || "").toLowerCase()
);
const [eventTypeFilter, setEventTypeFilter] = useState("");
const [locationFilter, setLocationFilter] = useState(
  (eventData?.location || "").toLowerCase()
);
const filteredProviders = providers.filter((p) => {
  const requestedService = serviceFilter;
  const requestedLocation = locationFilter;

  const providerType = (p.type || "").toLowerCase();
  const providerCity = (p.city || "").toLowerCase();
  const eventTypeMatches = true;
  !eventTypeFilter ||
  providerType.includes(eventTypeFilter);

  const serviceMatches =
    requestedService === "mobile bar"
      ? providerType.includes("mobile bar")
      : requestedService === "bartender"
      ? providerType.includes("bartender")
      : true;

  const locationMatches =
    !requestedLocation ||
    providerCity.includes(requestedLocation) ||
    requestedLocation.includes(providerCity);

const verifiedMatches = !verifiedOnly || p.verified;

const budgetMatches = 
budgetMax === null || p.price <= budgetMax;

const ratingMatches = 
ratingMin === null || p.rating >= ratingMin;

return (
       serviceMatches &&
       locationMatches &&
       verifiedMatches &&
       budgetMatches &&
       ratingMatches &&
       eventTypeMatches
);
});

return (
<section className="page">
    <div className="page-title">
      <span className="eyebrow">BarOn Marketplace</span>

      <h1>Bar Pros available for your event</h1>

      <p>
        {eventData?.location || "Orlando, FL"} ·{" "}
        {eventData?.date || "2026-10-17"} ·{" "}
        {eventData?.guests || "120"} guests
      </p>
    </div>

    <div className="filters">
  <button
  onClick={() =>
    setLocationFilter(
      locationFilter === ""
        ? "orlando, fl"
        : locationFilter === "orlando, fl"
        ? "kissimmee, fl"
        : locationFilter === "kissimmee, fl"
        ? "winter park, fl"
        : locationFilter === "winter park, fl"
        ? "davenport, fl"
        : locationFilter === "davenport, fl"
        ? "lake buena vista, fl"
        : ""
    )
  }
>
  {locationFilter === ""
    ? t.location
    : locationFilter === "orlando, fl"
    ? "Orlando"
    : locationFilter === "kissimmee, fl"
    ? "Kissimmee"
    : locationFilter === "winter park, fl"
    ? "Winter Park"
    : locationFilter === "davenport, fl"
    ? "Davenport"
    : "Lake Buena Vista"}

  <ChevronRight size={15} />
</button>
<button
  onClick={() =>
    setEventTypeFilter(
      eventTypeFilter === ""
        ? "weddings"
        : eventTypeFilter === "weddings"
        ? "private events"
        : eventTypeFilter === "private events"
        ? "corporate"
        : ""
    )
  }
>
  {eventTypeFilter === ""
    ? t.eventType
    : eventTypeFilter === "weddings"
    ? "Weddings"
    : eventTypeFilter === "private events"
    ? "Private Events"
    : "Corporate"}

  <ChevronRight size={15} />
</button>

<button
  onClick={() =>
    setRatingMin(
      ratingMin === null ? 4.5 :
      ratingMin === 4.5 ? 4.8 :
      ratingMin === 4.8 ? 4.9 :
      null
    )
  }
>
  {ratingMin === null ? t.rating : `${ratingMin}+ ★`}
  <ChevronRight size={15} />
</button>
      <button
  onClick={() =>
    setBudgetMax(
      budgetMax === null ? 700 :
      budgetMax === 700 ? 800 :
      null
    )
  }
>
  {budgetMax === null ? t.budget : `$${budgetMax} max`}
  <ChevronRight size={15} />
</button>

<button
  className="verified-filter"
  onClick={() => setVerifiedOnly(!verifiedOnly)}
>
  <ShieldCheck size={16} />
  {verifiedOnly ? "✓ Verified" : t.verified}
</button>
    </div>
    <div className="provider-grid">
      {filteredProviders.map(p=><ProviderCard key={p.id} p={p} t={t} onOpen={()=>{setSelected(p);go("profile")}}/>)}
    </div>
  </section>
);
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

function PostEvent({t,go,eventData,setEventData}) {
  const [step,setStep]=useState(1);
  const [done,setDone]=useState(false);
  
  if(done) return <section className="center-state"><div className="success-icon"><Check/></div><h1>Your event is live!</h1><p>Matching BarOn Pros can now send you quotes.</p><button className="gold-btn" onClick={()=>go("quotes")}>View Quotes</button></section>
  const titles=["Choose your event","Event details","Build your bar","Set your budget","Review & post"];
  return <section className="page narrow">
    <div className="page-title"><span className="eyebrow">{t.post}</span><h1>{titles[step-1]}</h1><p>Step {step} of 5</p></div>
    <div className="progress"><span style={{width:`${step*20}%`}}/></div>
    <div className="form-card">
      {step===1 && (
  <ChoiceGrid
    items={["Wedding","Birthday","Corporate Event","Private Party","Quinceañera","Anniversary"]}
    multiple={false}
    onSelect={(x)=>setEventData({...eventData,event:x})}
  />
)}
      {step===2 && <div className="form-grid"><Input
  label="Date"
  value={eventData.date}
  onChange={(e)=>setEventData({...eventData,date:e.target.value})}
/><Input
  label="Start time"
  value={eventData.time}
  onChange={(e)=>setEventData({...eventData,time:e.target.value})}
/><Input
  label="Service hours"
  value={eventData.hours}
  onChange={(e)=>setEventData({...eventData,hours:e.target.value})}
/><Input
  label="Guests"
  value={eventData.guests}
  onChange={(e)=>setEventData({...eventData,guests:e.target.value})}
/><Input
  label="Location"
  value={eventData.location}
  onChange={(e)=>setEventData({...eventData,location:e.target.value})}
/><Input label="Venue" value="Outdoor"/></div>}
      {step===3 && <ChoiceGrid items={["Mobile Bar","Bartender(s)","Mixers","Ice","Garnishes","Glassware","Signature Cocktails","Mocktails"]}/>}
      {step===4 && (
  <div className="choice-grid">
    {["Under $500","$500-$1,000","$1,000-$1,500","$1,500-$2,500","$2,500+"].map(x=>
      <button
        key={x}
        className={eventData.budget===x ? "selected" : ""}
        onClick={()=>setEventData({...eventData,budget:x})}
      >
        {x}
      </button>
    )}
  </div>
)}
      {step===5 && <div className="review-card"><h3>{eventData.event} · {eventData.location}</h3><p>{eventData.date} · {eventData.guests} guests · {eventData.hours} hours</p><div className="tags"><span>Mobile Bar</span><span>2 Bartenders</span><span>Mixers</span><span>Signature Cocktails</span></div><strong>Budget: {eventData.budget}</strong></div>}
      <div className="wizard-actions"><button className="ghost-btn" disabled={step===1} onClick={()=>setStep(step-1)}>Back</button><button className="gold-btn" onClick={()=>step===5?setDone(true):setStep(step+1)}>{step===5?"Post Event":"Continue"}</button></div>
    </div>
  </section>
}

function ChoiceGrid({items,multiple=true,onSelect}) {
  const [selected,setSelected]=useState(
    multiple ? [items[0]] : items[0]
  );

  const choose=(x)=>{
    if(multiple){
      setSelected(s=>
        s.includes(x)
          ? s.filter(a=>a!==x)
          : [...s,x]
      );
    }else{
      setSelected(x);
    }

    if(onSelect) onSelect(x);
  };

  return (
    <div className="choice-grid">
      {items.map(x=>
        <button
          key={x}
          className={
            multiple
              ? (selected.includes(x) ? "selected" : "")
              : (selected===x ? "selected" : "")
          }
          onClick={()=>choose(x)}
        >
          {x}
          {(multiple ? selected.includes(x) : selected===x) && <Check size={16}/>}
        </button>
      )}
    </div>
  );
}function Input({label,value,onChange}) {
  return (
    <label className="input">
      <span>{label}</span>
      <input value={value} onChange={onChange} />
    </label>
  );
}

function Quotes({t,go,setSelectedQuote,eventData}) {
  return <section className="page">
    <div className="page-title"><span className="eyebrow">{t.quotes}</span><h1>{eventData.event} · {eventData.location}</h1><p>{eventData.date} · {eventData.guests} guests · {eventData.hours} hours</p></div>
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

function Checkout({t,go,selectedQuote,eventData}) {
const packagePrice = selectedQuote?.price || 1200;
const providerName = selectedQuote?.provider || "Cocktail Culture Orlando";
const total = packagePrice + 50 + 100;
const deposit = total * 0.30;
  return <section className="page narrow">
    <div className="page-title"><span className="eyebrow">Checkout</span><h1>Confirm your BarOn booking</h1></div>
    <div className="checkout-card">
      <div><h3>{providerName}</h3><p>Signature Bar · {eventData.event} · {eventData.date}</p>
</div>
      <div className="line"><span>Package</span><strong>${packagePrice.toLocaleString()}</strong></div>
      <div className="line"><span>Travel</span><strong>$50</strong></div>
      <div className="line"><span>Estimated service fee</span><strong>$100</strong></div>
      <div className="line total"><span>Total</span><strong>${total.toLocaleString()}</strong></div>
      <div className="deposit"><span>Deposit due today</span><strong>${deposit.toLocaleString()}</strong></div>
      <label className="agree"><input type="checkbox" defaultChecked/> I agree to the demo booking terms.</label>
      <button className="gold-btn full" onClick={()=>{
  const booking={
    id:Date.now(),
    provider:providerName,
event:eventData.event,
date:eventData.date,
location:eventData.location,
price:`$${total.toLocaleString()}`,
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
const [packageName,setPackageName]=useState("Signature Wedding Bar");
const [price,setPrice]=useState("$1,350");
const [deposit,setDeposit]=useState("$405");
const [bartenders,setBartenders]=useState("2");
const [hours,setHours]=useState("5");
const [travelFee,setTravelFee]=useState("$50");
const [message,setMessage]=useState("We'd love to create a memorable cocktail experience for your wedding.");
const handleSendQuote = () => {
  const quote = {
    packageName,
    price,
    deposit,
    bartenders,
    hours,
    travelFee,
    message,
    status: "sent"
  };
  const existingQuotes =
  JSON.parse(localStorage.getItem("baron_quotes")) || [];

const updatedQuotes = [...existingQuotes, quote];

localStorage.setItem(
  "baron_quotes",
  JSON.stringify(updatedQuotes)
);

localStorage.setItem(
  "baron_last_quote",
  JSON.stringify(quote)
);
  setSent(true);
};
  if(sent) return <section className="center-state"><div className="success-icon"><Send/></div><h1>Quote sent successfully</h1><p>Maria will be notified and can message you with questions.</p><button className="gold-btn" onClick={()=>go("pro")}>Back to Dashboard</button></section>
  return <section className="page narrow"><div className="page-title"><span className="eyebrow">BarOn Pro</span><h1>Build your proposal</h1></div><div className="form-card"><div className="form-grid"><Input
  label="Package name"
  value={packageName}
  onChange={(e)=>setPackageName(e.target.value)}
/><Input
  label="Price"
  value={price}
  onChange={(e)=>setPrice(e.target.value)}
/><Input
  label="Deposit"
  value={deposit}
  onChange={(e)=>setDeposit(e.target.value)}
/><Input
  label="Bartenders"
  value={bartenders}
  onChange={(e)=>setBartenders(e.target.value)}
/><Input
  label="Hours"
  value={hours}
  onChange={(e)=>setHours(e.target.value)}
/><Input
  label="Travel fee"
  value={travelFee}
  onChange={(e)=>setTravelFee(e.target.value)}
/></div><label className="input"><span>Message</span>
<textarea
  value={message}
  onChange={(e)=>setMessage(e.target.value)}
/>
</label>

<button 
className="gold-btn full"
onClick={handleSendQuote}
>
Send Quote

</button>
</div>
</section>
}
function ProDashboard({t,go}) {
const savedQuote = JSON.parse(localStorage.getItem("baron_last_quote"));
const savedQuotes =
  JSON.parse(localStorage.getItem("baron_quotes")) || [];
const handleLogout = () => {
  localStorage.removeItem("baron_session");
  go("login"); 
};

  return (
    <section className="page narrow">
      <div className="page-title">
        <span className="eyebrow">BarOn Pro</span>
        <h1>Professional Dashboard</h1>
        <p>Manage your leads, quotes and bookings.</p>
      </div>

      <div className="content-card">
        <h3>Your BarOn Pro account</h3>
        <p>View new opportunities and manage your business from one place.</p>
{savedQuote && (
  <div className="quote-summary">
    <h4>Last quote sent</h4>
    <p><strong>Package:</strong> {savedQuote.packageName}</p>
    <p><strong>Price:</strong> {savedQuote.price}</p>
    <p><strong>Deposit:</strong> {savedQuote.deposit}</p>
    <p><strong>Status:</strong> {savedQuote.status}</p>
  </div>
)}
{savedQuotes.length > 0 && (
  <div className="quote-history">
    <h3>Quote history</h3>

    {savedQuotes.map((quote, index) => (
      <div
        key={index}
        className="content-card"
        style={{ marginTop: "12px" }}
      >
        <h4>{quote.packageName}</h4>
        <p><strong>Price:</strong> {quote.price}</p>
        <p><strong>Deposit:</strong> {quote.deposit}</p>
        <p><strong>Bartenders:</strong> {quote.bartenders}</p>
        <p><strong>Hours:</strong> {quote.hours}</p>
        <p><strong>Travel fee:</strong> {quote.travelFee}</p>
        <p><strong>Status:</strong> {quote.status}</p>
      </div>
    ))}
  </div>
)}        
<button
          className="gold-btn"
          onClick={()=>go("lead")}
        >
          View Leads
        </button>
<button
  className="ghost-btn"
  onClick={handleLogout}
>
  Log out
</button>
      </div>
    </section>
  );
}
function Login({t,go}) {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    const savedAccount = JSON.parse(localStorage.getItem("baron_account"));

if (!savedAccount) {
  setError("No account found. Please create an account first.");
  return;
}

if (
  email.trim() !== savedAccount.email ||
  password !== savedAccount.password
) {
  setError("Incorrect email or password.");
  return;
}

setError("");
go("pro");
  };

  return (
    <section className="page narrow">
      <div className="page-title">
        <span className="eyebrow">BarOn</span>
        <h1>Log in</h1>
        <p>Access your BarOn account.</p>
      </div>

      <div className="form-card">
        <label className="input">
          <span>Email</span>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </label>

        <label className="input">
          <span>Password</span>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </label>

        {error && <p className="notes">{error}</p>}

        <button
          className="gold-btn full"
          onClick={handleLogin}
        >
          Log in
        </button>
<button
  className="ghost-btn"
  onClick={()=>go("signup")}
>
  Create account
</button>

        <button
          className="ghost-btn"
          onClick={()=>go("home")}
        >
          Back
        </button>
      </div>
    </section>
  );
}
function Signup({go}) {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const handleSignup = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please complete all fields.");
      return;
    }

    const account = {
  name: name.trim(),
  email: email.trim(),
  password: password
};

localStorage.setItem("baron_account", JSON.stringify(account));

setError("");
go("login");
  };

  return (
    <section className="page narrow">
      <div className="page-title">
        <span className="eyebrow">BarOn Pro</span>
        <h1>Create account</h1>
        <p>Create your professional BarOn account.</p>
      </div>

      <div className="form-card">
        <label className="input">
          <span>Business name</span>
          <input
            type="text"
            placeholder="Your business name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </label>

        <label className="input">
          <span>Email</span>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </label>

        <label className="input">
          <span>Password</span>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </label>

        {error && <p className="notes">{error}</p>}

        <button
          className="gold-btn full"
          onClick={handleSignup}
        >
          Create account
        </button>

        <button
          className="ghost-btn"
          onClick={()=>go("login")}
        >
          Back to login
        </button>
      </div>
    </section>
  );
}

  createRoot(document.getElementById('root')).render(<App/>);



