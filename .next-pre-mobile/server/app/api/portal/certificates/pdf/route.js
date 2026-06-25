"use strict";(()=>{var e={};e.id=6409,e.ids=[6409],e.modules={11185:e=>{e.exports=require("mongoose")},72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},27790:e=>{e.exports=require("assert")},78893:e=>{e.exports=require("buffer")},84770:e=>{e.exports=require("crypto")},17702:e=>{e.exports=require("events")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},86624:e=>{e.exports=require("querystring")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},6124:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>y,patchFetch:()=>v,requestAsyncStorage:()=>m,routeModule:()=>u,serverHooks:()=>g,staticGenerationAsyncStorage:()=>f});var i={};r.r(i),r.d(i,{GET:()=>p});var s=r(49303),a=r(88716),o=r(60670),n=r(87070),l=r(14184),d=r(97193),c=r(37604);async function p(e){try{let t=await (0,c.mk)();if(!t.authorized)return t.response;let r=e.nextUrl.searchParams.get("id");if(!r)return n.NextResponse.json({error:"Certificate ID required."},{status:400});await (0,l.u)();let i=await d.K.findOne({certificateId:r,user:t.session.user.id,isRevoked:!1}).lean();if(!i)return n.NextResponse.json({error:"Certificate not found."},{status:404});let s=new Date(i.issuedAt).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}),a=`https://safehers.africa/certificate/verify/${i.certificateId}`,o=i.courseTitle.toLowerCase().includes("online")||i.courseTitle.toLowerCase().includes("cyber")||i.courseTitle.toLowerCase().includes("phone")||i.courseTitle.toLowerCase().includes("sextortion"),p=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Certificate — ${i.certificateId}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;1,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
@page{size:landscape;margin:0}
body{width:297mm;height:210mm;background:#0C0C0E;color:#FAF7F1;font-family:Georgia,serif;display:flex;align-items:center;justify-content:center;position:relative}
.border{position:absolute;inset:12mm;border:2px solid #B8963E}
.border-inner{position:absolute;inset:16mm;border:1px solid rgba(184,150,62,0.3)}
.content{text-align:center;position:relative;z-index:1;max-width:220mm}
.star{color:#B8963E;font-size:28pt;margin-bottom:8mm}
.org{font-family:monospace;font-size:9pt;letter-spacing:0.25em;text-transform:uppercase;color:#B8963E;margin-bottom:3mm}
.title{font-size:10pt;letter-spacing:0.3em;text-transform:uppercase;color:rgba(250,247,241,0.4);font-family:monospace;margin-bottom:12mm}
.name{font-size:36pt;font-weight:300;letter-spacing:-0.02em;margin-bottom:6mm;font-family:'Fraunces',Georgia,serif}
.divider{width:60px;height:1px;background:#B8963E;margin:0 auto 6mm}
.completed{font-size:13pt;color:rgba(250,247,241,0.7);margin-bottom:3mm}
.course{font-size:18pt;font-style:italic;color:#B8963E;margin-bottom:15mm;font-family:'Fraunces',Georgia,serif}
.details{font-family:monospace;font-size:8pt;color:rgba(250,247,241,0.4);letter-spacing:0.1em;margin-bottom:12mm;display:flex;gap:30px;justify-content:center}
.signature{display:flex;justify-content:center;gap:60px;margin-bottom:8mm}
.sig-block{text-align:center}
.sig-line{width:120px;height:1px;background:rgba(250,247,241,0.2);margin:0 auto 4mm}
.sig-name{font-size:10pt;color:#B8963E;margin-bottom:2mm}
.sig-title{font-size:7pt;color:rgba(250,247,241,0.3);font-family:monospace;letter-spacing:0.1em;text-transform:uppercase}
.verify{position:absolute;bottom:8mm;left:0;right:0;text-align:center;font-family:monospace;font-size:7pt;color:rgba(250,247,241,0.2);letter-spacing:0.1em}
.qr{margin-top:4mm;font-size:7pt;color:rgba(250,247,241,0.15)}
@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style>
</head>
<body>
<div class="border"></div>
<div class="border-inner"></div>
<div class="content">
<div class="star">✦</div>
<div class="org">SafeHer Foundation</div>
<div class="title">Certificate of Completion</div>
<div class="name">${i.userName}</div>
<div class="divider"></div>
<div class="completed">has successfully completed</div>
<div class="course">${i.courseTitle}</div>
<div class="details">
<span>ID: ${i.certificateId}</span>
<span>Issued: ${s}</span>
${i.grade?`<span>Grade: ${i.grade}</span>`:""}
</div>
<div class="signature">
<div class="sig-block">
<div class="sig-line"></div>
<div class="sig-name">${o?"DK Cyber":"Zarinah Knows"}</div>
<div class="sig-title">${o?"Co-Founder & Director of Operations":"Co-Founder & Executive Director"}</div>
</div>
<div class="sig-block">
<div class="sig-line"></div>
<div class="sig-name">SafeHer Foundation</div>
<div class="sig-title">Issuing Authority</div>
</div>
</div>
</div>
<div class="verify">Verify: ${a}<div class="qr">safehers.africa</div></div>
</body>
</html>`;return new n.NextResponse(p,{headers:{"Content-Type":"text/html; charset=utf-8","Content-Disposition":`inline; filename="SafeHer-Certificate-${i.certificateId}.html"`}})}catch(e){return console.error("[certificates/pdf]",e),n.NextResponse.json({error:"Failed."},{status:500})}}let u=new s.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/portal/certificates/pdf/route",pathname:"/api/portal/certificates/pdf",filename:"route",bundlePath:"app/api/portal/certificates/pdf/route"},resolvedPagePath:"/opt/safeher/safehers/src/app/api/portal/certificates/pdf/route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:m,staticGenerationAsyncStorage:f,serverHooks:g}=u,y="/api/portal/certificates/pdf/route";function v(){return(0,o.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:f})}},95456:(e,t,r)=>{r.d(t,{L:()=>n});var i=r(53797),s=r(98691),a=r(14184),o=r(93330);let n={providers:[(0,i.Z)({id:"admin-login",name:"Admin Credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){let t=process.env.ADMIN_EMAIL,r=process.env.ADMIN_PASSWORD;return t&&r&&e?.email===t&&e?.password===r?{id:"admin-1",email:t,name:"SafeHer Admin",role:"super_admin"}:null}}),(0,i.Z)({id:"portal-login",name:"Portal Login",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;try{await (0,a.u)();let t=await o.n.findOne({email:e.email.toLowerCase(),isActive:!0});if(!t||!await s.ZP.compare(e.password,t.passwordHash))return null;return await o.n.updateOne({_id:t._id},{lastLoginAt:new Date}),{id:t._id.toString(),email:t.email,name:t.name,role:t.role}}catch{return null}}})],callbacks:{jwt:async({token:e,user:t})=>(t&&(e.role=t.role??"beneficiary",e.userId=t.id),e),session:async({session:e,token:t})=>(e.user&&(e.user.role=t.role,e.user.id=t.userId),e)},session:{strategy:"jwt",maxAge:86400},pages:{signIn:"/admin/login"},secret:process.env.NEXTAUTH_SECRET}},14184:(e,t,r)=>{r.d(t,{u:()=>n});var i=r(11185),s=r.n(i);let a=process.env.MONGODB_URI;a||console.warn("[mongo] MONGODB_URI not set. API routes that need a database will fail. Copy .env.local.example to .env.local and set MONGODB_URI.");let o=global.mongoose??{conn:null,promise:null};async function n(){if(o.conn)return o.conn;if(!a)throw Error("MONGODB_URI not configured");return o.promise||(o.promise=s().connect(a,{bufferCommands:!1}).then(e=>e)),o.conn=await o.promise,o.conn}global.mongoose||(global.mongoose=o)},37604:(e,t,r)=>{r.d(t,{MH:()=>o,mk:()=>n});var i=r(75571),s=r(87070),a=r(95456);async function o(...e){let t=await (0,i.getServerSession)(a.L);if(!t?.user?.id)return{authorized:!1,session:null,response:s.NextResponse.json({error:"Authentication required."},{status:401})};let r=t.user.role;return r&&e.includes(r)?{authorized:!0,session:t}:{authorized:!1,session:null,response:s.NextResponse.json({error:"Insufficient permissions."},{status:403})}}async function n(){let e=await (0,i.getServerSession)(a.L);return e?.user?.id?{authorized:!0,session:e}:{authorized:!1,session:null,response:s.NextResponse.json({error:"Authentication required."},{status:401})}}},97193:(e,t,r)=>{r.d(t,{K:()=>o});var i=r(11185),s=r.n(i);let a=new i.Schema({certificateId:{type:String,required:!0,unique:!0},user:{type:i.Schema.Types.ObjectId,ref:"User",required:!0},course:{type:i.Schema.Types.ObjectId,ref:"Course",required:!0},enrollment:{type:i.Schema.Types.ObjectId,ref:"Enrollment",required:!0},userName:{type:String,required:!0},courseTitle:{type:String,required:!0},issuedAt:{type:Date,default:Date.now},expiresAt:{type:Date},grade:{type:String},isRevoked:{type:Boolean,default:!1},revokedReason:{type:String}},{timestamps:!0}),o=i.models.Certificate||s().model("Certificate",a)},93330:(e,t,r)=>{r.d(t,{n:()=>o});var i=r(11185),s=r.n(i);let a=new i.Schema({email:{type:String,required:!0,unique:!0,lowercase:!0,trim:!0},passwordHash:{type:String,required:!0},name:{type:String,required:!0,trim:!0},role:{type:String,enum:["beneficiary","educator","consultant","institution_admin","donor","admin","super_admin"],default:"beneficiary"},phone:{type:String,trim:!0},country:{type:String,default:"Ghana"},dateOfBirth:{type:Date},isMinor:{type:Boolean,default:!1},guardianName:{type:String,trim:!0},guardianEmail:{type:String,trim:!0},guardianConsent:{type:Boolean,default:!1},institution:{type:i.Schema.Types.ObjectId,ref:"Institution"},cohort:{type:i.Schema.Types.ObjectId,ref:"Cohort"},bio:{type:String,maxlength:500},avatarUrl:{type:String},isActive:{type:Boolean,default:!0},emailVerified:{type:Boolean,default:!1},lastLoginAt:{type:Date}},{timestamps:!0}),o=i.models.User||s().model("User",a)}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),i=t.X(0,[8948,5972,8691,1790],()=>r(6124));module.exports=i})();