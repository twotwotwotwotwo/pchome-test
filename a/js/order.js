$(function()
{
var objAct = {"Id":"OR5300482","StartDate":"2018/06/24 00:00:00", "EndDate":"2018/07/10 09:59:59"} ;

var bolsLogin = false ;

$(document)
    .on('click', '#Send', function()
    {
        var re  = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/ ;
        var re2 = new RegExp("'|\|、|,|;|\/| |", "i") ;
        var strEmail = $('#Email').val() ;
        var isBuyerEmail = $('#isBuyerEmail').is(':checked') ;

        if (strEmail == '')
        {
            $('#EmailError1').show() ;
            $('#EmailError2').hide() ;
        }
        else if ((!re2.test(strEmail) || !re.test(strEmail)) && isBuyerEmail == false)
        {
            $('#EmailError2').show() ;
            $('#EmailError1').hide() ;
        }
        else
        {
            $(document).trigger('_doRegister') ;
        }
    })
    .on('click', '#isBuyerEmail', function()
    {
        var elEmail = $('#Email') ;
        var strEmail = elEmail.attr('_email') ;

        if ($(this).is(':checked') == true)
        {
            elEmail.val(strEmail) ;
        }
        else
        {
            elEmail.val('') ;
        }
    })
    .on('click', '#GoShopping', function()
    {
        $(".noMatch").modal('hide') ;

        window.open('https://24h.pchome.com.tw/', '_blank') ;
    })
    .on('change', '#Email', function()
    {
        $('#isBuyerEmail').attr('checked', false) ;
    })
    .on('_doRegister', function(e)
    {
        var elBuyer        = $('#Buyer') ;
        var objPrize       = elBuyer.data('_objPrize') ;
        var objRegister    = elBuyer.data('_objRegister') ;
        var intIsNeedEmail = elBuyer.data('_intIsNeedEmail')  ;
        var strActId       = objAct.Id ;
        var strPrizeUid    = objPrize.PrizeUid ;

        var objData = {} ;
        objData.Id           = strActId ;
        objData.PrizeUid     = strPrizeUid ;
        objData.isBuyerEmail = intIsNeedEmail == false ? 0 : $('#isBuyerEmail').is(':checked') ? 1 : 0 ;
        objData.Email        = intIsNeedEmail == false ? '' : $('#Email').val() ;
        objData.Buyer        = {} ;
        objData.Buyer.Name    = '' ;
        objData.Buyer.Mobile  = '' ;
        objData.Buyer.Tel     = '' ;
        objData.Buyer.Zip     = '' ;
        objData.Buyer.Address = '' ;
        objData.Buyer.Email   = '' ;

        if (intIsNeedEmail == 1)
        {
            objData.Buyer = objRegister.Buyer ;
        }

        $.ajax({
             url: '//ecapi.pchome.com.tw/marketing/order/v1/index.php/activity/'+strActId+'/prizeuid/'+strPrizeUid+'/register'
            ,data: JSON.stringify(objData)
            ,type: 'POST'
            ,xhrFields: {withCredentials:true}
        })
        .done(function()
        {
            elBuyer.modal('hide') ;
            $(".regOK").modal('show') ;
        })
        .fail(function(jqXHR)
        {
            elBuyer.modal('hide') ;

            if (jqXHR.responseText != '')
            {
                switch($.parseJSON(jqXHR.responseText).Code)
                {
                    case '400-003' :
                        $(".ReachLimit").modal('show') ;
                    break ;

                    case '400-004' :
                        $(".regEver").modal('show') ;
                    break ;

                    case '400-005' :
                        $(".noMatch").modal('show') ;
                    break ;

                    case '400-001' :
                    case '400-002' :
                    case '400-006' :
                    case '400-007' :
                        $(".Fail").modal('show') ;
                    break ;
                }
            }
        }) ;
    })
    .on('click', '#Register', function()
    {
        var strDate = new Date() ;
        var elBuyer = $('#Buyer') ;

        if (strDate < new Date(objAct.StartDate))
        {
            $(".overtime").modal('show') ;
        }
        else if (strDate > new Date(objAct.EndDate))
        {
            $(".end").modal('show') ;
        }
        else
        {
            $.ajax({
                 url : '//ecapi.pchome.com.tw/marketing/order/v1/index.php/activity?id='+objAct.Id
                ,dataType : 'jsonp'
                ,jsonp : '_callback'
                ,jsonpCallback : 'jsonpcb_publickey'
                ,cache : false
            })
            .done(function(arrAct)
            {
                objAct   = arrAct[0] ;
                var objPrize = objAct.Prize[0] ;

                elBuyer.data('_objPrize', objPrize) ;

                var intRemain = objPrize.RegisterNum < objPrize.Qty ? objPrize.Qty - objPrize.RegisterNum : 0 ;

                if (objAct.Type == 'LuckyDraw' || intRemain > 0)
                {
                    var bolIsNeedEmail = objAct.Type == 'GiveAway' &&
                                            (($.inArray(objPrize.Type, ['PCoin', 'Bonus']) >= 0 && objPrize.Points <= 1000)
                                            || (objPrize.Type == 'Coupon' && objPrize.Price <= 1000)) ? 0 : 1 ;

                    $.ajax({
                             url : '//ecapi.pchome.com.tw/member/v2/member/islogin'
                            ,dataType : 'jsonp'
                            ,jsonp : '_callback'
                            ,jsonpCallback : 'jsonpcb_OrderIsLogin'
                            ,cache : false
                    })
                    .done(function(intRs)
                    {
                        if (intRs == 1)
                        {
                            $.ajax({
                                 url : '//ecapi.pchome.com.tw/marketing/order/v1/index.php/activity/'+objAct.Id+'/prizeuid/'+objAct.Prize[0].PrizeUid+'/register'
                                ,dataType : 'jsonp'
                                ,jsonp : '_callback'
                                ,jsonpCallback : 'jsonpcb_getregister'
                                ,cache : false
                            })
                            .done(function(objRegister)
                            {
                                if (typeof objRegister.Code != 'undefined')
                                {
                                    switch(objRegister.Code)
                                    {
                                        case '400-003' :
                                            $(".ReachLimit").modal('show') ;
                                        break ;

                                        case '400-004' :
                                            $(".regEver").modal('show') ;
                                        break ;

                                        case '400-005' :
                                            $(".noMatch").modal('show') ;
                                        break ;

                                        case '400-001' :
                                        case '400-002' :
                                        case '400-006' :
                                        case '400-007' :
                                            $(".Fail").modal('show') ;
                                        break ;
                                    }
                                }
                                else
                                {
                                    elBuyer.data('_objRegister', objRegister) ;
                                    elBuyer.find('#MemberId').val(objRegister.MemberId) ;
                                    elBuyer.find('#Name').val(objRegister.Buyer.Name) ;
                                    elBuyer.find('#Mobile').val(objRegister.Buyer.Mobile) ;
                                    elBuyer.find('#Tel').val(objRegister.Buyer.Tel) ;
                                    elBuyer.find('#Address').val(objRegister.Buyer.Zip + objRegister.Buyer.Address) ;

                                    elBuyer.find('#Email')
                                            .attr('_email', objRegister.Buyer.Email)
                                            .val('') ;

                                    elBuyer.find('#isBuyerEmail')
                                            .attr('checked', false) ;

                                    elBuyer.find('#EmailError1').hide() ;
                                    elBuyer.find('#EmailError2').hide() ;

                                    elBuyer.find('#Register').attr('_strPrizeUid', objAct.Prize[0].PrizeUid) ;
                                    elBuyer.data('_intIsNeedEmail', bolIsNeedEmail) ;

                                    if (objRegister.Buyer.Email == '')
                                    {
                                        elBuyer.find('#isBuyerEmailTxt').hide() ;
                                    }
                                    else
                                    {
                                        elBuyer.find('#isBuyerEmailTxt').show() ;
                                    }

                                    if (bolIsNeedEmail == 1)
                                    {
                                        $("#Buyer").modal('show') ;
                                    }
                                    else
                                    {
                                        $(document).trigger('_doRegister') ;
                                    }
                                }
                            }) ;
                        }
                        else
                        {
                            var strUrl = window.location.href ;

                            window.location.href = 'https://ecvip.pchome.com.tw/login/v2/login.htm?rurl=' + encodeURIComponent(strUrl) ;
                        }
                    }) ;
                }
                else
                {
                    $(".ReachLimit").modal('show') ;
                }

            }) ;
        }
    }) ;
}) ;