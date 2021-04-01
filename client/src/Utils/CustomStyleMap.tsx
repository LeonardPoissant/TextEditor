// @ts-nocheck


const customStyleMap = {

    left: {
        textAlign: "left"
    },
    center: {
        textAlign: "center"
    },
    right: {
        textAlign: "right"
    },



    font_size_9: {
        fontSize: "12px"
    },
    font_size_12: {
        fontSize: "16px"
    },
    font_size_13_5: {
        fontSize: "18px"
    },
    font_size_16: {
        fontSize: "21.333px"
    },
    font_size_18: {
        fontSize: "24px"
    },
    font_size_21_75: {
        fontSize: "29px"
    },
    font_size_24: {
        fontSize: "32px"
    },
    font_size_29: {
        fontSize: "38.667px"
    },
    font_size_33: {
        fontSize: "44px"
    },
    font_size_34: {
        fontSize: "46px"
    },
    font_size_36: {
        fontSize: "48px"
    },

    color_black: {
        color: "#000000"
    },
    color_red: {
        color: "#DC143C"
    },

    color_yellow: {
        color: "#FFD700"
    },

    color_blue: {
        color: "#191970"
    },

    color_test: {
        color: ""
    },

    '#630000': { color: '#630000' },
    '#C70000': { color: '#C70000' },
    '#D22F25': { color: '#D22F25' },
    '#F70303': { color: '#F70303' },
    '#FF5A57': { color: '#FF5A57' },
    '#FD807F': { color: '#FD807F' },
    '#691C26': { color: '#691C26' },
    '#A0262F': { color: '#A0262F' },
    '#D11938': { color: '#D11938' },
    '#FF0C3E': { color: '#FF0C3E' },
    '#CB4154': { color: '#CB4154' },
    '#FFCDD1': { color: '#FFCDD1' },



    '#FF3400': { color: '#FF3400' },
    '#FF4C00': { color: '#FF4C00' },
    '#D05E28': { color: '#D05E28' },
    '#FF795F': { color: '#FF795F' },
    '#F5874F': { color: '#F5874F' },
    '#FFCCBA': { color: '#FFCCBA' },
    '#C84835': { color: '#C84835' },
    '#EE661A': { color: '#EE661A' },
    '#FF7B00': { color: '#FF7B00' },
    '#FF9C02': { color: '#FF9C02' },
    '#FFAF65': { color: '#FFAF65' },
    '#FCC796': { color: '#FCC796' },


    '#C8A000': { color: '#C8A000' },
    '#FAA41A': { color: '#FAA41A' },
    '#F5B300': { color: '#F5B300' },
    '#FFD703': { color: '#FFD703' },
    '#FEE88D': { color: '#FEE88D' },
    '#FFFAC0': { color: '#FFFAC0' },
    '#A4AB3C': { color: '#A4AB3C' },
    '#C9CA41': { color: '#C9CA41' },
    '#DBE124': { color: '#DBE124' },
    '#F2EA1A': { color: '#F2EA1A' },
    '#FFED18': { color: '#FFED18' },
    '#F9FF71': { color: '#F9FF71' },

    '#0A4F39': { color: '#0A4F39' },
    '#007640': { color: '#007640' },
    '#4CAD49': { color: '#4CAD49' },
    '#69CD3C': { color: '#69CD3C' },
    '#97E45D': { color: '#97E45D' },
    '#B6EF09': { color: '#B6EF09' },
    '#40671D': { color: '#40671D' },
    '#008D55': { color: '#008D55' },
    '#799A18': { color: '#799A18' },
    '#35C987': { color: '#35C987' },
    '#91D5AC': { color: '#91D5AC' },
    '#AAF9AE': { color: '#AAF9AE' },

    '#006065': { color: '#006065' },
    '#008390': { color: '#008390' },
    '#00C8C5': { color: '#00C8C5' },
    '#10DFD3': { color: '#10DFD3' },
    '#53DEBF': { color: '#53DEBF' },
    '#A4FFEB': { color: '#A4FFEB' },
    '#02537E': { color: '#02537E' },
    '#2994AE': { color: '#2994AE' },
    '#10B5DF': { color: '#10B5DF' },
    '#71CDDA': { color: '#71CDDA' },
    '#74B9CB': { color: '#74B9CB' },
    '#BFE6F0': { color: '#BFE6F0' },

    '#0544A4': { color: '#0544A4' },
    '#59798E': { color: '#59798E' },
    '#0075C1': { color: '#0075C1' },
    '#00AEEF': { color: '#00AEEF' },
    '#3B9AD5': { color: '#3B9AD5' },
    '#7FBFE9': { color: '#7FBFE9' },
    '#283878': { color: '#283878' },
    '#2947C7': { color: '#2947C7' },
    '#637AD8': { color: '#637AD8' },
    '#2175FF': { color: '#2175FF' },
    '#80AFFF': { color: '#80AFFF' },
    '#E2F2FE': { color: '#E2F2FE' },

    '#460874': { color: '#460874' },
    '#7C4889': { color: '#7C4889' },
    '#7E54C6': { color: '#7E54C6' },
    '#B85AE9': { color: '#B85AE9' },
    '#C580DB': { color: '#C580DB' },
    '#E59DF0': { color: '#E59DF0' },
    '#67156E': { color: '#67156E' },
    '#951990': { color: '#951990' },
    '#AB41BF': { color: '#AB41BF' },
    '#BC7BB5': { color: '#BC7BB5' },
    '#A292F4': { color: '#A292F4' },
    '#EDE7F6': { color: '#EDE7F6' },

    '#5F0035': { color: '#5F0035' },
    '#DA225E': { color: '#DA225E' },
    '#EF4B6D': { color: '#EF4B6D' },
    '#F26193': { color: '#F26193' },
    '#F787C1': { color: '#F787C1' },
    '#FAB8C4': { color: '#FAB8C4' },
    '#8E1147': { color: '#8E1147' },
    '#C50E6D': { color: '#C50E6D' },
    '#F11286': { color: '#F11286' },
    '#F64FA5': { color: '#F64FA5' },
    '#EBABCB': { color: '#EBABCB' },
    '#FDE4EC': { color: '#FDE4EC' },

    '#532C14': { color: '#532C14' },
    '#855729': { color: '#855729' },
    '#B9844D': { color: '#B9844D' },
    '#EFBA81': { color: '#EFBA81' },
    '#EBCC89': { color: '#EBCC89' },
    '#F3EBDD': { color: '#F3EBDD' },
    '#4C3B37': { color: '#4C3B37' },
    '#725B54': { color: '#725B54' },
    '#A2938A': { color: '#A2938A' },
    '#C4AD92': { color: '#C4AD92' },
    '#CCCABD': { color: '#CCCABD' },
    '#D7CCC8': { color: '#D7CCC8' },

    '#2B2B2B': { color: '#2B2B2B' },
    '#4C4C4D': { color: '#4C4C4D' },
    '#6F6F6F': { color: '#6F6F6F' },
    '#A8A8A8': { color: '#A8A8A8' },
    '#E2E2E2': { color: '#E2E2E2' },
    '#F8F8F8': { color: '#F8F8F8' },
    '#111111': { color: '#111111' },
    '#3C3C3C': { color: '#3C3C3C' },
    '#5B5B5B': { color: '#5B5B5B' },
    '#8C8C8C': { color: '#8C8C8C' },
    '#BEBEBE': { color: '#BEBEBE' },
    '#EFEFEF': { color: '#EFEFEF' },


    'red': { color: '#D22F25' },
    'orange': { color: '#FF7B00' },
    'yellow': { color: '#FFD703' },
    'green': { color: '#4CAD49' },
    'cyan': { color: '#10B5DF' },
    'blue': { color: '#0075C1' },
    'purple': { color: '#7E54C6' },
    'pink': { color: '#F11286' },
    'brown': { color: '#B9844D' },
    'gray': { color: '#6F6F6F' },
    'black': { color: '#000000' },
    'white': { color: '#FFFFFF' }



}

export default customStyleMap