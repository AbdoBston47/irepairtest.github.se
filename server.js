// server.js
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// Provider: imeidb.xyz (simple REST). Put your token in env.
const IMEIDB_TOKEN = process.env.IMEIDB_TOKEN;

app.get('/api/imei-check', async (req, res) => {
  const imei = (req.query.imei || '').trim();
  if (!/^\d{15}$/.test(imei)) return res.status(400).json({error:'bad_imei'});

  try{
    // Call provider
    const r = await fetch(`https://imeidb.xyz/api/imei/${imei}`, {
      headers: { 'X-Api-Key': IMEIDB_TOKEN, 'Accept': 'application/json' }
    });
    if(!r.ok){ return res.status(502).json({error:'provider_error', status:r.status}); }
    const j = await r.json();

    // Normalize
    const tac = imei.slice(0,8);
    const payload = {
      tac,
      brand:  j.brand || j.vendor || null,
      model:  j.model || j.deviceName || j.name || null,
      blacklist: typeof j.blacklist === 'boolean' ? j.blacklist : null,
      warranty: j.warranty || null
    };
    res.json(payload);
  }catch(e){
    console.error(e);
    res.status(500).json({error:'server_error'});
  }
});

app.use(express.static('public')); // serve your site (place html in /public)
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));
