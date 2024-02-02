import React from 'react'
import styled from 'styled-components'
import  Sparrow from '../utils/Sparrow'
const Logo = () => {
  return (
    <Wrapper>
    {/* <span>Sparrow</span>X */}
<img src={Sparrow} alt="Sparrow Image" />

    </Wrapper>
  )
}

const Wrapper = styled.h3`
    margin-bottom:0;
    color: var(--clr-grey-1);
    span{
        color:var(--clr-primary-5);
    }
`

export default Logo
