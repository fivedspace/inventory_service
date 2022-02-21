import React from 'react'
import Admin from '../../src/layout/Admin'

export default function incoming() {
    return (
        <Admin
            callback={() => {
                return (
                    <div>出库</div>
                )
            }}
        ></Admin>
    )
}
