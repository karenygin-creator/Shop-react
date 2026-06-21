import { useNavigate } from "react-router-dom";
import styles from "./CatalogPage.module.css"
import { useEffect, useState } from "react";
import { getProducts } from "../../api/productsApi";

function CatalogPage(){
    const navigate=useNavigate();
    const[products,setProducts]=useState([]);
    const[selectedCategory,setSelectedCategory]=useState("Все");
    const categories=["Все",...new Set(products.map(product=>product.category))];
    const filterProduct=selectedCategory==="Все"?
    products:
    products.filter(product=>product.category===selectedCategory);
   
    useEffect(()=>{
        async function loadProducts(){
            const data=await getProducts();
            setProducts(data);
        }
        loadProducts();
        
    },[])
    
    
    function addToCart(product){
        const user=localStorage.getItem("user");
        if(!user){
            alert("Чтобы добавить товар в корзину нужно войти")
            navigate("/login");
            return;
        }
        const cart=JSON.parse(localStorage.getItem("cart"))|| [];
        const foundProduct=cart.find((item)=>
            item.id===product.id)
        if(foundProduct){
            foundProduct.count+=1;
        }
        else{
            cart.push({
                ...product,count:1,
            });
        }
        localStorage.setItem("cart",JSON.stringify(cart));
        alert("Товар добавлен в корзину")
       
    }
    return(
       
        <div className={styles.container}>
            <h1 className={styles.title}>Каталог товаров</h1>
            <div className={styles.content}>
                <aside className={styles.sidebar}>
                        <h3>Категории</h3>
                        {categories.map((category)=>(
                            <button 
                            key={category}
                            onClick={()=>setSelectedCategory(category)}>{category}</button>
                        ))}
                </aside>
            <div className={styles.products}>
                {filterProduct.map((product)=>(
                    <div className={styles.card} key={product.id}
                    onClick={()=>navigate(`/product/${product.id}`)}>
                        <img src={product.image} alt={product.title}/>
                        <h3>
                            {product.title}
                        </h3>
                        <p>
                            {product.price}
                        </p>
                        <button onClick={(event)=>{
                            event.stopPropagation();
                            addToCart(product);
                        }}>Добавить в корзину</button>
                    </div>
                ))}
            </div>
            </div>
        </div>
       
    )
}
export default CatalogPage;