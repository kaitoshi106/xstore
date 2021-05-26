import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { HeroPage } from '../components'
import { useCartContext } from '../hooks/context/cart_context'

const CheckoutPage = () => {
  const { cart } = useCartContext()
  return (
    <main>
      <HeroPage title='checkout' />
      <Wrapper className='page'>
      {
        cart.length < 1 && (
          <div className='empty'>
            <h2>your cart is empty</h2>
            <Link to='/products' className='btn'>
              fill it
            </Link>
          </div>
        )
      }
      </Wrapper>
    </main>
  )
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`
export default CheckoutPage