const form = document.getElementById('user');
const savedname = localStorage.getItem('name');
const savedemail = localStorage.getItem('email');
const balance1 = document.getElementById('balance');
const addBtn = document.getElementById('atc2');
const addBtn2 = document.getElementById('atc1');
const pay_now = document.getElementById('pay_now');

let burger = JSON.parse(localStorage.getItem('burger_array')) || [];
let fries = JSON.parse(localStorage.getItem('fries_array')) || [];

function registered(){
    if(savedemail !== null){
        if(form) form.remove();
        const pa = document.getElementById('vie');
        if(pa) pa.textContent = `${savedname} has already been registered you can continue shopping`;
        
        let freshBalance = parseFloat(localStorage.getItem('balance')) || 0;
        if(freshBalance <= 9){
            balance_add();
            freshBalance = parseFloat(localStorage.getItem('balance')) || 0;
        }
        if(balance1) balance1.textContent = `$${freshBalance.toFixed(2)}`;
    }
    else{
        if(form) form.addEventListener('submit', user_details);
    }
}

function user_details(e){
    e.preventDefault();
    const nam = document.getElementById('name').value.trim();
    const ema = document.getElementById('email').value.trim();
    localStorage.setItem('name', nam);
    localStorage.setItem('email', ema);
    balance_add();
    if(form) form.reset();
    location.reload();
}

function balance_add(){
    let currentBalance = parseFloat(localStorage.getItem('balance')) || 0;
    const userbalance = 20 + (Math.random() * 80);
    let newbalance = 0;
    
    if(currentBalance <= 9){
        newbalance = userbalance;
    }
    else{
        let morebalance = Math.random() * 50;
        newbalance = currentBalance + morebalance;
    }
    
    localStorage.setItem('balance', newbalance.toFixed(2));
    if(balance1) balance1.textContent = `$${newbalance.toFixed(2)}`;
}

function addtocartburgers(){
    burger.push(1);
    localStorage.setItem('burger_array', JSON.stringify(burger));
    const p1 = burger.length;
    const priceburger = p1 * 8.49;
    localStorage.setItem('burgerprice', priceburger);
    localStorage.setItem('burgercart', p1);
    buurgerreload();
    totalprice();
}

function buurgerreload(){
    const initialCount = parseInt(localStorage.getItem('burgercart')) || 0;
    const initialPrice = parseFloat(localStorage.getItem('burgerprice')) || 0;
    const bur = document.getElementById('burgers');
    const put = document.getElementById('af');
    const ad = document.getElementById('addedfood');
    
    if (initialCount >= 1) {
        if(bur) bur.textContent = `Burgers: ${initialCount} | Price: $${initialPrice.toFixed(2)}`;
        if(put) put.textContent = `Your order`;
        if(ad) ad.style.display = 'none';
    } else {
        if(bur) bur.textContent = '';
    }
}

function addtocartfries(){
    fries.push(1);
    localStorage.setItem('fries_array', JSON.stringify(fries));
    const p3 = fries.length;
    const pricefries = p3 * 4.19;
    localStorage.setItem('friesprice', pricefries);
    localStorage.setItem('friescart', p3);
    friesload();
    totalprice();
}

function friesload(){
    const initialCount1 = parseInt(localStorage.getItem('friescart')) || 0;
    const initialPrice1 = parseFloat(localStorage.getItem('friesprice')) || 0;
    const fri = document.getElementById('fries');
    const put = document.getElementById('af');
    const ad = document.getElementById('addedfood');
    
    if (initialCount1 >= 1) {
        if(fri) fri.textContent = `Fries: ${initialCount1} | Price: $${initialPrice1.toFixed(2)}`;
        if(put) put.textContent = `Your order`;
        if(ad) ad.style.display = 'none';
    } else {
        if(fri) fri.textContent = '';
    }
}

function totalprice(){
    const initialCount1 = parseInt(localStorage.getItem('friescart')) || 0;
    const initialPrice1 = parseFloat(localStorage.getItem('friesprice')) || 0;
    const initialCount = parseInt(localStorage.getItem('burgercart')) || 0;
    const initialPrice = parseFloat(localStorage.getItem('burgerprice')) || 0;
    const totalcount = initialCount + initialCount1;
    const totalprice = initialPrice + initialPrice1;
    const total = document.getElementById('total');
    const put = document.getElementById('af');
    const ad = document.getElementById('addedfood');
    
    if(totalcount === 0){
        if(put) put.textContent = `Your cart is empty`;
        if(ad) ad.style.display = 'block';
        if(total) total.textContent = '';
    } else {
        if(total) total.textContent = `total items ${totalcount} || total price $${totalprice.toFixed(2)}`;
    }
}

function deletecart(){
    localStorage.setItem('burger_array', JSON.stringify([]));
    localStorage.setItem('fries_array', JSON.stringify([]));
    localStorage.setItem('burgercart', '0');
    localStorage.setItem('friescart', '0');
    localStorage.setItem('burgerprice', '0');
    localStorage.setItem('friesprice', '0');
    
    burger = [];
    fries = [];
    
    buurgerreload();
    friesload();
    totalprice();
    
    const ats = document.getElementById('statuspay');
    if (ats) {
        ats.textContent = `Cart cleared`;
        ats.style.display = 'flex';
    }
}

function dynamicdelivery(){
    let sec = parseInt(localStorage.getItem('delivery_seconds')) || 0;
    let drv = localStorage.getItem('driver_name') || 'Driver';
    const statusView = document.getElementById('view-status');
    
    if(!statusView) return;
    
    if(sec > 0){
        let countdown = setInterval(function(){
            sec--;
            localStorage.setItem('delivery_seconds', sec);
            
            if(sec <= 0){
                clearInterval(countdown);
                localStorage.removeItem('success_status');
                statusView.innerHTML = `
                    <h2 class="section-title">Track Order</h2>
                    <div class="empty-state-card">
                        <span class="empty-icon">🍔</span>
                        <h3>Food delivered!</h3>
                        <p>Your meal has been dropped off. Enjoy your food!</p>
                    </div>
                `;
            } else {
                let mins = Math.floor(sec / 60);
                let secs = sec % 60;
                statusView.innerHTML = `
                    <h2 class="section-title">Track Order</h2>
                    <div class="empty-state-card">
                        <span class="empty-icon">🛵</span>
                        <h3>Order is Active!</h3>
                        <p style="font-size: 18px; font-weight: bold; margin-top: 10px;">
                            ${drv} is bringing your food!
                        </p>
                        <p style="font-size: 24px; color: #ff4757; font-weight: bold; margin-top: 5px;">
                            Time left: ${mins}:${secs < 10 ? '0' : ''}${secs}
                        </p>
                    </div>
                `;
            }
        }, 1000);
    } else {
        statusView.innerHTML = `
            <h2 class="section-title">Track Order</h2>
            <div class="empty-state-card">
                <span class="empty-icon">🛵</span>
                <h3>No active deliveries</h3>
                <p>Once you place an order, you can monitor live milestone tracking updates right here.</p>
            </div>
        `;
    }
}

function setupHistoryUI(){
    const accountView = document.getElementById('view-account');
    if(!accountView) return;
    
    let histContainer = document.getElementById('order_history_container');
    if(!histContainer){
        histContainer = document.createElement('div');
        histContainer.id = 'order_history_container';
        histContainer.style.marginTop = '20px';
        histContainer.style.textAlign = 'left';
        histContainer.style.width = '100%';
        
        const heading = document.createElement('h3');
        heading.textContent = 'Order History';
        heading.style.marginBottom = '10px';
        heading.style.borderBottom = '1px solid #ccc';
        heading.style.paddingBottom = '5px';
        
        const displayBox = document.createElement('div');
        displayBox.id = 'order_history_display';
        displayBox.style.fontSize = '14px';
        displayBox.style.lineHeight = '1.6';
        displayBox.style.whiteSpace = 'pre-line';
        
        histContainer.appendChild(heading);
        histContainer.appendChild(displayBox);
        accountView.appendChild(histContainer);
    }
}

function updatehistorydisplay(){
    setupHistoryUI();
    const histbox = document.getElementById('order_history_display');
    if(histbox){
        let allhistory = localStorage.getItem('order_history') || 'No past orders yet.';
        histbox.textContent = allhistory;
    }
}

function paynow(){
    const initialCount1 = parseInt(localStorage.getItem('friescart')) || 0;
    const initialPrice1 = parseFloat(localStorage.getItem('friesprice')) || 0;
    const initialCount = parseInt(localStorage.getItem('burgercart')) || 0;
    const initialPrice = parseFloat(localStorage.getItem('burgerprice')) || 0;
    
    const totalcount = initialCount + initialCount1;
    const totalprice = initialPrice + initialPrice1;
    
    let currentBalance = parseFloat(localStorage.getItem('balance')) || 0;
    if(currentBalance <= 9){
        balance_add();
        currentBalance = parseFloat(localStorage.getItem('balance')) || 0;
    }
    
    const balanceleft1 = currentBalance - totalprice;
    const ats = document.getElementById('statuspay');

    if (totalcount >= 1 && balanceleft1 >= 0) {
        console.log('success');
        localStorage.setItem('success_status', 'paid');
        
        if (ats) {
            ats.textContent = `Successfully paid`;
            ats.style.display = 'flex';
        }
        
        localStorage.setItem('balance', balanceleft1.toFixed(2));
        if (balance1) {
            balance1.textContent = `$${balanceleft1.toFixed(2)}`;
        }
        
        let oldhistory = localStorage.getItem('order_history') || '';
        let itemSummary = [];
        if(initialCount > 0) itemSummary.push(`${initialCount}x Burger`);
        if(initialCount1 > 0) itemSummary.push(`${initialCount1}x Fries`);
        
        let updatedhistory = oldhistory + `• Paid $${totalprice.toFixed(2)} for ${itemSummary.join(' & ')}\n`;
        localStorage.setItem('order_history', updatedhistory);
        updatehistorydisplay();

        let randomMinutes = Math.floor(Math.random() * 5) + 1;
        let totalSeconds = randomMinutes * 60;
        let drivers = ['Sachin','Dhruv','Aniket','Aditya'];
        let pickedDriver = drivers[Math.floor(Math.random() * drivers.length)];
        
        localStorage.setItem('delivery_seconds', totalSeconds);
        localStorage.setItem('driver_name', pickedDriver);
        dynamicdelivery();

        localStorage.setItem('burger_array', JSON.stringify([]));
        localStorage.setItem('fries_array', JSON.stringify([]));
        localStorage.setItem('burgercart', '0');
        localStorage.setItem('friescart', '0');
        localStorage.setItem('burgerprice', '0');
        localStorage.setItem('friesprice', '0');
        
        burger = [];
        fries = [];
        
        totalprice();
        buurgerreload();
        friesload();
        
        if(balanceleft1 <= 9){
            balance_add();
        }
        
    } else {
        if (ats) {
            if (totalcount === 0) {
                ats.textContent = `Your cart is empty!`;
            } else {
                ats.textContent = `Balance too low`;
            }
            ats.style.display = 'flex';
        }
    }
}

registered();
buurgerreload();
friesload();
totalprice();
dynamicdelivery();
updatehistorydisplay();

if(addBtn) addBtn.addEventListener('click', addtocartburgers);
if(addBtn2) addBtn2.addEventListener('click', addtocartfries);
if(pay_now) pay_now.addEventListener('click', paynow);