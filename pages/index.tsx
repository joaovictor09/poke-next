import Head from 'next/head'
import { useEffect, useState } from 'react';

export interface IServerSide {
  data: {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
      }[]
  }
}

export interface IPokemonsPage {
  count: number;
  next: string;
  previous: string;
  results: {
      name: string;
      url: string;
    }[]
}

export default function Home(props: IServerSide) {

  const [pokemons, setPokemons] = useState(props.data)
  const [page, setPage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(20)

  console.log(pokemons)

  useEffect(() => {

    async function refreshPokemons(){
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${itemPerPage}&offset=${page * 20}}`)
      const data = await res.json();

      console.log(data)
      return data
    } 

    refreshPokemons().then((data) => setPokemons(data))
    
    
  }, [page, itemPerPage, ])

  return (
    <>
      <Head>
        <title>PokeNext</title>
      </Head>

      <main className="w-screen h-screen flex flex-col items-center justify-center">
        <div className=''>
          <ul>
          {
            pokemons.results.map((pokemon) => {
              return (
                <li key={pokemon.name}>{pokemon.name}</li>
              )
            })
          }
          </ul>
        </div>
        <h1>{page}</h1>
        <button onClick={() => page >= 0 ? setPage(page - 1) : ""}>
          {"<"}
        </button>
        <button onClick={() => setPage(page + 1)}>
          {">"}
        </button>
      </main>
    </>
  )
}

export async function getServerSideProps(){
  const res = await fetch("https://pokeapi.co/api/v2/ability/?limit=20&offset=0")
  const data: IServerSide = await res.json();

  return {
    props: {
      data
    }
  }
}
