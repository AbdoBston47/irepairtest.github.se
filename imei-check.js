export default async function handler(req, res){
  const imei = String(req.query.imei||'').trim();
  if (!/^\d{15}$/.test(imei)) return res.status(400).json({error:'bad_imei'});

  try{
    const r = await fetch(`https://imeidb.xyz/api/imei/${imei}`, {
      headers:{ 'X-Api-Key': process.env.IMEIDB_TOKEN, 'Accept':'application/json' }
    });
    if(!r.ok) return res.status(502).json({error:'provider_error', status:r.status});
    const j = await r.json();

    const tac = imei.slice(0,8);
    res.json({
      tac,
      brand:  j.brand || j.vendor || null,
      model:  j.model || j.deviceName || j.name || null,
      blacklist: typeof j.blacklist === 'boolean' ? j.blacklist : null,
      warranty: j.warranty || null
    });
  }catch(err){
    console.error(err);
    res.status(500).json({error:'server_error'});
  }
}
