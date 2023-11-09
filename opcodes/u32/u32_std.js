import loop from '../utils.js'

export const u32_push = value => `
${ (value & 0xff000000) >>> 24 }
${ (value & 0x00ff0000) >>> 16 }
${ (value & 0x0000ff00) >>> 8 }
${ (value & 0x000000ff) }
`

export const u32_equalverify = `
OP_EQUALVERIFY
OP_EQUALVERIFY
OP_EQUALVERIFY
OP_EQUALVERIFY
`

export const u32_toaltstack = `
OP_TOALTSTACK
OP_TOALTSTACK
OP_TOALTSTACK
OP_TOALTSTACK
`

export const u32_fromaltstack = `
OP_FROMALTSTACK
OP_FROMALTSTACK
OP_FROMALTSTACK
OP_FROMALTSTACK
`

export const u32_drop = `
OP_2DROP
OP_2DROP
`

export const u32_roll = a => {
    a = (a + 1) * 4 - 1
    return `
${a}
OP_ROLL
${a}
OP_ROLL
${a}
OP_ROLL
${a}
OP_ROLL
`
}

export const u32_pick = a => {
    a = (a + 1) * 4 - 1
    return `
${a}
OP_PICK
${a}
OP_PICK
${a}
OP_PICK
${a}
OP_PICK
`
}


const u32_compress = `
OP_SWAP
OP_ROT
3
OP_ROLL
OP_DUP
127
OP_GREATERTHAN
OP_IF
128
OP_SUB
1
OP_ELSE
0
OP_ENDIF
OP_TOALTSTACK
${ loop (8, _ => 'OP_DUP OP_ADD') }
OP_ADD
${ loop (8, _ => 'OP_DUP OP_ADD') }
OP_ADD
${ loop (8, _ => 'OP_DUP OP_ADD') }
OP_ADD
OP_FROMALTSTACK
OP_IF
OP_NEGATE
OP_ENDIF
`
