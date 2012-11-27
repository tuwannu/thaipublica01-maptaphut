var pmList = {
    2523: { 
        'fullname'    : 'พล.อ.เปรม ติณสูลานนท์', 
        'start_year'  : 2523, 
        'end_year'    : 2529,
        'events'      : [
            'มีนาคม 2524 - ริเริ่มโครงการพัฒนาพื้นที่ชายฝั่งทะเลตะวันออกเฟสที่ 1 มีการมอบหมายให้สำนักผังเมืองดำเนินการวางผังเมืองรวมบริเวณอุตสาหกรรมหลังและชุมชนจังหวัดระยอง',
            'พฤศจิกายน 2529 ทำพิธีเปิดนิคมอุตสาหกรรมมาบตาพุด'
        ]
    },
    2531: {
        'fullname'  : 'พล.อ.ชาติชาย ชุณหะวัณ',
        'start_year': 2531,
        'end_year'  : 2534,
        'events'    : [
            'ตั้งเป้าให้ไทยเป็นเสือตัวที่ 5 ขอเอเชีย ทำให้มีการขายพื้นที่นิคมอุตสาหกรรมออกไปจาก 8,000 ไร่เป็น 20,000 ไร่',
            '5 สิงหาคม 2531 มีการประกาศใช้ผังเมืองมาบตาพุดปี 2531 พร้อมกับลงทุนก่อสร้างโรงงานปิโตรเคมีและพลาสติกเป็นจำนวนมาก'
        ]
    }
};

$(document).ready(function() {
    var svggraph = $('#svggraph').svg()
    svggraph.load('graph.svg?'+Math.random(), 'get', function (svg) {
        var data = $('svg > g', $('#svggraph'))
        window.activeLayers2 = []

        window.gr2 = _.groupBy(data, function(i) {
            return i.id.split('_')[0] || 'other'
        })

        // CREATE LAYER MANAGER
        window.LayerManager2 = CreateLayerManager(gr2, activeLayers2) // LAYER MANAGER
        LayerManager2.show('graph', ['Factory', 'Accident', 'Event', 'GPP'])

        // BIND EVENT
        bindEvent(LayerManager2.funcs['graph-Factory'].data(), jQuery('[id$="factoryBubble"]'))
        bindEvent(LayerManager2.funcs['graph-GPP'].data(), jQuery('[id$="gppBubble"]'))

        $('#all-primeMinister image').click(function(){
            var pmId = $(this).attr('id').split('-')[0];
            var pm = pmList[pmId]
            $.colorbox({
                html        :"<div><p class='fullname'>" + pm['fullname'] + "</p><p class='holdyear'>พศ." + pm['start_year'] + "-พศ." + pm['end_year'] + "</p>" +  "</div>",
                width       :"30%",
                opacity     :0,
                transition  :'none'
            });

        });
    })


    function bindEvent(data, bubble) {
        var bindBubble = function(v, idx) {
            var t1;
            $(v).mouseenter(function(e) {
                t1 = new Date();
                console.log('enter')
                var $this = $(this);
                $this.css({'opacity': 1.0, 'cursor': 'pointer'});
                bubble.hide()
                e.stopPropagation()
                bubble.eq(idx).show()
            })
            .mouseleave(function(e){
                var t2 = new Date();
                var diff = t2 - t1;
                console.log(diff)
                if (diff>80) {
                    bubble.eq(idx).fadeOut()
                }
                else {
                   setTimeout(function() {
                        bubble.eq(idx).fadeOut()
                    }, 300)
                }
            })
        }
        // _.each($('line', data), function(v, idx) {
        //         bindBubble(v, idx)
        // })

        _.each($('circle', data), function(v, idx) {
                bindBubble(v, idx)
        })
    }


})