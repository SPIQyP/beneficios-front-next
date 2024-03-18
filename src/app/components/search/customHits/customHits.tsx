import Link from "next/link";
import { useHits, useInstantSearch } from "react-instantsearch";

const CustomHits = () => {
    const {hits} = useHits({})
    const { results } = useInstantSearch();
    
    return(
        <>
            <div className={`${hits.length === 0 || results.query === '' ? 'hidden': 'block'} bg-neutral-200 rounded-lg text-black p-3 w-1/2 absolute top-11`}>
                {
                    hits.map((hit:any,i:number) => (
                        <a key={i} href={`/benefits/${hit.objectID}`} >
                            <div>
                                <label className="cursor-pointer">{hit.name}</label>
                            </div>
                        </a>
                        
                    ))
                }
            </div>
        </>
    )
}

export default CustomHits;