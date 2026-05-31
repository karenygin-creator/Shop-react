import { useNavigate } from "react-router-dom";
import styles from "./CatalogPage.module.css"
import { useEffect, useState } from "react";
import { getProducts } from "../../api/productsApi";
function CatalogPage(){
    const navigate=useNavigate();
    const[products,setProducts]=useState([]);
    const user=JSON.parse(localStorage.getItem("user"));
    useEffect(()=>{
        async function loadProducts(){
            const data=await getProducts();
            setProducts(data);
        }
        loadProducts();
    },[])
    function logout(){
        localStorage.removeItem("user");
        navigate("/login");
    }
    function addToCart(product){
        const cart=JSON.parse(localStorage.getItem("cart"))|| [];
        const foundProduct=cart.find(item)=>
            item.id===product.id

    }
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Каталог товаров</h1>
                <div>
                    <span>{user?.name}</span>
                    <button onClick={logout}>Выйти</button>
                </div>
            </div>
            <div className={styles.products}>
                {products.map((product)=>(
                    <div className={styles.card} key={product.id}>
                        <img src={product.image} alt={product.title}/>
                        <h3>
                            {product.title}
                        </h3>
                        <p>
                            {product.price}
                        </p>
                        <button>Добавить в корзину</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default CatalogPage;