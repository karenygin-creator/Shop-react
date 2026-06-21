import { useState ,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../api/productsApi";
import styles from "./Product.module.css"

function ProductPage(){
    const navigate=useNavigate();
    const {id}=useParams();
    console.log(id);
    
    const[product,setProduct]=useState(null);
    useEffect(()=>{
            async function loadProducts(){
                const data=await getProductById(id);
                setProduct(data);
            }
            loadProducts();
            
        },[id])
        
        function addToCart(){
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
        if(!product){
            return <p>Загрузка....</p>
        }
    return(
        <div className={styles.container}>
          <div className={styles.header}>
            <button className={styles.backButton} onClick={() => navigate("/catalog")}>
              ← Назад в каталог
            </button>
          </div>
    
          <div className={styles.product}>
            <div className={styles.left}>
              <h1>{product.title}</h1>
              <img src={product.image} alt={product.title} />
            </div>
    
            <div className={styles.right}>
              <p className={styles.cost}>{product.price}$</p>
              <p className={styles.description}>{product.description}</p>
              <p className={styles.stock}>Осталось: {product.stock} шт.</p>
          
              <button className={styles.add} onClick={addToCart}>
                ДОБАВИТЬ В КОРЗИНУ
              </button>
            </div>
          </div>
        </div>
      )
}
export default ProductPage;