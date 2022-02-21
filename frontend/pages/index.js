import React,{useEffect} from 'react'
import Router from 'next/router'
import { getCookie, removeCookie} from '/submodule/util/cookie'

export default function Home() {
  useEffect(() => {
    if(!getCookie('token')){
      Router.replace('/queryCargo/queryCargo')
    }
  })

  return (
    <div>
      
    </div>
  )
}
