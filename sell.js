/* ========= Sell page (IMEI check, online) ========= */
(function(){
  const page = document.getElementById('sell-page');
  if (!page) return;

  const LANG_KEY='lang';
  const $ = s => document.querySelector(s);

  /* i18n (SV/EN) */
  const D = {
    sv:{
      nav:{home:"Hem",repairs:"Reparationer",sell:"Sälj mobil",stores:"Våra butiker",contact:"Kontakt"},
      hero:{eyebrow:"Sälj din mobil",title:"IMEI-kontroll & offert direkt",sub:"Skriv in ditt IMEI (15 siffror). Vi gör onlinelookup och ger ett prisförslag.",goto:"Gå till IMEI-kontroll ↓",contact:"Kontakta oss"},
      form:{title:"IMEI-kontroll",imei:"IMEI (15 siffror)",check:"Kontrollera IMEI",report:"Generera rapport",
            disclaimer:"Obs: Vi genererar inte nya IMEI-nummer. Vi verifierar och hämtar modellinfo online.", online:"Online"},
      result:{title:"Resultat & modell",valid:"IMEI giltighet",tac:"TAC (modellkod)",brand:"Märke",model:"Identifierad modell",blacklist:"Blacklist",warranty:"Garanti",unknown:"Okänt – kräver online-koll"},
      quote:{title:"Snabb prisindikator",screen:"Sprucken skärm",water:"Vattenskada/Fuktsanering behövs",battery:"Batterihälsa < 80%",storage:"Lagring",note:"Indikativt pris. Slutligt pris efter test i butik.",contact:"Boka inlämning"},
      report:{title:"IMEI-rapport",print:"Skriv ut / Spara som PDF",contact:"Kontakta oss"},
      status:{valid:"Giltigt (Luhn)",invalid:"Ogiltigt IMEI",enter:"Ange 15 siffror",fetching:"Hämtar info...",noapi:"Serverfel: IMEI-API otillgängligt",nomatch:"Okänd TAC eller hittade ingen modell"}
    },
    en:{
      nav:{home:"Home",repairs:"Repairs",sell:"Sell phone",stores:"Our stores",contact:"Contact"},
      hero:{eyebrow:"Sell your phone",title:"IMEI check & instant quote",sub:"Enter your 15-digit IMEI. We do an online lookup and estimate a price.",goto:"Go to IMEI check ↓",contact:"Contact us"},
      form:{title:"IMEI check",imei:"IMEI (15 digits)",check:"Check IMEI",report:"Generate report",
            disclaimer:"Note: We do not generate new IMEIs. We validate and fetch model info online.", online:"Online"},
      result:{title:"Results & model",valid:"IMEI validity",tac:"TAC (model code)",brand:"Brand",model:"Identified model",blacklist:"Blacklist",warranty:"Warranty",unknown:"Unknown — needs online check"},
      quote:{title:"Quick price estimate",screen:"Cracked screen",water:"Water damage / Liquid treatment needed",battery:"Battery health < 80%",storage:"Storage",note:"Indicative only. Final price after in-store testing.",contact:"Book drop-off"},
      report:{title:"IMEI report",print:"Print / Save as PDF",contact:"Contact us"},
      status:{valid:"Valid (Luhn)",invalid:"Invalid IMEI",enter:"Enter 15 digits",fetching:"Fetching data...",noapi:"Server error: IMEI API unavailable",nomatch:"Unknown TAC or no model found"}
    }
  };

  /* Merge with global language switch */
  const prevApply = window.applyLang || function(){};
  window.applyLang = function(lang){
    prevApply(lang);
    const t = (D[lang] || D.sv);
    page.querySelectorAll('[data-i18n]').forEach(el=>{
      const keys = el.dataset.i18n.split('.');
      let cur = t; for (const k of keys){ if (cur && k in cur) cur = cur[k]; else { cur=null; break; } }
      if (typeof cur === 'string') el.textContent = cur;
    });
  };

  /* Luhn IMEI check */
  function luhnValid(imei){
    if(!/^[0-9]{15}$/.test(imei)) return false;
    let sum=0; for(let i=0;i<14;i++){ let d=+imei[i]; if(i%2===1){ d*=2; if(d>9)d-=9; } sum+=d; }
    return ((10-(sum%10))%10)===+imei[14];
  }
  const tacOf = v => v.slice(0,8);

  /* Quote engine (simple) */
  const BASE = {
    'Apple iPhone 13': 3500, 'Apple iPhone 14': 4200, 'Apple iPhone 15 Pro': 6500,
    'Samsung Galaxy S21': 2200, 'Google Pixel 7': 2600, 'Google Pixel 8': 3500, 'Google Pixel 9': 5000
  };
  function calcQuote(model, storage, f){
    let price = BASE[model] || 0; if(!price) return null;
    const s = parseInt(storage,10)||128;
    price += (s-128)*5; if(f.screen)price-=800; if(f.water)price-=1000; if(f.battery)price-=400;
    return Math.max(0, Math.round(price/10)*10);
  }

  /* DOM refs */
  const lang = () => localStorage.getItem(LANG_KEY)||'sv';
  const imeiInput=$('#imeiInput'), imeiStatus=$('#imeiStatus'), netState=$('#netState');
  const rValid=$('#rValid'), rTAC=$('#rTAC'), rBrand=$('#rBrand'), rModel=$('#rModel'), rBlacklist=$('#rBlacklist'), rWarranty=$('#rWarranty');
  const offerPrice=$('#offerPrice');

  function setLoading(on){
    const t=D[lang()];
    if(on){ netState.style.display='inline-flex'; imeiStatus.textContent=t.status.fetching; }
    else{ netState.style.display='none'; }
  }

  function updateValidity(){
    const t=D[lang()];
    const v=imeiInput.value.trim();
    if(v.length<15){ imeiStatus.textContent=t.status.enter; rValid.textContent='–'; rValid.className=''; return false; }
    const ok=luhnValid(v); rValid.textContent= ok?t.status.valid:t.status.invalid; rValid.className= ok?'ok':'warn'; return ok;
  }

  async function runCheck(){
    const t=D[lang()];
    const v = imeiInput.value.trim();
    if(!luhnValid(v)){ imeiStatus.textContent=t.status.invalid; return; }
    setLoading(true);

    try{
      const res = await fetch(`/api/imei-check?imei=${encodeURIComponent(v)}`, { headers:{'Accept':'application/json'} });
      if(!res.ok){ throw new Error(`HTTP ${res.status}`); }
      const data = await res.json();

      // Expected shape from our backend: { tac, brand, model, blacklist, warranty }
      rTAC.textContent = data.tac || tacOf(v);
      rBrand.textContent = data.brand || '—';
      rModel.textContent = data.model || '—';
      rBlacklist.textContent = (data.blacklist===true?'Blacklisted':data.blacklist===false?'Clear':(t.result.unknown));
      rWarranty.textContent = data.warranty || t.result.unknown;

      if (!data.model){ imeiStatus.textContent = t.status.nomatch; }
      else { imeiStatus.textContent = ''; }
      $('#genReportBtn').disabled = false;

      recalcQuote();
    }catch(err){
      console.error(err);
      imeiStatus.textContent = t.status.noapi;
    }finally{
      setLoading(false);
    }
  }

  function recalcQuote(){
    const model=rModel.textContent.trim();
    const storage=$('#qStorage').value;
    const price = calcQuote(model, storage, {
      screen:$('#qScreen').checked, water:$('#qWater').checked, battery:$('#qBattery').checked
    });
    offerPrice.textContent = (price==null)?'—':`${price} kr`;
  }

  function genReport(){
    const t=D[lang()];
    const b=$('#reportBody');
    b.innerHTML = `
      <table class="table"><tbody>
        <tr><th>IMEI</th><td class="kbd">${imeiInput.value.trim()}</td></tr>
        <tr><th>${t.result.valid}</th><td>${rValid.textContent}</td></tr>
        <tr><th>${t.result.tac}</th><td>${rTAC.textContent}</td></tr>
        <tr><th>${t.result.brand}</th><td>${rBrand.textContent}</td></tr>
        <tr><th>${t.result.model}</th><td>${rModel.textContent}</td></tr>
        <tr><th>${t.result.blacklist}</th><td>${rBlacklist.textContent}</td></tr>
        <tr><th>${t.result.warranty}</th><td>${rWarranty.textContent}</td></tr>
        <tr><th>${t.quote.storage}</th><td>${$('#qStorage').value} GB</td></tr>
        <tr><th>${t.quote.title}</th><td>${$('#offerPrice').textContent}</td></tr>
      </tbody></table>`;
    $('#report').style.display='block';
    location.hash='#report';
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    window.applyLang(lang());
    imeiInput.addEventListener('input', updateValidity);
    $('#checkBtn').addEventListener('click', runCheck);
    $('#genReportBtn').addEventListener('click', genReport);
    ['qScreen','qWater','qBattery','qStorage'].forEach(id=>{ const el=document.getElementById(id); if(el) el.addEventListener('change', recalcQuote); });
  });
})();
