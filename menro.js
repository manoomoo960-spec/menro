/* MENRO Agency upgrade layer — حطه في نفس فولدر index.html */
(function(){
const L=document.createElement('link');L.rel='stylesheet';L.href='menro.css';document.head.appendChild(L);
const H24=864e5,pk=a=>a[Math.floor(Math.random()*a.length)];

/* ===== 1) Gemini: ربط المفتاح + إعادة محاولة + موديلات بديلة + Nano Banana ===== */
const gk=()=>{const k=((DB.ai||{}).k||'').trim();return k=='-'?'':k};
let ML=null,MK='';
async function mlist(){const k=gk();if(!k)return[];if(ML&&MK==k)return ML;try{const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=200',{headers:{'x-goog-api-key':k}});const j=await r.json();if(!r.ok)return[];ML=(j.models||[]).filter(m=>(m.supportedGenerationMethods||[]).includes('generateContent')).map(m=>m.name.replace('models/',''));MK=k;return ML}catch(e){return[]}}
const ver=n=>+((n.match(/gemini-(\d+(?:\.\d+)?)/)||[])[1]||0),pv=n=>/preview|exp/.test(n)?1:0,lt=n=>/lite/.test(n)?1:0;
const txtM=l=>l.filter(n=>/^gemini-/.test(n)&&/flash/.test(n)&&!/image|tts|live|audio|embed|robotics|computer|native|thinking/.test(n)).sort((a,b)=>pv(a)-pv(b)||ver(b)-ver(a)||lt(a)-lt(b));
const imgM=l=>l.filter(n=>/gemini/.test(n)&&/image/.test(n)&&!/tts|live|audio/.test(n)).sort((a,b)=>pv(a)-pv(b)||ver(b)-ver(a));
window.gem=async function(contents,json,model,img){
 const k=gk();if(!k)throw new Error('NOKEY');
 const L=await mlist(),has=n=>!L.length||L.includes(n)||/latest/.test(n);
 let m=(model||(img?'':((DB.ai||{}).m||'gemini-flash-latest'))).trim();if(!img&&/image/i.test(m))m='';
 const chain=[...new Set((img?[m,...imgM(L),...(L.length?[]:['gemini-2.5-flash-image'])]:[m,'gemini-flash-latest',...txtM(L).slice(0,3),'gemini-flash-lite-latest']).filter(x=>x&&has(x)))];
 if(!chain.length)throw new Error('مفيش موديل متاح للمفتاح ده، جرّب تحدّث قائمة الموديلات من الإعدادات');
 let first=null,last=null;
 for(const x of chain){for(let n=0;n<2;n++){try{
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+x+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':k},body:JSON.stringify({contents,generationConfig:img?{responseModalities:['TEXT','IMAGE']}:json?{responseMimeType:'application/json'}:{}})});
  const j=await r.json().catch(()=>({}));
  if(!r.ok){const e=new Error((j.error&&j.error.message)||'HTTP '+r.status);e.st=r.status;throw e}
  const p=(((j.candidates||[])[0]||{}).content||{}).parts||[],t=p.map(a=>a.text||'').join(''),im=p.map(a=>a.inlineData||a.inline_data).filter(Boolean)[0];
  if(img)return{t,img:im?'data:'+(im.mimeType||im.mime_type||'image/png')+';base64,'+im.data:''};
  if(!t){const e=new Error('رد فاضي من الموديل');e.st=503;throw e}
  return t;
 }catch(e){last=e;if(e.st==404||/no longer available|not found|not supported/i.test(e.message))break;if(e.st==429||e.st==503||e.st==500){first=first||e;await new Promise(r=>setTimeout(r,900));continue}throw e}}}
 throw first||last;
};
window.sendCh=async function(){
 const q=v('cm').trim();if(!q)return;if(!aiOn())return noAI();
 const wantImg=/^(\/img|صورة:|ارسم)/.test(q),pic=CHI;CHI=null;
 CH.push({r:'u',t:q,img:pic});CH.push({r:'m',t:'...'});render();scr();
 try{
  if(wantImg){const o=await gem([{role:'user',parts:[{text:q.replace(/^(\/img|صورة:)/,'')},...(pic?[{inline_data:{mime_type:'image/jpeg',data:pic.split(',')[1]}}]:[])]}],0,DB.im||'',1);
   if(!o.img)throw new Error('الموديل ماردش بصورة، جرّب وصف أوضح أو غيّر موديل الصور من الإعدادات');
   CH[CH.length-1]={r:'m',t:o.t||'تم توليد الصورة',img:o.img}}
  else{const h=CH.slice(0,-1).map(m=>({role:m.r=='u'?'user':'model',parts:[{text:m.t},...(m.img&&m.r=='u'?[{inline_data:{mime_type:'image/jpeg',data:m.img.split(',')[1]}}]:[])]}));
   CH[CH.length-1].t=await gem([{role:'user',parts:[{text:'أنت مساعد إبداعي لوكالة تصميم جرافيك عربية اسمها MENRO Agency. جاوب بالعربية المصرية البسيطة وبشكل عملي ومختصر.'}]},{role:'model',parts:[{text:'تمام'}]},...h])}
 }catch(e){CH.pop();errAI(e)}
 render();scr();
};

/* ===== 2) أفكار كتير (٣٢٠ فكرة مولّدة، بتتعرض ٢٠ ٢٠) ===== */
const XK=[['بوست تهنئة بالأوائل','شبكة أسماء ونتائج الأوائل مع كأس وتاج'],['بوست حجز مقعد','عدد المقاعد المتبقية بعداد وزر احجز الآن'],['بوست آراء الطلاب','اقتباس من طالب مع صورته ونجوم تقييم'],['بوست خصم لفترة محدودة','شريط خصم وعد تنازلي'],['بوست جدول الحصص','جدول أسبوعي نظيف بلون لكل يوم'],['بوست تعريف بالمدرس','صورة كبيرة وسنوات الخبرة وإنجازاته'],['بوست سؤال وجواب','سؤال تفاعلي مع خيارات والإجابة في الكومنت'],['بوست اقتباس تحفيزي','اقتباس بخط كبير وخلفية هادئة'],['غلاف فيديو شرح','ثمنيل بوجه المدرس وعنوان الدرس بخط ضخم'],['بوست ملخص درس','ملخص بنقاط مرتبة بأيقونات'],['بوست خريطة ذهنية','خريطة ذهنية ملونة للدرس'],['بوست اختبار قصير','اختبار من 3 أسئلة مع مؤقت'],['بوست إعلان مذكرة','غلاف المذكرة بشكل 3D مع السعر'],['بوست مناسبة','تهنئة بمناسبة مع هوية المدرس'],['بوست بداية الترم','ترحيب بالطلاب وموعد أول حصة'],['بوست مراجعة نهائية','ماراثون مراجعة بجدول زمني'],['بوست أخطاء شائعة','الأخطاء الشائعة في الامتحان وكيف تتجنبها'],['بوست قبل وبعد','تطور مستوى طالب بمقارنة درجات'],['بوست كواليس','صورة من داخل الحصة بلمسة عفوية'],['ستوري إعلان','ستوري عمودي بزر اسحب لأعلى'],['كوفر صفحة فيسبوك','غلاف بانورامي بالمدرس والمادة وأرقام التواصل'],['بوست إجابات نموذجية','نماذج إجابة بشكل مرتب'],['بوست تحدي الأسبوع','تحدي بجائزة رمزية وهاشتاج'],['بوست أرقام الإنجاز','إنجازات المدرس بأرقام كبيرة (طلاب/نتائج/سنين)']];
const ANG=['بخط عربي ضخم','بستايل نيون','بستايل مينيمال','بستايل ذهبي فخم','بتصميم كارتوني','بخلفية متدرجة','بتصميم ثلاثي الأبعاد','بستايل مجلة','بشكل كولاج','بستايل ريترو'];
const TG=['ابدأ صح','خليك مميز','تفوقك يبدأ هنا','استعد للقمة','ذاكر بذكاء','حصة تغيّر مستواك','معانا للدرجة النهائية','ثقة وتفوق','بداية جديدة','خطوة ورا خطوة للنجاح'];
let IT=null,IN=20;
function paint(t,sn){const e=$('#ideas');if(!e)return;e.innerHTML=`<div class="mut sm" style="margin-bottom:6px">${sn?'المادة: '+esc(sn):'أفكار عامة'} · <b class="gold">${IDS.length}</b> فكرة (معروض ${Math.min(IN,IDS.length)})</div><div class="ilist">`+IDS.slice(0,IN).map((x,i)=>`<div class="idea"><div><b>${esc(x.ti)}</b><span class="mut sm">${esc(x.tg)}${x.st?' · '+esc(x.st):''}</span></div><button type="button" class="btn o s" onclick="useIdea(${i})">${ic('plus')}استخدم</button></div>`).join('')+'</div>'+(IN<IDS.length?`<button type="button" class="btn s" style="margin-top:8px" onclick="moreI()">${ic('plus')}عرض المزيد</button>`:'');IT=[t,sn]}
window.moreI=()=>{IN+=20;paint(IT[0],IT[1])};
window.genIdeas=function(){const t=T(v('tt'));if(!t.id)return toast('أضف مدرس أولاً');const s=SUB.find(x=>new RegExp(x[0],'i').test(t.subject||'')),S=s?s[1]:GEN,all=[];
 KINDS.concat(XK).forEach(k=>ANG.forEach(a=>{const tg=pk(S.tg.concat(TG));all.push({ti:k[0]+' - '+S.n,br:`${k[1]}.\nالستايل: ${a}.\nعناصر مقترحة: ${S.el}.\nالألوان: ${S.cl}.\nالمدرس: ${t.name}.`,tg,po:`${tg} مع ${t.name}${t.subject?' - مادة '+t.subject:''}`,st:a})}));
 IDS=all.sort(()=>Math.random()-.5);IN=20;paint(t,s?S.n:'')};
window.aiIdeas=async function(){const t=T(v('tt'));if(!t.id)return toast('أضف مدرس أولاً');if(!aiOn())return noAI();$('#ideas').innerHTML='<span class="mut"><i class="spin"></i>جاري توليد 20 فكرة...</span>';
 try{const j=pj(await ai(`أنت مدير إبداعي في شركة تصميم سوشيال ميديا للمدرسين. اقترح 20 فكرة مختلفة تماماً لبوستات أو أغلفة لمدرس مادة "${t.subject||'عامة'}" اسمه "${t.name}". ${v('ti')?'المطلوب: '+v('ti')+'.':''} ${v('occ')?'المناسبة: '+v('occ')+'.':''} كل فكرة فيها: ti عنوان التاسك، br بريف تفصيلي للمصمم (التكوين والألوان والخطوط والعناصر)، tg تاج لاين قصير، po نص البوست. أجب JSON فقط: {"ideas":[{"ti":"","br":"","tg":"","po":""}]}`,[],true));IDS=j.ideas||j;IN=20;paint(t,'ذكاء اصطناعي')}catch(e){$('#ideas').innerHTML='';errAI(e)}};

/* ===== 3) عداد 24 ساعة + إنذار قبل آخر ساعتين ===== */
const links=t=>[...new Set(String(t.drv||'').split('\n').concat(String(T(t.teacherId).dr||'').split('\n')).map(u=>u.trim()).filter(Boolean))].map(u=>/^https?:/.test(u)?u:'https://'+u);
const drv=t=>links(t).map(u=>`<a class="lk dr" href="${esc(u)}" target="_blank" rel="noopener">${ic('dr')}<b>افتح درايف صور المدرس</b><span>${esc(u.replace(/^https?:\/\/(www\.)?/,''))}</span></a>`).join('');
const _tc=window.taskCard;
window.taskCard=function(t,M){let h=_tc(t,M);const box=(t.status=='prog'&&t.startAt?`<div class="cd" data-s="${t.startAt}"></div>`:'')+(t.size||t.rev?`<p class="sm">${t.size?`<b class="gold">المقاس:</b> ${esc(t.size)} `:''}${t.rev?`<span class="bd urgent">تعديل رقم ${t.rev}</span>`:''}</p>`:'')+(t.status!='done'&&drv(t)?`<div class="lks">${drv(t)}</div>`:'');
 if(M&&t.status=='done')h=h.replace('<button class="btn r s" onclick="delT(',()=>`<button class="btn o s" onclick="revise('${t.id}')">${ic('undo')}طلب تعديل</button><button class="btn r s" onclick="delT(`);
 return box?h.replace('<p class="sm"><b class="gold">البريف:',()=>box+'<p class="sm"><b class="gold">البريف:'):h};
function tick(){const n=Date.now();document.querySelectorAll('.cd').forEach(e=>{const r=new Date(e.dataset.s).getTime()+H24-n,a=Math.abs(r),f=[a/36e5|0,a/6e4%60|0,a/1e3%60|0].map(x=>String(x|0).padStart(2,'0')).join(':');e.className='cd'+(r<0?' over':r<72e5?' warn':'');e.innerHTML=ic('clock')+' '+(r<0?'عدّى الـ24 ساعة بـ ':'باقي على التسليم ')+'<b>'+f+'</b>'})}
const beep=()=>{try{const c=new AudioContext(),o=c.createOscillator();o.connect(c.destination);o.frequency.value=880;o.start();o.stop(c.currentTime+.5)}catch(e){}};
function chk(){if(!U)return;DB.tasks.forEach(t=>{if(t.status!='prog'||!t.startAt||t.w2)return;if(U.role!='manager'&&t.designerId!=U.id)return;if(new Date(t.startAt).getTime()+H24-Date.now()>72e5)return;
 t.w2=1;save();lg('إنذار: باقي أقل من ساعتين على '+t.title,'clock');beep();try{if(Notification.permission=='granted')new Notification('MENRO Agency',{body:'باقي أقل من ساعتين: '+t.title})}catch(e){}
 const M=U.role=='manager',txt=`إنذار MENRO\nباقي أقل من ساعتين على تاسك: ${t.title}\nالمدرس: ${T(t.teacherId).name}\nالمصمم: ${D(t.designerId).name}`;
 modal(`<h3 style="color:#ff7a7f">${ic('flame')} إنذار: باقي أقل من ساعتين</h3><p>${esc(t.title)} · ${esc(T(t.teacherId).name)}</p><div class="row"><button class="btn" id="cy">${ic('wa')}${M?'أبلغ المصمم':'أبلغ الـ CEO'}</button><button class="btn o" onclick="closeM()">تمام</button></div>`);
 $('#cy').onclick=()=>{closeM();const n=M?num(D(t.designerId).wa):WA;if(n)wa(n,txt);else toast('لا يوجد رقم واتساب')}})}

/* ===== 4) الهوية + الرفرنس لحد 10 + إعدادات Nano Banana ===== */
window.addRefs=function(inp){[...inp.files].slice(0,Math.max(0,10-refBuf.length)).forEach(f=>{const r=new FileReader();r.onload=async()=>{const d=await rsz(r.result,800);if(refBuf.length>=10)return;refBuf.push(d);if(refBuf.length==1)palBuf=await pal(d);$('#rprev').innerHTML=refBuf.map(x=>`<img src="${x}">`).join('')};r.readAsDataURL(f)});if(inp.files.length>10-refBuf.length)toast('الحد الأقصى 10 صور')};
const MD=['gemini-flash-latest','gemini-flash-lite-latest','gemini-pro-latest'],IM=['gemini-2.5-flash-image','gemini-3-pro-image-preview'];
function ext(){document.title='MENRO Agency';
 document.querySelectorAll('.logo').forEach(e=>e.innerHTML='<img class="lgi" src="logo.png" alt="MENRO Agency">');
 document.querySelectorAll('.login .mut').forEach(e=>e.textContent='MENRO Agency · منصة إدارة التصميم');
 const lb=[...document.querySelectorAll('label')].find(l=>l.textContent.includes('رفرنس للمصمم'));if(lb)lb.innerHTML=ic('img')+' رفرنس للمصمم (لحد 10 صور)';
 const m=$('#am');if(m&&m.tagName=='SELECT'){const a=DB.ai||{};m.outerHTML=`<input id="am" list="ml" value="${esc(a.m||MD[0])}" style="direction:ltr"><datalist id="ml">${MD.map(x=>`<option value="${x}">`).join('')}</datalist><label>موديل الصور (Nano Banana) · اكتب اسم أي موديل صور من AI Studio</label><input id="aim" list="il" value="${esc(DB.im||'')}" placeholder="تلقائي: أحدث موديل صور متاح" style="direction:ltr" oninput="DB.im=this.value.trim();save()"><datalist id="il">${IM.map(x=>`<option value="${x}">`).join('')}</datalist><p class="sm mut">في المساعد الذكي ابدأ رسالتك بـ <b>صورة:</b> عشان يولّد صورة.</p>`}
 const c=$('#cm');if(c)c.placeholder='اكتب سؤالك... (لتوليد صورة ابدأ بـ: صورة: )'}
const _r=window.render;
window.render=function(){fixK();_r();ext();tick();try{if(U&&window.Notification&&Notification.permission=='default')Notification.requestPermission()}catch(e){}};
setInterval(tick,1000);setInterval(chk,30000);setTimeout(chk,2000);
/* ===== 5) مقاس + درايف لكل تاسك + طلب تعديل + شاشة تفاصيل كبيرة ===== */
const SZ=['بوست مربع 1080×1080','بوست طولي 1080×1350','ستوري / ريلز 1080×1920','ثمنيل يوتيوب 1280×720','غلاف فيسبوك 820×312','بانر 1920×600','حسب البريف'];
const _ad=window.addT;
window.addT=function(){const sz=v('tsz'),dv=v('tdrv').trim(),n=DB.tasks.length;_ad();if(DB.tasks.length>n){const t=DB.tasks[DB.tasks.length-1];t.size=sz;t.drv=dv;save();render()}};
window.notifyD=function(id){const t=DB.tasks.find(x=>x.id==id),d=D(t.designerId);if(!num(d.wa))return toast('لا يوجد رقم واتساب للمصمم');const dr=links(t);
 wa(num(d.wa),`تاسك جديد من MENRO Agency\nالمدرس: ${T(t.teacherId).name}\nالعنوان: ${t.title}\n${t.size?'المقاس: '+t.size+'\n':''}التسليم: ${t.due}\nالأولوية: ${pri[t.priority]}\n${dr.length?'درايف صور المدرس:\n'+dr.join('\n')+'\n':''}الرابط: ${location.href.split('#')[0]}#task-${t.id}`)};
window.revise=function(id){ask('اكتب التعديلات المطلوبة على التصميم',x=>{x=x.trim();if(!x)return;const t=DB.tasks.find(y=>y.id==id);t.status='prog';t.startAt=new Date().toISOString();t.w2=0;delete t.doneAt;t.rev=(t.rev||0)+1;(t.notes=t.notes||[]).push({by:U.name,txt:'طلب تعديل: '+x,date:new Date().toISOString()});lg('طلب تعديل على '+t.title,'undo');save();render();
 const n=num(D(t.designerId).wa);if(n)wa(n,`طلب تعديل من MENRO Agency\nالتاسك: ${t.title}\nالتعديلات: ${x}\nالمهلة: 24 ساعة من الآن\nالرابط: ${location.href.split('#')[0]}#task-${t.id}`);else toast('تم فتح التاسك للتعديل')})};
function openT(id){const t=DB.tasks.find(x=>x.id==id);if(!t||!U)return;const te=T(t.teacherId),M=U.role=='manager',dr=links(t),sec=(n,b)=>b?`<div class="dsec"><h4>${n}</h4>${b}</div>`:'',A=[];
 if(!M&&t.status=='new')A.push(`<button class="btn" onclick="closeM();start('${id}')">${ic('play')}ابدأ التنفيذ</button>`);
 if(!M&&t.status!='done')A.push(`<button class="btn" style="background:linear-gradient(90deg,#2fbf71,#6ee7a8)" onclick="closeM();conf('تأكيد إنجاز التاسك؟',()=>finish('${id}'))">${ic('tk')}تم الإنجاز</button>`,`<button class="btn o" onclick="closeM();sel='${id}';go('upload')">${ic('up')}ارفع الشغل</button>`);
 if(M&&t.status!='done')A.push(`<button class="btn o" onclick="closeM();notifyD('${id}')">${ic('wa')}أبلغ المصمم</button>`);
 if(M&&t.status=='done')A.push(`<button class="btn o" onclick="closeM();revise('${id}')">${ic('undo')}طلب تعديل</button>`);
 A.push(`<button class="btn o" onclick="closeM();noteT('${id}')">${ic('chat')}ملاحظة</button>`,`<button class="btn o" onclick="closeM();cpB('${id}')">${ic('log')}نسخ البريف</button>`);
 modal(`<div class="dh"><div class="row">${av(te.photo,te.name,1)}<div style="flex:1;min-width:0"><h2 class="gold" style="margin:0">${esc(t.title)}</h2><div class="mut">${esc(te.name)}${te.subject?' · '+esc(te.subject):''}${M?' · المصمم: '+esc(D(t.designerId).name):''}</div></div></div>
 <div class="row" style="flex-wrap:wrap;margin-top:10px"><span class="bd ${t.status=='done'?'done':t.status=='prog'?'prog':t.priority}">${t.status=='done'?st.done:t.status=='prog'?st.prog:pri[t.priority]}</span><span class="bd normal">${fd(t.due)}</span>${t.size?`<span class="bd normal">${esc(t.size)}</span>`:''}${t.rev?`<span class="bd urgent">تعديل رقم ${t.rev}</span>`:''}</div>${t.status=='prog'&&t.startAt?`<div class="cd" data-s="${t.startAt}"></div>`:''}<p class="sm" style="margin:8px 0 0">${dl(t)}</p></div>`
 +sec('البريف',`<p class="dbig">${esc(t.brief)||'—'}</p>`)+sec('التاج لاين',t.tagline&&`<p class="dbig">${esc(t.tagline)}</p>`)+sec('نص البوست',t.post&&`<p class="dbig">${esc(t.post)}</p>`)
 +sec('درايف صور المدرس',dr.length?dr.map(u=>`<a class="dbtn" href="${esc(u)}" target="_blank" rel="noopener">${ic('dr')}<span><b>افتح درايف صور المدرس</b><small>${esc(u.replace(/^https?:\/\/(www\.)?/,''))}</small></span></a>`).join(''):'<p class="mut">مفيش رابط درايف للمدرس ده. اطلب من الـ CEO يضيفه.</p>')
 +sec('الرفرنس',(t.refs||[]).length&&`<div class="dgal">${t.refs.map(r=>`<img src="${r}" onclick="zoom(this.src)">`).join('')}</div>${(t.pal||[]).length?`<div class="pal">${t.pal.map(c=>`<i style="background:${c}"></i>`).join('')}</div>`:''}`)
 +sec('ملاحظات',(t.notes||[]).length&&t.notes.map(n=>`<p class="sm nt">${ic('chat')}<b>${esc(n.by)}:</b> ${esc(n.txt)}</p>`).join(''))
 +`<div class="dact">${A.join('')}<button class="btn o" onclick="closeM()">إغلاق</button></div>`);
 const m=document.querySelector('.mdl');if(m)m.classList.add('big');tick()}
document.addEventListener('click',e=>{const c=e.target.closest('.card[id^="t-"]');if(c&&!e.target.closest('button,a,input,select,textarea,img,.zoom'))openT(c.id.slice(2))});
const _ext=ext;
ext=function(){_ext();
 const tg=$('#tg');if(tg&&!$('#tsz')){const g=tg.closest('.two');if(g)g.insertAdjacentHTML('beforebegin',`<label>المقاس</label><select id="tsz">${SZ.map(x=>`<option>${x}</option>`).join('')}</select><label>رابط درايف خاص بالتاسك (اختياري، يتضاف لرابط المدرس)</label><textarea id="tdrv" style="min-height:56px;direction:ltr"></textarea>`)}
 const lb=[...document.querySelectorAll('label')].find(l=>l.textContent.includes('رابط درايف صور المدرس'));if(lb&&!lb.dataset.h){lb.dataset.h=1;lb.innerHTML+=' <span style="color:var(--gold)">· خلّي الصلاحية: Anyone with the link (Viewer) علشان المصمم يفتحه</span>'}};

/* ===== 6) قائمة مراجعة + نسخ نصوص + كابشن AI + نسخ ألوان + Esc + تنبيه الدرايف ===== */
const CK=['المقاس مطابق للمطلوب','الإملاء والنصوص مراجعة','اللوجو وبيانات التواصل موجودة','الألوان والخطوط حسب البريف','الجودة عالية من غير تكسير','التصميم مختلف عن الرفرنس'];
window.cpT=function(x){const f=()=>{const a=document.createElement('textarea');a.value=x;a.style.cssText='position:fixed;opacity:0';document.body.appendChild(a);a.select();try{document.execCommand('copy');toast('تم النسخ')}catch(e){toast('تعذر النسخ')}a.remove()};try{navigator.clipboard.writeText(x).then(()=>toast('تم النسخ'),f)}catch(e){f()}};
window.cpTx=id=>{const t=DB.tasks.find(y=>y.id==id);cpT([t.tagline&&'التاج لاين: '+t.tagline,t.post&&'البوست: '+t.post].filter(Boolean).join('\n'))};
window.ckT=(id,i,on)=>{const t=DB.tasks.find(y=>y.id==id),s=new Set(t.ck||[]);on?s.add(i):s.delete(i);t.ck=[...s];save();const e=document.getElementById('ckn');if(e)e.textContent=t.ck.length+'/'+CK.length};
window.capAI=function(id){if(!aiOn())return noAI();const t=DB.tasks.find(y=>y.id==id),te=T(t.teacherId);aiShow('كابشن وهاشتاجات',`اكتب بالعربية المصرية لبوست فيسبوك للمدرس "${te.name}" مادة ${te.subject||'-'}. العنوان: ${t.title}. ${t.post?'نص البوست: '+t.post+'.':''} ${t.brief?'البريف: '+t.brief+'.':''} المطلوب: 3 كابشنات مختلفة (قصير، متوسط، تحفيزي) مع إيموجي مناسب، ثم 15 هاشتاج مناسب.`)};
const _ot=openT;
openT=function(id){_ot(id);const t=DB.tasks.find(x=>x.id==id),d=document.querySelector('.mdl .dact');if(!t||!d)return;
 const ck=t.status!='done'?`<div class="dsec"><h4>قائمة المراجعة قبل التسليم <span id="ckn" class="bd normal">${(t.ck||[]).length}/${CK.length}</span></h4>${CK.map((x,i)=>`<label class="ckl"><input type="checkbox" ${(t.ck||[]).includes(i)?'checked':''} onchange="ckT('${id}',${i},this.checked)">${x}</label>`).join('')}</div>`:'';
 d.insertAdjacentHTML('beforebegin',ck);
 d.insertAdjacentHTML('afterbegin',(t.tagline||t.post?`<button class="btn o" onclick="cpTx('${id}')">${ic('log')}نسخ التاج لاين والبوست</button>`:'')+`<button class="btn o" onclick="capAI('${id}')">${ic('bulb')}كابشن وهاشتاجات</button>`);
 document.querySelectorAll('.mdl .pal i').forEach(i=>{const m=(i.getAttribute('style')||'').match(/#[0-9a-f]{6}/i);if(m){i.style.cursor='pointer';i.title='اضغط لنسخ '+m[0];i.onclick=()=>cpT(m[0])}})};
document.addEventListener('keydown',e=>{if(e.key=='Escape'){const z=[...document.querySelectorAll('.zoom')].pop();if(z)z.remove()}});
const _ad2=window.addT;
window.addT=function(){const n=DB.tasks.length;_ad2();if(DB.tasks.length>n&&!links(DB.tasks[DB.tasks.length-1]).length)setTimeout(()=>toast('تنبيه: مفيش رابط درايف للمدرس ده، ضيفه علشان المصمم يلاقي الصور'),1800)};

/* ===== 7) موديلات تتحدث تلقائي + 15 إضافة ===== */
['<meta name="theme-color" content="#09090a">','<link rel="icon" href="logo.png">','<link rel="apple-touch-icon" href="logo.png">'].forEach(h=>document.head.insertAdjacentHTML('beforeend',h));
let FD='',FT='';
window.sFD=x=>{FD=x;tl()};window.sFT=x=>{FT=x;tl()};
window.tl=function(){const el=$('#tl');if(!el)return;const x=DB.tasks.slice().reverse().filter(t=>(flt=='all'||(flt=='late'?late(t):flt=='urgent'?(t.priority=='urgent'&&t.status!='done'):flt=='today'?(t.status!='done'&&left(t)==0):t.status==flt))&&(!FD||t.designerId==FD)&&(!FT||t.teacherId==FT)&&(!q||(t.title+T(t.teacherId).name+D(t.designerId).name).toLowerCase().includes(q.toLowerCase())));el.innerHTML=x.map(t=>taskCard(t,1)).join('')||'<p class="mut">لا توجد تاسكات.</p>'};
const slen=()=>{try{return(localStorage.getItem('bemro')||'').length}catch(e){return 0}};
window.cleanRefs=()=>conf('مسح صور الرفرنس من التاسكات المسلّمة لتوفير مساحة؟',()=>{DB.tasks.forEach(t=>{if(t.status=='done'){delete t.refs;delete t.pal}});save();render();toast('تم تنظيف المساحة')});
window.testAlert=()=>{beep();try{if(window.Notification){Notification.requestPermission().then(p=>{if(p=='granted')new Notification('MENRO Agency',{body:'تجربة الإنذار شغالة'})})}}catch(e){}toast('تجربة الإنذار: لو سمعت الصوت يبقى شغال')};
window.refModels=async()=>{ML=null;const l=await mlist();toast(l.length?'تم التحديث: '+l.length+' موديل متاح':'تعذر جلب الموديلات، راجع المفتاح');ext()};
window.dlBk=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([v('bk')],{type:'application/json'}));a.download='menro-backup-'+new Date().toISOString().slice(0,10)+'.json';a.click()};
window.ldBk=i=>{const f=i.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{$('#bk').value=r.result;toast('اضغط استرجاع لتأكيد الاستعادة')};r.readAsText(f)};
const _bk=backup;backup=function(){_bk();const r=document.querySelector('.mdl .row');if(r)r.insertAdjacentHTML('afterbegin',`<button class="btn o" onclick="dlBk()">${ic('up')}تنزيل ملف</button><label class="btn o">رفع ملف<input type="file" accept=".json" hidden onchange="ldBk(this)"></label>`)};
const _stm=stmt;stmt=function(id){_stm(id);const m=document.querySelector('.mdl');if(m)m.insertAdjacentHTML('beforeend',`<button class="btn o" style="margin-inline-start:8px" onclick="cpT(this.parentNode.innerText.replace(/إغلاق|نسخ كشف الحساب/g,'').trim())">نسخ كشف الحساب</button>`)};
const _ot2=openT;openT=function(id){_ot2(id);const d=document.querySelector('.mdl .dact');if(d)d.insertAdjacentHTML('afterbegin',`<button class="btn o" onclick="cpT(location.href.split('#')[0]+'#task-${id}')">${ic('log')}نسخ رابط التاسك</button>`)};
function chk2(){if(!U||U.role=='manager')return;DB.tasks.forEach(t=>{if(t.designerId!=U.id||t.status!='new'||t.w3||left(t)>1)return;t.w3=1;save();beep();toast('تذكير: تاسك "'+t.title+'" لسه ما اتبدأش وموعده قرب');try{if(Notification.permission=='granted')new Notification('MENRO Agency',{body:'تاسك لسه ما اتبدأش: '+t.title})}catch(e){}})}
setInterval(chk2,60000);setTimeout(chk2,3000);
const _ext2=ext;
ext=function(){_ext2();
 if(U){const n=DB.tasks.filter(t=>t.status!='done'&&(U.role=='manager'||t.designerId==U.id)).length;document.title=(n?'('+n+') ':'')+'MENRO Agency'}
 const ch=[...document.querySelectorAll('.chips')].find(c=>c.textContent.includes('متأخر'));if(ch&&!ch.querySelector('[data-td]'))ch.insertAdjacentHTML('beforeend',`<button class="chip ${flt=='today'?'on':''}" data-td="1" onclick="setF('today')">النهاردة</button>`);
 const tle=$('#tl');if(tle&&!$('#fdd'))tle.insertAdjacentHTML('beforebegin',`<div class="two" style="margin:10px 0"><select id="fdd" onchange="sFD(this.value)"><option value="">كل المصممين</option>${DB.designers.map(d=>`<option value="${d.id}" ${FD==d.id?'selected':''}>${esc(d.name)}</option>`).join('')}</select><select id="ftt" onchange="sFT(this.value)"><option value="">كل المدرسين</option>${DB.teachers.map(d=>`<option value="${d.id}" ${FT==d.id?'selected':''}>${esc(d.name)}</option>`).join('')}</select></div>`);
 const sm=$('#smo');if(sm&&!$('#stg')){const L=slen(),p=Math.min(100,Math.round(L/5e4));sm.closest('.card').insertAdjacentHTML('afterend',`<div class="card" id="stg" style="max-width:560px;margin-top:16px"><h3>${ic('dr')} المساحة والأدوات</h3><div class="sc"><i style="width:${p}%"></i></div><p class="sm mut">المساحة المستخدمة ${p}% من حد المتصفح التقريبي</p><div class="row" style="flex-wrap:wrap"><button class="btn o s" onclick="cleanRefs()">تنظيف رفرنس المسلّم</button><button class="btn o s" onclick="refModels()">تحديث قائمة الموديلات</button><button class="btn o s" onclick="testAlert()">اختبار الإنذار</button></div></div>`)}
 if(U&&U.role=='manager'&&slen()>3.8e6&&!$('#stw')){const h=document.querySelector('.hi');if(h)h.insertAdjacentHTML('afterend',`<div class="card ban" id="stw">${ic('flame')}<b>مساحة التخزين قربت تخلص</b><button class="btn o s" onclick="backup()">خذ نسخة</button><button class="btn o s" onclick="cleanRefs()">نظّف الرفرنس</button></div>`)}
 if($('#ml'))mlist().then(l=>{const a=$('#ml'),b=$('#il');if(a)a.innerHTML=MD.concat(txtM(l)).map(x=>`<option value="${x}">`).join('');if(b)b.innerHTML=imgM(l).concat(IM).map(x=>`<option value="${x}">`).join('')});
 document.querySelectorAll('#cb .msg.m').forEach(m=>{if(!m.querySelector('.cpb')&&m.textContent.trim()!='...'){const b=document.createElement('button');b.className='btn o s cpb';b.textContent='نسخ';b.onclick=()=>cpT((m.querySelector('span')||m).textContent);m.appendChild(b)}})};

/* ===== 8) ChatGPT للنصوص والأفكار والبريف (Gemini للصور فقط) + 10 إضافات ===== */
let OL=null,OK='';
function fixK(){DB.ai=DB.ai||{};if(((DB.oa||{}).k||'').trim()&&!(DB.ai.k||'').trim())DB.ai.k='-'}
document.addEventListener('click',()=>setTimeout(fixK,0));
async function olist(){const k=((DB.oa||{}).k||'').trim();if(!k)return[];if(OL&&OK==k)return OL;try{const r=await fetch('https://api.openai.com/v1/models',{headers:{Authorization:'Bearer '+k}});const j=await r.json();if(!r.ok)return[];OL=(j.data||[]).map(x=>x.id);OK=k;return OL}catch(e){return[]}}
const ov=n=>+((n.match(/^gpt-(\d+(?:\.\d+)?)/)||[])[1]||0);
const rk=x=>/^gpt-4[\w.-]*mini$/.test(x)?0:/mini/.test(x)?1:2;
const oaM=l=>l.filter(n=>/^gpt-/.test(n)&&!/audio|realtime|image|transcribe|tts|search|instruct|embedding|moderation|codex|chat-latest|-\d{4}-\d{2}-\d{2}$|-\d{4}$/.test(n)).sort((a,b)=>rk(a)-rk(b)||ov(b)-ov(a));
const oerr=(st,j)=>st==401?'مفتاح ChatGPT غير صحيح، راجعه من platform.openai.com':st==429?(((j.error||{}).code=='insufficient_quota')?'رصيد حساب OpenAI خلص، اشحن من صفحة الفواتير':'ضغط على ChatGPT، استنى دقيقة وجرّب تاني'):st==404?'موديل ChatGPT غير متاح، حدّث قائمة الموديلات':'خطأ ChatGPT: '+String((j.error||{}).message||st).slice(0,60);
const toOA=c=>c.map(m=>{const r=m.role=='model'?'assistant':'user',p=m.parts||[],im=p.filter(x=>x.inline_data||x.inlineData),tx=p.map(x=>x.text).filter(Boolean).join('\n');if(!im.length)return{role:r,content:tx};return{role:r,content:[{type:'text',text:tx},...im.map(x=>{const d=x.inline_data||x.inlineData;return{type:'image_url',image_url:{url:'data:'+(d.mime_type||d.mimeType||'image/jpeg')+';base64,'+d.data}}})]}});
async function oai(msgs,json){const o=DB.oa||{},k=(o.k||'').trim(),custom=!!(o.u||'').trim()&&!/api\.openai\.com/.test(o.u),u=(custom?o.u.trim():'https://api.openai.com/v1').replace(/\/$/,'');
 const L=custom?[]:await olist();let chain=custom?[(o.m||'').trim()]:[...new Set([(o.m||'').trim(),...oaM(L).slice(0,3)].filter(x=>x&&(!L.length||L.includes(x))))];if(!chain.filter(Boolean).length)chain=['gpt-4o-mini'];
 let last;
 for(const m of chain){try{
  const r=await fetch(u+'/chat/completions',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+k},body:JSON.stringify({model:m,messages:json?[{role:'system',content:'Respond with a valid JSON object only.'},...msgs]:msgs,...(json?{response_format:{type:'json_object'}}:{})})});
  const j=await r.json().catch(()=>({}));
  if(!r.ok){const e=new Error(oerr(r.status,j));e.st=r.status;throw e}
  const t=(((j.choices||[])[0]||{}).message||{}).content;if(!t){const e=new Error('رد فاضي من ChatGPT');e.st=503;throw e}return t
 }catch(e){last=e;if(e.st==404||e.st==503||e.st==500)continue;throw e}}
 throw last}
const gem0=window.gem;
window.gem=async function(contents,json,model,img){if(!img&&((DB.oa||{}).k||'').trim()){try{return await oai(toOA(contents),json)}catch(e){if(!gk())throw e}}return gem0(contents,json,model,img)};
window.testOA=async()=>{try{const r=await oai([{role:'user',content:'رد بكلمة واحدة فقط: تمام'}],0);toast('ChatGPT شغال ✓ '+r.slice(0,20))}catch(e){errAI(e)}};
const _rm=window.refModels;window.refModels=async()=>{OL=null;await olist();return _rm()};
const _bk2=backup;backup=function(){_bk2();try{const o=JSON.parse($('#bk').value);delete o.oa;$('#bk').value=JSON.stringify(o)}catch(e){}const cy=$('#cy');if(cy&&cy.onclick){const f=cy.onclick,oa=DB.oa,im=DB.im;cy.onclick=()=>{f();if(oa)DB.oa=oa;if(im)DB.im=im;save()}}};
window.dd=n=>new Date(Date.now()+n*864e5).toISOString().slice(0,10);
window.aiT=function(id,k){if(!aiOn())return noAI();const t=DB.tasks.find(y=>y.id==id),te=T(t.teacherId),b=`التاسك: ${t.title}. المدرس: ${te.name} (${te.subject||'-'}). المقاس: ${t.size||'حسب البريف'}. البريف: ${t.brief||'-'}. التاج لاين: ${t.tagline||'-'}. نص البوست: ${t.post||'-'}.`;
 aiShow(k=='p'?'خطة التنفيذ':'فهّمني البريف',(k=='p'?'أنت مصمم خبير. اكتب بالعربية المصرية خطة تنفيذ بخطوات مرتبة مع تقدير وقت لكل خطوة والإجمالي، ونقاط تدقيق قبل التسليم. ':'اشرح للمصمم هذا البريف بالعربية المصرية ببساطة: المطلوب بالظبط، العناصر الإجبارية، وأي نقص أو غموض لازم يسأل عنه الـ CEO. ')+b)};
window.msgD=async function(id){if(!aiOn())return noAI();const t=DB.tasks.find(y=>y.id==id),d=D(t.designerId);modal('<h3>رسالة للمصمم</h3><p class="mut sm"><i class="spin"></i>جاري الكتابة...</p>');
 try{const o=await ai(`اكتب رسالة واتساب قصيرة ومحترمة بالعربية المصرية من الـ CEO للمصمم "${d.name}" يسأله عن حالة تاسك "${t.title}" للمدرس ${T(t.teacherId).name} موعده ${t.due}${late(t)?' وهو متأخر':''}. اكتب الرسالة فقط.`);
  modal(`<h3>رسالة للمصمم</h3><textarea id="bk" style="direction:rtl;font-size:14px">${esc(o)}</textarea><div class="row"><button class="btn" id="cy">${ic('wa')}فتح واتساب</button><button class="btn o" onclick="closeM()">إغلاق</button></div>`);
  $('#cy').onclick=()=>{const n=num(d.wa);if(!n)return toast('لا يوجد رقم واتساب للمصمم');wa(n,v('bk'))}}catch(e){closeM();errAI(e)}};
window.sumAI=function(){if(!aiOn())return noAI();const L=DB.tasks.filter(t=>t.status!='done').map(t=>`- ${t.title} | ${T(t.teacherId).name} | ${D(t.designerId).name} | ${pri[t.priority]} | تسليم ${t.due}${late(t)?' (متأخر)':''}${t.rev?' | تعديل '+t.rev:''}`).join('\n')||'لا يوجد';
 aiShow('ملخص اليوم',`أنت مساعد مدير لوكالة تصميم. اكتب بالعربية المصرية ملخصاً تنفيذياً لليوم: أهم الأولويات، المتأخر، حمل كل مصمم، وتوصية بإعادة التوزيع لو فيه ضغط. التاسكات المفتوحة:\n${L}\nتم تسليمه هذا الشهر: ${DB.tasks.filter(t=>t.status=='done'&&mk(t.doneAt)==thisM).length}`)};
window.dict=function(){const R=window.SpeechRecognition||window.webkitSpeechRecognition;if(!R)return toast('المتصفح ده مش بيدعم الإملاء الصوتي');const r=new R();r.lang='ar-EG';r.onresult=e=>{$('#tb').value=($('#tb').value+' '+e.results[0][0].transcript).trim();toast('تمت إضافة الكلام للبريف')};r.onerror=()=>toast('تعذر الإملاء الصوتي');try{r.start();toast('اتكلم دلوقتي...')}catch(e){toast('تعذر بدء الميكروفون')}};
const _ot3=openT;openT=function(id){_ot3(id);const t=DB.tasks.find(x=>x.id==id),d=document.querySelector('.mdl .dact');if(!t||!d||!U)return;
 const M=U.role=='manager';d.insertAdjacentHTML('afterbegin',(!M&&t.status!='done'?`<button class="btn o" onclick="aiT('${id}','e')">${ic('bulb')}فهّمني البريف</button><button class="btn o" onclick="aiT('${id}','p')">${ic('clock')}خطة وتقدير وقت</button>`:'')+(M&&t.status!='done'?`<button class="btn o" onclick="msgD('${id}')">${ic('wa')}رسالة تذكير للمصمم</button>`:''))};
const _ad3=window.addT;window.addT=function(){const sh=v('tb').trim().length<15,n=DB.tasks.length;_ad3();if(DB.tasks.length>n&&sh)setTimeout(()=>toast('تنبيه: البريف قصير، ضيف تفاصيل علشان المصمم'),1000)};
const OCC=['بداية الترم','قبل الامتحانات','نتائج الطلاب','رمضان','عيد','يوم المعلم','عودة للمدارس','الإجازة الصيفية'],CQ=['اكتب جدول محتوى أسبوعي لمدرس','رد على استفسار ولي أمر','عناوين جذابة لحصة مراجعة','إعلان لحجز مقاعد','رسالة تهنئة بالنتيجة'];
const _ext3=ext;
ext=function(){_ext3();
 const o=DB.oa||{},gc=[...document.querySelectorAll('.card h3')].find(h=>h.textContent.includes('Gemini من جوجل'));
 if(gc){gc.innerHTML=gc.innerHTML.replace('Gemini من جوجل','Gemini من جوجل (للصور فقط)');if(!$('#oac'))gc.closest('.card').insertAdjacentHTML('beforebegin',`<div class="card" id="oac" style="max-width:560px;margin-top:16px"><h3>${ic('bulb')} ChatGPT (الأساسي للنصوص والأفكار والبريف) ${(o.k||'').trim()?'<span class="bd done">مفتاح محفوظ</span>':'<span class="bd low">غير مفعّل</span>'}</h3><p class="sm mut">حساب ChatGPT المجاني على الموقع مالوش مفتاح API. المفتاح بيتعمل من platform.openai.com وبيشتغل برصيد صغير. تقدر كمان تحط رابط مزوّد متوافق (Groq / OpenRouter) في الحقل الأخير.</p><label>مفتاح OpenAI</label><input id="oak" type="password" value="${esc(o.k)}" placeholder="sk-..." style="direction:ltr" oninput="DB.oa=DB.oa||{};DB.oa.k=this.value.trim();save()"><label>الموديل (اختياري، الافتراضي تلقائي)</label><input id="oam" list="oal" value="${esc(o.m)}" placeholder="تلقائي" style="direction:ltr" oninput="DB.oa=DB.oa||{};DB.oa.m=this.value.trim();save()"><datalist id="oal"></datalist><label>رابط API (اختياري لمزوّد متوافق)</label><input id="oau" value="${esc(o.u)}" placeholder="https://api.openai.com/v1" style="direction:ltr" oninput="DB.oa=DB.oa||{};DB.oa.u=this.value.trim();save()"><button class="btn" onclick="testOA()">${ic('check')}اختبار ChatGPT</button><p class="sm mut">المفتاح بيتخزن في متصفحك فقط، واستخدم مفتاح بحد صرف منخفض.</p></div>`)}
 const ak=$('#ak');if(ak&&ak.value=='-')ak.value='';
 if($('#oal'))olist().then(l=>{const e=$('#oal');if(e)e.innerHTML=oaM(l).map(x=>`<option value="${x}">`).join('')});
 const h1=[...document.querySelectorAll('h1.gold')].find(h=>h.textContent.includes('(Gemini)'));if(h1)h1.textContent='المساعد الذكي (ChatGPT)';
 const cc=[...document.querySelectorAll('.chips')].find(c=>c.textContent.includes('اكتب كابشن لبوست'));if(cc&&!cc.querySelector('[data-q]'))cc.insertAdjacentHTML('beforeend',CQ.map(q=>`<button class="chip" data-q="${q}" onclick="$('#cm').value=this.dataset.q;sendCh()">${q}</button>`).join(''));
 const ids=$('#ideas');if(ids&&!$('#occ'))ids.insertAdjacentHTML('beforebegin',`<select id="occ" style="margin-top:8px"><option value="">مناسبة للأفكار بالذكاء الاصطناعي (اختياري)</option>${OCC.map(x=>`<option>${x}</option>`).join('')}</select>`);
 const lb=[...document.querySelectorAll('label')].find(l=>l.textContent.trim().startsWith('البريف والوصف'));if(lb&&!$('#mic'))lb.insertAdjacentHTML('afterend',`<div><button type="button" class="btn o s" id="mic" onclick="dict()">🎤 إملاء صوتي</button></div>`);
 const td=$('#tdue');if(td&&!$('#dq'))td.insertAdjacentHTML('afterend',`<div class="chips" id="dq">${[['النهاردة',0],['بكرة',1],['بعد 3 أيام',3],['أسبوع',7]].map(x=>`<button type="button" class="chip" onclick="$('#tdue').value=dd(${x[1]})">${x[0]}</button>`).join('')}</div>`);
 const dh=[...document.querySelectorAll('.bar h1')].find(h=>h.textContent.includes('لوحة التحكم'));if(dh&&!$('#sumb'))dh.parentNode.insertAdjacentHTML('beforeend',`<button class="btn s" id="sumb" onclick="sumAI()">${ic('bulb')}ملخص اليوم</button>`);
 if(U&&U.role!='manager'&&view=='tasks'){const c=document.querySelector('.main .grid .card[id^="t-"]');if(c&&!c.classList.contains('dn')&&!c.querySelector('.fcl')){c.classList.add('focus');c.insertAdjacentHTML('afterbegin','<p class="fcl gold sm" style="margin:0 0 8px"><b>ابدأ بالتاسك ده أولاً</b></p>')}}};

render();
})();
