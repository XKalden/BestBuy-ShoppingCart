// on click Buy 
export function buy(obj) {
    if (localStorage.getItem(obj.sku) == null) {
        var item = { 'qty': 1, 'price': obj.price };
        localStorage.setItem(obj.sku, JSON.stringify(item));
    } else {
        var item = JSON.parse(localStorage.getItem(obj.sku));
        item.qty += 1;
        localStorage.setItem(obj.sku, JSON.stringify(item));
    }
};

export function checkout(parent, qtyText, totalText) {
    



    for (var i = 0; i < localStorage.length; i++) {
        var container = $(`<div class="pay"></div>`);
        var key = localStorage.key(i);
        var obj = JSON.parse(localStorage.getItem(key));
        var itemTotal = obj.qty * obj.price;
        container.append(`<p id="sku">sku : ${key}</p>`)
            .append(`<p1>quantity : <input type="text" onkeypress="return event.charCode >= 48 && event.charCode <= 57" value="${obj.qty}"></p1>`)
            .append(`<p id="itemTotal">total : ${itemTotal.toFixed(2)}</p>`)
            .append(`<div class="duo"><button id="update">update</button><button id="remove">remove</button></div>`);
        parent.append(container);
    }
    qtyText.text(localStorage.length);
    totalText.text(calculateTotal());
   
};





export function delt(parent, qtyText, totalText) {
    var sku = parent.children('#sku').text().split(' ').splice(2, 3).join();
    localStorage.removeItem(sku);
    parent.remove();
    qtyText.text(localStorage.length);
    totalText.text(calculateTotal());
};

export function updt(parent, newVal, qtyText, totalText) {
    var sku = parent.children('#sku').text().split(' ').splice(2, 3).join();
    if (newVal==0) {
        localStorage.removeItem(sku);
        parent.remove();
    } else {
        var sku = parent.children('#sku').text().split(' ').splice(2, 3).join();
        var item = JSON.parse(localStorage.getItem(sku));
        item.qty = newVal;
        var itemTotal = item.price * newVal;
        parent.children('#itemTotal').text(`total : ${itemTotal.toFixed(2)}`);
        localStorage.setItem(sku, JSON.stringify(item));
    }
    qtyText.text(localStorage.length);
    totalText.text(calculateTotal());

};

function calculateTotal() {
    var total = 0;
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var obj = JSON.parse(localStorage.getItem(key));
        var itemTotal = obj.qty * obj.price;
        total += itemTotal;
    };
    return total.toFixed(2);
}