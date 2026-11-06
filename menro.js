/* MENRO Agency upgrade layer — حطه في نفس فولدر index.html */
(function(){
const L=document.createElement('link');L.rel='stylesheet';L.href='menro.css';document.head.appendChild(L);
const H24=864e5,pk=a=>a[Math.floor(Math.random()*a.length)];

/* ===== 1) Gemini: ربط المفتاح + إعادة محاولة + موديلات بديلة + Nano Banana ===== */
window.gem=async function(contents,json,model,img){
 const k=((DB.ai||{}).k||'').trim();if(!k)throw new Error('NOKEY');
 let m=model||(DB.ai.m||'gemini-2.5-flash').trim();
 if(!img&&/image/i.test(m))m='gemini-2.5-flash'; // موديلات الصور مش بترجع JSON/نص للميزات العادية
 const chain=img?[m]:[m,...['gemini-2.5-flash','gemini-2.5-flash-lite','gemini-2.0-flash'].filter(x=>x!=m)];
 let err;
 for(const x of chain){for(let n=0;n<2;n++){try{
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+x+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':k},body:JSON.stringify({contents,generationConfig:img?{responseModalities:['TEXT','IMAGE']}:json?{responseMimeType:'application/json'}:{}})});
  const j=await r.json().catch(()=>({}));
  if(!r.ok){const e=new Error((j.error&&j.error.message)||'HTTP '+r.status);e.st=r.status;throw e}
  const p=(((j.candidates||[])[0]||{}).content||{}).parts||[],t=p.map(a=>a.text||'').join(''),im=p.map(a=>a.inlineData||a.inline_data).filter(Boolean)[0];
  if(img)return{t,img:im?'data:'+(im.mimeType||im.mime_type||'image/png')+';base64,'+im.data:''};
  if(!t){const e=new Error('رد فاضي من الموديل');e.st=503;throw e}
  return t;
 }catch(e){err=e;if(e.st==429||e.st==503||e.st==500){await new Promise(r=>setTimeout(r,900));continue}if(e.st==404)break;throw e}}}
 throw err;
};
window.sendCh=async function(){
 const q=v('cm').trim();if(!q)return;if(!aiOn())return noAI();
 const wantImg=/^(\/img|صورة:|ارسم)/.test(q),pic=CHI;CHI=null;
 CH.push({r:'u',t:q,img:pic});CH.push({r:'m',t:'...'});render();scr();
 try{
  if(wantImg){const o=await gem([{role:'user',parts:[{text:q.replace(/^(\/img|صورة:)/,'')},...(pic?[{inline_data:{mime_type:'image/jpeg',data:pic.split(',')[1]}}]:[])]}],0,DB.im||'gemini-2.5-flash-image',1);
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
 try{const j=pj(await ai(`أنت مدير إبداعي في شركة تصميم سوشيال ميديا للمدرسين. اقترح 20 فكرة مختلفة تماماً لبوستات أو أغلفة لمدرس مادة "${t.subject||'عامة'}" اسمه "${t.name}". ${v('ti')?'المطلوب: '+v('ti')+'.':''} كل فكرة فيها: ti عنوان التاسك، br بريف تفصيلي للمصمم (التكوين والألوان والخطوط والعناصر)، tg تاج لاين قصير، po نص البوست. أجب JSON فقط: {"ideas":[{"ti":"","br":"","tg":"","po":""}]}`,[],true));IDS=j.ideas||j;IN=20;paint(t,'ذكاء اصطناعي')}catch(e){$('#ideas').innerHTML='';errAI(e)}};

/* ===== 3) عداد 24 ساعة + إنذار قبل آخر ساعتين ===== */
const drv=t=>String(T(t.teacherId).dr||'').split('\n').map(u=>u.trim()).filter(Boolean).map(u=>`<a class="lk dr" href="${esc(/^https?:/.test(u)?u:'https://'+u)}" target="_blank" rel="noopener">${ic('dr')}<b>درايف صور المدرس · اضغط للفتح</b><span>${esc(u.replace(/^https?:\/\/(www\.)?/,''))}</span></a>`).join('');
const _tc=window.taskCard;
window.taskCard=function(t,M){let h=_tc(t,M);const box=(t.status=='prog'&&t.startAt?`<div class="cd" data-s="${t.startAt}"></div>`:'')+(t.status!='done'&&drv(t)?`<div class="lks">${drv(t)}</div>`:'');return box?h.replace('<p class="sm"><b class="gold">البريف:',()=>box+'<p class="sm"><b class="gold">البريف:'):h};
function tick(){const n=Date.now();document.querySelectorAll('.cd').forEach(e=>{const r=new Date(e.dataset.s).getTime()+H24-n,a=Math.abs(r),f=[a/36e5|0,a/6e4%60|0,a/1e3%60|0].map(x=>String(x|0).padStart(2,'0')).join(':');e.className='cd'+(r<0?' over':r<72e5?' warn':'');e.innerHTML=ic('clock')+' '+(r<0?'عدّى الـ24 ساعة بـ ':'باقي على التسليم ')+'<b>'+f+'</b>'})}
const beep=()=>{try{const c=new AudioContext(),o=c.createOscillator();o.connect(c.destination);o.frequency.value=880;o.start();o.stop(c.currentTime+.5)}catch(e){}};
function chk(){if(!U)return;DB.tasks.forEach(t=>{if(t.status!='prog'||!t.startAt||t.w2)return;if(U.role!='manager'&&t.designerId!=U.id)return;if(new Date(t.startAt).getTime()+H24-Date.now()>72e5)return;
 t.w2=1;save();lg('إنذار: باقي أقل من ساعتين على '+t.title,'clock');beep();try{if(Notification.permission=='granted')new Notification('MENRO Agency',{body:'باقي أقل من ساعتين: '+t.title})}catch(e){}
 const M=U.role=='manager',txt=`إنذار MENRO\nباقي أقل من ساعتين على تاسك: ${t.title}\nالمدرس: ${T(t.teacherId).name}\nالمصمم: ${D(t.designerId).name}`;
 modal(`<h3 style="color:#ff7a7f">${ic('flame')} إنذار: باقي أقل من ساعتين</h3><p>${esc(t.title)} · ${esc(T(t.teacherId).name)}</p><div class="row"><button class="btn" id="cy">${ic('wa')}${M?'أبلغ المصمم':'أبلغ الـ CEO'}</button><button class="btn o" onclick="closeM()">تمام</button></div>`);
 $('#cy').onclick=()=>{closeM();const n=M?num(D(t.designerId).wa):WA;if(n)wa(n,txt);else toast('لا يوجد رقم واتساب')}})}

/* ===== 4) الهوية + الرفرنس لحد 10 + إعدادات Nano Banana ===== */
window.addRefs=function(inp){[...inp.files].slice(0,Math.max(0,10-refBuf.length)).forEach(f=>{const r=new FileReader();r.onload=async()=>{const d=await rsz(r.result,800);if(refBuf.length>=10)return;refBuf.push(d);if(refBuf.length==1)palBuf=await pal(d);$('#rprev').innerHTML=refBuf.map(x=>`<img src="${x}">`).join('')};r.readAsDataURL(f)});if(inp.files.length>10-refBuf.length)toast('الحد الأقصى 10 صور')};
const MD=['gemini-2.5-flash','gemini-2.5-flash-lite','gemini-2.5-pro'],IM=['gemini-2.5-flash-image','gemini-3-pro-image-preview'];
function ext(){document.title='MENRO Agency';
 document.querySelectorAll('.logo').forEach(e=>e.innerHTML='<img class="lgi" src="logo.png" alt="MENRO Agency">');
 document.querySelectorAll('.login .mut').forEach(e=>e.textContent='MENRO Agency · منصة إدارة التصميم');
 const lb=[...document.querySelectorAll('label')].find(l=>l.textContent.includes('رفرنس للمصمم'));if(lb)lb.innerHTML=ic('img')+' رفرنس للمصمم (لحد 10 صور)';
 const m=$('#am');if(m&&m.tagName=='SELECT'){const a=DB.ai||{};m.outerHTML=`<input id="am" list="ml" value="${esc(a.m||MD[0])}" style="direction:ltr"><datalist id="ml">${MD.map(x=>`<option value="${x}">`).join('')}</datalist><label>موديل الصور (Nano Banana) · اكتب اسم أي موديل صور من AI Studio</label><input id="aim" list="il" value="${esc(DB.im||IM[0])}" style="direction:ltr" oninput="DB.im=this.value.trim();save()"><datalist id="il">${IM.map(x=>`<option value="${x}">`).join('')}</datalist><p class="sm mut">في المساعد الذكي ابدأ رسالتك بـ <b>صورة:</b> عشان يولّد صورة.</p>`}
 const c=$('#cm');if(c)c.placeholder='اكتب سؤالك... (لتوليد صورة ابدأ بـ: صورة: )'}
const _r=window.render;
window.render=function(){_r();ext();tick();try{if(U&&window.Notification&&Notification.permission=='default')Notification.requestPermission()}catch(e){}};
setInterval(tick,1000);setInterval(chk,30000);setTimeout(chk,2000);
render();
})();
