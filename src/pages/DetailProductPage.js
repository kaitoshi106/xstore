import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";

import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  HeroPage,
} from "../components";
import { useProductsContext } from "../hooks/context/products_context";
import { formatPrice } from "../utils/format_price";

const URL_Detail_Product = process.env.REACT_APP_URL_Detail_Product;

const DetailProduct = () => {
  const { id } = useParams();
  const history = useHistory();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchDetailProduct,
  } = useProductsContext();

  useEffect(() => {
    fetchDetailProduct(`${URL_Detail_Product}${id}`);
  }, [id]);

//   useEffect(() => {
//     if (error) {
//       setTimeout(() => {
//         history.push("/");
//       }, 2000);
//     }
//   }, [error]);
console.log(product)
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = product;
  return (
    <Wrapper>
      <HeroPage title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className=" product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price"> {formatPrice(price)}</h5>
            <p className="desc"> {description}</p>
            <p className="info">
              <span>Available : </span>
              {stock > 0 ? "In stock" : "out of stock"}
            </p>
            <p className="info">
              <span>SKU : </span>
              {sku}
            </p>
            <p className="info">
              <span>Brand : </span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default DetailProduct;
