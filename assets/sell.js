/* ========= Sell page (Centered Wizard & Quote Request) ========= */
(function(){
  const wizard = document.getElementById('sell-wizard');
  if (!wizard) return;

  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  const DATA = {
    'Apple': {
      'iPhone 17': [ 
        { n: 'iPhone 17 Pro Max', s: [256, 512, '1TB', '2TB'] }, 
        { n: 'iPhone 17 Pro', s: [128, 256, 512, '1TB', '2TB'] }, 
        { n: 'iPhone 17', s: [128, 256, 512, '1TB'] } 
      ],
      'iPhone Air': [ 
        { n: 'iPhone Air', s: [128, 256, 512, '1TB'] } 
      ],
      'iPhone 16': [ 
        { n: 'iPhone 16 Pro Max', s: [256, 512, '1TB'] }, 
        { n: 'iPhone 16 Pro', s: [128, 256, 512, '1TB'] }, 
        { n: 'iPhone 16 Plus', s: [128, 256, 512] }, 
        { n: 'iPhone 16', s: [128, 256, 512] } 
      ],
      'iPhone 15': [ 
        { n: 'iPhone 15 Pro Max', s: [256, 512, '1TB'] }, 
        { n: 'iPhone 15 Pro', s: [128, 256, 512, '1TB'] }, 
        { n: 'iPhone 15 Plus', s: [128, 256, 512] }, 
        { n: 'iPhone 15', s: [128, 256, 512] } 
      ],
      'iPhone 14': [ { n: 'iPhone 14 Pro Max', s: [128, 256, 512, '1TB'] }, { n: 'iPhone 14 Pro', s: [128, 256, 512, '1TB'] }, { n: 'iPhone 14 Plus', s: [128, 256, 512] }, { n: 'iPhone 14', s: [128, 256, 512] } ],
      'iPhone 13': [ { n: 'iPhone 13 Pro Max', s: [128, 256, 512, '1TB'] }, { n: 'iPhone 13 Pro', s: [128, 256, 512, '1TB'] }, { n: 'iPhone 13', s: [128, 256, 512] }, { n: 'iPhone 13 mini', s: [128, 256, 512] } ],
      'iPhone 12': [ { n: 'iPhone 12 Pro Max', s: [128, 256, 512] }, { n: 'iPhone 12 Pro', s: [128, 256, 512] }, { n: 'iPhone 12', s: [64, 128, 256] }, { n: 'iPhone 12 mini', s: [64, 128, 256] } ],
      'iPhone 11': [ { n: 'iPhone 11 Pro Max', s: [64, 256, 512] }, { n: 'iPhone 11 Pro', s: [64, 256, 512] }, { n: 'iPhone 11', s: [64, 128, 256] } ]
    },
    'Samsung': {
      'Galaxy S-serie': [
        { n: 'S24 Ultra', s: [256, 512, '1TB'] }, { n: 'S24+', s: [256, 512] }, { n: 'S24', s: [128, 256, 512] },
        { n: 'S23 Ultra', s: [256, 512, '1TB'] }, { n: 'S23+', s: [256, 512] }, { n: 'S23 FE', s: [128, 256] }, { n: 'S23', s: [128, 256, 512] },
        { n: 'S22 Ultra', s: [128, 256, 512] }, { n: 'S22+', s: [128, 256] }, { n: 'S22 FE', s: [128, 256] }, { n: 'S22', s: [128, 256] },
        { n: 'S21 Ultra', s: [128, 256, 512] }, { n: 'S21+', s: [128, 256] }, { n: 'S21 FE', s: [128, 256] }, { n: 'S21', s: [128, 256] }
      ],
      'Galaxy A-serie': [
        { n: 'Galaxy A55', s: [128, 256] }, { n: 'Galaxy A54', s: [128, 256] }, { n: 'Galaxy A53', s: [128, 256] },
        { n: 'Galaxy A52s', s: [128, 256] }, { n: 'Galaxy A34', s: [128, 256] }
      ],
      'Galaxy Z / Flip': [
        { n: 'Galaxy Z Fold 5', s: [256, 512, '1TB'] }, { n: 'Galaxy Z Flip 5', s: [256, 512] },
        { n: 'Galaxy Z Fold 4', s: [256, 512] }, { n: 'Galaxy Z Flip 4', s: [128, 256, 512] },
        { n: 'Galaxy Z Fold 3', s: [256, 512] }, { n: 'Galaxy Z Flip 3', s: [128, 256] }
      ],
      'Galaxy Note-serie': [
        { n: 'Galaxy Note 20 Ultra', s: [128, 256, 512] }, { n: 'Galaxy Note 20', s: [128, 256] },
        { n: 'Galaxy Note 10+', s: [256, 512] }, { n: 'Galaxy Note 10', s: [128, 256] }
      ]
    }
  };

  let state = { brand: null, series: null, model: null, storage: null, checks: { power:true, screen:true, body:true, camera:true, speakers:true, imei:true } };

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if(el) {
      window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' });
    }
  }

  function renderSeries() {
    $('#seriesGrid').innerHTML = Object.keys(DATA[state.brand]).map((s, i) => `
      <button class="opt-btn series-opt fade-in" data-series="${s}" style="animation-delay: ${i * 0.05}s">${s}</button>
    `).join('');
    $('#stepSeries').style.display = 'block';
    $('#stepModel').style.display = 'none'; $('#stepStorage').style.display = 'none'; $('#stepCondition').style.display = 'none'; $('#stepForm').style.display = 'none';
    scrollToSection('stepSeries');
  }

  function renderModels() {
    $('#modelGrid').innerHTML = DATA[state.brand][state.series].map((m, i) => `
      <button class="opt-btn model-opt fade-in" data-model="${m.n}" style="animation-delay: ${i * 0.05}s">${m.n}</button>
    `).join('');
    $('#stepModel').style.display = 'block';
    $('#stepStorage').style.display = 'none'; $('#stepCondition').style.display = 'none'; $('#stepForm').style.display = 'none';
    scrollToSection('stepModel');
  }

  function renderStorage() {
    const list = DATA[state.brand][state.series].find(m => m.n === state.model).s;
    $('#storageGrid').innerHTML = list.map((s, i) => {
      const label = typeof s === 'string' ? s : s + ' GB';
      return `<button class="opt-btn storage-opt fade-in" data-storage="${s}" style="animation-delay: ${i * 0.1}s">${label}</button>`;
    }).join('');
    $('#stepStorage').style.display = 'block';
    $('#stepCondition').style.display = 'none'; $('#stepForm').style.display = 'none';
    scrollToSection('stepStorage');
  }

  function showCondition() {
    $('#stepCondition').style.display = 'block';
    $('#stepForm').style.display = 'block';
    updateSummary();
    scrollToSection('stepCondition');
  }

  function updateSummary() {
    const s = state;
    let txt = `${s.model} • ${s.storage} GB`;
    const issues = [];
    if(!s.checks.power) issues.push("Startar ej");
    if(!s.checks.screen) issues.push("Sprucken skärm");
    if(!s.checks.body) issues.push("Skadad baksida/ram");
    if(!s.checks.camera) issues.push("Kamerafel");
    if(!s.checks.speakers) issues.push("Högtalarfel");
    if(!s.checks.imei) issues.push("IMEI syns ej (*#06#)");
    
    if(issues.length > 0) {
      txt += `<div style="font-size: 0.85rem; color: #c62828; margin-top: 4px">Noteringar: ${issues.join(', ')}</div>`;
    } else {
      txt += `<div style="font-size: 0.85rem; color: #2e7d32; margin-top: 4px">Skick: Toppskick</div>`;
    }
    $('#summaryText').innerHTML = txt;
  }

  // Event handlers
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-brand]');
    if(b) {
      $$('[data-brand]').forEach(el => el.classList.remove('active'));
      b.classList.add('active');
      state.brand = b.dataset.brand;
      renderSeries();
    }
    const s = e.target.closest('[data-series]');
    if(s) {
      $$('.series-opt').forEach(el => el.classList.remove('active'));
      s.classList.add('active');
      state.series = s.dataset.series;
      renderModels();
    }
    const m = e.target.closest('[data-model]');
    if(m) {
      $$('.model-opt').forEach(el => el.classList.remove('active'));
      m.classList.add('active');
      state.model = m.dataset.model;
      renderStorage();
    }
    const st = e.target.closest('[data-storage]');
    if(st) {
      $$('.storage-opt').forEach(el => el.classList.remove('active'));
      st.classList.add('active');
      state.storage = st.dataset.storage;
      showCondition();
    }
  });

  $$('#stepCondition input').forEach(input => {
    input.addEventListener('change', e => {
      state.checks[e.target.dataset.key] = e.target.checked;
      updateSummary();
    });
  });

  $('#submitBtn').addEventListener('click', async (e) => {
    const btn = e.target;
    const name = ($('#custName').value || '').trim();
    const phone = ($('#custPhone').value || '').trim();
    const email = ($('#custEmail').value || '').trim();
    
    state.customer = { name, phone, email };
    state.type = 'sell';

    try {
      btn.disabled = true;
      btn.innerHTML = 'Skickar...';

      const response = await fetch('api/send_mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      });

      const resData = await response.json();

      if (resData.status === 'success') {
        // Smooth transition to Success
        $('#stepBrand').style.display = 'none';
        $('#stepSeries').style.display = 'none';
        $('#stepModel').style.display = 'none';
        $('#stepStorage').style.display = 'none';
        $('#stepCondition').style.display = 'none';
        $('#stepForm').style.display = 'none';
        $('#successMsg').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(resData.message || 'Fel vid skickning');
      }
    } catch (err) {
      console.error(err);
      alert('Kunde inte skicka din förfrågan. Kontakta oss gärna via telefon istället.');
    } finally {
      btn.disabled = false;
      btn.innerHTML = 'Skicka för prisförslag';
    }
  });

})();
