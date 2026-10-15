const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req,res)=>{
res.send(`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Chicago FX - REAL LIVE</title><style>
*{margin:0;padding:0;box-sizing:border-box}body{background:#0c0a1c;color:white;font-family:Arial;padding:0 0 90px 0}
.top{background:#1e1a33;padding:14px 16px;display:flex;justify-content:space-between;align-items:center}
.logo{display:flex;align-items:center;gap:10px}.icon{width:38px;height:38px;background:linear-gradient(135deg,#ff8a2a,#ff6b00);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800}
.badge{border:1px solid #00ff88;color:#00ff88;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:bold}
.hero{padding:24px 16px;text-align:center}.hero h1{font-size:32px;line-height:1.1}.pink{color:#ff4d9e}
.green-tag{background:#1a3d2e;border:1px solid #00ff88;color:#00ff88;padding:8px 16px;border-radius:20px;font-size:12px;display:inline-block;margin-top:12px;font-weight:bold}
.card{background:#1e1a33;margin:16px;border-radius:20px;padding:18px;border:1px solid #2a2445}
.big{font-size:48px;font-weight:800;color:#00ff88;margin:8px 0}
.row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:0 16px}
.mini{background:#1e1a33;border-radius:16px;padding:14px;border:1px solid #2a2445}
.trade{margin:20px 16px;background:linear-gradient(90deg,#8b5cf6,#ec4899);padding:18px;border-radius:30px;text-align:center;font-weight:800;font-size:18px}
.nav{position:fixed;bottom:0;left:0;right:0;background:#1a1630;display:flex;justify-content:space-around;padding:12px 0;border-top:1px solid #2a2445}
</style></head><body>
<div class="top"><div class="logo"><div class="icon">C</div><b>Chicago FX 100</b></div><div>🔔 👤</div></div>
<div class="hero">
<div class="badge">REAL LIVE TERMINAL</div>
<h1 style="margin-top:16px">MAKE A MOVE<br><span class="pink">REAL $0.02 TRADE</span></h1>
<div class="green-tag">✅ REAL MODE - LIVE $0.02 unlocked</div>
</div>
<div class="card">
<div style="display:flex;justify-content:space-between"><span style="opacity:0.6">Real balance</span><span style="background:#00ff88;color:black;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:bold">● Live</span></div>
<div class="big">$0.02</div>
<div style="opacity:0.5;font-size:12px">Real Mode: true | Pocket SSID Connected</div>
</div>
<div class="row">
<div class="mini"><div style="opacity:0.5;font-size:12px">Buying Power</div><div style="font-size:22px;font-weight:bold;margin-top:4px">$0.02</div><div style="color:#00ff88;font-size:13px">↗ Live</div></div>
<div class="mini"><div style="opacity:0.5;font-size:12px">Margin Level</div><div style="font-size:22px;font-weight:bold">—</div><div style="color:#00ff88;font-size:13px">Secure</div></div>
</div>
<div class="trade" onclick="alert('🔓 REAL $0.02 TRADE LIVE! Go to @Chicago_fx_bot and type /trade')">TRADE REAL $0.02</div>
</body></html>`);
});

app.listen(PORT, ()=>console.log('LIVE on '+PORT));
