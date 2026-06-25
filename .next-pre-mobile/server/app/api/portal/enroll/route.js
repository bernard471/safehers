"use strict";(()=>{var e={};e.id=9676,e.ids=[9676],e.modules={11185:e=>{e.exports=require("mongoose")},72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},27790:e=>{e.exports=require("assert")},78893:e=>{e.exports=require("buffer")},84770:e=>{e.exports=require("crypto")},17702:e=>{e.exports=require("events")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},86624:e=>{e.exports=require("querystring")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},6005:e=>{e.exports=require("node:crypto")},1057:(e,t,o)=>{o.r(t),o.d(t,{originalPathname:()=>b,patchFetch:()=>S,requestAsyncStorage:()=>h,routeModule:()=>x,serverHooks:()=>w,staticGenerationAsyncStorage:()=>E});var r={};o.r(r),o.d(r,{POST:()=>g});var n=o(49303),i=o(88716),a=o(60670),s=o(87070),l=o(82591),p=o(14184),c=o(66820),d=o(89332),u=o(37604),f=o(55091),m=o(90477);let y=process.env.RESEND_API_KEY?new l.R(process.env.RESEND_API_KEY):null;async function g(e){try{let t=e.headers.get("x-forwarded-for")?.split(",")[0]?.trim()??"unknown";if(!await (0,f.D)(t))return s.NextResponse.json({error:"Too many requests."},{status:429});let o=await (0,u.mk)();if(!o.authorized)return o.response;let{courseId:r}=await e.json();if(!r)return s.NextResponse.json({error:"Course ID is required."},{status:400});await (0,p.u)();let n=await d.T.findById(r);if(!n||!n.isPublished)return s.NextResponse.json({error:"Course not found."},{status:404});let i=await c.I.findOne({user:o.session.user.id,course:r});if(i)return s.NextResponse.json({error:"Already enrolled.",enrollmentId:i._id},{status:409});let a=await c.I.create({user:o.session.user.id,course:r});return await d.T.updateOne({_id:r},{$inc:{enrollmentCount:1}}),y&&o.session.user.email&&y.emails.send({from:"SafeHer Foundation <noreply@safehers.africa>",to:o.session.user.email,subject:`Enrolled: ${n.title} — SafeHer Academy`,html:(0,m.EC)(o.session.user.name,n.title,n.slug)}).catch(e=>console.error("[enroll] Email failed:",e)),s.NextResponse.json({ok:!0,enrollmentId:a._id},{status:201})}catch(e){return console.error("[portal/enroll]",e),s.NextResponse.json({error:"Enrollment failed."},{status:500})}}let x=new n.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/portal/enroll/route",pathname:"/api/portal/enroll",filename:"route",bundlePath:"app/api/portal/enroll/route"},resolvedPagePath:"/opt/safeher/safehers/src/app/api/portal/enroll/route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:h,staticGenerationAsyncStorage:E,serverHooks:w}=x,b="/api/portal/enroll/route";function S(){return(0,a.patchFetch)({serverHooks:w,staticGenerationAsyncStorage:E})}},95456:(e,t,o)=>{o.d(t,{L:()=>s});var r=o(53797),n=o(98691),i=o(14184),a=o(93330);let s={providers:[(0,r.Z)({id:"admin-login",name:"Admin Credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){let t=process.env.ADMIN_EMAIL,o=process.env.ADMIN_PASSWORD;return t&&o&&e?.email===t&&e?.password===o?{id:"admin-1",email:t,name:"SafeHer Admin",role:"super_admin"}:null}}),(0,r.Z)({id:"portal-login",name:"Portal Login",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;try{await (0,i.u)();let t=await a.n.findOne({email:e.email.toLowerCase(),isActive:!0});if(!t||!await n.ZP.compare(e.password,t.passwordHash))return null;return await a.n.updateOne({_id:t._id},{lastLoginAt:new Date}),{id:t._id.toString(),email:t.email,name:t.name,role:t.role}}catch{return null}}})],callbacks:{jwt:async({token:e,user:t})=>(t&&(e.role=t.role??"beneficiary",e.userId=t.id),e),session:async({session:e,token:t})=>(e.user&&(e.user.role=t.role,e.user.id=t.userId),e)},session:{strategy:"jwt",maxAge:86400},pages:{signIn:"/admin/login"},secret:process.env.NEXTAUTH_SECRET}},90477:(e,t,o)=>{o.d(t,{Bf:()=>g,EC:()=>u,M5:()=>p,Mu:()=>m,PF:()=>f,Py:()=>s,Z3:()=>y,al:()=>i,bG:()=>a,lx:()=>c,oe:()=>l,t2:()=>d});let r=process.env.NEXTAUTH_URL??"https://safehers.africa";function n(e){return`
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
          <a href="${r}/privacy" style="color:#E8B4B8;text-decoration:none;margin-top:4px;display:inline-block;">
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
  `}function i(e){return n(`
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
    <a href="${r}/resources"
       style="display:inline-block;background:#0E0E10;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Visit Resources
    </a>
    <p style="font-size:13px;color:#0E0E10;opacity:0.5;margin-top:40px;">
      Accra, Ghana &amp; Washington, D.C.
    </p>
  `)}function a(e){return n(`
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
    <a href="${r}/admin/contacts"
       style="display:inline-block;margin-top:24px;background:#0E0E10;color:#FAF6EF;
              padding:12px 24px;font-family:monospace;font-size:10px;letter-spacing:0.15em;
              text-transform:uppercase;text-decoration:none;">
      View in Admin
    </a>
  `)}function s(e,t){return n(`
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
  `)}function l(e,t){return n(`
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
  `)}function p(e){return n(`
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
  `)}function c(e){return n(`
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
    <a href="${r}/resources"
       style="display:inline-block;background:#5C1F2E;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Download Free Resources
    </a>
    <p style="font-size:13px;color:#0E0E10;opacity:0.5;margin-top:40px;">
      You subscribed with: ${e}
    </p>
  `)}function d(e){return n(`
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
    <a href="${r}/academy/courses"
       style="display:inline-block;background:#0E0E10;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Browse Courses
    </a>
    <p style="font-size:13px;color:#0E0E10;opacity:0.4;margin-top:32px;">
      Pretty Girl, Save Yourself. — SafeHer Foundation
    </p>
  `)}function u(e,t,o){return n(`
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
    <a href="${r}/academy/courses/${o}"
       style="display:inline-block;background:#5C1F2E;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Start Learning
    </a>
  `)}function f(e,t,o){return n(`
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
    <a href="${r}/certificate/verify/${o}"
       style="display:inline-block;background:#0E0E10;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      View Certificate
    </a>
  `)}function m(e,t){return n(`
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
    <a href="${r}/portal"
       style="display:inline-block;background:#5C1F2E;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Go to Portal
    </a>
  `)}function y(e,t,o){return n(`
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
  `)}function g(e,t,o){return n(`
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
    <a href="${r}/portal/register"
       style="display:inline-block;background:#0E0E10;color:#FAF6EF;padding:14px 32px;
              font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
              text-decoration:none;">
      Join Cohort
    </a>
  `)}},14184:(e,t,o)=>{o.d(t,{u:()=>s});var r=o(11185),n=o.n(r);let i=process.env.MONGODB_URI;i||console.warn("[mongo] MONGODB_URI not set. API routes that need a database will fail. Copy .env.local.example to .env.local and set MONGODB_URI.");let a=global.mongoose??{conn:null,promise:null};async function s(){if(a.conn)return a.conn;if(!i)throw Error("MONGODB_URI not configured");return a.promise||(a.promise=n().connect(i,{bufferCommands:!1}).then(e=>e)),a.conn=await a.promise,a.conn}global.mongoose||(global.mongoose=a)},55091:(e,t,o)=>{o.d(t,{D:()=>c});var r=o(11185),n=o.n(r),i=o(14184);let a=new r.Schema({key:{type:String,required:!0,index:!0},count:{type:Number,default:1},resetAt:{type:Date,required:!0,index:{expires:0}}}),s=r.models.RateLimitEntry||n().model("RateLimitEntry",a),l={default:{max:5,windowMs:36e5},auth:{max:10,windowMs:9e5},register:{max:3,windowMs:36e5},verify:{max:20,windowMs:36e5}},p=new Map;async function c(e,t="default"){let o=l[t]||l.default,r=`${t}:${e}`,n=Date.now();try{await (0,i.u)();let e=await s.findOne({key:r});if(!e||new Date(e.resetAt).getTime()<n)return await s.findOneAndUpdate({key:r},{key:r,count:1,resetAt:new Date(n+o.windowMs)},{upsert:!0}),!0;if(e.count>=o.max)return!1;return await s.updateOne({key:r},{$inc:{count:1}}),!0}catch{let e=p.get(r);if(!e||n>e.resetAt)return p.set(r,{count:1,resetAt:n+o.windowMs}),!0;if(e.count>=o.max)return!1;return e.count++,!0}}},37604:(e,t,o)=>{o.d(t,{MH:()=>a,mk:()=>s});var r=o(75571),n=o(87070),i=o(95456);async function a(...e){let t=await (0,r.getServerSession)(i.L);if(!t?.user?.id)return{authorized:!1,session:null,response:n.NextResponse.json({error:"Authentication required."},{status:401})};let o=t.user.role;return o&&e.includes(o)?{authorized:!0,session:t}:{authorized:!1,session:null,response:n.NextResponse.json({error:"Insufficient permissions."},{status:403})}}async function s(){let e=await (0,r.getServerSession)(i.L);return e?.user?.id?{authorized:!0,session:e}:{authorized:!1,session:null,response:n.NextResponse.json({error:"Authentication required."},{status:401})}}},89332:(e,t,o)=>{o.d(t,{T:()=>l});var r=o(11185),n=o.n(r);let i=new r.Schema({title:{type:String,required:!0},slug:{type:String,required:!0},type:{type:String,enum:["text","video","quiz","activity"],default:"text"},content:{type:String},videoUrl:{type:String},durationMinutes:{type:Number,default:10},order:{type:Number,required:!0},quizQuestions:[{question:{type:String,required:!0},options:[{type:String}],correctIndex:{type:Number,required:!0},explanation:{type:String}}]}),a=new r.Schema({title:{type:String,required:!0},slug:{type:String,required:!0},description:{type:String},order:{type:Number,required:!0},lessons:[i]}),s=new r.Schema({title:{type:String,required:!0},slug:{type:String,required:!0,unique:!0},excerpt:{type:String,required:!0},description:{type:String},category:{type:String,enum:["personal-safety","online-safety","financial-safety","campus-safety","wellbeing"],default:"personal-safety"},level:{type:String,enum:["beginner","intermediate","advanced"],default:"beginner"},durationHours:{type:Number,default:4},modules:[a],coverImage:{type:String},instructor:{type:String,default:"SafeHer Foundation"},isFree:{type:Boolean,default:!0},price:{type:Number,default:0},isPublished:{type:Boolean,default:!1},enrollmentCount:{type:Number,default:0},tags:[{type:String}],prerequisites:[{type:String}],learningOutcomes:[{type:String}],certificateEnabled:{type:Boolean,default:!0},passingScore:{type:Number,default:70}},{timestamps:!0}),l=r.models.Course||n().model("Course",s)},66820:(e,t,o)=>{o.d(t,{I:()=>s});var r=o(11185),n=o.n(r);let i=new r.Schema({lessonId:{type:String,required:!0},completed:{type:Boolean,default:!1},completedAt:{type:Date},quizScore:{type:Number},quizPassed:{type:Boolean}}),a=new r.Schema({user:{type:r.Schema.Types.ObjectId,ref:"User",required:!0},course:{type:r.Schema.Types.ObjectId,ref:"Course",required:!0},status:{type:String,enum:["active","completed","dropped","suspended"],default:"active"},progress:{type:Number,default:0,min:0,max:100},lessonsCompleted:[i],currentModuleIndex:{type:Number,default:0},currentLessonIndex:{type:Number,default:0},enrolledAt:{type:Date,default:Date.now},completedAt:{type:Date},certificate:{type:r.Schema.Types.ObjectId,ref:"Certificate"},scholarship:{type:r.Schema.Types.ObjectId,ref:"Scholarship"}},{timestamps:!0});a.index({user:1,course:1},{unique:!0});let s=r.models.Enrollment||n().model("Enrollment",a)},93330:(e,t,o)=>{o.d(t,{n:()=>a});var r=o(11185),n=o.n(r);let i=new r.Schema({email:{type:String,required:!0,unique:!0,lowercase:!0,trim:!0},passwordHash:{type:String,required:!0},name:{type:String,required:!0,trim:!0},role:{type:String,enum:["beneficiary","educator","consultant","institution_admin","donor","admin","super_admin"],default:"beneficiary"},phone:{type:String,trim:!0},country:{type:String,default:"Ghana"},dateOfBirth:{type:Date},isMinor:{type:Boolean,default:!1},guardianName:{type:String,trim:!0},guardianEmail:{type:String,trim:!0},guardianConsent:{type:Boolean,default:!1},institution:{type:r.Schema.Types.ObjectId,ref:"Institution"},cohort:{type:r.Schema.Types.ObjectId,ref:"Cohort"},bio:{type:String,maxlength:500},avatarUrl:{type:String},isActive:{type:Boolean,default:!0},emailVerified:{type:Boolean,default:!1},lastLoginAt:{type:Date}},{timestamps:!0}),a=r.models.User||n().model("User",i)}};var t=require("../../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[8948,5972,8691,1790,2591],()=>o(1057));module.exports=r})();