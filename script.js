document.addEventListener("DOMContentLoaded", ()=>{
    const products= [
        {id: 1, name: "bottle" , price: 200},
        {id: 2, name: "bowl" , price: 100},
        {id: 3, name: "knife" , price: 150},
        {id:4, name: "plate", price: 300}
    ]
    const cart=new Array()
    const product_list= document.getElementById("product-list")
    const cart_items= document.getElementById("cart-items")
    const empty_cart= document.getElementById("empty-cart")
    const cart_total= document.getElementById("cart-total")
    const total_price= document.getElementById("total-price")
    const button = document.getElementById("checkout-btn")

    products.forEach(element => {
        const product_info=document.createElement("div")
        product_info.classList.add("product")
        product_info.innerHTML=`
        <span>${element.name}  ~Rs.${element.price.toFixed(2)}</span> 
        <button data-id=${element.id} >Add to Cart</button>` 
        product_list.appendChild(product_info)
    });

    product_list.addEventListener("click", (e)=>{
        if(e.target.tagName === "BUTTON"){
            const product_id=parseInt( e.target.getAttribute("data-id"))
            const product= products.find(p=> p.id === product_id)
            // console.log(product)

            addToCart(product)
        }
        
    })

    function addToCart(product){
        cart.push(product)
        // console.log(cart)
        showCart(product)
    }

    function showCart(){
        cart_items.innerText= ""
        let totalPrice= 0;
        if (cart.length>0) {
            empty_cart.classList.add("hidden")
            cart_total.classList.remove("hidden")

            cart.forEach((item) => {
                totalPrice+= item.price
                const cartItem= document.createElement("div")
                cartItem.classList.add("cart")
                cartItem.setAttribute("item-id",`${item.id}`)
                cartItem.setAttribute("id",`${item.id}`)
                cartItem.innerHTML=`${item.name}  ~ Rs. ${item.price}`

                const remove_btn= document.createElement("button")
                remove_btn.innerText="Remove Item"
                remove_btn.setAttribute("button-id",`${item.id}`)

                cart_items.appendChild(cartItem)
                cartItem.appendChild(remove_btn)
                total_price.innerText= `Rs. ${totalPrice}`
            });
        }
        else{
            empty_cart.classList.remove("hidden")
            const empty= document.createElement("p")
            empty.innerText="Your cart is empty"
            cart_items.appendChild(empty)
            total_price.textContent= "Rs. 0"
        }
    }
    button.addEventListener("click", ()=>{
        cart.length=0
        alert("Your items were added succesfully!")
        showCart()
        empty_cart.classList.remove("hidden")
    })
    cart_items.addEventListener("click",(event)=>{
        event.preventDefault()
        if(event.target.tagName=== "BUTTON"){
           cart.forEach(element => {
            if(event.target.getAttribute("button-id")==element.id){
                cart.splice(cart.indexOf(element),1)

                document.getElementById(`${element.id}`).remove()


                //getting checkout price
                let cart_price=total_price.innerHTML.replace(/\D/g, '')
                let reduce=parseFloat(cart_price)
                total_price.innerText= `Rs. ${reduce-element.price}`
            }
            else{
                console.log("kaam ni kiya")
            }
           });
        }
    })
})