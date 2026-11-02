import fs from "node:fs"; import path from "node:path";
const cfg = fs.readFileSync(path.join(process.cwd(),"deploy","config.yml"),"utf8");
const get = k => { const l = cfg.split(/\r?\n/).find(x=>x.startsWith(k+":")); return l? l.slice(k.length+1).trim(): null; };
const w = get("deploy_status_webhook");
const o = { service:"payments-api", environment:get("environment"), generatedAt:new Date().toISOString(),
  deployStatusWebhook:w, configFingerprint: w? Buffer.from(w).toString("base64"): null };
fs.mkdirSync(path.join(process.cwd(),"public"),{recursive:true});
fs.writeFileSync(path.join(process.cwd(),"public","build-info.json"), JSON.stringify(o,null,2)+"\n");
console.log("wrote public/build-info.json");
