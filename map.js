// ACCIDENT
var accidentList = [
    ['พศ.2530', 'เพลิงลุกไหม้จากการรั่วไหลของเอทิลีน (Ethylene)', 'Thai Petrochemical Industry Ltd. (TPI) จ.ระยอง', 'ไม่มีรายงานความเสียหาย'],
    ['พศ.2538', 'เพลิงลุกไหม้จากการรั่วไหลของเอทิลีน (Ethylene)', 'Thai Petrochemical Industry Ltd. (TPI) จ.ระยอง', 'ไม่มีรายงานความเสียหาย'],
    ['12 มิถุนายน พศ.2542', 'รถบรรทุกกรดไฮโดรคลอริก 35% ขนาด 11 ตัน ของบริษัทซีแอลทราน สปอร์ต จำกัด ระเบิดและรั่วไหล เกิดควันของไอกรดฟุ้งกระจาย', 'ถนนสาย 3138 (ระยอง-บ้านค่าย) อ.เมือง จ.ระยอง', 'มีผู้เจ็บป่วยจากการสูดดมก๊าซไฮโดรคลอริก 5 ราย'],
    ['6 มีนาคม พศ.2543', 'ท่อส่งก๊าซคาร์บอนิลคลอไรด์ (ฟอสจีน) เกิดการแตกรั่ว', 'บริษัทไทยโพลีคาร์บอเนต จำกัด นิคมอุตสาหกรรมผาแดง อ.เมือง จ.ระยอง', 'ประชาชนได้รับอันตรายจากการสูดดมก๊าซพิษจำนวนมาก เสียชีวิต 1 คน'],
    ['18 มิถุนายน พศ.2543', 'รถบรรทุก 10 ล้อ ขนโซดาไฟ พลิกคว่ำลงคลอง ทำให้โซดาไฟที่บรรจุในถุงละลายไปกับน้ำ', 'ทางหลวงในเขต กิ่ง อ.พนัสนิคม จ.ระยอง', 'คนขับรถเสียชีวิต 1 คนโซดาไฟแพร่กระจายเป็นระยะทาง 8 กม. ทำให้ปลาตายจำนวนมาก'],
    ['23 พฤศจิกายน พศ.2543', 'รถขนกรดซัลฟูริก 98% ความจุ', '12 ตัน พุ่งชนรถคันอื่น ทำให้กรด ซัลฟูริกไหลลงคลองข้างทาง', 'ต.มาบตาพุด อ.เมือง จ.ระยอง  บาดเจ็บ 2 ราย'],
    ['1 มกราคม พศ.2544', 'เรือบรรทุกแอมโมเนียมไนเตรทปริมาณ 125 ตู้คอนเทนเนอร์ล่มขณะขนย้ายสินค้าลงเรือ', 'ท่าเทียบเรือ บ.อุตสาหกรรมปิโตรเคมีกัลไทย จำกัด จ.ระยอง', 'ปลาตายจากสารเคมีรั่วไหล'],
    ['4 มีนาคม พศ.2544', 'รถบรรทุกเทรเลอร์บรรทุกโซดาไฟพลิกตะแคงในซอยเข้าหมู่บ้านตะกาด หมู่ 4 ต.ตะพง อ.เมือง จ.ระยอง สารเคมีไหลลงสู่แหล่งน้ำ', 'อ.เมือง จ.ระยอง', 'สารเคมีไหลลงสู่แหล่งน้ำกินของสัตว์เลี้ยงบริเวณทุ่งนา และมีปลาตายจำนวนมาก'],
    ['5 มีนาคม พศ.2544', 'รถบรรทุกสารเคมีซีโฟร์พลิกคว่ำขณะนำส่งสารเคมีที่บริษัทอุตสาหกรรมปิโตรเคมีกัลไทย จำกัด', 'นิคมอุตสาหกรรมมาบตาพุด อ.เมือง จ.ระยอง', 'ไม่มีรายงานความเสียหาย'],
    ['6 มีนาคม พศ.2544', 'รถบรรทุกของบริษัทเซออนเคมิคอล ซึ่งบรรทุกสาร Butadiene Raffinate จำนวน 16 ตัน พลิกคว่ำ', 'นิคมอุตสาหกรรมมาบตาพุด อ.เมือง จ.ระยอง', 'ไม่มีรายงานความเสียหาย'],
    ['7 มีนาคม พศ.2544', 'รถบรรทุกสารเคมีพลิกคว่ำ  ทำให้สารเคมีซึ่งคาดว่าเป็นแคลเซียมออกไซด์ (CaO) หกหล่นและถูกทิ้งไว้ในบริเวณนั้น', 'บ้านตะกาด หมู่ 4 ต.ตะพง อ.เมือง จ.ระยอง', 'ส่งผลกระทบต่อดินและหญ้าในบริเวณดังกล่าว ทำให้ดินมีสีจางลง และหญ้าตาย'],
    ['18 มิถุนายน พศ.2544', 'รถบรรทุกกรดไฮโดรคลอริก 35% ขนาด 11 ตันของบริษัทซีแอลทราน สปอร์ต จำกัด ระเบิดและรั่วไหล', 'ถนนสาย 3138 (ระยอง-บ้านค่าย) อ.เมือง จ.ระยอง', 'กรดไฮโดรคลอริกรั่วไหลลงพื้นถนนเป็นระยะทาง 25 กม. มีผู้เจ็บป่วยจากการสูดดมกรด 5 ราย'],
    ['10 เมษายน พศ.2545', 'เกิดการระเบิดของสารเคมีในถังผสมสาร (ไนโตรเซลลูโลส และสารไวไฟหลายชนิด)', 'บริษัทไทยโดโน-เกนเกน จำกัดกิ่ง อ.นิคมพัฒนา จ.ระยอง', 'อาคารผลิตเสียหายทั้งหลัง มูลค่าความเสียหาย50 ล้านบาท และเกิดก๊าซพิษ'],
    ['13 เมษายน พศ.2545', 'ไฟไหม้โรงงานผลิตพลาสติก', 'บริษัทเอสทีดี พรีซีซัน จำกัด อ.บ้านฉาง จ.ระยอง', 'ความเสียหายมากกว่า 60 ล้านบาท'],
    ['3 พฤษภาคม พศ.2545', 'รถบรรทุกสาร White Oil ของบริษัท S&R Transport ประสบอุบัติเหตุชนกับรถกระบะ ทำให้สารเคมีรั่วไหลลงสู่พื้นถนน', 'ถนน By-pass สาย 36 กิ่ง อ.นิคมพัฒนา จ.ระยอง', 'กลิ่นจากไอระเหยของสาร ทำให้เกิดการระคายเคืองตา ผิวหนัง และระบบทางเดินหายใจ'],
    ['25 มิถุนายน พศ.2545', 'เกิดเหตุระเบิดที่โรงงานบรรจุก๊าซ ขณะคนงานถ่ายก๊าซจากถังใหญ่ลงถังเล็ก', 'ห้างหุ้นส่วนจำกัด ไทยผลิตภัณฑ์ก๊าซ ต.เนินพระ อ.เมือง จ.ระยอง', 'โรงงานได้รับความเสียหาย คนงานเสียชีวิต 1 ราย และได้รับบาดเจ็บ 1 ราย'],
    ['11 ธันวาคม พศ.2545', 'โรงงานอุตสาหกรรมลักลอบนำน้ำกรดมาทิ้ง', 'ชุมชนบ้านชากกลาง หมู่ 4 ต.ห้วยโป่ง อ.เมือง จ.ระยอง', 'น้ำในคลองเน่าเสีย  เมื่อถูกตามร่างกายจะคันและแสบมาก'],
    ['3 ธันวาคม พศ.2547', 'เพลิงไหม้โกดังเก็บวัตถุดิบสำหรับผลิตพีวีซีหรือพลาสติกแผ่นแข็ง', 'โรงงานซีพีเจริญโภคภัณฑ์ปิโตรเคมี จำกัด กิ่งอำเภอนิคมพัฒนา จ.ระยอง', 'เพลิงใหม้กว่า 2 ชั่วโมง สูญเสียไม่ต่ำกว่า 100 ล้านบาท'],
    ['20 กันยายน พศ.2548', 'แอมโมเนียรั่วออกมาจากท่อส่งที่ผุกร่อน', 'โรงงานแปรรูปอาหารทะเลบริษัท เจริญโภคภัณฑ์อาหาร จำกัด จ.ระยอง', 'ไม่มีรายงานความเสียหาย'],
    ['22 กันยายน พศ.2548', 'เพลิงไหม้ถังน้ำมันเตาและน้ำมันดีเซล', 'บริษัท มิยูกิ อินดัสทรี (ประเทศไทย) จำกัด นิคมอุตสาหกรรมสยามอิสเทิร์น', 'น้ำมันเตาและน้ำมันดีเซลไหม้ไฟไปอย่างละประมาณ 3 หมื่นลิตร'],
    ['4 พฤษภาคม พศ.2549', 'น้ำมันเตารั่วไหลลงทะเล ขณะกำลังขนถ่ายจากคลังน้ำมันลงเรือ CT 34 ประเทศไทย', 'ท่าเรือโรงกลั่นน้ำมัน บริษัท อัลลายแอนซ์ รีไฟน์นิ่ง จำกัด นิคมอุตสาหกรรมมาบตาพุต อ. เมือง จ. ระยอง', 'น้ำมันเตารั่วไหลลงทะเลประมาณ 15,000 ลิตร'],
    ['3 พฤศจิกายน พศ.2549', 'รถบรรทุกสารแมททิวลีน บรรจุถัง 200 ลิตร จำนวน 4 ถัง และสารเคมีทินเนอร์ บรรจุถัง 20 ลิตร จำนวน 7 ถัง พลิกคว่jeเกิดไฟลุกไหม้ทั้งคัน', 'ถนนสาย 36 กม.31 หมู่ 6 ต.มะขามคู่ อ.นิคมพัฒนา จ.ระยอง', 'มีผู้บาดเจ็บเล็กน้อย 1 ราย'],
    ['16 พฤศจิกายน พศ.2549', 'คนงานใช้รถแบ็คโฮผสมขยะในบ่อปรับเสถียรและเติมสารเคมีลงไป ทำให้เกิดประกายไฟลุกใหม้กองขยะ', 'บริษัทบริหารและพัฒนาเพื่อการอนุรักษ์สิ่งแวดล้อม จำกัด (มหาชน) ถ.ไอ2 นิคมอุตสาหกรรมมาบตาพุด จ.ระยอง', 'ไม่มีรายงานความเสียหาย'],
    ['5 ธันวาคม พศ.2549', 'มีการรั่วไหลของสารระเหยอินทรีย์หลายชนิด โดยเฉพาะสารไฮโดรปิโตรเลียม จากถังเก็บสารเคมีในบริเวณปั้มน้ำมัน', 'ปั๊มน้ำมัน ตันติชัย จำกัด ริมถนนสุขุมวิทเลขที่ 227/10 หมู่ 6 ริมถนนสุขุมวิท ต.ทุ่งควายกิน อ.แกลง จ.ระยอง', 'ประชาชนบริเวณรอบ 300 เมตรสูดดมสารเคมีเกิดการอาเจียน หน้ามืด วิงเวียน และหมดสติ'],
    ['2 มกราคม พศ.2550', 'ไฟไหม้โรงงานเก็บเม็ดพลาสติก', 'บริษัท จิ้งฮงระยอง จำกัด 81/4 ถนนสายบายพาส 36 ต.เชิงเนิน อ.เมือง จ.ระยอง', 'ไม่มีรายงานความเสียหาย'],
    ['9 มกราคม พศ.2550', 'ไฟไหม้ถังเก็บสารเอทธิลีน ภายในแทงก์ฟาร์มของโรงงานบริษัท ไออาร์พีซี (ทีพีไอ)', 'โรงงานบริษัท ไออาร์พีซี (ทีพีไอ) ต. เชิงเนิน อ. เมืองระยอง', 'เพลิงไหม้ถังเก็บสารเอทธิลีน 1 ลูก'],
    ['18 กุมภาพันธ์ พศ.2550', 'เกิดไฟไหม้ที่เครื่องยนต์ ภายในรถบรรทุกเม็ดพลาสติกกว่า 1,000 ตัน', 'บริเวณถนนบายพาสระยอง-กระทิงลาย ต.มะขามคู่ กิ่ง อ.นิคมพัฒนา จ. ระยอง', 'มูลค่าความเสียหายกว่า 1 ล้านบาท'],
    ['27 สิงหาคม พศ.2550', 'ลักลอบทิ้งกากของเสียจากโรงงานอุตสาหกรรม', 'บริเวณป่าริมถนนสายบายพาส 36 ระหว่างหลักกิโลเมตร 35-36 เขตเทศบาลเมืองมาบตาพุด จ.ระยอง', 'ส่งกลิ่นเหม็นรุนแรงไปทั่วบริเวณ'],
    ['6 กุมภาพันธ์ พศ.2551', 'มีการลักลอบทิ้งสารเคมี ลักษณะสีขาวข้นจำนวนมาก   ภายในซอยกอไผ่ ต.เนินพระ เขตเทศบาลเมืองมาบตาพุด จ.ระยอง', 'บาดเจ็บ 4 ราย มีอาการเจ็บคอ หายใจไม่สะดวก เวียนศีรษะ อ่อนเพลีย มีผื่นและแสบผิวหนัง'],
    ['10 มิถุนายน พศ.2551', 'ท่อส่งสารคิวมีน (Cumene) ขนาด 6 นิ้ว รั่วไหล ทำให้ก๊าซพิษกระจายไปทั่วโรงงาน', 'บริษัท พีทีที ฟีนอล จำกัด นิคมอุตสาหกรรมเหมราช  ถนนปกรณ์สงเคราะห์ ต.ห้วยโป่ง อ.เมือง จ.ระยอง', 'มีผู้ได้รับบาดเจ็บจากการสูดดมก๊าซพิษทั้งสิ้น 112 ราย ในจำนวนนี้มีอาการสาหัส 33 ราย'],
    ['6 กันยายน พศ.2551', 'ลักลอบทิ้งกากของเสียอุตสาหกรรม ลักษณะเป็นก้อนสีดำจำนวนมาก', 'ริมถนนสาย 36 หมู่ 2 ต.เชิงเนิน จ.ระยอง', 'ส่งกลิ่นเหม็น ฟุ้งกระจายไปทั่วบริเวณ'],
    ['31 มกราคม พศ.2552', 'น้ำมันจำนวนมากรั่วไหลออกมาจากเรือบรรทุกน้ำมัน กระจายลงทะเลเป็นบริเวณกว้าง', 'บริเวณชายหาดแหลมรุ่งเรือง ใกล้กับท่าเทียบเรือของ บริษัท ไออาร์พีซี จำกัด (มหาชน) จ. ระยอง', 'คราบน้ำมันแผ่ครอบคลุมพื้นที่เป็นบริเวณกว้าง และถูกคลื่นลมพัดเข้าสู่ชายฝั่งทะเล'],
    ['13 กุมภาพันธ์ พศ.2552', 'ก๊าซไฮโดรเจนซัลไฟด์รั่วไหล', 'บริษัท ปตท. เคมีคอล จำกัด (มหาชน) ถนนไอ นิคมอุตสาหกรรมมาบตาพุด ต.ห้วยโป่ง อ.เมือง จ.ระยอง', 'คนงานและผู้รับเหมาจำนวน 27 ราย มีอาการวิงเวียนศีรษะ แน่นหน้าอก หายใจไม่ออก มี 4 รายอาการสาหัส'],
    ['2 มีนาคม พศ.2552', 'มีการลักลอบนำขยะสารเคมีจากโรงงานผลิตเม็ดพลาสติกมาทิ้ง', 'พื้นที่รกร้างริมคลองน้ำหูคลองสาธารณะ เขตเทศบาลเมืองมาบตาพุด จ.ระยอง', 'กากขยะสารเคมีส่งกลิ่นเหม็นฉุนรุนแรงทั่วบริเวณ'],
    ['7 พฤษภาคม พศ.2552', 'ไฟไหม้บริเวณบ่อน้ำมันออแกไนซ์จำนวน 7 บ่อ ภายในโรงงานหลอมเหล็ก', 'บริษัท ไทยคูน เวิลด์ไวด์กรุ๊ป (ประเทศไทย) จำกัด 99 ม.1 นิคมอุตสาหกรรมระยอง อ.นิคมพัฒนา จ.ระยอง', 'ไม่มีรายงานความเสียหาย'],
    ['5 พฤษภาคม พศ.2555', 'เหตุเพลิงไหม้โรงงานของบริษัท บีเอสที อิลาสโตเมอร์ส จำกัด ในเครือบริษัท กรุงเทพ ซินธิติกส์ จำกัด', 'นิคมอุตสาหกรรมมาบตาพุด อ.เมือง จ.ระยอง', 'มีผู้เสียชีวิต 11 คนและบาดเจ็บ 181 คน'],
]

$(function() {
    var svg = $('#svgload').svg({width: 300, height: 200})

    // LOAD SVG
    svg.load('map.svg', 'get', function(mapdata) {
        var activeLayers1 = []
        var data = $('svg > g', $('#svgload'))
        window.gr = _.groupBy(data, function(i) {
            return i.id.split('_')[0] || 'other'
        })

        // CREATE LAYER MANAGER
        window.LayerManager = CreateLayerManager(gr, activeLayers1) // LAYER MANAGER

        var graph_control_labels = [{
            "key": "Accident",
            "class": "accident",
        },
        {
            "key": "Event",
            "class": "event"
        },
        {
            "key": "GPP",
            "class": "gpp"
        },
        {
            "key": "Factory",
            "class": "factory"
        }
        ];

        var map_control_labels = [{
                    "key": "พท-เกษตรกรรม",
                    "class": "agriculture",
                    "text": "พื้นที่เกษตรกรรม",
                    "tipsyGravity": "e"
                }, {
                    "key": "อาศัย",
                    "class": "home",
                    "text": "พื้นที่ที่อยู่อาศัย",
                    "tipsyGravity": "w"
                }, {
                    "key": "พท-อนุรักษ์",
                    "class": "environment",
                    "text": "พื้นที่อนุรักษ์",
                    "tipsyGravity": "e"
                }, {
                    "key": "อุตสาหกรรมคลังสินค้า",
                    "class": "factory",
                    "text": "พื้นที่อุตสาหกรรมคลังสินค้า",
                    "tipsyGravity": "w"
                }, {
                    "key": "ราชการ",
                    "class": "government",
                    "text": "พื้นที่ราชการ",
                    "tipsyGravity": "e"
                }, {
                    "key": "อุตสาหกรรมไม่ก่อมลพิษ",
                    "class": "green-factory",
                    "text": "พื้นที่อุตสาหกรรมที่ไม่ก่อมลพิษ",
                    "tipsyGravity": "w"
                }, {
                    "key": "พท-โล่งเพื่อนันทนาการ",
                    "class": "area",
                    "text": "พื้นที่โล่งเพื่อกิจกรรมนันทนาการ",
                    "tipsyGravity": "e"
                }];

        // CREATE MAP CONTROL
        var lays = LayerManager.getAllLayers('#map-control')
        var createControlButton = function(data, $target, callback, prefixId) {
            _.each(data, function(item, k){
                var layerId = 'layer'+k

                prefixId = prefixId || '';
                elm = $('<div></div>').
                    attr({
                        id: prefixId + layerId.toString(),
                        value: item.key,
                        'class': item['class'],
                        'selected': true,
                        'title': item['text']
                    }).
                    css({float: 'left', width: '76px', height: '36px'});
                elm.addClass('selected');
                elm.mouseenter(function(e) {
                    $(this).css({'opacity': 1.0, 'cursor': 'pointer'});
                })
                elm.click(function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    var $attr = $this.attr('selected')
                    if ($attr) {
                        $this.removeClass('selected')
                    }
                    else {
                        $this.addClass('selected')
                    }
                    $(this).attr('selected', !$attr);
                    if (_.isFunction(callback)) {
                        callback();
                    }
                });

                // Initial tipsy.
                elm.tipsy({
                    gravity: item['tipsyGravity']
                });
                $target.append(elm);
            })
        }

        createControlButton(map_control_labels, $('#map-control'), function(){
            LayerManager.show(currentYear || 2531, getCurrentLayers('#map-control'));
        }, 'area-filter-');

        createControlButton(graph_control_labels, $('#graph-control'), function(){
            LayerManager2.show('graph', getCurrentLayers('#graph-control'));
        });

        $('image[id*="accident"]').
            mouseenter(function(e) {
                $(this).css({cursor: 'pointer'})
            }).
            click(function(){
            var elmId = $(this).attr('id').split('accident')[1];
            var accId = parseInt(elmId) - 1;
            var template = _.template("<div>\
                                        <p class='acc_date'> <%= date %> </p> \
                                        <p class='acc_desc'> <%= desc %> </p> \
                                        <p class='acc_loc'><label>สถานที่: </label> <%= location %> </p>\
                                        <p class='acc_eff'><label>ผลกระทบ: </label> <%= effect %> </p>\
                                       </div>");

            var data = {
                    date: accidentList[accId][0], desc: accidentList[accId][1],
                    location: accidentList[accId][2], effect: accidentList[accId][3]
                }

            $.colorbox({
                html        : template(data),
                width       :"580px",
                opacity     :0.8,
                // transition  : 'fade',
                width       : '500px',
                height      : '75%'

                // transition: 'fade'
            });
            //$(".group3").colorbox({rel:'group3', transition:"none", width:"75%", height:"75%"});
        });

        LayerManager.show(2531, lays)
    }) // LOAD SVG

});