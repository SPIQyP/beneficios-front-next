import { Company, getCompanies } from "@/services/companies/companies"
import CompanyCard from "../components/companyCard/CompanyCard";
import { Category, getCategories } from "@/services/categories/categories";
import algoliasearch from "algoliasearch";
import { Configure, DynamicWidgets, InstantSearch, RefinementList } from "react-instantsearch";
import CustomFilters from "../components/search/customFilters/customFilters";

 export default async function companiesPage(){
    
    const data = await getCompanies(10);
    const categories = await getCategories();


    return (
        <>
            <div className="container text-black">
                <div className="mt-6">
                    <p className="font-light">{'Home > Beneficios'}</p>
                    <h1 className=" text-4xl font-bold mt-2">Beneficios</h1>
                </div>
                <div className="grid grid-cols-12 gap-4 mt-10">
                    <div className=" flex flex-col gap-4 col-span-3">
                        {/* <p>10 Comercios</p>
                        <select className="text-black w-2/3 border border-black rounded-md p-1">
                            <option key={0} defaultValue={""} selected disabled>Seleccionar categoria</option>
                            {
                                categories.map( (category:Category,index:number) => (
                                    <option key={index +1} value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                        <input className="w-2/3 border border-black rounded-md p-1" type="date" placeholder="Dia de inicio"/>
                        <button className="btn text-white w-1/2">Limpiar filtros</button> */}
                        <CustomFilters/>
                    </div>
                    <div className="col-span-9">
                        <div className="grid grid-cols-12 gap-4">
                        {
                            data.companies.map((company: Company,i:number) => (
                                <div key={i} className="col-span-4">
                                    <CompanyCard content={company} />
                                </div>
                                
                            ))
                        }
                        </div>
                    </div>
                </div>
                
            </div>
            
            
        </>
    )
 }