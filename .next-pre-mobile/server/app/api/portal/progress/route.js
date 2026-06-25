"use strict";(()=>{var e={};e.id=2822,e.ids=[2822],e.modules={11185:e=>{e.exports=require("mongoose")},72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},27790:e=>{e.exports=require("assert")},78893:e=>{e.exports=require("buffer")},84770:e=>{e.exports=require("crypto")},17702:e=>{e.exports=require("events")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},86624:e=>{e.exports=require("querystring")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},6005:e=>{e.exports=require("node:crypto")},49722:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>z,patchFetch:()=>F,requestAsyncStorage:()=>b,routeModule:()=>w,serverHooks:()=>v,staticGenerationAsyncStorage:()=>S});var o={};r.r(o),r.d(o,{POST:()=>E});var i=r(49303),n=r(88716),a=r(60670),s=r(87070),l=r(82591),p=r(14184),c=r(66820),d=r(89332),u=r(97193),f=r(37604),m=r(55091),y=r(90477),g=r(84770),x=r.n(g);let h=process.env.RESEND_API_KEY?new l.R(process.env.RESEND_API_KEY):null;async function E(e){try{let t=e.headers.get("x-forwarded-for")?.split(",")[0]?.trim()??"unknown";if(!await (0,m.D)(t))return s.NextResponse.json({error:"Too many requests."},{status:429});let r=await (0,f.mk)();if(!r.authorized)return r.response;let{enrollmentId:o,lessonId:i,quizScore:n,quizPassed:a}=await e.json();if(!o||!i)return s.NextResponse.json({error:"Missing fields."},{status:400});await (0,p.u)();let l=await c.I.findOne({_id:o,user:r.session.user.id});if(!l)return s.NextResponse.json({error:"Enrollment not found."},{status:404});l.lessonsCompleted.find(e=>e.lessonId===i)||l.lessonsCompleted.push({lessonId:i,completed:!0,completedAt:new Date,quizScore:n,quizPassed:a});let g=await d.T.findById(l.course);if(g){let e=0;for(let t of g.modules)e+=t.lessons.length;if(l.progress=e>0?Math.round(l.lessonsCompleted.length/e*100):0,l.progress>=100&&"completed"!==l.status&&(l.status="completed",l.completedAt=new Date,h&&r.session.user.email&&h.emails.send({from:"SafeHer Foundation <noreply@safehers.africa>",to:r.session.user.email,subject:`Congratulations! You completed ${g.title}`,html:(0,y.Mu)(r.session.user.name,g.title)}).catch(e=>console.error("[progress] Completion email failed:",e)),g.certificateEnabled)){let e=`SHF-${x().randomBytes(4).toString("hex").toUpperCase()}`,t=await u.K.create({certificateId:e,user:r.session.user.id,course:g._id,enrollment:l._id,userName:r.session.user.name||"",courseTitle:g.title});l.certificate=t._id,h&&r.session.user.email&&h.emails.send({from:"SafeHer Foundation <noreply@safehers.africa>",to:r.session.user.email,subject:`Your certificate is ready — ${g.title}`,html:(0,y.PF)(r.session.user.name,g.title,e)}).catch(e=>console.error("[progress] Certificate email failed:",e))}}return await l.save(),s.NextResponse.json({ok:!0,progress:l.progress,status:l.status,certificate:l.certificate||null})}catch(e){return console.error("[portal/progress]",e),s.NextResponse.json({error:"Failed."},{status:500})}}let w=new i.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/portal/progress/route",pathname:"/api/portal/progress",filename:"route",bundlePath:"app/api/portal/progress/route"},resolvedPagePath:"/opt/safeher/safehers/src/app/api/portal/progress/route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:b,staticGenerationAsyncStorage:S,serverHooks:v}=w,z="/api/portal/progress/route";function F(){return(0,a.patchFetch)({serverHooks:v,staticGenerationAsyncStorage:S})}},95456:(e,t,r)=>{r.d(t,{L:()=>s});var o=r(53797),i=r(98691),n=r(14184),a=r(93330);let s={providers:[(0,o.Z)({id:"admin-login",name:"Admin Credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){let t=process.env.ADMIN_EMAIL,r=process.env.ADMIN_PASSWORD;return t&&r&&e?.email===t&&e?.password===r?{id:"admin-1",email:t,name:"SafeHer Admin",role:"super_admin"}:null}}),(0,o.Z)({id:"portal-login",name:"Portal Login",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;try{await (0,n.u)();let t=await a.n.findOne({email:e.email.toLowerCase(),isActive:!0});if(!t||!await i.ZP.compare(e.password,t.passwordHash))return null;return await a.n.updateOne({_id:t._id},{lastLoginAt:new Date}),{id:t._id.toString(),email:t.email,name:t.name,role:t.role}}catch{return null}}})],callbacks:{jwt:async({token:e,user:t})=>(t&&(e.role=t.role??"beneficiary",e.userId=t.id),e),session:async({session:e,token:t})=>(e.user&&(e.user.role=t.role,e.user.id=t.userId),e)},session:{strategy:"jwt",maxAge:86400},pages:{signIn:"/admin/login"},secret:process.env.NEXTAUTH_SECRET}},90477:(e,t,r)=>{r.d(t,{Bf:()=>g,EC:()=>u,M5:()=>p,Mu:()=>m,PF:()=>f,Py:()=>s,Z3:()=>y,al:()=>n,bG:()=>a,lx:()=>c,oe:()=>l,t2:()=>d});let o=process.env.NEXTAUTH_URL??"https://safehers.africa";function i(e){return`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin:0;padding:0;background:#F5F1EA;font-family:Arial,Helvetica,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F1EA;padding:40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FAF6EF;">
              <tr><td>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0E0E10;padding:28px 40px;">
      <tr>
        <td>
          <span style="font-family:Georgia,serif;font-size:24px;color:#FAF7F1;letter-spacing:-0.02em;">
            SafeHer
          </span>
          <span style="color:#B8963E;font-size:12px;margin-left:8px;font-family:monospace;letter-spacing:0.15em;text-transform:uppercase;">Foundation</span>
        </td>
      </tr>
    </table>
  </td></tr>
              <tr><td style="padding:40px;">${e}</td></tr>
              <tr><td>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0E0E10;padding:24px 40px;margin-top:40px;">
      <tr>
        <td style="color:#FAF6EF;opacity:0.4;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">
          \xa9 ${new Date().getFullYear()} SafeHer Foundation \xb7 East Legon, Accra, Ghana
          <br />
          <a href="${o}/privacy" style="color:#E8B4B8;text-decoration:none;margin-top:4px;display:inline-block;">
            Privacy Policy
          </a>
          &nbsp;\xb7&nbsp;
          <a href="mailto:hello@safehers.africa" style="color:#E8B4B8;text-decoration:none;">
            Unsubscribe
          </a>
        </td>
      </tr>
    </table>
  </td></tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `}function n(e){return i(`
    <p style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:#0E0E10;margin:0 0 20px;line-height:1.2;">
      Thank you, ${e}.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 16px;">
      We have received your message and one of our team members will be in touch
      within <strong>2 business days</strong>.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 32px;">
      In the meantime, explore our free resources — practical safety tools you
      can use right now.
    </p>
    <a href="${o}/resources"
       style="display:inline-block;background:#0E0E10;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Visit Resources
    </a>
    <p style="font-size:13px;color:#0E0E10;opacity:0.5;margin-top:40px;">
      Accra, Ghana &amp; Washington, D.C.
    </p>
  `)}function a(e){return i(`
    <p style="font-family:Georgia,serif;font-size:22px;font-weight:300;color:#0E0E10;margin:0 0 24px;">
      New Contact Submission
    </p>
    <table cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid rgba(14,14,16,0.15);">
      ${[["Name",e.name],["Email",e.email],["Organisation",e.organization??"—"],["Interest",e.interest],["Country",e.country??"—"]].map(([e,t])=>`
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(14,14,16,0.1);
                     font-family:monospace;font-size:10px;letter-spacing:0.15em;
                     text-transform:uppercase;color:#0E0E10;opacity:0.5;width:140px;
                     vertical-align:top;">
            ${e}
          </td>
          <td style="padding:10px 0 10px 16px;border-bottom:1px solid rgba(14,14,16,0.1);
                     font-size:14px;color:#0E0E10;">
            ${t}
          </td>
        </tr>
      `).join("")}
    </table>
    <div style="margin-top:24px;padding:20px;background:#F5F1EA;border-left:3px solid #5C1F2E;">
      <p style="font-family:monospace;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;
                color:#0E0E10;opacity:0.5;margin:0 0 8px;">Message</p>
      <p style="font-size:14px;line-height:1.7;color:#0E0E10;margin:0;">${e.message}</p>
    </div>
    <a href="${o}/admin/contacts"
       style="display:inline-block;margin-top:24px;background:#0E0E10;color:#FAF6EF;
              padding:12px 24px;font-family:monospace;font-size:10px;letter-spacing:0.15em;
              text-transform:uppercase;text-decoration:none;">
      View in Admin
    </a>
  `)}function s(e,t){return i(`
    <p style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:#0E0E10;margin:0 0 20px;line-height:1.2;">
      Verify your email, ${e}.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 24px;">
      Welcome to SafeHer Academy. Please verify your email address to access
      all features including consultations and certificate downloads.
    </p>
    <a href="${t}"
       style="display:inline-block;background:#0E0E10;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Verify Email
    </a>
    <p style="font-size:13px;color:#0E0E10;opacity:0.4;margin-top:32px;">
      This link expires in 24 hours. If you did not create an account, ignore this email.
    </p>
  `)}function l(e,t){return i(`
    <p style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:#0E0E10;margin:0 0 20px;line-height:1.2;">
      Reset your password, ${e}.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 24px;">
      We received a request to reset your SafeHer Academy password. Click the
      button below to choose a new password.
    </p>
    <a href="${t}"
       style="display:inline-block;background:#5C1F2E;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Reset Password
    </a>
    <p style="font-size:13px;color:#0E0E10;opacity:0.4;margin-top:32px;">
      This link expires in 1 hour. If you did not request a reset, ignore this email.
    </p>
  `)}function p(e){return i(`
    <p style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:#0E0E10;margin:0 0 20px;line-height:1.2;">
      Admin verification code
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 24px;">
      Your one-time verification code for SafeHer Foundation admin access:
    </p>
    <div style="background:#0E0E10;color:#B8963E;padding:20px 32px;font-family:monospace;
                font-size:32px;letter-spacing:0.3em;text-align:center;margin:0 0 24px;">
      ${e}
    </div>
    <p style="font-size:13px;color:#0E0E10;opacity:0.4;">
      This code expires in 10 minutes. Do not share it with anyone.
    </p>
  `)}function c(e){return i(`
    <p style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:#0E0E10;margin:0 0 20px;line-height:1.2;">
      Welcome to the movement.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 16px;">
      You are now part of a growing community of women across Africa and the
      diaspora who believe that safety knowledge is a fundamental right.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 32px;">
      We will be in touch with practical safety guides, programme updates, and
      resources you can share with the women in your life. No spam — ever.
    </p>
    <a href="${o}/resources"
       style="display:inline-block;background:#5C1F2E;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Download Free Resources
    </a>
    <p style="font-size:13px;color:#0E0E10;opacity:0.5;margin-top:40px;">
      You subscribed with: ${e}
    </p>
  `)}function d(e){return i(`
    <p style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:#0E0E10;margin:0 0 20px;line-height:1.2;">
      Welcome to SafeHer Academy, ${e}.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 16px;">
      Your account has been created. You now have access to free, practical
      safety courses designed for women and girls across Africa.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 32px;">
      Start by browsing our course catalog and enrolling in your first course.
      Every course is free and earns you a verifiable SafeHer Foundation certificate.
    </p>
    <a href="${o}/academy/courses"
       style="display:inline-block;background:#0E0E10;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Browse Courses
    </a>
    <p style="font-size:13px;color:#0E0E10;opacity:0.4;margin-top:32px;">
      Pretty Girl, Save Yourself. — SafeHer Foundation
    </p>
  `)}function u(e,t,r){return i(`
    <p style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:#0E0E10;margin:0 0 20px;line-height:1.2;">
      You're enrolled, ${e}.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 16px;">
      You have been enrolled in:
    </p>
    <p style="font-family:Georgia,serif;font-size:22px;font-style:italic;color:#5C1F2E;margin:0 0 24px;">
      ${t}
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 32px;">
      Log in to your portal to start learning. Complete all lessons and quizzes
      to earn your SafeHer Foundation certificate.
    </p>
    <a href="${o}/academy/courses/${r}"
       style="display:inline-block;background:#5C1F2E;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Start Learning
    </a>
  `)}function f(e,t,r){return i(`
    <p style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:#0E0E10;margin:0 0 20px;line-height:1.2;">
      Congratulations, ${e}.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 16px;">
      You have earned a SafeHer Foundation certificate for completing:
    </p>
    <p style="font-family:Georgia,serif;font-size:22px;font-style:italic;color:#5C1F2E;margin:0 0 8px;">
      ${t}
    </p>
    <p style="font-family:monospace;font-size:13px;color:#B8963E;margin:0 0 24px;">
      Certificate ID: ${r}
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 32px;">
      Your certificate is verifiable at the link below. You can also download
      it from your portal.
    </p>
    <a href="${o}/certificate/verify/${r}"
       style="display:inline-block;background:#0E0E10;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      View Certificate
    </a>
  `)}function m(e,t){return i(`
    <p style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:#0E0E10;margin:0 0 20px;line-height:1.2;">
      You did it, ${e}.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 16px;">
      You have completed <strong>${t}</strong>. The knowledge you have
      gained is now yours to keep, practice, and share.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 32px;">
      Check your portal for your certificate and explore more courses in
      the SafeHer Academy catalog.
    </p>
    <a href="${o}/portal"
       style="display:inline-block;background:#5C1F2E;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Go to Portal
    </a>
  `)}function y(e,t,r){return i(`
    <p style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:#0E0E10;margin:0 0 20px;line-height:1.2;">
      Consultation request received, ${e}.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 16px;">
      Your <strong>${t.replace(/-/g," ")}</strong> consultation request has been
      submitted for <strong>${r}</strong>.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 32px;">
      A SafeHer Foundation specialist will confirm your session within 2
      business days. You will receive a confirmation email with meeting details.
    </p>
    <p style="font-size:13px;color:#0E0E10;opacity:0.4;margin-top:20px;">
      All consultations are confidential. If you are in immediate danger,
      contact local emergency services.
    </p>
  `)}function g(e,t,r){return i(`
    <p style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:#0E0E10;margin:0 0 20px;line-height:1.2;">
      You're invited, ${e}.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 16px;">
      You have been invited to join the <strong>${t}</strong> cohort
      at SafeHer Academy.
    </p>
    <p style="font-family:Georgia,serif;font-size:20px;font-style:italic;color:#5C1F2E;margin:0 0 24px;">
      Course: ${r}
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 32px;">
      Create your account or log in to your portal to get started. This
      programme is fully funded — there is no cost to you.
    </p>
    <a href="${o}/portal/register"
       style="display:inline-block;background:#0E0E10;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Join Cohort
    </a>
  `)}},14184:(e,t,r)=>{r.d(t,{u:()=>s});var o=r(11185),i=r.n(o);let n=process.env.MONGODB_URI;n||console.warn("[mongo] MONGODB_URI not set. API routes that need a database will fail. Copy .env.local.example to .env.local and set MONGODB_URI.");let a=global.mongoose??{conn:null,promise:null};async function s(){if(a.conn)return a.conn;if(!n)throw Error("MONGODB_URI not configured");return a.promise||(a.promise=i().connect(n,{bufferCommands:!1}).then(e=>e)),a.conn=await a.promise,a.conn}global.mongoose||(global.mongoose=a)},55091:(e,t,r)=>{r.d(t,{D:()=>c});var o=r(11185),i=r.n(o),n=r(14184);let a=new o.Schema({key:{type:String,required:!0,index:!0},count:{type:Number,default:1},resetAt:{type:Date,required:!0,index:{expires:0}}}),s=o.models.RateLimitEntry||i().model("RateLimitEntry",a),l={default:{max:5,windowMs:36e5},auth:{max:10,windowMs:9e5},register:{max:3,windowMs:36e5},verify:{max:20,windowMs:36e5}},p=new Map;async function c(e,t="default"){let r=l[t]||l.default,o=`${t}:${e}`,i=Date.now();try{await (0,n.u)();let e=await s.findOne({key:o});if(!e||new Date(e.resetAt).getTime()<i)return await s.findOneAndUpdate({key:o},{key:o,count:1,resetAt:new Date(i+r.windowMs)},{upsert:!0}),!0;if(e.count>=r.max)return!1;return await s.updateOne({key:o},{$inc:{count:1}}),!0}catch{let e=p.get(o);if(!e||i>e.resetAt)return p.set(o,{count:1,resetAt:i+r.windowMs}),!0;if(e.count>=r.max)return!1;return e.count++,!0}}},37604:(e,t,r)=>{r.d(t,{MH:()=>a,mk:()=>s});var o=r(75571),i=r(87070),n=r(95456);async function a(...e){let t=await (0,o.getServerSession)(n.L);if(!t?.user?.id)return{authorized:!1,session:null,response:i.NextResponse.json({error:"Authentication required."},{status:401})};let r=t.user.role;return r&&e.includes(r)?{authorized:!0,session:t}:{authorized:!1,session:null,response:i.NextResponse.json({error:"Insufficient permissions."},{status:403})}}async function s(){let e=await (0,o.getServerSession)(n.L);return e?.user?.id?{authorized:!0,session:e}:{authorized:!1,session:null,response:i.NextResponse.json({error:"Authentication required."},{status:401})}}},97193:(e,t,r)=>{r.d(t,{K:()=>a});var o=r(11185),i=r.n(o);let n=new o.Schema({certificateId:{type:String,required:!0,unique:!0},user:{type:o.Schema.Types.ObjectId,ref:"User",required:!0},course:{type:o.Schema.Types.ObjectId,ref:"Course",required:!0},enrollment:{type:o.Schema.Types.ObjectId,ref:"Enrollment",required:!0},userName:{type:String,required:!0},courseTitle:{type:String,required:!0},issuedAt:{type:Date,default:Date.now},expiresAt:{type:Date},grade:{type:String},isRevoked:{type:Boolean,default:!1},revokedReason:{type:String}},{timestamps:!0}),a=o.models.Certificate||i().model("Certificate",n)},89332:(e,t,r)=>{r.d(t,{T:()=>l});var o=r(11185),i=r.n(o);let n=new o.Schema({title:{type:String,required:!0},slug:{type:String,required:!0},type:{type:String,enum:["text","video","quiz","activity"],default:"text"},content:{type:String},videoUrl:{type:String},durationMinutes:{type:Number,default:10},order:{type:Number,required:!0},quizQuestions:[{question:{type:String,required:!0},options:[{type:String}],correctIndex:{type:Number,required:!0},explanation:{type:String}}]}),a=new o.Schema({title:{type:String,required:!0},slug:{type:String,required:!0},description:{type:String},order:{type:Number,required:!0},lessons:[n]}),s=new o.Schema({title:{type:String,required:!0},slug:{type:String,required:!0,unique:!0},excerpt:{type:String,required:!0},description:{type:String},category:{type:String,enum:["personal-safety","online-safety","financial-safety","campus-safety","wellbeing"],default:"personal-safety"},level:{type:String,enum:["beginner","intermediate","advanced"],default:"beginner"},durationHours:{type:Number,default:4},modules:[a],coverImage:{type:String},instructor:{type:String,default:"SafeHer Foundation"},isFree:{type:Boolean,default:!0},price:{type:Number,default:0},isPublished:{type:Boolean,default:!1},enrollmentCount:{type:Number,default:0},tags:[{type:String}],prerequisites:[{type:String}],learningOutcomes:[{type:String}],certificateEnabled:{type:Boolean,default:!0},passingScore:{type:Number,default:70}},{timestamps:!0}),l=o.models.Course||i().model("Course",s)},66820:(e,t,r)=>{r.d(t,{I:()=>s});var o=r(11185),i=r.n(o);let n=new o.Schema({lessonId:{type:String,required:!0},completed:{type:Boolean,default:!1},completedAt:{type:Date},quizScore:{type:Number},quizPassed:{type:Boolean}}),a=new o.Schema({user:{type:o.Schema.Types.ObjectId,ref:"User",required:!0},course:{type:o.Schema.Types.ObjectId,ref:"Course",required:!0},status:{type:String,enum:["active","completed","dropped","suspended"],default:"active"},progress:{type:Number,default:0,min:0,max:100},lessonsCompleted:[n],currentModuleIndex:{type:Number,default:0},currentLessonIndex:{type:Number,default:0},enrolledAt:{type:Date,default:Date.now},completedAt:{type:Date},certificate:{type:o.Schema.Types.ObjectId,ref:"Certificate"},scholarship:{type:o.Schema.Types.ObjectId,ref:"Scholarship"}},{timestamps:!0});a.index({user:1,course:1},{unique:!0});let s=o.models.Enrollment||i().model("Enrollment",a)},93330:(e,t,r)=>{r.d(t,{n:()=>a});var o=r(11185),i=r.n(o);let n=new o.Schema({email:{type:String,required:!0,unique:!0,lowercase:!0,trim:!0},passwordHash:{type:String,required:!0},name:{type:String,required:!0,trim:!0},role:{type:String,enum:["beneficiary","educator","consultant","institution_admin","donor","admin","super_admin"],default:"beneficiary"},phone:{type:String,trim:!0},country:{type:String,default:"Ghana"},dateOfBirth:{type:Date},isMinor:{type:Boolean,default:!1},guardianName:{type:String,trim:!0},guardianEmail:{type:String,trim:!0},guardianConsent:{type:Boolean,default:!1},institution:{type:o.Schema.Types.ObjectId,ref:"Institution"},cohort:{type:o.Schema.Types.ObjectId,ref:"Cohort"},bio:{type:String,maxlength:500},avatarUrl:{type:String},isActive:{type:Boolean,default:!0},emailVerified:{type:Boolean,default:!1},lastLoginAt:{type:Date}},{timestamps:!0}),a=o.models.User||i().model("User",n)}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[8948,5972,8691,1790,2591],()=>r(49722));module.exports=o})();