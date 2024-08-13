
export const deadChars = async (mensaje) =>{

    const dt = mensaje.split('/') // [dead, name]

    const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${dt[1]}&status=${dt[0]}`)
    const { results } = await res.json()

   const info = {
    pj_uno:results[0],
    pj_dos:results[1],
   }

   const episodesPJUno = await fetch(info.pj_uno.episodes[0]
   const resUno = await episodesPJUno.json()

   const episodesPJDos = await fetch(info.pj_dos.episodes[0])
   const resDos = await episodesPJDos.json()
   )

    return { pj_uno: results[0], pj_dos: results[1]}
}