export function displayProduct(data){
    $('.bxslider').empty();
    for(let singleData of data){
        var obj = {'sku':singleData.sku,'price':singleData.salePrice};
        var desc = singleData.name.split(' ').splice(2,singleData.name.length).join(' ');
        var $img = $(`<div class="image"></div>`).css({'background':'url('+singleData.largeImage+') no-repeat center',
                                                      'background-size':'contain',
                                                      'height':'200px',
                                                      'width':'100%'});
        var addToCartButton = $(`<button class="addToCart" data-value=${JSON.stringify(obj)}>add to cart</button>`);
        var child = $(`<li class="product"></li>`);
        child.append(`<p class="brand">${singleData.manufacturer}</p>`)
             .append(`<p class = "specs">${desc}</p>`)
             .append($img)
             .append(`<p class="price">$${singleData.salePrice}</p>`)
             .append(addToCartButton);
        $('.bxslider').append(child);
    }
}





