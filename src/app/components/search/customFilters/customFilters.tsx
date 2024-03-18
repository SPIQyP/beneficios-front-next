'use client'
import algoliasearch from "algoliasearch";
import { Configure, DynamicWidgets, InstantSearch, Menu, RefinementList } from "react-instantsearch";

const CustomFilters = () => {
    const APPID:any =  process.env.NEXT_PUBLIC_ALGOLIA_APPID;
    const APIKEY:any = process.env.NEXT_PUBLIC_ALGOLIA_APIKEY;

    const searchClient = algoliasearch(APPID,APIKEY)
    return(
        <>
            <InstantSearch
                searchClient={searchClient}
                indexName="pre_spiqyp_companies"
                routing={true}
                insights={true}
                >
                    
                    <div className="container">
                        <Configure ruleContexts={[]}/>
                        <div>
                            <p>Categorias</p>
                            <DynamicWidgets>
                                <div className="w-full">
                                    <RefinementList
                                        attribute="name"
                                        searchable={true}
                                        searchablePlaceholder="Buscar categorias"
                                        showMore={true}>
                                    </RefinementList>
                                </div>
                                <div>
                                    <Menu attribute="categories" showMore={true}/>
                                </div>
                            </DynamicWidgets>
                        </div>
                    </div>
            </InstantSearch>
        </>
    )
}

export default CustomFilters;