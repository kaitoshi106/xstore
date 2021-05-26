import React, { useEffect } from "react";
import { Link, Router } from "react-router-dom";
import styled from "styled-components";
import { Error, Loading, Product } from "../index";
import { useProductsContext } from "../../hooks/context/products_context";

const FeaturedProducts = () => {
  const {
    product_loading: loading,
    products_error: error,
    featured_products: featured
  } = useProductsContext();
  console.log('featured_products', featured)
  loading && <Loading />
  error && <Error />
  
  return (
    <FeaturedProductsWrapper className="section">
      <div className="title">
        <h2>Featured Products</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {featured && featured.slice(0, 3).map((product) => {
          return (<Product key={product.id} {...product} />)
        })}
      </div>
      <Link to="/products" className="btn">
        all products
      </Link>
    </FeaturedProductsWrapper>
  );
};

const FeaturedProductsWrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
