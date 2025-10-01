<!DOCTYPE html>
<html lang="sv" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title data-i18n="meta.title">iRepair of Sweden – Hem</title>
  <style>
    /* ===== THEME TOKENS ===== */
    :root {
      /* Light (default) */
      --bg:#f8fafc;          /* page bg */
      --panel:#ffffff;       /* sticky header panel */
      --card:#ffffff;        /* cards */
      --border:#e5e7eb;      /* lines */
      --text:#0b1220;        /* primary text */
      --muted:#64748b;       /* secondary text */
      --accent:#0ea5e9;      /* brand accent */
      --hero:#f1f5f9;        /* hero background */
      --link:#0ea5e9;        /* link color */
    }
    [data-theme="dark"] {
      --bg:#141414;
      --panel:#202020;
      --card:#1e1e1e;
      --border:#2d2d2d;
      --text:#f5f5f5;
      --muted:#bdbdbd;
      --accent:#4da3ff;
      --hero:#1c1c1c;
      --link:#4da3ff;
    }

    /* ===== BASE ===== */
    * { box-sizing:border-box }
    body { margin:0; font-family: Arial, Helvetica, sans-serif; background: var(--bg); color: var(--text); }
    a { color: inherit; }

    header { position:sticky; top:0; z-index:20; background: var(--panel); padding: .85rem 1.25rem; display:flex; gap:1rem; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); }
    .brand { font-weight:700; letter-spacing:.2px; }
    nav a { margin: 0 .75rem; color: var(--muted); text-decoration: none; font-weight:600; }
    nav a:hover { color: var(--text); }
    .btn { display:inline-flex; align-items:center; gap:.5rem; padding:.6rem 1rem; border-radius:8px; border:1px solid var(--border); background:var(--card); color:var(--text); cursor:pointer; text-decoration:none; }
    .btn.primary { background: var(--accent); border-color: var(--accent); color:#0b1220; font-weight:800; }
    .btn.ghost { background: transparent; }
    .btn:hover { filter:brightness(1.06); }
    .actions { display:flex; gap:.5rem; }

    .hero { padding: 3rem 1.25rem; background: var(--hero); }
    .hero .container { max-width:1100px; margin:0 auto; text-align:center; }
    .eyebrow { color: var(--muted); text-transform:uppercase; letter-spacing:.08em; font-weight:700; font-size:.85rem; }
    .h1 { font-size: clamp(1.9rem, 3.2vw, 2.6rem); margin:.4rem 0 0.75rem; }
    .lead { color:var(--muted); font-size:1.05rem; max-width:900px; margin:0 auto; }
    .cta-row { display:flex; gap:.75rem; justify-content:center; flex-wrap:wrap; margin-top:1.25rem; }

    section { padding: 2.75rem 1.25rem; }
    .container { max-width:1100px; margin:0 auto; }
    .grid { display:grid; gap:1rem; grid-template-columns:repeat(3,minmax(0,1fr)); }
    @media (max-width:920px){ .grid{ grid-template-columns:repeat(2,1fr);} }
    @media (max-width:640px){ .grid{ grid-template-columns:1fr;} }
    .card { background: var(--card); border:1px solid var(--border); border-radius:12px; padding:1.1rem 1.1rem; }
    .card h3 { margin:.1rem 0 .35rem; font-size:1.07rem }
    .muted { color: var(--muted); }
    .list { margin:.5rem 0 0; padding-left:1.1rem }

    .steps { counter-reset: step; }
    .step { position:relative; padding-left:3rem; min-height:2.4rem; }
    .step::before { counter-increment: step; content: counter(step); position:absolute; left:0; top:0; width:2rem; height:2rem; display:grid; place-items:center; border-radius:999px; background: var(--card); border:1px solid var(--border); color:var(--text); font-weight:800; }

    .split { display:grid; gap:1rem; grid-template-columns:1.2fr .8fr; align-items:start; }
    @media (max-width:920px){ .split{ grid-template-columns:1fr; } }

    .store { display:grid; gap:.3rem }
    .store a { color:var(--link); text-decoration:none }

    footer { background: var(--panel); padding:2rem 1.25rem; text-align:center; font-size:.95rem; color:var(--muted); border-top:1px solid var(--border); }
    hr { border:0; border-top:1px solid var(--border); margin:1.4rem 0; }
    .badge { display:inline-block; padding:.35rem .6rem; border-radius:999px; background:var(--card); border:1px solid var(--border); color:var(--text); font-size:.82rem }

    /* Helpful utilities */
    .flex { display:flex; }
    .gap-1 { gap:.5rem }
    .wrap { flex-wrap:wrap }
    .space { height:.8rem }
  </style>
</head>
<body>
  <header>
    <div class="brand">🔧 <strong>iRepair</strong> <span style="color:var(--muted)">of Sweden</span></div>
    <nav>
      <a href="index.html" data-i18n="nav.home">Hem</a>
      <a href="repairs.html" data-i18n="nav.repairs">Reparationer</a>
      <a href="about.html" data-i18n="nav.about">Om oss</a>
      <a href="stores.html" data-i18n="nav.stores">Våra butiker</a>
      <a href="contact.html" data-i18n="nav.contact">Kontakt</a>
    </nav>
    <div class="actions">
      <button class="btn ghost" id="themeBtn" aria-label="Byt tema">☀️ Ljust</button>
      <button class="btn" id="langBtn">English</button>
    </div>
  </header>

  <!-- HERO -->
  <section class="hero">
    <div class="container">
      <div class="eyebrow" data-i18n="hero.eyebrow">Mobilreparationer i Haninge & Täby</div>
      <h1 class="h1" data-i18n="hero.title">Expressservice på plats – ofta klar inom en timme</h1>
      <p class="lead" data-i18n="hero.lead">iRepair of Sweden är specialister på reparation av iPhone, iPad och Android. Drop‑in i våra butiker i Port 73 Haninge och Täby Centrum. Vi erbjuder även avancerade moderkortsreparationer.</p>
      <div class="cta-row">
        <a class="btn primary" href="repairs.html" data-i18n="hero.btn.repairs">Se reparationer</a>
        <a class="btn ghost" href="mailto:info@irepairofsweden.com" data-i18n="hero.btn.mail">Maila oss</a>
      </div>
    </div>
  </section>

  <!-- POPULAR SERVICES -->
  <section>
    <div class="container">
      <h2 data-i18n="svc.title">Populära reparationer</h2>
      <p class="muted" data-i18n="svc.sub">Snabb service, kvalitetsdelar och tydlig kommunikation.</p>
      <div class="grid" style="margin-top:1.25rem">
        <div class="card"><h3 data-i18n="svc.screen.h">Skärmbyte</h3><p class="muted" data-i18n="svc.screen.p">Byten av skärm på de flesta modeller – kopia, OLED och OEM.</p></div>
        <div class="card"><h3 data-i18n="svc.battery.h">Batteribyte</h3><p class="muted" data-i18n="svc.battery.p">Nytt batteri ger längre livslängd och bättre prestanda.</p></div>
        <div class="card"><h3 data-i18n="svc.back.h">Bakglas</h3><p class="muted" data-i18n="svc.back.p">Professionellt byte av bakglas/baksida på iPhone.</p></div>
        <div class="card"><h3 data-i18n="svc.camera.h">Kameror</h3><p class="muted" data-i18n="svc.camera.p">Reparation av fram- och bakkamera samt kameraglas.</p></div>
        <div class="card"><h3 data-i18n="svc.charge.h">Laddport</h3><p class="muted" data-i18n="svc.charge.p">Byte av laddport och mikrofon – när laddning krånglar.</p></div>
        <div class="card"><h3 data-i18n="svc.board.h">Moderkort</h3><p class="muted" data-i18n="svc.board.p">Avancerade lödningar och felsökning utförs på plats.</p></div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS + WHY US -->
  <section>
    <div class="container split">
      <div class="card">
        <span class="badge" data-i18n="flow.badge">Så funkar det</span>
        <h2 style="margin:.5rem 0 1rem" data-i18n="flow.title">Tre enkla steg</h2>
        <div class="steps">
          <div class="step">
            <strong data-i18n="flow.s1.h">1) Kom förbi eller kontakta oss</strong>
            <p class="muted" data-i18n="flow.s1.p">Drop‑in välkommen i Port 73 Haninge eller Täby Centrum. Du kan också ringa eller maila.</p>
          </div>
          <div class="space"></div>
          <div class="step">
            <strong data-i18n="flow.s2.h">2) Snabb bedömning & offert</strong>
            <p class="muted" data-i18n="flow.s2.p">Vi felsöker och ger dig tydlig prisbild innan arbetet startar.</p>
          </div>
          <div class="space"></div>
          <div class="step">
            <strong data-i18n="flow.s3.h">3) Reparation & upphämtning</strong>
            <p class="muted" data-i18n="flow.s3.p">De flesta reparationer blir klara inom en timme. Betala med Klarna, Swish, Visa eller Mastercard.</p>
          </div>
        </div>
      </div>

      <div class="card">
        <span class="badge" data-i18n="why.badge">Varför välja oss?</span>
        <h2 style="margin:.5rem 0 1rem" data-i18n="why.title">Fördelar</h2>
        <ul class="list">
          <li data-i18n="why.p1">Drop‑in – ingen tidsbokning krävs.</li>
          <li data-i18n="why.p2">Ofta klart inom 60 minuter.</li>
          <li data-i18n="why.p3">Vi reparerar de flesta märkena på marknaden.</li>
          <li data-i18n="why.p4">19 års erfarenhet och specialister på moderkortslödning.</li>
          <li data-i18n="why.p5">Garanti på arbete och delar.</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- BRANDS -->
  <section>
    <div class="container">
      <h2 data-i18n="brands.title">Vi reparerar</h2>
      <p class="muted" data-i18n="brands.sub">Apple iPhone & iPad • Samsung • Xiaomi • Google Pixel • OnePlus • Huawei m.fl.</p>
      <div class="flex gap-1 wrap" style="margin-top:.6rem">
        <span class="badge">Apple</span>
        <span class="badge">Samsung</span>
        <span class="badge">Xiaomi</span>
        <span class="badge">Google Pixel</span>
        <span class="badge">OnePlus</span>
        <span class="badge">Huawei</span>
        <span class="badge" data-i18n="brands.more">…och fler</span>
      </div>
    </div>
  </section>

  <!-- LOCATIONS -->
  <section>
    <div class="container split">
      <div class="card">
        <h2 data-i18n="loc.title">Våra butiker</h2>
        <div class="store">
          <strong>Port 73 – Haninge</strong>
          <span>Nynäsvägen 21, 136 47 Haninge</span>
          <a href="tel:08348888">08‑34 88 88</a>
          <a href="https://maps.google.com/?q=Nyn%C3%A4sv%C3%A4gen%2021%2C%20136%2047%20Haninge" target="_blank" rel="noopener" data-i18n="loc.map">Visa karta</a>
        </div>
        <hr>
        <div class="store">
          <strong>Täby Centrum</strong>
          <span>Stora marknadsvägen 14, 183 34 Täby</span>
          <a href="tel:0735342338">073‑534 23 38</a>
          <a href="https://maps.google.com/?q=Stora%20marknadsv%C3%A4gen%2014%2C%20183%2034%20T%C3%A4by" target="_blank" rel="noopener" data-i18n="loc.map">Visa karta</a>
        </div>
        <hr>
        <p class="muted" data-i18n="loc.hours">Öppettider: följ respektive köpcentrums öppettider.</p>
      </div>

      <div class="card">
        <h2 data-i18n="contact.title">Kontakt</h2>
        <p class="muted">info@irepairofsweden.com</p>
        <div class="flex gap-1 wrap" style="margin-top:.5rem">
          <a class="btn" href="tel:08348888" data-i18n="contact.btn.haninge">Ring Port 73</a>
          <a class="btn" href="tel:0735342338" data-i18n="contact.btn.taby">Ring Täby</a>
          <a class="btn ghost" href="mailto:info@irepairofsweden.com" data-i18n="contact.btn.email">Maila oss</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ABOUT BLURB -->
  <section>
    <div class="container card">
      <h2 data-i18n="about.title">Om iRepair of Sweden</h2>
      <p class="muted" data-i18n="about.text">iRepair of Sweden är ett företag med inriktning på reparation av surfplattor och telefoner samt försäljning av mobiltillbehör. Vår idé är att utföra express service på plats då de flesta reparationer oftast utförs inom en timme. I vår butik erbjuds drop‑in service vilket gör att ingen tidsbokning krävs. Vad som gör oss unika är att vi inte begränsar oss, utan vi erbjuder reparationer av de flesta märkena som idag används på marknaden. Vi är även specialiserade inom lödningsarbeten av moderkort då vi har 19 års erfarenhet inom mobilreparationsbranschen. Du hittar våra butiker i Port 73, Haninge och Täby Centrum.</p>
    </div>
  </section>

  <!-- FAQ -->
  <section>
    <div class="container">
      <h2 data-i18n="faq.title">Vanliga frågor</h2>
      <div class="grid" style="margin-top:1rem">
        <div class="card"><h3 data-i18n="faq.q1">Behöver jag boka tid?</h3><p class="muted" data-i18n="faq.a1">Nej, drop‑in gäller i båda butikerna. Du kan också kontakta oss innan för pris och ledtid.</p></div>
        <div class="card"><h3 data-i18n="faq.q2">Hur lång tid tar det?</h3><p class="muted" data-i18n="faq.a2">De flesta reparationer tar omkring 60 minuter beroende på modell och lagerstatus.</p></div>
        <div class="card"><h3 data-i18n="faq.q3">Vilka betalningssätt finns?</h3><p class="muted" data-i18n="faq.a3">Klarna, Swish, Mastercard och Visa.</p></div>
      </div>
    </div>
  </section>

  <footer>
    © <span></span> Bston-Tech. <span data-i18n="foot.rights">Alla rättigheter förbehållna.</span>

  </footer>

  <script>
    // ===== Theme: starts LIGHT, persists across site via localStorage('theme') =====
    (function themeInit(){
      const KEY='theme', btn=document.getElementById('themeBtn');
      function set(x){
        document.documentElement.setAttribute('data-theme',x);
        localStorage.setItem(KEY,x);
        btn.textContent = x==='dark' ? '🌙 Mörkt' : '☀️ Ljust';
        btn.setAttribute('aria-label', x==='dark' ? 'Byt till ljust tema' : 'Byt till mörkt tema');
      }
      set(localStorage.getItem(KEY) || 'light');
      btn.addEventListener('click',()=> set(document.documentElement.getAttribute('data-theme')==='dark' ? 'light' : 'dark'));
    })();

    // ===== Simple i18n engine using data-i18n keys =====
    const DICT = {
      sv:{
        meta:{title:"iRepair of Sweden – Hem"},
        nav:{home:"Hem",repairs:"Reparationer",about:"Om oss",stores:"Våra butiker",contact:"Kontakt"},
        cta:{callHaninge:"Ring Haninge", callTaby:"Ring Täby"},
        hero:{eyebrow:"Mobilreparationer i Haninge & Täby", title:"Expressservice på plats – ofta klar inom en timme", lead:"iRepair of Sweden är specialister på reparation av iPhone, iPad och Android. Drop‑in i våra butiker i Port 73 Haninge och Täby Centrum. Vi erbjuder även avancerade moderkortsreparationer.", btn:{repairs:"Se reparationer", mail:"Maila oss"}},
        svc:{title:"Populära reparationer", sub:"Snabb service, kvalitetsdelar och tydlig kommunikation.",
             screen:{h:"Skärmbyte", p:"Byten av skärm på de flesta modeller – kopia, OLED och OEM."},
             battery:{h:"Batteribyte", p:"Nytt batteri ger längre livslängd och bättre prestanda."},
             back:{h:"Bakglas", p:"Professionellt byte av bakglas/baksida på iPhone."},
             camera:{h:"Kameror", p:"Reparation av fram- och bakkamera samt kameraglas."},
             charge:{h:"Laddport", p:"Byte av laddport och mikrofon – när laddning krånglar."},
             board:{h:"Moderkort", p:"Avancerade lödningar och felsökning utförs på plats."}},
        flow:{badge:"Så funkar det", title:"Tre enkla steg",
              s1:{h:"1) Kom förbi eller kontakta oss", p:"Drop‑in välkommen i Port 73 Haninge eller Täby Centrum. Du kan också ringa eller maila."},
              s2:{h:"2) Snabb bedömning & offert", p:"Vi felsöker och ger dig tydlig prisbild innan arbetet startar."},
              s3:{h:"3) Reparation & upphämtning", p:"De flesta reparationer blir klara inom en timme. Betala med Klarna, Swish, Visa eller Mastercard."}},
        why:{badge:"Varför välja oss?", title:"Fördelar", p1:"Drop‑in – ingen tidsbokning krävs.", p2:"Ofta klart inom 60 minuter.", p3:"Vi reparerar de flesta märkena på marknaden.", p4:"19 års erfarenhet och specialister på moderkortslödning.", p5:"Garanti på arbete och delar."},
        brands:{title:"Vi reparerar", sub:"Apple iPhone & iPad • Samsung • Xiaomi • Google Pixel • OnePlus • Huawei m.fl.", more:"…och fler"},
        loc:{title:"Våra butiker", map:"Visa karta", hours:"Öppettider: följ respektive köpcentrums öppettider."},
        contact:{title:"Kontakt", btn:{haninge:"Ring Port 73", taby:"Ring Täby", email:"Maila oss"}},
        about:{title:"Om iRepair of Sweden", text:"iRepair of Sweden är ett företag med inriktning på reparation av surfplattor och telefoner samt försäljning av mobiltillbehör. Vår idé är att utföra express service på plats då de flesta reparationer oftast utförs inom en timme. I vår butik erbjuds drop‑in service vilket gör att ingen tidsbokning krävs. Vad som gör oss unika är att vi inte begränsar oss, utan vi erbjuder reparationer av de flesta märkena som idag används på marknaden. Vi är även specialiserade inom lödningsarbeten av moderkort då vi har 19 års erfarenhet inom mobilreparationsbranschen. Du hittar våra butiker i Port 73, Haninge och Täby Centrum."},
        faq:{title:"Vanliga frågor", q1:"Behöver jag boka tid?", a1:"Nej, drop‑in gäller i båda butikerna. Du kan också kontakta oss innan för pris och ledtid.", q2:"Hur lång tid tar det?", a2:"De flesta reparationer tar omkring 60 minuter beroende på modell och lagerstatus.", q3:"Vilka betalningssätt finns?", a3:"Klarna, Swish, Mastercard och Visa."},
        foot:{rights:"Alla rättigheter förbehållna."},
        _btn:"English"
      },
      en:{
        meta:{title:"iRepair of Sweden – Home"},
        nav:{home:"Home",repairs:"Repairs",about:"About",stores:"Stores",contact:"Contact"},
        cta:{callHaninge:"Call Haninge", callTaby:"Call Täby"},
        hero:{eyebrow:"Phone repairs in Haninge & Täby", title:"Express service on‑site — often within an hour", lead:"iRepair of Sweden specializes in iPhone, iPad and Android repairs. Walk‑in at our Port 73 Haninge and Täby Centrum stores. We also perform advanced motherboard repairs.", btn:{repairs:"View repairs", mail:"Email us"}},
        svc:{title:"Popular repairs", sub:"Fast service, quality parts and clear communication.",
             screen:{h:"Screen replacement", p:"For most models — copy, OLED and OEM."},
             battery:{h:"Battery replacement", p:"New battery for longer life and improved performance."},
             back:{h:"Back glass", p:"Professional iPhone back glass replacement."},
             camera:{h:"Cameras", p:"Front/rear camera and camera glass repairs."},
             charge:{h:"Charging port", p:"Charging port & microphone replacements."},
             board:{h:"Motherboard", p:"Advanced microsoldering and board diagnostics."}},
        flow:{badge:"How it works", title:"Three easy steps",
              s1:{h:"1) Visit us or get in touch", p:"Walk‑in welcome in Port 73 Haninge or Täby Centrum. You can also call or email."},
              s2:{h:"2) Quick assessment & quote", p:"We diagnose and give you a clear price before we start."},
              s3:{h:"3) Repair & pickup", p:"Most repairs are done within an hour. Pay with Klarna, Swish, Visa or Mastercard."}},
        why:{badge:"Why choose us?", title:"Benefits", p1:"Walk‑in — no booking needed.", p2:"Often done within 60 minutes.", p3:"We repair most brands on the market.", p4:"19 years of experience & motherboard specialists.", p5:"Warranty on parts and labour."},
        brands:{title:"We repair", sub:"Apple iPhone & iPad • Samsung • Xiaomi • Google Pixel • OnePlus • Huawei etc.", more:"…and more"},
        loc:{title:"Our stores", map:"View map", hours:"Opening hours follow each mall's schedule."},
        contact:{title:"Contact", btn:{haninge:"Call Port 73", taby:"Call Täby", email:"Email us"}},
        about:{title:"About iRepair of Sweden", text:"iRepair of Sweden focuses on repairing tablets and phones and selling mobile accessories. Our idea is express service on‑site where most repairs are completed within an hour. We offer walk‑in service with no booking required, making it as simple and convenient as possible. What makes us unique is that we don't limit ourselves — we repair most brands used on the market today. We are also specialized in motherboard soldering with 19 years of experience in the industry. You'll find our stores in Port 73, Haninge and Täby Centrum."},
        faq:{title:"FAQ", q1:"Do I need to book?", a1:"No, walk‑in is welcome at both stores. You can also contact us for price and lead time in advance.", q2:"How long does it take?", a2:"Most repairs take about 60 minutes depending on model and parts availability.", q3:"Which payments do you accept?", a3:"Klarna, Swish, Mastercard and Visa."},
        foot:{rights:"All rights reserved."},
        _btn:"Svenska"
      }
    };

    function applyLang(lang){
      const t = DICT[lang];
      document.documentElement.lang = lang;
      document.title = t.meta.title;
      document.querySelectorAll('[data-i18n]').forEach(el=>{
        const path = el.getAttribute('data-i18n').split('.');
        let cur = t; path.forEach(k=> cur = cur && cur[k]);
        if(typeof cur === 'string') el.textContent = cur;
      });
      document.getElementById('langBtn').textContent = t._btn;
      localStorage.setItem('lang', lang);
    }

    // Init language
    (function(){ const saved = localStorage.getItem('lang') || 'sv'; applyLang(saved); })();
    document.getElementById('langBtn').addEventListener('click', ()=>{
      const next = (localStorage.getItem('lang')||'sv')==='sv' ? 'en' : 'sv';
      applyLang(next);
    });

    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();
  </script>
</body>
</html>
