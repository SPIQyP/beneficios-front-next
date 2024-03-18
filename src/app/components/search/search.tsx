'use client'
import algoliasearch from "algoliasearch"
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import CustomSearchBox from "./customSearchBox/customSearchBox";
import CustomHits from "./customHits/customHits";

const Search = () => {
    const APPID:any =  process.env.NEXT_PUBLIC_ALGOLIA_APPID;
    const APIKEY:any = process.env.NEXT_PUBLIC_ALGOLIA_APIKEY;

    const searchClient = algoliasearch(APPID,APIKEY)

    return (
        <>
        <InstantSearch 
          searchClient={searchClient} 
          indexName="pre_spiqyp_companies"
          stalledSearchDelay={500}
        >
          <div className="flex flex-col w-full items-center relative z-20">
            <CustomSearchBox dictionary={{}}/>
            <CustomHits/>
          </div>
          
            
        </InstantSearch>
            {/* <input className="rounded-xl px-2 border text-xl" placeholder="Buscar beneficio"/> */}
        </>
    )
}

export default Search