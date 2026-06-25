3:I[4707,[],""]
5:I[6423,[],""]
6:I[1178,["2972","static/chunks/2972-15b09189618e9269.js","5726","static/chunks/5726-172a97a4ddf93918.js","521","static/chunks/521-90c898ebcc0faa33.js","6736","static/chunks/6736-bfef6ccfdcbd4f1f.js","3185","static/chunks/app/layout-840516ffb318979b.js"],"default"]
7:I[376,["2972","static/chunks/2972-15b09189618e9269.js","7601","static/chunks/app/error-69e9bae81abcec27.js"],"default"]
8:I[2972,["2972","static/chunks/2972-15b09189618e9269.js","9160","static/chunks/app/not-found-744353c9867c5a47.js"],""]
4:["slug","setting-up-two-factor-authentication","d"]
0:["mUZnaPBou1EbR9tyF78t2",[[["",{"children":["blog",{"children":[["slug","setting-up-two-factor-authentication","d"],{"children":["__PAGE__?{\"slug\":\"setting-up-two-factor-authentication\"}",{}]}]}]},"$undefined","$undefined",true],["",{"children":["blog",{"children":[["slug","setting-up-two-factor-authentication","d"],{"children":["__PAGE__",{},[["$L1","$L2",null],null],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","blog","children","$4","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","blog","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/cdc9671e5cdf3b87.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"en","children":["$","body",null,{"className":"grain","children":["$","$L6",null,{"children":["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$7","errorStyles":[],"errorScripts":[],"template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":["$","div",null,{"className":"min-h-screen flex flex-col items-center justify-center px-6 text-center","children":[["$","p",null,{"className":"eyebrow mb-6 text-burgundy","children":"Error 404"}],["$","h1",null,{"className":"display text-[clamp(5rem,20vw,16rem)] font-light leading-none text-ink/10 mb-4","children":"404"}],["$","p",null,{"className":"display text-3xl mb-4","children":["Page not"," ",["$","span",null,{"className":"display-italic text-burgundy","children":"found"}]]}],["$","p",null,{"className":"body-prose text-ink/60 max-w-md mb-12","children":"The page you are looking for does not exist or may have moved. Let us help you find what you need."}],["$","div",null,{"className":"flex flex-wrap gap-4 justify-center","children":[["$","$L8",null,{"href":"/","className":"bg-ink text-cream px-8 py-3 eyebrow hover:bg-burgundy transition-colors","children":"Go Home"}],["$","$L8",null,{"href":"/services","className":"border border-ink px-8 py-3 eyebrow hover:bg-ink hover:text-cream transition-colors","children":"Our Programs"}],["$","$L8",null,{"href":"/contact","className":"border border-ink px-8 py-3 eyebrow hover:bg-ink hover:text-cream transition-colors","children":"Contact"}]]}],["$","div",null,{"className":"mt-20 text-ink/20 display text-9xl font-light select-none pointer-events-none","children":"✦"}]]}],"notFoundStyles":[]}]}]}]}]],null],null],["$L9",null]]]]
a:I[1333,["2972","static/chunks/2972-15b09189618e9269.js","308","static/chunks/app/blog/%5Bslug%5D/page-8340f7e86ff554eb.js"],"default"]
b:T1126,<p>If someone gets hold of your password — whether through a data breach, phishing, or shoulder surfing — two-factor authentication (2FA) is the last line of defence standing between them and your account. It is free, it takes less than five minutes to set up, and security researchers consistently identify it as one of the highest-impact individual security improvements you can make.</p>
<p>This guide explains what 2FA is, the different types available, and exactly how to enable it on the accounts that matter most.</p>
<hr>
<h2>What Is Two-Factor Authentication?</h2>
<p>Authentication answers the question: "Are you really who you say you are?" Traditionally this is done with a password — something you know. Two-factor authentication adds a second layer: something you have (your phone) or something you are (your fingerprint).</p>
<p>Even if an attacker has your password, without the second factor they cannot log in. It is that simple, and that powerful.</p>
<hr>
<h2>Types of Two-Factor Authentication</h2>
<p>Not all 2FA is equally secure. Here they are ranked from weakest to strongest:</p>
<h3>1. SMS OTP (weakest, but far better than nothing)</h3>
<p>A one-time code is sent to your phone by text message. The weakness is SIM swap attacks (see our mobile money fraud article). However, SMS 2FA is still significantly better than no 2FA.</p>
<h3>2. Email OTP</h3>
<p>A code is sent to your email. Only as secure as your email account — make sure your email itself has 2FA enabled first.</p>
<h3>3. Authenticator App (recommended)</h3>
<p>An app on your phone generates a new 6-digit code every 30 seconds based on a secret key. Even if an attacker intercepts your network, they cannot capture useful codes. Popular apps: <strong>Google Authenticator</strong>, <strong>Authy</strong>, <strong>Microsoft Authenticator</strong>.</p>
<h3>4. Hardware Security Key (strongest)</h3>
<p>A physical USB or NFC key that you plug in or tap to authenticate. Virtually impossible to phish remotely. Best for high-value accounts. Example: YubiKey.</p>
<p><strong>Our recommendation for most people: start with an authenticator app. Install Authy (it supports backups) or Google Authenticator.</strong></p>
<hr>
<h2>How to Enable 2FA on Key Accounts</h2>
<h3>Google / Gmail</h3>
<ol>
<li>Go to myaccount.google.com</li>
<li>Select Security > 2-Step Verification</li>
<li>Click "Get Started" and follow the prompts</li>
<li>Choose "Authenticator App" when given options</li>
<li>Scan the QR code with your authenticator app</li>
<li>Enter the 6-digit code to confirm</li>
</ol>
<p><strong>Save your backup codes in a secure location offline.</strong></p>
<h3>WhatsApp</h3>
<ol>
<li>Open WhatsApp > Settings > Account > Two-Step Verification</li>
<li>Tap "Enable" and create a 6-digit PIN</li>
<li>Add a recovery email address</li>
<li>Confirm your PIN</li>
</ol>
<h3>Instagram</h3>
<ol>
<li>Go to your profile > Menu (three lines) > Settings > Security</li>
<li>Tap "Two-Factor Authentication" > "Get Started"</li>
<li>Choose "Authentication App" for best security</li>
</ol>
<h3>Facebook</h3>
<ol>
<li>Settings > Security and Login > Two-Factor Authentication</li>
<li>Click "Edit" and choose your preferred method</li>
<li>Follow the setup prompts</li>
</ol>
<h3>Mobile Banking Apps</h3>
<p>Check your bank's app settings under "Security" or "Profile". Most major African banks now support OTP-based 2FA for transactions. Enable it and register your primary phone number.</p>
<hr>
<h2>What to Do When You Get a New Phone</h2>
<p>This is where many people lose access to their accounts. Before switching devices:</p>
<ol>
<li>Transfer your authenticator app codes (Authy has a built-in transfer feature; Google Authenticator now supports export).</li>
<li>Note your backup codes for all accounts — store them offline.</li>
<li>Deactivate your old device's authentication before factory resetting it.</li>
</ol>
<hr>
<h2>The Golden Rule</h2>
<p><strong>If you only do one thing after reading this:</strong> enable 2FA on your primary email account. Your email is the master key to almost every other account you have. If someone controls your email, they can reset every other password. Protect it first.</p>
<hr>
<p><em>Published by SafeHers. Cybersecurity basics are covered in our Online Safety curriculum module. Contact us to arrange training for your organisation.</em></p>
2:["$","$La",null,{"post":{"slug":"setting-up-two-factor-authentication","title":"Setting Up Two-Factor Authentication: A Beginner's Guide","excerpt":"Two-factor authentication is one of the most powerful free tools available to protect your accounts. This beginner-friendly guide walks you through setting it up on every platform that matters.","date":"2026-03-28","author":"SafeHers Team","authorTitle":"SafeHers Digital Safety Unit","category":"Cybersecurity","readingTime":4,"featured":false,"content":"$b"},"related":[{"slug":"phone-spyware-detection-guide","title":"How to Check Your Phone for Spy Apps","excerpt":"A step-by-step guide to detecting spyware and stalkerware on your Android or iPhone. Protect your privacy from intimate partner surveillance and malicious apps.","date":"2026-04-15","author":"DK Cyber","authorTitle":"Co-Founder, SafeHer Foundation","category":"Cybersecurity","readingTime":2,"featured":false}]}]
9:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"charSet":"utf-8"}],["$","title","2",{"children":"Setting Up Two-Factor Authentication: A Beginner's Guide — SafeHer Foundation"}],["$","meta","3",{"name":"description","content":"Two-factor authentication is one of the most powerful free tools available to protect your accounts. This beginner-friendly guide walks you through setting it up on every platform that matters."}],["$","meta","4",{"name":"keywords","content":"SafeHer Foundation,SafeHers movement,Pretty Girl Save Yourself,women safety education Africa,girls safety training Ghana,digital safety for women,online safety Ghana,women empowerment Africa,financial literacy women Africa,personal safety training,cybersecurity women Ghana,pan-African women foundation"}],["$","meta","5",{"property":"og:title","content":"Setting Up Two-Factor Authentication: A Beginner's Guide"}],["$","meta","6",{"property":"og:description","content":"Two-factor authentication is one of the most powerful free tools available to protect your accounts. This beginner-friendly guide walks you through setting it up on every platform that matters."}],["$","meta","7",{"property":"og:type","content":"article"}],["$","meta","8",{"property":"article:published_time","content":"2026-03-28"}],["$","meta","9",{"property":"article:author","content":"SafeHers Team"}],["$","meta","10",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","11",{"name":"twitter:title","content":"Setting Up Two-Factor Authentication: A Beginner's Guide"}],["$","meta","12",{"name":"twitter:description","content":"Two-factor authentication is one of the most powerful free tools available to protect your accounts. This beginner-friendly guide walks you through setting it up on every platform that matters."}]]
1:null
