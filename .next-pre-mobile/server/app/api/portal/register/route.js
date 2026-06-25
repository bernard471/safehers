"use strict";(()=>{var e={};e.id=6995,e.ids=[6995],e.modules={11185:e=>{e.exports=require("mongoose")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},84770:e=>{e.exports=require("crypto")},6005:e=>{e.exports=require("node:crypto")},53782:(e,t,o)=>{o.r(t),o.d(t,{originalPathname:()=>z,patchFetch:()=>A,requestAsyncStorage:()=>b,routeModule:()=>w,serverHooks:()=>v,staticGenerationAsyncStorage:()=>F});var i={};o.r(i),o.d(i,{POST:()=>E});var r=o(49303),n=o(88716),a=o(60670),s=o(87070),p=o(98691),l=o(84770),c=o.n(l),f=o(82591),d=o(14184),u=o(93330),m=o(91099),g=o(55091),y=o(90477);let x=process.env.RESEND_API_KEY?new f.R(process.env.RESEND_API_KEY):null,h=process.env.NEXTAUTH_URL??"https://safehers.africa";async function E(e){try{let{name:t,email:o,password:i,phone:r,country:n,dateOfBirth:a,guardianName:l,guardianEmail:f,guardianConsent:E}=await e.json(),w=e.headers.get("x-forwarded-for")?.split(",")[0]?.trim()??"unknown";if(!await (0,g.D)(w,"register"))return s.NextResponse.json({error:"Too many requests."},{status:429});if(!t||!o||!i)return s.NextResponse.json({error:"Name, email and password are required."},{status:400});if(i.length<8)return s.NextResponse.json({error:"Password must be at least 8 characters."},{status:400});if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o))return s.NextResponse.json({error:"Invalid email address."},{status:400});if(await (0,d.u)(),await u.n.findOne({email:o.toLowerCase()}))return s.NextResponse.json({error:"An account with this email already exists."},{status:409});let b=!!a&&new Date().getFullYear()-new Date(a).getFullYear()<18;if(b&&!E)return s.NextResponse.json({error:"Guardian consent is required for participants under 18."},{status:400});let F=await p.ZP.hash(i,12),v=await u.n.create({name:t,email:o.toLowerCase(),passwordHash:F,phone:r,country:n||"Ghana",dateOfBirth:a,isMinor:b,guardianName:b?l:void 0,guardianEmail:b?f:void 0,guardianConsent:b?E:void 0,role:"beneficiary"}),z=c().randomBytes(32).toString("hex");if(await m.W.create({userId:v._id,type:"email_verification",token:z,expiresAt:new Date(Date.now()+864e5)}),x){let e=`${h}/api/portal/verify-email?token=${z}`;x.emails.send({from:"SafeHer Foundation <noreply@safehers.africa>",to:o.toLowerCase(),subject:"Verify your email — SafeHer Academy",html:(0,y.Py)(t,e)}).catch(e=>console.error("[register] Verification email failed:",e)),x.emails.send({from:"SafeHer Foundation <noreply@safehers.africa>",to:o.toLowerCase(),subject:"Welcome to SafeHer Academy",html:(0,y.t2)(t)}).catch(e=>console.error("[register] Welcome email failed:",e))}return s.NextResponse.json({ok:!0},{status:201})}catch(e){return console.error("[portal/register]",e),s.NextResponse.json({error:"Registration failed."},{status:500})}}let w=new r.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/portal/register/route",pathname:"/api/portal/register",filename:"route",bundlePath:"app/api/portal/register/route"},resolvedPagePath:"/opt/safeher/safehers/src/app/api/portal/register/route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:b,staticGenerationAsyncStorage:F,serverHooks:v}=w,z="/api/portal/register/route";function A(){return(0,a.patchFetch)({serverHooks:v,staticGenerationAsyncStorage:F})}},90477:(e,t,o)=>{o.d(t,{Bf:()=>y,EC:()=>d,M5:()=>l,Mu:()=>m,PF:()=>u,Py:()=>s,Z3:()=>g,al:()=>n,bG:()=>a,lx:()=>c,oe:()=>p,t2:()=>f});let i=process.env.NEXTAUTH_URL??"https://safehers.africa";function r(e){return`
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
          <a href="${i}/privacy" style="color:#E8B4B8;text-decoration:none;margin-top:4px;display:inline-block;">
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
  `}function n(e){return r(`
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
    <a href="${i}/resources"
       style="display:inline-block;background:#0E0E10;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Visit Resources
    </a>
    <p style="font-size:13px;color:#0E0E10;opacity:0.5;margin-top:40px;">
      Accra, Ghana &amp; Washington, D.C.
    </p>
  `)}function a(e){return r(`
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
    <a href="${i}/admin/contacts"
       style="display:inline-block;margin-top:24px;background:#0E0E10;color:#FAF6EF;
              padding:12px 24px;font-family:monospace;font-size:10px;letter-spacing:0.15em;
              text-transform:uppercase;text-decoration:none;">
      View in Admin
    </a>
  `)}function s(e,t){return r(`
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
  `)}function p(e,t){return r(`
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
  `)}function l(e){return r(`
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
  `)}function c(e){return r(`
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
    <a href="${i}/resources"
       style="display:inline-block;background:#5C1F2E;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Download Free Resources
    </a>
    <p style="font-size:13px;color:#0E0E10;opacity:0.5;margin-top:40px;">
      You subscribed with: ${e}
    </p>
  `)}function f(e){return r(`
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
    <a href="${i}/academy/courses"
       style="display:inline-block;background:#0E0E10;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Browse Courses
    </a>
    <p style="font-size:13px;color:#0E0E10;opacity:0.4;margin-top:32px;">
      Pretty Girl, Save Yourself. — SafeHer Foundation
    </p>
  `)}function d(e,t,o){return r(`
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
    <a href="${i}/academy/courses/${o}"
       style="display:inline-block;background:#5C1F2E;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Start Learning
    </a>
  `)}function u(e,t,o){return r(`
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
      Certificate ID: ${o}
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 32px;">
      Your certificate is verifiable at the link below. You can also download
      it from your portal.
    </p>
    <a href="${i}/certificate/verify/${o}"
       style="display:inline-block;background:#0E0E10;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      View Certificate
    </a>
  `)}function m(e,t){return r(`
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
    <a href="${i}/portal"
       style="display:inline-block;background:#5C1F2E;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Go to Portal
    </a>
  `)}function g(e,t,o){return r(`
    <p style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:#0E0E10;margin:0 0 20px;line-height:1.2;">
      Consultation request received, ${e}.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 16px;">
      Your <strong>${t.replace(/-/g," ")}</strong> consultation request has been
      submitted for <strong>${o}</strong>.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 32px;">
      A SafeHer Foundation specialist will confirm your session within 2
      business days. You will receive a confirmation email with meeting details.
    </p>
    <p style="font-size:13px;color:#0E0E10;opacity:0.4;margin-top:20px;">
      All consultations are confidential. If you are in immediate danger,
      contact local emergency services.
    </p>
  `)}function y(e,t,o){return r(`
    <p style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:#0E0E10;margin:0 0 20px;line-height:1.2;">
      You're invited, ${e}.
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 16px;">
      You have been invited to join the <strong>${t}</strong> cohort
      at SafeHer Academy.
    </p>
    <p style="font-family:Georgia,serif;font-size:20px;font-style:italic;color:#5C1F2E;margin:0 0 24px;">
      Course: ${o}
    </p>
    <p style="font-size:15px;line-height:1.7;color:#0E0E10;opacity:0.8;margin:0 0 32px;">
      Create your account or log in to your portal to get started. This
      programme is fully funded — there is no cost to you.
    </p>
    <a href="${i}/portal/register"
       style="display:inline-block;background:#0E0E10;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Join Cohort
    </a>
  `)}},14184:(e,t,o)=>{o.d(t,{u:()=>s});var i=o(11185),r=o.n(i);let n=process.env.MONGODB_URI;n||console.warn("[mongo] MONGODB_URI not set. API routes that need a database will fail. Copy .env.local.example to .env.local and set MONGODB_URI.");let a=global.mongoose??{conn:null,promise:null};async function s(){if(a.conn)return a.conn;if(!n)throw Error("MONGODB_URI not configured");return a.promise||(a.promise=r().connect(n,{bufferCommands:!1}).then(e=>e)),a.conn=await a.promise,a.conn}global.mongoose||(global.mongoose=a)},55091:(e,t,o)=>{o.d(t,{D:()=>c});var i=o(11185),r=o.n(i),n=o(14184);let a=new i.Schema({key:{type:String,required:!0,index:!0},count:{type:Number,default:1},resetAt:{type:Date,required:!0,index:{expires:0}}}),s=i.models.RateLimitEntry||r().model("RateLimitEntry",a),p={default:{max:5,windowMs:36e5},auth:{max:10,windowMs:9e5},register:{max:3,windowMs:36e5},verify:{max:20,windowMs:36e5}},l=new Map;async function c(e,t="default"){let o=p[t]||p.default,i=`${t}:${e}`,r=Date.now();try{await (0,n.u)();let e=await s.findOne({key:i});if(!e||new Date(e.resetAt).getTime()<r)return await s.findOneAndUpdate({key:i},{key:i,count:1,resetAt:new Date(r+o.windowMs)},{upsert:!0}),!0;if(e.count>=o.max)return!1;return await s.updateOne({key:i},{$inc:{count:1}}),!0}catch{let e=l.get(i);if(!e||r>e.resetAt)return l.set(i,{count:1,resetAt:r+o.windowMs}),!0;if(e.count>=o.max)return!1;return e.count++,!0}}},91099:(e,t,o)=>{o.d(t,{W:()=>a});var i=o(11185),r=o.n(i);let n=new i.Schema({userId:{type:i.Schema.Types.ObjectId,ref:"User",required:!0},type:{type:String,enum:["email_verification","password_reset","admin_otp"],required:!0},token:{type:String,required:!0,unique:!0},expiresAt:{type:Date,required:!0,index:{expires:0}},used:{type:Boolean,default:!1},createdAt:{type:Date,default:Date.now}}),a=i.models.Token||r().model("Token",n)},93330:(e,t,o)=>{o.d(t,{n:()=>a});var i=o(11185),r=o.n(i);let n=new i.Schema({email:{type:String,required:!0,unique:!0,lowercase:!0,trim:!0},passwordHash:{type:String,required:!0},name:{type:String,required:!0,trim:!0},role:{type:String,enum:["beneficiary","educator","consultant","institution_admin","donor","admin","super_admin"],default:"beneficiary"},phone:{type:String,trim:!0},country:{type:String,default:"Ghana"},dateOfBirth:{type:Date},isMinor:{type:Boolean,default:!1},guardianName:{type:String,trim:!0},guardianEmail:{type:String,trim:!0},guardianConsent:{type:Boolean,default:!1},institution:{type:i.Schema.Types.ObjectId,ref:"Institution"},cohort:{type:i.Schema.Types.ObjectId,ref:"Cohort"},bio:{type:String,maxlength:500},avatarUrl:{type:String},isActive:{type:Boolean,default:!0},emailVerified:{type:Boolean,default:!1},lastLoginAt:{type:Date}},{timestamps:!0}),a=i.models.User||r().model("User",n)}};var t=require("../../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),i=t.X(0,[8948,5972,8691,2591],()=>o(53782));module.exports=i})();