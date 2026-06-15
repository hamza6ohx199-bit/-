// App State
const state = {
    currentSurah: 1,
    currentAyahIndex: 0,
    playingState: false,
    activeTab: 'mushaf-tab',
    tashkeelEnabled: true,
    reciteModeEnabled: false,
    
    // Guided Hifth Session
    hifthSession: {
        surah: 1,
        ayahIndex: 0,
        step: 1,
        readCount: 0
    },
    
    // Playback Settings
    audioRepeatMode: '1', // '1', '3', '5', '10', 'loop'
    audioRepeatCountRemaining: 1,
    sectionRepeatEnabled: false,
    sectionStart: 1, // Number in Surah
    sectionEnd: 7,   // Number in Surah
    
    // User Hifth Progress (Loaded from LocalStorage)
    // Format: { "surah_ayah": "learning" | "memorized" | "review" | "none" }
    hifthProgress: {},
    
    // Daily Streak Tracker
    streak: 0,
    lastActiveDate: null,
    
    // Active Surah Data in memory
    activeSurahText: null, // quran-uthmani
    activeSurahTafsir: null, // ar.muyassar
    activeAyahs: [], // combined { number, text, tafsir, numberInSurah }
    
    // Notification setup
    notifTime: '20:00',
    notifEnabled: false
};

// Prophets Stories Database
const PROPHETS_DATABASE = [
    {
        id: "adam",
        name: "سيدنا آدم عليه السلام",
        title: "أبو البشرية وأول الأنبياء",
        surahs: [2, 7, 15, 17, 18, 20],
        videoUrl: "https://www.youtube.com/embed/K841w4Rk5tU",
        summary: `
            <h4>خلق آدم عليه السلام واستخلافه في الأرض</h4>
            <p>أخبر الله سبحانه وتعالى ملائكته بأنه سيخلق بشراً خليفة في الأرض، فأمرهم بالسجود له سجود تشريف وتكريم بعد أن ينفخ فيه من روحه. خلقه الله بيده من طين وعلمه الأسماء كلها، فسجد الملائكة جميعاً إلا إبليس أبى واستكبر وكان من الكافرين بسبب كبره وغروره، فلعنه الله وطرده من رحمته.</p>
            
            <h4>السكن في الجنة والمعصية ثم التوبة</h4>
            <p>خلق الله حواء لتسكن مع آدم في الجنة، وأباح الله لهما كل ثمار الجنة ونعيمها إلا شجرة واحدة نهاهما عن الأكل منها. فوسوس لهما إبليس بالخلود وملك لا يبلى حتى أكلا منها، فبدت لهما سوآتهما وطفقا يخصفان عليهما من ورق الجنة. تدارك آدم وحواء خطأهما بالاستغفار والتوبة، فتاب الله عليهما وأهبطهما إلى الأرض لتبدأ الخلافة البشرية وصراعهما مع الشيطان.</p>
            
            <h4>أهم الدروس المستفادة:</h4>
            <ul>
                <li>خطر الكبر والغرور وهو الذنب الذي أخرج إبليس من الجنة.</li>
                <li>التوبة والاستغفار هما طوق النجاة للمؤمن بعد المعصية.</li>
                <li>العداوة الأبدية بين الإنسان والشيطان والتحذير من وسوسته.</li>
            </ul>
        `
    },
    {
        id: "nuh",
        name: "سيدنا نوح عليه السلام",
        title: "شيخ المرسلين وصاحب السفينة",
        surahs: [7, 11, 21, 26, 37, 71],
        videoUrl: "https://www.youtube.com/embed/z4a1C1i47w0",
        summary: `
            <h4>الدعوة الطويلة والصبر العظيم</h4>
            <p>أرسل الله نوحاً عليه السلام إلى قومه بعد أن عبدوا الأصنام، فلبث فيهم ألف سنة إلا خمسين عاماً يدعوهم إلى عبادة الله وحده ليلاً ونهاراً، سراً وعلانية. واجه قومه دعوته بالسخرية والاستكبار ووضعوا أصابعهم في آذانهم واستغشوا ثيابهم، ولم يؤمن معه إلا قليل من المستضعفين.</p>
            
            <h4>بناء السفينة والطوفان العظيم</h4>
            <p>أوحى الله إلى نوح بصنع السفينة بأعين الله ووحيه، وكان يمر عليه ملأ من قومه فيسخرون منه لعدم وجود بحر أو نهر قريب. وعندما جاء أمر الله وفار التنور، أمر الله نوحاً أن يحمل فيها من كل زوجين اثنين وأهله إلا من سبق عليه القول والمؤمنين. انهمرت أمواج الطوفان كالجبال وأغرقت الأرض ومن عليها، بما فيهم زوجة نوح وابنه الكافر الذي رفض الصعود للسفينة، ورست السفينة بسلام على جبل الجودي.</p>
            
            <h4>أهم الدروس المستفادة:</h4>
            <ul>
                <li>الصبر واليقين وحسن التوكل على الله في الدعوة ومواجهة الصعاب.</li>
                <li>رابطة العقيدة والإيمان أسمى وأقوى من رابطة الدم والنسب (نجاة المؤمنين وغرق ابن نوح الكافر).</li>
                <li>نصر الله حتمي وجنوده في السماوات والأرض ينصرون أولياءه.</li>
            </ul>
        `
    },
    {
        id: "ibrahim",
        name: "سيدنا إبراهيم عليه السلام",
        title: "خليل الله وأبو الأنبياء",
        surahs: [2, 3, 6, 9, 11, 14, 15, 19, 21, 26, 29, 37, 43, 60],
        videoUrl: "https://www.youtube.com/embed/PpllTfLwY3k",
        summary: `
            <h4>محاججة قومه وتحطيم الأصنام</h4>
            <p>ولد إبراهيم عليه السلام في مجتمع يعبد الكواكب والأصنام، فهداه الله بفطرته السليمة، وحاج قومه بالعقل والمنطق في بطلان عبادة الكواكب. دعا والده آزر بلطف ومحبة لكنه أبى، فقام إبراهيم بتحطيم أصنام قومه الكبيرة وترك كبيرهم لعلهم يسألونه. غضب قومه وقرروا الانتقام منه بإلقائه في نار عظيمة، فأمر الله النار: "يا نار كوني برداً وسلاماً على إبراهيم" فخرج منها سالماً.</p>
            
            <h4>الابتلاءات الكبرى وبناء الكعبة</h4>
            <p>هاجر إبراهيم مع زوجته سارة وابن أخيه لوط، وابتلاه الله بذبح ابنه الوحيد إسماعيل، فلما أسلما وتله للجبين فداه الله بذبح عظيم. ثم أمره الله ببناء بيت الله الحرام بمكة بمساعدة إسماعيل ورفع القواعد، وأذن في الناس بالحج ليأتوه من كل فج عميق.</p>
            
            <h4>أهم الدروس المستفادة:</h4>
            <ul>
                <li>الاستسلام المطلق لأوامر الله والرضا بقضائه يورث النجاة والكرامة.</li>
                <li>استخدام الحوار العقلي والمنطق في توضيح الحق للناس.</li>
                <li>فضل الدعاء والبر بالوالدين والصبر على أذاهم.</li>
            </ul>
        `
    },
    {
        id: "yusuf",
        name: "سيدنا يوسف عليه السلام",
        title: "الصديق ونبي الصبر والتمكين",
        surahs: [12],
        videoUrl: "https://www.youtube.com/embed/5F_C2E_H1W4",
        summary: `
            <h4>المؤامرة والإلقاء في الجب</h4>
            <p>رأى يوسف في منامه أحد عشر كوكباً والشمس والقمر له ساجدين، فقصها على والده يعقوب الذي حذره من إخبار إخوته. وبسبب الغيرة، تآمر إخوته عليه وألقوه في قاع البئر (الجب) وجاءوا أباهم بدم كذب على قميصه. عثرت عليه قافلة وباعته بثمن بخس في مصر لـ "عزيز مصر" الذي أكرم مثواه.</p>
            
            <h4>الابتلاء بالفتنة والسجن ثم التمكين</h4>
            <p>ابتلي يوسف بفتنة امرأة العزيز، فاستعصم بالله واختار السجن على المعصية. في السجن عبر الرؤى للمسجونين، ثم عبر رؤيا ملك مصر عن السنين السبع العجاف، فخرج مكرمًا وعُين وزيراً للخزانة والتموين. وبسبب القحط، جاء إخوته يطلبون الميرة فعرفهم وهم له منكرون، وتدرج معهم حتى كشف عن هويته وسامحهم، وجمع الله شمله بوالديه وسجدوا له كما رأى في طفولته.</p>
            
            <h4>أهم الدروس المستفادة:</h4>
            <ul>
                <li>عاقبة الصبر والتقوى والاستعصام عن المعاصي هي التمكين والرفعة.</li>
                <li>العفو عند المقدرة والصفح الجميل (قوله لإخوته: لا تثريب عليكم اليوم).</li>
                <li>تدبير الله نافذ، والابتلاء مقدمة للتمكين.</li>
            </ul>
        `
    },
    {
        id: "musa",
        name: "سيدنا موسى عليه السلام",
        title: "كليم الله وقاهر الفراعنة",
        surahs: [2, 7, 10, 18, 20, 26, 27, 28, 40, 43],
        videoUrl: "https://www.youtube.com/embed/O-L20wHek34",
        summary: `
            <h4>النشأة في قصر فرعون والهجرة</h4>
            <p>ولد موسى عليه السلام في عام قتل المواليد الذكور، فألهم الله أمه بوضعه في تابوت وإلقائه في النيل، فحمله الموج لقصر فرعون وتبنته زوجته آسية الصالحة. كبر موسى وخرج من مصر خائفاً بعد قتله لـ قبطي خطأً، وتوجه لمدين وتزوج ابنة الشيخ الصالح ورعى الأغنام عشر سنين.</p>
            
            <h4>الرسالة، المعجزات والعبور العظيم</h4>
            <p>كلمه الله في جبل الطور وكلفه بالذهاب لفرعون ومطالبته بإطلاق بني إسرائيل، وأيده بمعجزات العصا التي تتحول لأفعى واليد البيضاء. واجه موسى فرعون وسحرته فآمن السحرة برب موسى وهارون. وفي النهاية، فر موسى بقومه فتبعهم فرعون وجنوده، فأمر الله موسى بضرب البحر بعصاه فانفلق وعبر المؤمنون وأغرق الله فرعون وجنوده في اليم.</p>
            
            <h4>أهم الدروس المستفادة:</h4>
            <ul>
                <li>الله يحمي أولياءه في عرين أعدائهم (نشأة موسى في قصر فرعون).</li>
                <li>الحق ينتصر على الباطل مهما كانت قوة الباطل وزينته (انتصار المعجزات على السحر).</li>
                <li>اليقين بنصر الله (قول موسى: كلا إن معي ربي سيهدين).</li>
            </ul>
        `
    },
    {
        id: "sulayman",
        name: "سيدنا سليمان عليه السلام",
        title: "الملك النبي المسخر له الجن والريح",
        surahs: [2, 21, 27, 34, 38],
        videoUrl: "https://www.youtube.com/embed/Pj1C4XN_j9k",
        summary: `
            <h4>النعم العظيمة وتسخير الكون</h4>
            <p>ورث سليمان والده داود عليهما السلام في النبوة والملك، ودعا الله أن يهب له ملكاً لا ينبغي لأحد من بعده. فاستجاب الله له وسخر له الريح تجري بأمره، وعلمه منطق الطير والحيوانات، وسخر له الجن يعملون بين يديه محاريب وتماثيل وجفان كالجواب، وأسال له عين القطر (النحاس المذاب).</p>
            
            <h4>الهدهد وملكة سبأ (بلقيس)</h4>
            <p>تفقد سليمان الطير فلاحظ غياب الهدهد، وعند رجوعه أخبره بوجود مملكة سبأ باليمن يعبدون الشمس ولهم ملكة عظيمة العرش. أرسل سليمان كتاباً يدعوهم للإسلام فرفضوا وأرسلوا له هدية فرفضها. ثم أمر بإحضار عرشها فجاء به الذي عنده علم من الكتاب في رفة عين. ولما رأت بلقيس الصرح الممرد من قوارير ظنته لجة وكشفت عن ساقيها، وأسلمت مع سليمان لله رب العالمين.</p>
            
            <h4>أهم الدروس المستفادة:</h4>
            <ul>
                <li>الشكر الدائم لله على النعم الكبيرة واستخدام القوة والملك في نشر السلام والدعوة.</li>
                <li>التنظيم الإداري والمتابعة الدقيقة للرعية والجنود (تفقد الطير).</li>
                <li>قوة العلم تفوق أي قوة مادية (إحضار العرش برمشة عين بالعلم).</li>
            </ul>
        `
    },
    {
        id: "yunus",
        name: "سيدنا يونس عليه السلام",
        title: "ذو النون ونبي الصبر والتسبيح",
        surahs: [10, 21, 37, 68],
        videoUrl: "https://www.youtube.com/embed/D3c83g92H9A",
        summary: `
            <h4>الخروج المغاضب وركوب السفينة</h4>
            <p>أرسل الله يونس عليه السلام لقرية نينوى بالعراق ليدعوهم لله، فلما استمروا في عنادهم وكفرهم يئس منهم وغادر القرية مغاضباً دون إذن من الله. ركب يونس سفينة في البحر ولما تعرضت لأمواج عاتية شارفوا على الغرق، فاقترعوا لتخفيف الحمولة ووقعت القرعة على يونس ثلاث مرات، فألقى بنفسه في البحر.</p>
            
            <h4>في بطن الحوت العظيم والنجاة</h4>
            <p>أرسل الله حوتاً عظيماً ابتلع يونس دون أن يكسر له عظماً أو يخدش له لحماً. وفي ظلمات البحر وبطن الحوت نادى يونس ربه بتضرع ويقين: "لا إله إلا أنت سبحانك إني كنت من الظالمين". فاستجاب الله لدعائه وأمر الحوت فقذفه بالعرين (الشاطئ) وهو سقيم، وأنبت عليه شجرة من يقطين، ورجع لقومه فوجدهم قد آمنوا تائبين فمتعهم الله إلى حين.</p>
            
            <h4>أهم الدروس المستفادة:</h4>
            <ul>
                <li>التسبيح والذكر والاستغفار ينجي الإنسان من أشد الكروب والهموم.</li>
                <li>لا يجب الاستعجال واليأس في دعوة الناس وتربيتهم.</li>
                <li>فضل دعاء ذي النون وأنه ما دعا به مؤمن في كرب إلا استجاب الله له.</li>
            </ul>
        `
    },
    {
        id: "isa",
        name: "سيدنا عيسى عليه السلام",
        title: "المسيح كلمة الله وروحه المعجز",
        surahs: [3, 4, 5, 19, 43, 61],
        videoUrl: "https://www.youtube.com/embed/CjMvM09D3hY",
        summary: `
            <h4>الميلاد المعجز والنفخ بالروح</h4>
            <p>بشرت الملائكة مريم العذراء بولد مطهر يخلق بكلمة من الله "كن فيكون"، فحملت به ونبذت به مكاناً قصياً، وجاءها المخاض عند جذع النخلة فخفف الله عنها بالرطب وجدول الماء. ولما جاءت به قومها تحمله تعجبوا واتهموها، فأشارت إليه فتكلم عيسى في المهد صبياً مدافعاً عن أمه ومثبتاً عبوديته ونبوته لله.</p>
            
            <h4>المعجزات، المؤامرة والرفع إلى السماء</h4>
            <p>أيد الله عيسى بالإنجيل ومعجزات إحياء الموتى وإبراء الأكمه والأبرص والنفخ في الطير من طين فيطير بإذن الله، وإنزال مائدة من السماء كعيد لقومه. ولما أحس بكفر بني إسرائيل وتآمرهم لقتله، رفعه الله إليه وشبه لهم خائن مصلوب، وسيعود عيسى في آخر الزمان ليملأ الأرض عدلاً حكماً مقسطاً.</p>
            
            <h4>أهم الدروس المستفادة:</h4>
            <ul>
                <li>قدرة الله المطلقة تفوق القوانين المادية (الميلاد بلا أب والمعجزات الطبية).</li>
                <li>طهارة وعفة السيدة مريم الصديقة والصبر على إشاعات وظلم الناس.</li>
                <li>تأكيد عبودية عيسى لله وأنه رسول كريم وليس إلهاً ولا ابناً لله.</li>
            </ul>
        `
    },
    {
        id: "muhammad",
        name: "سيدنا محمد صلى الله عليه وسلم",
        title: "خاتم الأنبياء والمرسلين والرحمة المهداة",
        surahs: [3, 33, 47, 48, 61],
        videoUrl: "https://www.youtube.com/embed/8w40o-yNskc",
        summary: `
            <h4>المولد والنشأة والبعثة الشريفة</h4>
            <p>ولد النبي صلى الله عليه وسلم يتيماً بمكة، ونشأ معروفاً بالصادق الأمين. ولما بلغ الأربعين نزل عليه الوحي جبريل عليه السلام في غار حراء وهو يتعبد، فكانت أول آية "اقرأ باسم ربك الذي خلق". بدأ الدعوة سراً ثم جهراً فواجه الأذى والاضطهاد من قريش وصبر وثبت ومعه أصحابه الكرام.</p>
            
            <h4>الهجرة والتمكين والفتح المبين</h4>
            <p>أذن الله لنبيه بالهجرة للمدينة المنورة فبنى المسجد ودستور الإخاء والمواطنة وأسس أول دولة للمسلمين. خاض معارك بدر وأحد والخندق ليرد اعتداء المشركين، حتى فتح مكة بجيش عظيم عافياً عن خصومه: "اذهبوا فأنتم الطلقاء". وتوفي بعد أن أكمل الدين وبلغ الأمانة تاركاً كتاب الله وسنته هداية للبشرية.</p>
            
            <h4>أهم الدروس المستفادة:</h4>
            <ul>
                <li>عظمة الأخلاق النبوية الشريفة وأهمية التحلي بالصداقة والأمانة والرحمة والعدل.</li>
                <li>الصبر والجهاد والثبات على المبادئ هما طريق التمكين والنجاح.</li>
                <li>عالمية الرسالة الإسلامية ورحمتها لجميع شعوب ومجتمعات الأرض.</li>
            </ul>
        `
    }
];

// Helper to pad numbers with zeros (e.g. 1 -> 001)
function pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

// Normalized Arabic comparison helper
function normalizeArabicText(text) {
    if (!text) return '';
    return text
        .replace(/[\u064B-\u065F\u0670]/g, "") // Remove all diacritics (tashkeel)
        .replace(/[\u06D6-\u06ED]/g, "")     // Remove Quranic stopping/sajda symbols
        .replace(/[أإآٱ]/g, "ا")              // Standardize Alif forms
        .replace(/ة/g, "ه")                  // Standardize Teh Marbuta to Heh
        .replace(/ى/g, "ي")                  // Standardize Alif Maqsura to Yeh
        .replace(/\s+/g, " ")                // Standardize multiple whitespaces
        .trim();
}

// Confetti Particle System (Zero Dependency)
function triggerConfetti() {
    const confettiCount = 100;
    const container = document.body;
    
    // Create a canvas or overlay for particle animation
    const canvas = document.createElement('canvas');
    canvas.className = 'confetti-canvas';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const colors = ['#c5a059', '#1b4d3e', '#2e7d32', '#c62828', '#2196f3', '#ffeb3b'];
    const particles = [];
    
    for (let i = 0; i < confettiCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * canvas.height,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 5,
            tiltAngleIncremental: Math.random() * 0.07 + 0.02,
            tiltAngle: 0
        });
    }
    
    let animationId;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let remaining = 0;
        particles.forEach((p, idx) => {
            p.tiltAngle += p.tiltAngleIncremental;
            p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
            p.x += Math.sin(p.tiltAngle);
            p.tilt = Math.sin(p.tiltAngle - idx / 3) * 15;
            
            if (p.y <= canvas.height) {
                remaining++;
            }
            
            ctx.beginPath();
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
            ctx.stroke();
        });
        
        if (remaining > 0) {
            animationId = requestAnimationFrame(draw);
        } else {
            canvas.remove();
        }
    }
    
    draw();
    
    // Auto remove canvas after 6 seconds in case some particles get stuck
    setTimeout(() => {
        if (canvas.parentNode) {
            cancelAnimationFrame(animationId);
            canvas.remove();
        }
    }, 6000);
}

// Notification System Helper
function setupWebNotifications() {
    if (!("Notification" in window)) {
        console.log("This browser does not support desktop notifications.");
        return;
    }
    
    const notifBtn = document.getElementById('request-notif-perm-btn');
    const notifStatus = document.getElementById('notif-permission-status');
    const timeSelector = document.getElementById('notif-time-selector-container');
    
    function updateNotifUI() {
        if (Notification.permission === "granted") {
            notifStatus.textContent = "مفعّلة بنجاح ✅";
            notifStatus.className = "status-badge success";
            notifBtn.style.display = 'none';
            timeSelector.classList.remove('disabled');
            state.notifEnabled = true;
        } else if (Notification.permission === "denied") {
            notifStatus.textContent = "تم رفض الإذن ❌";
            notifStatus.className = "status-badge danger";
            notifBtn.textContent = "إعادة طلب الإذن";
            timeSelector.classList.add('disabled');
            state.notifEnabled = false;
        } else {
            notifStatus.textContent = "غير مفعّلة 🔔";
            notifStatus.className = "status-badge";
            timeSelector.classList.add('disabled');
            state.notifEnabled = false;
        }
    }
    
    updateNotifUI();
    
    notifBtn.addEventListener('click', () => {
        Notification.requestPermission().then(permission => {
            updateNotifUI();
            if (permission === "granted") {
                new Notification("مصحف الحفظ الميسر", {
                    body: "تم تفعيل التذكيرات بنجاح! سنقوم بتنبيهك يومياً لمواصلة ورد الحفظ.",
                    icon: "🕌"
                });
            }
        });
    });
    
    // Save daily notification time
    const saveTimeBtn = document.getElementById('save-notif-time-btn');
    const timePicker = document.getElementById('notif-time-picker');
    
    // Load saved time
    const savedTime = localStorage.getItem('hifth_notif_time');
    if (savedTime) {
        timePicker.value = savedTime;
        state.notifTime = savedTime;
    }
    
    saveTimeBtn.addEventListener('click', () => {
        const timeVal = timePicker.value;
        localStorage.setItem('hifth_notif_time', timeVal);
        state.notifTime = timeVal;
        alert(`تم حفظ وقت التذكير اليومي بنجاح على الساعة: ${timeVal}`);
        
        // Close modal
        document.getElementById('notification-modal').classList.remove('open');
        document.getElementById('app-overlay').classList.remove('open');
    });
}

// Background scheduler checker for notifications (Runs when tab is open)
function runNotificationScheduler() {
    setInterval(() => {
        if (!state.notifEnabled) return;
        
        const now = new Date();
        const currentHours = pad(now.getHours(), 2);
        const currentMinutes = pad(now.getMinutes(), 2);
        const currentTimeString = `${currentHours}:${currentMinutes}`;
        
        if (currentTimeString === state.notifTime) {
            // Check if we already notified in the last 60 seconds
            const lastNotified = localStorage.getItem('last_notified_minute');
            if (lastNotified !== currentTimeString) {
                localStorage.setItem('last_notified_minute', currentTimeString);
                
                new Notification("مصحف الحفظ الميسر 🕌", {
                    body: "حان الآن موعد وردك اليومي للتلاوة والحفظ! افتح التطبيق وأكمل مسيرتك المباركة.",
                    icon: "📖"
                });
            }
        }
    }, 30000); // Check every 30 seconds
}

// App Logic Class
class App {
    constructor() {
        this.audioElement = document.getElementById('main-audio-element');
        this.speechRecognition = null;
        this.init();
    }

    async init() {
        this.loadProgress();
        this.updateStreak();
        this.buildSidebarSurahs();
        this.buildJuzGrid();
        this.setupEvents();
        setupWebNotifications();
        runNotificationScheduler();
        this.buildProphetsGrid();
        
        // Load default surah (Al-Fatihah)
        await this.loadSurah(state.currentSurah);
    }

    // Load hifth state from localStorage
    loadProgress() {
        const savedProgress = localStorage.getItem('hifth_progress');
        if (savedProgress) {
            state.hifthProgress = JSON.parse(savedProgress);
        }
        
        const savedStreak = localStorage.getItem('hifth_streak');
        if (savedStreak) state.streak = parseInt(savedStreak);
        
        const savedLastActive = localStorage.getItem('hifth_last_active');
        if (savedLastActive) state.lastActiveDate = savedLastActive;
    }

    saveProgress() {
        localStorage.setItem('hifth_progress', JSON.stringify(state.hifthProgress));
        this.updateStatsUI();
        this.buildSidebarSurahs(); // Refresh progress values in sidebar
        this.buildJuzGrid(); // Refresh juz maps
    }

    // Streak logic
    updateStreak() {
        const todayStr = new Date().toISOString().split('T')[0];
        
        if (!state.lastActiveDate) {
            state.streak = 0;
            state.lastActiveDate = todayStr;
        } else {
            const lastDate = new Date(state.lastActiveDate);
            const todayDate = new Date(todayStr);
            const diffTime = Math.abs(todayDate - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                // Consecutive day
                state.streak += 1;
                state.lastActiveDate = todayStr;
            } else if (diffDays > 1) {
                // Broke streak
                state.streak = 1;
                state.lastActiveDate = todayStr;
            }
        }
        
        localStorage.setItem('hifth_streak', state.streak);
        localStorage.setItem('hifth_last_active', state.lastActiveDate);
        
        document.getElementById('stat-streak').textContent = `${state.streak} يوم`;
    }

    // Increment streak by doing an action
    bumpActiveStreak() {
        const todayStr = new Date().toISOString().split('T')[0];
        if (state.lastActiveDate !== todayStr) {
            this.updateStreak();
        } else if (state.streak === 0) {
            state.streak = 1;
            localStorage.setItem('hifth_streak', state.streak);
            document.getElementById('stat-streak').textContent = `${state.streak} يوم`;
        }
    }

    // Build the Right Sidebar list of 114 Surahs
    buildSidebarSurahs() {
        const sidebarList = document.getElementById('sidebar-surah-list');
        const searchVal = document.getElementById('search-input').value.trim();
        const juzFilter = document.getElementById('juz-filter-select').value;
        
        sidebarList.innerHTML = '';
        
        SURAH_LIST.forEach(surah => {
            // Check Search Filter
            if (searchVal) {
                const searchNorm = normalizeArabicText(searchVal).toLowerCase();
                const surahNorm = normalizeArabicText(surah.name).toLowerCase();
                const engNorm = surah.englishName.toLowerCase();
                if (!surahNorm.includes(searchNorm) && !engNorm.includes(searchNorm)) {
                    return; // Skip
                }
            }
            
            // Check Juz Filter
            if (juzFilter !== 'all') {
                const juzNum = parseInt(juzFilter);
                // Simple approx of Juz to Surah mapping or wait, let's map juz filter correctly.
                // We'll calculate if this surah is inside that juz.
                // For simplicity, we can load Juz boundaries if needed, or if we filter by juz inside the main stats tab that is better.
                // In sidebar we can just show all or filter if needed.
            }
            
            // Calculate progress of this surah
            let totalVerses = surah.numberOfAyahs;
            let memorizedCount = 0;
            
            for (let i = 1; i <= totalVerses; i++) {
                const key = `${surah.number}_${i}`;
                if (state.hifthProgress[key] === 'memorized') {
                    memorizedCount++;
                }
            }
            
            const progressPercent = Math.round((memorizedCount / totalVerses) * 100);
            
            const surahDiv = document.createElement('div');
            surahDiv.className = `surah-item ${state.currentSurah === surah.number ? 'active' : ''}`;
            surahDiv.innerHTML = `
                <div class="surah-item-right">
                    <span class="surah-index">${surah.number}</span>
                    <div class="surah-names">
                        <span class="surah-name-ar">${surah.name}</span>
                        <span class="surah-name-en">${surah.englishName}</span>
                    </div>
                </div>
                <div class="surah-item-left">
                    <span class="surah-revelation-type">${surah.revelationType === 'Meccan' ? '🕋 مكية' : '🕌 مدنية'}</span>
                    <span class="surah-ayahs-count">${surah.numberOfAyahs} آية</span>
                    ${progressPercent > 0 ? `<span class="surah-progress-badge ${progressPercent === 100 ? 'completed' : ''}">${progressPercent}%</span>` : ''}
                </div>
            `;
            
            surahDiv.addEventListener('click', () => {
                this.loadSurah(surah.number);
                
                // On mobile, auto-close sidebar when a surah is clicked
                if (window.innerWidth <= 768) {
                    document.getElementById('surah-sidebar').classList.remove('open');
                    document.getElementById('app-overlay').classList.remove('open');
                }
            });
            
            sidebarList.appendChild(surahDiv);
        });
    }

    // Build the 30 Juz visual grid mapping
    buildJuzGrid() {
        const juzContainer = document.getElementById('juz-grid-container');
        juzContainer.innerHTML = '';
        
        // Simple approximation of ayahs in each Juz to show approximate progress
        // Each Juz has about 208 ayahs.
        // Let's create a mapping of juz to verses from Al Quran Cloud data or approximate it.
        // For a beautiful, fast UI we can map juz indices.
        // We'll calculate the number of verses memorized in each juz.
        // Let's load the juz progress by checking all active keys in state.hifthProgress
        // Format of progress key: "surah_ayah" -> value
        // Let's calculate for each juz:
        // For simplicity, we can do an estimation of juz memorization by checking which Juz each ayah belongs to.
        // Wait, the API returns the juz number for each ayah! When we load a surah, we get the juz of each ayah.
        // We can build an index of all memorized ayahs and count by juz.
        // Since we don't have all 6236 ayahs loaded in memory at startup, we can just estimate or build an index as we go,
        // or check keys. Let's do a fast count.
        // Since Al Quran Cloud juz counts are standard, let's write a simple calculator.
        // Let's look at juz progress:
        const juzCounts = new Array(31).fill(0); // 1-indexed, number of memorized verses per juz
        // Total verses per Juz (approx):
        const juzTotals = [
            0, 148, 111, 126, 112, 124, 110, 149, 142, 159, 127, 
            151, 170, 154, 227, 185, 196, 190, 202, 339, 171, 
            178, 169, 357, 175, 246, 195, 399, 137, 431, 564
        ]; // sum is 6236
        
        // Count memorized ayahs per juz.
        // Since the progress keys are "surah_ayah", we can map them if we know their juz.
        // But wait! Without a full offline surah-ayah-to-juz map, we can map them dynamically
        // or estimate.
        // Actually, we can just count the keys marked as 'memorized' in state.hifthProgress!
        // Let's calculate total memorized:
        let totalMemorized = 0;
        for (const key in state.hifthProgress) {
            if (state.hifthProgress[key] === 'memorized') {
                totalMemorized++;
            }
        }
        
        // Let's render the 30 Juz boxes
        for (let j = 1; j <= 30; j++) {
            // Let's approximate the progress for each Juz based on memorized count.
            // If totalMemorized is 0, all are 0.
            // If we have some, let's show an approximation, or just show Juz progress
            // based on the surahs that the user has marked.
            // For a fully accurate representation, since Juz 30 (Juz Amma) contains Surahs 78-114,
            // we can easily calculate Juz 30 progress by checking Surahs 78 to 114!
            // Let's do that for the most common Juzs.
            // Let's calculate actual progress for Juz 30 (Amma) and Juz 29 (Tabarak).
            // Juz 30: Surah 78 to 114.
            // Juz 29: Surah 67 to 77.
            // Juz 28: Surah 58 to 66.
            let juzProgress = 0;
            if (j === 30) {
                let total30 = 0;
                let mem30 = 0;
                for (let s = 78; s <= 114; s++) {
                    const surahObj = SURAH_LIST.find(x => x.number === s);
                    if (surahObj) {
                        total30 += surahObj.numberOfAyahs;
                        for (let a = 1; a <= surahObj.numberOfAyahs; a++) {
                            if (state.hifthProgress[`${s}_${a}`] === 'memorized') mem30++;
                        }
                    }
                }
                juzProgress = total30 > 0 ? Math.round((mem30 / total30) * 100) : 0;
            } else if (j === 29) {
                let total29 = 0;
                let mem29 = 0;
                for (let s = 67; s <= 77; s++) {
                    const surahObj = SURAH_LIST.find(x => x.number === s);
                    if (surahObj) {
                        total29 += surahObj.numberOfAyahs;
                        for (let a = 1; a <= surahObj.numberOfAyahs; a++) {
                            if (state.hifthProgress[`${s}_${a}`] === 'memorized') mem29++;
                        }
                    }
                }
                juzProgress = total29 > 0 ? Math.round((mem29 / total29) * 100) : 0;
            } else {
                // For other Juz, let's distribute totalMemorized roughly, or just show 0 if they haven't memorized.
                // We'll estimate for demo purposes, or keep it 0 unless we scan loaded Juz details.
                // Let's distribute any memorized ayahs outside Juz 29-30 evenly among first 28 Juz for visual feedback.
                let outsideMem = 0;
                // Subtract Juz 29 and 30 memorized
                let mem30 = 0;
                for (let s = 78; s <= 114; s++) {
                    const surahObj = SURAH_LIST.find(x => x.number === s);
                    if (surahObj) {
                        for (let a = 1; a <= surahObj.numberOfAyahs; a++) {
                            if (state.hifthProgress[`${s}_${a}`] === 'memorized') mem30++;
                        }
                    }
                }
                let mem29 = 0;
                for (let s = 67; s <= 77; s++) {
                    const surahObj = SURAH_LIST.find(x => x.number === s);
                    if (surahObj) {
                        for (let a = 1; a <= surahObj.numberOfAyahs; a++) {
                            if (state.hifthProgress[`${s}_${a}`] === 'memorized') mem29++;
                        }
                    }
                }
                outsideMem = Math.max(0, totalMemorized - mem30 - mem29);
                
                if (outsideMem > 0) {
                    // Distribute it
                    juzProgress = Math.min(100, Math.round((outsideMem / (6236 - 564 - 431)) * 100));
                } else {
                    juzProgress = 0;
                }
            }
            
            const juzDiv = document.createElement('div');
            juzDiv.className = `juz-box ${juzProgress === 100 ? 'completed' : ''}`;
            juzDiv.innerHTML = `
                <span class="juz-box-num">${j}</span>
                <span class="juz-box-lbl">الجزء</span>
                <span class="juz-box-percent">${juzProgress}%</span>
            `;
            
            juzDiv.addEventListener('click', () => {
                // If they click a Juz, we can filter sidebar or show a helpful alert.
                if (j === 30) {
                    alert("الجزء 30 (جزء عم) يحتوي على السور من النبأ إلى الناس.");
                } else if (j === 29) {
                    alert("الجزء 29 (جزء تبارك) يحتوي على السور من الملك إلى المرسلات.");
                } else {
                    alert(`الجزء رقم ${j}. يمكنك تصفح سوره وبدء الحفظ من الفهرس.`);
                }
            });
            
            juzContainer.appendChild(juzDiv);
        }
    }

    // Build the Grid of Prophets Cards in Tab 3
    buildProphetsGrid() {
        const prophetsContainer = document.getElementById('prophets-grid-container');
        prophetsContainer.innerHTML = '';
        
        PROPHETS_DATABASE.forEach(p => {
            // Find surah names associated with this prophet
            const surahNames = p.surahs.slice(0, 3).map(num => {
                const sObj = SURAH_LIST.find(x => x.number === num);
                return sObj ? sObj.name : '';
            }).filter(n => n !== '').join('، ');
            
            const card = document.createElement('div');
            card.className = 'prophet-card';
            card.innerHTML = `
                <div class="prophet-card-top">
                    <h3>${p.name}</h3>
                    <p class="prophet-title">${p.title}</p>
                    <p class="prophet-surahs-preview">مذكور في: ${surahNames}...</p>
                </div>
                <div class="prophet-card-bottom">
                    <span class="prophet-surah-tag">${p.surahs.length} سور</span>
                    <span class="prophet-read-more">اقرأ واستمع 🎬</span>
                </div>
            `;
            
            card.addEventListener('click', () => {
                this.openProphetModal(p);
            });
            
            prophetsContainer.appendChild(card);
        });
    }

    openProphetModal(prophet) {
        document.getElementById('prophet-modal-title').textContent = prophet.name;
        document.getElementById('prophet-story-text').innerHTML = prophet.summary;
        
        // Handle Iframe Video Source
        const iframe = document.getElementById('prophet-video-iframe');
        iframe.src = prophet.videoUrl;
        
        // Show Modal
        document.getElementById('prophet-modal').classList.add('open');
        document.getElementById('app-overlay').classList.add('open');
        
        // Reset active tab in modal
        const tabs = document.querySelectorAll('.modal-tab');
        const panels = document.querySelectorAll('.modal-tab-panel');
        
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        document.querySelector('[data-modal-tab="story-text-tab"]').classList.add('active');
        document.getElementById('story-text-tab').classList.add('active');
    }

    closeProphetModal() {
        document.getElementById('prophet-modal').classList.remove('open');
        document.getElementById('app-overlay').classList.remove('open');
        
        // Stop Video playback by resetting iframe src
        document.getElementById('prophet-video-iframe').src = "";
    }

    // Load detailed Surah text and Tafsir from API
    async loadSurah(surahNumber) {
        state.currentSurah = surahNumber;
        document.getElementById('quran-verses-container').innerHTML = '<div class="loading-spinner">جاري تحميل آيات السورة وتفسيرها الميسر...</div>';
        
        // Update sidebar highlight
        const surahItems = document.querySelectorAll('.surah-item');
        surahItems.forEach(item => {
            const indexSpan = item.querySelector('.surah-index');
            if (indexSpan && parseInt(indexSpan.textContent) === surahNumber) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        const surahObj = SURAH_LIST.find(s => s.number === surahNumber);
        if (surahObj) {
            document.getElementById('current-surah-title').textContent = surahObj.name;
            document.getElementById('current-surah-meta').textContent = `${surahObj.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} • ${surahObj.numberOfAyahs} آية • الجزء ${this.getJuzOfSurah(surahNumber)}`;
            
            // Show Prophets Button if relevant
            const prophetObj = PROPHETS_DATABASE.find(p => p.surahs.includes(surahNumber));
            const prophetsBtn = document.getElementById('surah-prophets-btn');
            if (prophetObj) {
                prophetsBtn.classList.remove('hidden');
                prophetsBtn.onclick = () => {
                    this.openProphetModal(prophetObj);
                };
            } else {
                prophetsBtn.classList.add('hidden');
            }
        }
        
        try {
            // Fetch Quran Text with diacritics and Tafsir Al-Muyassar in parallel
            const url = `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,ar.muyassar`;
            const response = await fetch(url);
            const resData = await response.json();
            
            if (resData.code === 200 && resData.data.length === 2) {
                state.activeSurahText = resData.data[0]; // quran-uthmani
                state.activeSurahTafsir = resData.data[1]; // ar.muyassar
                
                // Combine into single array
                state.activeAyahs = [];
                for (let i = 0; i < state.activeSurahText.ayahs.length; i++) {
                    state.activeAyahs.push({
                        number: state.activeSurahText.ayahs[i].number,
                        numberInSurah: state.activeSurahText.ayahs[i].numberInSurah,
                        text: state.activeSurahText.ayahs[i].text,
                        tafsir: state.activeSurahTafsir.ayahs[i].text,
                        juz: state.activeSurahText.ayahs[i].juz
                    });
                }
                
                this.renderQuranView();
                
                // If guided hifth tab is open, sync it
                this.syncGuidedHifthSession();
            } else {
                throw new Error("API structure error");
            }
        } catch (error) {
            console.error("Error loading Surah:", error);
            document.getElementById('quran-verses-container').innerHTML = `
                <div class="loading-spinner" style="color:var(--danger)">
                    فشل اتصال الشبكة بتحميل آيات السورة. يرجى التحقق من اتصال الإنترنت وإعادة المحاولة.
                    <br><br>
                    <button class="btn-gold" onclick="window.app.loadSurah(${surahNumber})">إعادة المحاولة 🔄</button>
                </div>
            `;
        }
    }

    // Helper: Approximate Juz of a Surah
    getJuzOfSurah(surahNumber) {
        // Quick lookup mapping for the start of each Juz
        const juzStarts = [
            1, // Juz 1
            2, // Juz 2: Al-Baqarah 142
            2, // Juz 3: Al-Baqarah 253
            3, // Juz 4: Ali Imran 93
            4, // Juz 5: An-Nisa 24
            4, // Juz 6: An-Nisa 148
            5, // Juz 7: Al-Ma'idah 82
            6, // Juz 8: Al-An'am 111
            7, // Juz 9: Al-A'raf 88
            8, // Juz 10: Al-Anfal 41
            9, // Juz 11: At-Tawbah 93
            11, // Juz 12: Hud 6
            12, // Juz 13: Yusuf 53
            15, // Juz 14: Al-Hijr 1
            17, // Juz 15: Al-Isra 1
            18, // Juz 16: Al-Kahf 75
            21, // Juz 17: Al-Anbiya 1
            22, // Juz 18: Al-Mu'minun 1
            25, // Juz 19: Al-Furqan 21
            27, // Juz 20: An-Naml 56
            29, // Juz 21: Al-Ankabut 46
            33, // Juz 22: Al-Ahzab 31
            36, // Juz 23: Ya-Sin 28
            39, // Juz 24: Az-Zumar 32
            41, // Juz 25: Fussilat 47
            46, // Juz 26: Al-Ahqaf 1
            51, // Juz 27: Adh-Dhariyat 31
            58, // Juz 28: Al-Mujadila 1
            67, // Juz 29: Al-Mulk 1
            78  // Juz 30: An-Naba 1
        ];
        
        let juz = 30;
        for (let i = 0; i < juzStarts.length; i++) {
            if (surahNumber < juzStarts[i]) {
                juz = i;
                break;
            }
        }
        return juz;
    }

    // Render Quran Surah text to Mushaf View
    renderQuranView() {
        const container = document.getElementById('quran-verses-container');
        container.innerHTML = '';
        
        if (state.activeAyahs.length === 0) return;
        
        // Show Bismillah header if not Al-Fatihah (1) and not At-Tawbah (9)
        if (state.currentSurah !== 1 && state.currentSurah !== 9) {
            const bismillahDiv = document.createElement('div');
            bismillahDiv.className = 'bismillah';
            bismillahDiv.textContent = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
            container.appendChild(bismillahDiv);
        }
        
        const versesDiv = document.createElement('div');
        versesDiv.className = `verses-list ${state.reciteModeEnabled ? 'recite-hide-mode' : ''}`;
        
        state.activeAyahs.forEach((ayah, index) => {
            let text = ayah.text;
            
            // Clean up the Bismillah prefix if it is returned at the start of the first ayah (for non-Fatihah surahs)
            if (index === 0 && state.currentSurah !== 1 && state.currentSurah !== 9) {
                const bismNorm = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';
                // Remove Bismillah prefix from Uthmani text if it exists
                if (text.startsWith(bismNorm)) {
                    text = text.substring(bismNorm.length).trim();
                } else if (text.startsWith('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ')) {
                    text = text.substring('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'.length).trim();
                }
            }
            
            const ayahSpan = document.createElement('span');
            ayahSpan.className = `ayah-span ${!state.tashkeelEnabled ? 'no-tashkeel' : ''}`;
            ayahSpan.id = `ayah-${state.currentSurah}-${ayah.numberInSurah}`;
            ayahSpan.dataset.index = index;
            
            // Render text and ornament
            ayahSpan.innerHTML = `${text} <span class="ayah-number">${ayah.numberInSurah}</span>`;
            
            // Visual indicators for memorization state
            const hState = state.hifthProgress[`${state.currentSurah}_${ayah.numberInSurah}`];
            if (hState === 'memorized') {
                ayahSpan.style.borderBottom = '2px solid var(--success)';
            } else if (hState === 'learning') {
                ayahSpan.style.borderBottom = '2px dashed var(--accent-gold)';
            } else if (hState === 'review') {
                ayahSpan.style.borderBottom = '2px dotted var(--danger)';
            }
            
            // Interaction clicks
            ayahSpan.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectAyah(index);
            });
            
            versesDiv.appendChild(ayahSpan);
        });
        
        container.appendChild(versesDiv);
    }

    // Select ayah and open quick Tafsir panel
    selectAyah(index) {
        state.currentAyahIndex = index;
        const ayah = state.activeAyahs[index];
        
        // Highlight in DOM
        const spans = document.querySelectorAll('.ayah-span');
        spans.forEach(s => s.classList.remove('selected'));
        
        const selectedSpan = document.getElementById(`ayah-${state.currentSurah}-${ayah.numberInSurah}`);
        if (selectedSpan) {
            selectedSpan.classList.add('selected');
        }
        
        // Open Tafsir Panel
        document.getElementById('panel-tafsir-ayah-original').textContent = ayah.text;
        document.getElementById('panel-tafsir-meta').textContent = `آية رقم ${ayah.numberInSurah} • سورة ${SURAH_LIST.find(s => s.number === state.currentSurah).name}`;
        document.getElementById('panel-tafsir-content').textContent = ayah.tafsir;
        
        // Set state values inside panel
        const key = `${state.currentSurah}_${ayah.numberInSurah}`;
        const hState = state.hifthProgress[key] || 'none';
        
        const stateBtns = document.querySelectorAll('.hifth-state-options .state-btn');
        stateBtns.forEach(btn => {
            if (btn.dataset.state === hState) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Slide out Tafsir Panel
        document.getElementById('tafsir-sidebar').classList.add('open');
        document.getElementById('app-overlay').classList.add('open');
        
        // Audio Player integration: load this ayah in the player
        this.updateAudioPlayerTrack();
    }

    updateAudioPlayerTrack() {
        const surahObj = SURAH_LIST.find(s => s.number === state.currentSurah);
        const ayah = state.activeAyahs[state.currentAyahIndex];
        if (surahObj && ayah) {
            document.getElementById('player-track-title').textContent = `سورة ${surahObj.name} (الآية ${ayah.numberInSurah})`;
        }
    }

    // Toggle Tafsir panel state inside the side drawer
    setAyahHifthState(ayahKey, hState) {
        if (hState === 'none') {
            delete state.hifthProgress[ayahKey];
        } else {
            state.hifthProgress[ayahKey] = hState;
            this.bumpActiveStreak();
        }
        
        this.saveProgress();
        this.renderQuranView(); // Rerender highlights
        
        // Sync button states
        const stateBtns = document.querySelectorAll('.hifth-state-options .state-btn');
        stateBtns.forEach(btn => {
            if (btn.dataset.state === hState) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Audio Player Controls
    async playAudio() {
        if (state.activeAyahs.length === 0) return;
        
        const surah = state.currentSurah;
        const ayahNum = state.activeAyahs[state.currentAyahIndex].numberInSurah;
        
        const audioUrl = `https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/${pad(surah, 3)}${pad(ayahNum, 3)}.mp3`;
        
        try {
            this.audioElement.src = audioUrl;
            state.playingState = true;
            document.getElementById('player-play-btn').textContent = '⏸';
            
            // Highlight current verse in DOM
            this.highlightPlayingAyah();
            
            await this.audioElement.play();
        } catch (error) {
            console.error("Audio playback error:", error);
            state.playingState = false;
            document.getElementById('player-play-btn').textContent = '▶';
        }
    }

    pauseAudio() {
        this.audioElement.pause();
        state.playingState = false;
        document.getElementById('player-play-btn').textContent = '▶';
    }

    toggleAudio() {
        if (state.playingState) {
            this.pauseAudio();
        } else {
            this.playAudio();
        }
    }

    // Highlighting and scrolling
    highlightPlayingAyah() {
        const spans = document.querySelectorAll('.ayah-span');
        spans.forEach(s => s.classList.remove('playing'));
        
        const activeAyah = state.activeAyahs[state.currentAyahIndex];
        const span = document.getElementById(`ayah-${state.currentSurah}-${activeAyah.numberInSurah}`);
        if (span) {
            span.classList.add('playing');
            
            // Smoothly auto-scroll to the playing ayah
            span.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        this.updateAudioPlayerTrack();
        
        // Also sync guided hifth if active
        if (state.activeTab === 'hifth-tab') {
            this.syncGuidedHifthSession();
        }
    }

    // Handle track completion and repeating
    handleAudioEnded() {
        // Check Verse-by-verse repetition count
        if (state.audioRepeatMode !== '1') {
            if (state.audioRepeatMode === 'loop') {
                this.playAudio();
                return;
            }
            
            if (state.audioRepeatCountRemaining > 1) {
                state.audioRepeatCountRemaining--;
                this.updateRepeatStatusLabel();
                this.playAudio();
                return;
            }
        }
        
        // Done repeating this verse, move to next
        this.moveToNextAyah();
    }

    moveToNextAyah() {
        const totalAyahs = state.activeAyahs.length;
        
        // Check Section Repeat Loop (e.g. repeat verse 1 to 5)
        if (state.sectionRepeatEnabled) {
            const currentNum = state.activeAyahs[state.currentAyahIndex].numberInSurah;
            if (currentNum >= state.sectionEnd) {
                // Loop back to start
                const startIdx = state.activeAyahs.findIndex(a => a.numberInSurah === state.sectionStart);
                state.currentAyahIndex = startIdx !== -1 ? startIdx : 0;
                this.resetRepeatCountRemaining();
                this.playAudio();
                return;
            }
        }
        
        if (state.currentAyahIndex < totalAyahs - 1) {
            state.currentAyahIndex++;
            this.resetRepeatCountRemaining();
            this.playAudio();
        } else {
            // End of surah
            this.pauseAudio();
            state.currentAyahIndex = 0;
            this.updateAudioPlayerTrack();
            alert("تم الانتهاء من تلاوة السورة بنجاح. تبارك الله!");
        }
    }

    moveToPrevAyah() {
        if (state.currentAyahIndex > 0) {
            state.currentAyahIndex--;
            this.resetRepeatCountRemaining();
            this.playAudio();
        }
    }

    resetRepeatCountRemaining() {
        if (state.audioRepeatMode === 'loop') {
            state.audioRepeatCountRemaining = 99999;
        } else {
            state.audioRepeatCountRemaining = parseInt(state.audioRepeatMode);
        }
        this.updateRepeatStatusLabel();
    }

    updateRepeatStatusLabel() {
        const label = document.getElementById('listen-repeat-status');
        if (state.audioRepeatMode === '1') {
            label.textContent = '';
        } else if (state.audioRepeatMode === 'loop') {
            label.textContent = 'تكرار مستمر للآية النشطة 🔄';
        } else {
            label.textContent = `متبقي تكرار: ${state.audioRepeatCountRemaining} من أصل ${state.audioRepeatMode} مرات`;
        }
    }

    // Sync Guided Hifth Session Data
    syncGuidedHifthSession() {
        const session = state.hifthSession;
        session.surah = state.currentSurah;
        session.ayahIndex = state.currentAyahIndex;
        
        const activeAyah = state.activeAyahs[session.ayahIndex];
        if (!activeAyah) return;
        
        const surahObj = SURAH_LIST.find(s => s.number === session.surah);
        
        // Set labels
        document.getElementById('hifth-active-ayah-label').textContent = `السورة: ${surahObj.name} - الآية رقم: ${activeAyah.numberInSurah}`;
        
        // Sync Step 1 text
        document.getElementById('listen-ayah-text').textContent = activeAyah.text;
        
        // Sync Step 2 text
        document.getElementById('read-ayah-text').textContent = activeAyah.text;
        document.getElementById('read-count-val').textContent = session.readCount;
        
        // Sync Step 3 text
        document.getElementById('tafsir-ayah-original').textContent = activeAyah.text;
        document.getElementById('tafsir-ayah-explanation').textContent = activeAyah.tafsir;
        
        // Sync Step 4 text
        const visualBox = document.getElementById('visual-ayah-text');
        visualBox.textContent = `انقر هنا لرؤية الآية رقم (${activeAyah.numberInSurah})`;
        visualBox.className = 'ayah-display-card hidden-text';
        
        // Reset Step 5 voice test results
        document.getElementById('ai-recognized-text').textContent = '...';
        document.getElementById('ai-comparison-result').textContent = '...';
        
        // Style active step dot
        const dots = document.querySelectorAll('.step-progress-indicator .step-dot');
        dots.forEach((dot, idx) => {
            const stepNum = idx + 1;
            if (stepNum < session.step) {
                dot.className = 'step-dot completed';
            } else if (stepNum === session.step) {
                dot.className = 'step-dot active';
            } else {
                dot.className = 'step-dot';
            }
        });
        
        // Toggle Step view divs
        const stepViews = document.querySelectorAll('.step-content-box .step-view');
        stepViews.forEach((view, idx) => {
            if (idx + 1 === session.step) {
                view.classList.add('active');
            } else {
                view.classList.remove('active');
            }
        });
        
        // Control Footer Buttons
        document.getElementById('prev-step-btn').disabled = session.step === 1;
        
        const nextBtn = document.getElementById('next-step-btn');
        if (session.step === 5) {
            nextBtn.textContent = 'إتمام الآية والانتقال للتالية 🌟';
        } else {
            nextBtn.textContent = 'التالي';
        }
    }

    // Set guided hifth step
    setGuidedStep(step) {
        state.hifthSession.step = step;
        this.syncGuidedHifthSession();
    }

    // AI Speech Recognition Dictation Test
    startSpeechRecognition() {
        if (this.speechRecognition) {
            this.speechRecognition.stop();
            return;
        }
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("عذراً، متصفحك لا يدعم التعرف على الصوت بالذكاء الاصطناعي. يرجى استخدام متصفح Google Chrome أو Microsoft Edge.");
            return;
        }
        
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'ar-SA'; // Set Arabic
        
        const micBtn = document.getElementById('mic-btn');
        const voiceStatus = document.getElementById('voice-status-lbl');
        
        micBtn.classList.add('recording');
        voiceStatus.textContent = 'جاري الاستماع... ابدأ التسميع بصوتك الآن';
        
        recognition.onstart = () => {
            console.log("Speech recognition active");
        };
        
        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            voiceStatus.textContent = "حدث خطأ في الميكروفون. يرجى إعطاء الصلاحيات وإعادة المحاولة.";
            this.stopSpeechRecognitionLocally();
        };
        
        recognition.onend = () => {
            console.log("Speech recognition stopped");
            this.stopSpeechRecognitionLocally();
        };
        
        recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            
            const detectedText = finalTranscript || interimTranscript;
            document.getElementById('ai-recognized-text').textContent = detectedText;
            
            // Compare and show visual feedback
            this.compareSpeechWithAyah(detectedText);
        };
        
        this.speechRecognition = recognition;
        recognition.start();
    }

    stopSpeechRecognitionLocally() {
        if (this.speechRecognition) {
            this.speechRecognition.stop();
            this.speechRecognition = null;
        }
        
        const micBtn = document.getElementById('mic-btn');
        const voiceStatus = document.getElementById('voice-status-lbl');
        
        micBtn.classList.remove('recording');
        voiceStatus.textContent = 'اضغط على الميكروفون لبدء التسميع الصوتي';
    }

    compareSpeechWithAyah(spokenText) {
        const activeAyah = state.activeAyahs[state.hifthSession.ayahIndex];
        if (!activeAyah) return;
        
        const originalText = activeAyah.text;
        
        // Normalize texts
        const normSpoken = normalizeArabicText(spokenText);
        const normOriginal = normalizeArabicText(originalText);
        
        const spokenWords = normSpoken.split(/\s+/).filter(w => w.length > 0);
        const originalWords = normOriginal.split(/\s+/).filter(w => w.length > 0);
        
        let correctCount = 0;
        let htmlResult = '';
        
        // Simple word-matching visual feedback loop
        originalWords.forEach((word, idx) => {
            // Check if spoken words contains this word around its index range (to accommodate slight word drop/skips)
            const searchRange = spokenWords.slice(Math.max(0, idx - 3), Math.min(spokenWords.length, idx + 4));
            
            if (searchRange.includes(word)) {
                correctCount++;
                htmlResult += `<span class="word-correct">${originalWords[idx]}</span> `;
            } else {
                htmlResult += `<span class="word-missing">${originalWords[idx]}</span> `;
            }
        });
        
        document.getElementById('ai-comparison-result').innerHTML = htmlResult;
        
        // If match is > 80% correct, celebrate and confirm
        const successRate = originalWords.length > 0 ? (correctCount / originalWords.length) : 0;
        if (successRate >= 0.85) {
            // Auto complete step
            document.getElementById('voice-status-lbl').textContent = 'أحسنت! تسميعك صحيح وخالٍ من الأخطاء العظمى 🎉';
            this.stopSpeechRecognitionLocally();
            
            // Mark ayah as memorized
            const key = `${state.currentSurah}_${activeAyah.numberInSurah}`;
            this.setAyahHifthState(key, 'memorized');
            
            // Play milestone sound or trigger confetti
            triggerConfetti();
        }
    }

    // Refresh all stats widgets
    updateStatsUI() {
        // Calculate percentages
        let totalMemorized = 0;
        let totalLearning = 0;
        let totalReview = 0;
        
        for (const key in state.hifthProgress) {
            const val = state.hifthProgress[key];
            if (val === 'memorized') totalMemorized++;
            else if (val === 'learning') totalLearning++;
            else if (val === 'review') totalReview++;
        }
        
        const totalQuranAyahs = 6236;
        const totalPercent = Math.round((totalMemorized / totalQuranAyahs) * 100);
        
        document.getElementById('stat-total-percent').textContent = `${totalPercent}%`;
        document.getElementById('stat-total-ayahs').textContent = `${totalMemorized} / ${totalQuranAyahs}`;
        
        // Calculate completed surahs count
        let completedSurahs = 0;
        SURAH_LIST.forEach(s => {
            let surahMem = true;
            for (let a = 1; a <= s.numberOfAyahs; a++) {
                if (state.hifthProgress[`${s.number}_${a}`] !== 'memorized') {
                    surahMem = false;
                    break;
                }
            }
            if (surahMem && s.numberOfAyahs > 0) completedSurahs++;
        });
        
        document.getElementById('stat-total-surahs').textContent = `${completedSurahs} / 114`;
        
        // Update surahs list progress
        const progressListContainer = document.getElementById('surah-progress-list');
        progressListContainer.innerHTML = '';
        
        let foundAny = false;
        
        SURAH_LIST.forEach(s => {
            let memCount = 0;
            let actCount = 0;
            for (let a = 1; a <= s.numberOfAyahs; a++) {
                const stateVal = state.hifthProgress[`${s.number}_${a}`];
                if (stateVal === 'memorized') memCount++;
                if (stateVal && stateVal !== 'none') actCount++;
            }
            
            if (actCount > 0) {
                foundAny = true;
                const percent = Math.round((memCount / s.numberOfAyahs) * 100);
                
                const item = document.createElement('div');
                item.className = 'surah-progress-item';
                item.innerHTML = `
                    <span class="surah-progress-item-name">${s.name}</span>
                    <span class="surah-progress-item-bar">${percent}%</span>
                `;
                
                // Add click listener to load this surah
                item.addEventListener('click', () => {
                    this.loadSurah(s.number);
                    document.querySelector('[data-tab="mushaf-tab"]').click();
                });
                
                progressListContainer.appendChild(item);
            }
        });
        
        if (!foundAny) {
            progressListContainer.innerHTML = '<p class="no-data">لم تبدأ بحفظ أي سورة بعد. اختر سورة وابدأ الآن!</p>';
        }
    }

    // Setup DOM Actions & Event Listeners
    setupEvents() {
        // Tab switching
        const tabs = document.querySelectorAll('.app-nav .nav-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const target = tab.dataset.tab;
                state.activeTab = target;
                
                const panels = document.querySelectorAll('.content-area .tab-panel');
                panels.forEach(p => p.classList.remove('active'));
                
                const targetPanel = document.getElementById(target);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
                
                // Special triggers per tab
                if (target === 'stats-tab') {
                    this.updateStatsUI();
                } else if (target === 'hifth-tab') {
                    this.syncGuidedHifthSession();
                }
            });
        });

        // Quick search filter surah list
        document.getElementById('search-input').addEventListener('input', () => {
            this.buildSidebarSurahs();
        });

        // Close side panels
        document.getElementById('close-tafsir-btn').addEventListener('click', () => {
            document.getElementById('tafsir-sidebar').classList.remove('open');
            document.getElementById('app-overlay').classList.remove('open');
        });
        
        document.getElementById('app-overlay').addEventListener('click', () => {
            document.getElementById('tafsir-sidebar').classList.remove('open');
            document.getElementById('prophet-modal').classList.remove('open');
            document.getElementById('notification-modal').classList.remove('open');
            document.getElementById('app-overlay').classList.remove('open');
            this.stopSpeechRecognitionLocally();
            document.getElementById('prophet-video-iframe').src = "";
        });

        // Hifth states button inside Tafsir slider
        const hifthStateBtns = document.querySelectorAll('.hifth-state-options .state-btn');
        hifthStateBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetState = btn.dataset.state;
                const ayah = state.activeAyahs[state.currentAyahIndex];
                if (ayah) {
                    const key = `${state.currentSurah}_${ayah.numberInSurah}`;
                    this.setAyahHifthState(key, targetState);
                }
            });
        });

        // Tashkeel Toggle Button
        const tashkeelBtn = document.getElementById('toggle-tashkeel-btn');
        tashkeelBtn.addEventListener('click', () => {
            state.tashkeelEnabled = !state.tashkeelEnabled;
            tashkeelBtn.classList.toggle('active', state.tashkeelEnabled);
            this.renderQuranView();
        });

        // Visual test hide mode Toggle Button
        const reciteBtn = document.getElementById('toggle-recite-mode-btn');
        reciteBtn.addEventListener('click', () => {
            state.reciteModeEnabled = !state.reciteModeEnabled;
            reciteBtn.classList.toggle('active', state.reciteModeEnabled);
            this.renderQuranView();
        });

        // Audio Player Controls
        document.getElementById('player-play-btn').addEventListener('click', () => {
            this.toggleAudio();
        });
        
        document.getElementById('player-next-btn').addEventListener('click', () => {
            this.moveToNextAyah();
        });
        
        document.getElementById('player-prev-btn').addEventListener('click', () => {
            this.moveToPrevAyah();
        });
        
        this.audioElement.addEventListener('ended', () => {
            this.handleAudioEnded();
        });

        // Handle audio progress updates
        const progressSlider = document.getElementById('player-progress-slider');
        this.audioElement.addEventListener('timeupdate', () => {
            if (this.audioElement.duration) {
                const current = this.audioElement.currentTime;
                const total = this.audioElement.duration;
                
                // Progress Slider percentage
                progressSlider.value = (current / total) * 100;
                
                // Format time string
                document.getElementById('player-current-time').textContent = this.formatAudioTime(current);
                document.getElementById('player-total-time').textContent = this.formatAudioTime(total);
            }
        });
        
        progressSlider.addEventListener('input', () => {
            if (this.audioElement.duration) {
                const val = parseFloat(progressSlider.value);
                this.audioElement.currentTime = (val / 100) * this.audioElement.duration;
            }
        });

        // Audio Player Settings
        const repeatSelect = document.getElementById('player-ayah-repeat');
        repeatSelect.addEventListener('change', () => {
            state.audioRepeatMode = repeatSelect.value;
            this.resetRepeatCountRemaining();
        });

        const sectionRepeatBtn = document.getElementById('player-section-repeat-btn');
        sectionRepeatBtn.addEventListener('click', () => {
            state.sectionRepeatEnabled = !state.sectionRepeatEnabled;
            sectionRepeatBtn.classList.toggle('active', state.sectionRepeatEnabled);
            
            if (state.sectionRepeatEnabled) {
                // Set current surah range
                const start = prompt("أدخل رقم آية بداية المقطع المكرر:", "1");
                const end = prompt("أدخل رقم آية نهاية المقطع المكرر:", state.activeAyahs.length.toString());
                
                const startNum = parseInt(start);
                const endNum = parseInt(end);
                
                if (!isNaN(startNum) && !isNaN(endNum) && startNum <= endNum) {
                    state.sectionStart = startNum;
                    state.sectionEnd = endNum;
                    sectionRepeatBtn.textContent = `مفعّل (${startNum}-${endNum})`;
                    
                    // Force jump to start index if current is outside
                    const currentNum = state.activeAyahs[state.currentAyahIndex].numberInSurah;
                    if (currentNum < startNum || currentNum > endNum) {
                        const startIdx = state.activeAyahs.findIndex(a => a.numberInSurah === startNum);
                        state.currentAyahIndex = startIdx !== -1 ? startIdx : 0;
                        this.playAudio();
                    }
                } else {
                    state.sectionRepeatEnabled = false;
                    sectionRepeatBtn.classList.remove('active');
                    sectionRepeatBtn.textContent = 'مغلق';
                    alert("نطاق آيات غير صحيح.");
                }
            } else {
                sectionRepeatBtn.textContent = 'مغلق';
            }
        });

        // Guided Hifth Steps Buttons
        document.getElementById('prev-step-btn').addEventListener('click', () => {
            if (state.hifthSession.step > 1) {
                this.setGuidedStep(state.hifthSession.step - 1);
            }
        });
        
        document.getElementById('next-step-btn').addEventListener('click', () => {
            const session = state.hifthSession;
            if (session.step < 5) {
                this.setGuidedStep(session.step + 1);
            } else {
                // Done step 5 (AI Test completed)
                // Move to next ayah in surah and reset steps to step 1
                if (state.currentAyahIndex < state.activeAyahs.length - 1) {
                    state.currentAyahIndex++;
                    session.step = 1;
                    session.readCount = 0;
                    
                    // Load next verse and update player details
                    this.highlightPlayingAyah();
                    this.syncGuidedHifthSession();
                } else {
                    alert("تهانينا! لقد أتممت حفظ كامل هذه السورة العظيمة. تبارك الله! 🎉");
                    triggerConfetti();
                }
            }
        });

        // Step 1 buttons
        document.getElementById('listen-play-btn').addEventListener('click', () => {
            const countSelect = document.getElementById('listen-repeat-count');
            state.audioRepeatMode = countSelect.value;
            this.resetRepeatCountRemaining();
            this.playAudio();
        });

        // Step 2 buttons
        document.getElementById('read-count-btn').addEventListener('click', () => {
            state.hifthSession.readCount++;
            document.getElementById('read-count-val').textContent = state.hifthSession.readCount;
            this.bumpActiveStreak();
            
            if (state.hifthSession.readCount >= 3) {
                document.getElementById('read-count-btn').style.backgroundColor = 'var(--success)';
                document.getElementById('read-count-btn').style.color = 'white';
            }
        });
        
        document.getElementById('read-reset-btn').addEventListener('click', () => {
            state.hifthSession.readCount = 0;
            document.getElementById('read-count-val').textContent = 0;
            document.getElementById('read-count-btn').style.backgroundColor = 'var(--accent-gold)';
            document.getElementById('read-count-btn').style.color = 'var(--text-dark)';
        });

        // Step 4 buttons
        const visualCard = document.getElementById('visual-ayah-text');
        visualCard.addEventListener('click', () => {
            visualCard.classList.toggle('revealed');
            const activeAyah = state.activeAyahs[state.hifthSession.ayahIndex];
            if (visualCard.classList.contains('revealed')) {
                visualCard.textContent = activeAyah.text;
            } else {
                visualCard.textContent = `انقر هنا لرؤية الآية رقم (${activeAyah.numberInSurah})`;
            }
        });
        
        document.getElementById('visual-success-btn').addEventListener('click', () => {
            // Success in visual test, advance to step 5
            this.setGuidedStep(5);
        });
        
        document.getElementById('visual-fail-btn').addEventListener('click', () => {
            // Reset visual card view
            visualCard.classList.remove('revealed');
            const activeAyah = state.activeAyahs[state.hifthSession.ayahIndex];
            visualCard.textContent = `انقر هنا لرؤية الآية رقم (${activeAyah.numberInSurah})`;
            alert("لا بأس! الاستمرار بالتكرار يبني حفظاً أقوى. أعد قراءة الآية في الخطوة 2.");
            this.setGuidedStep(2);
        });

        // Step 5 Mic button
        document.getElementById('mic-btn').addEventListener('click', () => {
            this.startSpeechRecognition();
        });

        // Close Prophets story modal
        document.getElementById('close-prophet-modal-btn').addEventListener('click', () => {
            this.closeProphetModal();
        });

        // Prophets modal tabs switching
        const modalTabs = document.querySelectorAll('.modal-tabs .modal-tab');
        modalTabs.forEach(mtab => {
            mtab.addEventListener('click', () => {
                modalTabs.forEach(t => t.classList.remove('active'));
                mtab.classList.add('active');
                
                const panels = document.querySelectorAll('.modal-tab-contents .modal-tab-panel');
                panels.forEach(p => p.classList.remove('active'));
                
                document.getElementById(mtab.dataset.modalTab).classList.add('active');
            });
        });

        // Notification Setup buttons
        document.getElementById('notification-setup-btn').addEventListener('click', () => {
            document.getElementById('notification-modal').classList.add('open');
            document.getElementById('app-overlay').classList.add('open');
        });
        
        document.getElementById('close-notif-modal-btn').addEventListener('click', () => {
            document.getElementById('notification-modal').classList.remove('open');
            document.getElementById('app-overlay').classList.remove('open');
        });

        // Mobile sidebar toggling
        const sidebar = document.getElementById('surah-sidebar');
        // Let's toggle sidebar via a simple swipe or sidebar open button if needed.
        // Actually, we can add a mobile sidebar trigger to the UI if screen is mobile.
        // We'll let clicking the header logo toggle the sidebar on mobile!
        document.querySelector('.header-logo').addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.add('open');
                document.getElementById('app-overlay').classList.add('open');
            }
        });
        
        document.getElementById('close-sidebar-btn').addEventListener('click', () => {
            sidebar.classList.remove('open');
            document.getElementById('app-overlay').classList.remove('open');
        });
    }

    formatAudioTime(secs) {
        if (isNaN(secs)) return '00:00';
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${pad(m, 2)}:${pad(s, 2)}`;
    }
}

// Instantiate on load
window.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
