// functions:-               // تحليل العمليات اللى هنحتاجها فى الابلكيشن الى فانكشنز
// 01. get total             // لحساب السعر
// 02. creat product         // لانشاء منتج
// 03. save localstorage     // علشان حفظ البيانات لو عملت ريلود
// 04. clear inputs          // لمسح خانات الكتابه بعد ما نعمل كريت لاى عنصر
// 05. read                  // عرض المنتجات فى التابل
// 06. delete                // لمسح منتج واحد او اكتر
// 07. count                 // لعمل اكتر من منتج فى مره واحده
// 08. update                // التعديل على المنتجات
// 09. search                // البحث
// 10. clean data            // متدخلش منتج فاضى او اى بيانات مش عايزنها

// تعالى ننده على الانبوت
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

// 08. update.. هنعمل متغير لاتنين مود واحد كريت وواحد ابديت هنستخدمهم لما نحول زرار كريت لابديت والكعس وتعديل المود هيكون فى فنكشن الزرار نفسها وكمان متغير فاضى
let mood = 'create';                 // هنعمل هنا مود كريت ومود ابديت هنعمله تحت فى الفانكشن بتاعتها هنبدل كلمة كريت بأبديت
let tmp;                             //  ده كده متغير جلوبال هنحط فيه الاى فى فانكشن الاب ديت علشان نقدر نستخدمه فوق فى فانكشن السبمت اللى بتكريت اوبجيكت ونعمل ابد ديت بالاندكس

//console.log(title,price,taxes,ads,discount,total,count,category,submit);   // بنكتبهم فى الكونسلو نتأكد بس اننا مخترينهم كلهم خطوه احترازيه ههه

// functions:- 
// 01. get total 
function getTotal(){            // ونروح نعمل ايفنت اون كاى اب على الانبوتس اللى عايزينهم فى الاتش تى ام ال
    if(price.value != ''){     // لازم الاول نتأكد ان فى سعر للمنتج علشان نحسب الباقى
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;    // لاحظ ان المدخلات نصوص فهنحط موجب علشان نحولها لرقم
        total.innerHTML = result;
        total.style.background = 'green';
    }else{
        total.innerHTML = '';
        total.style.background = '#fa0';
    }
}

// 02. creat product   // افضل مكان نحفظ فيه داتا هو الاراى علشان بنقدر نسترجعها او نأكسس عليها بسهوله
let dataPro;                // هنعمل متغير فاضى علشان نحفظ فيه المنتجات ونوعه اراى بس هنعمل انشيليزى بس لان لو خلينها اراى كل ما يعمل ريفرش هيطير اللى هنخزنه تحت لانه هيشوف اراى فاضيه
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)   // تحت هنخزن استرينج فهنحولها هنا اراى تانى علشان نخزنها فى الاراى
}else{
    dataPro = [];                               // اما لو الاستوردج فاضيه فاعمل اراى فاضيه
}

submit.onclick = function(){       // دى تعتبر الفانكشن الرئيسيه اللى هتشغل المشروع
    let newPro = {                // بما ان كل منتج له اسم وسعر وخلافه فكل منتج يتحفظ فى اوبجيكت وبعدين يدخل الاراى
        title:title.value.toLowerCase(),    // هنخليها تتحول حروف اسمول علشان لما نعمل بحث فى فرق بين الكابيتال والاسمول طبعا
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,          // خلى بالك التوتال مش فاليو لانها مكتوبه فى سيمبال فى الاتش تى ام ال فبنستخدم انر اتش تى ام ال
        count:count.value,
        category:category.value.toLowerCase(),
    }

    // 10. clean data
    if(title.value != '' && price.value != '' && category.value != '' && newPro.count < 1000){     // متعملش اى حاجه غير لما الشروط دى تتحقق بنقوله قيمة الحاجات دى متكنش فاضيه والكونت اللى جى من الوبجيكت ميكنش اكبر من الف
        // 08. update  تابع جزء هنحط جواه جزء الكريت والكونت لو كان المود كريت ولو ايلس هنعمل الابديت
        if(mood === 'create'){
            // 07. count
            if(newPro.count > 1){                       // لو لقيت الكونت مكتوب فيها رقم اكبر من واحد نفذ الكود ده
                for(let i = 0; i < newPro.count; i++){  // هيعمل لوب بنفس عدد الرقم المكتوب
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);        // هنضيف كل اوبجيكت يتعمل فى الاراى ولو معملناش اراى الاوبجيكت الاولانى هيتمسح
            }
        }else{                              // طبعا اول لما ندوس على زرار ابديت هيرن الفانكشن بتاعت الابديت واحنا مخلين المود فيها ابديت بدل كريت
            dataPro[tmp] = newPro;          // وبطبيعة تعديل اى عنصر فى الاراى انى بنده على الاندكس واحط فيه القيمه الجديده هنستخدم المتغير اللى شايل الاندكس جواه مع الاراى وكده هنقدر نأكسس كل ماندكس ونحط قيمه جديده فيه
            mood = 'create';                // خلاص عدلنا رجعلنا المود تانى لكريت وده هيحصل مجرد ماندوس على زرار ابديت 
            submit.innerHTML = 'Create';    // ومننساش نرجع اسم الزرار تانى لكريت لانه بالفعل رجعنا لمود كريت
            count.style.display = 'block';   // وكمان نظهر انبوت الكونت
        }
        clearData();                     // نحط هنا كلير داتا علشان تشتغل اول ماندوس على كريت بشرط ان البيانات تكون كامله زى ما كتبنها فى اف  والا مش هتتمسح

    }


    // 03. save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro))   // طبعا لو عملنا ريفرش او ريلود كل الداتا هتتمسح فمحتاجين نحفظها فى اللوكل استوردج وهى مش بتشيل اراى فهنحولها استرينج من خلال جيسون

    showData();               // علشان نعرض البيانات الى لسه عملنلها كريت فى الجدول

}

// 04. clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// 05. read
function showData(){
    let table = '';           // عملنا متغير هنحط فيه الداتا اللى فى الاراى من خلال لوب عليها
    for(let i = 0; i < dataPro.length; i++){  // هنقول الجدول هيساوى الاراى هيكون غلط لان عندنا صف فيه بيانات معينه وبالتالى هنجيب صف من اللى عاملينه وندخل فى كل عنصر اللوب بتاعه يعنى اندكس دوت كذا وطبعا الاى دى هنحطله اى فقط علشان ياخد رقم كل مره
        // خلى بالك احنا عايزين نضيف كل مره فمننساش نعمل بلس قبل يساوى والا هيمسح القديم ويعملنا صف جديد
        table += `                    
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick='updateData(${i})' id="update">Update</button></td>
            <td><button onclick='deleteItemData(${i})' id="delete">Delete</button></td>
        </tr>
        `; 
    }        // هنعمل ايفنت لكل زرار ونحط جواه الفانكشن اللى تخصه

    document.getElementById('tbody').innerHTML = table;   // ندهنا على البادى بتاع الجدول وحطينه داخله المتغير بتاعنا اللى واخد بياناته من الاراى
    
    let deleteAll = document.getElementById('deleteAll'); // هننده على زرار دليت للكل فى متغير
    if(dataPro.length> 0){                               // هنقول لو الاراى او الجدول فيه بيانات اعمل زرار دليت للكل لو مفيش مش هيتعمل
        deleteAll.innerHTML = `
            <button onclick='deleteAllData()'>Delete All (${dataPro.length})</button>     
        `; // لاحظ هنا كتبنا طول الاراى جنب اسم الزرار علشان يطلع عدد العناصر اللى هتتمسح
    }else{
        deleteAll.innerHTML = '';
    }

    getTotal();              // هنشغل فانكشن جيت توتل علشان لون التوتال واعداداته تشتغل فى كل مره يتحدث فيها البيانات
}

showData();  // هنحط كمان الفانكشن هنا علشان لما نعمل ريفرش البانات تكون ظهره قصادنا مش لازم نضغط على كريت علشان تظهر

// 06. delete 
// مسح عنصر واحد فقط
function deleteItemData(i){                             // رقم اندكس العنصر i دى لازم تاخد براميتار علشان نحدد ايه الللى هيتمسح وهمررها 
    dataPro.splice(i, 1);                              // لمسح عنصر من الاراى وبتاخد رقمين الاول هو رقم العنصر التانى تمسح كام عنصر
    localStorage.product = JSON.stringify(dataPro);   // الخطوه اللى فاتت مسح من الاراى فقط ومش من الاستوردج ولذلك محتاجين نروح للوكل استوردج ونخزن فيها الاراى بعد المسح من تانى ومننساش لازم نهندلها كسترينج
    showData();                                      // وبرده مفيش حاجه هتظهر قصاد اليوزر على الشاشه لذلك لازم نستدعى الشو داتا تانى هنا
}


// مسح كل العناصر
function deleteAllData(){
    dataPro.splice(0);                // بنمسح كل حاجه من الاراى فبنكتب بين الاقواس صفر
    localStorage.clear();             // وبنعمل كلير لكل اللوكل استوردج للبرنامج
    showData();                       // وطبعا نرن الشو داتا علشان تحدث الصفحه فى وقتها
}

// 08. update     محتاجين البيانات اللى هندوس عندها لى ابديت تظهر فوق فى الانبوت علشان اقدر اعدل عليها وذرار كيريت يتحول ابديت
function updateData(i){
    title.value = dataPro[i].title;           // هنحط فى الانبوت فاليو قيمة كل اندكس خاص بيها من البيانات اللى عندنا اللى هنعدلها
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].price;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();                               // طلبنا تشغيل فانكشن السعر كله لانها مش بتشتغل غير لو دخلنا بيانات واحننا مش هنكتب ولكن استدعينا البيانات فكان لازم نستدعيها علشان تشتغل
    count.style.display = 'none';             // ومش محتاجين انبوت الكونت هنا فهنعمله ديسبلى نن
    submit.innerHTML = 'Update';              // هنغير اللى مكتوب على زرار كريات وهناكتب كلمة ابديت
    mood = 'update';                         // غيرنا المود الى اب ديت ومود كريت معمول فوق
    tmp = i;                                 // حطينا الاى فى تيمب المتغير الجلوبال علشان نستخدمه فوق فى جزء التعديل
    scroll({                                 // وممكن نروح نقول للسكرول يطلع لفوق بنعومه علشان نشوف البيانات
        top:0,
        behavior: 'smooth',
    })
}

// 09. search   عملين فى برنامجنا نوعين من البحث التايتل والكاتجرى لذلك هنعمل مود لكل حاجه تشتغل بيه
let searchMood = 'title';
let search = document.getElementById('search');   // وهننده على انبوت السيرش فى متغير 

function getSearch(id){                 // وهنمرر لها الاى دى بتاع الزراروهتكون للعب على الزراير
    if(id == 'searchTitle'){                  // طبعا الفانكشن هتستلم الاى دى بتاع الزرار اللى اليوزر هيدوس عليه وهنستخدمه هنا مع اف وندخل فيها المود اللى عايزينه بتاع الاى دى
        searchMood = 'title';     
    }else{
        searchMood = 'category';
    }
    
    search.placeholder = 'Search by ' + searchMood;  // تنسيق انه يكتب المود جوه الزار
    search.focus();                 // كده لما نضغط على اى زرار للسيرش هيعمل فوكس على الانبوت
    search.value = '';              // كمان لو دسنا على اى زرار فضى محتوى الانبوت بتاع السيرش
    showData();                    // وشغل الشو داتا علشان المنتجات تظهر طالما خانات البحث فاضيه
}

function searchData(value){          // دى فانكشن السيرش نفسها وهتشتغل لما نكتب حاجه فى السيرش وهنمررلها الفاليو اللى هتتكتب فى السيرش وطبعا بما ان الداتا فى اراى فهنعمل لوب
    let table = '';                  // اول حاجه نفضى التابل علشان يستقبل بيانات السيرش فقط

    if(searchMood == 'title'){        // هنا البحث من خلال التايتل
        for(let i = 0; i < dataPro.length; i++){    // اعمل لوب على الاراى
            if(dataPro[i].title.includes(value.toLowerCase())){   // لو التايتل اللى جوه الاندكس يساوى الفالبو اللى جايه من انبوت السيرش -بعد ما نخليها حروف سمول وعملنها سمول فوق فى الكريت اصلا- نفذ الكود الجاى
                // هنجيب كل بيانات الجدول اللى عملناها فوق فى الشو داتا كوبى باست طبعا لو الفاليو موجود الاف هتدى ترو فهيطبع هنا حاجات السيرش فقط
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick='updateData(${i})' id="update">Update</button></td>
                    <td><button onclick='deleteItemData(${i})' id="delete">Delete</button></td>
                </tr>
                `; 
                
            }
        }

    }else{                                          // هنا من خلال الكاتجرى وهنجيب الجزء اللى فوق من اول اللوب نحطه هنا كوبى هنغير بس كلمة تايتل نخليها كاتجرى
        for(let i = 0; i < dataPro.length; i++){    
            if(dataPro[i].category.includes(value.toLowerCase())){   // لو التايتل اللى جوه الاندكس يساوى الفالبو اللى جايه من انبوت السيرش نفذ الكود الجاى
                // هنجيب كل بيانات الجدول اللى عملناها فوق فى الشو داتا كوبى باست طبعا لو الفاليو موجود الاف هتدى ترو فهيطبع هنا حاجات السيرش فقط
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick='updateData(${i})' id="update">Update</button></td>
                    <td><button onclick='deleteItemData(${i})' id="delete">Delete</button></td>
                </tr>
                `; 
                
            }
        }
    }
     // وهنا كنوع من تحسين الكود ممكن نعمل الاول فور وجوها اف ايلس ودى هخليها احسنها بعدين مع باقى التحسينات اللى ناوى عليها
    document.getElementById('tbody').innerHTML = table;  // نفس السطر جايبينه من الشو داتا علشان نحط بيانات البحث فى البادى للتابل
}

// 10. clean data  هنتحمك فى الداتا اللى داخله وده كان بيحصل فى فانكشن كريت فهنروحلها عند .2.8 فوق



