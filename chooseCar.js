$(document).ready(function(){

    
    var modelSpecs,
        modelPrice,
        modelSpecsHolder,
        modelPriceHolder,
        modelPriceUSA
        
    modelSpecsHolder = $('#modelSpecs');
    modelPriceHolder = $('#modelPrice');
    modelPriceUSAHolder = $('#modelPriceUSA');
    
    modelSpecs = '';
    modelPrice = 0;

//При запуску сторінки
    
    calculatePrice()
    compileSpecs()
    
//Переключання кнопок
    
    $('#autoForm input').on('change', function(){
        calculatePrice()
        compileSpecs()
        calculateUSA()
    })
    
//Вибір кольору
    
    $('#colorSelector .colorItem').on('click', function(){
        var imgPath = $(this).attr('data-img-path')
        console.log(imgPath)
        $('#imageHolder img').attr('src', imgPath)
    })
    
//Розрахунок ціни і опис
    
    function calculatePrice() {
        var modelPriceEngine = $('input[name=engine]:checked', '#autoForm').val();
        var modelPriceTransmission = $('input[name=trаnsmission]:checked', '#autoForm').val();
        var modelPricePackage = $('input[name=package]:checked', '#autoForm').val();
        
        modelPriceEngine = parseInt(modelPriceEngine);
        modelPriceTransmission = parseInt(modelPriceTransmission);
        modelPricePackage = parseInt(modelPricePackage);
        
        modelPrice = modelPriceEngine + modelPriceTransmission + modelPricePackage
        
        modelPriceHolder.text(modelPrice + ' UA')
        
//        alert(modelPrice)
    };
    
    function compileSpecs(){
        modelSpecs = $('input[name=engine]:checked', '#autoForm').next().text();
        modelSpecs += ', ' + $('input[name=trаnsmission]:checked', '#autoForm').next().text();
        modelSpecs += ', ' + $('input[name=package]:checked', '#autoForm').next().text();
        
        modelSpecsHolder.text(modelSpecs)
        
//        alert(modelSpecs);
    }
    
//Получаємо курс валют
    
    var currencyUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
    var USAtoUARate = 0;
    
    $.ajax({
        url: currencyUrl,
        cache: false,
        success: function(data){
            console.log(data[0].sale)
            USAtoUARate = data[0].sale
            calculateUSA()
        }
    })
    
    function calculateUSA(){
        var modelPriceUSA = modelPrice / USAtoUARate
        modelPriceUSAHolder.text(modelPriceUSA.toFixed(0) + ' USA')
//        alert(modelPriceUSA)
    }
})