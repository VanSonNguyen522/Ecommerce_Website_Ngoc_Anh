import React from 'react'
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: string;
  salePrice?: string;
  image: string;
  isNew: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'I 100',
    price: '730,000 vnd',
    image: "/assets/images/Hot_Features/I_100.jpg",
    isNew: true,
  },
  {
    id: 2,
    name: 'Phi 12',
    price: '70.000 vnd',
    salePrice: '65.000 vnd',
    image: "/assets/images/Hot_Features/Phi_12.jpg",
    isNew: false,
  },
  {
    id: 3,
    name: 'Ốc vít',
    price: '1.000 vnd',
    image: "/assets/images/Hot_Features/Oc_vit.jpg",
    isNew: false,
  },
  {
    id: 4,
    name: 'Bảng mã',
    price: '12.000 vnd',
    image: '/assets/images/Hot_Features/Bang_ma.jpg',
    isNew: false,
  },
];


const ProductCard: React.FC<Product> = ({ name, price, salePrice, image, isNew }) => {
    return (
      <div style={styles.productCard}>
        {isNew && <span style={{ ...styles.badge, ...styles.newBadge }}>New</span>}
        {salePrice && <span style={{ ...styles.badge, ...styles.saleBadge }}>Sale</span>}
        <div style={styles.imageWrapper}>
            <Image src={image} alt={name} width={100} height={100} style={styles.productImage} />
        </div>
        <div style={styles.productInfo}>
        <h3 style={styles.nameProduct}>{name}</h3>
        {/* <div style={styles.iconWrapper}></div> */}
        <button style={styles.cartButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={styles.cartIcon}
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.38-7.38H6"></path>
          </svg>
        </button>
        </div>
            <p style={styles.price}>
            {salePrice ? (
                <>
                <span style={styles.salePrice}>{price}</span> <span style={styles.originalPrice}>{salePrice}</span>
                </>
            ) : (
                price
            )}
            </p>
      </div>
    );
  };



  const HotFeatures: React.FC = () => {
    return (
      <div style={styles.container}>
        <h1 className='text-bold text-[30px] text-left p-3'>Hàng Hóa Nổi Bật</h1>
        <div style={styles.productList}>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    );
  };

const styles: { [key: string]: React.CSSProperties } = {
    container: {  
      padding: '70px',
      textAlign: 'center',
      backgroundColor: 'white',
    },
    productList: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      gap: '20px',
    },
    productCard: {
      position: 'relative',
      width: '290px',
      height: '320px',
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'left',
    },
    imageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '150px',
        marginBottom: '20px',
    },
    productImage: {
      width: '200px',
      height: '200px',
      borderRadius: '10px',
      alignItems:'center',
    },
    badge: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      padding: '5px 10px',
      color: 'white',
      borderRadius: '5px',
      fontSize: '12px',
    },
    newBadge: {
      backgroundColor: 'green',
    },
    saleBadge: {
      backgroundColor: 'red',
    },
    price: {
      marginTop: '2px',
      fontSize: '18px',
      fontWeight: 'bold',
    },
    salePrice: {
      color: 'red',
      textDecoration: 'line-through',
      marginRight: '10px',
    },
    originalPrice: {
      color: 'black',
    },
    nameProduct: {
        fontSize: '19px',
        padding: '0px',
        fontWeight: '800px',
        paddingTop: '20px',
        marginRight: '10px',
        marginBottom:'5px',
    },
    productInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    iconWrapper: {
        backgroundColor: '#f4f4f4',
        padding: '8px',
        borderRadius: '50%',
        fontSize:'18px',
    },
    cartIcon: {
        width: '16px',
        height: '16px',
    },
    cartButton: {
        backgroundColor: '#f4f4f4',
        padding: '8px',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
  };
  

export default HotFeatures

