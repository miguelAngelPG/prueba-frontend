const jwt = require('jsonwebtoken')

export const generarJWT = ( email = '' ) => {

  return new Promise( (resolve, reject) => {

      const payload = { email }

      jwt.sign( payload, process.env.SECRETWORD_SIGN, {
          expiresIn: '4h'
      }, ( err, token ) => {

          if ( err ) {
              console.log(err)
              reject( 'No se pudo generar el token' )
          } else {
              resolve( token )
          }
      })

  })
}